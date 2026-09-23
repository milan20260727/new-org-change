// Live data source: pulls current records straight from Lark Base via the
// Bitable OpenAPI, no caching layer beyond the short-lived tenant token —
// every /api/org-data call reflects whatever is in Base right now.

const { BASE_TOKEN, SOURCES } = require('./sources');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

let cachedToken = null; // { token, expiresAt }

// A refreshSnapshot() run fans out to 3 sources at once, each of which fetches both its live and
// snapshot table in parallel — up to 6 concurrent record-search streams against the same tenant,
// each itself paginating a ~3000+ row table sequentially. That's enough concurrent request volume
// to trip Lark's rate limit (code 1254290, "TooManyRequest") even though no single stream is
// misbehaving on its own; batched writes can similarly hit 1254291 (write conflict) under load.
// Retrying with backoff (instead of failing the whole refresh/write outright) is standard practice
// for this class of transient, load-based error — it isn't a sign of a bug in the request itself,
// just too many of them landing in the same window.
async function larkFetchJson(url, options, context) {
  const maxRetries = 5;
  for (let attempt = 0; ; attempt += 1) {
    const res = await fetch(url, options);
    const json = await res.json();
    if (json.code === 0) return json;
    const rateLimited = json.code === 1254290 || json.code === 1254291 || res.status === 429;
    if (rateLimited && attempt < maxRetries) {
      const delayMs = 500 * 2 ** attempt; // 500ms, 1s, 2s, 4s, 8s
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      continue;
    }
    throw new Error(`${context} failed: ${json.code} ${json.msg}`);
  }
}

async function getTenantAccessToken(appId, appSecret) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token;
  }

  const json = await larkFetchJson(
    `${LARK_DOMAIN}/open-apis/auth/v3/tenant_access_token/internal`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    },
    'tenant_access_token'
  );

  cachedToken = { token: json.tenant_access_token, expiresAt: Date.now() + json.expire * 1000 };
  return cachedToken.token;
}

function requireCredentials(env) {
  const { LARK_APP_ID, LARK_APP_SECRET } = env;
  if (!LARK_APP_ID || !LARK_APP_SECRET) {
    throw new Error('Missing required env vars: LARK_APP_ID, LARK_APP_SECRET');
  }
  return { appId: LARK_APP_ID, appSecret: LARK_APP_SECRET };
}

async function searchAllRecords({ appId, appSecret, tableId, fieldNames }) {
  const token = await getTenantAccessToken(appId, appSecret);
  const items = [];
  let pageToken;

  for (;;) {
    const url = new URL(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${tableId}/records/search`);
    url.searchParams.set('page_size', '500');
    if (pageToken) url.searchParams.set('page_token', pageToken);

    const json = await larkFetchJson(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ field_names: fieldNames, automatic_fields: false }),
      },
      `records/search on table ${tableId}`
    );

    items.push(...(json.data.items || []));
    if (!json.data.has_more) break;
    pageToken = json.data.page_token;
  }

  return items;
}

async function fetchSourceRecords(sourceKey, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  const { appId, appSecret } = requireCredentials(env);
  return searchAllRecords({ appId, appSecret, tableId: source.tableId, fieldNames: source.fields });
}

async function createSourceRecord(sourceKey, fields, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  const json = await larkFetchJson(
    `${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fields }),
    },
    `record create on table ${source.tableId}`
  );
  return json.data.record;
}

async function updateSourceRecord(sourceKey, recordId, fields, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  const json = await larkFetchJson(
    `${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/${recordId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fields }),
    },
    `record update on table ${source.tableId}`
  );
  return json.data.record;
}

async function deleteSourceRecords(sourceKey, recordIds, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  if (!recordIds.length) return;
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  for (let i = 0; i < recordIds.length; i += 200) {
    const chunk = recordIds.slice(i, i + 200);
    await larkFetchJson(
      `${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_delete`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ records: chunk }),
      },
      `batch delete on table ${source.tableId}`
    );
  }
}

// Batched version of createSourceRecord — fieldsArray is an array of per-record `fields`
// objects. Used for the snapshot refresh, which can be writing thousands of rows at once.
async function createSourceRecords(sourceKey, fieldsArray, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  if (!fieldsArray.length) return;
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  for (let i = 0; i < fieldsArray.length; i += 200) {
    const chunk = fieldsArray.slice(i, i + 200).map((fields) => ({ fields }));
    await larkFetchJson(
      `${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ records: chunk }),
      },
      `batch create on table ${source.tableId}`
    );
  }
}

// Batched version of updateSourceRecord — updates is an array of {recordId, fields}.
async function updateSourceRecords(sourceKey, updates, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  if (!updates.length) return;
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  for (let i = 0; i < updates.length; i += 200) {
    const chunk = updates.slice(i, i + 200).map((u) => ({ record_id: u.recordId, fields: u.fields }));
    await larkFetchJson(
      `${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_update`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ records: chunk }),
      },
      `batch update on table ${source.tableId}`
    );
  }
}

module.exports = { fetchSourceRecords, createSourceRecord, createSourceRecords, updateSourceRecord, updateSourceRecords, deleteSourceRecords, getTenantAccessToken, searchAllRecords };
