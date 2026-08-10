// Trang Lý thuyết Q&A: chọn chủ đề + tìm kiếm + accordion câu hỏi + đánh dấu đã thuộc.
var theoryState = { topic: null, keyword: "", filter: "all", pillFilter: "" };

function getLearned() {
  try { return JSON.parse(localStorage.getItem("ontap.learned")) || {}; }
  catch (e) { return {}; }
}
function saveLearned(l) { localStorage.setItem("ontap.learned", JSON.stringify(l)); }

function getTheoryTopics() {
  // Merge dữ liệu Excel với câu bổ sung (THEORY_EXTRA) theo tên topic
  if (window._theoryMerged) return window._theoryMerged;
  var topics = THEORY_DATA.map(function (t) {
    return { topic: t.topic, items: t.items.slice() };
  });
  (window.THEORY_EXTRA || []).forEach(function (extra) {
    var found = topics.find(function (t) { return t.topic === extra.topic; });
    var items = extra.items.map(function (it, i) {
      return {
        id: "extra-" + extra.topic + "-" + i,
        question: it.question,
        answer: it.answer,
        examples: it.examples || [],
        source: "extra"
      };
    });
    if (found) found.items = found.items.concat(items);
    else topics.push({ topic: extra.topic, items: items });
  });
  // Câu hỏi người dùng tự thêm (trang ➕ Thêm nội dung, lưu localStorage)
  getCustomContent().theory.forEach(function (it) {
    var found = topics.find(function (t) { return t.topic === it.topic; });
    var item = { id: it.id, question: it.question, answer: it.answer, examples: it.examples || [], source: "custom" };
    if (found) found.items.push(item);
    else topics.push({ topic: it.topic, items: [item] });
  });
  window._theoryMerged = topics;
  return topics;
}

function renderTheory(el) {
  var topics = getTheoryTopics();
  if (theoryState.topic === null) theoryState.topic = topics[0].topic;

  el.innerHTML =
    '<h1>📖 Lý thuyết Q&amp;A</h1>' +
    '<p class="subtitle">Bấm vào câu hỏi để xem đáp án. Đánh dấu <strong>✓ đã thuộc</strong> rồi lọc "Chưa thuộc" để ôn đúng chỗ hổng.</p>' +
    '<input type="text" class="search-box" id="theory-search" placeholder="🔍 Tìm nội dung trong mọi chủ đề (gõ để tìm toàn kho)..." value="' + esc(theoryState.keyword) + '">' +
    '<div class="toolbar">' +
    '<strong style="font-size:14px">Chủ đề (' + topics.length + ')</strong><span style="flex:1"></span>' +
    '<input type="text" class="pill-filter" id="theory-pill-filter" placeholder="🔍 Lọc nhanh tên chủ đề..." value="' + esc(theoryState.pillFilter) + '">' +
    '</div>' +
    '<div class="pills pills-scroll" id="theory-pills"></div>' +
    '<div class="toolbar">' +
    '<div class="pills" id="theory-filter" style="margin-bottom:0">' +
    '<button class="pill' + (theoryState.filter === "all" ? " active" : "") + '" data-f="all">Tất cả</button>' +
    '<button class="pill' + (theoryState.filter === "todo" ? " active" : "") + '" data-f="todo">Chưa thuộc</button>' +
    '<button class="pill' + (theoryState.filter === "done" ? " active" : "") + '" data-f="done">✓ Đã thuộc</button>' +
    '</div>' +
    '<span style="flex:1"></span>' +
    '<button class="btn secondary sm" id="qa-open-all">⬇ Mở tất cả</button>' +
    '<button class="btn secondary sm" id="qa-close-all">⬆ Thu gọn</button>' +
    '</div>' +
    '<div id="theory-list"></div>';

  // Vẽ danh sách pill chủ đề (có lọc tên + tiến độ đã thuộc)
  function paintPills() {
    var learned = getLearned();
    var kw = theoryState.pillFilter.trim().toLowerCase();
    var list = topics.filter(function (t) { return !kw || t.topic.toLowerCase().indexOf(kw) !== -1; });
    el.querySelector("#theory-pills").innerHTML = list.map(function (t) {
      var done = t.items.filter(function (it) { return learned[it.id]; }).length;
      var all = done === t.items.length && t.items.length > 0;
      return '<button class="pill' + (t.topic === theoryState.topic ? " active" : "") + (all ? " done-all" : "") + '" data-topic="' + esc(t.topic) + '">'
        + (all ? "✓ " : "") + esc(t.topic) + ' <span class="frac">' + done + '/' + t.items.length + '</span></button>';
    }).join("") || '<span class="empty" style="padding:8px 0">Không có chủ đề nào khớp.</span>';
  }
  paintPills();

  var pillFilterEl = el.querySelector("#theory-pill-filter");
  pillFilterEl.addEventListener("input", function () {
    theoryState.pillFilter = pillFilterEl.value;
    paintPills();
  });

  el.querySelector("#theory-pills").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    theoryState.topic = btn.dataset.topic;
    theoryState.keyword = "";
    renderTheory(el);
  });

  el.querySelector("#theory-filter").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    theoryState.filter = btn.dataset.f;
    el.querySelectorAll("#theory-filter .pill").forEach(function (p) { p.classList.toggle("active", p === btn); });
    renderTheoryList(el);
  });

  el.querySelector("#qa-open-all").addEventListener("click", function () {
    el.querySelectorAll("#theory-list details").forEach(function (d) { d.open = true; });
  });
  el.querySelector("#qa-close-all").addEventListener("click", function () {
    el.querySelectorAll("#theory-list details").forEach(function (d) { d.open = false; });
  });

  // Nút "đã thuộc" trong từng câu — re-render nhưng giữ nguyên các câu đang mở
  el.querySelector("#theory-list").addEventListener("click", function (e) {
    var btn = e.target.closest(".learn-btn");
    if (!btn) return;
    var learned = getLearned();
    if (learned[btn.dataset.id]) delete learned[btn.dataset.id];
    else learned[btn.dataset.id] = true;
    saveLearned(learned);
    var open = Array.from(el.querySelectorAll("#theory-list details[open]")).map(function (d) { return d.dataset.id; });
    renderTheoryList(el);
    paintPills();
    el.querySelectorAll("#theory-list details").forEach(function (d) {
      if (open.indexOf(d.dataset.id) !== -1) d.open = true;
    });
  });

  var searchEl = el.querySelector("#theory-search");
  searchEl.addEventListener("input", function () {
    theoryState.keyword = searchEl.value;
    renderTheoryList(el);
  });

  renderTheoryList(el);
  if (theoryState.keyword) {
    searchEl.focus();
    searchEl.setSelectionRange(searchEl.value.length, searchEl.value.length);
  }
}

