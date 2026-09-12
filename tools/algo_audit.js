// Rà soát dữ liệu thuật toán: thiếu java/js/diff/trap/alt, và java "giả" (thực chất là JS).
global.window = {};
require('../data/algo-data.js');
require('../data/algo-interview-extra.js');
require('../data/algo-business-math.js');
const groups = window.ALGO_DATA;

const miss = { java: [], js: [], diff: [], steps: [], trap: [], alt: [] };
const fakeJava = [];
let total = 0;

// Dấu hiệu code JS lọt vào ô Java
const JS_SIGNS = [/\bfunction\s*\(/, /=>/, /\bconst\b/, /\blet\b/, /console\.log/, /\bvar\b/];

groups.forEach(function (g) {
  g.items.forEach(function (it) {
    total++;
    const tag = g.group + ' :: ' + it.name;
    if (!it.java || !it.java.trim()) miss.java.push(tag);
    else {
      const hit = JS_SIGNS.filter(function (re) { return re.test(it.java); });
      if (hit.length) fakeJava.push(tag + '   [' + hit.map(String).join(' ') + ']');
    }
    if (!it.js || !it.js.trim()) miss.js.push(tag);
    if (!it.diff) miss.diff.push(tag);
    if (!it.steps || !it.steps.length) miss.steps.push(tag);
    if (!it.trap) miss.trap.push(tag);
    if (!it.alt) miss.alt.push(tag);
  });
});

console.log('TOTAL groups=' + groups.length + ' items=' + total);
console.log('\n== Java nghi là code JS: ' + fakeJava.length);
fakeJava.forEach(function (t) { console.log('   ' + t); });
Object.keys(miss).forEach(function (k) {
  console.log('\n-- Thiếu "' + k + '": ' + miss[k].length);
});
