const { requireSession } = require('../../lib/auth');
const { requireRole } = require('../../lib/permissions');
const { getEditWindow, setEditWindow } = require('../../lib/settings');

// GET: any signed-in user can read the current edit window — the client needs it to gate its
// own editing controls. POST: Senior Admin/Owner only, to change it. Deliberately not gated by
// the window itself, or nobody could ever reopen editing once it closes.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const session = await requireSession(req, res);
    if (!session) return;
    try {
      const { start, end } = await getEditWindow();
      res.status(200).json({ start, end });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }
  if (req.method === 'POST') {
    const ctx = await requireRole(req, res, 'Senior Admin');
    if (!ctx) return;
    const { start, end } = req.body || {};
    try {
      await setEditWindow(start || null, end || null);
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
