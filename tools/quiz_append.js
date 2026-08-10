// Nối thêm câu hỏi vào cuối data/quiz-data.js.
// Dùng: node tools/quiz_append.js tools/patch/quizCommon.js
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) {
  console.error('Thiếu tham số: node tools/quiz_append.js <file-cau-hoi>');
  process.exit(1);
}

const file = path.join(__dirname, '..', 'data', 'quiz-data.js');
const NEW = require(path.resolve(src));

// Kiểm tra sơ bộ trước khi ghi
const bad = [];
NEW.forEach(function (q, i) {
  if (!q.topic || !q.question) bad.push(i + ': thiếu topic/question');
  if (!Array.isArray(q.options) || q.options.length < 2) bad.push(i + ': options không hợp lệ');
  if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= (q.options || []).length)
    bad.push(i + ': correct ngoài phạm vi');
  if (!q.explain) bad.push(i + ': thiếu explain');
});
if (bad.length) {
  console.error('Dữ liệu sai:');
  bad.forEach(function (b) { console.error('   ' + b); });
  process.exit(1);
}

let text = fs.readFileSync(file, 'utf8');
const tail = text.lastIndexOf('\n];');
if (tail === -1) {
  console.error('Không tìm thấy dấu kết thúc mảng "\\n];" trong quiz-data.js');
  process.exit(1);
}

const block = NEW.map(function (q) {
  return ' {topic: ' + JSON.stringify(q.topic) +
    ', question: ' + JSON.stringify(q.question) +
    ', options: ' + JSON.stringify(q.options) +
    ', correct: ' + q.correct +
    ', explain: ' + JSON.stringify(q.explain) + '}';
}).join(',\n');

text = text.slice(0, tail) + ',\n' + block + text.slice(tail);
fs.writeFileSync(file, text, 'utf8');

console.log('Đã nối ' + NEW.length + ' câu hỏi vào data/quiz-data.js');
