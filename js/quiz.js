// Trang Quiz trắc nghiệm: chọn chủ đề + số câu → làm bài → chấm điểm + lưu lịch sử.
var quizState = null; // null = màn hình chọn; object = đang làm bài
var quizSetup = { domain: "java-language", topic: "Tất cả", count: 10, filter: "", mode: "random" };

function quizTopics(pool) {
  var topics = [];
  (pool || getAllQuiz()).forEach(function (q) {
    if (topics.indexOf(q.topic) === -1) topics.push(q.topic);
  });
  return topics;
}

function getQuizHistory() {
  try { return JSON.parse(localStorage.getItem("ontap.quizHistory")) || []; }
  catch (e) { return []; }
}

function saveQuizResult(topic, score, total) {
  var history = getQuizHistory();
  history.unshift({ date: new Date().toLocaleString("vi-VN"), topic: topic, score: score, total: total });
  localStorage.setItem("ontap.quizHistory", JSON.stringify(history.slice(0, 20)));
}

/* ===== Sổ tay câu từng trả lời sai (lưu theo nội dung câu hỏi) ===== */
function getWrongBank() {
  try { return JSON.parse(localStorage.getItem("ontap.wrongBank")) || []; }
  catch (e) { return []; }
}
function saveWrongBank(list) {
  localStorage.setItem("ontap.wrongBank", JSON.stringify(list.slice(0, 500)));
}
function addToWrongBank(question) {
  var bank = getWrongBank();
  if (bank.indexOf(question) === -1) { bank.unshift(question); saveWrongBank(bank); }
}
function removeFromWrongBank(question) {
  saveWrongBank(getWrongBank().filter(function (q) { return q !== question; }));
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Xáo trộn vị trí các đáp án trong một câu (không giả định luôn có 4 đáp án)
function prepareQuestion(q) {
  var order = shuffle(q.options.map(function (_, i) { return i; }));
  return {
    topic: q.topic,
    question: q.question,
    options: order.map(function (i) { return q.options[i]; }),
    correct: order.indexOf(q.correct),
    explain: q.explain
  };
}

function startQuiz(label, pool, count) {
  quizState = {
    topic: label,
    questions: shuffle(pool).slice(0, count).map(prepareQuestion),
    index: 0,
    score: 0,
    answered: false,
    wrong: [],
    finished: false
  };
}

// Dùng từ Trang chủ + màn hình kết quả: ôn lại đúng những câu từng sai
function startWrongReview() {
  var bank = getWrongBank();
  var pool = getAllQuiz().filter(function (q) { return bank.indexOf(q.question) !== -1; });
  if (!pool.length) { alert("Chưa có câu nào trong sổ tay câu sai."); return; }
  startQuiz("Ôn câu từng sai", pool, pool.length);
  if (location.hash === "#/quiz") render(); else location.hash = "#/quiz";
}

function renderQuiz(el) {
  if (!quizState) return renderQuizSetup(el);
  if (quizState.finished) return renderQuizResult(el);
  renderQuizQuestion(el);
}

function renderQuizSetup(el) {
  var allQuiz = getAllQuiz();
  var domainQuiz = allQuiz.filter(function (q) { return getLearningDomain(q.topic) === quizSetup.domain; });
  var bank = getWrongBank();
  var wrongCount = allQuiz.filter(function (q) { return bank.indexOf(q.question) !== -1; }).length;

  var counts = [10, 20, 30, 50, 100];
  var countPills = counts.map(function (n) {
    return '<button class="pill' + (quizSetup.count === n ? " active" : "") + '" data-count="' + n + '">' + n + ' câu</button>';
  }).join("") +
    '<button class="pill' + (quizSetup.count === 9999 ? " active" : "") + '" data-count="9999">Tất cả</button>';

  var history = getQuizHistory();
  var historyHtml = history.length
    ? '<div class="toolbar"><h2 style="margin:0">Lịch sử làm bài</h2><span style="flex:1"></span>' +
      '<button class="btn secondary sm" id="quiz-clear-history">🗑 Xóa lịch sử</button></div>' +
      '<div class="card">' + history.map(function (h) {
        var pct = Math.round(h.score / h.total * 100);
        var color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--amber)" : "var(--red)";
        return '<div class="history-item"><span>' + esc(h.topic) + '</span>' +
          '<span><strong style="color:' + color + '">' + h.score + '/' + h.total + '</strong> · <span style="color:var(--muted)">' + esc(h.date) + '</span></span></div>';
      }).join("") + '</div>'
    : "";

  var domainButtons = LEARNING_DOMAINS.map(function (d) {
    var count = allQuiz.filter(function (q) { return getLearningDomain(q.topic) === d.id; }).length;
    if (!count) return "";
    return '<button class="domain-btn' + (d.id === quizSetup.domain ? " active" : "") +
      '" data-domain="' + esc(d.id) + '"><span>' + d.icon + '</span><strong>' +
      esc(d.title) + '</strong><small>' + count + ' câu</small></button>';
  }).join("");

  el.innerHTML =
    '<h1>📝 Quiz trắc nghiệm</h1>' +
    '<p class="subtitle">Chọn miền, chủ đề và số câu. Sau mỗi lựa chọn, hệ thống nêu thẳng đáp án đúng rồi giải thích cơ chế để bạn không chỉ học thuộc.</p>' +
    '<div class="learning-domains" id="quiz-domains">' + domainButtons + '</div>' +
    learningGuideHtml(quizSetup.domain, true) +
    (wrongCount
      ? '<div class="card" style="border-color:var(--red)"><div class="toolbar" style="margin-bottom:0">' +
        '<div><strong>🔁 Sổ tay câu từng sai: ' + wrongCount + ' câu</strong>' +
        '<div style="font-size:13.5px;color:var(--muted);margin-top:3px">Trả lời đúng lại lần nữa thì câu đó tự rời khỏi sổ tay.</div></div>' +
        '<span style="flex:1"></span>' +
        '<button class="btn" id="quiz-wrong" style="background:var(--red)">Ôn ngay ' + wrongCount + ' câu</button>' +
        '<button class="btn secondary sm" id="quiz-wrong-clear">Xóa sổ tay</button>' +
        '</div></div>'
      : "") +
    '<div class="card"><div class="toolbar"><h2 style="margin:0">Chủ đề</h2><span style="flex:1"></span>' +
    '<input type="text" class="pill-filter" id="quiz-topic-filter" placeholder="🔍 Lọc nhanh chủ đề..." value="' + esc(quizSetup.filter) + '"></div>' +
    '<div class="pills pills-scroll" id="quiz-topics"></div>' +
    '<h2>Số câu</h2><div class="toolbar" id="quiz-count">' + countPills +
    '<span style="flex:1"></span><span style="font-size:13.5px;color:var(--muted)">Tùy chọn:</span>' +
    '<input type="number" min="1" max="9999" class="count-input" id="quiz-count-custom" placeholder="VD 15"></div>' +
    '<button class="btn" id="quiz-start">🚀 Bắt đầu làm bài</button> ' +
    '<span id="quiz-pool-info" style="font-size:13.5px;color:var(--muted);margin-left:8px"></span></div>' +
    historyHtml;

  function paintTopics() {
    var kw = quizSetup.filter.trim().toLowerCase();
    var list = ["Tất cả"].concat(quizTopics(domainQuiz)).filter(function (t) {
      return t === "Tất cả" || !kw || t.toLowerCase().indexOf(kw) !== -1;
    });
    el.querySelector("#quiz-topics").innerHTML = list.map(function (t) {
      var count = t === "Tất cả" ? domainQuiz.length
        : domainQuiz.filter(function (q) { return q.topic === t; }).length;
      return '<button class="pill' + (t === quizSetup.topic ? " active" : "") + '" data-topic="' + esc(t) + '">'
        + esc(t) + ' <span class="count">(' + count + ')</span></button>';
    }).join("") || '<span class="empty" style="padding:8px 0">Không có chủ đề nào khớp.</span>';
    paintInfo();
  }

  function poolSize() {
    return quizSetup.topic === "Tất cả" ? domainQuiz.length
      : domainQuiz.filter(function (q) { return q.topic === quizSetup.topic; }).length;
  }
  function paintInfo() {
    var n = Math.min(poolSize(), quizSetup.count);
    el.querySelector("#quiz-pool-info").textContent =
      "Sẽ ra đề " + n + " câu từ kho " + poolSize() + " câu của \"" + quizSetup.topic + "\".";
  }

  paintTopics();

  el.querySelector("#quiz-domains").addEventListener("click", function (e) {
    var btn = e.target.closest(".domain-btn");
    if (!btn) return;
    quizSetup.domain = btn.dataset.domain;
    quizSetup.topic = "Tất cả";
    quizSetup.filter = "";
    renderQuiz(el);
  });

  var filterEl = el.querySelector("#quiz-topic-filter");
  filterEl.addEventListener("input", function () {
    quizSetup.filter = filterEl.value;
    paintTopics();
  });

  el.querySelector("#quiz-topics").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    quizSetup.topic = btn.dataset.topic;
    el.querySelectorAll("#quiz-topics .pill").forEach(function (p) { p.classList.toggle("active", p === btn); });
    paintInfo();
  });

  var customEl = el.querySelector("#quiz-count-custom");
  el.querySelector("#quiz-count").addEventListener("click", function (e) {
    var btn = e.target.closest(".pill");
    if (!btn) return;
    el.querySelectorAll("#quiz-count .pill").forEach(function (p) { p.classList.toggle("active", p === btn); });
    quizSetup.count = parseInt(btn.dataset.count, 10);
    customEl.value = "";
    paintInfo();
  });
  customEl.addEventListener("input", function () {
    var n = parseInt(customEl.value, 10);
    if (!n || n < 1) return;
    quizSetup.count = n;
    el.querySelectorAll("#quiz-count .pill").forEach(function (p) { p.classList.remove("active"); });
    paintInfo();
  });

  el.querySelector("#quiz-start").addEventListener("click", function () {
    var pool = quizSetup.topic === "Tất cả" ? domainQuiz
      : domainQuiz.filter(function (q) { return q.topic === quizSetup.topic; });
    if (!pool.length) return alert("Chủ đề này chưa có câu hỏi nào.");
    startQuiz(quizSetup.topic, pool, quizSetup.count);
    renderQuiz(el);
  });

  var wrongBtn = el.querySelector("#quiz-wrong");
  if (wrongBtn) wrongBtn.addEventListener("click", function () { startWrongReview(); });
  var wrongClear = el.querySelector("#quiz-wrong-clear");
  if (wrongClear) wrongClear.addEventListener("click", function () {
    if (!confirm("Xóa toàn bộ sổ tay câu sai?")) return;
    saveWrongBank([]);
    renderQuiz(el);
  });

  var clearHist = el.querySelector("#quiz-clear-history");
  if (clearHist) clearHist.addEventListener("click", function () {
    if (!confirm("Xóa toàn bộ lịch sử làm bài?")) return;
    localStorage.removeItem("ontap.quizHistory");
    renderQuiz(el);
  });
}

