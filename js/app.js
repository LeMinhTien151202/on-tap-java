// Router + trang chủ + helper chung.
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Khối code kèm nút Copy (dùng ở Lý thuyết + Thuật toán)
function codeBlock(code) {
  return '<div class="codewrap"><button class="copy-btn" type="button">Copy</button>' +
    '<pre class="code">' + esc(code) + '</pre></div>';
}

// Khối định hướng chung: giúp người học biết mục tiêu, thứ tự và cách liên hệ kiến thức.
function learningGuideHtml(domainId, compact) {
  var d = findLearningDomain(domainId);
  var goals = d.goals.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join("");
  return '<section class="learning-guide' + (compact ? " compact" : "") + '">' +
    '<div class="learning-guide-head"><span class="learning-guide-icon">' + d.icon + '</span><div>' +
    '<div class="learning-guide-kicker">Bản đồ học</div><h2>' + esc(d.title) + '</h2></div></div>' +
    '<p class="learning-guide-summary">' + esc(d.summary) + '</p>' +
    (compact ? "" : '<div class="learning-guide-grid">' +
      '<div><strong>Cần nắm</strong><ul>' + goals + '</ul></div>' +
      '<div><strong>Thứ tự học</strong><p>' + esc(d.sequence) + '</p>' +
      '<strong>Áp dụng vào PayFlow</strong><p>' + esc(d.payflow) + '</p></div></div>') +
    '<div class="learning-tip"><strong>💬 Khi phỏng vấn:</strong> ' + esc(d.interview) + '</div>' +
    '</section>';
}

function copyText(text, btn) {
  var done = function () {
    btn.textContent = "✓ Đã copy";
    setTimeout(function () { btn.textContent = "Copy"; }, 1500);
  };
  var fallback = function () {
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    done();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, fallback);
  } else {
    fallback();
  }
}

document.addEventListener("click", function (e) {
  var btn = e.target.closest(".copy-btn");
  if (!btn) return;
  var pre = btn.parentElement.querySelector("pre.code");
  if (pre) copyText(pre.textContent, btn);
});

var routes = {
  home: renderHome,
  theory: renderTheory,
  quiz: renderQuiz,
  checklist: renderChecklist,
  algo: renderAlgo,
  code: renderCode,
  add: renderAdd
};

