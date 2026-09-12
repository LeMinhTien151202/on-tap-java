// Quality gate cho toàn bộ nội dung sau khi áp dụng lớp curation.
// Chạy: node tools/content_audit.js
global.window = {};
require('../data/theory-data.js');
require('../data/theory-extra.js');
require('../data/checklist-data.js');
require('../data/quiz-data.js');
require('../data/algo-data.js');
require('../data/algo-interview-extra.js');
require('../data/algo-business-math.js');
require('../data/algo-basic-docx-extra.js');
require('../data/exam-online-data.js');
require('../data/payflow-project-data.js');
require('../data/business-handbook-project-data.js');
require('../data/learning-map.js');
require('../data/content-curation.js');

const theory = [];
[...(window.THEORY_DATA || []), ...(window.THEORY_EXTRA || [])].forEach(t => {
  t.items.forEach(x => theory.push({ ...x, topic: t.topic }));
});
const quiz = window.QUIZ_DATA || [];
const checklist = (window.CHECKLIST_DATA || []).flatMap(s => s.items.map(x => ({ ...x, section: s.section })));
const algo = (window.ALGO_DATA || []).flatMap(g => g.items.map(x => ({ ...x, group: g.group })));

const words = s => (String(s || '').trim().match(/\S+/g) || []).length;
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const duplicates = (list, key) => {
  const seen = new Map();
  list.forEach(x => {
    const k = norm(key(x));
    if (!seen.has(k)) seen.set(k, []);
    seen.get(k).push(x);
  });
  return [...seen.values()].filter(xs => xs.length > 1);
};

const malformedTheory = theory.filter(x =>
  !x.question || !x.answer || x.question.length > 150 || /[\r\n]/.test(x.question)
);
const duplicateTheory = duplicates(theory, x => x.question);
const shortQuiz = quiz.filter(x => words(x.explain) <= 15);
const weakLengthQuiz = quiz.filter(x => {
  const lens = x.options.map(o => o.length);
  return lens[x.correct] === Math.max(...lens);
});
const badChecklist = checklist.filter(x => !x.question || x.question.trim() === '0' || /^(p1|audit)$/i.test(x.topic || ''));
const duplicateChecklist = duplicates(checklist, x => x.section + ' ' + x.question);
const badAlgo = algo.filter(x => !x.name || !x.idea || !x.complexity || !x.java || !x.js || !(x.examples || []).length);
const duplicateAlgoNames = duplicates(algo, x => x.name);
const duplicateAlgoLeetCode = duplicates(algo.filter(x => x.lc), x => String(x.lc));

// Mô phỏng đúng cách giao diện sinh ID cho THEORY_EXTRA. ID trùng làm hai câu
// dùng chung trạng thái "đã thuộc" trong localStorage dù nội dung khác nhau.
const theoryIds = [];
(window.THEORY_DATA || []).forEach(t => t.items.forEach(x => theoryIds.push(x.id)));
const extraTopicBlocks = {};
(window.THEORY_EXTRA || []).forEach(t => {
  const blockIndex = extraTopicBlocks[t.topic] || 0;
  extraTopicBlocks[t.topic] = blockIndex + 1;
  const blockSuffix = blockIndex ? '-block-' + (blockIndex + 1) : '';
  t.items.forEach((x, i) => theoryIds.push('extra-' + t.topic + blockSuffix + '-' + i));
});
const duplicateTheoryIds = duplicates(theoryIds.map(id => ({ id })), x => x.id);
const checklistIdDuplicates = duplicates(checklist, x => x.id);

console.log('=== CONTENT QUALITY ===');
console.log('Theory     :', theory.length, '| malformed title/answer:', malformedTheory.length, '| exact duplicates:', duplicateTheory.length, '| duplicate IDs:', duplicateTheoryIds.length);
console.log('Quiz       :', quiz.length, '| explanation <=15 words:', shortQuiz.length, '| correct is longest:', weakLengthQuiz.length);
console.log('Checklist  :', checklist.length, '| junk:', badChecklist.length, '| exact duplicates:', duplicateChecklist.length, '| duplicate IDs:', checklistIdDuplicates.length);
console.log('Algorithms :', algo.length, '| incomplete:', badAlgo.length, '| duplicate names:', duplicateAlgoNames.length, '| duplicate LeetCode:', duplicateAlgoLeetCode.length);

console.log('\n=== DOMAIN DISTRIBUTION ===');
(window.LEARNING_DOMAINS || []).forEach(d => {
  const t = theory.filter(x => window.getLearningDomain(x.topic) === d.id).length;
  const q = quiz.filter(x => window.getLearningDomain(x.topic) === d.id).length;
  console.log(String(t).padStart(4), 'theory |', String(q).padStart(4), 'quiz |', d.title);
});

if (malformedTheory.length) {
  console.log('\n=== THEORY NEEDS CURATION (first 20) ===');
  malformedTheory.slice(0, 20).forEach(x => console.log('[' + x.topic + '] ' + x.question.replace(/\s+/g, ' ').slice(0, 180)));
}
if (shortQuiz.length) {
  console.log('\n=== SHORT QUIZ EXPLANATIONS (first 20) ===');
  shortQuiz.slice(0, 20).forEach(x => console.log('[' + x.topic + '] ' + x.question + ' ==> ' + x.explain));
}

// Lỗi cấu trúc chắc chắn khiến command thất bại; cảnh báo biên tập chỉ được báo cáo.
if (badChecklist.length || badAlgo.length || duplicateTheoryIds.length || checklistIdDuplicates.length
  || duplicateAlgoNames.length || duplicateAlgoLeetCode.length) process.exitCode = 1;
