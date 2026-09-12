// Liệt kê các bài CHƯA có trường "examples" (hoặc có ít hơn 2 ví dụ), nhóm theo group.
global.window = {};
require('../data/algo-data.js');
require('../data/algo-interview-extra.js');
require('../data/algo-business-math.js');
require('../data/algo-basic-docx-extra.js');
const all = window.ALGO_DATA;

let missing = 0, ok = 0;
all.forEach(g => {
  const bad = g.items.filter(i => !i.examples || i.examples.length < 2);
  if (!bad.length) { ok += g.items.length; return; }
  missing += bad.length;
  console.log('# ' + g.group + ' (' + bad.length + '/' + g.items.length + ' thieu)');
  bad.forEach(i => console.log('   - ' + i.name));
});
console.log('--- du examples: ' + ok + ' | thieu: ' + missing);
