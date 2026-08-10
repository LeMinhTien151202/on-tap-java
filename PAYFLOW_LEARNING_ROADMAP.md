# PAYFLOW LEARNING ROADMAP
## Kiến thức, khái niệm, công nghệ và cách áp dụng vào dự án Java Spring Boot Microservices

> **Dự án:** PayFlow – Event-Driven Payment Processing Platform  
> **Mục tiêu:** Học Java Backend/Microservices thông qua một dự án thực tế thay vì chỉ học lý thuyết rời rạc.  
> **Nguyên tắc:** Học khái niệm nào thì áp dụng ngay vào PayFlow ở đúng chỗ đó.

---

# 1. Bức tranh tổng thể của PayFlow

PayFlow là hệ thống xử lý thanh toán giả lập theo kiến trúc microservices.

Ví dụ khách hàng có:

```text
Balance = 1.000.000 VND
```

Khách thanh toán:

```text
500.000 VND
```

Luồng tổng quát:

```text
Client
   ↓
API Gateway
   ↓
Payment Service
   ↓
Risk Service
   ↓
Account Service
   ↓
Ledger Service
   ↓
Notification Service
   ↓
Email / Zalo / Webhook
```

Các vấn đề thực tế dự án cần giải quyết:

```text
Nếu client bấm thanh toán 2 lần thì sao?
Nếu Kafka gửi event 2 lần thì sao?
Nếu Account Service giữ tiền xong nhưng Ledger Service chết thì sao?
Nếu database commit thành công nhưng Kafka chưa publish event thì sao?
Nếu 2 request cùng lúc trừ một tài khoản thì sao?
Nếu notification gửi email thất bại thì sao?
Nếu VNPAY báo thành công nhưng callback đến muộn thì sao?
```

Toàn bộ kiến thức microservice trong PayFlow xoay quanh việc giải quyết các vấn đề trên.

---

# 2. Java Core cần nắm

## 2.1. OOP

Cần hiểu:

- Class
- Object
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Interface

Ví dụ PayFlow có nhiều payment provider:

```java
public interface PaymentProvider {
    PaymentResult pay(PaymentCommand command);
}
```

VNPAY:

```java
public class VnPayProvider implements PaymentProvider {
    @Override
    public PaymentResult pay(PaymentCommand command) {
        // Gọi VNPAY
        return result;
    }
}
```

Thanh toán số dư nội bộ:

```java
public class PayFlowBalanceProvider implements PaymentProvider {
    @Override
    public PaymentResult pay(PaymentCommand command) {
        // Xử lý balance
        return result;
    }
}
```

Khái niệm áp dụng:

```text
Abstraction + Polymorphism + Strategy Pattern
```

## 2.2. Interface và Dependency Injection

Không nên:

```java
public class PaymentService {
    private PaymentRepository repository = new PostgresPaymentRepository();
}
```

Nên:

```java
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
}
```

Ý tưởng:

```text
PaymentService
      ↓
PaymentRepository interface
      ↓
JpaPaymentRepository
```

Lợi ích:

- Dễ test.
- Giảm coupling.
- Dễ thay implementation.
- Phù hợp Clean/Hexagonal Architecture.

## 2.3. Collection Framework

Phải nắm:

```text
List
Set
Map
Queue
ArrayList
HashMap
HashSet
ConcurrentHashMap
```

Ví dụ:

```java
List<RiskRule> rules;
Set<Role> roles;
Map<PaymentMethod, PaymentProvider> providers;
```

Resolve provider:

```java
PaymentProvider provider = providers.get(PaymentMethod.VNPAY);
```

## 2.4. Generics

```java
public record ApiResponse<T>(
        T data,
        Meta meta
) {}
```

Dùng:

```java
ApiResponse<PaymentResponse>
ApiResponse<AccountResponse>
```

## 2.5. Exception Handling

Cần hiểu:

- Checked Exception.
- Unchecked Exception.
- Custom Exception.
- Global Exception Handler.

Ví dụ:

```java
public class InsufficientFundsException extends RuntimeException {
}
```

Service:

```java
if (account.getAvailableBalance().compareTo(amount) < 0) {
    throw new InsufficientFundsException();
}
```

Global handler:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<?> handle() {
        return ResponseEntity.status(409).body(...);
    }
}
```

Response:

```json
{
  "code": "ACCOUNT_INSUFFICIENT_FUNDS",
  "status": 409
}
```

## 2.6. Java Record

```java
public record CreatePaymentRequest(
        UUID customerId,
        BigDecimal amount,
        String currency
) {}
```

Có thể dùng cho:

- Request DTO.
- Response DTO.
- Command.
- Query.
- Event DTO.

## 2.7. BigDecimal

Không dùng `float` hoặc `double` cho tiền.

```java
BigDecimal balance = new BigDecimal("1000000");
BigDecimal payment = new BigDecimal("500000");
BigDecimal result = balance.subtract(payment);
```

Database:

```sql
NUMERIC(19,4)
```

Áp dụng:

- Payment amount.
- Account balance.
- Refund amount.
- Fee.
- Settlement.
- Ledger entry.

## 2.8. Enum và State Machine

```java
public enum PaymentStatus {
    CREATED,
    RISK_CHECKING,
    RESERVING_FUNDS,
    PROCESSING,
    SUCCEEDED,
    FAILED,
    CANCELLED,
    PARTIALLY_REFUNDED,
    REFUNDED
}
```

Luồng hợp lệ:

```text
CREATED
   ↓
