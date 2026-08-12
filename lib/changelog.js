// Shared, append-only mirror of everyone's local change log, stored in the "Change Log" Base
// table so edits become visible to other users on demand (see api/changelog/*). This never
// feeds a session's own CSV export — only that session's local `log` does, since the export's
// before/after diffs need live local node state that a foreign entry can't safely provide.
const { fetchSourceRecords, createSourceRecord } = require('./fetchLark');
const { extractText } = require('./buildOrgData');

async function listChangeLog() {
  const items = await fetchSourceRecords('changelog');
  return items.map((item) => {
    let params = {};
    try {
      params = JSON.parse(extractText(item.fields.Params) || '{}');
    } catch {
      params = {};
    }
    return {
      recordId: item.record_id,
      typeKey: extractText(item.fields.TypeKey) || '',
      key: extractText(item.fields.Key) || null,
      params,
      by: extractText(item.fields.Editor) || '',
      time: Number(extractText(item.fields.EditedAt)) || null,
    };
  });
}

async function appendChangeLogEntry({ typeKey, key, params, by, time }) {
  const record = await createSourceRecord('changelog', {
    TypeKey: typeKey || '',
    Key: key || '',
    Params: JSON.stringify(params || {}),
    Editor: by || '',
    EditedAt: String(time || Date.now()),
  });
  return record.record_id;
}

module.exports = { listChangeLog, appendChangeLogEntry };