function renderQuizQuestion(el) {
  var q = quizState.questions[quizState.index];
  var total = quizState.questions.length;
  var pct = Math.round(quizState.index / total * 100);
  var options = q.options.map(function (opt, i) {
    return '<button class="option" data-i="' + i + '"><span class="key">' + "ABCD"[i] + '.</span> ' + esc(opt) + '</button>';
  }).join("");

  el.innerHTML =
    '<h1>📝 Quiz — ' + esc(quizState.topic) + '</h1>' +
    '<div class="quiz-head">' +
    '<div class="quiz-progress">Câu <strong>' + (quizState.index + 1) + '</strong>/' + total + '</div>' +
    '<span class="quiz-chip">✔ Đúng: ' + quizState.score + '</span>' +
    '<span class="quiz-chip">✘ Sai: ' + quizState.wrong.length + '</span>' +
    '<span class="quiz-chip">' + esc(q.topic) + '</span>' +
    '</div>' +
    '<div class="quiz-bar"><div style="width:' + pct + '%"></div></div>' +
    '<div class="card"><div class="quiz-question">' + esc(q.question) + '</div>' +
    '<div id="quiz-options">' + options + '</div>' +
    '<div id="quiz-feedback"></div>' +
    '<p class="kbd-hint">Phím tắt: <kbd>1</kbd>-<kbd>4</kbd> hoặc <kbd>A</kbd>-<kbd>D</kbd> chọn đáp án · <kbd>Enter</kbd> câu tiếp theo</p>' +
    '</div>' +
    '<button class="btn secondary" id="quiz-quit">Thoát</button>';

  el.querySelector("#quiz-quit").addEventListener("click", function () {
    if (!confirm("Thoát bài làm hiện tại? Kết quả sẽ không được lưu.")) return;
    quizState = null;
    renderQuiz(el);
  });

  el.querySelector("#quiz-options").addEventListener("click", function (e) {
    var btn = e.target.closest(".option");
    if (!btn) return;
    answerQuiz(el, parseInt(btn.dataset.i, 10));
  });
}