function currentRoute() {
  var hash = location.hash.replace(/^#\//, "");
  return routes[hash] ? hash : "home";
}

function render() {
  var route = currentRoute();
  document.querySelectorAll(".sidebar a[data-route]").forEach(function (a) {
    a.classList.toggle("active", a.dataset.route === route);
  });
  document.body.classList.remove("nav-open");
  var el = document.getElementById("content");
  routes[route](el);
  try { localStorage.setItem("ontap.lastRoute", route); } catch (e) {}
  window.scrollTo(0, 0);
}

/* ===== Giao diện sáng / tối ===== */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("ontap.theme", theme); } catch (e) {}
  var btn = document.getElementById("theme-btn");
  if (btn) btn.textContent = theme === "dark" ? "☀️  Giao diện sáng" : "🌙  Giao diện tối";
}
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
applyTheme(currentTheme());
document.getElementById("theme-btn").addEventListener("click", function () {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

/* ===== Menu trên màn hình nhỏ ===== */
document.getElementById("nav-toggle").addEventListener("click", function () {
  document.body.classList.toggle("nav-open");
});
document.getElementById("nav-backdrop").addEventListener("click", function () {
  document.body.classList.remove("nav-open");
});

/* ===== Nút lên đầu trang ===== */
var toTop = document.getElementById("to-top");
toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
window.addEventListener("scroll", function () {
  toTop.classList.toggle("show", window.scrollY > 400);
});

/* ===== Phím tắt điều hướng: g + phím (gt/gq/ga/gc/gh) ===== */
var _gPending = false;
document.addEventListener("keydown", function (e) {
  var tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select" || e.ctrlKey || e.altKey || e.metaKey) return;
  if (e.key === "Escape") { document.body.classList.remove("nav-open"); return; }
  if (_gPending) {
    var map = { h: "home", t: "theory", q: "quiz", c: "checklist", a: "algo", r: "code", n: "add" };
    if (map[e.key]) location.hash = "#/" + map[e.key];
    _gPending = false;
    return;
  }
  if (e.key === "g") { _gPending = true; setTimeout(function () { _gPending = false; }, 1200); }
});

function renderHome(el) {
  var topics = getTheoryTopics();
  var totalQA = topics.reduce(function (sum, t) { return sum + t.items.length; }, 0);
  var totalQuiz = getAllQuiz().length;
  var totalAlgo = getAllAlgo().reduce(function (sum, g) { return sum + g.items.length; }, 0);

  var checked = getChecked();
  var allChecklistItems = CHECKLIST_DATA.reduce(function (arr, s) { return arr.concat(s.items); }, []);
  var clProgress = checklistProgress(allChecklistItems, checked);

  var history = getQuizHistory();
  var lastQuiz = history.length ? history[0].score + "/" + history[0].total : "—";

  var learned = getLearned();
  var learnedCount = topics.reduce(function (sum, t) {
    return sum + t.items.filter(function (it) { return learned[it.id]; }).length;
  }, 0);
  var learnedPct = totalQA ? Math.round(learnedCount / totalQA * 100) : 0;

  var wrongBank = getWrongBank();

  var domainList = LEARNING_DOMAINS.map(function (d) {
    var domainTopics = topics.filter(function (t) { return getLearningDomain(t.topic) === d.id; });
    var total = domainTopics.reduce(function (sum, t) { return sum + t.items.length; }, 0);
    if (!total) return "";
    var done = domainTopics.reduce(function (sum, t) {
      return sum + t.items.filter(function (it) { return learned[it.id]; }).length;
    }, 0);
    var pct = Math.round(done / total * 100);
    return '<button class="home-domain" data-domain="' + esc(d.id) + '">' +
      '<span class="home-domain-main"><span class="home-domain-icon">' + d.icon + '</span><span><strong>' +
      esc(d.title) + '</strong><small>' + domainTopics.length + ' chủ đề · ' + total + ' câu</small></span></span>' +
      '<span class="home-domain-progress"><span>' + done + '/' + total + ' · ' + pct + '%</span>' +
      '<span class="progress-bar"><span style="width:' + pct + '%"></span></span></span></button>';
  }).join("");

  el.innerHTML =
    '<h1>🏠 Trang chủ</h1>' +
    '<p class="subtitle">Web ôn tập phỏng vấn Java / SQL và thuật toán — chúc bạn ôn tập hiệu quả! 💪</p>' +
    '<div class="grid">' +
    '<div class="stat-card"><div class="num">' + clProgress.pct + '%</div><div class="label">Checklist đã ôn (' + clProgress.done + '/' + clProgress.total + ' câu)</div>' +
    '<div class="progress-bar"><div style="width:' + clProgress.pct + '%"></div></div></div>' +
    '<div class="stat-card"><div class="num">' + learnedPct + '%</div><div class="label">Lý thuyết đã thuộc (' + learnedCount + '/' + totalQA + ')</div>' +
    '<div class="progress-bar"><div style="width:' + learnedPct + '%"></div></div></div>' +
    '<div class="stat-card"><div class="num">' + lastQuiz + '</div><div class="label">Điểm quiz gần nhất</div></div>' +
    '<div class="stat-card"><div class="num">' + totalQuiz + ' / ' + totalAlgo + '</div><div class="label">Câu quiz / thuật toán</div></div>' +
    '</div>' +
    '<div class="card"><h2 style="margin-top:0">Bắt đầu nhanh</h2>' +
    '<p style="margin-bottom:12px;font-size:14.5px;line-height:1.6">Gợi ý lộ trình: đọc <strong>Lý thuyết Q&amp;A</strong> theo từng chủ đề → tick <strong>Checklist</strong> những phần đã vững → làm <strong>Quiz</strong> kiểm tra → ôn <strong>Thuật toán</strong> trước ngày phỏng vấn.</p>' +
    '<div class="toolbar" style="margin-bottom:0">' +
    '<a class="btn" href="#/theory">📖 Ôn lý thuyết</a>' +
    '<a class="btn" href="#/quiz" style="background:var(--green)">📝 Làm quiz ngay</a>' +
    (wrongBank.length ? '<button class="btn" id="home-wrong" style="background:var(--red)">🔁 Ôn ' + wrongBank.length + ' câu từng sai</button>' : "") +
    '<a class="btn" href="#/algo" style="background:#0891b2">⚙️ Luyện thuật toán</a>' +
    '<a class="btn" href="#/code" style="background:#7c3aed">💻 Chạy thử code</a>' +
    '</div>' +
    '<p class="kbd-hint">Phím tắt: <kbd>g</kbd> rồi <kbd>t</kbd> lý thuyết · <kbd>q</kbd> quiz · <kbd>a</kbd> thuật toán · <kbd>c</kbd> checklist · <kbd>h</kbd> trang chủ</p>' +
    '</div>' +
    '<h2>Lộ trình kiến thức <span style="font-weight:400;font-size:13.5px;color:var(--muted)">(bấm để học theo miền)</span></h2>' +
    '<div class="domain-list">' + domainList + '</div>';

  var wrongBtn = el.querySelector("#home-wrong");
  if (wrongBtn) wrongBtn.addEventListener("click", function () { startWrongReview(); });

  el.addEventListener("click", function (e) {
    var row = e.target.closest(".home-domain");
    if (!row) return;
    theoryState.domain = row.dataset.domain;
    var first = topics.find(function (t) { return getLearningDomain(t.topic) === theoryState.domain; });
    theoryState.topic = first ? first.topic : topics[0].topic;
    theoryState.keyword = "";
    theoryState.filter = "all";
    location.hash = "#/theory";
  });
}

window.addEventListener("hashchange", render);
render();
