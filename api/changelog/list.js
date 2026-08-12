const { requireSession } = require('../../lib/auth');
const { listChangeLog } = require('../../lib/changelog');

// Any signed-in user (Viewer included) can read the shared change feed — it's informational,
// same visibility as the org chart itself.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const session = await requireSession(req, res);
  if (!session) return;
  try {
    const entries = await listChangeLog();
    res.status(200).json({ entries });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