RISK_CHECKING
   ↓
RESERVING_FUNDS
   ↓
PROCESSING
   ↓
SUCCEEDED
```

Không được cho phép:

```text
FAILED → SUCCEEDED
```

Khái niệm:

```text
Finite State Machine
```

---

# 3. Java Concurrency và Race Condition

Ví dụ balance:

```text
500.000
```

Hai payment đồng thời:

```text
Payment A = 400.000
Payment B = 400.000
```

Cả hai cùng đọc balance = 500.000. Nếu không kiểm soát, cả hai đều thanh toán và có thể khiến balance âm.

Đây là:

```text
Race Condition
```

Cần học:

- Thread.
- Race condition.
- Atomicity.
- Synchronization.
- Lock.
- Optimistic locking.
- Pessimistic locking.
- Database locking.
- Deadlock.

Trong PayFlow ưu tiên giải quyết concurrency số dư bằng database transaction/locking thay vì `synchronized`.

---

# 4. Spring Core

Cần hiểu:

```text
IoC
Dependency Injection
Bean
ApplicationContext
@Component
@Service
@Repository
@Configuration
@Bean
```

Ví dụ:

```java
@Service
public class PaymentService {
}
```

Spring quản lý instance của `PaymentService`. Đó là Spring Bean.

---

# 5. Spring Boot

Cần hiểu:

- Auto Configuration.
- Embedded Server.
- Dependency Management.
- External Configuration.
- Profiles.
- Actuator.

Ví dụ:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/payflow_payment
```

Spring Boot có thể cấu hình:

- DataSource.
- Hibernate.
- EntityManager.
- TransactionManager.

---

# 6. REST API và HTTP

## 6.1. HTTP Method

```text
GET
POST
PUT
PATCH
DELETE
```

PayFlow:

```http
POST /api/v1/payments
GET /api/v1/payments/{id}
POST /api/v1/payments/{id}/refunds
```

## 6.2. HTTP Status

| Status | Ứng dụng |
|---:|---|
| 200 | Query thành công |
| 201 | Tạo resource đồng bộ |
| 202 | Đã nhận request async |
| 400 | Input không hợp lệ |
| 401 | Chưa xác thực |
| 403 | Không có quyền |
| 404 | Không tồn tại |
| 409 | Conflict |
| 429 | Rate limit |
| 500 | Server error |
| 503 | Downstream unavailable |

Payment async có thể trả:

```http
202 Accepted
```

## 6.3. DTO và Entity

Không trả Entity trực tiếp.

```text
HTTP → Request DTO → Application → Domain → Entity
Entity → Mapper → Response DTO → HTTP
```

---

# 7. PostgreSQL và SQL

Cần chắc:

- Table.
- Primary Key.
- Foreign Key.
- Unique.
- Index.
- Constraint.
- Join.
- Group By.
- Aggregate.
- Transaction.
- Isolation Level.
- Lock.
- Execution Plan.

Ví dụ:

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    merchant_id UUID NOT NULL,
    amount NUMERIC(19,4) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
```

Index:

```sql
CREATE INDEX idx_payment_merchant_created
ON payments(merchant_id, created_at DESC);
```

---

# 8. JPA / Hibernate

Phân biệt:

```text
JPA = specification
Hibernate = JPA implementation
Spring Data JPA = abstraction giúp viết repository
```

Entity:

```java
@Entity
@Table(name = "payments")
public class PaymentEntity {

