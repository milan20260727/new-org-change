const { requireRole, listPermissionRecords } = require('../../lib/permissions');

// Senior Admin and Owner only — the admin page's user table.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const ctx = await requireRole(req, res, 'Senior Admin');
  if (!ctx) return;
  try {
    const records = await listPermissionRecords();
    res.status(200).json({ users: records, viewerRole: ctx.role });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
