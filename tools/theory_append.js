// Nối lý thuyết vào cuối data/theory-extra.js (KHÔNG đụng theory-data.js — file đó sinh từ Excel).
// Chèn dạng văn bản, giữ nguyên định dạng sẵn có của file, không format lại phần cũ.
// Patch file: module.exports = [{ topic, items: [{question, answer, examples: [string]}] }]
// Dùng: node tools/theory_append.js tools/patch/<file>.js
const fs = require('fs');
const path = require('path');

const patchPath = process.argv[2];
if (!patchPath) { console.error('Thiếu đường dẫn patch file.'); process.exit(1); }

const patch = require(path.resolve(patchPath));
if (!Array.isArray(patch)) { console.error('Patch phải là một mảng.'); process.exit(1); }

const file = path.join(__dirname, '..', 'data', 'theory-extra.js');
global.window = {};
require(file);
require(path.join(__dirname, '..', 'data', 'theory-data.js'));

const existingTopics = new Set();
const seenQ = new Set();
[].concat(window.THEORY_DATA || [], window.THEORY_EXTRA || []).forEach(function (t) {
  existingTopics.add(t.topic);
  t.items.forEach(function (i) { seenQ.add(i.question.trim().toLowerCase()); });
});

let nItems = 0;
patch.forEach(function (t, ti) {
  const at = 'topic[' + ti + '] ' + (t && t.topic);
  if (!t.topic || typeof t.topic !== 'string') { console.error(at + ': thiếu topic'); process.exit(1); }
  if (existingTopics.has(t.topic)) { console.error(at + ': topic đã tồn tại — đặt tên pill khác'); process.exit(1); }
  if (!Array.isArray(t.items) || !t.items.length) { console.error(at + ': items rỗng'); process.exit(1); }
  existingTopics.add(t.topic);
  t.items.forEach(function (i, ii) {
    const where = at + ' / item[' + ii + ']';
    if (!i.question || typeof i.question !== 'string') { console.error(where + ': thiếu question'); process.exit(1); }
    if (!i.answer || typeof i.answer !== 'string') { console.error(where + ': thiếu answer'); process.exit(1); }
    if (!Array.isArray(i.examples)) { console.error(where + ': examples phải là mảng'); process.exit(1); }
    i.examples.forEach(function (e) {
      if (typeof e !== 'string') { console.error(where + ': mỗi example phải là chuỗi'); process.exit(1); }
    });
    const extra = Object.keys(i).filter(function (k) { return ['question', 'answer', 'examples'].indexOf(k) === -1; });
    if (extra.length) { console.error(where + ': field lạ ' + extra.join(', ')); process.exit(1); }
    const key = i.question.trim().toLowerCase();
    if (seenQ.has(key)) { console.error(where + ': câu hỏi trùng — ' + i.question); process.exit(1); }
    seenQ.add(key);
    nItems++;
  });
});

const S = JSON.stringify;
const blocks = patch.map(function (t) {
  const items = t.items.map(function (i) {
    return '   {\n' +
      '    "question": ' + S(i.question) + ',\n' +
      '    "answer": ' + S(i.answer) + ',\n' +
      '    "examples": [' + i.examples.map(S).join(', ') + ']\n' +
      '   }';
  }).join(',\n');
  return ' {\n  "topic": ' + S(t.topic) + ',\n  "items": [\n' + items + '\n  ]\n }';
}).join(',\n');

let src = fs.readFileSync(file, 'utf8');
const tail = '\n];\n';
const at = src.lastIndexOf(tail);
if (at === -1) { console.error('Không tìm thấy kết thúc mảng "\\n];" trong theory-extra.js'); process.exit(1); }
src = src.slice(0, at) + ',\n' + blocks + tail;
fs.writeFileSync(file, src, 'utf8');

console.log('Pill mới : ' + patch.length);
patch.forEach(function (t) { console.log('   + ' + t.topic + ' (' + t.items.length + ' mục)'); });
console.log('Tổng mục : ' + nItems);
