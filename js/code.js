// Trang Chạy code: viết JavaScript và chạy ngay trong trình duyệt, output hiện bên dưới.
var codeState = { code: null };
var CODE_TEMPLATE =
  '// Viết code JavaScript rồi bấm ▶ Chạy (hoặc Ctrl+Enter)\n' +
  'var arr = [5, 2, 9, 1, 7];\n' +
  'arr.sort(function (a, b) { return a - b; });\n' +
  'console.log("Mảng đã sắp xếp:", arr);\n';

function renderCode(el) {
  if (codeState.code === null) codeState.code = CODE_TEMPLATE;

  var opts = '<option value="">— Nạp code mẫu từ thuật toán —</option>' +
    getAllAlgo().map(function (g) {
      return '<optgroup label="' + esc(g.group) + '">' +
        g.items.map(function (it) {
          return '<option value="' + esc(it.name) + '">' + esc(it.name) + '</option>';
        }).join("") + '</optgroup>';
    }).join("");

  el.innerHTML =
    '<h1>💻 Chạy code JavaScript</h1>' +
    '<p class="subtitle">Viết code JS và chạy ngay trong trình duyệt — kết quả <code>console.log</code> hiện ở khung dưới. ' +
    'Java không chạy được trong trình duyệt, dùng IDE hoặc trình chạy online như jdoodle.com nhé.</p>' +
    '<div class="card">' +
    '<div class="code-toolbar">' +
    '<select id="code-sample">' + opts + '</select>' +
    '<span style="flex:1"></span>' +
    '<button class="btn" id="code-run">▶ Chạy</button>' +
    '<button class="btn secondary" id="code-clear">Xóa kết quả</button>' +
    '</div>' +
    '<textarea id="code-input" class="code-editor" spellcheck="false"></textarea>' +
    '<div class="code-output" id="code-output"><span class="muted">Kết quả sẽ hiện ở đây sau khi bấm ▶ Chạy…</span></div>' +
    '</div>';

  var input = el.querySelector("#code-input");
  input.value = codeState.code;
  input.addEventListener("input", function () { codeState.code = input.value; });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      var s = input.selectionStart, en = input.selectionEnd;
      input.value = input.value.slice(0, s) + "  " + input.value.slice(en);
      input.selectionStart = input.selectionEnd = s + 2;
      codeState.code = input.value;
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode(el);
    }
  });

  el.querySelector("#code-sample").addEventListener("change", function () {
    if (!this.value) return;
    var algo = findAlgo(this.value);
    if (!algo) return;
    codeState.code = "// " + algo.name + " — " + algo.complexity + "\n" + algo.js + "\n";
    input.value = codeState.code;
  });

  el.querySelector("#code-run").addEventListener("click", function () { runCode(el); });
  el.querySelector("#code-clear").addEventListener("click", function () {
    el.querySelector("#code-output").innerHTML = '<span class="muted">Kết quả sẽ hiện ở đây sau khi bấm ▶ Chạy…</span>';
  });
}

function showCodeOutput(outEl, logs) {
  if (!logs.length) {
    outEl.innerHTML = '<span class="muted">(Chạy xong, không có output — dùng console.log(...) để in kết quả)</span>';
    return;
  }
  outEl.innerHTML = logs.map(function (l) {
    var prefix = l.t === "error" ? "✖ " : l.t === "warn" ? "⚠ " : l.t === "ret" ? "← " : "";
    return '<div class="out-line ' + l.t + '">' + prefix + esc(l.m) + '</div>';
  }).join("");
}

// Chạy trong Web Worker để vòng lặp vô hạn không treo trang (tự dừng sau 5 giây)
function runCode(el) {
  var outEl = el.querySelector("#code-output");
  var code = el.querySelector("#code-input").value;
  outEl.innerHTML = '<span class="muted">Đang chạy…</span>';

  var workerSrc =
    'var logs=[];' +
    '["log","info","warn","error"].forEach(function(k){console[k]=function(){' +
    'logs.push({t:k==="info"?"log":k,m:Array.prototype.slice.call(arguments).map(function(a){' +
    'try{return typeof a==="object"&&a!==null?JSON.stringify(a):String(a)}catch(e){return String(a)}' +
    '}).join(" ")});};});' +
    'onmessage=function(e){try{var r=eval(e.data);' +
    'if(r!==undefined)logs.push({t:"ret",m:typeof r==="object"&&r!==null?JSON.stringify(r):String(r)});' +
    'postMessage(logs);}catch(err){logs.push({t:"error",m:err.name+": "+err.message});postMessage(logs);}};';

  try {
    var blob = new Blob([workerSrc], { type: "application/javascript" });
    var worker = new Worker(URL.createObjectURL(blob));
    var timer = setTimeout(function () {
      worker.terminate();
      outEl.innerHTML = '<div class="out-line error">✖ Chạy quá 5 giây — có thể bị vòng lặp vô hạn. Đã tự dừng.</div>';
    }, 5000);
    worker.onmessage = function (ev) {
      clearTimeout(timer);
      worker.terminate();
      showCodeOutput(outEl, ev.data);
    };
    worker.postMessage(code);
  } catch (e) {
    runCodeInline(code, outEl); // VD mở bằng file:// không tạo được Worker
  }
}

function runCodeInline(code, outEl) {
  var logs = [];
  var orig = {};
  ["log", "info", "warn", "error"].forEach(function (k) {
    orig[k] = console[k];
    console[k] = function () {
      logs.push({
        t: k === "info" ? "log" : k,
        m: Array.prototype.slice.call(arguments).map(function (a) {
          try { return typeof a === "object" && a !== null ? JSON.stringify(a) : String(a); }
          catch (e) { return String(a); }
        }).join(" ")
      });
      orig[k].apply(console, arguments);
    };
  });
  try {
    var r = (new Function(code))();
    if (r !== undefined) logs.push({ t: "ret", m: String(r) });
  } catch (err) {
    logs.push({ t: "error", m: err.name + ": " + err.message });
  }
  ["log", "info", "warn", "error"].forEach(function (k) { console[k] = orig[k]; });
  showCodeOutput(outEl, logs);
}
