// Lớp biên tập đặt sau dữ liệu sinh từ Excel để các sửa lỗi không bị mất khi extract lại.
(function () {
  var theoryFixes = {
    "Java Core-3": {
      question: "Java có những nhóm kiểu dữ liệu nào? Tám kiểu primitive là gì?",
      summary: "Java có 8 kiểu primitive và các kiểu tham chiếu. Primitive lưu giá trị đơn giản; biến tham chiếu trỏ tới object hoặc array.",
      answer: "Java có hai nhóm kiểu dữ liệu:\n\n1. Primitive: byte, short, int, long, float, double, char và boolean. Biến primitive chứa trực tiếp một giá trị thuộc kiểu tương ứng.\n2. Reference: class, interface, array, enum và record. Biến reference chứa một tham chiếu tới object; nó có thể mang giá trị null.\n\nString không phải primitive mà là một class bất biến. Collection chỉ chứa object nên khi đưa int vào List<Integer>, Java thực hiện autoboxing từ int sang Integer."
    },
    "Java Core-5": { question: "Từ khóa final áp dụng cho biến, phương thức và lớp có ý nghĩa gì?" },
    "Java Core-8": {
      question: "StringBuilder và StringBuffer khác nhau thế nào? Khi nào nên dùng mỗi loại?",
      summary: "Cả hai là chuỗi có thể thay đổi. StringBuilder nhanh hơn cho code đơn luồng; StringBuffer đồng bộ hóa các method nhưng thường không phải lựa chọn tốt nhất để phối hợp nhiều luồng."
    },
    "Java Core-19": {
      question: "Array và Java Collection khác nhau thế nào? Khi nào nên dùng mỗi loại?",
      summary: "Array có kích thước cố định và chứa được primitive; Collection linh hoạt hơn, chỉ chứa object và cung cấp nhiều cấu trúc như List, Set, Queue. Map thuộc Collection Framework nhưng không kế thừa Collection."
    },
    "Java Core-21": {
      question: "Khi nào nên dùng static và rủi ro khi lạm dụng static là gì?",
      summary: "Dùng static cho trạng thái hoặc hành vi thực sự thuộc về lớp. Tránh mutable static state vì nó tạo phụ thuộc toàn cục, khó test và dễ gây race condition."
    },
    "Java Core-26": {
      question: "Từ khóa this trong Java trỏ tới đâu và được dùng trong những trường hợp nào?",
      summary: "this là tham chiếu tới object hiện tại; thường dùng để phân biệt field với parameter, gọi constructor khác hoặc truyền object hiện tại."
    },
    "Java Core-27": {
      question: "Upcasting trong Java là gì và nó ảnh hưởng thế nào tới method có thể gọi?",
      summary: "Upcasting gán object lớp con vào biến kiểu lớp cha. Phần API nhìn thấy phụ thuộc kiểu biến, còn method override chạy theo object thật tại runtime."
    },
    "Java Core-28": {
      question: "Downcasting trong Java là gì? Làm sao tránh ClassCastException?",
      summary: "Downcasting ép tham chiếu lớp cha về lớp con. Chỉ thực hiện khi object thật đúng kiểu; ưu tiên pattern matching instanceof ở Java hiện đại."
    },
    "Java Core-37": { question: "JVM là gì và thực thi bytecode Java như thế nào?" },
    "Java Core-42": { question: "Jakarta EE (trước đây là Java EE) là gì và khác Java SE ở điểm nào?" },
    "Java Core-43": {
      question: "Toán tử == và phương thức equals() khác nhau thế nào?",
      summary: "Với primitive, == so sánh giá trị. Với object, == so sánh hai tham chiếu có trỏ cùng object; equals() biểu diễn bình đẳng logic nếu class override đúng.",
      answer: "Với primitive, == so sánh giá trị. Với reference, == chỉ kiểm tra hai biến có trỏ tới cùng một object hay không. equals() là method của Object; mặc định nó gần giống ==, nhưng các class như String, BigDecimal hoặc record có thể override để so sánh nội dung.\n\nVì vậy hãy dùng equals() khi cần bình đẳng theo nghiệp vụ, dùng == cho primitive, enum hoặc khi chủ ý kiểm tra cùng identity. Khi đối tượng có thể null, dùng Objects.equals(a, b).",
      examples: ["String a = new String(\"PayFlow\");\nString b = new String(\"PayFlow\");\nSystem.out.println(a == b);       // false: khác object\nSystem.out.println(a.equals(b)); // true: cùng nội dung\nSystem.out.println(Objects.equals(null, null)); // true"]
    },
    "Java Core-44": {
      question: "equals() mặc định của Object hoạt động thế nào?",
      summary: "Object.equals() mặc định so sánh identity. Muốn value object so sánh theo dữ liệu, class phải override equals() và hashCode().",
      answer: "Cài đặt mặc định của Object.equals() chỉ trả true khi hai tham chiếu trỏ tới cùng một object. Nó không tự so sánh từng field. Các value object như Money thường phải override equals()/hashCode(), hoặc dùng record để nhận cài đặt dựa trên component một cách tự động.",
      examples: []
    },
    "Java Core-45": {
      question: "Vì sao override equals() thì phải override hashCode()?",
      summary: "Hai object bằng nhau theo equals() bắt buộc phải có cùng hashCode(); nếu vi phạm, HashMap và HashSet có thể không tìm thấy phần tử đã lưu.",
      answer: "Contract quy định: nếu a.equals(b) là true thì a.hashCode() phải bằng b.hashCode(). Collection dạng hash chọn bucket bằng hashCode() rồi mới kiểm tra equals(). Chỉ override equals() có thể khiến hai object bằng nhau rơi vào hai bucket khác nhau, gây lỗi contains/get/remove khó phát hiện.",
      examples: []
    },
    "Java Core-46": {
      question: "Có thể override toán tử == hoặc phương thức equals() trong Java không?",
      summary: "Java không hỗ trợ operator overloading cho ==. equals() là instance method nên có thể override; static method chỉ bị che khuất chứ không override.",
      answer: "Không thể override toán tử == trong Java. Với object, ý nghĩa của == luôn là so sánh identity. equals() là method có thể override để định nghĩa bình đẳng logic. Khi override, phải giữ các tính chất phản xạ, đối xứng, bắc cầu, nhất quán và xử lý null; đồng thời override hashCode().",
      examples: []
    },
    "Java Core-47": {
      question: "Có nên chọn == thay equals() chỉ vì nhanh hơn không?",
      summary: "Không. Hãy chọn phép so sánh theo đúng ngữ nghĩa; chênh lệch nhỏ không đáng đổi lấy kết quả sai.",
      answer: "== có thể rẻ hơn vì chỉ so sánh giá trị primitive hoặc identity, còn equals() có thể duyệt nhiều field. Tuy nhiên lựa chọn phải dựa vào ngữ nghĩa. Nếu cần so sánh nội dung mà dùng ==, chương trình sai dù nhanh hơn. Chỉ tối ưu equals()/hashCode() sau khi đo hiệu năng và vẫn phải giữ đúng contract.",
      examples: []
    },
    "Java Spring-12": {
      question: "IoC và Dependency Injection trong Spring là gì? Chúng liên quan nhau thế nào?",
      summary: "IoC là nguyên tắc chuyển quyền tạo và phối hợp object cho container; DI là cách Spring cung cấp dependency cho object, ưu tiên constructor injection."
    },
    "Java Spring-19": {
      question: "OAuth2 và OpenID Connect khác nhau thế nào? Luồng Authorization Code hoạt động ra sao?",
      summary: "OAuth2 là khung ủy quyền truy cập tài nguyên. OpenID Connect bổ sung lớp định danh để đăng nhập người dùng.",
      answer: "OAuth2 chủ yếu giải quyết authorization: cho client nhận access token để truy cập tài nguyên với scope giới hạn mà không cầm mật khẩu người dùng. Nó không tự định nghĩa danh tính người dùng. OpenID Connect (OIDC) xây trên OAuth2, bổ sung ID Token và UserInfo để thực hiện authentication.\n\nTrong Authorization Code flow: client chuyển người dùng tới Authorization Server; người dùng đăng nhập và đồng ý; server trả authorization code; backend đổi code kèm PKCE/client authentication lấy token; client dùng access token gọi Resource Server. Redirect URI, state, nonce và PKCE phải được kiểm tra để chống giả mạo hoặc đánh cắp code."
    },
    "SQL-2": { question: "WHERE và HAVING khác nhau thế nào trong SQL?" },
    "SQL-4": { question: "Viết JOIN để lấy CustomerName và OrderID từ Customers và Orders như thế nào?" },
    "JavaScript (FE)-22": {
      question: "Arrow function khác function thông thường ở this và arguments như thế nào?",
      summary: "Arrow function không có this, arguments, super hay new.target riêng; nó lấy theo lexical scope và không dùng làm constructor."
    },
    "Angular-18": {
      question: "Dependency Injection trong Angular là gì và injector cung cấp service như thế nào?",
      summary: "Class khai báo dependency qua constructor hoặc inject(); injector tìm provider theo token và quản lý vòng đời instance theo phạm vi cấu hình."
    }
  };

  (window.THEORY_DATA || []).forEach(function (topic) {
    topic.items.forEach(function (item) {
      if (theoryFixes[item.id]) Object.assign(item, theoryFixes[item.id]);
    });
  });

  var quizFixes = {
    "4 tính chất của OOP là?": "Bốn tính chất là đóng gói, kế thừa, đa hình và trừu tượng. Đóng gói bảo vệ trạng thái; kế thừa tái sử dụng quan hệ is-a; đa hình cho phép cùng interface có nhiều implementation; trừu tượng chỉ lộ phần cần thiết.",
    "Vấn đề N+1 query là gì?": "N+1 xảy ra khi ứng dụng chạy 1 query lấy danh sách cha rồi thêm N query lấy quan hệ cho từng phần tử. Phát hiện qua SQL log/metric query count; xử lý bằng JOIN FETCH, EntityGraph, batch fetching hoặc DTO projection theo use case.",
    "Vấn đề N+1 query được nhận diện qua dấu hiệu nào?": "Dấu hiệu điển hình là một query chính theo sau bởi rất nhiều query gần giống nhau chỉ khác khóa ngoại. Bật SQL log hoặc đo query count để xác nhận, rồi chọn JOIN FETCH, EntityGraph, batch fetching hoặc projection phù hợp.",
    "Từ khóa transient trong serialization có tác dụng gì?": "Field transient bị bỏ qua khi Java serialization ghi object ra stream; khi đọc lại nó nhận giá trị mặc định. transient không phải cơ chế mã hóa và không tự bảo vệ secret ở những định dạng khác như JSON.",
    "serialVersionUID dùng để làm gì?": "serialVersionUID là mã phiên bản của class Serializable. Khi đọc object, JVM so UID trong stream với UID của class hiện tại; không khớp sẽ ném InvalidClassException.",
    "Overriding (ghi đè) yêu cầu điều nào sau đây?": "Method ở lớp con phải có cùng signature, kiểu trả về tương thích covariant và không được giảm mức truy cập; checked exception cũng không được rộng hơn. @Override giúp compiler phát hiện khai báo sai.",
    "Nguyên tắc Liskov Substitution (L trong SOLID) phát biểu gì?": "Đối tượng của lớp con phải thay thế được lớp cha mà không phá hành vi mong đợi, precondition, postcondition hoặc invariant. Nếu code dùng kiểu cha nhưng lớp con làm kết quả sai, quan hệ kế thừa đã vi phạm LSP.",
    "Covariant return type cho phép điều gì khi override?": "Khi override, method ở lớp con được phép trả về một kiểu con của kiểu trả về ở lớp cha. Ví dụ method cha trả Object thì method con có thể trả String.",
    "equals() phải thỏa các tính chất nào?": "equals() phải phản xạ, đối xứng, bắc cầu, nhất quán và luôn false khi so với null. Nếu override equals() thì phải override hashCode() để object hoạt động đúng trong HashMap/HashSet.",
    "toString() mặc định của Object trả về gì?": "Object.toString() trả chuỗi dạng tên-lớp@hash-hex, tương đương getClass().getName() + '@' + Integer.toHexString(hashCode()). Nên override để log/debug có ý nghĩa nhưng không đưa secret vào kết quả.",
    "map() và flatMap() trong Stream khác nhau ra sao?": "map biến mỗi phần tử thành đúng một kết quả và có thể tạo Stream<Stream<T>>. flatMap vừa biến đổi vừa làm phẳng nhiều stream/collection con thành một Stream<T> duy nhất.",
    "Optional dùng để giải quyết vấn đề gì?": "Optional biểu diễn rõ một giá trị trả về có thể vắng mặt, giúp caller xử lý bằng map, orElseGet hoặc ifPresent thay vì nhận null mơ hồ. Không nên dùng Optional làm field/entity hoặc gọi get() khi chưa kiểm tra.",
    "reduce() trong Stream làm gì?": "reduce kết hợp tuần tự các phần tử thành một giá trị bằng phép tích lũy, ví dụ tính tổng. Phép kết hợp phải associative nếu chạy parallel; khi gom collection nên dùng collect thay vì reduce.",
    "Collectors.groupingBy() dùng để làm gì?": "groupingBy phân nhóm phần tử theo một classifier và trả Map<key, list>. Có thể kết hợp downstream collector như counting, mapping hoặc summingInt để tổng hợp ngay trong từng nhóm.",
    "Spring Security xử lý bảo mật chủ yếu qua cơ chế nào?": "Spring Security xử lý request qua một chuỗi security filter. Filter thiết lập Authentication trong SecurityContext; authorization rules ở SecurityFilterChain hoặc @PreAuthorize quyết định principal có được truy cập tài nguyên hay không.",
    "GraphQL trả HTTP status gì khi có lỗi nghiệp vụ?": "GraphQL thường vẫn trả HTTP 200 nếu request GraphQL được xử lý, còn lỗi nghiệp vụ nằm trong mảng errors và data có thể chỉ hoàn thành một phần. Vì vậy monitoring phải đọc errors, không chỉ dựa vào HTTP status.",
    "Thứ tự đánh giá quyền IAM là gì?": "AWS mặc định deny. Sau khi tổng hợp identity policy, resource policy, permission boundary và SCP, explicit deny luôn thắng; nếu không có deny thì phải có ít nhất một explicit allow, nếu không vẫn bị từ chối.",
    "Vì sao KHÔNG dùng double để lưu số tiền?": "double/float biểu diễn nhị phân gần đúng nên nhiều số thập phân như 0.1 không thể lưu chính xác, dễ làm sai cộng dồn và đối soát. Dùng BigDecimal với scale/rounding rõ ràng hoặc số nguyên theo đơn vị nhỏ nhất.",
    "Kafka 'exactly-once semantics' KHÔNG bao trùm được điều gì?": "Kafka EOS hỗ trợ read-process-write trong phạm vi Kafka, nhưng không tự tạo một transaction nguyên tử giữa Kafka và database ngoài. Muốn DB commit và event nhất quán vẫn cần Outbox; consumer ghi DB cần idempotency/Inbox.",
    "Consumer dùng assign() thủ công thay vì subscribe() gặp hạn chế gì?": "assign() gán partition trực tiếp nên consumer không tham gia group coordination và không được Kafka tự rebalance. Ứng dụng phải tự quản lý partition/offset và công cụ group có thể không hiển thị như khi dùng subscribe().",
    "Tăng số partition của topic gây hệ quả gì?": "Tăng partition làm thay đổi phép ánh xạ key→partition, nên cùng một key có thể sang partition khác so với trước và thứ tự lịch sử toàn key không còn đơn giản. Partition chỉ tăng, không giảm; nhiều partition cũng tăng chi phí broker và rebalance.",
    "Không có DLT (Dead Letter Topic) thì poison message gây hậu quả gì?": "Poison message có thể bị retry vô hạn, chặn partition và khiến consumer lag tăng dù các message sau hoàn toàn hợp lệ. Sau retry có giới hạn, chuyển nó sang DLT cùng metadata lỗi để luồng chính tiếp tục và có thể xử lý lại.",
    "Nhiều pod cùng khởi động thì Flyway xử lý thế nào?": "Flyway dùng bảng schema history và cơ chế khóa để chỉ một instance thực hiện migration tại một thời điểm; các pod khác chờ rồi kiểm tra lại version. Migration vẫn phải ngắn, tương thích ngược và được thử trước khi rolling deploy.",
    "Vì sao migration phải tương thích ngược với phiên bản code cũ?": "Trong rolling deployment, code cũ và code mới cùng chạy một thời gian trên cùng schema. Mẫu expand/contract thêm cấu trúc tương thích trước, chuyển code/dữ liệu, rồi chỉ xóa cấu trúc cũ sau khi không còn instance cũ.",
    "Vì sao ddl-auto=update bị cấm ở production?": "ddl-auto=update tự suy diễn thay đổi schema khi app khởi động, khó review, rollback và phối hợp nhiều version. Production nên dùng migration có version như Flyway và đặt ddl-auto=validate để phát hiện entity lệch schema.",
    "MimeMessageHelper.setText(html, true) — tham số true có ý nghĩa gì?": "Tham số true báo cho MimeMessageHelper rằng nội dung truyền vào là HTML; false coi nó là plain text. Cần encode UTF-8 và chỉ render template từ dữ liệu đã escape phù hợp.",
    "DKIM hoạt động thế nào?": "Mail server gửi dùng private key ký một số header và body; DNS công bố public key theo selector. Server nhận verify chữ ký để biết nội dung không bị sửa và domain gửi được ủy quyền.",
    "Điều gì TUYỆT ĐỐI không được ghi vào log của Notification Service?": "Không log password, token, API key, SMTP credential, nội dung nhạy cảm hoặc dữ liệu cá nhân đầy đủ. Chỉ log identifier cần thiết, mask email/phone và kiểm soát retention/quyền truy cập log.",
    "Vì sao phải cấu hình timeout cho SMTP?": "Nếu không có connect/read/write timeout, thread gửi mail có thể chờ rất lâu khi SMTP treo và làm cạn pool. Cấu hình cả ba timeout, giới hạn retry và chuyển lỗi kéo dài sang hàng đợi/DLT.",
    "Vì sao không nên dùng executor mặc định cho @Async?": "Executor mặc định có thể không có giới hạn hoặc không phù hợp tải thực tế, gây tăng thread/queue và cạn tài nguyên. Hãy cấu hình core/max pool, queue capacity, rejection policy, metric và cơ chế backpressure rõ ràng."
  };

  (window.QUIZ_DATA || []).forEach(function (q) {
    if (quizFixes[q.question]) q.explain = quizFixes[q.question];
  });
})();
