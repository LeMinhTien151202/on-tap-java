// Bổ sung đợt 2 cho PayFlow: refund workflow, shared libs/contract, error contract & config,
// state machine/idempotency/risk policy, bảng quyết định, governance & pitch.
// Dùng: node tools/theory_append.js tools/patch/theoryPayflow2.js
module.exports = [
  {
    topic: "PayFlow — refund workflow & thứ tự tài chính",
    items: [
      {
        question: "Chuỗi 5 event của refund trong PayFlow là gì và vì sao phải theo đúng thứ tự đó?",
        answer: "Thứ tự bị khoá bởi ADR-021: Payment → Ledger `refund.requested`; Ledger → Payment `ledger.refund-posted`; Payment → Account `account.refund-credit.requested`; Account → Payment `account.refund-credited`; Payment → mọi người `refund.succeeded`.\n\nMột refund đụng vào BA fact thuộc ba owner khác nhau: Payment sở hữu hạn mức và vòng đời refund, Ledger sở hữu journal kế toán bất biến, Account sở hữu số dư khả dụng của khách. Không có distributed transaction xuyên ba ranh giới đó, nên thứ tự chính là thứ bảo đảm tính đúng.\n\nHai phương án bị loại và lý do:\n\n1. **Credit trước, ghi sổ sau** — trả tiền tiêu được cho khách TRƯỚC khi tồn tại fact kế toán. Nếu Ledger fail vĩnh viễn, bạn phải tạo một bút toán ghi nợ mới hoặc khôi phục thủ công. Không an toàn để làm mặc định.\n2. **Phát `refund.succeeded` trước khi credit** — happy path ngắn hơn nhưng công bố một trạng thái cuối SAI nếu credit fail sau đó.\n\nMọi message dùng `aggregateType=PAYMENT`, `aggregateId=paymentId`, Kafka key = `paymentId` để giữ thứ tự trên cùng một payment. `refundId` là business reference idempotent cho cả journal của Ledger lẫn credit của Account.",
        examples: [
          "Client thấy CREATED hoặc PROCESSING cho tới khi CẢ HAI xác nhận tài chính commit — đúng như ADR-011 làm với payment.",
          "Cùng nguyên tắc với payment: `ledger.payment-posted` → `account.capture.requested` → `account.funds-captured` → `payment.succeeded`.",
          "Đánh đổi: thêm một vòng bất đồng bộ nữa trên happy path, đổi lại không bao giờ công bố thành công sớm."
        ]
      },
      {
        question: "`ledger.refund-posted` đã về rồi thì refund đã thành công chưa?",
        answer: "**Chưa.** `ledger.refund-posted` chỉ xác nhận đã tạo một journal `REFUND_REVERSAL` mới, cân bằng và bất biến. Nó KHÔNG tự làm refund thành công.\n\nJournal reversal là duy nhất theo `(reference_type='REFUND', reference_id=refundId, journal_type='REFUND_REVERSAL')`. Ledger **không bao giờ sửa** journal thanh toán gốc — sửa một bút toán đã post là phá tính bất biến của sổ cái.\n\nEvent này làm hai việc: chuyển Refund từ `CREATED` sang `PROCESSING`, và gây ra ĐÚNG MỘT `account.refund-credit.requested`. Trạng thái của Payment không đổi ở bước này.\n\nChỉ `account.refund-credited` khớp mới được, trong MỘT local transaction của Payment: chuyển reserved capacity sang succeeded total, tính delta hoàn phí luỹ kế, đánh dấu Refund `SUCCEEDED`, và append `refund.succeeded` vào outbox.",
        examples: [
          "Payment lưu bền `journalId` TRƯỚC khi phát command credit, để restart không làm mất fact nhân quả.",
          "Refund row lưu luôn `creditId` duy nhất làm bằng chứng terminal — finalization không phụ thuộc vào một message còn nằm trong bộ nhớ.",
          "Credit trùng cùng intent là no-op; credit khác intent cho cùng `refundId` là vi phạm invariant, không phải retry."
        ]
      },
      {
        question: "Journal reversal đã POSTED nhưng credit vào tài khoản khách thất bại — xử lý thế nào?",
        answer: "**Cấm tự động fail và cấm tự động release capacity.** Đây là ranh giới thất bại quan trọng nhất của refund.\n\nQuy tắc theo thời điểm:\n\n- **Trước khi journal được post**: một `ledger.refund-posting-failed` dứt khoát ĐƯỢC PHÉP đánh dấu Refund `FAILED` và release phần capacity đã reserve, nguyên tử.\n- **Sau `ledger.refund-posted`**: credit được retry có giới hạn, rồi đưa vào manual review và đối soát. Tuyệt đối không phát `refund.failed` và không release capacity tự động.\n\nLý do: journal đã post là bất biến, không thể bù trừ bằng cách xoá hay sửa. Nếu bạn fail refund trong khi sổ cái đã ghi nhận reversal, sổ và trạng thái nghiệp vụ lệch nhau, và không đối soát được.\n\nMột refund ở trạng thái \"journal đã post, credit đang chờ\" là trạng thái **cố ý khôi phục được**, không phải trạng thái lỗi.",
        examples: [
          "Đối xứng với quy tắc payment: sau khi journal POSTED thì không tự release reservation.",
          "Account credit vào tài khoản `ACTIVE` hoặc `FROZEN` đều được; tài khoản `CLOSED` thì không và cần operations khôi phục.",
          "Contract v1 chỉ post phần gốc (principal) vì capture v1 cũng principal-only. Fee reversal là fact bất biến nằm trong `refund.succeeded`, do Settlement tiêu thụ — muốn Ledger biết fee thì phải ra contract version mới, không diễn giải lại v1."
        ]
      }
    ]
  },
  {
    topic: "PayFlow — shared libs & event contract",
    items: [
      {
        question: "Ba module trong `libs/` là gì, và cái gì được phép / không được phép nằm trong đó?",
        answer: "`libs/observability-support`, `libs/error-contract`, `libs/event-contracts` **không phải microservice**: không có `@SpringBootApplication`, không mở port, không có container riêng, không tự kết nối database/Kafka, không có vòng đời chạy độc lập. Maven đóng gói mỗi module thành một JAR, service khai báo dependency thì nhận class trên classpath và gọi như code Java bình thường.\n\nShared library chỉ được chứa **technical convention** hoặc **wire contract ổn định**.\n\nBị cấm đưa vào `libs`:\n\n- JPA entity/repository của service;\n- Flyway migration dùng chung;\n- aggregate payment/account/refund;\n- state machine hoặc business policy dùng chung;\n- code truy cập database của nhiều service.\n\nLý do: đưa business logic và entity vào shared lib là các service mất ownership độc lập — sửa một domain có thể phá cả hệ thống, và bạn quay lại monolith nhưng với chi phí vận hành của microservice.",
        examples: [
          "`observability-support` cố ý KHÔNG phụ thuộc Spring, để dùng được ở cả MVC lẫn WebFlux.",
          "`event-contracts` chỉ phụ thuộc compile-time vào `observability-support`; Jackson chỉ là test dependency để record contract không bị buộc vào một JSON vendor.",
          "`merchant-service` là service duy nhất dùng `error-contract` mà không dùng `event-contracts` — nó thuần REST, chưa publish event nào."
        ]
      },
      {
        question: "`EventEnvelope` gồm những field nào, và `of()` khác `causedBy()` ở đâu?",
        answer: "Envelope chung cho mọi event:\n\n| Field | Ý nghĩa |\n| --- | --- |\n| `eventId` | Sinh **lúc insert outbox**; republish phải dùng lại đúng ID này để consumer dedup |\n| `eventType` | Tên contract, ví dụ `payment.created` |\n| `eventVersion` | Version của payload |\n| `aggregateType` | Hiện chủ yếu là `PAYMENT` |\n| `aggregateId` | Payment ID, đồng thời là Kafka key để giữ ordering theo payment |\n| `correlationId` | Nối cả workflow về HTTP request ban đầu |\n| `causationId` | Event ID NGAY TRƯỚC đã gây ra event này; null nếu event do HTTP tạo |\n| `producer` | Service nào ghi outbox |\n| `occurredAt` | Thời điểm business fact xảy ra, **không phải** lúc publisher gửi |\n| `data` | Payload record cụ thể |\n\nHai factory:\n\n- `EventEnvelope.of(...)` — cho event đầu tiên do HTTP/request tạo ra, ví dụ `payment.created`. `causationId` null.\n- `EventEnvelope.causedBy(...)` — khi consume event A rồi sinh event B: tự giữ nguyên `correlationId` và gắn `causationId` = eventId của A.\n\nCặp này biến log phẳng thành **cây nhân quả**: correlation trả lời \"cùng hành trình nào\", causation trả lời \"vì sao lại có message này\".",
        examples: [
          "`occurredAt` là thời điểm nghiệp vụ, không phải thời điểm gửi — vì outbox có thể publish chậm hàng phút sau khi fact đã commit.",
          "`EventHeaders` chuẩn hoá tên Kafka header: correlation ID, event ID, event type, event version.",
          "`EventType` gom `name + version + aggregateType` và validate luôn giới hạn độ dài cột outbox — lỗi lộ ra lúc compile/test chứ không lúc insert."
        ]
      },
      {
        question: "Hai chỗ dễ đọc nhầm nhất trong bản đồ topic của PayFlow là gì?",
        answer: "**1. Command gửi cho Account và Ledger đi trên PAYMENT topic, không phải trên `account.events`/`ledger.events`.**\n\n`account.reserve.requested`, `account.capture.requested`, `account.release.requested`, `account.refund-credit.requested`, `ledger.post-payment.requested` — tất cả đi trên `payflow.payment.events.v1`. Vì thế cả `account-service` lẫn `ledger-service` chỉ subscribe PAYMENT_EVENTS (riêng `ledger-service` thêm REFUND_EVENTS cho `refund.requested`). `account-service` KHÔNG nghe refund topic — credit hoàn tiền đến với nó dưới dạng `account.refund-credit.requested` trên payment topic.\n\nLý do: topic thuộc về **người phát**, không thuộc về người nhận. Payment phát command nên command nằm trên topic của Payment; `account.events`/`ledger.events` chỉ chở FACT do Account/Ledger phát ra.\n\n**2. `NOTIFICATION_COMMANDS` và `SETTLEMENT_EVENTS` là placeholder.** Constant có trong code nhưng chưa có producer/consumer nào. Notification nghe trực tiếp PAYMENT_EVENTS và REFUND_EVENTS. Có tên topic trong hằng số không chứng minh service tương ứng đã chạy.\n\nTên topic **cố ý không cấu hình qua `.env`**: topic khác nhau giữa các môi trường là cách hiệu quả nhất để giấu một lỗi gõ nhầm.",
        examples: [
          "Constant, topic name, event type và payload KHÔNG đổi giữa profile `mvp` và `full` — chỉ khác deployable nào subscribe.",
          "Ở `mvp` một service phát cả `account.*` lẫn `ledger.*`; ở `full`, `account-service` phát `account.*`, `ledger-service` phát `ledger.*`. Consumer không cần biết.",
          "Kafka local tắt auto-create nên tên topic sai phải fail rõ ràng thay vì tạo ra một topic ma."
        ]
      },
      {
        question: "Thêm một event mới vào hệ thống thì phải làm đủ những bước nào, và thay đổi nào là contract change?",
        answer: "Quy trình 7 bước:\n\n1. Xác định **producer owner** và các consumer.\n2. Thêm `EventType` vào đúng family class (`PaymentEvents`, `RiskEvents`, `AccountEvents`, `LedgerEvents`, `RefundEvents`).\n3. Thêm payload record chỉ chứa **wire validation** — không chứa business rule.\n4. Thêm serialization/contract test (serialize record thật để kiểm JSON, không chỉ compile được Java).\n5. Producer thêm event factory + ghi outbox.\n6. Consumer thêm router + handler + inbox transaction.\n7. Cập nhật `docs/events` và quyết định compatibility/version.\n\n**Là contract change (không phải refactor nội bộ):** đổi `eventType`, đổi tên record component, đổi wire value của enum, đổi topic name. Breaking payload change phải tăng `eventVersion` hoặc topic version tuỳ mức độ. Thêm field tương thích vẫn phải cân nhắc consumer cũ và JSON fixture test.\n\nĐiểm dễ nhầm: **producer service vẫn là owner của event, dù class nằm trong shared module.** Contract JAR không tự publish và không tự consume — adapter của từng service mới làm I/O.",
        examples: [
          "Payload nói \"journal nào/amount nào đã được xử lý\"; quy tắc tạo debit-credit cân bằng nằm trong Ledger domain, không nằm trong contract.",
          "`RiskLevelValue` là wire enum, KHÔNG phải scoring policy — rule tính điểm thật vẫn ở trong Risk Service.",
          "`AccountEventMoney` chỉ validate amount/currency ở mức wire; nó không thay Money/Reserve policy của Account domain."
        ]
      },
      {
        question: "Correlation ID được sinh, làm sạch và truyền đi như thế nào — và vì sao phải làm sạch?",
        answer: "Class `CorrelationId` (Java thuần, không Spring) định nghĩa:\n\n- `HEADER` = `X-Correlation-Id` — dùng chung cho HTTP và Kafka header.\n- `MDC_KEY` = `correlationId` — field trong structured log.\n- `MAX_LENGTH` = 64 ký tự — chặn client bơm dữ liệu lớn vào log.\n- `isSafe(value)` — chỉ chấp nhận chữ, số, `-`, `_`, `.`; **chặn CR/LF và control character**.\n- `resolveOrGenerate(value)` — giữ ID an toàn, thiếu hoặc hỏng thì sinh UUID mới.\n\n**Vì sao chặn CR/LF là bảo mật, không phải cho đẹp:** giá trị này đi thẳng vào log. Một client gửi `abc\\nlevel=ERROR msg=\"đã chuyển tiền\"` có thể **chèn dòng log giả** (log injection / log forging), làm giả bằng chứng hoặc đánh lừa hệ thống phân tích log. Bất kỳ dữ liệu nào do client kiểm soát mà đi vào log đều phải được lọc.\n\nĐường đi đầy đủ: client header → `CorrelationIdWebFilter` của Gateway (resolveOrGenerate, gắn request attribute, forward header, gắn response header, đặt MDC) → `CorrelationIdFilter` của Payment (kiểm lại, đặt MDC) → `JpaOutboxAppender` lấy ID từ MDC → `EventEnvelope.correlationId` + Kafka header → publisher bind lại vào MDC khi publish → event kế tiếp dùng lại chính correlationId đó.",
        examples: [
          "Module này CHƯA phải tracing đầy đủ / OpenTelemetry SDK — nó chỉ chuẩn hoá correlation identity để log và event nối được với nhau.",
          "Client nhận correlationId trong body lỗi Problem Details, nên khi khách báo lỗi bạn có ngay khoá để grep xuyên mọi service.",
          "Filter MVC và filter WebFlux vẫn nằm ở service tương ứng vì lifecycle framework khác nhau — chỉ helper thuần mới lên shared lib."
        ]
      }
    ]
  },
  {
    topic: "PayFlow — error contract & cấu hình runtime",
    items: [
      {
        question: "Error contract của PayFlow được thiết kế thế nào (RFC 9457 Problem Details)?",
        answer: "Bốn class trong `libs/error-contract`:\n\n- `ErrorCode` — interface chỉ có `code()`, để mã lỗi platform và mã lỗi riêng của service dùng chung một builder.\n- `PayFlowErrorCode` — mã dùng chung: unauthenticated, forbidden, validation, not found, internal.\n- `FieldViolation` — một lỗi field gồm `field` + message; **cố ý không trả về rejected value**.\n- `ProblemDetails` — builder/enricher cho RFC 9457.\n\n`PaymentErrorCode` nằm TRONG Payment Service và implement `ErrorCode`. Nhờ vậy Payment có từ vựng lỗi nghiệp vụ riêng mà không đẩy toàn bộ business vocabulary lên shared library.\n\nResponse điển hình:\n\n```json\n{\n  \"type\": \"about:blank\",\n  \"title\": \"Conflict\",\n  \"status\": 409,\n  \"detail\": \"Idempotency key was reused with a different request\",\n  \"code\": \"PAYMENT_IDEMPOTENCY_CONFLICT\",\n  \"correlationId\": \"...\",\n  \"timestamp\": \"...\",\n  \"fieldErrors\": []\n}\n```\n\n`detail` là thông báo an toàn cho client. **Stack trace, câu SQL, hostname nội bộ và secret không được xuất hiện ở đây.** `code` là mã ổn định để client xử lý bằng máy — client không được parse chuỗi `detail`.",
        examples: [
          "Vì sao `FieldViolation` không trả rejected value: field bị từ chối có thể là số thẻ, mật khẩu hay dữ liệu cá nhân — trả lại là tự tạo lỗ rò dữ liệu.",
          "Lỗi auth ở Gateway: JWT/scope fail → SecurityConfig → ProblemDetailErrorWriter → PayFlowErrorCode → ProblemDetails.of(..., correlationId) → 401/403 `application/problem+json`.",
          "Nguyên tắc thêm mã lỗi: lỗi platform mới cân nhắc `PayFlowErrorCode`; lỗi nghiệp vụ đặt enum trong service. Map exception ở web boundary — domain không được phụ thuộc `ProblemDetail` của Spring."
        ]
      },
      {
        question: "Một giá trị cấu hình đi từ `.env` tới bean runtime qua những tầng nào?",
        answer: "Bốn tầng, mỗi tầng có một vai trò:\n\n```text\n.env\n  │ Docker Compose nội suy ${VARIABLE}\n  ▼\ndocker-compose.yml  environment của từng container\n  │ Spring Boot đọc environment variable\n  ▼\nservices/*/application.yml   ${VARIABLE:default}\n  │ bind vào Spring/Kafka/JPA hoặc @ConfigurationProperties\n  ▼\nBean runtime: datasource, listener, publisher, scheduler, security\n```\n\nVí dụ chạy hết một vòng:\n\n```text\n.env:                PAYFLOW_OUTBOX_BATCH_SIZE=100\ncompose:             PAYFLOW_OUTBOX_BATCH_SIZE: ${PAYFLOW_OUTBOX_BATCH_SIZE}\napplication.yml:     payflow.outbox.batch-size: ${PAYFLOW_OUTBOX_BATCH_SIZE:100}\nOutboxProperties:    batchSize = 100\nOutboxPollingJob:    claim tối đa 100 row mỗi lượt\n```\n\n`${...:default}` trong `application.yml` là fallback khi chạy service trực tiếp trên host. **Username/password cố ý KHÔNG có fallback** — thiếu credential phải fail chứ không được âm thầm dùng secret cứng.\n\nBẫy hay gặp: `POSTGRES_PORT=5433` chỉ là cổng từ **host** vào container. Bên trong mạng Compose, service vẫn gọi `postgres:5432`.",
        examples: [
          "`.env.example` được commit và chỉ chứa placeholder/local default; `.env` chứa giá trị thật và bị git-ignore.",
          "`PAYFLOW_MERCHANT_ENCRYPTION_KEY_BASE64` không có default — thiếu key thì Merchant Service không khởi động được; đó là key mã hoá webhook signing secret at rest.",
          "`server.port` trong `application.yml` chỉ là default khi chạy trên host; trong Compose, biến port được set lại nên số cổng thấy ở `docker compose ps` có thể khác."
        ]
      },
      {
        question: "Những tham số cấu hình nào có RÀNG BUỘC với nhau, sai quan hệ là sinh bug?",
        answer: "Đây là loại bug khó nhất: từng giá trị riêng đều hợp lý, nhưng QUAN HỆ giữa chúng sai.\n\n| Ràng buộc | Vì sao |\n| --- | --- |\n| `PAYFLOW_OUTBOX_LEASE` (120s) **>** `PAYFLOW_KAFKA_DELIVERY_TIMEOUT_MS` (60000) | Lease phải sống lâu hơn một lần publish, nếu không instance khác reclaim row trong khi publish còn đang chạy → gửi trùng không cần thiết |\n| `PAYFLOW_KAFKA_DELIVERY_TIMEOUT_MS` **>** tổng request timeout + linger của Kafka | Nếu nhỏ hơn, producer bỏ cuộc trước khi chính nó gửi xong |\n| `PAYFLOW_NOTIFICATION_LEASE` (30s) **>** provider timeout (5s) | Lease hết hạn trong khi lời gọi ra ngoài còn chạy → worker khác nhặt việc → khách nhận hai email |\n| `PAYFLOW_SAGA_STEP_TIMEOUT` (30s) vs retry của listener (`1s` × 3) | Step timeout phải bao được toàn bộ chu kỳ retry, nếu không recovery và listener giẫm chân nhau |\n\nPayFlow validate các ràng buộc này **ngay lúc khởi động** bằng typed `@ConfigurationProperties`, để cấu hình sai fail nhanh và fail rõ, thay vì biến thành một bug ngẫu nhiên lúc 3 giờ sáng.\n\nMột cảnh báo vận hành đi kèm: các switch bật/tắt consumer/publisher (`PAYFLOW_*_CONSUMER_ENABLED`, `PAYFLOW_OUTBOX_ENABLED`) chỉ dùng để **cô lập service khi debug**. Tắt một switch KHÔNG phải là một chế độ E2E hợp lệ — workflow sẽ dừng ở pending outbox hoặc một trạng thái trung gian cho tới khi bật lại.",
        examples: [
          "`PAYFLOW_OUTBOX_ENABLED=false` vẫn để business + outbox commit bình thường, chỉ không publish — dữ liệu tồn lại để drain sau, không mất.",
          "`PAYFLOW_MERCHANT_CATALOG_MODE`: `remote` = Payment gọi REST sang Merchant; `local` = đọc bảng snapshot trong DB Payment. **Không có fallback tự động từ remote sang local** — im lặng đọc dữ liệu cũ nguy hiểm hơn là fail.",
          "`SPRING_PROFILES_ACTIVE=local` nạp seed merchant/account/ledger qua Flyway callback — tuyệt đối không bật ở môi trường thật."
        ]
      },
      {
        question: "Docker image và bootstrap PostgreSQL của PayFlow có gì đáng nói về mặt bảo mật/vận hành?",
        answer: "**Một Dockerfile dùng chung cho mọi deployable** (`java-service.Dockerfile`):\n\n1. Nhận `SERVICE_MODULE` từ Compose.\n2. Copy monorepo.\n3. Compile `HealthCheck.java`.\n4. `mvnw -pl <module> -am package` — `-pl` chọn module đích, `-am` (also-make) build luôn các `libs` nội bộ mà nó phụ thuộc.\n5. Copy MỘT executable JAR sang JRE image (multi-stage: image cuối không có Maven, không có source).\n6. Chạy bằng **UID/GID 10001, không chạy root**.\n7. `java -jar /opt/payflow/app.jar`.\n\n`HealthCheck` dùng Java HTTP client gọi `/actuator/health/readiness`, yêu cầu HTTP 200 và body chứa `\"status\":\"UP\"`. Viết bằng Java thuần **để không phải cài `curl`/`wget` vào runtime image** — mỗi binary thêm vào image là thêm bề mặt tấn công.\n\n**Bootstrap PostgreSQL** (`01-create-databases.sh`) chỉ chạy khi volume còn RỖNG. Nó tạo 5 database kèm 5 role riêng, **revoke quyền `PUBLIC`** và cấp owner/connect đúng role. Đây là hàng rào ở tầng hạ tầng để một service không thể đọc nhầm database của service khác — không chỉ dựa vào kỷ luật của lập trình viên.\n\nScript này KHÔNG chạy lại mỗi lần `docker compose up`. Xoá volume là mất dữ liệu, chỉ làm với môi trường local dùng một lần.",
        examples: [
          "Maven test convention: `*Test.java` chạy bằng Surefire (nhanh, không container); `*IT.java` chạy bằng Failsafe (có thể boot context hoặc Testcontainers).",
          "`-Pno-docker verify` bỏ nhóm test gắn `@Tag(\"docker\")` — hợp lý làm gate local khi Docker tắt, nhưng KHÔNG thay được full verify.",
          "Job `compose-config` trong CI render `.env.example` với profile infra/mvp mà không start container, và kiểm MVP có đúng 10 Compose service."
        ]
      }
    ]
  },
  {
    topic: "PayFlow — state machine, idempotency & risk policy",
    items: [
      {
        question: "Payment state machine của PayFlow có những trạng thái nào, cái nào là terminal?",
        answer: "```text\nCREATED → RISK_CHECKING → RESERVING_FUNDS → PROCESSING → SUCCEEDED\n```\n\nCác nhánh rẽ:\n\n- `CREATED` → `CANCELLED`\n- `RISK_CHECKING` → `RISK_REJECTED` | `RESERVING_FUNDS` | `CANCELLED` | `MANUAL_REVIEW_REQUIRED`\n- `RESERVING_FUNDS` → `PROCESSING` | `FAILED` | `MANUAL_REVIEW_REQUIRED`\n- `PROCESSING` → `SUCCEEDED` | `FAILED` | `MANUAL_REVIEW_REQUIRED`\n- `MANUAL_REVIEW_REQUIRED` → `RISK_REJECTED` | `RESERVING_FUNDS` | `PROCESSING` | `FAILED`\n- `SUCCEEDED` → `PARTIALLY_REFUNDED` → `REFUNDED`\n\n**Terminal: `RISK_REJECTED`, `FAILED`, `CANCELLED`, `REFUNDED`.**\n\nĐiểm hay bị hỏi: **`SUCCEEDED` KHÔNG phải terminal** — vì payment vẫn có thể bị refund. Một state machine coi SUCCEEDED là kết thúc sẽ không mô hình hoá được refund.\n\n`MANUAL_REVIEW_REQUIRED` là non-terminal và có thể quay lại BA trạng thái khác nhau, tuỳ vào bước saga đang dừng ở đâu — đó là lý do API resolution phải đọc saga step/facts chứ không nhận input tuỳ ý từ người vận hành.\n\nMọi chuyển trạng thái phải đi qua domain model. Trung thực khi trình bày: state machine đã hỗ trợ `CANCELLED` nhưng **public cancel API chưa được triển khai**.",
        examples: [
          "Đối chiếu với ADR-011: `PROCESSING` là cửa sổ mà journal đã post nhưng capture chưa xác nhận — client nhìn thấy PROCESSING chứ không thấy SUCCEEDED sớm.",
          "`REVIEW_REQUIRED` từ Risk giữ payment ở `RISK_CHECKING` rồi chuyển `MANUAL_REVIEW_REQUIRED`, và KHÔNG đụng tới số dư.",
          "Có trạng thái trong enum không có nghĩa là có API — phân biệt hai điều này là dấu hiệu của người đọc code thật."
        ]
      },
      {
        question: "Idempotency ở tầng intake của PayFlow hoạt động chính xác thế nào?",
        answer: "Sáu quy tắc đang áp dụng:\n\n1. Gateway và Payment **đều** validate JWT; `payment:write` cho POST, `payment:read` cho GET.\n2. `merchant_id` lấy từ JWT — **không tin `merchantId` trong body**. Query/read cũng scope theo merchant để tránh đọc chéo tenant.\n3. `Idempotency-Key` là **bắt buộc** cho create payment và refund. Scope gồm **merchant + endpoint**.\n4. Payload được **canonicalize rồi fingerprint**. Cùng key + cùng payload → trả lại response cũ. Cùng key + payload khác → **409 Conflict**.\n5. Record idempotency, Payment, Saga và outbox đầu tiên được ghi trong **cùng một local transaction**. TTL của record hiện là 24 giờ.\n6. Hai request cùng key chạy đồng thời: **unique index của PostgreSQL chọn winner**, request còn lại đọc lại response đã lưu thay vì tạo payment thứ hai.\n\nVì sao đặt idempotency trong PostgreSQL cùng business record: không tồn tại cửa sổ \"Redis ghi thành công nhưng Payment rollback\", và response replay bền vững qua restart.",
        examples: [
          "Redis idempotency nhanh hơn nhưng phải giải quyết mất cache và consistency với PostgreSQL — chỉ hợp làm fast-path phía TRƯỚC nguồn sự thật bền vững.",
          "Chỉ dựa vào UUID do client sinh là chưa đủ: không phát hiện được cùng key nhưng payload khác, và không lưu được response để replay.",
          "Distributed lock phức tạp hơn một unique constraint, trong khi bài toán này chỉ có đúng một database owner."
        ]
      },
      {
        question: "Policy `risk-v1` chấm điểm bằng những rule nào, và bốn signal nào hiện đang là giá trị trung tính?",
        answer: "Rule engine deterministic, chạy theo **thứ tự cố định** để `matchedRules` luôn ổn định:\n\n| Rule | Điều kiện | Điểm |\n| --- | --- | ---: |\n| `AMOUNT_HIGH` | `amount >= 10.000.000,0000` | 30 |\n| `VELOCITY_1M` | số payment trong 1 phút `> 5` | 40 |\n| `VELOCITY_1H` | tổng amount trong 1 giờ `> 30.000.000,0000` | 35 |\n| `NEW_DEVICE` | thiết bị mới | 10 |\n| `FAILED_BURST` | payment thất bại trong 10 phút `>= 3` | 25 |\n| `MERCHANT_SUSPICIOUS` | merchant bị đánh dấu đáng ngờ | 50 |\n| `IP_CHANGE` | quốc gia IP thay đổi | 20 |\n\nĐiểm = `min(rawScore, 100)`. Band: 0–19 `LOW`/APPROVED · 20–39 `MEDIUM`/APPROVED · 40–69 `HIGH`/REVIEW_REQUIRED · 70–100 `CRITICAL`/REJECTED.\n\n**Trung thực khi trình bày:** `payment.created` v1 hiện chỉ cung cấp đủ dữ liệu cho hai rule velocity. Bốn signal `newDevice`, `failedPaymentsLastTenMinutes`, `merchantSuspicious`, `ipCountryChanged` đang nhận **giá trị trung tính** (`false`/`0`) cho tới khi có contract enrichment có version. Nghĩa là 4/7 rule về mặt hiệu lực chưa chạy thật — nói \"tôi có 7 rule fraud\" mà không nói điều này là nói quá.",
        examples: [
          "Chỉ `APPROVED` mới được reserve tiền. `REJECTED` kết thúc bằng `RISK_REJECTED`. `REVIEW_REQUIRED` chuyển sang manual review và không đụng số dư.",
          "Redis giữ velocity window bằng **Lua script** cập nhật counter/amount nguyên tử; `paymentId` làm member nên delivery trùng không tăng counter lần hai. Retention 2 giờ.",
          "Amount velocity lưu dưới dạng **chuỗi decimal theo minor-unit**, không cộng bằng floating point — cùng kỷ luật với BigDecimal ở tầng nghiệp vụ."
        ]
      },
      {
        question: "Invariant số dư của Account và vòng đời reservation được định nghĩa thế nào?",
        answer: "Số học của reservation — chỗ ứng viên hay trả lời sai:\n\n```text\nreserve:  available -= amount;  reserved += amount\ncapture:  reserved  -= amount;  available GIỮ NGUYÊN (đã trừ lúc reserve)\nrelease:  reserved  -= amount;  available += amount\n```\n\nSai kinh điển là nghĩ capture trừ tiếp `available` — thành ra trừ hai lần.\n\nInvariant: `available_balance >= 0` và `reserved_balance >= 0`, được bảo vệ ở **cả domain lẫn database constraint** (hai lớp, vì domain có thể bị bỏ qua bởi một đường ghi khác).\n\nAccount có ba trạng thái `ACTIVE`, `FROZEN`, `CLOSED`. Reserve yêu cầu account `ACTIVE`, amount dương, **cùng currency**, deadline còn hiệu lực và đủ `available_balance`. Refund credit được phép với `ACTIVE` **hoặc `FROZEN`** — nhưng không credit vào `CLOSED`.\n\nMỗi payment chỉ có MỘT reservation nghiệp vụ. Reservation đi từ `ACTIVE` sang đúng một trạng thái terminal: `CAPTURED`, `RELEASED` hoặc `EXPIRED`; thao tác trùng cùng intent trả kết quả ổn định.\n\nConcurrency: Account được đọc bằng `PESSIMISTIC_WRITE` trước khi kiểm tra và cập nhật số dư; reservation cũng bị khoá khi capture/release.",
        examples: [
          "Vì sao `FROZEN` vẫn nhận được refund: đóng băng là để chặn tiền ĐI RA, không phải chặn tiền trả lại cho khách.",
          "Hai amount khác currency không được cộng/trừ — currency là bắt buộc trong mọi phép tính tiền. MVP hiện khoá dữ liệu runtime vào VND.",
          "Thay thế đáng cân nhắc: conditional atomic update `UPDATE ... WHERE available_balance >= ?` có throughput tốt hơn và giữ lock ít hơn, nhưng phải thiết kế kỹ affected-row semantics."
        ]
      }
    ]
  },
  {
    topic: "PayFlow — bảng quyết định & phương án thay thế",
    items: [
      {
        question: "Bảng quyết định tổng hợp của PayFlow: đang dùng gì, thay thế bằng gì, và trigger để đổi là gì?",
        answer: "Đây là bảng đáng học thuộc nhất cho phỏng vấn — nó chứng minh bạn chọn có lý do, chứ không chọn theo trào lưu.\n\n| Bài toán | Đang dùng | Thay thế đáng cân nhắc | Trigger để đổi |\n| --- | --- | --- | --- |\n| Ranh giới dữ liệu | DB + credential riêng từng service | Shared DB/schema | Không khuyến nghị; chỉ hợp prototype rất ngắn |\n| Account + Ledger | Một service, hai module/schema | Tách hai deployable | Team/scale/SLA khác nhau VÀ đã có E2E/recovery ổn định |\n| Workflow phân tán | Orchestrated Saga | REST chain, choreography, workflow engine, 2PC | Độ dài workflow/ownership vượt khả năng Saga hiện tại |\n| DB → Kafka | Polling Transactional Outbox | Debezium CDC | Volume/latency outbox và năng lực vận hành Kafka Connect đủ chín |\n| Consumer dedup | PostgreSQL Inbox | Kafka EOS, Redis dedup | Chỉ đổi nếu side effect không còn ở PostgreSQL |\n| Reserve/refund concurrency | Pessimistic row lock | Conditional update, optimistic lock | **Đo được** rằng lock là bottleneck |\n| Kế toán | Double-entry journal bất biến | Ledger engine bên ngoài | Multi-currency, settlement/reconciliation lớn |\n| Fraud | Java rules + Redis velocity | DMN/Drools, ML model | Rule đổi thường xuyên, hoặc có dữ liệu/model governance thật |\n| Identity | Keycloak OIDC | Managed IdP, custom auth, API key | Nhu cầu SLA/compliance production |\n| Notification | Record bền + lease worker | Provider queue/webhook platform | Có provider thật, SLA, multi-channel |\n| Deployment | Docker Compose local | Kubernetes | **Chỉ sau khi** Docker E2E, health, observability và failure gate đã xanh |\n\nMẫu câu trả lời: \"Tôi dùng X. Đánh đổi là Y. Tôi sẽ đổi sang Z khi <điều kiện đo được>.\"",
        examples: [
          "Chú ý cột trigger toàn là điều kiện QUAN SÁT ĐƯỢC, không phải cảm tính — \"đo được lock là bottleneck\", không phải \"nghe nói pessimistic chậm\".",
          "Trigger lên Kubernetes cố ý đặt SAU observability và failure gate: lên K8s khi chưa quan sát được là tự làm mù mình ở quy mô lớn hơn.",
          "Khi bị hỏi \"sao không dùng Debezium/Kafka EOS/ML?\", trả lời bằng trigger sẽ mạnh hơn là bảo vệ lựa chọn hiện tại."
        ]
      },
      {
        question: "Vì sao PayFlow chọn polling outbox chứ không dùng Debezium CDC ngay từ đầu?",
        answer: "Cả hai giải cùng một bài toán: làm sao ghi database và publish Kafka trở thành một hành động nguyên tử. Khác nhau ở **chi phí vận hành và khả năng chẩn đoán**.\n\n**Polling publisher (đang dùng):**\n- Chỉ cần code Java + một bảng — không thêm hạ tầng nào.\n- Debug được bằng SQL thường: `SELECT * FROM outbox_events WHERE status='FAILED'`.\n- Người vận hành thấy được `attempt_count`, `last_error`, `lock_owner`, `lock_until`.\n- Trả giá: có độ trễ polling, và tải database từ vòng quét đều đặn.\n\n**Debezium CDC:**\n- Đọc WAL nên độ trễ thấp hơn và không tạo tải polling.\n- Trả giá: thêm Kafka Connect, thêm connector config, thêm chế độ lỗi (slot đầy, snapshot lại, offset của connector), và cần người biết vận hành nó lúc 3 giờ sáng.\n\nPayFlow chốt bằng ADR-004: chọn polling, **hoãn Debezium sang Giai đoạn 4**. Trigger để đổi được ghi rõ: khi volume/latency của outbox và năng lực vận hành Kafka Connect đủ chín.\n\nĐây là ví dụ tốt của nguyên tắc \"chọn công nghệ theo năng lực vận hành hiện có\", không phải theo cái tối ưu trên giấy.",
        examples: [
          "Một replication slot bị kẹt có thể làm WAL phình tới đầy đĩa — chế độ lỗi này không tồn tại với polling.",
          "Polling có một lợi thế phỏng vấn: bạn giải thích được TOÀN BỘ cơ chế bằng ba câu SQL, còn CDC thì phải giải thích thêm cả một hệ thống nữa.",
          "Cả hai đều chỉ cho at-least-once. Chuyển sang CDC không loại bỏ được nhu cầu inbox ở consumer."
        ]
      },
      {
        question: "Vì sao Redis không được làm nguồn sự thật, và Redis được dùng đúng ở đâu?",
        answer: "Nguyên tắc trong dự án: **Redis chỉ giữ dữ liệu mà mất đi thì hệ thống suy giảm chứ không sai tiền.**\n\nRedis ĐANG dùng cho: velocity window của Risk (Lua script cập nhật counter/amount nguyên tử, `paymentId` làm member để chống đếm trùng, retention 2 giờ).\n\nRedis BỊ CẤM dùng cho:\n- số dư tài khoản;\n- bút toán sổ cái;\n- bảng idempotency (nguồn sự thật);\n- dedup thay cho inbox.\n\nLý do kỹ thuật: side effect nghiệp vụ nằm trong PostgreSQL. Nếu marker dedup nằm ở Redis còn thay đổi nghiệp vụ nằm ở PostgreSQL thì **hai cái không commit cùng nhau** — luôn tồn tại cửa sổ \"Redis ghi xong nhưng transaction rollback\" (hoặc ngược lại). Bảng inbox nằm cùng database với business change nên nó là một transaction duy nhất.\n\nMất toàn bộ Redis trong PayFlow: điểm rủi ro của một số giao dịch bị tính thấp hơn thực tế trong 2 tiếng. Khó chịu nhưng không mất tiền. Nếu Redis giữ số dư, mất Redis là mất tiền.",
        examples: [
          "Chỉ đổi consumer dedup sang Redis nếu side effect KHÔNG còn nằm ở PostgreSQL, hoặc có bằng chứng atomic tương đương.",
          "Chỉ dùng SQL counter cho velocity thì bớt được một dependency, nhưng query/lock theo time window nặng hơn — đó là lý do Redis vẫn hợp lý ở đây.",
          "Câu hỏi tự kiểm cho mọi cache: \"Nếu mất sạch dữ liệu này lúc này, hệ thống sai hay chỉ chậm?\" Sai → không được để ở cache."
        ]
      }
    ]
  },
  {
    topic: "PayFlow — governance, quality gate & pitch phỏng vấn",
    items: [
      {
        question: "Sổ đăng ký OPEN DECISIONS hoạt động thế nào và vì sao nó quan trọng?",
        answer: "PayFlow duy trì một file `OPEN_DECISIONS.md` ghi các điểm **chưa đủ rõ trong spec hoặc đang mâu thuẫn giữa các phần**. Mỗi mục có ID (OD-001…OD-011), trạng thái, blocker và phạm vi bị chặn.\n\nQuy tắc cốt lõi, viết thẳng ở đầu file: **không được tự chọn một phương án rồi biến nó thành contract ngầm.** `OPEN` là blocker thật cho đúng phạm vi bị ảnh hưởng.\n\nQuy trình xử lý một OD:\n\n1. Thu thập use case, **failure window**, các phương án thay thế, và test chứng minh.\n2. Chốt bằng ADR khi có trade-off kiến trúc; sửa spec/contract khi thay đổi yêu cầu.\n3. Cập nhật **mọi** sơ đồ, state machine, schema, event và test fixture bị ảnh hưởng **trong cùng một change**.\n4. Chỉ chuyển sang `RESOLVED` khi link được ADR và implementation gate rõ ràng.\n\nVí dụ: OD-007 (\"unique violation làm abort transaction trong PostgreSQL\") chặn việc tạo consumer template cho tới khi ADR-017 chốt `INSERT ... ON CONFLICT DO NOTHING` + kiểm affected rows.\n\nGiá trị phỏng vấn: nó cho thấy bạn phân biệt được \"chỗ tôi chưa biết\" với \"chỗ tôi đã quyết\", thay vì để một giả định lặng lẽ trở thành thiết kế.",
        examples: [
          "OD-001 thứ tự tài chính → ADR-011 · OD-005 refund capacity → ADR-020 · OD-008 outbox claim → ADR-004 + ADR-014 · OD-010 an toàn dữ liệu audit → ADR-022.",
          "Mỗi mục RESOLVED vẫn ghi rõ implementation gate còn lại — ví dụ OD-007 nói rõ ADR mở khoá nhưng runtime vẫn cần test PostgreSQL/Kafka.",
          "Đây là bản đối trọng với thói quen phổ biến: gặp chỗ mơ hồ thì đoán đại rồi commit, và ba tháng sau không ai nhớ vì sao lại làm thế."
        ]
      },
      {
        question: "\"ADR mở khoá quyền implement, không phải chứng nhận đã implement\" nghĩa là gì?",
        answer: "Đây là câu quan trọng nhất về kỷ luật bằng chứng của dự án, ghi thẳng trong OD-008: *\"Tại thời điểm resolve, chưa test nào chạy — ADR mở khoá quyền implement, không phải chứng nhận đã implement.\"*\n\nBa mức trạng thái tách bạch:\n\n1. **Đã QUYẾT** — ADR được chấp nhận, biết phải làm gì và vì sao.\n2. **Đã VIẾT** — code tồn tại, test không cần Docker đã xanh.\n3. **Đã CHỨNG MINH** — test PostgreSQL/Kafka/E2E thật đã chạy và xanh.\n\nHầu hết người đi phỏng vấn gộp cả ba làm một và nói \"hệ thống của em có outbox pattern\". Người đọc code sẽ hỏi tiếp: \"Bạn đã test cửa sổ crash chưa? Bằng cách nào?\"\n\nPayFlow ghi rõ phần chưa chứng minh, ví dụ: contract test và unit test không Docker đã xanh; test atomicity PostgreSQL đã **chuẩn bị nhưng chưa chạy**; hành vi Kafka redelivery, offset commit, ordering và cửa sổ crash **chưa được kiểm chứng** cho tới khi bật infrastructure gate.\n\nMỗi ADR còn kèm mục Verification liệt kê chính xác test nào phải xanh — ADR-014 có 9 test bắt buộc trước khi outbox publisher được coi là xong.",
        examples: [
          "Cách nói mạnh khi phỏng vấn: \"Phần này em đã thiết kế và code, test không Docker xanh; test Kafka redelivery em chưa chạy nên em chưa dám nói nó đúng.\"",
          "Quality gate theo phase: Phase 0 foundation → 1A intake → 1B happy-path saga → **pre-Phase-2 failure recovery gate** → Phase 2 tách bounded context + refund → Phase 3 production-like.",
          "ADR-012 nâng failure recovery thành gate BẮT BUỘC trước khi tách service — chứng minh phục hồi lỗi trước, rồi mới thêm mặt cắt mạng."
        ]
      },
      {
        question: "Những gì của PayFlow KHÔNG được nói là đã hoàn thành?",
        answer: "Danh sách này nên thuộc lòng — nói sai một mục là mất tín nhiệm cả buổi:\n\n- **Docker Compose** mới được render/validate ở phía client; container chưa được start trong evidence hiện tại.\n- Runtime **PostgreSQL/Kafka/Redis/Keycloak** và **Testcontainers E2E** vẫn cần chạy khi bật Docker.\n- **Email hiện là mock** (adapter in-memory). Settlement, reconciliation, Kubernetes, load test và full observability stack **chưa** phải capability đã hoàn thành.\n- Đã có: payment search, refund lookup, manual-review resolution. **Chưa có**: public merchant cancel API, user profile service, UI đăng nhập cho khách hàng.\n- `account-service` **không quản lý user** — nó chỉ quản lý balance/reservation. `ledger-service` chỉ quản lý journal/posting.\n- **Tuyệt đối không được ghi \"exactly once\".** Mô hình là at-least-once delivery + idempotent consumer + database invariant.\n- Chưa có `libs/test-support`, chưa có module tracing/OpenTelemetry auto-config, chưa có `infrastructure/monitoring` hay `infrastructure/k8s` hoàn chỉnh.\n- `NOTIFICATION_COMMANDS` và `SETTLEMENT_EVENTS` là contract placeholder cho phase sau, **không chứng minh service tương ứng đã chạy**.\n\nNguyên tắc chung: shared library không biến at-least-once thành exactly-once. Database outbox/inbox và domain invariant vẫn là hàng rào chính.",
        examples: [
          "Người phỏng vấn giỏi thường thử bạn bằng một câu mời chào: \"Vậy hệ thống em đảm bảo exactly-once đúng không?\" — trả lời đúng là \"không, và đây là lý do không ai làm được điều đó ở tầng messaging\".",
          "Nói \"em có Kubernetes\" khi repo chỉ có Compose là loại lỗi bị phát hiện trong một câu hỏi tiếp theo.",
          "Biết ranh giới của việc mình làm là tín hiệu seniority mạnh hơn là biết thêm một công nghệ."
        ]
      },
      {
        question: "Trình bày PayFlow trong 60 giây thì nói gì?",
        answer: "> PayFlow nhận payment qua API idempotent và trả **202**. Payment Service điều phối **Saga qua Kafka**: Risk chấm điểm bằng rule deterministic, Account **khoá hàng** để reserve tiền, Ledger post **journal kép bất biến**, sau đó Account capture và Payment mới công bố success. Mỗi service có **database riêng**; **Outbox** ngăn mất event, **Inbox** chống xử lý trùng, còn retry/compensation/manual review xử lý các cửa sổ lỗi. Refund khoá Payment để reserve capacity, post journal reversal rồi mới credit account và finalize. Hệ thống **không giả vờ có distributed exactly-once**; tính đúng được giữ bằng idempotency, state machine, lock, constraint và ranh giới đối soát.\n\nVì sao đoạn này hiệu quả:\n\n1. Bắt đầu bằng **hợp đồng API** (202 = bất đồng bộ), không bắt đầu bằng danh sách công nghệ.\n2. Nêu **thứ tự** của các bước tài chính — thứ tự là phần khó nhất, nói được nghĩa là hiểu.\n3. Gọi tên pattern kèm **vấn đề nó giải quyết**, không gọi tên suông.\n4. Kết bằng một tuyên bố về **giới hạn** — thứ khiến người nghe tin phần còn lại.\n\nSau đoạn này, người phỏng vấn gần như chắc chắn sẽ đào vào một trong ba chỗ: cửa sổ crash của outbox, vì sao thứ tự ledger-trước-capture, hoặc xử lý refund đồng thời. Chuẩn bị sẵn cả ba.",
        examples: [
          "Đừng mở đầu bằng \"em dùng Spring Boot, Kafka, PostgreSQL, Redis, Keycloak\" — đó là danh sách, không phải thiết kế.",
          "Nếu bị hỏi \"vì sao trả 202 chứ không 201?\": vì công việc tài chính chưa xong lúc response rời server; trả 201 là ngụ ý đã tạo xong một kết quả chưa tồn tại.",
          "Câu kết về giới hạn không làm bạn yếu đi — nó là thứ phân biệt người đã vận hành hệ phân tán với người mới đọc blog."
        ]
      }
    ]
  }
];
