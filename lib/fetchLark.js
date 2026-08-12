// Live data source: pulls current records straight from Lark Base via the
// Bitable OpenAPI, no caching layer beyond the short-lived tenant token —
// every /api/org-data call reflects whatever is in Base right now.

const { BASE_TOKEN, SOURCES } = require('./sources');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

let cachedToken = null; // { token, expiresAt }

async function getTenantAccessToken(appId, appSecret) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token;
  }

  const res = await fetch(`${LARK_DOMAIN}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const json = await res.json();
  if (json.code !== 0) {
    throw new Error(`tenant_access_token failed: ${json.code} ${json.msg}`);
  }

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

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ field_names: fieldNames, automatic_fields: false }),
    });
    const json = await res.json();
    if (json.code !== 0) {
      throw new Error(`records/search failed on table ${tableId}: ${json.code} ${json.msg}`);
    }

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
  const res = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ fields }),
  });
  const json = await res.json();
  if (json.code !== 0) throw new Error(`record create failed on table ${source.tableId}: ${json.code} ${json.msg}`);
  return json.data.record;
}

async function updateSourceRecord(sourceKey, recordId, fields, env = process.env) {
  const source = SOURCES[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  const { appId, appSecret } = requireCredentials(env);
  const token = await getTenantAccessToken(appId, appSecret);
  const res = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/${recordId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ fields }),
  });
  const json = await res.json();
  if (json.code !== 0) throw new Error(`record update failed on table ${source.tableId}: ${json.code} ${json.msg}`);
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
    const res = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ records: chunk }),
    });
    const json = await res.json();
    if (json.code !== 0) throw new Error(`batch delete failed on table ${source.tableId}: ${json.code} ${json.msg}`);
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
    const res = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ records: chunk }),
    });
    const json = await res.json();
    if (json.code !== 0) throw new Error(`batch create failed on table ${source.tableId}: ${json.code} ${json.msg}`);
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
    const res = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${source.tableId}/records/batch_update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ records: chunk }),
    });
    const json = await res.json();
    if (json.code !== 0) throw new Error(`batch update failed on table ${source.tableId}: ${json.code} ${json.msg}`);
  }
}

module.exports = { fetchSourceRecords, createSourceRecord, createSourceRecords, updateSourceRecord, updateSourceRecords, deleteSourceRecords, getTenantAccessToken, searchAllRecords };
