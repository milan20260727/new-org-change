const { requireRole, listPermissionRecords } = require('../../lib/permissions');
const { BASE_TOKEN, SOURCES } = require('../../lib/sources');
const { getTenantAccessToken } = require('../../lib/fetchLark');

const LARK_DOMAIN = process.env.LARK_DOMAIN || 'https://open.larksuite.com';

// Revokes a user's access outright (deletes their permissions row). Same Owner guard as update.js.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
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
};
