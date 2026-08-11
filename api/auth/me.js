const { getSession } = require('../../lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }
  res.status(200).json({ name: session.name });
};
