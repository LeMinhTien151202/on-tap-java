// Liệt kê pill + số mục trong theory-extra.js. Dùng: node tools/list_pills.js [tên pill]
global.window = {};
require('../data/theory-extra.js');
const arg = process.argv[2];
const pills = window.THEORY_EXTRA || [];
if (!arg) {
  pills.forEach(function (p, i) { console.log((i + 1) + '. ' + p.topic + ' (' + p.items.length + ')'); });
  console.log('TỔNG pill: ' + pills.length + ' | mục: ' + pills.reduce(function (s, p) { return s + p.items.length; }, 0));
} else {
  pills.filter(function (p) { return p.topic.toLowerCase().indexOf(arg.toLowerCase()) !== -1; })
    .forEach(function (p) {
      console.log('== ' + p.topic + ' (' + p.items.length + ')');
      p.items.forEach(function (it) { console.log('   - ' + it.question); });
    });
}
