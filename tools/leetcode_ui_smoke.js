/* Smoke test giao diện LeetCode qua Chrome DevTools Protocol, không cần package ngoài. */
async function main() {
  var targets = await fetch("http://127.0.0.1:9223/json").then(function (r) { return r.json(); });
  var page = targets.find(function (t) { return t.type === "page" && /127\.0\.0\.1:8765/.test(t.url); });
  if (!page) throw new Error("Không tìm thấy tab ôn tập trên Chrome headless.");

  var socket = new WebSocket(page.webSocketDebuggerUrl);
  var sequence = 0;
  var pending = new Map();
  socket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    var entry = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
  };
  await new Promise(function (resolve, reject) {
    socket.onopen = resolve;
    socket.onerror = reject;
  });

  function send(method, params) {
    return new Promise(function (resolve, reject) {
      var id = ++sequence;
      pending.set(id, { resolve: resolve, reject: reject });
      socket.send(JSON.stringify({ id: id, method: method, params: params || {} }));
    });
  }

  await send("Runtime.enable");
  var result = await send("Runtime.evaluate", {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async function () {
      localStorage.removeItem("ontap.leetcode.done.v1");
      var tab = Array.from(document.querySelectorAll("#algo-tracks [data-track]"))
        .find(function (button) { return button.dataset.track === "leetcode"; });
      if (!tab) throw new Error("Không thấy tab LeetCode");
      tab.click();
      await new Promise(function (resolve) { requestAnimationFrame(resolve); });
      var groups = document.querySelectorAll("#algo-nav .group-title").length;
      var problems = document.querySelectorAll("#algo-nav button[data-name]").length;
      var hard = algoGroupsForTrack(getAllAlgo(), "leetcode")
        .flatMap(function (group) { return group.items; })
        .filter(function (item) { return item.diff === "Khó"; }).length;
      var first = document.querySelector("#algo-nav [data-lc-done]");
      if (!first) throw new Error("Không thấy nút đánh dấu tiến độ");
      first.click();
      await new Promise(function (resolve) { requestAnimationFrame(resolve); });
      return {
        activeTrack: algoState.track,
        groups: groups,
        problems: problems,
        hard: hard,
        progress: document.querySelector(".leetcode-progress-stat")?.innerText.trim(),
        firstProblem: document.querySelector("#algo-nav button[data-name]")?.innerText.trim(),
        detailHasLink: Boolean(document.querySelector("#algo-detail .lc-link"))
      };
    })()`
  });

  console.log(JSON.stringify(result.result.value, null, 2));
  await send("Browser.close");
  socket.close();
}

main().catch(function (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
