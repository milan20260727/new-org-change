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

module.exports = { fetchSourceRecords, getTenantAccessToken, searchAllRecords };
