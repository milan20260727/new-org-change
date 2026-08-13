// The three Base tables this tool reads, per the URL the user gave us:
// https://digiplus.sg.larksuite.com/base/MzgobsHp5a7513s58H4lxtWIgUg
//
// Note: this is a DIFFERENT Base from the one org-chart-live reads — we're
// only reusing that project's Lark *app* (its registered App ID/Secret) for
// login, not its data source. The app needs to be added as a collaborator on
// *this* Base for the API calls below to succeed (Base owner does this once,
// from the Base's share settings).

const BASE_TOKEN = 'MzgobsHp5a7513s58H4lxtWIgUg';

// Hierarchy order (broad -> narrow), matching how we've matched these two
// tables against each other all session: BIPO uses Division/Business Unit/
// Department/Team/Sub Team/Section; Lark Structures uses L1_dept..L6_dept
// for the same six levels.
const EMPLOYEE_LEVELS = ['Division', 'Business Unit', 'Department', 'Team', 'Sub Team', 'Section'];
const STRUCTURE_LEVELS = ['L1_dept', 'L2_dept', 'L3_dept', 'L4_dept', 'L5_dept', 'L6_dept'];

const SOURCES = {
  employees: {
    key: 'employees',
    tableId: 'tblaCDZlC44WW5Jy', // "Employee list" (BIPO roster)
    fields: [
      'EID', 'Employee Name', 'Status',
      ...EMPLOYEE_LEVELS,
      'HRBP1', 'HRBP2', 'Department Assistant', 'Immediate Supervisor',
    ],
  },
  structures: {
    key: 'structures',
    tableId: 'tbl6KxXosXiVsALa', // "Lark Structures"
    fields: ['leaf_dept_id', 'L0_company', ...STRUCTURE_LEVELS, 'leaf_dept', 'PIC', 'is_active', 'depth', 'HRBP1', 'HRBP2', 'HRBP Lead', 'Department Assistant'],
  },
  larkUsers: {
    key: 'larkUsers',
    tableId: 'tblXYUV5vrzRHYAQ', // "Lark User" — role pickers (PIC/HRBP/Dept. Assistant) only draw from here
    fields: ['EID', 'Name', 'status'],
  },
  permissions: {
    key: 'permissions',
    tableId: 'tblX2q2qFshb3Hu0', // "Tool Permissions" — who can view/edit/admin this tool
    fields: ['OpenID', 'Name', 'Email', 'Role'],
  },
  settings: {
    key: 'settings',
    tableId: 'tbleQiLI1Q2mF0Rr', // "Tool Settings" — single-row table of tool-wide config (currently just the edit window)
    // Stored as plain datetime-local strings (e.g. "2026-08-20T09:00"), not a native Bitable
    // date field, so there's no server-timezone conversion to reason about: the browser reads
    // back exactly what an admin typed and compares it to its own local clock.
    // Last Change Log Export At is a plain millisecond-epoch string (same "no native date field"
    // pattern as EditedAt below) — the high-water mark past which the next archive-to-Base click
    // only picks up genuinely new changes, instead of re-writing everything every time.
    fields: ['Edit Window Start', 'Edit Window End', 'Last Change Log Export At'],
  },
  changelog: {
    key: 'changelog',
    tableId: 'tblp5Iix9McrBLJF', // "Change Log" — append-only, shared across everyone's local sessions so edits
    // become visible to other users on demand (via the "refresh edits" button), without any
    // of this feeding into a given session's own CSV export (which still only reflects that
    // session's own local plan, since only it has the live node state to build correct diffs).
    // Params is the log entry's params object serialized as JSON text; EditedAt is a plain
    // millisecond-epoch string (matches the "no native date field" pattern used by `settings`).
    fields: ['TypeKey', 'Key', 'Params', 'Editor', 'EditedAt'],
  },
  // Frozen mirrors of the three tables above — /api/org-data reads from these, not the live
  // tables, so the org chart only changes when an admin explicitly clicks "刷新数据" (which wipes
  // and rewrites these from the live tables first). Every field is plain text, holding whatever
  // extractText() already normalizes the live value down to — sidesteps needing to reproduce the
  // live tables' richer field types (user links, selects, etc.) here.
  snapshotEmployees: {
    key: 'snapshotEmployees',
    tableId: 'tblQXSpgzuMYcaVt', // "Snapshot Employees"
    fields: ['EID', 'Employee Name', 'Status', ...EMPLOYEE_LEVELS, 'HRBP1', 'HRBP2', 'Department Assistant', 'Immediate Supervisor'],
  },
  snapshotStructures: {
    key: 'snapshotStructures',
    tableId: 'tblgbvs9xN8Pc2wa', // "Snapshot Structures"
    fields: ['leaf_dept_id', 'L0_company', ...STRUCTURE_LEVELS, 'leaf_dept', 'PIC', 'is_active', 'depth', 'HRBP1', 'HRBP2', 'HRBP Lead', 'Department Assistant'],
  },
  snapshotLarkUsers: {
    key: 'snapshotLarkUsers',
    tableId: 'tblAppgBWQ4hhzcQ', // "Snapshot Lark Users"
    fields: ['EID', 'Name', 'status'],
  },
  // Permanent, human-facing archive of applied changes — distinct from `changelog` above, which
  // is just the live cross-session working history. An admin explicitly archives into these via
  // the "写入变更记录" button, which only sends rows newer than settings' watermark field.
  orgChangeLog: {
    key: 'orgChangeLog',
    tableId: 'tbleOt0mDuQZOhCr', // "Org change log"
    fields: ['Change Type', 'Role Change', 'Org Unit Before', 'PIC Before', 'HRBP1 Before', 'HRBP2 Before', 'HRBP Lead Before', 'Assistant Before',
      'Org Unit After', 'PIC After', 'HRBP1 After', 'HRBP2 After', 'HRBP Lead After', 'Assistant After', 'Edit Date'],
  },
  employeeChangeLog: {
    key: 'employeeChangeLog',
    tableId: 'tblsUYScX2hgmhnZ', // "Employee change log" — EID is a native number field here, unlike everywhere else
    fields: ['EID', 'Name', 'Org Change', 'Role Change', 'Org Before', 'Reports-to Before', 'HRBP1 Before', 'HRBP2 Before', 'HRBP Lead Before', 'Assistant Before',
      'Org After', 'Reports-to After', 'HRBP1 After', 'HRBP2 After', 'HRBP Lead After', 'Assistant After', 'Notes', 'Edit Date'],
  },
};

module.exports = { BASE_TOKEN, SOURCES, EMPLOYEE_LEVELS, STRUCTURE_LEVELS };
