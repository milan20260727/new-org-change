const { requireRole } = require('../../lib/permissions');
const { appendChangeLogEntry } = require('../../lib/changelog');

// Editor+ only, matching who's allowed to make the edits this mirrors.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
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
};
