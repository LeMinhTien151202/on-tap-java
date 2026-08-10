// Trang Checklist: tick từng câu đã ôn, lưu localStorage, progress theo topic + tổng.
var checklistState = { section: null };

function getChecked() {
  try { return JSON.parse(localStorage.getItem("ontap.checklist")) || {}; }
  catch (e) { return {}; }
}

function setChecked(id, value) {
  var checked = getChecked();
  if (value) checked[id] = true;
  else delete checked[id];
  localStorage.setItem("ontap.checklist", JSON.stringify(checked));
}

function checklistProgress(items, checked) {
  var done = items.filter(function (it) { return checked[it.id]; }).length;
  return { done: done, total: items.length, pct: items.length ? Math.round(done / items.length * 100) : 0 };
}

function renderChecklist(el) {
  if (checklistState.section === null) checklistState.section = CHECKLIST_DATA[0].section;
  var checked = getChecked();

  var tabs = CHECKLIST_DATA.map(function (s) {
    var p = checklistProgress(s.items, checked);
    return '<button class="pill' + (s.section === checklistState.section ? " active" : "") + '" data-section="' + esc(s.section) + '">'
      + esc(s.section) + ' <span class="count">(' + p.done + '/' + p.total + ')</span></button>';
  }).join("");

  var current = CHECKLIST_DATA.find(function (s) { return s.section === checklistState.section; });
  var overall = checklistProgress(current.items, checked);

  // Nhóm theo topic, giữ thứ tự xuất hiện
  var groups = [];
  var byTopic = {};
  current.items.forEach(function (it) {
    var key = it.topic || "Khác";
    if (!byTopic[key]) {
      byTopic[key] = [];
      groups.push(key);
    }
    byTopic[key].push(it);
  });

  var groupsHtml = groups.map(function (topic, gi) {
    var items = byTopic[topic];
    var p = checklistProgress(items, checked);
    var itemsHtml = items.map(function (it) {
      var isDone = !!checked[it.id];
      var badge = /mandatory/i.test(it.priority || "") ? ' <span class="badge mandatory">Mandatory</span>' : "";
      var typeBadge = it.type ? ' <span class="badge type">' + esc(it.type) + '</span>' : "";
      return '<div class="check-item' + (isDone ? " done" : "") + '">' +
        '<input type="checkbox" id="ck-' + esc(it.id) + '" data-id="' + esc(it.id) + '"' + (isDone ? " checked" : "") + '>' +
        '<label for="ck-' + esc(it.id) + '">' + esc(it.question) + typeBadge + badge + '</label></div>';
    }).join("");
    return '<details class="topic-block"' + (gi === 0 ? " open" : "") + '><summary>' + esc(topic) +
      '<span class="topic-progress">' + p.done + '/' + p.total + '</span></summary>' +
      '<div class="topic-items">' + itemsHtml + '</div></details>';
  }).join("");

  el.innerHTML =
    '<h1>✅ Checklist ôn tập</h1>' +
    '<p class="subtitle">Checklist tự đánh giá từ file Excel — tick những mục bạn đã nắm vững. Tiến độ được lưu tự động trên trình duyệt.</p>' +
    '<div class="pills" id="cl-tabs">' + tabs + '</div>' +
    '<div class="card"><strong>' + esc(current.section) + ':</strong> ' + overall.done + '/' + overall.total + ' câu (' + overall.pct + '%)' +
    '<div class="progress-bar"><div style="width:' + overall.pct + '%"></div></div></div>' +
    '<div id="cl-groups">' + groupsHtml + '</div>';

  el.querySelector("#cl-tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    checklistState.section = btn.dataset.section;
    renderChecklist(el);
  });

  el.querySelector("#cl-groups").addEventListener("change", function (e) {
    var input = e.target.closest("input[type=checkbox]");
    if (!input) return;
    setChecked(input.dataset.id, input.checked);
    input.closest(".check-item").classList.toggle("done", input.checked);
    // Cập nhật các con số tiến độ mà không render lại (giữ trạng thái mở của accordion)
    updateChecklistCounters(el);
  });
}

function updateChecklistCounters(el) {
  var checked = getChecked();
  var current = CHECKLIST_DATA.find(function (s) { return s.section === checklistState.section; });
  var overall = checklistProgress(current.items, checked);

  var card = el.querySelector(".card");
  card.innerHTML = '<strong>' + esc(current.section) + ':</strong> ' + overall.done + '/' + overall.total + ' câu (' + overall.pct + '%)' +
    '<div class="progress-bar"><div style="width:' + overall.pct + '%"></div></div>';

  // Tab counts
  el.querySelectorAll("#cl-tabs .pill").forEach(function (pill) {
    var section = CHECKLIST_DATA.find(function (s) { return s.section === pill.dataset.section; });
    var p = checklistProgress(section.items, checked);
    pill.querySelector(".count").textContent = "(" + p.done + "/" + p.total + ")";
  });

  // Topic counts
  el.querySelectorAll(".topic-block").forEach(function (block) {
    var ids = Array.prototype.map.call(block.querySelectorAll("input[data-id]"), function (i) { return i.dataset.id; });
    var done = ids.filter(function (id) { return checked[id]; }).length;
    block.querySelector(".topic-progress").textContent = done + "/" + ids.length;
  });
}
