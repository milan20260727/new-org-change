(function(){

  // ---------- seed data (real snapshot: Central / Investor Relations Corp Comms & Sustainability) ----------
  var seedNodes = [
    {id:'bu-root', name:'Investor Relations Corporate Communications and Sustainability', parentId:null, pic:'Celeste JOVENIR'},
    {id:'ir',        name:'Investor Relations',      parentId:'bu-root', pic:'Celeste JOVENIR'},
    {id:'cc',        name:'Corporate Communications', parentId:'bu-root', pic:'Celeste JOVENIR'},
    {id:'sustain',    name:'Sustainability',           parentId:'bu-root', pic:'Celeste JOVENIR'},
    {id:'deptsupport',name:'Department Support',       parentId:'bu-root', pic:'Celeste JOVENIR'},
    {id:'comm',      name:'Communications',    parentId:'cc', pic:'Monica MABUTI'},
    {id:'creatives', name:'Creatives',          parentId:'cc', pic:'Junvi ALABADO'},
    {id:'media',     name:'Media Relations',    parentId:'cc', pic:'Josephine CRUZ'},
    {id:'social',    name:'DigiPlus Social Media', parentId:'cc', pic:'Junvi ALABADO'},
    {id:'influencer',name:'Influencer Marketing', parentId:'cc', inactive:true, pic:'Maica ARITAO'}
  ];
  var DEFAULT_HRBP1 = 'John Billy BAUTISTA', DEFAULT_HRBP2 = 'Alyssha RICONOSE';

  var seedEmployees = [
    {eid:'100329', name:'DUCUT, RAE ANNE LAGARTO', nodeId:'social', reportsTo:'Celeste JOVENIR'},
    {eid:'100418', name:'ALABADO, JUNVI SOLIS', nodeId:'creatives', reportsTo:'Celeste JOVENIR'},
    {eid:'100736', name:'ARITAO, MAICA ELLIANA ROSADA', nodeId:'social', reportsTo:'Junvi ALABADO'},
    {eid:'100964', name:'IBAÑEZ, JOHN RENZO EVANGELISTA', nodeId:'social', reportsTo:'Junvi ALABADO'},
    {eid:'101270', name:'ESPINOZA, LOUISE JOHN TANGHAL', nodeId:'social', reportsTo:'Junvi ALABADO'},
    {eid:'101457', name:'FERNANDEZ, ZSCHAIRIELLE PANGILINAN', nodeId:'creatives', reportsTo:'Junvi ALABADO'},
    {eid:'101681', name:'CRUZ, JOSEPHINE CARPIO', nodeId:'media', reportsTo:'Celeste JOVENIR'},
    {eid:'101901', name:'MABUTI, MONICA CIARA SISON', nodeId:'comm', reportsTo:'Celeste JOVENIR'},
    {eid:'101975', name:'OCON, RHODA MAY TEJERO', nodeId:'social', reportsTo:'Junvi ALABADO'},
    {eid:'102288', name:'MAULION, RICARDO JR. SUAREZ', nodeId:'sustain', reportsTo:'Celeste JOVENIR'},
    {eid:'102409', name:'FAUSTO, GIAN CARLO SANTOS', nodeId:'creatives', reportsTo:'Junvi ALABADO'},
    {eid:'102424', name:'MORALES, HIRON', nodeId:'ir', reportsTo:'Celeste JOVENIR'},
    {eid:'102549', name:'GARCIA, ALFRED BENJAMIN RIVERA', nodeId:'ir', reportsTo:'Celeste JOVENIR'},
    {eid:'20486',  name:'JOVENIR, CELESTE M.', nodeId:'bu-root', reportsTo:'Ping'},
    {eid:'20663',  name:'RAMOS, VIVIENNE S.', nodeId:'deptsupport', reportsTo:'Celeste JOVENIR'}
  ];

  // Lark User directory — role pickers only pull from this pool
  var personPool = ['Celeste JOVENIR','Monica MABUTI','Junvi ALABADO','Josephine CRUZ','Maica ARITAO','John Billy BAUTISTA','Alyssha RICONOSE',
    'Christine GABRIELES','Lauridsen','Su','Firesound','Smile','Tommy','Vernice','Jovelle NAGAMOS','Ami','Kei-Anne NACE','Kyla Mae ANCHORES',
    'Ronz SORIANO','Samantha Ysabel MEJORADA','Mylene INUMERABLE','Cherry LACUESTA','April Joy SALAZAR','Hazel Ma-Anne BARRO','Marinel SUAL',
    'Angelo SAMSON','Ariel JARITO','Kc GATON','Hensy','Rex TAN','Camille FRANCISCO','Ariel BERMUDO','Ruel DELA CRUZ','Kriezel CARGULLO',
    'Louie CAGAOAN','Carl Andrew CALZADO','Maevilyn ESMALLA','Mark LEAL','Wilard DIAZ','Eliezer MAGSAKAY','Ervic BORJA','Ricardo CORTEZ',
    'Jeffrey IBASCO','Ronn Renson DEL ROSARIO','Micko SAN BUENAVENTURA','Edgar Valen SINAMPAGA','Salvador CULAR','Elmer BRIT','Christopher BON',
    'Jeffrey SALADAN','Jerby RAGURO','Patrick CABADDU','Vernie BELISTA','Mark Louie AMPOAN','Jerico ULANIMO','Niño CRUZ','Adrian ASUNCION',
    'Ermar RAMIREZ','Ralph PITALUNA','Hilton PATUNGAN','Ryan DEL ROSARIO','Irish DOMAWAL','Honiely DIGNADICE','Michael FERNANDEZ',
    'Darwin LINGAD','Abraham SOLIS','Arnel BAQUE'];

  var nodes, employees, log, selectedId, viewRootId, orientation, logSeq, tempCounter, dragSrcId, pendingEdit, activeTab, createDraft, rosterSelected, gmodalEmp, gmodalOrg, pendingReportPrompt;

  function cloneSeed(){
    return seedNodes.map(function(n){
      return {id:n.id, name:n.name, origName:n.name, parentId:n.parentId,
        inactive: !!n.inactive, movedFrom:null, restoreLog:null,
        pic:n.pic||'', hrbp1:DEFAULT_HRBP1, hrbp2:DEFAULT_HRBP2, da:'',
        flags:{isNew:false, isDeleted:false, isRenamed:false}};
    });
  }

  function init(){
    nodes = cloneSeed();
    employees = seedEmployees.map(function(e){ return {eid:e.eid, name:e.name, nodeId:e.nodeId, origPath: pathLabel(e.nodeId), reportsTo:e.reportsTo||'', origReportsTo:e.reportsTo||''}; });
    log = [];
    selectedId = null;
    viewRootId = 'bu-root';
    orientation = 'vertical';
    logSeq = 1;
    tempCounter = 1;
    dragSrcId = null;
    pendingEdit = null;
    createDraft = null;
    rosterSelected = {};
    pendingReportPrompt = null;
    activeTab = 'structure';
    document.getElementById('searchInput').value = '';
    document.getElementById('reportPromptOverlay').classList.remove('show');
    document.getElementById('orientSeg').querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-orient')==='vertical'); });
    closePanel();
    closeGlobalTransfer();
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
    return {hrbp1:check('hrbp1'), hrbp2:check('hrbp2'), da:check('da')};
  }
  function hasAnyRoleWarning(id){
    if(getChildren(id).length===0) return false;
    var r = roleInconsistency(id);
    return r.hrbp1.bad || r.hrbp2.bad || r.da.bad;
  }

  function addLog(type, detail, key){ log.push({seq:logSeq++, type:type, detail:detail, key:key||null}); }
  // Rename / move / role-change are reversible within a session — upsertLog keeps exactly ONE
  // entry per (type, key), always describing session-original → current, so undoing an edit
  // (or moving a department out and back) removes the noise instead of leaving a "process" trail.
  function upsertLog(type, key, detail){
    var existing = log.filter(function(l){ return l.type===type && l.key===key; })[0];
    if(existing) existing.detail = detail;
    else log.push({seq:logSeq++, type:type, detail:detail, key:key});
  }
  function removeLog(type, key){ log = log.filter(function(l){ return !(l.type===type && l.key===key); }); }
  function removeAllLogsForNode(nodeId){
    log = log.filter(function(l){ return l.key!==nodeId && (typeof l.key!=='string' || l.key.indexOf(nodeId+'#')!==0); });
  }

  function toast(msg){
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function(){ t.classList.remove('show'); }, 2600);
  }

  // ---------- commit helpers ----------
  // Rename / move / role fields upsert a single log line keyed to the node (and field, for roles),
  // always phrased as session-original → current. Reverting a change removes that line entirely,
  // so back-and-forth edits (move A→B→A, rename X→Y→X) show no net change instead of a process trail.
  function commitRename(n, val){
    if(!val || val===n.name) return false;
    if(!n.flags.isRenamed){ n.origName = n.name; n.flags.isRenamed = true; }
    n.name = val;
    if(n.name === n.origName){
      n.flags.isRenamed = false;
      removeLog('重命名', n.id);
    } else {
      upsertLog('重命名', n.id, '「' + n.origName + '」→「' + n.name + '」');
    }
    return true;
  }
  function commitMove(n, targetId){
    if(!targetId || targetId===n.parentId || targetId===n.id || isDescendant(n.id, targetId)) return false;
    if(n.movedFrom===null) n.movedFrom = n.parentId;
    n.parentId = targetId;
    if(n.parentId === n.movedFrom){
      n.movedFrom = null;
      removeLog('移动', n.id);
    } else {
      upsertLog('移动', n.id, n.name + '：「' + getNode(n.movedFrom).name + '」→「' + getNode(n.parentId).name + '」');
    }
    return true;
  }
  function commitAddChild(parentNode, draft){
    var val = (draft.name||'').trim();
    if(!val) return null;
    var id = 'new-' + (tempCounter++);
    var newNode = {id:id, name:val, origName:val, parentId:parentNode.id, inactive:false, movedFrom:null, restoreLog:null,
      pic:draft.pic||'', hrbp1:draft.hrbp1||'', hrbp2:draft.hrbp2||'', da:draft.da||'', origRoles:null,
      flags:{isNew:true, isDeleted:false, isRenamed:false}};
    nodes.push(newNode);
    var roleBits = [];
    if(newNode.pic) roleBits.push('PIC：'+newNode.pic);
    if(newNode.hrbp1) roleBits.push('HRBP1：'+newNode.hrbp1);
    if(newNode.hrbp2) roleBits.push('HRBP2：'+newNode.hrbp2);
    if(newNode.da) roleBits.push('Department Assistant：'+newNode.da);
    addLog('新增', '「' + val + '」新增于「' + parentNode.name + '」下' + (roleBits.length ? '（' + roleBits.join('，') + '）' : ''), id);
    return newNode;
  }
  function commitEmployeeTransfer(emp, targetId, silent){
    var fromNode = getNode(emp.nodeId);
    var toNode = getNode(targetId);
    if(!toNode || targetId===emp.nodeId) return false;
    emp.nodeId = targetId;
    if(!silent) addLog('员工调动', emp.name + '（'+emp.eid+'）：「' + fromNode.name + '」→「' + toNode.name + '」');
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
    addLog('删除', '「' + n.name + '」（原上级：' + getNode(n.parentId).name + (restoreLog.length ? '，'+restoreLog.length+' 名员工已安置新部门' : '') + '）');
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
    addLog('撤销删除', '「' + n.name + '」已恢复' + (restored ? '，' + restored + ' 名员工已迁回原部门' : ''));
  }
  function commitRoleChange(n, field, label, val){
    if(val===n[field]) return;
    if(!n.origRoles) n.origRoles = {pic:n.pic, hrbp1:n.hrbp1, hrbp2:n.hrbp2, da:n.da};
    n[field] = val;
    var key = n.id + '#' + field;
    if(n[field] === n.origRoles[field]){
      removeLog('角色变更', key);
    } else {
      var origVal = n.origRoles[field] || '（空）';
      upsertLog('角色变更', key, '「' + n.name + '」' + label + '：' + origVal + ' → ' + (n[field]||'（空）'));
    }
  }
  function commitCascade(n){
    var desc = getDescendants(n.id);
    if(!desc.length) return;
    desc.forEach(function(d){
      if(!d.origRoles) d.origRoles = {pic:d.pic, hrbp1:d.hrbp1, hrbp2:d.hrbp2, da:d.da};
      d.hrbp1 = n.hrbp1; d.hrbp2 = n.hrbp2; d.da = n.da;
      // the batch summary line below supersedes any individual 角色变更 entries for these fields
      ['hrbp1','hrbp2','da'].forEach(function(field){ removeLog('角色变更', d.id+'#'+field); });
    });
    addLog('角色批量应用', '将「' + n.name + '」的 HRBP1/HRBP2/Department Assistant 应用到 ' + desc.length + ' 个下级部门');
  }

  // BIPO ("LAST, First Middle") and Lark/PIC ("First Last") name formats differ — the same
  // mismatch we saw in the department-name audit — so match loosely on name tokens.
  function matchesPersonName(empName, picName){
    var picParts = picName.toLowerCase().split(/\s+/).filter(Boolean);
    var empLower = empName.toLowerCase();
    return picParts.length>0 && picParts.every(function(p){ return empLower.indexOf(p)>=0; });
  }
  function commitReportChange(emp, newSupervisor){
    var old = emp.reportsTo || '（空）';
    emp.reportsTo = newSupervisor;
    if(emp.reportsTo === emp.origReportsTo) removeLog('汇报关系变更', emp.eid);
    else upsertLog('汇报关系变更', emp.eid, emp.name + '：直属主管 ' + old + ' → ' + newSupervisor);
  }
  function maybePromptReportChange(n){
    if(!n.pic) return;
    var picEmp = employees.filter(function(e){ return matchesPersonName(e.name, n.pic); })[0];
    if(!picEmp) return;
    var parent = getNode(n.parentId);
    var newSupervisor = parent ? parent.pic : '';
    if(!newSupervisor || newSupervisor===picEmp.reportsTo || newSupervisor===n.pic) return;
    pendingReportPrompt = {emp:picEmp, newSupervisor:newSupervisor};
    document.getElementById('reportPromptText').textContent =
      '「' + n.name + '」已移动到「' + parent.name + '」下。是否把负责人「' + picEmp.name + '」的直属汇报对象，从「' +
      (picEmp.reportsTo || '（空）') + '」改为「' + newSupervisor + '」？';
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
      del:{on:false, assignments:{}}
    };
    rosterSelected = {};
    render();
  }
  function openCreateChild(parentId){
    selectedId = parentId;
    activeTab = 'create';
    createDraft = {name:'', pic:'', hrbp1:'', hrbp2:'', da:''};
    render();
  }
  function closePanel(){
    selectedId = null; pendingEdit = null; createDraft = null; rosterSelected = {};
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
        if(res.reason==='children') toast('无法删除：请先处理子部门');
        else toast('还有 ' + res.missing.length + ' 名员工尚未安置新部门');
        return;
      }
      toast('已标记删除'); closePanel(); render(); return;
    }
    var did = false, moved = false;
    if(pendingEdit.rename.on) did = commitRename(n, (pendingEdit.rename.value||'').trim()) || did;
    if(pendingEdit.move.on){ moved = commitMove(n, pendingEdit.move.target); did = moved || did; }
    if(!did){ toast('没有可保存的变更'); return; }
    closePanel(); render();
    toast('已保存变更');
    if(moved) maybePromptReportChange(n);
  }

  function saveCreateChild(){
    var parent = getNode(selectedId); if(!parent) return;
    if(!(createDraft.name||'').trim()){ toast('请填写新部门名称'); return; }
    var newNode = commitAddChild(parent, createDraft);
    if(!newNode){ toast('请填写新部门名称'); return; }
    toast('已新增部门'); closePanel(); render();
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
      document.getElementById('editNodeName').textContent = '新增子部门';
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
      body.innerHTML = '<div class="warn-box">该部门已标记删除。删除时涉及的员工已安置到其他部门；撤销删除会把他们迁回来。</div>';
      foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">关闭</button><button class="btn primary" id="undoDeleteBtn">撤销删除</button>';
      document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
      document.getElementById('undoDeleteBtn').addEventListener('click', function(){
        commitRestoreDelete(n);
        toast('已撤销删除'); closePanel(); render();
      });
      return;
    }

    if(activeTab==='structure') renderStructureTab(n, body, foot);
    else if(activeTab==='role') renderRoleTab(n, body, foot);
    else renderRosterTab(n, body, foot);
  }

  function renderCreatePanel(parent, body, foot){
    var html = '<div class="hint" style="margin-bottom:12px;">新增于「'+escapeHtml(parent.name)+'」下</div>';
    html += '<div class="edit-row open" style="margin-bottom:16px;"><div class="edit-row-body" style="border-top:none; margin-top:0; padding-top:0;">'+
      '<input type="text" id="createNameInput" value="'+escapeHtml(createDraft.name)+'" placeholder="新部门名称"></div></div>';
    html += roleRowHtml(createDraft, 'pic', 'PIC');
    html += roleRowHtml(createDraft, 'hrbp1', 'HRBP1');
    html += roleRowHtml(createDraft, 'hrbp2', 'HRBP2');
    html += roleRowHtml(createDraft, 'da', 'Department Assistant');
    body.innerHTML = html;
    document.getElementById('createNameInput').addEventListener('input', function(ev){ createDraft.name = ev.target.value; });
    bindRolePickers(createDraft);
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">取消</button><button class="btn primary" id="saveCreateBtn">创建</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    document.getElementById('saveCreateBtn').addEventListener('click', saveCreateChild);
  }

  function renderStructureTab(n, body, foot){
    var childCount = getChildren(n.id).filter(function(c){ return !c.flags.isDeleted; }).length;
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    var empCount = direct.length;
    var delBlockedByChildren = childCount>0;
    var otherNodes = nodes.filter(function(x){ return x.id!==n.id && !x.flags.isDeleted && !isDescendant(n.id, x.id); });

    var html = '<div class="drag-hint">提示：也可以直接在图上把「' + escapeHtml(n.name) + '」拖到目标部门上完成移动。</div>';

    html += '<div class="edit-row ' + (pendingEdit.del.on?'disabled':'') + (pendingEdit.rename.on?' open':'') + '">'+
      '<div class="edit-row-head" data-toggle="rename"><input type="checkbox" '+(pendingEdit.rename.on?'checked':'')+' '+(pendingEdit.del.on?'disabled':'')+'><span class="lbl">重命名</span></div>'+
      '<div class="edit-row-body"><input type="text" id="renameInput" value="'+escapeHtml(pendingEdit.rename.value)+'" placeholder="新名称"></div>'+
      '</div>';

    html += '<div class="edit-row ' + (pendingEdit.del.on?'disabled':'') + (pendingEdit.move.on?' open':'') + '">'+
      '<div class="edit-row-head" data-toggle="move"><input type="checkbox" '+(pendingEdit.move.on?'checked':'')+' '+(pendingEdit.del.on?'disabled':'')+'><span class="lbl">移动</span></div>'+
      '<div class="edit-row-body"><select id="moveSelect"><option value="">选择目标上级部门…</option>'+
      otherNodes.map(function(x){ return '<option value="'+x.id+'" '+(pendingEdit.move.target===x.id?'selected':'')+'>'+escapeHtml(pathLabel(x.id))+'</option>'; }).join('')+
      '</select><div class="hint">下拉列表已排除自身及其所有子部门，避免循环嵌套。</div></div>'+
      '</div>';

    var anyOtherOn = pendingEdit.rename.on || pendingEdit.move.on;
    html += '<div class="edit-row ' + (anyOtherOn?'disabled':'') + (pendingEdit.del.on?' open':'') + '" style="border-color:var(--warn-border);">'+
      '<div class="edit-row-head" data-toggle="del"><input type="checkbox" '+(pendingEdit.del.on?'checked':'')+' '+((anyOtherOn||delBlockedByChildren)?'disabled':'')+'><span class="lbl" style="color:var(--warn-text);">删除该部门</span></div>';
    if(delBlockedByChildren){
      html += '<div class="blocked">下面还有 '+childCount+' 个子部门，需先移动或删除它们才能删除本部门。</div>';
    } else if(pendingEdit.del.on){
      html += '<div class="edit-row-body">';
      if(empCount>0){
        html += '<div class="reassign-box"><div class="rb-title">删除前需要为以下 '+empCount+' 名员工安置新部门</div>';
        html += '<div class="bulk-row"><select id="bulkDelTarget"><option value="">批量选择目标部门…</option>'+
          otherNodes.map(function(x){ return '<option value="'+x.id+'">'+escapeHtml(pathLabel(x.id))+'</option>'; }).join('')+
          '</select><button class="btn" id="bulkDelApply" type="button">全部转移到此</button></div>';
        direct.forEach(function(e){
          html += '<div class="reassign-row"><span class="rn-name">'+escapeHtml(e.name)+' <span class="mono" style="color:var(--ink-muted);">'+e.eid+'</span></span>'+
            '<select data-eid="'+e.eid+'" class="del-assign-select"><option value="">选择新部门…</option>'+
            otherNodes.map(function(x){ return '<option value="'+x.id+'" '+(pendingEdit.del.assignments[e.eid]===x.id?'selected':'')+'>'+escapeHtml(pathLabel(x.id))+'</option>'; }).join('')+
            '</select></div>';
        });
        html += '</div>';
      } else {
        html += '<div class="hint">删除后仍会以灰色显示在图中，并保留在变更记录里。与重命名/移动互斥。</div>';
      }
      html += '</div>';
    }
    html += '</div>';

    body.innerHTML = html;
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">取消</button><button class="btn primary" id="saveEditBtn">保存</button>';

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
    var ms = document.getElementById('moveSelect'); if(ms) ms.addEventListener('change', function(){ pendingEdit.move.target = ms.value; });
    var bulkSel = document.getElementById('bulkDelTarget');
    var bulkBtn = document.getElementById('bulkDelApply');
    if(bulkBtn) bulkBtn.addEventListener('click', function(){
      if(!bulkSel.value){ toast('请先选择批量目标部门'); return; }
      direct.forEach(function(e){ pendingEdit.del.assignments[e.eid] = bulkSel.value; });
      renderPanel();
    });
    body.querySelectorAll('.del-assign-select').forEach(function(sel){
      sel.addEventListener('change', function(){ pendingEdit.del.assignments[sel.getAttribute('data-eid')] = sel.value; });
    });

    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    document.getElementById('saveEditBtn').addEventListener('click', saveStructureEdit);
  }

  function renderRoleTab(n, body, foot){
    var inc = roleInconsistency(n.id);
    var warnParts = [];
    ['hrbp1','hrbp2','da'].forEach(function(f){
      var label = f==='hrbp1'?'HRBP1':f==='hrbp2'?'HRBP2':'Department Assistant';
      if(inc[f].bad){
        var reason = inc[f].differs ? '下级部门取值不一致' : '存在未设置（空值）';
        warnParts.push('<b>'+label+'</b>：'+reason);
      }
    });
    var hasChildren = getChildren(n.id).length>0;

    var html = '';
    if(hasChildren){
      html += warnParts.length
        ? '<div class="warn-box">⚠ 下级部门角色需要核查：<br>'+warnParts.join('<br>')+'</div>'
        : '<div class="ok-box">✓ 该分支下的 HRBP / Department Assistant 设置一致。</div>';
    }

    html += roleRowHtml(n, 'pic', 'PIC');
    html += roleRowHtml(n, 'hrbp1', 'HRBP1');
    html += roleRowHtml(n, 'hrbp2', 'HRBP2');
    html += roleRowHtml(n, 'da', 'Department Assistant');

    body.innerHTML = html;
    bindRolePickers(n);

    foot.innerHTML = hasChildren
      ? '<button class="btn ghost" id="cancelEditBtn">关闭</button><button class="btn primary" id="cascadeBtn">应用到所有下级部门（HRBP1/HRBP2/Dept. Assistant）</button>'
      : '<button class="btn ghost" id="cancelEditBtn">关闭</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
    var cascadeBtn = document.getElementById('cascadeBtn');
    if(cascadeBtn) cascadeBtn.addEventListener('click', function(){
      commitCascade(n);
      toast('已应用到所有下级部门');
      renderTree(); renderLog(); renderEmployees(); renderPanel();
    });
  }

  function renderRosterTab(n, body, foot){
    var direct = employees.filter(function(e){ return e.nodeId===n.id; });
    var otherNodes = nodes.filter(function(x){ return x.id!==n.id && !x.flags.isDeleted; });
    var selCount = Object.keys(rosterSelected).filter(function(k){ return rosterSelected[k]; }).length;

    if(!direct.length){
      body.innerHTML = '<div class="empty-note">该部门目前没有直属员工。</div>';
      foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">关闭</button>';
      document.getElementById('cancelEditBtn').addEventListener('click', closePanel);
      return;
    }

    var html = '<div class="roster-toolbar">'+
      '<label style="display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--ink-muted);"><input type="checkbox" id="rosterSelectAll"> 全选（'+direct.length+' 人）</label>'+
      '</div>';
    direct.forEach(function(e){
      html += '<div class="roster-row" data-eid="'+e.eid+'">'+
        '<input type="checkbox" class="roster-cb" data-eid="'+e.eid+'" '+(rosterSelected[e.eid]?'checked':'')+'>'+
        '<div class="rr-info"><div class="rr-name">'+escapeHtml(e.name)+'</div><div class="rr-eid">EID '+e.eid+' · 汇报对象：'+(e.reportsTo?escapeHtml(e.reportsTo):'未设置')+'</div></div>'+
        '</div>';
    });
    html += '<div class="roster-toolbar" style="margin-top:12px; padding-top:12px; border-top:1px solid var(--line);">'+
      '<select id="rosterBulkTarget"><option value="">转移目标部门…</option>'+
      otherNodes.map(function(x){ return '<option value="'+x.id+'">'+escapeHtml(pathLabel(x.id))+'</option>'; }).join('')+
      '</select><button class="btn primary" id="rosterBulkApply" type="button" '+(selCount?'':'disabled')+'>转移已选员工（'+selCount+'）</button></div>';

    body.innerHTML = html;
    foot.innerHTML = '<button class="btn ghost" id="cancelEditBtn">关闭</button>';
    document.getElementById('cancelEditBtn').addEventListener('click', closePanel);

    document.getElementById('rosterSelectAll').addEventListener('change', function(ev){
      direct.forEach(function(e){ rosterSelected[e.eid] = ev.target.checked; });
      renderPanel();
    });
    body.querySelectorAll('.roster-cb').forEach(function(cb){
      cb.addEventListener('change', function(){ rosterSelected[cb.getAttribute('data-eid')] = cb.checked; renderPanel(); });
    });
    document.getElementById('rosterBulkApply').addEventListener('click', function(){
      var target = document.getElementById('rosterBulkTarget').value;
      if(!target){ toast('请先选择转移目标部门'); return; }
      var moved = 0;
      direct.forEach(function(e){ if(rosterSelected[e.eid]){ commitEmployeeTransfer(e, target); moved++; } });
      rosterSelected = {};
      toast('已转移 ' + moved + ' 名员工');
      renderTree(); renderLog(); renderEmployees(); renderPanel();
    });
  }

  function roleRowHtml(obj, field, label){
    var val = obj[field] || '';
    return '<div class="role-row" data-field="'+field+'">'+
      '<div class="rlbl">'+label+'</div>'+
      '<div class="role-value" data-open="'+field+'"><span class="rv-name '+(val?'':'empty')+'">'+escapeHtml(val||'未设置')+'</span><span class="rv-edit">更改</span></div>'+
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
        picker.innerHTML = '<input type="text" placeholder="从 Lark User 中搜索姓名…" autocomplete="off"><div class="options"></div>';
        row.appendChild(picker);
        var input = picker.querySelector('input');
        var opts = picker.querySelector('.options');
        function renderOpts(q){
          var list = personPool.filter(function(p){ return p.toLowerCase().indexOf((q||'').toLowerCase())>=0; }).slice(0,8);
          opts.innerHTML = list.length ? list.map(function(p){ return '<button type="button" data-name="'+escapeHtml(p)+'">'+escapeHtml(p)+'</button>'; }).join('') + '<button type="button" data-name="" style="color:var(--warn-text);">清空该角色</button>'
            : '<button type="button" disabled style="color:var(--ink-muted);">无匹配结果</button>';
        }
        renderOpts('');
        input.focus();
        input.addEventListener('input', function(){ renderOpts(input.value); });
        opts.addEventListener('click', function(ev){
          var btn = ev.target.closest('button[data-name]'); if(!btn) return;
          var label = field==='pic'?'PIC':field==='hrbp1'?'HRBP1':field==='hrbp2'?'HRBP2':'Department Assistant';
          var val = btn.getAttribute('data-name');
          if(isRealNode){ commitRoleChange(target, field, label, val); renderTree(); renderLog(); }
          else target[field] = val;
          renderPanel();
        });
        document.addEventListener('click', function onDoc(ev){
          if(!row.contains(ev.target)){ picker.remove(); document.removeEventListener('click', onDoc); }
        });
      });
    });
  }

  // ---------- drag & drop ----------
  function onDragStart(ev, id){
    var n = getNode(id);
    if(n.flags.isDeleted) { ev.preventDefault(); return; }
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
    toast('已选定目标，点击"保存"确认这次移动');
  }

  // ---------- rendering ----------
  function nodeClasses(n){
    var c = ['node'];
    if(n.flags.isDeleted) c.push('st-deleted');
    else if(n.flags.isNew) c.push('st-new');
    if(selectedId===n.id) c.push('selected');
    return c.join(' ');
  }

  function renderNodeBox(n){
    var tags = '';
    if(n.flags.isNew) tags += '<span class="tag new">新增</span>';
    if(n.flags.isRenamed) tags += '<span class="tag ren" title="原名：'+escapeHtml(n.origName)+'">已改名</span>';
    if(n.movedFrom!==null) tags += '<span class="tag mov">已移动</span>';
    if(n.inactive) tags += '<span class="tag off">既有停用</span>';
    var warnIco = hasAnyRoleWarning(n.id) ? '<span class="warn-ico" title="下级部门角色不一致或未设置">⚠</span>' : '';
    var draggable = n.flags.isDeleted ? 'false' : 'true';
    return '<div class="'+nodeClasses(n)+'" draggable="'+draggable+'" data-id="'+n.id+'" title="'+escapeHtml(n.name)+(n.flags.isRenamed?' ｜ 原名: '+escapeHtml(n.origName):'')+'">'+
      '<div class="name-row"><span class="name">'+escapeHtml(n.name)+'</span>'+warnIco+'</div>'+
      '<div class="meta-line">PIC：'+(n.pic?escapeHtml(n.pic):'未设置')+'</div>'+
      '<div class="meta-line">在职 '+rollupHeadcount(n.id)+' 人</div>'+
      (tags? '<div class="tags">'+tags+'</div>' : '')+
      '</div>';
  }

  function renderGhost(n){
    var newParentName = getNode(n.parentId).name;
    return '<li><div class="node-ghost"><div class="name">'+escapeHtml(n.origName)+'</div><div class="arrow">→ 已移至「'+escapeHtml(newParentName)+'」</div></div></li>';
  }

  function renderSubtree(id, isRoot){
    var n = getNode(id);
    var children = getChildren(id);
    var ghosts = getGhosts(id);
    var kids = children.length + ghosts.length;
    var html = '<li class="'+(isRoot?'tlevel-root':'')+(kids===1?' only-child':'')+'">';
    html += renderNodeBox(n);
    if(kids){
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
    drawConnectors();
  }

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
    document.getElementById('logCount').textContent = log.length + ' 条';
    if(!log.length){ body.innerHTML = '<tr><td colspan="3" class="empty-note">暂无变更，点一个部门框试试</td></tr>'; return; }
    body.innerHTML = log.map(function(l){ return '<tr><td class="mono">'+l.seq+'</td><td>'+l.type+'</td><td>'+escapeHtml(l.detail)+'</td></tr>'; }).join('');
  }

  function computeImpacted(){
    return employees.filter(function(e){ return pathLabel(e.nodeId) !== e.origPath || chainHasChange(e.nodeId); }).map(function(e){
      return {eid:e.eid, name:e.name, oldPath:e.origPath, newPath: pathLabel(e.nodeId)};
    });
  }

  function renderEmployees(){
    var impacted = computeImpacted();
    document.getElementById('empCount').textContent = impacted.length + ' 人';
    var body = document.getElementById('empBody');
    if(!impacted.length){ body.innerHTML = '<tr><td colspan="3" class="empty-note">还没有员工受影响</td></tr>'; return; }
    body.innerHTML = impacted.map(function(e){
      var right = '<div class="path-old">'+escapeHtml(e.oldPath)+'</div><div class="path-new">'+escapeHtml(e.newPath)+'</div>';
      return '<tr><td class="mono">'+e.eid+'</td><td>'+escapeHtml(e.name)+'</td><td>'+right+'</td></tr>';
    }).join('');
  }

  function render(){
    renderTree();
    renderLog();
    renderEmployees();
    renderPanel();
    var pill = document.getElementById('focusPill');
    if(viewRootId!=='bu-root'){ pill.classList.add('show'); document.getElementById('focusName').textContent = getNode(viewRootId).name; }
    else pill.classList.remove('show');
  }

  // ---------- search ----------
  function doSearch(q){
    var box = document.getElementById('searchResults');
    q = q.trim();
    if(!q){ box.classList.remove('show'); box.innerHTML=''; return; }
    var matches = nodes.filter(function(n){ return !n.flags.isDeleted && n.name.toLowerCase().indexOf(q.toLowerCase())>=0; }).slice(0,8);
    if(!matches.length){ box.innerHTML = '<button disabled style="color:var(--ink-muted);">无匹配部门</button>'; box.classList.add('show'); return; }
    box.innerHTML = matches.map(function(n){ return '<button type="button" data-id="'+n.id+'">'+escapeHtml(n.name)+'</button>'; }).join('');
    box.classList.add('show');
    box.querySelectorAll('button[data-id]').forEach(function(b){
      b.addEventListener('click', function(){
        viewRootId = b.getAttribute('data-id');
        document.getElementById('searchInput').value = '';
        box.classList.remove('show');
        render();
      });
    });
  }

  // ---------- copy / download ----------
  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ toast('已复制，可直接粘贴到 Base'); }, function(){ fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text){
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); toast('已复制，可直接粘贴到 Base'); }catch(e){ toast('复制失败，请改用下载'); }
    document.body.removeChild(ta);
  }
  function downloadCsv(filename, rows){
    var csv = rows.map(function(r){ return r.map(function(v){ v=String(v==null?'':v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }).join(','); }).join('\r\n');
    var blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8;'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
  }
  function logRows(){ return [['操作类型','详情']].concat(log.map(function(l){ return [l.type, l.detail]; })); }
  function empRows(){
    return [['EID','姓名','原部门','新部门']].concat(computeImpacted().map(function(e){
      return [e.eid, e.name, e.oldPath, e.newPath];
    }));
  }

  // ---------- wiring ----------
  document.getElementById('copyLogBtn').addEventListener('click', function(){ copyText(logRows().map(function(r){ return r.join('\t'); }).join('\n')); });
  document.getElementById('downloadLogBtn').addEventListener('click', function(){ downloadCsv('组织架构变更记录.csv', logRows()); });
  document.getElementById('copyEmpBtn').addEventListener('click', function(){ copyText(empRows().map(function(r){ return r.join('\t'); }).join('\n')); });
  document.getElementById('downloadEmpBtn').addEventListener('click', function(){ downloadCsv('员工变更清单.csv', empRows()); });
  document.getElementById('resetBtn').addEventListener('click', function(){ init(); toast('已重置演示'); });
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

  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function(){ doSearch(searchInput.value); });
  document.addEventListener('click', function(ev){
    if(!ev.target.closest('.search-box')) document.getElementById('searchResults').classList.remove('show');
  });
  document.getElementById('clearFocus').addEventListener('click', function(){ viewRootId='bu-root'; render(); });
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
      empPicked.innerHTML = '<span>'+escapeHtml(gmodalEmp.name)+' <span class="mono" style="color:var(--ink-muted);">'+gmodalEmp.eid+'</span> — 现在：'+escapeHtml(pathLabel(gmodalEmp.nodeId))+'</span><button type="button" id="gmodalEmpClear">重选</button>';
      document.getElementById('gmodalEmpClear').addEventListener('click', function(){ gmodalEmp=null; renderGModal(); renderGModalOptions('emp',''); });
    } else {
      empPicked.style.display = 'none'; empSearchWrap.style.display = 'block';
    }
    var orgPicked = document.getElementById('gmodalOrgPicked');
    var orgSearchWrap = document.getElementById('gmodalOrgSearchWrap');
    if(gmodalOrg){
      orgPicked.style.display = 'flex'; orgSearchWrap.style.display = 'none';
      orgPicked.innerHTML = '<span>'+escapeHtml(pathLabel(gmodalOrg.id))+'</span><button type="button" id="gmodalOrgClear">重选</button>';
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
        : '<button type="button" disabled style="color:var(--ink-muted);">无匹配员工</button>';
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
        : '<button type="button" disabled style="color:var(--ink-muted);">无匹配部门</button>';
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
      toast('已更新汇报对象');
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
  document.getElementById('gmodalCancelBtn').addEventListener('click', closeGlobalTransfer);
  document.getElementById('gmodalOverlay').addEventListener('click', function(ev){ if(ev.target.id==='gmodalOverlay') closeGlobalTransfer(); });
  document.getElementById('gmodalEmpSearch').addEventListener('input', function(){ renderGModalOptions('emp', this.value); });
  document.getElementById('gmodalOrgSearch').addEventListener('input', function(){ renderGModalOptions('org', this.value); });
  document.getElementById('gmodalConfirmBtn').addEventListener('click', function(){
    if(!gmodalEmp || !gmodalOrg) return;
    commitEmployeeTransfer(gmodalEmp, gmodalOrg.id);
    toast('已转移 ' + gmodalEmp.name);
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
      movText:g('--mov-text'), accent:g('--accent')
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
      var bg = (isGhost||isDeleted) ? C.delBg : isNew ? C.newBg : C.surface;
      var border = (isGhost||isDeleted) ? C.delBorder : isNew ? C.newBorder : C.line;
      var textColor = (isGhost||isDeleted) ? C.delText : C.ink;

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
        if(!blob){ toast('导出失败，请改用浏览器自带的截图功能'); return; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '组织架构图.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast('已下载 PNG');
      }, 'image/png');
    }catch(e){
      toast('导出失败：' + e.message);
    }
  });

  // ---------- login (simulated — real Lark OAuth cannot run inside this sandbox) ----------
  document.getElementById('loginBtn').addEventListener('click', function(){
    var card = document.getElementById('loginCard');
    card.classList.add('loading');
    document.getElementById('loginBtnText').textContent = '登录中…';
    setTimeout(function(){
      document.getElementById('loginOverlay').style.display = 'none';
      document.getElementById('userName').textContent = 'Celeste JOVENIR';
      document.getElementById('app').classList.add('ready');
      init();
    }, 650);
  });
  document.getElementById('logoutBtn').addEventListener('click', function(){
    document.getElementById('app').classList.remove('ready');
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('loginCard').classList.remove('loading');
    document.getElementById('loginBtnText').textContent = '使用飞书账号登录';
    closePanel();
  });

  init();
})();
