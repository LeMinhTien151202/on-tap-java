global.window = {};
require('../data/quiz-data.js');
require('../data/theory-extra.js');
const q = window.QUIZ_DATA, t = window.THEORY_EXTRA;

const suspects = {
  'Reconciliation': /reconciliation/i,
  'Refund': /refund|hoàn tiền/i,
  'VNPAY/MoMo': /VNPAY|MoMo/i,
  'HMAC': /HMAC/i,
  'CQRS': /CQRS/i,
  'Database per service': /database per service|database riêng/i,
  'Outbox': /outbox/i,
  'Saga': /saga/i,
  'Idempotency': /idempoten/i,
  'Circuit Breaker': /circuit breaker|resilience4j/i,
  'Actuator/liveness': /actuator|liveness|readiness/i,
  'Tracing': /opentelemetry|traceId|jaeger|tempo|distributed tracing/i,
  'MapStruct': /mapstruct/i,
  'RSA/RS256': /RS256|RSA/i,
  'Rotation': /rotation|token reuse/i,
};

Object.entries(suspects).forEach(([k, re]) => {
  const qs = q.filter(x => re.test(x.question + x.options.join(' ') + x.explain));
  const ts = [];
  t.forEach(p => p.items.forEach(i => {
    if (re.test(i.question + i.answer + (i.examples || []).join(' '))) ts.push(p.topic + ' > ' + i.question.slice(0, 60));
  }));
  console.log('\n### ' + k + '  -> quiz:' + qs.length + '  theory:' + ts.length);
  qs.slice(0, 3).forEach(x => console.log('   Q [' + x.topic + '] ' + x.question.slice(0, 70)));
  ts.slice(0, 3).forEach(x => console.log('   T ' + x));
});
