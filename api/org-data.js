const { fetchSourceRecords } = require('../lib/fetchLark');
const { buildOrgData } = require('../lib/buildOrgData');
const { requireRole, rank } = require('../lib/permissions');
const { refreshSnapshot } = require('../lib/snapshot');

// Reads from the frozen Snapshot* tables, not the live Structures/Employee/Lark User tables —
// the org chart only changes when ?refresh=1 explicitly rewrites the snapshot first (Senior
// Admin+ only, matching the "刷新数据" button's visibility). See vercel.json for this route's
// extended timeout: a full snapshot rewrite over thousands of records can take a while.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  // Being in the tenant isn't enough here — being in the tenant is enough for org-chart-live,
  // but this tool drafts real reorg changes, so it needs its own explicit allowlist.
  const ctx = await requireRole(req, res, 'Viewer');
  if (!ctx) return;

  try {
    if (req.query && req.query.refresh) {
      if (rank(ctx.role) < rank('Senior Admin')) {
        res.status(403).json({ error: 'Only Senior Admin/Owner can refresh the snapshot' });
        return;
      }
      await refreshSnapshot();
    }
    const [structureItems, employeeItems, larkUserItems] = await Promise.all([
      fetchSourceRecords('snapshotStructures'),
      fetchSourceRecords('snapshotEmployees'),
      fetchSourceRecords('snapshotLarkUsers'),
    ]);
    const result = buildOrgData({ structureItems, employeeItems, larkUserItems });
    res.status(200).json(result);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
