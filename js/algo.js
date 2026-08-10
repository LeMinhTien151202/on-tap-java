// Trang Thuật toán: sidebar danh sách (có tìm kiếm) → chi tiết với tab code Java/JS.
var algoState = { selected: null, lang: "java", keyword: "" };

var DIFF_CLASS = { "Dễ": "easy", "Trung bình": "medium", "Khó": "hard" };

function algoMatches(it, kw) {
  if (!kw) return true;
  return (it.name + " " + (it.idea || "") + " " + (it.lc || "") + " " + (it.tags || "")).toLowerCase().indexOf(kw) !== -1;
}

function renderAlgo(el) {
  var allAlgo = getAllAlgo();
  if (algoState.selected === null) algoState.selected = allAlgo[0].items[0].name;

  el.innerHTML =
    '<h1>⚙️ Thuật toán phỏng vấn</h1>' +
    '<p class="subtitle">Các thuật toán, kỹ thuật và bài LeetCode hay bị hỏi — kèm code Java và JavaScript.</p>' +
    '<div class="algo-layout">' +
    '<div class="algo-nav card">' +
    '<input type="text" class="pill-filter algo-search" id="algo-search" placeholder="🔍 Tìm tên bài, số LeetCode, ý tưởng..." value="' + esc(algoState.keyword) + '">' +
    '<div class="algo-nav-scroll" id="algo-nav"></div>' +
    '</div>' +
    '<div id="algo-detail"></div></div>';

  function paintNav() {
    var kw = algoState.keyword.trim().toLowerCase();
    var total = 0;
    var nav = allAlgo.map(function (g) {
      var items = g.items.filter(function (it) { return algoMatches(it, kw); });
      if (!items.length) return "";
      total += items.length;
      var buttons = items.map(function (it) {
        return '<button data-name="' + esc(it.name) + '"' +
          (it.name === algoState.selected ? ' class="active"' : "") + '>' +
          (it.lc ? '<span class="lc">#' + esc(it.lc) + '</span> ' : "") + esc(it.name) + '</button>';
      }).join("");
      return '<div class="group-title">' + esc(g.group) + ' (' + items.length + ')</div>' + buttons;
    }).join("");
    var navEl = el.querySelector("#algo-nav");
    navEl.innerHTML = nav || '<div class="empty" style="padding:20px 0">Không tìm thấy bài nào.</div>';
    if (kw && nav) navEl.insertAdjacentHTML("afterbegin",
      '<div class="progress-label" style="padding:2px 0 6px">' + total + ' kết quả</div>');
  }
  paintNav();

  var searchEl = el.querySelector("#algo-search");
  searchEl.addEventListener("input", function () {
    algoState.keyword = searchEl.value;
    paintNav();
  });

  el.querySelector("#algo-nav").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-name]");
    if (!btn) return;
    algoState.selected = btn.dataset.name;
    el.querySelectorAll("#algo-nav button").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderAlgoDetail(el);
  });

  renderAlgoDetail(el);
}

function findAlgo(name) {
  var allAlgo = getAllAlgo();
  for (var i = 0; i < allAlgo.length; i++) {
    var found = allAlgo[i].items.find(function (it) { return it.name === name; });
    if (found) return found;
  }
  return null;
}

function renderAlgoDetail(el) {
  var algo = findAlgo(algoState.selected);
  if (!algo) return;

  var steps = (algo.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  var diff = algo.diff
    ? '<span class="difficulty ' + (DIFF_CLASS[algo.diff] || "medium") + '">' + esc(algo.diff) + '</span>'
    : "";
  var lcLink = algo.slug
    ? '<a class="lc-link" href="https://leetcode.com/problems/' + esc(algo.slug) + '/" target="_blank" rel="noopener">🔗 LeetCode #' + esc(algo.lc) + '</a>'
    : "";

  // Ví dụ mẫu: mỗi bài 2 bộ input/output kèm một dòng giải thích ngắn
  var examples = (algo.examples || []).map(function (ex, i) {
    return '<div class="ex-item">' +
      '<div class="ex-no">Ví dụ ' + (i + 1) + '</div>' +
      '<div class="ex-io"><span class="ex-label">Input</span><code>' + esc(ex.input) + '</code></div>' +
      '<div class="ex-io"><span class="ex-label">Output</span><code>' + esc(ex.output) + '</code></div>' +
      (ex.note ? '<div class="ex-note">' + esc(ex.note) + '</div>' : "") +
      '</div>';
  }).join("");
  var exBlock = examples ? '<h2>Ví dụ mẫu</h2><div class="ex-box">' + examples + '</div>' : "";

  // Tiêu đề trong dữ liệu thường mở đầu bằng "Cách khác — ", bỏ đi cho khỏi lặp với nhãn
  var altTitle = "";
  if (algo.alt) {
    altTitle = algo.alt.title.replace(/^Cách khác\s*[—-]\s*/, "");
    altTitle = altTitle.charAt(0).toUpperCase() + altTitle.slice(1);
  }
  var alt = algo.alt
    ? '<details class="alt-box">' +
      '<summary><span class="alt-tag">Cách khác</span>' + esc(altTitle) + '</summary>' +
      '<div class="alt-body">' +
      (algo.alt.complexity ? '<div class="complexity">⏱ ' + esc(algo.alt.complexity) + '</div>' : "") +
      (algo.alt.note ? '<p class="alt-note">' + esc(algo.alt.note) + '</p>' : "") +
      '<div class="alt-lang">Java</div>' + codeBlock(algo.alt.java) +
      '</div></details>'
    : "";

  el.querySelector("#algo-detail").innerHTML =
    '<div class="card">' +
    '<h2 style="margin-top:0">' + esc(algo.name) + '</h2>' +
    '<div class="meta-row"><div class="complexity">⏱ ' + esc(algo.complexity) + '</div>' + diff + lcLink + '</div>' +
    '<p style="line-height:1.65;font-size:14.5px">' + esc(algo.idea) + '</p>' +
    exBlock +
    (steps ? '<h2>Các bước</h2><ol class="steps">' + steps + '</ol>' : "") +
    (algo.trap ? '<div class="explain">⚠️ Bẫy hay gặp: ' + esc(algo.trap) + '</div>' : "") +
    '<div class="tabs">' +
    '<button class="tab-btn' + (algoState.lang === "java" ? " active" : "") + '" data-lang="java">Java</button>' +
    '<button class="tab-btn' + (algoState.lang === "js" ? " active" : "") + '" data-lang="js">JavaScript</button>' +
    '</div>' +
    '<div class="codewrap"><button class="copy-btn" type="button">Copy</button>' +
    '<pre class="code" id="algo-code">' + esc(algoState.lang === "java" ? algo.java : algo.js) + '</pre></div>' +
    alt +
    '<div style="margin-top:12px"><button class="btn secondary sm" id="algo-try">▶ Chạy thử code JS ở trang Chạy code</button></div>' +
    '</div>';

  el.querySelector("#algo-try").addEventListener("click", function () {
    codeState.code = "// " + algo.name + " — " + algo.complexity + "\n" + algo.js +
      "\n\n// 👉 Gọi thử hàm với dữ liệu của bạn rồi console.log kết quả\n";
    location.hash = "#/code";
  });

  el.querySelectorAll("#algo-detail .tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      algoState.lang = btn.dataset.lang;
      el.querySelectorAll("#algo-detail .tab-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      el.querySelector("#algo-code").textContent = algoState.lang === "java" ? algo.java : algo.js;
    });
  });
}
