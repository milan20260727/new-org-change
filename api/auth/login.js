const { STATE_COOKIE_NAME } = require('../../lib/session');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

module.exports = async (req, res) => {
  const appId = process.env.LARK_APP_ID;
  if (!appId) {
    res.status(500).json({ error: 'Missing LARK_APP_ID env var' });
    return;
  }

  const state = crypto.randomUUID();
  const redirectUri = `https://${req.headers.host}/api/auth/callback`;
  const authorizeUrl = new URL(`${LARK_DOMAIN}/open-apis/authen/v1/authorize`);
  authorizeUrl.searchParams.set('app_id', appId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', state);
  // Without an explicit scope, Lark's user_info response omits email even when the app has
  // the permission granted — and resolveRole's first-time bootstrap (matching a pre-seeded
  // permissions row by email, before an OpenID exists) silently fails without it.
  authorizeUrl.searchParams.set('scope', 'contact:user.email:readonly');

  res.setHeader(
    'Set-Cookie',
    `${STATE_COOKIE_NAME}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );
  res.writeHead(302, { Location: authorizeUrl.toString() });
  res.end();
};
