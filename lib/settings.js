// Tool-wide config, stored in the single-row "Tool Settings" Base table (same "no redeploy
// needed" philosophy as lib/permissions.js). Currently just the edit window.
const { fetchSourceRecords, createSourceRecord, updateSourceRecord } = require('./fetchLark');
const { extractText } = require('./buildOrgData');

async function getEditWindow() {
  const items = await fetchSourceRecords('settings');
  const row = items[0];
  if (!row) return { recordId: null, start: null, end: null };
  return {
    recordId: row.record_id,
    start: extractText(row.fields['Edit Window Start']),
    end: extractText(row.fields['Edit Window End']),
  };
}

// start/end are datetime-local strings (e.g. "2026-08-20T09:00") or null to clear.
async function setEditWindow(start, end) {
  const items = await fetchSourceRecords('settings');
  const row = items[0];
  const fields = { 'Edit Window Start': start || null, 'Edit Window End': end || null };
  if (row) {
    await updateSourceRecord('settings', row.record_id, fields);
  } else {
    await createSourceRecord('settings', fields);
  }
}

module.exports = { getEditWindow, setEditWindow };
