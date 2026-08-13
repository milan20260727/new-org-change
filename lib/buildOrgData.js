// Pure, side-effect-free transform: raw Bitable rows from the three source
// tables -> the flat {nodes, employees, personPool} shape the front end
// operates on. Kept separate from fetchLark.js so it can be unit-tested
// without hitting the network.
//
// Field values may arrive in several raw Bitable shapes depending on whether
// the field is a direct column or a formula/lookup wrapping one:
//   - plain string / number
//   - array of {text} text segments (direct text field)
//   - array of {id, name} user objects (direct user field)
//   - { type, value: [...] } formula/lookup wrapper — unwrap recursively

function extractText(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value.trim() || null;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    const text = value
      .map((seg) => {
        if (typeof seg === 'string') return seg;
        if (typeof seg === 'number') return String(seg);
        if (seg && typeof seg.text === 'string') return seg.text;
        if (seg && typeof seg.name === 'string') return seg.name;
        return '';
      })
      .join('')
      .trim();
    return text || null;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value.value)) return extractText(value.value);
    if (typeof value.text === 'string') return value.text.trim() || null;
  }
  return null;
}

function normOne(s) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

// BIPO's department fields and Lark Structures' node names don't always
// agree — confirmed as pure naming-convention drift (not real data errors)
// for these specific pairs in the department-name audit done earlier this
// session. Anything not in this list is left as a plain case/whitespace
// normalization; a genuine mismatch (e.g. a department that's actually
// misfiled) is intentionally NOT papered over here — it should surface as
// an unmatched/shallow-matched employee instead of silently disappearing.
const NAME_SYNONYMS = [
  ['investor relations corp comms and sustainability', 'investor relations corporate communications and sustainability'],
  ['employee relations compliance and osh', 'employee relations compliance and occupational safety and health'],
];
function canonicalName(s) {
  const n = normOne(s);
  for (let i = 0; i < NAME_SYNONYMS.length; i += 1) {
    if (NAME_SYNONYMS[i][0] === n || NAME_SYNONYMS[i][1] === n) return NAME_SYNONYMS[i][1];
  }
  return n;
}

const STRUCTURE_LEVELS = ['L1_dept', 'L2_dept', 'L3_dept', 'L4_dept', 'L5_dept', 'L6_dept'];
const EMPLOYEE_LEVELS = ['Division', 'Business Unit', 'Department', 'Team', 'Sub Team', 'Section'];

const ROOT_ID = 'root';
const UNASSIGNED_ID = 'unassigned';

function pathOf(fields, levels) {
  const path = [];
  for (let i = 0; i < levels.length; i += 1) {
    const name = extractText(fields[levels[i]]);
    if (!name) break; // these two sources are contiguous top-down, no gaps expected
    path.push(name);
  }
  return path;
}

// Lark Structures actually has two L0_company roots — "DigiPlus" (everything
// operational) and "Board of Directors" (the board's own committees/office,
// e.g. Audit Committee, Office of the Board of Directors). The "DigiPlus" side
// is left flattened onto the synthetic root exactly as before; the "Board of
// Directors" side gets that name prepended so it becomes a real node with its
// own leaf_dept_id/PIC row, and its L1_dept committees nest under it instead of
// sitting as flat siblings of Central/Operations/etc. This also lets employees
// whose BIPO Division is literally "Board of Directors" (with Business Unit
// e.g. "Office of the Board of Directors") resolve instead of landing in
// Unassigned.
function structurePathOf(fields) {
  const company = extractText(fields.L0_company);
  const path = company === 'Board of Directors' ? ['Board of Directors'] : [];
  for (let i = 0; i < STRUCTURE_LEVELS.length; i += 1) {
    const name = extractText(fields[STRUCTURE_LEVELS[i]]);
    if (!name) break;
    path.push(name);
  }
  return path;
}