    @Id
    private UUID id;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
}
```

Repository:

```java
public interface PaymentJpaRepository
        extends JpaRepository<PaymentEntity, UUID> {
}
```

Cần học thêm:

- Lazy loading.
- Eager loading.
- N+1 problem.
- Entity lifecycle.
- Persistence context.
- Dirty checking.
- Cascade.
- Fetch join.

---

# 9. Database Transaction

```java
@Transactional
public void reserve(UUID accountId, BigDecimal amount) {
    Account account = accountRepository.findById(accountId);
    account.reserve(amount);
    reservationRepository.save(...);
    outboxRepository.save(...);
}
```

Ta muốn:

```text
Update Account
+
Create Reservation
+
Create Outbox
```

Hoặc tất cả commit hoặc tất cả rollback.

---

# 10. ACID

## Atomicity
Hoặc tất cả thành công hoặc rollback.

## Consistency
Database luôn đúng constraint.

Ví dụ:

```text
available_balance >= 0
```

## Isolation
Transaction không làm hỏng nhau.

## Durability
Commit rồi thì dữ liệu phải được lưu bền vững.

---

# 11. Isolation Level

Cần hiểu:

```text
READ UNCOMMITTED
READ COMMITTED
REPEATABLE READ
SERIALIZABLE
```

Các vấn đề:

```text
Dirty Read
Non-repeatable Read
Phantom Read
Lost Update
```

PayFlow đặc biệt quan tâm Lost Update.

---

# 12. Optimistic Lock

```java
@Version
private Long version;
```

Nếu hai transaction cùng sửa một version, transaction sau có thể bị reject khi version đã thay đổi.

Phù hợp khi conflict không quá thường xuyên.

---

# 13. Pessimistic Lock

```sql
SELECT *
FROM accounts
WHERE id = ?
FOR UPDATE;
```

Transaction khác phải chờ.

Nhược điểm:

- Giảm throughput.
- Có thể deadlock.
- Lock contention.

---

# 14. Microservices

Các service:

```text
Payment Service
Account Service
Ledger Service
Risk Service
Notification Service
```

Mỗi service có:

- Responsibility riêng.
- Deploy riêng.
- Database riêng.
- Scale riêng.
- Failure riêng.

---

# 15. Bounded Context

## Payment Context

```text
payment
refund
payment status
```

## Account Context

```text
account
balance
reservation
```

## Ledger Context

```text
journal
debit
credit
```

Payment Service không trực tiếp update Account DB.

---

# 16. Database per Service

```text
Payment Service → Payment DB
Account Service → Account DB
Ledger Service → Ledger DB
```

Local có thể chạy cùng PostgreSQL server nhưng schema/database tách biệt.

---

# 17. Synchronous Communication

Ví dụ:

```text
Payment Service
      ↓ HTTP
Merchant Service
```

Công nghệ:

- RestClient.
- WebClient.
- OpenFeign.

Ưu:

- Dễ hiểu.
- Response ngay.

Nhược:

- Coupling.
- Latency.
- Cascade failure.
- Service chain.

---

# 18. Asynchronous Communication

```text
Payment
 ↓ Kafka
Risk
 ↓ Kafka
Account
 ↓ Kafka
Ledger
```

Đây là Event-driven Architecture.

---

# 19. Kafka

Phải hiểu:

- Broker.
- Cluster.
- Topic.
- Partition.
- Producer.
- Consumer.
- Consumer Group.
- Offset.
- Replication.
- Leader.
- Follower.
- Key.
- Retention.

Topic ví dụ:

```text
payflow.payment.events.v1
```

---

# 20. Kafka Producer

```java
kafkaTemplate.send(
    "payflow.payment.events.v1",
    paymentId.toString(),
    event
);
```

```text
Topic = payment.events
Key   = paymentId
Value = event
```

---

# 21. Kafka Consumer

```java
@KafkaListener(
    topics = "payflow.payment.events.v1",
    groupId = "risk-service"
)
public void consume(PaymentCreatedEvent event) {
    riskService.evaluate(event);
}
```

---

# 22. Consumer Group

Ba instance Risk Service:

```text
Risk-1
Risk-2
Risk-3
```

Cùng:

```text
group.id = risk-service
```

Kafka có thể chia partition:

```text
P0 → Risk-1
P1 → Risk-2
P2 → Risk-3
```

---

# 23. Offset

Ví dụ:

```text
P0:
offset 100
offset 101
offset 102
```

Consumer commit 101 thì lần sau tiếp tục từ vị trí tiếp theo theo cơ chế consumer group/offset.

---

# 24. Delivery Semantics

## At-most-once

```text
Có thể mất message
Ít duplicate
```

## At-least-once

```text
Ưu tiên không mất message
Có thể duplicate
```

## Exactly-once

Hiệu quả xử lý đúng một lần trong phạm vi được hỗ trợ.

Lưu ý: Kafka transaction không tự giải quyết transaction giữa Kafka và PostgreSQL.

PayFlow vẫn cần:

```text
Transactional Outbox
+
Idempotent Consumer
```

---

# 25. Idempotency

Request:

```http
POST /payments
Idempotency-Key: abc123
```

Client timeout rồi gửi lại.

Không có idempotency:

```text
Payment #1 = 500k
Payment #2 = 500k
```

Có idempotency:

```text
Request #1 → PAYMENT-001
Request #2 → PAYMENT-001
```

Lưu:

```text
idempotency_key
request_hash
payment_id
response
```

---

# 26. Idempotent Consumer

Kafka có thể giao lại `payment.succeeded`.

Nếu Notification xử lý hai lần:

```text
Email gửi 2 lần
Zalo gửi 2 lần
```

Giải pháp:

```text
processed_events
```

Unique:

```text
(event_id, consumer_name)
```

---

# 27. Distributed Transaction

Monolith:

```text
BEGIN
UPDATE account
INSERT ledger
UPDATE payment
COMMIT
```

Microservice:

```text
Payment DB
Account DB
Ledger DB
```

Không thể chỉ dùng `@Transactional` bao phủ toàn hệ thống.

Đây là Distributed Transaction Problem.

---

# 28. Eventual Consistency

```text
10:00:00.000 Payment = PROCESSING
10:00:00.100 Account = RESERVED
10:00:00.200 Ledger = CREATED
10:00:00.300 Payment = SUCCEEDED
```

Trong khoảng thời gian ngắn, các service chưa đồng bộ tuyệt đối. Cuối cùng đạt consistency.

---

# 29. Saga Pattern

Workflow:

```text
1. Risk approve
2. Reserve balance
3. Create ledger
4. Complete payment
```

Nếu Ledger lỗi:

```text
Reserve thành công
↓
Ledger thất bại
↓
Release balance
```

`Release balance` là Compensating Transaction.

---

# 30. Saga Choreography

```text
PaymentCreated → Risk
RiskApproved → Account
FundsReserved → Ledger
```

Ưu:

- Loose coupling.

Nhược:

- Khó theo dõi workflow dài.

---

# 31. Saga Orchestration

```text
Payment Saga
     ↓
