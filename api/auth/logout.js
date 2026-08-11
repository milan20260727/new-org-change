const { clearSessionCookieHeader } = require('../../lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Set-Cookie', clearSessionCookieHeader());
  res.writeHead(302, { Location: '/' });
  res.end();
};
