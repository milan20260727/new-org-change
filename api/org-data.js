const { fetchSourceRecords } = require('../lib/fetchLark');
const { buildOrgData } = require('../lib/buildOrgData');
const { requireRole } = require('../lib/permissions');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  // Being in the tenant isn't enough here — being in the tenant is enough for org-chart-live,
  // but this tool drafts real reorg changes, so it needs its own explicit allowlist.
  if (!(await requireRole(req, res, 'Viewer'))) return;

  try {
    const [structureItems, employeeItems, larkUserItems] = await Promise.all([
      fetchSourceRecords('structures'),
      fetchSourceRecords('employees'),
      fetchSourceRecords('larkUsers'),
    ]);
    const result = buildOrgData({ structureItems, employeeItems, larkUserItems });
    res.status(200).json(result);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
