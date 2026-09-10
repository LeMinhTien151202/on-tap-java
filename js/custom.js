// Trang Thêm nội dung: form thêm câu lý thuyết / quiz / thuật toán, lưu localStorage.
var addState = { tab: "theory", msg: "" };

function getCustomContent() {
  try {
    var c = JSON.parse(localStorage.getItem("ontap.customContent")) || {};
    return { theory: c.theory || [], quiz: c.quiz || [], algo: c.algo || [] };
  } catch (e) { return { theory: [], quiz: [], algo: [] }; }
}

function saveCustomContent(c) {
  localStorage.setItem("ontap.customContent", JSON.stringify(c));
  window._theoryMerged = null; // để trang Lý thuyết merge lại
}

function newId() { return "c" + Date.now() + Math.floor(Math.random() * 1000); }

// Dữ liệu gốc + dữ liệu tự thêm (dùng ở trang Quiz / Thuật toán / Trang chủ)
function getAllQuiz() {
  return QUIZ_DATA.concat(getCustomContent().quiz);
}

function getAllAlgo() {
  var custom = getCustomContent().algo;
  if (!custom.length) return ALGO_DATA;
  var groups = ALGO_DATA.map(function (g) { return { group: g.group, items: g.items.slice() }; });
  custom.forEach(function (a) {
    var g = groups.find(function (x) { return x.group === a.group; });
    if (g) g.items.push(a);
    else groups.push({ group: a.group, items: [a] });
  });
  return groups;
}

function renderAdd(el) {
  var c = getCustomContent();
  var tabs = [
    ["theory", "📖 Lý thuyết (" + c.theory.length + ")"],
    ["quiz", "📝 Quiz (" + c.quiz.length + ")"],
    ["algo", "⚙️ Thuật toán (" + c.algo.length + ")"]
  ].map(function (t) {
    return '<button class="pill' + (addState.tab === t[0] ? " active" : "") + '" data-tab="' + t[0] + '">' + t[1] + '</button>';
  }).join("");

  el.innerHTML =
    '<h1>➕ Thêm nội dung</h1>' +
    '<p class="subtitle">Thêm câu hỏi hoặc thuật toán của riêng bạn — hiện ngay ở trang tương ứng với nhãn <span class="badge custom">tự thêm</span>.</p>' +
    '<div class="pills" id="add-tabs">' + tabs + '</div>' +
    (addState.msg ? '<div class="form-success">✅ ' + esc(addState.msg) + '</div>' : "") +
    '<div id="add-form"></div>' +
    '<div id="add-list"></div>' +
    '<h2>💾 Sao lưu / phục hồi</h2><div class="card">' +
    '<p style="font-size:14px;line-height:1.6;margin-bottom:12px">Nội dung tự thêm lưu trong <strong>localStorage của trình duyệt</strong> — nếu xóa dữ liệu duyệt web sẽ mất. Nên tải file sao lưu định kỳ. Muốn thêm số lượng lớn thì sửa thẳng file <code>data/theory-extra.js</code>, <code>data/quiz-data.js</code>, <code>data/algo-data.js</code> theo mẫu có sẵn.</p>' +
    '<button class="btn secondary" id="exp-btn">⬇ Tải file sao lưu (JSON)</button> ' +
    '<button class="btn secondary" id="imp-btn">⬆ Nhập từ file sao lưu</button>' +
    '<input type="file" id="imp-file" accept=".json,application/json" style="display:none">' +
    '</div>';
  addState.msg = "";

  el.querySelector("#add-tabs").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    addState.tab = btn.dataset.tab;
    renderAdd(el);
  });

  el.querySelector("#exp-btn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(getCustomContent(), null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ontap-noi-dung-tu-them.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  var fileInput = el.querySelector("#imp-file");
  el.querySelector("#imp-btn").addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () {
    var f = fileInput.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var cur = getCustomContent();
        var added = 0;
        ["theory", "quiz", "algo"].forEach(function (k) {
          if (Array.isArray(data[k])) { cur[k] = cur[k].concat(data[k]); added += data[k].length; }
        });
        if (!added) { alert("File không có nội dung hợp lệ (cần các mảng theory/quiz/algo)."); return; }
        saveCustomContent(cur);
        addState.msg = "Đã nhập " + added + " mục từ file sao lưu.";
        renderAdd(el);
      } catch (err) {
        alert("File không hợp lệ: " + err.message);
      }
    };
    reader.readAsText(f);
  });

  renderAddForm(el);
  renderAddList(el);
}

