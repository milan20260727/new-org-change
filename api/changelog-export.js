const { requireRole } = require('../lib/permissions');
const { createSourceRecords } = require('../lib/fetchLark');
const { getLastChangeLogExportAt, setLastChangeLogExportAt } = require('../lib/settings');

// GET: the current archive watermark, so the client can filter out rows already archived last
// time (by anyone — this is a single shared marker, not per-admin).
// POST: the client sends the exact rows it computed as "new since the watermark" (already
// shaped to match orgChangeLog/employeeChangeLog's real field names) plus the new watermark to
// save. This route just writes them and advances the marker — all the diffing/replay logic that
// decided what's "new" already ran client-side, same as the CSV export it's built on.
// The admin's manual "set watermark" control reuses this same POST with empty row arrays — it
// just moves the marker without writing anything, which is why newWatermark is checked by type
// (0 is a legitimate value there, e.g. resetting to "nothing archived yet") rather than truthiness.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const ctx = await requireRole(req, res, 'Senior Admin');
    if (!ctx) return;
    try {
      const lastExportAt = await getLastChangeLogExportAt();
      res.status(200).json({ lastExportAt });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }

  if (req.method === 'POST') {
    const ctx = await requireRole(req, res, 'Senior Admin');
    if (!ctx) return;
    const { orgRows, employeeRows, newWatermark } = req.body || {};
    if (!Array.isArray(orgRows) || !Array.isArray(employeeRows) || typeof newWatermark !== 'number') {
      res.status(400).json({ error: 'orgRows, employeeRows, and newWatermark are required' });
      return;
    }
    try {
      // Different tables, so these can run concurrently — only writes to the SAME table need to
      // stay sequential (Lark's write-conflict guard). A large watermark rollback can mean
      // hundreds of employee rows against a handful of org rows; running them in parallel halves
      // the wall-clock time instead of making the (usually much bigger) employee write wait
      // behind the org write for no reason.
      await Promise.all([
        createSourceRecords('orgChangeLog', orgRows),
        createSourceRecords('employeeChangeLog', employeeRows),
      ]);
      await setLastChangeLogExportAt(newWatermark);
      res.status(200).json({ ok: true, orgCount: orgRows.length, employeeCount: employeeRows.length });
    } catch (err) {
      res.status(502).json({ error: err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
