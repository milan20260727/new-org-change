// Freezes the three live source tables (Structures, Employee list, Lark User) into their
// "Snapshot *" mirrors, which /api/org-data actually reads from. This is the only thing that
// makes the org chart's underlying data change — every other load just re-reads whatever this
// last wrote, no matter how often the live tables themselves get updated in the background.
const { fetchSourceRecords, createSourceRecords, deleteSourceRecords } = require('./fetchLark');
const { extractText } = require('./buildOrgData');
const { SOURCES } = require('./sources');

async function refreshOne(liveKey, snapshotKey) {
  const [liveItems, existingSnapshot] = await Promise.all([
    fetchSourceRecords(liveKey),
    fetchSourceRecords(snapshotKey),
  ]);
  const fields = SOURCES[liveKey].fields;
  const flatRows = liveItems.map((item) => {
    const row = {};
    fields.forEach((f) => { row[f] = extractText(item.fields[f]) || ''; });
    return row;
  });

  // New rows first, old ones deleted only after — if createSourceRecords fails or the function
  // times out partway, the previous snapshot is still there (stale but present) rather than the
  // table being left empty.
  await createSourceRecords(snapshotKey, flatRows);
  await deleteSourceRecords(snapshotKey, existingSnapshot.map((r) => r.record_id));
  return flatRows.length;
}

async function refreshSnapshot() {
  const [structures, employees, larkUsers] = await Promise.all([
    refreshOne('structures', 'snapshotStructures'),
    refreshOne('employees', 'snapshotEmployees'),
    refreshOne('larkUsers', 'snapshotLarkUsers'),
  ]);
  return { structures, employees, larkUsers };
}

module.exports = { refreshSnapshot };