function renderTheoryList(el) {
  var topics = getTheoryTopics();
  var learned = getLearned();
  var kw = theoryState.keyword.trim().toLowerCase();
  var items;

  if (kw) {
    // Tìm trên toàn bộ chủ đề
    items = [];
    topics.forEach(function (t) {
      t.items.forEach(function (it) {
        if ((it.question + " " + it.answer).toLowerCase().indexOf(kw) !== -1) {
          items.push(Object.assign({ _topic: t.topic }, it));
        }
      });
    });
  } else {
    var current = topics.find(function (t) { return t.topic === theoryState.topic; });
    items = current ? current.items.slice() : [];
  }

  if (theoryState.filter === "todo") items = items.filter(function (it) { return !learned[it.id]; });
  if (theoryState.filter === "done") items = items.filter(function (it) { return learned[it.id]; });

  var listEl = el.querySelector("#theory-list");
  if (!items.length) {
    var msg = theoryState.filter === "done" ? "Chưa có câu nào được đánh dấu đã thuộc trong phạm vi này."
      : theoryState.filter === "todo" ? "Tuyệt! Bạn đã thuộc hết các câu trong phạm vi này 🎉"
      : "Không tìm thấy câu hỏi nào" + (kw ? ' cho từ khóa "' + esc(kw) + '"' : "") + ".";
    listEl.innerHTML = '<div class="empty">' + msg + '</div>';
    return;
  }

  var doneNow = items.filter(function (it) { return learned[it.id]; }).length;
  var head = '<div class="quiz-progress">' +
    (kw ? 'Tìm thấy <strong>' + items.length + '</strong> câu cho từ khóa "' + esc(kw) + '" trong toàn bộ chủ đề'
        : 'Chủ đề <strong>' + esc(theoryState.topic) + '</strong> — ' + items.length + ' câu, đã thuộc ' + doneNow) +
    '</div>';

  listEl.innerHTML = head + items.map(function (it) {
    var isLearned = !!learned[it.id];
    var badges = "";
    if (kw && it._topic) badges += ' <span class="badge type">' + esc(it._topic) + '</span>';
    if (it.source === "extra") badges += ' <span class="badge extra">bổ sung</span>';
    if (it.source === "custom") badges += ' <span class="badge custom">tự thêm</span>';
    if (isLearned) badges += ' <span class="badge done">✓ thuộc</span>';
    var examples = (it.examples || []).map(function (ex) { return codeBlock(ex); }).join("");
    return '<details class="qa' + (isLearned ? " learned" : "") + '" data-id="' + esc(it.id) + '"><summary>' + esc(it.question) + badges + '</summary>' +
      '<div class="qa-body"><div class="answer">' + esc(it.answer || "(Chưa có đáp án trong file Excel — tự ôn nhé!)") + '</div>' +
      examples +
      '<div class="qa-actions"><button class="btn secondary sm learn-btn" data-id="' + esc(it.id) + '">' +
      (isLearned ? "↺ Bỏ đánh dấu đã thuộc" : "✓ Đã thuộc câu này") + '</button></div>' +
      '</div></details>';
  }).join("");
}
