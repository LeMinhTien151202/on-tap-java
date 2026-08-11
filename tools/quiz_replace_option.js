// Thay thế nguyên văn một chuỗi option trong data/quiz-data.js.
// Patch file: module.exports = [[chuoi_cu, chuoi_moi], ...]
// Mỗi cặp phải khớp ĐÚNG MỘT lần, nếu không sẽ dừng và không ghi gì.
// Dùng: node tools/quiz_replace_option.js tools/patch/<file>.js
const fs = require('fs');
const path = require('path');

const patchPath = process.argv[2];
if (!patchPath) { console.error('Thiếu đường dẫn patch file.'); process.exit(1); }

const pairs = require(path.resolve(patchPath));
const file = path.join(__dirname, '..', 'data', 'quiz-data.js');
let src = fs.readFileSync(file, 'utf8');

const loi = [];
pairs.forEach(function (p, i) {
  const cu = JSON.stringify(p[0]);
  const n = src.split(cu).length - 1;
  if (n !== 1) loi.push('cặp[' + i + '] khớp ' + n + ' lần: ' + p[0].slice(0, 50));
});
if (loi.length) { loi.forEach(function (l) { console.error(l); }); process.exit(1); }

pairs.forEach(function (p) {
  src = src.replace(JSON.stringify(p[0]), JSON.stringify(p[1]));
});
fs.writeFileSync(file, src, 'utf8');
console.log('Đã thay ' + pairs.length + ' option.');
