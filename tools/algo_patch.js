// Chèn thêm field (diff / trap / alt) vào từng mục trong data/algo-data.js.
// Dùng: node tools/algo_patch.js tools/patch/batchA.js
// File patch export dạng { "<tên bài chính xác>": { diff, trap, alt } }.
const fs = require('fs');
const path = require('path');

const patchPath = process.argv[2];
if (!patchPath) {
  console.error('Thiếu tham số: node tools/algo_patch.js <file-patch>');
  process.exit(1);
}

const file = path.join(__dirname, '..', 'data', 'algo-data.js');
const PATCH = require(path.resolve(patchPath));

let src = fs.readFileSync(file, 'utf8');
const applied = [], notFound = [], already = [];

Object.keys(PATCH).forEach(function (name) {
  const needle = '    name: ' + JSON.stringify(name) + ',';
  const idx = src.indexOf(needle);
  if (idx === -1) { notFound.push(name); return; }

  const lineEnd = idx + needle.length;
  // Thân của mục hiện tại kết thúc ở dấu đóng ngoặc nhọn thụt 3 dấu cách
  const stop = src.indexOf('\n   }', lineEnd);
  const body = src.slice(lineEnd, stop === -1 ? src.length : stop);

  let add = '';
  const dup = [];
  ['diff', 'trap', 'alt', 'examples'].forEach(function (k) {
    if (PATCH[name][k] === undefined) return;
    if (body.indexOf('\n    ' + k + ':') !== -1) { dup.push(k); return; }
    add += '\n    ' + k + ': ' + JSON.stringify(PATCH[name][k]) + ',';
  });

  if (dup.length) already.push(name + ' (' + dup.join(', ') + ')');
  if (!add) return;

  src = src.slice(0, lineEnd) + add + src.slice(lineEnd);
  applied.push(name);
});

fs.writeFileSync(file, src, 'utf8');

console.log('Đã chèn : ' + applied.length);
if (already.length) {
  console.log('Đã có sẵn (bỏ qua): ' + already.length);
  already.forEach(function (n) { console.log('   ' + n); });
}
if (notFound.length) {
  console.log('KHÔNG TÌM THẤY: ' + notFound.length);
  notFound.forEach(function (n) { console.log('   ' + n); });
  process.exitCode = 1;
}
