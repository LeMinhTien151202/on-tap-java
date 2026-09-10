// Taxonomy chung cho Lý thuyết, Quiz và Trang chủ.
// "Cơ bản / chuyên sâu / nội tại / vận hành" là mức độ học, không còn là các miền độc lập.
window.LEARNING_DOMAINS = [
  {
    id: "java-language", icon: "☕", title: "Java nền tảng",
    summary: "Nắm cú pháp, mô hình đối tượng và cách thiết kế code Java dễ hiểu, dễ kiểm thử.",
    goals: ["Kiểu dữ liệu, String và cơ chế truyền tham số", "OOP, equals/hashCode và tính bất biến", "Collections, Generics, Stream và Java hiện đại"],
    sequence: "Cú pháp → OOP → Collections/Generics → Java hiện đại → design patterns",
    payflow: "Dùng để mô hình hóa Payment, Money, trạng thái giao dịch và các rule nghiệp vụ mà không phụ thuộc framework.",
    interview: "Luôn trả lời theo ba lớp: định nghĩa ngắn, cơ chế hoạt động, tình huống nên/không nên dùng."
  },
  {
    id: "java-runtime", icon: "🧠", title: "JVM & Concurrency",
    summary: "Hiểu chương trình Java thực sự chạy thế nào và cách xử lý an toàn khi có nhiều luồng.",
    goals: ["JVM, memory model, heap/stack và garbage collection", "Thread, visibility, atomicity, lock và deadlock", "IO/NIO, tài nguyên và xử lý file lớn"],
    sequence: "JVM & memory → Thread → synchronization/atomic → executor → IO/NIO",
    payflow: "Giúp phân tích race condition khi hai payment cùng giữ tiền và chọn database locking thay vì chỉ dùng synchronized.",
    interview: "Phân biệt concurrency trong một JVM với concurrency giữa nhiều instance/service."
  },
  {
    id: "spring", icon: "🌱", title: "Spring & REST API",
    summary: "Xây API Java có ranh giới rõ, validation tốt, xử lý lỗi nhất quán và dễ test.",
    goals: ["IoC/DI, bean lifecycle và cấu hình Spring Boot", "REST, DTO, validation và error contract", "Security, AOP, reactive và testing theo đúng ngữ cảnh"],
    sequence: "Spring Core → Boot → MVC/REST → Validation/Error → Security/Test",
    payflow: "Là lớp giao tiếp của Payment Service: nhận request, xác thực, kiểm tra idempotency và gọi use case.",
    interview: "Không chỉ kể annotation; hãy giải thích trách nhiệm của container và ranh giới transaction/proxy."
  },
  {
    id: "data", icon: "🗄️", title: "SQL & Persistence",
    summary: "Thiết kế dữ liệu đúng, truy vấn hiệu quả và giữ invariant bằng transaction thay vì dựa vào may mắn.",
    goals: ["SQL, index, execution plan và mô hình quan hệ", "JDBC, connection pool, JPA/Hibernate", "ACID, isolation, optimistic/pessimistic lock và migration"],
    sequence: "SQL cơ bản → mô hình/index → JDBC → JPA/Hibernate → transaction/locking → tuning",
    payflow: "Bảo đảm số dư không âm, ledger cân bằng debit/credit và payment không bị cập nhật sai khi có cạnh tranh.",
    interview: "Mỗi lựa chọn index hay lock phải gắn với query, tải thực tế và trade-off throughput."
  },
  {
    id: "architecture", icon: "🏗️", title: "System Design",
    summary: "Chia hệ thống theo trách nhiệm nghiệp vụ và thiết kế luồng dữ liệu có thể chịu lỗi.",
    goals: ["Monolith vs microservices và bounded context", "Hexagonal/DDD, dependency rule và database per service", "Ước lượng tải, scale, consistency và API contract"],
    sequence: "Yêu cầu → invariant → ranh giới service → luồng dữ liệu → failure modes → scale",
    payflow: "Tách Payment, Account, Ledger, Risk và Notification theo bounded context; không cho service sửa database của nhau.",
    interview: "Bắt đầu từ yêu cầu và invariant, không bắt đầu bằng việc liệt kê công nghệ."
  },
  {
    id: "integration", icon: "🔄", title: "Kafka, Redis & Resilience",
    summary: "Kết nối các thành phần mà vẫn kiểm soát duplicate, mất dữ liệu, timeout và lỗi dây chuyền.",
    goals: ["Kafka partition, offset, consumer group và delivery semantics", "Redis cache/rate limit và tính đúng đắn của dữ liệu", "Timeout, retry, circuit breaker, bulkhead và observability"],
    sequence: "Sync vs async → Kafka core → delivery/idempotency → Redis → resilience → vận hành",
    payflow: "Outbox chống mất event; Inbox chống xử lý trùng; retry chỉ dùng cho lỗi tạm thời và luôn có giới hạn.",
    interview: "Nêu rõ failure mode mà từng pattern giải quyết và điều pattern đó không giải quyết được."
  },
  {
    id: "security", icon: "🔐", title: "Security",
    summary: "Bảo vệ danh tính, quyền truy cập, dữ liệu và các điểm tích hợp bên ngoài theo nhiều lớp.",
    goals: ["Authentication, authorization, JWT/OAuth2/OIDC và RBAC", "OWASP: injection, XSS, CSRF và security headers", "Quản lý secret, HMAC, token rotation và audit"],
    sequence: "Threat model → AuthN → AuthZ → input/output safety → token/secret → audit",
    payflow: "Gateway xác minh token, service kiểm tra quyền nghiệp vụ và webhook phải xác minh chữ ký trên raw payload.",
    interview: "OAuth2 là khung ủy quyền; nếu cần đăng nhập người dùng trên OAuth2 thì dùng OpenID Connect."
  },
  {
    id: "delivery", icon: "🚀", title: "DevOps & Cloud",
    summary: "Đưa hệ thống lên môi trường chạy thật, quan sát được và khôi phục được khi có sự cố.",
    goals: ["Git, CI/CD, Docker và cấu hình theo môi trường", "Kubernetes, probe, rollout và resource limit", "Cloud, metrics, logs, traces và cảnh báo có hành động"],
    sequence: "Build/test → container → compose → CI/CD → observability → Kubernetes/cloud",
    payflow: "Mọi payment cần correlationId/traceId; dashboard phải thấy latency, error rate, consumer lag và outbox pending.",
    interview: "Mô tả cả deploy, rollback, health check và cách chứng minh hệ thống đang khỏe."
  },
  {
    id: "payflow", icon: "💳", title: "PayFlow & Payment",
    summary: "Áp dụng Java và distributed systems vào một luồng tiền có trạng thái, đối soát và khả năng phục hồi.",
    goals: ["Reserve, capture, release, refund và state machine", "Double-entry ledger, settlement và reconciliation", "Idempotency, Saga, Outbox/Inbox, provider callback và risk policy"],
    sequence: "Payment lifecycle → balance/reservation → ledger → async workflow → provider → settlement/reconciliation",
    payflow: "Đây là miền tổng hợp: mọi quyết định phải bảo vệ tiền, không xử lý trùng và để lại dấu vết kiểm toán.",
    interview: "Hãy kể được happy path, duplicate path và failure/compensation path của cùng một payment."
  },
  {
    id: "algorithms", icon: "🧩", title: "Thuật toán & CTDL",
    summary: "Nhận dạng pattern, chứng minh độ đúng và phân tích độ phức tạp thay vì học thuộc code.",
    goals: ["Array/string, hash map, two pointers và sliding window", "Stack/queue, linked list, tree, graph và heap", "Binary search, greedy, backtracking và dynamic programming"],
    sequence: "Brute force → nhận dạng pattern → invariant → tối ưu → test edge cases",
    payflow: "Hữu ích cho batching, rate limiting, deduplication, top-K, interval và xử lý luồng dữ liệu.",
    interview: "Nói rõ giả định, độ phức tạp, edge case và lý do chọn cấu trúc dữ liệu trước khi code."
  },
  {
    id: "operations", icon: "🛠️", title: "Vận hành & Phỏng vấn",
    summary: "Biến kiến thức thành quy trình chẩn đoán, quyết định và câu trả lời có bằng chứng.",
    goals: ["Incident response, rollback và điều tra theo tín hiệu", "SLO, alert, runbook và postmortem", "Cách trình bày trade-off và trải nghiệm dự án"],
    sequence: "Triệu chứng → phạm vi ảnh hưởng → tín hiệu → giả thuyết → giảm thiệt hại → nguyên nhân gốc",
    payflow: "Ưu tiên bảo vệ giao dịch và khả năng đối soát; không sửa dữ liệu tiền trực tiếp khi chưa có audit trail.",
    interview: "Dùng STAR cho behavioral và dùng số liệu, log, metric hoặc test làm bằng chứng."
  },
  {
    id: "other-stacks", icon: "🧰", title: "Frontend & Stack phụ",
    summary: "Kiến thức tham khảo cho JavaScript, Angular, React, Node/NestJS và C#; không nằm trên đường học PayFlow mặc định.",
    goals: ["JavaScript runtime và bất đồng bộ", "Frontend framework, state và hiệu năng", "Node/NestJS, Express và C# khi cần đối chiếu stack"],
    sequence: "JavaScript → framework → networking/state → performance → backend JS",
    payflow: "Có thể dùng để xây dashboard quản trị hoặc client gọi PayFlow, nhưng không thay thế kiến thức backend cốt lõi.",
    interview: "Chỉ học sâu track này nếu vị trí ứng tuyển yêu cầu; tránh làm loãng lộ trình Java Backend."
  }
];

