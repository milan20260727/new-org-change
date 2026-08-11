const { requireRole, listPermissionRecords, updateSourceRecord } = require('../../lib/permissions');

// Owner-only. Promotes the target to Owner and demotes the caller to Senior Admin in the same
// call, so there's never a moment with zero or two Owners.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const ctx = await requireRole(req, res, 'Owner');
  if (!ctx) return;

  const { recordId } = req.body || {};
  if (!recordId) { res.status(400).json({ error: 'recordId is required' }); return; }
  if (recordId === ctx.recordId) { res.status(400).json({ error: "That's already you" }); return; }

  try {
    const records = await listPermissionRecords();
    const target = records.find((r) => r.recordId === recordId);
    if (!target) { res.status(404).json({ error: 'User not found' }); return; }

    await updateSourceRecord('permissions', recordId, { Role: 'Owner' });
    await updateSourceRecord('permissions', ctx.recordId, { Role: 'Senior Admin' });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
