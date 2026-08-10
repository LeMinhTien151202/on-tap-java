// Nối thêm nhóm mới vào cuối data/algo-data.js.
// Dùng: node tools/algo_append.js tools/patch/groupCommon.js
// File truyền vào export một MẢNG nhóm: [{ group, items: [...] }].
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) {
  console.error('Thiếu tham số: node tools/algo_append.js <file-nhóm>');
  process.exit(1);
}

const file = path.join(__dirname, '..', 'data', 'algo-data.js');
const GROUPS = require(path.resolve(src));

// Thứ tự field giữ cho khớp với các mục đã có sẵn trong file
const ORDER = ['name', 'lc', 'slug', 'diff', 'tags', 'trap', 'alt', 'examples', 'complexity', 'idea', 'steps', 'java', 'js'];

function serializeItem(it) {
  const lines = Object.keys(it)
    .sort(function (a, b) { return ORDER.indexOf(a) - ORDER.indexOf(b); })
    .map(function (k) { return '    ' + k + ': ' + JSON.stringify(it[k]) + ','; });
  // bỏ dấu phẩy ở dòng cuối
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  return '   {\n' + lines.join('\n') + '\n   }';
}

function serializeGroup(g) {
  return ' {\n  group: ' + JSON.stringify(g.group) + ',\n  items: [\n'
    + g.items.map(serializeItem).join(',\n') + '\n  ]\n }';
}

let text = fs.readFileSync(file, 'utf8');
const tail = text.lastIndexOf('\n];');
if (tail === -1) {
  console.error('Không tìm thấy dấu kết thúc mảng "\\n];" trong algo-data.js');
  process.exit(1);
}

const unknown = [];
GROUPS.forEach(function (g) {
  g.items.forEach(function (it) {
    Object.keys(it).forEach(function (k) {
      if (ORDER.indexOf(k) === -1) unknown.push(g.group + ' :: ' + it.name + ' :: ' + k);
    });
  });
});
if (unknown.length) {
  console.error('Field lạ (chưa có trong ORDER):');
  unknown.forEach(function (u) { console.error('   ' + u); });
  process.exit(1);
}

const added = GROUPS.map(serializeGroup).join(',\n');
text = text.slice(0, tail) + ',\n' + added + text.slice(tail);
fs.writeFileSync(file, text, 'utf8');

let count = 0;
GROUPS.forEach(function (g) { count += g.items.length; });
console.log('Đã nối ' + GROUPS.length + ' nhóm / ' + count + ' bài vào data/algo-data.js');
