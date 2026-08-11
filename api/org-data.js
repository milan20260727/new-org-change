const { fetchSourceRecords } = require('../lib/fetchLark');
const { buildOrgData } = require('../lib/buildOrgData');
const { requireSession } = require('../lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await requireSession(req, res))) return;

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
