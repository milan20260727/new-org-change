const { requireRole, listPermissionRecords, createSourceRecord, updateSourceRecord } = require('../../lib/permissions');

// Adds a new user by email or changes an existing one's role. Deliberately can't touch the
// Owner row — demoting/replacing the Owner only happens through transfer-owner.js, which keeps
// "exactly one Owner" atomic instead of leaving the tool ownerless between two calls.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const ctx = await requireRole(req, res, 'Senior Admin');
  if (!ctx) return;

  const { recordId, email, name, role } = req.body || {};
  if (!role || !['Viewer', 'Editor', 'Senior Admin'].includes(role)) {
    res.status(400).json({ error: 'role must be one of Viewer, Editor, Senior Admin' });
    return;
  }
  if (role === 'Senior Admin' && ctx.role !== 'Owner') {
    res.status(403).json({ error: 'Only the Owner can grant Senior Admin' });
    return;
  }

  try {
    const records = await listPermissionRecords();

    if (recordId) {
      const target = records.find((r) => r.recordId === recordId);
      if (!target) { res.status(404).json({ error: 'User not found' }); return; }
      if (target.role === 'Owner') { res.status(403).json({ error: 'Use transfer-owner to change the Owner' }); return; }
      await updateSourceRecord('permissions', recordId, { Role: role });
      res.status(200).json({ ok: true });
      return;
    }

    if (!email) { res.status(400).json({ error: 'email or recordId is required' }); return; }
    const existing = records.find((r) => r.email === email.toLowerCase());
    if (existing) {
      if (existing.role === 'Owner') { res.status(403).json({ error: 'Use transfer-owner to change the Owner' }); return; }
      await updateSourceRecord('permissions', existing.recordId, { Role: role, Name: name || existing.name });
      res.status(200).json({ ok: true });
      return;
    }
    await createSourceRecord('permissions', { Name: name || '', Email: email, Role: role });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
