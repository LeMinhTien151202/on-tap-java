// Độc lập với tiến độ của Lý thuyết/Quiz/Checklist hiện có.
var cvStudyState = {module:"project-tool-map",stage:"all",query:"",kind:"all",status:"all",scope:"module",limit:30,draw:"",open:{}};
var cvStudyProgress = {items:{},notes:{},lastModule:"project-tool-map"};
var cvStorageWarning = "";
try {
  var cvStored = JSON.parse(localStorage.getItem("ontap.cvStudy.v1") || "null");
  if (cvStored && typeof cvStored === "object" && !Array.isArray(cvStored)) {
    if (cvStored.items && typeof cvStored.items === "object" && !Array.isArray(cvStored.items)) cvStudyProgress.items = cvStored.items;
    if (cvStored.notes && typeof cvStored.notes === "object" && !Array.isArray(cvStored.notes)) cvStudyProgress.notes = cvStored.notes;
    if (typeof cvStored.lastModule === "string") cvStudyProgress.lastModule = cvStored.lastModule;
  }
} catch (e) { cvStorageWarning = "Không đọc được tiến độ đã lưu. Bạn vẫn có thể học; hãy kiểm tra quyền lưu trữ của trình duyệt."; }

function cvSaveProgress() {
  try {
    localStorage.setItem("ontap.cvStudy.v1", JSON.stringify(cvStudyProgress));
    cvStorageWarning = "";
    return true;
  } catch (e) {
    cvStorageWarning = "Trình duyệt không lưu được tiến độ/ghi chú. Thay đổi hiện chỉ còn trong phiên này.";
    return false;
  }
}
function cvNormalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();
}
function cvModuleById(id) { return CV_STUDY.modules.find(function(m){return m.id === id;}); }
function cvAllItems() {
  return CV_STUDY.modules.reduce(function(all,m){return all.concat(m.items.map(function(q){return {module:m,item:q};}));},[]);
}
function cvKnown(items) { return items.filter(function(q){return cvStudyProgress.items[q.id] === "known";}).length; }
function cvParagraph(text) {
  return String(text || "").split(/\n\n+/).map(function(p){return "<p>"+esc(p)+"</p>";}).join("");
}
function cvKind(kind) { return {theory:"Lý thuyết",application:"Áp dụng",scenario:"Tình huống",interview:"Phỏng vấn"}[kind] || kind; }
function cvFiltered() {
  var terms = cvNormalize(cvStudyState.query).trim().split(/\s+/).filter(Boolean);
  return cvAllItems().filter(function(row){
    var m=row.module, q=row.item;
    if (cvStudyState.stage !== "all" && m.stage !== cvStudyState.stage) return false;
    if (cvStudyState.scope === "module" && m.id !== cvStudyState.module) return false;
    if (cvStudyState.kind !== "all" && q.kind !== cvStudyState.kind) return false;
    var status = cvStudyProgress.items[q.id];
    if (cvStudyState.status === "known" && status !== "known") return false;
    if (cvStudyState.status === "review" && status !== "review") return false;
    if (cvStudyState.status === "unread" && status === "known") return false;
    var haystack = cvNormalize([m.title,m.cv,q.q,q.answer,q.example,q.pitfall,q.exercise,q.code].join(" "));
    return terms.every(function(t){return haystack.indexOf(t) !== -1;});
  });
}
function cvUpdateStats(root) {
  var all=cvAllItems(), done=all.filter(function(r){return cvStudyProgress.items[r.item.id] === "known";}).length;
  var review=all.filter(function(r){return cvStudyProgress.items[r.item.id] === "review";}).length;
  root.querySelector("#cv-stats").textContent = CV_STUDY.modules.length+" chủ đề · "+all.length+" câu · "+done+" đã nắm · "+review+" cần ôn lại";
  var progress=root.querySelector("#cv-total-progress");
  progress.max=all.length; progress.value=done;
  root.querySelector("#cv-storage-warning").textContent=cvStorageWarning;
}
function cvRenderNav(root) {
  root.querySelector("#cv-module-nav").innerHTML=CV_STUDY.stages.filter(function(s){
    return cvStudyState.stage === "all" || s.id === cvStudyState.stage;
  }).map(function(stage){
    return '<section class="cv-nav-group"><h3>'+esc(stage.title)+'</h3><small>'+esc(stage.days)+' · gợi ý linh hoạt</small>'+
      CV_STUDY.modules.filter(function(m){return m.stage === stage.id;}).map(function(m){
        return '<a href="#/cv?module='+encodeURIComponent(m.id)+'" data-cv-module="'+esc(m.id)+'" '+
          (cvStudyState.module === m.id?'aria-current="page" ':'')+'><span>'+esc(m.title)+'</span><small>'+
          (m.priority === "core"?"Cốt lõi":"Bổ trợ")+" · "+cvKnown(m.items)+"/"+m.items.length+'</small></a>';
      }).join("")+'</section>';
  }).join("");
}
function cvModuleIntro(m) {
  return '<section class="cv-module-intro" aria-labelledby="cv-module-title"><div class="cv-kicker">'+esc(CV_STUDY.stages.find(function(s){return s.id === m.stage;}).title)+'</div>'+
    '<h2 id="cv-module-title" tabindex="-1">'+esc(m.title)+'</h2><p class="cv-goal">'+esc(m.goal)+'</p>'+
    '<dl class="cv-context"><div><dt>Trong CV</dt><dd>'+esc(m.cv)+'</dd></div><div><dt>Phạm vi & bằng chứng</dt><dd>'+esc(m.scope)+'</dd></div></dl>'+
    (m.tools?'<section class="cv-tech-map"><h3>Công cụ trong dự án · lý thuyết và cách áp dụng</h3><p class="cv-tech-hint">Mở từng công cụ theo thứ tự. “Bản chất” trả lời nó là gì; “Áp dụng” chỉ đúng vị trí trong dự án; “Luồng” nối nó với công cụ trước và sau.</p><div class="cv-tech-list">'+m.tools.map(function(t,i){return '<details class="cv-tech-card"'+(i===0?' open':'')+'><summary><span><strong>'+esc(t.name)+'</strong><small>'+esc(t.type)+(t.version?' · '+esc(t.version):'')+'</small></span><span class="cv-tech-toggle">Chi tiết</span></summary><dl><div><dt>1. Bản chất lý thuyết</dt><dd>'+esc(t.theory)+'</dd></div><div><dt>2. Áp dụng trong dự án</dt><dd>'+esc(t.applies)+'</dd></div><div><dt>3. Luồng sử dụng</dt><dd>'+esc(t.flow)+'</dd></div><div><dt>4. Vì sao dùng</dt><dd>'+esc(t.why)+'</dd></div><div class="cv-tech-boundary"><dt>5. Giới hạn / dễ nói nhầm</dt><dd>'+esc(t.boundary)+'</dd></div>'+(t.evidence?'<div><dt>6. Nơi đối chiếu</dt><dd><code>'+esc(t.evidence)+'</code></dd></div>':'')+'</dl></details>';}).join("")+'</div></section>':"")+
    '<h3>Luồng cần hiểu</h3><ol class="cv-flow">'+m.flow.map(function(step){return "<li>"+esc(step)+"</li>";}).join("")+'</ol>'+
    (m.serviceMap?'<details class="cv-source"><summary>Bản đồ trách nhiệm 9 service</summary><div class="cv-table-scroll" tabindex="0" aria-label="Bảng service có thể cuộn ngang"><table><thead><tr><th>Service</th><th>Sở hữu / làm gì</th><th>Ranh giới cần nhớ</th></tr></thead><tbody>'+m.serviceMap.map(function(s){return '<tr>'+s.map(function(c){return '<td>'+esc(c)+'</td>';}).join("")+'</tr>';}).join("")+'</tbody></table></div></details>':"")+
    (m.evidence&&m.evidence.length?'<details class="cv-source"><summary>Đường dẫn source đã đối chiếu</summary><p>Snapshot đọc ngày '+esc(CV_STUDY.reviewedAt)+'. Đây là bằng chứng đọc source, không phải kết quả chạy lại backend.</p><ul>'+m.evidence.map(function(p){return '<li><code>'+esc(p)+'</code></li>';}).join("")+'</ul></details>':"")+
    (m.references.length?'<details class="cv-source"><summary>Tài liệu gốc để đọc sâu</summary><ul>'+m.references.map(function(r){return '<li><a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.title)+'</a></li>';}).join("")+'</ul><p>Chọn phiên bản tài liệu khớp dependency của dự án trước khi áp dụng cấu hình hoặc API.</p></details>':"")+
    '</section>';
}
function cvQuestionHtml(row,index) {
  var q=row.item,m=row.module,status=cvStudyProgress.items[q.id];
  return '<article class="cv-question-card" data-question-card="'+esc(q.id)+'">'+
    '<div class="cv-question-meta"><span class="cv-kind">'+esc(cvKind(q.kind))+'</span><span>'+esc(m.title)+'</span></div>'+
    '<details class="cv-question" data-cv-question="'+esc(q.id)+'"'+(cvStudyState.open[q.id]?" open":"")+'>'+
    '<summary><span class="cv-question-number">'+(index+1)+'</span><span>'+esc(q.q)+'</span></summary>'+
    '<div class="cv-answer"><section><h4>Giải thích / cách trả lời</h4>'+cvParagraph(q.answer)+'</section>'+
    (q.example?'<section><h4>Ví dụ & cách áp dụng</h4>'+cvParagraph(q.example)+'</section>':"")+
    (q.code?'<section><h4>Mã minh họa · cần ngữ cảnh để chạy</h4>'+codeBlock(q.code)+'</section>':"")+
    (q.pitfall?'<section class="cv-pitfall"><h4>Dễ trả lời nhầm</h4>'+cvParagraph(q.pitfall)+'</section>':"")+
    (q.exercise?'<section class="cv-exercise"><h4>Tự kiểm tra / thực hành</h4>'+cvParagraph(q.exercise)+'</section>':"")+
    (cvStudyState.scope==="all"?'<a class="cv-context-link" href="#/cv?module='+encodeURIComponent(m.id)+'" data-cv-module="'+esc(m.id)+'">Học trong ngữ cảnh chủ đề →</a>':"")+
    '</div></details><div class="cv-question-actions">'+
    '<button type="button" data-cv-mark="known" data-id="'+esc(q.id)+'" aria-pressed="'+(status==="known")+'">'+(status==="known"?"✓ Đã nắm":"Đánh dấu đã nắm")+'</button>'+
    '<button type="button" data-cv-mark="review" data-id="'+esc(q.id)+'" aria-pressed="'+(status==="review")+'">'+(status==="review"?"↻ Cần ôn lại":"Cần ôn lại")+'</button></div></article>';
}
function cvRenderReader(root) {
  var m=cvModuleById(cvStudyState.module), rows=cvFiltered(), drawRow;
  if (cvStudyState.draw) drawRow=rows.find(function(r){return r.item.id===cvStudyState.draw;});
  if (!drawRow) cvStudyState.draw="";
  var visible=drawRow?[drawRow]:rows.slice(0,cvStudyState.limit);
  var reader=root.querySelector("#cv-reader");
  reader.innerHTML=(cvStudyState.scope==="module"?cvModuleIntro(m):
    '<section class="cv-module-intro"><div class="cv-kicker">Tìm & ôn xuyên chủ đề</div><h2 id="cv-module-title" tabindex="-1">Ngân hàng câu hỏi theo CV</h2><p>Các bộ lọc đang áp dụng trên '+(cvStudyState.stage==="all"?"toàn bộ lộ trình":"chặng đã chọn")+'. Chọn một chủ đề bên mục lục để xem luồng, phạm vi và tài liệu gốc.</p></section>')+
    '<div class="cv-reader-toolbar"><p id="cv-result-count" role="status">'+(drawRow?"Một câu tự luyện · chọn mở để đối chiếu đáp án":rows.length+" câu phù hợp · đang hiện "+visible.length)+'</p>'+
    '<div class="cv-button-row"><button type="button" data-cv-action="draw"'+(!rows.length?" disabled":"")+'>Bốc 1 câu</button>'+
    (drawRow?'<button type="button" data-cv-action="list">Về danh sách</button>':"")+
    '<button type="button" data-cv-action="expand"'+(!rows.length?" disabled":"")+'>Mở giải thích</button><button type="button" data-cv-action="collapse"'+(!rows.length?" disabled":"")+'>Gập để tự trả lời</button></div></div>'+
    (visible.length?visible.map(cvQuestionHtml).join(""):
      '<div class="cv-empty"><h3>Chưa có câu phù hợp</h3><p>Thử từ khóa ngắn hơn, chọn “Tất cả chủ đề” hoặc bỏ bộ lọc tiến độ.</p><button type="button" data-cv-action="reset">Bỏ bộ lọc</button></div>')+
    (!drawRow&&rows.length>visible.length?'<button class="btn secondary cv-more" type="button" data-cv-action="more">Xem thêm 30 câu ('+(rows.length-visible.length)+' câu còn lại)</button>':"")+
    (cvStudyState.scope==="module"?'<section class="cv-note"><h3><label for="cv-personal-note">Ghi chú của tôi · '+esc(m.title)+'</label></h3><p>Điền trải nghiệm thật, câu còn vướng và đường dẫn code/test bạn muốn trình bày. Chỉ lưu trên trình duyệt này.</p><textarea id="cv-personal-note" rows="5" placeholder="Tôi đã áp dụng ở đâu? Vì sao chọn cách này? Lỗi từng gặp và cách kiểm chứng…">'+esc(typeof cvStudyProgress.notes[m.id]==="string"?cvStudyProgress.notes[m.id]:"")+'</textarea><p id="cv-note-status" role="status"></p></section>'+cvPrevNext(m):"");
}
function cvPrevNext(m) {
  var list=CV_STUDY.modules.filter(function(x){return cvStudyState.stage==="all"||x.stage===cvStudyState.stage;});
  var i=list.indexOf(m), prev=list[i-1], next=list[i+1];
  return '<nav class="cv-prev-next" aria-label="Chủ đề trước và sau">'+
    (prev?'<a href="#/cv?module='+encodeURIComponent(prev.id)+'" data-cv-module="'+esc(prev.id)+'">← '+esc(prev.title)+'</a>':'<span></span>')+
    (next?'<a href="#/cv?module='+encodeURIComponent(next.id)+'" data-cv-module="'+esc(next.id)+'">'+esc(next.title)+' →</a>':"")+'</nav>';
}
function cvRefresh(root) { cvUpdateStats(root); cvRenderNav(root); cvRenderReader(root); }
function cvRevealActiveModule(root) {
  var outline=root.querySelector("#cv-module-nav"), active=root.querySelector('#cv-module-nav [aria-current="page"]');
  if(!active || !root.querySelector("#cv-outline-panel").open)return;
  var box=outline.getBoundingClientRect(), item=active.getBoundingClientRect();
  if(item.bottom>box.bottom)outline.scrollTop+=item.bottom-box.bottom+20;
  else if(item.top<box.top)outline.scrollTop-=box.top-item.top+20;
}
function cvResetFilters(root) {
  cvStudyState.query="";cvStudyState.kind="all";cvStudyState.status="all";cvStudyState.scope="module";cvStudyState.limit=30;cvStudyState.draw="";
  root.querySelector("#cv-search").value="";
  root.querySelector("#cv-kind").value="all";root.querySelector("#cv-status").value="all";root.querySelector("#cv-scope").value="module";
}
function renderCvStudy(el) {
  var params=new URLSearchParams(location.hash.split("?")[1]||"");
  var requested=cvModuleById(params.get("module"));
  if (requested) {
    if (cvStudyState.module!==requested.id) {
      cvStudyState.module=requested.id;cvStudyState.query="";cvStudyState.kind="all";cvStudyState.status="all";cvStudyState.scope="module";cvStudyState.draw="";cvStudyState.limit=30;
    }
    if (cvStudyState.stage!=="all"&&cvStudyState.stage!==requested.stage) cvStudyState.stage="all";
  } else cvStudyState.module=CV_STUDY.modules[0].id;
  if (!cvModuleById(cvStudyState.module)) cvStudyState.module=CV_STUDY.modules[0].id;
  cvStudyProgress.lastModule=cvStudyState.module;cvSaveProgress();
  el.innerHTML='<div id="cv-root" class="cv-study"><header class="cv-header"><div class="cv-kicker">Lê Minh Tiến · Backend Developer</div><h1>Ôn tập theo CV</h1>'+
    '<p>Hiểu bản chất → biết áp dụng → xử lý tình huống → tự trình bày bằng trải nghiệm thật.</p><p id="cv-stats" class="cv-stats" role="status"></p>'+
    '<progress id="cv-total-progress" aria-label="Số câu tự đánh dấu đã nắm"></progress><p id="cv-storage-warning" role="status" class="cv-warning"></p></header>'+
    '<details class="cv-guide"><summary>Cách học & cách hiểu mức độ kiểm chứng nội dung</summary>'+
    '<div><p><strong>Lộ trình gợi ý 30 ngày:</strong> bắt đầu bằng chặng công nghệ rồi theo 6 chặng kiến thức trong mục lục; có thể học chậm hơn. Mỗi buổi chọn một chủ đề, tự nói trước khi mở giải thích, thử bài tập rồi mới đánh dấu đã nắm. Chương “Bổ trợ” giúp bảo vệ các kỹ năng frontend/database khác vẫn ghi trong CV.</p>'+
    '<p><strong>Đọc kỹ phạm vi từng chương:</strong> phần ZAMIGA dựa mô tả CV và ví dụ học tập; hai dự án có đối chiếu source được nêu đường dẫn. Có source không đồng nghĩa đã chạy test/deploy trong lượt này. Câu trả lời mẫu không phải thành tích để nhận là của mình.</p>'+
    '<p><strong>Hai điểm quan trọng:</strong> CV ghi PayFlow 7 service nhưng topology full hiện tại có 9 deployable Java; PayFlow là sandbox chưa có payout ngân hàng thật. Worker nộp bài Exam dùng durable DB job, không phải Kafka/Saga.</p>'+
    '<p>Toàn bộ ví dụ là minh họa hoặc bài lab. Không chạy lệnh sửa/xóa dữ liệu thật khi đang tự luyện. Tiến độ và ghi chú lưu local trên trình duyệt; không đồng bộ lên máy khác. Không lưu secret hay thông tin công ty nhạy cảm ở đây.</p></div></details>'+
    '<section class="cv-filters" aria-label="Tìm và lọc nội dung CV"><label class="cv-search-label" for="cv-search">Tìm kiến thức hoặc câu hỏi<input id="cv-search" type="search" maxlength="200" placeholder="Ví dụ: hoan tien, JWT, reindex, deploy…" value="'+esc(cvStudyState.query)+'"></label>'+
    '<div class="cv-filter-grid"><label>Phạm vi<select id="cv-scope"><option value="module">Chủ đề đang chọn</option><option value="all">Tất cả chủ đề</option></select></label>'+
    '<label>Loại nội dung<select id="cv-kind"><option value="all">Tất cả loại câu</option><option value="theory">Lý thuyết</option><option value="application">Áp dụng</option><option value="scenario">Tình huống</option><option value="interview">Phỏng vấn</option></select></label>'+
    '<label>Tiến độ tự đánh giá<select id="cv-status"><option value="all">Tất cả tiến độ</option><option value="unread">Chưa nắm vững</option><option value="review">Cần ôn lại</option><option value="known">Đã nắm</option></select></label></div>'+
    '<p>Gõ từ khóa sẽ tìm trên tất cả chủ đề trong chặng đang chọn; hỗ trợ tiếng Việt không dấu.</p></section>'+
    '<div class="cv-layout"><aside class="cv-outline"><details id="cv-outline-panel"'+(window.matchMedia("(min-width: 1101px)").matches?" open":"")+'><summary>Mục lục học <span>'+CV_STUDY.modules.length+' chủ đề / '+CV_STUDY.stages.length+' chặng</span></summary><label for="cv-stage">Chọn chặng</label><select id="cv-stage"><option value="all">Toàn bộ '+CV_STUDY.stages.length+' chặng</option>'+CV_STUDY.stages.map(function(s){return '<option value="'+esc(s.id)+'">'+esc(s.title)+'</option>';}).join("")+'</select><nav id="cv-module-nav" aria-label="Chủ đề ôn tập theo CV"></nav></details></aside><div id="cv-reader" class="cv-reader"></div></div></div>';
  var root=el.querySelector("#cv-root");
  root.querySelector("#cv-kind").value=cvStudyState.kind;root.querySelector("#cv-status").value=cvStudyState.status;root.querySelector("#cv-scope").value=cvStudyState.scope;root.querySelector("#cv-stage").value=cvStudyState.stage;
  cvRefresh(root);
  cvRevealActiveModule(root);
  if(cvStudyState.focusReader){
    cvStudyState.focusReader=false;
    requestAnimationFrame(function(){if(root.isConnected)root.querySelector("#cv-module-title").focus();});
  }
  root.addEventListener("toggle",function(e){
    if(e.target.matches&&e.target.matches("[data-cv-question]"))cvStudyState.open[e.target.dataset.cvQuestion]=e.target.open;
  },true);
  root.addEventListener("input",function(e){
    if(e.target.id==="cv-search"){
      cvStudyState.query=e.target.value;cvStudyState.scope="all";cvStudyState.limit=30;cvStudyState.draw="";
      root.querySelector("#cv-scope").value="all";cvRenderReader(root);
    }
    if(e.target.id==="cv-personal-note"){
      cvStudyProgress.notes[cvStudyState.module]=e.target.value;
      var saved=cvSaveProgress();
      root.querySelector("#cv-note-status").textContent=saved?"Đã lưu trên trình duyệt này.":cvStorageWarning;
      cvUpdateStats(root);
    }
  });
  root.addEventListener("change",function(e){
    var keys={"cv-kind":"kind","cv-status":"status","cv-scope":"scope","cv-stage":"stage"};
    if(!keys[e.target.id])return;
    cvStudyState[keys[e.target.id]]=e.target.value;cvStudyState.limit=30;cvStudyState.draw="";
    if(e.target.id==="cv-stage"&&cvStudyState.stage!=="all"){
      var current=cvModuleById(cvStudyState.module);
      if(current.stage!==cvStudyState.stage){
        cvStudyState.module=CV_STUDY.modules.find(function(m){return m.stage===cvStudyState.stage;}).id;
        cvStudyProgress.lastModule=cvStudyState.module;cvSaveProgress();
        history.replaceState(null,"","#/cv?module="+encodeURIComponent(cvStudyState.module));
      }
    }
    cvRefresh(root);
  });
  root.addEventListener("click",function(e){
    var link=e.target.closest("[data-cv-module]");
    if(link){
      e.preventDefault();cvResetFilters(root);
      var hash="#/cv?module="+encodeURIComponent(link.dataset.cvModule);
      if(location.hash===hash){cvStudyState.module=link.dataset.cvModule;cvRefresh(root);root.querySelector("#cv-module-title").focus();}
      else {
        cvStudyState.focusReader=true;
        location.hash=hash;
      }
      return;
    }
    var mark=e.target.closest("[data-cv-mark]");
    if(mark){
      var id=mark.dataset.id,type=mark.dataset.cvMark;
      if(cvStudyProgress.items[id]===type)delete cvStudyProgress.items[id];else cvStudyProgress.items[id]=type;
      cvSaveProgress();cvRefresh(root);
      var restored=root.querySelector('[data-cv-mark="'+type+'"][data-id="'+id+'"]');
      if(restored)restored.focus();else root.querySelector("#cv-module-title").focus();
      return;
    }
    var action=e.target.closest("[data-cv-action]");if(!action)return;
    switch(action.dataset.cvAction){
      case "expand":case "collapse":
        root.querySelectorAll(".cv-question").forEach(function(d){d.open=action.dataset.cvAction==="expand";cvStudyState.open[d.dataset.cvQuestion]=d.open;});break;
      case "more":cvStudyState.limit+=30;cvRenderReader(root);break;
      case "reset":cvResetFilters(root);cvRefresh(root);root.querySelector("#cv-search").focus();break;
      case "draw":
        var rows=cvFiltered();if(!rows.length)return;
        var candidates=rows.filter(function(r){return r.item.id!==cvStudyState.draw;});
        if(!candidates.length)candidates=rows;
        cvStudyState.draw=candidates[Math.floor(Math.random()*candidates.length)].item.id;
        cvStudyState.open[cvStudyState.draw]=false;cvRenderReader(root);
        root.querySelector(".cv-question summary").focus();break;
      case "list":cvStudyState.draw="";cvRenderReader(root);break;
    }
  });
}
