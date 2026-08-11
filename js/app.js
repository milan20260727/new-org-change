(function(){

  // ---------- i18n ----------
  var LANG = 'zh';
  var STR = {
    zh: {
      loginTitle:'组织架构调整工具', loginSubtitle:'需要登录后才能查看组织架构与员工数据',
      loginBtnText:'使用飞书账号登录', loginBtnTextLoading:'登录中…',
      noAccessTitle:'暂无访问权限', noAccessSubtitle:'你的飞书账号还没有被授权使用这个工具，请联系管理员开通访问权限。',
      viewAdmin:'管理员', adminTitle:'管理员',
      adminEmailPh:'邮箱', adminNamePh:'姓名（可选）', adminAddBtn:'添加',
      adminColEmail:'邮箱', adminColRole:'角色',
      roleOwner:'最高管理员', roleSeniorAdmin:'高级管理员', roleEditor:'编辑用户', roleViewer:'访问用户',
      adminLoading:'加载中…', adminNoUsers:'还没有添加任何用户',
      adminTransferOwnerBtn:'转为最高管理员', adminRemoveBtn:'移除',
      adminRemoveConfirm:'确定要移除该用户的访问权限吗？', adminTransferOwnerConfirm:'确定要把最高管理员身份转移给该用户吗？转移后你会变成高级管理员。',
      adminSaved:'已保存', adminNeedEmail:'请填写邮箱', adminOnlyOwnerGrantsSenior:'只有最高管理员能设置高级管理员',
      pageTitle:'组织架构调整工具',
      scopeTag:'正在加载组织数据…',
      scopeTagLoaded:function(p){ return '共 ' + p.nodeCount + ' 个组织节点 · ' + p.empCount + ' 名在职员工 · 数据来自 Lark Base'; },
      loggedInAs:'已登录：', logoutBtn:'退出',
      snapshotLabel:'数据快照时间：', refreshBtn:'刷新数据', refreshBtnLoading:'刷新中…',
      searchPlaceholder:'搜索组织架构名称…', focusPrefix:'聚焦于「', focusSuffix:'」',
      globalTransferBtn:'转移员工', addOrgBtn:'新增组织架构', viewChart:'组织架构图', viewUnassigned:'待安置员工',
      expandAllBtn:'全部展开', collapseAllBtn:'全部折叠', expandTitle:'展开', collapseTitle:'折叠',
      zoomInTitle:'放大', zoomOutTitle:'缩小',
      orientLabel:'查看方向', orientVertical:'纵向', orientHorizontal:'横向',
      langLabel:'语言', downloadPngBtn:'下载组织架构图（PNG）',
      legendNew:'新增', legendDelete:'删除', legendMoved:'移动', legendGhost:'影子（原位置）', legendRenamed:'已改名', legendRoleWarn:'⚠ 角色不一致',
      changeLogTitle:'变更记录', unitRecords:'条', colType:'类型', colDetail:'详情', colAction:'操作', undoBtn:'撤销',
      logEmptyNote:'暂无变更，点一个部门框试试', copyLogBtn:'复制变更（可直接粘贴到 Base）', downloadCsvBtn:'下载 CSV',
      affectedEmpTitle:'受影响员工', unitPeople:'人', colName:'姓名', colPathChange:'原部门 → 新部门', colReportsTo:'汇报对象',
      colDivision:'Division', colBusinessUnit:'Business Unit', colDepartment:'Department', colTeam:'Team', colSubTeam:'Sub Team', colSection:'Section', colStatus:'Status', colHrbpLead:'HRBP Lead',
      empEmptyNote:'还没有员工受影响', copyEmpBtn:'复制员工变更（可直接粘贴到 Base）',
      unassignedTitle:'待安置员工', unassignedEmptyNote:'暂无待安置员工', unassignedTransferBtn:'转移',
      addChildTitle:'新增子部门', tabStructure:'编辑类型', tabRole:'变更角色', tabRoster:'下辖员工名单',
      transferModalTitle:'转移员工', fieldEmployee:'员工', searchEmpPlaceholder:'搜索姓名或 EID…',
      fieldTargetOrg:'目标组织架构', searchOrgPlaceholder:'搜索目标部门…', cancelBtn:'取消', confirmTransferBtn:'确认转移',
      reportPromptTitle:'是否同步更新汇报关系？', skipBtn:'保持不变', applyReportBtn:'更新汇报对象',

      empty:'（空）', notSet:'未设置', changeBtn:'更改', reselectBtn:'重选', closeBtn:'关闭',
      newTag:'新增', renamedTag:'已改名', movedTag:'已移动', inactiveTag:'既有停用',
      renamedTooltipPrefix:'原名：', roleWarnTooltip:'下级部门角色不一致或未设置',
      picPrefix:'PIC：', headcountLabel:function(n){ return '在职 ' + n + ' 人'; },
      movedToLabel:function(name){ return '→ 已移至「' + name + '」'; },
      focusLabel:function(name){ return '聚焦于「' + name + '」'; },
      selectAllLabel:function(n){ return '全选（' + n + ' 人）'; },
      transferSelectedBtn:function(n){ return '转移已选员工（' + n + '）'; },
      reportsToPrefix:' · 汇报对象：',
      nowAtPrefix:' — 现在：',
      matchLabel:function(eid){ return eid; },

      dragHint:function(name){ return '提示：也可以直接在图上把「' + name + '」拖到目标部门上完成移动。'; },
      renameLbl:'重命名', renameInputPh:'新名称',
      moveLbl:'移动', movePlaceholder:'选择目标上级部门…', moveHint:'下拉列表已排除自身及其所有子部门，避免循环嵌套。',
      deleteLbl:'删除该部门', deleteBlocked:function(n){ return '下面还有 ' + n + ' 个子部门，需先移动或删除它们才能删除本部门。'; },
      deleteHint:'删除后仍会以红色显示在图中，并保留在变更记录里。与重命名/移动互斥。',
      reassignTitle:function(n){ return '删除前需要为以下 ' + n + ' 名员工安置新部门'; },
      bulkTargetPlaceholder:'批量选择目标部门…', bulkApplyBtn:'全部转移到此', assignTargetPlaceholder:'选择新部门…',
      saveBtn:'保存', createBtn:'创建', createTitle:'新增子部门', createUnder:function(name){ return '新增于「' + name + '」下'; },
      createNamePh:'新部门名称',

      roleWarnHeader:'⚠ 下级部门角色需要核查：', roleOkBox:'✓ 该分支下的 HRBP / Department Assistant 设置一致。',
      roleDiffers:'下级部门取值不一致', roleBlank:'存在未设置（空值）',
      cascadeBtn:'应用到所有下级部门（HRBP1/HRBP2/HRBP Lead/Dept. Assistant）',
      rosterEmptyNote:'该部门目前没有直属员工。', rosterTargetPlaceholder:'转移目标部门…',
      pickerSearchPh:'从 Lark User 中搜索姓名…', clearRoleOption:'清空该角色', noMatchResult:'无匹配结果', noMatchDept:'无匹配部门', noMatchEmp:'无匹配员工',

      toastDeleteBlockedChildren:'无法删除：请先处理子部门',
      toastDeleteBlockedEmp:function(n){ return '还有 ' + n + ' 名员工尚未安置新部门'; },
      toastDeleted:'已标记删除', toastNothingToSave:'没有可保存的变更', toastSaved:'已保存变更',
      toastNeedName:'请填写新部门名称', toastAdded:'已新增部门',
      toastNameDuplicate:'该名称已存在，请换一个', toastNameInvalidChars:'名称不能包含特殊符号（如 & - 等），只能使用文字、数字和空格',
      toastPickBulkTarget:'请先选择批量目标部门', toastCascaded:'已应用到所有下级部门',
      toastPickTransferTarget:'请先选择转移目标部门', toastTransferredN:function(n){ return '已转移 ' + n + ' 名员工'; },
      toastUndoDeleted:'已撤销删除', toastMovePending:'已选定目标，点击"保存"确认这次移动',
      toastCopied:'已复制，可直接粘贴到 Base', toastCopyFailed:'复制失败，请改用下载',
      toastReportUpdated:'已更新汇报对象', toastTransferredName:function(name){ return '已转移 ' + name; },
      toastPngFailed:'导出失败，请改用浏览器自带的截图功能', toastPngDone:'已下载 PNG',
      toastPngError:function(msg){ return '导出失败：' + msg; },
      deletedPanelNote:'该部门已标记删除。删除时涉及的员工已安置到其他部门；撤销删除会把他们迁回来。',
      undoDeleteBtn:'撤销删除',

      reportPromptText:function(p){ return '「' + p.dept + '」已移动到「' + p.parent + '」下。是否把负责人「' + p.pic + '」的直属汇报对象，从「' + (p.from||STR.zh.empty) + '」改为「' + p.to + '」？'; },

      role_pic:'PIC', role_hrbp1:'HRBP1', role_hrbp2:'HRBP2', role_hrbpLead:'HRBP Lead', role_da:'Department Assistant',

      logType:{ rename:'重命名', move:'移动', add:'新增', emp_transfer:'员工调动', delete:'删除', undo_delete:'撤销删除', role_change:'角色变更', role_cascade:'角色批量应用', report_change:'汇报关系变更' },
      logDetail:{
        rename: function(p){ return '「' + p.from + '」→「' + p.to + '」'; },
        move: function(p){ return p.name + '：「' + p.from + '」→「' + p.to + '」'; },
        add: function(p){ return '「' + p.name + '」新增于「' + p.parent + '」下' + (p.roleBits.length ? '（' + p.roleBits.join('，') + '）' : ''); },
        emp_transfer: function(p){ return p.name + '（' + p.eid + '）：「' + p.from + '」→「' + p.to + '」'; },
        delete: function(p){ return '「' + p.name + '」（原上级：' + p.parent + (p.empCount ? '，' + p.empCount + ' 名员工已安置新部门' : '') + '）'; },
        undo_delete: function(p){ return '「' + p.name + '」已恢复' + (p.restored ? '，' + p.restored + ' 名员工已迁回原部门' : ''); },
        role_change: function(p){ return '「' + p.name + '」' + p.roleLabel + '：' + (p.from || STR.zh.empty) + ' → ' + (p.to || STR.zh.empty); },
        role_cascade: function(p){ return '将「' + p.name + '」的 HRBP1/HRBP2/Department Assistant 应用到 ' + p.count + ' 个下级部门'; },
        report_change: function(p){ return p.name + '：直属主管 ' + (p.from || STR.zh.empty) + ' → ' + p.to; }
      },
      csvOrgChangeHeaders:['变更类型','角色变动','变更前的组织架构名','变更前PIC','变更前HRBP1','变更前HRBP2','变更前HRBP Lead','变更前Assistant','变更后的组织架构名','变更后PIC','变更后HRBP1','变更后HRBP2','变更后HRBP Lead','变更后Assistant'],
      csvPersonnelHeaders:['EID','员工名','组织变更','角色变更','变更前的组织架构','变更前汇报对象','变更前PIC','变更前HRBP1','变更前HRBP2','变更前HRBP Lead','变更前Assistant','变更后组织架构','变更后汇报对象','变更后PIC','变更后HRBP1','变更后HRBP2','变更后HRBP Lead','变更后Assistant','备注'],
      csvOrgChangeFilename:'组织变更记录.csv', csvPersonnelFilename:'人员变更记录.csv',
      orgChangeLabel:'组织架构调整'
    },
    en: {
      loginTitle:'Org Structure Change Tool', loginSubtitle:'Sign in to view the org structure and employee data',
      loginBtnText:'Sign in with Lark', loginBtnTextLoading:'Signing in…',
      noAccessTitle:'No access yet', noAccessSubtitle:"Your Lark account hasn't been granted access to this tool yet — ask an admin to add you.",
      viewAdmin:'Admin', adminTitle:'Admin',
      adminEmailPh:'Email', adminNamePh:'Name (optional)', adminAddBtn:'Add',
      adminColEmail:'Email', adminColRole:'Role',
      roleOwner:'Owner', roleSeniorAdmin:'Senior Admin', roleEditor:'Editor', roleViewer:'Viewer',
      adminLoading:'Loading…', adminNoUsers:'No users added yet',
      adminTransferOwnerBtn:'Make Owner', adminRemoveBtn:'Remove',
      adminRemoveConfirm:"Revoke this user's access?", adminTransferOwnerConfirm:'Transfer Owner to this user? You will become a Senior Admin.',
      adminSaved:'Saved', adminNeedEmail:'Please enter an email', adminOnlyOwnerGrantsSenior:'Only the Owner can grant Senior Admin',
      pageTitle:'Org Structure Change Tool',
      scopeTag:'Loading org data…',
      scopeTagLoaded:function(p){ return p.nodeCount + ' org units · ' + p.empCount + ' active employees · live from Lark Base'; },
      loggedInAs:'Signed in as: ', logoutBtn:'Sign out',
      snapshotLabel:'Data snapshot: ', refreshBtn:'Refresh data', refreshBtnLoading:'Refreshing…',
      searchPlaceholder:'Search org unit name…', focusPrefix:'Focused on "', focusSuffix:'"',
      globalTransferBtn:'Transfer employee', addOrgBtn:'Add org unit', viewChart:'Org Chart', viewUnassigned:'Unassigned',
      expandAllBtn:'Expand All', collapseAllBtn:'Collapse All', expandTitle:'Expand', collapseTitle:'Collapse',
      zoomInTitle:'Zoom in', zoomOutTitle:'Zoom out',
      orientLabel:'Layout', orientVertical:'Vertical', orientHorizontal:'Horizontal',
      langLabel:'Language', downloadPngBtn:'Download chart (PNG)',
      legendNew:'New', legendDelete:'Deleted', legendMoved:'Moved', legendGhost:'Ghost (old spot)', legendRenamed:'Renamed', legendRoleWarn:'⚠ Role inconsistent',
      changeLogTitle:'Change log', unitRecords:'', colType:'Type', colDetail:'Detail', colAction:'Action', undoBtn:'Undo',
      logEmptyNote:'No changes yet — try clicking a department box', copyLogBtn:'Copy changes (paste directly into Base)', downloadCsvBtn:'Download CSV',
      affectedEmpTitle:'Affected employees', unitPeople:'', colName:'Name', colPathChange:'Old dept → New dept', colReportsTo:'Reports to',
      colDivision:'Division', colBusinessUnit:'Business Unit', colDepartment:'Department', colTeam:'Team', colSubTeam:'Sub Team', colSection:'Section', colStatus:'Status', colHrbpLead:'HRBP Lead',
      empEmptyNote:'No employees affected yet', copyEmpBtn:'Copy employee changes (paste directly into Base)',
      unassignedTitle:'Unassigned employees', unassignedEmptyNote:'No unassigned employees', unassignedTransferBtn:'Transfer',
      addChildTitle:'Add sub-department', tabStructure:'Edit type', tabRole:'Roles', tabRoster:'Team roster',
      transferModalTitle:'Transfer employee', fieldEmployee:'Employee', searchEmpPlaceholder:'Search by name or EID…',
      fieldTargetOrg:'Target org unit', searchOrgPlaceholder:'Search target department…', cancelBtn:'Cancel', confirmTransferBtn:'Confirm transfer',
      reportPromptTitle:'Sync the reporting line too?', skipBtn:'Leave as is', applyReportBtn:'Update reporting line',

      empty:'(empty)', notSet:'Not set', changeBtn:'Change', reselectBtn:'Change', closeBtn:'Close',
      newTag:'New', renamedTag:'Renamed', movedTag:'Moved', inactiveTag:'Inactive (Lark)',
      renamedTooltipPrefix:'Was: ', roleWarnTooltip:'Role inconsistent or unset among sub-departments',
      picPrefix:'PIC: ', headcountLabel:function(n){ return n + (n===1?' employee':' employees'); },
      movedToLabel:function(name){ return '→ moved to "' + name + '"'; },
      focusLabel:function(name){ return 'Focused on "' + name + '"'; },
      selectAllLabel:function(n){ return 'Select all (' + n + ')'; },
      transferSelectedBtn:function(n){ return 'Transfer selected (' + n + ')'; },
      reportsToPrefix:' · Reports to: ',
      nowAtPrefix:' — currently: ',
      matchLabel:function(eid){ return eid; },

      dragHint:function(name){ return 'Tip: you can also drag "' + name + '" onto a target department on the chart to move it.'; },
      renameLbl:'Rename', renameInputPh:'New name',
      moveLbl:'Move', movePlaceholder:'Choose a target parent department…', moveHint:'The list excludes this department and all of its sub-departments to avoid circular nesting.',
      deleteLbl:'Delete this department', deleteBlocked:function(n){ return 'There ' + (n===1?'is':'are') + ' still ' + n + ' sub-department(s) below — move or delete them first.'; },
      deleteHint:'Deleted items stay visible in red on the chart and remain in the change log. Mutually exclusive with rename/move.',
      reassignTitle:function(n){ return 'Reassign the following ' + n + ' employee(s) before deleting'; },
      bulkTargetPlaceholder:'Bulk-select a target department…', bulkApplyBtn:'Move all here', assignTargetPlaceholder:'Choose a new department…',
      saveBtn:'Save', createBtn:'Create', createTitle:'Add sub-department', createUnder:function(name){ return 'Adding under "' + name + '"'; },
      createNamePh:'New department name',

      roleWarnHeader:'⚠ Roles need review in sub-departments:', roleOkBox:'✓ HRBP / Department Assistant are consistent across this branch.',
      roleDiffers:'values differ among sub-departments', roleBlank:'not set somewhere (blank)',
      cascadeBtn:'Apply to all sub-departments (HRBP1/HRBP2/HRBP Lead/Dept. Assistant)',
      rosterEmptyNote:'No employees report directly to this department.', rosterTargetPlaceholder:'Transfer target department…',
      pickerSearchPh:'Search names from Lark User…', clearRoleOption:'Clear this role', noMatchResult:'No matches', noMatchDept:'No matching department', noMatchEmp:'No matching employee',

      toastDeleteBlockedChildren:'Cannot delete: please move or delete the sub-departments first',
      toastDeleteBlockedEmp:function(n){ return n + ' employee(s) still need a new department'; },
      toastDeleted:'Marked as deleted', toastNothingToSave:'No changes to save', toastSaved:'Changes saved',
      toastNeedName:'Please enter a department name', toastAdded:'Department added',
      toastNameDuplicate:'That name is already in use — pick another', toastNameInvalidChars:'Names can\'t contain special symbols (like & or -) — letters, numbers, and spaces only',
      toastPickBulkTarget:'Choose a bulk target department first', toastCascaded:'Applied to all sub-departments',
      toastPickTransferTarget:'Choose a transfer target department first', toastTransferredN:function(n){ return 'Transferred ' + n + ' employee(s)'; },
      toastUndoDeleted:'Deletion undone', toastMovePending:'Target selected — click "Save" to confirm the move',
      toastCopied:'Copied — paste directly into Base', toastCopyFailed:'Copy failed, please download instead',
      toastReportUpdated:'Reporting line updated', toastTransferredName:function(name){ return 'Transferred ' + name; },
      toastPngFailed:'Export failed — please use your browser’s screenshot tool instead', toastPngDone:'PNG downloaded',
      toastPngError:function(msg){ return 'Export failed: ' + msg; },
      deletedPanelNote:'This department is marked as deleted. Employees affected by this deletion were reassigned; undoing the deletion moves them back.',
      undoDeleteBtn:'Undo delete',

      reportPromptText:function(p){ return '"' + p.dept + '" moved under "' + p.parent + '". Update the reporting line for its PIC "' + p.pic + '" from "' + (p.from||STR.en.empty) + '" to "' + p.to + '"?'; },

      role_pic:'PIC', role_hrbp1:'HRBP1', role_hrbp2:'HRBP2', role_hrbpLead:'HRBP Lead', role_da:'Department Assistant',

      logType:{ rename:'Rename', move:'Move', add:'Add', emp_transfer:'Transfer', delete:'Delete', undo_delete:'Undo delete', role_change:'Role change', role_cascade:'Role cascade', report_change:'Reporting line' },
      logDetail:{
        rename: function(p){ return '"' + p.from + '" → "' + p.to + '"'; },
        move: function(p){ return p.name + ': "' + p.from + '" → "' + p.to + '"'; },
        add: function(p){ return '"' + p.name + '" added under "' + p.parent + '"' + (p.roleBits.length ? ' (' + p.roleBits.join(', ') + ')' : ''); },
        emp_transfer: function(p){ return p.name + ' (' + p.eid + '): "' + p.from + '" → "' + p.to + '"'; },
        delete: function(p){ return '"' + p.name + '" (previous parent: ' + p.parent + (p.empCount ? ', ' + p.empCount + ' employee(s) reassigned' : '') + ')'; },
        undo_delete: function(p){ return '"' + p.name + '" restored' + (p.restored ? ', ' + p.restored + ' employee(s) moved back' : ''); },
        role_change: function(p){ return '"' + p.name + '" ' + p.roleLabel + ': ' + (p.from || STR.en.empty) + ' → ' + (p.to || STR.en.empty); },
        role_cascade: function(p){ return 'Applied "' + p.name + '"’s HRBP1/HRBP2/Department Assistant to ' + p.count + ' sub-department(s)'; },
        report_change: function(p){ return p.name + ': direct manager ' + (p.from || STR.en.empty) + ' → ' + p.to; }
      },
      csvOrgChangeHeaders:['Change Type','Role Change','Org Unit Before','PIC Before','HRBP1 Before','HRBP2 Before','HRBP Lead Before','Assistant Before','Org Unit After','PIC After','HRBP1 After','HRBP2 After','HRBP Lead After','Assistant After'],
      csvPersonnelHeaders:['EID','Name','Org Change','Role Change','Dept Before','Reports-to Before','PIC Before','HRBP1 Before','HRBP2 Before','HRBP Lead Before','Assistant Before','Dept After','Reports-to After','PIC After','HRBP1 After','HRBP2 After','HRBP Lead After','Assistant After','Notes'],
      csvOrgChangeFilename:'org-change-record.csv', csvPersonnelFilename:'personnel-change-record.csv',
      orgChangeLabel:'Org structure adjusted'
    }
  };
  function t(key){ var v = STR[LANG][key]; return v===undefined ? key : v; }
  function roleLabelFor(field){ return t('role_' + field); }
  // CSV exports always ship in English, regardless of the UI language toggle.
  function ct(key){ var v = STR.en[key]; return v===undefined ? key : v; }
  function applyStaticI18n(){
    document.documentElement.lang = LANG==='zh' ? 'zh-CN' : 'en';
    document.title = t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(function(el){ el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){ el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el){ el.title = t(el.getAttribute('data-i18n-title')); });
    var loginBtnText = document.getElementById('loginBtnText');
    if(loginBtnText && !document.getElementById('loginCard').classList.contains('loading')) loginBtnText.textContent = t('loginBtnText');
  }

  // ---------- role (Owner/Senior Admin/Editor/Viewer, resolved server-side at login) ----------
  var currentUserRole = null;
  function canEdit(){ return currentUserRole==='Editor' || currentUserRole==='Senior Admin' || currentUserRole==='Owner'; }
  function isAdminRole(){ return currentUserRole==='Senior Admin' || currentUserRole==='Owner'; }

  // ---------- live data (fetched from /api/org-data, which reads Lark Base on every call) ----------
  var personPool = [];
  var rootId = 'root';

  var nodes, employees, log, selectedId, viewRootId, orientation, logSeq, tempCounter, dragSrcId, pendingEdit, activeTab, createDraft, rosterSelected, rosterBulkTarget, gmodalEmp, gmodalOrg, pendingReportPrompt, snapshotAt, unassignedId, unassignedTargets, collapsed, zoomPct;

  // ---------- local persistence ----------
  // Edits live only in this browser until exported — but a stray refresh (or closing the tab)
  // shouldn't discard them. Everything needed to resume is mirrored to localStorage after every
  // logged change; a real refetch (the "刷新数据" button) is the only thing that overwrites it.
  var STORAGE_KEY = 'orgChangeToolState_v1';
  function saveState(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rootId:rootId, nodes:nodes, employees:employees, log:log, logSeq:logSeq, tempCounter:tempCounter,
        viewRootId:viewRootId, orientation:orientation, unassignedId:unassignedId, personPool:personPool,
        snapshotAt: snapshotAt ? snapshotAt.toISOString() : null,
        collapsed: collapsed ? Array.from(collapsed) : [], zoomPct: zoomPct
      }));
    }catch(e){ /* storage unavailable/full — editing still works, just won't survive a refresh */ }
  }
  function loadSavedState(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }
  function clearSavedState(){
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
  }

  function hydrateNodes(rawNodes){
    return rawNodes.map(function(n){
      return {id:n.id, name:n.name, origName:n.name, parentId:n.parentId,
        inactive: !!n.inactive, movedFrom:null, restoreLog:null,
        pic:n.pic||'', hrbp1:n.hrbp1||'', hrbp2:n.hrbp2||'', hrbpLead:n.hrbpLead||'', da:n.da||'', origRoles:null,
        flags:{isNew:false, isDeleted:false, isRenamed:false}};
    });
  }

  function formatSnapshotTime(d){
    function pad(n){ return n<10 ? '0'+n : ''+n; }
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
  }

  function showLoadError(msg){
    document.getElementById('treeRoot').innerHTML = '';
    document.getElementById('adminSnapshotTime').textContent = '—';
    toast(msg);
  }

  // Fetches live data from Base. Resets any in-progress local edits (matches
  // the earlier "reset demo" behavior) — this now pulls real data each call,
  // it's not just re-stamping a frozen snapshot.
  function init(){
    var wrap = document.getElementById('treeWrap');
    wrap.style.opacity = '.4';
    return fetch('/api/org-data', {credentials:'same-origin'})
      .then(function(res){
        if(res.status===401){ showLoginOverlay(); throw new Error('not-authenticated'); }
        if(!res.ok) return res.json().then(function(j){ throw new Error(j.error||('HTTP '+res.status)); });
        return res.json();
      })
      .then(function(data){
        rootId = data.rootId || 'root';
        nodes = hydrateNodes(data.nodes);
        employees = data.employees.map(function(e){
          return {eid:e.eid, name:e.name, nodeId:e.nodeId, origPath: pathLabel(e.nodeId), reportsTo:e.reportsTo||'', origReportsTo:e.reportsTo||'',
            division:e.division||'', businessUnit:e.businessUnit||'', department:e.department||'', team:e.team||'', subTeam:e.subTeam||'', section:e.section||'',
            status:e.status||'', hrbp1:e.hrbp1||'', hrbp2:e.hrbp2||'', hrbpLead:e.hrbpLead||''};
        });
        personPool = data.personPool || [];
        unassignedId = data.unassignedId || null;
        unassignedTargets = {};
        // Default view: root + its direct children expanded, everything deeper starts
        // collapsed — a full company tree (hundreds of nodes) is unusable fully unrolled.
        collapsed = new Set(nodes.filter(function(n){ return depthOf(n.id) >= 2; }).map(function(n){ return n.id; }));
        zoomPct = 100;
        applyZoom();
        snapshotAt = new Date(data.generatedAt);
        log = [];
        selectedId = null;
        viewRootId = rootId;
        orientation = 'vertical';
        logSeq = 1;
        tempCounter = 1;
        dragSrcId = null;
        pendingEdit = null;
        createDraft = null;
        rosterSelected = {};
        rosterBulkTarget = '';
        pendingReportPrompt = null;
        activeTab = 'structure';
        document.getElementById('adminSnapshotTime').textContent = formatSnapshotTime(snapshotAt);
        document.getElementById('searchInput').value = '';
        document.getElementById('reportPromptOverlay').classList.remove('show');
        document.getElementById('orientSeg').querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-orient')==='vertical'); });
        switchView('chart');
        closePanel();
        closeGlobalTransfer();
        wrap.style.opacity = '';
        document.querySelector('.scope-tag').textContent = t('scopeTagLoaded')({nodeCount:nodes.length, empCount:employees.length});
        render();
        if(data.counts && data.counts.unmatchedEmployees){
          toast(LANG==='zh'
            ? data.counts.unmatchedEmployees + ' 名员工的部门在 Lark Structures 里找不到匹配，已归入"Unassigned"'
            : data.counts.unmatchedEmployees + ' employee(s) could not be matched to a Lark Structures department — filed under "Unassigned"');
        } else if(data.counts && data.counts.inactiveReassignedEmployees){
          toast(LANG==='zh'
            ? data.counts.inactiveReassignedEmployees + ' 名员工所属部门已停用（不在组织架构图上显示），已归入"Unassigned"'
            : data.counts.inactiveReassignedEmployees + ' employee(s) belonged to an inactive department (hidden from the chart) — filed under "Unassigned"');
        }
      })
      .catch(function(err){
        wrap.style.opacity = '';
        if(err.message!=='not-authenticated') showLoadError((LANG==='zh'?'加载失败：':'Load failed: ') + err.message);
      });
  }

  // Resumes exactly where a previous session left off — everything here was written by
  // saveState() after the last logged change, so no network round-trip is needed. Only a real
  // refetch (the "刷新数据" button, which calls init() instead) discards this and starts clean.
  function restoreState(saved){
    rootId = saved.rootId || 'root';
    nodes = saved.nodes || [];
    employees = saved.employees || [];
    personPool = saved.personPool || [];
    unassignedId = saved.unassignedId || null;
    unassignedTargets = {};
    collapsed = new Set(saved.collapsed || []);
    zoomPct = saved.zoomPct || 100;
    applyZoom();
    snapshotAt = saved.snapshotAt ? new Date(saved.snapshotAt) : new Date();
    log = saved.log || [];
    logSeq = saved.logSeq || 1;
    tempCounter = saved.tempCounter || 1;
    selectedId = null;
    viewRootId = saved.viewRootId || rootId;
    orientation = saved.orientation || 'vertical';
    dragSrcId = null;
    pendingEdit = null;
    createDraft = null;
    rosterSelected = {};
    rosterBulkTarget = '';
    pendingReportPrompt = null;
    activeTab = 'structure';
    document.getElementById('adminSnapshotTime').textContent = formatSnapshotTime(snapshotAt);
    document.getElementById('searchInput').value = '';
    document.getElementById('reportPromptOverlay').classList.remove('show');
    document.getElementById('orientSeg').querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-orient')===orientation); });
    switchView('chart');
    closePanel();
    closeGlobalTransfer();
    document.querySelector('.scope-tag').textContent = t('scopeTagLoaded')({nodeCount:nodes.length, empCount:employees.length});
    render();
  }

  function getNode(id){ for(var i=0;i<nodes.length;i++) if(nodes[i].id===id) return nodes[i]; return null; }
  function getChildren(id){ return nodes.filter(function(n){ return n.parentId===id; }); }
  function getGhosts(parentId){ return nodes.filter(function(n){ return n.movedFrom===parentId && n.parentId!==parentId; }); }
  function isDescendant(ancestorId, id){
    var n = getNode(id);
    while(n && n.parentId){
      if(n.parentId===ancestorId) return true;
      n = getNode(n.parentId);
    }
    return false;
  }
  function getDescendants(id){
    var out = [];
    getChildren(id).forEach(function(c){ out.push(c); out = out.concat(getDescendants(c.id)); });
    return out;
  }
  function directHeadcount(id){ return employees.filter(function(e){ return e.nodeId===id; }).length; }
  function rollupHeadcount(id){
    var ids = [id].concat(getDescendants(id).map(function(n){ return n.id; }));
    return employees.filter(function(e){ return ids.indexOf(e.nodeId)>=0; }).length;
  }
  function pathLabel(nodeId){
    var names = [], n = getNode(nodeId);
    while(n){ names.unshift(n.name); n = n.parentId ? getNode(n.parentId) : null; }
    return names.join(' / ');
  }
  function chainHasChange(nodeId){
    var n = getNode(nodeId);
    while(n){
      if(n.flags.isNew || n.flags.isDeleted || n.flags.isRenamed || n.movedFrom!==null) return true;
      n = n.parentId ? getNode(n.parentId) : null;
    }
    return false;
  }

  function roleInconsistency(id){
    var branch = [getNode(id)].concat(getDescendants(id));
    function check(field){
      var vals = branch.map(function(n){ return n[field] || ''; });
      var hasBlank = vals.some(function(v){ return !v; });
      var distinct = Array.from(new Set(vals));
      var differs = distinct.length > 1;
      return {bad: hasBlank || differs, hasBlank:hasBlank, differs:differs, values:vals};
    }
    return {hrbp1:check('hrbp1'), hrbp2:check('hrbp2'), hrbpLead:check('hrbpLead'), da:check('da')};
  }
  function hasAnyRoleWarning(id){
    if(getChildren(id).length===0) return false;
    var r = roleInconsistency(id);
    return r.hrbp1.bad || r.hrbp2.bad || r.hrbpLead.bad || r.da.bad;
  }

  // Log entries store a typeKey + structured params, formatted into display text at render
  // time via STR[LANG] — this is what lets the language toggle re-render existing history
  // correctly, instead of freezing whatever language was active when each entry was created.
  function addLog(typeKey, params, key){ log.push({seq:logSeq++, typeKey:typeKey, params:params||{}, key:key||null}); }
  // Rename / move / role-change are reversible within a session — upsertLog keeps exactly ONE
  // entry per (typeKey, key), always describing session-original → current, so undoing an edit
  // (or moving a department out and back) removes the noise instead of leaving a "process" trail.
  function upsertLog(typeKey, key, params){
    var existing = log.filter(function(l){ return l.typeKey===typeKey && l.key===key; })[0];
    if(existing) existing.params = params;
    else log.push({seq:logSeq++, typeKey:typeKey, params:params, key:key});
  }
  function removeLog(typeKey, key){ log = log.filter(function(l){ return !(l.typeKey===typeKey && l.key===key); }); }
  function removeAllLogsForNode(nodeId){
    log = log.filter(function(l){ return l.key!==nodeId && (typeof l.key!=='string' || l.key.indexOf(nodeId+'#')!==0); });
  }
  function formatLogType(entry){ return t('logType')[entry.typeKey] || entry.typeKey; }
  function formatLogDetail(entry){ var fn = t('logDetail')[entry.typeKey]; return fn ? fn(entry.params) : ''; }

  function toast(msg){
    var el = document.getElementById('toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(el._h);
    el._h = setTimeout(function(){ el.classList.remove('show'); }, 2600);
  }

  // ---------- commit helpers ----------
  // Rename / move / role fields upsert a single log line keyed to the node (and field, for roles),
  // always phrased as session-original → current. Reverting a change removes that line entirely,
  // so back-and-forth edits (move A→B→A, rename X→Y→X) show no net change instead of a process trail.
  // Letters (any script) + digits + spaces only — no &, -, /, punctuation. Rejects renaming to
  // a name already used elsewhere in the (non-deleted) tree, case-insensitive.
  var NAME_CHAR_RE = /^[\p{L}\p{N}\s]+$/u;
  function validateOrgName(val, excludeId){
    val = (val||'').trim();
    if(!val) return {ok:false, reason:'empty'};
    if(!NAME_CHAR_RE.test(val)) return {ok:false, reason:'invalid_chars'};
    var dup = nodes.some(function(x){ return x.id!==excludeId && !x.flags.isDeleted && x.name.toLowerCase()===val.toLowerCase(); });
    if(dup) return {ok:false, reason:'duplicate'};
    return {ok:true};
  }
  function toastNameError(reason){
    toast(reason==='duplicate' ? t('toastNameDuplicate') : t('toastNameInvalidChars'));
  }
  // Returns {ok, reason} rather than a bare boolean so the caller can tell "nothing to do"
  // apart from "rejected by validation" and show the right toast instead of clobbering it.
  function commitRename(n, val){
    val = (val||'').trim();
    if(!val || val===n.name) return {ok:false, reason:'nochange'};
    var check = validateOrgName(val, n.id);
    if(!check.ok) return {ok:false, reason:check.reason};
    if(!n.flags.isRenamed){ n.origName = n.name; n.flags.isRenamed = true; }
    n.name = val;
    if(n.name === n.origName){
      n.flags.isRenamed = false;
      removeLog('rename', n.id);
    } else {
      upsertLog('rename', n.id, {from:n.origName, to:n.name});
    }
    return {ok:true};
  }
  function commitMove(n, targetId){
    if(!targetId || targetId===n.parentId || targetId===n.id || isDescendant(n.id, targetId)) return false;
    if(n.movedFrom===null) n.movedFrom = n.parentId;
    n.parentId = targetId;
    if(n.parentId === n.movedFrom){
      n.movedFrom = null;
      removeLog('move', n.id);
    } else {
      upsertLog('move', n.id, {name:n.name, from:getNode(n.movedFrom).name, to:getNode(n.parentId).name});
    }
    return true;
  }
  function commitAddChild(parentNode, draft){
    var val = (draft.name||'').trim();
    if(!val) return null;
    var id = 'new-' + (tempCounter++);
    var newNode = {id:id, name:val, origName:val, parentId:parentNode.id, inactive:false, movedFrom:null, restoreLog:null,
      pic:draft.pic||'', hrbp1:draft.hrbp1||'', hrbp2:draft.hrbp2||'', hrbpLead:draft.hrbpLead||'', da:draft.da||'', origRoles:null,
      flags:{isNew:true, isDeleted:false, isRenamed:false}};
    nodes.push(newNode);
    var roleBits = [];
    if(newNode.pic) roleBits.push(roleLabelFor('pic')+'：'+newNode.pic);
    if(newNode.hrbp1) roleBits.push(roleLabelFor('hrbp1')+'：'+newNode.hrbp1);
    if(newNode.hrbp2) roleBits.push(roleLabelFor('hrbp2')+'：'+newNode.hrbp2);
    if(newNode.hrbpLead) roleBits.push(roleLabelFor('hrbpLead')+'：'+newNode.hrbpLead);
    if(newNode.da) roleBits.push(roleLabelFor('da')+'：'+newNode.da);
    addLog('add', {name:val, parent:parentNode.name, roleBits:roleBits}, id);
    return newNode;
  }
  function commitEmployeeTransfer(emp, targetId, silent){
    var fromNode = getNode(emp.nodeId);
    var toNode = getNode(targetId);
    if(!toNode || targetId===emp.nodeId) return false;
    emp.nodeId = targetId;
    if(!silent) addLog('emp_transfer', {name:emp.name, eid:emp.eid, from:fromNode.name, to:toNode.name, fromId:fromNode.id, toId:toNode.id});
    return true;
  }
  function commitDelete(n, assignments){
    var childCount = getChildren(n.id).filter(function(c){ return !c.flags.isDeleted; }).length;
    if(childCount>0) return {ok:false, reason:'children'};
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    if(direct.length){
      var missing = direct.filter(function(e){ return !assignments || !assignments[e.eid]; });
      if(missing.length) return {ok:false, reason:'unassigned', missing:missing};
    }
    if(n.flags.isNew){
      nodes = nodes.filter(function(x){ return x.id!==n.id; });
      removeAllLogsForNode(n.id); // never confirmed this session — creating then deleting it is a no-op
      return {ok:true, removed:true};
    }
    var restoreLog = [];
    direct.forEach(function(e){
      var toId = assignments[e.eid];
      restoreLog.push({eid:e.eid, toNodeId:toId, fromNodeId:n.id});
      commitEmployeeTransfer(e, toId);
    });
    n.restoreLog = restoreLog.length ? restoreLog : null;
    n.flags.isDeleted = true;
    addLog('delete', {name:n.name, parent:getNode(n.parentId).name, empCount:restoreLog.length}, n.id);
    return {ok:true};
  }
  function commitRestoreDelete(n){
    n.flags.isDeleted = false;
    var restored = 0;
    if(n.restoreLog){
      n.restoreLog.forEach(function(r){
        var emp = employees.filter(function(e){ return e.eid===r.eid; })[0];
        if(emp && emp.nodeId===r.toNodeId){ emp.nodeId = r.fromNodeId; restored++; }
      });
      n.restoreLog = null;
    }
    addLog('undo_delete', {name:n.name, restored:restored});
  }
  function commitRoleChange(n, field, val){
    if(val===n[field]) return;
    if(!n.origRoles) n.origRoles = {pic:n.pic, hrbp1:n.hrbp1, hrbp2:n.hrbp2, hrbpLead:n.hrbpLead, da:n.da};
    n[field] = val;
    var key = n.id + '#' + field;
    if(n[field] === n.origRoles[field]){
      removeLog('role_change', key);
    } else {
      upsertLog('role_change', key, {name:n.name, roleLabel:roleLabelFor(field), from:n.origRoles[field], to:n[field]});
    }
  }
  var CASCADE_FIELDS = ['hrbp1', 'hrbp2', 'hrbpLead', 'da'];
  function commitCascade(n){
    var desc = getDescendants(n.id);
    if(!desc.length) return;
    // beforeValues captures each descendant's value right before this cascade overwrote it —
    // undo restores exactly that (not session-original), so an earlier legitimate edit that
    // predates this cascade isn't silently wiped out along with it.
    var beforeValues = desc.map(function(d){
      if(!d.origRoles) d.origRoles = {pic:d.pic, hrbp1:d.hrbp1, hrbp2:d.hrbp2, hrbpLead:d.hrbpLead, da:d.da};
      return {id:d.id, hrbp1:d.hrbp1, hrbp2:d.hrbp2, hrbpLead:d.hrbpLead, da:d.da};
    });
    // Snapshot what's actually being applied, separate from beforeValues — a CSV/report built
    // later must show what THIS cascade did, not diff against whatever the descendant's fields
    // happen to hold by then (a later individual edit would otherwise get misattributed here).
    var appliedValues = {hrbp1:n.hrbp1, hrbp2:n.hrbp2, hrbpLead:n.hrbpLead, da:n.da};
    desc.forEach(function(d){
      d.hrbp1 = n.hrbp1; d.hrbp2 = n.hrbp2; d.hrbpLead = n.hrbpLead; d.da = n.da;
      // the batch summary line below supersedes any individual role_change entries for these fields
      CASCADE_FIELDS.forEach(function(field){ removeLog('role_change', d.id+'#'+field); });
    });
    addLog('role_cascade', {name:n.name, count:desc.length, beforeValues:beforeValues, appliedValues:appliedValues});
  }

  // BIPO ("LAST, First Middle") and Lark/PIC ("First Last") name formats differ — the same
  // mismatch we saw in the department-name audit — so match loosely on name tokens.
  function matchesPersonName(empName, picName){
    var picParts = picName.toLowerCase().split(/\s+/).filter(Boolean);
    var empLower = empName.toLowerCase();
    return picParts.length>0 && picParts.every(function(p){ return empLower.indexOf(p)>=0; });
  }
  function commitReportChange(emp, newSupervisor){
    var old = emp.reportsTo || '';
    emp.reportsTo = newSupervisor;
    if(emp.reportsTo === emp.origReportsTo) removeLog('report_change', emp.eid);
    else upsertLog('report_change', emp.eid, {name:emp.name, from:old, to:newSupervisor});
  }

  // ---------- change-log undo ----------
  // rename/move/role_change/report_change are upsert-logged as session-original -> current, so
  // reverting to the original value makes the commit fns remove their own log line (see upsertLog
  // callers above). add/delete already have dedicated undo paths. emp_transfer is the one type with
  // no self-cleaning story, so its undo manually drops the entry after reversing it.
  function canUndoLogEntry(l){
    if(!canEdit()) return false;
    if(l.typeKey==='rename' || l.typeKey==='move') return !!getNode(l.key);
    if(l.typeKey==='role_change'){ return !!getNode(l.key.split('#')[0]); }
    if(l.typeKey==='report_change'){ return employees.some(function(e){ return e.eid===l.key; }); }
    if(l.typeKey==='add'){ var n=getNode(l.key); return !!n && n.flags.isNew && !n.flags.isDeleted; }
    if(l.typeKey==='delete'){ var n=getNode(l.key); return !!n && n.flags.isDeleted; }
    if(l.typeKey==='emp_transfer'){
      var e = employees.filter(function(x){ return x.eid===l.params.eid; })[0];
      return !!e && !!l.params.toId && e.nodeId===l.params.toId;
    }
    if(l.typeKey==='role_cascade'){ return !!(l.params.beforeValues && l.params.beforeValues.length); }
    return false;
  }
  function undoLogEntry(l){
    if(l.typeKey==='rename'){ var n=getNode(l.key); if(n) commitRename(n, n.origName); }
    else if(l.typeKey==='move'){ var n=getNode(l.key); if(n) commitMove(n, n.movedFrom); }
    else if(l.typeKey==='role_change'){ var parts=l.key.split('#'); var n=getNode(parts[0]); if(n) commitRoleChange(n, parts[1], n.origRoles[parts[1]]); }
    else if(l.typeKey==='report_change'){ var e=employees.filter(function(x){ return x.eid===l.key; })[0]; if(e) commitReportChange(e, e.origReportsTo); }
    else if(l.typeKey==='add'){
      var n=getNode(l.key);
      if(n){
        var res = commitDelete(n, {});
        if(!res.ok){
          if(res.reason==='children') toast(t('toastDeleteBlockedChildren'));
          else toast(t('toastDeleteBlockedEmp')(res.missing.length));
        }
      }
    }
    else if(l.typeKey==='delete'){ var n=getNode(l.key); if(n) commitRestoreDelete(n); }
    else if(l.typeKey==='emp_transfer'){
      var e = employees.filter(function(x){ return x.eid===l.params.eid; })[0];
      if(e && l.params.fromId){
        commitEmployeeTransfer(e, l.params.fromId, true);
        log = log.filter(function(x){ return x.seq!==l.seq; });
      }
    }
    else if(l.typeKey==='role_cascade'){
      (l.params.beforeValues||[]).forEach(function(bv){
        var d = getNode(bv.id);
        if(!d) return;
        commitRoleChange(d, 'hrbp1', bv.hrbp1);
        commitRoleChange(d, 'hrbp2', bv.hrbp2);
        commitRoleChange(d, 'hrbpLead', bv.hrbpLead);
        commitRoleChange(d, 'da', bv.da);
      });
      log = log.filter(function(x){ return x.seq!==l.seq; });
    }
  }
  function maybePromptReportChange(n){
    if(!n.pic) return;
    var picEmp = employees.filter(function(e){ return matchesPersonName(e.name, n.pic); })[0];
    if(!picEmp) return;
    var parent = getNode(n.parentId);
    var newSupervisor = parent ? parent.pic : '';
    if(!newSupervisor || newSupervisor===picEmp.reportsTo || newSupervisor===n.pic) return;
    pendingReportPrompt = {emp:picEmp, newSupervisor:newSupervisor};
    document.getElementById('reportPromptText').textContent = t('reportPromptText')({dept:n.name, parent:parent.name, pic:picEmp.name, from:picEmp.reportsTo, to:newSupervisor});
    document.getElementById('reportPromptOverlay').classList.add('show');
  }

  // ---------- panel (edit drawer) ----------
  function openPanel(id, tab){
    selectedId = id;
    createDraft = null;
    activeTab = tab || 'structure';
    var n = getNode(id);
    pendingEdit = {
      rename:{on:false, value:n.name},
      move:{on:false, target:''},
      del:{on:false, assignments:{}, bulkTarget:''}
    };
    rosterSelected = {};
    rosterBulkTarget = '';
    render();
  }
  function openCreateChild(parentId){
    selectedId = parentId;
    activeTab = 'create';
    createDraft = {name:'', pic:'', hrbp1:'', hrbp2:'', hrbpLead:'', da:''};
    render();
  }
  function closePanel(){
    selectedId = null; pendingEdit = null; createDraft = null; rosterSelected = {}; rosterBulkTarget = '';
    document.getElementById('editDrawer').classList.remove('show');
    document.getElementById('panelBackdrop').classList.remove('show');
  }

  function setPending(type, on){
    if(type==='del'){
      if(on){ pendingEdit.rename.on=false; pendingEdit.move.on=false; }
      pendingEdit.del.on = on;
    } else {
      if(on) pendingEdit.del.on = false;
      pendingEdit[type].on = on;
    }
    renderPanel();
  }

  function saveStructureEdit(){
    var n = getNode(selectedId); if(!n) return;
    if(pendingEdit.del.on){
      var res = commitDelete(n, pendingEdit.del.assignments);
      if(!res.ok){
        if(res.reason==='children') toast(t('toastDeleteBlockedChildren'));
        else toast(t('toastDeleteBlockedEmp')(res.missing.length));
        return;
      }
      toast(t('toastDeleted')); closePanel(); render(); return;
    }
    var did = false, moved = false;
    if(pendingEdit.rename.on){
      var renameRes = commitRename(n, (pendingEdit.rename.value||'').trim());
      if(!renameRes.ok && renameRes.reason!=='nochange'){ toastNameError(renameRes.reason); return; }
      did = renameRes.ok || did;
    }
    if(pendingEdit.move.on){ moved = commitMove(n, pendingEdit.move.target); did = moved || did; }
    if(!did){ toast(t('toastNothingToSave')); return; }
    closePanel(); render();
    toast(t('toastSaved'));
    if(moved) maybePromptReportChange(n);
  }

  function saveCreateChild(){
    var parent = getNode(selectedId); if(!parent) return;
    if(!(createDraft.name||'').trim()){ toast(t('toastNeedName')); return; }
    var check = validateOrgName(createDraft.name, null);
    if(!check.ok){ toastNameError(check.reason); return; }
    var newNode = commitAddChild(parent, createDraft);
    if(!newNode){ toast(t('toastNeedName')); return; }
    toast(t('toastAdded')); closePanel(); render();
  }

  function renderPanel(){
    var drawer = document.getElementById('editDrawer');
    var backdrop = document.getElementById('panelBackdrop');
    if(!selectedId){ drawer.classList.remove('show'); backdrop.classList.remove('show'); return; }
    drawer.classList.add('show'); backdrop.classList.add('show');
    var n = getNode(selectedId);
    var body = document.getElementById('editBody');
    var foot = document.getElementById('editFoot');
    var tabs = document.getElementById('editTabs');
    var addBtn = document.getElementById('addChildBtn');

    if(activeTab==='create'){
      document.getElementById('editNodeName').textContent = t('createTitle');
      tabs.style.display = 'none';
      addBtn.style.display = 'none';
      renderCreatePanel(n, body, foot);
      return;
    }
    tabs.style.display = 'flex';
    addBtn.style.display = 'flex';
    document.getElementById('editNodeName').textContent = n.name;
    document.getElementById('tabStructureBtn').classList.toggle('active', activeTab==='structure');
    document.getElementById('tabRoleBtn').classList.toggle('active', activeTab==='role');
    document.getElementById('tabRosterBtn').classList.toggle('active', activeTab==='roster');

    if(n.flags.isDeleted){
      body.innerHTML = '<div class="warn-box">' + escapeHtml(t('deletedPanelNote')) + '</div>';
      foot.innerHTML = canEdit()
        ? '<button class="btn ghost" id="cancelEditBtn">' + escapeHtml(t('closeBtn')) + '</button><button class="btn primary" id="undoDeleteBtn">' + escapeHtml(t('undoDeleteBtn')) + '</button>'
        : '<button class="btn ghost" id="cancelEditBtn">' + escapeHtml(t('closeBtn')) + '</button>';
      document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
      var undoBtn = document.getElementById('undoDeleteBtn');
      if(undoBtn) undoBtn.addEventListener('click', function(){
        commitRestoreDelete(n);
        toast(t('toastUndoDeleted')); closePanel(); render();
      });
      return;
    }

    if(!canEdit()){ tabs.style.display = 'none'; addBtn.style.display = 'none'; renderReadOnlyPanel(n, body, foot); return; }
    if(activeTab==='structure') renderStructureTab(n, body, foot);
    else if(activeTab==='role') renderRoleTab(n, body, foot);
    else renderRosterTab(n, body, foot);
  }

  // Viewer role: informational only, no rename/move/delete/role/roster-transfer controls.
  function renderReadOnlyPanel(n, body, foot){
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    var html = '<div class="role-row"><div class="rlbl">'+escapeHtml(roleLabelFor('pic'))+'</div><div class="role-value" style="cursor:default;"><span class="rv-name'+(n.pic?'':' empty')+'">'+escapeHtml(n.pic||t('notSet'))+'</span></div></div>'+
      '<div class="role-row"><div class="rlbl">'+escapeHtml(roleLabelFor('hrbp1'))+'</div><div class="role-value" style="cursor:default;"><span class="rv-name'+(n.hrbp1?'':' empty')+'">'+escapeHtml(n.hrbp1||t('notSet'))+'</span></div></div>'+
      '<div class="role-row"><div class="rlbl">'+escapeHtml(roleLabelFor('hrbp2'))+'</div><div class="role-value" style="cursor:default;"><span class="rv-name'+(n.hrbp2?'':' empty')+'">'+escapeHtml(n.hrbp2||t('notSet'))+'</span></div></div>'+
      '<div class="role-row"><div class="rlbl">'+escapeHtml(roleLabelFor('hrbpLead'))+'</div><div class="role-value" style="cursor:default;"><span class="rv-name'+(n.hrbpLead?'':' empty')+'">'+escapeHtml(n.hrbpLead||t('notSet'))+'</span></div></div>'+
      '<div class="role-row"><div class="rlbl">'+escapeHtml(roleLabelFor('da'))+'</div><div class="role-value" style="cursor:default;"><span class="rv-name'+(n.da?'':' empty')+'">'+escapeHtml(n.da||t('notSet'))+'</span></div></div>'+
      '<div class="role-row"><div class="rlbl">'+escapeHtml(t('tabRoster'))+' ('+direct.length+')</div>'+
      (direct.length ? direct.map(function(e){ return '<div class="roster-row"><div class="rr-info"><div class="rr-name">'+escapeHtml(e.name)+'</div><div class="rr-eid">EID '+e.eid+'</div></div></div>'; }).join('') : '<div class="empty-note">'+escapeHtml(t('rosterEmptyNote'))+'</div>')+
      '</div>';
    body.innerHTML = html;
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('closeBtn'))+'</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
  }

  function renderCreatePanel(parent, body, foot){
    var html = '<div class="hint" style="margin-bottom:12px;">'+escapeHtml(t('createUnder')(parent.name))+'</div>';
    html += '<div class="edit-row open" style="margin-bottom:16px;"><div class="edit-row-body" style="border-top:none; margin-top:0; padding-top:0;">'+
      '<input type="text" id="createNameInput" value="'+escapeHtml(createDraft.name)+'" placeholder="'+escapeHtml(t('createNamePh'))+'"></div></div>';
    html += roleRowHtml(createDraft, 'pic');
    html += roleRowHtml(createDraft, 'hrbp1');
    html += roleRowHtml(createDraft, 'hrbp2');
    html += roleRowHtml(createDraft, 'da');
    body.innerHTML = html;
    document.getElementById('createNameInput').addEventListener('input', function(ev){ createDraft.name = ev.target.value; });
    bindRolePickers(createDraft);
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('cancelBtn'))+'</button><button class="btn primary" id="saveCreateBtn">'+escapeHtml(t('createBtn'))+'</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    document.getElementById('saveCreateBtn').addEventListener('click', saveCreateChild);
  }

  function renderStructureTab(n, body, foot){
    var childCount = getChildren(n.id).filter(function(c){ return !c.flags.isDeleted; }).length;
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    var empCount = direct.length;
    var delBlockedByChildren = childCount>0;
    var otherNodes = nodes.filter(function(x){ return x.id!==n.id && !x.flags.isDeleted && !isDescendant(n.id, x.id); });

    var html = '<div class="drag-hint">' + escapeHtml(t('dragHint')(n.name)) + '</div>';

    html += '<div class="edit-row ' + (pendingEdit.del.on?'disabled':'') + (pendingEdit.rename.on?' open':'') + '">'+
      '<div class="edit-row-head" data-toggle="rename"><input type="checkbox" '+(pendingEdit.rename.on?'checked':'')+' '+(pendingEdit.del.on?'disabled':'')+'><span class="lbl">'+escapeHtml(t('renameLbl'))+'</span></div>'+
      '<div class="edit-row-body"><input type="text" id="renameInput" value="'+escapeHtml(pendingEdit.rename.value)+'" placeholder="'+escapeHtml(t('renameInputPh'))+'"></div>'+
      '</div>';

    html += '<div class="edit-row ' + (pendingEdit.del.on?'disabled':'') + (pendingEdit.move.on?' open':'') + '">'+
      '<div class="edit-row-head" data-toggle="move"><input type="checkbox" '+(pendingEdit.move.on?'checked':'')+' '+(pendingEdit.del.on?'disabled':'')+'><span class="lbl">'+escapeHtml(t('moveLbl'))+'</span></div>'+
      '<div class="edit-row-body"><div id="moveOrgPicker"></div><div class="hint">'+escapeHtml(t('moveHint'))+'</div></div>'+
      '</div>';

    var anyOtherOn = pendingEdit.rename.on || pendingEdit.move.on;
    html += '<div class="edit-row ' + (anyOtherOn?'disabled':'') + (pendingEdit.del.on?' open':'') + '" style="border-color:var(--warn-border);">'+
      '<div class="edit-row-head" data-toggle="del"><input type="checkbox" '+(pendingEdit.del.on?'checked':'')+' '+((anyOtherOn||delBlockedByChildren)?'disabled':'')+'><span class="lbl" style="color:var(--warn-text);">'+escapeHtml(t('deleteLbl'))+'</span></div>';
    if(delBlockedByChildren){
      html += '<div class="blocked">'+escapeHtml(t('deleteBlocked')(childCount))+'</div>';
    } else if(pendingEdit.del.on){
      html += '<div class="edit-row-body">';
      if(empCount>0){
        html += '<div class="reassign-box"><div class="rb-title">'+escapeHtml(t('reassignTitle')(empCount))+'</div>';
        html += '<div class="bulk-row"><div id="bulkDelPicker" style="flex:1;"></div><button class="btn" id="bulkDelApply" type="button">'+escapeHtml(t('bulkApplyBtn'))+'</button></div>';
        direct.forEach(function(e){
          html += '<div class="reassign-row"><span class="rn-name">'+escapeHtml(e.name)+' <span class="mono" style="color:var(--ink-muted);">'+e.eid+'</span></span>'+
            '<div class="reassign-picker" data-eid="'+e.eid+'"></div></div>';
        });
        html += '</div>';
      } else {
        html += '<div class="hint">'+escapeHtml(t('deleteHint'))+'</div>';
      }
      html += '</div>';
    }
    html += '</div>';

    body.innerHTML = html;
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('cancelBtn'))+'</button><button class="btn primary" id="saveEditBtn">'+escapeHtml(t('saveBtn'))+'</button>';

    body.querySelectorAll('[data-toggle]').forEach(function(el){
      el.addEventListener('click', function(ev){
        if(ev.target.tagName==='INPUT' && ev.target.type==='checkbox') return;
        var type = el.getAttribute('data-toggle');
        var cb = el.querySelector('input[type="checkbox"]');
        if(cb.disabled) return;
        setPending(type, !cb.checked);
      });
      var cb = el.querySelector('input[type="checkbox"]');
      cb.addEventListener('change', function(){ if(!cb.disabled) setPending(el.getAttribute('data-toggle'), cb.checked); });
    });
    var ri = document.getElementById('renameInput'); if(ri) ri.addEventListener('input', function(){ pendingEdit.rename.value = ri.value; });
    bindOrgPicker(document.getElementById('moveOrgPicker'), otherNodes, pendingEdit.move.target, function(id){ pendingEdit.move.target = id; }, t('movePlaceholder'));
    var bulkBtn = document.getElementById('bulkDelApply');
    if(bulkBtn){
      bindOrgPicker(document.getElementById('bulkDelPicker'), otherNodes, pendingEdit.del.bulkTarget, function(id){ pendingEdit.del.bulkTarget = id; }, t('bulkTargetPlaceholder'));
      bulkBtn.addEventListener('click', function(){
        if(!pendingEdit.del.bulkTarget){ toast(t('toastPickBulkTarget')); return; }
        direct.forEach(function(e){ pendingEdit.del.assignments[e.eid] = pendingEdit.del.bulkTarget; });
        renderPanel();
      });
    }
    body.querySelectorAll('.reassign-picker').forEach(function(el){
      var eid = el.getAttribute('data-eid');
      bindOrgPicker(el, otherNodes, pendingEdit.del.assignments[eid], function(id){ pendingEdit.del.assignments[eid] = id; }, t('assignTargetPlaceholder'));
    });

    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    document.getElementById('saveEditBtn').addEventListener('click', saveStructureEdit);
  }

  function renderRoleTab(n, body, foot){
    var inc = roleInconsistency(n.id);
    var warnParts = [];
    ['hrbp1','hrbp2','hrbpLead','da'].forEach(function(f){
      if(inc[f].bad){
        var reason = inc[f].differs ? t('roleDiffers') : t('roleBlank');
        warnParts.push('<b>'+escapeHtml(roleLabelFor(f))+'</b>：'+escapeHtml(reason));
      }
    });
    var hasChildren = getChildren(n.id).length>0;

    var html = '';
    if(hasChildren){
      html += warnParts.length
        ? '<div class="warn-box">'+escapeHtml(t('roleWarnHeader'))+'<br>'+warnParts.join('<br>')+'</div>'
        : '<div class="ok-box">'+escapeHtml(t('roleOkBox'))+'</div>';
    }

    html += roleRowHtml(n, 'pic');
    html += roleRowHtml(n, 'hrbp1');
    html += roleRowHtml(n, 'hrbp2');
    html += roleRowHtml(n, 'hrbpLead');
    html += roleRowHtml(n, 'da');

    body.innerHTML = html;
    bindRolePickers(n);

    foot.innerHTML = hasChildren
      ? '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('closeBtn'))+'</button><button class="btn primary" id="cascadeBtn">'+escapeHtml(t('cascadeBtn'))+'</button>'
      : '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('closeBtn'))+'</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    var cascadeBtn = document.getElementById('cascadeBtn');
    if(cascadeBtn) cascadeBtn.addEventListener('click', function(){
      commitCascade(n);
      toast(t('toastCascaded'));
      renderTree(); renderLog(); renderEmployees(); renderPanel();
    });
  }

  function renderRosterTab(n, body, foot){
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    var otherNodes = nodes.filter(function(x){ return x.id!==n.id && !x.flags.isDeleted; });
    var selCount = Object.keys(rosterSelected).filter(function(k){ return rosterSelected[k]; }).length;
    var allSelected = direct.length>0 && direct.every(function(e){ return rosterSelected[e.eid]; });

    if(!direct.length){
      body.innerHTML = '<div class="empty-note">'+escapeHtml(t('rosterEmptyNote'))+'</div>';
      foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('closeBtn'))+'</button>';
      document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
      return;
    }

    var html = '<div class="roster-toolbar">'+
      '<label style="display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--ink-muted);"><input type="checkbox" id="rosterSelectAll" '+(allSelected?'checked':'')+'> '+escapeHtml(t('selectAllLabel')(direct.length))+'</label>'+
      '</div>';
    direct.forEach(function(e){
      html += '<div class="roster-row" data-eid="'+e.eid+'">'+
        '<input type="checkbox" class="roster-cb" data-eid="'+e.eid+'" '+(rosterSelected[e.eid]?'checked':'')+'>'+
        '<div class="rr-info"><div class="rr-name">'+escapeHtml(e.name)+'</div><div class="rr-eid">EID '+e.eid+escapeHtml(t('reportsToPrefix'))+(e.reportsTo?escapeHtml(e.reportsTo):escapeHtml(t('notSet')))+'</div></div>'+
        '</div>';
    });
    html += '<div class="roster-toolbar" style="margin-top:12px; padding-top:12px; border-top:1px solid var(--line);">'+
      '<div id="rosterBulkPicker" style="flex:1;"></div>'+
      '<button class="btn primary" id="rosterBulkApply" type="button" '+(selCount?'':'disabled')+'>'+escapeHtml(t('transferSelectedBtn')(selCount))+'</button></div>';

    body.innerHTML = html;
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">'+escapeHtml(t('closeBtn'))+'</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);

    document.getElementById('rosterSelectAll').addEventListener('change', function(){
      var newVal = !allSelected;
      direct.forEach(function(e){ rosterSelected[e.eid] = newVal; });
      renderPanel();
    });
    body.querySelectorAll('.roster-cb').forEach(function(cb){
      cb.addEventListener('change', function(){ rosterSelected[cb.getAttribute('data-eid')] = cb.checked; renderPanel(); });
    });
    bindOrgPicker(document.getElementById('rosterBulkPicker'), otherNodes, rosterBulkTarget, function(id){ rosterBulkTarget = id; }, t('rosterTargetPlaceholder'));
    document.getElementById('rosterBulkApply').addEventListener('click', function(){
      var target = rosterBulkTarget;
      if(!target){ toast(t('toastPickTransferTarget')); return; }
      var moved = 0;
      direct.forEach(function(e){ if(rosterSelected[e.eid]){ commitEmployeeTransfer(e, target); moved++; } });
      rosterSelected = {};
      rosterBulkTarget = '';
      toast(t('toastTransferredN')(moved));
      renderTree(); renderLog(); renderEmployees(); renderPanel();
    });
  }

  function roleRowHtml(obj, field){
    var val = obj[field] || '';
    return '<div class="role-row" data-field="'+field+'">'+
      '<div class="rlbl">'+escapeHtml(roleLabelFor(field))+'</div>'+
      '<div class="role-value" data-open="'+field+'"><span class="rv-name '+(val?'':'empty')+'">'+escapeHtml(val||t('notSet'))+'</span><span class="rv-edit">'+escapeHtml(t('changeBtn'))+'</span></div>'+
      '</div>';
  }

  function bindRolePickers(target){
    var isRealNode = !!getNode(target.id);
    document.querySelectorAll('.role-value').forEach(function(el){
      el.addEventListener('click', function(){
        var field = el.getAttribute('data-open');
        var row = el.closest('.role-row');
        if(row.querySelector('.role-picker')) return;
        var picker = document.createElement('div');
        picker.className = 'role-picker';
        picker.innerHTML = '<input type="text" placeholder="'+escapeHtml(t('pickerSearchPh'))+'" autocomplete="off"><div class="options"></div>';
        row.appendChild(picker);
        var input = picker.querySelector('input');
        var opts = picker.querySelector('.options');
        function renderOpts(q){
          var list = personPool.filter(function(p){ return p.toLowerCase().indexOf((q||'').toLowerCase())>=0; }).slice(0,8);
          opts.innerHTML = list.length ? list.map(function(p){ return '<button type="button" data-name="'+escapeHtml(p)+'">'+escapeHtml(p)+'</button>'; }).join('') + '<button type="button" data-name="" style="color:var(--warn-text);">'+escapeHtml(t('clearRoleOption'))+'</button>'
            : '<button type="button" disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchResult'))+'</button>';
        }
        renderOpts('');
        input.focus();
        input.addEventListener('input', function(){ renderOpts(input.value); });
        opts.addEventListener('click', function(ev){
          var btn = ev.target.closest('button[data-name]'); if(!btn) return;
          var val = btn.getAttribute('data-name');
          if(isRealNode){ commitRoleChange(target, field, val); renderTree(); renderLog(); }
          else target[field] = val;
          renderPanel();
        });
        document.addEventListener('click', function onDoc(ev){
          if(!row.contains(ev.target)){ picker.remove(); document.removeEventListener('click', onDoc); }
        });
      });
    });
  }

  // Inline searchable department picker — replaces a plain <select> for target-org
  // fields (move target, delete-time reassignment, roster transfer) since the real
  // department list is too long to scan by eye. currentId lives in the caller's own
  // state; onSelect just reports the pick back, it doesn't own the state.
  function bindOrgPicker(container, candidates, currentId, onSelect, placeholder){
    if(!container) return;
    function renderPicked(id){
      var n = getNode(id);
      container.innerHTML = '<div class="op-picked"><span>'+escapeHtml(pathLabel(n.id))+'</span><button type="button" class="op-change">'+escapeHtml(t('reselectBtn'))+'</button></div>';
      container.querySelector('.op-change').addEventListener('click', function(){ renderSearch(); });
    }
    function renderSearch(){
      container.innerHTML = '<div class="op-wrap"><input type="text" class="op-input" placeholder="'+escapeHtml(placeholder)+'" autocomplete="off"><div class="op-options"></div></div>';
      var wrap = container.querySelector('.op-wrap');
      var input = wrap.querySelector('.op-input');
      var opts = wrap.querySelector('.op-options');
      var onDoc = null;
      function closeDropdown(){
        opts.classList.remove('show');
        if(onDoc){ document.removeEventListener('click', onDoc); onDoc = null; }
      }
      function paint(q){
        var list = candidates.filter(function(x){ return pathLabel(x.id).toLowerCase().indexOf((q||'').toLowerCase())>=0; }).slice(0,8);
        opts.innerHTML = list.length ? list.map(function(x){ return '<button type="button" data-id="'+x.id+'">'+escapeHtml(pathLabel(x.id))+'</button>'; }).join('')
          : '<button type="button" disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchDept'))+'</button>';
        opts.classList.add('show');
        if(!onDoc){
          onDoc = function(ev){ if(!wrap.contains(ev.target)) closeDropdown(); };
          document.addEventListener('click', onDoc);
        }
      }
      input.addEventListener('focus', function(){ paint(input.value); });
      input.addEventListener('input', function(){ paint(input.value); });
      opts.addEventListener('click', function(ev){
        var btn = ev.target.closest('button[data-id]'); if(!btn) return;
        var id = btn.getAttribute('data-id');
        closeDropdown();
        onSelect(id);
        renderPicked(id);
      });
    }
    if(currentId) renderPicked(currentId); else renderSearch();
  }

  // ---------- drag & drop ----------
  function onDragStart(ev, id){
    var n = getNode(id);
    if(n.flags.isDeleted || !canEdit()) { ev.preventDefault(); return; }
    dragSrcId = id;
    ev.dataTransfer.effectAllowed = 'move';
    ev.target.classList.add('dragging');
  }
  function onDragEnd(ev){ ev.target.classList.remove('dragging'); dragSrcId = null; renderTree(); }
  function onDragOver(ev, id){
    if(!dragSrcId || dragSrcId===id || isDescendant(dragSrcId, id)) return;
    ev.preventDefault();
    ev.currentTarget.classList.add('drop-ok');
  }
  function onDragLeave(ev){ ev.currentTarget.classList.remove('drop-ok'); }
  function onDrop(ev, id){
    ev.preventDefault();
    ev.currentTarget.classList.remove('drop-ok');
    if(!dragSrcId || dragSrcId===id || isDescendant(dragSrcId, id)) return;
    var srcId = dragSrcId; dragSrcId = null;
    openPanel(srcId);
    pendingEdit.move.on = true;
    pendingEdit.move.target = id;
    render();
    toast(t('toastMovePending'));
  }

  // ---------- rendering ----------
  function nodeClasses(n){
    var c = ['node'];
    if(n.flags.isDeleted) c.push('st-deleted');
    else if(n.flags.isNew) c.push('st-new');
    else if(n.movedFrom!==null) c.push('st-moved');
    else if(n.flags.isRenamed) c.push('st-renamed');
    if(selectedId===n.id) c.push('selected');
    return c.join(' ');
  }

  function renderNodeBox(n, hasKids, isCollapsed){
    var tags = '';
    if(n.flags.isNew) tags += '<span class="tag new">'+escapeHtml(t('newTag'))+'</span>';
    if(n.flags.isRenamed) tags += '<span class="tag ren" title="'+escapeHtml(t('renamedTooltipPrefix')+n.origName)+'">'+escapeHtml(t('renamedTag'))+'</span>';
    if(n.movedFrom!==null) tags += '<span class="tag mov">'+escapeHtml(t('movedTag'))+'</span>';
    if(n.inactive) tags += '<span class="tag off">'+escapeHtml(t('inactiveTag'))+'</span>';
    var warnIco = hasAnyRoleWarning(n.id) ? '<span class="warn-ico" title="'+escapeHtml(t('roleWarnTooltip'))+'">⚠</span>' : '';
    var draggable = (n.flags.isDeleted || !canEdit()) ? 'false' : 'true';
    var titleAttr = n.name + (n.flags.isRenamed ? ' ｜ ' + t('renamedTooltipPrefix') + n.origName : '');
    var addBtn = (n.flags.isDeleted || !canEdit()) ? '' : '<button type="button" class="node-add-btn" data-add-child="'+n.id+'" title="'+escapeHtml(t('addChildTitle'))+'">+</button>';
    var toggleBtn = hasKids ? '<button type="button" class="node-toggle-btn" data-toggle-collapse="'+n.id+'" title="'+escapeHtml(isCollapsed ? t('expandTitle') : t('collapseTitle'))+'">'+(isCollapsed?'▸':'▾')+'</button>' : '';
    return '<div class="'+nodeClasses(n)+'" draggable="'+draggable+'" data-id="'+n.id+'" title="'+escapeHtml(titleAttr)+'">'+
      addBtn+toggleBtn+
      '<div class="name-row"><span class="name">'+escapeHtml(n.name)+'</span>'+warnIco+'</div>'+
      '<div class="meta-line">'+escapeHtml(t('picPrefix'))+(n.pic?escapeHtml(n.pic):escapeHtml(t('notSet')))+'</div>'+
      '<div class="meta-line">'+escapeHtml(t('headcountLabel')(rollupHeadcount(n.id)))+'</div>'+
      (tags? '<div class="tags">'+tags+'</div>' : '')+
      '</div>';
  }

  function renderGhost(n){
    var newParentName = getNode(n.parentId).name;
    return '<li><div class="node-ghost"><div class="name">'+escapeHtml(n.origName)+'</div><div class="arrow">'+escapeHtml(t('movedToLabel')(newParentName))+'</div></div></li>';
  }

  function renderSubtree(id, isRoot){
    var n = getNode(id);
    var children = getChildren(id);
    var ghosts = getGhosts(id);
    var kids = children.length + ghosts.length;
    var isCollapsed = kids>0 && collapsed.has(id);
    var html = '<li class="'+(isRoot?'tlevel-root':'')+(kids===1?' only-child':'')+'">';
    html += renderNodeBox(n, kids>0, isCollapsed);
    if(kids && !isCollapsed){
      html += '<div class="children-wrap'+(kids===1?' single':'')+'"><ul class="tlevel">';
      children.forEach(function(c){ html += renderSubtree(c.id, false); });
      ghosts.forEach(function(g){ html += renderGhost(g); });
      html += '</ul></div>';
    }
    html += '</li>';
    return html;
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function renderTree(){
    var root = document.getElementById('treeRoot');
    root.setAttribute('data-orient', orientation);
    root.innerHTML = '<ul class="tlevel">'+renderSubtree(viewRootId, true)+'</ul>';
    root.querySelectorAll('.node').forEach(function(el){
      var id = el.getAttribute('data-id');
      el.addEventListener('click', function(){ openPanel(id); });
      el.addEventListener('dragstart', function(ev){ onDragStart(ev, id); });
      el.addEventListener('dragend', onDragEnd);
      el.addEventListener('dragover', function(ev){ onDragOver(ev, id); });
      el.addEventListener('dragleave', onDragLeave);
      el.addEventListener('drop', function(ev){ onDrop(ev, id); });
    });
    root.querySelectorAll('.node-add-btn').forEach(function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        openCreateChild(btn.getAttribute('data-add-child'));
      });
    });
    root.querySelectorAll('.node-toggle-btn').forEach(function(btn){
      btn.addEventListener('click', function(ev){
        ev.stopPropagation();
        var id = btn.getAttribute('data-toggle-collapse');
        if(collapsed.has(id)) collapsed.delete(id); else collapsed.add(id);
        renderTree();
      });
    });
    drawConnectors();
  }

  // ---------- zoom ----------
  function applyZoom(){
    document.getElementById('treeRoot').style.zoom = zoomPct + '%';
    document.getElementById('zoomLabel').textContent = zoomPct + '%';
    drawConnectors();
  }
  document.getElementById('zoomInBtn').addEventListener('click', function(){ zoomPct = Math.min(200, zoomPct+10); applyZoom(); });
  document.getElementById('zoomOutBtn').addEventListener('click', function(){ zoomPct = Math.max(30, zoomPct-10); applyZoom(); });

  // ---------- expand / collapse ----------
  function depthOf(id){
    var d = 0, cur = getNode(id);
    while(cur && cur.parentId){ d++; cur = getNode(cur.parentId); }
    return d;
  }
  document.getElementById('expandAllBtn').addEventListener('click', function(){ collapsed = new Set(); renderTree(); });
  document.getElementById('collapseAllBtn').addEventListener('click', function(){
    collapsed = new Set(nodes.filter(function(n){ return getChildren(n.id).length>0 || getGhosts(n.id).length>0; }).map(function(n){ return n.id; }));
    renderTree();
  });

  // ---------- connector geometry (shared by the on-screen SVG and the PNG canvas export) ----------
  var CONNECTOR_GAP = 17;   // half of the children-wrap padding, i.e. the trunk's offset from the parent edge
  var CONNECTOR_RADIUS = 7; // corner rounding on the elbow joints

  function computeConnectorSegments(){
    var wrap = document.getElementById('treeWrap');
    var wrapRect = wrap.getBoundingClientRect();

    function centerOf(el, side){
      var r = el.getBoundingClientRect();
      var x = r.left - wrapRect.left, y = r.top - wrapRect.top;
      if(orientation==='vertical'){
        return side==='out' ? {x:x+r.width/2, y:y+r.height} : {x:x+r.width/2, y:y};
      }
      return side==='out' ? {x:x+r.width, y:y+r.height/2} : {x:x, y:y+r.height/2};
    }

    var segments = [];
    function walk(li){
      var box = li.querySelector(':scope > .node, :scope > .node-ghost');
      var childWrap = li.querySelector(':scope > .children-wrap');
      if(!box || !childWrap) return;
      var kidLis = Array.prototype.slice.call(childWrap.querySelectorAll(':scope > ul.tlevel > li'));
      var kidBoxes = kidLis.map(function(kli){ return kli.querySelector(':scope > .node, :scope > .node-ghost'); }).filter(Boolean);
      if(!kidBoxes.length) return;
      var p0 = centerOf(box, 'out');
      kidBoxes.forEach(function(kb){
        var p1 = centerOf(kb, 'in');
        var moved = kb.classList.contains('node-ghost');
        var pts;
        if(orientation==='vertical'){
          var trunkY = p0.y + CONNECTOR_GAP;
          pts = [{x:p0.x,y:p0.y}, {x:p0.x,y:trunkY}, {x:p1.x,y:trunkY}, {x:p1.x,y:p1.y}];
        } else {
          var trunkX = p0.x + CONNECTOR_GAP;
          pts = [{x:p0.x,y:p0.y}, {x:trunkX,y:p0.y}, {x:trunkX,y:p1.y}, {x:p1.x,y:p1.y}];
        }
        segments.push({points:pts, moved:moved});
      });
      kidLis.forEach(walk);
    }
    var rootLi = wrap.querySelector('.tree > ul.tlevel > li');
    if(rootLi) walk(rootLi);
    return {segments:segments, width:wrap.scrollWidth, height:wrap.scrollHeight};
  }

  function roundedPathD(pts, r){
    var d = 'M '+pts[0].x+' '+pts[0].y;
    for(var i=1;i<pts.length-1;i++){
      var p0=pts[i-1], p1=pts[i], p2=pts[i+1];
      var d1 = Math.hypot(p1.x-p0.x, p1.y-p0.y) || 1;
      var d2 = Math.hypot(p2.x-p1.x, p2.y-p1.y) || 1;
      var rr = Math.min(r, d1/2, d2/2);
      var a = {x: p1.x + (p0.x-p1.x)/d1*rr, y: p1.y + (p0.y-p1.y)/d1*rr};
      var b = {x: p1.x + (p2.x-p1.x)/d2*rr, y: p1.y + (p2.y-p1.y)/d2*rr};
      d += ' L '+a.x+' '+a.y+' Q '+p1.x+' '+p1.y+' '+b.x+' '+b.y;
    }
    d += ' L '+pts[pts.length-1].x+' '+pts[pts.length-1].y;
    return d;
  }

  function strokeRoundedPolyline(ctx, pts, r){
    if(pts.length<2) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for(var i=1;i<pts.length-1;i++){
      var p0=pts[i-1], p1=pts[i], p2=pts[i+1];
      var d1 = Math.hypot(p1.x-p0.x, p1.y-p0.y) || 1;
      var d2 = Math.hypot(p2.x-p1.x, p2.y-p1.y) || 1;
      var rr = Math.min(r, d1/2, d2/2);
      var a = {x: p1.x + (p0.x-p1.x)/d1*rr, y: p1.y + (p0.y-p1.y)/d1*rr};
      var b = {x: p1.x + (p2.x-p1.x)/d2*rr, y: p1.y + (p2.y-p1.y)/d2*rr};
      ctx.lineTo(a.x, a.y);
      ctx.quadraticCurveTo(p1.x, p1.y, b.x, b.y);
    }
    ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
    ctx.stroke();
  }

  // ---------- SVG connector lines (drawn from actual rendered box positions) ----------
  function drawConnectors(){
    var svg = document.getElementById('treeConnectors');
    var result = computeConnectorSegments();
    svg.setAttribute('width', result.width);
    svg.setAttribute('height', result.height);
    svg.setAttribute('viewBox', '0 0 ' + result.width + ' ' + result.height);
    var paths = result.segments.map(function(seg){
      var cls = seg.moved ? ' class="c-moved"' : '';
      return '<path'+cls+' d="'+roundedPathD(seg.points, CONNECTOR_RADIUS)+'"/>';
    });
    svg.innerHTML = paths.join('');
  }

  function renderLog(){
    var body = document.getElementById('logBody');
    document.getElementById('logCount').textContent = log.length + (t('unitRecords') ? ' ' + t('unitRecords') : '');
    saveState();
    if(!log.length){ body.innerHTML = '<tr><td colspan="4" class="empty-note">'+escapeHtml(t('logEmptyNote'))+'</td></tr>'; return; }
    body.innerHTML = log.map(function(l){
      var action = canUndoLogEntry(l) ? '<button class="btn ghost" type="button" data-undo-seq="'+l.seq+'">'+escapeHtml(t('undoBtn'))+'</button>' : '';
      return '<tr><td class="mono">'+l.seq+'</td><td>'+escapeHtml(formatLogType(l))+'</td><td>'+escapeHtml(formatLogDetail(l))+'</td><td>'+action+'</td></tr>';
    }).join('');
    body.querySelectorAll('[data-undo-seq]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var seq = Number(btn.getAttribute('data-undo-seq'));
        var entry = log.filter(function(l){ return l.seq===seq; })[0];
        if(!entry) return;
        undoLogEntry(entry);
        renderTree(); renderLog(); renderEmployees(); renderUnassigned(); renderPanel();
      });
    });
  }

  function computeImpacted(){
    return employees.filter(function(e){ return pathLabel(e.nodeId) !== e.origPath || chainHasChange(e.nodeId); }).map(function(e){
      return {eid:e.eid, name:e.name, oldPath:e.origPath, newPath: pathLabel(e.nodeId)};
    });
  }

  function renderEmployees(){
    var impacted = computeImpacted();
    document.getElementById('empCount').textContent = impacted.length + (t('unitPeople') ? ' ' + t('unitPeople') : '');
    var body = document.getElementById('empBody');
    if(!impacted.length){ body.innerHTML = '<tr><td colspan="3" class="empty-note">'+escapeHtml(t('empEmptyNote'))+'</td></tr>'; return; }
    body.innerHTML = impacted.map(function(e){
      var right = '<div class="path-old">'+escapeHtml(e.oldPath)+'</div><div class="path-new">'+escapeHtml(e.newPath)+'</div>';
      return '<tr><td class="mono">'+e.eid+'</td><td>'+escapeHtml(e.name)+'</td><td>'+right+'</td></tr>';
    }).join('');
  }

  function renderUnassigned(){
    var tabBtn = document.getElementById('viewUnassignedBtn');
    var node = unassignedId ? getNode(unassignedId) : null;
    if(!node){
      tabBtn.style.display = 'none';
      if(tabBtn.classList.contains('active')) switchView('chart');
      return;
    }
    tabBtn.style.display = '';
    var list = employees.filter(function(e){ return e.nodeId===unassignedId; });
    document.getElementById('viewUnassignedCount').textContent = list.length;
    document.getElementById('unassignedCount').textContent = list.length;
    var body = document.getElementById('unassignedBody');
    if(!list.length){ body.innerHTML = '<tr><td colspan="14" class="empty-note">'+escapeHtml(t('unassignedEmptyNote'))+'</td></tr>'; return; }
    var targets = nodes.filter(function(x){ return x.id!==unassignedId && !x.flags.isDeleted; });
    function cell(v){ return '<td>'+(v?escapeHtml(v):'')+'</td>'; }
    body.innerHTML = list.map(function(e){
      return '<tr data-eid="'+e.eid+'">'+
        '<td class="mono">'+e.eid+'</td>'+
        '<td>'+escapeHtml(e.name)+'</td>'+
        cell(e.division)+cell(e.businessUnit)+cell(e.department)+cell(e.team)+cell(e.subTeam)+cell(e.section)+cell(e.status)+cell(e.hrbp1)+cell(e.hrbp2)+cell(e.hrbpLead)+
        '<td>'+(e.reportsTo?escapeHtml(e.reportsTo):escapeHtml(t('notSet')))+'</td>'+
        (canEdit() ? '<td><div class="reassign-picker" data-eid="'+e.eid+'"></div></td><td><button class="btn" type="button" data-transfer-eid="'+e.eid+'">'+escapeHtml(t('unassignedTransferBtn'))+'</button></td>' : '<td></td><td></td>')+
        '</tr>';
    }).join('');
    if(!canEdit()) return;
    body.querySelectorAll('.reassign-picker').forEach(function(el){
      var eid = el.getAttribute('data-eid');
      bindOrgPicker(el, targets, unassignedTargets[eid], function(id){ unassignedTargets[eid] = id; }, t('rosterTargetPlaceholder'));
    });
    body.querySelectorAll('[data-transfer-eid]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var eid = btn.getAttribute('data-transfer-eid');
        var target = unassignedTargets[eid];
        if(!target){ toast(t('toastPickTransferTarget')); return; }
        var emp = employees.filter(function(e){ return e.eid===eid; })[0];
        commitEmployeeTransfer(emp, target);
        delete unassignedTargets[eid];
        toast(t('toastTransferredName')(emp.name));
        renderTree(); renderLog(); renderEmployees(); renderUnassigned();
      });
    });
  }

  function switchView(view){
    document.querySelectorAll('#viewTabs button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-view')===view); });
    document.getElementById('chartView').style.display = view==='chart' ? '' : 'none';
    document.getElementById('unassignedView').style.display = view==='unassigned' ? '' : 'none';
    document.getElementById('adminView').style.display = view==='admin' ? '' : 'none';
    if(view==='admin') renderAdmin();
  }
  document.getElementById('viewTabs').addEventListener('click', function(ev){
    var btn = ev.target.closest('button[data-view]'); if(!btn) return;
    if(btn.getAttribute('data-view')==='admin' && !isAdminRole()) return;
    switchView(btn.getAttribute('data-view'));
  });

  function applyRoleGating(){
    document.getElementById('viewAdminBtn').style.display = isAdminRole() ? '' : 'none';
    document.getElementById('globalTransferBtn').style.display = canEdit() ? '' : 'none';
    document.getElementById('addOrgBtn').style.display = canEdit() ? '' : 'none';
  }

  var ROLE_OPTIONS = ['Viewer', 'Editor', 'Senior Admin', 'Owner'];
  function roleBadgeClass(role){
    return role==='Owner' ? 'owner' : role==='Senior Admin' ? 'senior' : role==='Editor' ? 'editor' : 'viewer';
  }
  function roleDisplayName(role){
    var key = role==='Owner' ? 'roleOwner' : role==='Senior Admin' ? 'roleSeniorAdmin' : role==='Editor' ? 'roleEditor' : 'roleViewer';
    return t(key);
  }
  function renderAdmin(){
    if(!isAdminRole()) return;
    var body = document.getElementById('adminBody');
    body.innerHTML = '<tr><td colspan="4" class="empty-note">'+escapeHtml(t('adminLoading'))+'</td></tr>';
    fetch('/api/permissions/list', {credentials:'same-origin'})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(data){
        var viewerRole = data.viewerRole;
        if(!data.users.length){ body.innerHTML = '<tr><td colspan="4" class="empty-note">'+escapeHtml(t('adminNoUsers'))+'</td></tr>'; return; }
        body.innerHTML = data.users.map(function(u){
          var roleCell;
          if(u.role==='Owner'){
            roleCell = '<span class="role-badge owner">'+escapeHtml(roleDisplayName('Owner'))+'</span>';
          } else if(viewerRole==='Owner' || (viewerRole==='Senior Admin' && u.role!=='Senior Admin')){
            var opts = ROLE_OPTIONS.filter(function(r){ return r!=='Owner' && (viewerRole==='Owner' || r!=='Senior Admin'); });
            roleCell = '<select class="admin-role-select" data-record-id="'+u.recordId+'">'+opts.map(function(r){ return '<option value="'+r+'" '+(r===u.role?'selected':'')+'>'+escapeHtml(roleDisplayName(r))+'</option>'; }).join('')+'</select>';
          } else {
            roleCell = '<span class="role-badge '+roleBadgeClass(u.role)+'">'+escapeHtml(roleDisplayName(u.role))+'</span>';
          }
          var actions = '';
          if(u.role!=='Owner'){
            if(viewerRole==='Owner') actions += '<button class="btn ghost" type="button" data-transfer-owner="'+u.recordId+'">'+escapeHtml(t('adminTransferOwnerBtn'))+'</button> ';
            actions += '<button class="btn ghost" type="button" data-remove-user="'+u.recordId+'">'+escapeHtml(t('adminRemoveBtn'))+'</button>';
          }
          return '<tr><td>'+escapeHtml(u.name||'—')+'</td><td>'+escapeHtml(u.email||'—')+'</td><td>'+roleCell+'</td><td>'+actions+'</td></tr>';
        }).join('');
        body.querySelectorAll('.admin-role-select').forEach(function(sel){
          sel.addEventListener('change', function(){
            fetch('/api/permissions/update', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({recordId:sel.getAttribute('data-record-id'), role:sel.value})})
              .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
              .then(function(){ toast(t('adminSaved')); renderAdmin(); })
              .catch(function(err){ toast(err.message); renderAdmin(); });
          });
        });
        body.querySelectorAll('[data-remove-user]').forEach(function(btn){
          btn.addEventListener('click', function(){
            showConfirm(t('adminRemoveBtn'), t('adminRemoveConfirm'), t('adminRemoveBtn'), function(){
              fetch('/api/permissions/remove', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({recordId:btn.getAttribute('data-remove-user')})})
                .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
                .then(function(){ toast(t('adminSaved')); renderAdmin(); })
                .catch(function(err){ toast(err.message); });
            });
          });
        });
        body.querySelectorAll('[data-transfer-owner]').forEach(function(btn){
          btn.addEventListener('click', function(){
            showConfirm(t('adminTransferOwnerBtn'), t('adminTransferOwnerConfirm'), t('adminTransferOwnerBtn'), function(){
              fetch('/api/permissions/transfer-owner', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({recordId:btn.getAttribute('data-transfer-owner')})})
                .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
                .then(function(){ toast(t('adminSaved')); currentUserRole='Senior Admin'; applyRoleGating(); renderAdmin(); })
                .catch(function(err){ toast(err.message); });
            });
          });
        });
      })
      .catch(function(err){ body.innerHTML = '<tr><td colspan="4" class="empty-note">'+escapeHtml(err.message)+'</td></tr>'; });
  }
  document.getElementById('adminAddBtn').addEventListener('click', function(){
    var email = (document.getElementById('adminNewEmail').value||'').trim();
    var name = (document.getElementById('adminNewName').value||'').trim();
    var role = document.getElementById('adminNewRole').value;
    if(!email){ toast(t('adminNeedEmail')); return; }
    if(role==='Senior Admin' && currentUserRole!=='Owner'){ toast(t('adminOnlyOwnerGrantsSenior')); return; }
    fetch('/api/permissions/update', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:email, name:name, role:role})})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(){
        document.getElementById('adminNewEmail').value = '';
        document.getElementById('adminNewName').value = '';
        toast(t('adminSaved'));
        renderAdmin();
      })
      .catch(function(err){ toast(err.message); });
  });

  function render(){
    renderTree();
    renderLog();
    renderEmployees();
    renderUnassigned();
    renderPanel();
    var pill = document.getElementById('focusPill');
    if(viewRootId!==rootId){ pill.classList.add('show'); document.getElementById('focusPillText').textContent = t('focusLabel')(getNode(viewRootId).name); }
    else pill.classList.remove('show');
  }

  // ---------- search ----------
  function doSearch(q){
    var box = document.getElementById('searchResults');
    q = q.trim();
    if(!q){ box.classList.remove('show'); box.innerHTML=''; return; }
    var matches = nodes.filter(function(n){ return !n.flags.isDeleted && n.name.toLowerCase().indexOf(q.toLowerCase())>=0; }).slice(0,8);
    if(!matches.length){ box.innerHTML = '<button disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchDept'))+'</button>'; box.classList.add('show'); return; }
    box.innerHTML = matches.map(function(n){ return '<button type="button" data-id="'+n.id+'">'+escapeHtml(n.name)+'</button>'; }).join('');
    box.classList.add('show');
    box.querySelectorAll('button[data-id]').forEach(function(b){
      b.addEventListener('click', function(){
        viewRootId = b.getAttribute('data-id');
        collapsed.delete(viewRootId);
        document.getElementById('searchInput').value = '';
        box.classList.remove('show');
        render();
      });
    });
  }

  // ---------- copy / download ----------
  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ toast(t('toastCopied')); }, function(){ fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text){
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); toast(t('toastCopied')); }catch(e){ toast(t('toastCopyFailed')); }
    document.body.removeChild(ta);
  }
  function downloadCsv(filename, rows){
    var csv = rows.map(function(r){ return r.map(function(v){ v=String(v==null?'':v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }).join(','); }).join('\r\n');
    var blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8;'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
  }

  // pathLabel() always walks the CURRENT tree; this variant substitutes the leaf name so we can
  // reconstruct a "before" path (e.g. the old name under a rename, or the leaf under its old
  // parent for a move) without needing a snapshot of the whole tree at that point in time.
  function pathLabelWithLeaf(parentId, leafName){
    var parentPath = parentId ? pathLabel(parentId) : '';
    return parentPath ? parentPath + ' / ' + leafName : leafName;
  }

  // ---------- structured CSV exports (distinct from the on-screen copy/paste tables above) ----------
  // Shared role-diff helpers: "before" is the department's pre-session values (falls back to
  // origRoles, which is only set once a role on that node is actually edited); "after" is always
  // the node's current live values. Both CSVs fill every before/after cell — no conditional blanks.
  var ROLE_FIELDS = ['pic', 'hrbp1', 'hrbp2', 'hrbpLead', 'da'];
  function nodeRolesBefore(n){ return n.origRoles || {pic:n.pic, hrbp1:n.hrbp1, hrbp2:n.hrbp2, hrbpLead:n.hrbpLead, da:n.da}; }
  function nodeRolesAfter(n){ return {pic:n.pic, hrbp1:n.hrbp1, hrbp2:n.hrbp2, hrbpLead:n.hrbpLead, da:n.da}; }
  function roleChangeSummary(before, after){
    return ROLE_FIELDS.filter(function(f){ return (before[f]||'') !== (after[f]||''); })
      .map(function(f){ return ct('role_' + f); })
      .join(', ');
  }

  // One row per org-structure change: rename/move/add/delete/role adjustment. Before/after role
  // columns are always fully populated (identical on both sides when this row didn't touch roles);
  // "Role Change" lists which specific role field(s) this row changed, comma-separated.
  function buildOrgChangeRows(){
    var rows = [];
    function pushRow(typeLabel, roleChangeLabel, beforeName, afterName, beforeRoles, afterRoles){
      rows.push({
        sortName: afterName || beforeName,
        cells: [typeLabel, roleChangeLabel, beforeName, beforeRoles.pic||'', beforeRoles.hrbp1||'', beforeRoles.hrbp2||'', beforeRoles.hrbpLead||'', beforeRoles.da||'',
          afterName, afterRoles.pic||'', afterRoles.hrbp1||'', afterRoles.hrbp2||'', afterRoles.hrbpLead||'', afterRoles.da||'']
      });
    }
    log.forEach(function(l){
      if(l.typeKey==='rename'){
        var n = getNode(l.key); if(!n) return;
        var cur = nodeRolesAfter(n);
        pushRow(ct('logType').rename, '', pathLabelWithLeaf(n.parentId, l.params.from), pathLabel(n.id), cur, cur);
      } else if(l.typeKey==='move'){
        var n = getNode(l.key); if(!n) return;
        var cur = nodeRolesAfter(n);
        pushRow(ct('logType').move, '', pathLabelWithLeaf(n.movedFrom, n.name), pathLabel(n.id), cur, cur);
      } else if(l.typeKey==='add'){
        var n = getNode(l.key); if(!n) return;
        pushRow(ct('logType').add, '', '', pathLabel(n.id), {}, nodeRolesAfter(n));
      } else if(l.typeKey==='delete'){
        var n = getNode(l.key); if(!n) return;
        pushRow(ct('logType').delete, '', pathLabel(n.id), '', nodeRolesAfter(n), {});
      } else if(l.typeKey==='role_change'){
        var parts = l.key.split('#'); var n = getNode(parts[0]); if(!n) return;
        var before = nodeRolesBefore(n);
        var after = nodeRolesAfter(n);
        pushRow(ct('logType').role_change, roleChangeSummary(before, after), pathLabel(n.id), pathLabel(n.id), before, after);
      } else if(l.typeKey==='role_cascade'){
        var applied = l.params.appliedValues || {};
        (l.params.beforeValues||[]).forEach(function(bv){
          var n = getNode(bv.id); if(!n) return;
          var before = {pic:n.pic, hrbp1:bv.hrbp1, hrbp2:bv.hrbp2, hrbpLead:bv.hrbpLead, da:bv.da};
          var after = {pic:n.pic, hrbp1:applied.hrbp1, hrbp2:applied.hrbp2, hrbpLead:applied.hrbpLead, da:applied.da};
          pushRow(ct('logType').role_change, roleChangeSummary(before, after), pathLabel(n.id), pathLabel(n.id), before, after);
        });
      }
    });
    rows.sort(function(a,b){
      if(a.sortName !== b.sortName) return a.sortName < b.sortName ? -1 : 1;
      return a.cells[0] < b.cells[0] ? -1 : a.cells[0] > b.cells[0] ? 1 : 0;
    });
    return [ct('csvOrgChangeHeaders')].concat(rows.map(function(r){ return r.cells; }));
  }

  // The department an employee belonged to before this session's edits — same node if they were
  // never physically transferred, otherwise the node keyed by their first emp_transfer's fromId.
  function empOldNode(e){
    var transfer = log.filter(function(l){ return l.typeKey==='emp_transfer' && l.params.eid===e.eid; })[0];
    return (transfer && getNode(transfer.params.fromId)) || getNode(e.nodeId);
  }

  // One row per affected employee (same scope as the on-screen "受影响员工" panel). "Org Change"
  // flags whether their department path itself differs before/after; "Role Change" lists which
  // PIC/HRBP/Assistant field(s) differ between their old and new department. Every before/after
  // column is always filled — identical on both sides when that field wasn't touched.
  function buildPersonnelRows(){
    var rows = computeImpacted().map(function(imp){
      var e = employees.filter(function(x){ return x.eid===imp.eid; })[0];
      var oldNode = empOldNode(e);
      var newNode = getNode(e.nodeId);
      var before = oldNode ? nodeRolesBefore(oldNode) : {};
      var after = newNode ? nodeRolesAfter(newNode) : {};
      var orgChangeLabel = imp.newPath !== imp.oldPath ? ct('orgChangeLabel') : '';
      var roleChangeLabel = roleChangeSummary(before, after);
      return {
        sortName: imp.newPath || imp.oldPath,
        cells: [e.eid, e.name, orgChangeLabel, roleChangeLabel,
          imp.oldPath, e.origReportsTo||'', before.pic||'', before.hrbp1||'', before.hrbp2||'', before.hrbpLead||'', before.da||'',
          imp.newPath, e.reportsTo||'', after.pic||'', after.hrbp1||'', after.hrbp2||'', after.hrbpLead||'', after.da||'', '']
      };
    });
    rows.sort(function(a,b){
      if(a.sortName !== b.sortName) return a.sortName < b.sortName ? -1 : 1;
      return a.cells[1] < b.cells[1] ? -1 : a.cells[1] > b.cells[1] ? 1 : 0;
    });
    return [ct('csvPersonnelHeaders')].concat(rows.map(function(r){ return r.cells; }));
  }

  // ---------- wiring ----------
  // Copy-to-clipboard mirrors the CSV download exactly, minus the header row (Base pastes column
  // headers itself; only the data rows are needed).
  document.getElementById('copyLogBtn').addEventListener('click', function(){ copyText(buildOrgChangeRows().slice(1).map(function(r){ return r.join('\t'); }).join('\n')); });
  document.getElementById('downloadLogBtn').addEventListener('click', function(){ downloadCsv(ct('csvOrgChangeFilename'), buildOrgChangeRows()); });
  document.getElementById('copyEmpBtn').addEventListener('click', function(){ copyText(buildPersonnelRows().slice(1).map(function(r){ return r.join('\t'); }).join('\n')); });
  document.getElementById('downloadEmpBtn').addEventListener('click', function(){ downloadCsv(ct('csvPersonnelFilename'), buildPersonnelRows()); });
  document.getElementById('editCloseBtn').addEventListener('click', closePanel);
  document.getElementById('panelBackdrop').addEventListener('click', closePanel);
  document.addEventListener('keydown', function(ev){ if(ev.key==='Escape' && selectedId) closePanel(); });

  document.getElementById('tabStructureBtn').addEventListener('click', function(){ activeTab='structure'; renderPanel(); });
  document.getElementById('tabRoleBtn').addEventListener('click', function(){ activeTab='role'; renderPanel(); });
  document.getElementById('tabRosterBtn').addEventListener('click', function(){ activeTab='roster'; renderPanel(); });
  document.getElementById('addChildBtn').addEventListener('click', function(){ if(selectedId) openCreateChild(selectedId); });

  document.getElementById('orientSeg').addEventListener('click', function(ev){
    var btn = ev.target.closest('button[data-orient]'); if(!btn) return;
    orientation = btn.getAttribute('data-orient');
    document.querySelectorAll('#orientSeg button').forEach(function(b){ b.classList.toggle('active', b===btn); });
    renderTree();
  });

  document.getElementById('langSeg').addEventListener('click', function(ev){
    var btn = ev.target.closest('button[data-lang]'); if(!btn) return;
    LANG = btn.getAttribute('data-lang');
    document.querySelectorAll('#langSeg button').forEach(function(b){ b.classList.toggle('active', b===btn); });
    applyStaticI18n();
    if(nodes) render();
  });

  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function(){ doSearch(searchInput.value); });
  document.addEventListener('click', function(ev){
    if(!ev.target.closest('.search-box')) document.getElementById('searchResults').classList.remove('show');
  });
  document.getElementById('clearFocus').addEventListener('click', function(){ viewRootId=rootId; render(); });
  window.addEventListener('resize', function(){ if(nodes) drawConnectors(); });

  // ---------- global employee transfer modal ----------
  function openGlobalTransfer(){
    gmodalEmp = null; gmodalOrg = null;
    document.getElementById('gmodalOverlay').classList.add('show');
    renderGModal();
    document.getElementById('gmodalEmpSearch').value = '';
    document.getElementById('gmodalOrgSearch').value = '';
    renderGModalOptions('emp', '');
    renderGModalOptions('org', '');
  }
  function closeGlobalTransfer(){
    var ov = document.getElementById('gmodalOverlay');
    if(ov) ov.classList.remove('show');
  }
  function renderGModal(){
    var empPicked = document.getElementById('gmodalEmpPicked');
    var empSearchWrap = document.getElementById('gmodalEmpSearchWrap');
    if(gmodalEmp){
      empPicked.style.display = 'flex'; empSearchWrap.style.display = 'none';
      empPicked.innerHTML = '<span>'+escapeHtml(gmodalEmp.name)+' <span class="mono" style="color:var(--ink-muted);">'+gmodalEmp.eid+'</span>'+escapeHtml(t('nowAtPrefix'))+escapeHtml(pathLabel(gmodalEmp.nodeId))+'</span><button type="button" id="gmodalEmpClear">'+escapeHtml(t('reselectBtn'))+'</button>';
      document.getElementById('gmodalEmpClear').addEventListener('click', function(){ gmodalEmp=null; renderGModal(); renderGModalOptions('emp',''); });
    } else {
      empPicked.style.display = 'none'; empSearchWrap.style.display = 'block';
    }
    var orgPicked = document.getElementById('gmodalOrgPicked');
    var orgSearchWrap = document.getElementById('gmodalOrgSearchWrap');
    if(gmodalOrg){
      orgPicked.style.display = 'flex'; orgSearchWrap.style.display = 'none';
      orgPicked.innerHTML = '<span>'+escapeHtml(pathLabel(gmodalOrg.id))+'</span><button type="button" id="gmodalOrgClear">'+escapeHtml(t('reselectBtn'))+'</button>';
      document.getElementById('gmodalOrgClear').addEventListener('click', function(){ gmodalOrg=null; renderGModal(); renderGModalOptions('org',''); });
    } else {
      orgPicked.style.display = 'none'; orgSearchWrap.style.display = 'block';
    }
    document.getElementById('gmodalConfirmBtn').disabled = !(gmodalEmp && gmodalOrg && gmodalOrg.id!==gmodalEmp.nodeId);
  }
  function renderGModalOptions(which, q){
    q = (q||'').toLowerCase();
    if(which==='emp'){
      var list = employees.filter(function(e){ return e.name.toLowerCase().indexOf(q)>=0 || e.eid.indexOf(q)>=0; }).slice(0,8);
      var box = document.getElementById('gmodalEmpOptions');
      box.innerHTML = list.length ? list.map(function(e){ return '<button type="button" data-eid="'+e.eid+'">'+escapeHtml(e.name)+' · <span class="mono">'+e.eid+'</span></button>'; }).join('')
        : '<button type="button" disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchEmp'))+'</button>';
      box.querySelectorAll('button[data-eid]').forEach(function(b){
        b.addEventListener('click', function(){
          gmodalEmp = employees.filter(function(e){ return e.eid===b.getAttribute('data-eid'); })[0];
          renderGModal();
        });
      });
    } else {
      var olist = nodes.filter(function(n){ return !n.flags.isDeleted && n.name.toLowerCase().indexOf(q)>=0; }).slice(0,8);
      var obox = document.getElementById('gmodalOrgOptions');
      obox.innerHTML = olist.length ? olist.map(function(n){ return '<button type="button" data-id="'+n.id+'">'+escapeHtml(pathLabel(n.id))+'</button>'; }).join('')
        : '<button type="button" disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchDept'))+'</button>';
      obox.querySelectorAll('button[data-id]').forEach(function(b){
        b.addEventListener('click', function(){
          gmodalOrg = getNode(b.getAttribute('data-id'));
          renderGModal();
        });
      });
    }
  }
  document.getElementById('reportPromptApplyBtn').addEventListener('click', function(){
    if(pendingReportPrompt){
      commitReportChange(pendingReportPrompt.emp, pendingReportPrompt.newSupervisor);
      toast(t('toastReportUpdated'));
      renderLog();
    }
    document.getElementById('reportPromptOverlay').classList.remove('show');
    pendingReportPrompt = null;
  });
  document.getElementById('reportPromptSkipBtn').addEventListener('click', function(){
    document.getElementById('reportPromptOverlay').classList.remove('show');
    pendingReportPrompt = null;
  });

  document.getElementById('globalTransferBtn').addEventListener('click', openGlobalTransfer);
  document.getElementById('addOrgBtn').addEventListener('click', function(){ if(nodes) openCreateChild(viewRootId); });
  document.getElementById('gmodalCancelBtn').addEventListener('click', closeGlobalTransfer);
  document.getElementById('gmodalOverlay').addEventListener('click', function(ev){ if(ev.target.id==='gmodalOverlay') closeGlobalTransfer(); });
  document.getElementById('gmodalEmpSearch').addEventListener('input', function(){ renderGModalOptions('emp', this.value); });
  document.getElementById('gmodalOrgSearch').addEventListener('input', function(){ renderGModalOptions('org', this.value); });
  document.getElementById('gmodalConfirmBtn').addEventListener('click', function(){
    if(!gmodalEmp || !gmodalOrg) return;
    var name = gmodalEmp.name;
    commitEmployeeTransfer(gmodalEmp, gmodalOrg.id);
    toast(t('toastTransferredName')(name));
    closeGlobalTransfer();
    render();
  });

  // ---------- download org chart as PNG ----------
  // Drawn manually onto a <canvas> from each box's real position/content — avoids the
  // well-known Chromium issue where an SVG <foreignObject> containing HTML taints the
  // canvas and blocks toBlob()/toDataURL() even for same-origin content.
  function resolveThemeColors(){
    var cs = getComputedStyle(document.documentElement);
    function g(name){ return cs.getPropertyValue(name).trim(); }
    return {
      bg:g('--bg'), surface:g('--surface'), ink:g('--ink'), inkMuted:g('--ink-muted'), line:g('--line'),
      newBg:g('--new-bg'), newText:g('--new-text'), newBorder:g('--new-border'),
      delBg:g('--del-bg'), delText:g('--del-text'), delBorder:g('--del-border'),
      warnBg:g('--warn-bg'), warnText:g('--warn-text'), warnBorder:g('--warn-border'),
      movBg:g('--mov-bg'), movBorder:g('--mov-border'), movText:g('--mov-text'),
      accent:g('--accent'), accentSoft:g('--accent-soft')
    };
  }
  function roundRectPath(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r);
    ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath();
  }
  function wrapLines(ctx, text, maxWidth, maxLines){
    var words = text.split(/\s+/);
    var lines = [], cur = '';
    for(var i=0;i<words.length;i++){
      var test = cur ? cur+' '+words[i] : words[i];
      if(ctx.measureText(test).width > maxWidth && cur){ lines.push(cur); cur = words[i]; }
      else cur = test;
      if(lines.length===maxLines-1 && i<words.length-1){
        var rest = cur + ' ' + words.slice(i+1).join(' ');
        while(ctx.measureText(rest+'…').width > maxWidth && rest.length>1) rest = rest.slice(0,-1);
        lines.push(rest+'…');
        return lines;
      }
    }
    if(cur) lines.push(cur);
    return lines;
  }
  function drawChartToCanvas(scale){
    var wrap = document.getElementById('treeWrap');
    var wrapRect = wrap.getBoundingClientRect();
    var w = wrap.scrollWidth, h = wrap.scrollHeight;
    var C = resolveThemeColors();
    var canvas = document.createElement('canvas');
    canvas.width = Math.ceil(w*scale); canvas.height = Math.ceil(h*scale);
    var ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, w, h);

    // connectors first (identical geometry to the on-screen SVG overlay)
    computeConnectorSegments().segments.forEach(function(seg){
      ctx.strokeStyle = seg.moved ? C.movText : C.line;
      ctx.setLineDash(seg.moved ? [4,3] : []);
      ctx.lineWidth = 1.5;
      strokeRoundedPolyline(ctx, seg.points, CONNECTOR_RADIUS);
    });
    ctx.setLineDash([]);

    document.querySelectorAll('#treeRoot .node, #treeRoot .node-ghost').forEach(function(el){
      var r = el.getBoundingClientRect();
      var x = r.left - wrapRect.left, y = r.top - wrapRect.top;
      var isGhost = el.classList.contains('node-ghost');
      var isDeleted = el.classList.contains('st-deleted');
      var isNew = el.classList.contains('st-new');
      var isMoved = el.classList.contains('st-moved');
      var isRenamed = el.classList.contains('st-renamed');
      var bg = isGhost ? C.delBg : isDeleted ? C.warnBg : isNew ? C.newBg : isMoved ? C.movBg : isRenamed ? C.accentSoft : C.surface;
      var border = isGhost ? C.delBorder : isDeleted ? C.warnBorder : isNew ? C.newBorder : isMoved ? C.movBorder : isRenamed ? C.accent : C.line;
      var textColor = isGhost ? C.delText : isDeleted ? C.warnText : C.ink;

      roundRectPath(ctx, x, y, r.width, r.height, 9);
      ctx.fillStyle = bg; ctx.fill();
      ctx.strokeStyle = border; ctx.lineWidth = 1.5; ctx.stroke();

      var padX = 12, cy = y + 11;
      var nameEl = el.querySelector('.name');
      ctx.fillStyle = textColor;
      ctx.font = '700 12.5px -apple-system, "Segoe UI", sans-serif';
      ctx.textBaseline = 'top';
      var nameLines = wrapLines(ctx, nameEl ? nameEl.textContent : '', r.width - padX*2, 2);
      nameLines.forEach(function(line){ ctx.fillText(line, x+padX, cy); cy += 15; if(isGhost){ ctx.font = 'italic 10.5px -apple-system, "Segoe UI", sans-serif'; } });

      if(isGhost){
        var arrowEl = el.querySelector('.arrow');
        ctx.fillStyle = C.movText;
        ctx.font = '10.5px -apple-system, "Segoe UI", sans-serif';
        ctx.fillText(arrowEl ? arrowEl.textContent : '', x+padX, cy+2);
      } else {
        cy += 2;
        ctx.font = '10.5px -apple-system, "Segoe UI", sans-serif';
        ctx.fillStyle = C.inkMuted;
        el.querySelectorAll('.meta-line').forEach(function(m){ ctx.fillText(m.textContent, x+padX, cy); cy += 13; });
        var tagY = cy + 3;
        var tagX = x + padX;
        el.querySelectorAll('.tag').forEach(function(tag){
          ctx.font = '700 9.5px -apple-system, "Segoe UI", sans-serif';
          var tw = ctx.measureText(tag.textContent).width + 10;
          ctx.fillStyle = C.bg;
          roundRectPath(ctx, tagX, tagY, tw, 14, 4); ctx.fill();
          ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke();
          ctx.fillStyle = C.inkMuted;
          ctx.fillText(tag.textContent, tagX+5, tagY+2);
          tagX += tw + 4;
        });
      }
    });
    return canvas;
  }
  document.getElementById('downloadPngBtn').addEventListener('click', function(){
    try{
      var canvas = drawChartToCanvas(2);
      canvas.toBlob(function(blob){
        if(!blob){ toast(t('toastPngFailed')); return; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = LANG==='zh' ? '组织架构图.png' : 'org-chart.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast(t('toastPngDone'));
      }, 'image/png');
    }catch(e){
      toast(t('toastPngError')(e.message));
    }
  });

  // ---------- generic confirm modal (used by "refresh", which can now discard real local edits) ----------
  var pendingConfirm = null;
  function showConfirm(title, message, okLabel, onConfirm){
    pendingConfirm = onConfirm;
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmText').textContent = message;
    document.getElementById('confirmOkBtn').textContent = okLabel;
    document.getElementById('confirmOverlay').classList.add('show');
  }
  document.getElementById('confirmOkBtn').addEventListener('click', function(){
    document.getElementById('confirmOverlay').classList.remove('show');
    var fn = pendingConfirm; pendingConfirm = null;
    if(fn) fn();
  });
  document.getElementById('confirmCancelBtn').addEventListener('click', function(){
    document.getElementById('confirmOverlay').classList.remove('show');
    pendingConfirm = null;
  });

  // ---------- real Lark login/logout (redirects through the Vercel serverless functions in /api) ----------
  function showLoginOverlay(){
    document.getElementById('app').classList.remove('ready');
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('loginCard').classList.remove('loading');
    document.getElementById('loginBtnText').textContent = t('loginBtnText');
  }
  document.getElementById('loginBtn').addEventListener('click', function(){
    document.getElementById('loginCard').classList.add('loading');
    document.getElementById('loginBtnText').textContent = t('loginBtnTextLoading');
    window.location.href = '/api/auth/login';
  });
  document.getElementById('logoutBtn').addEventListener('click', function(){
    clearSavedState();
    window.location.href = '/api/auth/logout';
  });
  document.getElementById('refreshBtn').addEventListener('click', function(){
    showConfirm(
      t('refreshBtn'),
      LANG==='zh' ? '会重新从 Base 拉取最新数据，当前未导出的本地编辑（重命名、移动、角色变更等）会被放弃，确定继续？' : 'This re-fetches the latest data from Base. Any unexported local edits (renames, moves, role changes, etc.) will be discarded. Continue?',
      LANG==='zh' ? '确认刷新' : 'Refresh',
      function(){
        var btn = document.getElementById('refreshBtn');
        btn.disabled = true;
        btn.textContent = t('refreshBtnLoading');
        init().then(function(){
          btn.disabled = false;
          btn.textContent = t('refreshBtn');
        });
      }
    );
  });

  document.getElementById('noAccessLogoutBtn').addEventListener('click', function(){
    clearSavedState();
    window.location.href = '/api/auth/logout';
  });

  // ---------- bootstrap: is there already a valid session? ----------
  applyStaticI18n();
  fetch('/api/auth/me', {credentials:'same-origin'})
    .then(function(res){ return res.ok ? res.json() : null; })
    .then(function(me){
      if(!me){ showLoginOverlay(); return; }
      document.getElementById('userName').textContent = me.name;
      return fetch('/api/permissions/me', {credentials:'same-origin'})
        .then(function(res){ return res.ok ? res.json() : {role:null}; })
        .then(function(perm){
          currentUserRole = perm.role;
          document.getElementById('loginOverlay').style.display = 'none';
          if(!currentUserRole){
            document.getElementById('noAccessOverlay').style.display = 'flex';
            return;
          }
          applyRoleGating();
          document.getElementById('app').classList.add('ready');
          var saved = loadSavedState();
          if(saved) restoreState(saved); else init();
        });
    })
    .catch(function(){ showLoginOverlay(); });
})();
