const { requireSession } = require('../../lib/auth');
const { resolveRole } = require('../../lib/permissions');

// Distinct from /api/auth/me: that one just confirms "is this a valid Lark session in the
// tenant"; this one answers "does this specific person have any standing in the tool at all,
// and if so what can they do" — the two are allowed to disagree (valid session, zero role).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const session = await requireSession(req, res);
  if (!session) return;
  try {
    const resolved = await resolveRole({ openId: session.openId, email: session.email, name: session.name });
    if (!resolved) {
      // Logged so a locked-out user's openId/email can be read off Vercel's function logs and
      // matched into the permissions table by hand — email in particular may be blank if the
      // Lark app wasn't granted that OAuth scope, which would otherwise silently strand the
      // email-based bootstrap seed row with nothing to match against.
      console.log(`[permissions] no role resolved for name="${session.name}" openId="${session.openId}" email="${session.email}"`);
    }
    res.status(200).json({ role: resolved ? resolved.role : null, name: session.name });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