Risk
     ↓
Account
     ↓
Ledger
```

PayFlow nên ưu tiên orchestration để dễ học và debug.

---

# 32. Transactional Outbox

Sai:

```java
paymentRepository.save(payment);
kafkaTemplate.send(event);
```

Có thể xảy ra:

```text
DB save thành công
↓
Service crash
↓
Kafka chưa gửi
↓
Mất event
```

Outbox:

```text
BEGIN TRANSACTION
INSERT payment
INSERT outbox_event
COMMIT
```

Sau đó:

```text
Outbox Worker
    ↓
Kafka
```

---

# 33. Inbox Pattern / Processed Events

```text
Outbox → chống mất event ở producer
Inbox / Processed Events → chống xử lý trùng ở consumer
```

---

# 34. Retry

Có thể retry:

- HTTP 503.
- Network timeout.
- Kafka transient error.
- Provider temporary failure.

Không nên retry:

- Validation error.
- Insufficient funds.
- Permission denied.
- Business rule bị từ chối.

Backoff:

```text
attempt 1
↓ 1s
attempt 2
↓ 2s
attempt 3
↓ 4s
```

Đây là Exponential Backoff.

---

# 35. Dead Letter Topic

```text
Kafka
 ↓
Consumer
 ↓ failed
Retry
 ↓ failed
Retry
 ↓ failed
DLT
```

Ví dụ:

```text
payflow.payment.events.dlt
```

---

# 36. Redis

Redis không phải source of truth của tiền.

PostgreSQL vẫn giữ dữ liệu tài chính chính.

Redis dùng:

- Cache.
- Rate limiting.
- Risk counter.
- Temporary state.
- Session/token state khi cần.

---

# 37. Cache Aside

```text
Request
 ↓
Redis
 ↓ miss
PostgreSQL
 ↓
Redis cache
```

Ví dụ:

```text
merchant configuration
```

---

# 38. TTL

```text
merchant:123
TTL = 5 phút
```

Redis tự xóa key sau TTL.

---

# 39. Rate Limiting

```text
Merchant A:
100 request/phút
```

Request thứ 101:

```http
429 Too Many Requests
```

---

# 40. Risk velocity bằng Redis

Rule:

```text
> 5 payment trong 1 phút
```

Redis:

```text
risk:user:123:payment:1m = 6
```

Risk Service:

```text
score += 40
```

---

# 41. Security sau khi bỏ Keycloak

Identity Service cần:

- Authentication.
- Authorization.
- JWT.
- Access Token.
- Refresh Token.
- RBAC.
- Password hashing.
- Public/private key.

---

# 42. Authentication vs Authorization

Authentication:

```text
Bạn là ai?
```

Authorization:

```text
Bạn được phép làm gì?
```

Ví dụ role:

```text
CUSTOMER
MERCHANT_ADMIN
OPERATIONS
```

---

# 43. JWT

```text
Client
 ↓ username/password
Identity Service
 ↓
Access Token
```

JWT ví dụ:

```json
{
  "sub": "USER-123",
  "roles": ["CUSTOMER"],
  "exp": 1780000000
}
```

Client:

```http
Authorization: Bearer eyJ...
```

---

# 44. RSA JWT

```text
Identity Service
     ↓
Private Key
     ↓ sign

Gateway / Payment / Account / Ledger
     ↓
Public Key
     ↓ verify
