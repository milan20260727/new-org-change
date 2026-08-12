const { requireSession } = require('../lib/auth');
const { requireRole } = require('../lib/permissions');
const { listChangeLog, appendChangeLogEntry } = require('../lib/changelog');

// GET (any signed-in user): read the shared change feed. POST (Editor+): append an entry.
// Combined into one function — the Hobby plan caps deployments at 12 serverless functions.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const session = await requireSession(req, res);
    if (!session) return;
    try {
      const entries = await listChangeLog();
      res.status(200).json({ entries });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }
  if (req.method === 'POST') {
    const ctx = await requireRole(req, res, 'Editor');
    if (!ctx) return;
    const { typeKey, key, params, by, time } = req.body || {};
    if (!typeKey) { res.status(400).json({ error: 'typeKey is required' }); return; }
    try {
      const recordId = await appendChangeLogEntry({ typeKey, key, params, by, time });
      res.status(200).json({ ok: true, recordId });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