function buildOrgData(input) {
  const structureItems = input.structureItems;
  const employeeItems = input.employeeItems;
  const larkUserItems = input.larkUserItems;

  // ---- 1. index each structure row's OWN full path -> {id, pic, roles, inactive} ----
  // Every org unit that exists as an addressable thing (even ones with
  // children of their own) gets its own row with its own leaf_dept_id in
  // this table — confirmed against the real data earlier this session.
  // PIC/HRBP1/HRBP2/HRBP Lead/Department Assistant all live directly on this row now
  // (HRBP*/Assistant are lookups into "HOD & HRBP List") — read straight from here,
  // not derived from whichever employees happen to be assigned to the unit.
  const ownRowByPath = {};
  const allPathKeys = [];
  structureItems.forEach((item) => {
    const f = item.fields || {};
    const path = structurePathOf(f);
    if (!path.length) return;
    const id = extractText(f.leaf_dept_id);
    if (!id) return;
    const key = JSON.stringify(path);
    allPathKeys.push(key);
    ownRowByPath[key] = {
      id: id,
      pic: extractText(f.PIC) || '',
      hrbp1: extractText(f.HRBP1) || '',
      hrbp2: extractText(f.HRBP2) || '',
      hrbpLead: extractText(f['HRBP Lead']) || '',
      da: extractText(f['Department Assistant']) || '',
      inactive: extractText(f.is_active) === 'No',
    };
  });

  // ---- 2. materialize a flat node array: one per distinct path, plus every ancestor ----
  const nodesByKey = {};
  let synthCounter = 0;

  function ensureNode(path) {
    const key = JSON.stringify(path);
    if (nodesByKey[key]) return nodesByKey[key];
    const parentPath = path.slice(0, -1);
    const parentNode = path.length ? ensureNode(parentPath) : null;
    const own = ownRowByPath[key];
    const node = {
      id: path.length === 0 ? ROOT_ID : (own ? own.id : 'synth-' + (synthCounter++)),
      name: path.length === 0 ? 'DigiPlus' : path[path.length - 1],
      parentId: parentNode ? parentNode.id : null,
      pic: path.length === 0 ? 'Tommy' : (own ? own.pic : ''),
      inactive: own ? own.inactive : false,
      hrbp1: own ? own.hrbp1 : '', hrbp2: own ? own.hrbp2 : '', hrbpLead: own ? own.hrbpLead : '', da: own ? own.da : '',
    };
    nodesByKey[key] = node;
    return node;
  }

  ensureNode([]); // root, always present even if nothing else resolves
  allPathKeys.forEach((key) => ensureNode(JSON.parse(key)));

  const rootNode = nodesByKey[JSON.stringify([])];

  // Level-by-level descent, matching by canonicalized name at each step —
  // more robust than matching the whole remaining path as one string, because
  // a mismatch at one level (e.g. Business Unit) only stops the descent right
  // there instead of invalidating every deeper level too.
  const childrenByParent = {};
  Object.keys(nodesByKey).forEach((key) => {
    const node = nodesByKey[key];
    if (node.parentId === null) return;
    if (!childrenByParent[node.parentId]) childrenByParent[node.parentId] = [];
    childrenByParent[node.parentId].push({ canonical: canonicalName(node.name), node: node });
  });

  function findNodeForPath(path) {
    let current = rootNode;
    let matchedAny = false;
    for (let i = 0; i < path.length; i += 1) {
      const kids = childrenByParent[current.id] || [];
      const segCanon = canonicalName(path[i]);
      let match = null;
      for (let j = 0; j < kids.length; j += 1) {
        if (kids[j].canonical === segCanon) { match = kids[j]; break; }
      }
      if (!match) break;
      current = match.node;
      matchedAny = true;
    }
    return matchedAny ? current : null;
  }

  // ---- 3. employees: match each to a node ----
  const employees = [];
  let unmatchedCount = 0;
  employeeItems.forEach((item) => {
    const f = item.fields || {};
    if (extractText(f.Status) !== 'Active') return;
    const eid = extractText(f.EID);
    const name = extractText(f['Employee Name']);
    if (!eid || !name) return;

    const path = pathOf(f, EMPLOYEE_LEVELS);
    const node = path.length ? findNodeForPath(path) : null;
    const nodeId = node ? node.id : UNASSIGNED_ID;
    if (!node) unmatchedCount += 1;

    const reportsTo = extractText(f['Immediate Supervisor']) || '';

    // Raw Employee list columns, carried through as-is for the Unassigned view —
    // HR wants to see exactly what Base has on file, not a re-derived summary.
    // (This HRBP1/HRBP2/HRBP Lead is the employee's own record, separate from the
    // org-unit-level roles above that now come straight from Lark Structures.)
    employees.push({
      eid: eid, name: name, nodeId: nodeId, reportsTo: reportsTo,
      division: extractText(f['Division']) || '',
      businessUnit: extractText(f['Business Unit']) || '',
      department: extractText(f['Department']) || '',
      team: extractText(f['Team']) || '',
      subTeam: extractText(f['Sub Team']) || '',
      section: extractText(f['Section']) || '',
      status: extractText(f.Status) || '',
      hrbp1: extractText(f.HRBP1) || '', hrbp2: extractText(f.HRBP2) || '', hrbpLead: extractText(f['HRBP Lead']) || '',
    });
  });

  const nodes = Object.keys(nodesByKey).map((key) => nodesByKey[key]);
  if (unmatchedCount > 0) {
    nodes.push({
      id: UNASSIGNED_ID,
      name: 'Unassigned / 未匹配部门',
      parentId: ROOT_ID,
      pic: '', hrbp1: '', hrbp2: '', hrbpLead: '', da: '',
      inactive: false,
    });
  }

  // ---- 3.5. drop inactive units from the chart (and everything nested under them —
  // a retired department has no reason to keep showing its sub-units either) ----
  const inactiveIds = new Set(nodes.filter((n) => n.inactive).map((n) => n.id));
  let grew = true;
  while (grew) {
    grew = false;
    nodes.forEach((n) => {
      if (n.parentId && inactiveIds.has(n.parentId) && !inactiveIds.has(n.id)) {
        inactiveIds.add(n.id);
        grew = true;
      }
    });
  }
  const visibleNodes = nodes.filter((n) => !inactiveIds.has(n.id));
  const visibleIds = new Set(visibleNodes.map((n) => n.id));

  let inactiveReassigned = 0;
  employees.forEach((e) => {
    if (!visibleIds.has(e.nodeId)) {
      e.nodeId = UNASSIGNED_ID;
      inactiveReassigned += 1;
    }
  });
  if (inactiveReassigned > 0 && !visibleIds.has(UNASSIGNED_ID)) {
    visibleNodes.push({
      id: UNASSIGNED_ID,
      name: 'Unassigned / 未匹配部门',
      parentId: ROOT_ID,
      pic: '', hrbp1: '', hrbp2: '', hrbpLead: '', da: '',
      inactive: false,
    });
    visibleIds.add(UNASSIGNED_ID);
  }

  // ---- 4. person pool for role pickers — Lark User identities only ----
  const seenNames = {};
  const personPool = [];
  larkUserItems.forEach((item) => {
    const name = extractText((item.fields || {}).Name);
    if (name && !seenNames[name]) { seenNames[name] = true; personPool.push(name); }
  });
  personPool.sort();

  return {
    nodes: visibleNodes,
    employees: employees,
    personPool: personPool,
    rootId: ROOT_ID,
    unassignedId: visibleIds.has(UNASSIGNED_ID) ? UNASSIGNED_ID : null,
    generatedAt: new Date().toISOString(),
    counts: {
      structureRows: structureItems.length,
      employeeRows: employeeItems.length,
      unmatchedEmployees: unmatchedCount,
      inactiveReassignedEmployees: inactiveReassigned,
    },
  };
}

module.exports = { buildOrgData: buildOrgData, extractText: extractText, ROOT_ID: ROOT_ID, UNASSIGNED_ID: UNASSIGNED_ID };
