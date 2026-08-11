// Liệt kê câu hỏi lý thuyết theo topic (gộp cả theory-data.js và theory-extra.js).
// Dùng: node tools/theory_list.js [chuỗi lọc topic]
global.window = {};
require('../data/theory-data.js');
require('../data/theory-extra.js');
const filter = (process.argv[2] || '').toLowerCase();
const map = new Map();
[...(window.THEORY_DATA || []), ...(window.THEORY_EXTRA || [])].forEach(t => {
  if (!map.has(t.topic)) map.set(t.topic, []);
  t.items.forEach(i => map.get(t.topic).push(i.question));
});
let total = 0;
[...map.entries()].forEach(([topic, qs]) => {
  if (filter && topic.toLowerCase().indexOf(filter) === -1) return;
  total += qs.length;
  console.log('== ' + topic + ' (' + qs.length + ')');
  qs.forEach(q => console.log('   - ' + q));
});
console.log('--- tổng: ' + total);