```

Private key chỉ nằm trong Identity Service.

---

# 45. Refresh Token

Ví dụ:

```text
Access token = 15 phút
Refresh token = 7 ngày
```

Nên học:

- Refresh Token Rotation.
- Token Reuse Detection.
- Token Revocation.

---

# 46. Password Hashing

Không lưu plaintext password.

Dùng:

```text
BCrypt
Argon2
```

Database:

```text
password_hash
```

---

# 47. RBAC

Roles:

```text
CUSTOMER
MERCHANT_USER
MERCHANT_ADMIN
RISK_ANALYST
OPERATIONS
ADMIN
```

Ví dụ:

```java
@PreAuthorize("hasRole('OPERATIONS')")
```

---

# 48. API Gateway

```text
Internet
   ↓
API Gateway
   ↓
Microservices
```

Nhiệm vụ:

- Routing.
- Authentication.
- Rate limiting.
- CORS.
- Correlation ID.
- Request logging.

Không đặt business logic payment vào Gateway.

---

# 49. Payment Domain

Cần học:

- Payment.
- Payment Method.
- Payment Provider.
- Authorization.
- Reserve.
- Capture.
- Release.
- Refund.
- Partial Refund.
- Merchant.
- Settlement.
- Reconciliation.
- Fee.

---

# 50. Reserve / Hold

Balance:

```text
1.000.000
```

Payment:

```text
500.000
```

Sau reserve:

```text
Available = 500.000
Reserved  = 500.000
```

---

# 51. Capture

Payment thành công:

```text
Reserved = 500.000
```

Capture:

```text
Reserved → 0
```

Ledger ghi giao dịch.

---

# 52. Release

Nếu Ledger lỗi:

```text
Available: 500.000 → 1.000.000
Reserved:  500.000 → 0
```

Đây là Saga Compensation.

---

# 53. Refund

Payment:

```text
500.000
```

Refund 200.000:

```text
PARTIALLY_REFUNDED
```

Refund thêm 300.000:

```text
REFUNDED
```

Không được:

```text
Total refund > 500.000
```

---

# 54. Ledger

Không chỉ:

```text
balance -= 500000
```

Mà cần lưu bút toán:

```text
Journal PAYMENT-001

DEBIT Customer Account    500.000
CREDIT Merchant Account  490.000
CREDIT Fee Revenue         10.000
```

Invariant:

```text
DEBIT = CREDIT
```

---

# 55. Double-entry Accounting

Nguyên tắc:

```text
Không sửa journal đã posted.
```

Nếu sai:

```text
Original Journal
+
Reversal Journal
```

Ledger nên immutable.

---

# 56. Settlement

Trong ngày:

```text
Payment        = 100.000.000
Refund         =   5.000.000
Fee            =   2.000.000
```

Net:

```text
93.000.000
```

Settlement Service tạo Settlement Batch.

---

# 57. Reconciliation

PayFlow:

```text
Payment A = SUCCESS
```

Provider:

```text
Payment A = FAILED
```

Có mismatch.

Reconciliation:

```text
PayFlow DB
    ↕
Provider Record
```

Nếu khác:

```text
RECONCILIATION_REQUIRED
```

---

# 58. Payment Provider Adapter

Provider:

```text
PAYFLOW_BALANCE
VNPAY
MOMO
```

Interface:

```java
interface PaymentProvider {
    PaymentResult initiate(...);
    PaymentStatus query(...);
    RefundResult refund(...);
}
```

Pattern:

```text
Adapter + Strategy + Factory
```

---

# 59. Callback / Webhook / IPN

```text
VNPAY
 ↓ HTTP
PayFlow callback endpoint
```

PayFlow phải:

```text
1. Verify signature
2. Verify amount
3. Verify transaction ID
4. Check duplicate callback
5. Update provider transaction
6. Publish event
```

Không chỉ tin redirect của browser.

---

# 60. Notification Service

```text
payment.succeeded
      ↓
Kafka
      ↓
Notification Service
      ↓
 ┌────┼─────┐
Email Zalo Webhook
```

Payment Service không gửi email trực tiếp.

Đây là Loose Coupling.

---

# 61. Email

Cần học:

- SMTP.
- Spring Mail.
- HTML Template.
- Retry.
- Timeout.
- Delivery Status.

Local:

```text
MailHog / Mailpit
```

---

# 62. Zalo

Coi Zalo là Notification Provider.

```java
public interface NotificationProvider {
    NotificationChannel channel();
    SendResult send(NotificationCommand command);
}
```

Implementation:

```text
EmailProvider
ZaloProvider
WebhookProvider
```

---

# 63. Webhook

Merchant:

```text
https://merchant.com/webhooks/payflow
```

PayFlow gửi:

```json
{
  "eventType": "payment.succeeded",
  "paymentId": "PAY-123"
}
```

Phải có:

- HMAC signature.
- Event ID.
- Retry.
- Timeout.
- Deduplication.
- Delivery history.

---

# 64. Resilience

Cần hiểu:

```text
Timeout
Retry
Circuit Breaker
Bulkhead
Fallback
```

---

# 65. Timeout

Ví dụ:

```text
Connect timeout = 2s
Read timeout = 5s
```

Không để service chờ vô hạn.

---

# 66. Circuit Breaker

```text
CLOSED
 ↓ lỗi nhiều
