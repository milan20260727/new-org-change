// Freezes the three live source tables (Structures, Employee list, Lark User) into their
// "Snapshot *" mirrors, which /api/org-data actually reads from. This is the only thing that
// makes the org chart's underlying data change — every other load just re-reads whatever this
// last wrote, no matter how often the live tables themselves get updated in the background.
const { fetchSourceRecords, createSourceRecords, updateSourceRecords, deleteSourceRecords } = require('./fetchLark');
const { extractText, extractUserId } = require('./buildOrgData');
const { SOURCES, ROLE_USER_FIELDS } = require('./sources');

// The snapshot's own "<Field>_id" columns (see sources.js) aren't real live columns — each pulls
// the Lark account id off the SAME live cell as its plain-text sibling field, instead of a
// distinct column of its own.
const ROLE_ID_EXTRACTORS = {};
ROLE_USER_FIELDS.forEach((f) => { ROLE_ID_EXTRACTORS[f + '_id'] = (item) => extractUserId((item.fields || {})[f]); });

// Diffs the live table against the current snapshot (matched by keyField, which must be a
// stable, unique identifier present on every row — leaf_dept_id for structures, EID for
// employees) and only writes what actually changed. A prior version always wiped and recreated
// every row on every refresh; for the ~3400-row employee table that meant ~36 sequential batched
// API calls per refresh, which could exceed this route's execution time limit mid-run and leave
// old and new rows both in the table (duplicates). Touching only the delta keeps a routine
// refresh (most rows unchanged) down to a handful of calls, so it finishes well inside the limit.
async function refreshOneDiff(liveKey, snapshotKey, keyField, filterFn) {
  const [liveItems, existingSnapshot] = await Promise.all([
    fetchSourceRecords(liveKey),
    fetchSourceRecords(snapshotKey),
  ]);
  // The snapshot table's own field list, not the live table's — the two can now diverge (the
  // snapshot carries a few derived-only "<Field>_id" columns the live table doesn't have).
  const fields = SOURCES[snapshotKey].fields;
  const filteredItems = filterFn ? liveItems.filter(filterFn) : liveItems;
  const flatRows = filteredItems.map((item) => {
    const row = {};
    fields.forEach((f) => {
      row[f] = ROLE_ID_EXTRACTORS[f] ? (ROLE_ID_EXTRACTORS[f](item) || '') : (extractText(item.fields[f]) || '');
    });
    return row;
  });

  const snapshotByKey = new Map();
  existingSnapshot.forEach((r) => {
    const key = extractText(r.fields[keyField]);
    if (key) snapshotByKey.set(key, r);
  });

  const toCreate = [];
  const toUpdate = [];
  const seenKeys = new Set();
  flatRows.forEach((row) => {
    const key = row[keyField];
    if (!key) return;
    seenKeys.add(key);
    const existing = snapshotByKey.get(key);
    if (!existing) {
      toCreate.push(row);
    } else if (fields.some((f) => (extractText(existing.fields[f]) || '') !== row[f])) {
      toUpdate.push({ recordId: existing.record_id, fields: row });
    }
  });
  const toDeleteIds = existingSnapshot
    .filter((r) => !seenKeys.has(extractText(r.fields[keyField])))
    .map((r) => r.record_id);

  // Sequential, not parallel — all three touch the same table, and concurrent writes to one
  // Bitable table can trip Lark's write-conflict error.
  await createSourceRecords(snapshotKey, toCreate);
  await updateSourceRecords(snapshotKey, toUpdate);
  await deleteSourceRecords(snapshotKey, toDeleteIds);
  return { total: flatRows.length, created: toCreate.length, updated: toUpdate.length, deleted: toDeleteIds.length };
}

// larkUsers has no field that's guaranteed both present and unique on every row (EID is blank
// for placeholder/role accounts), so it keeps the simpler wipe-and-recreate approach — its much
// smaller row count has never come close to the execution time limit.
async function refreshLarkUsers() {
  const [liveItems, existingSnapshot] = await Promise.all([
    fetchSourceRecords('larkUsers'),
    fetchSourceRecords('snapshotLarkUsers'),
  ]);
  const fields = SOURCES.larkUsers.fields;
  const flatRows = liveItems.map((item) => {
    const row = {};
    fields.forEach((f) => { row[f] = extractText(item.fields[f]) || ''; });
    return row;
  });
  await createSourceRecords('snapshotLarkUsers', flatRows);
  await deleteSourceRecords('snapshotLarkUsers', existingSnapshot.map((r) => r.record_id));
  return { total: flatRows.length };
}

// A structures row with is_active explicitly "No" is a retired org unit — excluded from the
// snapshot entirely rather than carried through and filtered later at display time, so a
// refresh actually drops it (and any snapshot row for it from a previous, still-active refresh).
// A blank/missing is_active is treated as active, matching buildOrgData's own is_active check.
function isActiveStructureRow(item) {
  return extractText((item.fields || {}).is_active) !== 'No';
}

async function refreshSnapshot() {
  const [structures, employees, larkUsers] = await Promise.all([
    refreshOneDiff('structures', 'snapshotStructures', 'leaf_dept_id', isActiveStructureRow),
    refreshOneDiff('employees', 'snapshotEmployees', 'EID'),
    refreshLarkUsers(),
  ]);
  return { structures, employees, larkUsers };
}

module.exports = { refreshSnapshot };