function answerQuiz(el, chosen) {
  if (!quizState || quizState.answered || quizState.finished) return;
  var q = quizState.questions[quizState.index];
  if (chosen < 0 || chosen >= q.options.length) return;
  quizState.answered = true;

  var buttons = el.querySelectorAll(".option");
  buttons.forEach(function (b) { b.disabled = true; });
  buttons[q.correct].classList.add("correct");
  if (chosen === q.correct) {
    quizState.score++;
    removeFromWrongBank(q.question); // trả lời đúng lại → rời sổ tay
  } else {
    buttons[chosen].classList.add("wrong");
    quizState.wrong.push(q);
    addToWrongBank(q.question);
  }

  var last = quizState.index === quizState.questions.length - 1;
  el.querySelector("#quiz-feedback").innerHTML =
    '<div class="explain"><div class="explain-status">' + (chosen === q.correct ? "✅ Chính xác!" : "❌ Chưa đúng.") + '</div>' +
    '<div class="explain-answer"><strong>Đáp án đúng:</strong> ' + esc(q.options[q.correct]) + '</div>' +
    '<div class="explain-reason"><strong>Vì sao:</strong> ' + esc(q.explain) + '</div></div>' +
    '<button class="btn" id="quiz-next">' + (last ? "Xem kết quả 🏁" : "Câu tiếp theo →") + '</button>';
  el.querySelector("#quiz-next").addEventListener("click", function () { nextQuiz(el); });
  el.querySelector("#quiz-next").focus();
}