OPEN
 ↓
Không gọi downstream tạm thời
 ↓
HALF_OPEN
 ↓ test lại
CLOSED
```

Công nghệ:

```text
Resilience4j
```

---

# 67. Observability

Ba trụ:

```text
Logs
Metrics
Traces
```

---

# 68. Structured Logging

```json
{
  "service": "payment-service",
  "paymentId": "PAY-123",
  "correlationId": "ABC",
  "status": "SUCCEEDED"
}
```

Không log:

- Password.
- JWT.
- API secret.
- Private key.

---

# 69. Metrics

Ví dụ:

```text
payment_success_total
payment_failure_total
payment_duration
kafka_consumer_lag
outbox_pending_total
webhook_failure_total
```

Prometheus thu thập, Grafana hiển thị.

---

# 70. Distributed Tracing

```text
Gateway
 ↓
Payment
 ↓ Kafka
Risk
 ↓ Kafka
Account
 ↓
Ledger
```

Dùng chung:

```text
traceId = ABC123
```

Công nghệ:

```text
OpenTelemetry
Tempo / Jaeger
```

---

# 71. Prometheus + Grafana + Loki + Tempo

```text
Prometheus → Metrics
Grafana    → Dashboard
Loki       → Logs
Tempo      → Traces
```

---

# 72. Docker

Cần hiểu:

- Image.
- Container.
- Dockerfile.
- Volume.
- Network.
- Port.
- Environment Variable.
- Docker Compose.

---

# 73. Docker Compose

```bash
docker compose --profile mvp up -d
```

Có thể chạy:

```text
Kafka
Postgres
Redis
Services
```

Khác nhau:

```bash
docker compose up --build
```

Build lại image.

```bash
docker compose up --no-build
```

Dùng image đã build.

---

# 74. Kubernetes

Học sau khi Docker Compose ổn.

Cần hiểu:

- Pod.
- Deployment.
- Service.
- ConfigMap.
- Secret.
- Ingress.
- Replica.
- HPA.
- Probe.
- Namespace.

Ví dụ:

```text
Payment Deployment
replicas = 3
```

---

# 75. Liveness và Readiness

Liveness:

```text
Ứng dụng còn sống không?
```

Readiness:

```text
Ứng dụng đã sẵn sàng nhận traffic chưa?
```

Spring Boot:

```text
/actuator/health/liveness
/actuator/health/readiness
```

---

# 76. Testing Strategy

Cần hiểu:

```text
Unit Test
Integration Test
Component Test
Contract Test
End-to-End Test
Load Test
Failure Test
```

---

# 77. Unit Test

```java
@Test
void shouldRejectHighRiskPayment() {
    var result = riskService.evaluate(payment);
    assertThat(result.decision()).isEqualTo(REJECTED);
}
```

---

# 78. Integration Test

Test:

```text
Payment Service
+
PostgreSQL thật
+
Kafka thật
+
Redis thật
```

Công nghệ:

```text
Testcontainers
```

---

# 79. Concurrent Test

Account:

```text
500.000
```

100 thread cùng thanh toán.

Cuối test:

```text
balance >= 0
```

---

# 80. Failure Test

Giả lập:

```text
Account reserve thành công
↓
Ledger Service chết
↓
Saga timeout
↓
Compensation
↓
Account release
```

Assert:

```text
Payment FAILED
Available Balance restored
```

---

# 81. Design Pattern cần học

| Pattern | Áp dụng |
|---|---|
| Strategy | Chọn Payment Provider |
| Adapter | VNPAY / MoMo / Zalo |
| Factory | Resolve provider |
| Repository | Persistence abstraction |
| Saga | Distributed transaction |
| Outbox | Reliable event publishing |
| Inbox | Consumer deduplication |
| Circuit Breaker | Downstream failure |
| Retry | Transient failure |
| Cache Aside | Redis caching |
| CQRS nhẹ | Reporting/read model |
| State Machine | Payment status |

---

# 82. Clean / Hexagonal Architecture

```text
payment/
├── api
├── application
├── domain
└── infrastructure
```

## Domain

```text
Payment
PaymentStatus
Payment rules
```

## Application

```text
CreatePaymentUseCase
RefundPaymentUseCase
```

## Infrastructure

```text
PostgreSQL
Kafka
Redis
VNPAY
```

## API

```text
REST Controller
Request DTO
Response DTO
```

Nguyên tắc:

```text
Domain không phụ thuộc vào PostgreSQL, Kafka hoặc Controller.
```

---

# 83. CI/CD

```text
Developer Push
 ↓
