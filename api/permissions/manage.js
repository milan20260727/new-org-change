const { requireRole, listPermissionRecords, createSourceRecord, updateSourceRecord } = require('../../lib/permissions');
const { BASE_TOKEN, SOURCES } = require('../../lib/sources');
const { getTenantAccessToken } = require('../../lib/fetchLark');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

// Combines update/remove/transfer-owner (previously three files) into one, dispatched by
// `action` — the Hobby plan caps deployments at 12 serverless functions.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const { action } = req.body || {};

  // Adds a new user by email or changes an existing one's role. Deliberately can't touch the
  // Owner row — demoting/replacing the Owner only happens through the transfer-owner action,
  // which keeps "exactly one Owner" atomic instead of leaving the tool ownerless between calls.
  if (action === 'update') {
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
        if (target.role === 'Owner') { res.status(403).json({ error: 'Use the transfer-owner action to change the Owner' }); return; }
        await updateSourceRecord('permissions', recordId, { Role: role });
        res.status(200).json({ ok: true });
        return;
      }
      if (!email) { res.status(400).json({ error: 'email or recordId is required' }); return; }
      const existing = records.find((r) => r.email === email.toLowerCase());
      if (existing) {
        if (existing.role === 'Owner') { res.status(403).json({ error: 'Use the transfer-owner action to change the Owner' }); return; }
        await updateSourceRecord('permissions', existing.recordId, { Role: role, Name: name || existing.name });
        res.status(200).json({ ok: true });
        return;
      }
      await createSourceRecord('permissions', { Name: name || '', Email: email, Role: role });
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }

  // Revokes a user's access outright (deletes their permissions row). Same Owner guard as update.
  if (action === 'remove') {
    const ctx = await requireRole(req, res, 'Senior Admin');
    if (!ctx) return;
    const { recordId } = req.body || {};
    if (!recordId) { res.status(400).json({ error: 'recordId is required' }); return; }
    try {
      const records = await listPermissionRecords();
      const target = records.find((r) => r.recordId === recordId);
      if (!target) { res.status(404).json({ error: 'User not found' }); return; }
      if (target.role === 'Owner') { res.status(403).json({ error: 'The Owner cannot be removed — transfer ownership first' }); return; }

      const { LARK_APP_ID, LARK_APP_SECRET } = process.env;
      const token = await getTenantAccessToken(LARK_APP_ID, LARK_APP_SECRET);
      const tableId = SOURCES.permissions.tableId;
      const delRes = await fetch(`${LARK_DOMAIN}/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${tableId}/records/${recordId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const delJson = await delRes.json();
      if (delJson.code !== 0) throw new Error(`record delete failed: ${delJson.code} ${delJson.msg}`);
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }

  // Owner-only. Promotes the target to Owner and demotes the caller to Senior Admin in the same
  // call, so there's never a moment with zero or two Owners.
  if (action === 'transfer-owner') {
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
    return;
  }

  res.status(400).json({ error: 'Unknown action' });
};
