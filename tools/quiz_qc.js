// Soi chất lượng bộ câu hỏi: phân bố đáp án, đáp án dài nhất (dễ đoán mò),
// options trùng nhau, câu hỏi trùng, và chênh lệch độ dài đáp án đúng / sai.
global.window = {};
require('../data/quiz-data.js');
const Q = window.QUIZ_DATA;

const onlyTopic = process.argv[2] || null;
const list = onlyTopic ? Q.filter(q => q.topic === onlyTopic) : Q;

const dist = {};
let longestIsCorrect = 0;
const dupOptions = [];
const shortCorrect = [];
const seen = new Map();
const dupQuestions = [];

list.forEach(function (q, i) {
  dist[q.correct] = (dist[q.correct] || 0) + 1;

  const lens = q.options.map(o => o.length);
  const max = Math.max.apply(null, lens);
  if (lens[q.correct] === max) longestIsCorrect++;

  const norm = q.options.map(o => o.trim().toLowerCase());
  if (new Set(norm).size !== norm.length) dupOptions.push(q.question.slice(0, 70));

  // đáp án đúng NGẮN hơn hẳn mọi đáp án sai -> cũng là dấu hiệu bất thường
  const wrongLens = lens.filter((_, k) => k !== q.correct);
  if (lens[q.correct] < Math.min.apply(null, wrongLens) / 2) {
    shortCorrect.push(q.question.slice(0, 70));
  }

  const key = q.question.trim().toLowerCase().replace(/\s+/g, ' ');
  if (seen.has(key)) {
    const prev = seen.get(key);
    dupQuestions.push({
      q: q.question.slice(0, 70),
      sameAnswer: prev.options[prev.correct] === q.options[q.correct],
      topics: prev.topic + ' | ' + q.topic
    });
  } else {
    seen.set(key, q);
  }
});

console.log('Phạm vi   : ' + (onlyTopic || 'TẤT CẢ') + ' — ' + list.length + ' câu');
console.log('Phân bố vị trí đáp án đúng:');
Object.keys(dist).sort().forEach(function (k) {
  const pct = (dist[k] / list.length * 100).toFixed(1);
  console.log('   index ' + k + ': ' + dist[k] + ' (' + pct + '%)');
});
console.log('Đáp án đúng là lựa chọn DÀI NHẤT: ' + longestIsCorrect +
            ' (' + (longestIsCorrect / list.length * 100).toFixed(1) + '%)');

console.log('\nCâu có options trùng nhau: ' + dupOptions.length);
dupOptions.forEach(t => console.log('   ' + t));

console.log('\nĐáp án đúng ngắn bất thường: ' + shortCorrect.length);
shortCorrect.forEach(t => console.log('   ' + t));

console.log('\nCâu hỏi trùng nội dung: ' + dupQuestions.length);
dupQuestions.forEach(d => console.log('   [' + (d.sameAnswer ? 'cùng đáp án' : 'KHÁC ĐÁP ÁN!') + '] ' + d.topics + ' :: ' + d.q));
