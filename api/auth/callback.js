const { STATE_COOKIE_NAME, SESSION_DAYS, createSessionToken } = require('../../lib/session');
const { parseCookies, sessionCookieHeader } = require('../../lib/auth');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

module.exports = async (req, res) => {
  const appId = process.env.LARK_APP_ID;
  const appSecret = process.env.LARK_APP_SECRET;
  const expectedTenantKey = process.env.DIGIPLUS_TENANT_KEY;

  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookies = parseCookies(req);

  if (!code || !state || state !== cookies[STATE_COOKIE_NAME]) {
    res.status(400).send('Login failed: invalid or expired login attempt. Please try again.');
    return;
  }

  try {
    const redirectUri = `https://${req.headers.host}/api/auth/callback`;

    const tokenRes = await fetch(`${LARK_DOMAIN}/open-apis/authen/v2/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: appId,
        client_secret: appSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenJson.access_token) {
      throw new Error(`token exchange failed: ${tokenJson.code} ${tokenJson.error_description || tokenJson.msg}`);
    }

    const userRes = await fetch(`${LARK_DOMAIN}/open-apis/authen/v1/user_info`, {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });
    const userJson = await userRes.json();
    if (userJson.code !== 0) {
      throw new Error(`user_info failed: ${userJson.code} ${userJson.msg}`);
    }

    const { name, tenant_key: tenantKey } = userJson.data;

    if (expectedTenantKey && tenantKey !== expectedTenantKey) {
      res.status(403).send(`Access denied: this account (tenant ${tenantKey}) is not part of the authorized organization.`);
      return;
    }

    const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
    const token = await createSessionToken({ name, tenantKey, exp }, process.env.SESSION_SECRET);

    res.setHeader('Set-Cookie', [
      `${STATE_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
      sessionCookieHeader(token, { maxAgeSeconds: SESSION_DAYS * 24 * 60 * 60 }),
    ]);

    if (!expectedTenantKey) {
      // Bootstrap mode: DIGIPLUS_TENANT_KEY isn't set yet, so every tenant is
      // let through. Logged so it can be copied into the env var and the
      // check tightened.
      console.log(`[auth] No DIGIPLUS_TENANT_KEY set — observed tenant_key: ${tenantKey} (user: ${name})`);
    }

    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (err) {
    res.status(502).send(`Login failed: ${err.message}`);
  }
};
