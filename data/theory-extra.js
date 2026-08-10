// Câu hỏi Q&A bổ sung do Claude soạn (không sinh từ Excel — sửa tay thoải mái).
// Được merge vào THEORY_DATA theo tên topic khi web khởi động.
window.THEORY_EXTRA = [
 {
  "topic": "Git",
  "items": [
   {
    "question": "Phân biệt git reset và git revert?",
    "answer": "git reset: di chuyển HEAD (và có thể cả staging/working dir) về một commit cũ, XÓA lịch sử các commit sau đó — chỉ nên dùng trên nhánh cá nhân chưa push.\n- --soft: giữ thay đổi trong staging.\n- --mixed (mặc định): giữ thay đổi trong working dir, bỏ khỏi staging.\n- --hard: xóa sạch thay đổi.\n\ngit revert: tạo một commit MỚI đảo ngược thay đổi của commit cũ, KHÔNG xóa lịch sử — an toàn khi dùng trên nhánh chung đã push.",
    "examples": ["git reset --hard HEAD~1   # bỏ hẳn commit cuối\ngit revert abc123         # tạo commit mới đảo ngược commit abc123"]
   },
   {
    "question": "git stash dùng để làm gì?",
    "answer": "git stash cất tạm các thay đổi chưa commit vào một 'ngăn kéo' để working directory sạch sẽ (ví dụ cần chuyển nhánh gấp để fix bug), sau đó lấy lại bằng git stash pop/apply.\n- git stash pop: lấy ra và xóa khỏi stash.\n- git stash apply: lấy ra nhưng vẫn giữ trong stash.\n- git stash list: xem danh sách các stash.",
    "examples": ["git stash              # cất thay đổi\ngit checkout hotfix    # chuyển nhánh xử lý việc khác\ngit checkout feature   # quay lại\ngit stash pop          # lấy lại thay đổi"]
   },
   {
    "question": "git fetch khác gì git pull?",
    "answer": "git fetch: tải các commit mới từ remote về local NHƯNG không merge vào nhánh hiện tại — bạn có thể xem trước thay đổi rồi tự quyết định merge.\n\ngit pull = git fetch + git merge (hoặc + git rebase nếu cấu hình): tải về và gộp ngay vào nhánh hiện tại.\n\nKhi muốn an toàn/kiểm soát, dùng fetch rồi tự merge; pull tiện hơn cho luồng làm việc hằng ngày.",
    "examples": []
   },
   {
    "question": "git cherry-pick dùng khi nào?",
    "answer": "git cherry-pick <commit> lấy đúng MỘT (hoặc vài) commit từ nhánh khác áp vào nhánh hiện tại, thay vì merge cả nhánh.\n\nDùng khi: cần đưa gấp một bản fix từ nhánh develop sang nhánh release/hotfix mà không muốn kéo theo các thay đổi khác.",
    "examples": ["git checkout release/1.0\ngit cherry-pick a1b2c3   # chỉ lấy commit a1b2c3 từ develop"]
   },
   {
    "question": "Giải quyết conflict khi merge như thế nào?",
    "answer": "Khi hai nhánh cùng sửa một đoạn code, Git không tự gộp được và đánh dấu conflict trong file bằng các marker <<<<<<<, =======, >>>>>>>.\n\nCác bước xử lý:\n1. git status xem file nào bị conflict.\n2. Mở file, chọn giữ code của mình / của họ / kết hợp cả hai, xóa các marker.\n3. git add <file> đánh dấu đã xử lý.\n4. git commit (hoặc git merge --continue) để hoàn tất.\n\nCó thể hủy giữa chừng bằng git merge --abort.",
    "examples": ["<<<<<<< HEAD\ncode của nhánh hiện tại\n=======\ncode của nhánh được merge vào\n>>>>>>> feature-x"]
   },
   {
    "question": "Phân biệt git merge --squash và merge thường?",
    "answer": "Merge thường: giữ nguyên toàn bộ lịch sử commit của nhánh feature, có thể tạo thêm merge commit.\n\nSquash merge: gộp TẤT CẢ commit của nhánh feature thành MỘT commit duy nhất trên nhánh đích — lịch sử gọn gàng, hay dùng khi merge Pull Request (một feature = một commit).\n\nNhược điểm squash: mất lịch sử chi tiết từng commit nhỏ của feature.",
    "examples": ["git checkout main\ngit merge --squash feature-login\ngit commit -m \"Add login feature\""]
   },
   {
    "question": "HEAD trong Git là gì? Detached HEAD là gì?",
    "answer": "HEAD là con trỏ chỉ tới commit bạn đang đứng — bình thường HEAD trỏ vào một nhánh (branch), nhánh trỏ vào commit mới nhất.\n\nDetached HEAD: khi checkout thẳng vào một commit (git checkout abc123) thay vì một nhánh — HEAD trỏ trực tiếp vào commit. Nếu tạo commit mới ở trạng thái này rồi chuyển đi, commit đó có thể bị mất (không nhánh nào trỏ tới). Muốn giữ lại thì tạo nhánh: git switch -c ten-nhanh-moi.",
    "examples": []
   },
   {
    "question": "Quy trình làm việc với Git Flow cơ bản?",
    "answer": "Git Flow là mô hình phân nhánh phổ biến:\n- main/master: code production, luôn ổn định.\n- develop: nhánh phát triển chính, tích hợp các feature.\n- feature/*: tách từ develop, làm xong merge lại develop.\n- release/*: tách từ develop khi chuẩn bị phát hành, chỉ fix bug nhỏ, xong merge vào cả main và develop.\n- hotfix/*: tách từ main để sửa lỗi khẩn trên production, xong merge lại main và develop.\n\nNgoài ra còn các mô hình đơn giản hơn: GitHub Flow (chỉ main + feature branch + Pull Request), Trunk-Based Development.",
    "examples": []
   },
   {
    "question": "git rebase -i (interactive rebase) dùng để làm gì?",
    "answer": "Interactive rebase cho phép chỉnh sửa lại lịch sử commit trước khi chia sẻ:\n- pick: giữ nguyên commit.\n- squash/fixup: gộp commit vào commit trước.\n- reword: sửa message.\n- drop: bỏ commit.\n- Đổi thứ tự các dòng = đổi thứ tự commit.\n\nHay dùng để dọn các commit 'wip', 'fix typo' thành một commit sạch trước khi tạo Pull Request. KHÔNG rebase các commit đã push lên nhánh chung.",
    "examples": ["git rebase -i HEAD~3   # chỉnh sửa 3 commit gần nhất"]
   },
   {
    "question": ".gitignore hoạt động thế nào? File đã lỡ commit có ignore được không?",
    "answer": ".gitignore liệt kê các pattern file/thư mục Git sẽ KHÔNG theo dõi (node_modules/, *.log, target/, .env...).\n\nLưu ý quan trọng: .gitignore chỉ có tác dụng với file CHƯA được track. File đã lỡ commit rồi thì phải gỡ khỏi index trước:\ngit rm --cached <file> (giữ file trên đĩa, chỉ bỏ khỏi Git) rồi commit lại.",
    "examples": ["# .gitignore\nnode_modules/\ntarget/\n*.log\n.env"]
   }
  ]
 },
 {
  "topic": "C#",
  "items": [
   {
    "question": "Phân biệt class và struct trong C#?",
    "answer": "class: kiểu tham chiếu (reference type) — biến lưu địa chỉ, cấp phát trên heap, gán biến là copy tham chiếu, có kế thừa.\n\nstruct: kiểu giá trị (value type) — biến lưu trực tiếp dữ liệu (thường trên stack), gán biến là copy toàn bộ giá trị, không kế thừa được từ struct/class khác (chỉ implement interface).\n\nDùng struct cho dữ liệu nhỏ, bất biến (Point, DateTime...); dùng class cho hầu hết trường hợp còn lại.",
    "examples": []
   },
   {
    "question": "async/await trong C# hoạt động thế nào?",
    "answer": "async đánh dấu method bất đồng bộ, trả về Task/Task<T>. await tạm 'nhả' luồng hiện tại trong khi chờ tác vụ I/O hoàn thành (không block thread), khi xong thì tiếp tục chạy phần code phía sau.\n\nLợi ích: tăng khả năng phục vụ đồng thời (đặc biệt web server), UI không bị đơ.\n\nLưu ý: tránh async void (trừ event handler), tránh .Result/.Wait() gây deadlock.",
    "examples": ["public async Task<string> GetDataAsync()\n{\n    using var client = new HttpClient();\n    string result = await client.GetStringAsync(\"https://api.example.com\");\n    return result;\n}"]
   },
   {
    "question": "LINQ là gì? Deferred execution nghĩa là gì?",
    "answer": "LINQ (Language Integrated Query) là cú pháp truy vấn dữ liệu thống nhất ngay trong C# cho collection, database (EF), XML... với các toán tử Where, Select, GroupBy, OrderBy, Join...\n\nDeferred execution (thực thi trì hoãn): câu truy vấn LINQ (IEnumerable/IQueryable) CHƯA chạy khi khai báo, chỉ chạy khi duyệt kết quả (foreach, ToList(), Count()...). Nhờ đó có thể ghép nối điều kiện trước khi thực thi; nhưng cũng dễ gây bug nếu dữ liệu nguồn thay đổi trước khi duyệt.",
    "examples": ["var query = list.Where(x => x.Age > 18);  // chưa chạy\nvar result = query.ToList();               // chạy tại đây"]
   },
   {
    "question": "Phân biệt IEnumerable và IQueryable?",
    "answer": "IEnumerable<T>: duyệt dữ liệu TRONG BỘ NHỚ (LINQ to Objects). Điều kiện Where được thực thi sau khi đã lấy dữ liệu về.\n\nIQueryable<T>: xây dựng biểu thức truy vấn (expression tree) rồi DỊCH THÀNH SQL gửi xuống database (Entity Framework). Điều kiện Where được thực thi ở phía database — hiệu quả hơn nhiều với dữ liệu lớn.\n\nQuy tắc: khi truy vấn DB, giữ IQueryable càng lâu càng tốt, chỉ ToList() ở bước cuối.",
    "examples": []
   },
   {
    "question": "Dependency Injection trong ASP.NET Core?",
    "answer": "ASP.NET Core có DI container tích hợp sẵn. Đăng ký service trong Program.cs với 3 vòng đời:\n- AddTransient: tạo mới mỗi lần được yêu cầu.\n- AddScoped: một instance cho mỗi HTTP request.\n- AddSingleton: một instance duy nhất cho cả ứng dụng.\n\nSau đó inject qua constructor. Lợi ích: giảm phụ thuộc cứng, dễ test (mock), dễ thay thế implementation.",
    "examples": ["builder.Services.AddScoped<IOrderService, OrderService>();\n\npublic class OrderController : ControllerBase\n{\n    private readonly IOrderService _service;\n    public OrderController(IOrderService service) => _service = service;\n}"]
   },
   {
    "question": "Phân biệt string và StringBuilder trong C#?",
    "answer": "string là immutable (bất biến): mỗi lần nối chuỗi tạo ra object mới → nối chuỗi trong vòng lặp lớn rất tốn bộ nhớ và chậm.\n\nStringBuilder là mutable: thao tác Append/Insert sửa trực tiếp trên buffer nội bộ, hiệu quả khi ghép nhiều chuỗi.\n\n(Tương tự String vs StringBuilder/StringBuffer bên Java.)",
    "examples": ["var sb = new StringBuilder();\nfor (int i = 0; i < 10000; i++) sb.Append(i).Append(\",\");\nstring result = sb.ToString();"]
   },
   {
    "question": "Nullable reference types và toán tử ?, ??, ?. trong C#?",
    "answer": "- T? : kiểu cho phép null (int? x = null). Từ C# 8, reference type cũng bật được nullable check (string? cảnh báo khi có thể null).\n- x?.Prop (null-conditional): nếu x null thì trả null thay vì ném NullReferenceException.\n- x ?? y (null-coalescing): trả x nếu khác null, ngược lại trả y.\n- x ??= y: gán y cho x nếu x đang null.\n\nGiúp xử lý null gọn và an toàn hơn.",
    "examples": ["string name = user?.Profile?.Name ?? \"Khách\";"]
   },
   {
    "question": "Exception handling trong C#: try/catch/finally, when nào dùng custom exception?",
    "answer": "try { } catch (SpecificException ex) { } finally { }: catch từ exception cụ thể đến chung; finally luôn chạy (đóng tài nguyên). using declaration tự Dispose tài nguyên IDisposable.\n\nTạo custom exception (kế thừa Exception) khi cần biểu diễn lỗi nghiệp vụ riêng (OrderNotFoundException) để tầng trên catch và xử lý phân biệt với lỗi hệ thống. Không dùng exception để điều khiển luồng thông thường.",
    "examples": ["public class OrderNotFoundException : Exception\n{\n    public OrderNotFoundException(int id)\n        : base($\"Không tìm thấy đơn hàng {id}\") { }\n}"]
   }
  ]
 },
 {
  "topic": "SQL",
  "items": [
   {
    "question": "Index là gì? Khi nào nên / không nên đánh index?",
    "answer": "Index là cấu trúc dữ liệu (thường là B-Tree) giúp tìm kiếm nhanh mà không phải quét toàn bảng (full table scan) — giống mục lục sách.\n\nNên đánh index: cột hay xuất hiện trong WHERE, JOIN, ORDER BY; cột có độ chọn lọc cao (nhiều giá trị khác nhau).\n\nKhông nên: bảng nhỏ; cột ít giá trị khác nhau (giới tính); bảng ghi (INSERT/UPDATE/DELETE) nhiều hơn đọc — vì mỗi lần ghi phải cập nhật cả index; đánh quá nhiều index.\n\nLưu ý: index bị vô hiệu nếu dùng hàm lên cột (WHERE YEAR(created_at) = 2024) hoặc LIKE '%abc'.",
    "examples": ["CREATE INDEX idx_orders_customer ON Orders(CustomerID);"]
   },
   {
    "question": "Clustered index khác gì Non-clustered index?",
    "answer": "Clustered index: quyết định THỨ TỰ VẬT LÝ của dữ liệu trong bảng — mỗi bảng chỉ có tối đa 1 (thường là Primary Key). Lá của B-Tree chính là dữ liệu.\n\nNon-clustered index: cấu trúc riêng chứa giá trị cột index + con trỏ về hàng dữ liệu thật — một bảng có thể có nhiều. Tra cứu qua non-clustered có thể cần thêm bước lookup về bảng chính.",
    "examples": []
   },
   {
    "question": "Transaction là gì? Giải thích các tính chất ACID?",
    "answer": "Transaction là một nhóm thao tác được thực hiện như MỘT đơn vị: hoặc tất cả thành công (COMMIT) hoặc tất cả bị hủy (ROLLBACK).\n\nACID:\n- Atomicity (nguyên tử): tất cả hoặc không gì cả.\n- Consistency (nhất quán): dữ liệu luôn hợp lệ theo ràng buộc trước và sau transaction.\n- Isolation (cô lập): các transaction chạy đồng thời không ảnh hưởng lẫn nhau.\n- Durability (bền vững): đã commit thì không mất kể cả khi hệ thống sập.",
    "examples": ["BEGIN TRANSACTION;\nUPDATE Accounts SET Balance = Balance - 100 WHERE Id = 1;\nUPDATE Accounts SET Balance = Balance + 100 WHERE Id = 2;\nCOMMIT; -- hoặc ROLLBACK nếu có lỗi"]
   },
   {
    "question": "Các mức Isolation Level và các vấn đề dirty read, non-repeatable read, phantom read?",
    "answer": "Các vấn đề khi transaction chạy đồng thời:\n- Dirty read: đọc dữ liệu chưa commit của transaction khác.\n- Non-repeatable read: đọc lại cùng một hàng thấy giá trị khác (do transaction khác đã UPDATE + commit).\n- Phantom read: đọc lại cùng điều kiện thấy thêm/bớt hàng (do INSERT/DELETE).\n\nCác mức isolation (thấp → cao): READ UNCOMMITTED (dính cả 3) → READ COMMITTED (hết dirty read) → REPEATABLE READ (hết non-repeatable) → SERIALIZABLE (hết cả 3, nhưng chậm nhất). Mức càng cao càng an toàn nhưng càng giảm khả năng chạy đồng thời.",
    "examples": []
   },
   {
    "question": "Chuẩn hóa dữ liệu (Normalization) 1NF, 2NF, 3NF là gì?",
    "answer": "Chuẩn hóa là tách bảng để giảm trùng lặp dữ liệu và tránh bất thường khi thêm/sửa/xóa:\n- 1NF: mỗi ô chỉ chứa giá trị nguyên tử (không lưu danh sách trong 1 ô), không lặp nhóm cột.\n- 2NF: đạt 1NF + mọi cột không khóa phụ thuộc vào TOÀN BỘ khóa chính (loại phụ thuộc một phần — chỉ xảy ra với khóa ghép).\n- 3NF: đạt 2NF + không có phụ thuộc bắc cầu (cột không khóa phụ thuộc cột không khóa khác).\n\nDenormalization: cố tình gộp/trùng lặp để tăng tốc độ đọc (báo cáo, data warehouse).",
    "examples": []
   },
   {
    "question": "Subquery khác gì JOIN? Khi nào dùng cái nào?",
    "answer": "JOIN ghép các bảng theo điều kiện và trả dữ liệu từ nhiều bảng cùng lúc; thường được optimizer xử lý hiệu quả hơn.\n\nSubquery (truy vấn con) lồng trong SELECT/WHERE/FROM; dễ đọc với logic 'tồn tại/không tồn tại' (EXISTS, IN, NOT IN).\n\nKinh nghiệm: cần lấy cột từ cả 2 bảng → JOIN; chỉ cần lọc theo điều kiện tồn tại → EXISTS/IN. Lưu ý NOT IN gặp NULL sẽ trả kết quả rỗng — dùng NOT EXISTS an toàn hơn.",
    "examples": ["-- Khách có ít nhất 1 đơn hàng\nSELECT * FROM Customers c\nWHERE EXISTS (SELECT 1 FROM Orders o WHERE o.CustomerID = c.CustomerID);"]
   },
   {
    "question": "Phân biệt DELETE, TRUNCATE và DROP?",
    "answer": "- DELETE FROM t WHERE ...: xóa từng hàng theo điều kiện, ghi log từng hàng, rollback được, trigger chạy, không reset identity.\n- TRUNCATE TABLE t: xóa TOÀN BỘ hàng nhanh (giải phóng page), không WHERE, reset identity, thường không kích hoạt trigger DELETE.\n- DROP TABLE t: xóa cả bảng (cấu trúc + dữ liệu + index).",
    "examples": []
   },
   {
    "question": "Window function (ROW_NUMBER, RANK, DENSE_RANK) là gì?",
    "answer": "Window function tính toán trên một 'cửa sổ' các hàng liên quan mà KHÔNG gộp hàng như GROUP BY — mỗi hàng vẫn giữ nguyên, thêm cột kết quả.\n\n- ROW_NUMBER(): đánh số 1,2,3,4... không trùng.\n- RANK(): đồng hạng nhận cùng số, nhảy cóc (1,2,2,4).\n- DENSE_RANK(): đồng hạng cùng số, không nhảy (1,2,2,3).\n\nBài kinh điển: lấy lương cao thứ N, top N mỗi nhóm (PARTITION BY).",
    "examples": ["-- Top 1 lương mỗi phòng ban\nSELECT * FROM (\n  SELECT e.*, ROW_NUMBER() OVER (\n    PARTITION BY Department ORDER BY Salary DESC) AS rn\n  FROM Employees e\n) t WHERE rn = 1;"]
   },
   {
    "question": "Câu SQL kinh điển: tìm lương cao thứ 2?",
    "answer": "Nhiều cách:\n1. Subquery với MAX: lấy MAX của những lương nhỏ hơn MAX.\n2. LIMIT/OFFSET (MySQL/PostgreSQL) với DISTINCT.\n3. DENSE_RANK() = 2 (chuẩn nhất khi có lương trùng).",
    "examples": ["-- Cách 1\nSELECT MAX(Salary) FROM Employees\nWHERE Salary < (SELECT MAX(Salary) FROM Employees);\n\n-- Cách 2 (MySQL)\nSELECT DISTINCT Salary FROM Employees\nORDER BY Salary DESC LIMIT 1 OFFSET 1;\n\n-- Cách 3\nSELECT Salary FROM (\n  SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) r\n  FROM Employees) t\nWHERE r = 2;"]
   },
   {
    "question": "Stored Procedure và View khác nhau thế nào?",
    "answer": "View: một câu SELECT được đặt tên, dùng như bảng ảo — che giấu độ phức tạp, phân quyền đọc theo cột/hàng. Không nhận tham số.\n\nStored Procedure: khối lệnh SQL (có thể nhiều câu, có biến, IF/WHILE, transaction) lưu sẵn trên server, nhận tham số vào/ra, gọi bằng EXEC/CALL. Dùng cho nghiệp vụ phức tạp, giảm round-trip giữa app và DB.\n\nNgoài ra Function (UDF) trả về giá trị và gọi được trong SELECT nhưng bị hạn chế side-effect.",
    "examples": []
   },
   {
    "question": "N+1 query problem là gì và cách khắc phục?",
    "answer": "N+1: lấy danh sách N bản ghi bằng 1 query, rồi với MỖI bản ghi lại chạy thêm 1 query lấy dữ liệu liên quan → tổng N+1 query, rất chậm.\n\nHay gặp với ORM (JPA/Hibernate lazy loading, EF).\n\nKhắc phục: JOIN lấy một lần; JOIN FETCH / EntityGraph (JPA), Include (EF); hoặc batch fetching. Bật log SQL để phát hiện.",
    "examples": ["-- JPA: thay vì lazy load từng order.customer\nSELECT o FROM Order o JOIN FETCH o.customer"]
   }
  ]
 },
 {
  "topic": "Java Core",
  "items": [
   {
    "question": "Các môi trường chạy trong Java? (JVM, JRE, JDK)",
    "answer": "Ba thành phần tạo nên môi trường Java:\n- JVM (Java Virtual Machine): máy ảo thực thi bytecode (.class). Mỗi hệ điều hành có JVM riêng — nhờ vậy Java 'viết một lần, chạy mọi nơi'.\n- JRE (Java Runtime Environment) = JVM + thư viện chuẩn: đủ để CHẠY ứng dụng Java.\n- JDK (Java Development Kit) = JRE + công cụ phát triển (javac, javadoc, debugger): cần để VIẾT và biên dịch code.\n\nQuy trình: file .java → javac biên dịch → bytecode .class → JVM (JIT compiler) dịch thành mã máy và thực thi.",
    "examples": []
   },
   {
    "question": "Có bao nhiêu loại biến trong Java?",
    "answer": "3 loại biến:\n1. Biến cục bộ (local variable): khai báo trong method/block, chỉ sống trong block đó, PHẢI gán giá trị trước khi dùng (không có giá trị mặc định).\n2. Biến instance (non-static field): khai báo trong class ngoài method, thuộc về TỪNG object, có giá trị mặc định (0, null, false...).\n3. Biến class / biến static (static field): khai báo với từ khóa static, thuộc về class, dùng chung cho mọi object.",
    "examples": ["public class Student {\n    static String school = \"FPT\";  // biến class (static)\n    String name;                     // biến instance\n\n    void study() {\n        int hours = 2;               // biến cục bộ\n    }\n}"]
   },
   {
    "question": "Trường dữ liệu (field) là gì?",
    "answer": "Field (trường dữ liệu / thuộc tính) là biến được khai báo trực tiếp trong class, bên ngoài mọi method — thể hiện trạng thái (state) của object.\n\n- Field instance: mỗi object một bản riêng.\n- Field static: dùng chung cả class.\n\nTheo nguyên tắc đóng gói (encapsulation), field thường để private và truy cập qua getter/setter.",
    "examples": ["public class Account {\n    private String owner;      // field instance\n    private double balance;    // field instance\n\n    public double getBalance() { return balance; }\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}"]
   },
   {
    "question": "Cách khai báo biến lớp (biến static)?",
    "answer": "Biến lớp khai báo bằng từ khóa static trong class, ngoài method. Truy cập qua tên class (khuyến nghị) thay vì qua object.\n\nĐặc điểm:\n- Được tạo MỘT lần khi class được nạp vào bộ nhớ, tồn tại suốt vòng đời chương trình.\n- Mọi object chia sẻ chung một giá trị.\n- Kết hợp final để tạo hằng số: static final double PI = 3.14159 (đặt tên IN_HOA).",
    "examples": ["public class Counter {\n    static int count = 0;                 // biến lớp\n    static final int MAX = 100;           // hằng số\n\n    Counter() { count++; }\n}\n\n// Sử dụng\nnew Counter(); new Counter();\nSystem.out.println(Counter.count); // 2 — truy cập qua tên class"]
   },
   {
    "question": "Có bao nhiêu kiểu dữ liệu cơ sở (primitive) trong Java?",
    "answer": "8 kiểu primitive, chia 4 nhóm:\n- Số nguyên: byte (1 byte, -128..127), short (2 byte), int (4 byte, mặc định), long (8 byte, hậu tố L).\n- Số thực: float (4 byte, hậu tố f), double (8 byte, mặc định).\n- Ký tự: char (2 byte, Unicode, nháy đơn 'A').\n- Logic: boolean (true/false).\n\nMỗi kiểu primitive có wrapper class tương ứng (int → Integer, double → Double...) để dùng trong Collections, hỗ trợ autoboxing/unboxing tự động.",
    "examples": ["int age = 25;\nlong population = 8_000_000_000L;\ndouble price = 19.99;\nchar grade = 'A';\nboolean active = true;\n\n// Autoboxing: primitive → wrapper tự động\nList<Integer> nums = new ArrayList<>();\nnums.add(5); // int 5 tự thành Integer"]
   },
   {
    "question": "Kiểu enum là gì?",
    "answer": "enum (enumeration) là kiểu dữ liệu đặc biệt định nghĩa MỘT TẬP HỮU HẠN các hằng số có tên (ngày trong tuần, trạng thái đơn hàng...).\n\nƯu điểm so với hằng số int/String:\n- An toàn kiểu (type-safe): không truyền nhầm giá trị ngoài tập.\n- Dùng được trong switch, so sánh bằng ==.\n- Là class đặc biệt: có thể có field, constructor (private), method riêng.\n\nCác method sẵn có: values() (mảng mọi giá trị), valueOf(\"NAME\"), name(), ordinal().",
    "examples": ["public enum OrderStatus {\n    PENDING(\"Chờ xử lý\"),\n    SHIPPED(\"Đang giao\"),\n    DELIVERED(\"Đã giao\");\n\n    private final String label;\n    OrderStatus(String label) { this.label = label; }\n    public String getLabel() { return label; }\n}\n\n// Sử dụng\nOrderStatus st = OrderStatus.PENDING;\nswitch (st) {\n    case PENDING -> System.out.println(st.getLabel());\n    default -> {}\n}"]
   },
   {
    "question": "Biến dữ liệu là các biến dạng nào? (primitive vs reference)",
    "answer": "Biến trong Java chia 2 dạng theo cách lưu trữ:\n1. Biến kiểu nguyên thủy (primitive): lưu TRỰC TIẾP giá trị (int, double, boolean...). Gán biến = copy giá trị.\n2. Biến kiểu tham chiếu (reference): lưu ĐỊA CHỈ trỏ tới object trên heap (String, mảng, mọi object). Gán biến = copy địa chỉ — hai biến cùng trỏ một object, sửa qua biến này thì biến kia 'thấy' thay đổi.\n\nĐây là gốc rễ của các câu hỏi pass-by-value: Java LUÔN truyền tham trị, nhưng với reference thì 'giá trị' được truyền là địa chỉ object.",
    "examples": ["int a = 5;\nint b = a;      // copy giá trị\nb = 10;         // a vẫn = 5\n\nint[] x = {1, 2};\nint[] y = x;    // copy địa chỉ — cùng 1 mảng\ny[0] = 99;      // x[0] cũng = 99"]
   }
  ]
 },
 {
  "topic": "Node.js",
  "items": [
   {
    "question": "Node.js là gì? Vì sao Node.js đơn luồng mà vẫn phục vụ được nhiều request đồng thời?",
    "answer": "Node.js là môi trường chạy JavaScript phía server, xây trên V8 engine của Chrome, dùng kiến trúc event-driven + non-blocking I/O.\n\nBí quyết đồng thời: JavaScript chạy trên MỘT luồng chính (event loop), nhưng các thao tác I/O (đọc file, gọi DB, HTTP) được đẩy xuống hệ điều hành / thread pool (libuv) xử lý NGẦM. Luồng chính không đứng chờ I/O mà tiếp tục nhận request khác; khi I/O xong, callback được đưa vào hàng đợi cho event loop xử lý.\n\n→ Node hợp với ứng dụng I/O-bound (API, realtime, microservice); KHÔNG hợp CPU-bound (tính toán nặng sẽ chặn event loop — cần worker threads).",
    "examples": []
   },
   {
    "question": "Event loop trong Node.js hoạt động thế nào? Các phase chính?",
    "answer": "Event loop lặp qua các phase theo thứ tự:\n1. timers: chạy callback của setTimeout/setInterval đến hạn.\n2. pending callbacks: một số callback hệ thống.\n3. poll: nhận I/O mới, chạy callback I/O — phase quan trọng nhất.\n4. check: chạy setImmediate.\n5. close callbacks: sự kiện đóng (socket.on('close')).\n\nGiữa các phase, Node xử lý HẾT microtask: process.nextTick (ưu tiên cao nhất) rồi Promise callbacks.\n\nThứ tự ưu tiên nhớ nhanh: code đồng bộ → process.nextTick → Promise.then → setTimeout → setImmediate.",
    "examples": ["console.log('1');\nsetTimeout(() => console.log('2'), 0);\nsetImmediate(() => console.log('3'));\nPromise.resolve().then(() => console.log('4'));\nprocess.nextTick(() => console.log('5'));\nconsole.log('6');\n// Kết quả: 1 6 5 4 2 3 (2 và 3 có thể đổi chỗ tùy ngữ cảnh)"]
   },
   {
    "question": "Phân biệt process.nextTick(), setImmediate() và setTimeout(fn, 0)?",
    "answer": "- process.nextTick(fn): chạy NGAY sau khi code hiện tại xong, TRƯỚC mọi thứ khác (kể cả Promise). Lạm dụng có thể 'bỏ đói' event loop.\n- Promise.then: microtask, chạy sau nextTick nhưng trước timer.\n- setTimeout(fn, 0): macrotask, chạy ở phase timers của vòng lặp sau.\n- setImmediate(fn): chạy ở phase check, sau poll — trong callback I/O thì setImmediate LUÔN chạy trước setTimeout 0.",
    "examples": []
   },
   {
    "question": "CommonJS (require) khác ES Modules (import) thế nào?",
    "answer": "CommonJS (mặc định lịch sử của Node):\n- require() / module.exports, load ĐỒNG BỘ lúc runtime.\n- require được ở bất cứ đâu (trong if, function).\n\nES Modules (chuẩn hiện đại):\n- import / export, phân tích TĨNH lúc parse → hỗ trợ tree-shaking, kiểm tra lỗi sớm.\n- import phải ở đầu file (trừ dynamic import()).\n- Bật bằng \"type\": \"module\" trong package.json hoặc đuôi .mjs.\n\nTypeScript/NestJS viết cú pháp import nhưng thường compile về CommonJS.",
    "examples": ["// CommonJS\nconst express = require('express');\nmodule.exports = { myFunc };\n\n// ES Modules\nimport express from 'express';\nexport const myFunc = () => {};"]
   },
   {
    "question": "Callback hell là gì và các cách khắc phục?",
    "answer": "Callback hell: các callback lồng nhau nhiều tầng khi các thao tác bất đồng bộ phụ thuộc nhau — code hình 'kim tự tháp', khó đọc, khó xử lý lỗi.\n\nCách khắc phục theo tiến hóa:\n1. Promise: .then() chuỗi phẳng, .catch() bắt lỗi một chỗ.\n2. async/await: viết như code đồng bộ, try/catch bắt lỗi — chuẩn hiện nay.\n3. Promise.all/allSettled: chạy song song các việc độc lập.",
    "examples": ["// Callback hell\ngetUser(id, (user) => {\n  getOrders(user, (orders) => {\n    getDetail(orders[0], (detail) => { /* ... */ });\n  });\n});\n\n// async/await\nasync function main(id) {\n  const user = await getUser(id);\n  const orders = await getOrders(user);\n  const detail = await getDetail(orders[0]);\n}"]
   },
   {
    "question": "Promise.all, Promise.allSettled, Promise.race, Promise.any khác nhau thế nào?",
    "answer": "- Promise.all([...]): chờ TẤT CẢ thành công; MỘT cái reject là reject ngay toàn bộ (fail-fast). Dùng khi các việc đều bắt buộc.\n- Promise.allSettled([...]): chờ tất cả settle (thành công hay thất bại đều được), trả mảng {status, value/reason}. Dùng khi muốn biết kết quả từng cái.\n- Promise.race([...]): trả kết quả của promise SETTLE ĐẦU TIÊN (kể cả reject) — hay dùng làm timeout.\n- Promise.any([...]): trả promise THÀNH CÔNG đầu tiên, chỉ reject khi tất cả đều fail.",
    "examples": ["// Gọi song song 2 API độc lập — nhanh hơn await lần lượt\nconst [users, products] = await Promise.all([\n  fetchUsers(),\n  fetchProducts()\n]);\n\n// Timeout bằng race\nconst result = await Promise.race([\n  fetchData(),\n  new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout')), 5000))\n]);"]
   },
   {
    "question": "Stream trong Node.js là gì? Khi nào dùng?",
    "answer": "Stream xử lý dữ liệu THEO TỪNG KHÚC (chunk) thay vì load hết vào RAM — thiết yếu khi làm việc với file lớn, video, response HTTP.\n\n4 loại: Readable (đọc), Writable (ghi), Duplex (cả hai), Transform (biến đổi khi đi qua, ví dụ nén gzip).\n\npipe() nối stream với nhau và tự xử lý backpressure (bên ghi chậm hơn bên đọc).\n\nVí dụ kinh điển: đọc file 2GB — fs.readFile sẽ ngốn 2GB RAM, còn stream chỉ dùng vài chục KB buffer.",
    "examples": ["const fs = require('fs');\nconst zlib = require('zlib');\n\n// Nén file lớn không tốn RAM\nfs.createReadStream('video.mp4')\n  .pipe(zlib.createGzip())\n  .pipe(fs.createWriteStream('video.mp4.gz'));"]
   },
   {
    "question": "Cluster và Worker Threads trong Node.js khác nhau thế nào?",
    "answer": "Cả hai để tận dụng CPU đa nhân, nhưng khác mục đích:\n- Cluster (hoặc PM2 cluster mode): fork NHIỀU PROCESS Node giống nhau, chia sẻ port — mỗi process có event loop, bộ nhớ riêng. Dùng để scale HTTP server theo số nhân CPU.\n- Worker Threads: tạo THREAD phụ trong cùng process để chạy tác vụ CPU-bound (nén, mã hóa, xử lý ảnh) mà không chặn event loop chính; chia sẻ được bộ nhớ qua SharedArrayBuffer.\n\nQuy tắc: nhiều request I/O → cluster; một tác vụ tính toán nặng → worker threads.",
    "examples": []
   },
   {
    "question": "Xử lý lỗi trong Node.js: uncaughtException và unhandledRejection là gì?",
    "answer": "- Lỗi trong code đồng bộ: try/catch.\n- Lỗi async/await: try/catch quanh await.\n- Promise không .catch(): sự kiện 'unhandledRejection'.\n- Exception không ai bắt: sự kiện 'uncaughtException' — sau sự kiện này process ở trạng thái KHÔNG ĐÁNG TIN, best practice là log lỗi rồi thoát (process.exit) để trình quản lý (PM2, Docker, K8s) restart lại.\n\nKhông nên dùng 2 sự kiện này để 'nuốt' lỗi và chạy tiếp.",
    "examples": ["process.on('unhandledRejection', (reason) => {\n  logger.error('Unhandled rejection:', reason);\n  throw reason; // đẩy sang uncaughtException\n});\nprocess.on('uncaughtException', (err) => {\n  logger.error('Uncaught exception:', err);\n  process.exit(1); // để PM2/K8s restart\n});"]
   },
   {
    "question": "package.json: dependencies khác devDependencies? Dấu ^ và ~ nghĩa là gì? package-lock.json để làm gì?",
    "answer": "- dependencies: gói cần khi CHẠY production (express, @nestjs/core...).\n- devDependencies: gói chỉ cần khi PHÁT TRIỂN (typescript, jest, eslint) — npm install --production sẽ bỏ qua.\n\nSemver x.y.z (major.minor.patch):\n- ^1.2.3: cho phép nâng minor + patch (1.x.x, < 2.0.0) — mặc định.\n- ~1.2.3: chỉ cho nâng patch (1.2.x).\n- 1.2.3 (không dấu): khóa cứng đúng phiên bản.\n\npackage-lock.json ghi lại CHÍNH XÁC cây phiên bản đã cài để mọi máy/CI cài giống hệt nhau (npm ci) — phải commit vào git.",
    "examples": []
   },
   {
    "question": "Middleware pattern trong Node.js là gì?",
    "answer": "Middleware là chuỗi hàm xử lý request theo thứ tự, mỗi hàm nhận (req, res, next): làm việc của mình rồi gọi next() chuyển tiếp, hoặc kết thúc response, hoặc next(err) đẩy sang error handler.\n\nDùng cho các việc xuyên suốt: logging, parse body, xác thực, phân quyền, rate limit, xử lý lỗi tập trung.\n\nExpress/Koa xây hoàn toàn quanh pattern này; NestJS cũng có middleware (cùng khái niệm) bên cạnh guard/interceptor/pipe.",
    "examples": ["function authMiddleware(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ message: 'Token không hợp lệ' });\n  }\n}\napp.use('/api/admin', authMiddleware);"]
   },
   {
    "question": "Biến môi trường (environment variables) trong Node.js dùng thế nào và vì sao?",
    "answer": "Biến môi trường tách CẤU HÌNH khỏi CODE: chuỗi kết nối DB, secret key, port... khác nhau giữa dev/staging/production và không được commit vào git.\n\n- Đọc qua process.env.TEN_BIEN.\n- Dev thường dùng file .env + thư viện dotenv (NestJS có @nestjs/config); .env phải nằm trong .gitignore.\n- Production: set qua hệ thống (Docker env, K8s Secret, CI/CD).\n\nLỗi bảo mật kinh điển: commit .env chứa secret lên GitHub.",
    "examples": ["// .env\nDATABASE_URL=postgres://user:pass@localhost:5432/mydb\nJWT_SECRET=sieu-bi-mat\n\n// app\nrequire('dotenv').config();\nconst dbUrl = process.env.DATABASE_URL;\nconst port = process.env.PORT || 3000;"]
   },
   {
    "question": "Memory leak trong Node.js thường do đâu? Cách phát hiện?",
    "answer": "Nguyên nhân phổ biến:\n- Biến global / cache tự chế lớn dần không giới hạn (Map làm cache không có eviction).\n- Event listener đăng ký mãi không removeListener (cảnh báo MaxListenersExceeded).\n- Closure giữ tham chiếu object lớn.\n- Timer setInterval không clear.\n\nPhát hiện: theo dõi process.memoryUsage() / metrics (heapUsed tăng đều không giảm sau GC), chụp heap snapshot bằng Chrome DevTools (node --inspect), hoặc dùng clinic.js.\n\nPhòng ngừa: cache có giới hạn (LRU), luôn dọn listener/timer, load test trước khi release.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Express",
  "items": [
   {
    "question": "Express là gì? Cấu trúc một app Express cơ bản?",
    "answer": "Express là web framework tối giản và phổ biến nhất của Node.js: cung cấp routing, middleware, xử lý request/response — còn lại (cấu trúc thư mục, ORM, validation) tự chọn.\n\nLuồng cơ bản: request đi qua chuỗi middleware (parse body, log, auth...) → route handler khớp method + path xử lý → response. Lỗi được next(err) đẩy về error-handling middleware cuối chuỗi.",
    "examples": ["const express = require('express');\nconst app = express();\n\napp.use(express.json()); // parse JSON body\n\napp.get('/api/users/:id', async (req, res, next) => {\n  try {\n    const user = await userService.find(req.params.id);\n    if (!user) return res.status(404).json({ message: 'Not found' });\n    res.json(user);\n  } catch (err) {\n    next(err); // đẩy về error handler\n  }\n});\n\n// Error handler — LUÔN 4 tham số, đặt cuối cùng\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ message: 'Internal server error' });\n});\n\napp.listen(3000);"]
   },
   {
    "question": "Thứ tự middleware trong Express có quan trọng không?",
    "answer": "RẤT quan trọng — Express chạy middleware theo đúng thứ tự đăng ký (app.use/app.get...):\n- express.json() phải đứng TRƯỚC route cần đọc req.body.\n- Middleware auth phải đứng trước các route cần bảo vệ.\n- Error handler (4 tham số) phải đứng SAU CÙNG.\n- Route 404 (catch-all) đặt sau mọi route thật.\n\nQuên gọi next() → request 'treo' mãi không có response. Gọi next() sau khi đã res.send() → lỗi 'headers already sent'.",
    "examples": []
   },
   {
    "question": "req.params, req.query, req.body khác nhau thế nào?",
    "answer": "Với request: POST /api/users/5/orders?page=2 kèm JSON body\n- req.params: tham số trên PATH khai báo bằng dấu hai chấm — route '/api/users/:id/orders' → req.params.id = '5' (luôn là string).\n- req.query: tham số sau dấu ? — req.query.page = '2'.\n- req.body: dữ liệu trong BODY (JSON/form) — cần middleware express.json() hoặc express.urlencoded() để parse.\n- Ngoài ra: req.headers (header), req.cookies (cần cookie-parser).",
    "examples": []
   },
   {
    "question": "Xử lý lỗi trong route async của Express có bẫy gì?",
    "answer": "Express 4 KHÔNG tự bắt lỗi từ hàm async: nếu handler async throw mà không try/catch, promise reject bị 'rơi' — request treo, có thể crash process.\n\nCách xử lý:\n1. try/catch trong từng handler rồi next(err).\n2. Viết wrapper asyncHandler bọc handler (hoặc dùng package express-async-errors).\n3. Express 5 đã tự forward lỗi async về error handler.",
    "examples": ["// Wrapper dùng chung\nconst asyncHandler = (fn) => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);\n\napp.get('/api/orders', asyncHandler(async (req, res) => {\n  const orders = await orderService.findAll(); // lỗi tự về error handler\n  res.json(orders);\n}));"]
   },
   {
    "question": "express.Router dùng để làm gì?",
    "answer": "Router tách route thành từng module theo tài nguyên (users, orders...) thay vì dồn hết vào app — dễ bảo trì, gắn được middleware riêng cho từng nhóm.\n\nMỗi router là một 'mini-app' có middleware + route riêng, mount vào app bằng app.use(prefix, router).",
    "examples": ["// routes/user.routes.js\nconst router = require('express').Router();\nrouter.get('/', listUsers);\nrouter.get('/:id', getUser);\nrouter.post('/', authMiddleware, createUser);\nmodule.exports = router;\n\n// app.js\napp.use('/api/users', require('./routes/user.routes'));"]
   },
   {
    "question": "Các middleware bảo mật/tiện ích hay dùng với Express?",
    "answer": "- helmet: set các HTTP header bảo mật (CSP, X-Frame-Options, HSTS...).\n- cors: cấu hình Cross-Origin Resource Sharing (origin nào được gọi API).\n- express-rate-limit: giới hạn số request/IP chống brute-force, spam.\n- express.json({ limit: '1mb' }): giới hạn kích thước body chống DoS.\n- morgan / pino-http: log request.\n- compression: nén gzip response.\n- express-validator / joi / zod: validate input.",
    "examples": ["const helmet = require('helmet');\nconst rateLimit = require('express-rate-limit');\n\napp.use(helmet());\napp.use(cors({ origin: 'https://myapp.com' }));\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));"]
   },
   {
    "question": "Express khác NestJS thế nào? Khi nào chọn cái nào?",
    "answer": "Express: tối giản, tự do — tự quyết cấu trúc, tự ghép thư viện. Hợp dự án nhỏ, prototype, hoặc team muốn kiểm soát tối đa.\n\nNestJS: framework 'có chính kiến' xây TRÊN Express (hoặc Fastify): kiến trúc module, DI container, TypeScript mặc định, decorator, tích hợp sẵn validation/config/testing/microservices. Hợp dự án lớn, team đông, cần cấu trúc thống nhất — dev Angular học rất nhanh vì cùng triết lý.\n\nLưu ý phỏng vấn: NestJS mặc định chạy trên nền Express nên hiểu Express vẫn là nền tảng.",
    "examples": []
   }
  ]
 },
 {
  "topic": "NestJS",
  "items": [
   {
    "question": "NestJS là gì? Kiến trúc tổng quan?",
    "answer": "NestJS là framework Node.js xây dựng ứng dụng server-side có cấu trúc, viết bằng TypeScript, lấy cảm hứng từ Angular (module, DI, decorator).\n\nKiến trúc 3 tầng chính:\n- Controller: nhận HTTP request, trả response — KHÔNG chứa logic nghiệp vụ.\n- Provider/Service: chứa logic nghiệp vụ, được inject vào controller.\n- Module: gom controller + provider thành từng khối chức năng (UsersModule, OrdersModule); AppModule là gốc.\n\nRequest lifecycle: Middleware → Guard → Interceptor (trước) → Pipe → Controller → Service → Interceptor (sau) → Exception Filter (nếu lỗi) → Response.",
    "examples": ["@Module({\n  imports: [TypeOrmModule.forFeature([User])],\n  controllers: [UsersController],\n  providers: [UsersService],\n  exports: [UsersService], // cho module khác dùng\n})\nexport class UsersModule {}"]
   },
   {
    "question": "Dependency Injection trong NestJS hoạt động thế nào?",
    "answer": "NestJS có IoC container: class đánh dấu @Injectable() được container quản lý, khai báo trong providers của module, và inject qua CONSTRUCTOR — Nest tự phân giải theo kiểu TypeScript.\n\n- Mặc định provider là SINGLETON toàn app.\n- Muốn dùng service của module khác: module đó phải exports, module mình imports.\n- Custom provider: useValue (mock/config), useFactory (tạo động), useClass; inject theo token với @Inject('TOKEN').\n\nLợi ích: tách phụ thuộc, dễ test (override provider bằng mock trong TestingModule).",
    "examples": ["@Injectable()\nexport class OrdersService {\n  // Nest tự inject nhờ type — không cần @Inject\n  constructor(\n    private readonly usersService: UsersService,\n    @InjectRepository(Order) private repo: Repository<Order>,\n  ) {}\n}"]
   },
   {
    "question": "Guard, Interceptor, Pipe, Middleware, Exception Filter — phân biệt và thứ tự chạy?",
    "answer": "Câu hỏi NestJS kinh điển nhất. Thứ tự: Middleware → Guard → Interceptor → Pipe → Handler → Interceptor → Filter.\n\n- Middleware: chạy sớm nhất, như Express middleware (log, attach data). Không biết handler nào sẽ xử lý.\n- Guard: quyết định CHO PHÉP hay không (authentication/authorization) — trả true/false, có metadata của handler (biết route yêu cầu role gì).\n- Interceptor: bọc QUANH handler (trước + sau) — transform response, log thời gian, cache, timeout.\n- Pipe: validate + transform INPUT (body, param) trước khi vào handler — ValidationPipe, ParseIntPipe.\n- Exception Filter: bắt exception, định dạng response lỗi thống nhất.",
    "examples": ["// Guard kiểm tra role\n@Injectable()\nexport class RolesGuard implements CanActivate {\n  constructor(private reflector: Reflector) {}\n  canActivate(ctx: ExecutionContext): boolean {\n    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());\n    if (!roles) return true;\n    const { user } = ctx.switchToHttp().getRequest();\n    return roles.includes(user.role);\n  }\n}\n\n@Post()\n@SetMetadata('roles', ['admin'])\n@UseGuards(JwtAuthGuard, RolesGuard)\ncreate(@Body() dto: CreateUserDto) { /* ... */ }"]
   },
   {
    "question": "DTO và ValidationPipe trong NestJS dùng thế nào?",
    "answer": "DTO (Data Transfer Object) là class định nghĩa hình dạng dữ liệu vào/ra, kết hợp class-validator để validate tự động.\n\nBật global: app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })):\n- whitelist: true — TỰ LOẠI BỎ field lạ không khai báo trong DTO (chống mass assignment).\n- forbidNonWhitelisted: true — field lạ thì báo lỗi 400 luôn.\n- transform: true — ép kiểu về đúng DTO (string '5' → number 5).\n\nRequest sai định dạng bị chặn từ Pipe với lỗi 400 chi tiết, không cần if/else trong service.",
    "examples": ["import { IsEmail, IsString, MinLength, IsOptional, IsInt, Min } from 'class-validator';\n\nexport class CreateUserDto {\n  @IsEmail()\n  email: string;\n\n  @IsString()\n  @MinLength(8)\n  password: string;\n\n  @IsOptional()\n  @IsInt()\n  @Min(0)\n  age?: number;\n}\n\n@Post()\ncreate(@Body() dto: CreateUserDto) {\n  return this.usersService.create(dto);\n}"]
   },
   {
    "question": "Xác thực JWT trong NestJS triển khai thế nào?",
    "answer": "Chuẩn phổ biến: @nestjs/passport + @nestjs/jwt.\n\n1. Login: AuthService kiểm tra email/password (so bcrypt hash) → ký access token (JwtService.sign, hạn ngắn 15p-1h) + refresh token (hạn dài, lưu DB/Redis để thu hồi được).\n2. JwtStrategy (passport-jwt): tự lấy token từ header Authorization: Bearer, verify chữ ký + hạn, payload gắn vào req.user.\n3. JwtAuthGuard: gắn @UseGuards(JwtAuthGuard) cho route cần bảo vệ; thường làm global guard + decorator @Public() cho route mở.\n4. Refresh: endpoint /refresh đổi refresh token lấy access token mới.",
    "examples": ["@Injectable()\nexport class JwtStrategy extends PassportStrategy(Strategy) {\n  constructor(config: ConfigService) {\n    super({\n      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),\n      secretOrKey: config.get('JWT_SECRET'),\n    });\n  }\n  validate(payload: { sub: number; email: string }) {\n    return { userId: payload.sub, email: payload.email }; // → req.user\n  }\n}"]
   },
   {
    "question": "Làm việc với database trong NestJS: TypeORM/Prisma, Repository pattern?",
    "answer": "Hai lựa chọn phổ biến:\n- TypeORM (@nestjs/typeorm): Entity là class + decorator (@Entity, @Column, @ManyToOne...); inject Repository<Entity> qua @InjectRepository; hỗ trợ migration, transaction (DataSource.transaction / QueryRunner).\n- Prisma: schema.prisma định nghĩa model → generate PrismaClient type-safe; đơn giản và an toàn kiểu tốt hơn, đang là xu hướng.\n\nLưu ý phỏng vấn:\n- Tránh N+1: dùng relations/include hoặc query builder join.\n- Migration cho production thay vì synchronize: true (nguy hiểm — tự sửa schema).\n- Transaction khi nhiều thao tác phải cùng thành công.",
    "examples": ["// TypeORM transaction\nawait this.dataSource.transaction(async (manager) => {\n  await manager.save(order);\n  await manager.decrement(Product, { id: productId }, 'stock', qty);\n});\n\n// Prisma\nconst user = await this.prisma.user.findUnique({\n  where: { id },\n  include: { orders: true }, // tránh N+1\n});"]
   },
   {
    "question": "Exception handling trong NestJS: HttpException và custom filter?",
    "answer": "- Ném exception có sẵn: throw new NotFoundException('User không tồn tại'), BadRequestException, UnauthorizedException... — Nest tự trả JSON {statusCode, message} đúng mã.\n- Exception filter tùy chỉnh (@Catch() + implements ExceptionFilter): thống nhất format lỗi toàn hệ thống, log, giấu chi tiết lỗi 500 khỏi client.\n- Đăng ký global: app.useGlobalFilters(new AllExceptionsFilter()).\n\nNguyên tắc: service ném exception nghiệp vụ rõ nghĩa; filter lo chuyện format + log — không try/catch lặt vặt khắp nơi.",
    "examples": ["@Catch()\nexport class AllExceptionsFilter implements ExceptionFilter {\n  catch(exception: unknown, host: ArgumentsHost) {\n    const res = host.switchToHttp().getResponse();\n    const status = exception instanceof HttpException\n      ? exception.getStatus() : 500;\n    const message = exception instanceof HttpException\n      ? exception.getResponse() : 'Internal server error';\n    res.status(status).json({ statusCode: status, message,\n      timestamp: new Date().toISOString() });\n  }\n}"]
   },
   {
    "question": "ConfigModule trong NestJS dùng thế nào cho chuẩn?",
    "answer": "@nestjs/config bọc dotenv theo kiểu DI:\n- ConfigModule.forRoot({ isGlobal: true }) ở AppModule → mọi nơi inject được ConfigService.\n- Đọc config: this.config.get<string>('DATABASE_URL').\n- validationSchema (Joi) validate biến môi trường lúc KHỞI ĐỘNG — thiếu biến là app fail ngay thay vì lỗi ngầm lúc runtime.\n- Module khác dùng config khi khởi tạo → forRootAsync + useFactory (ví dụ TypeOrmModule.forRootAsync).",
    "examples": ["ConfigModule.forRoot({\n  isGlobal: true,\n  validationSchema: Joi.object({\n    DATABASE_URL: Joi.string().required(),\n    JWT_SECRET: Joi.string().min(32).required(),\n    PORT: Joi.number().default(3000),\n  }),\n})"]
   },
   {
    "question": "Unit test và e2e test trong NestJS viết thế nào?",
    "answer": "- Unit test (Jest): Test.createTestingModule tạo module test, override provider thật bằng MOCK (useValue) → test service/controller cô lập, không cần DB.\n- E2E test: tạo full app bằng createNestApplication + supertest gọi HTTP thật, thường kèm DB test (docker/sqlite in-memory).\n\nDI của Nest chính là thứ khiến test dễ: mọi phụ thuộc đều thay được bằng mock.",
    "examples": ["const module = await Test.createTestingModule({\n  providers: [\n    OrdersService,\n    { provide: getRepositoryToken(Order),\n      useValue: { findOne: jest.fn().mockResolvedValue(mockOrder) } },\n  ],\n}).compile();\n\nconst service = module.get(OrdersService);\nexpect(await service.findOne(1)).toEqual(mockOrder);"]
   },
   {
    "question": "Microservices trong NestJS hỗ trợ thế nào?",
    "answer": "NestJS có @nestjs/microservices với nhiều transport: TCP, Redis, RabbitMQ, Kafka, gRPC, NATS.\n\nHai pattern giao tiếp:\n- Request-response: @MessagePattern — gửi yêu cầu chờ kết quả (ClientProxy.send).\n- Event-based: @EventPattern — bắn sự kiện không chờ (ClientProxy.emit), ví dụ 'order_created' cho service email/kho xử lý bất đồng bộ.\n\nCùng codebase có thể chạy hybrid: vừa HTTP vừa lắng nghe message queue. Ưu điểm: đổi transport gần như không đổi code nghiệp vụ.",
    "examples": ["// Consumer\n@EventPattern('order_created')\nhandleOrderCreated(@Payload() data: OrderCreatedEvent) {\n  return this.mailService.sendConfirmation(data);\n}\n\n// Producer\nthis.client.emit('order_created', { orderId: order.id, email });"]
   }
  ]
 },
 {
  "topic": "ReactJS",
  "items": [
   {
    "question": "Virtual DOM là gì? React render như thế nào?",
    "answer": "Virtual DOM là bản mô tả UI bằng object JavaScript trong bộ nhớ. Khi state thay đổi:\n1. React tạo cây Virtual DOM mới.\n2. Diffing (reconciliation): so sánh cây mới với cây cũ.\n3. Chỉ cập nhật những phần THẬT SỰ thay đổi lên DOM thật (thao tác DOM thật rất đắt).\n\nKey trong danh sách giúp React nhận diện phần tử nào thêm/xóa/di chuyển khi diff — vì vậy không nên dùng index làm key khi danh sách có thể thay đổi thứ tự.",
    "examples": []
   },
   {
    "question": "useState hoạt động thế nào? Vì sao setState là bất đồng bộ và cần dạng hàm?",
    "answer": "useState trả về [giá trị, hàm set]. Gọi set KHÔNG đổi giá trị ngay — React gom (batch) các cập nhật rồi re-render sau; đọc state ngay sau khi set vẫn thấy giá trị cũ (stale).\n\nVì vậy khi giá trị mới PHỤ THUỘC giá trị cũ, phải dùng dạng hàm: setCount(prev => prev + 1) — đảm bảo luôn tính từ giá trị mới nhất, kể cả gọi nhiều lần liên tiếp.\n\nState là immutable: với object/array phải tạo bản mới ({...obj}, [...arr]) chứ không sửa trực tiếp — React so sánh THAM CHIẾU để biết có thay đổi.",
    "examples": ["// SAI: cả 3 lần đều tính từ count cũ → chỉ +1\nsetCount(count + 1);\nsetCount(count + 1);\nsetCount(count + 1);\n\n// ĐÚNG: +3\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\n\n// Object state phải tạo bản mới\nsetUser(prev => ({ ...prev, name: 'An' }));"]
   },
   {
    "question": "useEffect dùng để làm gì? Dependency array hoạt động thế nào?",
    "answer": "useEffect chạy side effect SAU khi render: gọi API, subscribe, thao tác DOM, timer.\n\nDependency array quyết định khi nào chạy lại:\n- Không truyền: chạy sau MỌI lần render.\n- []: chạy MỘT lần sau mount.\n- [a, b]: chạy lại khi a hoặc b đổi (so sánh ===).\n\nCleanup function (return trong effect) chạy trước lần effect kế tiếp và khi unmount — dùng để hủy subscribe, clear timer, abort fetch — quên cleanup là nguồn memory leak kinh điển.\n\nLỗi hay gặp: thiếu dependency (stale closure), hoặc dependency là object/hàm tạo mới mỗi render gây chạy vô hạn (fix bằng useMemo/useCallback).",
    "examples": ["useEffect(() => {\n  const controller = new AbortController();\n  fetch(`/api/users/${userId}`, { signal: controller.signal })\n    .then(res => res.json())\n    .then(setUser)\n    .catch(err => { if (err.name !== 'AbortError') setError(err); });\n\n  return () => controller.abort(); // cleanup khi userId đổi/unmount\n}, [userId]);"]
   },
   {
    "question": "useMemo, useCallback, React.memo khác nhau thế nào? Khi nào dùng?",
    "answer": "- useMemo(fn, deps): cache KẾT QUẢ tính toán đắt, chỉ tính lại khi deps đổi.\n- useCallback(fn, deps): cache chính HÀM (tham chiếu ổn định) — cần khi truyền hàm xuống component con đã memo hoặc làm dependency của effect. useCallback(fn, deps) = useMemo(() => fn, deps).\n- React.memo(Component): bọc component, bỏ qua re-render khi props không đổi (so sánh nông).\n\nLưu ý: đây là công cụ TỐI ƯU, không dùng tràn lan — chỉ khi có vấn đề hiệu năng thực (danh sách lớn, tính toán nặng, component con nặng).",
    "examples": ["const sorted = useMemo(\n  () => [...items].sort((a, b) => b.score - a.score),\n  [items]\n);\n\nconst handleDelete = useCallback(\n  (id) => setItems(prev => prev.filter(i => i.id !== id)),\n  []\n);\n\nconst Row = React.memo(function Row({ item, onDelete }) {\n  return <li>{item.name} <button onClick={() => onDelete(item.id)}>x</button></li>;\n});"]
   },
   {
    "question": "Quản lý state trong React: khi nào dùng Context, khi nào Redux/Zustand?",
    "answer": "Thang lựa chọn từ đơn giản đến phức tạp:\n1. useState tại component — state cục bộ.\n2. Lift state up — vài component gần nhau dùng chung.\n3. Context API — dữ liệu 'xuyên cây' ít thay đổi: theme, user hiện tại, ngôn ngữ. Nhược: mọi consumer re-render khi value đổi.\n4. Redux (Redux Toolkit) / Zustand — state toàn cục phức tạp, nhiều nơi đọc/ghi, cần devtools/middleware.\n5. Server state (dữ liệu API) nên dùng React Query / SWR: tự lo cache, refetch, loading/error — đừng nhét vào Redux.\n\nCâu trả lời ghi điểm: phân biệt client state và server state.",
    "examples": []
   },
   {
    "question": "Controlled component khác uncontrolled component?",
    "answer": "- Controlled: giá trị input do React state quản lý (value={state} + onChange cập nhật) — nguồn sự thật là state, dễ validate/format theo từng phím gõ.\n- Uncontrolled: DOM tự giữ giá trị, đọc khi cần qua ref (hoặc defaultValue) — ít re-render, hợp form đơn giản.\n\nThư viện form hiện đại (react-hook-form) dùng uncontrolled + ref để tối ưu hiệu năng form lớn.",
    "examples": ["// Controlled\nconst [email, setEmail] = useState('');\n<input value={email} onChange={e => setEmail(e.target.value)} />\n\n// Uncontrolled\nconst inputRef = useRef();\n<input ref={inputRef} defaultValue=\"\" />\n// đọc khi submit: inputRef.current.value"]
   },
   {
    "question": "Custom hook là gì? Quy tắc của hooks?",
    "answer": "Custom hook là hàm bắt đầu bằng 'use', gọi các hook khác bên trong — cách TÁI SỬ DỤNG logic có state giữa các component (thay thế HOC/render props).\n\n2 quy tắc hooks:\n1. Chỉ gọi hook ở TOP LEVEL — không trong if/vòng lặp/hàm lồng (React dựa vào THỨ TỰ gọi hook để map state).\n2. Chỉ gọi hook trong function component hoặc custom hook.",
    "examples": ["function useDebounce(value, delay = 500) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}\n\n// Dùng: gõ tìm kiếm, chỉ gọi API khi ngừng gõ 500ms\nconst search = useDebounce(keyword);\nuseEffect(() => { if (search) fetchResults(search); }, [search]);"]
   },
   {
    "question": "Tối ưu hiệu năng ứng dụng React lớn bằng những cách nào?",
    "answer": "- Code splitting + lazy loading: React.lazy + Suspense, tách route thành chunk riêng.\n- Virtualization danh sách dài (react-window): chỉ render phần tử trong viewport.\n- memo/useMemo/useCallback đúng chỗ; tách state để giảm phạm vi re-render.\n- Key ổn định cho list; tránh tạo object/hàm inline làm props cho component memo.\n- React Query/SWR cache dữ liệu API, tránh fetch lặp.\n- Debounce input, phân trang/infinite scroll thay vì load hết.\n- Phân tích bằng React DevTools Profiler trước khi tối ưu.",
    "examples": ["const AdminPage = React.lazy(() => import('./pages/AdminPage'));\n\n<Suspense fallback={<Spinner />}>\n  <Routes>\n    <Route path=\"/admin\" element={<AdminPage />} />\n  </Routes>\n</Suspense>"]
   },
   {
    "question": "Vòng đời dữ liệu khi gọi API trong React nên xử lý những trạng thái nào?",
    "answer": "Mỗi lần fetch cần quản lý đủ: loading (đang tải — hiện spinner/skeleton), error (lỗi — hiện thông báo + nút thử lại), empty (thành công nhưng rỗng), success (có dữ liệu).\n\nCác lỗi hay gặp:\n- Race condition: request cũ về SAU request mới → hiển thị dữ liệu cũ. Fix: AbortController hoặc cờ ignore trong cleanup.\n- setState sau khi unmount → warning memory leak. Fix: cleanup.\n- Fetch trong vòng lặp render (không có useEffect) → gọi vô hạn.\n\nThực tế nên dùng React Query: tự lo cache, retry, dedupe, invalidate.",
    "examples": ["const { data, isLoading, error, refetch } = useQuery({\n  queryKey: ['orders', page],\n  queryFn: () => api.getOrders(page),\n  staleTime: 60_000,\n});\n\nif (isLoading) return <Skeleton />;\nif (error) return <ErrorBox onRetry={refetch} />;\nif (!data.length) return <Empty />;\nreturn <OrderList orders={data} />;"]
   }
  ]
 },
 {
  "topic": "Bảo mật",
  "items": [
   {
    "question": "OWASP Top 10 là gì? Kể các lỗ hổng quan trọng nhất?",
    "answer": "OWASP Top 10 là danh sách 10 rủi ro bảo mật web phổ biến nhất do tổ chức OWASP tổng hợp — chuẩn tham chiếu khi phỏng vấn bảo mật web:\n1. Broken Access Control (phân quyền hỏng) — số 1 hiện nay.\n2. Cryptographic Failures (mã hóa sai/thiếu).\n3. Injection (SQL, NoSQL, command; gồm cả XSS).\n4. Insecure Design.\n5. Security Misconfiguration (cấu hình sai, để debug/route mặc định).\n6. Vulnerable Components (thư viện lỗi thời — npm audit).\n7. Identification & Authentication Failures.\n8. Software & Data Integrity Failures (supply chain).\n9. Logging & Monitoring Failures.\n10. SSRF (Server-Side Request Forgery).",
    "examples": []
   },
   {
    "question": "SQL Injection là gì? Cách phòng chống?",
    "answer": "SQL Injection: kẻ tấn công chèn SQL vào input để thay đổi câu truy vấn — đọc trộm, sửa, xóa dữ liệu, thậm chí chiếm server.\n\nVí dụ kinh điển: input ' OR '1'='1 biến WHERE username='...' thành điều kiện luôn đúng → đăng nhập không cần mật khẩu.\n\nPhòng chống:\n1. Parameterized query / prepared statement — TUYỆT ĐỐI không nối chuỗi SQL với input.\n2. ORM (TypeORM, Prisma, JPA) — tự parameterize (nhưng cẩn thận raw query).\n3. Validate input, nguyên tắc least privilege cho DB user (app không cần quyền DROP).\n4. Không lộ lỗi SQL chi tiết ra client.",
    "examples": ["// NGUY HIỂM — nối chuỗi\nconst sql = `SELECT * FROM users WHERE email = '${email}'`;\n\n// AN TOÀN — tham số hóa\nawait db.query('SELECT * FROM users WHERE email = $1', [email]);\n\n// TypeORM an toàn\nrepo.findOne({ where: { email } });\n// Raw query TypeORM vẫn phải tham số hóa:\ndataSource.query('SELECT * FROM users WHERE email = $1', [email]);"]
   },
   {
    "question": "XSS (Cross-Site Scripting) là gì? Các loại và cách phòng chống?",
    "answer": "XSS: kẻ tấn công chèn JavaScript độc vào trang web, chạy trên trình duyệt NẠN NHÂN → trộm cookie/token, giả mạo thao tác, keylog.\n\n3 loại:\n- Stored XSS: script lưu trong DB (bình luận chứa <script>), mọi người xem đều dính — nguy hiểm nhất.\n- Reflected XSS: script nằm trong URL/tham số, phản chiếu vào response.\n- DOM-based XSS: JS phía client tự chèn dữ liệu bẩn vào DOM (innerHTML).\n\nPhòng chống:\n1. Escape/encode output theo ngữ cảnh (React JSX tự escape — nhưng dangerouslySetInnerHTML thì không!).\n2. Sanitize HTML người dùng nhập (DOMPurify).\n3. Content-Security-Policy header chặn script lạ.\n4. Cookie HttpOnly để JS không đọc được (giảm thiệt hại khi dính XSS).",
    "examples": ["// React: AN TOÀN — tự escape\n<div>{userComment}</div>\n\n// NGUY HIỂM nếu userComment chứa script\n<div dangerouslySetInnerHTML={{ __html: userComment }} />\n\n// Nếu buộc phải render HTML: sanitize trước\nimport DOMPurify from 'dompurify';\n<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userComment) }} />"]
   },
   {
    "question": "CSRF (Cross-Site Request Forgery) là gì? Cách phòng chống?",
    "answer": "CSRF: trang web độc lừa trình duyệt nạn nhân gửi request đến trang nạn nhân ĐANG ĐĂNG NHẬP (cookie tự động gửi kèm) — ví dụ form ẩn tự submit chuyển tiền.\n\nĐiều kiện dính: xác thực bằng COOKIE tự gửi.\n\nPhòng chống:\n1. SameSite cookie (Lax/Strict) — trình duyệt không gửi cookie cho request từ site khác; Lax là mặc định hiện đại.\n2. CSRF token: server phát token ngẫu nhiên, form/request phải nộp lại, trang ngoài không biết token.\n3. Kiểm tra header Origin/Referer.\n4. Dùng Bearer token trong header Authorization (không tự gửi như cookie) — API dùng JWT header về cơ bản miễn nhiễm CSRF.",
    "examples": ["// Cookie an toàn hơn\nres.cookie('session', token, {\n  httpOnly: true,   // JS không đọc được (chống XSS trộm cookie)\n  secure: true,     // chỉ gửi qua HTTPS\n  sameSite: 'lax',  // chống CSRF\n});"]
   },
   {
    "question": "Lưu mật khẩu thế nào cho đúng? Vì sao không dùng MD5/SHA-256 trực tiếp?",
    "answer": "KHÔNG BAO GIỜ lưu mật khẩu plain text hoặc mã hóa 2 chiều. Phải HASH một chiều với thuật toán CHẬM chuyên dụng: bcrypt, scrypt, hoặc argon2 (tốt nhất hiện nay).\n\nVì sao không dùng MD5/SHA-256: chúng được thiết kế NHANH → GPU thử hàng tỷ mật khẩu/giây (brute-force, rainbow table). bcrypt/argon2 cố tình chậm (cost factor điều chỉnh được) + tự sinh SALT ngẫu nhiên cho mỗi mật khẩu (hai người trùng mật khẩu vẫn ra hash khác — chống rainbow table).\n\nThêm: giới hạn số lần thử đăng nhập, yêu cầu mật khẩu đủ mạnh, hỗ trợ 2FA.",
    "examples": ["import * as bcrypt from 'bcrypt';\n\n// Đăng ký\nconst hash = await bcrypt.hash(password, 12); // cost 12, salt tự sinh\nawait userRepo.save({ email, password: hash });\n\n// Đăng nhập\nconst ok = await bcrypt.compare(inputPassword, user.password);\nif (!ok) throw new UnauthorizedException('Sai thông tin đăng nhập');"]
   },
   {
    "question": "JWT hoạt động thế nào? Ưu nhược điểm và các lỗi bảo mật thường gặp?",
    "answer": "JWT gồm 3 phần: header.payload.signature (base64). Server ký payload bằng secret/private key; ai có token đều ĐỌC được payload (chỉ mã hóa base64!) nhưng không SỬA được (sai chữ ký).\n\nƯu: stateless — server không cần lưu session, hợp microservices/scale ngang.\nNhược: KHÓ THU HỒI trước hạn — vì vậy access token phải hạn NGẮN (15p-1h) + refresh token lưu DB (thu hồi được).\n\nLỗi thường gặp:\n- Nhét dữ liệu nhạy cảm vào payload (đọc được!).\n- Secret yếu → bị brute-force.\n- Không verify thuật toán → tấn công alg:none.\n- Lưu token trong localStorage → XSS trộm được (cân nhắc cookie HttpOnly).\n- Không có cơ chế revoke khi user đổi mật khẩu/logout.",
    "examples": []
   },
   {
    "question": "Authentication khác Authorization? Broken Access Control là gì?",
    "answer": "- Authentication (xác thực): BẠN LÀ AI — kiểm tra danh tính (mật khẩu, token, 2FA). Lỗi → 401.\n- Authorization (phân quyền): BẠN ĐƯỢC LÀM GÌ — kiểm tra quyền trên tài nguyên. Lỗi → 403.\n\nBroken Access Control (lỗ hổng số 1 OWASP): xác thực xong nhưng KHÔNG kiểm tra quyền trên từng tài nguyên. Kinh điển nhất là IDOR (Insecure Direct Object Reference): GET /api/orders/123 — đổi 123 thành 124 là xem được đơn hàng NGƯỜI KHÁC.\n\nPhòng: mọi truy vấn tài nguyên phải kèm điều kiện chủ sở hữu/quyền (WHERE user_id = ?), kiểm tra ở BACKEND (ẩn nút ở frontend không phải là bảo mật), deny by default.",
    "examples": ["// SAI: ai đăng nhập cũng xem được mọi đơn\nasync findOrder(id: number) {\n  return this.repo.findOneBy({ id });\n}\n\n// ĐÚNG: ràng buộc chủ sở hữu\nasync findOrder(id: number, userId: number) {\n  const order = await this.repo.findOneBy({ id, userId });\n  if (!order) throw new NotFoundException();\n  return order;\n}"]
   },
   {
    "question": "CORS là gì? Nó có phải cơ chế bảo mật của server không?",
    "answer": "CORS (Cross-Origin Resource Sharing) là cơ chế của TRÌNH DUYỆT: mặc định chặn JavaScript của origin A đọc response từ origin B (Same-Origin Policy); server B phải trả header Access-Control-Allow-Origin cho phép thì trình duyệt mới cho đọc.\n\nHiểu đúng:\n- CORS BẢO VỆ NGƯỜI DÙNG khỏi web độc đọc dữ liệu chéo origin — KHÔNG bảo vệ server (curl/Postman bỏ qua CORS hoàn toàn). Server vẫn phải tự xác thực + phân quyền.\n- Preflight (OPTIONS): trình duyệt hỏi trước với request 'không đơn giản' (PUT/DELETE, header lạ, JSON).\n- Cấu hình sai nguy hiểm: Access-Control-Allow-Origin: * kèm credentials, hoặc phản chiếu mọi origin.",
    "examples": ["// NestJS\napp.enableCors({\n  origin: ['https://myapp.com'], // KHÔNG dùng '*' khi có credentials\n  credentials: true,\n});"]
   },
   {
    "question": "HTTPS/TLS hoạt động thế nào (tóm tắt)? Vì sao bắt buộc?",
    "answer": "HTTPS = HTTP chạy trên TLS, cung cấp 3 thứ:\n1. Mã hóa: kẻ nghe lén (wifi công cộng, ISP) không đọc được nội dung.\n2. Toàn vẹn: dữ liệu không bị sửa giữa đường (chống MITM).\n3. Xác thực server: chứng chỉ do CA ký xác nhận đúng là server thật.\n\nBắt tay TLS (tóm tắt): client và server thỏa thuận phiên bản + cipher → server gửi chứng chỉ → client xác minh chuỗi CA → trao đổi khóa (ECDHE) tạo khóa phiên đối xứng → truyền dữ liệu mã hóa bằng khóa phiên.\n\nThực hành: bật HSTS, redirect HTTP→HTTPS, Let's Encrypt miễn phí, cookie secure:true.",
    "examples": []
   },
   {
    "question": "Rate limiting và chống brute-force làm thế nào?",
    "answer": "Rate limiting giới hạn số request trong khoảng thời gian để chống: brute-force mật khẩu, spam OTP, cào dữ liệu, góp phần chống DoS.\n\nThuật toán: fixed window, sliding window, token bucket (cho phép burst), leaky bucket.\n\nTriển khai:\n- NestJS: @nestjs/throttler; Express: express-rate-limit.\n- Nhiều instance → lưu đếm ở Redis (chung cho cả cluster).\n- Riêng login: giới hạn theo cả IP lẫn tài khoản, tăng dần thời gian khóa (exponential backoff), CAPTCHA sau vài lần sai.\n- Trả 429 Too Many Requests kèm Retry-After.",
    "examples": ["// NestJS\nThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),\n\n// Chặt hơn cho login\n@Throttle({ default: { limit: 5, ttl: 60000 } })\n@Post('login')\nlogin(@Body() dto: LoginDto) { /* ... */ }"]
   },
   {
    "question": "Lỗ hổng từ dependency (supply chain) xử lý thế nào?",
    "answer": "Ứng dụng Node kéo theo hàng trăm package — mỗi package là một bề mặt tấn công (lỗ hổng, hoặc bị chiếm quyền cài mã độc).\n\nThực hành:\n- npm audit / yarn audit định kỳ + trong CI; Dependabot/Renovate tự tạo PR nâng cấp.\n- Khóa phiên bản bằng lockfile, cài bằng npm ci.\n- Hạn chế package lặt vặt không cần thiết; kiểm tra độ tin cậy trước khi thêm.\n- Không chạy script cài đặt tùy tiện (npm có --ignore-scripts).\n- Secret không hardcode — dùng biến môi trường/secret manager; bật secret scanning trên repo.",
    "examples": []
   },
   {
    "question": "Câu tình huống: phát hiện API của bạn đang bị lộ dữ liệu người dùng, bạn xử lý thế nào?",
    "answer": "Quy trình xử lý sự cố bảo mật (incident response):\n1. NGĂN CHẶN ngay: vá/tắt endpoint lỗi (maintenance mode nếu cần), thu hồi token/key bị lộ, chặn IP tấn công.\n2. ĐÁNH GIÁ phạm vi: log/audit xem dữ liệu gì bị lộ, bao nhiêu người dùng, từ khi nào.\n3. KHẮC PHỤC gốc rễ: sửa lỗ hổng (thêm kiểm tra quyền, parameterize query...), review các endpoint tương tự, thêm test chống tái diễn.\n4. THÔNG BÁO: báo cáo nội bộ, thông báo người dùng bị ảnh hưởng (buộc đổi mật khẩu nếu cần), tuân thủ pháp lý về rò rỉ dữ liệu.\n5. RÚT KINH NGHIỆM: post-mortem không đổ lỗi, bổ sung monitoring/alert, đưa security review vào quy trình dev.\n\nĐiểm ghi bàn khi trả lời: bình tĩnh, ưu tiên ngăn chặn trước, minh bạch, có phòng ngừa lâu dài.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Hệ thống & tình huống",
  "items": [
   {
    "question": "API chậm dần khi dữ liệu lớn lên — bạn chẩn đoán và xử lý thế nào?",
    "answer": "Quy trình chẩn đoán (đo trước, sửa sau):\n1. ĐO: APM/log thời gian từng bước — chậm ở DB, ở code, hay ở network?\n2. Thường là DB: bật slow query log, chạy EXPLAIN xem query plan.\n\nCác fix phổ biến theo thứ tự rẻ → đắt:\n- Thêm INDEX cho cột trong WHERE/JOIN/ORDER BY.\n- Sửa N+1 query (JOIN/include thay vì query trong vòng lặp).\n- SELECT đúng cột cần thay vì SELECT *; phân trang bắt buộc (limit/offset hoặc cursor).\n- Cache kết quả đọc nhiều ghi ít (Redis, TTL hợp lý).\n- Tác vụ nặng chuyển sang chạy nền (queue), API trả về ngay.\n- Cuối cùng mới đến: read replica, partition/shard, nâng cấp hạ tầng.",
    "examples": []
   },
   {
    "question": "Caching: các chiến lược phổ biến và vấn đề cần lưu ý?",
    "answer": "Các lớp cache: trình duyệt/CDN → application cache (Redis/Memcached) → DB cache.\n\nChiến lược phổ biến:\n- Cache-aside (lazy): app đọc cache trước, miss thì đọc DB rồi ghi vào cache — phổ biến nhất.\n- Write-through: ghi DB đồng thời ghi cache.\n- TTL + invalidation khi dữ liệu đổi.\n\nCác vấn đề kinh điển (hay bị hỏi sâu):\n- Cache stampede: cache hết hạn, ngàn request cùng dồn vào DB → dùng lock/single-flight, TTL lệch ngẫu nhiên.\n- Cache penetration: truy vấn key không tồn tại xuyên thẳng DB → cache cả giá trị rỗng, bloom filter.\n- Stale data: chấp nhận dữ liệu cũ trong TTL hay phải invalidate ngay? — tùy nghiệp vụ.\n- 'Cache invalidation là 1 trong 2 bài toán khó nhất của CS' — đừng cache những gì chưa cần.",
    "examples": ["// Cache-aside với Redis (NestJS)\nasync getProduct(id: number) {\n  const cached = await this.redis.get(`product:${id}`);\n  if (cached) return JSON.parse(cached);\n  const product = await this.repo.findOneBy({ id });\n  await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 300);\n  return product;\n}"]
   },
   {
    "question": "Message queue (RabbitMQ/Kafka) dùng để làm gì? Khi nào cần?",
    "answer": "Message queue tách việc XỬ LÝ khỏi việc NHẬN yêu cầu — producer đẩy message vào queue, consumer xử lý dần.\n\nDùng khi:\n- Tác vụ chậm không cần kết quả ngay: gửi email, xuất báo cáo, xử lý ảnh/video.\n- Chịu tải đột biến (spike): queue làm bộ đệm, consumer xử lý theo sức.\n- Tách rời service (decouple): đặt hàng xong bắn event 'order_created', service kho/email/thống kê tự tiêu thụ — thêm consumer mới không sửa code cũ.\n\nRabbitMQ: queue truyền thống, routing linh hoạt, message xử lý xong là xóa. Kafka: event log lưu lâu, throughput cực cao, replay được — hợp event sourcing, data pipeline.\n\nPhải xử lý: message trùng lặp (consumer idempotent!), thứ tự, dead-letter queue cho message lỗi.",
    "examples": []
   },
   {
    "question": "Horizontal scaling khác vertical scaling? Muốn scale app NestJS ra nhiều instance cần lưu ý gì?",
    "answer": "- Vertical (scale up): tăng CPU/RAM cho một máy — đơn giản nhưng có trần và là điểm chết duy nhất (SPOF).\n- Horizontal (scale out): thêm nhiều instance sau load balancer — co giãn tốt, chịu lỗi tốt, nhưng đòi hỏi app STATELESS.\n\nChecklist để app chạy được nhiều instance:\n1. Không lưu state trong RAM process: session → Redis/JWT; cache dùng chung → Redis.\n2. File upload → object storage (S3), không ghi đĩa local.\n3. Rate limit counter → Redis (không đếm riêng từng instance).\n4. WebSocket → cần sticky session hoặc Redis adapter (socket.io) để broadcast qua các instance.\n5. Cron job → chỉ chạy trên 1 instance (lock phân tán) kẻo chạy trùng.\n6. Migration DB chạy một nơi, không tự chạy mỗi instance.",
    "examples": []
   },
   {
    "question": "Transaction giữa nhiều service (microservices) xử lý thế nào khi không có transaction chung?",
    "answer": "Trong microservices mỗi service một DB — không có ACID transaction xuyên service. Các pattern thay thế:\n\n1. Saga pattern: chuỗi transaction cục bộ, mỗi bước có hành động BÙ TRỪ (compensating) khi bước sau thất bại. Ví dụ đặt vé: giữ chỗ → trừ tiền thất bại → hủy giữ chỗ. Hai kiểu: choreography (các service tự lắng nghe event) và orchestration (một điều phối viên trung tâm).\n2. Outbox pattern: ghi event vào bảng outbox CÙNG transaction với dữ liệu, worker riêng đọc outbox đẩy lên queue — đảm bảo không mất event.\n3. Idempotency: mọi handler xử lý được message lặp (retry an toàn) — dùng idempotency key.\n4. Chấp nhận eventual consistency: dữ liệu nhất quán 'sau một lúc' thay vì tức thời — phải thiết kế UX/nghiệp vụ theo đó.",
    "examples": []
   },
   {
    "question": "Thiết kế API pagination: offset-based khác cursor-based?",
    "answer": "- Offset-based (?page=3&limit=20 → OFFSET 40): đơn giản, nhảy trang tùy ý. Nhược: OFFSET lớn phải quét bỏ hàng triệu hàng (chậm dần); dữ liệu thêm/xóa giữa 2 lần gọi gây lệch trang (trùng/sót bản ghi).\n- Cursor-based (?after=eyJpZCI6MTIw → WHERE id < cursor ORDER BY id DESC LIMIT 20): dựa vào giá trị mốc của bản ghi cuối, luôn nhanh nhờ index, không lệch khi dữ liệu đổi. Nhược: không nhảy thẳng trang N. Chuẩn cho infinite scroll, feed, dữ liệu lớn.\n\nTrả kèm metadata: nextCursor/hasMore (cursor) hoặc totalPages (offset).",
    "examples": ["-- Offset: trang càng sâu càng chậm\nSELECT * FROM orders ORDER BY id DESC LIMIT 20 OFFSET 100000;\n\n-- Cursor: luôn nhanh nhờ index trên id\nSELECT * FROM orders WHERE id < 123456\nORDER BY id DESC LIMIT 20;"]
   },
   {
    "question": "Tình huống: production bị lỗi 500 hàng loạt sau khi deploy, bạn làm gì?",
    "answer": "1. ROLLBACK TRƯỚC, tìm nguyên nhân sau — khôi phục dịch vụ là ưu tiên số 1 (rollback deployment/image về bản trước; feature flag thì tắt flag).\n2. Nếu rollback không được (đã migrate DB…): xem log lỗi + APM xác định endpoint/exception, hotfix nhỏ nhất có thể.\n3. Thông báo: báo team/stakeholder sớm, cập nhật status.\n4. Sau sự cố: post-mortem không đổ lỗi — nguyên nhân gốc, vì sao test/CI không bắt được, hành động phòng ngừa.\n\nPhòng ngừa (điểm cộng khi trả lời): staging giống production, migration tương thích ngược (expand-contract), deploy dần (canary/blue-green), health check + auto rollback, alert theo error rate.",
    "examples": []
   },
   {
    "question": "Database migration trên production làm sao để không downtime?",
    "answer": "Nguyên tắc expand-contract (mở rộng trước, thu hẹp sau) — mọi migration phải TƯƠNG THÍCH NGƯỢC với code đang chạy:\n\nVí dụ đổi tên cột name → full_name:\n1. Expand: thêm cột full_name (nullable), code ghi CẢ HAI cột, đọc ưu tiên cột mới.\n2. Backfill: copy dữ liệu cũ sang cột mới (theo batch nhỏ, tránh lock bảng).\n3. Chuyển hẳn: code chỉ dùng full_name.\n4. Contract: xóa cột name ở release sau.\n\nTránh: RENAME/DROP cột đang được code cũ dùng, thêm cột NOT NULL không default vào bảng lớn, migration chạy trong deploy mà không rollback được. Luôn có kế hoạch rollback cho từng bước.",
    "examples": []
   },
   {
    "question": "Idempotency là gì? Vì sao API thanh toán bắt buộc phải idempotent?",
    "answer": "Idempotent: gọi MỘT thao tác NHIỀU LẦN cho kết quả như gọi một lần.\n\nTheo HTTP: GET/PUT/DELETE vốn idempotent; POST thì không — mà POST /payments bị retry (mạng chập chờn, user bấm đúp, queue redeliver) là TRỪ TIỀN HAI LẦN.\n\nGiải pháp Idempotency-Key:\n1. Client sinh key duy nhất (UUID) gửi kèm header cho mỗi giao dịch.\n2. Server lưu key + kết quả lần xử lý đầu (unique constraint).\n3. Request trùng key → trả lại kết quả cũ, KHÔNG xử lý lại.\n\nÁp dụng tương tự cho consumer message queue (at-least-once delivery luôn có khả năng nhận trùng).",
    "examples": ["POST /api/payments\nIdempotency-Key: 3f8e2a1c-...\n\n// Server (giản lược)\nconst existed = await repo.findByKey(key);\nif (existed) return existed.response; // trả kết quả cũ\nconst result = await processPayment(dto);\nawait repo.save({ key, response: result }); // unique(key)\nreturn result;"]
   },
   {
    "question": "Monitoring và logging cho hệ thống backend cần những gì?",
    "answer": "3 trụ cột observability:\n1. Logs: log CÓ CẤU TRÚC (JSON), đủ ngữ cảnh (requestId, userId), phân level (error/warn/info), tập trung về một chỗ (ELK, Loki, CloudWatch). KHÔNG log dữ liệu nhạy cảm (mật khẩu, token, số thẻ).\n2. Metrics: error rate, latency (p50/p95/p99 — đừng chỉ nhìn average), throughput, CPU/RAM, queue depth, DB connections (Prometheus + Grafana).\n3. Tracing: theo dấu một request xuyên qua nhiều service (OpenTelemetry, Jaeger) — tìm điểm chậm trong microservices.\n\nAlert: đặt theo triệu chứng người dùng cảm nhận (error rate tăng, p99 vượt ngưỡng) thay vì mọi biến động; alert phải actionable, tránh alert fatigue. Health check endpoint cho load balancer/K8s.",
    "examples": []
   },
   {
    "question": "Tình huống: bảng orders 100 triệu dòng, truy vấn báo cáo làm chậm cả hệ thống — hướng xử lý?",
    "answer": "Phân tích: báo cáo (OLAP — quét nhiều dòng, tổng hợp) đang cạnh tranh tài nguyên với giao dịch (OLTP — đọc/ghi từng dòng nhanh). Hai loại tải này không nên chung một DB.\n\nCác bước xử lý từ nhẹ đến nặng:\n1. Tối ưu query báo cáo: index phù hợp, chỉ quét khoảng thời gian cần.\n2. Read replica: báo cáo đọc từ bản sao, không đụng DB chính (chấp nhận trễ replication).\n3. Bảng tổng hợp sẵn (summary table / materialized view): job đêm tính sẵn số liệu theo ngày — báo cáo đọc bảng nhỏ.\n4. Partition bảng theo thời gian (tháng/quý): query chỉ quét partition liên quan, xóa dữ liệu cũ nhanh.\n5. Lớn hơn nữa: ETL sang data warehouse riêng (BigQuery, ClickHouse...) cho phân tích.\n\nĐiểm ghi bàn: nêu được ý 'tách OLTP khỏi OLAP' và lộ trình tăng dần thay vì nhảy ngay vào giải pháp phức tạp.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Mạng",
  "items": [
   {
    "question": "Mô hình OSI 7 tầng gồm những tầng nào?",
    "answer": "Từ dưới lên trên (nhớ theo cụm 'Phải Do Người Ta Sản Phẩm Ai'):\n1. Physical (Vật lý): truyền bit thô qua dây/sóng — cáp, tín hiệu điện.\n2. Data Link (Liên kết dữ liệu): đóng khung, địa chỉ MAC, switch.\n3. Network (Mạng): định tuyến gói tin qua các mạng, địa chỉ IP, router.\n4. Transport (Giao vận): TCP/UDP, đảm bảo (hoặc không) truyền tin cậy, port.\n5. Session (Phiên): thiết lập/duy trì/kết thúc phiên.\n6. Presentation (Trình diễn): mã hóa, nén, chuyển đổi định dạng (TLS, JPEG).\n7. Application (Ứng dụng): giao thức người dùng thấy — HTTP, FTP, DNS, SMTP.\n\nThực tế lập trình web hay dùng mô hình TCP/IP 4 tầng gộp lại: Link, Internet, Transport, Application.",
    "examples": ["Ví dụ tương ứng thiết bị/giao thức:\n- Tầng 2 (Data Link): switch, MAC\n- Tầng 3 (Network): router, IP\n- Tầng 4 (Transport): TCP, UDP\n- Tầng 7 (Application): HTTP, DNS"]
   },
   {
    "question": "Phân biệt TCP và UDP?",
    "answer": "TCP (Transmission Control Protocol) — hướng kết nối, tin cậy:\n- Bắt tay 3 bước (three-way handshake) trước khi truyền.\n- Đảm bảo gói tin đến đủ, đúng thứ tự (đánh số sequence, ACK, truyền lại khi mất).\n- Có kiểm soát luồng (flow control) và tắc nghẽn (congestion control).\n- Chậm hơn, overhead lớn. Dùng cho: web (HTTP), email, truyền file, giao dịch — nơi cần chính xác.\n\nUDP (User Datagram Protocol) — không kết nối, không đảm bảo:\n- Gửi luôn không bắt tay (fire-and-forget), không ACK, không sắp thứ tự.\n- Nhanh, nhẹ, độ trễ thấp. Chấp nhận mất vài gói.\n- Dùng cho: video/audio streaming, game online, VoIP, DNS.\n\nCâu chốt: cần chính xác → TCP; cần nhanh/real-time và chịu được mất mát → UDP.",
    "examples": []
   },
   {
    "question": "Three-way handshake của TCP diễn ra thế nào?",
    "answer": "Ba bước thiết lập kết nối trước khi truyền dữ liệu:\n1. SYN: client gửi gói SYN (kèm số seq khởi đầu) xin mở kết nối.\n2. SYN-ACK: server trả lời, vừa xác nhận (ACK) vừa gửi SYN của mình.\n3. ACK: client xác nhận lại → kết nối đã sẵn sàng, bắt đầu truyền.\n\nĐóng kết nối lại cần 4 bước (four-way): mỗi bên gửi FIN và nhận ACK riêng vì TCP song công (full-duplex), mỗi chiều đóng độc lập.",
    "examples": ["Client → SYN → Server\nClient ← SYN-ACK ← Server\nClient → ACK → Server\n(kết nối thiết lập, truyền dữ liệu)"]
   },
   {
    "question": "DNS hoạt động như thế nào?",
    "answer": "DNS (Domain Name System) là 'danh bạ' của Internet: dịch tên miền dễ nhớ (google.com) sang địa chỉ IP mà máy tính dùng để định tuyến.\n\nLuồng phân giải (đệ quy) điển hình khi chưa có cache:\n1. Trình duyệt/OS kiểm tra cache local trước.\n2. Hỏi DNS resolver (thường của ISP).\n3. Resolver hỏi Root server → được chỉ tới TLD server (.com).\n4. TLD server chỉ tới Authoritative server của domain.\n5. Authoritative server trả về IP.\n6. Kết quả được cache theo TTL để lần sau nhanh hơn.\n\nCác loại record hay gặp: A (IPv4), AAAA (IPv6), CNAME (bí danh), MX (mail), TXT, NS.",
    "examples": []
   },
   {
    "question": "HTTP vs HTTPS khác nhau ra sao? TLS bảo vệ điều gì?",
    "answer": "HTTP truyền dữ liệu dạng plaintext — dễ bị nghe lén (sniff) và giả mạo (man-in-the-middle). HTTPS = HTTP chạy trên TLS/SSL, cổng mặc định 443.\n\nTLS mang lại 3 đảm bảo:\n1. Bảo mật (Confidentiality): mã hóa dữ liệu, người giữa đường không đọc được.\n2. Toàn vẹn (Integrity): phát hiện nếu dữ liệu bị sửa trên đường.\n3. Xác thực (Authentication): chứng chỉ do CA cấp xác minh đúng server, chống mạo danh.\n\nTLS handshake dùng bất đối xứng (public/private key) để trao đổi khóa an toàn, rồi chuyển sang mã hóa đối xứng (nhanh hơn) cho phần dữ liệu.",
    "examples": []
   },
   {
    "question": "Ý nghĩa các nhóm HTTP status code? Nêu vài mã hay gặp.",
    "answer": "Chia theo chữ số đầu:\n- 1xx: thông tin (ít gặp).\n- 2xx: thành công — 200 OK, 201 Created (đã tạo), 204 No Content.\n- 3xx: chuyển hướng — 301 Moved Permanently (vĩnh viễn), 302 Found (tạm), 304 Not Modified (dùng cache).\n- 4xx: lỗi phía client — 400 Bad Request, 401 Unauthorized (chưa xác thực), 403 Forbidden (không đủ quyền), 404 Not Found, 429 Too Many Requests.\n- 5xx: lỗi phía server — 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.\n\nPhân biệt hay bị hỏi: 401 = chưa/lỗi đăng nhập; 403 = đã biết bạn là ai nhưng không cho phép.",
    "examples": []
   },
   {
    "question": "Các HTTP method chính và tính idempotent?",
    "answer": "- GET: lấy dữ liệu, không đổi trạng thái (an toàn, idempotent).\n- POST: tạo mới / gửi dữ liệu — KHÔNG idempotent (gọi 2 lần tạo 2 bản ghi).\n- PUT: thay thế toàn bộ tài nguyên — idempotent (gọi n lần kết quả như 1 lần).\n- PATCH: cập nhật một phần — thường không đảm bảo idempotent.\n- DELETE: xóa — idempotent (xóa rồi xóa lại vẫn là 'đã xóa').\n\nIdempotent nghĩa là gọi nhiều lần cho cùng trạng thái cuối. Đó là lý do thanh toán (POST) cần Idempotency-Key để retry không trừ tiền hai lần.",
    "examples": []
   },
   {
    "question": "CORS là gì và vì sao request bị chặn?",
    "answer": "Trình duyệt áp Same-Origin Policy: mặc định JavaScript ở origin A (scheme + host + port) không được đọc phản hồi từ origin B khác. CORS (Cross-Origin Resource Sharing) là cơ chế để server B cho phép có kiểm soát.\n\nCách hoạt động:\n- Với request 'đơn giản', trình duyệt gửi kèm header Origin; server trả Access-Control-Allow-Origin phù hợp thì trình duyệt mới cho JS đọc.\n- Với request 'phức tạp' (PUT/DELETE, custom header...), trình duyệt gửi preflight OPTIONS hỏi trước; server phải trả các header Access-Control-Allow-Methods/Headers.\n\nLưu ý: CORS là cơ chế của TRÌNH DUYỆT, không phải bảo mật server. Lỗi CORS = server chưa cấu hình cho phép origin đó, sửa ở phía server.",
    "examples": ["Response header từ server cho phép:\nAccess-Control-Allow-Origin: https://myapp.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization"]
   },
   {
    "question": "Điều gì xảy ra khi gõ URL và nhấn Enter? (What happens when you type a URL)",
    "answer": "Câu hỏi phỏng vấn kinh điển, trả lời theo trình tự:\n1. Phân giải DNS: trình duyệt tìm IP của tên miền (cache → resolver → root/TLD/authoritative).\n2. Thiết lập kết nối TCP tới IP đó (three-way handshake).\n3. Nếu HTTPS: TLS handshake để mã hóa.\n4. Trình duyệt gửi HTTP request (GET /...) kèm header.\n5. Server xử lý và trả HTTP response (HTML + status code).\n6. Trình duyệt parse HTML, tải tiếp CSS/JS/ảnh (nhiều request), dựng DOM/CSSOM → render cây, layout, paint.\n7. JS chạy, trang tương tác được.\n\nNêu thêm được: cache (browser/CDN), keep-alive, load balancer trước server là điểm cộng.",
    "examples": []
   },
   {
    "question": "IP private vs public, NAT là gì?",
    "answer": "IP public: duy nhất toàn cầu, định tuyến được trên Internet.\nIP private (RFC1918): dùng nội bộ LAN, không ra thẳng Internet — gồm 3 dải:\n- 10.0.0.0/8\n- 172.16.0.0/12 (172.16–172.31)\n- 192.168.0.0/16\n\nNAT (Network Address Translation): router thay địa chỉ private của thiết bị nội bộ bằng IP public của router khi ra Internet, và ánh xạ ngược khi phản hồi về. Nhờ NAT nhiều thiết bị trong nhà dùng chung một IP public — giúp tiết kiệm IPv4 và ẩn cấu trúc mạng nội bộ.\n\nLiên quan: DHCP là dịch vụ tự cấp phát IP (thường private) cho thiết bị khi vào mạng.",
    "examples": []
   },
   {
    "question": "So sánh HTTP/1.1, HTTP/2 và HTTP/3?",
    "answer": "HTTP/1.1: mỗi kết nối TCP xử lý tuần tự từng request; bị head-of-line blocking; trình duyệt phải mở nhiều kết nối song song. Có keep-alive để tái dùng kết nối.\n\nHTTP/2: multiplexing — nhiều request/response đan xen trên MỘT kết nối TCP; nén header (HPACK); server push. Giảm độ trễ đáng kể. Vẫn bị HOL blocking ở tầng TCP khi mất gói.\n\nHTTP/3: chạy trên QUIC (nền UDP) thay vì TCP; giải quyết HOL blocking ở tầng vận chuyển; handshake nhanh hơn (gộp cả TLS 1.3), chuyển mạng (wifi↔4G) không đứt kết nối.\n\nÝ chốt: xu hướng là giảm số vòng khứ hồi (round-trip) và loại bỏ blocking.",
    "examples": []
   },
   {
    "question": "WebSocket khác HTTP thường ở điểm nào? Khi nào dùng?",
    "answer": "HTTP là mô hình request–response một chiều: client hỏi, server trả, rồi đóng. Muốn cập nhật realtime phải polling (hỏi liên tục) — tốn tài nguyên và trễ.\n\nWebSocket: sau một handshake nâng cấp từ HTTP (header Upgrade), mở kênh song công (full-duplex) BỀN VỮNG trên một kết nối TCP — server chủ động đẩy dữ liệu cho client bất cứ lúc nào.\n\nDùng cho: chat, thông báo realtime, giá cổ phiếu/crypto, bảng điều khiển live, game. Nếu chỉ cần server→client một chiều, cân nhắc SSE (Server-Sent Events) đơn giản hơn.",
    "examples": []
   },
   {
    "question": "Tình huống: người dùng báo 'trang lúc vào được lúc không', ngẫu nhiên. Bạn nghi ngờ và kiểm tra tầng mạng thế nào?",
    "answer": "Chẩn đoán theo từng tầng, từ ngoài vào trong:\n1. Phân giải DNS: nslookup/dig tên miền — có thể một trong nhiều bản ghi A trỏ sai, hoặc DNS cache cũ.\n2. Kết nối: ping (mất gói không?), traceroute (nghẽn ở hop nào?), telnet/nc tới cổng (443 có mở không).\n3. Tầng ứng dụng: nếu sau load balancer có nhiều server (instance), rất có thể MỘT instance lỗi — request rơi vào nó thì fail, rơi vào cái khác thì OK → giải thích tính 'ngẫu nhiên'. Kiểm tra health check + log từng instance.\n4. TLS: chứng chỉ hết hạn/không khớp trên một node.\n5. Client: so sánh nhiều mạng/thiết bị để loại trừ mạng người dùng.\n\nĐiểm ghi bàn: nêu được giả thuyết 'một node hỏng phía sau load balancer' cho triệu chứng chập chờn, và cách cô lập bằng log/health check.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Tối ưu FE",
  "items": [
   {
    "question": "Các chỉ số Core Web Vitals là gì và tối ưu ra sao?",
    "answer": "Google đo trải nghiệm bằng 3 chỉ số chính:\n- LCP (Largest Contentful Paint): thời gian phần tử lớn nhất hiển thị. Tốt < 2.5s. Tối ưu: nén/định dạng ảnh hiện đại (WebP/AVIF), preload tài nguyên quan trọng, CDN, giảm thời gian phản hồi server.\n- INP (Interaction to Next Paint, thay cho FID): độ trễ phản hồi tương tác. Tốt < 200ms. Tối ưu: chia nhỏ tác vụ JS dài, tránh block main thread, dùng web worker.\n- CLS (Cumulative Layout Shift): độ 'giật' bố cục. Tốt < 0.1. Tối ưu: đặt width/height cho ảnh & khung quảng cáo, tránh chèn nội dung đẩy layout.\n\nĐo bằng Lighthouse, PageSpeed Insights, Chrome DevTools.",
    "examples": []
   },
   {
    "question": "Những kỹ thuật giảm thời gian tải trang chính?",
    "answer": "1. Giảm dung lượng: minify JS/CSS/HTML, nén gzip/Brotli, tree-shaking loại code chết.\n2. Code splitting + lazy loading: chỉ tải phần cần cho màn hình hiện tại (import động, React.lazy, route-based splitting).\n3. Ảnh: định dạng mới (WebP/AVIF), responsive srcset, lazy-load ảnh dưới màn hình (loading='lazy').\n4. Caching: HTTP cache header, hash tên file để cache lâu (cache busting), Service Worker.\n5. CDN: phục vụ tài nguyên tĩnh gần người dùng.\n6. Giảm request: gộp file, HTTP/2 multiplexing, dùng sprite/icon font hợp lý.\n7. Ưu tiên critical CSS, defer/async script không quan trọng.\n8. Prefetch/preload tài nguyên sắp cần.",
    "examples": ["<img src='a.webp' width='800' height='600' loading='lazy'>\n<script src='analytics.js' defer></script>\n<link rel='preload' href='hero.webp' as='image'>"]
   },
   {
    "question": "Debounce vs Throttle — khác nhau và dùng khi nào?",
    "answer": "Cả hai giới hạn tần suất gọi hàm để giảm tải:\n- Debounce: chỉ chạy SAU khi ngừng kích hoạt một khoảng t. Mỗi lần gọi lại reset đồng hồ. Dùng cho ô tìm kiếm (chờ user gõ xong mới gọi API), resize xong mới tính toán.\n- Throttle: đảm bảo chạy TỐI ĐA 1 lần mỗi khoảng t dù kích hoạt liên tục. Dùng cho scroll, mousemove, theo dõi vị trí — cần cập nhật đều đặn nhưng không quá dày.\n\nMẹo nhớ: debounce = 'đợi im lặng rồi làm'; throttle = 'làm đều theo nhịp'.",
    "examples": ["// Debounce: gọi API tìm kiếm sau 300ms ngừng gõ\nfunction debounce(fn, delay){let t; return (...a)=>{clearTimeout(t); t=setTimeout(()=>fn(...a),delay);};}"]
   },
   {
    "question": "Virtual DOM là gì và vì sao giúp tối ưu render?",
    "answer": "Virtual DOM (React/Vue) là bản sao cây UI dạng object JS trong bộ nhớ. Khi state đổi, framework dựng cây ảo mới, so sánh (diffing) với cây cũ, rồi chỉ cập nhật ĐÚNG những nút DOM thật đã thay đổi — thay vì vẽ lại toàn bộ.\n\nThao tác DOM thật rất tốn kém (reflow/repaint); gom nhóm và tối thiểu hóa thay đổi giúp mượt hơn. Kèm theo: dùng key ổn định cho danh sách, memo hóa (React.memo, useMemo, useCallback) để tránh render lại thừa.\n\nLưu ý: Virtual DOM không phải luôn nhanh nhất — với danh sách cực lớn cần thêm virtualization (chỉ render các dòng đang thấy).",
    "examples": []
   },
   {
    "question": "Tình huống: một trang danh sách hiển thị 10.000 dòng, cuộn giật lag nặng. Xử lý thế nào?",
    "answer": "Nguyên nhân: render đồng thời 10.000 nút DOM khiến layout/paint và bộ nhớ quá tải.\n\nHướng xử lý:\n1. List virtualization / windowing (react-window, react-virtualized, CDK Virtual Scroll của Angular): chỉ render các dòng đang trong khung nhìn + đệm, tái sử dụng nút khi cuộn. Đây là giải pháp cốt lõi.\n2. Phân trang hoặc infinite scroll (cursor-based) để không tải hết một lúc.\n3. Giảm chi phí mỗi dòng: memo hóa component dòng, tránh inline function/object trong render, dùng key ổn định.\n4. Tránh reflow: cố định chiều cao dòng, tránh tính toán layout trong lúc cuộn (throttle sự kiện scroll).\n5. Chuyển xử lý nặng (lọc/sắp xếp) sang web worker hoặc server.\n\nĐiểm ghi bàn: gọi tên được 'virtualization' và giải thích chỉ render phần nhìn thấy.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Kỹ năng & công cụ FE",
  "items": [
   {
    "question": "Bundler (Webpack/Vite) làm gì? Vì sao Vite nhanh hơn khi dev?",
    "answer": "Bundler gom nhiều module JS/CSS/ảnh thành các file tối ưu để trình duyệt tải: giải quyết import, transpile (Babel/TS), minify, tree-shaking, code splitting, hashing tên file.\n\nWebpack: bundle toàn bộ app trước khi phục vụ → dev server khởi động chậm khi dự án lớn.\nVite: khi dev tận dụng ES modules gốc của trình duyệt, chỉ biên dịch file khi được yêu cầu (on-demand) và dùng esbuild (viết bằng Go) rất nhanh → khởi động gần như tức thì, HMR nhanh. Khi build production vẫn bundle (dùng Rollup).\n\nKhái niệm liên quan: HMR (Hot Module Replacement) — cập nhật module đã đổi mà không reload cả trang, giữ nguyên state.",
    "examples": []
   },
   {
    "question": "Vai trò của npm/package.json, và khác nhau dependencies vs devDependencies?",
    "answer": "package.json khai báo metadata + danh sách phụ thuộc + scripts. npm/yarn/pnpm cài đặt và quản lý phiên bản.\n\n- dependencies: thư viện cần khi CHẠY sản phẩm (React, axios).\n- devDependencies: chỉ cần khi PHÁT TRIỂN/BUILD (eslint, jest, vite, typescript) — không đóng gói vào bản production.\n\n- package-lock.json (hoặc yarn.lock): khóa chính xác phiên bản của toàn bộ cây phụ thuộc để mọi máy cài giống hệt nhau (build tái lập được).\n- Semantic versioning: ^1.2.3 cho phép cập nhật minor/patch, ~1.2.3 chỉ patch, 1.2.3 khóa cứng.\n- pnpm tiết kiệm ổ đĩa nhờ dùng chung store; yarn/pnpm hỗ trợ workspaces (monorepo).",
    "examples": []
   },
   {
    "question": "Git: phân biệt merge và rebase; luồng làm việc nhóm cơ bản?",
    "answer": "- merge: gộp nhánh, tạo commit merge, GIỮ nguyên lịch sử phân nhánh (đồ thị có nhánh). An toàn, hợp cho nhánh chung.\n- rebase: 'phát lại' các commit của bạn lên đầu nhánh khác → lịch sử THẲNG, sạch. Nhưng viết lại hash, KHÔNG rebase nhánh đã push chung (loạn cho người khác).\n\nLuồng nhóm phổ biến (feature branch / GitHub flow):\n1. Tạo nhánh từ main: git checkout -b feature/x.\n2. Commit nhỏ, rõ nghĩa; push nhánh.\n3. Mở Pull Request → review code → CI chạy test.\n4. Merge vào main (squash để gọn lịch sử), xóa nhánh.\n\nKèm: giải quyết conflict, git stash, git cherry-pick, .gitignore.",
    "examples": ["git checkout -b feature/login\ngit add . && git commit -m 'feat: form đăng nhập'\ngit push -u origin feature/login\n# mở PR, review, merge"]
   },
   {
    "question": "Bạn debug lỗi Frontend bằng những công cụ/kỹ thuật nào?",
    "answer": "1. Chrome DevTools:\n   - Console: xem lỗi JS, log.\n   - Network: kiểm tra request/response, status code, payload, thời gian, CORS.\n   - Elements: soi DOM, CSS đang áp, box model.\n   - Sources: đặt breakpoint, step qua code, xem call stack.\n   - Performance: profiling, tìm long task; Lighthouse: đo hiệu năng/SEO/a11y.\n   - Application: cookie, localStorage, cache, Service Worker.\n2. React/Vue DevTools: xem cây component, props/state, re-render.\n3. Source maps để debug code gốc dù đã minify.\n4. Kỹ thuật: tái hiện ổn định → khoanh vùng (binary search/comment bớt) → kiểm tra giả thuyết → sửa → viết test tránh tái diễn.",
    "examples": []
   },
   {
    "question": "Tình huống: giao diện chạy tốt trên máy bạn nhưng khách báo lỗi trên trình duyệt/thiết bị của họ. Bạn làm gì?",
    "answer": "Đây là vấn đề tương thích (cross-browser / responsive). Quy trình:\n1. Thu thập thông tin: trình duyệt gì, phiên bản, hệ điều hành, kích thước màn hình, ảnh chụp lỗi, các bước tái hiện.\n2. Tái hiện: dùng DevTools device toolbar (responsive), thử trên trình duyệt/thiết bị đó (BrowserStack nếu không có máy thật).\n3. Nguyên nhân thường gặp: CSS/JS chưa hỗ trợ ở trình duyệt cũ (thiếu polyfill/prefix), khác kích thước màn hình chưa xử lý responsive, cache client giữ bản cũ, khác múi giờ/định dạng số.\n4. Khắc phục: kiểm tra caniuse.com, thêm polyfill/autoprefixer, sửa media query, xóa cache (đổi hash file).\n5. Phòng ngừa: thiết lập ma trận trình duyệt hỗ trợ, test tự động đa trình duyệt trong CI.\n\nĐiểm ghi bàn: bình tĩnh thu thập ngữ cảnh và biết công cụ tái hiện thay vì phủ nhận 'máy em vẫn chạy'.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Deploy & DevOps",
  "items": [
   {
    "question": "CI/CD là gì? Một pipeline điển hình gồm những bước nào?",
    "answer": "- CI (Continuous Integration): mỗi lần push code, hệ thống tự động build + chạy test → phát hiện lỗi sớm, tránh 'integration hell'.\n- CD (Continuous Delivery/Deployment): tự động đưa bản build đã qua kiểm thử lên môi trường (staging/production). Delivery = sẵn sàng deploy bằng 1 nút; Deployment = tự động deploy hẳn.\n\nPipeline điển hình:\n1. Trigger: push/PR lên Git.\n2. Build: cài dependency, compile, đóng gói (Docker image).\n3. Test: unit, integration, lint, quét bảo mật.\n4. Artifact: đẩy image lên registry.\n5. Deploy: lên staging → chạy smoke/e2e test → lên production.\n6. Monitor: theo dõi log/metric, rollback nếu lỗi.\n\nCông cụ: GitHub Actions, GitLab CI, Jenkins, CircleCI.",
    "examples": []
   },
   {
    "question": "Docker giải quyết vấn đề gì? Phân biệt image và container?",
    "answer": "Docker đóng gói ứng dụng + toàn bộ phụ thuộc (runtime, thư viện, cấu hình) vào một đơn vị chạy nhất quán ở mọi nơi — hết cảnh 'trên máy em chạy được'. Nhẹ hơn máy ảo vì chia sẻ kernel OS host (container ảo hóa ở mức tiến trình, không ảo hóa cả OS).\n\n- Image: khuôn mẫu chỉ đọc (read-only), dựng từ Dockerfile theo từng lớp (layer). Ví dụ: node:18 + code app.\n- Container: một thực thể ĐANG CHẠY của image (có lớp ghi riêng). Từ 1 image tạo được nhiều container.\n\nLiên quan: docker-compose chạy nhiều container liên kết (app + DB + redis); registry (Docker Hub) lưu image.",
    "examples": ["# Dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"node\", \"server.js\"]"]
   },
   {
    "question": "Kubernetes để làm gì? Vì sao cần khi đã có Docker?",
    "answer": "Docker chạy container trên một máy; nhưng khi có hàng trăm container trên nhiều máy thì cần điều phối (orchestration) — đó là việc của Kubernetes (K8s):\n- Tự động triển khai, mở rộng (scale) tăng/giảm số bản sao theo tải.\n- Self-healing: container chết thì tự khởi động lại, chuyển sang node khác.\n- Load balancing & service discovery giữa các pod.\n- Rolling update / rollback không downtime.\n- Quản lý cấu hình (ConfigMap) và bí mật (Secret).\n\nKhái niệm: Pod (đơn vị nhỏ nhất, chứa 1+ container), Deployment (quản lý bản sao pod), Service (điểm truy cập ổn định), Ingress (định tuyến HTTP vào cluster).\n\nGhi chú: dự án nhỏ chưa cần K8s — cân nhắc độ phức tạp so với nhu cầu.",
    "examples": []
   },
   {
    "question": "Các chiến lược deploy giảm rủi ro: blue-green, canary, rolling?",
    "answer": "- Rolling update: thay dần từng nhóm instance từ bản cũ sang mới. Không downtime, ít tốn tài nguyên; nhưng trong lúc chạy tồn tại cả 2 phiên bản (cần tương thích ngược).\n- Blue-Green: dựng song song môi trường mới (green) y hệt cũ (blue); test xong thì chuyển toàn bộ traffic qua green. Rollback tức thì (trỏ lại blue), nhưng tốn gấp đôi tài nguyên.\n- Canary: đẩy bản mới cho một % nhỏ người dùng trước, theo dõi metric/lỗi; ổn thì tăng dần đến 100%. Giới hạn thiệt hại nếu bản mới lỗi.\n\nKèm theo: feature flag để bật/tắt tính năng không cần deploy lại; health check + auto-rollback.",
    "examples": []
   },
   {
    "question": "Tình huống: deploy production xong lỗi 500 hàng loạt. Quy trình xử lý và phòng ngừa?",
    "answer": "Ưu tiên số 1: KHÔI PHỤC DỊCH VỤ, không phải tìm nguyên nhân.\n\nXử lý ngay:\n1. Rollback về bản ổn định trước đó (hoặc chuyển traffic về môi trường blue). Nếu dùng feature flag, tắt tính năng lỗi.\n2. Xác nhận dịch vụ đã hồi phục (health check, metric).\n3. Thông báo team/stakeholder về sự cố.\n\nSau khi ổn định — điều tra:\n4. Đọc log/APM (Sentry, Datadog, CloudWatch), tái hiện ở staging, tìm root cause (migration lỗi? biến môi trường thiếu? phụ thuộc ngoài chết?).\n5. Viết post-mortem không đổ lỗi, rút bài học.\n\nPhòng ngừa:\n- Canary/blue-green + auto-rollback theo error rate.\n- Health check & smoke test sau deploy.\n- Migration DB tương thích ngược (expand-contract).\n- Monitoring + cảnh báo theo p99/error rate.\n\nĐiểm ghi bàn: nói 'rollback trước, điều tra sau' và có tư duy phòng ngừa hệ thống.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Thiết kế hệ thống & Cloud",
  "items": [
   {
    "question": "Quy trình từ ý tưởng đến triển khai một sản phẩm gồm những giai đoạn và công cụ nào?",
    "answer": "1. Yêu cầu & phân tích: làm rõ bài toán, user story, tiêu chí chấp nhận. Công cụ: Jira, Trello, Notion, Confluence.\n2. Thiết kế: UI/UX (Figma), thiết kế hệ thống & DB (sơ đồ ERD, kiến trúc), chọn công nghệ.\n3. Phát triển: code theo nhánh Git, review qua PR; FE + BE + DB. Công cụ: VS Code, GitHub/GitLab.\n4. Kiểm thử: unit/integration/e2e (Jest, Cypress, Postman), QA thủ công, staging.\n5. Tích hợp & triển khai: CI/CD build–test–deploy tự động; đóng gói Docker; hạ tầng cloud (AWS/GCP/Azure) hoặc PaaS (Vercel, Netlify, Render).\n6. Vận hành & giám sát: logging, monitoring (Grafana, Sentry, Datadog), cảnh báo, backup.\n7. Bảo trì & cải tiến: thu thập phản hồi, sửa lỗi, lặp lại (Agile/Scrum với sprint).\n\nÝ chốt: đây là vòng lặp liên tục (Agile), không phải làm một lần xong (waterfall).",
    "examples": []
   },
   {
    "question": "Các mô hình dịch vụ cloud IaaS / PaaS / SaaS khác nhau thế nào?",
    "answer": "Ẩn dụ 'pizza as a service' — bạn tự lo bao nhiêu phần:\n- IaaS (Infrastructure): thuê hạ tầng thô (máy ảo, mạng, ổ đĩa), tự cài OS/runtime/app. Linh hoạt nhất, quản lý nhiều nhất. Ví dụ: AWS EC2, Google Compute Engine.\n- PaaS (Platform): nhà cung cấp lo hạ tầng + runtime, bạn chỉ đẩy code. Nhanh, ít vận hành. Ví dụ: Heroku, Vercel, App Engine, Render.\n- SaaS (Software): dùng luôn phần mềm hoàn chỉnh qua trình duyệt, không quản lý gì. Ví dụ: Gmail, Google Docs, Salesforce.\n- (Thêm) Serverless/FaaS: chạy hàm theo sự kiện, tự scale, trả tiền theo lần gọi. Ví dụ: AWS Lambda, Cloud Functions.\n\nĐánh đổi: càng lên cao càng ít việc vận hành nhưng càng ít kiểm soát.",
    "examples": []
   },
   {
    "question": "Vì sao và làm sao để scale một hệ thống? Vertical vs Horizontal?",
    "answer": "Khi tải tăng, một server không đủ:\n- Scale dọc (vertical): nâng cấp máy mạnh hơn (CPU/RAM). Đơn giản nhưng có trần và là điểm chết đơn lẻ (SPOF).\n- Scale ngang (horizontal): thêm nhiều máy, đặt load balancer chia tải. Không giới hạn cứng, chịu lỗi tốt — nhưng cần app stateless (không giữ session cục bộ; đẩy session sang Redis/DB).\n\nCác kỹ thuật hỗ trợ:\n- Load balancer (round-robin, least-connection) + nhiều instance.\n- Caching (Redis/CDN) giảm tải DB.\n- DB: read replica cho đọc, sharding/partition cho dữ liệu lớn.\n- Message queue (Kafka/RabbitMQ) để xử lý bất đồng bộ, chống dồn tải.\n- Auto-scaling theo metric.\n\nÝ chốt: thiết kế stateless để scale ngang dễ dàng.",
    "examples": []
   },
   {
    "question": "Monolith vs Microservices — chọn cái nào?",
    "answer": "- Monolith: toàn bộ app trong một codebase/deploy. Ưu: đơn giản, dễ phát triển/deploy/test lúc đầu, gọi hàm nội bộ nhanh. Nhược: lớn lên thì khó bảo trì, một lỗi có thể sập cả hệ thống, phải scale toàn bộ dù chỉ một phần nóng.\n- Microservices: tách theo nghiệp vụ, mỗi service deploy/scale độc lập, có thể khác công nghệ. Ưu: mở rộng đội nhóm, cô lập lỗi, scale từng phần. Nhược: phức tạp vận hành (mạng, giao tiếp, dữ liệu phân tán, giám sát, transaction phân tán).\n\nLời khuyên thực tế: bắt đầu bằng monolith gọn (modular monolith), tách microservice khi thật sự cần vì lý do tổ chức/quy mô — đừng chọn microservice chỉ vì 'thời thượng'.",
    "examples": []
   },
   {
    "question": "Tình huống: sếp giao thiết kế hệ thống rút gọn link (như bit.ly) chịu tải lớn. Bạn trình bày thế nào?",
    "answer": "Trả lời có cấu trúc (khung system design):\n1. Làm rõ yêu cầu: chức năng (tạo link ngắn, redirect, thống kê click, custom alias, hết hạn?); phi chức năng (đọc nhiều hơn ghi rất nhiều — read-heavy, độ trễ thấp, độ sẵn sàng cao).\n2. Ước lượng quy mô: vd 100M link/tháng, tỉ lệ đọc/ghi ~100:1 → tính QPS, dung lượng lưu trữ.\n3. Thiết kế API: POST /shorten (url→ mã), GET /{code} → 301 redirect.\n4. Sinh mã ngắn: mã hóa base62 từ ID tự tăng, hoặc hash + xử lý trùng. Độ dài 7 ký tự đủ hàng nghìn tỉ.\n5. Lưu trữ: bảng ánh xạ code→url. Ghi vừa phải → SQL ok; cực lớn → NoSQL key-value (dễ sharding theo code).\n6. Tối ưu đọc: cache Redis cho link nóng; CDN; DB read replica.\n7. Mở rộng & tin cậy: load balancer nhiều app stateless, sharding DB, rate limiting chống lạm dụng, phân tích click bất đồng bộ qua message queue.\n\nĐiểm ghi bàn: đi từ yêu cầu → ước lượng → API → lưu trữ → scale, và nêu được điểm nghẽn (redirect phải cực nhanh nên phải cache).",
    "examples": []
   }
  ]
 },
 {
  "topic": "Bảo mật web nâng cao",
  "items": [
   {
    "question": "OWASP Top 10 là gì? Kể vài rủi ro quan trọng.",
    "answer": "OWASP Top 10 là danh sách 10 nhóm rủi ro bảo mật web nghiêm trọng nhất, do cộng đồng OWASP cập nhật định kỳ — kim chỉ nam để lập trình viên biết cần phòng gì.\n\nMột số mục nổi bật (bản 2021):\n1. Broken Access Control: kiểm soát quyền lỏng lẻo (xem/sửa dữ liệu người khác).\n2. Cryptographic Failures: lộ dữ liệu nhạy cảm do không/mã hóa yếu.\n3. Injection: SQL injection, XSS...\n4. Insecure Design: thiếu tư duy bảo mật từ thiết kế.\n5. Security Misconfiguration: cấu hình sai, để mặc định, lộ thông báo lỗi.\n6. Vulnerable Components: dùng thư viện cũ có lỗ hổng.\n7. Identification & Authentication Failures.\n8. SSRF (Server-Side Request Forgery).\n\nÝ chốt: bảo mật là quá trình xuyên suốt (defense in depth), không phải một tính năng gắn thêm cuối.",
    "examples": []
   },
   {
    "question": "SQL Injection là gì và phòng chống thế nào?",
    "answer": "SQL Injection: kẻ tấn công chèn mã SQL độc hại qua ô nhập, do ứng dụng NỐI CHUỖI trực tiếp input vào câu lệnh. Ví dụ input \"' OR '1'='1\" biến điều kiện luôn đúng → đăng nhập lậu hoặc rò rỉ/xóa dữ liệu.\n\nPhòng chống:\n1. Prepared Statement / Parameterized Query — quan trọng nhất: tham số được truyền TÁCH khỏi câu lệnh, DB không coi input là mã.\n2. Dùng ORM đúng cách (JPA/Hibernate, Sequelize) — vẫn cẩn thận với raw query.\n3. Kiểm tra & chuẩn hóa input (whitelist), giới hạn quyền tài khoản DB (least privilege).\n4. Không lộ thông báo lỗi SQL chi tiết ra ngoài.\n\nCâu chốt: 'không bao giờ tin dữ liệu người dùng; luôn dùng truy vấn tham số hóa'.",
    "examples": ["// SAI — nối chuỗi\n\"SELECT * FROM users WHERE name = '\" + input + \"'\"\n\n// ĐÚNG — prepared statement\nPreparedStatement ps = conn.prepareStatement(\n  \"SELECT * FROM users WHERE name = ?\");\nps.setString(1, input);"]
   },
   {
    "question": "XSS (Cross-Site Scripting) là gì? Các loại và cách chống?",
    "answer": "XSS: kẻ tấn công chèn mã JavaScript độc vào trang, chạy trên trình duyệt NẠN NHÂN — đánh cắp cookie/token, giả mạo thao tác.\n\nCác loại:\n- Stored XSS: mã độc lưu trên server (bình luận, hồ sơ) rồi phát cho mọi người xem — nguy hiểm nhất.\n- Reflected XSS: mã độc nằm trong URL/tham số, phản chiếu lại ngay trong response.\n- DOM-based XSS: lỗ hổng ở JS phía client thao tác DOM với dữ liệu chưa lọc.\n\nPhòng chống:\n1. Escape/encode output theo ngữ cảnh (HTML, attribute, JS). Framework như React tự escape khi render {value}.\n2. Tránh innerHTML/dangerouslySetInnerHTML với dữ liệu người dùng; nếu cần thì sanitize (DOMPurify).\n3. Content Security Policy (CSP) hạn chế nguồn script được chạy.\n4. Cookie gắn HttpOnly để JS không đọc được token.",
    "examples": []
   },
   {
    "question": "CSRF (Cross-Site Request Forgery) là gì và phòng bằng cách nào?",
    "answer": "CSRF: lợi dụng việc trình duyệt TỰ ĐỘNG gửi cookie phiên, kẻ tấn công lừa nạn nhân (đang đăng nhập) bấm vào trang/độc link khiến trình duyệt gửi request thay đổi dữ liệu (chuyển tiền, đổi email) mà nạn nhân không hay.\n\nKhác XSS: XSS chèn mã chạy trên trang nạn nhân; CSRF lợi dụng phiên đăng nhập để gửi request giả từ trang khác.\n\nPhòng chống:\n1. CSRF token: server sinh token ngẫu nhiên gắn vào form; request phải kèm token đúng — trang lạ không đoán được.\n2. Cookie SameSite (Strict/Lax): trình duyệt không gửi cookie cho request từ site khác.\n3. Kiểm tra header Origin/Referer.\n4. Với API dùng token trong header Authorization (không dựa cookie tự gửi) thì ít bị CSRF hơn.",
    "examples": []
   },
   {
    "question": "JWT vs Session-Cookie: cơ chế nào, khác gì, khi nào dùng?",
    "answer": "Session (stateful): server lưu phiên (session store/Redis), trả session-id qua cookie. Mỗi request server tra store để biết ai. Dễ thu hồi (xóa session) nhưng cần lưu trạng thái → khó scale ngang nếu không chia sẻ store.\n\nJWT (stateless): sau đăng nhập server ký một token chứa thông tin (claims) + chữ ký. Client gửi token ở header Authorization: Bearer. Server chỉ cần VERIFY chữ ký, không tra DB → dễ scale, hợp microservices/mobile. Nhược: khó thu hồi trước hạn (phải dùng blacklist/token ngắn hạn + refresh token).\n\nLưu ý bảo mật JWT: KHÔNG để dữ liệu nhạy cảm trong payload (chỉ base64, ai cũng đọc được); đặt hạn ngắn; lưu ở nơi an toàn (HttpOnly cookie tốt hơn localStorage để tránh XSS trộm token).",
    "examples": ["JWT gồm 3 phần ngăn bởi dấu chấm:\nheader.payload.signature\n- header: thuật toán (HS256/RS256)\n- payload: claims (sub, exp, role...)\n- signature: ký bằng secret/private key"]
   },
   {
    "question": "Lưu mật khẩu trong DB đúng cách? Hashing vs Encryption?",
    "answer": "KHÔNG BAO GIỜ lưu mật khẩu dạng thô (plaintext) hay mã hóa 2 chiều. Phải HASH một chiều với salt.\n\n- Hashing (một chiều): không thể đảo ngược. Dùng hàm CHẬM chuyên cho mật khẩu: bcrypt, scrypt, Argon2 — cố tình tốn thời gian để chống brute-force. KHÔNG dùng MD5/SHA-1 (quá nhanh, dễ dò).\n- Salt: chuỗi ngẫu nhiên thêm vào mỗi mật khẩu trước khi hash → hai người cùng mật khẩu ra hash khác nhau, vô hiệu hóa rainbow table.\n- Khi đăng nhập: hash mật khẩu nhập với salt đã lưu rồi so sánh hash.\n\n- Encryption (hai chiều, có key giải mã): dùng cho dữ liệu cần đọc lại (số thẻ, thông tin cá nhân) — không dùng cho mật khẩu.",
    "examples": []
   },
   {
    "question": "HTTPS/TLS bảo vệ gì? Các header bảo mật nên bật?",
    "answer": "TLS đảm bảo bảo mật (mã hóa), toàn vẹn (chống sửa), xác thực server (chứng chỉ) — chống nghe lén và man-in-the-middle.\n\nCác HTTP security header nên bật:\n- Strict-Transport-Security (HSTS): ép trình duyệt luôn dùng HTTPS.\n- Content-Security-Policy (CSP): giới hạn nguồn script/style → chống XSS.\n- X-Content-Type-Options: nosniff — chặn đoán sai kiểu file.\n- X-Frame-Options / frame-ancestors: chống clickjacking (nhúng site vào iframe lừa bấm).\n- Set-Cookie với HttpOnly, Secure, SameSite.\n- Referrer-Policy hạn chế rò rỉ URL.\n\nĐiểm cộng: nhắc HTTPS còn tốt cho SEO và là bắt buộc với HTTP/2.",
    "examples": []
   },
   {
    "question": "Tình huống: người dùng báo tài khoản bị chiếm dụng dù họ nói không lộ mật khẩu. Bạn điều tra hướng nào?",
    "answer": "Đặt giả thuyết theo các vector tấn công phổ biến và kiểm tra hệ thống:\n1. Rò rỉ token/session: XSS đánh cắp token trong localStorage? Kiểm tra có lỗ hổng XSS, token có HttpOnly không, thời hạn token.\n2. CSRF: hành động nhạy cảm có CSRF token / SameSite cookie chưa?\n3. Credential stuffing: người dùng dùng lại mật khẩu bị lộ ở site khác → bật MFA, phát hiện đăng nhập bất thường, rate limit + khóa tạm sau nhiều lần sai.\n4. Lỗ hổng Broken Access Control: kiểm tra API có kiểm quyền đúng chủ sở hữu không (IDOR — đổi id trên URL truy cập dữ liệu người khác).\n5. Man-in-the-middle: có bắt buộc HTTPS/HSTS chưa.\n6. Rà log: IP/thiết bị/thời điểm đăng nhập bất thường.\n\nKhắc phục & phòng ngừa: buộc đổi mật khẩu + thu hồi mọi session, bật MFA, thông báo người dùng, thêm cảnh báo đăng nhập thiết bị lạ, audit lại phân quyền.\n\nĐiểm ghi bàn: tư duy theo nhiều vector (không đổ ngay cho người dùng) và biết khái niệm IDOR, credential stuffing, MFA.",
    "examples": []
   }
  ]
 },
 {
  "topic": "SQL",
  "items": [
   {
    "question": "CTE (WITH) là gì? Vì sao nên dùng thay subquery lồng?",
    "answer": "CTE (Common Table Expression) là bảng tạm có tên, khai báo bằng WITH, chỉ tồn tại trong câu lệnh. Giúp truy vấn phức tạp DỄ ĐỌC hơn: tách từng bước logic thay vì subquery lồng nhiều tầng khó theo dõi.\n\nƯu điểm:\n- Đặt tên cho bước trung gian → self-documenting.\n- Tái sử dụng nhiều lần trong cùng query.\n- Hỗ trợ đệ quy (recursive CTE) — làm được cây phân cấp mà subquery thường không làm nổi.\n\nLưu ý: CTE thường chỉ là cú pháp dễ đọc; hiệu năng tùy tối ưu hóa của DBMS (có DB materialize CTE, có DB inline).",
    "examples": ["WITH doanh_thu_thang AS (\n  SELECT customer_id, SUM(amount) AS total\n  FROM orders\n  WHERE order_date >= '2026-01-01'\n  GROUP BY customer_id\n)\nSELECT c.name, d.total\nFROM doanh_thu_thang d\nJOIN customers c ON c.id = d.customer_id\nWHERE d.total > 1000;"]
   },
   {
    "question": "Recursive CTE dùng để làm gì? Ví dụ cây phân cấp.",
    "answer": "Recursive CTE (WITH RECURSIVE) tự tham chiếu chính nó để duyệt dữ liệu PHÂN CẤP/đồ thị: cây nhân viên–quản lý, danh mục cha–con, đường đi. Gồm 2 phần nối bằng UNION ALL:\n- Anchor: hàng khởi đầu (gốc).\n- Recursive: nối CTE với bảng gốc để lấy thế hệ tiếp theo, lặp đến khi không còn hàng mới.\n\nĐây là thứ cực khó làm bằng SQL thường — biết recursive CTE là điểm cộng lớn.",
    "examples": ["-- Liệt kê toàn bộ cấp dưới của sếp id = 1\nWITH RECURSIVE subordinates AS (\n  SELECT id, name, manager_id\n  FROM employees WHERE id = 1        -- anchor\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id\n  FROM employees e\n  JOIN subordinates s ON e.manager_id = s.id  -- recursive\n)\nSELECT * FROM subordinates;"]
   },
   {
    "question": "Tìm và xóa bản ghi TRÙNG (duplicate) như thế nào?",
    "answer": "Tìm trùng: GROUP BY các cột định danh trùng rồi HAVING COUNT(*) > 1.\n\nXóa trùng nhưng GIỮ LẠI 1 bản: cách an toàn dùng window function ROW_NUMBER() đánh số các bản trùng theo nhóm, rồi xóa những dòng số > 1. Đây là bài rất hay bị hỏi và dễ làm sai (xóa nhầm hết).",
    "examples": ["-- Tìm email trùng\nSELECT email, COUNT(*) FROM users\nGROUP BY email HAVING COUNT(*) > 1;\n\n-- Xóa trùng, giữ id nhỏ nhất mỗi email\nWITH d AS (\n  SELECT id, ROW_NUMBER() OVER (\n    PARTITION BY email ORDER BY id) AS rn\n  FROM users\n)\nDELETE FROM users\nWHERE id IN (SELECT id FROM d WHERE rn > 1);"]
   },
   {
    "question": "EXISTS vs IN vs JOIN — khi nào dùng cái nào?",
    "answer": "- IN: hợp khi danh sách con NHỎ, cố định. Cẩn thận NULL: 'NOT IN (subquery có NULL)' trả về rỗng bất ngờ.\n- EXISTS: kiểm tra 'có tồn tại ít nhất 1 dòng khớp', dừng ngay khi thấy → thường nhanh với subquery lớn/tương quan; an toàn với NULL. Dùng NOT EXISTS thay NOT IN để tránh bẫy NULL.\n- JOIN: khi cần LẤY cột từ bảng kia, hoặc ghép dữ liệu. Nếu chỉ kiểm tra tồn tại thì EXISTS rõ nghĩa hơn (JOIN có thể nhân bản dòng nếu quan hệ 1-nhiều).\n\nQuy tắc thực dụng: cần dữ liệu → JOIN; chỉ lọc theo điều kiện tồn tại → EXISTS.",
    "examples": ["-- Khách CÓ đơn hàng (EXISTS dừng sớm)\nSELECT c.* FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id);\n\n-- Khách CHƯA có đơn — dùng NOT EXISTS (an toàn NULL)\nSELECT c.* FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id);"]
   },
   {
    "question": "Correlated subquery là gì? Khác subquery thường?",
    "answer": "- Subquery thường (độc lập): chạy MỘT LẦN, kết quả dùng cho query ngoài. Ví dụ lọc theo AVG toàn bảng.\n- Correlated subquery (tương quan): tham chiếu cột của query ngoài, nên chạy LẶP LẠI cho từng dòng ngoài → có thể chậm nếu bảng lớn. Bù lại diễn đạt được logic 'so với nhóm của chính dòng đó'.\n\nVí dụ điển hình: nhân viên có lương cao hơn lương trung bình PHÒNG BAN của họ.",
    "examples": ["-- Lương cao hơn trung bình phòng của chính mình\nSELECT e.* FROM employees e\nWHERE e.salary > (\n  SELECT AVG(e2.salary)\n  FROM employees e2\n  WHERE e2.dept_id = e.dept_id   -- tương quan\n);"]
   },
   {
    "question": "Pivot dữ liệu (hàng thành cột) bằng CASE + GROUP BY?",
    "answer": "SQL chuẩn không có PIVOT tiện lợi ở mọi DB, nên kỹ thuật phổ biến là SUM/COUNT kèm CASE WHEN — mỗi cột đích là một biểu thức điều kiện. Rất hay dùng làm báo cáo (doanh thu theo tháng, đếm trạng thái theo cột).",
    "examples": ["-- Doanh thu mỗi khách theo quý, thành 4 cột\nSELECT customer_id,\n  SUM(CASE WHEN quarter=1 THEN amount ELSE 0 END) AS q1,\n  SUM(CASE WHEN quarter=2 THEN amount ELSE 0 END) AS q2,\n  SUM(CASE WHEN quarter=3 THEN amount ELSE 0 END) AS q3,\n  SUM(CASE WHEN quarter=4 THEN amount ELSE 0 END) AS q4\nFROM sales\nGROUP BY customer_id;"]
   },
   {
    "question": "Window function nâng cao: running total, LAG/LEAD, ntile?",
    "answer": "Window function tính toán trên một 'khung' dòng mà KHÔNG gộp mất chi tiết (khác GROUP BY). Ngoài ROW_NUMBER/RANK còn:\n- SUM(...) OVER (ORDER BY ...): tổng lũy kế (running total).\n- LAG/LEAD: lấy giá trị dòng trước/sau — tính tăng trưởng so với kỳ trước.\n- NTILE(n): chia dữ liệu thành n nhóm đều (phân vị).\n- PARTITION BY: reset khung theo nhóm.\n\nĐây là công cụ phân tích dữ liệu mạnh, rất được hỏi ở vị trí backend/data.",
    "examples": ["-- Doanh thu lũy kế theo ngày và so với ngày trước\nSELECT day, amount,\n  SUM(amount) OVER (ORDER BY day) AS running_total,\n  amount - LAG(amount) OVER (ORDER BY day) AS delta\nFROM daily_sales\nORDER BY day;"]
   },
   {
    "question": "Tối ưu một câu query chậm: quy trình và vai trò của EXPLAIN?",
    "answer": "Quy trình chẩn đoán:\n1. Đo & tái hiện: xác định query chậm (slow query log).\n2. EXPLAIN / EXPLAIN ANALYZE: xem kế hoạch thực thi — DB đang Full Table Scan hay dùng index? Ước lượng số dòng, kiểu join.\n3. Đánh index đúng chỗ: cột trong WHERE, JOIN, ORDER BY. Composite index tuân luật LEFTMOST PREFIX (thứ tự cột quan trọng).\n4. Tránh làm hỏng index: hàm/tính toán lên cột (WHERE YEAR(date)=2026), leading wildcard LIKE '%abc', ép kiểu ngầm.\n5. Chỉ SELECT cột cần (covering index), giảm dữ liệu trả về.\n6. Sửa N+1, tránh subquery tương quan nặng, cân nhắc denormalize/summary table.\n7. Với bảng khổng lồ: phân trang keyset, partition.\n\nĐiểm ghi bàn: nhắc 'nhìn EXPLAIN trước khi đoán' và hiểu vì sao hàm lên cột phá index.",
    "examples": ["-- SAI: hàm lên cột phá index\nWHERE YEAR(order_date) = 2026\n-- ĐÚNG: giữ cột nguyên vẹn để dùng index\nWHERE order_date >= '2026-01-01'\n  AND order_date <  '2027-01-01';"]
   },
   {
    "question": "Deadlock trong DB là gì và làm sao giảm thiểu?",
    "answer": "Deadlock: hai (hoặc nhiều) transaction giữ khóa và cùng chờ khóa của nhau → không ai đi tiếp. DB tự phát hiện và HỦY một transaction (nạn nhân) để giải vây; ứng dụng cần bắt lỗi và thử lại.\n\nGiảm thiểu:\n- Truy cập các bảng/hàng theo CÙNG MỘT THỨ TỰ nhất quán ở mọi transaction.\n- Giữ transaction NGẮN, ít thao tác, commit sớm.\n- Dùng mức isolation phù hợp (không cao hơn mức cần).\n- Đánh index để giảm phạm vi khóa (khóa ít dòng hơn).\n- Có cơ chế retry khi gặp deadlock.\n\nLiên quan: phân biệt với lock chờ thường (một bên chờ, không vòng tròn).",
    "examples": []
   },
   {
    "question": "Tình huống: báo cáo cuối tháng chạy 5 phút làm treo cả hệ thống giao dịch. Bạn xử lý ra sao?",
    "answer": "Nhận diện: truy vấn phân tích nặng (OLAP — quét, tổng hợp) đang tranh khóa/tài nguyên với giao dịch (OLTP). Hướng xử lý tăng dần:\n1. EXPLAIN query báo cáo → thêm index, chỉ quét khoảng thời gian cần, bỏ SELECT *.\n2. Chạy trên READ REPLICA (bản sao chỉ đọc) để không đụng DB chính.\n3. Bảng tổng hợp sẵn / materialized view: job đêm tính trước số liệu theo ngày → báo cáo đọc bảng nhỏ, gần như tức thì.\n4. Giảm khóa: mức isolation đọc phù hợp (READ COMMITTED / snapshot) để báo cáo không chặn ghi.\n5. Partition bảng theo thời gian: query chỉ quét partition liên quan.\n6. Quy mô lớn hơn: ETL sang data warehouse (BigQuery/ClickHouse) chuyên phân tích.\n\nĐiểm ghi bàn: nêu được 'tách OLTP khỏi OLAP' + dùng replica/summary table + đọc EXPLAIN, thay vì chỉ nói 'thêm RAM'.",
    "examples": []
   }
  ]
 },
 {
  "topic": "SQL - Bài tập",
  "items": [
   {
    "question": "Bài 1: Lương cao thứ 2 (Nth highest). Bảng employees(id, name, salary). Lấy mức lương cao thứ 2 (có xét lương trùng).",
    "answer": "Phân tích: 'cao thứ 2 có xét trùng' → dùng DENSE_RANK (RANK/ROW_NUMBER sẽ sai khi có lương bằng nhau). DENSE_RANK không bỏ số khi trùng nên hạng 2 đúng nghĩa 'mức lương lớn thứ 2 khác biệt'.\n\nBẫy hay gặp: dùng LIMIT 1 OFFSET 1 sẽ sai khi lương cao nhất bị trùng. Nếu không có hạng 2 (mọi người cùng lương) thì kết quả rỗng — nên trình bày rõ giả định.",
    "examples": ["-- Cách 1: DENSE_RANK (khuyên dùng)\nWITH ranked AS (\n  SELECT salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM employees\n)\nSELECT DISTINCT salary\nFROM ranked WHERE rnk = 2;\n\n-- Cách 2: không dùng window\nSELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);"]
   },
   {
    "question": "Bài 2: Top N mỗi nhóm. Bảng employees(id, name, dept_id, salary). Lấy nhân viên có lương cao NHẤT trong TỪNG phòng ban.",
    "answer": "Phân tích: 'cao nhất mỗi nhóm' là mẫu 'top-N-per-group' kinh điển → window function ROW_NUMBER/RANK với PARTITION BY dept_id, ORDER BY salary DESC, rồi lọc hạng = 1.\n\nMẹo: dùng RANK() nếu muốn lấy TẤT CẢ người đồng hạng nhất (nhiều người cùng lương cao nhất); ROW_NUMBER() nếu chỉ lấy đúng 1 người mỗi phòng. Muốn Top 3 thì đổi điều kiện thành <= 3.",
    "examples": ["WITH ranked AS (\n  SELECT id, name, dept_id, salary,\n    RANK() OVER (PARTITION BY dept_id\n                 ORDER BY salary DESC) AS rnk\n  FROM employees\n)\nSELECT id, name, dept_id, salary\nFROM ranked\nWHERE rnk = 1;"]
   },
   {
    "question": "Bài 3: Khách chưa từng mua. Bảng customers(id, name) và orders(id, customer_id, ...). Liệt kê khách CHƯA có đơn hàng nào.",
    "answer": "Phân tích: bài 'anti-join' — tìm hàng ở bảng A không có ở bảng B. Ba cách viết:\n1. NOT EXISTS (khuyên dùng — an toàn NULL, thường tối ưu tốt).\n2. LEFT JOIN ... WHERE b.key IS NULL.\n3. NOT IN (cẩn thận nếu customer_id có NULL sẽ ra rỗng).",
    "examples": ["-- Cách 1: NOT EXISTS\nSELECT c.* FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id);\n\n-- Cách 2: LEFT JOIN tìm phía NULL\nSELECT c.* FROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;"]
   },
   {
    "question": "Bài 4: Khách không hoạt động 90 ngày. Bảng orders(id, customer_id, order_date). Tìm khách CÓ mua nhưng đơn GẦN NHẤT đã hơn 90 ngày trước (churn).",
    "answer": "Phân tích: gom theo customer_id, lấy MAX(order_date) là ngày mua gần nhất, rồi HAVING lọc những ai có lần mua cuối cách hiện tại > 90 ngày. Dùng HAVING vì lọc trên kết quả tổng hợp.\n\nLưu ý hàm ngày theo hệ quản trị: MySQL DATE_SUB(CURDATE(), INTERVAL 90 DAY); PostgreSQL CURRENT_DATE - INTERVAL '90 days'.",
    "examples": ["SELECT customer_id,\n       MAX(order_date) AS last_order\nFROM orders\nGROUP BY customer_id\nHAVING MAX(order_date) < CURRENT_DATE - INTERVAL '90 days';"]
   },
   {
    "question": "Bài 5: Doanh thu theo tháng + tăng trưởng so tháng trước. Bảng sales(id, amount, sale_date).",
    "answer": "Phân tích: hai bước — (1) gom doanh thu theo tháng; (2) dùng LAG() để lấy doanh thu tháng liền trước, tính chênh lệch và % tăng trưởng. Đây là mẫu 'so với kỳ trước' rất hay hỏi cho báo cáo.\n\nDùng CTE cho gọn: CTE tổng hợp theo tháng, query ngoài áp window LAG theo thứ tự tháng.",
    "examples": ["WITH monthly AS (\n  SELECT DATE_TRUNC('month', sale_date) AS month,\n         SUM(amount) AS revenue\n  FROM sales\n  GROUP BY DATE_TRUNC('month', sale_date)\n)\nSELECT month, revenue,\n  revenue - LAG(revenue) OVER (ORDER BY month) AS diff,\n  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))\n    / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct\nFROM monthly\nORDER BY month;"]
   },
   {
    "question": "Bài 6: Doanh thu lũy kế (running total). Bảng daily_sales(day, amount). Tính tổng cộng dồn theo ngày.",
    "answer": "Phân tích: kinh điển của window function — SUM(amount) OVER (ORDER BY day). Khác GROUP BY ở chỗ GIỮ nguyên từng dòng ngày mà vẫn có cột tổng dồn.\n\nMuốn lũy kế theo từng nhóm (vd mỗi cửa hàng) thì thêm PARTITION BY store_id.",
    "examples": ["SELECT day, amount,\n  SUM(amount) OVER (\n    ORDER BY day\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM daily_sales\nORDER BY day;"]
   },
   {
    "question": "Bài 7: Nhân viên lương cao hơn quản lý của họ (self-join). Bảng employees(id, name, salary, manager_id).",
    "answer": "Phân tích: cùng một bảng đóng hai vai (nhân viên và quản lý) → SELF JOIN, nối employee.manager_id = manager.id, rồi so sánh lương. Bài kiểm tra hiểu JOIN bảng với chính nó.",
    "examples": ["SELECT e.name AS employee, e.salary AS emp_salary,\n       m.name AS manager,  m.salary AS mgr_salary\nFROM employees e\nJOIN employees m ON e.manager_id = m.id\nWHERE e.salary > m.salary;"]
   },
   {
    "question": "Bài 8: Sản phẩm bán chạy nhất mỗi danh mục. Bảng products(id, name, category_id) và order_items(product_id, quantity).",
    "answer": "Phân tích: (1) tính tổng số lượng bán mỗi sản phẩm; (2) xếp hạng trong từng danh mục bằng ROW_NUMBER/RANK PARTITION BY category_id ORDER BY tổng bán DESC; (3) lấy hạng 1. Kết hợp JOIN để lấy category và tên sản phẩm.",
    "examples": ["WITH sold AS (\n  SELECT p.category_id, p.name,\n         SUM(oi.quantity) AS qty\n  FROM products p\n  JOIN order_items oi ON oi.product_id = p.id\n  GROUP BY p.category_id, p.name\n),\nranked AS (\n  SELECT *, RANK() OVER (PARTITION BY category_id\n                         ORDER BY qty DESC) AS rnk\n  FROM sold\n)\nSELECT category_id, name, qty\nFROM ranked WHERE rnk = 1;"]
   },
   {
    "question": "Bài 9: Tỉ lệ trên tổng (share %). Bảng sales(dept_id, amount). Tính doanh thu mỗi phòng và tỉ lệ % so với tổng toàn công ty.",
    "answer": "Phân tích: cần đồng thời tổng theo nhóm VÀ tổng toàn bộ. Dùng window SUM không kèm PARTITION (SUM(...) OVER ()) để lấy tổng toàn bảng đặt cạnh tổng nhóm — tránh phải self-join hay subquery riêng.",
    "examples": ["SELECT dept_id,\n       SUM(amount) AS dept_total,\n       ROUND(100.0 * SUM(amount)\n         / SUM(SUM(amount)) OVER (), 1) AS pct_of_total\nFROM sales\nGROUP BY dept_id\nORDER BY dept_total DESC;"]
   },
   {
    "question": "Bài 10: Lấy bản ghi MỚI NHẤT mỗi nhóm. Bảng logins(user_id, login_time, device). Với mỗi user lấy lần đăng nhập gần nhất (kèm device).",
    "answer": "Phân tích: 'latest per group' — không thể chỉ GROUP BY user_id vì cần lấy CẢ cột device của đúng dòng mới nhất (GROUP BY sẽ mất cột đó). Giải bằng ROW_NUMBER PARTITION BY user_id ORDER BY login_time DESC rồi lấy rn = 1.\n\nBẫy phổ biến: viết MAX(login_time) rồi JOIN lại — dễ nhân đôi nếu hai lần đăng nhập cùng thời điểm; ROW_NUMBER đảm bảo đúng 1 dòng.",
    "examples": ["WITH ranked AS (\n  SELECT user_id, login_time, device,\n    ROW_NUMBER() OVER (PARTITION BY user_id\n                       ORDER BY login_time DESC) AS rn\n  FROM logins\n)\nSELECT user_id, login_time, device\nFROM ranked WHERE rn = 1;"]
   }
  ]
 },
 {
  "topic": "Deploy & DevOps",
  "items": [
   {
    "question": "Infrastructure as Code (IaC) là gì? Terraform hoạt động ra sao?",
    "answer": "IaC: quản lý hạ tầng (server, mạng, DB...) bằng FILE CODE khai báo thay vì bấm tay trên console. Lợi ích: tái lập được (reproducible), versioned trong Git, review qua PR, dựng lại môi trường giống hệt trong vài phút, giảm 'configuration drift'.\n\nTerraform (khai báo, declarative): bạn mô tả TRẠNG THÁI MONG MUỐN; Terraform tự tính execution plan (terraform plan) và các bước để đạt tới đó (terraform apply). Nó giữ một STATE FILE ghi lại những gì đã tạo để so với cấu hình → biết cần thêm/sửa/xóa gì. Hỗ trợ nhiều provider (AWS, Azure, GCP).\n\nLưu ý: state file rất quan trọng — nên để remote (S3 + DynamoDB lock) và bật state locking để tránh hai người apply đồng thời làm hỏng.",
    "examples": ["resource \"aws_instance\" \"web\" {\n  ami           = \"ami-123456\"\n  instance_type = \"t3.micro\"\n  tags = { Name = \"web-server\" }\n}\n# terraform plan  -> xem thay đổi\n# terraform apply -> tạo thật"]
   },
   {
    "question": "Terraform vs Ansible khác nhau thế nào? Khi nào dùng cái nào?",
    "answer": "Hai công cụ BỔ SUNG cho nhau, không thay thế:\n- Terraform: PROVISIONING hạ tầng — tạo server, network, load balancer, DB. Khai báo, quản lý state, hợp để dựng/hủy hạ tầng.\n- Ansible: CONFIGURATION MANAGEMENT — cài phần mềm, cấu hình dịch vụ, deploy app LÊN server đã có. Chạy theo thủ tục (procedural), AGENTLESS (qua SSH), dùng YAML playbook.\n\nQuy trình thực tế thường ghép: Terraform dựng máy → Ansible cài đặt và cấu hình bên trong.\n\nSo sánh nhanh: Ansible agentless, dễ học, hợp cấu hình đơn giản; Puppet/Chef cần agent, mạnh cho môi trường Linux lớn phức tạp.",
    "examples": []
   },
   {
    "question": "GitOps là gì? Shift-left nghĩa là gì?",
    "answer": "- GitOps: lấy Git làm 'nguồn chân lý duy nhất' (single source of truth) cho cả hạ tầng lẫn ứng dụng ở dạng khai báo. Mọi thay đổi đi qua pull request; một hệ thống tự động (vd ArgoCD, Flux) liên tục ĐỒNG BỘ trạng thái thật của cluster về đúng như mô tả trong Git. Lợi: lịch sử thay đổi rõ ràng, rollback = revert commit, tự phát hiện drift.\n- Shift-left: đẩy kiểm thử, bảo mật, đảm bảo chất lượng về SỚM trong vòng đời phát triển (ngay khi code) thay vì để cuối. Bắt bug lúc dev rẻ hơn nhiều so với bắt ở production. Ví dụ: chạy lint/test/quét bảo mật (SAST) ngay trong CI mỗi PR.",
    "examples": []
   },
   {
    "question": "Observability là gì? Ba trụ cột logs/metrics/traces?",
    "answer": "Observability = khả năng HIỂU trạng thái bên trong hệ thống từ dữ liệu nó phát ra, để trả lời cả câu hỏi chưa lường trước (khác monitoring chỉ theo dõi chỉ số định sẵn).\n\nBa trụ cột:\n1. Logs: bản ghi sự kiện chi tiết theo thời gian (lỗi, request). Công cụ: ELK/Loki.\n2. Metrics: số liệu tổng hợp theo thời gian (CPU, latency, error rate, QPS). Công cụ: Prometheus + Grafana.\n3. Traces: theo dấu một request đi qua nhiều service (distributed tracing) để tìm nút thắt. Công cụ: Jaeger, OpenTelemetry.\n\nThực hành: alert theo error rate và p99 latency, không chỉ average; có dashboard + on-call.",
    "examples": []
   },
   {
    "question": "Tình huống: một Pod trong Kubernetes kẹt ở trạng thái CrashLoopBackOff. Bạn debug thế nào?",
    "answer": "CrashLoopBackOff = container khởi động rồi crash liên tục, K8s chờ (backoff) tăng dần rồi thử lại. Quy trình:\n1. kubectl describe pod <name>: đọc Events — lý do (OOMKilled? lỗi kéo image ImagePullBackOff? probe fail?).\n2. kubectl logs <pod> (và --previous để xem log lần crash trước): tìm lỗi ứng dụng thực sự.\n3. Kiểm tra nguyên nhân thường gặp:\n   - Thiếu biến môi trường / ConfigMap / Secret.\n   - Sai lệnh khởi động (command/args), file/entrypoint không tồn tại.\n   - Vượt resource limit → bị OOMKilled (tăng memory limit).\n   - Liveness/Readiness probe cấu hình sai khiến bị kill oan.\n   - Phụ thuộc ngoài (DB) chưa sẵn sàng → thêm retry/initContainer.\n4. Sửa manifest YAML và apply lại.\n\nĐiểm ghi bàn: nói được 'describe để đọc Events, logs --previous để xem crash', và liệt kê nghi phạm (OOM, config, probe).",
    "examples": ["kubectl describe pod myapp-xxxx\nkubectl logs myapp-xxxx --previous\nkubectl get events --sort-by=.lastTimestamp"]
   },
   {
    "question": "Tình huống: Docker container cứ restart liên tục sau khi deploy. Xử lý ra sao?",
    "answer": "Tương tự CrashLoopBackOff nhưng ở mức Docker thuần:\n1. docker ps -a xem trạng thái và exit code; docker logs <container> đọc lỗi.\n2. Kiểm tra: thiếu biến môi trường, dịch vụ bên trong fail khi khởi động, sai ENTRYPOINT/CMD trong Dockerfile.\n3. Kiểm tra resource limit (memory/CPU) trong docker-compose/K8s — bị OOM thì tăng giới hạn.\n4. Xem healthcheck có quá nghiêm khiến bị coi là unhealthy và restart.\n5. Chạy tương tác để dò: docker run -it --entrypoint sh <image> rồi thử lệnh khởi động thủ công.\n\nGốc rễ hay gặp: process chính thoát ngay (container sống theo PID 1); cấu hình sai; phụ thuộc chưa sẵn sàng.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Cloud & AWS",
  "items": [
   {
    "question": "Thiết kế VPC nhiều tầng (multi-tier) trên AWS như thế nào?",
    "answer": "Mô hình chuẩn tách public/private để bảo mật và sẵn sàng cao:\n- Public subnet: chứa Load Balancer (và NAT Gateway), truy cập được từ Internet qua Internet Gateway.\n- Private subnet: chứa application server và database — KHÔNG lộ trực tiếp ra Internet.\n- Trải các subnet trên NHIỀU Availability Zone (AZ) để chịu lỗi khi một AZ sập.\n- Auto Scaling Group cho app server; RDS Multi-AZ cho DB.\n- Định tuyến: private subnet ra Internet (tải bản cập nhật) qua NAT Gateway đặt ở public subnet.\n\nBảo mật nhiều lớp: Security Group ở mức instance (stateful) + NACL ở mức subnet (stateless).",
    "examples": []
   },
   {
    "question": "Security Group khác NACL thế nào? Stateful vs stateless?",
    "answer": "- Security Group (SG): tường lửa ở mức INSTANCE, STATEFUL — cho phép inbound thì phản hồi outbound tự động được cho qua (không cần rule ngược). Chỉ có luật ALLOW.\n- NACL (Network ACL): tường lửa ở mức SUBNET, STATELESS — phải khai báo cả chiều vào lẫn chiều ra riêng biệt. Có cả ALLOW và DENY, xử lý theo số thứ tự rule.\n\nThực hành: dùng SG làm lớp chính (linh hoạt, dễ quản lý), NACL làm lớp phòng thủ bổ sung ở biên subnet (vd chặn dải IP xấu).\n\nMẹo nhớ: SG 'nhớ' kết nối (stateful), NACL 'không nhớ' (stateless).",
    "examples": []
   },
   {
    "question": "Cho instance ở private subnet ra Internet: NAT Gateway hay VPC Endpoint?",
    "answer": "- NAT Gateway: đặt ở public subnet, cho instance private đi RA Internet (tải package, gọi API ngoài) nhưng Internet không vào được. Nhược: tốn phí (~$32/tháng + phí data) — đắt nếu chỉ để gọi vài dịch vụ AWS.\n- VPC Endpoint: kết nối RIÊNG TƯ tới dịch vụ AWS (S3, DynamoDB, ECR...) KHÔNG qua Internet, không cần NAT. Có Gateway Endpoint (S3/DynamoDB, miễn phí) và Interface Endpoint (nhiều dịch vụ, tính phí).\n\nQuyết định: chỉ cần gọi dịch vụ AWS (vd tải image từ ECR, đọc S3) → dùng VPC Endpoint để tiết kiệm và an toàn hơn; cần ra Internet công cộng chung → NAT Gateway.\n\nĐiểm ghi bàn: nêu được góc độ CHI PHÍ và bảo mật, không chỉ 'dùng NAT'.",
    "examples": []
   },
   {
    "question": "Thiết kế web app sẵn sàng cao (high availability) và chịu tải đột biến trên AWS?",
    "answer": "Các thành phần chính:\n1. Chạy trên NHIỀU AZ + Application Load Balancer phân phối traffic.\n2. Auto Scaling Group: tự thêm/bớt EC2 theo tải (CPU, request count) → chịu spike, tiết kiệm khi rảnh.\n3. Database: RDS Multi-AZ (tự failover) hoặc Aurora; read replica cho tải đọc.\n4. Static asset để S3 + CloudFront (CDN) phục vụ gần người dùng, giảm tải origin.\n5. Session state đẩy ra ngoài (DynamoDB/ElastiCache) để app STATELESS, scale ngang dễ.\n6. Chống DDoS: AWS Shield + WAF; CloudFront chặn ở biên.\n\nNguyên tắc: loại bỏ single point of failure, app stateless, tự động co giãn.",
    "examples": []
   },
   {
    "question": "S3 storage classes và tối ưu chi phí lưu trữ?",
    "answer": "Chọn hạng lưu trữ theo TẦN SUẤT truy cập:\n- S3 Standard: truy cập thường xuyên, độ trễ thấp.\n- S3 Intelligent-Tiering: tự chuyển hạng theo pattern truy cập (khi không đoán được).\n- S3 Standard-IA / One Zone-IA: ít truy cập, rẻ hơn nhưng phí lấy ra.\n- S3 Glacier / Glacier Deep Archive: lưu trữ lâu dài (backup, tuân thủ), rất rẻ, lấy ra chậm/tốn phí.\n\nTối ưu: dùng Lifecycle Policy tự chuyển dữ liệu cũ sang hạng rẻ hơn (vd sau 30 ngày → IA, 90 ngày → Glacier) và xóa dữ liệu hết hạn. Bật versioning cẩn thận vì tăng dung lượng.",
    "examples": []
   },
   {
    "question": "RTO và RPO là gì? Các chiến lược Disaster Recovery?",
    "answer": "- RTO (Recovery Time Objective): tối đa BAO LÂU được phép ngừng dịch vụ (thời gian phục hồi).\n- RPO (Recovery Point Objective): tối đa được phép MẤT bao nhiêu dữ liệu (tính theo thời gian, vd 5 phút).\n\nCác chiến lược DR (chi phí tăng, RTO/RPO giảm dần):\n1. Backup & Restore: rẻ nhất, phục hồi chậm (RTO/RPO cao).\n2. Pilot Light: giữ phần lõi (DB) chạy nhỏ, phần còn lại dựng khi cần.\n3. Warm Standby: môi trường thu nhỏ nhưng LUÔN chạy ở region phụ, replicate liên tục; khi sự cố thì scale lên và chuyển traffic (Route 53 health check failover). Cân bằng tốt chi phí/tốc độ.\n4. Multi-Site Active/Active: chạy đồng thời nhiều region, RTO/RPO gần 0, đắt nhất.\n\nCông cụ: Aurora Global DB, DynamoDB Global Tables, S3 Cross-Region Replication, Route 53.",
    "examples": []
   },
   {
    "question": "Tình huống: EC2 không truy cập được S3 (Access Denied). Bạn kiểm tra theo thứ tự nào?",
    "answer": "Chẩn đoán có hệ thống (đây là câu AWS kinh điển):\n1. IAM Role/Permission: EC2 có gắn IAM Role với quyền s3:GetObject, s3:ListBucket chưa? Bucket policy có chặn không? (Đa số lỗi ở đây.)\n2. Mã hóa: nếu bucket dùng SSE-KMS, IAM role có quyền dùng KMS key (kms:Decrypt) không?\n3. Kết nối mạng: instance ra được S3 qua Internet Gateway / NAT / hay cần S3 VPC Endpoint? Private subnet không có đường ra sẽ fail.\n4. Kiểm chứng: chạy aws s3 ls s3://bucket bằng CLI để xem thông báo lỗi cụ thể.\n5. Rà log: CloudTrail (xem API call bị Deny và vì sao) + CloudWatch.\n\nĐiểm ghi bàn: đi từ QUYỀN (IAM/bucket policy) → mã hóa (KMS) → mạng (endpoint) → log (CloudTrail), thay vì đoán mò. Ưu tiên least privilege khi cấp lại quyền.",
    "examples": []
   }
  ]
 },
 {
  "topic": "Hệ điều hành",
  "items": [
   {
    "question": "Phân biệt Process và Thread?",
    "answer": "- Process (tiến trình): một chương trình đang chạy, có KHÔNG GIAN BỘ NHỚ RIÊNG (code, heap, stack, data). Các process cách ly nhau; giao tiếp qua IPC (pipe, socket, shared memory). Tạo/chuyển đổi nặng.\n- Thread (luồng): đơn vị thực thi BÊN TRONG một process; các thread cùng process CHIA SẺ bộ nhớ (heap, data) nhưng mỗi thread có stack và program counter riêng. Nhẹ, tạo nhanh, giao tiếp dễ (dùng chung biến) — nhưng phải đồng bộ hóa để tránh race condition.\n\nHệ quả: một thread crash (lỗi bộ nhớ) có thể kéo sập cả process; process này crash không ảnh hưởng process khác. OS lưu thông tin mỗi process trong PCB (Process Control Block).",
    "examples": []
   },
   {
    "question": "Các thuật toán lập trình CPU (CPU scheduling) phổ biến?",
    "answer": "- FCFS (First-Come First-Served): ai đến trước phục vụ trước. Đơn giản nhưng job dài chặn job ngắn (convoy effect).\n- SJF (Shortest Job First): ưu tiên job ngắn nhất → tối ưu thời gian chờ trung bình, nhưng cần biết trước độ dài và có thể làm đói (starvation) job dài.\n- Round Robin (RR): mỗi process được một 'lát thời gian' (quantum) rồi xoay vòng → công bằng, phản hồi tốt cho hệ tương tác. Quantum quá nhỏ tốn context switch, quá lớn thành FCFS.\n- Priority Scheduling: theo độ ưu tiên; nguy cơ starvation → khắc phục bằng aging (tăng ưu tiên dần theo thời gian chờ).\n\nHệ hiện đại là PREEMPTIVE: timer interrupt cho kernel giành lại CPU để lập lịch, giữ hệ thống phản hồi.",
    "examples": []
   },
   {
    "question": "Deadlock là gì? 4 điều kiện và cách xử lý?",
    "answer": "Deadlock: hai hay nhiều tiến trình chờ nhau giải phóng tài nguyên → kẹt mãi mãi. Cần ĐỦ CẢ 4 điều kiện (Coffman) đồng thời:\n1. Mutual Exclusion: tài nguyên dùng độc quyền.\n2. Hold and Wait: giữ tài nguyên này và chờ tài nguyên khác.\n3. No Preemption: không cưỡng đoạt tài nguyên đang bị giữ.\n4. Circular Wait: tồn tại vòng chờ khép kín.\n\nXử lý:\n- Phòng ngừa (prevention): phá vỡ 1 trong 4 điều kiện — vd cấp phát tài nguyên theo THỨ TỰ cố định (phá circular wait), hoặc dùng try-lock có timeout.\n- Tránh (avoidance): Banker's Algorithm giữ hệ ở trạng thái an toàn.\n- Phát hiện & phục hồi: dựng Resource Allocation Graph, dò chu trình (DFS), rồi kill/rollback một tiến trình.",
    "examples": []
   },
   {
    "question": "Mutex vs Semaphore khác nhau thế nào?",
    "answer": "- Mutex (MUTual EXclusion): khóa cho phép ĐÚNG MỘT luồng vào vùng tới hạn (critical section) tại một thời điểm. Có tính SỞ HỮU — luồng nào khóa thì chính luồng đó phải mở. Dùng để bảo vệ tài nguyên dùng chung.\n- Semaphore: bộ đếm báo hiệu, cho phép TỐI ĐA N luồng cùng truy cập tài nguyên (counting semaphore); N=1 thành binary semaphore (gần giống mutex nhưng KHÔNG có tính sở hữu, luồng khác có thể signal). Dùng để phối hợp/giới hạn số lượng.\n\nMẹo nhớ: mutex = 'khóa cửa, ai vào người đó ra'; semaphore = 'số chỗ trống trong bãi xe'.\n\nBẫy: một luồng đã khóa mutex mà khóa lại (non-recursive) → tự deadlock.",
    "examples": []
   },
   {
    "question": "Bộ nhớ ảo, phân trang (paging) và page fault là gì?",
    "answer": "- Paging: chia bộ nhớ vật lý thành các khối cố định (frame) và bộ nhớ tiến trình thành các trang (page) cùng kích thước → cấp phát KHÔNG liên tục, loại bỏ external fragmentation. Bảng trang (page table) ánh xạ page ảo → frame vật lý; TLB là cache tăng tốc ánh xạ.\n- Virtual Memory: cho phép dùng ổ đĩa làm 'phần mở rộng' của RAM → chương trình lớn hơn RAM vẫn chạy, mỗi tiến trình thấy không gian địa chỉ liên tục riêng.\n- Page fault: khi truy cập một trang KHÔNG có trong RAM, CPU phát page fault, OS nạp trang đó từ đĩa vào (có thể đẩy trang khác ra theo thuật toán thay trang LRU/FIFO).\n\nLiên quan: thrashing — page fault quá nhiều khiến hệ dành gần hết thời gian swap thay vì làm việc (thường do quá tải bộ nhớ).",
    "examples": []
   },
   {
    "question": "Context switch là gì? Vì sao tốn kém?",
    "answer": "Context switch: OS chuyển CPU từ tiến trình/luồng này sang cái khác. Phải LƯU trạng thái (thanh ghi, program counter, stack pointer) của cái đang chạy vào PCB và NẠP trạng thái của cái tiếp theo.\n\nVì sao tốn: bản thân việc lưu/nạp mất chu kỳ CPU 'vô ích' (overhead thuần); ngoài ra còn làm mất hiệu lực cache/TLB nên sau chuyển đổi chạy chậm hơn một lúc. Chuyển giữa THREAD cùng process rẻ hơn giữa PROCESS (không phải đổi không gian địa chỉ/page table).\n\nHệ quả thực tế: tạo quá nhiều thread/quantum quá nhỏ → context switch dày đặc làm giảm throughput.",
    "examples": []
   },
   {
    "question": "Bài toán Producer-Consumer đồng bộ ra sao?",
    "answer": "Nhiều producer bỏ dữ liệu vào buffer chung, nhiều consumer lấy ra — cần đồng bộ để tránh race condition và tràn/cạn buffer. Giải kinh điển dùng 3 semaphore:\n- mutex (khởi tạo 1): bảo vệ thao tác trên buffer (chỉ 1 luồng sửa cùng lúc).\n- empty (khởi tạo = kích thước buffer): số ô trống; producer wait(empty) trước khi thêm.\n- full (khởi tạo 0): số ô có dữ liệu; consumer wait(full) trước khi lấy.\n\nProducer: wait(empty) → wait(mutex) → thêm → signal(mutex) → signal(full).\nConsumer: wait(full) → wait(mutex) → lấy → signal(mutex) → signal(empty).\n\nĐây là ví dụ tổng hợp mutex + semaphore + critical section rất hay hỏi.",
    "examples": []
   },
   {
    "question": "Tình huống: server production chạy chậm. Bạn chẩn đoán trên Linux theo thứ tự nào?",
    "answer": "Quan trọng là PHƯƠNG PHÁP (triage) chứ không phải thuộc lệnh:\n1. uptime — đọc load average, so với SỐ NHÂN CPU. Load > số core = quá tải.\n2. Khoanh vùng nút thắt là CPU / RAM / I/O / mạng:\n   - CPU: top/htop (Shift+P sắp theo CPU) tìm process ngốn CPU; runaway process? cron?\n   - RAM: free -h — có swap nhiều không? ps aux --sort=-%mem tìm top ngốn RAM; nghi memory leak thì theo dõi theo thời gian.\n   - I/O: load cao mà CPU rảnh → nghi I/O wait. iostat/iotop, tìm process ở trạng thái D (uninterruptible sleep). Xem cột 'wa' trong top/vmstat.\n   - dmesg — lỗi phần cứng hoặc OOM killer đã giết process.\n3. Dịch vụ lỗi: systemctl status / journalctl -u <svc>.\n\nĐiểm ghi bàn: narrate được thứ tự uptime → phân loại CPU/RAM/I/O → bằng chứng, và biết bẫy 'load cao nhưng CPU nhàn = I/O wait'.",
    "examples": ["uptime            # load average vs số core\ntop / htop        # CPU, RAM theo process\nfree -h           # RAM & swap\niostat -x 1       # I/O wait, đĩa bận\nps -eo state,pid,cmd | grep '^D'  # process kẹt I/O"]
   },
   {
    "question": "Tình huống: ứng dụng báo hết dung lượng đĩa nhưng df vẫn thấy còn trống. Vì sao?",
    "answer": "Đây là 'bẫy' senior kinh điển — vài nguyên nhân:\n1. Hết INODE chứ không hết block: nhiều file nhỏ dùng cạn inode. Kiểm tra bằng df -i (khác df -h xem dung lượng). Xóa bớt file nhỏ/rác.\n2. File đã XÓA nhưng tiến trình còn GIỮ mở: dung lượng chưa được giải phóng đến khi process đóng file hoặc restart. Tìm bằng lsof | grep deleted, rồi restart tiến trình đang giữ.\n3. Nhầm phân vùng: df -h để xem đúng mount point nào đầy (vd /var đầy nhưng / còn trống).\n\nQuy trình dọn dung lượng thông thường: df -h → du -sh /* tìm thư mục to → find / -type f -size +500M tìm file lớn → dọn /var/log + bật logrotate → xóa cache gói (apt clean / yum clean all).\n\nĐiểm ghi bàn: nhắc được df -i (inode) và lsof | grep deleted (file bị xóa còn mở) là ghi điểm senior.",
    "examples": ["df -h                 # dung lượng theo phân vùng\ndf -i                 # kiểm tra inode\ndu -sh /* | sort -h   # thư mục ngốn chỗ\nfind / -type f -size +500M\nlsof | grep deleted   # file đã xóa còn bị giữ mở"]
   }
  ]
 },
 {
  "topic": "Deploy thực chiến (VPS/Nginx/CI-CD)",
  "items": [
   {
    "question": "Quy trình deploy một web app lên VPS từ A→Z gồm những bước nào?",
    "answer": "Đây là câu 'walk me through it' rất hay hỏi. Kiến trúc chuẩn: Người dùng → DNS → Nginx (443, SSL) → App (localhost:3000). Các bước:\n1. Thuê VPS (Ubuntu 22.04...), SSH vào bằng key (tắt đăng nhập mật khẩu root cho an toàn).\n2. Cập nhật hệ thống, tạo user thường (không xài root), bật firewall (ufw allow 22,80,443).\n3. Cài runtime (Node/Java/Python), cài app, cài DB.\n4. Dùng process manager (PM2/systemd) để app chạy nền, tự bật lại khi crash/reboot — app chỉ nghe ở 127.0.0.1:3000, KHÔNG lộ ra ngoài.\n5. Trỏ DNS: tạo bản ghi A domain → IP VPS (chờ propagate).\n6. Cài Nginx làm reverse proxy đứng trước app; test cấu hình rồi reload.\n7. Cài Certbot xin SSL Let's Encrypt → tự thêm block 443 + redirect 80→443.\n8. Kiểm thử HTTPS, bật auto-renew cert, thiết lập log/monitoring/backup.\n\nĐiểm ghi bàn: nêu được 'app nghe localhost, Nginx mới lộ ra 443', firewall tối thiểu, và không chạy bằng root.",
    "examples": ["# firewall tối thiểu\nsudo ufw allow OpenSSH\nsudo ufw allow 'Nginx Full'   # mở 80 + 443\nsudo ufw enable\n\n# giữ app chạy nền bằng PM2\npm2 start app.js --name web\npm2 startup && pm2 save   # tự chạy lại sau reboot"]
   },
   {
    "question": "Reverse proxy là gì? Vì sao không cho app nghe trực tiếp cổng 80/443 mà phải đặt Nginx đứng trước?",
    "answer": "Reverse proxy: mọi request đi vào Nginx trước, Nginx quyết định định tuyến tới app backend chạy ở localhost. Lý do đặt Nginx trước app:\n- SSL termination: Nginx xử lý HTTPS một chỗ, app chỉ nói HTTP nội bộ — app không phải ôm chứng chỉ.\n- Phục vụ file tĩnh, nén gzip/brotli, cache, rate limit, chống tải nặng thay cho app.\n- Load balancing: phân phối tới nhiều instance app (scale ngang).\n- Ẩn app: cổng 3000 chỉ nghe 127.0.0.1, không lộ Internet → an toàn hơn.\n- Đặt nhiều site/app trên 1 VPS qua nhiều server block (virtual host).\n\nproxy_set_header rất hay bị hỏi: phải forward Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto để backend thấy IP/scheme thật của client (nếu không, app tưởng mọi request đến từ 127.0.0.1).",
    "examples": ["server {\n    listen 80;\n    server_name example.com www.example.com;\n\n    location / {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        # cho WebSocket đi qua:\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"upgrade\";\n    }\n}\n\n# LUÔN test trước khi reload để tránh sập site\nsudo nginx -t && sudo systemctl reload nginx"]
   },
   {
    "question": "Domain & DNS khi deploy: bản ghi A, CNAME là gì? Vì sao phải trỏ DNS TRƯỚC khi xin SSL?",
    "answer": "- Bản ghi A: trỏ tên miền → địa chỉ IPv4 của VPS (AAAA cho IPv6). Đây là bản ghi cốt lõi để domain về đúng server.\n- CNAME: trỏ tên miền (thường là www hoặc subdomain) → một tên miền khác (bí danh). Ví dụ www.example.com CNAME → example.com.\n- TTL: thời gian cache bản ghi; TTL nhỏ khi sắp đổi IP để lan truyền nhanh.\n- Propagation: đổi DNS cần thời gian lan truyền (thường vài phút, tối đa tới 48h).\n\nVÌ SAO trỏ DNS trước khi xin SSL (gotcha kinh điển): Certbot xác minh bạn sở hữu domain bằng cách gửi HTTP request tới chính domain đó (challenge HTTP-01). Nếu bản ghi A chưa trỏ về VPS/chưa propagate thì xác minh THẤT BẠI → không cấp được chứng chỉ. Kiểm tra bằng dig/nslookup thấy đúng IP rồi mới chạy certbot.",
    "examples": ["# kiểm tra DNS đã trỏ đúng IP chưa\ndig +short example.com A\nnslookup example.com\n\n# Bản ghi ví dụ tại nhà cung cấp domain:\n# Type=A    Host=@     Value=203.0.113.10   TTL=300\n# Type=CNAME Host=www   Value=example.com   TTL=300"]
   },
   {
    "question": "HTTPS/SSL với Let's Encrypt & Certbot hoạt động ra sao? Chứng chỉ hết hạn thì sao?",
    "answer": "Let's Encrypt cấp chứng chỉ TLS MIỄN PHÍ, tự động qua Certbot. Điểm hay hỏi:\n- Certbot cài plugin nginx tự phát hiện server block, thêm cấu hình 443 và redirect 80→443, nạp lại Nginx.\n- Chứng chỉ hết hạn sau 90 NGÀY (cố tình ngắn để ép tự động hóa). Certbot cài systemd timer/cron tự gia hạn trước hạn — bạn không cần làm thủ công. Test bằng certbot renew --dry-run.\n- HTTP-01 challenge: đặt token tại http://domain/.well-known/... → cần domain đã trỏ đúng + cổng 80 mở. KHÔNG cấp wildcard.\n- DNS-01 challenge: đặt token vào bản ghi TXT DNS → dùng khi cần chứng chỉ WILDCARD (*.example.com); cần API token của nhà DNS để tự tạo bản ghi.\n- SSL termination: Nginx giải mã HTTPS, nói HTTP với app nội bộ; nên thêm HSTS, redirect 80→443.\n\nĐiểm ghi bàn: nhớ '90 ngày, auto-renew bằng timer', và 'wildcard phải dùng DNS-01'.",
    "examples": ["sudo apt install certbot python3-certbot-nginx\nsudo certbot --nginx -d example.com -d www.example.com\n\n# kiểm tra tiến trình auto-renew\nsudo certbot renew --dry-run\nsudo systemctl list-timers | grep certbot"]
   },
   {
    "question": "Jenkins — viết một Declarative Pipeline (Jenkinsfile) mẫu build → test → deploy?",
    "answer": "Jenkinsfile là 'pipeline as code' đặt ngay trong repo → có version control, audit được. Cấu trúc cố định: khối pipeline chứa agent (BẮT BUỘC — cấp executor & workspace), environment, options, stages (mỗi stage có steps), và post (chạy sau khi xong dù thành/bại — dùng để thông báo, dọn dẹp, xuất báo cáo).\n\nÝ hay hỏi:\n- agent thiếu là pipeline KHÔNG hợp lệ.\n- Dùng when { branch 'main' } để chỉ deploy ở nhánh chính.\n- KHÔNG hardcode secret trong Jenkinsfile — dùng credentials() / withCredentials, và cẩn thận base64 vì secret mã hóa sẽ không được che (mask).\n- input {} để chèn cổng phê duyệt thủ công trước khi lên production.\n- post { always/success/failure } để gửi thông báo (Slack/email).\n\nMẹo debug: bấm 'Replay' trong UI để sửa & chạy lại Jenkinsfile mà không cần commit.",
    "examples": ["pipeline {\n  agent any\n  options { timeout(time: 30, unit: 'MINUTES'); disableConcurrentBuilds() }\n  environment { IMAGE = 'myorg/web' }\n  stages {\n    stage('Build') { steps { sh 'npm ci && npm run build' } }\n    stage('Test')  {\n      steps { sh 'npm test' }\n      post { always { junit 'reports/**/*.xml' } }\n    }\n    stage('Docker Push') {\n      when { branch 'main' }\n      steps {\n        withCredentials([usernamePassword(credentialsId: 'dockerhub',\n            usernameVariable: 'U', passwordVariable: 'P')]) {\n          sh 'echo $P | docker login -u $U --password-stdin'\n          sh 'docker build -t $IMAGE:$BUILD_NUMBER . && docker push $IMAGE:$BUILD_NUMBER'\n        }\n      }\n    }\n    stage('Deploy Prod') {\n      when { branch 'main' }\n      steps {\n        input message: 'Deploy lên production?'   // cổng phê duyệt thủ công\n        sh './deploy.sh prod'\n      }\n    }\n  }\n  post { failure { echo 'Build hỏng — gửi cảnh báo Slack' } }\n}"]
   },
   {
    "question": "GitHub Actions — viết workflow CI/CD mẫu build và deploy lên VPS qua SSH?",
    "answer": "GitHub Actions: workflow YAML đặt ở .github/workflows/*.yml, kích hoạt theo sự kiện (push, pull_request, tag...). Khái niệm: workflow → job (chạy trên runner như ubuntu-latest) → step (dùng action có sẵn qua uses hoặc chạy lệnh qua run).\n\nMẫu 2 job: (1) build & test; (2) deploy qua SSH tới VPS bằng action appleboy/ssh-action. Trên server, script kéo code/image mới rồi restart container.\n\nĐiểm hay hỏi & bảo mật:\n- Bí mật (SSH key, host, token) lưu ở Settings → Secrets, gọi qua ${{ secrets.NAME }} — KHÔNG hardcode.\n- Nên tạo user deploy riêng + cặp SSH key riêng cho CI (không dùng key cá nhân), quyền tối thiểu.\n- needs: để job deploy chỉ chạy sau khi build/test xanh; if: github.ref == 'refs/heads/main' để chỉ deploy nhánh chính.\n- Dùng cache (actions/cache) tăng tốc; matrix để test nhiều phiên bản.",
    "examples": ["name: CI-CD\non:\n  push:\n    branches: [ main ]\njobs:\n  build-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: 'npm' }\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n\n  deploy:\n    needs: build-test            # chỉ deploy khi test xanh\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deploy qua SSH\n        uses: appleboy/ssh-action@v1\n        with:\n          host: ${{ secrets.VPS_HOST }}\n          username: ${{ secrets.VPS_USER }}\n          key: ${{ secrets.VPS_SSH_KEY }}\n          script: |\n            cd /var/www/app\n            git pull origin main\n            docker compose pull && docker compose up -d\n            docker image prune -f"]
   },
   {
    "question": "Tình huống: deploy xong, mở domain thì Nginx báo 502 Bad Gateway. Chẩn đoán thế nào?",
    "answer": "502 = Nginx nhận request nhưng KHÔNG kết nối được tới backend (upstream). Kiểm tra theo thứ tự:\n1. App có đang chạy không? App có thể đã crash: pm2 status / systemctl status app / docker ps. Xem log app tìm lỗi khởi động.\n2. Đúng cổng chưa? proxy_pass trỏ http://127.0.0.1:3000 nhưng app nghe cổng khác, hoặc app bind 0.0.0.0 vs 127.0.0.1 lệch nhau.\n3. Xem log Nginx: /var/log/nginx/error.log thường ghi rõ 'connect() failed (111: Connection refused)' → backend không nghe cổng đó.\n4. SELinux/firewall nội bộ chặn Nginx gọi cổng backend (trên RHEL: setsebool httpd_can_network_connect).\n5. Timeout: backend xử lý lâu → tăng proxy_read_timeout (khi đó thường là 504).\n\nĐiểm ghi bàn: phân biệt 502 (backend chết/sai cổng) với 504 (backend sống nhưng chậm quá timeout), và biết đọc /var/log/nginx/error.log.",
    "examples": ["pm2 status              # app còn sống?\nsudo tail -f /var/log/nginx/error.log\nsudo ss -ltnp | grep 3000   # có tiến trình nghe cổng backend không?\nsudo nginx -t && sudo systemctl reload nginx"]
   },
   {
    "question": "Tình huống: chạy certbot nhưng xin chứng chỉ SSL thất bại. Vì sao và xử lý ra sao?",
    "answer": "Certbot fail thường do challenge HTTP-01 không xác minh được quyền sở hữu domain. Nguyên nhân & cách sửa:\n1. DNS chưa trỏ / chưa propagate: dig +short domain phải ra ĐÚNG IP VPS. Chờ propagate rồi thử lại.\n2. Cổng 80 bị chặn: firewall/security group chưa mở 80, Let's Encrypt không tới được để xác minh. Mở 80 (ufw allow 80).\n3. server_name trong Nginx không khớp domain đang xin, hoặc có server block khác 'nuốt' request .well-known.\n4. Chạm rate limit của Let's Encrypt (thử lại quá nhiều lần) → dùng --dry-run khi thử nghiệm để không tốn quota.\n5. Cần wildcard (*.example.com): HTTP-01 không cấp wildcard → phải chuyển sang DNS-01 (đặt bản ghi TXT / API DNS).\n\nĐiểm ghi bàn: nhớ 'phải trỏ DNS + mở cổng 80 trước', và 'wildcard bắt buộc DNS-01', dùng --dry-run để tránh rate limit.",
    "examples": ["dig +short example.com          # đúng IP VPS chưa?\nsudo ufw allow 80               # Let's Encrypt cần cổng 80\nsudo certbot renew --dry-run    # thử không tốn quota\n# wildcard phải dùng DNS-01:\nsudo certbot certonly --manual --preferred-challenges dns -d '*.example.com'"]
   }
  ]
 },
 {
  "topic": "Docker",
  "items": [
   {
    "question": "Container khác Máy ảo (VM) ở điểm nào? (câu mở màn kinh điển)",
    "answer": "- VM: ảo hóa PHẦN CỨNG, mỗi VM chạy một guest OS đầy đủ (có kernel riêng) → nặng, khởi động chậm (phút), tốn RAM/đĩa.\n- Container: ảo hóa ở mức ỨNG DỤNG, DÙNG CHUNG kernel của host, chỉ cô lập tiến trình bằng namespaces (cô lập tầm nhìn: PID, network, mount...) và cgroups (giới hạn tài nguyên: CPU, RAM). → nhẹ, bật trong mili giây, đóng gói kèm mọi dependency nên 'chạy được ở đâu cũng chạy'.\n\nHệ quả: container KHÔNG phải VM tí hon; nó là một tiến trình được bọc namespaces + cgroups, chia sẻ kernel host. Vì dùng chung kernel nên image Linux không chạy trực tiếp trên kernel Windows (trên Windows Docker chạy qua một lớp Linux VM).\n\nĐiểm ghi bàn: nói được 'namespaces (cô lập) + cgroups (giới hạn) + chung kernel'.",
    "examples": []
   },
   {
    "question": "Image và Container khác nhau thế nào? Layer & layer caching là gì?",
    "answer": "- Image: bản thiết kế TĨNH, chỉ đọc, gồm nhiều LAYER xếp chồng (immutable). Nhiều image có thể DÙNG CHUNG layer nền → tiết kiệm.\n- Container: một INSTANCE đang chạy của image, có thêm một 'writable layer' mỏng ở trên cùng. Nhiều container chạy từ cùng 1 image, mỗi cái có writable layer riêng. Xóa container là mất writable layer đó (dữ liệu bay).\n\nLayer caching (rất hay hỏi follow-up):\n- Mỗi instruction trong Dockerfile tạo 1 layer. Nếu instruction + context không đổi so với build trước, Docker DÙNG LẠI layer cache → build nhanh.\n- Cache vô hiệu hóa theo kiểu TOP-DOWN: một layer thay đổi thì MỌI layer sau nó phải build lại, dù lệnh y hệt.\n- Hệ quả tối ưu: sắp Dockerfile từ 'ít đổi → hay đổi'. COPY file manifest (package.json) và cài dependency TRƯỚC, rồi mới COPY mã nguồn (đổi mỗi commit) → tận dụng cache, khỏi cài lại thư viện mỗi lần.",
    "examples": ["# TỐT: tận dụng cache — chỉ cài lại khi package.json đổi\nCOPY package*.json ./\nRUN npm ci\nCOPY . .            # mã nguồn đổi thường xuyên đặt sau\n\n# XẤU: COPY hết trước → sửa 1 dòng code cũng cài lại toàn bộ thư viện\nCOPY . .\nRUN npm ci"]
   },
   {
    "question": "Phân biệt các instruction hay nhầm trong Dockerfile: CMD vs ENTRYPOINT, COPY vs ADD, và .dockerignore?",
    "answer": "- CMD vs ENTRYPOINT: ENTRYPOINT định nghĩa 'executable' cố định của container; CMD cung cấp tham số MẶC ĐỊNH và có thể bị GHI ĐÈ khi 'docker run <image> <lệnh khác>'. Nếu có nhiều CMD chỉ CÁI CUỐI có tác dụng. Mẫu phổ biến: ENTRYPOINT [\"python\",\"app.py\"] + CMD [\"--port\",\"8000\"] (đổi tham số lúc run mà vẫn giữ lệnh chính).\n- COPY vs ADD: COPY chỉ chép file/thư mục local vào image (nên ưu tiên vì minh bạch). ADD làm thêm được: tải URL từ xa và tự giải nén tar local — dùng khi thực sự cần, tránh 'phép màu' ngoài ý muốn.\n- .dockerignore: như .gitignore — loại file/thư mục khỏi build context gửi lên Docker daemon (node_modules, .git, log...). Giúp build nhanh hơn, image nhỏ hơn, và tránh lộ file nhạy cảm.\n- RUN vs CMD: RUN chạy lúc BUILD (tạo layer, vd cài gói); CMD/ENTRYPOINT chạy lúc START container.",
    "examples": ["ENTRYPOINT [\"python\", \"app.py\"]\nCMD [\"--port\", \"8000\"]   # tham số mặc định, có thể ghi đè\n# docker run img --port 9000  -> chạy python app.py --port 9000"]
   },
   {
    "question": "Multi-stage build là gì và vì sao giảm được kích thước image cực nhiều?",
    "answer": "Multi-stage: dùng NHIỀU lệnh FROM trong một Dockerfile. Stage 'builder' chứa toàn bộ toolchain để biên dịch/build; stage runtime chỉ COPY --from=builder ra ARTIFACT cuối (binary/dist) vào một base image nhỏ (alpine/distroless).\n\nVì sao lợi:\n- Image production KHÔNG mang theo compiler, SDK, dev dependencies (thứ chỉ cần lúc build). Ví dụ điển hình: app Go từ 1.27GB (kèm cả toolchain) xuống ~15MB (Alpine + binary tĩnh).\n- Nhỏ hơn → pull nhanh hơn, bề mặt tấn công nhỏ hơn, quét bảo mật ít hơn, tốn ít RAM/đĩa.\n\nCác cách giảm size khác hay được hỏi: dùng base nhỏ (alpine/slim/distroless), .dockerignore, gộp lệnh RUN và dọn cache trong CÙNG một layer (apt-get clean, rm -rf /var/lib/apt/lists/*), pin version, KHÔNG cài gói thừa.\n\nĐiểm ghi bàn: 'tách môi trường build khỏi runtime — chỉ ship artifact'.",
    "examples": ["# Stage 1: build\nFROM node:20 AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: runtime nhỏ gọn — chỉ lấy kết quả\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\n# image cuối không có Node/toolchain"]
   },
   {
    "question": "Dữ liệu container mất sau khi restart/xóa — Volume và Bind Mount khác nhau ra sao, khi nào dùng cái nào?",
    "answer": "Writable layer của container là EPHEMERAL: xóa container là mất. Muốn giữ dữ liệu phải mount ra ngoài:\n- Named Volume: do DOCKER quản lý (nằm trong /var/lib/docker/volumes). Portable, không phụ thuộc đường dẫn host, không làm phình container → ƯU TIÊN cho dữ liệu bền vững ở production (database, uploads).\n- Bind Mount: map một ĐƯỜNG DẪN TUYỆT ĐỐI trên host vào container. Tiện cho dev (mount mã nguồn để hot-reload, mount file config) nhưng 'giòn' và phụ thuộc host → không hợp production.\n- tmpfs: chỉ nằm trên RAM, mất khi container dừng — cho dữ liệu tạm/nhạy cảm.\n\nBẫy thực chiến kinh điển: commit một bind mount trỏ '/Users/steve/project' (máy Mac của dev) vào docker-compose production → server Linux không có đường dẫn đó → container chết lúc khởi động. Bài học: production dùng NAMED VOLUME cho dữ liệu, dùng COPY cho file tĩnh trong Dockerfile.\n\nLưu ý quyền: container chạy non-root cần UID/GID host khớp, nếu không sẽ 'permission denied' trên mount.",
    "examples": ["# named volume (production - Docker quản lý)\ndocker volume create pgdata\ndocker run -v pgdata:/var/lib/postgresql/data postgres\n\n# bind mount (dev - map thư mục host để hot reload)\ndocker run -v $(pwd):/app node:20\n\n# trong docker-compose.yml\nservices:\n  db:\n    image: postgres\n    volumes: [ \"pgdata:/var/lib/postgresql/data\" ]\nvolumes:\n  pgdata:"]
   },
   {
    "question": "Docker Compose là gì? Khi nào dùng Compose, khi nào cần Kubernetes?",
    "answer": "Docker Compose: định nghĩa và chạy ứng dụng NHIỀU container bằng một file YAML (docker-compose.yml) — khai báo services, networks, volumes, thứ tự phụ thuộc. Một lệnh 'docker compose up' dựng cả stack; Compose tự tạo một mạng chung để các service gọi nhau bằng TÊN service (DNS nội bộ).\n\n- Dùng Compose: môi trường dev, ứng dụng nhỏ/vừa, chạy trên MỘT host, prototyping, CI/CD đơn giản. Best practice: version control file compose, dùng biến môi trường/.env cho từng môi trường, thêm healthcheck.\n- Cần Kubernetes: production quy mô lớn, NHIỀU node, cần tự scale, tự hồi phục (self-healing), rolling update/rollback, high availability, service discovery/load balancing phức tạp. K8s điều phối container qua cụm máy; Compose chỉ trên một máy.\n\nĐiểm ghi bàn: 'Compose = một host, đơn giản, dev; K8s = nhiều node, orchestration, production'. Trong K8s, volume Docker tương ứng khái niệm PersistentVolume/PVC.",
    "examples": ["# docker-compose.yml — web + db + mạng chung\nservices:\n  web:\n    build: .\n    ports: [ \"80:3000\" ]\n    depends_on: [ db ]\n    environment:\n      DATABASE_URL: postgres://db:5432/app   # gọi 'db' theo tên service\n  db:\n    image: postgres:16\n    healthcheck:\n      test: [\"CMD\", \"pg_isready\", \"-U\", \"postgres\"]\n      interval: 10s\n    volumes: [ \"pgdata:/var/lib/postgresql/data\" ]\nvolumes:\n  pgdata:"]
   },
   {
    "question": "Best practice khi viết Dockerfile / chạy container ở production?",
    "answer": "Nhóm câu senior hay hỏi:\n1. Chạy bằng non-root user (USER app) — giảm rủi ro nếu bị chiếm container.\n2. Base image nhỏ (alpine/slim/distroless) + multi-stage build để image nhỏ, ít lỗ hổng.\n3. .dockerignore để không gửi rác/secret vào build context.\n4. PIN version image (node:20.11-alpine, không dùng :latest) → build tái lập được (reproducible).\n5. MỘT tiến trình chính mỗi container (one concern per container); nhiều dịch vụ thì tách container + Compose/K8s.\n6. KHÔNG bake secret vào image (image bị pull ra là lộ). Truyền lúc runtime qua env/secret manager/Docker secrets.\n7. Thêm HEALTHCHECK để orchestrator biết container 'sống' thật sự.\n8. Gộp RUN và dọn cache trong cùng layer; tận dụng thứ tự layer để cache dependency.\n9. Drop Linux capabilities không cần, đặt filesystem read-only nếu được.\n\nĐiểm ghi bàn: nêu được non-root + không nhúng secret + pin version + multi-stage.",
    "examples": ["FROM node:20.11-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nRUN addgroup -S app && adduser -S app -G app\nUSER app                       # chạy non-root\nHEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1\nCMD [\"node\", \"server.js\"]"]
   },
   {
    "question": "Tình huống: container vừa chạy đã thoát ngay (exit) hoặc lỗi. Bạn debug thế nào?",
    "answer": "Bộ ba lệnh debug hay được hỏi: docker logs, docker exec, docker inspect.\n1. docker ps -a — xem container ở trạng thái gì và EXIT CODE (137 = bị kill do hết RAM/OOM hoặc SIGKILL; 1 = lỗi app; 0 = chạy xong bình thường rồi thoát).\n2. docker logs <id> — đọc stdout/stderr tìm lỗi khởi động.\n3. Nguyên nhân 'chạy xong thoát ngay' thường gặp: tiến trình chính KHÔNG chạy ở foreground (container sống theo tiến trình PID 1; nó kết thúc là container tắt). Đừng chạy service ở nền rồi để CMD trả về.\n4. Sai CMD/ENTRYPOINT, thiếu env/biến cấu hình, không kết nối được DB lúc khởi động.\n5. docker exec -it <id> sh — vào trong container (nếu còn sống) kiểm tra; docker inspect xem cấu hình/mount/network; docker run --entrypoint sh -it <image> để mổ xẻ image không khởi động được.\n\nExit 137 + image quá to → hay gặp khi build/run vượt giới hạn RAM (nhắc multi-stage để giảm size).",
    "examples": ["docker ps -a                 # trạng thái + exit code\ndocker logs -f <container>   # log khởi động\ndocker exec -it <container> sh\ndocker inspect <container>   # mount, network, env, config\ndocker run --entrypoint sh -it <image>   # mổ image không chạy được"]
   }
  ]
 },
 {
  "topic": "Kubernetes",
  "items": [
   {
    "question": "Kubernetes là gì và giải quyết vấn đề gì mà Docker/Compose không kham nổi?",
    "answer": "Kubernetes (K8s) là hệ ĐIỀU PHỐI container (container orchestration) chạy trên CỤM NHIỀU node. Docker/Compose chạy container trên một máy; khi cần vận hành hàng trăm container qua nhiều máy ở production thì cần K8s để tự động hóa:\n- Self-healing: container/pod chết thì tự tạo lại, node chết thì dời workload sang node khác.\n- Auto-scaling: tự thêm/bớt pod theo tải (HPA), thêm/bớt node (Cluster Autoscaler).\n- Rolling update & rollback không downtime.\n- Service discovery & load balancing nội bộ.\n- Declarative: bạn khai báo TRẠNG THÁI MONG MUỐN (YAML), K8s liên tục 'reconcile' đưa trạng thái thực về trạng thái mong muốn.\n\nĐiểm ghi bàn: nhấn 'declarative + reconciliation loop' và 'self-healing/scaling/rolling update trên nhiều node' — đó là lý do dùng K8s thay vì chỉ Docker.",
    "examples": []
   },
   {
    "question": "Kiến trúc Kubernetes: Control Plane và Worker Node gồm những thành phần nào?",
    "answer": "Mô hình client–server: Control Plane (bộ não) + các Worker Node (chạy workload).\n\nCONTROL PLANE:\n- kube-apiserver: cửa ngõ của cluster, nhận mọi request (kubectl, thành phần nội bộ) — REST API.\n- etcd: kho key-value phân tán, LƯU toàn bộ trạng thái cluster → 'single source of truth'. Mất etcd không backup = mất trạng thái cluster (backup bằng snapshot).\n- kube-scheduler: chọn node phù hợp cho pod mới (theo resource, affinity, taint/toleration).\n- controller-manager: chạy các controller theo dõi trạng thái và kéo thực tế về mong muốn (vd node/replicaset controller).\n- cloud-controller-manager: nối cluster với API của cloud (chỉ có trên cloud).\n\nWORKER NODE:\n- kubelet: agent trên mỗi node, đảm bảo container trong pod chạy, báo cáo tình trạng node về control plane.\n- kube-proxy: duy trì luật mạng để traffic tới đúng pod (Service).\n- container runtime: containerd/CRI-O chạy container thực sự.\n\nĐiểm ghi bàn: nói được 'etcd là source of truth', 'apiserver là cửa ngõ', 'kubelet chạy trên node'.",
    "examples": []
   },
   {
    "question": "Pod, ReplicaSet, Deployment quan hệ thế nào? Vì sao luôn tạo Deployment chứ không tạo Pod trực tiếp?",
    "answer": "- Pod: đơn vị triển khai NHỎ NHẤT — bọc 1 (hoặc vài) container dùng chung network/volume. Pod là EPHEMERAL: chết là mất, tạo lại thì đổi IP.\n- ReplicaSet: đảm bảo luôn có ĐÚNG số lượng pod chạy (vd 3 bản). Pod chết → tạo lại cho đủ.\n- Deployment: quản lý ReplicaSet, THÊM khả năng rolling update, rollback, version control.\n\nQuan hệ: Deployment → tạo ReplicaSet → tạo Pod.\n\nVì sao luôn dùng Deployment: tạo Pod 'trần' thì chết là mất luôn (không tự tạo lại); ReplicaSet giữ số lượng nhưng không có update/rollback. Deployment cho bạn khai báo image/replicas rồi lo hết phần còn lại — đây là cách chuẩn ở production. Các workload khác: StatefulSet (app có trạng thái/định danh ổn định như DB), DaemonSet (mỗi node một pod, vd agent log), Job/CronJob (chạy một lần/định kỳ).",
    "examples": ["apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: web }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: web } }\n  template:\n    metadata: { labels: { app: web } }\n    spec:\n      containers:\n        - name: web\n          image: myorg/web:1.2.0\n          ports: [ { containerPort: 3000 } ]"]
   },
   {
    "question": "Service là gì? Phân biệt ClusterIP, NodePort, LoadBalancer và vai trò của Ingress?",
    "answer": "Pod có IP thay đổi mỗi lần tạo lại → cần Service làm 'điểm truy cập ỔN ĐỊNH'. Service dùng label selector để gom nhóm pod và cân bằng tải giữa chúng.\n- ClusterIP (mặc định): IP nội bộ, CHỈ truy cập được BÊN TRONG cluster. Dùng cho giao tiếp service↔service.\n- NodePort: mở một cổng tĩnh trên MỌI node (30000–32767) → truy cập từ ngoài qua <IP-node>:<port>. Đơn giản nhưng khó quản lý ở quy mô lớn.\n- LoadBalancer: nhờ cloud cấp một load balancer (AWS ALB/NLB...) với IP public → cách chuẩn để lộ dịch vụ ra ngoài trên cloud. Nhược: mỗi service một LB → tốn tiền.\n\nIngress: đối tượng quản lý truy cập HTTP/HTTPS từ ngoài vào, ĐỊNH TUYẾN theo host/path tới nhiều Service. Best practice production: nội bộ dùng ClusterIP, ra ngoài dùng MỘT Ingress (kèm 1 LoadBalancer) thay vì tạo LoadBalancer cho từng service → tiết kiệm chi phí, gom TLS/định tuyến một chỗ.\n\nĐiểm ghi bàn: 'Ingress ưu tiên hơn NodePort ở production' và 'một LB + Ingress thay vì nhiều LB'.",
    "examples": ["apiVersion: v1\nkind: Service\nmetadata: { name: web-svc }\nspec:\n  type: ClusterIP        # nội bộ; ra ngoài để Ingress lo\n  selector: { app: web }\n  ports: [ { port: 80, targetPort: 3000 } ]"]
   },
   {
    "question": "ConfigMap và Secret khác nhau ra sao? Secret có thực sự an toàn không?",
    "answer": "Cả hai TÁCH cấu hình ra khỏi mã nguồn (đưa vào pod qua env var hoặc mount file):\n- ConfigMap: lưu cấu hình KHÔNG nhạy cảm dạng plain text (biến môi trường, file cấu hình, URL...).\n- Secret: lưu dữ liệu NHẠY CẢM (mật khẩu, token, API key).\n\nBẫy hay hỏi: Secret mặc định chỉ được ENCODE base64, KHÔNG phải mã hóa → ai đọc được object là giải ra ngay. Muốn an toàn thật phải: bật encryption-at-rest cho etcd, dùng RBAC hạn chế quyền đọc secret, và/hoặc dùng secret manager ngoài (Vault, AWS Secrets Manager, Sealed Secrets). Đừng commit Secret YAML thô lên Git.\n\nĐiểm ghi bàn: 'Secret chỉ base64 chứ không mã hóa' là ý người phỏng vấn muốn nghe.",
    "examples": ["# đưa ConfigMap/Secret vào pod\nenv:\n  - name: LOG_LEVEL\n    valueFrom: { configMapKeyRef: { name: app-config, key: log_level } }\n  - name: DB_PASSWORD\n    valueFrom: { secretKeyRef: { name: db-secret, key: password } }"]
   },
   {
    "question": "Liveness, Readiness và Startup probe khác nhau thế nào? Vì sao KHÔNG kiểm tra database trong liveness?",
    "answer": "Ba loại health check, KHÔNG phụ thuộc lẫn nhau:\n- Liveness: app còn 'sống' không? Fail → kubelet RESTART container. Dùng để thoát khỏi deadlock/kẹt không hồi phục. Phải NHẸ, chỉ cần 200 OK.\n- Readiness: app SẴN SÀNG nhận traffic chưa? Fail → K8s GỠ pod khỏi Service endpoints (ngừng gửi request) nhưng KHÔNG restart. Đây mới là nơi kiểm tra phụ thuộc (DB, cache...).\n- Startup: bảo vệ app khởi động CHẬM (Java/legacy 60–120s) khỏi bị liveness giết oan. Các probe khác bị vô hiệu cho tới khi startup thành công, rồi liveness mới tiếp quản.\n\nVÌ SAO không check DB trong liveness (bẫy kinh điển): nếu liveness phụ thuộc DB và DB sập, MỌI pod sẽ fail liveness → restart liên tục (restart loop) dù bản thân app vẫn ổn → biến sự cố DB thành sập toàn hệ thống (cascading failure). Kiểm tra phụ thuộc là việc của READINESS: DB sập thì pod chỉ ngừng nhận traffic, không bị giết, DB hồi thì tự phục vụ lại.\n\nĐiểm ghi bàn: 'liveness = process health (nhẹ); readiness = sẵn sàng phục vụ + kiểm tra phụ thuộc; startup = cho app chậm'.",
    "examples": ["livenessProbe:\n  httpGet: { path: /healthz, port: 3000 }   # nhẹ, KHÔNG gọi DB\n  initialDelaySeconds: 10\n  periodSeconds: 10\nreadinessProbe:\n  httpGet: { path: /ready, port: 3000 }      # nơi kiểm tra DB/cache\n  periodSeconds: 5\nstartupProbe:\n  httpGet: { path: /healthz, port: 3000 }\n  failureThreshold: 30\n  periodSeconds: 5           # cho tới 150s để khởi động"]
   },
   {
    "question": "Rolling update, rollback và các chiến lược triển khai (canary, blue-green) hoạt động ra sao?",
    "answer": "Khi đổi image trong Deployment, K8s tạo ReplicaSet MỚI và tăng dần nó lên trong khi giảm dần ReplicaSet cũ → rolling update KHÔNG downtime. ReplicaSet cũ được GIỮ (scale về 0) để rollback nhanh khi cần.\n- Không downtime: strategy RollingUpdate với maxUnavailable: 0, maxSurge: 1 (luôn giữ đủ bản đang chạy) + readiness probe (K8s không gửi traffic vào pod mới cho tới khi ready).\n- Rollback: kubectl rollout undo deployment/web (quay về revision trước). kubectl rollout status để theo dõi, kubectl rollout history xem lịch sử.\n- Canary: cho một PHẦN NHỎ traffic sang phiên bản mới để thử trước khi mở rộng.\n- Blue-Green: dựng song song môi trường mới (green) rồi CHUYỂN toàn bộ traffic từ blue sang green (đổi selector/Service), lỗi thì chuyển ngược ngay.\n\nĐiểm ghi bàn: nêu 'ReplicaSet cũ giữ lại để rollback', 'maxUnavailable/maxSurge + readiness probe cho zero-downtime'.",
    "examples": ["kubectl set image deployment/web web=myorg/web:1.3.0   # rolling update\nkubectl rollout status deployment/web\nkubectl rollout undo deployment/web                   # rollback\nkubectl rollout history deployment/web"]
   },
   {
    "question": "Tình huống: Pod ở trạng thái CrashLoopBackOff. Bạn chẩn đoán theo thứ tự nào?",
    "answer": "CrashLoopBackOff = container khởi động → chết → K8s restart với thời gian chờ TĂNG DẦN (back-off), lặp lại. Chẩn đoán:\n1. kubectl describe pod <pod> — đọc mục Events và Last State/Reason (OOMKilled? Error? exit code?), xem probe có fail không.\n2. kubectl logs <pod> và kubectl logs <pod> --previous (log của lần chạy TRƯỚC khi crash) — thường lộ lỗi app: thiếu env/config, không kết nối được DB, sai lệnh CMD.\n3. Kiểm tra PROBE: liveness cấu hình sai (giết pod khỏe trước khi kịp khởi động) là nguyên nhân rất hay gặp → thêm startup probe hoặc nới initialDelaySeconds.\n4. OOMKilled (exit 137): pod vượt memory limit → tăng resources.limits hoặc sửa rò rỉ bộ nhớ.\n5. Sai image/tag, thiếu Secret/ConfigMap tham chiếu, thiếu quyền mount volume.\n\nĐiểm ghi bàn: gọi tên bộ đôi 'describe (Events) + logs --previous', và biết bẫy 'liveness probe sai gây crash loop giả'.",
    "examples": ["kubectl describe pod <pod>        # Events, Last State, Reason\nkubectl logs <pod> --previous     # log lần chạy trước khi crash\nkubectl get pod <pod> -o wide\nkubectl get events --sort-by=.lastTimestamp"]
   },
   {
    "question": "Tình huống: Service không định tuyến được tới Pod (gọi mãi không tới). Kiểm tra gì?",
    "answer": "Service dùng label selector để tìm pod đích và tạo danh sách ENDPOINTS. Không tới pod thường do:\n1. Selector KHÔNG khớp label của pod → Service không có endpoint nào. Kiểm tra: kubectl get endpoints <svc> — nếu rỗng là dấu hiệu rõ nhất. Đối chiếu spec.selector với labels của pod.\n2. Pod chưa Running/chưa Ready: readiness probe fail thì pod bị GỠ khỏi endpoints → Service không gửi traffic tới. kubectl get pods xem trạng thái/READY.\n3. Sai cổng: targetPort của Service không khớp containerPort mà app thực sự nghe.\n4. NetworkPolicy chặn traffic giữa namespace/pod.\n5. Nhầm namespace / sai DNS nội bộ (dùng <svc>.<namespace>.svc.cluster.local).\n\nĐiểm ghi bàn: phản xạ đầu tiên là 'kubectl get endpoints' — endpoints rỗng ⇒ selector sai hoặc pod chưa ready.",
    "examples": ["kubectl get endpoints <svc>       # rỗng = selector sai / pod chưa ready\nkubectl get pods --show-labels    # đối chiếu label với selector\nkubectl describe svc <svc>         # selector, ports\nkubectl exec -it <pod> -- wget -qO- http://<svc>:80"]
   }
  ]
 },
 {
  "topic": "Java nâng cao",
  "items": [
   {
    "question": "HashMap hoạt động bên trong thế nào? Vì sao Java 8 thêm cây đỏ-đen?",
    "answer": "HashMap dùng một MẢNG các bucket (Node[]). Khi put(key,value):\n1. Tính hash của key (băm lại hashCode để phân bố đều), lấy chỉ số bucket = hash & (n-1).\n2. Nếu bucket trống → đặt node vào. Nếu ĐỤNG ĐỘ (collision, khác key nhưng cùng bucket) → nối vào danh sách liên kết tại bucket đó.\n3. Khi tìm/so sánh: dùng equals() để phân biệt các key cùng bucket.\n\nCải tiến Java 8: nếu MỘT bucket có ≥ 8 node (và bảng đủ lớn ≥64), danh sách liên kết được CHUYỂN thành cây đỏ-đen → tra cứu worst-case từ O(n) xuống O(log n) (chống tấn công hash collision). Xuống < 6 node thì thoái hóa lại thành list.\n\nĐiều kiện key hợp lệ: phải override đúng hashCode() + equals(), và nên IMMUTABLE (nếu key đổi sau khi put, hash đổi → không tìm lại được). Load factor mặc định 0.75: vượt ngưỡng thì resize (nhân đôi + rehash).\n\nBẫy: HashMap KHÔNG thread-safe — ghi đồng thời lúc resize (Java 7) có thể tạo vòng lặp vô hạn/hỏng cấu trúc. Đa luồng phải dùng ConcurrentHashMap.",
    "examples": ["// key nên immutable + override hashCode/equals\nMap<String,Integer> m = new HashMap<>();\nm.put(\"a\", 1);         // hash(\"a\") -> bucket\n// LinkedHashMap giữ thứ tự chèn; TreeMap sắp theo khóa (O(log n))"]
   },
   {
    "question": "ConcurrentHashMap khác HashMap và Hashtable ra sao?",
    "answer": "Cả ba đều là map, khác nhau ở an toàn luồng và hiệu năng:\n- HashMap: KHÔNG thread-safe, nhanh, cho 1 key null. Dùng đơn luồng.\n- Hashtable (cũ): thread-safe nhưng khóa TOÀN BỘ map cho mọi thao tác (kể cả get) → chậm, không cho null. Hầu như không dùng nữa.\n- ConcurrentHashMap: thread-safe với hiệu năng cao.\n  + Java 7: lock striping — chia 16 segment, mỗi segment khóa độc lập → nhiều thread ghi khác segment song song được.\n  + Java 8+: bỏ segment, khóa ở mức từng bucket (CAS + synchronized trên node đầu bucket); READ hoàn toàn KHÔNG khóa (đọc node với ngữ nghĩa volatile). get() trung bình O(1).\n  + KHÔNG cho key/value null (để tránh nhập nhằng 'không có' vs 'giá trị null' trong ngữ cảnh đa luồng).\n\nSo với Collections.synchronizedMap(): cái đó khóa cả map; ConcurrentHashMap khóa mịn hơn nên concurrency tốt hơn nhiều.\n\nĐiểm ghi bàn: 'read lock-free, write khóa theo bucket, không cho null'.",
    "examples": ["Map<String,Integer> m = new ConcurrentHashMap<>();\n// tăng đếm an toàn đa luồng, không cần synchronized ngoài:\nm.merge(\"key\", 1, Integer::sum);\nm.computeIfAbsent(\"k\", k -> expensive());"]
   },
   {
    "question": "volatile khác synchronized thế nào? Khi nào dùng cái nào?",
    "answer": "Đây là câu Java Memory Model kinh điển:\n- volatile: đảm bảo VISIBILITY — thread đọc luôn thấy giá trị mới nhất (không cache cục bộ), và chặn sắp xếp lại lệnh (happens-before). NHƯNG không đảm bảo ATOMICITY cho thao tác kép (count++ gồm đọc-tăng-ghi vẫn race).\n- synchronized: đảm bảo CẢ visibility LẪN atomicity (loại trừ lẫn nhau — chỉ 1 thread vào khối). Đổi lại có chi phí khóa, có thể gây blocking/contention.\n\nKhi nào dùng:\n- Chỉ cần thấy giá trị mới nhất (cờ boolean stop, tham chiếu config) → volatile là đủ và rẻ.\n- Cần cập nhật dựa trên giá trị hiện tại (đếm, chuyển tiền) → dùng synchronized HOẶC lớp atomic (AtomicInteger, LongAdder) với CAS — thường ưu tiên atomic vì lock-free, nhanh hơn.\n\nĐiểm ghi bàn: 'volatile = visibility, không atomic; synchronized/atomic = atomic'. Ví dụ kinh điển sai: dùng volatile cho biến đếm ++.",
    "examples": ["private volatile boolean running = true;  // OK: cờ dừng\n// SAI nếu chỉ volatile:\nprivate volatile int count;  // count++ vẫn race!\n// ĐÚNG:\nprivate final AtomicInteger count = new AtomicInteger();\ncount.incrementAndGet();     // CAS, atomic, lock-free"]
   },
   {
    "question": "ThreadLocal là gì? Vì sao nguy hiểm trong thread pool?",
    "answer": "ThreadLocal cho MỖI thread một bản sao biến RIÊNG (lưu trong map nội bộ của thread) → không cần chia sẻ/đồng bộ. Hay dùng cho: user context bảo mật, DateFormat (vốn không thread-safe), transaction/EntityManager theo request.\n\nBẫy chí mạng trong thread pool (rất hay hỏi ở mức senior/bảo mật): thread trong pool được TÁI SỬ DỤNG. Xong một request, thread trả về pool nhưng GIÁ TRỊ ThreadLocal VẪN CÒN. Request tiếp theo chạy trên đúng thread đó sẽ THỪA HƯỞNG context của người trước → User A thấy dữ liệu User B (lỗ hổng bảo mật thật sự), hoặc rò rỉ bộ nhớ (memory leak) vì object không được giải phóng.\n\nCách xử lý: LUÔN remove() trong khối finally sau khi xử lý xong. Spring làm đúng chuẩn này qua RequestContextHolder (đáng học theo). Với virtual thread (Java 21) nên hạn chế ThreadLocal, dùng ScopedValue.",
    "examples": ["private static final ThreadLocal<User> CTX = new ThreadLocal<>();\ntry {\n    CTX.set(currentUser);\n    process();\n} finally {\n    CTX.remove();   // BẮT BUỘC trong pool, tránh rò rỉ/nhiễm chéo\n}"]
   },
   {
    "question": "ExecutorService / ThreadPool là gì? Vì sao không nên tự new Thread mỗi việc?",
    "answer": "Tạo new Thread cho mỗi tác vụ rất tốn (mỗi thread ~1MB stack, tốn thời gian tạo/hủy) và không kiểm soát được số lượng → dễ OOM khi tải cao. ExecutorService quản lý một POOL thread tái sử dụng:\n- submit(task) trả về Future để lấy kết quả/huỷ; execute(task) chỉ chạy.\n- Loại pool (Executors / ThreadPoolExecutor): fixed (số cố định), cached (co giãn), single, scheduled (định kỳ). Production nên tự cấu hình ThreadPoolExecutor (corePoolSize, maxPoolSize, queue, rejection policy) thay vì Executors.newFixedThreadPool để kiểm soát hàng đợi (tránh queue vô hạn gây OOM).\n- Nhớ shutdown()/awaitTermination() để đóng gọn.\n\nRunnable vs Callable: Callable<V> trả về giá trị và ném được checked exception; Runnable thì không. Java 21 có virtual threads (Project Loom) cho phép hàng triệu 'thread' nhẹ cho tác vụ I/O-bound.\n\nĐiểm ghi bàn: 'tái sử dụng thread, giới hạn tài nguyên, có hàng đợi + rejection policy'.",
    "examples": ["ExecutorService pool = Executors.newFixedThreadPool(8);\nFuture<Integer> f = pool.submit(() -> compute());  // Callable\nInteger r = f.get();          // chờ kết quả\npool.shutdown();\n\n// production: tự cấu hình để chặn queue vô hạn\nnew ThreadPoolExecutor(4, 16, 60, SECONDS,\n    new ArrayBlockingQueue<>(1000),\n    new ThreadPoolExecutor.CallerRunsPolicy());"]
   },
   {
    "question": "CompletableFuture dùng để làm gì? Các method hay dùng và bẫy thường gặp?",
    "answer": "CompletableFuture cho lập trình BẤT ĐỒNG BỘ có thể GHÉP NỐI (compose) mà không block. Thay vì future.get() chặn luồng, ta khai báo chuỗi xử lý khi có kết quả.\n- Khởi tạo: supplyAsync(() -> ...) (có trả về), runAsync (không trả về) — chạy trên ForkJoinPool.commonPool() hoặc executor tự cấp.\n- Biến đổi: thenApply (map đồng bộ), thenCompose (nối future khác — như flatMap, tránh lồng future), thenCombine (gộp 2 future song song), thenAccept (tiêu thụ).\n- Lỗi: exceptionally (fallback khi lỗi), handle (nhận cả kết quả lẫn lỗi).\n- Gom nhiều: allOf / anyOf.\n\nBẫy hay gặp: NUỐT exception âm thầm — nếu không gắn exceptionally/handle, lỗi bị 'chôn' trong future, bug âm ỉ. Và nên truyền executor riêng cho tác vụ blocking, đừng lạm dụng commonPool.\n\nĐiểm ghi bàn: phân biệt thenApply vs thenCompose, và luôn xử lý lỗi bằng handle/exceptionally.",
    "examples": ["CompletableFuture.supplyAsync(() -> getUser(id), pool)\n    .thenCompose(u -> loadOrdersAsync(u))   // nối future khác\n    .thenApply(list -> list.size())\n    .exceptionally(ex -> { log.error(\"lỗi\", ex); return 0; });"]
   },
   {
    "question": "Deadlock trong Java xảy ra thế nào? Cách phòng tránh?",
    "answer": "Deadlock: hai (hay nhiều) thread chờ nhau khóa mãi mãi. Ví dụ: thread A giữ lock1 chờ lock2; thread B giữ lock2 chờ lock1 → cả hai đứng hình. Xảy ra khi đủ 4 điều kiện Coffman (mutual exclusion, hold & wait, no preemption, circular wait).\n\nCách phòng tránh (phá 1 điều kiện):\n- THỨ TỰ khóa nhất quán: mọi thread luôn lấy lock theo cùng một thứ tự (phá circular wait) — cách phổ biến nhất.\n- Dùng tryLock(timeout) của ReentrantLock: không lấy được thì nhả ra thử lại, tránh chờ vô hạn.\n- Giảm phạm vi giữ lock, hạn chế lồng nhiều lock; ưu tiên cấu trúc dữ liệu concurrent thay vì tự khóa.\n\nPhát hiện: jstack/thread dump sẽ chỉ ra 'Found one Java-level deadlock'. Liên quan: livelock (bận rộn mà không tiến triển), starvation (thread ưu tiên thấp không tới lượt).",
    "examples": ["// PHÁ circular wait: luôn khóa theo cùng thứ tự\nvoid transfer(Account a, Account b, long amt) {\n    Account first = a.id < b.id ? a : b;\n    Account second = a.id < b.id ? b : a;\n    synchronized (first) {\n        synchronized (second) { /* chuyển tiền */ }\n    }\n}"]
   },
   {
    "question": "Tính bất biến (immutability) trong Java: vì sao quan trọng và cách tạo lớp immutable?",
    "answer": "Object immutable là object KHÔNG đổi trạng thái sau khi tạo (String, Integer, LocalDate...). Lợi ích:\n- An toàn đa luồng TỰ NHIÊN (không có ai sửa nên không cần đồng bộ).\n- Làm key HashMap/HashSet an toàn (hash không đổi).\n- Dễ suy luận, cache được, tránh side-effect.\n\nCách tạo lớp immutable:\n1. class là final (không cho kế thừa để phá vỡ).\n2. mọi field private final.\n3. không có setter.\n4. gán field trong constructor; với field kiểu tham chiếu (List, mảng, Date) phải COPY PHÒNG THỦ (defensive copy) khi nhận vào và khi trả ra — nếu không, người ngoài giữ tham chiếu và sửa được.\n\nJava 14+ có record: tự sinh constructor, getter, equals/hashCode/toString cho lớp mang dữ liệu bất biến — gọn hơn nhiều. Java 17 có sealed class giới hạn lớp con.\n\nĐiểm ghi bàn: nhắc được 'defensive copy cho field tham chiếu' và 'record cho immutable data'.",
    "examples": ["public record Point(int x, int y) {}   // immutable, tự có equals/hashCode\n\n// immutable thủ công có field tham chiếu:\npublic final class Team {\n    private final List<String> members;\n    public Team(List<String> m){ this.members = List.copyOf(m); } // copy\n    public List<String> getMembers(){ return List.copyOf(members); }\n}"]
   },
   {
    "question": "Functional interface, lambda, method reference và Stream — dùng thế nào cho gọn?",
    "answer": "- Functional interface: interface có ĐÚNG 1 abstract method (@FunctionalInterface), là 'kiểu' cho lambda. Có sẵn: Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>, BiFunction, Comparator...\n- Lambda: (a,b) -> a+b — triển khai ngắn gọn functional interface.\n- Method reference: rút gọn lambda chỉ gọi một method: Class::method (String::toUpperCase), obj::method, Class::new (constructor ref).\n- Stream API: xử lý tập hợp theo phong cách khai báo (declarative). Chuỗi intermediate LAZY (filter, map, sorted) + một terminal (collect, forEach, count, reduce, anyMatch) mới kích hoạt. Có parallelStream() cho song song (cẩn thận với side-effect).\n\nMẹo hay hỏi: Stream không tái sử dụng được sau terminal; collect(Collectors.groupingBy/toMap/joining) rất mạnh; tránh side-effect trong lambda (nên thuần hàm).\n\nĐiểm ghi bàn: phân biệt intermediate (lazy) vs terminal, và biết Optional/Stream tránh null & vòng lặp thủ công.",
    "examples": ["List<String> names = users.stream()\n    .filter(u -> u.isActive())          // lazy\n    .map(User::getName)                  // method reference\n    .sorted()\n    .collect(Collectors.toList());       // terminal -> chạy\n\nMap<Dept,List<User>> byDept = users.stream()\n    .collect(Collectors.groupingBy(User::getDept));"]
   }
  ]
 },
 {
  "topic": "Spring Core & Boot",
  "items": [
   {
    "question": "IoC và DI là gì? Vì sao Spring dùng chúng?",
    "answer": "- IoC (Inversion of Control): đảo ngược quyền điều khiển — thay vì code TỰ tạo và quản lý đối tượng phụ thuộc, ta giao việc đó cho CONTAINER. 'Đừng gọi chúng tôi, chúng tôi sẽ gọi bạn'.\n- DI (Dependency Injection): một dạng cụ thể của IoC — container TIÊM (inject) các phụ thuộc vào một class thay vì class tự new.\n\nLợi ích: giảm coupling (class chỉ phụ thuộc abstraction/interface, không tự khởi tạo implementation), dễ thay thế/mở rộng, DỄ TEST (tiêm mock), tái sử dụng, quản lý vòng đời tập trung.\n\nSpring container (ApplicationContext) quét bean, phân giải phụ thuộc, tạo và tiêm theo đúng thứ tự. Code chỉ khai báo 'cần gì' (qua constructor), không quan tâm 'tạo thế nào'.\n\nĐiểm ghi bàn: 'DI là một dạng của IoC', và lợi ích lớn nhất là testability + loose coupling.",
    "examples": ["@Service\npublic class OrderService {\n    private final PaymentGateway gateway;   // phụ thuộc abstraction\n    public OrderService(PaymentGateway gateway) { // container tự tiêm\n        this.gateway = gateway;\n    }\n}"]
   },
   {
    "question": "Ba kiểu Dependency Injection? Vì sao khuyến nghị constructor injection?",
    "answer": "- Constructor injection (KHUYẾN NGHỊ): tiêm qua tham số constructor. Ưu: field để final (bất biến), bắt buộc đủ phụ thuộc mới tạo được bean (fail-fast), dễ test (new + truyền mock, không cần Spring), lộ rõ phụ thuộc. Từ Spring 4.3, class có 1 constructor duy nhất thì KHÔNG cần @Autowired.\n- Setter injection: tiêm qua setter — hợp cho phụ thuộc TÙY CHỌN hoặc cần đổi runtime.\n- Field injection (@Autowired trên field): gọn nhưng KHÔNG khuyến nghị — che giấu phụ thuộc, không đặt final được, khó test (phải reflection), dễ lạm dụng dẫn tới quá nhiều phụ thuộc.\n\nBonus: constructor injection còn giúp phát hiện SỚM circular dependency (Spring báo lỗi lúc khởi động thay vì để chạy mới lỗi).\n\nĐiểm ghi bàn: 'constructor injection → immutable + testable + fail-fast'.",
    "examples": ["// constructor injection (không cần @Autowired vì 1 constructor)\n@Service\nclass A {\n    private final B b;\n    A(B b) { this.b = b; }\n}\n// test dễ:  new A(mockB)"]
   },
   {
    "question": "Các bean scope trong Spring? Bean lifecycle diễn ra thế nào?",
    "answer": "SCOPE (số lượng instance & vòng đời):\n- singleton (MẶC ĐỊNH): mỗi container đúng 1 instance, dùng chung → cẩn thận KHÔNG lưu state biến đổi trong singleton (race condition).\n- prototype: tạo MỚI mỗi lần getBean/inject; Spring không quản destroy của prototype.\n- request / session / application: chỉ trong web — theo mỗi HTTP request / session / ServletContext.\nBẫy: tiêm prototype vào singleton thì chỉ được 1 instance lúc tạo singleton (dùng @Lookup hoặc ObjectProvider/Provider để lấy mới mỗi lần).\n\nLIFECYCLE của bean:\n1. Container tạo instance → 2. tiêm phụ thuộc → 3. các *Aware + BeanPostProcessor (before) → 4. @PostConstruct (init) → 5. sử dụng → 6. khi đóng context: @PreDestroy → hủy.\n\nĐiểm ghi bàn: 'singleton dùng chung nên phải stateless', và thứ tự inject → @PostConstruct → @PreDestroy.",
    "examples": ["@Component\n@Scope(\"prototype\")\nclass Task { }\n\n@Service\nclass S {\n    @PostConstruct void init(){ /* sau khi inject xong */ }\n    @PreDestroy  void cleanup(){ /* trước khi hủy */ }\n}"]
   },
   {
    "question": "@Component / @Service / @Repository / @Controller khác nhau ra sao? @Bean vs @Component?",
    "answer": "Bốn stereotype đều là @Component (được component-scan tạo thành bean), khác về NGỮ NGHĨA tầng + một số hành vi:\n- @Component: bean chung chung.\n- @Service: tầng nghiệp vụ (business logic) — chỉ mang ý nghĩa, không thêm hành vi.\n- @Repository: tầng truy cập dữ liệu — THÊM dịch exception: bọc SQLException/JPA exception thành DataAccessException thống nhất của Spring.\n- @Controller / @RestController: tầng web, nhận HTTP request.\n\n@Bean vs @Component:\n- @Component: đặt TRÊN class của MÌNH để Spring tự quét và tạo bean.\n- @Bean: đặt trên METHOD trong class @Configuration để TỰ TAY tạo bean — dùng khi cần cấu hình object của THƯ VIỆN BÊN NGOÀI (không sửa được để gắn @Component), hoặc cần logic khởi tạo tùy biến.\n\nĐiểm ghi bàn: '@Repository dịch exception', và '@Bean cho lớp bên thứ ba, @Component cho lớp của mình'.",
    "examples": ["@Configuration\nclass AppConfig {\n    @Bean                       // tạo bean cho lớp thư viện ngoài\n    RestTemplate restTemplate() { return new RestTemplate(); }\n}"]
   },
   {
    "question": "Spring Boot khác Spring Framework thuần thế nào? Auto-configuration hoạt động ra sao?",
    "answer": "Spring thuần mạnh nhưng cấu hình thủ công nhiều (XML/JavaConfig, khai báo dependency version, tự dựng server). Spring Boot đóng gói 'convention over configuration':\n- Starter dependencies: gom sẵn nhóm thư viện tương thích (spring-boot-starter-web kéo về Spring MVC, Jackson, Tomcat nhúng...). Không phải chọn version thủ công.\n- Auto-configuration: @SpringBootApplication (gồm @EnableAutoConfiguration) tự cấu hình bean DỰA TRÊN những gì có trên classpath và điều kiện @ConditionalOnClass/@ConditionalOnMissingBean. Ví dụ: thấy H2 trên classpath → tự cấu hình DataSource; bạn tự khai một bean thì Boot nhường (backs off).\n- Embedded server (Tomcat/Jetty/Undertow): chạy java -jar, không cần deploy WAR.\n- application.properties/yml + profiles, Actuator (health/metrics), sensible defaults.\n\nĐiểm ghi bàn: 'auto-config theo classpath + @Conditional, tự khai bean thì Boot nhường', và starter giải quyết 'dependency hell'.",
    "examples": ["@SpringBootApplication   // = @Configuration + @EnableAutoConfiguration + @ComponentScan\npublic class App {\n    public static void main(String[] a){ SpringApplication.run(App.class, a); }\n}"]
   },
   {
    "question": "@Configuration khác @Component thế nào (proxy CGLIB)? Vì sao quan trọng?",
    "answer": "@Configuration là @Component đặc biệt cho lớp khai báo @Bean. Điểm mấu chốt (hay hỏi bẫy): @Configuration được Spring bọc bằng PROXY CGLIB để đảm bảo GỌI method @Bean nhiều lần vẫn TRẢ VỀ CÙNG một singleton bean (chế độ 'full').\n\nVí dụ: trong config, beanA() gọi beanB() — nếu là @Configuration (proxy), beanB() trả về đúng singleton đã đăng ký trong container. Nếu chỉ để @Component (chế độ 'lite', không proxy), mỗi lần gọi beanB() sẽ tạo INSTANCE MỚI → sai vòng đời, tạo trùng bean.\n\nDo đó: lớp chứa nhiều @Bean có gọi lẫn nhau PHẢI dùng @Configuration (proxyBeanMethods=true mặc định). Có thể tắt proxy (proxyBeanMethods=false) để tăng tốc khởi động nếu các @Bean không gọi nhau.\n\nĐiểm ghi bàn: '@Configuration proxy CGLIB → gọi @Bean method trả về cùng singleton'.",
    "examples": ["@Configuration\nclass Cfg {\n    @Bean A a(){ return new A(b()); }  // b() trả về CÙNG singleton\n    @Bean B b(){ return new B(); }\n}"]
   },
   {
    "question": "Profiles và cấu hình ngoại vi (@Value / @ConfigurationProperties) dùng thế nào?",
    "answer": "Externalized config tách cấu hình khỏi code, đổi theo môi trường mà không build lại:\n- Nguồn & thứ tự ƯU TIÊN (cao đè thấp): command-line args > biến môi trường/ENV > application-{profile}.yml > application.yml > default. Nhờ vậy prod có thể override qua ENV.\n- Profiles: application-dev.yml, application-prod.yml; kích hoạt bằng spring.profiles.active=prod. @Profile(\"dev\") để bean chỉ tồn tại ở môi trường nhất định (vd bean seed dữ liệu chỉ ở dev).\n- Đọc giá trị:\n  + @Value(\"${server.port}\") tiêm 1 giá trị.\n  + @ConfigurationProperties(prefix=\"app\") ánh xạ CẢ NHÓM key vào một POJO type-safe (khuyến nghị khi nhiều thuộc tính) — có validate được.\n\nBí mật (mật khẩu DB, key): KHÔNG hardcode/commit — truyền qua ENV hoặc secret manager (Vault), dùng profile để tách.\n\nĐiểm ghi bàn: 'ENV override được properties', và '@ConfigurationProperties type-safe hơn nhiều @Value rời rạc'.",
    "examples": ["@ConfigurationProperties(prefix = \"app.mail\")\npublic record MailProps(String host, int port, String from) {}\n# application.yml\napp:\n  mail: { host: smtp.x.com, port: 587, from: no-reply@x.com }"]
   },
   {
    "question": "Circular dependency (phụ thuộc vòng) trong Spring là gì và xử lý ra sao?",
    "answer": "Xảy ra khi A cần B và B cần A (hoặc chuỗi vòng dài hơn). Hành vi:\n- Với CONSTRUCTOR injection cả hai chiều: Spring KHÔNG giải được → ném BeanCurrentlyInCreationException NGAY lúc khởi động (fail-fast — thực ra là điều tốt, lộ thiết kế sai sớm).\n- Với field/setter injection: Spring có thể 'lách' bằng cách tạo bean chưa hoàn chỉnh rồi tiêm sau (dùng cache 3 cấp), nên đôi khi chạy được nhưng che giấu vấn đề thiết kế. (Spring Boot 2.6+ mặc định CẤM circular reference, phải bật spring.main.allow-circular-references=true.)\n\nCách xử lý ĐÚNG (theo thứ tự ưu tiên):\n1. TÁI THIẾT KẾ: tách phần chung ra class thứ ba, hoặc gộp/ đảo trách nhiệm → phá vòng. Vòng phụ thuộc thường là 'mùi' thiết kế.\n2. Nếu buộc phải: dùng @Lazy trên một phía (tiêm proxy, hoãn khởi tạo), hoặc chuyển sang setter injection, hoặc dùng ApplicationEventPublisher để tách.\n\nĐiểm ghi bàn: 'constructor injection phơi bày circular dep sớm; cách đúng là tái thiết kế, không phải @Lazy cho qua'.",
    "examples": ["// phá vòng: dùng @Lazy nếu bất khả kháng\n@Service\nclass A {\n    private final B b;\n    A(@Lazy B b) { this.b = b; }   // tiêm proxy, hoãn khởi tạo\n}"]
   }
  ]
 },
 {
  "topic": "Spring MVC & REST",
  "items": [
   {
    "question": "Một HTTP request đi qua Spring MVC thế nào? (DispatcherServlet)",
    "answer": "Spring MVC theo mô hình Front Controller — mọi request qua một servlet trung tâm là DispatcherServlet. Luồng:\n1. Request tới DispatcherServlet.\n2. HandlerMapping tìm controller + method khớp URL/HTTP method (@RequestMapping...).\n3. HandlerAdapter gọi method; các HandlerInterceptor chạy trước/sau (preHandle/postHandle).\n4. Argument resolvers điền tham số (@PathVariable, @RequestParam, @RequestBody...), @RequestBody dùng HttpMessageConverter (Jackson) chuyển JSON → object.\n5. Method trả về: nếu @ResponseBody/@RestController → serialize object thành JSON vào body; nếu trả tên view → ViewResolver render (Thymeleaf/JSP).\n6. @ControllerAdvice bắt exception nếu có; response trả về client.\n\nĐiểm ghi bàn: gọi tên 'DispatcherServlet (front controller) → HandlerMapping → HandlerAdapter → HttpMessageConverter → ViewResolver/ResponseBody', và biết @RestController = @Controller + @ResponseBody.",
    "examples": ["@RestController\n@RequestMapping(\"/api/users\")\nclass UserController {\n    @GetMapping(\"/{id}\")\n    UserDto get(@PathVariable Long id) { ... }   // trả JSON\n}"]
   },
   {
    "question": "@PathVariable, @RequestParam, @RequestBody, @RequestHeader — lấy dữ liệu từ đâu?",
    "answer": "- @PathVariable: lấy biến trong ĐƯỜNG DẪN. GET /users/5 → @PathVariable Long id = 5. Dùng cho định danh tài nguyên (RESTful).\n- @RequestParam: lấy từ QUERY STRING hoặc form field. GET /users?page=2&size=10 → @RequestParam int page. Có required, defaultValue.\n- @RequestBody: đọc TOÀN BỘ body (thường JSON) và deserialize thành object qua Jackson. Dùng cho POST/PUT tạo/sửa.\n- @RequestHeader: lấy giá trị header (Authorization, Accept-Language...).\n- @ModelAttribute: gom nhiều form field/param vào object.\n\nĐiểm ghi bàn: phân biệt rõ path (/users/5) vs query (?page=2) vs body (JSON). Nhầm @RequestParam với @PathVariable là lỗi hay gặp.",
    "examples": ["// GET /users/5/orders?status=PAID\n@GetMapping(\"/users/{id}/orders\")\nList<Order> list(@PathVariable Long id,\n                 @RequestParam(defaultValue=\"ALL\") String status) { ... }\n\n@PostMapping(\"/users\")\nUser create(@RequestBody @Valid CreateUserDto dto) { ... }  // JSON body"]
   },
   {
    "question": "ResponseEntity và mã trạng thái HTTP: thiết kế REST API trả về cho đúng?",
    "answer": "ResponseEntity cho phép kiểm soát ĐẦY ĐỦ response: status code + headers + body. Trả thẳng object thì mặc định 200; dùng ResponseEntity khi cần status/headers khác.\n\nMã trạng thái nên dùng đúng ngữ nghĩa (RESTful):\n- 200 OK (thành công có body), 201 Created (tạo mới, kèm header Location), 204 No Content (thành công không body, vd DELETE).\n- 400 Bad Request (input sai/validation fail), 401 Unauthorized (chưa xác thực), 403 Forbidden (không đủ quyền), 404 Not Found, 409 Conflict (trùng/xung đột trạng thái), 422 Unprocessable Entity.\n- 500 Internal Server Error (lỗi phía server — KHÔNG dùng cho lỗi do input người dùng).\n\nĐiểm ghi bàn: dùng đúng 2xx/4xx/5xx (đừng trả 200 kèm 'error' trong body), 201 kèm Location, 4xx cho lỗi client vs 5xx cho lỗi server.",
    "examples": ["@PostMapping(\"/users\")\nResponseEntity<UserDto> create(@RequestBody @Valid CreateUserDto d){\n    UserDto u = service.create(d);\n    return ResponseEntity.created(URI.create(\"/users/\"+u.id())).body(u); // 201\n}"]
   },
   {
    "question": "Validation với @Valid / Bean Validation hoạt động ra sao?",
    "answer": "Bean Validation (Jakarta Validation, Hibernate Validator) kiểm tra dữ liệu KHAI BÁO bằng annotation trên field DTO:\n- @NotNull, @NotBlank (chuỗi không rỗng/không toàn khoảng trắng), @Size(min,max), @Min/@Max, @Email, @Pattern (regex), @Positive...\n- Đặt @Valid trước @RequestBody để KÍCH HOẠT kiểm tra khi request tới. Nếu fail, Spring ném MethodArgumentNotValidException (→ trả 400).\n- Gom lỗi trả client: bắt exception đó trong @RestControllerAdvice, đọc BindingResult/field errors, trả JSON danh sách lỗi rõ ràng.\n- @Validated (mức class) cho validation nhóm (groups) và validate tham số method service.\n\nĐiểm ghi bàn: '@Valid trên @RequestBody kích hoạt; fail → MethodArgumentNotValidException → 400; gom lỗi ở @RestControllerAdvice'.",
    "examples": ["public record CreateUserDto(\n    @NotBlank String name,\n    @Email String email,\n    @Min(18) int age) {}\n\n@PostMapping(\"/users\")\nUser create(@RequestBody @Valid CreateUserDto dto) { ... }"]
   },
   {
    "question": "Xử lý exception tập trung trong REST API: @RestControllerAdvice + @ExceptionHandler?",
    "answer": "Thay vì try/catch rải rác từng controller, gom xử lý lỗi về MỘT nơi để response lỗi THỐNG NHẤT:\n- @RestControllerAdvice (= @ControllerAdvice + @ResponseBody) là class bắt exception toàn cục.\n- Mỗi @ExceptionHandler(XxxException.class) xử lý một loại lỗi, trả ResponseEntity với status + body chuẩn (mã lỗi, message, timestamp, path).\n- Nên có một cấu trúc lỗi chung (ErrorResponse) để client parse ổn định; map từng loại exception nghiệp vụ sang status phù hợp (NotFound→404, Validation→400, Conflict→409).\n- Có thể kế thừa ResponseEntityExceptionHandler để tùy biến các lỗi mặc định của Spring.\n\nLợi ích: controller sạch (chỉ lo happy-path), tách mối quan tâm, không lộ stack trace ra ngoài (bảo mật).\n\nĐiểm ghi bàn: '@RestControllerAdvice + @ExceptionHandler → response lỗi thống nhất, không lộ stack trace'.",
    "examples": ["@RestControllerAdvice\nclass GlobalHandler {\n    @ExceptionHandler(EntityNotFoundException.class)\n    ResponseEntity<ErrorResponse> notFound(EntityNotFoundException e){\n        return ResponseEntity.status(404)\n            .body(new ErrorResponse(\"NOT_FOUND\", e.getMessage()));\n    }\n}"]
   },
   {
    "question": "REST API tốt: versioning, phân trang, idempotency và các nguyên tắc thiết kế?",
    "answer": "- Danh từ + số nhiều cho tài nguyên (/users, /users/5/orders); dùng HTTP method đúng nghĩa: GET (đọc, an toàn), POST (tạo), PUT (thay thế toàn bộ), PATCH (sửa một phần), DELETE (xóa).\n- Idempotency (bất biến khi lặp): GET/PUT/DELETE idempotent (gọi nhiều lần kết quả như một lần); POST thì không → với thanh toán dùng Idempotency-Key để tránh tạo trùng khi client retry.\n- Phân trang: /users?page=0&size=20&sort=name,asc; trả metadata (total, page). Với dữ liệu lớn nên cursor-based pagination.\n- Versioning: /api/v1/... (URL, phổ biến) hoặc qua header. Giữ tương thích ngược.\n- Trả mã status đúng, thông báo lỗi rõ; hỗ trợ filtering/sorting; HATEOAS nếu cần. Bảo mật: HTTPS, xác thực (JWT/OAuth2), rate limit.\n\nĐiểm ghi bàn: 'GET/PUT/DELETE idempotent, POST không → cần Idempotency-Key cho retry', và versioning giữ tương thích ngược.",
    "examples": ["GET  /api/v1/users?page=0&size=20&sort=createdAt,desc\nPOST /api/v1/payments      Header: Idempotency-Key: 9f2c...\nPATCH /api/v1/users/5      { \"email\": \"new@x.com\" }"]
   }
  ]
 },
 {
  "topic": "Spring Data JPA & Transaction",
  "items": [
   {
    "question": "JPA, Hibernate, Spring Data JPA — ba khái niệm này liên hệ thế nào?",
    "answer": "- JPA (Jakarta Persistence API): TIÊU CHUẨN (đặc tả) ánh xạ object ↔ bảng quan hệ (ORM) — chỉ là interface/annotation (@Entity, @Id, EntityManager...), không phải implementation.\n- Hibernate: IMPLEMENTATION phổ biến nhất của JPA (làm việc thật: sinh SQL, quản lý cache, dirty checking...).\n- Spring Data JPA: LỚP TRỪU TƯỢNG của Spring TRÊN JPA/Hibernate — bạn chỉ khai báo interface Repository, Spring tự sinh implementation (CRUD, query theo tên method) lúc runtime.\n\nEntity: class @Entity ánh xạ tới bảng; @Id + @GeneratedValue cho khóa chính; @OneToMany/@ManyToOne cho quan hệ.\n\nĐiểm ghi bàn: 'JPA là đặc tả, Hibernate là implementation, Spring Data JPA bọc lên cho tiện' — nhầm ba cái này là lỗi phổ biến.",
    "examples": ["@Entity\nclass User {\n  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n  Long id;\n  String email;\n  @OneToMany(mappedBy = \"user\") List<Order> orders;\n}"]
   },
   {
    "question": "Repository trong Spring Data JPA: derived query, @Query (JPQL vs native), phân trang?",
    "answer": "Chỉ cần khai interface extends JpaRepository<Entity, ID> là có sẵn save, findById (trả Optional), findAll, delete, count...\n- Derived query: Spring sinh SQL TỪ TÊN METHOD: findByEmail, findByStatusAndAgeGreaterThan, existsByEmail, countByStatus, deleteByX, findTop3ByOrderByCreatedAtDesc.\n- @Query: viết tay khi phức tạp — JPQL (theo Entity/field, độc lập DB) hoặc nativeQuery=true (SQL thuần, tận dụng tính năng riêng của DB). Tham số qua :name (@Param) hoặc ?1.\n- Phân trang/sắp xếp: truyền Pageable → trả Page<T> (có totalElements, totalPages) hoặc Slice.\n- Projection: trả interface/DTO chỉ vài cột thay vì cả entity (nhẹ hơn).\n\nNguyên tắc: repository MỎNG, không nhét business logic; logic để ở service.\n\nĐiểm ghi bàn: 'derived query theo tên; @Query JPQL vs native; Pageable→Page; projection cho nhẹ'.",
    "examples": ["interface UserRepo extends JpaRepository<User, Long> {\n  Optional<User> findByEmail(String email);\n  Page<User> findByStatus(String status, Pageable pageable);\n  @Query(\"select u from User u where u.age > :age\")\n  List<User> older(@Param(\"age\") int age);\n}"]
   },
   {
    "question": "Vấn đề N+1 query trong JPA là gì và cách khắc phục?",
    "answer": "N+1 là lỗi HIỆU NĂNG kinh điển: lấy N entity cha rồi mỗi lần truy cập quan hệ con lại chạy THÊM 1 query → tổng 1 (lấy cha) + N (mỗi cha một query con) = N+1 query. Thường do quan hệ LAZY được truy cập trong vòng lặp.\n\nVí dụ: findAll() 100 order (1 query), rồi vòng lặp order.getCustomer() → 100 query lấy customer = 101 query.\n\nCÁCH KHẮC PHỤC:\n1. JOIN FETCH trong JPQL: nạp cha + con trong MỘT query. @Query(\"select o from Order o join fetch o.customer\").\n2. @EntityGraph trên method repository: khai báo quan hệ cần nạp sẵn (fetch join khai báo, gọn hơn).\n3. Batch fetching: @BatchSize(size=n) hoặc hibernate.default_batch_fetch_size — gom N query con thành vài query IN (...).\n4. Trả projection/DTO chỉ lấy cột cần.\n\nBẫy ngược: JOIN FETCH nhiều collection cùng lúc gây tích Descartes → cẩn thận; fetch collection + phân trang trong bộ nhớ cũng nguy hiểm.\n\nĐiểm ghi bàn: gọi tên 'N+1', và giải pháp 'JOIN FETCH / @EntityGraph / batch size'.",
    "examples": ["// N+1:\nList<Order> os = repo.findAll();\nos.forEach(o -> o.getCustomer().getName()); // mỗi order 1 query\n\n// FIX bằng fetch join:\n@Query(\"select o from Order o join fetch o.customer\")\nList<Order> findAllWithCustomer();\n// hoặc:\n@EntityGraph(attributePaths = \"customer\")\nList<Order> findAll();"]
   },
   {
    "question": "Persistence Context, các trạng thái entity và dirty checking là gì?",
    "answer": "Persistence Context (do EntityManager quản lý, sống trong một transaction) là 'bộ nhớ đệm cấp 1' (first-level cache) theo dõi các entity đang quản lý.\n\nBốn TRẠNG THÁI entity:\n- Transient (mới new, chưa có id, chưa được quản lý).\n- Managed/Persistent (đã persist/tìm ra, nằm trong context, được theo dõi).\n- Detached (context đóng/evict — không còn theo dõi).\n- Removed (đánh dấu xóa, sẽ delete khi flush).\n\nDIRTY CHECKING (rất hay hỏi): với entity ĐANG managed, chỉ cần THAY ĐỔI field (setter) là Hibernate tự phát hiện lúc flush/commit và sinh UPDATE — KHÔNG cần gọi save() tường minh. Đây là lý do thay đổi trong @Transactional tự được lưu.\n\nFlush: đồng bộ thay đổi xuống DB (tự động trước query/commit). first-level cache: cùng transaction, findById cùng id lần 2 lấy từ context, không query lại.\n\nĐiểm ghi bàn: 'entity managed + dirty checking → sửa field tự UPDATE khi commit, khỏi gọi save'.",
    "examples": ["@Transactional\nvoid rename(Long id, String name){\n    User u = repo.findById(id).orElseThrow(); // managed\n    u.setName(name);   // KHÔNG cần repo.save() — dirty checking tự UPDATE\n}"]
   },
   {
    "question": "LazyInitializationException xảy ra khi nào và tránh thế nào?",
    "answer": "FetchType.LAZY nghĩa là quan hệ chỉ được nạp KHI truy cập tới. Nếu truy cập quan hệ lazy khi Persistence Context ĐÃ ĐÓNG (ngoài transaction — ví dụ ở tầng controller/khi serialize JSON sau khi service trả về), Hibernate không còn session để query → ném LazyInitializationException.\n\nCÁCH TRÁNH (đúng đắn):\n1. Nạp sẵn dữ liệu cần TRONG transaction: JOIN FETCH / @EntityGraph.\n2. Map sang DTO NGAY trong service (trong khi còn transaction) rồi trả DTO cho controller — cách sạch nhất, cũng tránh N+1 và tránh lộ entity.\n\nCÁCH SAI/nên tránh: Open-Session-In-View (mặc định BẬT trong Spring Boot) giữ session mở tới tận view → 'giấu' lỗi nhưng gây N+1 âm thầm và giữ kết nối lâu; nhiều team TẮT nó (spring.jpa.open-in-view=false) và chủ động fetch.\n\nĐiểm ghi bàn: 'truy cập lazy ngoài transaction → exception; fix bằng fetch join hoặc map DTO trong transaction; cân nhắc tắt open-in-view'.",
    "examples": ["# tắt Open-Session-In-View để lộ lỗi sớm & tránh N+1 ẩn\nspring.jpa.open-in-view=false\n// rồi chủ động: @EntityGraph / join fetch / map DTO trong @Transactional"]
   },
   {
    "question": "@Transactional: propagation và isolation là gì? Cho ví dụ.",
    "answer": "@Transactional bọc method trong một transaction: mặc định COMMIT nếu êm, ROLLBACK nếu ném RuntimeException/Error (checked exception KHÔNG rollback trừ khi khai rollbackFor).\n\nPROPAGATION (khi method có transaction gọi method có transaction khác):\n- REQUIRED (mặc định): tham gia transaction hiện có, chưa có thì tạo mới.\n- REQUIRES_NEW: LUÔN tạo transaction mới, TẠM TREO cái ngoài → commit/rollback độc lập (vd ghi audit log phải giữ lại dù nghiệp vụ chính rollback). Bẫy: nếu inner REQUIRES_NEW ném lỗi lan ra ngoài thì outer cũng rollback.\n- NESTED (savepoint), SUPPORTS, NOT_SUPPORTED, MANDATORY, NEVER.\n\nISOLATION (mức cô lập, chống đọc bẩn/không lặp lại/phantom):\n- READ_UNCOMMITTED → READ_COMMITTED (mặc định nhiều DB) → REPEATABLE_READ → SERIALIZABLE (chặt nhất, chậm nhất). Cao hơn = an toàn hơn nhưng ít song song hơn.\n\nĐiểm ghi bàn: phân biệt REQUIRED vs REQUIRES_NEW (audit log), và biết rollback mặc định chỉ với unchecked exception.",
    "examples": ["@Transactional(propagation = Propagation.REQUIRES_NEW,\n               isolation = Isolation.READ_COMMITTED,\n               rollbackFor = Exception.class)\nvoid writeAuditLog(Event e){ ... }  // commit độc lập với nghiệp vụ chính"]
   },
   {
    "question": "Bẫy @Transactional: self-invocation và private method — vì sao 'im lặng' không chạy?",
    "answer": "@Transactional hoạt động qua PROXY AOP: Spring bọc bean bằng proxy, transaction được mở/đóng ở proxy TRƯỚC khi vào method thật. Hệ quả (bẫy senior kinh điển):\n1. SELF-INVOCATION: gọi method @Transactional từ MỘT method KHÁC TRONG CÙNG class (this.method()) → KHÔNG đi qua proxy → @Transactional bị BỎ QUA im lặng (không có transaction, không rollback).\n2. Method private / final: Spring AOP (proxy) không chặn được → @Transactional vô hiệu.\n\nCÙNG giới hạn proxy này áp dụng cho @Async và @Cacheable (câu follow-up hay hỏi: 'annotation nào khác cũng dính?').\n\nCÁCH SỬA: tách method giao dịch sang một BEAN/SERVICE khác rồi tiêm vào gọi (đi qua proxy); hoặc self-inject bean vào chính nó; hoặc dùng TransactionTemplate. Đừng để method @Transactional là private hay bị gọi nội bộ.\n\nĐiểm ghi bàn: 'proxy-based → self-invocation & private method làm @Transactional/@Async/@Cacheable im lặng vô hiệu; fix bằng tách sang bean khác'.",
    "examples": ["// SAI: outer() gọi this.inner() -> @Transactional bị bỏ qua\n@Service class S {\n  void outer(){ inner(); }\n  @Transactional void inner(){ ... }   // không có transaction!\n}\n// ĐÚNG: chuyển inner() sang bean khác và tiêm vào."]
   },
   {
    "question": "Optimistic locking vs Pessimistic locking (@Version) — chống mất cập nhật đồng thời?",
    "answer": "Bài toán 'lost update': hai transaction cùng đọc rồi cùng ghi một bản ghi → cái sau đè cái trước.\n- Optimistic locking (khóa lạc quan): KHÔNG khóa DB; thêm cột @Version (số/timestamp). Khi UPDATE, Hibernate thêm điều kiện WHERE version = <đã đọc> và tăng version. Nếu ai đó đã sửa (version đổi) → 0 dòng bị update → ném OptimisticLockException, ứng dụng retry/hiển thị lỗi. Hợp khi XUNG ĐỘT HIẾM (đa số đọc) → hiệu năng cao, không giữ khóa.\n- Pessimistic locking (khóa bi quan): KHÓA bản ghi ở DB ngay khi đọc (SELECT ... FOR UPDATE) qua @Lock(PESSIMISTIC_WRITE). Transaction khác phải chờ. Hợp khi xung đột NHIỀU/ giá trị cao (tồn kho, số dư) nhưng giảm song song, có nguy cơ deadlock/chờ lâu.\n\nĐiểm ghi bàn: 'optimistic = @Version + retry, tốt khi xung đột hiếm; pessimistic = SELECT FOR UPDATE, tốt khi tranh chấp cao'.",
    "examples": ["@Entity class Account {\n  @Id Long id;\n  @Version Long version;   // optimistic locking\n  BigDecimal balance;\n}\n// pessimistic:\n@Lock(LockModeType.PESSIMISTIC_WRITE)\nOptional<Account> findById(Long id);"]
   }
  ]
 },
 {
  "topic": "Spring AOP, Security & Test",
  "items": [
   {
    "question": "AOP là gì? Aspect/Advice/Pointcut và proxy (JDK dynamic vs CGLIB)?",
    "answer": "AOP (Aspect-Oriented Programming) tách các 'cross-cutting concern' (logging, security, transaction, metric) ra khỏi logic nghiệp vụ, áp dụng chúng một cách khai báo. Thuật ngữ:\n- Aspect: module chứa concern (vd LoggingAspect).\n- Advice: đoạn code chèn vào — @Before, @After, @AfterReturning, @AfterThrowing, @Around (bao quanh, mạnh nhất).\n- Pointcut: biểu thức chọn method áp dụng (execution(* com.app.service..*(..))).\n- Join point: điểm thực thi (lời gọi method).\n\nCƠ CHẾ: Spring AOP dựa trên PROXY runtime:\n- JDK dynamic proxy: khi bean IMPLEMENT interface → tạo proxy theo interface.\n- CGLIB: khi bean KHÔNG có interface → tạo proxy bằng cách kế thừa class (nên class/method không được final).\nHệ quả: mọi thứ dựa proxy đều dính bẫy self-invocation (gọi nội bộ không qua proxy). AspectJ (compile-time/load-time weaving) mạnh hơn, bắt được cả field/constructor, không giới hạn proxy.\n\nĐiểm ghi bàn: 'Spring AOP = proxy runtime (JDK cho interface, CGLIB cho class); @Transactional/@Async là AOP nên dính self-invocation'.",
    "examples": ["@Aspect @Component\nclass LogAspect {\n  @Around(\"execution(* com.app.service..*(..))\")\n  Object log(ProceedingJoinPoint pjp) throws Throwable {\n    long t = System.nanoTime();\n    try { return pjp.proceed(); }\n    finally { log.info(pjp.getSignature()+\" mất \"+(System.nanoTime()-t)); }\n  }\n}"]
   },
   {
    "question": "Spring Security: chuỗi filter, Authentication vs Authorization, xác thực diễn ra thế nào?",
    "answer": "Spring Security cắm vào servlet qua một chuỗi FILTER (SecurityFilterChain). Request đi qua các filter trước khi tới controller.\n- Authentication (xác thực): 'bạn là ai?' — kiểm tra thông tin đăng nhập. AuthenticationManager ủy quyền cho các AuthenticationProvider; UserDetailsService nạp user; PasswordEncoder so khớp mật khẩu. Thành công → lưu Authentication vào SecurityContext (thread-local).\n- Authorization (phân quyền): 'bạn được làm gì?' — kiểm tra vai trò/quyền qua cấu hình (authorizeHttpRequests) hoặc method security (@PreAuthorize).\n\nMẬT KHẨU: KHÔNG lưu plaintext. Dùng BCrypt/Argon2 (hàm băm chậm + salt tự động) qua PasswordEncoder. So khớp bằng encoder.matches(raw, hashed).\n\nMethod security: @EnableMethodSecurity rồi @PreAuthorize(\"hasRole('ADMIN')\") / @PostAuthorize / @Secured trên method.\n\nĐiểm ghi bàn: 'AuthN = bạn là ai (AuthenticationManager+UserDetailsService+PasswordEncoder); AuthZ = được làm gì (@PreAuthorize)', và mật khẩu phải BCrypt.",
    "examples": ["@Bean SecurityFilterChain chain(HttpSecurity http) throws Exception {\n  http.csrf(c->c.disable())\n      .authorizeHttpRequests(a -> a\n         .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n         .anyRequest().authenticated())\n      .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));\n  return http.build();\n}\n@Bean PasswordEncoder pe(){ return new BCryptPasswordEncoder(); }"]
   },
   {
    "question": "Xác thực JWT trong Spring Security: luồng hoạt động và vì sao dùng?",
    "answer": "JWT (JSON Web Token) là token tự chứa gồm 3 phần: Header.Payload.Signature (base64url), được KÝ bằng secret/khóa riêng. Payload chứa claims (userId, roles, exp...). Server chỉ cần VERIFY chữ ký để tin token, không cần tra DB/lưu session → STATELESS, scale ngang dễ (hợp REST/microservice).\n\nLuồng điển hình:\n1. Client đăng nhập (user+pass) → server xác thực, phát JWT (thường access token ngắn hạn + refresh token dài hạn).\n2. Client gửi kèm mỗi request: header Authorization: Bearer <token>.\n3. Một filter (OncePerRequestFilter/JwtAuthenticationFilter) chặn request, đọc token, VERIFY chữ ký + hạn (exp), dựng Authentication rồi đặt vào SecurityContext.\n4. Authorization dựa trên roles trong token.\n\nLưu ý bảo mật: token ký chứ KHÔNG mã hóa (đừng để dữ liệu nhạy cảm trong payload); dùng HTTPS; access token hạn ngắn + refresh token; khó thu hồi trước hạn (cần blacklist/short TTL). Ký bằng thuật toán mạnh, giữ secret an toàn.\n\nĐiểm ghi bàn: 'stateless, verify chữ ký thay vì session; Bearer token; token ký không mã hóa; access ngắn + refresh'.",
    "examples": ["// header mỗi request:\n// Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGUiOiJVU0VSIn0...\n// filter: verify chữ ký + exp -> set SecurityContext"]
   },
   {
    "question": "@Async, @Scheduled, @Cacheable — các annotation 'thần kỳ' dựa AOP dùng thế nào và bẫy?",
    "answer": "Ba annotation tiện lợi, đều dựa PROXY AOP (nên dính bẫy self-invocation + phải là public method, gọi từ bean khác):\n- @Async: chạy method BẤT ĐỒNG BỘ trên thread pool khác (cần @EnableAsync). Trả void hoặc CompletableFuture<T>. Nên tự cấu hình Executor riêng (đừng dùng pool mặc định vô hạn). Exception trong @Async void bị nuốt → cần AsyncUncaughtExceptionHandler.\n- @Scheduled: chạy định kỳ (cần @EnableScheduling) qua fixedRate/fixedDelay/cron. fixedRate: theo chu kỳ bất kể lần trước xong chưa; fixedDelay: chờ lần trước xong + delay. Nhiều instance chạy cùng cron → cần khóa phân tán (ShedLock) tránh chạy trùng.\n- @Cacheable: cache kết quả theo key (cần @EnableCaching + cache provider như Redis/Caffeine). @CacheEvict để xóa, @CachePut để cập nhật. Cẩn thận key và tính nhất quán cache.\n\nĐiểm ghi bàn: 'đều là AOP → self-invocation vô hiệu; @Async cần executor riêng + xử lý lỗi; @Scheduled nhiều instance cần ShedLock'.",
    "examples": ["@EnableAsync @EnableScheduling @EnableCaching  // bật ở config\n\n@Async CompletableFuture<Report> build(){ ... }\n@Scheduled(cron = \"0 0 2 * * *\") void nightly(){ ... }\n@Cacheable(value=\"users\", key=\"#id\") User find(Long id){ ... }\n@CacheEvict(value=\"users\", key=\"#u.id\") void update(User u){ ... }"]
   },
   {
    "question": "Test trong Spring Boot: @SpringBootTest, @WebMvcTest, @DataJpaTest, Mockito khác nhau ra sao?",
    "answer": "Kim tự tháp test: nhiều unit test (nhanh), ít integration test (chậm hơn).\n- Unit test THUẦN (không cần Spring): test một class, dùng Mockito mock phụ thuộc (@Mock, when().thenReturn(), verify()). Nhanh nhất — nhờ constructor injection ta new object + truyền mock. Nên chiếm đa số.\n- @WebMvcTest(Controller.class): SLICE test tầng web — chỉ nạp controller + MVC, KHÔNG nạp service/DB thật (mock service bằng @MockBean). Dùng MockMvc để giả lập HTTP request và assert status/JSON.\n- @DataJpaTest: SLICE test tầng repository — nạp JPA + DB in-memory (H2) hoặc Testcontainers, tự rollback sau mỗi test. Test query/repository.\n- @SpringBootTest: INTEGRATION test — nạp TOÀN BỘ ApplicationContext (nặng, chậm), test luồng end-to-end, có thể kèm webEnvironment + TestRestTemplate/MockMvc.\n\nBonus: Testcontainers chạy DB/Kafka thật trong Docker cho integration test giống production hơn H2.\n\nĐiểm ghi bàn: 'ưu tiên unit test + Mockito; slice test (@WebMvcTest/@DataJpaTest) nhẹ; @SpringBootTest cho integration, nặng nên ít'.",
    "examples": ["@WebMvcTest(UserController.class)\nclass UserControllerTest {\n  @Autowired MockMvc mvc;\n  @MockBean UserService service;   // service được mock\n  @Test void get404() throws Exception {\n    when(service.find(9L)).thenThrow(new EntityNotFoundException());\n    mvc.perform(get(\"/api/users/9\")).andExpect(status().isNotFound());\n  }\n}"]
   },
   {
    "question": "Kiến trúc microservice với Spring Cloud: các mảnh ghép chính là gì?",
    "answer": "Khi tách monolith thành nhiều service nhỏ, Spring Cloud cung cấp các thành phần:\n- Service Discovery (Eureka/Consul): service tự đăng ký, gọi nhau theo TÊN thay vì IP cứng (IP thay đổi khi scale).\n- API Gateway (Spring Cloud Gateway): một cửa ngõ định tuyến, gom xác thực, rate limit, CORS, cân bằng tải cho client bên ngoài.\n- Config Server: cấu hình tập trung, dùng chung, đổi không cần build lại.\n- OpenFeign: gọi service khác kiểu khai báo (như interface HTTP client), tích hợp load balancing.\n- Resilience (Resilience4j): Circuit Breaker (ngắt mạch khi service phụ thuộc lỗi liên tục để không sập dây chuyền), retry, timeout, bulkhead, rate limiter, fallback.\n- Distributed tracing (Micrometer + Zipkin/Tempo): lần vết một request đi qua nhiều service.\n- Giao tiếp bất đồng bộ qua message broker (Kafka/RabbitMQ) để giảm coupling.\n\nĐiểm ghi bàn: gọi tên 'Discovery + Gateway + Config + Feign + Circuit Breaker + tracing', và hiểu Circuit Breaker chống cascading failure.",
    "examples": ["@FeignClient(name = \"order-service\")   // gọi service khác theo tên\ninterface OrderClient {\n  @GetMapping(\"/orders/{id}\") OrderDto get(@PathVariable Long id);\n}\n@CircuitBreaker(name=\"orders\", fallbackMethod=\"fallback\")\nOrderDto get(Long id){ return client.get(id); }"]
   }
  ]
 },
 {
  "topic": "Hibernate & JPA nâng cao",
  "items": [
   {
    "question": "JPA vs Hibernate khác gì? Các trạng thái vòng đời của entity?",
    "answer": "JPA là ĐẶC TẢ (specification/interface); Hibernate là một IMPLEMENTATION của JPA (còn EclipseLink là bản khác). Code theo JPA (javax/jakarta.persistence) giúp dễ đổi provider.\n\n4 trạng thái vòng đời entity:\n- Transient (mới new, chưa gắn persistence context, chưa có trong DB).\n- Managed/Persistent (đang được EntityManager theo dõi; mọi thay đổi field sẽ tự flush xuống DB — gọi là 'dirty checking').\n- Detached (context đã đóng; object còn tồn tại nhưng không còn được theo dõi).\n- Removed (đã đánh dấu xóa, sẽ DELETE khi flush).\n\nĐiểm ghi bàn: nêu đúng 4 trạng thái và hiểu 'dirty checking' (không cần gọi save() vẫn update được entity managed).",
    "examples": ["User u = new User();          // TRANSIENT\nem.persist(u);                // -> MANAGED\nu.setName(\"An\");              // dirty checking tự UPDATE khi flush\nem.detach(u);                 // -> DETACHED\nUser m = em.merge(u);         // gắn lại -> MANAGED\nem.remove(m);                 // -> REMOVED"]
   },
   {
    "question": "CascadeType có những loại nào? Khi nào dùng CascadeType.ALL là nguy hiểm?",
    "answer": "Cascade quyết định thao tác trên entity cha có lan sang entity con không: PERSIST, MERGE, REMOVE, REFRESH, DETACH và ALL (gộp tất cả).\n\nNguy hiểm: dùng CascadeType.ALL (kèm REMOVE) trên collection — xóa cha sẽ xóa toàn bộ con, có thể xóa nhầm dữ liệu dùng chung. Best practice: chỉ khai báo PERSIST/MERGE là đủ cho đa số quan hệ; cân nhắc kỹ REMOVE.\n\nĐiểm ghi bàn: 'ALL bao gồm REMOVE nên tránh lạm dụng; chỉ cascade những gì thực sự cần'.",
    "examples": ["@OneToMany(mappedBy=\"employee\", cascade={CascadeType.PERSIST, CascadeType.MERGE})\nList<Account> accounts;   // KHÔNG cascade REMOVE -> an toàn hơn"]
   },
   {
    "question": "orphanRemoval khác CascadeType.REMOVE chỗ nào?",
    "answer": "CascadeType.REMOVE: chỉ xóa con khi XÓA CHA (em.remove(parent)).\norphanRemoval=true: xóa con ngay khi con bị GỠ KHỎI collection của cha (mất liên kết -> trở thành 'orphan' -> DELETE), kể cả khi cha vẫn tồn tại.\n\nDùng orphanRemoval cho quan hệ 'sở hữu chặt' (parent-child thực sự, con không thể tồn tại độc lập, ví dụ Order và OrderLine).\n\nĐiểm ghi bàn: 'REMOVE gắn với xóa cha; orphanRemoval gắn với việc gỡ phần tử khỏi collection'.",
    "examples": ["@OneToMany(mappedBy=\"order\", cascade=CascadeType.ALL, orphanRemoval=true)\nList<OrderLine> lines;\n// order.getLines().remove(line);  -> line bị DELETE dù order còn sống"]
   },
   {
    "question": "FetchType LAZY vs EAGER? LazyInitializationException do đâu?",
    "answer": "EAGER: nạp quan hệ ngay cùng entity cha (mặc định của @ManyToOne, @OneToOne).\nLAZY: hoãn nạp tới khi truy cập lần đầu (mặc định của @OneToMany, @ManyToMany) — tốt cho hiệu năng.\n\nLazyInitializationException: truy cập một quan hệ LAZY SAU KHI persistence context/Session đã đóng (thường ở tầng view/controller). Cách xử lý đúng: nạp sẵn bằng JOIN FETCH / @EntityGraph, hoặc trả DTO trong transaction — KHÔNG nên bật OSIV (Open Session In View) vô tội vạ.\n\nĐiểm ghi bàn: chỉ ra nguyên nhân (session đóng) và cách fix bằng fetch join/DTO, không phải 'đổi hết sang EAGER'.",
    "examples": ["@Query(\"select o from Order o join fetch o.lines where o.id = :id\")\nOrder findWithLines(@Param(\"id\") Long id);   // nạp sẵn -> hết Lazy exception"]
   },
   {
    "question": "Vấn đề N+1 query là gì? Cách khắc phục?",
    "answer": "N+1: chạy 1 query lấy N cha, rồi vì mỗi cha lại phát sinh thêm 1 query lấy con -> tổng 1 + N query, rất chậm.\n\nKhắc phục:\n- JOIN FETCH (JPQL) hoặc @EntityGraph để gộp thành 1 query.\n- Batch fetch: hibernate.default_batch_fetch_size (gom nhiều con vào 1 IN query).\n- Dùng DTO projection (chỉ lấy cột cần).\n\nĐiểm ghi bàn: nhận diện N+1 khi thấy log Hibernate in ra hàng loạt SELECT giống nhau.",
    "examples": ["-- N+1 (xấu):\nSELECT * FROM orders;             -- 1\nSELECT * FROM lines WHERE order_id=1;  -- +N\n-- Fix: 1 query\nSELECT o.*, l.* FROM orders o JOIN lines l ON l.order_id=o.id;"]
   },
   {
    "question": "Các chiến lược @GeneratedValue? Khác nhau ra sao?",
    "answer": "- IDENTITY: dựa vào cột auto-increment của DB (MySQL). Nhược: Hibernate không batch insert tốt vì phải insert từng dòng để lấy id.\n- SEQUENCE: dùng sequence của DB (PostgreSQL/Oracle) — cho phép lấy trước id, batch insert tốt. Khuyên dùng khi DB hỗ trợ.\n- TABLE: mô phỏng sequence bằng một bảng riêng — chậm, ít dùng.\n- AUTO: để provider tự chọn theo dialect.\n\nĐiểm ghi bàn: 'MySQL thường IDENTITY; Postgres/Oracle nên SEQUENCE để batch tốt hơn'.",
    "examples": ["@Id @GeneratedValue(strategy=GenerationType.SEQUENCE, generator=\"user_seq\")\n@SequenceGenerator(name=\"user_seq\", sequenceName=\"user_seq\", allocationSize=50)\nLong id;"]
   },
   {
    "question": "Cache tầng 1 và tầng 2 khác nhau? Khi nào bật second-level cache?",
    "answer": "First-level cache (L1): mặc định, gắn với EntityManager/Session, chỉ sống trong 1 transaction — không tắt được.\nSecond-level cache (L2): tùy chọn, chia sẻ giữa các session (Ehcache/Hazelcast/Infinispan). Bật bằng @Cacheable + @Cache(strategy=...) và cấu hình provider.\n\nQuery cache là riêng, cần bật cẩn thận. L2 hợp với dữ liệu ít đổi, đọc nhiều (bảng tra cứu); tránh cho dữ liệu ghi liên tục vì tốn công đồng bộ/invalidate.\n\nĐiểm ghi bàn: L1 luôn có theo transaction; L2 phải cấu hình và chỉ nên cho dữ liệu 'read-mostly'.",
    "examples": ["@Entity @Cacheable\n@org.hibernate.annotations.Cache(usage=CacheConcurrencyStrategy.READ_WRITE)\nclass Country { ... }   // bảng tra cứu ít đổi -> hợp L2"]
   },
   {
    "question": "@ManyToMany nên map thế nào? Vì sao thường tách bảng nối thành entity riêng?",
    "answer": "@ManyToMany cần bảng nối (join table). Cách cơ bản: @ManyToMany + @JoinTable. Nhưng khi bảng nối cần thêm cột (ví dụ ngày tham gia, vai trò, số lượng), nên TÁCH thành entity riêng với 2 quan hệ @ManyToOne (chuyển thành hai @OneToMany-@ManyToOne).\n\nLưu ý: quản lý cả hai phía để đồng bộ; tránh @ManyToMany EAGER; cân nhắc Set thay List để tránh xóa-chèn lại toàn bộ.\n\nĐiểm ghi bàn: 'cần cột phụ trên quan hệ n-n -> tách bảng nối thành entity'.",
    "examples": ["@Entity class Enrollment {   // bảng nối có thêm cột\n  @ManyToOne Student student;\n  @ManyToOne Course course;\n  LocalDate enrolledAt;      // cột phụ -> phải tách entity\n}"]
   },
   {
    "question": "Chiến lược map kế thừa (inheritance) trong JPA?",
    "answer": "- SINGLE_TABLE: tất cả lớp con dồn 1 bảng + cột discriminator. Nhanh nhất, nhưng nhiều cột NULL.\n- JOINED: mỗi lớp (cha + con) một bảng, JOIN khi truy vấn. Chuẩn hóa tốt, truy vấn tốn JOIN.\n- TABLE_PER_CLASS: mỗi lớp con một bảng đầy đủ. Ít dùng, truy vấn đa hình phải UNION.\n\nĐiểm ghi bàn: 'ưu tiên hiệu năng -> SINGLE_TABLE; ưu tiên chuẩn hóa -> JOINED'.",
    "examples": ["@Entity @Inheritance(strategy=InheritanceType.SINGLE_TABLE)\n@DiscriminatorColumn(name=\"type\")\nabstract class Payment {}\n@Entity @DiscriminatorValue(\"CARD\") class CardPayment extends Payment {}"]
   },
   {
    "question": "Optimistic vs Pessimistic locking? @Version dùng để làm gì?",
    "answer": "Optimistic locking: không khóa DB; dùng cột @Version (số/timestamp). Khi update, Hibernate thêm điều kiện WHERE version = ?; nếu 0 dòng bị ảnh hưởng nghĩa là ai đó đã sửa trước -> ném OptimisticLockException. Hợp với ít xung đột, throughput cao.\nPessimistic locking: khóa bản ghi ở DB (SELECT ... FOR UPDATE) qua LockModeType.PESSIMISTIC_WRITE. Hợp với xung đột cao, tránh mất cập nhật nhưng dễ nghẽn.\n\nĐiểm ghi bàn: '@Version = optimistic; kiểm soát lost update mà không giữ khóa DB'.",
    "examples": ["@Version Long version;   // Hibernate tự tăng mỗi update\n// UPDATE ... SET ..., version=version+1 WHERE id=? AND version=?"]
   }
  ]
 },
 {
  "topic": "Spring WebFlux & Reactive",
  "items": [
   {
    "question": "Reactive programming là gì? Mono và Flux khác nhau thế nào?",
    "answer": "Reactive = lập trình bất đồng bộ, non-blocking, hướng luồng dữ liệu (data stream) theo chuẩn Reactive Streams. Spring WebFlux dựa trên Project Reactor.\n- Mono<T>: 0 hoặc 1 phần tử (ví dụ tìm 1 user theo id).\n- Flux<T>: 0..N phần tử (ví dụ stream nhiều message).\nCả hai đều là Publisher; dữ liệu chỉ thực sự chạy khi có subscriber ('nothing happens until you subscribe').\n\nĐiểm ghi bàn: chọn đúng Mono (0-1) vs Flux (0-N) theo bài toán và hiểu tính lazy (phải subscribe).",
    "examples": ["Mono<User> findUser(Long id);          // 0..1\nFlux<Message> streamMessages();        // 0..N\nMono.just(1).map(i -> i+1).subscribe(System.out::println);"]
   },
   {
    "question": "Spring MVC (Servlet) khác Spring WebFlux thế nào về mô hình luồng?",
    "answer": "Spring MVC: thread-per-request, blocking. Mỗi request chiếm 1 thread và thread đó BỊ CHẶN trong lúc chờ I/O (DB, HTTP). Nhiều kết nối chờ -> tốn nhiều thread.\nWebFlux: non-blocking, event-loop (Netty mặc định). Khi gặp I/O, thread được TRẢ LẠI ngay; khi dữ liệu sẵn sàng, một thread event-loop tiếp tục xử lý. Ít thread mà chịu tải đồng thời cao.\n\nĐiểm ghi bàn: 'MVC chặn thread khi chờ I/O; WebFlux nhả thread nhờ event-loop -> tiết kiệm thread ở tải cao'.",
    "examples": ["MVC:     request -> thread -> block(I/O) -> response\nWebFlux: request -> event-loop -> async(I/O) -> resume -> response"]
   },
   {
    "question": "Backpressure là gì? WebFlux xử lý ra sao?",
    "answer": "Backpressure: cơ chế để CONSUMER báo cho PRODUCER 'chậm lại, tôi xử lý không kịp'. Nếu producer phát nhanh hơn consumer tiêu thụ mà không có backpressure -> tràn bộ nhớ.\nReactive Streams giải quyết bằng cơ chế request(n): subscriber chủ động yêu cầu số phần tử nó kham nổi. Reactor có các toán tử như onBackpressureBuffer/Drop/Latest, limitRate để điều tiết.\n\nĐiểm ghi bàn: 'consumer điều khiển tốc độ qua request(n)', và đây là thứ Spring MVC KHÔNG có.",
    "examples": ["flux.limitRate(100)                 // chỉ xin 100 phần tử mỗi lần\n   .onBackpressureBuffer(1000)     // đệm khi nhanh quá\n   .subscribe(...);"]
   },
   {
    "question": "Năm 2025 khi nào nên dùng WebFlux, khi nào MVC + Virtual Threads?",
    "answer": "Với Virtual Threads (Project Loom, Java 21), Spring MVC + virtual threads đạt throughput gần reactive mà vẫn viết code tuần tự, tương thích JPA, @Transactional đúng, dễ debug -> mặc định tốt cho đa số app CRUD.\nWebFlux vẫn thắng ở: streaming (SSE/WebSocket số kết nối lớn), stack I/O reactive đầu-cuối (R2DBC, Reactive Mongo/Redis), cần backpressure thực sự, hệ event-driven (Kafka/RSocket).\n\nĐiểm ghi bàn: không nói 'WebFlux luôn nhanh hơn'; nêu virtual threads đã thay đổi lựa chọn mặc định, WebFlux dành cho niche streaming/reactive-stack.",
    "examples": ["// application.properties (Spring Boot 3.2+, Java 21)\nspring.threads.virtual.enabled=true   // MVC vẫn scale tốt, code blocking"]
   },
   {
    "question": "map vs flatMap trong Reactor khác nhau chỗ nào?",
    "answer": "map: biến đổi ĐỒNG BỘ 1->1 (T -> R), trả về giá trị thường.\nflatMap: biến đổi BẤT ĐỒNG BỘ, mỗi phần tử -> một Publisher (Mono/Flux) rồi 'trải phẳng' và gộp lại; dùng khi bước biến đổi là một lời gọi async (gọi DB/HTTP). flatMap không đảm bảo thứ tự; muốn giữ thứ tự dùng concatMap.\n\nĐiểm ghi bàn: 'gọi hàm trả về Mono/Flux thì phải flatMap, không phải map'; concatMap để giữ thứ tự.",
    "examples": ["Mono<Long> id = ...;\nid.flatMap(i -> userRepo.findById(i))   // findById trả Mono<User> -> flatMap\n  .map(User::getName);                  // biến đổi thuần -> map"]
   },
   {
    "question": "WebClient là gì? Xử lý lỗi trong reactive stream thế nào?",
    "answer": "WebClient: HTTP client non-blocking, reactive (thay cho RestTemplate blocking) trong WebFlux. Xử lý lỗi bằng toán tử: onErrorReturn (giá trị mặc định), onErrorResume (chuyển sang Publisher khác/fallback), retry/retryWhen, timeout, doOnError (log). Không dùng try-catch thông thường vì lỗi truyền qua signal onError.\n\nĐiểm ghi bàn: gọi tên WebClient (non-blocking) và biết onErrorResume/retryWhen thay cho try-catch.",
    "examples": ["webClient.get().uri(\"/api/x\").retrieve()\n  .bodyToMono(Dto.class)\n  .timeout(Duration.ofSeconds(2))\n  .retryWhen(Retry.backoff(3, Duration.ofMillis(200)))\n  .onErrorResume(e -> Mono.just(Dto.empty()));"]
   },
   {
    "question": "R2DBC là gì? Vì sao không dùng JPA/JDBC trong WebFlux?",
    "answer": "JDBC/JPA là API blocking — nếu dùng trong WebFlux sẽ chặn event-loop, mất hết lợi ích non-blocking. R2DBC (Reactive Relational Database Connectivity) là chuẩn truy cập DB quan hệ non-blocking, trả về Mono/Flux, giữ toàn bộ chuỗi reactive. Đổi lại R2DBC chưa mạnh bằng JPA (không lazy loading, không cascade phong phú, phải viết SQL rõ hơn).\n\nĐiểm ghi bàn: 'muốn reactive đầu-cuối phải thay JDBC bằng R2DBC; JPA blocking không hợp WebFlux'.",
    "examples": ["interface UserRepo extends ReactiveCrudRepository<User, Long> {\n  Flux<User> findByActiveTrue();   // trả Flux, non-blocking\n}"]
   },
   {
    "question": "Hai cách viết endpoint trong WebFlux: annotation vs functional?",
    "answer": "1) Annotated controller: @RestController + @GetMapping trả Mono/Flux — giống MVC, dễ chuyển đổi.\n2) Functional endpoints: RouterFunction (định tuyến) + HandlerFunction (xử lý) — khai báo route bằng code, gọn cho microservice nhỏ.\n\nĐiểm ghi bàn: nêu được cả hai và vai trò RouterFunction (map request) + HandlerFunction (xử lý, trả ServerResponse).",
    "examples": ["@Bean RouterFunction<ServerResponse> routes(UserHandler h){\n  return route(GET(\"/users/{id}\"), h::getUser)\n        .andRoute(GET(\"/users\"), h::list);\n}"]
   }
  ]
 },
 {
  "topic": "JVM, Memory & GC nâng cao",
  "items": [
   {
    "question": "Các vùng bộ nhớ của JVM? Stack khác Heap thế nào?",
    "answer": "Các vùng chính: Heap (đối tượng cấp phát động, GC quản lý), Stack (mỗi thread một stack, chứa frame: biến cục bộ, tham chiếu, primitive local), Metaspace (metadata của class — thay PermGen từ Java 8, nằm ở native memory), PC register, Native method stack.\n- Stack: cấp phát/thu hồi theo LIFO khi vào/ra method, mỗi thread riêng -> thread-safe tự nhiên; tràn -> StackOverflowError.\n- Heap: dùng chung mọi thread; hết -> OutOfMemoryError.\n\nĐiểm ghi bàn: 'biến cục bộ & tham chiếu nằm ở stack, đối tượng nằm ở heap; Metaspace ở native memory từ Java 8'.",
    "examples": ["void f(){\n  int x = 5;              // x nằm ở STACK\n  User u = new User();    // biến u (ref) ở STACK, object User ở HEAP\n}"]
   },
   {
    "question": "Heap được chia generation thế nào? Minor GC vs Major/Full GC?",
    "answer": "Heap chia Young Generation (Eden + 2 Survivor S0/S1) và Old Generation, dựa trên 'giả thuyết thế hệ': đa số object chết trẻ.\n- Object mới sinh ở Eden; khi Eden đầy -> Minor GC: dọn Young, object sống sót chuyển qua Survivor, tăng 'age'; đủ già thì lên Old (promotion).\n- Minor GC: nhanh, chỉ Young.\n- Major/Full GC: dọn cả Old (và Young), tốn thời gian, thường 'stop-the-world' lâu hơn; xảy ra khi Old đầy.\n\nĐiểm ghi bàn: nêu Eden/Survivor, khái niệm 'age' & promotion, và Minor nhanh còn Full GC nặng.",
    "examples": ["Young: [ Eden | S0 | S1 ]   -- Minor GC dọn ở đây\nOld:   [ ............... ]   -- Full GC (nặng) khi đầy"]
   },
   {
    "question": "So sánh các bộ GC: Serial, Parallel, G1, ZGC/Shenandoah?",
    "answer": "- Serial: 1 thread, stop-the-world, cho app nhỏ.\n- Parallel (Throughput): nhiều thread dọn, tối ưu throughput, pause dài hơn.\n- G1 (mặc định từ Java 9): chia heap thành REGION, ưu tiên dọn region nhiều rác trước ('Garbage-First'), nhắm mục tiêu pause qua -XX:MaxGCPauseMillis; hợp heap lớn.\n- ZGC / Shenandoah: latency cực thấp (pause ~1-5ms) nhờ concurrent + colored pointers; đổi lại tốn thêm bộ nhớ, hợp app cần độ trễ thấp và heap rất lớn.\n\nĐiểm ghi bàn: 'G1 = region + mục tiêu pause; ZGC = pause mili-giây cho heap lớn'.",
    "examples": ["java -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -Xmx4g App\njava -XX:+UseZGC -Xmx16g App    // low-latency"]
   },
   {
    "question": "Memory leak trong Java xảy ra thế nào (dù có GC)? Cách chẩn đoán?",
    "answer": "Có GC nhưng vẫn leak khi object KHÔNG còn cần nhưng VẪN bị tham chiếu -> GC không thu hồi được. Nguồn phổ biến: static collection phình mãi, listener/callback không gỡ đăng ký, ThreadLocal không remove, cache không giới hạn, key mutable trong HashMap.\nTriệu chứng: memory tăng dần, GC chạy càng nhiều nhưng giải phóng càng ít, cuối cùng OutOfMemoryError.\nChẩn đoán: bật -XX:+HeapDumpOnOutOfMemoryError, phân tích heap dump bằng VisualVM/Eclipse MAT/JFR, tìm 'dominator' giữ nhiều bộ nhớ.\n\nĐiểm ghi bàn: định nghĩa đúng 'còn tham chiếu nhưng không dùng', kể nguồn thường gặp và công cụ heap dump.",
    "examples": ["static final List<Object> CACHE = new ArrayList<>();\nvoid handle(Object o){ CACHE.add(o); }   // thêm mãi, không xóa -> leak"]
   },
   {
    "question": "Java Memory Model (JMM) và quan hệ happens-before là gì?",
    "answer": "JMM định nghĩa khi nào thay đổi của thread này ĐƯỢC THẤY bởi thread khác (visibility) và thứ tự (ordering), vì CPU/compiler có thể sắp xếp lại lệnh và cache riêng. 'happens-before': nếu A happens-before B thì kết quả của A đảm bảo thấy được ở B.\nCác nguồn tạo happens-before: giải phóng/thu lock (synchronized), ghi/đọc volatile, Thread.start()/join(), khởi tạo final field, các lớp java.util.concurrent.\nvolatile bảo đảm visibility + cấm reorder quanh nó nhưng KHÔNG bảo đảm atomic cho phép toán như i++.\n\nĐiểm ghi bàn: phân biệt visibility vs atomicity; volatile lo visibility, còn i++ cần synchronized/Atomic.",
    "examples": ["volatile boolean running = true;   // thread khác thấy được khi đổi false\n// nhưng: volatile int c; c++;  -> vẫn KHÔNG atomic (cần AtomicInteger)"]
   },
   {
    "question": "OutOfMemoryError có mấy loại thường gặp? Tune heap bằng cờ nào?",
    "answer": "Các dạng OOM phổ biến: 'Java heap space' (heap đầy — do leak hoặc heap nhỏ), 'GC overhead limit exceeded' (GC chạy quá nhiều mà giải phóng quá ít), 'Metaspace' (nạp quá nhiều class), 'unable to create new native thread' (hết thread OS).\nCờ tune: -Xms (heap khởi tạo), -Xmx (heap tối đa), -Xmn (kích thước Young), -XX:MetaspaceSize, -XX:+PrintGCDetails / -Xlog:gc để quan sát, -XX:+HeapDumpOnOutOfMemoryError để bắt lỗi.\n\nĐiểm ghi bàn: phân biệt heap OOM vs Metaspace OOM, và nêu -Xmx/-Xms + heap dump khi debug.",
    "examples": ["java -Xms512m -Xmx2g -XX:+HeapDumpOnOutOfMemoryError \\\n     -XX:HeapDumpPath=/tmp/dump.hprof -jar app.jar"]
   },
   {
    "question": "Object đủ điều kiện GC khi nào? Có ép GC chạy được không?",
    "answer": "Một object đủ điều kiện GC khi KHÔNG còn tham chiếu 'sống' nào tới nó từ GC roots (biến static, biến local đang trên stack, thread đang chạy...). Ví dụ gán null, ra khỏi scope, hoặc island of isolation (các object chỉ tham chiếu lẫn nhau nhưng không ai bên ngoài trỏ tới).\nSystem.gc() chỉ là GỢI Ý, JVM có thể bỏ qua — không nên dựa vào. finalize() đã deprecated; dùng try-with-resources/Cleaner để giải phóng tài nguyên.\n\nĐiểm ghi bàn: nói 'không còn reachable từ GC roots', System.gc() không đảm bảo, tránh finalize().",
    "examples": ["User u = new User();\nu = null;                 // object cũ giờ unreachable -> có thể bị GC\n// System.gc();           // chỉ gợi ý, đừng phụ thuộc"]
   }
  ]
 },
 {
  "topic": "Java IO & NIO",
  "items": [
   {
    "question": "Byte stream vs Character stream khác gì? Khi nào dùng loại nào?",
    "answer": "- Byte stream (InputStream/OutputStream, ví dụ FileInputStream): làm việc với dữ liệu nhị phân thô 8-bit — dùng cho ảnh, audio, file nhị phân.\n- Character stream (Reader/Writer, ví dụ FileReader): làm việc với ký tự Unicode 16-bit và TỰ XỬ LÝ ENCODING — dùng cho văn bản.\nOutputStreamWriter/InputStreamReader là 'cầu nối' chuyển byte<->char kèm charset.\n\nĐiểm ghi bàn: 'văn bản dùng Reader/Writer (đúng encoding), nhị phân dùng InputStream/OutputStream'.",
    "examples": ["// văn bản, chỉ định charset:\nnew BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));\n// nhị phân:\nnew FileInputStream(\"anh.png\");"]
   },
   {
    "question": "Vì sao cần Buffered stream? Đọc file vài GB theo dòng thế nào cho khỏi tràn RAM?",
    "answer": "BufferedReader/BufferedInputStream đệm dữ liệu (mặc định ~8KB) để giảm số lần chạm đĩa/mạng -> nhanh hơn nhiều so với đọc từng byte.\nĐọc file rất lớn: bọc BufferedReader quanh FileReader và dùng readLine() trong vòng lặp (stream từng dòng), buffer chỉ giữ một phần nhỏ nên không phụ thuộc kích thước file. KHÔNG đọc hết vào bộ nhớ (readAllBytes) với file vài GB.\n\nĐiểm ghi bàn: 'stream theo dòng bằng BufferedReader.readLine(), buffer nhỏ cố định -> an toàn bộ nhớ'.",
    "examples": ["try (var br = new BufferedReader(new FileReader(\"big.log\"))) {\n  String line;\n  while ((line = br.readLine()) != null) { process(line); }\n}"]
   },
   {
    "question": "try-with-resources là gì? Vì sao quan trọng với IO?",
    "answer": "try-with-resources (Java 7+) tự động đóng mọi tài nguyên implement AutoCloseable khi ra khỏi khối try, kể cả khi có exception — tránh rò rỉ file handle/kết nối. Nhiều tài nguyên đóng theo thứ tự ngược khai báo. Thay cho pattern finally { in.close(); } dài dòng và dễ quên.\n\nĐiểm ghi bàn: 'AutoCloseable + đóng tự động dù có lỗi', an toàn hơn finally thủ công.",
    "examples": ["try (var in = new FileInputStream(\"a\");\n     var out = new FileOutputStream(\"b\")) {\n  in.transferTo(out);\n}   // out rồi in tự đóng, kể cả khi lỗi"]
   },
   {
    "question": "Serialization là gì? transient và serialVersionUID để làm gì?",
    "answer": "Serialization: chuyển object thành chuỗi byte để lưu file/gửi qua mạng; deserialization dựng lại object. Class phải implement Serializable. Nếu trong object có tham chiếu tới object khác KHÔNG Serializable -> NotSerializableException lúc runtime.\n- transient: đánh dấu field KHÔNG được serialize (dữ liệu nhạy cảm/tạm như password, cache).\n- serialVersionUID: 'phiên bản' của class dùng để kiểm tra tương thích khi deserialize; đổi cấu trúc mà UID không khớp -> InvalidClassException.\n\nĐiểm ghi bàn: nêu Serializable, transient loại field khỏi luồng, và vai trò serialVersionUID.",
    "examples": ["class User implements Serializable {\n  private static final long serialVersionUID = 1L;\n  String name;\n  transient String password;   // KHÔNG được serialize\n}"]
   },
   {
    "question": "DataInputStream/DataOutputStream và ObjectStream khác gì?",
    "answer": "- DataOutputStream/DataInputStream: đọc/ghi các KIỂU NGUYÊN THỦY (int, double, boolean, UTF string) theo định dạng độc lập nền tảng (writeInt/readInt...). Dùng khi tự định nghĩa format nhị phân.\n- ObjectOutputStream/ObjectInputStream: serialize/deserialize cả OBJECT (dùng Serializable).\n\nĐiểm ghi bàn: 'Data* cho primitive, Object* cho cả object'.",
    "examples": ["try (var out = new DataOutputStream(new FileOutputStream(\"d\"))) {\n  out.writeInt(42); out.writeUTF(\"hi\");\n}"]
   },
   {
    "question": "Java NIO khác IO truyền thống thế nào (channel, buffer, selector)?",
    "answer": "IO cổ điển: stream-oriented, blocking, đọc/ghi từng byte/char. NIO (Java 4+) buffer-oriented + non-blocking:\n- Channel (FileChannel, SocketChannel...): kênh hai chiều truyền dữ liệu giữa buffer và nguồn.\n- Buffer (ByteBuffer...): vùng đệm để đọc/ghi theo khối, có các con trỏ position/limit/capacity, cần flip() để chuyển ghi->đọc.\n- Selector: cho phép 1 thread quản lý NHIỀU channel non-blocking -> hợp server nhiều kết nối đồng thời.\n\nĐiểm ghi bàn: 'NIO = channel + buffer + selector, non-blocking, 1 thread nhiều kết nối'.",
    "examples": ["ByteBuffer buf = ByteBuffer.allocate(1024);\nint n = channel.read(buf);   // ghi vào buffer\nbuf.flip();                  // chuyển sang chế độ đọc"]
   },
   {
    "question": "NIO.2 (Java 7): Path và Files dùng thế nào? Khi nào IO, khi nào NIO?",
    "answer": "NIO.2 thêm Path (đường dẫn) và Files (tiện ích thao tác file) hiện đại hơn lớp File cũ: Files.readAllLines, Files.write (kèm APPEND), Files.copy/move/delete, Files.lines() trả Stream lazy, walkFileTree để duyệt cây thư mục.\nKhi nào dùng gì: file đơn giản đọc/ghi tuần tự -> IO + buffered là đủ và dễ; server nhiều kết nối đồng thời / non-blocking -> NIO + Selector.\n\nĐiểm ghi bàn: gọi tên Path/Files, biết Files.lines() lazy, và tiêu chí chọn IO vs NIO theo tính đồng thời.",
    "examples": ["Path p = Path.of(\"data.txt\");\nList<String> lines = Files.readAllLines(p, StandardCharsets.UTF_8);\nFiles.write(p, List.of(\"new\"), StandardOpenOption.APPEND);\ntry (var s = Files.lines(p)) { s.filter(x -> !x.isBlank()).forEach(...); }"]
   }
  ]
 },
 {
  "topic": "OOP chuyên sâu & lớp Object",
  "items": [
   {
    "question": "4 tính chất OOP giải thích thế nào cho 'chất'?",
    "answer": "- Encapsulation (đóng gói): giấu trạng thái, chỉ lộ hành vi qua method; field private + getter/setter có kiểm soát -> bảo toàn invariant.\n- Inheritance (kế thừa): tái sử dụng và quan hệ 'is-a'; cẩn thận vì kế thừa tạo coupling chặt.\n- Polymorphism (đa hình): cùng lời gọi, hành vi khác nhau theo kiểu runtime (overriding) — dynamic dispatch.\n- Abstraction (trừu tượng): mô hình hóa cái cần thiết, ẩn chi tiết (abstract class/interface).\n\nĐiểm ghi bàn: gắn mỗi tính chất với lợi ích thực tế (invariant, tái dùng, thay thế linh hoạt, ẩn chi tiết), không đọc thuộc lòng.",
    "examples": ["List<Shape> shapes = List.of(new Circle(), new Square());\nfor (Shape s : shapes) s.draw();   // đa hình: mỗi shape draw() khác nhau"]
   },
   {
    "question": "Overloading vs Overriding khác nhau? Covariant return type là gì?",
    "answer": "- Overloading (nạp chồng): cùng tên, KHÁC danh sách tham số; quyết định lúc BIÊN DỊCH (static binding). Không phụ thuộc kiểu trả về.\n- Overriding (ghi đè): lớp con định nghĩa lại method của cha với CÙNG chữ ký; quyết định lúc RUNTIME (dynamic binding). Yêu cầu: không thu hẹp access modifier, không ném checked exception rộng hơn; nên gắn @Override.\n- Covariant return: method override được phép trả về KIỂU CON của kiểu trả về gốc.\n\nĐiểm ghi bàn: 'overloading = compile-time theo tham số; overriding = runtime theo object thực'.",
    "examples": ["class A { Object f(){...} }\nclass B extends A { @Override String f(){...} }  // covariant: String là con của Object"]
   },
   {
    "question": "Abstract class vs Interface — chọn cái nào? Java 8 thay đổi gì?",
    "answer": "- Abstract class: có state (field), constructor, method có thân; một lớp chỉ extends 1 abstract class -> dùng khi có quan hệ 'is-a' và chia sẻ state/hành vi chung.\n- Interface: hợp đồng hành vi; từ Java 8 có default & static method, Java 9 có private method; hằng số public static final; một lớp implements NHIỀU interface -> mô tả 'khả năng' (Comparable, Runnable).\nChọn interface khi cần đa kế thừa kiểu/khả năng; abstract class khi cần chia sẻ code + state.\n\nĐiểm ghi bàn: nêu 'multiple interface vs single abstract', và Java 8 default method giúp thêm method mà không phá bản cài cũ.",
    "examples": ["interface Payable { default double tax(){ return 0.1; } }  // Java 8 default\nabstract class Employee { protected String name; abstract double salary(); }"]
   },
   {
    "question": "Vì sao override equals() phải override hashCode()? Hợp đồng của chúng?",
    "answer": "Hợp đồng: nếu a.equals(b) == true thì a.hashCode() PHẢI bằng b.hashCode(). Nếu override equals mà quên hashCode, hai object 'bằng nhau' có thể rơi vào bucket khác nhau -> HashMap/HashSet hoạt động sai (không tìm thấy, trùng lặp).\nequals cần: phản xạ, đối xứng, bắc cầu, nhất quán, x.equals(null)==false. Nên dùng các field bất biến để tính hashCode.\n\nĐiểm ghi bàn: nêu đúng ràng buộc equals->hashCode và hậu quả với HashMap/HashSet.",
    "examples": ["@Override public boolean equals(Object o){\n  if(this==o) return true;\n  if(!(o instanceof User u)) return false;\n  return Objects.equals(id, u.id);\n}\n@Override public int hashCode(){ return Objects.hash(id); }"]
   },
   {
    "question": "Các method của lớp Object cần nắm? clone() shallow vs deep?",
    "answer": "Object là gốc mọi class, cung cấp: equals(), hashCode(), toString(), getClass(), clone(), finalize() (deprecated), wait()/notify()/notifyAll() (đồng bộ thread).\nclone(): mặc định là SHALLOW copy — sao chép giá trị field, nhưng field tham chiếu vẫn TRỎ CHUNG object cũ. Muốn DEEP copy phải tự clone luôn các object con (hoặc dùng copy constructor/serialization). Cần implement Cloneable nếu không sẽ CloneNotSupportedException.\n\nĐiểm ghi bàn: liệt kê được nhóm method Object và phân biệt shallow (dùng chung tham chiếu) vs deep copy.",
    "examples": ["// shallow: this.list và bản clone dùng chung cùng 1 List\n// deep: clone.list = new ArrayList<>(this.list);"]
   },
   {
    "question": "SOLID là gì? Ưu tiên composition over inheritance vì sao?",
    "answer": "SOLID: Single Responsibility (một lý do thay đổi), Open/Closed (mở để mở rộng, đóng để sửa), Liskov (con thay được cha không phá hành vi), Interface Segregation (interface nhỏ, chuyên biệt), Dependency Inversion (phụ thuộc abstraction, không phụ thuộc cụ thể).\nComposition over inheritance: kế thừa tạo coupling chặt và dễ vỡ khi cha đổi; 'has-a' (chứa và ủy quyền) linh hoạt hơn, đổi hành vi lúc runtime, tránh 'fragile base class'.\n\nĐiểm ghi bàn: giải thích ngắn từng chữ SOLID và lý do composition linh hoạt hơn inheritance.",
    "examples": ["// thay vì: class Car extends Engine (sai quan hệ)\nclass Car { private final Engine engine; }   // has-a, ủy quyền"]
   }
  ]
 },
 {
  "topic": "System Design & Behavioral (Java backend)",
  "items": [
   {
    "question": "Trả lời câu hành vi (behavioral) theo cấu trúc nào cho gọn?",
    "answer": "Dùng STAR: Situation (bối cảnh) - Task (nhiệm vụ của bạn) - Action (bạn ĐÃ LÀM GÌ, cụ thể, dùng 'tôi') - Result (kết quả đo được, số liệu nếu có). Chọn ví dụ thật, nêu vai trò cá nhân rõ ràng, rút ra bài học. Với câu 'điểm yếu' -> nêu điểm yếu thật + cách bạn đang cải thiện. Với xung đột -> tập trung cách giải quyết, không đổ lỗi.\n\nĐiểm ghi bàn: kể chuyện có cấu trúc STAR, có KẾT QUẢ đo được, thể hiện tự nhận thức và tinh thần hợp tác.",
    "examples": ["S: dịch vụ thanh toán hay timeout giờ cao điểm.\nT: tôi phụ trách giảm lỗi.\nA: thêm cache + circuit breaker + tối ưu N+1 query.\nR: p99 giảm từ 1.2s xuống 300ms, lỗi 5xx giảm 90%."]
   },
   {
    "question": "Thiết kế REST API tốt cần lưu ý gì?",
    "answer": "- Đặt resource theo danh từ số nhiều (/users/{id}/orders), dùng đúng HTTP method (GET đọc, POST tạo, PUT/PATCH sửa, DELETE xóa) và status code (200/201/204/400/401/403/404/409/422/500).\n- Versioning (/v1), phân trang (page/size hoặc cursor), lọc/sắp xếp qua query param.\n- Idempotency cho POST nhạy cảm (Idempotency-Key) để retry an toàn.\n- Nhất quán format lỗi, validation, HATEOAS nếu cần; bảo mật bằng auth (JWT/OAuth2), rate limiting.\n\nĐiểm ghi bàn: dùng đúng method/status, phân trang, và nhắc idempotency cho thao tác ghi.",
    "examples": ["POST /v1/payments\nIdempotency-Key: 6b1f...   // retry cùng key -> không tạo trùng giao dịch\n201 Created + Location: /v1/payments/123"]
   },
   {
    "question": "Ý tưởng scale một service Java backend chịu tải lớn?",
    "answer": "Tầng lớp thường bàn: \n- Stateless service + horizontal scaling sau load balancer; đẩy session ra Redis.\n- Cache nhiều tầng (local + Redis) cho dữ liệu đọc nhiều; đặt TTL, chống cache stampede.\n- DB: index đúng, đọc từ read-replica, connection pool (HikariCP), phân trang; khi cực lớn thì sharding.\n- Bất đồng bộ hóa việc nặng qua message queue (Kafka/RabbitMQ) -> giảm coupling, chịu peak.\n- Resilience: timeout, retry có backoff, circuit breaker, bulkhead, rate limit.\n- Quan sát: metrics, log tập trung, distributed tracing.\n\nĐiểm ghi bàn: nêu 'stateless + cache + queue + read replica + resilience + observability' theo tầng, không nói chung chung 'thêm server'.",
    "examples": ["Client -> LB -> [N stateless pods] -> Redis cache -> DB (primary + replicas)\n                         └-> Kafka -> worker xử lý việc nặng"]
   },
   {
    "question": "Idempotency là gì và vì sao quan trọng khi retry?",
    "answer": "Idempotent: thực hiện nhiều lần cho KẾT QUẢ như một lần (GET, PUT, DELETE vốn idempotent; POST thì không). Khi client timeout và retry, nếu thao tác không idempotent có thể tạo TRÙNG (double charge). Giải pháp: Idempotency-Key lưu lại request đã xử lý, hoặc unique constraint ở DB, hoặc thiết kế 'upsert' theo khóa nghiệp vụ.\n\nĐiểm ghi bàn: định nghĩa idempotent, chỉ ra rủi ro double-processing khi retry và cách chống bằng key/unique constraint.",
    "examples": ["-- chống trùng bằng ràng buộc DB\nCREATE UNIQUE INDEX ux_payment_ref ON payments(client_ref);"]
   },
   {
    "question": "Monolith vs Microservices — chọn theo tiêu chí nào?",
    "answer": "Monolith: đơn giản triển khai, transaction dễ, latency thấp giữa module; hợp team nhỏ/giai đoạn đầu. Nhược: khó scale từng phần, deploy toàn khối.\nMicroservices: scale/độc lập triển khai từng service, cô lập lỗi; nhưng phức tạp về mạng, dữ liệu phân tán (không còn transaction ACID xuyên service -> saga/eventual consistency), cần service discovery, gateway, tracing.\nLời khuyên phổ biến: bắt đầu monolith module hóa tốt, tách microservice khi có lý do thật (quy mô, ranh giới team/domain rõ).\n\nĐiểm ghi bàn: không thần thánh hóa microservice; nêu chi phí phân tán (saga, eventual consistency) và 'monolith-first'.",
    "examples": ["Saga: Order -> (event) -> Payment -> (event) -> Inventory\nMỗi bước có bù trừ (compensating tx) thay cho 1 transaction ACID lớn."]
   },
   {
    "question": "Vài câu hành vi hay gặp và hướng trả lời?",
    "answer": "- 'Kể lần bạn xử lý sự cố production': STAR, nhấn cách khoanh vùng (log/metrics/tracing), khắc phục tạm rồi fix gốc, hậu kiểm (postmortem không đổ lỗi).\n- 'Bất đồng với đồng nghiệp/leader': tập trung dữ liệu & mục tiêu chung, tôn trọng quyết định cuối, kết quả.\n- 'Vì sao rời công ty cũ / vì sao chọn chúng tôi': hướng tích cực (tìm thử thách/phù hợp), không nói xấu.\n- 'Deadline gấp': ưu tiên (impact/urgency), cắt scope, giao tiếp sớm với stakeholder.\n\nĐiểm ghi bàn: luôn có cấu trúc, có kết quả, thái độ cầu thị và hợp tác; tránh nói xấu công ty cũ.",
    "examples": ["Sự cố: 'tôi xem dashboard -> thấy p99 tăng -> tracing chỉ ra DB pool cạn -> tăng pool tạm thời -> sau đó fix N+1 -> viết postmortem'."]
   }
  ]
 },
 {
  "topic": "Kafka & Messaging",
  "items": [
   {
    "question": "Kafka là gì? Topic, Partition, Offset liên quan thế nào?",
    "answer": "Kafka là nền tảng streaming/log phân tán, bền, thông lượng cao. \n- Topic: dòng message theo chủ đề.\n- Partition: mỗi topic chia thành nhiều partition — đơn vị SONG SONG và LƯU TRỮ. Message trong một partition có thứ tự và bất biến (append-only log).\n- Offset: số thứ tự tăng dần của message trong một partition; consumer 'commit offset' để nhớ đã đọc tới đâu.\n\nThứ tự chỉ được đảm bảo TRONG một partition, không phải toàn topic. Muốn giữ thứ tự theo nghiệp vụ, gửi các message liên quan cùng một KEY để về cùng partition (partial ordering).\n\nĐiểm ghi bàn: 'partition là đơn vị song song + đảm bảo thứ tự cục bộ; cùng key -> cùng partition -> giữ thứ tự'.",
    "examples": ["// cùng key 'user-42' -> luôn về 1 partition -> giữ thứ tự cho user đó\nproducer.send(new ProducerRecord<>(\"orders\", \"user-42\", payload));"]
   },
   {
    "question": "Consumer Group là gì? Vì sao vừa làm 'queue' vừa làm 'pub/sub'?",
    "answer": "Consumer Group: tập consumer cùng một group.id chia nhau đọc các partition của topic — mỗi partition chỉ được MỘT consumer trong group đọc tại một thời điểm (scale ngang tối đa = số partition).\n- Nhiều consumer CÙNG group => chia tải như hàng đợi (queue): mỗi message xử lý một lần trong group.\n- Nhiều group KHÁC nhau đọc cùng topic => mỗi group nhận đủ toàn bộ stream (pub/sub).\n\nĐiểm ghi bàn: 'trong 1 group chia partition (queue); nhiều group nhận độc lập (pub/sub)'; và 'số consumer hữu ích tối đa = số partition'.",
    "examples": ["Topic 3 partition:\n GroupA: 3 consumer -> mỗi consumer 1 partition (chia tải)\n GroupB: đọc lại toàn bộ để phân tích (pub/sub, độc lập offset)"]
   },
   {
    "question": "Rebalance xảy ra khi nào và gây vấn đề gì?",
    "answer": "Rebalance: group coordinator phân bổ lại partition cho các consumer khi có consumer JOIN/LEAVE/crash, hoặc khi consumer không poll kịp trong max.poll.interval.ms (bị coi là chết). Trong lúc rebalance, consumer tạm dừng xử lý ('stop-the-world' của group) -> tăng lag.\nGiảm tác động: xử lý nhanh trong vòng poll (hoặc tăng max.poll.interval.ms / giảm max.poll.records), dùng CooperativeStickyAssignor để giảm việc di chuyển partition, tránh xử lý blocking quá lâu.\n\nĐiểm ghi bàn: nêu nguyên nhân (join/leave/poll trễ) và cách giảm (sticky assignor, chỉnh poll).",
    "examples": ["// giảm rebalance do xử lý chậm:\nmax.poll.records=100\nmax.poll.interval.ms=300000\npartition.assignment.strategy=CooperativeStickyAssignor"]
   },
   {
    "question": "Tham số acks (0/1/all) đánh đổi gì?",
    "answer": "acks kiểm soát độ bền vs độ trễ khi producer ghi:\n- acks=0: không chờ phản hồi — nhanh nhất, dễ mất dữ liệu.\n- acks=1: chờ LEADER ghi xong — mất dữ liệu nếu leader chết trước khi replica kịp copy.\n- acks=all (-1): chờ toàn bộ ISR xác nhận — bền nhất, kết hợp min.insync.replicas để đảm bảo đủ bản sao.\n\nĐiểm ghi bàn: 'acks=all + min.insync.replicas>=2 cho độ bền cao; acks=0/1 nhanh hơn nhưng rủi ro mất dữ liệu'.",
    "examples": ["acks=all\nmin.insync.replicas=2   // cần >=2 replica in-sync mới ghi thành công"]
   },
   {
    "question": "ISR là gì? Vì sao quan trọng với độ bền?",
    "answer": "ISR (In-Sync Replicas): tập các replica đang theo kịp leader. Ghi với acks=all chỉ thành công khi đủ số ISR (>= min.insync.replicas) xác nhận. Nếu số replica in-sync tụt dưới ngưỡng, partition có thể tạm không nhận ghi (ưu tiên nhất quán/độ bền hơn khả dụng). Khi leader chết, một replica trong ISR được bầu làm leader mới.\n\nĐiểm ghi bàn: 'ISR + min.insync.replicas quyết định vừa đủ bền vừa còn khả dụng; leader mới bầu từ ISR'.",
    "examples": ["replication.factor=3, min.insync.replicas=2\n-> chịu được 1 broker chết mà vẫn ghi được (acks=all)"]
   },
   {
    "question": "Idempotent Producer và Exactly-Once Semantics (EOS) khác nhau thế nào?",
    "answer": "Idempotent producer (enable.idempotence=true): broker gán PID + sequence number theo partition, phát hiện và bỏ bản ghi TRÙNG khi producer retry -> đảm bảo exactly-once khi GHI trên MỖI partition. Nhưng KHÔNG tự bảo đảm end-to-end.\nEOS end-to-end: cần thêm Transactional API — producer ghi message ĐẦU RA và commit OFFSET tiêu thụ trong CÙNG một transaction (nguyên tử); lỗi thì rollback cả hai. Đảm bảo mẫu 'consume-process-produce' không trùng, không mất.\n\nĐiểm ghi bàn: 'idempotence chống trùng khi retry (per-partition); EOS thật cần transaction gộp output + offset'.",
    "examples": ["producer.initTransactions();\nproducer.beginTransaction();\nproducer.send(outRecord);\nproducer.sendOffsetsToTransaction(offsets, groupMeta);\nproducer.commitTransaction();   // output + offset commit nguyên tử"]
   },
   {
    "question": "Xử lý message lỗi thế nào (retry, DLQ)?",
    "answer": "Mẫu phổ biến: retry có giới hạn (retry topic với backoff tăng dần), nếu vẫn lỗi thì đẩy sang Dead Letter Queue (DLQ) để không chặn partition và điều tra sau. Cần idempotent consumer (xử lý lại một message không gây tác dụng phụ trùng — vd upsert theo khóa nghiệp vụ) vì Kafka mặc định là at-least-once. Tránh retry vô hạn tại chỗ (block partition -> lag toàn bộ).\n\nĐiểm ghi bàn: 'retry topic + DLQ, consumer idempotent, không block partition'.",
    "examples": ["Spring Kafka:\n@RetryableTopic(attempts=\"4\", backoff=@Backoff(delay=1000, multiplier=2.0))\n@KafkaListener(topics=\"orders\")\nvoid handle(Order o){ ... }   // hết retry -> tự vào orders-dlt"]
   },
   {
    "question": "Log compaction và tombstone là gì?",
    "answer": "Log compaction: thay vì xóa theo thời gian, Kafka giữ lại BẢN GHI MỚI NHẤT cho mỗi key (như một 'changelog'/snapshot trạng thái). Hợp cho topic lưu trạng thái mới nhất (vd cấu hình, hồ sơ). Tombstone: message có key nhưng value = null -> báo 'xóa' key đó; sau delete.retention.ms, mọi bản ghi cũ của key bị dọn.\n\nĐiểm ghi bàn: 'compaction giữ giá trị mới nhất theo key; tombstone (value null) để xóa key'.",
    "examples": ["cleanup.policy=compact\n// gửi tombstone để xóa:\nproducer.send(new ProducerRecord<>(\"config\", \"key1\", null));"]
   },
   {
    "question": "Khi nào dùng Kafka, khi nào dùng RabbitMQ?",
    "answer": "Kafka: log phân tán, thông lượng cực cao, lưu message theo thời gian (replay được bằng cách tua offset), hợp event streaming, event sourcing, pipeline dữ liệu lớn, nhiều consumer group đọc lại.\nRabbitMQ: message broker truyền thống (AMQP), routing linh hoạt (exchange/queue/binding), phù hợp task queue, RPC, khi cần định tuyến phức tạp và message thường bị xóa sau khi ack.\n\nĐiểm ghi bàn: 'Kafka = stream/replay, throughput cao; RabbitMQ = routing linh hoạt, task queue'.",
    "examples": ["Kafka: 'ghi log click 100k msg/s, nhiều team đọc lại để phân tích'\nRabbitMQ: 'gửi email/xử lý job với routing theo loại, retry, priority queue'"]
   }
  ]
 },
 {
  "topic": "Redis & Caching nâng cao",
  "items": [
   {
    "question": "Cache-Aside (Lazy Loading) hoạt động thế nào? Lưu ý khi ghi?",
    "answer": "Cache-Aside: ứng dụng đọc CACHE trước; miss thì đọc DB rồi ghi kết quả vào cache (có TTL). Chỉ cache dữ liệu thực sự được yêu cầu -> tiết kiệm. Nhược: lần miss đầu tốn latency, và rủi ro thundering herd khi nhiều request cùng miss.\nLưu ý QUAN TRỌNG khi ghi/cập nhật: nên XÓA key (DELETE/invalidate) chứ không SET giá trị mới, để tránh race condition ghi đè bằng dữ liệu cũ (một request khác đang đọc bản cũ). Lần đọc kế tiếp sẽ nạp lại từ DB.\n\nĐiểm ghi bàn: 'đọc cache trước, miss thì nạp DB + set cache; khi update thì invalidate (delete) key, không set'.",
    "examples": ["v = redis.get(key);\nif (v == null) { v = db.load(id); redis.set(key, v, ttl); }\n// khi update DB:\ndb.update(id); redis.del(key);   // xóa, KHÔNG set giá trị mới"]
   },
   {
    "question": "Phân biệt Cache-Aside, Write-Through, Write-Back?",
    "answer": "- Cache-Aside: app tự quản; ghi thì cập nhật DB rồi invalidate cache. Linh hoạt, phổ biến nhất.\n- Write-Through: ghi ĐỒNG THỜI vào cache và DB -> cache luôn nhất quán, nhưng mỗi ghi chậm hơn và có thể cache cả dữ liệu không được đọc.\n- Write-Back (Write-Behind): ghi vào cache trước, rồi BẤT ĐỒNG BỘ flush xuống DB -> ghi nhanh nhưng rủi ro mất dữ liệu nếu cache chết trước khi flush.\n\nĐiểm ghi bàn: nêu đánh đổi nhất quán vs tốc độ; write-back nhanh nhất nhưng rủi ro mất dữ liệu.",
    "examples": ["Write-Through: set(cache) + write(DB) cùng lúc\nWrite-Back:   set(cache) -> hàng đợi -> flush DB sau (async)"]
   },
   {
    "question": "Các eviction policy của Redis? Chọn thế nào?",
    "answer": "Redis có: noeviction (từ chối ghi khi đầy), allkeys-lru, volatile-lru, allkeys-lfu, volatile-lfu, allkeys-random, volatile-random, volatile-ttl. 'volatile-*' chỉ áp cho key có TTL; 'allkeys-*' áp cho mọi key.\n- LRU: bỏ key lâu chưa dùng nhất — hợp cache đọc trộn đều.\n- LFU (từ Redis 4.0): bỏ key ít được dùng nhất — hợp workload lệch (hot key, phân bố Zipf).\n- volatile-ttl: bỏ key sắp hết hạn nhất.\nMặc định khuyên: allkeys-lru cho cache thuần, allkeys-lfu cho hot-set lệch. Nếu noeviction mà đầy -> lệnh ghi lỗi.\n\nĐiểm ghi bàn: phân biệt allkeys vs volatile, LRU vs LFU, và cảnh báo noeviction gây lỗi ghi.",
    "examples": ["maxmemory 2gb\nmaxmemory-policy allkeys-lru   // cache thuần\n# hot-key nhiều: allkeys-lfu"]
   },
   {
    "question": "Cache stampede (thundering herd) là gì? Cách chống?",
    "answer": "Cache stampede: một key nóng hết hạn cùng lúc -> hàng loạt request đồng thời miss và dồn xuống DB, gây quá tải. Cách chống:\n- Locking / single-flight: chỉ MỘT request được tính lại (SETNX làm khóa ngắn), số còn lại chờ hoặc dùng giá trị cũ.\n- Thêm JITTER vào TTL (ngẫu nhiên hóa) để các key không hết hạn cùng một giây.\n- Probabilistic early refresh (XFetch): làm mới sớm trước khi hết hạn theo xác suất.\n- Fallback + circuit breaker khi Redis chết để không đè DB.\n\nĐiểm ghi bàn: kể được 'single-flight lock + TTL jitter + early refresh'.",
    "examples": ["// single-flight bằng SETNX:\nif (redis.setnx(\"lock:\"+key, 1, 5s)) { v = db.load(); redis.set(key, v, ttl); redis.del(\"lock:\"+key); }\nelse { sleep(50ms); v = redis.get(key); }   // chờ người kia nạp"]
   },
   {
    "question": "TTL nên đặt bao nhiêu? Vì sao cần jitter?",
    "answer": "TTL đặt theo mức độ thay đổi của dữ liệu: hồ sơ user ~1 giờ, giá sản phẩm ~5 phút, session ~30 phút; điểm khởi đầu phổ biến 5-60 phút, chỉnh theo độ biến động. Cần JITTER (cộng ngẫu nhiên vào TTL) vì nếu seed cache hàng loạt với cùng TTL, chúng hết hạn cùng lúc -> tự tạo stampede theo hẹn giờ.\n\nĐiểm ghi bàn: 'TTL theo độ biến động dữ liệu + jitter để tránh đồng loạt hết hạn'.",
    "examples": ["ttl = base + random(0, base*0.2);   // jitter 20%\nredis.set(key, v, ttl);"]
   },
   {
    "question": "RDB và AOF khác nhau thế nào (persistence)?",
    "answer": "- RDB: snapshot toàn bộ dữ liệu tại thời điểm -> file nhỏ, restore nhanh, nhưng mất dữ liệu kể từ snapshot gần nhất khi crash.\n- AOF (Append Only File): ghi lại mọi lệnh ghi -> bền hơn (với appendfsync everysec mất tối đa ~1 giây), nhưng file lớn hơn, restore chậm hơn.\nThực tế nhiều hệ dùng CẢ HAI để cân bằng. Không bật gì -> mất sạch khi restart.\n\nĐiểm ghi bàn: 'RDB snapshot (nhanh, mất nhiều hơn) vs AOF log (bền, mất ~1s); production thường dùng cả hai'.",
    "examples": ["save 900 1        # RDB snapshot\nappendonly yes\nappendfsync everysec   # AOF: mất tối đa ~1 giây"]
   },
   {
    "question": "Redis vs Memcached — chọn cái nào?",
    "answer": "Redis: nhiều kiểu dữ liệu (string, hash, list, set, sorted set, stream, bitmap), có persistence, replication, pub/sub, script Lua, atomic op phong phú -> hợp leaderboard (sorted set), queue (list), object (hash), rate limit, session.\nMemcached: chỉ key-value đơn giản trong RAM, đa luồng nên scale tốt trên nhiều core cho get/set thuần.\nChọn Redis khi cần cấu trúc dữ liệu/persistence/pub-sub; Memcached khi chỉ cần cache get/set đơn giản, tối đa throughput đa nhân.\n\nĐiểm ghi bàn: 'Redis giàu tính năng + data structure; Memcached đơn giản, đa luồng cho get/set thuần'.",
    "examples": ["ZADD leaderboard 100 \"alice\"   # sorted set - Redis riêng có\nHSET user:1 name \"An\" age 20   # hash lưu object"]
   },
   {
    "question": "Scale Redis: replication, Sentinel, Cluster khác nhau gì?",
    "answer": "- Replication: master-replica, replica đọc (read scaling). BẤT ĐỒNG BỘ mặc định -> có thể trễ (lag) giữa master và replica (đọc replica có thể thấy dữ liệu cũ).\n- Sentinel: giám sát + tự động failover (bầu master mới) -> high availability.\n- Cluster: sharding dữ liệu theo hash slot (16384 slot) trên nhiều node -> scale ngang vượt RAM một máy.\nKhi working set vượt RAM: scale up (thêm RAM), scale out (Cluster), giảm TTL key ít giá trị, hoặc cache chọn lọc hơn; theo dõi evicted_keys và hit rate (>80%).\n\nĐiểm ghi bàn: 'replication=read scale (async lag), Sentinel=HA/failover, Cluster=sharding'.",
    "examples": ["redis-cli info stats | grep evicted_keys   # theo dõi eviction\n# hit rate mục tiêu > 80%"]
   },
   {
    "question": "Vì sao Redis nhanh dù chủ yếu đơn luồng cho lệnh?",
    "answer": "Redis giữ dữ liệu trong RAM, cấu trúc dữ liệu tối ưu, và xử lý lệnh trên một luồng chính -> KHÔNG cần khóa/đồng bộ phức tạp, mỗi lệnh atomic tự nhiên, tránh chi phí context switch/lock contention. Dùng I/O multiplexing (event loop) để phục vụ nhiều kết nối. (Redis 6+ có I/O threads cho phần đọc/ghi socket, nhưng thực thi lệnh vẫn tuần tự.)\n\nĐiểm ghi bàn: 'in-memory + đơn luồng thực thi lệnh -> atomic, không lock; event loop cho nhiều kết nối'. Hệ quả: tránh lệnh O(n) nặng (KEYS *) làm nghẽn cả server; dùng SCAN.",
    "examples": ["// tránh: KEYS user:*   (O(n), block server)\n// dùng:  SCAN 0 MATCH user:* COUNT 100   (lặp từng phần)"]
   }
  ]
 },
 {
  "topic": "Testing nâng cao (Testcontainers, WireMock)",
  "items": [
   {
    "question": "Vì sao dùng Testcontainers thay cho H2 in-memory khi test?",
    "answer": "Testcontainers khởi chạy DB/dịch vụ THẬT (Postgres, MySQL, Mongo, Kafka, Redis...) trong Docker container ngay trong test -> integration test sát production. H2 in-memory tuy nhanh nhưng hành vi KHÁC DB thật (kiểu dữ liệu, SQL dialect, index, function) nên có thể 'xanh' ở test mà lỗi ở production. Testcontainers tự dọn container qua JVM shutdown hook (không cần tự stop).\n\nĐiểm ghi bàn: 'test trên DB thật qua Docker -> tránh sai khác dialect của H2; container tự dọn khi JVM tắt'.",
    "examples": ["@Testcontainers\nclass RepoTest {\n  @Container static PostgreSQLContainer<?> db = new PostgreSQLContainer<>(\"postgres:16\");\n  @DynamicPropertySource static void props(DynamicPropertyRegistry r){\n    r.add(\"spring.datasource.url\", db::getJdbcUrl);\n  }\n}"]
   },
   {
    "question": "WireMock dùng để làm gì trong integration test?",
    "answer": "WireMock giả lập (mock/stub) API bên NGOÀI (third-party) bằng một HTTP server thật trả về response định sẵn -> test không cần gọi dịch vụ thật (email, payment...), ổn định và lặp lại được. Quy trình: (1) start WireMock server, (2) khai báo stub map request->response, (3) trỏ base URL của app sang địa chỉ WireMock (thường qua @DynamicPropertySource vì port ngẫu nhiên).\n\nĐiểm ghi bàn: 'mô phỏng HTTP dependency bằng server thật, không gọi API thật, override base URL sang WireMock'.",
    "examples": ["stubFor(get(urlEqualTo(\"/api/user/1\"))\n  .willReturn(okJson(\"{\\\"id\\\":1,\\\"name\\\":\\\"An\\\"}\")));\n// verify:\nverify(getRequestedFor(urlEqualTo(\"/api/user/1\")));"]
   },
   {
    "question": "Vì sao nên dùng port ngẫu nhiên và mỗi service một WireMock riêng?",
    "answer": "Port ngẫu nhiên (RANDOM_PORT với @SpringBootTest, hoặc WireMock port=0): tránh xung đột cổng khi chạy song song trong CI/CD; đổi lại phải override base URL ĐỘNG sau khi biết port (qua @DynamicPropertySource / ApplicationContextInitializer).\nMỗi external service một WireMock riêng: nếu dùng chung một server cho nhiều service, bạn không thể mô phỏng 'service A down (500) trong khi service B up' cùng lúc -> xung đột cấu hình. Tách riêng để độc lập tình huống.\n\nĐiểm ghi bàn: 'random port + override động; một WireMock cho mỗi dependency để tránh xung đột stub'.",
    "examples": ["@SpringBootTest(webEnvironment = RANDOM_PORT)\n// WireMock:\nWireMockServer wm = new WireMockServer(0);  // 0 = random port\nwm.start();  int port = wm.port();"]
   },
   {
    "question": "Slice test (@WebMvcTest/@DataJpaTest) khác @SpringBootTest thế nào?",
    "answer": "- @SpringBootTest: nạp TOÀN BỘ ApplicationContext -> integration test đầy đủ (controller->service->repo->DB), nặng và chậm hơn.\n- Slice test chỉ nạp một 'lát': @WebMvcTest (chỉ tầng web + MockMvc, mock service), @DataJpaTest (chỉ JPA/repository + DB test, mặc định rollback mỗi test), @JsonTest, @RestClientTest.\nKim tự tháp test: nhiều unit test nhanh (Mockito) ở đáy, ít integration test ở đỉnh.\n\nĐiểm ghi bàn: 'slice test nhẹ và tập trung; @SpringBootTest cho integration đầy đủ; tuân kim tự tháp test'.",
    "examples": ["@WebMvcTest(UserController.class)\nclass Web { @Autowired MockMvc mvc; @MockBean UserService svc; }\n@DataJpaTest\nclass Repo { @Autowired UserRepository repo; }  // rollback tự động"]
   },
   {
    "question": "Kịch bản E2E kinh điển kết hợp Testcontainers + WireMock?",
    "answer": "Luồng đăng ký user: POST /api/register -> app LƯU user vào Postgres THẬT (Testcontainers) -> app GỌI email service ngoài (được WireMock giả lập) -> trả 201. Test xác minh toàn bộ chuỗi controller->service->repo->DB->external->response: DB thật kiểm tra lưu đúng, WireMock kiểm tra app gọi đúng endpoint/payload (verify), không đụng dịch vụ email thật.\n\nĐiểm ghi bàn: mô tả được 'DB thật qua Testcontainers + dependency ngoài mock bằng WireMock' trong một luồng đầy đủ.",
    "examples": ["given().body(req).post(\"/api/register\").then().statusCode(201);\nassertThat(userRepo.count()).isEqualTo(1);        // DB thật\nverify(postRequestedFor(urlEqualTo(\"/email/send\"))); // gọi đúng external"]
   },
   {
    "question": "Chọn client test: MockMvc, WebTestClient hay RestAssured?",
    "answer": "- MockMvc: test tầng web KHÔNG cần server thật (nhanh), hợp @WebMvcTest.\n- WebTestClient: fluent API, chạy được cả MVC lẫn WebFlux, test được response reactive/streaming; dùng được với server thật (bindToServer) hoặc context.\n- RestAssured: cú pháp BDD (given/when/then), mạnh cho contract/E2E nhiều service, nhưng cần app chạy trên cổng thật.\n\nĐiểm ghi bàn: 'MockMvc cho slice web nhanh; WebTestClient cho reactive/fluent; RestAssured cho E2E qua cổng thật'.",
    "examples": ["mvc.perform(get(\"/users/1\")).andExpect(status().isOk());\nwebTestClient.get().uri(\"/users/1\").exchange().expectStatus().isOk();\ngiven().when().get(\"/users/1\").then().statusCode(200);"]
   }
  ]
 },
 {
  "topic": "Thuật toán theo Pattern (LeetCode)",
  "items": [
   {
    "question": "Vì sao nên học theo pattern thay vì cày ngẫu nhiên 500 bài?",
    "answer": "Mỗi pattern là một 'khuôn' tư duy mở khóa hàng chục bài tương tự; nhận diện pattern giúp tiếp cận bài mới bằng logic quen thuộc, học nhanh hơn, đỡ kiệt sức. Khoảng 15 pattern lõi phủ ~90% câu hỏi phỏng vấn. Cách luyện: mỗi pattern 3-5 bài để tạo phản xạ nhận diện (hơn 7 bài là lợi ích giảm dần), sau đó trộn pattern để mô phỏng áp lực thật.\n\nĐiểm ghi bàn: 'nhận diện pattern -> chọn kỹ thuật -> nêu độ phức tạp'; luyện 3-5 bài/pattern rồi trộn.",
    "examples": ["Thứ tự học gợi ý: Two Pointers -> Sliding Window -> Binary Search -> BFS/DFS -> Backtracking -> DP (dành hẳn 1 tuần) -> Heap/Top-K, Union-Find, Trie, Topo sort, Monotonic Stack."]
   },
   {
    "question": "Two Pointers: khi nào dùng, dấu hiệu nhận biết?",
    "answer": "Hai con trỏ quét mảng/list từ hai đầu hoặc cách nhau cố định. Dùng cho: mảng ĐÃ SẮP XẾP tìm cặp tổng, kiểm tra palindrome, loại trùng tại chỗ, phân hoạch (partition), hoặc phát hiện chu trình trong linked list (fast & slow). Thường biến O(n^2) (hai vòng lồng) thành O(n).\nDấu hiệu: 'mảng sắp xếp + tìm cặp/bộ ba', 'so sánh hai đầu', 'in-place'.\n\nĐiểm ghi bàn: nêu điều kiện 'mảng sắp xếp' và mục tiêu O(n) bộ nhớ O(1).",
    "examples": ["// two-sum trên mảng sorted:\nl=0, r=n-1;\nwhile(l<r){ s=a[l]+a[r]; if(s==t) return; else if(s<t) l++; else r--; }"]
   },
   {
    "question": "Sliding Window khác Two Pointers ở đâu?",
    "answer": "Sliding Window cho bài toán SUBARRAY/SUBSTRING LIÊN TỤC với ràng buộc: 'chuỗi con dài nhất không lặp ký tự', 'tổng lớn nhất cửa sổ kích thước k', 'chuỗi con nhỏ nhất đủ điều kiện'. Cửa sổ [l..r] mở rộng r và co l để duy trì ràng buộc; thường O(n).\nKhác Two Pointers: sliding window nhấn vào một 'đoạn liên tục' và trạng thái bên trong cửa sổ (đếm ký tự, tổng), còn two pointers thường trên mảng sắp xếp/hai đầu.\n\nĐiểm ghi bàn: 'liên tục + ràng buộc -> sliding window; sắp xếp/hai đầu -> two pointers'.",
    "examples": ["// cửa sổ động: chuỗi con dài nhất không lặp\nfor(r=0;r<n;r++){ while(seen[c[r]]) shrink(l++); best=max(best, r-l+1); }"]
   },
   {
    "question": "BFS vs DFS: dùng khi nào?",
    "answer": "- BFS (hàng đợi): duyệt theo TỪNG LỚP (level-by-level). Dùng cho ĐƯỜNG ĐI NGẮN NHẤT trên đồ thị KHÔNG TRỌNG SỐ, tìm quan hệ gần nhất, duyệt theo tầng của cây. Bộ nhớ có thể lớn (giữ cả một tầng).\n- DFS (đệ quy/stack): đi sâu nhất một nhánh rồi quay lui. Dùng cho: tìm thành phần liên thông, path-sum gốc->lá, độ sâu cây, dò mọi đường/cấu hình.\n\nĐiểm ghi bàn: 'ngắn nhất/không trọng số -> BFS; đi sâu/khám phá mọi nhánh -> DFS'. (Đường đi ngắn nhất CÓ trọng số dùng Dijkstra, không phải BFS thường.)",
    "examples": ["// BFS shortest path (unweighted)\nqueue.add(start); dist[start]=0;\nwhile(!queue.isEmpty()){ u=queue.poll(); for(v: adj[u]) if(dist[v]<0){ dist[v]=dist[u]+1; queue.add(v);} }"]
   },
   {
    "question": "Modified Binary Search: nhận biết và bẫy hay gặp?",
    "answer": "Dùng khi KHÔNG GIAN TÌM KIẾM ĐƠN ĐIỆU (sorted, hoặc 'có thể đạt được thì mọi giá trị lớn hơn cũng đạt') -> loại một nửa mỗi bước, O(log n). Biến thể: tìm biên trái/phải (lower/upper bound), tìm trong mảng xoay (rotated), 'binary search on answer' (tìm giá trị nhỏ nhất thỏa điều kiện, vd Koko ăn chuối, chia mảng).\nBẫy: tính mid = l + (r-l)/2 để tránh tràn số; cẩn thận điều kiện l<r vs l<=r và cập nhật l=mid+1 / r=mid để không lặp vô hạn.\n\nĐiểm ghi bàn: nêu 'binary search on answer' và bẫy overflow/biên vòng lặp.",
    "examples": ["int mid = l + (r - l) / 2;   // tránh (l+r) tràn int\nif (ok(mid)) r = mid; else l = mid + 1;   // tìm giá trị nhỏ nhất thỏa"]
   },
   {
    "question": "Backtracking: khuôn giải và cách tối ưu (pruning)?",
    "answer": "Backtracking sinh mọi tổ hợp/hoán vị/tập con bằng cách 'chọn -> đệ quy -> bỏ chọn (undo)'. Dùng cho: permutations, combinations, subsets, N-Queens, giải Sudoku, word search. Tối ưu bằng PRUNING: cắt sớm nhánh không khả thi (sắp xếp trước để bỏ trùng, kiểm tra ràng buộc trước khi đi sâu). Độ phức tạp thường mũ nên pruning rất quan trọng.\n\nĐiểm ghi bàn: khuôn 'choose/explore/unchoose' + pruning để cắt nhánh.",
    "examples": ["void bt(path, choices){\n  if(done){ res.add(copy(path)); return; }\n  for(c: choices){ if(!valid(c)) continue; path.add(c); bt(path, next); path.removeLast(); }\n}"]
   },
   {
    "question": "Dynamic Programming: dấu hiệu và hai cách cài đặt?",
    "answer": "DP cho bài toán có (1) bài toán con GỐI NHAU (overlapping subproblems) và (2) cấu trúc con TỐI ƯU (optimal substructure): tối ưu (min/max), đếm số cách, kiểm tra khả thi. Hai cách:\n- Top-down (memoization): đệ quy + cache kết quả bài con.\n- Bottom-up (tabulation): điền bảng từ trạng thái nhỏ tới lớn.\nBước tư duy: định nghĩa TRẠNG THÁI (state) và CÔNG THỨC CHUYỂN (transition), điều kiện cơ sở, thứ tự tính. Ví dụ: Fibonacci, knapsack, LIS, edit distance, coin change.\n\nĐiểm ghi bàn: gọi tên 'overlapping subproblems + optimal substructure', nêu state + transition; memoization vs tabulation.",
    "examples": ["// coin change (bottom-up): số xu ít nhất tạo amount\ndp[0]=0; for(a=1;a<=amount;a++) for(c: coins) if(a>=c) dp[a]=min(dp[a], dp[a-c]+1);"]
   },
   {
    "question": "Two Heaps và Top-K: dùng cho lớp bài nào?",
    "answer": "- Two Heaps: dùng max-heap (nửa nhỏ) + min-heap (nửa lớn) cân bằng nhau để lấy TRUNG VỊ (median) của luồng dữ liệu động trong O(log n) mỗi lần thêm, O(1) lấy median.\n- Top-K / Heap: dùng heap kích thước k để tìm K phần tử lớn/nhỏ nhất, K phần tử tần suất cao nhất -> O(n log k) thay vì sort O(n log n).\n\nĐiểm ghi bàn: 'median luồng -> two heaps; K lớn nhất/hay gặp nhất -> heap size k (O(n log k))'.",
    "examples": ["// Top-K hay gặp: min-heap size k theo tần suất\nfor(e: entries){ heap.add(e); if(heap.size()>k) heap.poll(); }  // giữ k lớn nhất"]
   },
   {
    "question": "Một số pattern lõi khác cần biết (Fast&Slow, Merge Intervals, Topo, Union-Find, Monotonic Stack)?",
    "answer": "- Fast & Slow Pointers: phát hiện chu trình linked list, tìm điểm giữa (Floyd's cycle).\n- Merge Intervals: sắp xếp theo điểm bắt đầu rồi gộp các khoảng chồng lấn (lịch họp, khoảng thời gian).\n- Topological Sort: sắp thứ tự trên DAG (lịch học có tiên quyết, build dependency) — BFS Kahn hoặc DFS.\n- Union-Find (DSU): gộp/kiểm tra nhóm liên thông (số đảo, phát hiện chu trình đồ thị vô hướng, Kruskal MST).\n- Monotonic Stack: 'phần tử lớn/nhỏ kế tiếp' (next greater element), diện tích hình chữ nhật lớn nhất — O(n).\n\nĐiểm ghi bàn: gắn mỗi pattern với dấu hiệu bài toán đặc trưng của nó.",
    "examples": ["Topo (Kahn): đẩy node bậc-vào 0 vào queue; gỡ dần, giảm bậc-vào; nếu xử lý < N node -> có chu trình.\nMonotonic Stack: next greater -> duy trì stack giảm dần chỉ số."]
   }
  ]
 },
 {
  "topic": "Microservices & System Design",
  "items": [
   {
    "question": "API Gateway là gì? Khác load balancer thế nào?",
    "answer": "API Gateway là ĐIỂM VÀO DUY NHẤT cho mọi request client; nó định tuyến tới service phù hợp và gánh các mối quan tâm chung: xác thực/ủy quyền, rate limiting, TLS termination, tổng hợp response (aggregation), caching, logging/tracing. Khác load balancer: LB chỉ phân phối tải giữa các instance ở tầng mạng/vận tải (L4/L7); Gateway hoạt động ở tầng ứng dụng với logic routing và cross-cutting concern.\nBFF (Backend For Frontend): mỗi loại client (web/mobile) có một gateway riêng phù hợp nhu cầu.\n\nĐiểm ghi bàn: 'Gateway = single entry + cross-cutting concern; LB chỉ phân phối tải'. Cảnh báo: gateway có thể thành single point of failure/bottleneck -> cần HA.",
    "examples": ["Client -> API Gateway (auth, rate limit, routing) -> [order-svc | user-svc | payment-svc]"]
   },
   {
    "question": "Saga pattern giải quyết vấn đề gì? Choreography vs Orchestration?",
    "answer": "Trong microservices mỗi service có DB riêng (database-per-service) nên KHÔNG dùng được một transaction ACID xuyên service. Saga quản lý transaction phân tán bằng CHUỖI local transaction; mỗi bước phát sự kiện kích hoạt bước tiếp; nếu một bước lỗi thì chạy COMPENSATING transaction (bù trừ) để hoàn tác các bước trước -> đạt eventual consistency.\n- Choreography: các service tự phản ứng qua sự kiện (không có bộ điều phối trung tâm) — đơn giản nhưng khó theo dõi khi nhiều bước.\n- Orchestration: một Saga Orchestrator điều khiển tuần tự các bước — dễ quản lý/giám sát, nhưng thêm một thành phần trung tâm.\n\nĐiểm ghi bàn: nêu 'local tx + compensating tx thay ACID xuyên service', và phân biệt choreography (event) vs orchestration (điều phối trung tâm).",
    "examples": ["Order -> Payment -> Inventory (mỗi bước 1 local tx)\nNếu Inventory hết hàng -> compensating: hoàn tiền (Payment) + hủy Order"]
   },
   {
    "question": "CQRS là gì? Khi nào nên dùng?",
    "answer": "CQRS (Command Query Responsibility Segregation): TÁCH đường ghi (Command — thay đổi trạng thái, qua write model) khỏi đường đọc (Query — lấy dữ liệu, qua read model tối ưu đọc). Cho phép scale đọc/ghi độc lập, tối ưu mỗi phía khác nhau (vd read model phi chuẩn hóa/materialized view cho truy vấn nhanh). Thường đi kèm Event Sourcing và có độ trễ đồng bộ (eventual consistency) giữa write và read model.\nDùng khi: tỷ lệ đọc/ghi lệch lớn, truy vấn phức tạp khác hẳn mô hình ghi, cần scale đọc mạnh. Đừng dùng bừa vì tăng độ phức tạp.\n\nĐiểm ghi bàn: 'tách read/write model để scale & tối ưu riêng; đánh đổi bằng độ phức tạp + eventual consistency'.",
    "examples": ["Write: POST /orders -> command -> write DB (chuẩn hóa)\nRead:  GET /orders/report -> read model (materialized view, tối ưu đọc)"]
   },
   {
    "question": "Rate limiting: các thuật toán token bucket, leaky bucket, sliding window?",
    "answer": "Rate limiting giới hạn số request để bảo vệ hệ thống (thường ở API Gateway):\n- Token bucket: bình chứa token nạp đều theo thời gian; mỗi request tiêu 1 token; cho phép BURST tới sức chứa bình. Phổ biến nhất.\n- Leaky bucket: request xếp hàng và 'rò' ra với tốc độ cố định -> làm mượt lưu lượng, không cho burst.\n- Fixed window: đếm request trong mỗi khung thời gian cố định (dễ, nhưng có 'burst' ở ranh giới khung).\n- Sliding window (log/counter): cửa sổ trượt chính xác hơn, tránh nhược điểm ranh giới của fixed window.\nĐáp ứng vượt hạn thường trả HTTP 429 Too Many Requests.\n\nĐiểm ghi bàn: gọi tên token bucket (cho burst) vs leaky bucket (làm mượt), và trả 429 khi vượt.",
    "examples": ["// token bucket (giả): refill r token/s, cap = C\nif (tokens >= 1) { tokens--; allow(); } else { reject(429); }"]
   },
   {
    "question": "Service Discovery là gì? Client-side vs Server-side?",
    "answer": "Trong môi trường động (container scale lên/xuống, IP đổi), Service Discovery giúp tìm địa chỉ instance của một service theo TÊN, dùng một registry (Eureka/Consul/etcd) nơi service tự đăng ký.\n- Client-side discovery: client hỏi registry rồi tự chọn instance (tự load balance) — vd Netflix Eureka + Ribbon.\n- Server-side discovery: client gọi một load balancer/gateway, nó tra registry và chuyển tiếp — vd Kubernetes Service (kube-proxy) + DNS.\n\nĐiểm ghi bàn: 'registry lưu instance động; client-side (client tự chọn) vs server-side (LB/gateway chọn hộ)'.",
    "examples": ["order-svc gọi 'http://payment-svc/pay'  // tên logic\n-> discovery phân giải sang instance IP:port thực tế (có thể nhiều bản)"]
   },
   {
    "question": "Idempotency & Outbox pattern trong giao tiếp bất đồng bộ?",
    "answer": "Vì message thường at-least-once (có thể lặp), consumer phải IDEMPOTENT: xử lý lại một message không gây tác dụng phụ trùng (upsert theo khóa nghiệp vụ, lưu id đã xử lý). \nTransactional Outbox: để 'lưu DB' và 'gửi message' không lệch nhau (dual-write problem), ghi sự kiện vào một bảng OUTBOX trong CÙNG transaction với dữ liệu; một tiến trình riêng (relay/CDC như Debezium) đọc outbox và publish message -> đảm bảo không mất/không lệch.\n\nĐiểm ghi bàn: nêu 'consumer idempotent + outbox để tránh dual-write (mất/lệch event)'.",
    "examples": ["BEGIN;\n  INSERT INTO orders ...;\n  INSERT INTO outbox(event) VALUES ('OrderCreated', ...);\nCOMMIT;\n// relay đọc outbox -> gửi Kafka -> đánh dấu đã gửi"]
   },
   {
    "question": "Strangler Fig pattern để chuyển monolith sang microservices?",
    "answer": "Strangler Fig: thay vì viết lại toàn bộ (big-bang rủi ro), đặt một proxy/gateway phía trước monolith rồi DẦN DẦN tách từng chức năng ra service mới, định tuyến phần đã tách sang service mới, phần còn lại vẫn ở monolith; lặp cho tới khi monolith 'bị bóp nghẹt' (strangled) và loại bỏ. Giảm rủi ro, cho phép rollback từng phần.\n\nĐiểm ghi bàn: 'di trú tăng dần qua proxy, tách từng phần, tránh rewrite big-bang'.",
    "examples": ["Gateway: /users -> service mới (đã tách)\n         /orders -> monolith cũ (chưa tách)"]
   },
   {
    "question": "Distributed tracing & observability gồm những gì?",
    "answer": "Ba trụ cột observability: Metrics (số liệu: latency p99, throughput, error rate — Prometheus/Micrometer), Logs (log tập trung, có correlation id — ELK/Loki), Traces (lần vết một request đi qua nhiều service — OpenTelemetry + Jaeger/Zipkin/Tempo). Trace gắn trace-id/span-id lan truyền qua các service để dựng lại toàn bộ hành trình và tìm nút thắt.\n\nĐiểm ghi bàn: gọi tên 3 trụ cột (metrics/logs/traces) và vai trò trace-id lan truyền để debug hệ phân tán.",
    "examples": ["Request có traceId=abc -> user-svc(span1) -> order-svc(span2) -> payment-svc(span3)\n-> Jaeger dựng lại timeline, chỉ ra span nào chậm"]
   }
  ]
 },
 {
  "topic": "Security (JWT, OAuth2, OWASP)",
  "items": [
   {
    "question": "JWT gồm những phần nào? Server xác thực token thế nào?",
    "answer": "JWT có 3 phần ngăn bởi dấu chấm: Header.Payload.Signature. Header và Payload là JSON mã hóa Base64-URL (KHÔNG mã hóa bí mật — chỉ encode, ai cũng đọc được, đừng để dữ liệu nhạy cảm). Signature là chữ ký tạo từ header+payload với secret/private key.\nClient gắn token vào header 'Authorization: Bearer <token>'; server chỉ cần XÁC MINH CHỮ KÝ bằng khóa của nó (không cần tra DB -> stateless). Payload chứa claims: sub, exp, iat, roles...\nHạn chế: JWT stateless nên khó 'logout'/thu hồi trước hạn -> dùng exp ngắn + refresh token, hoặc blacklist/rotation.\n\nĐiểm ghi bàn: 'Base64 chỉ encode không mã hóa; xác minh bằng chữ ký (stateless); khó revoke -> exp ngắn + refresh'.",
    "examples": ["Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsImV4cCI6...}.SflKxwRJ..."]
   },
   {
    "question": "OAuth2 có những role nào? Authorization Code flow chạy ra sao?",
    "answer": "4 role: Resource Owner (người dùng sở hữu tài nguyên), Client (ứng dụng xin quyền), Authorization Server (xác thực người dùng, cấp access token), Resource Server (kiểm token và trả tài nguyên).\nAuthorization Code flow (phổ biến, an toàn cho web/mobile): client chuyển hướng user tới Authorization Server đăng nhập -> nhận về 'authorization code' qua redirect URI -> client đổi code lấy access token (và refresh token) ở kênh sau (back channel). Với SPA/mobile thêm PKCE để chống chặn code.\n\nĐiểm ghi bàn: nêu đủ 4 role và luồng 'redirect -> code -> đổi lấy token', kèm PKCE cho public client.",
    "examples": ["1) GET /authorize?response_type=code&client_id=..&redirect_uri=..&code_challenge=..\n2) redirect về app kèm ?code=...\n3) POST /token (code + code_verifier) -> access_token + refresh_token"]
   },
   {
    "question": "OpenID Connect (OIDC) khác OAuth2 chỗ nào?",
    "answer": "OAuth2 là giao thức ỦY QUYỀN (authorization — cấp quyền truy cập tài nguyên), KHÔNG chuẩn hóa việc 'người dùng là ai'. OIDC là lớp XÁC THỰC (authentication) xây trên OAuth2, thêm ID Token (một JWT chứa thông tin người dùng đã xác thực), endpoint UserInfo, và các scope chuẩn (openid, profile, email).\nTóm gọn: OAuth2 = 'được phép làm gì'; OIDC = 'bạn là ai' (đăng nhập). ID Token phải được ký & xác minh để chống giả mạo.\n\nĐiểm ghi bàn: 'OAuth2 authorization, OIDC authentication + ID Token; access token để gọi API, ID token để biết danh tính'.",
    "examples": ["scope=openid profile email  -> nhận thêm id_token (JWT danh tính)\n// access_token: gọi resource server; id_token: xác thực user"]
   },
   {
    "question": "Access token vs Refresh token khác nhau? Vì sao cần refresh token?",
    "answer": "Access token: sống NGẮN (vài phút), gửi kèm mỗi request để truy cập API; ngắn hạn để giảm thiệt hại nếu lộ. Refresh token: sống DÀI hơn, lưu an toàn (HttpOnly cookie/secure storage), dùng để XIN access token mới khi hết hạn mà không bắt user đăng nhập lại. Nên rotation refresh token (cấp mới, thu hồi cũ) và có thể revoke ở server.\n\nĐiểm ghi bàn: 'access ngắn hạn (đỡ rủi ro), refresh dài hạn để làm mới; rotation + lưu an toàn'.",
    "examples": ["access_token hết hạn -> POST /token grant_type=refresh_token\n-> access_token mới (+ refresh_token mới nếu rotation)"]
   },
   {
    "question": "OWASP Top 10 (2021) gồm những nhóm rủi ro nào?",
    "answer": "A01 Broken Access Control (kiểm soát truy cập sai — đứng đầu), A02 Cryptographic Failures (lỗi mã hóa/lộ dữ liệu nhạy cảm), A03 Injection (SQLi, XSS...), A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable & Outdated Components, A07 Identification & Authentication Failures, A08 Software & Data Integrity Failures, A09 Security Logging & Monitoring Failures, A10 Server-Side Request Forgery (SSRF).\n\nĐiểm ghi bàn: nhớ được vài nhóm đầu (Broken Access Control, Crypto Failures, Injection) và biết đây là danh sách rủi ro web phổ biến nhất để ưu tiên phòng thủ.",
    "examples": ["A01: user thường sửa URL /admin -> phải kiểm quyền phía server\nA03: dùng PreparedStatement chống SQL Injection"]
   },
   {
    "question": "Chống SQL Injection và XSS thế nào?",
    "answer": "SQL Injection: KHÔNG nối chuỗi vào câu SQL; dùng PreparedStatement/parameterized query (tham số hóa) hoặc ORM; validate input; nguyên tắc least privilege cho DB user.\nXSS (Cross-Site Scripting): ESCAPE/encode output theo ngữ cảnh (HTML/JS/URL), dùng Content Security Policy (CSP), cookie HttpOnly để JS không đọc được session, validate/sanitize input (thư viện như OWASP Java Encoder).\n\nĐiểm ghi bàn: 'SQLi -> parameterized query; XSS -> output encoding + CSP + HttpOnly cookie'.",
    "examples": ["// an toàn:\nPreparedStatement ps = con.prepareStatement(\"SELECT * FROM u WHERE name=?\");\nps.setString(1, name);   // KHÔNG \"... WHERE name='\"+name+\"'\""]
   },
   {
    "question": "CSRF là gì và Spring Security chống thế nào? Khi nào tắt CSRF?",
    "answer": "CSRF (Cross-Site Request Forgery): kẻ tấn công lừa trình duyệt user (đang có session/cookie) gửi request thay đổi trạng thái mà user không chủ ý. Spring Security dùng synchronizer token pattern: mỗi request thay đổi trạng thái phải kèm CSRF token hợp lệ. \nVới REST API STATELESS dùng token (JWT trong Authorization header, không dựa cookie phiên), có thể tắt CSRF vì không có cookie tự động gửi kèm; nhưng nếu dùng cookie-based session thì PHẢI bật CSRF.\n\nĐiểm ghi bàn: 'CSRF lợi dụng cookie tự gửi; token pattern để chống; API stateless header-token mới được tắt CSRF'.",
    "examples": ["// stateless JWT API:\nhttp.csrf(csrf -> csrf.disable())\n   .sessionManagement(s -> s.sessionCreationPolicy(STATELESS));"]
   },
   {
    "question": "Spring Security hoạt động qua cơ chế nào? @PreAuthorize để làm gì?",
    "answer": "Spring Security dựa trên FILTER CHAIN: các servlet filter chặn request TRƯỚC khi tới controller, xử lý authentication (xác thực) rồi authorization (phân quyền). Cấu hình qua SecurityFilterChain (bean), có thể thêm custom filter (vd JWT filter) đúng vị trí trong chuỗi.\nMethod-level security: @PreAuthorize (biểu thức SpEL, vd hasRole('ADMIN')), @Secured, @PostAuthorize cho phép phân quyền chi tiết ở tầng service. Nguyên tắc: xác thực = 'bạn là ai', ủy quyền = 'bạn được làm gì'.\n\nĐiểm ghi bàn: 'filter chain xử lý authn/authz trước controller; @PreAuthorize phân quyền mức method bằng SpEL'.",
    "examples": ["@PreAuthorize(\"hasRole('ADMIN') or #id == authentication.principal.id\")\npublic User get(Long id){ ... }"]
   },
   {
    "question": "Nên hash mật khẩu thế nào cho đúng?",
    "answer": "KHÔNG lưu mật khẩu dạng plain text, cũng không dùng hash nhanh như MD5/SHA-1 (dễ brute-force/rainbow table). Dùng hàm băm mật khẩu CHẬM có salt tự động: BCrypt (phổ biến trong Spring — PasswordEncoder), hoặc Argon2/scrypt/PBKDF2. Salt ngẫu nhiên mỗi user chống rainbow table; 'cost factor' điều chỉnh độ chậm chống brute-force.\n\nĐiểm ghi bàn: 'BCrypt/Argon2 + salt, không MD5/SHA-1, không plain text; cost factor tăng theo phần cứng'.",
    "examples": ["@Bean PasswordEncoder encoder(){ return new BCryptPasswordEncoder(); }\n// encoder.encode(rawPassword);  encoder.matches(raw, hashed);"]
   }
  ]
 },
 {
  "topic": "SQL nâng cao (Window, Index, Tuning)",
  "items": [
   {
    "question": "Window function là gì? Khác GROUP BY thế nào?",
    "answer": "Window function tính toán trên một 'cửa sổ' các dòng LIÊN QUAN nhưng KHÔNG gộp các dòng lại (khác GROUP BY làm mỗi nhóm còn 1 dòng). Cú pháp: func() OVER (PARTITION BY ... ORDER BY ... [frame]). Giữ nguyên số dòng gốc mà thêm cột tính toán (xếp hạng, tổng lũy kế, so với dòng trước).\nNhóm hàm: xếp hạng (ROW_NUMBER, RANK, DENSE_RANK), offset (LAG, LEAD), tổng hợp cửa sổ (SUM/AVG/COUNT OVER), NTILE, FIRST_VALUE/LAST_VALUE.\n\nĐiểm ghi bàn: 'window giữ nguyên số dòng, GROUP BY gộp; PARTITION BY chia nhóm cửa sổ, ORDER BY sắp trong cửa sổ'.",
    "examples": ["SELECT name, dept, salary,\n  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk\nFROM emp;   -- xếp hạng lương trong TỪNG phòng, vẫn giữ mọi dòng"]
   },
   {
    "question": "ROW_NUMBER, RANK, DENSE_RANK khác nhau thế nào?",
    "answer": "Khi có giá trị bằng nhau (ties):\n- ROW_NUMBER: đánh số duy nhất 1,2,3,4... (ties vẫn khác số, tùy ý thứ tự).\n- RANK: ties cùng hạng, rồi NHẢY số (1,1,3,4...) — bỏ qua hạng kế.\n- DENSE_RANK: ties cùng hạng, KHÔNG nhảy (1,1,2,3...).\nDùng ROW_NUMBER để lấy 'dòng thứ N mỗi nhóm' (vd top 1 mỗi phòng, khử trùng).\n\nĐiểm ghi bàn: phân biệt qua cách xử lý ties (RANK nhảy số, DENSE_RANK không), và ROW_NUMBER cho top-N-per-group.",
    "examples": ["-- top 1 lương mỗi phòng:\nSELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn FROM emp\n) t WHERE rn = 1;"]
   },
   {
    "question": "LAG/LEAD dùng để làm gì?",
    "answer": "LAG(col, n) lấy giá trị của dòng TRƯỚC (n dòng), LEAD(col, n) lấy dòng SAU trong cửa sổ đã ORDER BY. Rất hợp tính chênh lệch giữa các kỳ (tăng trưởng doanh thu tháng này vs tháng trước), khoảng cách thời gian giữa các sự kiện.\n\nĐiểm ghi bàn: 'LAG nhìn lùi, LEAD nhìn tới; dùng cho so sánh kỳ liền kề (period-over-period)'.",
    "examples": ["SELECT month, revenue,\n  revenue - LAG(revenue) OVER (ORDER BY month) AS growth\nFROM sales;   -- chênh lệch so tháng trước"]
   },
   {
    "question": "CTE là gì? Khác subquery và khi nào dùng recursive CTE?",
    "answer": "CTE (Common Table Expression, WITH ... AS): 'bảng tạm' đặt tên trước câu chính, giúp truy vấn dễ đọc, tái sử dụng, và cho phép ĐỆ QUY. So với subquery lồng, CTE rõ ràng hơn và có thể tham chiếu nhiều lần. Recursive CTE duyệt cấu trúc phân cấp (cây tổ chức, BOM, đồ thị) bằng phần anchor + phần đệ quy UNION ALL.\n\nĐiểm ghi bàn: 'CTE = truy vấn dễ đọc/tái dùng; recursive CTE cho dữ liệu phân cấp'.",
    "examples": ["WITH RECURSIVE org AS (\n  SELECT id, manager_id, 1 lvl FROM emp WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.manager_id, o.lvl+1 FROM emp e JOIN org o ON e.manager_id=o.id\n) SELECT * FROM org;"]
   },
   {
    "question": "Index hoạt động thế nào? Đánh đổi khi thêm index?",
    "answer": "Index (thường là B-tree) là cấu trúc phụ sắp xếp theo cột được đánh index, cho phép tra cứu O(log n) và range scan nhanh thay vì quét toàn bảng (full table scan). Nên đánh index cho cột hay dùng trong WHERE, JOIN, ORDER BY.\nĐánh đổi: index LÀM CHẬM ghi (INSERT/UPDATE/DELETE phải cập nhật cả index), tốn thêm dung lượng, và quá nhiều index thừa gây phản tác dụng -> cần rà và bỏ index không dùng.\n\nĐiểm ghi bàn: 'index tăng tốc đọc (B-tree O(log n)) nhưng chậm ghi + tốn chỗ; index cột WHERE/JOIN/ORDER BY'.",
    "examples": ["CREATE INDEX idx_emp_dept ON emp(dept_id);\n-- tăng tốc WHERE dept_id = ? nhưng mỗi insert phải cập nhật index"]
   },
   {
    "question": "Composite index và quy tắc 'leftmost prefix' là gì?",
    "answer": "Composite index (nhiều cột, vd (a, b, c)) sắp xếp theo a, rồi b, rồi c. Quy tắc leftmost prefix: index chỉ được dùng hiệu quả cho các truy vấn lọc theo TIỀN TỐ TRÁI liên tiếp: (a), (a,b), (a,b,c) — KHÔNG hiệu quả nếu chỉ lọc theo b hoặc c mà bỏ a. Thứ tự cột trong index vì thế rất quan trọng; đặt cột chọn lọc cao/hay lọc bằng '=' trước.\n\nĐiểm ghi bàn: 'index (a,b,c) chỉ dùng được từ trái sang; lọc riêng b/c không tận dụng được index'.",
    "examples": ["INDEX(a,b,c):\n WHERE a=1            -> dùng được\n WHERE a=1 AND b=2    -> dùng được\n WHERE b=2            -> KHÔNG tận dụng (thiếu a)"]
   },
   {
    "question": "Covering index là gì? Vì sao nhanh?",
    "answer": "Covering index là index chứa ĐỦ mọi cột mà truy vấn cần (cả cột SELECT lẫn WHERE/ORDER BY) nên DB có thể trả kết quả CHỈ từ index, không cần quay lại bảng để lấy dòng (tránh 'lookup'/'bookmark lookup' tốn I/O). Trong execution plan thể hiện là 'Index Only Scan' (Postgres) / 'Using index' (MySQL EXPLAIN).\n\nĐiểm ghi bàn: 'index phủ hết cột cần -> đọc xong ngay từ index, khỏi truy bảng -> nhanh hơn nhiều'.",
    "examples": ["-- query chỉ cần dept_id, salary:\nCREATE INDEX idx_cover ON emp(dept_id, salary);\nSELECT salary FROM emp WHERE dept_id = 5;  -- Index Only Scan"]
   },
   {
    "question": "Đọc execution plan (EXPLAIN) để tối ưu query thế nào?",
    "answer": "EXPLAIN/EXPLAIN ANALYZE cho biết DB THỰC SỰ chạy query ra sao: có dùng index không (Index Scan vs Seq Scan/Full Table Scan), thứ tự và kiểu JOIN (Nested Loop/Hash/Merge), số dòng ước lượng vs thực tế, chi phí. Quy trình tối ưu: hiểu yêu cầu -> đọc plan tìm nút thắt (full scan trên bảng lớn, sort tốn kém, ước lượng lệch) -> thêm/sửa index, viết lại query, cập nhật statistics (ANALYZE), cân nhắc denormalization. Nếu ước lượng dòng lệch nhiều thật -> statistics cũ.\n\nĐiểm ghi bàn: 'đọc plan: Seq Scan trên bảng lớn hay sort nặng là cờ đỏ; fix bằng index/viết lại/ANALYZE'.",
    "examples": ["EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;\n-- 'Seq Scan on orders' trên bảng lớn -> thêm index(customer_id)"]
   },
   {
    "question": "Vì sao index đôi khi KHÔNG được dùng? Các bẫy thường gặp?",
    "answer": "Index có thể bị bỏ qua khi: (1) áp HÀM/biến đổi lên cột được index — WHERE YEAR(created)=2025 hoặc WHERE col+0=... (dùng sargable: WHERE created >= '2025-01-01'); (2) leading wildcard LIKE '%abc'; (3) kiểu dữ liệu không khớp (so string với number gây implicit cast); (4) cột có độ chọn lọc thấp (vd cột boolean) khiến optimizer thấy full scan rẻ hơn; (5) OR trên các cột khác nhau; (6) statistics cũ khiến ước lượng sai.\n\nĐiểm ghi bàn: nêu 'hàm bọc cột', 'LIKE %...', 'implicit cast', 'độ chọn lọc thấp' làm mất index; viết điều kiện SARGable.",
    "examples": ["-- mất index:\nWHERE YEAR(created_at) = 2025\n-- SARGable, dùng index:\nWHERE created_at >= '2025-01-01' AND created_at < '2026-01-01'"]
   },
   {
    "question": "Denormalization là gì? Đánh đổi ra sao?",
    "answer": "Denormalization: cố ý thêm dữ liệu dư thừa (lưu sẵn giá trị đã join/tổng hợp, cột tính sẵn, bảng tổng hợp/materialized view) để TRÁNH join phức tạp/aggregate lặp lại -> tăng tốc đọc cho workload read-heavy. Đánh đổi: dư thừa dữ liệu -> rủi ro không nhất quán (phải cập nhật nhiều nơi), tốn dung lượng, ghi phức tạp hơn. Chỉ dùng khi join/aggregate thật sự là nút thắt và đã tối ưu index không đủ.\n\nĐiểm ghi bàn: 'đổi tính nhất quán/ghi lấy tốc độ đọc; dùng khi join/aggregate là nút thắt, cân nhắc materialized view'.",
    "examples": ["-- thay vì join đếm mỗi lần:\nALTER TABLE post ADD comment_count INT;  -- cập nhật khi thêm/xóa comment"]
   }
  ]
 },
 {
  "topic": "Exception Handling (Spring Boot)",
  "items": [
   {
    "question": "Xử lý exception tập trung trong REST API với @RestControllerAdvice thế nào?",
    "answer": "@RestControllerAdvice = @ControllerAdvice + @ResponseBody: một nơi duy nhất bắt exception cho toàn bộ controller, trả JSON (không phải view). Bên trong dùng các method @ExceptionHandler(XxxException.class) map từng loại lỗi -> response phù hợp. Với REST luôn dùng @RestControllerAdvice (không phải @ControllerAdvice) để khỏi bị hiểu nhầm giá trị trả về là tên view.\nLợi ích: gom logic xử lý lỗi, không lặp try/catch ở mỗi controller, response nhất quán.\n\nĐiểm ghi bàn: '@RestControllerAdvice gom xử lý lỗi toàn cục, trả JSON; @ExceptionHandler map từng exception'.",
    "examples": ["@RestControllerAdvice\nclass ApiErrors {\n  @ExceptionHandler(CustomerNotFoundException.class)\n  ProblemDetail handle(CustomerNotFoundException ex){\n    var pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());\n    pd.setTitle(\"Customer not found\");\n    return pd;\n  }\n}"]
   },
   {
    "question": "Thứ tự @ExceptionHandler quan trọng thế nào? Vì sao cần catch-all?",
    "answer": "Trong cùng một advice, đặt handler CỤ THỂ trước handler CHUNG. Luôn có một catch-all @ExceptionHandler(Exception.class) làm 'lưới an toàn' để KHÔNG BAO GIỜ lộ stack trace thô ra client, kể cả lỗi không lường trước.\nBẫy hay gặp: catch-all trả thẳng ex.getMessage() -> có thể lộ SQL/đường dẫn file/tên class. Đúng cách: LOG chi tiết ở server (ERROR), trả client một thông báo chung + mã lỗi/traceId.\n\nĐiểm ghi bàn: 'cụ thể trước, chung sau; catch-all Exception.class; không rò rỉ chi tiết nội bộ, log server + trả generic'.",
    "examples": ["@ExceptionHandler(Exception.class)\nProblemDetail fallback(Exception ex){\n  log.error(\"Unhandled\", ex);   // chi tiết ở server\n  return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, \"Có lỗi xảy ra\");\n}"]
   },
   {
    "question": "ProblemDetail (RFC 9457/7807) là gì? Vì sao nên dùng?",
    "answer": "ProblemDetail là chuẩn định dạng lỗi cho HTTP API (RFC 9457, trước là 7807), media type application/problem+json, với các trường chuẩn: type (URI mô tả loại lỗi), title (tóm tắt), status, detail, instance — và cho phép thêm trường tùy biến (customerId, traceId...). Spring hỗ trợ NATIVE từ Spring 6 / Spring Boot 3 qua class ProblemDetail và interface ErrorResponse (mọi exception MVC dựng sẵn đều implement).\nLợi ích: định dạng lỗi NHẤT QUÁN, máy đọc được, client/gateway hiểu chuẩn mà không cần code riêng. Bật hàng loạt cho built-in exception bằng spring.mvc.problemdetails.enabled=true.\n\nĐiểm ghi bàn: gọi tên RFC 9457 + trường chuẩn (type/title/status/detail/instance) + Spring Boot 3 hỗ trợ sẵn.",
    "examples": ["// response application/problem+json:\n{ \"type\":\"https://api.ex.com/errors/not-found\",\n  \"title\":\"Customer not found\", \"status\":404,\n  \"detail\":\"id=42 không tồn tại\", \"customerId\":42, \"traceId\":\"abc\" }"]
   },
   {
    "question": "ResponseStatusException dùng khi nào?",
    "answer": "ResponseStatusException (từ Spring 5) cho phép NÉM lỗi kèm HTTP status + lý do từ BẤT KỲ đâu (service, controller) mà không cần tạo class exception riêng — tiện cho lỗi ít lặp lại. Với lỗi nghiệp vụ dùng nhiều nơi, nên tạo custom exception riêng (rõ nghĩa, dễ test, gắn @ExceptionHandler).\n\nĐiểm ghi bàn: 'ResponseStatusException để ném nhanh status từ mọi tầng; custom exception cho lỗi nghiệp vụ tái dùng'.",
    "examples": ["if (checkFails())\n  throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, \"Kiểm tra thất bại\");"]
   },
   {
    "question": "Custom exception nên thiết kế thế nào? Checked hay unchecked?",
    "answer": "Trong Spring/web thường dùng UNCHECKED exception (kế thừa RuntimeException) cho lỗi nghiệp vụ để không phải khai báo throws lan khắp nơi và để @Transactional tự rollback (mặc định chỉ rollback với RuntimeException/Error, không rollback checked). Đặt tên rõ nghĩa (CustomerNotFoundException, InsufficientBalanceException), mang đủ ngữ cảnh (id, mã lỗi). Tránh nuốt lỗi (catch rồi bỏ qua) và tránh dùng exception cho luồng điều khiển thông thường.\n\nĐiểm ghi bàn: 'unchecked cho lỗi nghiệp vụ (rollback @Transactional mặc định), tên rõ nghĩa, mang ngữ cảnh; không nuốt lỗi'.",
    "examples": ["class CustomerNotFoundException extends RuntimeException {\n  final Long customerId;\n  CustomerNotFoundException(Long id){ super(\"customer \"+id); this.customerId=id; }\n}"]
   },
   {
    "question": "Log lỗi theo mức nào? 4xx vs 5xx?",
    "answer": "Trong global handler nên phân biệt mức log: lỗi 5xx (server) log ở ERROR (kèm stack trace, cần điều tra); lỗi 4xx (client sai — validation, not found, unauthorized) log ở WARN hoặc thấp hơn (đừng spam ERROR vì đó là lỗi phía client, không phải bug hệ thống). Gắn correlation/request id (X-Request-Id) vào log để lần vết. Không log dữ liệu nhạy cảm.\n\nĐiểm ghi bàn: '5xx -> ERROR + stack; 4xx -> WARN; gắn traceId; không log secret'.",
    "examples": ["// 4xx: log.warn(\"Bad request {}: {}\", traceId, ex.getMessage());\n// 5xx: log.error(\"Server error {}\", traceId, ex);"]
   }
  ]
 },
 {
  "topic": "Logging (SLF4J, Logback, MDC)",
  "items": [
   {
    "question": "SLF4J là gì? Vì sao code theo SLF4J thay vì Logback/Log4j trực ti?",
    "answer": "SLF4J (Simple Logging Facade for Java) là một FACADE (mặt tiền) — bạn code theo API của SLF4J, còn backend thực tế (Logback, Log4j2, java.util.logging) được chọn lúc RUNTIME qua binding trên classpath. Nhờ đó đổi backend mà KHÔNG sửa code ứng dụng. Spring Boot mặc định dùng SLF4J + Logback.\n\nĐiểm ghi bàn: 'SLF4J là facade để tách API khỏi implementation -> swap backend không đổi code'.",
    "examples": ["private static final Logger log = LoggerFactory.getLogger(MyService.class);\n// LoggerFactory của org.slf4j, không phụ thuộc Logback trực tiếp"]
   },
   {
    "question": "Vì sao dùng parameterized logging {} thay vì nối chuỗi?",
    "answer": "Với placeholder {}, chuỗi message CHỈ được dựng khi mức log đó thực sự bật -> tránh phí CPU dựng chuỗi cho log bị tắt, và bỏ được các guard cũ kiểu if(log.isDebugEnabled()). Nối chuỗi thì LUÔN dựng chuỗi dù log không in ra.\n\nĐiểm ghi bàn: 'parameterized {} hoãn dựng chuỗi tới khi cần -> hiệu năng, gọn; nối chuỗi luôn tốn dù log tắt'.",
    "examples": ["log.debug(\"User {} login từ {}\", userId, ip);   // tốt\nlog.debug(\"User \" + userId + \" login từ \" + ip); // xấu: luôn nối chuỗi\nlog.error(\"Lỗi xử lý {}\", id, ex);   // tham số cuối là Throwable -> in stack trace"]
   },
   {
    "question": "Các log level và ý nghĩa? Quan hệ bao hàm?",
    "answer": "Từ chi tiết -> ít chi tiết: TRACE (siêu chi tiết), DEBUG (gỡ lỗi phát triển), INFO (sự kiện bình thường: khởi động, mốc chính), WARN (tình huống bất thường nhưng còn hồi phục được), ERROR (lỗi cần chú ý). Level bao hàm xuống dưới: đặt logger ở INFO sẽ in INFO+WARN+ERROR, ẩn DEBUG/TRACE. Production thường để INFO, bật DEBUG khi cần điều tra.\n\nĐiểm ghi bàn: nêu đúng 5 mức + 'đặt INFO thì thấy INFO/WARN/ERROR, ẩn DEBUG/TRACE'.",
    "examples": ["# application.properties\nlogging.level.root=INFO\nlogging.level.com.myapp.repo=DEBUG   # bật DEBUG riêng cho package"]
   },
   {
    "question": "MDC là gì? Dùng để làm gì?",
    "answer": "MDC (Mapped Diagnostic Context) là một MAP theo THREAD (thread-local) lưu key-value ngữ cảnh (vd correlationId, userId), tự động chèn vào MỌI dòng log của thread đó mà không phải truyền tay qua từng method. Khai báo pattern log với %X{correlationId} để in ra. Giúp log có ngữ cảnh, dễ lần vết một request.\n\nĐiểm ghi bàn: 'MDC = thread-local map cho ngữ cảnh log; cấu hình %X{key} trong pattern; đỡ phải truyền id thủ công'.",
    "examples": ["MDC.put(\"correlationId\", id);\nlog.info(\"Xử lý đơn hàng\");   // tự kèm correlationId nhờ pattern\n// pattern Logback: %d [%thread] %-5level %logger %X{correlationId} - %msg%n"]
   },
   {
    "question": "Correlation ID / trace ID để làm gì? Triển khai trong Spring Boot?",
    "answer": "Correlation ID (hay traceId): một id duy nhất gán cho mỗi request và ĐI THEO nó qua các tầng/microservice -> gom mọi log của cùng một request để debug hệ phân tán. Triển khai: dùng một Servlet Filter (hoặc HandlerInterceptor) đọc header X-Correlation-Id từ request, nếu THIẾU thì tự sinh, rồi MDC.put vào; xóa MDC ở cuối. Khi gọi service khác thì truyền tiếp header. Công cụ tự động: Micrometer Tracing (kế thừa Spring Cloud Sleuth) + OpenTelemetry/Zipkin/Jaeger.\n\nĐiểm ghi bàn: 'đọc/sinh X-Correlation-Id ở filter -> MDC -> truyền tiếp; hoặc dùng Micrometer Tracing tự động'.",
    "examples": ["// Servlet Filter\nString id = req.getHeader(\"X-Correlation-Id\");\nif (id == null) id = UUID.randomUUID().toString();\ntry { MDC.put(\"correlationId\", id); chain.doFilter(req,res); }\nfinally { MDC.clear(); }"]
   },
   {
    "question": "Bẫy của MDC (ThreadLocal) và structured logging?",
    "answer": "MDC dựa trên ThreadLocal nên có 2 bẫy: (1) Thread pool leakage — thread được tái sử dụng, nếu KHÔNG clear MDC thì ngữ cảnh cũ rò sang request khác -> luôn MDC.clear() trong finally. (2) Async/reactive — MDC KHÔNG tự lan sang thread khác (Project Reactor, @Async); cần TaskDecorator, TransmittableThreadLocal hoặc Reactor Context propagation.\nStructured logging: xuất log dạng JSON (vd Logback + Logstash encoder) để công cụ ELK/Splunk/Loki phân tích, lọc, cảnh báo theo trường -> tốt hơn log text thuần cho hệ lớn.\n\nĐiểm ghi bàn: 'clear MDC trong finally (thread pool), lo lan context ở async/reactive; structured JSON log cho hệ quan sát tập trung'.",
    "examples": ["try { MDC.put(\"correlationId\", id); handle(); }\nfinally { MDC.clear(); }   // tránh rò ngữ cảnh trong thread pool"]
   }
  ]
 },
 {
  "topic": "Validation (Bean Validation)",
  "items": [
   {
    "question": "Bean Validation là gì? Các constraint thường dùng?",
    "answer": "Bean Validation là ĐẶC TẢ Java (JSR 380, gói jakarta.validation) chuẩn hóa cách khai báo và áp ràng buộc kiểm tra dữ liệu bằng annotation trên field/DTO; Hibernate Validator là bản cài phổ biến (Spring Boot có spring-boot-starter-validation). Constraint hay dùng: @NotNull, @NotBlank (chuỗi không rỗng/không toàn khoảng trắng), @NotEmpty, @Size(min,max), @Min/@Max, @Email, @Pattern (regex), @Past/@Future, @Positive.\n\nĐiểm ghi bàn: 'JSR 380 + Hibernate Validator; phân biệt @NotNull vs @NotBlank vs @NotEmpty'.",
    "examples": ["class UserDto {\n  @NotBlank String name;\n  @Email String email;\n  @Min(18) int age;\n  @Size(min=8) String password;\n}"]
   },
   {
    "question": "@Valid và @Validated khác nhau thế nào?",
    "answer": "- @Valid (jakarta.validation): kích hoạt validation với group MẶC ĐỊNH; dùng cho @RequestBody, và để đánh dấu field lồng nhau cần validate sâu (nested). KHÔNG hỗ trợ group.\n- @Validated (org.springframework...): của Spring, mạnh hơn — hỗ trợ VALIDATION GROUP, và bật validation ở tầng method (đặt ở class level cho service/controller). \nKhi validate tham số controller mà không cần group thì hai cái tương đương.\n\nĐiểm ghi bàn: '@Valid = mặc định + nested; @Validated = có group + method-level validation'.",
    "examples": ["@PostMapping(\"/users\")\nUser create(@Valid @RequestBody UserDto dto){ ... }   // validate body\n\n@Validated  // class-level: bật method validation + group\n@Service class OrderService { void pay(@Valid Order o){ } }"]
   },
   {
    "question": "Validation body thất bại ném exception gì? Khác với path/param?",
    "answer": "- @Valid @RequestBody thất bại -> MethodArgumentNotValidException (Spring có xử lý sẵn, trả 400; với Spring Boot 3 + ProblemDetail cho response chuẩn).\n- Validate tham số path/query trực tiếp (vd @RequestParam @Min...) thất bại -> ConstraintViolationException; Spring KHÔNG đăng ký handler mặc định nên MẶC ĐỊNH trả 500 -> cần tự bắt trong @RestControllerAdvice để trả 400 cho đúng.\n\nĐiểm ghi bàn: 'body -> MethodArgumentNotValidException (400); path/param -> ConstraintViolationException (mặc định 500, phải tự handle)'.",
    "examples": ["@ExceptionHandler(ConstraintViolationException.class)\nProblemDetail handle(ConstraintViolationException ex){\n  return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());\n}"]
   },
   {
    "question": "Validation group dùng khi nào? Cách khai báo?",
    "answer": "Validation group cho phép áp các ràng buộc KHÁC NHAU trên CÙNG một object tùy ngữ cảnh (vd bước tạo mới vs cập nhật, hay các bước của wizard). Group là các INTERFACE đánh dấu (marker, không có method). Constraint chỉ định thuộc group qua thuộc tính groups; @Validated(GroupX.class) chỉ kích hoạt ràng buộc thuộc GroupX. Phải dùng @Validated (vì @Valid không hỗ trợ group).\n\nĐiểm ghi bàn: 'group = marker interface; @Validated(Group.class) kích hoạt riêng; dùng cho create vs update/wizard'.",
    "examples": ["interface OnCreate {}  interface OnUpdate {}\nclass UserDto {\n  @Null(groups=OnCreate.class) @NotNull(groups=OnUpdate.class) Long id;\n}\nUser create(@Validated(OnCreate.class) @RequestBody UserDto d){ }"]
   },
   {
    "question": "Viết custom constraint validator thế nào?",
    "answer": "Một constraint tùy biến gồm 2 phần: (1) annotation gắn @Constraint(validatedBy=...) khai báo ràng buộc + thuộc tính (message, groups, payload); (2) một class implements ConstraintValidator<Anno, Type> cài logic isValid(). Ưu điểm trong Spring: validator do Spring tạo (SpringConstraintValidatorFactory) nên có thể INJECT bean (vd gọi repository kiểm tra trùng). Cách này tích hợp @Valid/Hibernate Validator nên được ưa dùng hơn Spring Validator interface + @InitBinder.\n\nĐiểm ghi bàn: '2 phần: @Constraint annotation + ConstraintValidator.isValid(); validator được DI bean trong Spring'.",
    "examples": ["@Constraint(validatedBy=UniqueEmailValidator.class)\n@interface UniqueEmail { String message() default \"Email đã tồn tại\"; ... }\nclass UniqueEmailValidator implements ConstraintValidator<UniqueEmail,String>{\n  @Autowired UserRepo repo;   // inject bean được\n  public boolean isValid(String v, ConstraintValidatorContext c){ return !repo.existsByEmail(v); }\n}"]
   },
   {
    "question": "Cross-field validation và bẫy BindingResult?",
    "answer": "Cross-field (liên trường, vd password == confirmPassword, ngày bắt đầu < ngày kết thúc) làm bằng constraint mức CLASS: annotation đặt trên class + ConstraintValidator đọc nhiều field. \nBẫy BindingResult: tham số BindingResult PHẢI đứng NGAY SAU tham số @Valid/@Validated; chèn tham số khác vào giữa thì Spring không gắn được -> vẫn ném MethodArgumentNotValidException dù có BindingResult. Có BindingResult thì lỗi validation không ném exception mà đưa vào result để bạn tự xử lý.\n\nĐiểm ghi bàn: 'cross-field = constraint mức class; BindingResult phải liền sau @Valid'.",
    "examples": ["public String submit(@Valid Form f, BindingResult br){  // br liền ngay sau\n  if (br.hasErrors()) return \"form\";  // tự xử lý, không ném exception\n}"]
   }
  ]
 },

 {
  "topic": "Elasticsearch & Search",
  "items": [
   {
    "question": "Inverted index là gì? Vì sao Elasticsearch tìm full-text nhanh?",
    "answer": "Inverted index (chỉ mục ngược) ánh xạ TỪ -> danh sách document chứa từ đó, ngược với forward index (document -> các từ). Khi index một document, ES phân tích (analyze) văn bản thành các term rồi thêm vào inverted index; mỗi term trỏ tới posting list các doc id (kèm vị trí, tần suất).\nVì sao nhanh: tìm 'java' chỉ cần tra 1 khóa trong từ điển term rồi lấy posting list, thay vì quét toàn bộ document như LIKE '%java%' của SQL. Term được sắp xếp nên tra cứu là binary search / FST.\nSo với DB quan hệ: index B-Tree của SQL tối ưu tìm CHÍNH XÁC/khoảng giá trị theo cột; inverted index tối ưu tìm TỪ bên trong văn bản dài + chấm điểm liên quan (relevance).\n\nĐiểm ghi bàn: nói được 'term -> posting list' và 'segment ghi một lần, không sửa; xóa chỉ đánh dấu tombstone, dọn khi merge'.",
    "examples": ["Doc1: 'java spring'   Doc2: 'java kafka'\ninverted index:\n  java   -> [1, 2]\n  spring -> [1]\n  kafka  -> [2]"]
   },
   {
    "question": "Shard và Replica khác nhau thế nào? Điều gì đổi được, điều gì không?",
    "answer": "Index được chia thành các SHARD (mảnh) — mỗi shard là một Lucene index độc lập, phân tán trên các node để chia tải và vượt giới hạn dung lượng 1 máy.\nPrimary shard: bản gốc, nhận write. Replica shard: bản sao của primary, đặt ở node KHÁC -> chịu lỗi (node chết vẫn còn dữ liệu) + tăng throughput ĐỌC (search chạy được trên cả replica).\nKhác biệt cốt lõi hay bị hỏi: số PRIMARY shard cố định lúc tạo index, muốn đổi phải reindex (vì routing = hash(_id) % số_primary). Số REPLICA đổi được bất cứ lúc nào bằng update settings.\nĐánh đổi: nhiều shard quá -> mỗi shard nhỏ, tốn overhead quản lý và search phải fan-out nhiều (khuyến nghị shard 10-50GB). Nhiều replica -> đọc nhanh, ghi chậm hơn và tốn dung lượng.\n\nĐiểm ghi bàn: 'primary cố định vì routing theo hash; replica đổi nóng được'.",
    "examples": ["PUT /my-index\n{ \"settings\": { \"number_of_shards\": 3, \"number_of_replicas\": 1 } }\n\n// đổi replica nóng (được), đổi shard (không được -> reindex)\nPUT /my-index/_settings\n{ \"number_of_replicas\": 2 }"]
   },
   {
    "question": "Analyzer gồm những gì? Vì sao search không ra kết quả mong đợi?",
    "answer": "Analyzer = 0..n character filter -> ĐÚNG 1 tokenizer -> 0..n token filter.\n- Character filter: xử lý ký tự thô (bỏ thẻ HTML).\n- Tokenizer: cắt văn bản thành token ('Học Java Cơ Bản' -> [Học, Java, Cơ, Bản]).\n- Token filter: lowercase, bỏ stopword, stemming, synonym, ascii folding (bỏ dấu tiếng Việt).\nQuy tắc VÀNG: text được analyze lúc INDEX và lúc SEARCH phải khớp nhau, nếu không sẽ không match. Ví dụ index lowercase mà query dùng term (không analyze) chữ hoa -> 0 kết quả.\nNguyên nhân 'search không ra' thường gặp: dùng field kiểu keyword (không analyze, so khớp nguyên chuỗi) trong khi mong đợi full-text -> phải dùng field kiểu text.\n\nĐiểm ghi bàn: nhắc mẹo tiếng Việt là dùng asciifolding để 'ha noi' tìm được 'Hà Nội'.",
    "examples": ["GET /_analyze\n{ \"tokenizer\": \"standard\",\n  \"filter\": [\"lowercase\", \"asciifolding\"],\n  \"text\": \"Hà Nội\" }\n// -> [ha, noi]"]
   },
   {
    "question": "text vs keyword khác nhau ra sao? Khi nào dùng cái nào?",
    "answer": "text: được ANALYZE thành nhiều term -> dùng cho tìm kiếm full-text (match). Không sort/aggregate tốt được.\nkeyword: KHÔNG analyze, lưu nguyên chuỗi thành 1 term -> dùng cho lọc chính xác (term), sort, aggregation, phân trang theo giá trị.\nThực tế người ta khai báo MULTI-FIELD: field chính là text, kèm sub-field .keyword để vừa search vừa aggregate.\nHệ quả: aggregation theo 'status' phải dùng status.keyword, nếu dùng status (text) sẽ gom nhóm theo từng token rời rạc -> sai.\n\nĐiểm ghi bàn: 'text để match, keyword để filter/sort/aggregate; multi-field cho cả hai'.",
    "examples": ["\"title\": {\n  \"type\": \"text\",\n  \"fields\": { \"keyword\": { \"type\": \"keyword\" } }\n}\n// search: match trên title\n// aggregate/sort: dùng title.keyword"]
   },
   {
    "question": "query context vs filter context? Vì sao filter nhanh hơn?",
    "answer": "query context trả lời 'khớp TỐT tới mức nào' -> tính _score (relevance) bằng BM25, KHÔNG cache được (điểm phụ thuộc truy vấn).\nfilter context trả lời 'có/không' -> không tính điểm, kết quả được CACHE (node query cache) nên lần sau rất nhanh.\nTrong bool query: must + should chạy query context (có điểm); filter + must_not chạy filter context (không điểm).\nQuy tắc thực chiến: mọi điều kiện lọc cứng (status = active, khoảng ngày, tenant_id) đưa vào filter; chỉ để phần văn bản người dùng gõ trong must/match.\n\nĐiểm ghi bàn: 'chuyển điều kiện lọc từ must sang filter là cách tối ưu rẻ nhất, thường nhanh gấp nhiều lần nhờ cache'.",
    "examples": ["{ \"query\": { \"bool\": {\n  \"must\":   [ { \"match\": { \"title\": \"java spring\" } } ],   // có điểm\n  \"filter\": [ { \"term\":  { \"status\": \"published\" } },      // cache\n              { \"range\": { \"created\": { \"gte\": \"now-30d\" } } } ]\n}}}"]
   },
   {
    "question": "Vì sao nói Elasticsearch là NEAR real-time? refresh, flush, merge là gì?",
    "answer": "Document ghi vào memory buffer + translog (write-ahead log). Nó CHƯA tìm thấy được ngay cho tới khi REFRESH tạo ra segment mới có thể search — mặc định mỗi 1 giây -> vì vậy gọi là near real-time (độ trễ ~1s), không phải real-time.\n- refresh (1s): buffer -> segment mới, search thấy được. Tốn CPU nếu quá dày.\n- flush: đẩy segment xuống đĩa bền vững và cắt translog (đảm bảo không mất dữ liệu).\n- merge: gộp nhiều segment nhỏ thành lớn, đồng thời dọn document đã xóa (tombstone) vì segment bất biến, xóa chỉ là đánh dấu.\nTối ưu bulk import: tạm đặt refresh_interval = -1 và replica = 0, xong việc thì bật lại -> nhanh hơn rất nhiều.\n\nĐiểm ghi bàn: 'segment bất biến (immutable) là lý do có tombstone và cần merge'.",
    "examples": ["PUT /idx/_settings { \"refresh_interval\": \"-1\", \"number_of_replicas\": 0 }\n// ... bulk index ...\nPUT /idx/_settings { \"refresh_interval\": \"1s\", \"number_of_replicas\": 1 }\nPOST /idx/_forcemerge?max_num_segments=1"]
   },
   {
    "question": "Một search request chạy qua cluster như thế nào? Vì sao deep paging chậm?",
    "answer": "Node nhận request thành COORDINATING node -> fan-out tới tất cả shard liên quan. Mỗi shard tự chấm điểm cục bộ và trả về top-K (giai đoạn QUERY, chỉ id + score) -> coordinating gộp, sắp xếp, chọn top-K toàn cục -> giai đoạn FETCH lấy nội dung document.\nVì sao deep paging (from=10000, size=10) chậm: MỖI shard phải trả về from+size = 10010 kết quả để coordinating gộp, tốn RAM và CPU theo cấp số nhân -> ES chặn ở index.max_result_window = 10000.\nGiải pháp: search_after (dùng sort value của bản ghi cuối làm con trỏ, giống keyset pagination trong SQL) cho phân trang sâu; scroll/PIT cho export số lượng lớn.\n\nĐiểm ghi bàn: đối chiếu 'search_after ~ keyset pagination', cùng một nguyên lý với OFFSET lớn trong SQL.",
    "examples": ["// thay vì from: 10000\n{ \"size\": 10,\n  \"sort\": [ {\"created\":\"desc\"}, {\"_id\":\"asc\"} ],\n  \"search_after\": [ 1690000000000, \"doc-123\" ] }"]
   },
   {
    "question": "Tình huống: đồng bộ dữ liệu từ MySQL sang Elasticsearch thế nào cho đúng?",
    "answer": "Nguyên tắc: DB quan hệ là NGUỒN SỰ THẬT (source of truth), ES chỉ là chỉ mục phục vụ tìm kiếm — mất ES phải rebuild lại được.\nCác cách, từ đơn giản tới bền vững:\n1. Dual write (ghi DB rồi ghi ES trong cùng service): đơn giản nhưng KHÔNG nguyên tử — ES lỗi là lệch dữ liệu.\n2. Polling theo updated_at: đơn giản, độ trễ cao, dễ sót bản ghi cập nhật cùng mốc thời gian.\n3. Outbox pattern: ghi DB + ghi bảng outbox trong CÙNG transaction, một worker đọc outbox đẩy sang ES -> đảm bảo không mất.\n4. CDC (Debezium đọc binlog) -> Kafka -> consumer index vào ES: chuẩn nhất cho hệ lớn, không đụng vào code nghiệp vụ.\nLuôn kèm: job reindex định kỳ để tự chữa lệch, và dùng ALIAS để reindex không downtime (tạo index mới rồi trỏ alias sang).\n\nĐiểm ghi bàn: nói 'alias để zero-downtime reindex' và 'outbox/CDC thay cho dual write'.",
    "examples": ["POST /_aliases\n{ \"actions\": [\n  { \"remove\": { \"index\": \"products_v1\", \"alias\": \"products\" } },\n  { \"add\":    { \"index\": \"products_v2\", \"alias\": \"products\" } }\n]}"]
   }
  ]
 },

 {
  "topic": "gRPC & GraphQL",
  "items": [
   {
    "question": "REST vs gRPC vs GraphQL — chọn cái nào và vì sao?",
    "answer": "Không có cái 'tốt nhất', chỉ có cái hợp ngữ cảnh — người phỏng vấn muốn nghe LÝ DO chọn.\n- REST: CRUD đơn giản, public API, tận dụng được cache HTTP, hệ sinh thái/công cụ rộng nhất. Nhược: over-fetching/under-fetching, dễ phải gọi nhiều lần.\n- gRPC: nội bộ service-to-service, nhạy cảm độ trễ. Protobuf nhị phân + HTTP/2, hợp đồng .proto sinh code đa ngôn ngữ, có streaming. Nhược: trình duyệt không gọi trực tiếp được (cần gRPC-Web/Envoy proxy), payload khó đọc khi debug.\n- GraphQL: nhiều loại client cần hình dạng dữ liệu khác nhau (web/mobile), diệt over/under-fetching bằng 1 round trip. Nhược: mất cache HTTP (POST 1 URL), rủi ro N+1, client có thể gửi query cực nặng.\nCâu trả lời 'chín' nhất: KẾT HỢP — REST/GraphQL ở biên cho client, gRPC bên trong giữa các service.\n\nĐiểm ghi bàn: 'REST làm tốt vẫn hơn GraphQL làm ẩu'; đừng mặc định chọn cái mới nhất.",
    "examples": ["Client (browser/mobile)\n   |  REST / GraphQL  (dễ cache, dễ debug)\n   v\nAPI Gateway / BFF\n   |  gRPC  (nhị phân, nhanh, có contract)\n   v\nOrder-svc  <-->  Payment-svc  <-->  Inventory-svc"]
   },
   {
    "question": "gRPC hoạt động thế nào? Protobuf và HTTP/2 mang lại gì?",
    "answer": "gRPC = RPC (gọi hàm từ xa như gọi hàm nội bộ) dựa trên 2 nền tảng:\n1. Protocol Buffers: định dạng nhị phân, có schema. Bạn khai báo service + message trong file .proto — đó là HỢP ĐỒNG. Trình biên dịch protoc sinh sẵn code client (stub) và server (skeleton) cho nhiều ngôn ngữ -> type-safe, không tự viết parse JSON. Payload nhỏ hơn JSON nhiều lần và serialize nhanh hơn đáng kể.\n2. HTTP/2: multiplexing nhiều request trên MỘT kết nối TCP (không bị head-of-line blocking như HTTP/1.1), nén header, hỗ trợ streaming 2 chiều.\nTương thích ngược: mỗi field có SỐ HIỆU (tag). Thêm field mới với số mới thì client cũ bỏ qua an toàn; TUYỆT ĐỐI không đổi/tái dùng số hiệu cũ (dùng reserved).\n\nĐiểm ghi bàn: 'số hiệu field, không phải tên field, mới là thứ quyết định tương thích'.",
    "examples": ["service OrderService {\n  rpc GetOrder (GetOrderRequest) returns (Order);\n}\nmessage Order {\n  string id     = 1;\n  int64  amount = 2;\n  reserved 3;            // số cũ đã bỏ, không tái dùng\n  string currency = 4;   // thêm mới -> client cũ bỏ qua\n}"]
   },
   {
    "question": "4 kiểu giao tiếp (streaming) của gRPC là gì?",
    "answer": "1. Unary: 1 request -> 1 response (giống REST thông thường).\n2. Server streaming: 1 request -> server trả về LUỒNG nhiều response (vd: tải danh sách lớn theo lô, theo dõi tiến trình).\n3. Client streaming: client gửi LUỒNG nhiều request -> server trả 1 response (vd: upload từng chunk, gom số liệu rồi tổng kết).\n4. Bidirectional streaming: cả hai bên gửi/nhận độc lập trên cùng một kết nối (vd: chat, đồng bộ thời gian thực).\nƯu điểm so với WebSocket: vẫn giữ được hợp đồng .proto và type-safety, không phải tự định nghĩa giao thức message.\nDeadline/timeout là bắt buộc trong thực chiến: client đặt deadline, server thấy context bị hủy thì dừng xử lý -> tránh lãng phí tài nguyên khi client đã bỏ đi.\n\nĐiểm ghi bàn: nêu 'deadline propagation' — deadline lan truyền qua chuỗi gọi, thứ REST không có sẵn.",
    "examples": ["rpc GetOrder      (Req) returns (Res);              // unary\nrpc WatchOrders   (Req) returns (stream Res);      // server stream\nrpc UploadChunks  (stream Req) returns (Res);      // client stream\nrpc Chat          (stream Req) returns (stream Res); // bidi"]
   },
   {
    "question": "GraphQL giải quyết vấn đề gì? Query, Mutation, Subscription, Resolver?",
    "answer": "Vấn đề GraphQL sinh ra để giải: over-fetching (REST trả cả đống field client không dùng) và under-fetching (phải gọi 3-4 endpoint mới dựng xong 1 màn hình). GraphQL cho client TỰ KHAI BÁO cần đúng field nào, trả về đúng hình dạng đó trong 1 request.\nBa loại thao tác: Query (đọc), Mutation (ghi, chạy tuần tự), Subscription (nhận realtime qua WebSocket).\nResolver: hàm phía server chịu trách nhiệm lấy dữ liệu cho MỘT field. GraphQL đi theo cây query, gọi resolver theo từng cấp — đây chính là lý do sinh ra N+1.\nSchema là hợp đồng, có kiểu mạnh, tự sinh tài liệu (introspection).\nLưu ý: GraphQL luôn trả HTTP 200 kể cả khi lỗi — lỗi nằm trong mảng \"errors\" của body, nên monitoring theo status code sẽ 'mù'.\n\nĐiểm ghi bàn: 'luôn 200 + errors[]' là chi tiết ít người nhớ nhưng rất thực tế.",
    "examples": ["query {\n  user(id: \"1\") {\n    name\n    orders(last: 5) { id, total }   # đúng field cần, 1 round trip\n  }\n}"]
   },
   {
    "question": "N+1 problem trong GraphQL là gì? DataLoader giải quyết ra sao?",
    "answer": "Tình huống: query lấy 100 order, mỗi order lại resolve field 'user' -> resolver gọi DB 1 lần cho mỗi order = 1 (lấy orders) + 100 (lấy user) = 101 truy vấn, thay vì 2.\nGraphQL dễ dính hơn REST vì client tự ghép cây field, server không đoán trước được.\nDataLoader: gom (batch) các yêu cầu phát sinh trong CÙNG một tick sự kiện thành 1 lời gọi duy nhất (SELECT * FROM user WHERE id IN (...)), đồng thời CACHE theo từng request để không hỏi trùng id.\nCác biện pháp đi kèm bắt buộc trong production:\n- Query depth limit + complexity analysis: chặn query lồng sâu vô hạn gây sập DB.\n- Persisted query: chỉ cho phép các query đã đăng ký sẵn (an toàn + cache được).\n- Phân quyền ở cấp FIELD trong resolver, không phải ở cấp endpoint như REST.\n\nĐiểm ghi bàn: 'DataLoader batch theo tick + cache theo request', và nói được rằng N+1 là sự cố production phổ biến nhất của GraphQL.",
    "examples": ["// không có DataLoader: 1 + 100 query\norders.forEach(o => db.findUser(o.userId));\n\n// có DataLoader: 1 + 1 query\nconst loader = new DataLoader(ids => db.findUsersByIds(ids));\norders.forEach(o => loader.load(o.userId));  // gom thành IN (...)"]
   },
   {
    "question": "Caching và versioning khác nhau ra sao giữa REST, gRPC, GraphQL?",
    "answer": "CACHING:\n- REST: GET + URL riêng biệt -> tận dụng MIỄN PHÍ cache HTTP nhiều tầng (browser, CDN, proxy) qua ETag/Cache-Control. Đây là lợi thế lớn nhất khi traffic đọc khổng lồ.\n- GraphQL: mọi thứ POST vào 1 URL -> mất cache HTTP, phải tự dựng ở tầng ứng dụng (Apollo client cache, persisted query + GET, cache theo resolver).\n- gRPC: nhị phân trên HTTP/2, cũng không dùng được cache HTTP thông thường -> tự cache trong ứng dụng.\nVERSIONING:\n- REST: /v1, /v2 hoặc header; dễ hiểu nhưng dễ phình nhiều phiên bản.\n- gRPC: tiến hóa schema bằng số hiệu field (thêm field mới, reserved field cũ) -> thường không cần v2.\n- GraphQL: 'không version' — thêm field mới thoải mái, field cũ đánh dấu @deprecated rồi theo dõi mức sử dụng trước khi gỡ.\n\nĐiểm ghi bàn: 'nếu đọc nhiều và cache được thì REST vẫn là lựa chọn kinh tế nhất'.",
    "examples": ["type User {\n  fullName: String\n  name: String @deprecated(reason: \"dùng fullName\")\n}"]
   },
   {
    "question": "Tình huống: hệ thống microservices nội bộ đang dùng REST/JSON, có nên chuyển sang gRPC?",
    "answer": "Khung trả lời: ĐO trước, đổi sau — đừng chuyển vì 'gRPC nhanh hơn'.\n1. Xác định nút thắt thật: nếu độ trễ đến từ truy vấn DB hoặc thiết kế chatty (gọi qua lại quá nhiều), đổi giao thức không cứu được.\n2. gRPC đáng giá khi: gọi nội bộ tần suất rất cao, payload lớn, cần streaming, đội đa ngôn ngữ cần contract chặt, hoặc chi phí CPU serialize JSON đã lộ rõ trên profile.\n3. Chi phí phải nói ra: hạ tầng quan sát (log/trace không đọc được bằng mắt), tooling (không curl được, cần grpcurl), CI sinh code từ .proto, load balancer phải hiểu HTTP/2 (L7, không phải L4 theo kết nối vì gRPC giữ kết nối lâu -> lệch tải).\n4. Lộ trình an toàn: chuyển 1-2 cặp service nóng nhất trước, đo lại p99, giữ REST ở biên cho client.\n\nĐiểm ghi bàn: nêu bẫy load balancing — gRPC dùng kết nối bền, LB kiểu L4 sẽ dồn tải lệch về vài pod.",
    "examples": ["Đo trước khi đổi:\n  p99 hiện tại = 800ms;  serialize JSON chiếm 15ms  -> đổi gRPC vô nghĩa\n  p99 hiện tại = 40ms;   serialize JSON chiếm 18ms  -> đổi có ý nghĩa"]
   }
  ]
 },

 {
  "topic": "AWS nâng cao (Lambda, DynamoDB, SQS)",
  "items": [
   {
    "question": "Lambda cold start là gì? Các cách giảm, và khác biệt Provisioned vs Reserved concurrency?",
    "answer": "Cold start: khi chưa có execution environment sẵn, Lambda phải khởi tạo môi trường mới — tải code, khởi động runtime, chạy phần init — rồi mới chạy handler. Java/.NET nặng hơn Node/Python nên chịu ảnh hưởng rõ nhất.\nCách giảm (từ rẻ tới đắt):\n1. Giảm kích thước gói, lười khởi tạo (lazy), tái dùng kết nối bằng cách khai báo client NGOÀI handler để dùng lại giữa các lần gọi ấm.\n2. Tăng memory -> được cấp nhiều CPU hơn -> init nhanh hơn (đôi khi rẻ hơn vì chạy nhanh hơn).\n3. SnapStart (Java/Python/.NET): chụp snapshot môi trường đã init sẵn, khôi phục cực nhanh.\n4. Provisioned Concurrency: giữ sẵn N môi trường đã init, luôn ấm — TỐN TIỀN kể cả không có request, và phải trỏ vào version/alias chứ không dùng được $LATEST.\nBẪY KINH ĐIỂN — Reserved concurrency KHÔNG giữ ấm: nó đặt TRẦN số lần chạy đồng thời của một function, mục đích là bảo vệ (không cho 1 function ăn hết quota tài khoản, hoặc bảo vệ DB phía sau).\n\nĐiểm ghi bàn: phân biệt đúng Provisioned (giữ ấm, chống cold start) vs Reserved (giới hạn trần, bảo vệ). Timeout mặc định 3s, tối đa 15 phút; quá 15 phút thì dùng Step Functions/ECS Fargate.",
    "examples": ["const client = new S3Client({});   // NGOÀI handler -> tái dùng khi ấm\n\nexport const handler = async (event) => {\n  // trong handler: chỉ logic, không khởi tạo nặng\n};"]
   },
   {
    "question": "SQS vs SNS vs EventBridge — khi nào dùng cái nào? Fan-out là gì?",
    "answer": "- SQS (queue, pull): 1 message -> 1 consumer xử lý. Dùng để tách rời (decouple) và làm đệm chống tải đột biến. Standard queue: at-least-once + KHÔNG đảm bảo thứ tự -> consumer BẮT BUỘC idempotent. FIFO queue: đúng thứ tự + exactly-once trong nhóm, nhưng throughput thấp hơn.\n- SNS (topic, push): 1 message -> N subscriber nhận đồng thời (pub/sub).\n- EventBridge: như SNS nhưng lọc theo NỘI DUNG sự kiện bằng rule, tích hợp SaaS, có schema registry -> hợp kiến trúc event-driven.\nFAN-OUT: SNS topic -> nhiều SQS queue -> mỗi service tự tiêu thụ theo nhịp của mình. Ưu điểm so với SNS đẩy thẳng vào Lambda: có queue làm đệm và retry, một consumer chết không ảnh hưởng consumer khác.\nDLQ (Dead Letter Queue): message thất bại quá maxReceiveCount thì chuyển sang DLQ để điều tra, tránh chặn queue chính (poison message).\nVisibility timeout: phải đặt LỚN HƠN thời gian xử lý, nếu không message sẽ hiện lại và bị xử lý trùng.\n\nĐiểm ghi bàn: 'SQS standard là at-least-once nên phải idempotent' + 'visibility timeout > thời gian xử lý'.",
    "examples": ["Order Service\n   -> SNS topic \"order-created\"\n        -> SQS: email-queue     -> Email Service\n        -> SQS: inventory-queue -> Inventory Service\n        -> SQS: analytics-queue -> Analytics\n     (mỗi queue có DLQ riêng)"]
   },
   {
    "question": "DynamoDB: chọn partition key thế nào? Hot partition xử lý ra sao?",
    "answer": "DynamoDB băm partition key để quyết định dữ liệu nằm ở partition nào. MỖI partition có trần cứng khoảng 3.000 RCU và 1.000 WCU — nên tăng capacity ở mức bảng KHÔNG cứu được một partition nóng.\nBa nguyên tắc chọn partition key: cardinality cao, phân bố đều, và bám sát access pattern (thiết kế theo CÁCH TRUY VẤN, không theo chuẩn hóa như SQL).\nNguyên nhân hot partition thường gặp: key cardinality thấp (status = 'ACTIVE'), key theo ngày (mọi ghi trong ngày dồn 1 partition), item nổi tiếng (1 sản phẩm viral).\nCách xử lý:\n- Write sharding: thêm hậu tố ngẫu nhiên/tính toán vào key -> '2026-07-25#3'.\n- Composite key: ghép nhiều thuộc tính để tăng cardinality.\n- Chẩn đoán bằng CloudWatch Contributor Insights để tìm key nóng.\n- Đọc: chuyển strongly consistent -> eventually consistent, tốn nửa RCU (gấp đôi năng lực đọc ngay lập tức); hoặc đặt DAX/cache trước.\nSort key cho phép truy vấn theo khoảng và mô hình one-to-many trong cùng partition; GSI để truy vấn theo thuộc tính khác (GSI thưa - sparse index - chỉ chứa item có khóa đó, rất tiết kiệm).\n\nĐiểm ghi bàn: nói được con số 3.000 RCU / 1.000 WCU mỗi partition — chi tiết này gây ấn tượng ngay.",
    "examples": ["// hot: mọi ghi trong ngày dồn 1 partition\nPK = \"2026-07-25\"\n\n// đã shard: rải đều 10 partition\nPK = \"2026-07-25#\" + (hash(orderId) % 10)\n// đọc: query song song 10 shard rồi gộp"]
   },
   {
    "question": "IAM: Role vs User vs Policy? Vì sao không bao giờ nhúng access key vào code?",
    "answer": "- User: danh tính lâu dài của người/hệ thống, có access key cố định.\n- Role: danh tính TẠM THỜI, không có credential cố định; ai đó 'assume role' thì STS cấp credential có hạn (tự hết hạn, tự xoay vòng).\n- Policy: tài liệu JSON mô tả quyền (Effect / Action / Resource / Condition), gắn vào user, role hoặc resource.\nHai loại policy cần phân biệt: identity-based (gắn vào role: 'code này được làm gì') và resource-based (gắn vào tài nguyên: 'ai được gọi tôi' — vd bucket policy, Lambda resource policy).\nVì sao dùng role thay vì access key: key nhúng trong code/biến môi trường sẽ bị lộ qua git, log, image; role thì credential tự hết hạn và không cần lưu ở đâu cả. EC2 dùng instance profile, EKS dùng IRSA, Lambda dùng execution role.\nNguyên tắc least privilege: cấp đúng action + đúng resource ARN cụ thể, không dùng \"Action\": \"*\" / \"Resource\": \"*\".\nThứ tự đánh giá: explicit DENY luôn thắng, sau đó cần có explicit ALLOW, mặc định là deny.\n\nĐiểm ghi bàn: 'explicit deny luôn thắng' và 'role = credential tạm thời do STS cấp'.",
    "examples": ["{ \"Effect\": \"Allow\",\n  \"Action\": [\"s3:GetObject\"],\n  \"Resource\": \"arn:aws:s3:::my-bucket/uploads/*\",\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"true\" } } }"]
   },
   {
    "question": "6 trụ cột Well-Architected Framework là gì?",
    "answer": "1. Operational Excellence: vận hành, giám sát, cải tiến liên tục (IaC, runbook, tự động hóa deploy, rút kinh nghiệm sau sự cố).\n2. Security: IAM least privilege, mã hóa khi lưu trữ và khi truyền, phát hiện (CloudTrail/GuardDuty), phản ứng sự cố.\n3. Reliability: chịu lỗi và tự phục hồi — multi-AZ, health check, retry có exponential backoff + jitter, quản lý quota, kiểm thử khôi phục.\n4. Performance Efficiency: chọn đúng loại tài nguyên, dùng serverless/managed thay vì tự vận hành, đo và điều chỉnh liên tục.\n5. Cost Optimization: đúng kích cỡ (right-sizing), Savings Plan/Spot, S3 lifecycle, tắt tài nguyên nhàn rỗi, gắn tag để quy trách nhiệm chi phí.\n6. Sustainability: giảm tác động môi trường — tận dụng tối đa tài nguyên, chọn region/phần cứng hiệu quả.\nMẹo trả lời: khi được hỏi 'thiết kế hệ thống trên AWS', hãy đi lần lượt theo các trụ cột này — câu trả lời tự khắc có cấu trúc và đầy đủ.\n\nĐiểm ghi bàn: nhớ đúng 6 (nhiều người chỉ nhớ 5, thiếu Sustainability). Có công cụ miễn phí Well-Architected Tool để tự đánh giá.",
    "examples": ["Ứng dụng khi thiết kế:\n  Reliability  -> multi-AZ + ALB health check + retry backoff\n  Security     -> private subnet + IAM role + KMS + WAF\n  Cost         -> Spot cho worker, S3 lifecycle -> Glacier\n  Performance  -> CloudFront + ElastiCache + đúng instance type"]
   },
   {
    "question": "Tình huống: Lambda gọi RDS bị timeout và cạn kết nối. Xử lý thế nào?",
    "answer": "Đây là câu tình huống kinh điển vì nó chạm cả networking, concurrency lẫn database.\nNguyên nhân gốc: Lambda scale theo chiều ngang tới hàng nghìn instance, MỖI instance mở kết nối riêng -> RDS cạn max_connections rất nhanh. Đây là xung đột bản chất giữa serverless (vô số tiến trình ngắn) và DB quan hệ (pool kết nối hữu hạn).\nThứ tự kiểm tra và xử lý:\n1. Mạng: Lambda có nằm trong VPC không, subnet/route table đúng chưa, Security Group của RDS có cho phép SG của Lambda không (SG là stateful, NACL là stateless).\n2. Kết nối: dùng RDS Proxy để gộp và tái dùng kết nối — đây là lời giải chuẩn của AWS cho đúng vấn đề này.\n3. Giới hạn: đặt reserved concurrency cho function để chặn trần, không cho nó đánh sập DB.\n4. Code: khởi tạo connection NGOÀI handler để tái dùng khi môi trường còn ấm; đặt timeout kết nối ngắn hơn timeout của Lambda để lỗi rõ ràng thay vì treo.\n5. Cold start: nếu p99 xấu do init, cân nhắc Provisioned Concurrency.\n6. Quan sát: CloudWatch DatabaseConnections, CPU, slow query log.\n\nĐiểm ghi bàn: gọi tên RDS Proxy + reserved concurrency, và giải thích được VÌ SAO serverless hay cạn kết nối.",
    "examples": ["Lambda (1000 concurrent)\n   -> RDS Proxy (gộp còn ~50 kết nối)\n   -> RDS MySQL (max_connections = 150)\n\n+ reserved concurrency = 100 để chặn trần"]
   },
   {
    "question": "EC2 vs ECS/Fargate vs Lambda — chọn compute thế nào? Chi phí ra sao?",
    "answer": "- EC2: toàn quyền kiểm soát máy ảo (OS, tuning, phần mềm đặc thù, license). Bạn tự vá lỗi, tự scale. Hợp workload chạy liên tục, ổn định, hoặc cần cấu hình đặc biệt (GPU, phần mềm legacy).\n- ECS/EKS trên Fargate: chạy container mà không quản lý server. Hợp service chạy dài (long-running), cần kiểm soát runtime/thư viện, thời gian xử lý lâu.\n- Lambda: theo sự kiện, tự scale về 0, trả tiền theo mili-giây thực dùng. Hợp việc ngắn, tải bùng nổ không đều, hoặc dán các dịch vụ với nhau. Giới hạn 15 phút và có cold start.\nQuy tắc chi phí: tải THẤP hoặc THẤT THƯỜNG -> Lambda rẻ vượt trội (không dùng không trả tiền). Tải CAO và ĐỀU 24/7 -> EC2 (Savings Plan/Reserved) hoặc Fargate rẻ hơn nhiều so với Lambda.\nCác hình thức mua EC2: On-Demand (linh hoạt, đắt), Reserved/Savings Plan (cam kết 1-3 năm, giảm sâu), Spot (rẻ nhất tới ~90% nhưng có thể bị thu hồi trong 2 phút -> chỉ dùng cho worker chịu lỗi được, batch, CI).\n\nĐiểm ghi bàn: đưa ra tiêu chí ĐỊNH LƯỢNG (tải đều hay bùng nổ, thời gian chạy, mức kiểm soát) thay vì cảm tính 'serverless hiện đại hơn'.",
    "examples": ["Cron 5 phút/lần, chạy 2 giây   -> Lambda (gần như miễn phí)\nAPI 24/7, tải đều 500 req/s    -> ECS Fargate / EC2 + Savings Plan\nXử lý video 40 phút            -> ECS (Lambda tối đa 15 phút)\nBatch ML ban đêm, chịu lỗi được -> EC2 Spot"]
   }
  ]
 },

 {
  "topic": "Design Patterns (GoF)",
  "items": [
   {
    "question": "23 mẫu GoF chia làm mấy nhóm? Mỗi nhóm giải quyết gì?",
    "answer": "Gang of Four chia 23 mẫu thành 3 nhóm theo MỤC ĐÍCH:\n1. CREATIONAL (5) — về cách TẠO đối tượng, tách nơi dùng khỏi logic khởi tạo: Singleton, Factory Method, Abstract Factory, Builder, Prototype.\n2. STRUCTURAL (7) — về cách GHÉP class/object thành cấu trúc lớn hơn: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.\n3. BEHAVIORAL (11) — về cách các đối tượng GIAO TIẾP và phân chia trách nhiệm: Strategy, Observer, Command, Template Method, Iterator, State, Chain of Responsibility, Mediator, Memento, Visitor, Interpreter.\nMẹo nhớ: Creational = 'sinh ra thế nào', Structural = 'lắp ghép thế nào', Behavioral = 'phối hợp thế nào'.\nLưu ý thái độ khi phỏng vấn: đừng nhồi pattern cho có. Hãy giải bài toán sạch sẽ trước, rồi mới GỌI TÊN pattern nếu nó khớp — người phỏng vấn đánh giá cao điều này hơn là đọc thuộc lòng.\n\nĐiểm ghi bàn: nêu đúng 3 nhóm + ví dụ đại diện mỗi nhóm là đã qua được câu mở đầu.",
    "examples": ["Creational : Singleton, Factory, Abstract Factory, Builder, Prototype\nStructural : Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy\nBehavioral : Strategy, Observer, Command, Template Method, Iterator,\n             State, Chain of Responsibility, Mediator, Memento, Visitor, Interpreter"]
   },
   {
    "question": "Singleton: các cách cài đặt an toàn luồng? Cách nào tốt nhất và vì sao?",
    "answer": "Mục tiêu: đảm bảo chỉ có MỘT thể hiện trong toàn ứng dụng và cung cấp điểm truy cập toàn cục.\nCác cách, từ yếu tới mạnh:\n1. Eager initialization: tạo ngay lúc load class — an toàn luồng nhưng tạo cả khi không dùng.\n2. synchronized getInstance(): an toàn nhưng khóa mọi lần gọi -> chậm.\n3. Double-checked locking: phải có từ khóa VOLATILE, nếu không sẽ dính lỗi do JVM sắp xếp lại lệnh (reordering) khiến thread khác thấy đối tượng chưa khởi tạo xong.\n4. Bill Pugh (static holder class): JVM đảm bảo class chỉ được load một lần và lười (lazy) — gọn, nhanh, không cần synchronized.\n5. ENUM: cách chắc chắn nhất — an toàn luồng, và là cách DUY NHẤT chống được cả reflection lẫn deserialization.\nCác đường phá vỡ Singleton phải kể ra được: reflection (setAccessible gọi constructor riêng tư), deserialization (tạo instance mới -> chống bằng readResolve()), clone() (chống bằng cách ném CloneNotSupportedException), và nhiều classloader khác nhau.\nTrong Spring: bean mặc định là singleton, nhưng là singleton THEO CONTAINER (mỗi ApplicationContext một thể hiện), không phải singleton theo classloader như mẫu GoF.\n\nĐiểm ghi bàn: nói 'volatile trong DCL' và 'enum chống được reflection + deserialization'.",
    "examples": ["// Bill Pugh - lazy, thread-safe, không synchronized\npublic class Config {\n  private Config() {}\n  private static class Holder { static final Config I = new Config(); }\n  public static Config getInstance() { return Holder.I; }\n}\n\n// Enum - chắc chắn nhất\npublic enum Config { INSTANCE; public void load() {} }"]
   },
   {
    "question": "Factory Method vs Abstract Factory vs Builder khác nhau thế nào?",
    "answer": "- FACTORY METHOD: một phương thức tạo ra MỘT loại đối tượng, giấu logic 'new' khỏi nơi gọi. Nơi gọi chỉ biết interface, thêm loại mới không phải sửa code gọi. Ví dụ JDK: Integer.valueOf(), Calendar.getInstance().\n- ABSTRACT FACTORY: 'nhà máy của các nhà máy' — tạo một HỌ đối tượng liên quan phải đi cùng nhau, đảm bảo không trộn lẫn (vd bộ UI Windows: WinButton + WinCheckbox, không lẫn MacButton).\n- BUILDER: dựng MỘT đối tượng PHỨC TẠP theo từng bước. Giải quyết bài toán 'telescoping constructor' (constructor 8 tham số không biết cái nào là cái nào) và tạo đối tượng BẤT BIẾN (immutable) — gán field lúc build, sau đó không sửa được nên tự nhiên an toàn luồng. Tên phương thức làm code dễ đọc, và đối tượng luôn ra đời ở trạng thái hoàn chỉnh.\nPhân biệt nhanh: Factory quan tâm TẠO CÁI GÌ; Builder quan tâm TẠO NHƯ THẾ NÀO (nhiều bước, nhiều tham số tùy chọn).\nVí dụ trong JDK/Spring: Calendar.Builder, Locale.Builder, StringBuilder; Spring có BeanFactory (factory), Lombok @Builder.\n\nĐiểm ghi bàn: gắn Builder với TÍNH BẤT BIẾN và an toàn luồng, không chỉ nói 'cho dễ đọc'.",
    "examples": ["// Builder: bất biến + dễ đọc\nUser u = User.builder()\n             .name(\"Tien\")\n             .email(\"a@b.com\")\n             .active(true)\n             .build();\n\n// Factory: giấu logic tạo\nPayment p = PaymentFactory.of(\"MOMO\");   // trả về interface Payment"]
   },
   {
    "question": "Strategy pattern là gì? Cài đặt trong Spring thế nào cho đẹp?",
    "answer": "Strategy: đóng gói mỗi thuật toán/hành vi thành một class riêng cùng implement chung một interface, cho phép ĐỔI hành vi lúc chạy. Đây là liều thuốc chuẩn cho chuỗi if/else - switch dài dằng dặc theo 'loại'.\nLợi ích: tuân thủ Open/Closed (thêm loại mới = thêm class mới, KHÔNG sửa code cũ), mỗi thuật toán test độc lập được.\nCài đặt trong Spring rất gọn: khai báo interface, mỗi cài đặt là một @Component; Spring có thể inject cả Map<String, Strategy> (key là tên bean) hoặc List<Strategy> -> chọn đúng cái cần theo khóa. Thêm phương thức thanh toán mới chỉ việc thêm 1 class.\nPhân biệt dễ nhầm: một kiểu - nhiều thuật toán cùng họ = STRATEGY; nhiều kiểu - cùng thuật toán = VISITOR; thêm chức năng phụ không thuộc thuật toán chính (như logging) = DECORATOR.\nSo với Template Method: Template Method cố định KHUNG các bước ở lớp cha, cho lớp con ghi đè vài bước (dùng kế thừa); Strategy thay TOÀN BỘ thuật toán (dùng composition — thường được ưu tiên hơn).\n\nĐiểm ghi bàn: chỉ ra Strategy + Map injection của Spring là cách khử if/else sạch nhất trong code thực tế.",
    "examples": ["public interface PaymentStrategy { void pay(long amount); }\n\n@Component(\"MOMO\")  class MomoPayment implements PaymentStrategy {...}\n@Component(\"VNPAY\") class VnPayPayment implements PaymentStrategy {...}\n\n@Service\nclass PaymentService {\n  private final Map<String, PaymentStrategy> strategies;  // Spring tự inject\n  void pay(String type, long amount) {\n    strategies.get(type).pay(amount);   // hết if/else\n  }\n}"]
   },
   {
    "question": "Observer pattern là gì? Ứng dụng trong Spring Event?",
    "answer": "Observer: một đối tượng (subject/publisher) thay đổi trạng thái thì TẤT CẢ các observer đã đăng ký được thông báo tự động. Mục đích là giảm phụ thuộc: publisher không cần biết ai đang nghe, thêm người nghe mới không phải sửa publisher.\nVí dụ trong JDK: cơ chế event của Swing/AWT (addActionListener), PropertyChangeListener. (Lớp java.util.Observer/Observable đã bị deprecated từ Java 9 vì thiết kế yếu.)\nTrong Spring: ApplicationEventPublisher.publishEvent() + @EventListener. Mặc định listener chạy ĐỒNG BỘ trong cùng luồng và cùng transaction của publisher — muốn bất đồng bộ thì thêm @Async (nhớ bật @EnableAsync).\nRất hay dùng @TransactionalEventListener(phase = AFTER_COMMIT) để chỉ gửi email/đẩy message SAU KHI transaction commit thành công — tránh gửi mail rồi transaction lại rollback.\nNhược điểm cần nêu: luồng thực thi khó lần theo khi debug, dễ tạo phụ thuộc ngầm, và nếu listener ném lỗi ở chế độ đồng bộ thì có thể làm hỏng luôn nghiệp vụ chính.\n\nĐiểm ghi bàn: @TransactionalEventListener(AFTER_COMMIT) là chi tiết rất 'thực chiến', nói ra là ăn điểm ngay.",
    "examples": ["publisher.publishEvent(new OrderCreatedEvent(orderId));\n\n@Component\nclass EmailListener {\n  @Async\n  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)\n  public void on(OrderCreatedEvent e) { mailService.send(e.orderId()); }\n}"]
   },
   {
    "question": "Decorator vs Proxy vs Adapter vs Facade — phân biệt 4 mẫu structural hay nhầm?",
    "answer": "Cả 4 đều 'bọc' một đối tượng khác, khác nhau ở MỤC ĐÍCH:\n- DECORATOR: THÊM hành vi động vào đối tượng mà không sửa class gốc, và có thể chồng nhiều lớp -> tránh bùng nổ số lớp con. Ví dụ kinh điển trong JDK: Java I/O — new BufferedReader(new InputStreamReader(new FileInputStream(f))).\n- PROXY: KIỂM SOÁT truy cập tới đối tượng gốc — cùng interface nhưng thêm kiểm tra quyền, tải lười (lazy loading), cache, gọi từ xa. Ví dụ: Spring AOP tạo proxy cho @Transactional/@Cacheable; Hibernate lazy loading trả về proxy.\n- ADAPTER: CHUYỂN ĐỔI interface không tương thích thành interface mà client mong đợi (ổ cắm chuyển đổi). Ví dụ: Arrays.asList(), InputStreamReader (byte -> char).\n- FACADE: cung cấp MỘT interface đơn giản che đi cả hệ thống con phức tạp. Ví dụ: JdbcTemplate của Spring giấu toàn bộ Connection/Statement/ResultSet/đóng tài nguyên.\nKhác biệt cốt lõi: Decorator = thêm chức năng; Proxy = kiểm soát truy cập; Adapter = đổi hình dạng interface; Facade = làm đơn giản hóa nhiều thứ thành một.\n\nĐiểm ghi bàn: liên hệ Proxy với @Transactional của Spring — và giải thích được vì sao gọi phương thức @Transactional từ NỘI BỘ cùng class thì không có hiệu lực (self-invocation không đi qua proxy).",
    "examples": ["// Decorator (Java IO): chồng nhiều lớp chức năng\nnew BufferedReader(new InputStreamReader(new FileInputStream(file)));\n\n// Proxy (Spring AOP)\n@Transactional public void save() {...}\n// gọi this.save() trong cùng class -> KHÔNG qua proxy -> mất transaction"]
   },
   {
    "question": "Các mẫu GoF xuất hiện ở đâu trong JDK và Spring?",
    "answer": "Câu này gần như chắc chắn được hỏi vì nó chứng minh bạn hiểu chứ không học vẹt.\nTRONG JDK:\n- Singleton: Runtime.getRuntime(), Desktop.getDesktop().\n- Factory: Integer.valueOf(), Calendar.getInstance(), List.of().\n- Builder: StringBuilder, Calendar.Builder, Locale.Builder, Stream.Builder.\n- Decorator: toàn bộ java.io (BufferedInputStream...), Collections.unmodifiableList().\n- Adapter: Arrays.asList(), InputStreamReader.\n- Observer: event listener của Swing/AWT.\n- Iterator: Iterator/Iterable của Collections Framework.\n- Template Method: AbstractList, phương thức run() theo khung của các lớp trừu tượng.\n- Prototype: Object.clone().\n- Flyweight: Integer cache (-128..127), String pool.\nTRONG SPRING:\n- Singleton: scope mặc định của bean.\n- Factory: BeanFactory, FactoryBean.\n- Proxy: AOP, @Transactional, @Cacheable, lazy loading của Hibernate.\n- Template Method: JdbcTemplate, RestTemplate, TransactionTemplate.\n- Facade: JdbcTemplate che JDBC thô.\n- Front Controller: DispatcherServlet.\n- Strategy: các implementation của PasswordEncoder, ViewResolver.\n- Chain of Responsibility: chuỗi Filter của Servlet và filter chain của Spring Security.\n\nĐiểm ghi bàn: nhớ vài cặp chắc chắn (java.io = Decorator, DispatcherServlet = Front Controller, Security filter chain = Chain of Responsibility) là đủ tạo ấn tượng.",
    "examples": ["Integer.valueOf(100) == Integer.valueOf(100)   // true  -> Flyweight cache\nInteger.valueOf(200) == Integer.valueOf(200)   // false -> ngoài dải -128..127"]
   },
   {
    "question": "SOLID gồm những nguyên tắc nào và liên hệ với design pattern ra sao?",
    "answer": "S - Single Responsibility: mỗi class chỉ có MỘT lý do để thay đổi.\nO - Open/Closed: mở cho MỞ RỘNG, đóng với SỬA ĐỔI. Đây chính là tinh thần của Strategy, Decorator, Factory — thêm tính năng bằng cách thêm class mới.\nL - Liskov Substitution: lớp con phải thay thế được lớp cha mà không làm hỏng chương trình (không siết chặt điều kiện đầu vào, không nới lỏng cam kết đầu ra). Vi phạm kinh điển: Square kế thừa Rectangle.\nI - Interface Segregation: nhiều interface nhỏ chuyên biệt tốt hơn một interface khổng lồ buộc lớp con cài đặt phương thức không dùng tới.\nD - Dependency Inversion: phụ thuộc vào TRỪU TƯỢNG, không phụ thuộc vào cài đặt cụ thể. Đây chính là nền tảng của Dependency Injection trong Spring.\nLiên hệ chung: design pattern là những lời giải cụ thể, đã được kiểm chứng, cho việc tuân thủ SOLID. Nêu được mối liên hệ này (thay vì đọc thuộc 5 chữ cái) là điểm khác biệt giữa junior và senior.\nCảnh báo cân bằng: đừng lạm dụng — trừu tượng hóa quá sớm cho một yêu cầu chưa chắc xảy ra sẽ khiến code khó đọc hơn là hữu ích.\n\nĐiểm ghi bàn: gắn D với Spring DI và O với Strategy — hai liên hệ rõ ràng nhất trong code hằng ngày.",
    "examples": ["// D - Dependency Inversion (nền tảng của Spring DI)\nclass OrderService {\n  private final PaymentGateway gateway;   // phụ thuộc INTERFACE\n  OrderService(PaymentGateway gateway) { this.gateway = gateway; }\n}\n// đổi Momo -> VNPay: không sửa 1 dòng nào trong OrderService"]
   }
  ]
 },

 {
  "topic": "Security Headers (CSP, HSTS, CORS)",
  "items": [
   {
    "question": "Security header là gì? Bộ header nền tảng nên bật gồm những gì?",
    "answer": "Security header là các HTTP response header server gửi kèm để RA LỆNH cho trình duyệt siết chặt hành vi — đây là lớp phòng thủ chiều sâu (defense in depth) chạy ở phía client, KHÔNG thay thế được việc code an toàn ở server.\nBộ nền tảng cho mọi site HTTPS (6 cái):\n1. Strict-Transport-Security (HSTS) — ép luôn dùng HTTPS.\n2. Content-Security-Policy (CSP) — giới hạn nguồn tài nguyên, chống XSS.\n3. X-Content-Type-Options: nosniff — cấm trình duyệt đoán kiểu file.\n4. Referrer-Policy — chặn rò rỉ URL sang site khác.\n5. Permissions-Policy — tắt các quyền thiết bị không dùng.\n6. X-Frame-Options hoặc CSP frame-ancestors — chống clickjacking.\nBộ nâng cao khi cần cách ly cross-origin: COOP, COEP, CORP.\nBA HEADER ĐÃ LỖI THỜI, phải GỠ nếu còn: X-XSS-Protection (bộ lọc XSS cũ của trình duyệt, bản thân nó từng gây lỗ hổng — đặt giá trị 0 hoặc bỏ hẳn), Expect-CT, Public-Key-Pins (HPKP — rất dễ tự khóa chính mình khỏi site).\nCông cụ kiểm tra: securityheaders.com, Mozilla Observatory, Google CSP Evaluator.\n\nĐiểm ghi bàn: kể được cả 3 header ĐÃ BỎ — chi tiết này cho thấy bạn cập nhật chứ không chép hướng dẫn cũ.",
    "examples": ["Strict-Transport-Security: max-age=31536000; includeSubDomains\nContent-Security-Policy: default-src 'self'; object-src 'none'; frame-ancestors 'self'\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=()\nX-Frame-Options: DENY"]
   },
   {
    "question": "CSP (Content-Security-Policy) hoạt động thế nào? Vì sao nó chống được XSS?",
    "answer": "CSP là danh sách trắng khai báo TRÌNH DUYỆT ĐƯỢC PHÉP tải/chạy tài nguyên từ đâu. Nếu kẻ tấn công chèn được thẻ <script> vào trang, trình duyệt vẫn TỪ CHỐI THỰC THI vì nguồn đó không nằm trong policy -> chặn XSS ở bước cuối cùng.\nCác directive hay dùng:\n- default-src 'self': mặc định chỉ cho phép cùng origin.\n- script-src: nguồn JavaScript — quan trọng nhất.\n- object-src 'none': chặn Flash/plugin cũ (nên luôn có).\n- frame-ancestors: ai được nhúng trang này vào iframe.\n- report-uri / report-to: gửi báo cáo vi phạm.\nQUY TRÌNH TRIỂN KHAI ĐÚNG: bật Content-Security-Policy-Report-Only trước, thu thập báo cáo vi phạm từ người dùng thật, sửa hết rồi mới chuyển sang chế độ chặn -> tránh làm vỡ trang production.\nPhản mẫu phổ biến nhất: thêm 'unsafe-inline' cho khỏi vỡ giao diện — làm vậy là CSP tự vô hiệu hóa chính nó, vì XSS chủ yếu là inline script.\nLưu ý: CSP KHÔNG phải viên đạn bạc, vẫn phải mã hóa đầu ra (output encoding) và kiểm tra đầu vào.\n\nĐiểm ghi bàn: nói được 'Report-Only trước, enforce sau' và 'unsafe-inline là tự vô hiệu hóa CSP'.",
    "examples": ["// Giai đoạn 1: chỉ quan sát, không chặn\nContent-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report\n\n// Giai đoạn 2: chặn thật\nContent-Security-Policy: default-src 'self'; object-src 'none'; frame-ancestors 'self'"]
   },
   {
    "question": "CSP nonce và strict-dynamic là gì? Vì sao nonce chạy local ổn nhưng lên production lại hỏng?",
    "answer": "Vấn đề của CSP kiểu allowlist (liệt kê domain): danh sách dài, khó bảo trì, và chỉ cần một domain trong danh sách bị lợi dụng là thủng.\nNONCE: mỗi response server sinh một chuỗi NGẪU NHIÊN, đặt vào header và gắn vào từng thẻ script hợp lệ. Trình duyệt chỉ chạy script có nonce khớp -> script kẻ tấn công chèn vào không có nonce nên bị chặn, dù nằm cùng trang.\nSTRICT-DYNAMIC: script đã được tin tưởng (có nonce) được phép tải tiếp script con, nhờ đó không phải liệt kê từng CDN — đây là kiểu CSP được khuyến nghị hiện nay.\nBẪY PHỎNG VẤN KINH ĐIỂN: nonce chạy tốt ở local nhưng lên production thì hỏng, VÌ production CACHE trang HTML -> cùng một nonce bị phát cho hàng loạt người dùng, trở nên đoán được và mất hết tác dụng.\nCÁCH SỬA: sinh nonce MỚI cho mỗi response và đặt Cache-Control: no-store (hoặc private, max-age=0, must-revalidate) cho HTML.\nBước tiếp theo khi CSP đã ổn định: bật Trusted Types để chặn DOM-based XSS tại gốc.\n\nĐiểm ghi bàn: giải thích được mối liên hệ nonce <-> cache HTML là điểm rất khó, nói ra là nổi bật.",
    "examples": ["Content-Security-Policy: script-src 'nonce-r4nd0m123' 'strict-dynamic'; object-src 'none'\nCache-Control: no-store          // BẮT BUỘC cho HTML có nonce\n\n<script nonce=\"r4nd0m123\">...</script>   <!-- chạy -->\n<script>alert(1)</script>                 <!-- kẻ tấn công chèn: BỊ CHẶN -->"]
   },
   {
    "question": "HSTS là gì? max-age, includeSubDomains, preload có ý nghĩa gì và rủi ro nào?",
    "answer": "HSTS (Strict-Transport-Security) bảo trình duyệt: từ nay CHỈ được kết nối tới domain này bằng HTTPS. Kể cả người dùng gõ http:// hay bấm link http, trình duyệt tự đổi sang https TRƯỚC KHI gửi request -> chặn tấn công SSL stripping (kẻ đứng giữa hạ cấp kết nối xuống HTTP).\nCác tham số:\n- max-age=31536000: nhớ trong 1 năm (khuyến nghị).\n- includeSubDomains: áp dụng cho MỌI subdomain.\n- preload: đăng ký vào danh sách nhúng sẵn trong trình duyệt tại hstspreload.org -> được bảo vệ ngay từ LẦN TRUY CẬP ĐẦU TIÊN (vá được lỗ hổng cố hữu: request đầu tiên chưa từng nhận header nên vẫn có thể bị tấn công).\nRỦI RO PHẢI NÓI RA: preload gần như KHÔNG GỠ ĐƯỢC nhanh. Nếu bật includeSubDomains + preload mà có subdomain nội bộ chưa có chứng chỉ HTTPS hợp lệ, subdomain đó sẽ không truy cập được và người dùng KHÔNG THỂ bỏ qua cảnh báo. Chỉ bật khi chắc chắn toàn bộ subdomain đã sẵn sàng HTTPS.\nHSTS chỉ có hiệu lực khi gửi qua HTTPS; gửi qua HTTP trình duyệt sẽ bỏ qua.\nMẹo debug: xem/xóa cache HSTS tại chrome://net-internals/#hsts.\n\nĐiểm ghi bàn: nêu 'lỗ hổng request đầu tiên' và preload là cam kết khó rút lại.",
    "examples": ["Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n\n// Lộ trình an toàn:\n// 1. max-age=300 (5 phút) để thử\n// 2. tăng dần lên 1 năm\n// 3. thêm includeSubDomains khi mọi subdomain đã có HTTPS\n// 4. cuối cùng mới thêm preload + đăng ký hstspreload.org"]
   },
   {
    "question": "Clickjacking là gì? X-Frame-Options và CSP frame-ancestors khác nhau ra sao?",
    "answer": "Clickjacking: kẻ tấn công nhúng site của bạn vào một iframe TRONG SUỐT, phủ lên trang mồi (vd nút 'Nhận quà'). Người dùng tưởng bấm nút mồi nhưng thực chất đang bấm nút thật trên site bạn (chuyển tiền, đổi email, cấp quyền) — vì họ đang đăng nhập sẵn nên thao tác thành công.\n- X-Frame-Options: header cũ, CHỈ có DENY (cấm hoàn toàn) và SAMEORIGIN (chỉ cùng origin). Giá trị ALLOW-FROM đã bị các trình duyệt GỠ BỎ, không dùng được nữa.\n- CSP frame-ancestors: header hiện đại, linh hoạt — liệt kê được nhiều origin cụ thể, hỗ trợ wildcard. Khi cả hai cùng có, trình duyệt hiện đại ƯU TIÊN frame-ancestors.\nKhuyến nghị thực tế: dùng frame-ancestors cho cấu hình mới, giữ thêm X-Frame-Options cho trình duyệt cũ. Cứ bật frame-ancestors 'self' kể cả khi bạn nghĩ site mình không bị nhúng.\nLưu ý: SameSite=Lax/Strict trên cookie cũng giảm nhẹ tác hại clickjacking, nhưng không thay thế được frame-ancestors.\n\nĐiểm ghi bàn: biết ALLOW-FROM đã chết và frame-ancestors thắng khi cả hai cùng tồn tại.",
    "examples": ["// Cấm mọi nhúng\nX-Frame-Options: DENY\nContent-Security-Policy: frame-ancestors 'none'\n\n// Chỉ cho phép đối tác cụ thể (XFO không làm được)\nContent-Security-Policy: frame-ancestors 'self' https://partner.com"]
   },
   {
    "question": "nosniff, Referrer-Policy, Permissions-Policy — mỗi cái chặn kiểu tấn công nào?",
    "answer": "X-Content-Type-Options: nosniff\nTrình duyệt có thói quen ĐOÁN kiểu nội dung (MIME sniffing) khi Content-Type có vẻ sai. Kẻ tấn công lợi dụng: upload file .txt/.jpg nhưng bên trong là JavaScript, trình duyệt đoán ra là script và THỰC THI. nosniff buộc trình duyệt tôn trọng đúng Content-Type server khai báo. Đây là header rẻ nhất, gần như không có rủi ro làm vỡ gì -> luôn bật.\nReferrer-Policy\nMặc định trình duyệt gửi URL trang hiện tại qua header Referer khi đi sang site khác — rò rỉ dữ liệu nhạy cảm nếu URL chứa token, mã đơn hàng, id bệnh án. Giá trị khuyến nghị: strict-origin-when-cross-origin (cùng origin gửi đủ URL, khác origin chỉ gửi tên miền, và không gửi gì khi HTTPS -> HTTP). Dữ liệu rất nhạy cảm thì dùng no-referrer.\nPermissions-Policy (tên cũ: Feature-Policy)\nTắt các quyền thiết bị mà trang không dùng: camera, micro, định vị, thanh toán, USB. Ý nghĩa lớn nhất là hạn chế thiệt hại — nếu site bị chèn script độc hoặc iframe bên thứ ba bị chiếm, chúng cũng KHÔNG xin được các quyền này. Nguyên tắc: mặc định từ chối tất cả, chỉ mở cái thực sự cần.\n\nĐiểm ghi bàn: nêu đúng kịch bản tấn công của nosniff (upload file giả kiểu) chứ không chỉ dịch tên header.",
    "examples": ["X-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n// () rỗng = cấm hoàn toàn;  (self) = chỉ trang mình"]
   },
   {
    "question": "COOP, COEP, CORP là gì? Khi nào cần cross-origin isolation?",
    "answer": "Bộ ba này sinh ra sau các lỗ hổng kênh phụ kiểu Spectre — nơi mã JavaScript có thể đọc trộm bộ nhớ tiến trình bằng cách đo thời gian.\n- COOP (Cross-Origin-Opener-Policy: same-origin): cắt liên hệ window.opener với popup khác origin -> trang khác không thao túng được cửa sổ của bạn.\n- COEP (Cross-Origin-Embedder-Policy: require-corp | credentialless): yêu cầu MỌI tài nguyên nhúng vào phải cho phép rõ ràng.\n- CORP (Cross-Origin-Resource-Policy: same-origin | same-site | cross-origin): đặt TRÊN TÀI NGUYÊN của bạn, quy định site nào được tải nó.\nCOOP + COEP cùng bật = trạng thái cross-origin isolated, là ĐIỀU KIỆN BẮT BUỘC để dùng SharedArrayBuffer và bộ đếm thời gian độ phân giải cao (cần cho WebAssembly nặng, xử lý video/ảnh trong trình duyệt).\nKhi nào bật: chỉ khi thực sự cần các API đó. Bật đại trà rất dễ VỠ các luồng hợp lệ (đăng nhập qua popup OAuth, quảng cáo, widget nhúng, ảnh/font từ CDN).\nLỗi triển khai phổ biến nhất: bật COEP: require-corp mà QUÊN thêm CORP cho ảnh/font/WASM tĩnh -> tài nguyên bị chặn, trang trắng.\n\nĐiểm ghi bàn: gắn được COOP/COEP với Spectre và SharedArrayBuffer, và cảnh báo bẫy quên CORP trên asset.",
    "examples": ["// Bật cross-origin isolation\nCross-Origin-Opener-Policy: same-origin\nCross-Origin-Embedder-Policy: require-corp\n\n// Trên CDN/asset tĩnh của bạn (nếu thiếu -> bị chặn)\nCross-Origin-Resource-Policy: cross-origin"]
   },
   {
    "question": "CORS khác CSP thế nào? Vì sao nói CORS không bảo vệ server?",
    "answer": "Rất hay bị nhầm vì cùng nói về 'origin', nhưng NGƯỢC CHIỀU nhau:\n- CSP: TÔI được tải tài nguyên TỪ ĐÂU (kiểm soát chiều vào, bảo vệ chính trang mình).\n- CORS: AI được ĐỌC phản hồi của tôi bằng JavaScript trong trình duyệt (nới lỏng Same-Origin Policy, chiều ra).\nĐiểm cốt lõi: CORS KHÔNG phải cơ chế bảo vệ server. Nó chỉ ràng buộc TRÌNH DUYỆT không cho JS đọc kết quả. Request vẫn tới server và vẫn được xử lý; Postman/curl/script phía server bỏ qua CORS hoàn toàn. Muốn bảo vệ dữ liệu phải dùng xác thực + phân quyền phía server.\nPreflight: với request 'không đơn giản' (PUT/DELETE, Content-Type: application/json, header tùy chỉnh), trình duyệt gửi OPTIONS hỏi trước; server trả Allow-Origin/Methods/Headers, có thể cache bằng Access-Control-Max-Age để giảm số lần hỏi.\nBẪY BẢO MẬT LỚN NHẤT: Access-Control-Allow-Origin: * KHÔNG dùng chung được với Allow-Credentials: true (trình duyệt chặn). Cách làm sai nguy hiểm là phản chiếu (reflect) nguyên xi header Origin của request rồi bật credentials -> tương đương cho phép MỌI site đọc dữ liệu người dùng đã đăng nhập. Phải dùng danh sách trắng cố định.\n\nĐiểm ghi bàn: câu 'CORS bảo vệ người dùng trong trình duyệt, không bảo vệ API' gần như luôn được hỏi lại để kiểm tra.",
    "examples": ["// SAI - phản chiếu Origin + credentials = mọi site đọc được dữ liệu\nres.header('Access-Control-Allow-Origin', req.headers.origin);\nres.header('Access-Control-Allow-Credentials', 'true');\n\n// ĐÚNG - danh sách trắng\nconst allow = ['https://app.example.com'];\nif (allow.includes(req.headers.origin)) res.header('Access-Control-Allow-Origin', req.headers.origin);"]
   },
   {
    "question": "Cookie an toàn cần những thuộc tính nào? SameSite Lax/Strict/None khác gì?",
    "answer": "Ba thuộc tính bắt buộc cho cookie chứa session/token:\n- HttpOnly: JavaScript KHÔNG đọc được (document.cookie) -> XSS lấy được cũng không lấy được token.\n- Secure: chỉ gửi qua HTTPS -> không lộ khi đi qua mạng không mã hóa.\n- SameSite: kiểm soát việc gửi cookie khi request đến từ site khác -> chống CSRF.\nSameSite:\n- Strict: tuyệt đối không gửi khi đến từ site khác — an toàn nhất nhưng bấm link từ email/Google vào cũng bị coi như CHƯA đăng nhập, trải nghiệm kém.\n- Lax (mặc định của trình duyệt hiện nay): gửi khi ĐIỀU HƯỚNG cấp cao bằng GET (bấm link), KHÔNG gửi với POST/iframe/ảnh từ site khác -> cân bằng tốt nhất, chặn được phần lớn CSRF.\n- None: luôn gửi, BẮT BUỘC kèm Secure. Chỉ dùng cho tình huống nhúng cross-site thật sự (SSO, widget).\nBổ sung: đặt tiền tố __Host- cho cookie quan trọng (buộc phải Secure, Path=/, không có Domain -> subdomain không ghi đè được). Với trang chứa dữ liệu nhạy cảm, thêm Cache-Control: no-store để không lưu vào bộ nhớ đệm/nút Back.\nLưu ý: SameSite=Lax làm giảm mạnh CSRF nhưng KHÔNG thay thế hoàn toàn CSRF token cho thao tác quan trọng.\n\nĐiểm ghi bàn: nói được vì sao Strict gây trải nghiệm xấu và tiền tố __Host-.",
    "examples": ["Set-Cookie: __Host-session=abc; HttpOnly; Secure; SameSite=Lax; Path=/\n\n// Lưu token ở đâu?\n// localStorage : JS đọc được -> XSS lấy mất token   (tránh)\n// cookie HttpOnly + SameSite : an toàn hơn nhiều     (nên dùng)"]
   },
   {
    "question": "Cấu hình security header thực tế trong Spring Security, Nginx và Express thế nào?",
    "answer": "SPRING SECURITY: mặc định đã tự bật sẵn một số header — X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Cache-Control chống cache, và HSTS khi chạy HTTPS. CSP thì KHÔNG bật mặc định, phải tự khai báo.\nNGINX: dùng add_header và nhớ thêm từ khóa always, nếu không header sẽ KHÔNG được gửi kèm các response lỗi (4xx/5xx) — đây là lỗi cấu hình rất hay gặp. Lưu ý nữa: add_header ở block con sẽ GHI ĐÈ toàn bộ add_header của block cha chứ không cộng dồn.\nEXPRESS/NODE: dùng helmet — một dòng app.use(helmet()) bật sẵn cả bộ header hợp lý; CSP thì nên cấu hình riêng cho khớp ứng dụng.\nNguyên tắc chung khi triển khai: đặt header ở MỘT nơi duy nhất (reverse proxy hoặc ứng dụng), tránh đặt cả hai nơi gây trùng lặp/mâu thuẫn; và luôn kiểm tra lại bằng securityheaders.com sau khi deploy.\nCuối cùng: nhớ ẩn header lộ thông tin phiên bản (Server, X-Powered-By) — kẻ tấn công dùng nó để tra lỗ hổng đã biết.\n\nĐiểm ghi bàn: chi tiết 'always' trong Nginx và 'add_header con ghi đè cha' là kinh nghiệm thực chiến, ít người nói được.",
    "examples": ["// Spring Security 6\nhttp.headers(h -> h\n  .contentSecurityPolicy(c -> c.policyDirectives(\"default-src 'self'; object-src 'none'\"))\n  .httpStrictTransportSecurity(s -> s.includeSubDomains(true).maxAgeInSeconds(31536000))\n  .frameOptions(f -> f.deny())\n  .referrerPolicy(r -> r.policy(STRICT_ORIGIN_WHEN_CROSS_ORIGIN)));\n\n# Nginx - thiếu 'always' là hỏng ở response lỗi\nadd_header X-Content-Type-Options \"nosniff\" always;\nserver_tokens off;   # ẩn phiên bản\n\n// Express\napp.use(helmet());"]
   }
  ]
 },

 {
  "topic": "Payment Domain (Reserve, Capture, Refund)",
  "items": [
   {
    "question": "Vòng đời một payment gồm những trạng thái nào? Vì sao cần State Machine?",
    "answer": "Payment đi qua chuỗi trạng thái có ràng buộc, KHÔNG phải cột status muốn set gì cũng được:\nCREATED -> RISK_CHECKING -> RESERVING_FUNDS -> PROCESSING -> SUCCEEDED / FAILED, cộng thêm CANCELLED, PARTIALLY_REFUNDED, REFUNDED.\nState Machine (máy trạng thái hữu hạn) định nghĩa tập chuyển trạng thái HỢP LỆ. Ví dụ FAILED -> SUCCEEDED phải bị chặn; refund yêu cầu trước đó phải đã capture; capture yêu cầu trước đó phải đã authorize.\nVì sao quan trọng trong hệ thống tiền: event có thể đến TRÙNG hoặc SAI THỨ TỰ (Kafka at-least-once, webhook đến muộn). Nếu chỉ ghi đè status, một callback cũ đến trễ có thể kéo payment từ SUCCEEDED về PROCESSING.\nCách cài: enum + bảng chuyển trạng thái, kiểm tra ngay trong domain (không để ở controller); cập nhật bằng câu UPDATE có điều kiện trạng thái cũ để tránh race:\nUPDATE payment SET status='SUCCEEDED' WHERE id=? AND status='PROCESSING'  -> nếu 0 dòng bị ảnh hưởng thì bỏ qua.\nTrạng thái cuối (terminal) như SUCCEEDED/REFUNDED không được chuyển ngược.\n\nĐiểm ghi bàn: nói được 'guard transition + UPDATE có điều kiện trạng thái cũ' — đó là cách chống event đến muộn/trùng mà không cần khóa.",
    "examples": ["public enum PaymentStatus {\n  CREATED, RISK_CHECKING, RESERVING_FUNDS, PROCESSING,\n  SUCCEEDED, FAILED, CANCELLED, PARTIALLY_REFUNDED, REFUNDED;\n\n  private static final Map<PaymentStatus, Set<PaymentStatus>> NEXT = Map.of(\n    PROCESSING, Set.of(SUCCEEDED, FAILED),\n    SUCCEEDED,  Set.of(PARTIALLY_REFUNDED, REFUNDED)\n    // FAILED -> không có lối ra: trạng thái cuối\n  );\n  public boolean canGoTo(PaymentStatus next) {\n    return NEXT.getOrDefault(this, Set.of()).contains(next);\n  }\n}"]
   },
   {
    "question": "Authorization (Reserve/Hold) khác Capture khác Settlement thế nào?",
    "answer": "Ba khái niệm rất hay bị gộp làm một nhưng xảy ra ở BA THỜI ĐIỂM khác nhau:\n1. AUTHORIZATION / RESERVE (giữ tiền): kiểm tra đủ tiền và GIỮ LẠI một khoản. Tiền chưa rời khỏi tài khoản, chỉ chuyển từ 'khả dụng' sang 'đang giữ'.\n   available 1.000.000 -> reserve 500.000 -> available 500.000, reserved 500.000. Tổng vẫn 1.000.000.\n2. CAPTURE (thu tiền): biến khoản đang giữ thành khoản đã thu thật. reserved 500.000 -> 0, đồng thời ghi bút toán vào Ledger.\n3. SETTLEMENT (quyết toán): tiền THỰC SỰ chuyển giữa các định chế (ngân hàng phát hành -> tổ chức thẻ -> ngân hàng thu). Diễn ra theo LÔ, thường T+1, T+2 chứ không tức thời.\nVí dụ đời thực rất đáng kể trong phỏng vấn: Uber/Grab dùng chiến lược 'Auth and Hold' — giữ theo giá ƯỚC TÍNH lúc đặt xe, capture ĐÚNG số tiền thật lúc kết thúc chuyến, phần giữ dư thì release.\nHệ quả thiết kế: authorization có HẠN (thường 7 ngày), quá hạn không capture thì tự hết hiệu lực -> cần job dọn các reservation quá hạn.\n\nĐiểm ghi bàn: phân biệt được 'tiền đã giữ' vs 'tiền đã thu' vs 'tiền đã về tài khoản' — đây là câu chốt để đánh giá bạn có hiểu domain thanh toán thật không.",
    "examples": ["-- Bảng account tách 2 cột thay vì 1 cột balance\naccounts(id, total_balance, available_balance, version)\n-- bất biến nghiệp vụ: available_balance >= 0\n--                     total = available + reserved\n\nCHECK (available_balance >= 0)"]
   },
   {
    "question": "Release khác Refund thế nào? Vì sao rất hay bị nhầm?",
    "answer": "RELEASE (nhả tiền giữ): hủy phần ĐANG GIỮ khi giao dịch CHƯA hoàn tất. Tiền chưa từng rời tài khoản nên chỉ cần trả lại từ 'reserved' về 'available'.\n  available 500.000 -> 1.000.000; reserved 500.000 -> 0.\nDùng khi: risk từ chối, Ledger lỗi, saga chạy bù (compensation), authorization hết hạn.\nREFUND (hoàn tiền): trả lại tiền cho giao dịch ĐÃ CAPTURE THÀNH CÔNG. Tiền đã đi rồi nên phải tạo một GIAO DỊCH MỚI ngược chiều, có bút toán riêng trong Ledger, có vòng đời riêng (có thể thất bại, có thể mất T+n để về tài khoản).\nRefund một phần: refund 200.000 trên payment 500.000 -> PARTIALLY_REFUNDED; refund tiếp 300.000 -> REFUNDED. Bất biến bắt buộc: TỔNG refund <= số tiền đã capture. Kiểm tra bằng ràng buộc DB + khóa hàng payment khi tính tổng, tránh 2 request refund song song vượt hạn mức.\nRefund cũng cần idempotency key riêng — bấm nút hoàn tiền 2 lần không được hoàn 2 lần.\n\nĐiểm ghi bàn: 'release là hủy việc giữ (chưa mất tiền), refund là giao dịch ngược chiều (đã mất tiền)' — trả lời gọn đúng câu này là ăn điểm ngay.",
    "examples": ["// Chống refund vượt hạn mức khi có 2 request song song\n@Transactional\nvoid refund(UUID paymentId, BigDecimal amount) {\n  Payment p = repo.findByIdForUpdate(paymentId);       // SELECT ... FOR UPDATE\n  BigDecimal refunded = refundRepo.sumSucceeded(paymentId);\n  if (refunded.add(amount).compareTo(p.getCaptured()) > 0)\n      throw new RefundExceedsCapturedException();\n  ...\n}"]
   },
   {
    "question": "Vì sao tiền phải dùng BigDecimal (hoặc integer cents), không được dùng double?",
    "answer": "double/float là số dấu phẩy động NHỊ PHÂN, không biểu diễn chính xác được các số thập phân như 0.1 -> sai số tích lũy. Kinh điển: 0.1 + 0.2 = 0.30000000000000004. Với hàng triệu giao dịch, sai số nhỏ này tạo ra chênh lệch đối soát không thể giải thích — điều tuyệt đối không chấp nhận trong hệ thống tài chính.\nHai lựa chọn đúng:\n1. BigDecimal: chính xác thập phân, kiểm soát được scale và cách làm tròn. Cột DB dùng NUMERIC(19,4).\n2. Số nguyên đơn vị nhỏ nhất (integer cents/đồng): lưu 500000 thay vì 5000.00 — nhanh, không lo làm tròn, nhiều hệ thống lớn (Stripe) chọn cách này.\nBẪY BigDecimal phải biết:\n- So sánh dùng compareTo() chứ KHÔNG dùng equals(): new BigDecimal(\"1.0\").equals(new BigDecimal(\"1.00\")) trả về false vì khác scale, còn compareTo trả 0.\n- Khởi tạo bằng CHUỖI: new BigDecimal(\"0.1\") đúng, new BigDecimal(0.1) sai vì đã dính lỗi double từ đầu.\n- divide() phải chỉ định scale + RoundingMode, nếu không sẽ ném ArithmeticException khi chia không hết.\n- BigDecimal là bất biến (immutable): a.add(b) trả về giá trị mới, không sửa a.\nLuôn lưu kèm mã tiền tệ (currency) và không cộng hai số khác loại tiền.\n\nĐiểm ghi bàn: nói equals vs compareTo và new BigDecimal(String) — hai bẫy này rất hay được hỏi.",
    "examples": ["new BigDecimal(\"1.0\").equals(new BigDecimal(\"1.00\"));    // false (khác scale)\nnew BigDecimal(\"1.0\").compareTo(new BigDecimal(\"1.00\")); // 0  -> ĐÚNG\n\nBigDecimal fee = amount.multiply(new BigDecimal(\"0.02\"))\n                       .setScale(0, RoundingMode.HALF_UP);"]
   },
   {
    "question": "Idempotency-Key trong API thanh toán triển khai cụ thể thế nào?",
    "answer": "Vấn đề: client bấm 2 lần, hoặc gửi lại vì timeout mạng (dù request đầu ĐÃ thành công ở server). Không có idempotency thì tạo 2 payment 500.000.\nCách làm chuẩn:\n1. Client sinh khóa duy nhất và gửi kèm: header Idempotency-Key: abc123.\n2. Server LƯU KHÓA TRƯỚC KHI gọi bên thứ ba, dựa vào UNIQUE CONSTRAINT của database (không dùng 'check-then-insert' vì vẫn race).\n3. Lưu kèm request_hash (băm nội dung request). Nếu cùng khóa nhưng nội dung KHÁC -> trả 422/409, vì client đang tái dùng khóa cho request khác — đây là chi tiết nhiều người quên.\n4. Lưu luôn response đã trả. Lần gọi lại phát lại đúng response cũ (kèm mã payment cũ), không xử lý lại.\n5. Đặt TTL cho bản ghi (thường 24h) rồi dọn.\nTrạng thái trung gian: nếu request đầu ĐANG xử lý, request thứ hai nên trả 409 'đang xử lý' thay vì chờ.\nPhòng thủ nhiều lớp: ngoài khóa ở API, đặt thêm ràng buộc UNIQUE ở tầng Ledger theo mã tham chiếu nghiệp vụ — nếu gateway restart mất cache, DB vẫn là chốt chặn cuối chống ghi trùng bút toán.\nPhân biệt: idempotency (cùng khóa -> phát lại KẾT QUẢ CŨ) khác unique constraint đơn thuần (chỉ ném lỗi trùng).\n\nĐiểm ghi bàn: request_hash + lưu response để phát lại — hai điểm này phân biệt người đã làm thật với người chỉ đọc lý thuyết.",
    "examples": ["CREATE TABLE idempotency_key (\n  key           VARCHAR(64) PRIMARY KEY,\n  request_hash  VARCHAR(64) NOT NULL,\n  payment_id    UUID,\n  response_body JSONB,\n  status        VARCHAR(20),   -- IN_PROGRESS | COMPLETED\n  created_at    TIMESTAMPTZ NOT NULL\n);\n\nPOST /api/v1/payments\nIdempotency-Key: abc123"]
   },
   {
    "question": "Hai request cùng trừ một tài khoản: chống race condition bằng cách nào?",
    "answer": "Tình huống: balance 500.000, hai payment 400.000 chạy song song. Cả hai cùng ĐỌC 500.000, cùng thấy đủ tiền, cùng ghi -> balance âm. Đây là Lost Update.\nBa cách, chọn theo mức tranh chấp:\n1. PESSIMISTIC LOCK — SELECT ... FOR UPDATE: transaction thứ hai PHẢI CHỜ. Chắc chắn, dễ hiểu, phù hợp khi tranh chấp CAO trên cùng một tài khoản (ví thanh toán chính là trường hợp này). Nhược: giảm throughput, có nguy cơ deadlock -> luôn khóa các tài khoản theo THỨ TỰ id cố định để tránh deadlock chéo.\n2. OPTIMISTIC LOCK — @Version: không khóa, lúc UPDATE mới kiểm tra version. Ai thua thì nhận OptimisticLockException và RETRY. Phù hợp khi tranh chấp THẤP. Nhược: tranh chấp cao thì retry liên tục, lãng phí.\n3. UPDATE có điều kiện (nguyên tử, không cần đọc trước) — cách nhanh nhất cho trừ tiền:\n   UPDATE accounts SET available = available - :amt WHERE id = :id AND available >= :amt;\n   Nếu trả về 0 dòng nghĩa là không đủ tiền. Toàn bộ kiểm tra + trừ diễn ra trong MỘT câu lệnh nên không có khe hở.\nBổ sung phòng thủ cuối: ràng buộc CHECK (available_balance >= 0) ở DB — dù code sai thì DB vẫn không cho âm.\nLƯU Ý QUAN TRỌNG: KHÔNG dùng synchronized của Java, vì nó chỉ khóa trong MỘT JVM; chạy nhiều instance là vô tác dụng. Phải khóa ở tầng database (hoặc distributed lock).\n\nĐiểm ghi bàn: chỉ ra synchronized vô dụng khi scale nhiều instance, và nêu CHECK constraint như lưới an toàn cuối cùng.",
    "examples": ["-- Cách nguyên tử, không cần đọc trước\nUPDATE accounts\n   SET available_balance = available_balance - 400000,\n       reserved_balance  = reserved_balance  + 400000\n WHERE id = :id\n   AND available_balance >= 400000;\n-- rowsAffected = 0  ->  không đủ số dư\n\n-- Chống deadlock khi khóa nhiều tài khoản\nSELECT * FROM accounts WHERE id IN (:a, :b) ORDER BY id FOR UPDATE;"]
   },
   {
    "question": "Tình huống: 'Một payment chạy qua hệ thống như thế nào?' — trả lời ra sao cho gọn?",
    "answer": "Đây là câu chốt của phỏng vấn. Trả lời theo trục HAPPY PATH -> FAILURE PATH -> QUAN SÁT, đừng kể lể tuần tự vô hồn.\nHAPPY PATH:\n1. Client POST /payments kèm Idempotency-Key.\n2. Gateway xác thực JWT + role, gắn correlationId.\n3. Payment Service kiểm tra idempotency key.\n4. Ghi payment + outbox_event trong CÙNG MỘT transaction (chống dual-write).\n5. Outbox worker publish payment.created lên Kafka.\n6. Risk Service consume, chấm điểm rủi ro.\n7. Account Service reserve tiền bằng transaction + locking.\n8. Ledger Service ghi bút toán kép.\n9. Payment -> SUCCEEDED, phát event payment.succeeded.\n10. Notification Service gửi email/webhook bất đồng bộ.\nFAILURE PATH (phần quan trọng nhất, hầu hết ứng viên bỏ qua):\n- Ledger lỗi sau khi đã reserve -> Saga chạy compensation -> Account release tiền -> Payment FAILED.\n- Event bị giao lại -> consumer idempotent nhờ bảng processed_events.\n- Provider ngoài chậm -> timeout + circuit breaker, không để lỗi lan ngược.\n- Xử lý thất bại vĩnh viễn -> DLT để điều tra và phát lại.\nQUAN SÁT: correlationId/traceId xuyên suốt, metrics payment_success_total, kafka_consumer_lag, outbox_pending_total.\n\nĐiểm ghi bàn: chủ động nói về đường LỖI và cách hệ thống tự chữa — đó là thứ phân biệt ứng viên senior.",
    "examples": ["Client -> Gateway -> Payment Service\n                        | (1 transaction: payment + outbox)\n                        v\n                      Kafka  -> Risk -> Account (reserve) -> Ledger\n                                                   |\n                                          lỗi -> Saga compensation\n                                                 (release tiền)"]
   }
  ]
 },

 {
  "topic": "Ledger kép, Settlement & Reconciliation",
  "items": [
   {
    "question": "Double-entry ledger là gì? Vì sao KHÔNG chỉ lưu cột balance?",
    "answer": "Ghi sổ kép: mỗi dòng tiền được ghi thành các bút toán NỢ (debit) và CÓ (credit) BẰNG NHAU. Bất biến sống còn: TỔNG DEBIT = TỔNG CREDIT trong mỗi bút toán (journal).\nVí dụ thanh toán 500.000 với phí 10.000:\n  DEBIT  Tài khoản khách    500.000\n  CREDIT Tài khoản merchant 490.000\n  CREDIT Doanh thu phí       10.000\nVì sao không chỉ 'balance -= 500000':\n1. Mất lịch sử — không trả lời được 'vì sao số dư là con số này'.\n2. UPDATE cột balance dễ tranh chấp (lost update), trong khi INSERT bút toán thì không.\n3. Không kiểm toán được, không đối soát được với đối tác.\nCách đúng: bảng ledger_entry chỉ được THÊM (append-only), số dư = TỔNG các bút toán. Nếu tính tổng chậm thì dùng bảng snapshot số dư theo mốc thời gian, nhưng nguồn sự thật vẫn là các bút toán.\nLuôn lưu số tiền dạng số nguyên đơn vị nhỏ nhất hoặc NUMERIC có scale cố định, kèm currency.\n\nĐiểm ghi bàn: 'balance là kết quả tính ra từ bút toán, không phải dữ liệu tự nó' + 'append-only nên tránh được cả một lớp race condition'.",
    "examples": ["CREATE TABLE ledger_entry (\n  id           BIGSERIAL PRIMARY KEY,\n  journal_id   UUID NOT NULL,\n  account_id   UUID NOT NULL,\n  direction    VARCHAR(6) NOT NULL,   -- DEBIT | CREDIT\n  amount       NUMERIC(19,4) NOT NULL CHECK (amount > 0),\n  currency     CHAR(3) NOT NULL,\n  reference    VARCHAR(64) NOT NULL,\n  created_at   TIMESTAMPTZ NOT NULL,\n  UNIQUE (reference, account_id, direction)   -- chống ghi trùng\n);\n-- KHÔNG có UPDATE, KHÔNG có DELETE trên bảng này"]
   },
   {
    "question": "Vì sao ledger phải bất biến (immutable)? Ghi sai thì sửa thế nào?",
    "answer": "Nguyên tắc kế toán: KHÔNG BAO GIỜ sửa hay xóa bút toán đã ghi (posted). Lý do: yêu cầu kiểm toán, truy vết pháp lý, và để mọi bên đối soát nhìn thấy cùng một lịch sử.\nGhi sai thì sửa bằng BÚT TOÁN ĐẢO (reversal): tạo bút toán mới ngược chiều, tham chiếu tới bút toán gốc. Kết quả cuối cùng đúng, đồng thời lịch sử vẫn cho thấy 'đã từng sai và đã sửa'.\n  Journal 1: DEBIT A 500.000 / CREDIT B 500.000     (sai)\n  Journal 2: DEBIT B 500.000 / CREDIT A 500.000     (đảo, ref = Journal 1)\n  Journal 3: bút toán đúng\nRefund cũng theo nguyên tắc này: là bút toán NGƯỢC CHIỀU tham chiếu giao dịch gốc, KHÔNG phải xóa giao dịch gốc.\nHệ quả kỹ thuật: cấp quyền DB chỉ INSERT/SELECT trên bảng ledger, không cấp UPDATE/DELETE; mọi sửa sai đều đi qua nghiệp vụ tạo bút toán mới.\n\nĐiểm ghi bàn: 'không sửa bản ghi cũ, chỉ ghi bút toán đảo có tham chiếu' — nguyên tắc này đúng cho cả reconciliation lẫn refund.",
    "examples": ["-- Kiểm tra bất biến sau mỗi journal\nSELECT journal_id,\n       SUM(CASE WHEN direction='DEBIT'  THEN amount ELSE 0 END) AS total_debit,\n       SUM(CASE WHEN direction='CREDIT' THEN amount ELSE 0 END) AS total_credit\n  FROM ledger_entry\n GROUP BY journal_id\nHAVING SUM(CASE WHEN direction='DEBIT' THEN amount ELSE -amount END) <> 0;\n-- trả về dòng nào là có bút toán lệch -> báo động ngay"]
   },
   {
    "question": "Settlement (quyết toán) là gì và khác gì với capture?",
    "answer": "Capture là ghi nhận NỘI BỘ rằng khoản tiền đã được thu. Settlement là quá trình tiền THỰC SỰ chuyển giữa các định chế và về tới tài khoản merchant — diễn ra theo LÔ và theo lịch (T+1, T+2), không tức thời.\nSettlement batch thường tổng hợp trong một chu kỳ:\n  Tổng thanh toán  100.000.000\n  - Hoàn tiền        5.000.000\n  - Phí              2.000.000\n  = Số tiền ròng    93.000.000  -> chi trả cho merchant\nThiết kế cần lưu ý:\n- Batch phải bất biến sau khi chốt (đã gửi lệnh chi thì không sửa); phát sinh sau chốt sẽ rơi vào batch kế tiếp.\n- Có mốc cắt (cut-off time) rõ ràng và ghi rõ theo múi giờ nào — giao dịch lúc 23h59 thuộc ngày nào là câu hỏi thật.\n- Idempotent: chạy lại job settlement không được tạo batch trùng (khóa theo merchant_id + kỳ).\n- Trạng thái riêng cho batch: PENDING -> PROCESSING -> PAID / FAILED.\nĐây cũng là lý do payout (chi tiền ra) là một luồng riêng, nhiều ứng viên quên mất chiều này khi thiết kế.\n\nĐiểm ghi bàn: nhấn 'capture là ghi nhận nội bộ, settlement là dòng tiền thật theo lô T+n' và nhắc cut-off time.",
    "examples": ["SELECT merchant_id,\n       SUM(CASE WHEN type='PAYMENT' THEN amount ELSE 0 END)\n     - SUM(CASE WHEN type='REFUND'  THEN amount ELSE 0 END)\n     - SUM(CASE WHEN type='FEE'     THEN amount ELSE 0 END) AS net_amount\n  FROM ledger_entry\n WHERE created_at >= :cutoff_start AND created_at < :cutoff_end\n GROUP BY merchant_id;"]
   },
   {
    "question": "Reconciliation (đối soát) là gì? Vì sao lệch là chuyện bình thường?",
    "answer": "Đối soát là so khớp dữ liệu NỘI BỘ với dữ liệu của ĐỐI TÁC (file settlement của ngân hàng/cổng thanh toán), tìm ra chênh lệch và xử lý.\nVí dụ: PayFlow ghi payment A = SUCCESS, nhưng file của provider ghi A = FAILED -> đánh dấu RECONCILIATION_REQUIRED, tạm giữ, điều tra.\nVì sao LUÔN có lệch (phải nói ra để chứng tỏ hiểu thực tế):\n- Provider gửi file theo lô, có độ trễ.\n- Mốc cắt của hai bên khác nhau (giao dịch cuối ngày rơi sang file hôm sau).\n- Tỷ giá thay đổi giữa lúc authorize và lúc settle với giao dịch ngoại tệ.\n- Callback bị mất, giao dịch treo ở trạng thái PENDING.\nCác loại lệch cần phân loại: có ở ta không có ở họ, có ở họ không có ở ta, có cả hai nhưng khác số tiền, khác trạng thái.\nNGUYÊN TẮC XỬ LÝ: không bao giờ sửa bút toán cũ — mọi điều chỉnh là bút toán MỚI tham chiếu bút toán gốc, giữ nguyên dấu vết kiểm toán.\nBổ trợ: webhook chỉ là thông báo 'nỗ lực tối đa', nên luôn có job định kỳ CHỦ ĐỘNG gọi API provider truy vấn trạng thái các giao dịch treo — webhook cho độ trễ thấp, job đối soát cho sự chắc chắn.\n\nĐiểm ghi bàn: 'webhook cho tốc độ, đối soát định kỳ cho sự đảm bảo' — câu này rất được đánh giá cao.",
    "examples": ["Phân loại kết quả đối soát:\n  MATCHED              - khớp hoàn toàn\n  MISSING_IN_PROVIDER  - ta có, họ không có\n  MISSING_IN_INTERNAL  - họ có, ta không có  (nguy hiểm nhất: đã thu tiền khách!)\n  AMOUNT_MISMATCH      - lệch số tiền\n  STATUS_MISMATCH      - lệch trạng thái\n-> mỗi loại có quy trình xử lý riêng, không gộp chung"]
   },
   {
    "question": "Fee, tỷ giá và các bẫy làm tròn trong hệ thống thanh toán?",
    "answer": "PHÍ (fee): phải được ghi thành bút toán RIÊNG, không trừ ngầm vào số tiền merchant nhận. Lý do: merchant cần hóa đơn và cần biết chính xác đã bị thu bao nhiêu phí.\nLàm tròn phí: phí 2% của 10.001 đồng = 200,02 -> làm tròn thế nào phải được quy định thành CHÍNH SÁCH (HALF_UP, làm tròn xuống...) và ghi vào tài liệu, vì tổng chênh lệch làm tròn qua hàng triệu giao dịch là một khoản tiền thật.\nQuy tắc vàng: làm tròn MỘT LẦN ở bước cuối, không làm tròn ở từng bước trung gian (sai số cộng dồn).\nTỶ GIÁ: tỷ giá lúc authorize khác lúc capture (có thể cách nhau nhiều ngày). Hai hướng xử lý:\n1. Chốt tỷ giá tại thời điểm authorize và dùng lại lúc capture; nếu lệch quá ngưỡng chính sách thì tạo bút toán điều chỉnh minh bạch.\n2. Giữ theo nguyên tệ, quy đổi lúc capture/settlement.\nDù chọn cách nào cũng phải LƯU LẠI tỷ giá đã dùng và thời điểm áp dụng trong bút toán — nếu không thì sau này không tái tạo lại được con số.\nMọi số tiền luôn đi kèm currency; cấm cộng hai số khác loại tiền ở tầng domain (dùng Value Object Money{amount, currency} để trình biên dịch chặn giúp).\n\nĐiểm ghi bàn: 'làm tròn một lần ở bước cuối' và 'lưu lại tỷ giá đã dùng' là hai chi tiết rất thực chiến.",
    "examples": ["public record Money(BigDecimal amount, Currency currency) {\n  public Money add(Money other) {\n    if (!currency.equals(other.currency))\n        throw new CurrencyMismatchException();   // chặn ngay tại domain\n    return new Money(amount.add(other.amount), currency);\n  }\n}"]
   }
  ]
 },

 {
  "topic": "Webhook, Callback & IPN",
  "items": [
   {
    "question": "Webhook/IPN là gì? Vì sao KHÔNG được tin vào redirect của trình duyệt?",
    "answer": "Sau khi khách thanh toán ở cổng ngoài (VNPAY/MoMo), có HAI đường thông tin quay lại:\n1. RETURN URL (redirect trình duyệt): chỉ để hiển thị giao diện cho người dùng. Đường này đi QUA MÁY KHÁCH nên có thể bị sửa tham số, có thể không bao giờ xảy ra (khách tắt trình duyệt ngay sau khi trả tiền).\n2. IPN / WEBHOOK (server-to-server): cổng thanh toán gọi thẳng vào endpoint của bạn. Đây mới là NGUỒN SỰ THẬT để cập nhật trạng thái đơn hàng.\nSai lầm chết người: cập nhật đơn thành ĐÃ THANH TOÁN dựa trên return URL -> kẻ tấn công tự sửa tham số trên URL là mua được hàng miễn phí.\nQuy trình xử lý callback đúng gồm 6 bước:\n1. Xác minh chữ ký (signature).\n2. Kiểm tra SỐ TIỀN khớp với đơn hàng trong DB của bạn.\n3. Kiểm tra mã giao dịch/mã đơn tồn tại và đúng trạng thái.\n4. Chống trùng (đã xử lý event này chưa).\n5. Cập nhật trạng thái theo state machine.\n6. Phát event nội bộ (Kafka) cho các service khác.\nCallback có thể đến MUỘN hơn cả khi người dùng đã đóng trang, hoặc đến TRƯỚC khi transaction tạo đơn của bạn commit xong -> phải xử lý được cả hai trường hợp (thường là retry/hoãn xử lý rồi thử lại).\n\nĐiểm ghi bàn: 'return URL để hiển thị, IPN để cập nhật trạng thái' + luôn kiểm tra lại SỐ TIỀN, đừng chỉ tin trạng thái.",
    "examples": ["// SAI - tin redirect\n@GetMapping(\"/payment/return\")\nvoid onReturn(@RequestParam String status) {\n   if (\"SUCCESS\".equals(status)) order.markPaid();   // ai cũng sửa được URL!\n}\n\n// ĐÚNG - chỉ hiển thị, trạng thái thật lấy từ DB (do IPN cập nhật)\n@GetMapping(\"/payment/return\")\nString onReturn(@RequestParam String orderId) {\n   return orderService.getStatus(orderId);\n}"]
   },
   {
    "question": "Xác minh chữ ký HMAC cho webhook làm thế nào cho đúng?",
    "answer": "Cơ chế: bên gửi tính HMAC-SHA256 trên nội dung request bằng secret dùng chung, đính vào header. Bên nhận tính lại và so sánh. Khớp nghĩa là đúng người gửi và nội dung không bị sửa.\nCÁC QUY TẮC BẮT BUỘC (mỗi cái là một lỗi thực tế hay gặp):\n1. Ký/xác minh trên RAW BODY — đúng chuỗi byte gốc. Nếu parse JSON rồi serialize lại để tính chữ ký thì sai (thứ tự field, khoảng trắng đổi -> chữ ký khác).\n2. Dùng SO SÁNH THỜI GIAN HẰNG ĐỊNH (MessageDigest.isEqual / timingSafeEqual), KHÔNG dùng equals(): so sánh chuỗi thông thường dừng ngay khi gặp ký tự khác nhau -> kẻ tấn công đo thời gian có thể dò dần ra chữ ký (timing attack).\n3. Dùng SHA-256, không dùng MD5/SHA-1.\n4. Chữ ký phải bao gồm cả TIMESTAMP, không chỉ payload — nếu không, kẻ tấn công bắt được request cũ có thể gắn timestamp mới vào mà chữ ký vẫn hợp lệ.\n5. Mỗi endpoint một secret riêng; secret để trong biến môi trường/secret manager, không commit vào git.\n6. Xoay secret theo kiểu chấp nhận ĐỒNG THỜI khóa mới và khóa cũ trong một khoảng chuyển tiếp, rồi mới gỡ khóa cũ.\nTHỨ TỰ XỬ LÝ QUAN TRỌNG: xác minh chữ ký TRƯỚC KHI parse/tin bất cứ thứ gì trong payload. Trả 200 trước khi xác minh nghĩa là bạn vừa xác nhận cho kẻ tấn công.\n\nĐiểm ghi bàn: raw body + constant-time compare + timestamp nằm trong chữ ký — ba điểm này gần như luôn được hỏi sâu.",
    "examples": ["// Định dạng kiểu Stripe (chuẩn de facto)\nString signedPayload = timestamp + \".\" + rawBody;\nString expected = hmacSha256(signedPayload, secret);\n\nif (!MessageDigest.isEqual(expected.getBytes(UTF_8),\n                           received.getBytes(UTF_8)))   // hằng thời gian\n    throw new InvalidSignatureException();"]
   },
   {
    "question": "Replay attack với webhook là gì? Chống thế nào?",
    "answer": "Chữ ký hợp lệ chỉ chứng minh 'đúng người gửi', KHÔNG chứng minh 'lần đầu tiên'. Kẻ tấn công bắt được một webhook thật (vd payment.succeeded) rồi gửi lại nhiều lần — chữ ký vẫn đúng, và nếu bạn xử lý mù thì đơn hàng được cộng tiền nhiều lần.\nHai lớp phòng thủ phải có CẢ HAI:\n1. CỬA SỔ THỜI GIAN: lấy timestamp trong header, từ chối nếu lệch quá ngưỡng — chuẩn ngành là 5 phút (cả quá khứ lẫn tương lai, để dung sai lệch đồng hồ). Muốn vậy timestamp phải nằm trong phần được ký (xem mục chữ ký), nếu không kẻ tấn công tự sửa timestamp là xong.\n2. CHỐNG TRÙNG THEO EVENT ID: lưu event_id của provider vào bảng có UNIQUE index; gặp lại thì bỏ qua. Lớp này bịt khe hở còn lại BÊN TRONG cửa sổ 5 phút.\nThời gian giữ bản ghi chống trùng phải DÀI HƠN toàn bộ lịch retry của provider (Stripe retry tới 3 ngày) — giữ 24h là chưa đủ trong nhiều trường hợp.\nĐồng hồ server phải được đồng bộ NTP, nếu lệch thì mọi webhook hợp lệ đều bị từ chối — đây là lỗi vận hành hay gặp khi debug 'chữ ký đúng mà vẫn lỗi'.\n\nĐiểm ghi bàn: nêu đủ 'cửa sổ thời gian + dedupe theo event id', và nói được vì sao chỉ một trong hai là chưa đủ.",
    "examples": ["long skew = Math.abs(now - timestamp);\nif (skew > 300) throw new WebhookTooOldException();   // 5 phút\n\nCREATE TABLE processed_webhook (\n  event_id     VARCHAR(64) PRIMARY KEY,   -- id của provider\n  provider     VARCHAR(30) NOT NULL,\n  processed_at TIMESTAMPTZ NOT NULL\n);\n-- INSERT lỗi trùng khóa  ->  đã xử lý rồi  ->  trả 200 và bỏ qua"]
   },
   {
    "question": "Xử lý webhook nên đồng bộ hay bất đồng bộ? Retry và DLQ thế nào?",
    "answer": "NGUYÊN TẮC: 'ACK NHANH, LÀM VIỆC SAU'. Provider thường chỉ chờ 5-30 giây; nếu bạn gọi DB, gọi API ngoài, gửi email ngay trong handler thì rất dễ timeout -> provider tưởng thất bại -> retry -> càng chồng tải.\nLuồng đúng: xác minh chữ ký -> kiểm tra timestamp -> ghi event vào bảng/queue (chống trùng bằng unique event_id) -> TRẢ 200 NGAY -> worker xử lý nền.\nRETRY (chiều bạn nhận): nếu trả lỗi, provider sẽ retry theo lịch tăng dần, ví dụ ngay lập tức -> 5 phút -> 30 phút -> 2 giờ -> 5 giờ -> 10 giờ -> 24 giờ, tới hạn thì bỏ. Vì vậy consumer BẮT BUỘC idempotent.\nRETRY (chiều bạn gửi webhook cho merchant): dùng exponential backoff KÈM JITTER (cộng nhiễu ngẫu nhiên) để tránh hàng loạt retry dồn cùng thời điểm; giới hạn số lần; lưu lịch sử gửi (delivery history) để merchant tự tra.\nPHÂN LOẠI LỖI ĐỂ QUYẾT ĐỊNH RETRY: lỗi tạm thời (timeout, 503, mất mạng) thì retry; lỗi vĩnh viễn (4xx do sai dữ liệu, chữ ký sai, nghiệp vụ từ chối) thì KHÔNG retry, đẩy thẳng vào DLQ. Riêng 429 thì có retry nhưng phải chờ theo Retry-After.\nDLQ không phải nghĩa địa mà là BỘ ĐỆM PHÁT LẠI: giữ đủ ngữ cảnh, giữ 7-30 ngày, sửa xong bug thì phát lại.\nThứ tự event cũng có thể sai (payment.succeeded đến trước payment.created) -> xử lý theo state machine và bỏ qua chuyển trạng thái không hợp lệ, đừng giả định thứ tự.\n\nĐiểm ghi bàn: 'ack nhanh làm việc sau' + phân biệt lỗi tạm thời và vĩnh viễn — hai ý này cho thấy bạn từng vận hành thật.",
    "examples": ["@PostMapping(\"/webhooks/vnpay\")\nResponseEntity<Void> receive(@RequestHeader Map<String,String> h, @RequestBody byte[] raw) {\n  verifySignature(h, raw);            // 1. chữ ký\n  verifyTimestamp(h);                 // 2. cửa sổ thời gian\n  boolean isNew = inbox.tryInsert(h.get(\"event-id\"), raw);  // 3. chống trùng\n  if (isNew) queue.enqueue(...);      // 4. đẩy vào hàng đợi\n  return ResponseEntity.ok().build(); // 5. trả 200 NGAY\n}"]
   }
  ]
 },

 {
  "topic": "Idempotency & Inbox Pattern",
  "items": [
   {
    "question": "Dual-write problem là gì? Transactional Outbox giải quyết ra sao?",
    "answer": "Dual-write: trong một luồng nghiệp vụ bạn phải ghi vào HAI hệ thống khác nhau (database và Kafka) mà không có transaction chung. Đoạn code sau luôn có khe hở:\n  paymentRepository.save(payment);   // commit DB xong\n  kafkaTemplate.send(event);         // service chết ở đây -> MẤT EVENT\nHoặc ngược lại: gửi Kafka trước rồi DB rollback -> event nói về thứ không tồn tại (ma).\nOUTBOX PATTERN: ghi bản ghi nghiệp vụ VÀ bản ghi event vào CÙNG MỘT transaction của CÙNG MỘT database -> tính nguyên tử được đảm bảo bởi chính DB.\n  BEGIN; INSERT payment; INSERT outbox_event; COMMIT;\nSau đó một tiến trình riêng đọc bảng outbox và publish lên Kafka, publish xong thì đánh dấu đã gửi (hoặc xóa).\nHai cách đọc outbox:\n1. Polling publisher: job quét các dòng chưa gửi. Đơn giản, dễ hiểu, có độ trễ nhỏ.\n2. CDC (Debezium đọc WAL/binlog): không đụng vào code nghiệp vụ, độ trễ thấp, chuẩn cho hệ lớn.\nLƯU Ý: outbox đảm bảo AT-LEAST-ONCE (gửi ít nhất một lần) — có thể publish trùng nếu worker chết sau khi gửi nhưng trước khi đánh dấu. Vì thế BẮT BUỘC phải có consumer idempotent ở đầu bên kia.\n\nĐiểm ghi bàn: nói rõ 'outbox cho at-least-once, KHÔNG phải exactly-once' — nhiều người trả lời sai chỗ này.",
    "examples": ["CREATE TABLE outbox_event (\n  id            UUID PRIMARY KEY,\n  aggregate_id  UUID NOT NULL,\n  event_type    VARCHAR(60) NOT NULL,\n  payload       JSONB NOT NULL,\n  created_at    TIMESTAMPTZ NOT NULL,\n  published_at  TIMESTAMPTZ           -- NULL = chưa gửi\n);\nCREATE INDEX ON outbox_event (published_at) WHERE published_at IS NULL;"]
   },
   {
    "question": "Inbox pattern (processed_events) là gì? Khác Outbox chỗ nào?",
    "answer": "Hai mẫu này là cặp đôi, giải quyết hai đầu ngược nhau của cùng một vấn đề:\n- OUTBOX ở phía PRODUCER: chống MẤT event (đảm bảo event đã ghi DB thì chắc chắn được publish).\n- INBOX ở phía CONSUMER: chống XỬ LÝ TRÙNG (event bị giao lại thì không tạo hệ quả hai lần).\nCài đặt inbox: một bảng processed_events với UNIQUE (event_id, consumer_name). Trước khi xử lý, INSERT vào bảng này; nếu vi phạm unique nghĩa là đã xử lý rồi -> bỏ qua và commit offset.\nVì sao phải có consumer_name trong khóa: cùng một event được NHIỀU consumer khác nhau xử lý (Notification, Ledger, Reporting) — mỗi consumer phải có dấu vết riêng.\nĐIỂM MẤU CHỐT: việc ghi inbox và việc xử lý nghiệp vụ phải nằm trong CÙNG MỘT transaction database. Nếu tách ra, service chết ở giữa sẽ tạo ra tình trạng 'đã ghi inbox nhưng chưa làm gì' — event coi như mất luôn.\nDọn dẹp: bảng inbox phình rất nhanh, cần job xóa theo tuổi (nhưng phải giữ lâu hơn thời gian retry tối đa của producer).\nCác cách chống trùng khác tùy nghiệp vụ: dùng chính unique constraint nghiệp vụ (vd UNIQUE trên reference của ledger_entry), hoặc thiết kế thao tác tự nhiên idempotent (SET status='SUCCEEDED' thay vì balance = balance - 100).\n\nĐiểm ghi bàn: 'inbox + nghiệp vụ trong CÙNG transaction' và 'khóa gồm cả consumer_name'.",
    "examples": ["CREATE TABLE processed_event (\n  event_id      UUID NOT NULL,\n  consumer_name VARCHAR(60) NOT NULL,\n  processed_at  TIMESTAMPTZ NOT NULL,\n  PRIMARY KEY (event_id, consumer_name)\n);\n\n@Transactional\nvoid handle(PaymentSucceededEvent e) {\n  if (!inbox.tryInsert(e.id(), \"notification-service\")) return;  // đã xử lý\n  notificationService.send(e);      // cùng transaction với dòng trên\n}"]
   },
   {
    "question": "Vì sao 'exactly-once' gần như là ảo tưởng? Thực tế đạt được bằng cách nào?",
    "answer": "Trong hệ phân tán, bên gửi không bao giờ phân biệt được 'bên nhận chưa nhận' với 'bên nhận đã nhận nhưng phản hồi bị mất'. Vì vậy chỉ có hai lựa chọn thật:\n- AT-MOST-ONCE: gửi rồi thôi, có thể MẤT.\n- AT-LEAST-ONCE: gửi lại tới khi chắc chắn, có thể TRÙNG.\nCông thức thực tế của cái gọi là 'exactly-once':\n  AT-LEAST-ONCE (giao hàng) + IDEMPOTENT (xử lý) = HIỆU QUẢ xử lý đúng một lần\nNghĩa là ta không chống trùng ở tầng mạng, mà làm cho việc xử lý trùng KHÔNG GÂY HẬU QUẢ.\nKafka có 'exactly-once semantics' nhưng phạm vi giới hạn: chỉ đúng cho luồng đọc-xử lý-ghi TRONG NỘI BỘ Kafka (transaction của Kafka). Nó KHÔNG bao trùm được transaction giữa Kafka và PostgreSQL — đây là câu hỏi bẫy rất hay gặp. Muốn nhất quán giữa DB và Kafka vẫn phải dùng Outbox + Inbox.\nBa tầng phòng thủ nên có đồng thời:\n1. Idempotency-Key ở API (chặn client gửi trùng).\n2. Inbox/processed_events ở consumer (chặn event giao lại).\n3. Unique constraint nghiệp vụ ở DB (lưới an toàn cuối, hoạt động ngay cả khi hai tầng trên hỏng).\n\nĐiểm ghi bàn: câu 'at-least-once + idempotent = exactly-once về mặt hiệu quả' và 'Kafka EOS không phủ được PostgreSQL'.",
    "examples": ["Producer  --at-least-once-->  Kafka  --at-least-once-->  Consumer\n                                                           |\n                                              processed_event (UNIQUE)\n                                                           |\n                                                  xử lý ĐÚNG MỘT LẦN"]
   },
   {
    "question": "Retry thế nào cho đúng? Cái gì được retry, cái gì không?",
    "answer": "ĐƯỢC retry (lỗi TẠM THỜI — thử lại có thể thành công):\n- Timeout mạng, mất kết nối.\n- HTTP 503/502, 429 (nhưng phải tôn trọng Retry-After).\n- Lỗi tạm thời của Kafka/DB (deadlock, connection reset).\n- Provider báo lỗi hệ thống.\nKHÔNG retry (lỗi VĨNH VIỄN — thử lại vẫn hỏng, chỉ tốn tài nguyên):\n- 400 dữ liệu không hợp lệ, 401/403 sai quyền.\n- Không đủ số dư, vi phạm quy tắc nghiệp vụ.\n- Chữ ký sai.\n-> Những lỗi này phải đi thẳng vào DLQ/DLT để người xử lý.\nEXPONENTIAL BACKOFF: 1s -> 2s -> 4s -> 8s, tránh dồn dập làm downstream đang yếu càng chết.\nJITTER (nhiễu ngẫu nhiên) rất quan trọng nhưng hay bị quên: nếu 1000 client cùng lỗi và cùng retry sau đúng 2 giây, chúng sẽ tạo một đợt sóng đồng loạt (thundering herd) đánh sập downstream ngay khi nó vừa hồi phục. Cộng thêm một lượng ngẫu nhiên vào thời gian chờ để rải đều.\nMọi retry đều BẮT BUỘC đi kèm idempotency, nếu không retry chính là nguyên nhân tạo ra giao dịch trùng.\nGiới hạn: đặt số lần tối đa và tổng thời gian tối đa; kết hợp circuit breaker để ngừng thử khi downstream rõ ràng đang chết.\n\nĐiểm ghi bàn: nêu JITTER và giải thích thundering herd — chi tiết này hiếm người nói ra.",
    "examples": ["@Retryable(\n  retryFor = { TransientException.class },      // chỉ lỗi tạm thời\n  noRetryFor = { InsufficientFundsException.class },\n  maxAttempts = 4,\n  backoff = @Backoff(delay = 1000, multiplier = 2, random = true)  // có jitter\n)\npublic PaymentResult callProvider(...) { ... }"]
   }
  ]
 },

 {
  "topic": "Clean / Hexagonal Architecture & DDD",
  "items": [
   {
    "question": "Hexagonal Architecture (Ports & Adapters) là gì? Port khác Adapter thế nào?",
    "answer": "Ý tưởng cốt lõi: đặt LÕI NGHIỆP VỤ (domain) ở giữa, mọi thứ kỹ thuật (DB, Kafka, HTTP, provider ngoài) nằm ở rìa và cắm vào lõi qua các 'cổng'.\nPORT = INTERFACE do domain định nghĩa, mô tả CÁI GÌ cần, không nói LÀM THẾ NÀO.\n- Inbound port (driving): API mà thế giới bên ngoài gọi vào domain, vd PaymentUseCase.pay().\n- Outbound port (driven): cái domain cần từ bên ngoài, vd LedgerPort, PaymentProviderPort.\nADAPTER = CÀI ĐẶT CỤ THỂ của port bằng một công nghệ.\n- Inbound adapter: REST controller, Kafka listener, CLI.\n- Outbound adapter: JpaPaymentRepository, VnpayAdapter, KafkaEventPublisher.\nHƯỚNG PHỤ THUỘC (điểm quan trọng nhất): mũi tên luôn CHĨA VÀO domain. Domain KHÔNG biết gì về JPA, Kafka, Spring. Muốn đổi từ VNPAY sang MoMo chỉ cần viết adapter mới, domain không đổi một dòng.\nCách đảo phụ thuộc: interface đặt trong package domain, class cài đặt đặt trong package infrastructure — đây chính là chữ D (Dependency Inversion) của SOLID.\nLợi ích thấy rõ nhất khi test: unit test domain không cần Spring context, không cần DB, chỉ cần cắm fake adapter -> test chạy trong mili giây.\n\nĐiểm ghi bàn: nói được 'port là interface của domain, adapter là cài đặt kỹ thuật, phụ thuộc luôn chĩa vào trong'.",
    "examples": ["// domain/port/out/PaymentProviderPort.java  (domain định nghĩa)\npublic interface PaymentProviderPort {\n    ProviderResult charge(Money amount, CardToken token);\n}\n\n// infrastructure/adapter/out/VnpayAdapter.java  (hạ tầng cài đặt)\n@Component\nclass VnpayAdapter implements PaymentProviderPort {\n    private final RestClient client;\n    public ProviderResult charge(Money amount, CardToken token) { ... }\n}"]
   },
   {
    "question": "Cấu trúc package theo Hexagonal trong Spring Boot nên như thế nào?",
    "answer": "Chia 4 tầng, mỗi tầng có luật riêng:\n1. domain — Entity, Value Object, Aggregate, Domain Event, các port (interface), business rule. KHÔNG có annotation kỹ thuật (@Entity, @Component), KHÔNG import Spring/JPA.\n2. application — Use case / Application Service: điều phối domain, mở transaction, gọi outbound port. Không chứa quy tắc nghiệp vụ chi tiết (quy tắc thuộc về domain).\n3. infrastructure — adapter ra ngoài: JPA repository, entity của JPA, Kafka producer/consumer, HTTP client, mapper.\n4. api (hoặc web) — controller, DTO request/response, exception handler.\nQUY TẮC PHỤ THUỘC: api -> application -> domain; infrastructure -> domain. KHÔNG có mũi tên nào đi ra từ domain.\nMỘT TRANH LUẬN THẬT: có nên tách Domain Model và JPA Entity thành hai class không?\n- Tách: domain thuần khiết tuyệt đối, nhưng phải viết mapper (dùng MapStruct để đỡ tay).\n- Gộp (dùng luôn @Entity làm domain model): ít code hơn nhiều, nhưng domain bị dính JPA (lazy loading, no-arg constructor, setter public phá vỡ tính bất biến).\nCâu trả lời chín chắn: dự án nhỏ/CRUD thì gộp; hệ thống có nghiệp vụ phức tạp như thanh toán thì tách — và nói rõ mình đánh đổi cái gì.\nCó thể cưỡng chế luật phụ thuộc tự động bằng ArchUnit trong CI.\n\nĐiểm ghi bàn: nêu được đánh đổi 'tách hay không tách JPA entity' thay vì trả lời máy móc theo sách.",
    "examples": ["com.payflow.payment\n ├── domain/          Payment, Money, PaymentStatus, PaymentProviderPort\n ├── application/     PaymentUseCase, CreatePaymentService  (@Transactional ở đây)\n ├── infrastructure/  JpaPaymentRepository, PaymentJpaEntity, VnpayAdapter\n └── api/             PaymentController, CreatePaymentRequest\n\n// ArchUnit: cưỡng chế trong CI\nnoClasses().that().resideInAPackage(\"..domain..\")\n  .should().dependOnClassesThat().resideInAnyPackage(\"..infrastructure..\", \"..api..\");"]
   },
   {
    "question": "Aggregate, Entity, Value Object, Domain Event trong DDD khác nhau thế nào?",
    "answer": "ENTITY: có ĐỊNH DANH (id) và vòng đời; hai Entity khác nhau dù mọi thuộc tính giống nhau. Ví dụ Payment.\nVALUE OBJECT: KHÔNG có id, định danh bằng chính GIÁ TRỊ; bất biến (immutable); hai VO bằng nhau nếu mọi trường bằng nhau. Ví dụ Money(500000, VND), CardNumber. Java record là công cụ hoàn hảo cho VO.\nAGGREGATE: cụm Entity + VO được coi là MỘT đơn vị nhất quán, có một AGGREGATE ROOT làm cửa vào duy nhất. Mọi thay đổi bên trong phải đi qua root, nhờ đó root cưỡng chế được bất biến nghiệp vụ (vd tổng refund <= số đã capture).\nQUY TẮC AGGREGATE quan trọng: một transaction chỉ nên sửa MỘT aggregate; các aggregate khác được cập nhật bất đồng bộ qua Domain Event (đây chính là nhất quán cuối/eventual consistency). Giữa các aggregate tham chiếu nhau bằng ID, không bằng object reference.\nDOMAIN EVENT: sự việc ĐÃ XẢY RA trong nghiệp vụ, đặt tên ở THÌ QUÁ KHỨ: PaymentSucceeded, RefundIssued. Là bản ghi bất biến, dùng để thông báo cho phần còn lại của hệ thống (thường qua Outbox -> Kafka).\nREPOSITORY: chỉ tạo cho AGGREGATE ROOT, không tạo cho từng entity con.\n\nĐiểm ghi bàn: 'một transaction một aggregate, giữa các aggregate thì eventual consistency qua domain event' — câu này cho thấy hiểu DDD ở mức thiết kế chứ không chỉ thuộc định nghĩa.",
    "examples": ["public record Money(BigDecimal amount, Currency currency) {}   // Value Object\n\npublic class Payment {          // Aggregate Root\n    private final PaymentId id;\n    private Money captured;\n    private final List<Refund> refunds = new ArrayList<>();\n\n    public void refund(Money amount) {                 // cửa vào duy nhất\n        if (totalRefunded().add(amount).isGreaterThan(captured))\n            throw new RefundExceedsCapturedException(); // bất biến do root giữ\n        refunds.add(new Refund(amount));\n        register(new RefundIssued(id, amount));         // domain event\n    }\n}"]
   },
   {
    "question": "Bounded Context là gì? Liên quan thế nào tới việc chia microservice?",
    "answer": "Bounded Context là RANH GIỚI trong đó một mô hình và một bộ thuật ngữ có ý nghĩa NHẤT QUÁN. Cùng một từ ở hai context có thể là hai thứ khác nhau:\n- 'Payment' trong context Thanh toán = giao dịch có state machine, provider, idempotency key.\n- 'Payment' trong context Kế toán = tập bút toán trong sổ cái.\n- 'Customer' trong context Rủi ro = hồ sơ điểm rủi ro; trong context Thông báo = email + số điện thoại.\nSai lầm kinh điển: cố ép một model 'Customer' dùng chung cho toàn hệ thống -> class phình to, mọi service phụ thuộc lẫn nhau, đổi một trường là phải deploy tất cả.\nBounded Context là TIÊU CHÍ CHIA MICROSERVICE tốt nhất: mỗi service sở hữu một context, có mô hình riêng, DATABASE RIÊNG (database per service). Không service nào được đọc thẳng bảng của service khác — giao tiếp chỉ qua API hoặc event, nếu không thì đó là monolith phân tán với đủ nhược điểm của cả hai.\nGiữa các context dùng ngôn ngữ chung nội bộ (ubiquitous language) và ánh xạ dữ liệu ở biên (anti-corruption layer) để mô hình bẩn của bên ngoài không rò rỉ vào domain của mình.\nNgược lại, chia service theo TẦNG KỸ THUẬT (service-controller, service-dao) là phản mẫu.\n\nĐiểm ghi bàn: 'chia service theo bounded context + database per service' và cảnh báo 'chia sai thành monolith phân tán'.",
    "examples": ["Payment Context   : Payment(state machine, idempotencyKey, provider)\nRisk Context      : Customer(riskScore, blacklist)\nLedger Context    : Account(entries), JournalEntry\nNotification Ctx  : Recipient(email, zaloId)\n\n-> 4 service, 4 schema/DB riêng, nói chuyện qua Kafka event"]
   },
   {
    "question": "MapStruct dùng để làm gì? Bẫy thường gặp?",
    "answer": "Kiến trúc tách tầng sinh ra nhiều lớp model gần giống nhau: Request DTO -> Domain Model -> JPA Entity -> Response DTO. Viết mapper tay vừa dài vừa dễ quên trường khi thêm field mới.\nMapStruct sinh code mapper LÚC BIÊN DỊCH (annotation processor):\n- Không dùng reflection -> nhanh gần như viết tay, không tốn chi phí runtime.\n- Sai tên trường bị phát hiện NGAY KHI BUILD, không đợi tới lúc chạy (khác hẳn ModelMapper vốn ánh xạ theo tên lúc runtime).\n- Code sinh ra đọc được, debug được.\nBẪY THỰC TẾ:\n1. Thứ tự annotation processor với Lombok: phải khai báo lombok TRƯỚC mapstruct (hoặc dùng lombok-mapstruct-binding), nếu không MapStruct không thấy getter/setter do Lombok sinh -> lỗi 'unmapped property' khó hiểu.\n2. componentModel = \"spring\" để mapper thành bean, tiêm được vào service.\n3. unmappedTargetPolicy = ERROR để build gãy khi có trường chưa map — rất đáng bật trong hệ thống tiền, tránh im lặng bỏ sót số tiền hoặc currency.\n4. Cẩn thận map thẳng entity <-> DTO khi có quan hệ lazy: dễ kích hoạt query ngoài transaction (LazyInitializationException) hoặc N+1.\n\nĐiểm ghi bàn: 'sinh code lúc biên dịch nên lỗi lộ ra khi build' + biết bẫy thứ tự với Lombok.",
    "examples": ["@Mapper(componentModel = \"spring\",\n        unmappedTargetPolicy = ReportingPolicy.ERROR)\npublic interface PaymentMapper {\n    @Mapping(source = \"amount.value\",    target = \"amount\")\n    @Mapping(source = \"amount.currency\", target = \"currency\")\n    PaymentResponse toResponse(Payment payment);\n}"]
   },
   {
    "question": "Khi nào KHÔNG nên dùng Hexagonal/DDD?",
    "answer": "Trả lời được câu này mới cho thấy bạn dùng kiến trúc vì lý do, không phải vì mốt.\nKHÔNG nên dùng khi:\n- Ứng dụng chủ yếu là CRUD, nghiệp vụ mỏng: thêm 4 tầng và một đống mapper chỉ làm chậm mọi thay đổi mà không đổi lại được gì.\n- Đội nhỏ, cần ra sản phẩm nhanh, miền nghiệp vụ chưa rõ ràng (chưa biết bounded context nằm ở đâu thì chia sẽ chia sai).\n- Prototype, dự án ngắn hạn.\nCHI PHÍ PHẢI THỪA NHẬN: nhiều class hơn, nhiều mapper hơn, người mới vào mất thời gian làm quen, đi tìm một luồng phải mở nhiều file.\nNÊN dùng khi: nghiệp vụ phức tạp và có nhiều quy tắc (thanh toán, ngân hàng, bảo hiểm), hệ thống sống lâu, nhiều tích hợp bên ngoài có thể bị thay thế, cần test nghiệp vụ mà không dựng hạ tầng.\nCÁCH TIẾP CẬN THỰC TẾ: bắt đầu bằng modular monolith có ranh giới package rõ ràng (và ArchUnit cưỡng chế), khi ranh giới đã ổn định và có nhu cầu scale/độc lập triển khai thì tách thành service.\n\nĐiểm ghi bàn: dám nói 'chỗ này overkill' và đề xuất modular monolith trước khi tách microservice.",
    "examples": ["Nghiệp vụ mỏng, CRUD  -> Controller -> Service -> Repository (3 tầng là đủ)\nNghiệp vụ phức tạp    -> Hexagonal + DDD\nChưa rõ ranh giới     -> Modular monolith trước, tách service sau"]
   }
  ]
 },

 {
  "topic": "Resilience nâng cao (Timeout, Bulkhead, Fallback)",
  "items": [
   {
    "question": "Connect timeout khác read timeout thế nào? Vì sao thiếu timeout là lỗi nghiêm trọng?",
    "answer": "CONNECT TIMEOUT: thời gian tối đa để THIẾT LẬP kết nối TCP. Hết hạn nghĩa là không với tới được server (sập, sai địa chỉ, firewall chặn). Nên đặt ngắn: 1-3 giây.\nREAD TIMEOUT (response timeout): thời gian tối đa CHỜ DỮ LIỆU sau khi đã kết nối. Hết hạn nghĩa là server nhận request nhưng xử lý quá lâu. Đặt theo SLA thực tế của downstream, thường 3-10 giây.\nVÌ SAO KHÔNG CÓ TIMEOUT LÀ THẢM HỌA: mặc định của nhiều HTTP client là chờ VÔ HẠN. Downstream treo -> luồng của bạn bị giữ -> thread pool cạn -> service của bạn cũng chết dù bản thân nó hoàn toàn khỏe mạnh. Đây chính là cơ chế lan truyền của cascading failure.\nVỚI THANH TOÁN CÓ MỘT CẢNH BÁO RIÊNG: timeout KHÔNG có nghĩa là giao dịch thất bại. Rất có thể provider đã trừ tiền thành công nhưng phản hồi bị mất. Vì vậy sau timeout tuyệt đối KHÔNG được đánh FAILED ngay — phải để trạng thái UNKNOWN/PENDING và truy vấn lại (query transaction status) hoặc chờ đối soát.\nNgoài ra cần timeout ở mọi tầng: HTTP client, truy vấn DB (statement_timeout), lock timeout, và tổng thời gian của cả use case.\nQUY TẮC XẾP TẦNG: timeout của caller phải LỚN HƠN timeout của callee, nếu không caller bỏ cuộc trong khi callee vẫn đang làm việc và tiêu tài nguyên vô ích.\n\nĐiểm ghi bàn: 'timeout không đồng nghĩa với thất bại' — trong domain thanh toán đây là ý được đánh giá rất cao.",
    "examples": ["@Bean\nRestClient restClient(RestClient.Builder b) {\n  var f = new SimpleClientHttpRequestFactory();\n  f.setConnectTimeout(Duration.ofSeconds(2));\n  f.setReadTimeout(Duration.ofSeconds(5));\n  return b.requestFactory(f).build();\n}\n\n# statement timeout phía DB\nspring.jpa.properties.jakarta.persistence.query.timeout=3000"]
   },
   {
    "question": "Bulkhead là gì? Semaphore khác ThreadPool bulkhead ra sao?",
    "answer": "Tên lấy từ khoang kín của tàu thủy: thủng một khoang thì nước không tràn sang khoang khác. Trong phần mềm: GIỚI HẠN tài nguyên cho mỗi downstream để một dịch vụ chậm không nuốt hết tài nguyên của cả service.\nVí dụ vì sao cần: service gọi cả VNPAY và MoMo. MoMo treo, mọi request tới MoMo giữ luồng -> cạn thread pool chung -> request VNPAY (vốn khỏe) cũng bị chết đói. Có bulkhead thì MoMo chỉ được tiêu tối đa phần đã cấp.\nHAI LOẠI:\n1. SEMAPHORE bulkhead: đếm số lệnh gọi đồng thời, chạy TRÊN CHÍNH luồng gọi. Chi phí rất thấp, không đổi context, KHÔNG tự cô lập được nếu lời gọi bị chặn (vì vẫn chiếm luồng của caller) -> BẮT BUỘC phải đi kèm timeout. Phù hợp cho lời gọi đồng bộ, throughput cao.\n2. THREADPOOL bulkhead: chạy trên pool RIÊNG, trả về CompletableFuture. Cô lập thật sự (luồng caller được giải phóng), có hàng đợi, nhưng tốn thêm chi phí chuyển ngữ cảnh và làm mất ThreadLocal (SecurityContext, MDC, transaction) nếu không truyền thủ công.\nChọn thế nào: mặc định dùng semaphore + timeout; dùng threadpool khi cần cô lập mạnh với downstream hay treo hoặc cần bất đồng bộ.\nLƯU Ý: ThreadPoolBulkhead của Resilience4j KHÔNG dùng được với phương thức trả về kiểu đồng bộ thông thường — phải trả CompletableFuture.\n\nĐiểm ghi bàn: giải thích được vì sao semaphore bulkhead vô nghĩa nếu không có timeout.",
    "examples": ["resilience4j:\n  bulkhead:\n    instances:\n      vnpay:\n        maxConcurrentCalls: 20\n        maxWaitDuration: 100ms\n  thread-pool-bulkhead:\n    instances:\n      momo:\n        maxThreadPoolSize: 10\n        coreThreadPoolSize: 5\n        queueCapacity: 20"]
   },
   {
    "question": "Thứ tự kết hợp Retry, CircuitBreaker, TimeLimiter, Bulkhead trong Resilience4j?",
    "answer": "Thứ tự bọc (decorator) ẢNH HƯỞNG TRỰC TIẾP tới hành vi. Thứ tự mặc định của Spring Boot starter, từ NGOÀI vào TRONG:\n  Retry -> CircuitBreaker -> RateLimiter -> TimeLimiter -> Bulkhead -> lời gọi thật\nDiễn giải: Bulkhead ôm sát lời gọi nhất (giới hạn số lệnh đồng thời), TimeLimiter cắt lời gọi quá lâu, CircuitBreaker ghi nhận kết quả (kể cả timeout tính là lỗi), Retry nằm NGOÀI CÙNG nên mỗi lần thử lại là một lần đi qua circuit breaker.\nHỆ QUẢ QUAN TRỌNG của việc Retry nằm ngoài CircuitBreaker: khi breaker đang OPEN, retry sẽ nhanh chóng nhận CallNotPermittedException thay vì thực sự đập vào downstream — đúng như mong muốn. Nếu đảo ngược (CircuitBreaker ngoài, Retry trong) thì một lần gọi có 3 lần thử chỉ được tính là MỘT kết quả với breaker, làm breaker mở chậm hơn nhiều.\nVới ThreadPoolBulkhead thì ngược lại: nó phải nằm NGOÀI CÙNG vì chính nó là thứ đẩy lời gọi sang luồng khác.\nFALLBACK luôn ở lớp ngoài cùng của tất cả: nó bắt mọi ngoại lệ còn sót lại (bao gồm CallNotPermittedException, TimeoutException, BulkheadFullException).\nRETRY + CIRCUIT BREAKER là cặp hay bị hiểu nhầm: retry chữa lỗi CHỚP NHOÁNG (một gói tin rớt), circuit breaker chữa lỗi KÉO DÀI (downstream sập). Chỉ có retry mà không có breaker thì retry sẽ dội bom một hệ thống đang chết.\n\nĐiểm ghi bàn: nói được vì sao Retry phải ở NGOÀI CircuitBreaker và hệ quả nếu đảo thứ tự.",
    "examples": ["# Đổi thứ tự nếu cần\nresilience4j.circuitbreaker.instances.vnpay.register-health-indicator: true\n\n@Retry(name = \"vnpay\")\n@CircuitBreaker(name = \"vnpay\", fallbackMethod = \"fallback\")\n@Bulkhead(name = \"vnpay\")\n@TimeLimiter(name = \"vnpay\")\npublic CompletableFuture<Result> charge(...) { ... }\n\nprivate CompletableFuture<Result> fallback(Throwable t) { ... }"]
   },
   {
    "question": "Bẫy lớn nhất khi dùng CircuitBreaker: lỗi nghiệp vụ làm mở mạch",
    "answer": "Circuit breaker đếm TỶ LỆ THẤT BẠI để quyết định mở mạch. Nếu 'không đủ số dư' hay 'thẻ không hợp lệ' được ném thành exception và bị tính là thất bại, thì một đợt khách hết tiền sẽ khiến breaker MỞ và chặn luôn cả những giao dịch hợp lệ — trong khi provider hoàn toàn khỏe mạnh.\nCÁCH SỬA: khai báo ignoreExceptions cho các ngoại lệ nghiệp vụ, hoặc dùng recordExceptions để chỉ tính đúng nhóm lỗi hạ tầng.\nNguyên tắc: breaker chỉ nên phản ứng với sức khỏe của DOWNSTREAM (timeout, 5xx, mất kết nối), không phản ứng với kết quả nghiệp vụ (4xx, từ chối hợp lệ).\nBA TRẠNG THÁI cần nắm: CLOSED (cho qua, đang đếm) -> OPEN (chặn ngay, ném CallNotPermittedException, không đụng downstream) -> HALF_OPEN (cho một số lời gọi thăm dò; tốt thì đóng lại, xấu thì mở tiếp).\nCÁC THAM SỐ HAY BỊ ĐẶT SAI:\n- minimumNumberOfCalls quá nhỏ (vd 2): một cú xui là mở mạch. Nên đặt đủ lớn để tỷ lệ có ý nghĩa thống kê.\n- slidingWindowType: COUNT_BASED (theo N lời gọi) hợp với lưu lượng đều; TIME_BASED (theo N giây) hợp với lưu lượng thất thường.\n- waitDurationInOpenState quá dài làm dịch vụ hồi phục rồi vẫn bị chặn.\nMỖI DOWNSTREAM MỘT BREAKER RIÊNG — dùng chung một instance cho nhiều dịch vụ khiến dịch vụ này sập kéo dịch vụ kia chết theo.\n\nĐiểm ghi bàn: chủ động nêu ignoreExceptions cho lỗi nghiệp vụ — đây là lỗi thực tế rất hay gặp mà ít người nhắc.",
    "examples": ["resilience4j:\n  circuitbreaker:\n    instances:\n      vnpay:\n        slidingWindowType: COUNT_BASED\n        slidingWindowSize: 50\n        minimumNumberOfCalls: 20\n        failureRateThreshold: 50\n        waitDurationInOpenState: 30s\n        permittedNumberOfCallsInHalfOpenState: 5\n        ignoreExceptions:\n          - com.payflow.InsufficientFundsException\n          - com.payflow.InvalidCardException"]
   },
   {
    "question": "Fallback nên trả về cái gì? Fallback nào là SAI trong hệ thống thanh toán?",
    "answer": "Fallback tốt phải GIẢM CHẤT LƯỢNG một cách có kiểm soát, không được BỊA RA sự thật.\nFALLBACK ĐÚNG theo tình huống:\n- Đọc dữ liệu: trả dữ liệu cache cũ kèm cờ 'stale', hoặc giá trị mặc định an toàn.\n- Dịch vụ phụ trợ (gợi ý, đánh giá, thông báo): trả rỗng, ẩn phần giao diện đó đi.\n- Ghi/giao dịch: đưa vào hàng đợi để xử lý sau và trả 202 Accepted kèm mã theo dõi.\n- Không làm gì được: trả lỗi RÕ RÀNG (503 + Retry-After) để client biết đường thử lại.\nFALLBACK SAI (rất nguy hiểm, hay bị hỏi bẫy):\n- Trả 'thanh toán thành công' khi không gọi được provider -> hàng được giao mà tiền chưa thu.\n- Trả 'thanh toán thất bại' khi bị TIMEOUT -> có thể provider đã trừ tiền thật; đúng phải là trạng thái UNKNOWN + truy vấn lại/đối soát.\n- Nuốt ngoại lệ rồi trả null làm NullPointerException nổ ở chỗ khác, mất dấu vết lỗi gốc.\n- Fallback lại gọi một dịch vụ ngoài khác (fallback cũng có thể hỏng) hoặc thực hiện thao tác nặng.\nLUÔN GHI LOG và ĐẾM METRIC mỗi lần fallback chạy — fallback im lặng che mất sự cố, đội vận hành không biết downstream đang chết cho tới khi khách phàn nàn.\nChữ ký hàm fallback phải TRÙNG tham số với hàm gốc và có thêm Throwable ở cuối, nếu không Resilience4j không tìm thấy và ném lỗi lúc chạy.\n\nĐiểm ghi bàn: nêu 'timeout thì để UNKNOWN chứ không đánh FAILED' và 'fallback phải có metric'.",
    "examples": ["@CircuitBreaker(name = \"vnpay\", fallbackMethod = \"chargeFallback\")\npublic PaymentResult charge(PaymentCommand cmd) { ... }\n\nprivate PaymentResult chargeFallback(PaymentCommand cmd, Throwable t) {\n    meterRegistry.counter(\"payment.fallback\", \"provider\", \"vnpay\").increment();\n    log.warn(\"fallback vnpay paymentId={}\", cmd.paymentId(), t);\n    if (t instanceof TimeoutException)\n        return PaymentResult.unknown(cmd.paymentId());   // KHÔNG phải failed\n    throw new ProviderUnavailableException();            // 503 + Retry-After\n}"]
   }
  ]
 },

 {
  "topic": "Kafka vận hành (Consumer Lag & tuning)",
  "items": [
   {
    "question": "Consumer lag là gì? Đo thế nào và vì sao là chỉ số quan trọng nhất?",
    "answer": "CONSUMER LAG = log end offset (offset mới nhất trên partition) − committed offset (offset consumer đã xử lý xong). Đơn vị là SỐ MESSAGE, tính THEO TỪNG PARTITION rồi cộng lại cho consumer group.\nÝ nghĩa: consumer đang chậm hơn producer bao nhiêu. Lag nhỏ và ổn định là khỏe. Lag TĂNG LIÊN TỤC nghĩa là tốc độ tiêu thụ thấp hơn tốc độ sản xuất — nếu không xử lý, message sẽ bị mất khi quá retention.\nNhìn XU HƯỚNG chứ đừng nhìn con số tuyệt đối: lag 10.000 mà đang giảm đều thì ổn (vừa qua đợt cao điểm); lag 500 mà tăng đều mới đáng lo.\nBổ sung một góc nhìn thực tế hơn: LAG THEO THỜI GIAN (message cũ nhất chưa xử lý đã nằm chờ bao lâu) thường có ý nghĩa nghiệp vụ hơn lag theo số lượng, vì 10.000 message nhẹ có thể xử lý trong 2 giây.\nCÁCH XEM:\n- CLI: kafka-consumer-groups.sh --describe --group <g> (cột LAG theo từng partition).\n- Trong Java: qua JMX metrics records-lag-max, hoặc Micrometer/Actuator đẩy sang Prometheus rồi vẽ Grafana.\n- Công cụ: Kafka Exporter, Burrow, Conduktor.\nLƯU Ý QUAN TRỌNG: nếu consumer dùng assign() thủ công thay vì subscribe() thì KHÔNG có consumer group và KHÔNG theo dõi được lag theo cách thông thường.\nLag lệch giữa các partition thường không phải do Kafka mà do PHÂN BỔ KEY lệch (hot partition).\n\nĐiểm ghi bàn: phân biệt lag theo số lượng và lag theo thời gian, và nhấn 'nhìn xu hướng'.",
    "examples": ["kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\n  --describe --group payment-group\n\nTOPIC        PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\npayment.evt  0          15230           15280           50\npayment.evt  1          14900           28400           13500   <- hot partition"]
   },
   {
    "question": "Lag tăng thì điều tra và xử lý theo thứ tự nào?",
    "answer": "Đừng vội tăng số instance — hỏi ba câu theo thứ tự:\n1. LAG TẬP TRUNG Ở ĐÂU? Nếu chỉ một vài partition bị lag -> vấn đề là PHÂN BỔ KEY lệch (nhiều event dồn vào một merchant lớn), thêm consumer cũng vô ích vì một partition chỉ được một consumer trong group đọc. Cách chữa: đổi chiến lược chọn key, hoặc tách topic riêng cho các key nóng.\n2. CONSUMER CHẬM Ở BƯỚC NÀO? Thường là gọi API ngoài đồng bộ, truy vấn DB thiếu index, hoặc N+1. Đo thời gian xử lý mỗi message trước khi kết luận. Tối ưu ở đây thường hiệu quả gấp nhiều lần việc thêm máy.\n3. CÓ REBALANCE LIÊN TỤC KHÔNG? Mỗi lần rebalance là toàn group dừng tiêu thụ. Nguyên nhân kinh điển: xử lý một lô lâu hơn max.poll.interval.ms -> broker tưởng consumer chết -> đá ra khỏi group -> rebalance -> lô đó bị xử lý lại -> càng chậm -> vòng xoáy. Sửa bằng cách GIẢM max.poll.records hoặc TĂNG max.poll.interval.ms.\nSAU ĐÓ mới tới các phương án mở rộng:\n- Tăng số consumer instance, nhưng TRẦN là SỐ PARTITION: 10 partition thì consumer thứ 11 sẽ ngồi không.\n- Tăng số partition (chỉ tăng được, không giảm; và làm thay đổi ánh xạ key -> partition nên có thể phá vỡ thứ tự tạm thời).\n- Xử lý song song trong consumer (cẩn thận: mất thứ tự và phức tạp hóa việc commit offset).\n- Tăng batch: max.poll.records, fetch.min.bytes, fetch.max.wait.ms.\nCẢNH BÁO NÊN ĐẶT: cảnh báo theo TỐC ĐỘ TĂNG của lag và theo lag-theo-thời-gian, không đặt ngưỡng cứng một con số.\n\nĐiểm ghi bàn: nêu vòng xoáy rebalance do max.poll.interval.ms — dấu hiệu rõ của người từng vận hành Kafka thật.",
    "examples": ["# Chống vòng xoáy rebalance khi xử lý chậm\nspring.kafka.consumer.max-poll-records: 50          # mặc định 500\nspring.kafka.properties.max.poll.interval.ms: 300000 # 5 phút\n\n# Gom lô để tăng throughput\nspring.kafka.consumer.fetch-min-size: 50KB\nspring.kafka.consumer.fetch-max-wait: 500ms"]
   },
   {
    "question": "Partition key chọn thế nào? Thứ tự message được đảm bảo tới đâu?",
    "answer": "Kafka CHỈ đảm bảo thứ tự TRONG MỘT PARTITION, không đảm bảo thứ tự toàn topic. Message cùng key luôn vào cùng partition (hash(key) % số partition) nên cùng key thì giữ được thứ tự.\nCHỌN KEY trong hệ thanh toán: dùng paymentId hoặc accountId — mọi event của cùng một payment sẽ được xử lý đúng thứ tự (created -> authorized -> captured).\nKHÔNG có key (key = null): message được rải đều -> thông lượng tốt nhất nhưng MẤT thứ tự. Chỉ dùng khi thứ tự không quan trọng (log, metric).\nBẪY HOT PARTITION: chọn key có phân bố lệch (vd merchantId trong khi một merchant chiếm 80% lưu lượng) -> một partition quá tải trong khi các partition khác rảnh. Cách chữa: key mịn hơn (paymentId), hoặc key ghép merchantId + hậu tố băm nếu vẫn cần gom nhóm.\nTĂNG SỐ PARTITION làm thay đổi kết quả hash(key) % N -> các message cùng key sau đó có thể rơi vào partition khác và bị xử lý song song với message cũ. Vì vậy nên ước lượng số partition dư ngay từ đầu, và nếu buộc phải tăng thì phải chấp nhận một giai đoạn thứ tự không đảm bảo.\nĐỂ GIỮ THỨ TỰ khi có retry, còn cần max.in.flight.requests.per.connection <= 5 KÈM enable.idempotence=true ở producer (mặc định bật từ Kafka 3.0), nếu không một lần retry có thể đẩy message ra sau message gửi sau nó.\nQuan trọng nhất: nếu consumer đã idempotent và xử lý theo state machine thì phụ thuộc vào thứ tự sẽ ít nguy hiểm hơn nhiều.\n\nĐiểm ghi bàn: 'thứ tự chỉ trong partition' + hot partition + hệ quả của việc tăng partition.",
    "examples": ["kafkaTemplate.send(\"payment.events\", payment.getId().toString(), event);\n//                                    ^ key = paymentId -> cùng partition\n\n# Producer giữ thứ tự an toàn khi retry\nspring.kafka.producer.properties.enable.idempotence: true\nspring.kafka.producer.properties.max.in.flight.requests.per.connection: 5\nspring.kafka.producer.acks: all"]
   },
   {
    "question": "Commit offset: auto hay manual? Vì sao ảnh hưởng tới mất/trùng message?",
    "answer": "AUTO COMMIT (enable.auto.commit=true, mặc định commit mỗi 5 giây): consumer có thể commit offset của message CHƯA XỬ LÝ XONG. Nếu chết ngay sau khi commit, message đó MẤT VĨNH VIỄN. Trong hệ thống tiền đây là điều không chấp nhận được.\nMANUAL COMMIT (ack-mode MANUAL/MANUAL_IMMEDIATE): xử lý XONG mới ack. Nếu chết trước khi ack, message được giao lại -> AT-LEAST-ONCE -> lại quay về yêu cầu consumer phải idempotent (bảng processed_event).\nQUY TẮC VÀNG: XỬ LÝ TRƯỚC, COMMIT SAU. Đảo lại là chọn at-most-once (chấp nhận mất).\nauto.offset.reset quyết định hành vi khi group chưa có offset (lần đầu chạy, hoặc offset cũ đã hết hạn):\n- earliest: đọc từ đầu — an toàn cho việc không mất dữ liệu, nhưng lần đầu deploy có thể xử lý lại cả núi message cũ.\n- latest: chỉ đọc message mới — nhanh nhưng bỏ qua mọi thứ đã tồn tại.\nMột lỗi vận hành hay gặp: đổi group.id vô tình tạo group MỚI, cộng với auto.offset.reset=earliest -> consumer đọc lại toàn bộ topic từ đầu.\nDLT (Dead Letter Topic) trong Spring Kafka: cấu hình DefaultErrorHandler + DeadLetterPublishingRecoverer để message lỗi vĩnh viễn không chặn cả partition. Không có DLT thì một message độc (poison message) sẽ bị retry vô hạn và toàn bộ partition đứng lại phía sau nó.\n\nĐiểm ghi bàn: nêu poison message chặn partition — hậu quả rất thực tế của việc thiếu DLT.",
    "examples": ["spring.kafka.consumer.enable-auto-commit: false\nspring.kafka.listener.ack-mode: MANUAL_IMMEDIATE\n\n@KafkaListener(topics = \"payment.events\", groupId = \"ledger-service\")\npublic void on(ConsumerRecord<String, String> r, Acknowledgment ack) {\n    handle(r);      // xử lý XONG (đã ghi DB, đã ghi processed_event)\n    ack.acknowledge();  // rồi mới commit\n}"]
   },
   {
    "question": "Quan sát Kafka trong production: cần theo dõi những metric nào?",
    "answer": "Nhóm CONSUMER:\n- kafka_consumergroup_lag (theo group, theo partition) — quan trọng nhất, cảnh báo theo xu hướng tăng.\n- records-lag-max, fetch-latency-avg.\n- Số lần rebalance trong khoảng thời gian — rebalance liên tục là dấu hiệu đỏ.\n- Thời gian xử lý mỗi message (đo bằng Micrometer @Timed) — để phân biệt 'consumer chậm' với 'producer bắn quá nhanh'.\nNhóm PRODUCER:\n- record-send-rate, record-error-rate.\n- request-latency-avg.\n- buffer-available-bytes (cạn buffer nghĩa là producer đang bị nghẽn).\nNhóm BROKER: under-replicated partitions (phải luôn bằng 0), disk usage, số partition offline.\nNhóm NGHIỆP VỤ (thường có giá trị nhất khi báo cáo): outbox_pending_total (số event chưa publish), dlt_messages_total, payment_success_total / payment_failed_total.\nTRACE XUYÊN QUA KAFKA: gắn traceId/correlationId vào HEADER của message (không phải payload) để OpenTelemetry nối được span từ HTTP request qua producer sang consumer. Không có bước này thì trace đứt ngay tại Kafka và việc điều tra sự cố phân tán gần như bất khả thi.\nCẢNH BÁO NÊN CÓ: lag tăng liên tục quá N phút, DLT có message mới, outbox pending vượt ngưỡng, rebalance quá nhiều lần/giờ.\n\nĐiểm ghi bàn: nói về propagate traceId qua Kafka header và metric nghiệp vụ, không chỉ metric hạ tầng.",
    "examples": ["// Truyền context tracing qua Kafka header\nProducerRecord<String,String> record = new ProducerRecord<>(topic, key, value);\nrecord.headers().add(\"traceparent\", traceparent.getBytes(UTF_8));\nrecord.headers().add(\"X-Correlation-Id\", correlationId.getBytes(UTF_8));\n\n# Prometheus alert\n- alert: KafkaConsumerLagGrowing\n  expr: delta(kafka_consumergroup_lag[10m]) > 1000\n  for: 10m"]
   }
  ]
 },

 {
  "topic": "Flyway, Migration & Contract Test",
  "items": [
   {
    "question": "Flyway hoạt động thế nào? Versioned khác Repeatable migration ra sao?",
    "answer": "Flyway quản lý phiên bản schema database như git quản lý code: mỗi thay đổi là một file SQL được đánh phiên bản, chạy theo thứ tự, ghi lại vào bảng flyway_schema_history.\nQUY ƯỚC ĐẶT TÊN:\n- V<version>__<mô tả>.sql — VERSIONED: chạy MỘT LẦN duy nhất, theo thứ tự phiên bản. Ví dụ V1__create_payment.sql, V2__add_idempotency_key.sql.\n- R__<mô tả>.sql — REPEATABLE: chạy LẠI mỗi khi nội dung file thay đổi (checksum đổi), luôn chạy SAU tất cả versioned. Dùng cho view, stored procedure, dữ liệu tham chiếu — những thứ có thể CREATE OR REPLACE.\n- U<version>__ — UNDO (chỉ có ở bản Teams).\nCHECKSUM: Flyway băm nội dung mỗi file đã chạy. SỬA MỘT FILE ĐÃ CHẠY sẽ làm checksum lệch và Flyway từ chối khởi động ('Migration checksum mismatch'). Đây là TÍNH NĂNG, không phải lỗi: nó đảm bảo mọi môi trường có cùng lịch sử. Muốn sửa thì tạo file MỚI, tuyệt đối không sửa file cũ. (flyway.repair chỉ dùng khi thật sự cần và phải hiểu rõ hậu quả.)\nbaseline-on-migrate=true dùng khi áp Flyway lên một database ĐÃ CÓ SẴN dữ liệu: đánh dấu trạng thái hiện tại là baseline rồi chỉ chạy các migration mới hơn.\nKHÓA: khi nhiều instance cùng khởi động, Flyway lấy khóa ở tầng database nên chỉ một instance chạy migration, các instance khác chờ — an toàn khi deploy nhiều pod.\nTHỰC HÀNH TỐT: migration phải chạy trong CI trên database sạch (Testcontainers) để phát hiện lỗi trước khi lên production; và mỗi file nên nhỏ, một mục đích.\n\nĐiểm ghi bàn: 'không bao giờ sửa migration đã chạy, luôn tạo file mới' + giải thích checksum là tính năng bảo vệ.",
    "examples": ["src/main/resources/db/migration/\n  V1__create_payment_table.sql\n  V2__add_idempotency_key.sql\n  V3__create_ledger_entry.sql\n  R__payment_summary_view.sql\n\nspring.flyway.enabled: true\nspring.flyway.baseline-on-migrate: true\nspring.jpa.hibernate.ddl-auto: validate   # KHÔNG dùng update ở production"]
   },
   {
    "question": "Vì sao ddl-auto=update là điều cấm ở production?",
    "answer": "Hibernate ddl-auto=update tự suy ra thay đổi schema từ entity. Nghe tiện nhưng cực kỳ nguy hiểm:\n1. KHÔNG XÓA và KHÔNG SỬA được: đổi tên cột thì Hibernate tạo cột MỚI và để lại cột cũ; thu hẹp kiểu dữ liệu thì nó im lặng bỏ qua.\n2. KHÔNG kiểm soát được thứ tự và không có bản ghi lịch sử -> không tái tạo được schema, không rollback được.\n3. KHÔNG di chuyển dữ liệu: thêm cột NOT NULL vào bảng đã có dữ liệu là gãy.\n4. Không review được: thay đổi schema không đi qua pull request như code.\n5. Nhiều instance cùng khởi động có thể tranh nhau sửa schema.\nCẤU HÌNH ĐÚNG: spring.jpa.hibernate.ddl-auto=validate + Flyway/Liquibase. validate sẽ khiến ứng dụng KHÔNG KHỞI ĐỘNG nếu entity và schema lệch nhau — phát hiện sai sót ngay lúc deploy thay vì lúc chạy câu query đầu tiên.\n(ddl-auto=create-drop chỉ dùng cho test; với Testcontainers thì nên chạy chính Flyway để test đúng thứ mà production dùng.)\n\nĐiểm ghi bàn: nêu ví dụ cụ thể 'đổi tên cột sinh ra cột thừa' thay vì chỉ nói chung chung 'không an toàn'.",
    "examples": ["# production\nspring.jpa.hibernate.ddl-auto: validate\nspring.flyway.enabled: true\n\n# test (vẫn nên chạy Flyway để test đúng schema thật)\nspring.jpa.hibernate.ddl-auto: validate\nspring.flyway.enabled: true"]
   },
   {
    "question": "Migration không downtime: expand/contract (parallel change) làm thế nào?",
    "answer": "Vấn đề: khi rolling deploy, trong vài phút có CẢ code cũ VÀ code mới cùng chạy trên CÙNG một database. Nếu migration đổi schema theo kiểu phá vỡ (đổi tên cột, xóa cột, thêm NOT NULL), phiên bản còn lại sẽ gãy ngay.\nNGUYÊN TẮC: mỗi migration phải TƯƠNG THÍCH NGƯỢC với phiên bản code đang chạy.\nMẪU EXPAND / CONTRACT gồm 3 giai đoạn, mỗi giai đoạn là MỘT lần deploy riêng:\n1. EXPAND: thêm cấu trúc mới, KHÔNG đụng cấu trúc cũ. Thêm cột mới cho phép NULL (hoặc có DEFAULT). Code mới ghi vào CẢ hai cột, đọc từ cột cũ.\n2. MIGRATE: backfill dữ liệu từ cột cũ sang cột mới theo lô (tránh khóa bảng lâu). Sau khi backfill xong, chuyển code sang ĐỌC cột mới. Kiểm chứng dữ liệu khớp.\n3. CONTRACT: khi chắc chắn không còn phiên bản nào dùng cột cũ (thường sau vài ngày/một chu kỳ release), mới XÓA cột cũ.\nCÁC THAO TÁC NGUY HIỂM CẦN BIẾT (PostgreSQL):\n- CREATE INDEX khóa bảng ghi -> dùng CREATE INDEX CONCURRENTLY (không chạy được trong transaction, phải đặt riêng và tắt transaction cho migration đó).\n- Thêm cột NOT NULL không DEFAULT trên bảng lớn -> gãy. Cách an toàn: thêm cột NULL -> backfill theo lô -> thêm ràng buộc NOT NULL (Postgres 12+ có thể dùng NOT VALID rồi VALIDATE để tránh khóa dài).\n- Backfill một câu UPDATE trên 50 triệu dòng giữ khóa và thổi WAL -> chia lô và ngủ giữa các lô.\n- Đổi tên cột/bảng là thao tác PHÁ VỠ tương thích -> luôn phải qua expand/contract.\n\nĐiểm ghi bàn: nói được 'trong lúc rolling deploy có hai phiên bản code cùng chạy' — đó là lý do gốc của toàn bộ mẫu này.",
    "examples": ["-- V10 (EXPAND): an toàn, code cũ không bị ảnh hưởng\nALTER TABLE payment ADD COLUMN amount_minor BIGINT;\n\n-- V11 (MIGRATE): backfill theo lô\nUPDATE payment SET amount_minor = (amount * 100)::BIGINT\n WHERE amount_minor IS NULL AND id IN (SELECT id FROM payment\n   WHERE amount_minor IS NULL LIMIT 10000);\n\n-- V12 (CONTRACT): chỉ chạy sau khi chắc không còn code cũ\nALTER TABLE payment DROP COLUMN amount;\n\n-- Index không khóa bảng\nCREATE INDEX CONCURRENTLY idx_payment_created ON payment(created_at);"]
   },
   {
    "question": "Contract testing là gì? Khác integration test và E2E test thế nào?",
    "answer": "VẤN ĐỀ: Payment Service gọi Risk Service. Unit test dùng mock nên luôn xanh, nhưng nếu Risk Service âm thầm đổi tên trường 'score' thành 'riskScore' thì mock vẫn theo hợp đồng CŨ -> test xanh mà production gãy. Contract test sinh ra để bịt đúng khe hở này.\nCONTRACT TEST xác minh rằng hai bên vẫn đồng ý về hợp đồng giao tiếp, mà KHÔNG cần dựng cả hai service cùng lúc:\n- CONSUMER (Payment) mô tả mình mong đợi gì -> sinh ra file hợp đồng (pact).\n- PROVIDER (Risk) chạy test XÁC MINH mình đáp ứng đúng hợp đồng đó. Provider đổi API mà phá hợp đồng thì PIPELINE CỦA PROVIDER ĐỎ ngay, trước khi lên production.\nSO SÁNH:\n- Unit test: nhanh, mock hết, KHÔNG phát hiện lệch hợp đồng.\n- Contract test: nhanh, chạy độc lập từng service, phát hiện lệch hợp đồng — đây là chỗ đứng riêng của nó.\n- Integration test (Testcontainers): dựng DB/Kafka thật, kiểm tra service với hạ tầng thật.\n- E2E test: dựng toàn hệ thống, độ tin cậy cao nhất nhưng CHẬM, GIÒN (hay đỏ vì lý do vớ vẩn), khó bảo trì -> nên rất ít.\nHai công cụ phổ biến: PACT (consumer-driven, có Pact Broker để chia sẻ hợp đồng giữa các đội) và SPRING CLOUD CONTRACT (viết hợp đồng bằng Groovy/YAML, tự sinh test cho provider và stub cho consumer).\nContract test cũng áp dụng được cho MESSAGE (Kafka event), không chỉ REST — rất hợp với kiến trúc hướng sự kiện như PayFlow.\n\nĐiểm ghi bàn: nói rõ 'contract test bắt lỗi mà mock không bao giờ bắt được', và nêu vị trí của nó trong kim tự tháp test.",
    "examples": ["// Consumer (Payment) khai báo mong đợi\n@Pact(consumer = \"payment-service\")\npublic RequestResponsePact riskScorePact(PactDslWithProvider b) {\n  return b.given(\"customer exists\")\n     .uponReceiving(\"a risk check\")\n     .path(\"/risk/check\").method(\"POST\")\n     .willRespondWith().status(200)\n     .body(new PactDslJsonBody().numberType(\"riskScore\", 42))\n     .toPact();\n}\n// -> sinh pact file -> Risk Service chạy provider verification trong CI"]
   },
   {
    "question": "Testcontainers dùng thế nào cho đúng? Vì sao hơn H2?",
    "answer": "Testcontainers khởi động DB/Kafka/Redis THẬT bằng Docker trong lúc chạy test, rồi dọn sạch khi xong.\nVÌ SAO KHÔNG DÙNG H2 làm DB test: H2 không phải PostgreSQL. Những thứ H2 không mô phỏng đúng gồm kiểu JSONB, mảng, SELECT ... FOR UPDATE SKIP LOCKED, hành vi isolation level, cú pháp riêng, và cả các ràng buộc/index đặc thù. Kết quả: test xanh trên H2 nhưng production gãy — mất niềm tin vào bộ test.\nTHỰC HÀNH TỐT:\n1. @ServiceConnection (Spring Boot 3.1+) tự nối container vào cấu hình, không cần @DynamicPropertySource thủ công nữa.\n2. Dùng container TĨNH (static) dùng chung cho nhiều test class để không khởi động lại nhiều lần — đây là yếu tố quyết định tốc độ.\n3. Chạy chính Flyway trong test để xác minh migration đúng, thay vì để Hibernate tự tạo schema.\n4. Ghim phiên bản image trùng với production (postgres:16-alpine), không dùng latest.\n5. Dọn dữ liệu giữa các test (@Sql, TRUNCATE, hoặc @Transactional rollback) thay vì dựng lại container.\n6. Kiểm tra hành vi thật: khóa, transaction, deadlock, unique constraint — những thứ chỉ DB thật mới thể hiện đúng.\nCHI PHÍ phải thừa nhận: cần Docker trong môi trường CI, test chậm hơn unit test vài giây. Vì thế vẫn giữ kim tự tháp: nhiều unit test cho domain (không cần Spring), một lớp integration test có Testcontainers, rất ít E2E.\n\nĐiểm ghi bàn: nêu ví dụ CỤ THỂ về sự khác biệt H2 vs PostgreSQL (FOR UPDATE SKIP LOCKED, JSONB) thay vì chỉ nói 'giống production hơn'.",
    "examples": ["@SpringBootTest\n@Testcontainers\nclass PaymentIT {\n  @Container\n  @ServiceConnection   // Spring Boot 3.1+ tự cấu hình datasource\n  static PostgreSQLContainer<?> db = new PostgreSQLContainer<>(\"postgres:16-alpine\");\n\n  @Container\n  @ServiceConnection\n  static KafkaContainer kafka = new KafkaContainer(\"confluentinc/cp-kafka:7.6.0\");\n}"]
   }
  ]
 },

 {
  "topic": "VNPAY Sandbox (tích hợp cổng thanh toán)",
  "items": [
   {
    "question": "Luồng tích hợp VNPAY gồm những bước nào? Cần những tham số cấu hình gì?",
    "answer": "ĐĂNG KÝ: tạo tài khoản sandbox tại sandbox.vnpayment.vn/devreg/, kích hoạt qua email và nhận 4 thông tin bắt buộc:\n- vnp_TmnCode: mã website (merchant) được khai báo trên hệ thống VNPAY.\n- vnp_HashSecret: chuỗi bí mật dùng để ký/kiểm tra toàn vẹn dữ liệu. TUYỆT ĐỐI không hard-code vào mã nguồn — để trong biến môi trường / secret manager.\n- vnp_Url (sandbox): https://sandbox.vnpayment.vn/paymentv2/vpcpay.html\n- vnp_ReturnUrl: URL công khai của bạn để VNPAY redirect khách quay về.\nLUỒNG THANH TOÁN:\n1. Khách bấm thanh toán -> backend TẠO ĐƠN ở trạng thái PENDING và sinh vnp_TxnRef (mã tham chiếu giao dịch, phải DUY NHẤT).\n2. Backend dựng danh sách tham số vnp_*, ký HmacSHA512, ghép thành URL rồi trả về cho client.\n3. Client chuyển hướng sang trang thanh toán VNPAY.\n4. Khách thanh toán xong, VNPAY gọi về theo HAI đường độc lập:\n   - RETURN URL: redirect trình duyệt -> CHỈ để hiển thị kết quả cho người dùng.\n   - IPN URL: gọi server-to-server -> đây mới là NGUỒN SỰ THẬT để cập nhật đơn hàng.\n5. Backend xác minh chữ ký, đối chiếu đơn, cập nhật trạng thái, phát event nội bộ.\nCÁC THAM SỐ QUAN TRỌNG khi tạo URL: vnp_Version, vnp_Command=pay, vnp_TmnCode, vnp_Amount, vnp_CurrCode=VND, vnp_TxnRef, vnp_OrderInfo, vnp_IpAddr, vnp_CreateDate, vnp_ExpireDate, vnp_ReturnUrl, vnp_Locale.\n\nĐiểm ghi bàn: nói rõ 'return URL để hiển thị, IPN để cập nhật trạng thái' — đây là câu chốt của mọi bài phỏng vấn về tích hợp cổng thanh toán.",
    "examples": ["vnpay:\n  tmn-code: ${VNP_TMN_CODE}\n  hash-secret: ${VNP_HASH_SECRET}      # KHÔNG commit vào git\n  pay-url: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html\n  return-url: https://myapp.com/payment/vnpay-return\n  ipn-url: https://myapp.com/api/payment/vnpay-ipn"]
   },
   {
    "question": "vnp_SecureHash được tạo như thế nào? Vì sao rất hay bị sai chữ ký?",
    "answer": "QUY TRÌNH KÝ (thuật toán HmacSHA512, dùng chung cho mọi ngôn ngữ):\n1. Đưa TẤT CẢ tham số vnp_* vào map SẮP XẾP theo thứ tự alphabet của key (Java dùng TreeMap, hoặc sort danh sách key). BỎ QUA các tham số null/rỗng.\n2. Dựng SONG SONG hai chuỗi:\n   - hashData: key=URLEncoder.encode(value, US_ASCII), nối bằng '&' — dùng để KÝ.\n   - query: encode(key)=encode(value), nối bằng '&' — dùng để GHÉP VÀO URL.\n3. Ký: vnp_SecureHash = hmacSHA512(vnp_HashSecret, hashData), kết quả là chuỗi HEX.\n4. Ghép vào URL: vnp_Url + \"?\" + query + \"&vnp_SecureHash=\" + hash.\nBA NGUYÊN NHÂN SAI CHỮ KÝ (mã lỗi 70/71) hay gặp nhất:\n1. QUÊN SẮP XẾP alphabet -> hash khác hoàn toàn.\n2. ENCODE KHÔNG ĐỒNG NHẤT giữa hashData và query — phải encode GIÁ TRỊ cả trong hashData chứ không chỉ trong query. Đây là lỗi số một.\n3. Không loại bỏ tham số rỗng, hoặc encode sai charset (phải nhất quán, thường US_ASCII cho encode và UTF-8 cho HMAC).\nBẪY KHÁC: vnp_Amount phải NHÂN 100 (VNPAY không dùng phần thập phân) — 100.000 VND phải gửi là 10000000. Quên nhân 100 là thu thiếu 100 lần.\nvnp_TxnRef phải duy nhất — trùng mã sẽ bị VNPAY từ chối; nhiều hệ thống ghép orderId + timestamp để tránh trùng khi khách thanh toán lại đơn cũ.\n\nĐiểm ghi bàn: chỉ đúng nguyên nhân 'encode không đồng nhất giữa chuỗi ký và chuỗi query' — người từng debug thật mới nói được.",
    "examples": ["public static String hmacSHA512(String key, String data) {\n    Mac hmac = Mac.getInstance(\"HmacSHA512\");\n    hmac.init(new SecretKeySpec(key.getBytes(UTF_8), \"HmacSHA512\"));\n    byte[] r = hmac.doFinal(data.getBytes(UTF_8));\n    StringBuilder sb = new StringBuilder(2 * r.length);\n    for (byte b : r) sb.append(String.format(\"%02x\", b & 0xff));\n    return sb.toString();\n}\n\n// Amount PHẢI nhân 100\nparams.put(\"vnp_Amount\", String.valueOf(amount.multiply(BigDecimal.valueOf(100)).longValue()));"]
   },
   {
    "question": "Xác minh chữ ký khi VNPAY gọi về (Return URL / IPN) làm thế nào?",
    "answer": "Thứ tự BẮT BUỘC — xác minh chữ ký TRƯỚC KHI tin bất cứ trường nào trong dữ liệu:\n1. Thu thập tất cả tham số bắt đầu bằng 'vnp_'.\n2. LẤY RA và LOẠI BỎ hai tham số vnp_SecureHash và vnp_SecureHashType khỏi map (quên bước này thì hash không bao giờ khớp).\n3. Sắp xếp lại theo alphabet, dựng lại hashData đúng cách encode như lúc gửi đi.\n4. Tính lại HmacSHA512 bằng vnp_HashSecret và SO SÁNH với vnp_SecureHash nhận được — nên dùng so sánh thời gian hằng định (MessageDigest.isEqual) như mọi phép so chữ ký khác.\n5. CHỈ KHI chữ ký hợp lệ mới đọc tiếp vnp_ResponseCode / vnp_TransactionStatus.\nHAI TRƯỜNG TRẠNG THÁI cần kiểm tra CẢ HAI:\n- vnp_ResponseCode = \"00\": kết quả của yêu cầu thanh toán.\n- vnp_TransactionStatus = \"00\": trạng thái giao dịch tại cổng VNPAY, đây mới là trạng thái có thẩm quyền phía cổng.\nChỉ khi cả hai đều bằng \"00\" mới coi là thanh toán thành công.\nvnp_Amount nhận về đã nhân 100 -> phải CHIA 100 rồi mới so với số tiền đơn hàng trong DB của mình.\nKHÔNG dùng vnp_ResponseCode từ Return URL để cập nhật đơn — tham số trên URL trình duyệt có thể bị sửa tùy ý.\n\nĐiểm ghi bàn: nhớ bước 'loại bỏ vnp_SecureHash và vnp_SecureHashType trước khi tính lại' và 'kiểm tra CẢ vnp_ResponseCode lẫn vnp_TransactionStatus'.",
    "examples": ["Map<String,String> fields = new TreeMap<>();\nreq.getParameterMap().forEach((k,v) -> { if (k.startsWith(\"vnp_\")) fields.put(k, v[0]); });\n\nString received = fields.remove(\"vnp_SecureHash\");\nfields.remove(\"vnp_SecureHashType\");          // BẮT BUỘC bỏ cả hai\n\nString expected = hmacSHA512(hashSecret, buildHashData(fields));\nif (!MessageDigest.isEqual(expected.getBytes(UTF_8), received.getBytes(UTF_8)))\n    return Map.of(\"RspCode\", \"97\", \"Message\", \"Invalid Checksum\");"]
   },
   {
    "question": "Xử lý IPN đúng chuẩn: các bước kiểm tra và mã RspCode trả về?",
    "answer": "VNPAY yêu cầu endpoint IPN trả về JSON gồm RspCode và Message. MÃ TRẢ VỀ QUYẾT ĐỊNH VNPAY CÓ GỌI LẠI HAY KHÔNG — đây là phần quan trọng nhất và hay bị làm sai.\nTHỨ TỰ KIỂM TRA (lồng nhau, dừng ngay khi sai):\n1. Xác minh chữ ký -> sai thì trả 97 (Invalid Checksum).\n2. Tìm đơn theo vnp_TxnRef -> không thấy thì trả 01 (Order not found).\n3. So sánh số tiền: vnp_Amount / 100 phải khớp đơn -> lệch thì trả 04 (Invalid amount).\n4. Kiểm tra đơn còn đang PENDING -> nếu đã xử lý rồi thì trả 02 (Order already confirmed) và KHÔNG xử lý lại.\n5. Nếu vnp_ResponseCode và vnp_TransactionStatus đều \"00\" -> cập nhật SUCCESS; ngược lại -> FAILED.\n6. Trả 00 (Confirm Success).\n7. Bọc try/catch, mọi ngoại lệ không lường trước -> trả 99 (Unknown error).\nHÀNH VI RETRY (chi tiết cực kỳ thực tế): trả 00 thì VNPAY KẾT THÚC luồng; trả 01, 04, 97, 99 hoặc để IPN TIMEOUT thì VNPAY sẽ GỌI LẠI — tối đa 10 lần trong 5 phút.\nHAI HỆ QUẢ:\n- Vì có retry nên IPN có thể bị gọi TRÙNG -> bước 4 (kiểm tra đơn còn PENDING) chính là thứ làm handler trở nên idempotent. Nên có thêm bảng lưu vnp_TransactionNo/vnp_TxnRef đã xử lý làm lớp chống trùng thứ hai.\n- Nếu đơn thật sự không tồn tại hoặc số tiền sai vĩnh viễn, VNPAY vẫn gọi lại suốt 5 phút -> cần cảnh báo và log để điều tra, đừng để lỗi này trôi im lặng.\nVIỆC CẬP NHẬT TRẠNG THÁI PHẢI NẰM Ở IPN, KHÔNG NẰM Ở RETURN URL.\n\nĐiểm ghi bàn: nêu đúng bảng RspCode và nói được 'mã trả về quyết định VNPAY có retry hay không'.",
    "examples": ["// Bảng RspCode\n\"00\" -> Confirm Success        (VNPAY dừng, không gọi lại)\n\"01\" -> Order not found        (VNPAY gọi lại)\n\"02\" -> Order already confirmed\n\"04\" -> Invalid amount         (VNPAY gọi lại)\n\"97\" -> Invalid Checksum       (VNPAY gọi lại)\n\"99\" -> Unknown error          (VNPAY gọi lại)\n// Retry tối đa 10 lần trong 5 phút"]
   },
   {
    "question": "Các lỗi thực tế khi deploy VNPAY lên production và cách xử lý?",
    "answer": "LỖI code=15 / sai IP: chạy tốt ở localhost nhưng lên server (EC2, sau Nginx) thì luôn lỗi. Nguyên nhân thường ở hai tham số:\n- vnp_IpAddr: khi đi qua proxy/load balancer, request.getRemoteAddr() trả về IP của proxy chứ không phải của khách. Phải đọc header X-Forwarded-For (lấy IP đầu tiên) và đảm bảo là IPv4 hợp lệ.\n- vnp_ReturnUrl: phải là URL CÔNG KHAI truy cập được từ ngoài, không phải localhost.\nIPN KHÔNG NHẬN ĐƯỢC: IPN là lời gọi server-to-server từ VNPAY vào hệ thống bạn -> endpoint phải công khai, không bị chặn firewall, KHÔNG yêu cầu xác thực JWT (VNPAY không có token của bạn). Bảo mật của IPN đến từ CHỮ KÝ, không phải từ auth. Nhớ mở đường cho endpoint này trong Spring Security (permitAll) và thêm vào danh sách bỏ qua CSRF.\nMÔI TRƯỜNG LOCAL: dùng ngrok/cloudflared để phơi endpoint IPN ra internet mới test được.\nSAI LỆCH MÚI GIỜ: vnp_CreateDate và vnp_ExpireDate theo định dạng yyyyMMddHHmmss và theo giờ Việt Nam (GMT+7). Server chạy UTC mà quên đổi múi giờ sẽ khiến giao dịch hết hạn ngay lập tức.\nĐƠN TREO Ở PENDING: khách đóng trình duyệt và IPN vì lý do nào đó không tới -> phải có JOB ĐỐI SOÁT định kỳ gọi API truy vấn giao dịch (querydr) của VNPAY cho các đơn PENDING quá N phút. Đây chính là nguyên tắc 'webhook cho tốc độ, đối soát cho sự đảm bảo'.\nMÔI TRƯỜNG SANDBOX dùng thẻ test do VNPAY cung cấp (NCB), không dùng thẻ thật; TmnCode/HashSecret của sandbox và production là KHÁC NHAU nên phải tách theo profile.\n\nĐiểm ghi bàn: nói về X-Forwarded-For, permitAll cho endpoint IPN, và job đối soát cho đơn treo.",
    "examples": ["// Lấy IP thật khi đứng sau proxy\nString ip = req.getHeader(\"X-Forwarded-For\");\nip = (ip != null && !ip.isBlank()) ? ip.split(\",\")[0].trim() : req.getRemoteAddr();\n\n// Spring Security: IPN không có JWT, bảo mật bằng chữ ký\nhttp.authorizeHttpRequests(a -> a\n     .requestMatchers(\"/api/payment/vnpay-ipn\").permitAll())\n    .csrf(c -> c.ignoringRequestMatchers(\"/api/payment/vnpay-ipn\"));\n\n// Thời gian theo GMT+7\nZonedDateTime.now(ZoneId.of(\"Asia/Ho_Chi_Minh\"))\n    .format(DateTimeFormatter.ofPattern(\"yyyyMMddHHmmss\"));"]
   },
   {
    "question": "Thiết kế lớp tích hợp VNPAY sao cho dễ thay thế và dễ test?",
    "answer": "Tuyệt đối KHÔNG rải logic VNPAY khắp service nghiệp vụ. Dùng Ports & Adapters:\n- Domain định nghĩa PaymentProviderPort với các thao tác trung lập: createPaymentUrl(), verifyCallback(), queryTransaction().\n- VnpayAdapter cài đặt port đó; sau này thêm MomoAdapter, ZaloPayAdapter mà domain không đổi một dòng. Chọn adapter theo enum PaymentMethod (mẫu Strategy) hoặc theo Map<PaymentMethod, PaymentProviderPort> do Spring tự tiêm.\n- Toàn bộ mã lỗi và tên trường riêng của VNPAY (vnp_ResponseCode, RspCode...) được DỊCH sang model nội bộ ngay tại adapter — đây là anti-corruption layer, không cho mô hình của bên ngoài rò rỉ vào domain.\nTEST:\n- Test hàm ký/xác minh chữ ký bằng unit test thuần: cho một bộ tham số cố định và một secret cố định, khẳng định hash ra đúng chuỗi kỳ vọng. Đây là phần dễ sai nhất nên phải có test.\n- Test endpoint IPN bằng MockMvc với payload mẫu đã ký sẵn, kiểm tra đủ các nhánh RspCode 00/01/02/04/97.\n- Test tính idempotent: gọi IPN HAI LẦN với cùng dữ liệu, khẳng định đơn chỉ được cập nhật một lần và lần hai trả 02.\n- Dùng WireMock để giả lập API querydr khi test job đối soát.\nQUAN SÁT: log đầy đủ vnp_TxnRef + vnp_TransactionNo + correlationId cho mọi lời gọi (nhưng KHÔNG log vnp_HashSecret và không log toàn bộ dữ liệu thẻ); đếm metric theo mã lỗi để phát hiện sớm khi cổng có sự cố.\n\nĐiểm ghi bàn: 'unit test cho hàm ký' và 'test gọi IPN hai lần' — hai thứ chứng minh bạn hiểu rủi ro thật của tích hợp này.",
    "examples": ["public interface PaymentProviderPort {\n    String createPaymentUrl(PaymentCommand cmd);\n    CallbackResult verifyCallback(Map<String,String> params);\n    ProviderTxnStatus query(String txnRef);\n}\n\n@Component(\"VNPAY\")\nclass VnpayAdapter implements PaymentProviderPort { ... }\n\n// Spring tiêm sẵn theo tên bean -> chọn adapter theo enum\nprivate final Map<String, PaymentProviderPort> providers;\nproviders.get(order.getMethod().name()).createPaymentUrl(cmd);"]
   }
  ]
 },

 {
  "topic": "Spring Mail & Notification Service",
  "items": [
   {
    "question": "Gửi email trong Spring Boot: JavaMailSender và MimeMessageHelper dùng thế nào?",
    "answer": "Thêm spring-boot-starter-mail, Spring Boot sẽ tự cấu hình bean JavaMailSender từ các thuộc tính spring.mail.*.\nHAI CÁCH GỬI:\n- SimpleMailMessage: chỉ text thuần, không đính kèm, không HTML. Hiếm dùng thực tế.\n- MimeMessage + MimeMessageHelper: HTML, đính kèm, ảnh nhúng, nhiều người nhận. Đây là cách dùng chuẩn.\nCÁC BẪY CỦA MimeMessageHelper:\n1. helper.setText(html, TRUE) — tham số boolean thứ hai bật kiểu HTML. QUÊN nó thì người nhận thấy nguyên mã HTML dạng chữ.\n2. Luôn chỉ định CHARSET: new MimeMessageHelper(message, true, \"UTF-8\"). Không đặt thì tiếng Việt có dấu bị vỡ — lỗi kinh điển.\n3. Tham số boolean thứ nhất là multipart: phải bật true nếu có đính kèm hoặc ảnh nhúng. Khi có cả hai thì dùng MULTIPART_MODE_MIXED_RELATED cho an toàn.\n4. addAttachment() gắn tệp đính kèm; addInline(cid, resource) nhúng ảnh vào thân thư và tham chiếu bằng cú pháp cid: trong HTML.\nNÊN GỬI CẢ HAI PHẦN text-only và HTML (multipart/alternative) để phòng trường hợp trình đọc thư không hỗ trợ HTML.\nCẤU HÌNH SMTP: bắt buộc bật STARTTLS; mật khẩu SMTP để trong biến môi trường / Vault, không bao giờ commit vào git. Với Gmail phải dùng App Password chứ không dùng mật khẩu tài khoản.\n\nĐiểm ghi bàn: nêu hai bẫy setText(html, true) và charset UTF-8 — chứng tỏ đã thực sự gửi mail tiếng Việt trong production.",
    "examples": ["spring:\n  mail:\n    host: smtp.gmail.com\n    port: 587\n    username: ${MAIL_USERNAME}\n    password: ${MAIL_PASSWORD}      # App Password, KHÔNG commit\n    properties:\n      mail.smtp.auth: true\n      mail.smtp.starttls.enable: true\n      mail.smtp.connectiontimeout: 5000\n      mail.smtp.timeout: 5000\n      mail.smtp.writetimeout: 5000\n\nMimeMessage msg = mailSender.createMimeMessage();\nvar helper = new MimeMessageHelper(msg, MULTIPART_MODE_MIXED_RELATED, \"UTF-8\");\nhelper.setTo(to); helper.setSubject(subject);\nhelper.setText(html, true);          // true = HTML\nmailSender.send(msg);"]
   },
   {
    "question": "Dùng Thymeleaf làm template email như thế nào? Khác template web ra sao?",
    "answer": "Không nối chuỗi HTML trong Java — vừa khó bảo trì vừa dễ dính lỗi XSS. Dùng template engine để tách nội dung khỏi mã.\nCẤU HÌNH RIÊNG cho email: template email nằm trong classpath chứ không đi qua tầng web, nên khai báo một ClassLoaderTemplateResolver riêng (prefix 'templates/email/', suffix '.html', mode HTML). Bật cache ở production, tắt ở dev để sửa template không cần khởi động lại.\nCÁCH DÙNG: tạo Context, đặt biến, gọi templateEngine.process(\"email/payment-success\", context) để render ra chuỗi HTML rồi đưa cho MimeMessageHelper.\nƯU ĐIỂM của Thymeleaf cho email:\n- Hỗ trợ i18n gắn liền với cơ chế MessageSource của Spring -> gửi email đa ngôn ngữ dễ dàng.\n- Natural templating: template mở bằng trình duyệt vẫn xem được, designer sửa được.\n- KHÔNG phụ thuộc Servlet API -> dùng được trong service worker/batch không phải web app (đúng với Notification Service tách riêng).\nKHÁC BIỆT QUAN TRỌNG so với template web: HTML trong email cực kỳ hạn chế. Nhiều trình đọc thư (đặc biệt Outlook) không hỗ trợ CSS ngoài, flexbox, grid.\n-> Phải INLINE CSS (dùng công cụ như Premailer), dùng bố cục bảng (table) kiểu cũ, tránh JavaScript (luôn bị chặn), và ảnh phải có thuộc tính alt vì nhiều client chặn ảnh mặc định.\nQUAN TRỌNG VỀ ASYNC: RENDER template TRƯỚC khi đẩy sang luồng nền, và chỉ truyền DTO bất biến — đừng truyền entity JPA hay đối tượng thuộc phạm vi request qua ranh giới luồng (lazy loading sẽ nổ LazyInitializationException).\n\nĐiểm ghi bàn: nêu 'inline CSS và bố cục bảng vì Outlook' và 'render trước khi async, chỉ truyền DTO'.",
    "examples": ["@Bean\npublic SpringTemplateEngine emailTemplateEngine() {\n    var resolver = new ClassLoaderTemplateResolver();\n    resolver.setPrefix(\"templates/email/\");\n    resolver.setSuffix(\".html\");\n    resolver.setTemplateMode(TemplateMode.HTML);\n    resolver.setCharacterEncoding(\"UTF-8\");\n    resolver.setCacheable(true);          // production\n    var engine = new SpringTemplateEngine();\n    engine.setTemplateResolver(resolver);\n    return engine;\n}\n\nContext ctx = new Context(Locale.of(\"vi\"));\nctx.setVariable(\"amount\", dto.amount());\nString html = engine.process(\"payment-success\", ctx);"]
   },
   {
    "question": "Vì sao KHÔNG được gửi email đồng bộ trong luồng nghiệp vụ?",
    "answer": "SMTP là lời gọi mạng ra ngoài, có thể mất vài giây hoặc treo. Gửi email ngay trong luồng xử lý thanh toán gây ba hậu quả:\n1. Người dùng phải chờ thêm vài giây cho một việc chẳng liên quan gì tới kết quả thanh toán.\n2. Máy chủ mail chậm -> luồng bị giữ -> cạn thread pool -> API thanh toán chết theo (cascading failure).\n3. TỆ NHẤT: nếu gửi mail nằm trong @Transactional và mail lỗi ném exception -> TOÀN BỘ TRANSACTION BỊ ROLLBACK -> giao dịch thanh toán ĐÃ THÀNH CÔNG bị hủy chỉ vì không gửi được email. Đây là lỗi thiết kế nghiêm trọng và là câu hỏi phỏng vấn rất hay gặp.\nNGUYÊN TẮC: gửi thông báo là việc PHỤ, không bao giờ được làm hỏng việc CHÍNH.\nGIẢI PHÁP @Async (mức tối thiểu):\n- Bật @EnableAsync, đánh @Async lên phương thức gửi.\n- KHÔNG dùng executor mặc định (SimpleAsyncTaskExecutor tạo luồng mới cho mỗi lần gọi) — định nghĩa ThreadPoolTaskExecutor CÓ GIỚI HẠN để sự cố mail không làm nổ số luồng.\n- @Async chỉ hoạt động qua proxy: gọi this.sendEmail(...) TRONG CÙNG một bean sẽ không chạy bất đồng bộ. Phải gọi từ bean khác.\n- Phương thức trả void thì exception biến mất im lặng -> trả CompletableFuture hoặc đăng ký AsyncUncaughtExceptionHandler, và log trong chính phương thức.\nHẠN CHẾ CỦA @Async phải nói ra: hàng đợi nằm TRONG BỘ NHỚ, service restart là MẤT toàn bộ email đang chờ. Muốn bền vững phải dùng outbox/queue (mục sau).\n\nĐiểm ghi bàn: nêu tình huống 'mail lỗi làm rollback transaction thanh toán' — ví dụ này gây ấn tượng rất mạnh.",
    "examples": ["@Bean(\"mailExecutor\")\npublic Executor mailExecutor() {\n    var ex = new ThreadPoolTaskExecutor();\n    ex.setCorePoolSize(2);\n    ex.setMaxPoolSize(5);\n    ex.setQueueCapacity(500);\n    ex.setThreadNamePrefix(\"mail-\");\n    ex.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());\n    return ex;\n}\n\n@Async(\"mailExecutor\")\npublic CompletableFuture<Void> send(EmailDto dto) { ... }"]
   },
   {
    "question": "Thiết kế Notification Service bền vững: outbox, retry, DLQ, idempotency?",
    "answer": "@Async là chưa đủ cho hệ thống tiền. Kiến trúc bền vững:\n1. GHI Ý ĐỊNH GỬI vào bảng (outbox) trong CÙNG transaction nghiệp vụ — hoặc để Notification Service consume event payment.succeeded từ Kafka. Nhờ vậy nhà cung cấp mail chết cũng không làm hỏng giao dịch, chỉ là gửi muộn hơn.\n2. WORKER đọc bản ghi chưa gửi và gửi đi; nhiều instance thì dùng SELECT ... FOR UPDATE SKIP LOCKED hoặc ShedLock để chỉ một instance xử lý mỗi bản ghi.\n3. RETRY chỉ cho lỗi TẠM THỜI (SMTP timeout, 4xx tạm thời, 429) với exponential backoff + jitter; lỗi VĨNH VIỄN (địa chỉ không tồn tại, sai định dạng) thì KHÔNG retry mà đưa thẳng vào DLQ.\n4. IDEMPOTENCY: khóa tự nhiên nên là (userId + eventType + eventId) hoặc chính event_id — chống gửi hai lần khi worker chết giữa chừng hoặc Kafka giao lại message. Nếu nhà cung cấp hỗ trợ idempotency key thì truyền luôn khóa đó xuống.\n5. GHI LẠI KẾT QUẢ: lưu message-id do nhà cung cấp trả về, số lần thử, lỗi cuối cùng — để tra cứu khi khách khiếu nại 'tôi không nhận được email'.\n6. DLQ + cảnh báo, xem lại và phát lại sau khi sửa lỗi.\nLƯU Ý VỀ 'GỬI HAI LẦN': email trùng gây phiền nhưng không phá dữ liệu, nên trong nhiều hệ thống at-least-once là chấp nhận được. Nhưng với email chứa mã OTP hoặc liên kết một-lần thì gửi trùng có thể vô hiệu hóa mã trước đó -> phải idempotent thật sự.\nĐA KÊNH (email/SMS/Zalo/webhook): trừu tượng hóa qua NotificationChannel port, mỗi kênh một adapter, và cho phép cấu hình dự phòng (email lỗi thì thử SMS) tùy mức độ quan trọng của thông báo.\n\nĐiểm ghi bàn: nói được vì sao chỉ @Async là chưa đủ (mất dữ liệu khi restart) và đề xuất outbox + SKIP LOCKED.",
    "examples": ["CREATE TABLE notification_outbox (\n  id          UUID PRIMARY KEY,\n  event_id    UUID NOT NULL,\n  channel     VARCHAR(20) NOT NULL,        -- EMAIL | SMS | ZALO | WEBHOOK\n  recipient   VARCHAR(255) NOT NULL,\n  payload     JSONB NOT NULL,\n  status      VARCHAR(20) NOT NULL,        -- PENDING|SENT|FAILED|DEAD\n  attempts    INT NOT NULL DEFAULT 0,\n  next_retry_at TIMESTAMPTZ,\n  provider_message_id VARCHAR(120),\n  UNIQUE (event_id, channel, recipient)    -- chống gửi trùng\n);\n\n-- Nhiều worker không giẫm chân nhau\nSELECT * FROM notification_outbox\n WHERE status='PENDING' AND next_retry_at <= now()\n ORDER BY next_retry_at LIMIT 100\n FOR UPDATE SKIP LOCKED;"]
   },
   {
    "question": "Email vào Spam: SPF, DKIM, DMARC là gì và cấu hình thế nào?",
    "answer": "Ba bản ghi DNS xác thực người gửi. Thiếu chúng thì Gmail/Outlook thẳng tay đẩy vào Spam hoặc từ chối — từ 2024 Gmail và Yahoo áp dụng quy định này cho cả email giao dịch.\nSPF (Sender Policy Framework): bản ghi TXT liệt kê những máy chủ ĐƯỢC PHÉP gửi thư thay mặt tên miền của bạn. Giới hạn cứng: không quá 10 lần tra cứu DNS -> chỉ thêm include: thật sự cần, giữ bản ghi gọn.\nDKIM (DomainKeys Identified Mail): ký số từng email bằng khóa riêng; bên nhận lấy khóa công khai từ DNS để xác minh nội dung không bị sửa. Dùng khóa 2048-bit, xoay khóa định kỳ (khuyến nghị 6 tháng), và ký MỌI luồng gửi ra.\nDMARC: nói cho bên nhận biết phải làm gì khi SPF/DKIM thất bại, đồng thời gửi báo cáo về cho bạn.\nKHÁI NIỆM HAY BỊ NHẦM NHẤT — ALIGNMENT (căn khớp): không chỉ cần SPF/DKIM PASS, mà tên miền dùng để xác thực phải KHỚP với tên miền trong header From mà người dùng nhìn thấy. SPF pass với một tên miền khác thì DMARC vẫn FAIL.\nLỘ TRÌNH TRIỂN KHAI AN TOÀN: bắt đầu p=none kèm rua để thu báo cáo -> phân tích, sửa các luồng gửi chưa căn khớp -> nâng lên p=quarantine -> chỉ khi mọi luồng hợp lệ đều pass mới lên p=reject. Nhảy thẳng lên reject là cách nhanh nhất để chặn nhầm email thật của chính mình.\nTHỰC HÀNH TỐT KHÁC: tách email GIAO DỊCH sang tên miền phụ riêng (vd mail.payflow.vn) để danh tiếng không bị ảnh hưởng bởi email quảng cáo; dùng nhà cung cấp chuyên dụng (SES, SendGrid, Mailgun) thay vì tự dựng SMTP; theo dõi webhook bounce/complaint và đưa địa chỉ hỏng vào danh sách chặn.\nGHI NHỚ: SMTP trả '250 OK' KHÔNG có nghĩa là thư vào được hộp thư đến.\n\nĐiểm ghi bàn: giải thích được ALIGNMENT và lộ trình none -> quarantine -> reject.",
    "examples": ["; SPF\npayflow.vn.  TXT  \"v=spf1 include:amazonses.com -all\"\n\n; DMARC - bắt đầu ở mức quan sát\n_dmarc.payflow.vn.  TXT  \"v=DMARC1; p=none; rua=mailto:dmarc@payflow.vn; adkim=s; aspf=s\"\n\n; sau khi báo cáo sạch\n\"v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@payflow.vn\"\n\"v=DMARC1; p=reject; rua=mailto:dmarc@payflow.vn\""]
   },
   {
    "question": "Test và quan sát chức năng gửi email như thế nào?",
    "answer": "TEST:\n- GreenMail hoặc Testcontainers + MailHog/Mailpit: dựng máy chủ SMTP giả trong test, gửi thật rồi ĐỌC LẠI thư nhận được để khẳng định người nhận, tiêu đề, nội dung. Dùng Jsoup phân tích HTML để kiểm tra đúng số tiền/mã đơn xuất hiện trong thư.\n- Test riêng phần RENDER template (chỉ gọi templateEngine.process rồi so chuỗi) — nhanh, không cần SMTP, bắt được lỗi thiếu biến.\n- Test tính idempotent: xử lý cùng một event hai lần, khẳng định chỉ có MỘT email được gửi.\n- Ở môi trường staging: bật chế độ chặn — chuyển hướng toàn bộ email tới một hộp thư nội bộ để không bao giờ lỡ gửi cho khách thật. Đây là biện pháp bảo vệ bắt buộc.\nQUAN SÁT (metric nên có):\n- notification_sent_total, notification_failed_total (gắn nhãn theo channel và loại lỗi).\n- notification_outbox_pending — hàng đợi ứ đọng là dấu hiệu nhà cung cấp đang trục trặc.\n- notification_latency — thời gian từ lúc phát sinh event tới lúc gửi xong.\n- Tỷ lệ bounce và complaint từ webhook của nhà cung cấp; tỷ lệ complaint cao sẽ hủy hoại danh tiếng tên miền.\nLOG: luôn kèm correlationId/eventId để nối được với giao dịch gốc. TUYỆT ĐỐI KHÔNG log toàn bộ nội dung email, mã OTP, liên kết đặt lại mật khẩu hay dữ liệu cá nhân — che bớt địa chỉ email khi log (vd a***@gmail.com) để tuân thủ quy định về dữ liệu cá nhân.\nCẤU HÌNH TIMEOUT SMTP (connection/read/write) là bắt buộc — mặc định của JavaMail là chờ VÔ HẠN, đủ để treo cả pool gửi mail.\n\nĐiểm ghi bàn: nêu 'chặn email ở staging' và 'không log OTP/liên kết đặt lại mật khẩu' — hai điểm về vận hành và tuân thủ ít người nghĩ tới.",
    "examples": ["@Test\nvoid guiEmailThanhCong() throws Exception {\n    service.send(new EmailDto(\"a@b.com\", \"Thanh toán thành công\", 500000));\n\n    MimeMessage[] received = greenMail.getReceivedMessages();\n    assertThat(received).hasSize(1);\n    assertThat(received[0].getAllRecipients()[0].toString()).isEqualTo(\"a@b.com\");\n    String html = GreenMailUtil.getBody(received[0]);\n    assertThat(Jsoup.parse(html).text()).contains(\"500.000\");\n}\n\n# staging: chặn gửi ra ngoài\napp.mail.override-recipient: qa-inbox@payflow.vn"]
   }
  ]
 }
];
