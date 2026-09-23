// Role model for this tool, stored in the "Tool Permissions" Base table (not in code) so an
// Owner/Senior Admin can manage access without a redeploy. Unlisted users get NO access at all —
// being in the same Lark tenant is not enough, unlike the rest of this app's data sources.
const { fetchSourceRecords, createSourceRecord, updateSourceRecord } = require('./fetchLark');
const { extractText } = require('./buildOrgData');
const { requireSession } = require('./auth');
const { SOURCES } = require('./sources');

const ROLES = ['Viewer', 'Editor', 'Senior Admin', 'Owner'];
const ROLE_RANK = { Viewer: 1, Editor: 2, 'Senior Admin': 3, Owner: 4 };

function rank(role) {
  return ROLE_RANK[role] || 0;
}

function parseEditScope(raw) {
  try {
    const parsed = JSON.parse(extractText(raw) || '[]');
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

// "Edit Scope" needs to exist as a real field on the Tool Permissions Base table before this
// works — until an admin adds it there, Base's own "field not found" error on a field_names
// filter that names it would otherwise take down permission resolution (and with it, login) for
// everyone. Falling back to the pre-existing 4-field list on ANY failure here (not just a
// field-not-found one) is deliberately broad: a transient/rate-limit error on this first attempt
// still gets one retry via the fallback path rather than surfacing straight away, and either way
// missing the retry just means editScope reads back empty (unrestricted) instead of blocking
// access outright — the safe direction for this to fail in.
async function listPermissionRecords() {
  let items;
  try {
    items = await fetchSourceRecords('permissions');
  } catch (err) {
    console.log(`[permissions] fetch with Edit Scope field failed (${err.message}); retrying without it`);
    items = await fetchSourceRecords('permissions', process.env, SOURCES.permissions.fields.filter((f) => f !== 'Edit Scope'));
  }
  return items.map((item) => ({
    recordId: item.record_id,
    openId: extractText(item.fields.OpenID) || '',
    name: extractText(item.fields.Name) || '',
    email: (extractText(item.fields.Email) || '').toLowerCase(),
    role: extractText(item.fields.Role) || '',
    editScope: parseEditScope(item.fields['Edit Scope']),
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
  if (byOpenId) return { role: byOpenId.role, recordId: byOpenId.recordId, editScope: byOpenId.editScope };

  const byEmail = email && records.find((r) => !r.openId && r.email === email);
  if (byEmail) {
    // Best-effort: claiming the OpenID backfill needs Base write access, which may not be
    // granted yet. Don't let that failure block someone who legitimately matched by email —
    // log it and let them in; the backfill will just retry (harmlessly) on their next request.
    try {
      await updateSourceRecord('permissions', byEmail.recordId, {
        OpenID: identity.openId || '',
        Name: byEmail.name || identity.name || '',
      });
    } catch (err) {
      console.log(`[permissions] OpenID backfill failed for ${email}: ${err.message}`);
    }
    return { role: byEmail.role, recordId: byEmail.recordId, editScope: byEmail.editScope };
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
  return { session, role: resolved.role, recordId: resolved.recordId, editScope: resolved.editScope };
}

module.exports = { ROLES, ROLE_RANK, rank, listPermissionRecords, resolveRole, requireRole, createSourceRecord, updateSourceRecord };
