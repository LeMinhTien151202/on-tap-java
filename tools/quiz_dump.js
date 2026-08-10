// In câu hỏi + đáp án được chấm đúng, để rà soát nội dung bằng mắt.
// Dùng: node tools/quiz_dump.js "<topic>" [từ] [đến]
global.window = {};
require('../data/quiz-data.js');
const Q = window.QUIZ_DATA;

const topic = process.argv[2];
const from = parseInt(process.argv[3] || '0', 10);
const to = parseInt(process.argv[4] || '9999', 10);

const list = topic && topic !== 'ALL' ? Q.filter(q => q.topic === topic) : Q;

list.slice(from, to).forEach(function (q, i) {
  console.log('[' + (from + i) + '] ' + q.question);
  console.log('    ✔ ' + q.options[q.correct]);
  q.options.forEach(function (o, k) {
    if (k !== q.correct) console.log('    ✘ ' + o);
  });
  console.log('    → ' + q.explain);
  console.log('');
});
console.log('--- ' + list.length + ' câu trong "' + (topic || 'ALL') + '" ---');
