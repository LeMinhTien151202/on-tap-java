// In gọn: câu hỏi | đáp án được chấm đúng — để rà nhanh xem có câu nào chấm sai.
// Dùng: node tools/quiz_brief.js [từ] [đến]
global.window = {};
require('../data/quiz-data.js');
const Q = window.QUIZ_DATA;

const from = parseInt(process.argv[2] || '0', 10);
const to = parseInt(process.argv[3] || '9999', 10);

let lastTopic = null;
Q.slice(from, to).forEach(function (q, i) {
  if (q.topic !== lastTopic) {
    console.log('\n### ' + q.topic);
    lastTopic = q.topic;
  }
  console.log((from + i) + '. ' + q.question + '  ==>  ' + q.options[q.correct]);
});