function formRow(label, inner, hint) {
  return '<div class="form-row"><label>' + label + '</label>' + inner +
    (hint ? '<div class="form-hint">' + hint + '</div>' : "") + '</div>';
}

function renderAddForm(el) {
  var formEl = el.querySelector("#add-form");
  var html = "";

  if (addState.tab === "theory") {
    var topicOpts = getTheoryTopics().map(function (t) { return '<option value="' + esc(t.topic) + '">'; }).join("");
    html =
      '<div class="card"><h2 style="margin-top:0">Thêm câu hỏi lý thuyết</h2>' +
      formRow("Chủ đề *", '<input type="text" id="f-topic" list="dl-topic" placeholder="VD: Java Core, NestJS... (gõ tên mới để tạo chủ đề mới)"><datalist id="dl-topic">' + topicOpts + '</datalist>') +
      formRow("Câu hỏi *", '<textarea id="f-question" placeholder="VD: Sự khác nhau giữa == và equals() trong Java?"></textarea>') +
      formRow("Trả lời nhanh", '<textarea id="f-summary" placeholder="Tóm tắt 1–3 câu: định nghĩa và ý quan trọng nhất để trả lời trong 30 giây."></textarea>', "Phần này sẽ hiện trước; đáp án chi tiết có thể mở sau.") +
      formRow("Đáp án *", '<textarea id="f-answer" style="min-height:120px" placeholder="Viết đáp án chi tiết..."></textarea>') +
      formRow("Ví dụ code", '<textarea id="f-example" class="code-input" placeholder="(Không bắt buộc) dán code minh họa..."></textarea>') +
      '<button class="btn" id="f-save">💾 Lưu câu hỏi</button></div>';
  } else if (addState.tab === "quiz") {
    var qTopics = [];
    getAllQuiz().forEach(function (q) { if (qTopics.indexOf(q.topic) === -1) qTopics.push(q.topic); });
    var qOpts = qTopics.map(function (t) { return '<option value="' + esc(t) + '">'; }).join("");
    html =
      '<div class="card"><h2 style="margin-top:0">Thêm câu quiz trắc nghiệm</h2>' +
      formRow("Chủ đề *", '<input type="text" id="f-topic" list="dl-topic" placeholder="VD: Java Core, Bảo mật..."><datalist id="dl-topic">' + qOpts + '</datalist>') +
      formRow("Câu hỏi *", '<textarea id="f-question"></textarea>') +
      '<div class="grid2">' +
      formRow("Đáp án A *", '<input type="text" id="f-opt0">') +
      formRow("Đáp án B *", '<input type="text" id="f-opt1">') +
      formRow("Đáp án C *", '<input type="text" id="f-opt2">') +
      formRow("Đáp án D *", '<input type="text" id="f-opt3">') +
      '</div>' +
      formRow("Đáp án đúng *", '<select id="f-correct"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select>', "Đừng lo vị trí — mỗi lượt làm bài web tự xáo trộn 4 đáp án.") +
      formRow("Giải thích", '<textarea id="f-explain" placeholder="(Nên có) giải thích tại sao đáp án đó đúng..."></textarea>') +
      '<button class="btn" id="f-save">💾 Lưu câu quiz</button></div>';
  } else {
    var groupOpts = getAllAlgo().map(function (g) { return '<option value="' + esc(g.group) + '">'; }).join("");
    html =
      '<div class="card"><h2 style="margin-top:0">Thêm thuật toán</h2>' +
      '<div class="grid2">' +
      formRow("Nhóm *", '<input type="text" id="f-group" list="dl-group" placeholder="VD: Sắp xếp, Kỹ thuật phổ biến..."><datalist id="dl-group">' + groupOpts + '</datalist>') +
      formRow("Tên thuật toán *", '<input type="text" id="f-name" placeholder="VD: Heap Sort">') +
      '</div>' +
      formRow("Độ phức tạp *", '<input type="text" id="f-complexity" placeholder="VD: Thời gian O(n log n) — Bộ nhớ O(1)">') +
      formRow("Ý tưởng *", '<textarea id="f-idea" placeholder="Giải thích ngắn gọn ý tưởng thuật toán..."></textarea>') +
      formRow("Các bước", '<textarea id="f-steps" placeholder="Mỗi dòng là một bước"></textarea>', "Mỗi dòng là một bước.") +
      formRow("Code Java", '<textarea id="f-java" class="code-input" style="min-height:120px"></textarea>') +
      formRow("Code JavaScript", '<textarea id="f-js" class="code-input" style="min-height:120px"></textarea>') +
      '<button class="btn" id="f-save">💾 Lưu thuật toán</button></div>';
  }

  formEl.innerHTML = html;
  var v = function (id) { return (formEl.querySelector(id) || { value: "" }).value.trim(); };

  formEl.querySelector("#f-save").addEventListener("click", function () {
    var c = getCustomContent();

    if (addState.tab === "theory") {
      if (!v("#f-topic") || !v("#f-question") || !v("#f-answer")) return alert("Điền đủ Chủ đề, Câu hỏi và Đáp án nhé!");
      c.theory.push({
        id: newId(),
        topic: v("#f-topic"),
        question: v("#f-question"),
        summary: v("#f-summary"),
        answer: v("#f-answer"),
        examples: v("#f-example") ? [v("#f-example")] : []
      });
      addState.msg = "Đã thêm câu hỏi vào chủ đề \"" + v("#f-topic") + "\" — xem ở trang Lý thuyết.";
    } else if (addState.tab === "quiz") {
      var opts = [v("#f-opt0"), v("#f-opt1"), v("#f-opt2"), v("#f-opt3")];
      if (!v("#f-topic") || !v("#f-question") || opts.some(function (o) { return !o; }))
        return alert("Điền đủ Chủ đề, Câu hỏi và cả 4 đáp án nhé!");
      c.quiz.push({
        id: newId(),
        topic: v("#f-topic"),
        question: v("#f-question"),
        options: opts,
        correct: parseInt(v("#f-correct"), 10),
        explain: v("#f-explain") || "Đáp án đúng: " + opts[parseInt(v("#f-correct"), 10)]
      });
      addState.msg = "Đã thêm câu quiz chủ đề \"" + v("#f-topic") + "\" — xem ở trang Quiz.";
    } else {
      if (!v("#f-group") || !v("#f-name") || !v("#f-complexity") || !v("#f-idea"))
        return alert("Điền đủ Nhóm, Tên, Độ phức tạp và Ý tưởng nhé!");
      c.algo.push({
        id: newId(),
        group: v("#f-group"),
        name: v("#f-name"),
        complexity: v("#f-complexity"),
        idea: v("#f-idea"),
        steps: v("#f-steps") ? v("#f-steps").split("\n").map(function (s) { return s.trim(); }).filter(Boolean) : [],
        java: v("#f-java") || "// Chưa có code Java",
        js: v("#f-js") || "// Chưa có code JavaScript"
      });
      addState.msg = "Đã thêm thuật toán \"" + v("#f-name") + "\" — xem ở trang Thuật toán.";
    }

    saveCustomContent(c);
    renderAdd(el);
  });
}

function renderAddList(el) {
  var c = getCustomContent();
  var items = c[addState.tab];
  var listEl = el.querySelector("#add-list");
  if (!items.length) { listEl.innerHTML = ""; return; }

  listEl.innerHTML =
    '<h2>Đã thêm (' + items.length + ')</h2><div class="card">' +
    items.map(function (it) {
      var label = addState.tab === "algo"
        ? '<span class="badge type">' + esc(it.group) + '</span> ' + esc(it.name)
        : '<span class="badge type">' + esc(it.topic) + '</span> ' + esc(it.question);
      return '<div class="custom-item"><span>' + label + '</span>' +
        '<button class="del" data-id="' + esc(it.id) + '">🗑 Xóa</button></div>';
    }).join("") + '</div>';

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".del");
    if (!btn) return;
    if (!confirm("Xóa mục này?")) return;
    var cur = getCustomContent();
    cur[addState.tab] = cur[addState.tab].filter(function (it) { return it.id !== btn.dataset.id; });
    saveCustomContent(cur);
    renderAdd(el);
  });
}