GitHub
 ↓
Compile
 ↓
Unit Test
 ↓
Integration Test
 ↓
Static Analysis
 ↓
Build Docker
 ↓
Push Registry
 ↓
Deploy
```

Công nghệ:

- GitHub Actions.
- Docker Registry/GHCR.
- SonarQube.
- Kubernetes.

---

# 84. Mức độ ưu tiên kiến thức

## Tier 1 — Bắt buộc rất chắc

```text
Java Core
Spring Core
Spring Boot
Spring Security
REST
PostgreSQL
JPA/Hibernate
Database Transaction
Locking
Docker
```

## Tier 2 — Linh hồn Microservices

```text
Microservices
Kafka
Event-driven Architecture
Idempotency
Eventual Consistency
Saga
Transactional Outbox
Redis
Resilience
```

## Tier 3 — Làm portfolio nổi bật

```text
Payment Domain
Double-entry Ledger
Settlement
Reconciliation
Distributed Tracing
Prometheus/Grafana
Testcontainers
Kubernetes
VNPAY
Email
Zalo
Webhook
```

---

# 85. Thứ tự học và code

## Phase 1 — Java/Spring nền tảng

```text
Java Core
↓
OOP
↓
Collections
↓
Exception
↓
Spring Core
↓
Spring Boot
↓
REST
```

## Phase 2 — Database

```text
PostgreSQL
↓
SQL
↓
JPA/Hibernate
↓
Transaction
↓
Isolation
↓
Locking
```

## Phase 3 — Domain cơ bản

```text
Payment Service
↓
Account Service
↓
Ledger
```

## Phase 4 — Microservices

```text
Microservice principles
↓
Database per service
↓
HTTP communication
↓
API Gateway
```

## Phase 5 — Kafka

```text
Kafka basic
↓
Producer
↓
Consumer
↓
Topic
↓
Partition
↓
Consumer Group
↓
Offset
```

## Phase 6 — Distributed Systems

```text
Eventual Consistency
↓
Idempotency
↓
Outbox
↓
Inbox
↓
Saga
↓
Compensation
```

## Phase 7 — Redis và Risk

```text
Redis
↓
Cache
↓
Rate limit
↓
Risk counters
```

## Phase 8 — Security

```text
Identity Service
↓
Spring Security
↓
JWT
↓
Refresh Token
↓
RBAC
```

## Phase 9 — Notification

```text
Notification Service
↓
Email
↓
Webhook
↓
Zalo
```

## Phase 10 — External Payment

```text
VNPAY Sandbox
↓
Signature
↓
Callback / IPN
↓
Query status
↓
Refund
↓
Reconciliation
```

## Phase 11 — Testing

```text
Unit Test
↓
Integration Test
↓
Testcontainers
↓
Concurrent Test
↓
Failure Test
↓
Load Test
```

## Phase 12 — DevOps

```text
Docker
↓
Docker Compose
↓
Observability
↓
Kubernetes
↓
CI/CD
```

---

# 86. Luồng thanh toán cuối cùng cần hiểu

Nhà tuyển dụng hỏi: **Một payment trong PayFlow chạy như thế nào?**

Bạn phải giải thích được:

```text
1. Client gửi POST /payments kèm Idempotency-Key.

2. API Gateway xác minh JWT và role.

3. Payment Service kiểm tra idempotency.

4. Payment và Outbox Event được lưu trong cùng PostgreSQL transaction.

5. Outbox Publisher publish payment.created lên Kafka.

6. Risk Service consume event và đánh giá rule.

7. Nếu approve, Payment Saga yêu cầu Account Service reserve tiền.

8. Account Service dùng transaction + locking để tránh race condition.

9. Account lưu Reservation và Outbox Event.

10. Ledger Service tạo double-entry journal.

11. Nếu Ledger thành công: Payment chuyển SUCCEEDED.

12. Nếu Ledger thất bại: Saga chạy compensation và Account release tiền.

13. Notification Service consume payment.succeeded.

14. Notification Service gửi Email / Zalo / Merchant Webhook.

15. Reporting Service cập nhật read model.

16. Settlement Service tổng hợp giao dịch.

17. Reconciliation kiểm tra chênh lệch với payment provider ngoài.

