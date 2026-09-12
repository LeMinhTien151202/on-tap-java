// Kiểm tra tính toàn vẹn dữ liệu quiz + theory
global.window = {};
require('../data/quiz-data.js');
require('../data/theory-extra.js');
require('../data/checklist-data.js');
require('../data/exam-online-data.js');
require('../data/payflow-project-data.js');
require('../data/business-handbook-project-data.js');

const q = window.QUIZ_DATA, t = window.THEORY_EXTRA;

const badQ = q.filter(x =>
  !x.topic || !x.question || !Array.isArray(x.options) || x.options.length < 2 ||
  typeof x.correct !== 'number' || x.correct < 0 || x.correct >= x.options.length ||
  !x.explain
);

const badT = [];
let items = 0;
t.forEach(p => {
  if (!p.topic || !Array.isArray(p.items)) { badT.push(p.topic || '(no topic)'); return; }
  p.items.forEach(i => {
    items++;
    if (!i.question || !i.answer) badT.push(p.topic + ' > ' + (i.question || '?'));
  });
});

const seen = new Map(), dup = [];
q.forEach(x => {
  const k = x.question.trim().toLowerCase();
  if (seen.has(k)) dup.push(x.question); else seen.set(k, 1);
});

console.log('QUIZ total      :', q.length);
console.log('QUIZ malformed  :', badQ.length);
console.log('QUIZ duplicates :', dup.length);
dup.slice(0, 10).forEach(d => console.log('   dup:', d.slice(0, 80)));
console.log('THEORY pills    :', t.length);
console.log('THEORY items    :', items);
console.log('THEORY malformed:', badT.length);
badT.slice(0, 10).forEach(d => console.log('   bad:', d));

const newTopics = ['Payment Domain', 'Ledger & Reconciliation', 'Webhook & IPN',
  'Idempotency & Inbox', 'Hexagonal & DDD', 'Resilience nâng cao',
  'Kafka vận hành', 'Flyway & Contract Test'];
console.log('\n-- Quiz theo topic mới --');
newTopics.forEach(k => console.log('  ' + k + ': ' + q.filter(x => x.topic === k).length));

console.log('\n-- Pill mới --');
t.slice(-8).forEach(p => console.log('  ' + p.topic + ' (' + p.items.length + ' mục)'));
