// Role model for this tool, stored in the "Tool Permissions" Base table (not in code) so an
// Owner/Senior Admin can manage access without a redeploy. Unlisted users get NO access at all —
// being in the same Lark tenant is not enough, unlike the rest of this app's data sources.
const { fetchSourceRecords, createSourceRecord, updateSourceRecord } = require('./fetchLark');
const { extractText } = require('./buildOrgData');
const { requireSession } = require('./auth');

const ROLES = ['Viewer', 'Editor', 'Senior Admin', 'Owner'];
const ROLE_RANK = { Viewer: 1, Editor: 2, 'Senior Admin': 3, Owner: 4 };

function rank(role) {
  return ROLE_RANK[role] || 0;
}

async function listPermissionRecords() {
  const items = await fetchSourceRecords('permissions');
  return items.map((item) => ({
    recordId: item.record_id,
    openId: extractText(item.fields.OpenID) || '',
    name: extractText(item.fields.Name) || '',
    email: (extractText(item.fields.Email) || '').toLowerCase(),
    role: extractText(item.fields.Role) || '',
  }));
}

// Resolves the caller's role from {openId, email, name}. Matches by OpenID first (the stable
// key going forward); falls back to matching an un-claimed seed row by email and backfills its
// OpenID on the spot, so an admin can pre-provision someone by email before they've ever logged
// in. Returns null (no access) if nothing matches either way.
async function resolveRole(identity) {
  const records = await listPermissionRecords();
  const email = (identity.email || '').toLowerCase();

  const byOpenId = identity.openId && records.find((r) => r.openId === identity.openId);
  if (byOpenId) return { role: byOpenId.role, recordId: byOpenId.recordId };

  const byEmail = email && records.find((r) => !r.openId && r.email === email);
  if (byEmail) {
    await updateSourceRecord('permissions', byEmail.recordId, {
      OpenID: identity.openId || '',
      Name: byEmail.name || identity.name || '',
    });
    return { role: byEmail.role, recordId: byEmail.recordId };
  }

  return null;
}

// Checks session AND role in one call for API routes; sends the 401/403 itself on failure.
// Pass minRole: null to allow any resolved role through (just not "no role at all").
async function requireRole(req, res, minRole) {
  const session = await requireSession(req, res);
  if (!session) return null; // requireSession already sent the 401
  const resolved = await resolveRole({ openId: session.openId, email: session.email, name: session.name });
  if (!resolved || (minRole && rank(resolved.role) < rank(minRole))) {
    res.status(403).json({ error: 'Forbidden', role: resolved ? resolved.role : null });
    return null;
  }
  return { session, role: resolved.role, recordId: resolved.recordId };
}

module.exports = { ROLES, ROLE_RANK, rank, listPermissionRecords, resolveRole, requireRole, createSourceRecord, updateSourceRecord };