18. Toàn bộ luồng có correlationId và traceId để quan sát.
```

---

# 87. 10 khái niệm quan trọng nhất của PayFlow

```text
1. Database Transaction
2. Concurrency + Locking
3. Kafka Partition / Consumer Group / Offset
4. Idempotency
5. Eventual Consistency
6. Saga Pattern
7. Transactional Outbox
8. Double-entry Ledger
9. Retry / Circuit Breaker / DLT
10. Distributed Tracing
```

---

# 88. Câu hỏi tự kiểm tra

## Java/Spring

- Dependency Injection giải quyết vấn đề gì?
- `@Service` khác object `new` thủ công như thế nào?
- Tại sao DTO không nên dùng chung với Entity?
- Tại sao tiền phải dùng `BigDecimal`?

## Database

- `@Transactional` thực sự bao phủ những gì?
- Isolation Level là gì?
- Lost Update xảy ra thế nào?
- Optimistic Lock và Pessimistic Lock khác nhau ra sao?
- Khi nào dùng `FOR UPDATE`?

## Kafka

- Topic khác Partition như thế nào?
- Consumer Group để làm gì?
- Offset là gì?
- Tại sao Kafka có thể giao lại message?
- Kafka key ảnh hưởng tới partition như thế nào?

## Distributed Systems

- Eventual Consistency khác Strong Consistency thế nào?
- Tại sao `@Transactional` không giải quyết distributed transaction?
- Saga giải quyết gì?
- Compensation là gì?
- Outbox giải quyết dual-write problem thế nào?
- Idempotency khác unique constraint như thế nào?

## Payment

- Reserve khác Capture như thế nào?
- Refund khác Release như thế nào?
- Ledger khác Balance như thế nào?
- Settlement và Reconciliation khác nhau ra sao?
- Vì sao callback provider không được xử lý mù?

## Security

- Authentication khác Authorization ra sao?
- JWT được ký và verify như thế nào?
- Access Token và Refresh Token khác nhau thế nào?
- Refresh Token Rotation dùng để làm gì?
- RBAC giải quyết vấn đề gì?

## DevOps

- Docker Image khác Container?
- Docker Compose khác Kubernetes?
- Liveness khác Readiness?
- Metrics, Logs và Traces khác nhau ra sao?
- Testcontainers giúp gì cho integration test?

---

# 89. Mục tiêu sau khi hoàn thành roadmap

Bạn phải có khả năng:

- Tự thiết kế một REST API chuẩn.
- Hiểu transaction database.
- Xử lý race condition.
- Thiết kế database đúng index/constraint.
- Dùng Spring Security + JWT.
- Xây nhiều Spring Boot service.
- Giao tiếp sync và async.
- Dùng Kafka producer/consumer.
- Hiểu partition, offset, consumer group.
- Thiết kế event idempotent.
- Áp dụng Outbox.
- Áp dụng Saga.
- Xử lý compensation.
- Dùng Redis đúng vai trò.
- Thiết kế Payment/Account/Ledger.
- Tích hợp VNPAY sandbox.
- Gửi Email/Zalo/Webhook bất đồng bộ.
- Dùng Retry/Circuit Breaker.
- Viết integration/failure/concurrent test.
- Docker hóa hệ thống.
- Theo dõi metrics/logs/traces.
- Deploy bằng Kubernetes.
- Giải thích kiến trúc rõ ràng trong phỏng vấn.

---

# 90. Nguyên tắc học cuối cùng

Không học Java, Kafka, Redis, Saga, Kubernetes như các môn độc lập.

Hãy học theo vấn đề:

```text
"Client gửi request hai lần"
→ Idempotency

"Hai request trừ tiền cùng lúc"
→ Transaction + Locking

"DB commit nhưng Kafka chưa gửi"
→ Outbox

"Kafka gửi event lại"
→ Idempotent Consumer

"Ledger lỗi sau khi giữ tiền"
→ Saga + Compensation

"Email/Zalo lỗi"
→ Retry + DLT + Circuit Breaker

"Không biết request lỗi ở service nào"
→ Distributed Tracing

"Provider báo khác DB"
→ Reconciliation
```

---

# 91. Stack công nghệ gợi ý

```text
Java 21
Spring Boot
Spring Security
Spring Data JPA
Spring Cloud Gateway
Spring Kafka
PostgreSQL
Redis
Flyway
MapStruct
Resilience4j
Testcontainers
Docker
Docker Compose
Kubernetes
OpenTelemetry
Prometheus
Grafana
Loki
Tempo / Jaeger
GitHub Actions
VNPAY Sandbox
Spring Mail
Zalo Provider Adapter
```

---

# 92. Kết luận

PayFlow không chỉ là một dự án CRUD.

Dự án này nên được dùng để học ba nhóm kiến thức lớn:

```text
1. Backend Application Engineering
   Java + Spring + PostgreSQL + Security

2. Distributed Systems Engineering
   Kafka + Saga + Outbox + Idempotency + Resilience

3. Fintech / Payment Domain Engineering
   Balance + Reservation + Ledger + Refund
   + Settlement + Reconciliation
```

Nếu hiểu được ba nhóm trên và có thể demo một luồng payment có happy path, failure path, duplicate handling, compensation, monitoring và test, dự án đã đủ mạnh để thể hiện năng lực Java Backend/Microservices trong portfolio.