window.getLearningDomain = function (topic) {
  var t = String(topic || "").toLowerCase();
  var rules = [
    ["payflow", /payflow|payment domain|ledger|settlement|reconciliation|refund workflow|vnpay|webhook|callback|ipn|idempotency & inbox|notification service|state machine.*risk/],
    ["algorithms", /thuật toán|leetcode|data structure|ctdl/],
    ["other-stacks", /javascript|angular|react(js)?\b|node\.js|nestjs|express|tối ưu fe|công cụ fe|c#|frontend/],
    ["security", /bảo mật|security|jwt|oauth|owasp|csp|hsts|cors/],
    ["delivery", /deploy|devops|docker|kubernetes|cloud|aws|ci.?cd|git$|observability/],
    ["operations", /vận hành|behavioral|tình huống|logging/],
    ["architecture", /system design|microservice|hexagonal|ddd|thiết kế hệ thống|phân rã service|hệ phân tán|clean \/ hexagonal/],
    ["integration", /kafka|messaging|redis|cache|resilience|grpc|graphql|elasticsearch|gateway/],
    ["data", /sql|postgres|jdbc|jpa|hibernate|transaction|database|flyway|migration|connection pool/],
    ["spring", /spring|validation|exception handling/],
    ["java-runtime", /jvm|memory|gc|thread|concurrency|java io|nio|hệ điều hành/],
    ["java-language", /java|oop|collection|generic|lớp object|design pattern/]
  ];
  for (var i = 0; i < rules.length; i++) if (rules[i][1].test(t)) return rules[i][0];
  return "operations";
};

window.findLearningDomain = function (id) {
  return window.LEARNING_DOMAINS.find(function (d) { return d.id === id; }) || window.LEARNING_DOMAINS[0];
};
