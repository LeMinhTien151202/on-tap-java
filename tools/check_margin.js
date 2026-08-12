// Kiểm tra chênh lệch độ dài giữa đáp án đúng và phương án nhiễu dài nhất.
// Dùng: node tools/check_margin.js "Kafka nội tại" "Redis nội tại" ...
// Không truyền topic thì kiểm tra toàn bộ.
global.window = {};
require('../data/quiz-data.js');
const all = global.window.QUIZ_DATA;
const topics = process.argv.slice(2);
const list = topics.length ? all.filter(function (q) { return topics.indexOf(q.topic) !== -1; }) : all;

let longest = 0, over = [];
list.forEach(function (q) {
  const dung = q.options[q.correct].length;
  const nhieu = q.options.filter(function (_, i) { return i !== q.correct; })
    .reduce(function (m, o) { return Math.max(m, o.length); }, 0);
  if (dung > nhieu) longest++;
  const margin = dung - nhieu;
  if (margin >= 10) over.push({ margin: margin, topic: q.topic, q: q.question });
});

console.log('Số câu kiểm tra : ' + list.length);
console.log('Đáp án dài nhất : ' + longest + ' (' + (longest * 100 / list.length).toFixed(1) + '%)');
console.log('Chênh >= 10 ký tự: ' + over.length);
over.sort(function (a, b) { return b.margin - a.margin; }).forEach(function (o) {
  console.log('  +' + o.margin + '  [' + o.topic + '] ' + o.q.slice(0, 70));
});