function nextQuiz(el) {
  quizState.answered = false;
  if (quizState.index === quizState.questions.length - 1) {
    quizState.finished = true;
    saveQuizResult(quizState.topic, quizState.score, quizState.questions.length);
  } else {
    quizState.index++;
  }
  renderQuiz(el);
}

// Phím tắt khi đang làm bài — gắn 1 lần ở cấp document vì mỗi câu đều render lại
document.addEventListener("keydown", function (e) {
  if (!quizState || quizState.finished) return;
  var tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || e.ctrlKey || e.altKey || e.metaKey) return;
  var el = document.getElementById("content");
  var n = quizState.questions[quizState.index].options.length;

  if (!quizState.answered) {
    var idx = -1;
    if (e.key >= "1" && e.key <= "9") idx = parseInt(e.key, 10) - 1;
    else if (/^[a-dA-D]$/.test(e.key)) idx = "abcd".indexOf(e.key.toLowerCase());
    if (idx >= 0 && idx < n) { e.preventDefault(); answerQuiz(el, idx); }
  } else if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
    e.preventDefault();
    nextQuiz(el);
  }
});

function renderQuizResult(el) {
  var total = quizState.questions.length;
  var pct = Math.round(quizState.score / total * 100);
  var msg = pct >= 80 ? "Xuất sắc! Sẵn sàng đi phỏng vấn 💪"
    : pct >= 50 ? "Khá ổn — ôn thêm mấy câu sai nhé 👍"
    : "Cần ôn lại đó — xem phần Lý thuyết rồi thử lại nhé 📚";
  var color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--amber)" : "var(--red)";

  var wrongHtml = quizState.wrong.length
    ? '<h2>Các câu trả lời sai (' + quizState.wrong.length + ')</h2>' +
      quizState.wrong.map(function (q) {
        return '<details class="qa"><summary>' + esc(q.question) + ' <span class="badge type">' + esc(q.topic) + '</span></summary>' +
          '<div class="qa-body"><div class="answer">✔ Đáp án đúng: ' + esc(q.options[q.correct]) +
          '\n\n💡 ' + esc(q.explain) + '</div></div></details>';
      }).join("")
    : '<div class="card" style="text-align:center;color:var(--green)">🎉 Không sai câu nào!</div>';

  el.innerHTML =
    '<h1>🏁 Kết quả</h1>' +
    '<div class="card" style="text-align:center">' +
    '<div class="quiz-score" style="color:' + color + '">' + quizState.score + '/' + total + '</div>' +
    '<div class="progress-bar" style="max-width:340px;margin:10px auto"><div style="width:' + pct + '%;background:' + color + '"></div></div>' +
    '<p style="margin:8px 0 16px">' + msg + ' (' + pct + '%)</p>' +
    '<button class="btn" id="quiz-again">↺ Làm lượt khác</button> ' +
    (quizState.wrong.length ? '<button class="btn" id="quiz-retry-wrong" style="background:var(--red)">🔁 Làm lại ' + quizState.wrong.length + ' câu vừa sai</button>' : "") +
    '</div>' +
    wrongHtml;

  el.querySelector("#quiz-again").addEventListener("click", function () {
    quizState = null;
    renderQuiz(el);
  });
  var retry = el.querySelector("#quiz-retry-wrong");
  if (retry) retry.addEventListener("click", function () {
    var pool = quizState.wrong.slice();
    startQuiz("Làm lại câu sai", pool, pool.length);
    renderQuiz(el);
  });
}
