(function(){

  // ---------- i18n ----------
  var LANG = 'en';
  var STR = {
    zh: {
      loginTitle:'组织架构调整工具', loginSubtitle:'需要登录后才能查看组织架构与员工数据',
      loginBtnText:'使用飞书账号登录', loginBtnTextLoading:'登录中…',
      noAccessTitle:'暂无访问权限', noAccessSubtitle:'你的飞书账号还没有被授权使用这个工具，请联系管理员开通访问权限。',
      viewAdmin:'权限设置', adminTitle:'权限设置',
      adminEmailPh:'邮箱', adminNamePh:'姓名（可选）', adminAddBtn:'添加',
      adminColEmail:'邮箱', adminColRole:'角色',
      roleOwner:'最高管理员', roleSeniorAdmin:'高级管理员', roleEditor:'编辑用户', roleViewer:'访问用户',
      adminLoading:'加载中…', adminNoUsers:'还没有添加任何用户',
      adminTransferOwnerBtn:'转为最高管理员', adminRemoveBtn:'移除',
      adminRemoveConfirm:'确定要移除该用户的访问权限吗？', adminTransferOwnerConfirm:'确定要把最高管理员身份转移给该用户吗？转移后你会变成高级管理员。',
      adminSaved:'已保存', adminNeedEmail:'请填写邮箱', adminOnlyOwnerGrantsSenior:'只有最高管理员能设置高级管理员',
      editWindowTitle:'编辑时间窗口',
      editWindowHint:'只有在此时间范围内才能编辑组织架构（重命名、移动、删除、角色变更、员工调动等）。开始/结束都留空则不限制编辑时间。',
      editWindowStartLabel:'开始时间', editWindowEndLabel:'结束时间', editWindowClearBtn:'清除限制',
      editWindowInvalidRange:'开始时间必须早于结束时间',
      editWindowLockedBanner:function(range){ return '当前不在允许编辑的时间段内' + (range?'（'+range+'）':'') + '，编辑功能已暂时隐藏。'; },
      clearChangelogTitle:'清空共享变更记录',
      clearChangelogHint:'移除所有用户共享的变更历史（不可恢复）。不会影响任何人本地尚未导出的编辑草稿。',
      clearChangelogBtn:'清空共享变更记录',
      clearChangelogConfirm:'确定要清空所有人共享的变更记录吗？此操作不可恢复。',
      toastChangelogCleared:'已清空共享变更记录',
      exportChangeLogTitle:'写入变更记录到Base',
      exportChangeLogHint:'把上次写入之后新产生的组织/人员变更，自动写入"Org change log"和"Employee change log"两张表。',
      exportChangeLogBtn:'写入变更记录到Base',
      exportChangeLogBtnLoading:'正在写入…',
      toastExportChangeLogNone:'没有新的变更需要写入',
      toastExportChangeLogDone:function(p){ return '已写入 ' + p.orgCount + ' 条组织变更、' + p.empCount + ' 条人员变更'; },
      toastExportChangeLogFailed:'写入失败，请稍后重试',
      exportWatermarkLabel:'已归档到（水位线）',
      exportWatermarkInvalid:'时间格式无效',
      toastWatermarkSaved:'水位线已更新',
      pageTitle:'组织架构调整工具',
      scopeTag:'正在加载组织数据…',
      scopeTagLoaded:function(p){ return '共 ' + p.nodeCount + ' 个组织节点 · ' + p.empCount + ' 名在职员工 · 数据来自 Lark Base'; },
      loggedInAs:'已登录：', logoutBtn:'退出',
      snapshotLabel:'数据快照时间：', refreshBtn:'刷新数据', refreshBtnLoading:'刷新中…',
      searchPlaceholder:'搜索组织架构名称…', searchEmpNamePlaceholder:'搜索员工姓名…', focusPrefix:'聚焦于「', focusSuffix:'」',
      globalTransferBtn:'转移员工', addOrgBtn:'新增组织架构', viewChart:'组织架构图', viewUnassigned:'待安置员工',
      expandAllBtn:'全部展开', collapseAllBtn:'全部折叠', expandTitle:'展开', collapseTitle:'折叠',
      refreshEditsBtn:'刷新编辑', refreshEditsBtnLoading:'刷新中…', toastEditsRefreshed:'已拉取最新的变更记录', toastEditsRefreshFailed:'拉取变更记录失败',
      refreshEditsConfirmDiscard:'你还有尚未同步的本地编辑草稿，刷新会丢弃这些草稿（已同步的变更不受影响）。确定继续吗？',
      zoomInTitle:'放大', zoomOutTitle:'缩小',
      orientLabel:'查看方向', orientVertical:'纵向', orientHorizontal:'横向',
      langLabel:'语言', downloadPngBtn:'下载组织架构图（PNG）',
      legendNew:'新增', legendDelete:'删除', legendMoved:'移动', legendRenamed:'已改名', legendRoleWarn:'⚠ 角色不一致',
      changeLogTitle:'变更记录', unitRecords:'条', colType:'类型', colDetail:'详情', colEditor:'编辑人', colEditTime:'编辑时间',
      logEmptyNote:'暂无变更，点一个部门框试试', downloadCsvBtn:'下载 CSV',
      affectedEmpTitle:'受影响员工', unitPeople:'人', colName:'姓名', colPathChange:'原组织架构 → 新组织架构', colReportsTo:'汇报对象',
      colDivision:'Division', colBusinessUnit:'Business Unit', colDepartment:'Department', colTeam:'Team', colSubTeam:'Sub Team', colSection:'Section', colStatus:'Status', colHrbpLead:'HRBP Lead',
      empEmptyNote:'还没有员工受影响',
      unassignedTitle:'待安置员工', unassignedEmptyNote:'暂无待安置员工', unassignedTransferBtn:'转移',
      addChildTitle:'新增子部门', tabStructure:'编辑类型', tabRole:'变更角色', tabRoster:'下辖员工名单',
      transferModalTitle:'转移员工', fieldEmployee:'员工', searchEmpPlaceholder:'搜索姓名或 EID…',
      fieldTargetOrg:'目标组织架构', searchOrgPlaceholder:'搜索目标部门…', cancelBtn:'取消', confirmTransferBtn:'确认转移',
      reportPromptTitle:'是否同步更新汇报关系？', skipBtn:'保持不变', applyReportBtn:'更新汇报对象',

      empty:'（空）', notSet:'未设置', changeBtn:'更改', reselectBtn:'重选', closeBtn:'关闭',
      newTag:'新增', renamedTag:'已改名', movedTag:'已移动', inactiveTag:'既有停用',
      movedFromLabel:function(name){ return '原上级：' + name; },
      renamedTooltipPrefix:'原名：', roleWarnTooltip:'下级部门角色不一致或未设置',
      picPrefix:'PIC：', headcountLabel:function(n){ return '在职 ' + n + ' 人'; },
      focusLabel:function(name){ return '聚焦于「' + name + '」'; },
      selectAllLabel:function(n){ return '全选（' + n + ' 人）'; },
      transferSelectedBtn:function(n){ return '转移已选员工（' + n + '）'; },
      reportsToPrefix:' · 汇报对象：',
      nowAtPrefix:' — 现在：',
      matchLabel:function(eid){ return eid; },

      dragHint:function(name){ return '提示：也可以直接在图上把「' + name + '」拖到目标部门上完成移动；拖到同级部门上则只调整显示顺序（仅保存在本地浏览器）。'; },
      renameLbl:'重命名', renameInputPh:'新名称',
      moveLbl:'移动', movePlaceholder:'选择目标上级部门…', moveHint:'下拉列表已排除自身及其所有子部门，避免循环嵌套。',
      deleteLbl:'删除该部门',
      deleteCascadeNote:function(n){ return '下面还有 ' + n + ' 个子部门，删除本部门时会一并删除它们。'; },
      deleteCascadeConfirmTitle:'确认删除子部门',
      deleteCascadeConfirmText:function(n){ return '此操作将同时删除下面的 ' + n + ' 个子部门，确定要继续吗？'; },
      deleteCascadeOkBtn:'确认删除',
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

      toastDeleteBlockedEmp:function(n){ return '还有 ' + n + ' 名员工尚未安置新部门'; },
      toastDeleted:'已标记删除', toastNothingToSave:'没有可保存的变更', toastSaved:'已保存变更',
      toastNeedName:'请填写新部门名称', toastAdded:'已新增部门',
      toastNameDuplicate:'该名称已存在，请换一个', toastNameInvalidChars:'名称不能包含特殊符号（如 & - 等），只能使用文字、数字和空格',
      toastPickBulkTarget:'请先选择批量目标部门', toastCascaded:'已应用到所有下级部门',
      toastPickTransferTarget:'请先选择转移目标部门', toastTransferredN:function(n){ return '已转移 ' + n + ' 名员工'; },
      toastUndoDeleted:'已撤销删除', toastMovePending:'已选定目标，点击"保存"确认这次移动',
      toastReorderDone:'已调整排序（仅保存在本地浏览器）',
      toastReportUpdated:'已更新汇报对象', toastTransferredName:function(name){ return '已转移 ' + name; },
      toastPngFailed:'导出失败，请改用浏览器自带的截图功能', toastPngDone:'已下载 PNG',
      toastPngError:function(msg){ return '导出失败：' + msg; },
      toastPngNeedsChartView:'请先切换到"组织架构图"页面，再下载', toastPngTooLarge:'组织架构图展开范围太大，已自动缩小导出比例；如仍失败，请先折叠部分分支再试',
      deletedPanelNote:'该部门已标记删除。删除时涉及的员工已安置到其他部门；撤销删除会把他们迁回来。',
      undoDeleteBtn:'撤销删除',

      reportPromptText:function(p){ return '「' + p.dept + '」已移动到「' + p.parent + '」下。是否把负责人「' + p.pic + '」的直属汇报对象，从「' + (p.from||STR.zh.empty) + '」改为「' + p.to + '」？'; },

      role_pic:'PIC', role_hrbp1:'HRBP1', role_hrbp2:'HRBP2', role_hrbpLead:'HRBP Lead', role_da:'Department Assistant', role_reportsTo:'Reports-to',

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
      csvOrgChangeHeaders:['变更类型','角色变动','变更前的组织架构名','变更前PIC','变更前HRBP1','变更前HRBP2','变更前HRBP Lead','变更前Assistant','变更后的组织架构名','变更后PIC','变更后HRBP1','变更后HRBP2','变更后HRBP Lead','变更后Assistant','编辑时间'],
      csvPersonnelHeaders:['EID','员工名','组织变更','角色变更','变更前的组织架构','变更前汇报对象','变更前HRBP1','变更前HRBP2','变更前HRBP Lead','变更前Assistant','变更后组织架构','变更后汇报对象','变更后HRBP1','变更后HRBP2','变更后HRBP Lead','变更后Assistant','备注','编辑时间'],
      csvOrgChangeFilename:'组织变更记录.csv', csvPersonnelFilename:'人员变更记录.csv'
    },
    en: {
      loginTitle:'Org Structure Change Tool', loginSubtitle:'Sign in to view the org structure and employee data',
      loginBtnText:'Sign in with Lark', loginBtnTextLoading:'Signing in…',
      noAccessTitle:'No access yet', noAccessSubtitle:"Your Lark account hasn't been granted access to this tool yet — ask an admin to add you.",
      viewAdmin:'Permission Setting', adminTitle:'Permission Setting',
      adminEmailPh:'Email', adminNamePh:'Name (optional)', adminAddBtn:'Add',
      adminColEmail:'Email', adminColRole:'Role',
      roleOwner:'Owner', roleSeniorAdmin:'Senior Admin', roleEditor:'Editor', roleViewer:'Viewer',
      adminLoading:'Loading…', adminNoUsers:'No users added yet',
      adminTransferOwnerBtn:'Make Owner', adminRemoveBtn:'Remove',
      adminRemoveConfirm:"Revoke this user's access?", adminTransferOwnerConfirm:'Transfer Owner to this user? You will become a Senior Admin.',
      adminSaved:'Saved', adminNeedEmail:'Please enter an email', adminOnlyOwnerGrantsSenior:'Only the Owner can grant Senior Admin',
      editWindowTitle:'Edit window',
      editWindowHint:'Editing the org structure (rename, move, delete, role changes, employee transfers, etc.) is only allowed within this time range. Leave both blank to remove the restriction.',
      editWindowStartLabel:'Start time', editWindowEndLabel:'End time', editWindowClearBtn:'Clear restriction',
      editWindowInvalidRange:'Start time must be before end time',
      editWindowLockedBanner:function(range){ return "You're outside the allowed editing window" + (range?' ('+range+')':'') + ' — editing controls are hidden for now.'; },
      clearChangelogTitle:'Clear shared change log',
      clearChangelogHint:"Removes everyone's shared change history (cannot be undone). Does not affect anyone's local, not-yet-exported drafts.",
      clearChangelogBtn:'Clear shared change log',
      clearChangelogConfirm:"Clear everyone's shared change log? This cannot be undone.",
      toastChangelogCleared:'Shared change log cleared',
      exportChangeLogTitle:'Archive changes to Base',
      exportChangeLogHint:'Writes org/personnel changes made since the last archive into the "Org change log" and "Employee change log" tables.',
      exportChangeLogBtn:'Archive changes to Base',
      exportChangeLogBtnLoading:'Archiving…',
      toastExportChangeLogNone:'No new changes to archive',
      toastExportChangeLogDone:function(p){ return 'Archived ' + p.orgCount + ' org change(s), ' + p.empCount + ' personnel change(s)'; },
      toastExportChangeLogFailed:'Archive failed, please try again',
      exportWatermarkLabel:'Archived up to (watermark)',
      exportWatermarkInvalid:'Invalid date/time',
      toastWatermarkSaved:'Watermark updated',
      pageTitle:'Org Structure Change Tool',
      scopeTag:'Loading org data…',
      scopeTagLoaded:function(p){ return p.nodeCount + ' org units · ' + p.empCount + ' active employees · live from Lark Base'; },
      loggedInAs:'Signed in as: ', logoutBtn:'Sign out',
      snapshotLabel:'Data snapshot: ', refreshBtn:'Refresh data', refreshBtnLoading:'Refreshing…',
      searchPlaceholder:'Search org unit name…', searchEmpNamePlaceholder:'Search employee name…', focusPrefix:'Focused on "', focusSuffix:'"',
      globalTransferBtn:'Transfer employee', addOrgBtn:'Add org unit', viewChart:'Org Chart', viewUnassigned:'Unassigned',
      expandAllBtn:'Expand All', collapseAllBtn:'Collapse All', expandTitle:'Expand', collapseTitle:'Collapse',
      refreshEditsBtn:'Refresh edits', refreshEditsBtnLoading:'Refreshing…', toastEditsRefreshed:'Pulled the latest change log', toastEditsRefreshFailed:'Failed to pull the change log',
      refreshEditsConfirmDiscard:"You have local edits that haven't been synced yet — refreshing will discard them (already-synced changes are unaffected). Continue?",
      zoomInTitle:'Zoom in', zoomOutTitle:'Zoom out',
      orientLabel:'Layout', orientVertical:'Vertical', orientHorizontal:'Horizontal',
      langLabel:'Language', downloadPngBtn:'Download chart (PNG)',
      legendNew:'New', legendDelete:'Deleted', legendMoved:'Moved', legendRenamed:'Renamed', legendRoleWarn:'⚠ Role inconsistent',
      changeLogTitle:'Change log', unitRecords:'', colType:'Type', colDetail:'Detail', colEditor:'Editor', colEditTime:'Edit time',
      logEmptyNote:'No changes yet — try clicking a department box', downloadCsvBtn:'Download CSV',
      affectedEmpTitle:'Affected employees', unitPeople:'', colName:'Name', colPathChange:'Old org → New org', colReportsTo:'Direct Manager',
      colDivision:'Division', colBusinessUnit:'Business Unit', colDepartment:'Department', colTeam:'Team', colSubTeam:'Sub Team', colSection:'Section', colStatus:'Status', colHrbpLead:'HRBP Lead',
      empEmptyNote:'No employees affected yet',
      unassignedTitle:'Unassigned employees', unassignedEmptyNote:'No unassigned employees', unassignedTransferBtn:'Transfer',
      addChildTitle:'Add sub-department', tabStructure:'Edit type', tabRole:'Roles', tabRoster:'Team roster',
      transferModalTitle:'Transfer employee', fieldEmployee:'Employee', searchEmpPlaceholder:'Search by name or EID…',
      fieldTargetOrg:'Target org unit', searchOrgPlaceholder:'Search target department…', cancelBtn:'Cancel', confirmTransferBtn:'Confirm transfer',
      reportPromptTitle:'Sync the reporting line too?', skipBtn:'Leave as is', applyReportBtn:'Update reporting line',

      empty:'(empty)', notSet:'Not set', changeBtn:'Change', reselectBtn:'Change', closeBtn:'Close',
      newTag:'New', renamedTag:'Renamed', movedTag:'Moved', inactiveTag:'Inactive (Lark)',
      movedFromLabel:function(name){ return 'Previous parent: ' + name; },
      renamedTooltipPrefix:'Was: ', roleWarnTooltip:'Role inconsistent or unset among sub-departments',
      picPrefix:'PIC: ', headcountLabel:function(n){ return n + (n===1?' employee':' employees'); },
      focusLabel:function(name){ return 'Focused on "' + name + '"'; },
      selectAllLabel:function(n){ return 'Select all (' + n + ')'; },
      transferSelectedBtn:function(n){ return 'Transfer selected (' + n + ')'; },
      reportsToPrefix:' · Direct Manager: ',
      nowAtPrefix:' — currently: ',
      matchLabel:function(eid){ return eid; },

      dragHint:function(name){ return 'Tip: you can also drag "' + name + '" onto a target department on the chart to move it; dropping it on a sibling department just reorders the display (saved to this browser only).'; },
      renameLbl:'Rename', renameInputPh:'New name',
      moveLbl:'Move', movePlaceholder:'Choose a target parent department…', moveHint:'The list excludes this department and all of its sub-departments to avoid circular nesting.',
      deleteLbl:'Delete this department',
      deleteCascadeNote:function(n){ return 'There ' + (n===1?'is':'are') + ' still ' + n + ' sub-department(s) below — deleting this department will delete them too.'; },
      deleteCascadeConfirmTitle:'Confirm deleting sub-departments',
      deleteCascadeConfirmText:function(n){ return 'This will also delete the ' + n + ' sub-department(s) below it. Continue?'; },
      deleteCascadeOkBtn:'Delete',
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

      toastDeleteBlockedEmp:function(n){ return n + ' employee(s) still need a new department'; },
      toastDeleted:'Marked as deleted', toastNothingToSave:'No changes to save', toastSaved:'Changes saved',
      toastNeedName:'Please enter a department name', toastAdded:'Department added',
      toastNameDuplicate:'That name is already in use — pick another', toastNameInvalidChars:'Names can\'t contain special symbols (like & or -) — letters, numbers, and spaces only',
      toastPickBulkTarget:'Choose a bulk target department first', toastCascaded:'Applied to all sub-departments',
      toastPickTransferTarget:'Choose a transfer target department first', toastTransferredN:function(n){ return 'Transferred ' + n + ' employee(s)'; },
      toastUndoDeleted:'Deletion undone', toastMovePending:'Target selected — click "Save" to confirm the move',
      toastReorderDone:'Order updated (saved to this browser only)',
      toastReportUpdated:'Reporting line updated', toastTransferredName:function(name){ return 'Transferred ' + name; },
      toastPngFailed:'Export failed — please use your browser’s screenshot tool instead', toastPngDone:'PNG downloaded',
      toastPngError:function(msg){ return 'Export failed: ' + msg; },
      toastPngNeedsChartView:'Switch to the "Org Chart" tab before downloading', toastPngTooLarge:'The expanded chart is very large — export scale was reduced automatically; collapse some branches first if it still fails',
      deletedPanelNote:'This department is marked as deleted. Employees affected by this deletion were reassigned; undoing the deletion moves them back.',
      undoDeleteBtn:'Undo delete',

      reportPromptText:function(p){ return '"' + p.dept + '" moved under "' + p.parent + '". Update the reporting line for its PIC "' + p.pic + '" from "' + (p.from||STR.en.empty) + '" to "' + p.to + '"?'; },

      role_pic:'PIC', role_hrbp1:'HRBP1', role_hrbp2:'HRBP2', role_hrbpLead:'HRBP Lead', role_da:'Department Assistant', role_reportsTo:'Direct Manager',

      logType:{ rename:'Rename', move:'Transfer Org', add:'Add', emp_transfer:'Transfer Emp', delete:'Delete', undo_delete:'Undo delete', role_change:'Role change', role_cascade:'Role cascade', report_change:'Reporting line' },
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
      csvOrgChangeHeaders:['Change Type','Role Change','Org Unit Before','PIC Before','HRBP1 Before','HRBP2 Before','HRBP Lead Before','Assistant Before','Org Unit After','PIC After','HRBP1 After','HRBP2 After','HRBP Lead After','Assistant After','Edit Time'],
      csvPersonnelHeaders:['EID','Name','Org Change','Role Change','Org Before','Direct Manager Before','HRBP1 Before','HRBP2 Before','HRBP Lead Before','Assistant Before','Org After','Direct Manager After','HRBP1 After','HRBP2 After','HRBP Lead After','Assistant After','Notes','Edit Time'],
      csvOrgChangeFilename:'org-change-record.csv', csvPersonnelFilename:'personnel-change-record.csv'
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
  var currentUserName = '';
  // Tool-wide edit window (start/end are datetime-local strings, e.g. "2026-08-20T09:00", or
  // null for "no restriction"), fetched from /api/settings/edit-window. No role is exempt —
  // Senior Admin/Owner are locked out of editing the org data too, same as Editor; only access
  // to the admin page itself (and this setting) stays ungated, or nobody could ever reopen it.
  var editWindow = {start:null, end:null};
  function isWithinEditWindow(){
    if(!editWindow.start && !editWindow.end) return true;
    var now = new Date();
    if(editWindow.start && now < new Date(editWindow.start)) return false;
    if(editWindow.end && now > new Date(editWindow.end)) return false;
    return true;
  }
  function canEdit(){ return (currentUserRole==='Editor' || currentUserRole==='Senior Admin' || currentUserRole==='Owner') && isWithinEditWindow(); }
  function isAdminRole(){ return currentUserRole==='Senior Admin' || currentUserRole==='Owner'; }
  function formatEditWindowRange(){
    var s = editWindow.start ? editWindow.start.replace('T',' ') : '';
    var e = editWindow.end ? editWindow.end.replace('T',' ') : '';
    return s && e ? (s + ' → ' + e) : (s || e);
  }
  function fetchEditWindow(){
    return fetch('/api/settings/edit-window', {credentials:'same-origin'})
      .then(function(res){ return res.ok ? res.json() : {start:null, end:null}; })
      .then(function(data){ editWindow = {start:data.start||null, end:data.end||null}; })
      .catch(function(){});
  }

  // ---------- live data (fetched from /api/org-data, which reads Lark Base on every call) ----------
  var personPool = [];
  var rootId = 'root';

  var nodes, employees, log, selectedId, viewRootId, orientation, logSeq, tempCounter, dragSrcId, pendingEdit, activeTab, createDraft, rosterSelected, rosterBulkTarget, gmodalEmp, gmodalOrg, pendingReportPrompt, snapshotAt, unassignedId, unassignedTargets, collapsed, zoomPct;
  // Other users' edits, pulled on demand from the shared "Change Log" Base table (never touched
  // by init()/the "刷新数据" refresh, which only re-reads the 3 org-source tables). Display-only —
  // CSV export still reads `log` alone, since it needs live local node state to build correct diffs.
  var remoteLog = [];
  // Untouched copy of nodes/employees exactly as loaded, before this session's own edits mutate
  // the live `nodes`/`employees` in place. This is the baseline the cross-user combined CSV
  // replays everyone's shared history onto — never mutated after being set in init()/applyCombinedReplay().
  var pristineNodes, pristineEmployees;

  // ---------- local persistence ----------
  // Deliberately no localStorage persistence: a browser refresh or a "刷新编辑" click always
  // starts from the current shared state, discarding this session's own not-yet-synced drafts
  // too — otherwise a stale reopened tab makes it easy to redo an edit someone already made.
  //
  // Sibling display order is the one exception: it's never written to Base, never appears in
  // the change log/export, and carries no org-structure meaning — purely "which order this
  // browser draws siblings in" — so there's no shared state for it to go stale against, and it
  // survives a refresh (and forceRefresh) on purpose so an admin's manual arrangement sticks.
  var SIBLING_ORDER_KEY = 'newOrgChange.siblingOrder.v1';
  function loadManualOrder(){
    try { return JSON.parse(localStorage.getItem(SIBLING_ORDER_KEY)) || {}; }
    catch(e){ return {}; }
  }
  function saveManualOrder(){
    try { localStorage.setItem(SIBLING_ORDER_KEY, JSON.stringify(manualOrder)); } catch(e){}
  }
  var manualOrder = loadManualOrder();

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

  // Reads the frozen snapshot by default — resets any in-progress local edits (matches the
  // earlier "reset demo" behavior). Pass forceRefresh (only from the admin "刷新数据" button) to
  // have the server rewrite the snapshot from the live source tables first; a plain load/restore
  // always gets whatever the snapshot last held, however stale, per the "only refresh on demand"
  // design — this can take a while server-side, see vercel.json's extended timeout for this route.
  function init(forceRefresh){
    var wrap = document.getElementById('treeWrap');
    wrap.style.opacity = '.4';
    return fetch('/api/org-data' + (forceRefresh ? '?refresh=1' : ''), {credentials:'same-origin'})
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
        // Independent copies (hydrateNodes/.map build fresh objects each call) — this session's
        // own edits mutate `nodes`/`employees` in place, but must never touch these.
        pristineNodes = hydrateNodes(data.nodes);
        pristineEmployees = data.employees.map(function(e){ return {eid:e.eid, name:e.name, nodeId:e.nodeId, reportsTo:e.reportsTo||''}; });
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


  function getNode(id){ for(var i=0;i<nodes.length;i++) if(nodes[i].id===id) return nodes[i]; return null; }
  // Default sibling order: 0-headcount departments sink to the end, everything else keeps
  // whatever relative order it arrived in (Base row order) — stable partition, not a full sort.
  function defaultOrder(kids){
    var nonZero = [], zero = [];
    kids.forEach(function(n){ (rollupHeadcount(n.id)===0 ? zero : nonZero).push(n); });
    return nonZero.concat(zero);
  }
  function getChildren(id){
    var kids = nodes.filter(function(n){ return n.parentId===id; });
    var order = manualOrder[id];
    if(!order || !order.length) return defaultOrder(kids);
    var byId = {}; kids.forEach(function(n){ byId[n.id] = n; });
    var used = {}; var ordered = [];
    order.forEach(function(cid){ if(byId[cid] && !used[cid]){ ordered.push(byId[cid]); used[cid] = true; } });
    var rest = kids.filter(function(n){ return !used[n.id]; });
    return ordered.concat(defaultOrder(rest));
  }
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

  // Mirrors a local log entry to the shared "Change Log" Base table (best-effort, fire-and-forget
  // — a network/API failure here must never block or interrupt local editing). Append-only: an
  // upsertLog update pushes a new remote row rather than editing a prior one, so the shared feed
  // is an honest full history (including things later reverted), while the local `log` array
  // stays the "current plan" view CSV export reads from.
  function pushRemoteChangeLog(entry){
    fetch('/api/changelog', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({typeKey:entry.typeKey, key:entry.key, params:entry.params, by:entry.by, time:entry.time})})
      .then(function(res){ return res.ok ? res.json() : null; })
      .then(function(data){ if(data && data.recordId) entry.recordId = data.recordId; })
      .catch(function(){});
  }
  // Pulls other sessions' actions from the shared table — deliberately independent of init()'s
  // org-source refetch (the "刷新数据" admin button), per request: refreshing edits shouldn't
  // also re-pull Structures/Employees/Lark User.
  function fetchRemoteChangeLog(){
    return fetch('/api/changelog', {credentials:'same-origin'})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(data){ remoteLog = data.entries || []; });
  }
  // Log entries store a typeKey + structured params, formatted into display text at render
  // time via STR[LANG] — this is what lets the language toggle re-render existing history
  // correctly, instead of freezing whatever language was active when each entry was created.
  function addLog(typeKey, params, key){
    var entry = {seq:logSeq++, typeKey:typeKey, params:params||{}, key:key||null, by:currentUserName, time:Date.now()};
    log.push(entry);
    pushRemoteChangeLog(entry);
  }
  // Rename / move / role-change are reversible within a session — upsertLog keeps exactly ONE
  // entry per (typeKey, key), always describing session-original → current, so undoing an edit
  // (or moving a department out and back) removes the noise instead of leaving a "process" trail.
  function upsertLog(typeKey, key, params){
    var existing = log.filter(function(l){ return l.typeKey===typeKey && l.key===key; })[0];
    if(existing){ existing.params = params; existing.by = currentUserName; existing.time = Date.now(); pushRemoteChangeLog(existing); }
    else { var entry = {seq:logSeq++, typeKey:typeKey, params:params, key:key, by:currentUserName, time:Date.now()}; log.push(entry); pushRemoteChangeLog(entry); }
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
    // Includes a timestamp+random component, not just a per-session counter — two different
    // people's sessions both start tempCounter at 1, so a plain 'new-1' would collide once their
    // actions land in the same shared table, wrongly conflating two unrelated new departments
    // when the combined cross-user report replays it.
    var id = 'new-' + Date.now() + '-' + Math.floor(Math.random()*1e6) + '-' + (tempCounter++);
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
    // roleBits stays for the existing on-screen log text (language-formatted at commit time);
    // the raw fields are what the cross-user replay engine actually consumes.
    addLog('add', {name:val, parent:parentNode.name, roleBits:roleBits,
      pic:newNode.pic, hrbp1:newNode.hrbp1, hrbp2:newNode.hrbp2, hrbpLead:newNode.hrbpLead, da:newNode.da}, id);
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
  // Deleting a department with sub-departments now cascades: the whole subtree (n + all live
  // descendants) goes together in one commit. The only remaining gate is headcount — every
  // employee anywhere in the subtree must have a reassignment target outside it (the org pickers
  // used for those targets already exclude n and its descendants). Each node in the subtree gets
  // its own 'delete' log entry (so it shows as its own row in the change log/CSV and can be undone
  // independently), except brand-new nodes from this session, which are just discarded.
  function commitDelete(n, assignments){
    var descendants = getDescendants(n.id).filter(function(d){ return !d.flags.isDeleted; });
    var subtreeNodes = [n].concat(descendants);
    var subtreeIds = subtreeNodes.map(function(x){ return x.id; });
    var subtreeEmployees = employees.filter(function(e){ return subtreeIds.indexOf(e.nodeId)>=0; });
    if(subtreeEmployees.length){
      var missing = subtreeEmployees.filter(function(e){ return !assignments || !assignments[e.eid]; });
      if(missing.length) return {ok:false, reason:'unassigned', missing:missing};
    }
    subtreeNodes.forEach(function(d){
      if(d.flags.isNew){
        nodes = nodes.filter(function(x){ return x.id!==d.id; });
        removeAllLogsForNode(d.id); // never confirmed this session — creating then deleting it is a no-op
        return;
      }
      var directOfD = employees.filter(function(e){ return e.nodeId===d.id; });
      var restoreLog = [];
      directOfD.forEach(function(e){
        var toId = assignments[e.eid];
        restoreLog.push({eid:e.eid, toNodeId:toId, fromNodeId:d.id});
        commitEmployeeTransfer(e, toId);
      });
      d.restoreLog = restoreLog.length ? restoreLog : null;
      d.flags.isDeleted = true;
      addLog('delete', {name:d.name, parent:getNode(d.parentId).name, empCount:restoreLog.length}, d.id);
    });
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
    addLog('undo_delete', {name:n.name, restored:restored}, n.id);
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
      var doDelete = function(){
        var res = commitDelete(n, pendingEdit.del.assignments);
        if(!res.ok){ toast(t('toastDeleteBlockedEmp')(res.missing.length)); return; }
        toast(t('toastDeleted')); closePanel(); render();
      };
      var descendants = getDescendants(n.id).filter(function(d){ return !d.flags.isDeleted; });
      if(descendants.length) showConfirm(t('deleteCascadeConfirmTitle'), t('deleteCascadeConfirmText')(descendants.length), t('deleteCascadeOkBtn'), doDelete);
      else doDelete();
      return;
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
    var descendants = getDescendants(n.id).filter(function(d){ return !d.flags.isDeleted; });
    var subtreeIds = [n.id].concat(descendants.map(function(d){ return d.id; }));
    var direct = employees.filter(function(e){ return subtreeIds.indexOf(e.nodeId)>=0; });
    var empCount = direct.length;
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
      '<div class="edit-row-head" data-toggle="del"><input type="checkbox" '+(pendingEdit.del.on?'checked':'')+' '+(anyOtherOn?'disabled':'')+'><span class="lbl" style="color:var(--warn-text);">'+escapeHtml(t('deleteLbl'))+'</span></div>';
    if(pendingEdit.del.on){
      html += '<div class="edit-row-body">';
      if(descendants.length){
        html += '<div class="warn-box">'+escapeHtml(t('deleteCascadeNote')(descendants.length))+'</div>';
      }
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
  // Dropping onto a sibling (same parent) reorders it there instead of re-parenting — reuses
  // the existing move-by-drag gesture rather than adding a separate reorder handle.
  function isSiblingDrop(srcId, id){
    var src = getNode(srcId), target = getNode(id);
    return !!(src && target && src.parentId === target.parentId);
  }
  function onDragOver(ev, id){
    if(!dragSrcId || dragSrcId===id || isDescendant(dragSrcId, id)) return;
    ev.preventDefault();
    ev.currentTarget.classList.add(isSiblingDrop(dragSrcId, id) ? 'drop-sibling' : 'drop-ok');
  }
  function onDragLeave(ev){ ev.currentTarget.classList.remove('drop-ok'); ev.currentTarget.classList.remove('drop-sibling'); }
  function onDrop(ev, id){
    ev.preventDefault();
    ev.currentTarget.classList.remove('drop-ok');
    ev.currentTarget.classList.remove('drop-sibling');
    if(!dragSrcId || dragSrcId===id || isDescendant(dragSrcId, id)) return;
    var srcId = dragSrcId; dragSrcId = null;
    if(isSiblingDrop(srcId, id)){
      reorderSibling(ev, srcId, id);
      return;
    }
    openPanel(srcId);
    pendingEdit.move.on = true;
    pendingEdit.move.target = id;
    render();
    toast(t('toastMovePending'));
  }
  function reorderSibling(ev, srcId, targetId){
    var parentId = getNode(targetId).parentId;
    var rect = ev.currentTarget.getBoundingClientRect();
    // Siblings lay out left-to-right in vertical mode (tree grows downward), top-to-bottom in
    // horizontal mode (tree grows sideways) — see .tlevel flex-direction in style.css.
    var after = orientation==='vertical'
      ? (ev.clientX - rect.left) > rect.width/2
      : (ev.clientY - rect.top) > rect.height/2;
    var order = getChildren(parentId).map(function(n){ return n.id; }).filter(function(cid){ return cid!==srcId; });
    var idx = order.indexOf(targetId);
    order.splice(after ? idx+1 : idx, 0, srcId);
    manualOrder[parentId] = order;
    saveManualOrder();
    render();
    toast(t('toastReorderDone'));
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
    var movedFromNode = n.movedFrom!==null ? getNode(n.movedFrom) : null;
    // If that previous parent has itself since been renamed, show what it was called at the
    // time — its current (renamed) name would misleadingly suggest the move landed somewhere
    // it never actually was.
    var movedFromName = movedFromNode ? (movedFromNode.flags.isRenamed ? movedFromNode.origName : movedFromNode.name) : null;
    return '<div class="'+nodeClasses(n)+'" draggable="'+draggable+'" data-id="'+n.id+'" title="'+escapeHtml(titleAttr)+'">'+
      addBtn+toggleBtn+
      '<div class="name-row"><span class="name">'+escapeHtml(n.name)+'</span>'+warnIco+'</div>'+
      '<div class="meta-line">'+escapeHtml(t('picPrefix'))+(n.pic?escapeHtml(n.pic):escapeHtml(t('notSet')))+'</div>'+
      '<div class="meta-line">'+escapeHtml(t('headcountLabel')(rollupHeadcount(n.id)))+'</div>'+
      (n.flags.isRenamed ? '<div class="meta-line renamed-from">'+escapeHtml(t('renamedTooltipPrefix')+n.origName)+'</div>' : '')+
      (movedFromNode ? '<div class="meta-line moved-from">'+escapeHtml(t('movedFromLabel')(movedFromName))+'</div>' : '')+
      (tags? '<div class="tags">'+tags+'</div>' : '')+
      '</div>';
  }

  function renderSubtree(id, isRoot){
    var n = getNode(id);
    var children = getChildren(id);
    var kids = children.length;
    var isCollapsed = kids>0 && collapsed.has(id);
    var html = '<li class="'+(isRoot?'tlevel-root':'')+(kids===1?' only-child':'')+'">';
    html += renderNodeBox(n, kids>0, isCollapsed);
    if(kids && !isCollapsed){
      html += '<div class="children-wrap'+(kids===1?' single':'')+'"><ul class="tlevel">';
      children.forEach(function(c){ html += renderSubtree(c.id, false); });
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
    collapsed = new Set(nodes.filter(function(n){ return getChildren(n.id).length>0; }).map(function(n){ return n.id; }));
    renderTree();
  });
  // Replays the merged (local + remote) change history onto the CURRENT pristineNodes/
  // pristineEmployees, updating the live `nodes` wholesale and each employee's nodeId/reportsTo
  // in place (every other field on the employee objects — division, HRBP, etc. — is left alone,
  // since the replay engine can't touch those). Shared by the initial page load (so everyone's
  // changes are visible from first paint, not just after "刷新编辑") and "刷新编辑" itself (which
  // also re-fetches a fresher pristine baseline first).
  function applyCombinedReplay(){
    var entries = mergedLogForDisplay();
    var replayed = replayAll(entries, pristineNodes, pristineEmployees);
    var replayedByEid = {}; replayed.employees.forEach(function(e){ replayedByEid[e.eid] = e; });
    employees.forEach(function(e){
      var re = replayedByEid[e.eid];
      if(re){ e.nodeId = re.nodeId; e.reportsTo = re.reportsTo; }
    });
    nodes = replayed.nodes;
    if(!getNode(viewRootId) || getNode(viewRootId).flags.isDeleted) viewRootId = rootId;
    // Only close the edit panel if its node is genuinely gone — otherwise leave an in-progress
    // draft (rename text, role picker selection, etc.) untouched.
    if(selectedId && !getNode(selectedId)) closePanel();
  }

  // Re-reads the current snapshot (not a "刷新数据" rewrite — just whatever /api/org-data holds
  // right now) plus the shared change log, then rebuilds the live tree via applyCombinedReplay().
  // Also discards this session's own not-yet-synced local drafts (log=[]) — only already-synced
  // (shared-table) history survives, same policy as a browser refresh; warns first if there's
  // actually a draft to lose, so a routine "any updates?" click isn't interrupted for nothing.
  document.getElementById('refreshEditsBtn').addEventListener('click', function(){
    function doRefresh(){
      var btn = document.getElementById('refreshEditsBtn');
      btn.disabled = true; btn.textContent = t('refreshEditsBtnLoading');
      log = [];
      fetch('/api/org-data', {credentials:'same-origin'})
        .then(function(res){
          if(res.status===401){ showLoginOverlay(); throw new Error('not-authenticated'); }
          if(!res.ok) return res.json().then(function(j){ throw new Error(j.error||('HTTP '+res.status)); });
          return res.json();
        })
        .then(function(data){
          var freshPristineNodes = hydrateNodes(data.nodes);
          var freshPristineEmployees = data.employees.map(function(e){ return {eid:e.eid, name:e.name, nodeId:e.nodeId, reportsTo:e.reportsTo||''}; });
          var freshFullEmployees = data.employees.map(function(e){
            return {eid:e.eid, name:e.name, nodeId:e.nodeId, origPath: pathLabelIn(freshPristineNodes, e.nodeId), reportsTo:e.reportsTo||'', origReportsTo:e.reportsTo||'',
              division:e.division||'', businessUnit:e.businessUnit||'', department:e.department||'', team:e.team||'', subTeam:e.subTeam||'', section:e.section||'',
              status:e.status||'', hrbp1:e.hrbp1||'', hrbp2:e.hrbp2||'', hrbpLead:e.hrbpLead||''};
          });
          return fetchRemoteChangeLog().then(function(){
            pristineNodes = freshPristineNodes;
            pristineEmployees = freshPristineEmployees;
            employees = freshFullEmployees;
            applyCombinedReplay();
            unassignedId = data.unassignedId || null;
            snapshotAt = new Date(data.generatedAt);
            document.getElementById('adminSnapshotTime').textContent = formatSnapshotTime(snapshotAt);
            render();
            toast(t('toastEditsRefreshed'));
          });
        })
        .catch(function(err){ if(err.message!=='not-authenticated') toast(t('toastEditsRefreshFailed')); })
        .then(function(){ btn.disabled = false; btn.textContent = t('refreshEditsBtn'); });
    }
    if(log.length){
      showConfirm(t('refreshEditsBtn'), t('refreshEditsConfirmDiscard'), t('refreshEditsBtn'), doRefresh);
    } else {
      doRefresh();
    }
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
      var box = li.querySelector(':scope > .node');
      var childWrap = li.querySelector(':scope > .children-wrap');
      if(!box || !childWrap) return;
      var kidLis = Array.prototype.slice.call(childWrap.querySelectorAll(':scope > ul.tlevel > li'));
      var kidBoxes = kidLis.map(function(kli){ return kli.querySelector(':scope > .node'); }).filter(Boolean);
      if(!kidBoxes.length) return;
      var p0 = centerOf(box, 'out');
      kidBoxes.forEach(function(kb){
        var p1 = centerOf(kb, 'in');
        var pts;
        if(orientation==='vertical'){
          var trunkY = p0.y + CONNECTOR_GAP;
          pts = [{x:p0.x,y:p0.y}, {x:p0.x,y:trunkY}, {x:p1.x,y:trunkY}, {x:p1.x,y:p1.y}];
        } else {
          var trunkX = p0.x + CONNECTOR_GAP;
          pts = [{x:p0.x,y:p0.y}, {x:trunkX,y:p0.y}, {x:trunkX,y:p1.y}, {x:p1.x,y:p1.y}];
        }
        segments.push({points:pts});
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
      return '<path d="'+roundedPathD(seg.points, CONNECTOR_RADIUS)+'"/>';
    });
    svg.innerHTML = paths.join('');
  }

  // The compact panel (inside the chart view) and the full-page "变更记录" tab show the exact
  // same merged list — rendered into both tbodies so neither ever falls out of sync with the other.
  function renderLogInto(bodyId, entries){
    var body = document.getElementById(bodyId);
    if(!entries.length){ body.innerHTML = '<tr><td colspan="5" class="empty-note">'+escapeHtml(t('logEmptyNote'))+'</td></tr>'; return; }
    body.innerHTML = entries.map(function(l, i){
      var timeText = l.time ? formatSnapshotTime(new Date(l.time)) : '';
      return '<tr><td class="mono">'+(i+1)+'</td><td>'+escapeHtml(formatLogType(l))+'</td><td>'+escapeHtml(formatLogDetail(l))+'</td><td>'+escapeHtml(l.by||'')+'</td><td class="mono">'+escapeHtml(timeText)+'</td></tr>';
    }).join('');
  }
  // Local `log` (this session's own plan — what CSV export reads) unioned with `remoteLog`
  // (other sessions' actions, pulled via "刷新编辑"), deduped by the shared table's record id
  // so a synced-then-refetched local entry doesn't render twice.
  function mergedLogForDisplay(){
    var seen = new Set();
    log.forEach(function(l){ if(l.recordId) seen.add(l.recordId); });
    var extra = remoteLog.filter(function(r){ return !seen.has(r.recordId); });
    return log.concat(extra).sort(function(a,b){ return (a.time||0) - (b.time||0); });
  }

  // ---------- cross-user replay (combined "final result" view for CSV export) ----------
  // pathLabel() walks the live global `nodes`; this variant walks an arbitrary node array, so it
  // works against the pristine baseline or a replayed working copy just the same.
  function pathLabelIn(nodeSet, nodeId){
    var byId = {}; nodeSet.forEach(function(n){ byId[n.id] = n; });
    var names = [], n = byId[nodeId];
    while(n){ names.unshift(n.name); n = n.parentId ? byId[n.parentId] : null; }
    return names.join(' / ');
  }
  // Latest time any entry touched a given node/employee — used as the combined row's "Edit
  // Time" (there's no single edit event anymore once cross-user chains are collapsed to one row).
  function computeLastTouched(entries){
    var nodeTime = {}, empTime = {};
    function bumpNode(id, time){ if(id && time && (!nodeTime[id] || time>nodeTime[id])) nodeTime[id] = time; }
    function bumpEmp(eid, time){ if(eid && time && (!empTime[eid] || time>empTime[eid])) empTime[eid] = time; }
    entries.forEach(function(l){
      var p = l.params || {};
      if(l.typeKey==='rename' || l.typeKey==='move' || l.typeKey==='add' || l.typeKey==='delete' || l.typeKey==='undo_delete') bumpNode(l.key, l.time);
      else if(l.typeKey==='role_change'){ bumpNode((l.key||'').split('#')[0], l.time); }
      else if(l.typeKey==='role_cascade'){ (p.beforeValues||[]).forEach(function(bv){ bumpNode(bv.id, l.time); }); }
      else if(l.typeKey==='emp_transfer'){ bumpEmp(p.eid, l.time); }
      else if(l.typeKey==='report_change'){ bumpEmp(l.key, l.time); }
    });
    return {nodeTime:nodeTime, empTime:empTime};
  }
  // Replays every entry's own embedded params (never a live getNode() lookup — a foreign
  // session's edits were never applied to any node object we have) onto a deep-cloned copy of
  // the pristine baseline, in chronological order, to reconstruct everyone's combined final
  // state. This is what makes "1 person, 3 steps" and "3 people, 1 step each" produce the exact
  // same result: only the final before/after matters, not how many entries got there.
  function replayAll(entries, baseNodes, baseEmployees){
    var workNodes = JSON.parse(JSON.stringify(baseNodes));
    var workEmployees = JSON.parse(JSON.stringify(baseEmployees));
    function wGetNode(id){ for(var i=0;i<workNodes.length;i++) if(workNodes[i].id===id) return workNodes[i]; return null; }
    function wGetNodeByName(name){ for(var i=0;i<workNodes.length;i++) if(!workNodes[i].flags.isDeleted && workNodes[i].name===name) return workNodes[i]; return null; }
    function wGetEmp(eid){ for(var i=0;i<workEmployees.length;i++) if(workEmployees[i].eid===eid) return workEmployees[i]; return null; }

    entries.forEach(function(l){
      var p = l.params || {};
      if(l.typeKey==='rename'){
        var n = wGetNode(l.key);
        if(n){
          if(!n.flags.isRenamed){ n.origName = n.name; n.flags.isRenamed = true; }
          n.name = p.to;
          if(n.name === n.origName) n.flags.isRenamed = false;
        }
      } else if(l.typeKey==='move'){
        var n = wGetNode(l.key); var target = n && wGetNodeByName(p.to);
        if(n && target){
          if(n.movedFrom===null || n.movedFrom===undefined) n.movedFrom = n.parentId;
          n.parentId = target.id;
          if(n.parentId === n.movedFrom) n.movedFrom = null;
        }
      } else if(l.typeKey==='add'){
        if(!wGetNode(l.key)){
          var parent = wGetNodeByName(p.parent);
          workNodes.push({id:l.key, name:p.name||'', origName:p.name||'', parentId: parent?parent.id:null,
            pic:p.pic||'', hrbp1:p.hrbp1||'', hrbp2:p.hrbp2||'', hrbpLead:p.hrbpLead||'', da:p.da||'',
            inactive:false, movedFrom:null, restoreLog:null, origRoles:null,
            flags:{isNew:true, isDeleted:false, isRenamed:false}});
        }
      } else if(l.typeKey==='delete'){
        var n = wGetNode(l.key); if(n) n.flags.isDeleted = true;
      } else if(l.typeKey==='undo_delete'){
        var n = wGetNode(l.key); if(n) n.flags.isDeleted = false;
      } else if(l.typeKey==='role_change'){
        var parts = (l.key||'').split('#'); var n = wGetNode(parts[0]);
        if(n && parts[1]) n[parts[1]] = p.to;
      } else if(l.typeKey==='role_cascade'){
        var applied = p.appliedValues || {};
        (p.beforeValues||[]).forEach(function(bv){
          var n = wGetNode(bv.id);
          if(n){ n.hrbp1=applied.hrbp1; n.hrbp2=applied.hrbp2; n.hrbpLead=applied.hrbpLead; n.da=applied.da; }
        });
      } else if(l.typeKey==='emp_transfer'){
        var e = wGetEmp(p.eid); if(e && p.toId) e.nodeId = p.toId;
      } else if(l.typeKey==='report_change'){
        var e = wGetEmp(l.key); if(e) e.reportsTo = p.to;
      }
    });
    return {nodes:workNodes, employees:workEmployees};
  }
  function renderLog(){
    var merged = mergedLogForDisplay();
    var countText = merged.length + (t('unitRecords') ? ' ' + t('unitRecords') : '');
    document.getElementById('logCount').textContent = countText;
    document.getElementById('changelogCount').textContent = countText;
    document.getElementById('viewChangelogCount').textContent = merged.length;
    // mergedLogForDisplay() stays chronological (oldest first) for replayAll() elsewhere — only
    // the on-screen table shows newest first, which is what people actually want to scan.
    var newestFirst = merged.slice().reverse();
    renderLogInto('logBody', newestFirst);
    renderLogInto('changelogBody', newestFirst);
  }

  // Combined view, same approach as the CSV builders: replay everyone's shared history (plus
  // this session's own not-yet-synced edits) onto the pristine baseline and diff, rather than
  // comparing only this session's own live-mutated nodes/employees against their session-original
  // values. Uses whatever `remoteLog` is already cached — no network call here; "刷新编辑" is what
  // refreshes that cache.
  function computeImpacted(){
    var entries = mergedLogForDisplay();
    var replayed = replayAll(entries, pristineNodes, pristineEmployees);
    var pristineEmpById = {}; pristineEmployees.forEach(function(e){ pristineEmpById[e.eid] = e; });
    return replayed.employees.map(function(e){
      var pe = pristineEmpById[e.eid];
      if(!pe) return null;
      var oldPath = pathLabelIn(pristineNodes, pe.nodeId);
      var newPath = pathLabelIn(replayed.nodes, e.nodeId);
      if(oldPath===newPath && e.reportsTo===pe.reportsTo) return null;
      return {eid:e.eid, name:e.name, oldPath:oldPath, newPath:newPath};
    }).filter(Boolean);
  }

  // Same combined list rendered into both the chart view's compact panel and the full-page
  // "变更记录" tab's side-by-side panel, mirroring how renderLogInto covers both change-log spots.
  function renderEmployeesInto(bodyId, impacted){
    var body = document.getElementById(bodyId);
    if(!impacted.length){ body.innerHTML = '<tr><td colspan="3" class="empty-note">'+escapeHtml(t('empEmptyNote'))+'</td></tr>'; return; }
    body.innerHTML = impacted.map(function(e){
      var right = '<div class="path-old">'+escapeHtml(e.oldPath)+'</div><div class="path-new">'+escapeHtml(e.newPath)+'</div>';
      return '<tr><td class="mono">'+e.eid+'</td><td>'+escapeHtml(e.name)+'</td><td>'+right+'</td></tr>';
    }).join('');
  }
  function renderEmployees(){
    var impacted = computeImpacted();
    var countText = impacted.length + (t('unitPeople') ? ' ' + t('unitPeople') : '');
    document.getElementById('empCount').textContent = countText;
    document.getElementById('changelogEmpCount').textContent = countText;
    renderEmployeesInto('empBody', impacted);
    renderEmployeesInto('changelogEmpBody', impacted);
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
    document.getElementById('changelogView').style.display = view==='changelog' ? '' : 'none';
    document.getElementById('adminView').style.display = view==='admin' ? '' : 'none';
    if(view==='admin'){ renderAdmin(); renderEditWindowSettings(); fetchExportWatermark().then(renderExportWatermark); }
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
    var roleAllowsEdit = currentUserRole==='Editor' || currentUserRole==='Senior Admin' || currentUserRole==='Owner';
    var banner = document.getElementById('editWindowBanner');
    if(roleAllowsEdit && !isWithinEditWindow()){
      banner.style.display = '';
      banner.textContent = t('editWindowLockedBanner')(formatEditWindowRange());
    } else {
      banner.style.display = 'none';
    }
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
    body.innerHTML = '<tr><td colspan="5" class="empty-note">'+escapeHtml(t('adminLoading'))+'</td></tr>';
    fetch('/api/permissions/list', {credentials:'same-origin'})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(data){
        var viewerRole = data.viewerRole;
        if(!data.users.length){ body.innerHTML = '<tr><td colspan="5" class="empty-note">'+escapeHtml(t('adminNoUsers'))+'</td></tr>'; return; }
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
          var transferCell = (u.role!=='Owner' && viewerRole==='Owner') ? '<button class="btn ghost" type="button" data-transfer-owner="'+u.recordId+'">'+escapeHtml(t('adminTransferOwnerBtn'))+'</button>' : '';
          var removeCell = u.role!=='Owner' ? '<button class="btn ghost" type="button" data-remove-user="'+u.recordId+'">'+escapeHtml(t('adminRemoveBtn'))+'</button>' : '';
          return '<tr><td>'+escapeHtml(u.name||'—')+'</td><td>'+escapeHtml(u.email||'—')+'</td><td>'+roleCell+'</td><td>'+transferCell+'</td><td>'+removeCell+'</td></tr>';
        }).join('');
        body.querySelectorAll('.admin-role-select').forEach(function(sel){
          sel.addEventListener('change', function(){
            fetch('/api/permissions/manage', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'update', recordId:sel.getAttribute('data-record-id'), role:sel.value})})
              .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
              .then(function(){ toast(t('adminSaved')); renderAdmin(); })
              .catch(function(err){ toast(err.message); renderAdmin(); });
          });
        });
        body.querySelectorAll('[data-remove-user]').forEach(function(btn){
          btn.addEventListener('click', function(){
            showConfirm(t('adminRemoveBtn'), t('adminRemoveConfirm'), t('adminRemoveBtn'), function(){
              fetch('/api/permissions/manage', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'remove', recordId:btn.getAttribute('data-remove-user')})})
                .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
                .then(function(){ toast(t('adminSaved')); renderAdmin(); })
                .catch(function(err){ toast(err.message); });
            });
          });
        });
        body.querySelectorAll('[data-transfer-owner]').forEach(function(btn){
          btn.addEventListener('click', function(){
            showConfirm(t('adminTransferOwnerBtn'), t('adminTransferOwnerConfirm'), t('adminTransferOwnerBtn'), function(){
              fetch('/api/permissions/manage', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'transfer-owner', recordId:btn.getAttribute('data-transfer-owner')})})
                .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
                .then(function(){ toast(t('adminSaved')); currentUserRole='Senior Admin'; applyRoleGating(); renderAdmin(); })
                .catch(function(err){ toast(err.message); });
            });
          });
        });
      })
      .catch(function(err){ body.innerHTML = '<tr><td colspan="5" class="empty-note">'+escapeHtml(err.message)+'</td></tr>'; });
  }
  document.getElementById('adminAddBtn').addEventListener('click', function(){
    var email = (document.getElementById('adminNewEmail').value||'').trim();
    var name = (document.getElementById('adminNewName').value||'').trim();
    var role = document.getElementById('adminNewRole').value;
    if(!email){ toast(t('adminNeedEmail')); return; }
    if(role==='Senior Admin' && currentUserRole!=='Owner'){ toast(t('adminOnlyOwnerGrantsSenior')); return; }
    fetch('/api/permissions/manage', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'update', email:email, name:name, role:role})})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(){
        document.getElementById('adminNewEmail').value = '';
        document.getElementById('adminNewName').value = '';
        toast(t('adminSaved'));
        renderAdmin();
      })
      .catch(function(err){ toast(err.message); });
  });

  function renderEditWindowSettings(){
    document.getElementById('editWindowStart').value = editWindow.start || '';
    document.getElementById('editWindowEnd').value = editWindow.end || '';
    document.getElementById('editWindowStatus').textContent = '';
  }

  // ---------- archive watermark (shown/editable so an admin can see or roll back what's
  // already been archived to Base, without asking someone to poke at Tool Settings directly) ----------
  var exportWatermark = 0;
  function fetchExportWatermark(){
    return fetch('/api/changelog-export', {credentials:'same-origin'})
      .then(function(res){ return res.ok ? res.json() : {lastExportAt:0}; })
      .then(function(data){ exportWatermark = data.lastExportAt || 0; })
      .catch(function(){});
  }
  // datetime-local inputs are timezone-naive strings interpreted in the browser's own local
  // time — same "no server-timezone conversion" approach as the edit window fields.
  function epochToDatetimeLocal(epochMs){
    if(!epochMs) return '';
    var d = new Date(epochMs);
    function pad(n){ return n<10 ? '0'+n : ''+n; }
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
  }
  function renderExportWatermark(){
    document.getElementById('exportWatermarkInput').value = epochToDatetimeLocal(exportWatermark);
    document.getElementById('exportWatermarkStatus').textContent = '';
  }
  document.getElementById('exportWatermarkSaveBtn').addEventListener('click', function(){
    var val = document.getElementById('exportWatermarkInput').value;
    var epoch = val ? new Date(val).getTime() : 0;
    if(val && isNaN(epoch)){ toast(t('exportWatermarkInvalid')); return; }
    fetch('/api/changelog-export', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({orgRows:[], employeeRows:[], newWatermark: epoch})})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(){ exportWatermark = epoch; toast(t('toastWatermarkSaved')); renderExportWatermark(); })
      .catch(function(err){ toast(err.message); });
  });
  function saveEditWindow(start, end){
    fetch('/api/settings/edit-window', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({start:start, end:end})})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(){
        editWindow = {start:start, end:end};
        toast(t('adminSaved'));
        renderEditWindowSettings();
        applyRoleGating(); renderPanel();
      })
      .catch(function(err){ toast(err.message); });
  }
  document.getElementById('editWindowSaveBtn').addEventListener('click', function(){
    var start = document.getElementById('editWindowStart').value || null;
    var end = document.getElementById('editWindowEnd').value || null;
    if(start && end && start > end){ toast(t('editWindowInvalidRange')); return; }
    saveEditWindow(start, end);
  });
  document.getElementById('editWindowClearBtn').addEventListener('click', function(){
    saveEditWindow(null, null);
  });
  document.getElementById('clearChangelogBtn').addEventListener('click', function(){
    showConfirm(t('clearChangelogBtn'), t('clearChangelogConfirm'), t('clearChangelogBtn'), function(){
      fetch('/api/changelog', {method:'DELETE', credentials:'same-origin'})
        .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
        .then(function(){ remoteLog = []; renderLog(); toast(t('toastChangelogCleared')); })
        .catch(function(err){ toast(err.message); });
    });
  });

  // Converts a builder's [headerRow, ...cellRows] output into {fieldName: value} objects ready
  // for createSourceRecords, renaming/typing only the columns that need it for the target table.
  function rowsToBaseFields(headers, cellRows, renameMap, numberFields){
    return cellRows.map(function(cells){
      var obj = {};
      headers.forEach(function(h, i){
        var key = (renameMap && renameMap[h]) || h;
        var val = cells[i];
        obj[key] = (numberFields && numberFields.indexOf(key)!==-1) ? Number(val) : val;
      });
      return obj;
    });
  }

  // Archives everything changed since the shared watermark into the permanent "Org change
  // log"/"Employee change log" Base tables — separate from the "Change Log" table used for
  // cross-session live sync, which this never touches or clears.
  document.getElementById('exportChangeLogBtn').addEventListener('click', function(){
    var btn = document.getElementById('exportChangeLogBtn');
    var statusEl = document.getElementById('exportChangeLogStatus');
    btn.disabled = true; btn.textContent = t('exportChangeLogBtnLoading'); statusEl.textContent = '';
    fetch('/api/changelog-export', {credentials:'same-origin'})
      .then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
      .then(function(watermarkData){
        var sinceTime = watermarkData.lastExportAt || 0;
        return getCombinedReplayState().then(function(state){
          var orgHeaders = ct('csvOrgChangeHeaders');
          // rawEditTime=true here — the org table's Edit Date column is a real datetime field,
          // unlike the employee table's (plain text), so only this one needs the raw epoch.
          var orgRows = buildCombinedOrgChangeRows(pristineNodes, state.finalNodes, state.entries, sinceTime, true).slice(1);
          var empHeaders = ct('csvPersonnelHeaders');
          var empRows = buildCombinedPersonnelRows(pristineNodes, pristineEmployees, state.finalNodes, state.finalEmployees, state.entries, sinceTime).slice(1);
          if(!orgRows.length && !empRows.length){ toast(t('toastExportChangeLogNone')); return null; }
          var orgFieldsRows = rowsToBaseFields(orgHeaders, orgRows, {'Edit Time':'Edit Date'});
          // The Base table's real field names are still "Reports-to Before/After" — only the
          // CSV's display header text changed to "Direct Manager", so this rename map bridges
          // that gap (getting it wrong throws FieldNameNotFound on the whole employeeRows batch).
          var empFieldsRows = rowsToBaseFields(empHeaders, empRows, {'Edit Time':'Edit Date', 'Direct Manager Before':'Reports-to Before', 'Direct Manager After':'Reports-to After'}, ['EID']);
          var newWatermark = state.entries.reduce(function(max, e){ return Math.max(max, e.time||0); }, sinceTime);
          return fetch('/api/changelog-export', {
            method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({orgRows: orgFieldsRows, employeeRows: empFieldsRows, newWatermark: newWatermark})
          }).then(function(res){ return res.json().then(function(j){ if(!res.ok) throw new Error(j.error||'error'); return j; }); })
            .then(function(result){
              exportWatermark = newWatermark; renderExportWatermark();
              toast(t('toastExportChangeLogDone')({orgCount:result.orgCount, empCount:result.employeeCount}));
            });
        });
      })
      .catch(function(err){ statusEl.textContent = t('toastExportChangeLogFailed') + (err && err.message ? ' (' + err.message + ')' : ''); toast(t('toastExportChangeLogFailed')); })
      .then(function(){ btn.disabled = false; btn.textContent = t('exportChangeLogBtn'); });
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

  // Employee search deliberately does NOT focus (unlike doSearch above) — it jumps to wherever
  // the employee currently sits while keeping the whole tree visible, per request: find the
  // person without narrowing the view to just their branch.
  function doEmpSearch(q){
    var box = document.getElementById('empSearchResults');
    q = q.trim();
    if(!q){ box.classList.remove('show'); box.innerHTML=''; return; }
    var ql = q.toLowerCase();
    var matches = employees.filter(function(e){ return e.name.toLowerCase().indexOf(ql)>=0 || e.eid.toLowerCase().indexOf(ql)>=0; }).slice(0,8);
    if(!matches.length){ box.innerHTML = '<button disabled style="color:var(--ink-muted);">'+escapeHtml(t('noMatchEmp'))+'</button>'; box.classList.add('show'); return; }
    box.innerHTML = matches.map(function(e){
      return '<button type="button" data-eid="'+e.eid+'">'+escapeHtml(e.name)+' <span class="mono" style="color:var(--ink-muted); font-size:11px;">'+escapeHtml(e.eid)+'</span>'+
        '<br><span style="font-size:11px; color:var(--ink-muted);">'+escapeHtml(pathLabel(e.nodeId))+'</span></button>';
    }).join('');
    box.classList.add('show');
    box.querySelectorAll('button[data-eid]').forEach(function(b){
      b.addEventListener('click', function(){
        var emp = employees.filter(function(e){ return e.eid===b.getAttribute('data-eid'); })[0];
        document.getElementById('empSearchInput').value = '';
        box.classList.remove('show');
        if(emp) jumpToEmployeeNode(emp.nodeId);
      });
    });
  }
  function jumpToEmployeeNode(nodeId){
    switchView('chart');
    viewRootId = rootId;
    var n = getNode(nodeId);
    while(n && n.parentId){ collapsed.delete(n.parentId); n = getNode(n.parentId); }
    render();
    var el = document.querySelector('.node[data-id="'+nodeId+'"]');
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'center', inline:'center'});
    el.classList.add('search-hit');
    setTimeout(function(){ el.classList.remove('search-hit'); }, 2400);
  }

  // ---------- download ----------
  function downloadCsv(filename, rows){
    var csv = rows.map(function(r){ return r.map(function(v){ v=String(v==null?'':v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }).join(','); }).join('\r\n');
    var blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8;'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
  }

  // ---------- structured CSV exports (distinct from the on-screen copy/paste tables above) ----------
  // Shared role-diff helpers. Both CSVs fill every before/after cell — no conditional blanks.
  var ROLE_FIELDS = ['pic', 'hrbp1', 'hrbp2', 'hrbpLead', 'da'];
  // PIC is an org-structure attribute, not a personnel one — personnel rows compare everything
  // except it.
  var PERSONNEL_ROLE_FIELDS = ROLE_FIELDS.filter(function(f){ return f!=='pic'; });
  function nodeRolesAfter(n){ return {pic:n.pic, hrbp1:n.hrbp1, hrbp2:n.hrbp2, hrbpLead:n.hrbpLead, da:n.da}; }
  function roleChangeSummary(before, after, fields){
    return (fields || ROLE_FIELDS).filter(function(f){ return (before[f]||'') !== (after[f]||''); })
      .map(function(f){ return ct('role_' + f); })
      .join(', ');
  }

  // One row per org-structure change, computed as a straight diff between the pristine baseline
  // and the fully-replayed combined state — not per log entry. This is what makes "1 person, 3
  // steps" and "3 people, 1 step each" collapse to the exact same row: a chain that nets to no
  // difference (e.g. renamed X→Y→X by two different people) produces no row at all.
  // sinceTime (optional, epoch ms) restricts to nodes last touched strictly after it — used by
  // the "archive to Base" button so it only sends genuinely new rows, not everything again.
  // rawEditTime (optional) returns the Edit Time cell as a raw epoch number instead of a
  // formatted string — also for that button, since the Base column it writes to is a real
  // datetime field there (unlike the CSV, which always shows the human-formatted string).
  function buildCombinedOrgChangeRows(pristineNodes, finalNodes, entries, sinceTime, rawEditTime){
    var pristineById = {}; pristineNodes.forEach(function(n){ pristineById[n.id] = n; });
    var nodeTime = computeLastTouched(entries).nodeTime;
    var rows = [];
    finalNodes.forEach(function(fn){
      if(sinceTime && !(nodeTime[fn.id] > sinceTime)) return;
      var pn = pristineById[fn.id];
      var wasNew = !pn;
      var isDeletedNow = !!fn.flags.isDeleted;
      var wasDeletedBefore = pn ? !!pn.flags.isDeleted : false;
      if(wasDeletedBefore) return; // already gone before this combined window — nothing changed here
      if(wasNew && isDeletedNow) return; // added then deleted — nets to nothing, like the single-session case

      var typeLabels = [], roleChangeLabel = '', beforeName, afterName, beforeRoles, afterRoles;
      if(wasNew){
        typeLabels.push(ct('logType').add);
        beforeName = ''; beforeRoles = {};
        afterName = pathLabelIn(finalNodes, fn.id);
        afterRoles = nodeRolesAfter(fn);
      } else if(isDeletedNow){
        typeLabels.push(ct('logType').delete);
        beforeName = pathLabelIn(pristineNodes, fn.id);
        beforeRoles = nodeRolesAfter(pn);
        afterName = ''; afterRoles = {};
      } else {
        if(fn.name !== pn.name) typeLabels.push(ct('logType').rename);
        if(fn.parentId !== pn.parentId) typeLabels.push(ct('logType').move);
        beforeName = pathLabelIn(pristineNodes, fn.id);
        afterName = pathLabelIn(finalNodes, fn.id);
        beforeRoles = nodeRolesAfter(pn);
        afterRoles = nodeRolesAfter(fn);
        // Role change is never added to typeLabels — Change Type reflects the tree itself
        // (rename/move), while a pure role reassignment (e.g. only the HRBP changed) leaves it
        // blank and shows up purely via the Role Change column instead.
        roleChangeLabel = roleChangeSummary(beforeRoles, afterRoles);
      }
      if(!typeLabels.length && !roleChangeLabel) return; // no net difference from baseline at all

      var editTime = rawEditTime ? (nodeTime[fn.id] || null) : (nodeTime[fn.id] ? formatSnapshotTime(new Date(nodeTime[fn.id])) : '');
      rows.push({
        sortName: afterName || beforeName,
        sortTime: nodeTime[fn.id] || 0,
        cells: [typeLabels.join(', '), roleChangeLabel, beforeName, beforeRoles.pic||'', beforeRoles.hrbp1||'', beforeRoles.hrbp2||'', beforeRoles.hrbpLead||'', beforeRoles.da||'',
          afterName, afterRoles.pic||'', afterRoles.hrbp1||'', afterRoles.hrbp2||'', afterRoles.hrbpLead||'', afterRoles.da||'', editTime]
      });
    });
    // Department first, then chronologically within that department — easier to follow a
    // department's own history than grouping by change type.
    rows.sort(function(a,b){
      if(a.sortName !== b.sortName) return a.sortName < b.sortName ? -1 : 1;
      return a.sortTime - b.sortTime;
    });
    return [ct('csvOrgChangeHeaders')].concat(rows.map(function(r){ return r.cells; }));
  }

  // Same diff-based approach for personnel: an employee's own department-role context is
  // resolved against whichever node they were in at each end (pristine vs replayed final), which
  // also naturally covers "never moved, but their department's HRBP changed" — no separate
  // ancestor-chain tracking needed, it falls out of comparing the two node states directly.
  // Ancestor IDs from root down to nodeId, following each node's CURRENT parentId in the given
  // node set — used below to tell whether an employee's path changed because their own
  // department moved/renamed vs. some ancestor further up the chain did.
  function ancestorChainIds(nodeById, nodeId){
    var ids = [], n = nodeById[nodeId];
    while(n){ ids.unshift(n.id); n = n.parentId ? nodeById[n.parentId] : null; }
    return ids;
  }

  // sinceTime/rawEditTime (both optional) mirror buildCombinedOrgChangeRows' own — see its comment.
  function buildCombinedPersonnelRows(pristineNodes, pristineEmployees, finalNodes, finalEmployees, entries, sinceTime, rawEditTime){
    var pristineNodeById = {}; pristineNodes.forEach(function(n){ pristineNodeById[n.id] = n; });
    var finalNodeById = {}; finalNodes.forEach(function(n){ finalNodeById[n.id] = n; });
    var pristineEmpById = {}; pristineEmployees.forEach(function(e){ pristineEmpById[e.eid] = e; });
    var lastTouched = computeLastTouched(entries);
    var empTime = lastTouched.empTime, nodeTime = lastTouched.nodeTime;

    var rows = finalEmployees.map(function(fe){
      var pe = pristineEmpById[fe.eid];
      if(!pe) return null;

      // An employee's row can appear purely because their department's roles/name/parent
      // changed, without the employee ever being the direct subject of an entry — computeLastTouched
      // only tracks that against the NODE id, so empTime alone would miss it (leaving Edit Time
      // blank, and worse, wrongly excluding the row from a sinceTime-filtered archive forever).
      // Walk the employee's current department chain and fold in whichever entry touched it last.
      var chain = ancestorChainIds(finalNodeById, fe.nodeId);
      var effectiveTime = empTime[fe.eid] || 0;
      chain.forEach(function(id){ if(nodeTime[id] && nodeTime[id]>effectiveTime) effectiveTime = nodeTime[id]; });
      if(sinceTime && !(effectiveTime > sinceTime)) return null;

      var oldPath = pathLabelIn(pristineNodes, pe.nodeId);
      var newPath = pathLabelIn(finalNodes, fe.nodeId);
      var pathChanged = oldPath !== newPath;
      var reportsChanged = fe.reportsTo !== pe.reportsTo;
      var before = pristineNodeById[pe.nodeId] ? nodeRolesAfter(pristineNodeById[pe.nodeId]) : {};
      var after = finalNodeById[fe.nodeId] ? nodeRolesAfter(finalNodeById[fe.nodeId]) : {};
      var roleChangeLabel = roleChangeSummary(
        Object.assign({}, before, {reportsTo: pe.reportsTo||''}),
        Object.assign({}, after, {reportsTo: fe.reportsTo||''}),
        ['reportsTo'].concat(PERSONNEL_ROLE_FIELDS)
      );
      if(!pathChanged && !reportsChanged && !roleChangeLabel) return null;

      // What kind of org change actually moved this employee, mirroring the org-change CSV's
      // own "type" labels: a direct transfer to a different department, vs. staying put while
      // that department (or one of its ancestors) got renamed and/or moved elsewhere.
      var orgChangeTypeLabels = [];
      if(pathChanged){
        if(fe.nodeId !== pe.nodeId){
          orgChangeTypeLabels.push(ct('logType').emp_transfer);
        } else {
          var oldChain = ancestorChainIds(pristineNodeById, pe.nodeId);
          if(oldChain.join('>') !== chain.join('>')) orgChangeTypeLabels.push(ct('logType').move);
          var renamedInChain = oldChain.some(function(id){
            return chain.indexOf(id)!==-1 && pristineNodeById[id].name !== finalNodeById[id].name;
          });
          if(renamedInChain) orgChangeTypeLabels.push(ct('logType').rename);
        }
      }
      var orgChangeLabel = orgChangeTypeLabels.join(', ');
      var editTime = rawEditTime ? (effectiveTime || null) : (effectiveTime ? formatSnapshotTime(new Date(effectiveTime)) : '');
      return {
        sortName: newPath || oldPath,
        sortTime: effectiveTime || 0,
        cells: [fe.eid, fe.name, orgChangeLabel, roleChangeLabel,
          oldPath, pe.reportsTo||'', before.hrbp1||'', before.hrbp2||'', before.hrbpLead||'', before.da||'',
          newPath, fe.reportsTo||'', after.hrbp1||'', after.hrbp2||'', after.hrbpLead||'', after.da||'', '', editTime]
      };
    }).filter(Boolean);

    // Department first, then chronologically within that department — same ordering as the
    // org-change CSV, so cross-referencing the two is straightforward.
    rows.sort(function(a,b){
      if(a.sortName !== b.sortName) return a.sortName < b.sortName ? -1 : 1;
      return a.sortTime - b.sortTime;
    });
    return [ct('csvPersonnelHeaders')].concat(rows.map(function(r){ return r.cells; }));
  }

  // Pulls the full shared history fresh (not whatever's already cached in remoteLog) and replays
  // it onto the pristine baseline — the one place all 6 export buttons below funnel through, so
  // everyone's CSV/copy reflects the same combined final result, not just their own session.
  function getCombinedReplayState(){
    return fetchRemoteChangeLog().then(function(){
      var entries = mergedLogForDisplay();
      var replayed = replayAll(entries, pristineNodes, pristineEmployees);
      return {entries:entries, finalNodes:replayed.nodes, finalEmployees:replayed.employees};
    });
  }

  // ---------- wiring ----------
  // Inserted before the file extension so repeated downloads within the same day (or even the
  // same minute) don't overwrite each other, and it's obvious at a glance when an export was made.
  function nowStamp(){
    var d = new Date();
    function pad(n){ return n<10 ? '0'+n : ''+n; }
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'-'+pad(d.getHours())+pad(d.getMinutes());
  }
  function dateStampedFilename(name){
    var m = name.match(/^(.*)(\.[^.]+)$/);
    return m ? (m[1] + '-' + nowStamp() + m[2]) : (name + '-' + nowStamp());
  }

  // The "archive changes to Base" admin button replaced these as the supported way to get
  // changes into Base — CSV download (still below) remains for anyone who wants a local copy.
  document.getElementById('downloadLogBtn').addEventListener('click', function(){
    getCombinedReplayState().then(function(s){
      downloadCsv(dateStampedFilename(ct('csvOrgChangeFilename')), buildCombinedOrgChangeRows(pristineNodes, s.finalNodes, s.entries));
    }).catch(function(err){ toast(err.message); });
  });
  document.getElementById('downloadChangelogBtn').addEventListener('click', function(){
    getCombinedReplayState().then(function(s){
      downloadCsv(dateStampedFilename(ct('csvOrgChangeFilename')), buildCombinedOrgChangeRows(pristineNodes, s.finalNodes, s.entries));
    }).catch(function(err){ toast(err.message); });
  });
  document.getElementById('downloadEmpBtn').addEventListener('click', function(){
    getCombinedReplayState().then(function(s){
      downloadCsv(dateStampedFilename(ct('csvPersonnelFilename')), buildCombinedPersonnelRows(pristineNodes, pristineEmployees, s.finalNodes, s.finalEmployees, s.entries));
    }).catch(function(err){ toast(err.message); });
  });
  document.getElementById('downloadChangelogEmpBtn').addEventListener('click', function(){
    getCombinedReplayState().then(function(s){
      downloadCsv(dateStampedFilename(ct('csvPersonnelFilename')), buildCombinedPersonnelRows(pristineNodes, pristineEmployees, s.finalNodes, s.finalEmployees, s.entries));
    }).catch(function(err){ toast(err.message); });
  });
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
  var empSearchInput = document.getElementById('empSearchInput');
  empSearchInput.addEventListener('input', function(){ doEmpSearch(empSearchInput.value); });
  document.addEventListener('click', function(ev){
    if(!ev.target.closest('.search-box')){
      document.getElementById('searchResults').classList.remove('show');
      document.getElementById('empSearchResults').classList.remove('show');
    }
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
      ctx.strokeStyle = C.line;
      strokeRoundedPolyline(ctx, seg.points, CONNECTOR_RADIUS);
    });

    document.querySelectorAll('#treeRoot .node').forEach(function(el){
      var r = el.getBoundingClientRect();
      var x = r.left - wrapRect.left, y = r.top - wrapRect.top;
      var isDeleted = el.classList.contains('st-deleted');
      var isNew = el.classList.contains('st-new');
      var isMoved = el.classList.contains('st-moved');
      var isRenamed = el.classList.contains('st-renamed');
      var bg = isDeleted ? C.warnBg : isNew ? C.newBg : isMoved ? C.movBg : isRenamed ? C.accentSoft : C.surface;
      var border = isDeleted ? C.warnBorder : isNew ? C.newBorder : isMoved ? C.movBorder : isRenamed ? C.accent : C.line;
      var textColor = isDeleted ? C.warnText : C.ink;

      var padX = 12;
      var nameEl = el.querySelector('.name');
      ctx.font = '700 12.5px -apple-system, "Segoe UI", sans-serif';
      var nameLines = wrapLines(ctx, nameEl ? nameEl.textContent : '', r.width - padX*2, Infinity);
      var metaLines = el.querySelectorAll('.meta-line');
      var tags = el.querySelectorAll('.tag');

      // Sized from what's actually drawn below, not the live box's real height — canvas text
      // metrics don't perfectly match the CSS line-height the real box was sized around, so
      // using that height left a visible gap under a wrapped multi-line name.
      var boxHeight = 11 + nameLines.length*15 + (metaLines.length ? 2 + metaLines.length*13 : 0) + (tags.length ? 3 + 14 : 0) + 10;

      roundRectPath(ctx, x, y, r.width, boxHeight, 9);
      ctx.fillStyle = bg; ctx.fill();
      ctx.strokeStyle = border; ctx.lineWidth = 1.5; ctx.stroke();

      var cy = y + 11;
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'top';
      nameLines.forEach(function(line){ ctx.fillText(line, x+padX, cy); cy += 15; });

      cy += 2;
      ctx.font = '10.5px -apple-system, "Segoe UI", sans-serif';
      ctx.fillStyle = C.inkMuted;
      metaLines.forEach(function(m){ ctx.fillText(m.textContent, x+padX, cy); cy += 13; });
      var tagY = cy + 3;
      var tagX = x + padX;
      tags.forEach(function(tag){
        ctx.font = '700 9.5px -apple-system, "Segoe UI", sans-serif';
        var tw = ctx.measureText(tag.textContent).width + 10;
        ctx.fillStyle = C.bg;
        roundRectPath(ctx, tagX, tagY, tw, 14, 4); ctx.fill();
        ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = C.inkMuted;
        ctx.fillText(tag.textContent, tagX+5, tagY+2);
        tagX += tw + 4;
      });
    });
    return canvas;
  }
  // Common browsers cap a canvas at roughly 16384px per side (some lower); a fully expanded
  // chart with thousands of employees can exceed that at the normal 2x export scale, which
  // makes toBlob silently resolve null instead of throwing. Scale down first if needed.
  var PNG_MAX_DIM = 14000;
  document.getElementById('downloadPngBtn').addEventListener('click', function(){
    try{
      var wrap = document.getElementById('treeWrap');
      if(!wrap.scrollWidth || !wrap.scrollHeight){ toast(t('toastPngNeedsChartView')); return; }
      var scale = 2;
      var longSide = Math.max(wrap.scrollWidth, wrap.scrollHeight);
      var scaledDown = false;
      if(longSide*scale > PNG_MAX_DIM){ scale = Math.max(1, PNG_MAX_DIM/longSide); scaledDown = true; }
      var canvas = drawChartToCanvas(scale);
      canvas.toBlob(function(blob){
        if(!blob){ toast(t('toastPngFailed')); return; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = dateStampedFilename(LANG==='zh' ? '组织架构图.png' : 'org-chart.png');
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast(scaledDown ? t('toastPngTooLarge') : t('toastPngDone'));
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
    window.location.href = '/api/auth/logout';
  });
  document.getElementById('refreshBtn').addEventListener('click', function(){
    showConfirm(
      t('refreshBtn'),
      LANG==='zh' ? '会重新从 Base 拉取最新数据并更新快照，当前未导出的本地编辑（重命名、移动、角色变更等）会被放弃。数据量大时可能需要几十秒，确定继续？' : 'This rewrites the snapshot from Base and re-fetches it. Any unexported local edits (renames, moves, role changes, etc.) will be discarded. Can take up to a minute for a large org — continue?',
      LANG==='zh' ? '确认刷新' : 'Refresh',
      function(){
        var btn = document.getElementById('refreshBtn');
        btn.disabled = true;
        btn.textContent = t('refreshBtnLoading');
        init(true).then(function(){
          btn.disabled = false;
          btn.textContent = t('refreshBtn');
        });
      }
    );
  });

  document.getElementById('noAccessLogoutBtn').addEventListener('click', function(){
    window.location.href = '/api/auth/logout';
  });

  // ---------- bootstrap: is there already a valid session? ----------
  applyStaticI18n();
  fetch('/api/auth/me', {credentials:'same-origin'})
    .then(function(res){ return res.ok ? res.json() : null; })
    .then(function(me){
      if(!me){ showLoginOverlay(); return; }
      currentUserName = me.name || '';
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
          // Shared change log is pulled here too (not just via "刷新编辑") so everyone's edits
          // are visible from the moment they log in — a failure here shouldn't block login, so
          // it's caught locally rather than tripping the Promise.all.
          return Promise.all([fetchEditWindow(), fetchRemoteChangeLog().catch(function(){})]).then(function(){
            applyRoleGating();
            document.getElementById('app').classList.add('ready');
            // Always a fresh init() — no restoring a stale local draft, per design: a reopened
            // tab with a leftover unsynced edit is exactly what causes an already-made change to
            // look "not applied yet" and get redone by mistake.
            return init().then(function(){ applyCombinedReplay(); render(); });
          });
        });
    })
    .catch(function(){ showLoginOverlay(); });

  // Catches the edit window opening/closing while the tab is left open, without needing a
  // refresh — re-pulls the setting (an admin may have changed it) and re-evaluates gating.
  setInterval(function(){
    if(!currentUserRole) return;
    fetchEditWindow().then(function(){ applyRoleGating(); renderPanel(); });
  }, 60000);
})();
