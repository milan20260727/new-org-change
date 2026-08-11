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
    fields: ['leaf_dept_id', 'L0_company', ...STRUCTURE_LEVELS, 'leaf_dept', 'PIC', 'is_active', 'depth'],
  },
  larkUsers: {
    key: 'larkUsers',
    tableId: 'tblXYUV5vrzRHYAQ', // "Lark User" — role pickers (PIC/HRBP/Dept. Assistant) only draw from here
    fields: ['EID', 'Name', 'status'],
  },
};

module.exports = { BASE_TOKEN, SOURCES, EMPLOYEE_LEVELS, STRUCTURE_LEVELS };
