// Quét từ khóa sơ bộ giữa roadmap PayFlow và dữ liệu ôn tập.
// LƯU Ý: kết quả chỉ chứng minh từ khóa xuất hiện, không chứng minh nội dung đúng hoặc đủ sâu.
// Ví dụ "reconciliation" của React không đồng nghĩa với đối soát thanh toán.
global.window = {};
require('../data/quiz-data.js');
require('../data/theory-extra.js');
require('../data/theory-data.js');

const q = window.QUIZ_DATA, t = window.THEORY_EXTRA, td = window.THEORY_DATA;
const corpus = [];
q.forEach(x => corpus.push(x.question + ' ' + x.options.join(' ') + ' ' + x.explain));
t.forEach(p => p.items.forEach(i => corpus.push(p.topic + ' ' + i.question + ' ' + i.answer + ' ' + (i.examples || []).join(' '))));
td.forEach(p => (p.items || []).forEach(i => corpus.push((i.question || '') + ' ' + (i.answer || ''))));
const C = corpus.join('\n');

const checks = {
  'Java Record': /java record|record\b.*(DTO|bất biến)/i,
  'BigDecimal / tiền': /BigDecimal/i,
  'Enum & State Machine': /state machine|finite state|máy trạng thái/i,
  'Optimistic Lock @Version': /optimistic lock|@Version|lạc quan/i,
  'Pessimistic Lock FOR UPDATE': /pessimistic|FOR UPDATE|bi quan/i,
  'Isolation Level': /isolation level|READ COMMITTED|REPEATABLE READ/i,
  'Lost Update / Phantom': /lost update|phantom read|dirty read/i,
  'ACID': /ACID/i,
  'Deadlock': /deadlock/i,
  'Idempotency-Key API': /idempotency|idempotent/i,
  'Transactional Outbox': /outbox/i,
  'Inbox / processed_events': /inbox pattern|processed_events/i,
  'Saga + Compensation': /saga|compensat/i,
  'Eventual Consistency': /eventual consistency|nhất quán cuối/i,
  'Dual-write problem': /dual write|dual-write/i,
  'Delivery semantics': /at-least-once|exactly-once/i,
  'DLQ / DLT': /dead letter|DLQ|DLT/i,
  'Retry + exponential backoff': /exponential backoff|backoff/i,
  'Circuit Breaker / Resilience4j': /circuit breaker|resilience4j|bulkhead/i,
  'Timeout connect/read': /read timeout|connect timeout/i,
  'OpenFeign / WebClient': /OpenFeign|Feign|WebClient|RestClient/i,
  'API Gateway': /api gateway|spring cloud gateway/i,
  'Bounded Context / DDD': /bounded context|domain-driven/i,
  'Database per service': /database per service|database riêng/i,
  'Clean / Hexagonal Architecture': /hexagonal|clean architecture/i,
  'CQRS / read model': /CQRS|read model/i,
  'Reserve / Capture / Release': /\breserve\b|\bcapture\b/i,
  'Refund / partial refund': /refund|hoàn tiền/i,
  'Double-entry Ledger': /double-entry|bút toán|ledger/i,
  'Settlement': /settlement/i,
  'Reconciliation': /reconciliation/i,
  'Webhook / callback / IPN': /webhook|\bIPN\b/i,
  'HMAC signature': /HMAC/i,
  'VNPAY / payment provider': /VNPAY|MoMo/i,
  'JWT RSA public/private key': /RS256|RSA/i,
  'Refresh token rotation': /rotation|token reuse/i,
  'RBAC / @PreAuthorize': /RBAC|@PreAuthorize|hasRole/i,
  'Actuator / liveness / readiness': /actuator|liveness|readiness/i,
  'Prometheus / Grafana': /prometheus|grafana/i,
  'OpenTelemetry / tracing': /opentelemetry|distributed tracing|traceId|jaeger|tempo/i,
  'Testcontainers': /testcontainers/i,
  'Contract test': /contract test|\bpact\b/i,
  'Flyway / migration': /flyway|liquibase/i,
  'MapStruct': /mapstruct/i,
  'Kafka partition key': /partition key|kafka key/i,
  'Consumer lag': /consumer lag/i,
  'Rate limiting': /rate limit/i,
  'Cache aside / TTL': /cache aside|cache-aside|TTL/i,
};

const have = [], miss = [];
Object.entries(checks).forEach(([k, re]) => (re.test(C) ? have : miss).push(k));
console.log('=== DA CO (' + have.length + ') ===');
have.forEach(x => console.log('  v ' + x));
console.log('=== CHUA CO (' + miss.length + ') ===');
miss.forEach(x => console.log('  X ' + x));
