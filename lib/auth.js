const { SESSION_COOKIE_NAME, SESSION_DAYS, verifySessionToken } = require('./session');

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

// Returns the session payload ({ name, tenantKey, exp }) if the request has a
// valid, unexpired session cookie signed with SESSION_SECRET — otherwise null.
async function getSession(req) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) return null;
  return verifySessionToken(token, secret);
}

// Sends a 401 JSON error if there's no valid session; returns the session
// payload otherwise. Use at the top of any data-bearing API route.
async function requireSession(req, res) {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not logged in' });
    return null;
  }
  return session;
}

function sessionCookieHeader(token, { maxAgeSeconds } = {}) {
  const attrs = [`${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'Secure', 'SameSite=Lax'];
  if (maxAgeSeconds !== undefined) attrs.push(`Max-Age=${maxAgeSeconds}`);
  return attrs.join('; ');
}

function clearSessionCookieHeader() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

module.exports = {
  SESSION_DAYS,
  parseCookies,
  getSession,
  requireSession,
  sessionCookieHeader,
  clearSessionCookieHeader,
};
