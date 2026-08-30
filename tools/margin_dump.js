// In các câu có đáp án đúng dài hơn nhiễu dài nhất >= N ký tự, kèm option để soạn patch.
// Dùng: node tools/margin_dump.js "topic1" "topic2" ...
global.window = {};
require('../data/quiz-data.js');
const topics = process.argv.slice(2);
const q = window.QUIZ_DATA.filter(x => topics.length === 0 || topics.indexOf(x.topic) !== -1);
q.forEach(function (x) {
  const correct = x.options[x.correct];
  let best = -1, bestI = -1;
  x.options.forEach(function (o, i) { if (i !== x.correct && o.length > best) { best = o.length; bestI = i; } });
  const margin = correct.length - best;
  if (margin >= 10) {
    console.log('--- margin +' + margin + ' | ' + x.question);
    console.log('   ĐÚNG (' + correct.length + '): ' + correct);
    console.log('   NHIỄU DÀI NHẤT (' + best + '): ' + x.options[bestI]);
  }
});
