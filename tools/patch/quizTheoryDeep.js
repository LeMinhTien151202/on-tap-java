// Quiz bám sát 6 pill lý thuyết mới: Collections chuyên sâu, Java Core chuyên sâu,
// JDBC & Connection Pool, Hibernate luồng hoạt động, Spring Data JPA chuyên sâu, Java hiện đại.
// Phương án sai được viết dài tương đương phương án đúng để không đoán được theo độ dài.
// Dùng: node tools/quiz_append.js tools/patch/quizTheoryDeep.js

const C = "Collections chuyên sâu";
const J = "Java Core chuyên sâu";
const D = "JDBC & Connection Pool";
const H = "Hibernate luồng hoạt động";
const S = "Spring Data JPA chuyên sâu";
const M = "Java hiện đại 8 → 21";

module.exports = [

// ===== Collections chuyên sâu =====
{topic: C, question: "ArrayList hết chỗ thì tăng dung lượng theo công thức nào (Java 8+)?",
 options: [
  "newCapacity = oldCapacity + (oldCapacity >> 1), tức tăng khoảng 1.5 lần dung lượng cũ",
  "newCapacity = oldCapacity * 2, tức nhân đôi dung lượng cũ giống HashMap khi rehash",
  "newCapacity = oldCapacity + 10, tăng cố định thêm đúng 10 phần tử mỗi lần mở rộng",
  "newCapacity = oldCapacity * 2 + 1, công thức kế thừa từ lớp Vector của Java 1.0"],
 correct: 0,
 explain: "grow() dùng oldCapacity + (oldCapacity >> 1) ≈ 1.5x. Mỗi lần tăng phải cấp mảng mới và Arrays.copyOf toàn bộ — biết trước kích thước thì truyền vào constructor để tránh hàng loạt lần sao chép. Vector mới là lớp nhân đôi dung lượng."},

{topic: C, question: "List<Integer> list = new ArrayList<>(List.of(10, 20, 30)); list.remove(1); — kết quả là gì?",
 options: [
  "Xóa phần tử ở CHỈ SỐ 1 (giá trị 20) vì remove(int) khớp trước, còn lại [10, 30]",
  "Xóa phần tử có GIÁ TRỊ 1; không có nên danh sách giữ nguyên [10, 20, 30] và trả false",
  "Ném IndexOutOfBoundsException vì trình biên dịch chọn nhầm phiên bản remove(Object)",
  "Ném lỗi biên dịch vì lời gọi nhập nhằng giữa remove(int) và remove(Object) của List"],
 correct: 0,
 explain: "Bẫy kinh điển: List có cả remove(int index) và remove(Object o). Với literal int, Java chọn remove(int) trước khi nghĩ tới autoboxing. Muốn xóa theo giá trị phải viết list.remove(Integer.valueOf(1))."},

{topic: C, question: "Vì sao xóa phần tử ÁP CHÓT trong vòng for-each lại KHÔNG ném ConcurrentModificationException?",
 options: [
  "Vì sau khi xóa, cursor bằng size nên hasNext() trả false và vòng lặp thoát trước khi next() kịp kiểm tra modCount",
  "Vì Itr có xử lý riêng cho phần tử áp chót, tự đồng bộ lại modCount rồi cho phép vòng lặp chạy tiếp bình thường",
  "Vì ArrayList chỉ kiểm tra modCount khi kích thước danh sách giảm quá một nửa so với lúc tạo iterator",
  "Vì remove() trên phần tử áp chót được coi là thao tác an toàn nên nó không hề tăng biến đếm modCount"],
 correct: 0,
 explain: "checkForComodification() nằm trong next(), còn hasNext() chỉ so cursor != size. Xóa áp chót làm size giảm đúng bằng cursor -> hasNext() false -> thoát êm, bỏ sót phần tử cuối. Đây là lỗi im lặng, nguy hiểm hơn cả CME."},

{topic: C, question: "Arrays.asList(\"a\", \"b\", \"c\") trả về danh sách có tính chất gì?",
 options: [
  "Danh sách cố định kích thước, set() được nhưng add()/remove() ném UnsupportedOperationException",
  "Danh sách bất biến hoàn toàn, mọi thao tác thay đổi kể cả set() đều ném UnsupportedOperationException",
  "Một ArrayList bình thường có thể thêm, xóa, sửa tự do vì nó sao chép dữ liệu từ mảng đầu vào",
  "Danh sách chỉ đọc được đồng bộ hóa, an toàn đa luồng nhưng không cho phép chứa phần tử null"],
 correct: 0,
 explain: "Arrays.asList trả về java.util.Arrays$ArrayList — một khung nhìn (view) trên mảng gốc: set() được (và ghi ngược vào mảng), nhưng add/remove thì không. List.of() mới là bất biến thật và cấm cả null."},

{topic: C, question: "HashMap chuyển một bucket từ danh sách liên kết sang cây đỏ-đen khi nào?",
 options: [
  "Khi bucket có ≥ 8 phần tử VÀ tổng dung lượng bảng ≥ 64; chưa đủ 64 thì nó chỉ resize",
  "Ngay khi bucket đạt 8 phần tử, không phụ thuộc vào dung lượng hiện tại của toàn bảng băm",
  "Khi số phần tử toàn bảng vượt quá ngưỡng load factor 0.75 nhân với dung lượng hiện tại",
  "Khi bucket có ≥ 8 phần tử và các khóa trong bucket đó đều cài đặt giao diện Comparable"],
 correct: 0,
 explain: "TREEIFY_THRESHOLD = 8 nhưng còn điều kiện MIN_TREEIFY_CAPACITY = 64. Bảng nhỏ mà bucket dài thường là do bảng chật, nên resize rẻ hơn treeify. Cây giúp tra cứu xấu nhất từ O(n) về O(log n) — lá chắn trước tấn công va chạm băm."},

{topic: C, question: "Muốn dùng LinkedHashMap làm cache LRU thì cần làm gì?",
 options: [
  "Gọi super(capacity, 0.75f, true) để bật accessOrder và ghi đè removeEldestEntry() trả true khi vượt ngưỡng",
  "Gọi super(capacity, 0.75f, false) để giữ insertionOrder rồi tự xóa phần tử đầu tiên mỗi lần put vượt ngưỡng",
  "Bọc bằng Collections.synchronizedMap rồi ghi đè get() để tự chuyển khóa vừa đọc xuống cuối danh sách",
  "Đặt thuộc tính accessOrder qua setter sau khi tạo map và ghi đè afterNodeInsertion() để loại bỏ phần tử cũ"],
 correct: 0,
 explain: "Tham số thứ ba accessOrder=true khiến mỗi lần get() đẩy entry xuống cuối. removeEldestEntry() được gọi sau mỗi put, trả true thì entry cũ nhất bị loại. Lưu ý: LinkedHashMap KHÔNG an toàn đa luồng — thật sự cần cache thì dùng Caffeine."},

{topic: C, question: "TreeSet<Person> với comparator so sánh theo tuổi. Thêm hai người khác tên nhưng cùng tuổi thì sao?",
 options: [
  "Chỉ giữ lại người đầu tiên, vì TreeSet coi trùng lặp theo compare() == 0 chứ không dùng equals()",
  "Giữ cả hai người, vì equals() của Person trả false nên TreeSet xem đây là hai phần tử phân biệt",
  "Ném IllegalStateException vì comparator vi phạm hợp đồng nhất quán với equals của phần tử",
  "Giữ cả hai nhưng thứ tự duyệt không xác định, vì cây đỏ-đen không xử lý được khóa trùng nhau"],
 correct: 0,
 explain: "TreeSet/TreeMap xác định trùng lặp bằng compareTo/compare == 0, HOÀN TOÀN bỏ qua equals(). Comparator 'thiếu' trường sẽ âm thầm nuốt mất dữ liệu. Luôn thêm tiêu chí phá hòa (thenComparing) tới mức duy nhất."},

{topic: C, question: "CopyOnWriteArrayList phù hợp nhất với kịch bản nào?",
 options: [
  "Đọc rất nhiều, ghi rất ít — như danh sách listener; mỗi lần ghi phải sao chép toàn bộ mảng",
  "Ghi rất nhiều, đọc rất ít — như hàng đợi sự kiện, vì thao tác ghi được tối ưu bằng khóa phân đoạn",
  "Đọc ghi cân bằng với dữ liệu lớn, thay thế trực tiếp cho Collections.synchronizedList mọi trường hợp",
  "Cần duyệt và xóa phần tử ngay trong lúc duyệt, vì iterator của nó hỗ trợ remove() an toàn"],
 correct: 0,
 explain: "Mỗi thao tác ghi sao chép cả mảng -> ghi là O(n) và tốn bộ nhớ. Đổi lại đọc hoàn toàn không khóa và iterator chụp ảnh (fail-safe, không CME) — nhưng chính vì chụp ảnh nên iterator.remove() ném UnsupportedOperationException."},

{topic: C, question: "Cần một ngăn xếp (stack) trong code mới thì nên dùng lớp nào?",
 options: [
  "ArrayDeque — nhanh hơn vì không đồng bộ hóa, và Stack còn duyệt sai thứ tự do kế thừa Vector",
  "Stack — vì đây là lớp chuyên dụng cho ngăn xếp, có sẵn push/pop/peek và đã được tối ưu qua nhiều bản",
  "LinkedList — vì cấu trúc liên kết đôi cho phép thêm và xóa ở đầu với chi phí hằng số nhỏ nhất",
  "PriorityQueue — vì nó là hàng đợi dựa trên heap nên xử lý được cả ngăn xếp lẫn hàng đợi thường"],
 correct: 0,
 explain: "Stack kế thừa Vector nên bị đồng bộ hóa vô ích, và duyệt nó cho ra thứ tự TỪ ĐÁY LÊN — trái ngược trực giác. ArrayDeque là mảng vòng, nhanh hơn cả Stack lẫn LinkedList (LinkedList tốn một node object cho mỗi phần tử, cache locality kém)."},

{topic: C, question: "Comparator viết (a, b) -> a.getScore() - b.getScore() có rủi ro gì?",
 options: [
  "Tràn số int khi hai giá trị trái dấu và lớn, làm sai dấu kết quả và gây IllegalArgumentException lúc sắp xếp",
  "Không có rủi ro; đây là cách viết chuẩn được khuyến nghị vì ngắn gọn và nhanh hơn Integer.compare",
  "Chỉ sai khi điểm số là số âm, còn với dữ liệu không âm thì công thức trừ luôn cho kết quả đúng",
  "Gây chậm vì mỗi lần so sánh phải unbox hai giá trị Integer trước khi thực hiện phép trừ số học"],
 correct: 0,
 explain: "Integer.MIN_VALUE - 1 tràn thành số dương -> comparator vi phạm tính bắc cầu -> TimSort ném 'Comparison method violates its general contract!' rất khó tái hiện. Luôn dùng Integer.compare(a, b) hoặc Comparator.comparingInt()."},

{topic: C, question: "Đặt một object làm khóa HashMap rồi thay đổi trường dùng trong hashCode() thì chuyện gì xảy ra?",
 options: [
  "Entry thành 'bóng ma': get() trả null vì tìm sai bucket, nhưng nó vẫn chiếm chỗ và hiện ra khi duyệt map",
  "HashMap tự động tính lại băm và di chuyển entry sang bucket mới nên mọi thao tác vẫn hoạt động đúng",
  "Ném ConcurrentModificationException ngay lần get() tiếp theo vì modCount không còn khớp với trạng thái",
  "Entry bị xóa tự động khỏi map vì băm cũ không còn hợp lệ, và size() giảm đi tương ứng một đơn vị"],
 correct: 0,
 explain: "Băm được tính lúc put và không bao giờ tính lại. Đổi khóa xong thì map tìm ở bucket mới trong khi entry nằm ở bucket cũ — rò rỉ bộ nhớ ngầm. Đây cũng là lý do entity JPA chưa có id mà bỏ vào HashSet là rất nguy hiểm."},

{topic: C, question: "Collections.unmodifiableList(list) khác List.copyOf(list) ở điểm nào?",
 options: [
  "unmodifiableList là khung nhìn — sửa list gốc thì bản 'không đổi' cũng đổi theo; copyOf sao chép nên độc lập",
  "Hai cách hoàn toàn tương đương về hành vi, chỉ khác cú pháp và phiên bản Java tối thiểu được hỗ trợ",
  "unmodifiableList sao chép dữ liệu còn copyOf chỉ trả về một khung nhìn chỉ đọc trỏ vào danh sách gốc",
  "unmodifiableList cấm phần tử null trong khi copyOf vẫn cho phép chứa null ở bất kỳ vị trí nào"],
 correct: 0,
 explain: "'Không sửa được' (unmodifiable) khác 'bất biến' (immutable). unmodifiableList chỉ chặn đường ghi qua tham chiếu đó; ai giữ list gốc vẫn sửa được và thay đổi hiện ngay. Trả dữ liệu ra ngoài an toàn thì dùng List.copyOf."},

// ===== Java Core chuyên sâu =====
{topic: J, question: "Sau khi biên dịch, List<String> và List<Integer> khác nhau thế nào ở runtime?",
 options: [
  "Không khác gì — do type erasure, cả hai đều chỉ còn là List, nên không thể overload theo tham số generic",
  "Khác nhau hoàn toàn — JVM sinh ra một lớp riêng cho mỗi kiểu tham số, giống cách C++ xử lý template",
  "Khác ở chỗ List<String> lưu tham chiếu trực tiếp còn List<Integer> lưu giá trị nguyên thủy đã unbox",
  "Khác ở metadata: getClass() trả về hai lớp khác nhau nhưng cả hai cùng chia sẻ một bảng phương thức"],
 correct: 0,
 explain: "Type erasure: thông tin generic chỉ tồn tại lúc biên dịch, runtime chỉ còn List thô cộng các lệnh ép kiểu do compiler chèn. Hệ quả: không new T[], không instanceof List<String>, không overload theo tham số generic."},

{topic: J, question: "Nguyên tắc PECS (Producer Extends, Consumer Super) nói gì?",
 options: [
  "Chỉ ĐỌC từ cấu trúc thì dùng ? extends T; chỉ GHI vào thì dùng ? super T; cần cả hai thì dùng T trần",
  "Chỉ GHI vào cấu trúc thì dùng ? extends T; chỉ ĐỌC ra thì dùng ? super T; đây là quy ước ngược lại",
  "Lớp cha luôn phải khai báo extends còn lớp con khai báo super để bảo đảm tính hiệp biến của generic",
  "Tham số phương thức nên dùng ? extends T còn kiểu trả về nên dùng ? super T để tối đa hóa linh hoạt"],
 correct: 0,
 explain: "List<? extends Number> đọc ra Number được nhưng KHÔNG add được gì (trừ null) vì không biết kiểu thật. List<? super Integer> add Integer được nhưng đọc ra chỉ còn Object. Xem Collections.copy(dest super, src extends)."},

{topic: J, question: "Integer a = 127, b = 127, c = 128, d = 128; giá trị của (a == b) và (c == d) là gì?",
 options: [
  "true và false — Integer cache giữ sẵn các đối tượng trong khoảng −128..127 nên chúng dùng chung tham chiếu",
  "true và true — mọi Integer có cùng giá trị số học đều được JVM gộp về cùng một đối tượng trong bộ nhớ",
  "false và false — toán tử == trên kiểu bọc luôn so sánh tham chiếu nên hai biến khác nhau luôn khác nhau",
  "true và false — vì 128 vượt quá giới hạn của byte nên JVM phải cấp phát lại đối tượng ở vùng nhớ khác"],
 correct: 0,
 explain: "Integer.valueOf() (do autoboxing gọi) trả về đối tượng có sẵn trong IntegerCache với −128..127, ngoài dải thì new. Bài học: LUÔN dùng equals() cho kiểu bọc. Bẫy này rất hay ra ở phỏng vấn vì code test nhỏ thường 'may mắn' đúng."},

{topic: J, question: "Map<String,Integer> m = new HashMap<>(); int x = m.get(\"chua_co\"); — điều gì xảy ra?",
 options: [
  "NullPointerException lúc chạy, vì get() trả null và việc unbox null sang int gây lỗi ngay tại dòng gán",
  "x nhận giá trị mặc định 0, vì kiểu nguyên thủy int không thể null nên JVM tự gán giá trị khởi tạo",
  "Lỗi biên dịch, vì không thể gán trực tiếp một Integer có thể null vào biến kiểu nguyên thủy int",
  "x nhận giá trị -1 theo quy ước của HashMap khi khóa không tồn tại trong bảng băm hiện tại"],
 correct: 0,
 explain: "Unboxing gọi ngầm .intValue() trên null -> NPE. Đây là nguồn NPE khó lần vì dòng code trông vô hại. Dùng m.getOrDefault(k, 0) hoặc khai báo biến là Integer rồi kiểm tra null."},

{topic: J, question: "\"a,b,c\".split(\".\") trả về gì?",
 options: [
  "Mảng rỗng, vì \".\" là biểu thức chính quy khớp MỌI ký tự nên toàn bộ chuỗi bị coi là dấu phân cách",
  "Mảng [\"a,b,c\"] gồm đúng một phần tử, vì chuỗi không hề chứa ký tự dấu chấm nào để tách ra",
  "Mảng [\"a\", \"b\", \"c\"] gồm ba phần tử, vì split tự nhận biết dấu phẩy là dấu phân cách mặc định",
  "Ném PatternSyntaxException vì dấu chấm đứng một mình không phải biểu thức chính quy hợp lệ"],
 correct: 0,
 explain: "split() nhận REGEX, không phải chuỗi thường. \".\" khớp mọi ký tự nên mọi thứ đều là dấu phân cách -> mảng rỗng (các chuỗi rỗng cuối bị cắt). Phải viết split(\"\\\\.\") hoặc Pattern.quote(\".\")."},

{topic: J, question: "Trong try-with-resources, nếu cả khối try lẫn close() đều ném exception thì cái nào được ném ra ngoài?",
 options: [
  "Exception của khối try; exception của close() được gắn vào nó dưới dạng suppressed, lấy qua getSuppressed()",
  "Exception của close() vì nó xảy ra sau; exception của khối try bị ghi đè và mất hoàn toàn khỏi stack trace",
  "Cả hai được gói chung vào một CompositeException do JVM tạo ra, giữ nguyên thứ tự phát sinh ban đầu",
  "Chỉ exception nào là RuntimeException mới được ném; checked exception còn lại bị ghi log rồi bỏ qua"],
 correct: 0,
 explain: "try-with-resources giữ exception CHÍNH (từ try) và nén exception của close() vào getSuppressed(). Với try-finally viết tay thì ngược lại: lỗi trong finally NUỐT MẤT lỗi gốc — lý do nữa để luôn dùng try-with-resources."},

{topic: J, question: "Vì sao đặt lệnh return trong khối finally là một anti-pattern nghiêm trọng?",
 options: [
  "Vì nó NUỐT mọi exception đang được ném và ghi đè giá trị trả về của khối try, che giấu lỗi hoàn toàn",
  "Vì trình biên dịch sẽ báo lỗi 'unreachable code' và ứng dụng không thể biên dịch thành công được",
  "Vì khối finally chạy trên một luồng khác nên giá trị trả về ở đó có thể bị mất khi tối ưu hóa JIT",
  "Vì nó khiến JVM bỏ qua toàn bộ khối catch, kể cả khi khối try ném ra Error nghiêm trọng như OOM"],
 correct: 0,
 explain: "finally luôn chạy; return trong đó kết thúc method 'bình thường' và exception đang bay bị vứt im lặng. Bug kiểu này rất khó lần vì lỗi thật biến mất không dấu vết. Trình biên dịch chỉ cảnh báo, không báo lỗi."},

{topic: J, question: "opt.orElse(taoMacDinh()) khác opt.orElseGet(this::taoMacDinh) ở điểm nào?",
 options: [
  "orElse LUÔN gọi taoMacDinh() kể cả khi Optional có giá trị; orElseGet chỉ gọi khi Optional rỗng",
  "Hai cách hoàn toàn tương đương, orElseGet chỉ là phiên bản viết bằng lambda cho gọn hơn mà thôi",
  "orElse chỉ chạy khi Optional rỗng còn orElseGet luôn chạy để chuẩn bị sẵn giá trị dự phòng trước",
  "orElse ném NullPointerException nếu hàm trả null, còn orElseGet tự động bọc kết quả vào Optional"],
 correct: 0,
 explain: "Tham số của orElse là một BIỂU THỨC, được tính TRƯỚC khi gọi method. Nếu nó truy vấn DB hay tạo object nặng thì bạn trả giá vô ích mọi lần. Tệ hơn: orElse(throwException()) sẽ ném ngay cả khi có giá trị."},

{topic: J, question: "Java truyền tham số theo cơ chế nào?",
 options: [
  "Luôn truyền theo GIÁ TRỊ; với object thì giá trị được sao chép chính là tham chiếu, nên gán lại bên trong không ảnh hưởng bên ngoài",
  "Truyền theo giá trị với kiểu nguyên thủy và theo THAM CHIẾU với object, nên gán lại object bên trong sẽ đổi cả bên ngoài",
  "Luôn truyền theo tham chiếu; kiểu nguyên thủy được tự động bọc lại thành object trước khi vào phương thức",
  "Tùy theo phương thức: có final thì truyền theo giá trị, không final thì JVM tối ưu thành truyền tham chiếu"],
 correct: 0,
 explain: "Java LUÔN pass-by-value. Với object, cái được sao chép là tham chiếu -> sửa TRẠNG THÁI bên trong (setter) thì bên ngoài thấy, nhưng GÁN LẠI biến (obj = new X()) thì bên ngoài không hề hay biết."},

{topic: J, question: "Vì sao lambda và anonymous class chỉ bắt được biến cục bộ 'effectively final'?",
 options: [
  "Vì biến cục bộ nằm trên stack và sẽ biến mất khi method kết thúc, nên lambda phải giữ một BẢN SAO — cho sửa sẽ tạo hai nguồn dữ liệu lệch nhau",
  "Vì trình biên dịch không có cách nào xác định kiểu thật của biến khi nó được thay đổi nhiều lần trong cùng một phạm vi",
  "Vì lambda chạy trên luồng riêng nên mọi biến nó truy cập bắt buộc phải bất biến để bảo đảm an toàn đa luồng",
  "Vì JVM lưu lambda trong vùng metaspace, nơi chỉ chấp nhận tham chiếu tới các hằng số đã biết lúc biên dịch"],
 correct: 0,
 explain: "Lambda có thể sống lâu hơn method tạo ra nó, nên nó copy giá trị biến cục bộ vào instance. Cho phép sửa sẽ khiến hai bản lệch nhau. Field của object thì KHÔNG bị hạn chế này vì nó nằm trên heap và được truy cập qua this."},

{topic: J, question: "Gọi một method có thể bị ghi đè (overridable) từ trong constructor của lớp cha gây ra vấn đề gì?",
 options: [
  "Bản ghi đè ở lớp con chạy TRƯỚC khi field của lớp con được khởi tạo, nên nó thấy toàn null hoặc 0",
  "JVM ném IllegalStateException vì đối tượng chưa hoàn tất khởi tạo thì không thể gọi method của nó",
  "Method của lớp CHA luôn được gọi thay vì bản ghi đè, vì tại thời điểm đó lớp con chưa được nạp",
  "Không có vấn đề gì; đây là mẫu template method chuẩn và được khuyến khích trong thiết kế lớp cơ sở"],
 correct: 0,
 explain: "Thứ tự khởi tạo: constructor cha chạy TRƯỚC field initializer của con. Dispatch động vẫn gọi bản ghi đè -> nó đọc field con khi chúng còn giá trị mặc định. Constructor chỉ nên gọi method private, static hoặc final."},

// ===== JDBC & Connection Pool =====
{topic: D, question: "PreparedStatement chống SQL injection nhờ cơ chế nào là chính?",
 options: [
  "TÁCH KÊNH: câu lệnh được gửi và phân tích trước, tham số gửi riêng nên luôn là dữ liệu, không bao giờ thành mã",
  "Tự động thoát các ký tự nguy hiểm như dấu nháy đơn và dấu chấm phẩy trước khi ghép vào chuỗi truy vấn",
  "Kiểm tra giá trị tham số theo danh sách đen các từ khóa SQL như DROP, UNION, OR 1=1 rồi từ chối chúng",
  "Mã hóa toàn bộ tham số trước khi truyền qua mạng để tầng phân tích cú pháp không thể diễn giải chúng"],
 correct: 0,
 explain: "Đây là khác biệt về BẢN CHẤT chứ không phải mức độ. DB đã có kế hoạch thực thi trước khi thấy dữ liệu, nên tham số không thể đổi cấu trúc câu lệnh. Nhưng lưu ý: tên bảng/cột KHÔNG tham số hóa được — chỗ đó phải dùng danh sách trắng."},

{topic: D, question: "Khi dùng connection pool, gọi connection.close() thực chất làm gì?",
 options: [
  "TRẢ kết nối về pool để tái sử dụng — proxy của pool chặn close() lại chứ không đóng socket tới DB",
  "Đóng hẳn socket TCP tới cơ sở dữ liệu, và pool sẽ tự mở một kết nối mới khi có yêu cầu tiếp theo",
  "Đánh dấu kết nối là hết hạn để luồng dọn dẹp nền của pool xóa nó khỏi danh sách trong chu kỳ sau",
  "Không làm gì cả; kết nối chỉ thực sự được giải phóng khi transaction hiện tại được commit hoặc rollback"],
 correct: 0,
 explain: "Vì thế BẮT BUỘC vẫn phải close() (dùng try-with-resources) — quên là rò rỉ kết nối và pool cạn. Cũng vì thế trạng thái phải sạch trước khi trả: autoCommit, isolation, schema... nếu bạn đổi thì phải khôi phục."},

{topic: D, question: "Cấu hình maxLifetime của HikariCP nên đặt thế nào so với wait_timeout của MySQL?",
 options: [
  "NHỎ HƠN vài chục giây, để Hikari chủ động thay kết nối trước khi DB âm thầm đóng nó từ phía server",
  "LỚN HƠN để tận dụng tối đa kết nối, vì mở kết nối mới tốn kém hơn nhiều so với việc giữ nó lâu",
  "BẰNG ĐÚNG giá trị wait_timeout để hai bên đồng bộ thời điểm thu hồi và không lãng phí tài nguyên",
  "Không liên quan; maxLifetime chỉ áp dụng cho kết nối đang rảnh còn wait_timeout áp dụng cho kết nối bận"],
 correct: 0,
 explain: "Nếu DB đóng trước, pool vẫn giữ một kết nối 'chết' và request đầu tiên dùng nó sẽ nhận CommunicationsException/'Broken pipe'. Đặt maxLifetime nhỏ hơn (Hikari khuyến nghị ít nhất 30 giây) để pool luôn là bên chủ động."},

{topic: D, question: "Công thức tham khảo phổ biến để chọn kích thước connection pool là gì?",
 options: [
  "(số lõi CPU × 2) + số đĩa hiệu dụng — pool lớn thường LÀM CHẬM hệ thống vì DB phải tranh chấp nhiều hơn",
  "Bằng số luồng tối đa của web server, để mọi request đồng thời đều chắc chắn có sẵn một kết nối riêng",
  "Bằng số request đồng thời dự kiến chia cho 2, và nên đặt tối thiểu 200 cho ứng dụng có tải cao",
  "Càng lớn càng tốt miễn còn RAM, vì kết nối rảnh gần như không tốn tài nguyên nào của phía máy chủ"],
 correct: 0,
 explain: "Trực giác 'pool to = nhanh' là sai: DB chỉ thực thi song song được tới giới hạn CPU/đĩa, thêm kết nối chỉ tăng chuyển ngữ cảnh và tranh khóa. Còn phải nhân số instance khi so với max_connections của DB."},

{topic: D, question: "Đọc 10 triệu dòng từ MySQL bằng JDBC mà không nổ OOM thì cần làm gì?",
 options: [
  "setFetchSize(Integer.MIN_VALUE) cùng ResultSet forward-only, read-only — driver MySQL hiểu đây là tín hiệu bật chế độ streaming",
  "setFetchSize(1000) là đủ, driver MySQL sẽ tự chia kết quả thành từng lô một nghìn dòng để nạp dần vào bộ nhớ",
  "Tăng heap của JVM bằng cờ -Xmx và bật ResultSet.TYPE_SCROLL_INSENSITIVE để có thể duyệt qua lại giữa các dòng",
  "Bọc truy vấn trong transaction chỉ đọc và đặt isolation level READ UNCOMMITTED để driver không phải giữ ảnh chụp"],
 correct: 0,
 explain: "Mặc định driver MySQL nạp TOÀN BỘ kết quả vào bộ nhớ client. Chỉ tổ hợp Integer.MIN_VALUE + forward-only + read-only mới bật streaming. PostgreSQL thì khác: cần autoCommit=false rồi setFetchSize(n) mới dùng cursor phía server."},

{topic: D, question: "Vì sao batch insert JDBC vào MySQL thường không nhanh lên nếu thiếu rewriteBatchedStatements=true?",
 options: [
  "Vì driver vẫn gửi từng câu INSERT riêng lẻ; cờ này mới cho phép gộp chúng thành một câu multi-row INSERT",
  "Vì driver mặc định giới hạn mỗi lô ở 10 câu lệnh, và cờ này nâng giới hạn lên theo kích thước gói mạng",
  "Vì thiếu cờ đó thì addBatch() chỉ tích lũy trong bộ nhớ mà executeBatch() sẽ bỏ qua hoàn toàn các câu lệnh",
  "Vì MySQL yêu cầu bật cờ này để cho phép chạy nhiều câu lệnh trong một transaction mà không cần commit"],
 correct: 0,
 explain: "Không có cờ, addBatch chỉ gom ở client rồi vẫn bắn từng câu qua mạng — gần như không lợi gì. Bật lên, driver viết lại thành INSERT ... VALUES (...),(...),(...) và tốc độ thường tăng hàng chục lần."},

{topic: D, question: "Vì sao @GeneratedValue(strategy = IDENTITY) làm Hibernate không batch insert được?",
 options: [
  "Vì Hibernate phải chạy INSERT ngay lập tức để lấy id do DB sinh, nên không thể gom nhiều câu lại chờ flush",
  "Vì cột auto-increment bị khóa ở mức bảng nên các câu INSERT trong cùng lô sẽ chờ nhau tuần tự",
  "Vì Hibernate không hỗ trợ batch cho bất kỳ chiến lược sinh khóa nào, phải dùng JdbcTemplate mới batch được",
  "Vì IDENTITY buộc phải chạy ở isolation level SERIALIZABLE, mức này lại vô hiệu hóa cơ chế gom lô của driver"],
 correct: 0,
 explain: "Hibernate cần id để đưa entity vào persistence context, mà IDENTITY chỉ trả id SAU khi INSERT -> phải bắn ngay từng câu. Cần batch thì dùng SEQUENCE với allocationSize lớn (pooled optimizer) — DB hỗ trợ sequence thì luôn ưu tiên."},

{topic: D, question: "Trong cùng một @Transactional, bạn dùng JdbcTemplate UPDATE một dòng rồi đọc lại entity đó bằng repository JPA. Kết quả?",
 options: [
  "Đọc ra dữ liệu CŨ, vì entity đã nằm trong persistence context nên Hibernate trả từ cache L1 không truy vấn lại",
  "Đọc ra dữ liệu MỚI, vì hai bên dùng chung một Connection nên Hibernate luôn thấy thay đổi ngay lập tức",
  "Ném OptimisticLockException, vì Hibernate phát hiện cột version trên DB đã lệch so với bản trong bộ nhớ",
  "Không xác định, phụ thuộc vào việc DB đang chạy ở mức cô lập READ COMMITTED hay REPEATABLE READ"],
 correct: 0,
 explain: "Persistence context không biết gì về câu lệnh đi thẳng qua JDBC. Trộn hai tầng thì phải em.flush() trước (đẩy thay đổi treo xuống) và em.clear() sau (buộc đọc lại). Đây cũng là lý do native query có thể làm hỏng cache L2."},

{topic: D, question: "Vì sao @Transactional KHÔNG có tác dụng khi công việc được đẩy sang một luồng @Async?",
 options: [
  "Vì transaction được gắn vào ThreadLocal của TransactionSynchronizationManager, luồng mới không thừa hưởng nó",
  "Vì @Async chạy sau khi phương thức gốc trả về, thời điểm đó transaction chắc chắn đã được commit xong",
  "Vì Spring cấm kết hợp hai annotation này và sẽ ném IllegalStateException ngay lúc khởi động ứng dụng",
  "Vì proxy AOP chỉ bọc được một annotation trên mỗi phương thức, nên @Async đã ghi đè lên @Transactional"],
 correct: 0,
 explain: "Connection và EntityManager được bind vào ThreadLocal của luồng gọi. Luồng mới bắt đầu với ThreadLocal rỗng -> nó tự mở transaction riêng (nếu method của nó có @Transactional) hoặc chạy không transaction."},

{topic: D, question: "Bốn mức cô lập transaction của JDBC xử lý các hiện tượng nào?",
 options: [
  "READ UNCOMMITTED cho dirty read; READ COMMITTED chặn dirty read; REPEATABLE READ chặn thêm non-repeatable read; SERIALIZABLE chặn cả phantom read",
  "READ UNCOMMITTED chặn dirty read; READ COMMITTED chặn phantom read; REPEATABLE READ chặn lost update; SERIALIZABLE chặn mọi loại khóa chết",
  "Cả bốn mức đều chặn dirty read, chúng chỉ khác nhau ở thời gian giữ khóa đọc và số lượng bản ghi bị khóa",
  "READ COMMITTED là mức mạnh nhất trong bốn mức, SERIALIZABLE chỉ nới lỏng để tăng thông lượng ghi"],
 correct: 0,
 explain: "Mặc định: PostgreSQL và Oracle dùng READ COMMITTED, MySQL/InnoDB dùng REPEATABLE READ. Mức càng cao càng ít bất thường nhưng càng nhiều khóa và deadlock — đa số ứng dụng nên giữ mặc định rồi khóa tường minh chỗ cần."},

// ===== Hibernate luồng hoạt động =====
{topic: H, question: "Hibernate phát hiện entity bị thay đổi (dirty checking) bằng cách nào?",
 options: [
  "So sánh trạng thái hiện tại với ẢNH CHỤP lúc entity được nạp, do persistence context lưu lại từ đầu",
  "Sinh proxy cho từng setter để ghi nhận ngay mọi lời gọi thay đổi giá trị trường vào một danh sách",
  "Đặt một cờ boolean 'dirty' trên mỗi entity, được bật lên mỗi khi bất kỳ setter nào được gọi tới",
  "Truy vấn lại DB ngay trước khi flush rồi đối chiếu từng cột để xác định trường nào đã thay đổi"],
 correct: 0,
 explain: "Persistence context giữ một bản chụp (loaded state) khi nạp entity. Lúc flush nó duyệt và so từng trường -> chi phí tỉ lệ với SỐ ENTITY ĐANG QUẢN LÝ. Đó là lý do nạp 10.000 entity chỉ để đọc thì nên đặt readOnly=true."},

{topic: H, question: "Khi flush, Hibernate thực thi các câu lệnh theo thứ tự nào?",
 options: [
  "INSERT, UPDATE, xóa phần tử collection, thêm phần tử collection, cuối cùng mới là DELETE",
  "Đúng theo thứ tự bạn gọi các phương thức persist/merge/remove trong mã nguồn của mình",
  "DELETE trước tiên để giải phóng ràng buộc, rồi tới UPDATE, và INSERT được thực thi sau cùng",
  "Ngẫu nhiên theo thứ tự duyệt bảng băm của persistence context, nên không thể dựa vào thứ tự này"],
 correct: 0,
 explain: "Thứ tự CỐ ĐỊNH, không theo mã nguồn. Hệ quả kinh điển: xóa một dòng rồi chèn dòng mới cùng khóa duy nhất trong một transaction sẽ dính lỗi trùng, vì INSERT chạy TRƯỚC DELETE. Chữa bằng em.flush() giữa hai thao tác."},

{topic: H, question: "Khác biệt cốt lõi giữa persist() và merge() là gì?",
 options: [
  "persist đưa CHÍNH đối tượng đó vào quản lý; merge sao chép trạng thái sang một bản được quản lý và TRẢ VỀ bản đó, đối tượng bạn truyền vào vẫn detached",
  "persist dùng cho entity mới còn merge dùng cho entity cũ, ngoài ra cả hai đều đưa chính đối tượng truyền vào thành managed",
  "persist ghi xuống DB ngay lập tức còn merge chỉ đánh dấu để ghi khi transaction được commit ở cuối",
  "persist chạy được ngoài transaction còn merge bắt buộc phải nằm trong một transaction đang hoạt động"],
 correct: 0,
 explain: "Bẫy: gọi merge(o) rồi tiếp tục dùng o sẽ không có tác dụng — phải dùng giá trị TRẢ VỀ. Bẫy thứ hai: merge ghi đè TẤT CẢ các trường, nên object detached thiếu dữ liệu (do map từ DTO) sẽ xóa sạch các cột đó thành null."},

{topic: H, question: "getReferenceById(id) (trước đây là getOne) khác findById(id) thế nào?",
 options: [
  "Nó trả về PROXY lười, không chạy SELECT nào; chỉ khi truy cập trường khác id mới nạp, và ném EntityNotFoundException nếu id không tồn tại",
  "Nó chạy SELECT ngay như findById nhưng trả thẳng entity thay vì Optional, và trả null khi id không tồn tại",
  "Nó đọc thẳng từ cache tầng hai và bỏ qua cache tầng một, phù hợp cho các truy vấn đọc lặp lại nhiều lần",
  "Nó khóa bản ghi ở mức pessimistic write ngay lúc lấy để bảo đảm không ai sửa đồng thời bản ghi đó"],
 correct: 0,
 explain: "Rất hữu ích khi chỉ cần gán quan hệ khóa ngoại: order.setCustomer(repo.getReferenceById(cid)) tiết kiệm hẳn một SELECT. Đổi lại lỗi 'không tồn tại' xuất hiện muộn, và ngoài transaction thì proxy chết (LazyInitializationException)."},

{topic: H, question: "JOIN FETCH một collection cộng với phân trang gây ra chuyện gì?",
 options: [
  "Hibernate cảnh báo HHH000104 rồi nạp TOÀN BỘ kết quả vào bộ nhớ và phân trang trong RAM — rất dễ OOM",
  "Hibernate ném ngay một exception vì hai tính năng này về mặt kỹ thuật không thể kết hợp với nhau",
  "Câu SQL sinh ra vẫn đúng nhưng số dòng trả về bị nhân lên, nên trang cuối luôn thiếu một vài bản ghi",
  "Phân trang được đẩy xuống DB bình thường, chỉ có điều thứ tự các phần tử trong collection bị đảo lộn"],
 correct: 0,
 explain: "JOIN nhân dòng nên LIMIT/OFFSET ở SQL sẽ cắt sai; Hibernate 'chữa' bằng cách nạp hết rồi cắt trong bộ nhớ. Cách đúng: hai bước — truy vấn lấy danh sách id có phân trang, rồi truy vấn thứ hai JOIN FETCH theo 'where id in :ids'."},

{topic: H, question: "@BatchSize(size = 20) hoặc default_batch_fetch_size giúp gì cho vấn đề N+1?",
 options: [
  "Gom việc nạp lười của nhiều proxy thành các câu 'where id in (...)' theo lô, biến N truy vấn thành N/20",
  "Chuyển toàn bộ quan hệ sang chế độ EAGER nên mọi dữ liệu liên quan được nạp ngay trong câu truy vấn đầu",
  "Giới hạn số phần tử tối đa được nạp trong một collection lười, các phần tử còn lại sẽ bị bỏ qua hẳn",
  "Gom nhiều câu INSERT và UPDATE thành một lô duy nhất khi flush, giảm số lần đi vòng qua mạng tới DB"],
 correct: 0,
 explain: "Đây là cách chữa N+1 'toàn cục' rẻ nhất: đặt spring.jpa.properties.hibernate.default_batch_fetch_size=25 là cải thiện ngay mà không sửa dòng code nào. Nó không xóa hết truy vấn phụ nhưng giảm mạnh số lượng."},

{topic: H, question: "Dùng SEQUENCE với allocationSize = 50 nhưng DB khai báo sequence INCREMENT BY 1 thì sao?",
 options: [
  "Sinh ra id TRÙNG hoặc xung đột khóa chính, vì Hibernate tự cấp 50 giá trị sau mỗi lần gọi sequence",
  "Không sao cả, Hibernate tự phát hiện bước nhảy thật của sequence và điều chỉnh lại cho khớp khi khởi động",
  "Ứng dụng không khởi động được vì Hibernate xác thực siêu dữ liệu sequence trước khi tạo SessionFactory",
  "Id sinh ra bị thưa và nhảy cách quãng nhưng vẫn luôn duy nhất, chỉ lãng phí không gian giá trị mà thôi"],
 correct: 0,
 explain: "allocationSize là lời hứa 'DB nhảy bấy nhiêu mỗi lần', Hibernate dựa vào đó để cấp id trong bộ nhớ mà không hỏi lại DB. Lời hứa sai thì hai instance sẽ cấp trùng dải. Hai bên PHẢI khớp nhau."},

{topic: H, question: "Trong cùng một persistence context, gọi findById(1L) hai lần cho kết quả thế nào?",
 options: [
  "Trả về CÙNG MỘT thể hiện object (so sánh bằng == cũng đúng) và chỉ chạy đúng một câu SELECT",
  "Trả về hai object khác nhau có cùng dữ liệu, và chạy hai câu SELECT riêng biệt xuống cơ sở dữ liệu",
  "Trả về cùng một object nhưng vẫn chạy hai câu SELECT để bảo đảm dữ liệu luôn mới nhất từ DB",
  "Trả về hai object khác nhau nhưng chỉ chạy một câu SELECT, lần sau lấy dữ liệu từ cache tầng hai"],
 correct: 0,
 explain: "Cache L1 (persistence context) bảo đảm định danh: một id -> một object trong suốt transaction. Nhờ vậy dirty checking và quan hệ vòng mới hoạt động đúng. Lưu ý: truy vấn JPQL vẫn xuống DB nhưng kết quả được ánh xạ về object đã có."},

{topic: H, question: "Vì sao nên đặt spring.jpa.open-in-view=false?",
 options: [
  "Vì OSIV giữ kết nối DB suốt thời gian render response, dễ cạn pool và che giấu N+1 xảy ra ở tầng view",
  "Vì OSIV làm mọi quan hệ trở thành EAGER, khiến mỗi truy vấn nạp thừa rất nhiều dữ liệu không cần thiết",
  "Vì OSIV vô hiệu hóa cache tầng một, buộc mỗi lần truy cập entity phải chạy lại truy vấn xuống cơ sở dữ liệu",
  "Vì OSIV chỉ hoạt động với Spring MVC truyền thống và sẽ gây lỗi biên dịch trong ứng dụng WebFlux"],
 correct: 0,
 explain: "OSIV mở persistence context tới hết vòng đời request để tránh LazyInitializationException — tiện nhưng che lỗi thiết kế. Tắt đi, bạn buộc phải nạp đủ dữ liệu trong service (JOIN FETCH/DTO) — đúng đắn hơn nhiều."},

{topic: H, question: "Với @Version (khóa lạc quan), logic thử lại (retry) nên đặt ở đâu?",
 options: [
  "BÊN NGOÀI transaction — vì khi OptimisticLockException nổ ra thì transaction đã hỏng, thử lại bên trong là vô nghĩa",
  "BÊN TRONG cùng transaction, dùng vòng lặp while bắt exception rồi nạp lại entity và ghi lại giá trị mới",
  "Trong khối catch của chính phương thức có @Transactional, ngay trước khi phương thức đó trả về kết quả",
  "Không cần retry; Hibernate tự động nạp lại phiên bản mới nhất và thực hiện lại câu UPDATE tối đa ba lần"],
 correct: 0,
 explain: "Transaction đã đánh dấu rollback-only thì mọi thao tác tiếp theo trong đó đều vô ích. Retry phải bọc BÊN NGOÀI (ví dụ @Retryable trên bean gọi). Với các trường hợp như trừ số dư, một câu UPDATE có điều kiện nguyên tử thường còn tốt hơn."},

{topic: H, question: "Entity có quan hệ lazy thì equals() nên viết thế nào?",
 options: [
  "Dùng 'instanceof' thay vì getClass(), vì proxy là LỚP CON do ByteBuddy sinh nên getClass() sẽ không khớp",
  "Dùng getClass() để so sánh chính xác kiểu, vì instanceof sẽ coi proxy và entity thật là hai kiểu khác nhau",
  "So sánh toàn bộ các trường của entity kể cả quan hệ, để bảo đảm hai entity chỉ bằng nhau khi giống hệt",
  "Không cần ghi đè equals; cài đặt mặc định của Object đã đủ chính xác vì cache L1 bảo đảm tính định danh"],
 correct: 0,
 explain: "Proxy lười là lớp con sinh lúc chạy, nên getClass() trả về Order$HibernateProxy$xyz != Order.class -> equals luôn false. Ngoài ra hashCode phải TRẢ HẰNG SỐ hoặc dựa trên khóa nghiệp vụ, không dùng id (id null trước khi lưu)."},

// ===== Spring Data JPA chuyên sâu =====
{topic: S, question: "Interface repository không có thân hàm, vậy ai thực sự cài đặt các method như save() và findById()?",
 options: [
  "SimpleJpaRepository — proxy do JpaRepositoryFactory sinh ra sẽ ủy quyền các method chuẩn cho lớp này",
  "Trình biên dịch annotation processor sinh sẵn một lớp Impl trong thư mục target lúc build dự án",
  "Chính EntityManager, vì Spring Data đăng ký interface của bạn như một extension trực tiếp của nó",
  "AbstractJpaRepository, một lớp trừu tượng mà mọi interface repository ngầm kế thừa khi khởi động"],
 correct: 0,
 explain: "Luồng: quét interface -> tạo JpaRepositoryFactoryBean -> sinh proxy JDK -> chuỗi interceptor định tuyến (@Query > custom fragment > default method > phân tích tên) -> còn lại ủy quyền SimpleJpaRepository, lớp bọc quanh EntityManager."},

{topic: S, question: "Viết findByCustomerNam(String n) (sai chính tả tên trường) thì lỗi xuất hiện khi nào?",
 options: [
  "Lúc KHỞI ĐỘNG ứng dụng — Spring Data phân tích tên method khi tạo bean và không tìm thấy thuộc tính",
  "Lúc chạy, ngay lần đầu tiên method đó được gọi tới, và ném PropertyReferenceException tại chỗ gọi",
  "Lúc biên dịch, vì annotation processor của Spring Data đối chiếu tên method với các trường của entity",
  "Không bao giờ báo lỗi; Spring Data bỏ qua điều kiện không nhận diện được và trả về toàn bộ bản ghi"],
 correct: 0,
 explain: "PartTree phân tích tên ngay lúc tạo repository bean -> ứng dụng chết ngay khi khởi động. Đây là ưu điểm lớn (fail fast). Với tên thuộc tính lồng nhau dễ nhập nhằng, dùng dấu gạch dưới để tách rõ: findByCustomer_Name."},

{topic: S, question: "Một method public không có @Transactional gọi this.luu() (method cùng bean, CÓ @Transactional). Kết quả?",
 options: [
  "@Transactional bị BỎ QUA hoàn toàn và không có cảnh báo nào, vì lời gọi qua this không đi qua proxy AOP",
  "Transaction vẫn hoạt động bình thường vì Spring dùng kỹ thuật weaving ở bytecode để xử lý trường hợp này",
  "Spring ném IllegalStateException lúc chạy để cảnh báo lập trình viên về lời gọi nội bộ không hợp lệ",
  "Transaction hoạt động nhưng ở mức propagation NEVER, nghĩa là mọi thay đổi được commit ngay lập tức"],
 correct: 0,
 explain: "Self-invocation — bẫy số một của AOP dựa trên proxy. Lời gọi this.x() đi thẳng vào đối tượng đích, bỏ qua TransactionInterceptor. Chữa bằng cách tách sang bean khác (sạch nhất), tiêm chính mình qua @Lazy, hoặc AopContext.currentProxy()."},

{topic: S, question: "Method có @Transactional ném ra một checked exception (ví dụ IOException) thì Spring làm gì?",
 options: [
  "COMMIT transaction, vì mặc định Spring chỉ rollback với RuntimeException và Error; muốn khác phải khai rollbackFor",
  "ROLLBACK transaction, vì mọi exception thoát ra khỏi phương thức đều được coi là dấu hiệu thất bại",
  "Ném UnexpectedRollbackException để buộc lập trình viên khai báo rõ ý định xử lý cho checked exception",
  "Tạm hoãn quyết định và commit hay rollback tùy theo cấu hình rollback-on-checked của transaction manager"],
 correct: 0,
 explain: "Quy tắc mặc định của EJB được Spring kế thừa: checked exception = 'lỗi nghiệp vụ có thể phục hồi' -> vẫn commit. Nguồn của nhiều bug dữ liệu dở dang. Khai @Transactional(rollbackFor = Exception.class) nếu bạn muốn ngược lại."},

{topic: S, question: "Propagation.REQUIRES_NEW có chi phí ẩn nào cần cảnh giác?",
 options: [
  "Nó chiếm THÊM một connection trong khi connection cũ vẫn bị giữ — lồng nhiều lớp dưới tải cao sẽ làm cạn pool",
  "Nó buộc transaction ngoài phải commit trước, nên mọi thay đổi đang treo đều bị ghi xuống DB sớm hơn dự định",
  "Nó nâng mức cô lập của cả hai transaction lên SERIALIZABLE, làm tăng đáng kể khả năng xảy ra deadlock",
  "Nó vô hiệu hóa cache tầng một của transaction bên ngoài, buộc mọi entity phải được nạp lại từ đầu"],
 correct: 0,
 explain: "Transaction ngoài bị TẠM DỪNG chứ không được trả connection về. Pool 10 kết nối mà lồng hai lớp là hiệu dụng chỉ còn 5, và tệ nhất là tự khóa chính mình. Cũng lưu ý hai transaction không thấy dữ liệu chưa commit của nhau."},

{topic: S, question: "Propagation.NESTED khác REQUIRES_NEW ở chỗ nào?",
 options: [
  "NESTED dùng SAVEPOINT trong CÙNG một transaction nên nếu transaction ngoài rollback thì phần trong cũng mất",
  "NESTED tạo hẳn một transaction mới hoàn toàn độc lập, còn REQUIRES_NEW chỉ đặt điểm lưu trong transaction hiện tại",
  "NESTED chỉ khác về hiệu năng, còn về ngữ nghĩa thì hai mức này hoàn toàn tương đương với nhau",
  "NESTED yêu cầu mức cô lập SERIALIZABLE trong khi REQUIRES_NEW hoạt động được với mọi mức cô lập"],
 correct: 0,
 explain: "NESTED = savepoint: lỗi bên trong chỉ quay về savepoint, nhưng số phận cuối cùng vẫn phụ thuộc transaction ngoài. Lưu ý thực tế: nó cần DataSourceTransactionManager và DB hỗ trợ savepoint — JpaTransactionManager mặc định KHÔNG hỗ trợ."},

{topic: S, question: "Vì sao truy vấn @Modifying UPDATE hàng loạt thường cần clearAutomatically = true?",
 options: [
  "Vì câu lệnh chạy thẳng xuống DB mà persistence context không hay biết, nên entity trong bộ nhớ vẫn giữ giá trị cũ",
  "Vì Hibernate cần xóa cache tầng hai sau mỗi lần ghi để các instance khác của ứng dụng đọc được dữ liệu mới",
  "Vì nếu không xóa, Spring Data sẽ chạy lại câu truy vấn một lần nữa lúc commit và gây cập nhật trùng lặp",
  "Vì tham số này bật chế độ tự động flush trước khi chạy, bảo đảm mọi thay đổi treo được ghi xuống trước"],
 correct: 0,
 explain: "Truy vấn hàng loạt đi VÒNG QUA persistence context. Entity cũ còn trong đó sẽ cho đọc ra dữ liệu lỗi thời, và tệ hơn: dirty checking lúc flush có thể ghi đè ngược giá trị cũ. Thường bật cả flushAutomatically lẫn clearAutomatically."},

{topic: S, question: "UPDATE hàng loạt bằng JPQL có kích hoạt @PreUpdate và tự tăng cột @Version không?",
 options: [
  "KHÔNG cả hai — muốn tăng version phải viết tường minh 'set o.version = o.version + 1' trong câu truy vấn",
  "CÓ cả hai — Hibernate vẫn chạy đầy đủ vòng đời entity cho mọi bản ghi bị câu lệnh đó tác động tới",
  "Chỉ tăng @Version tự động, còn các callback vòng đời như @PreUpdate thì bị bỏ qua hoàn toàn",
  "Chỉ chạy callback @PreUpdate, còn cột @Version giữ nguyên vì khóa lạc quan không áp dụng cho lô"],
 correct: 0,
 explain: "Truy vấn hàng loạt dịch thẳng sang SQL, không đi qua vòng đời entity: không callback, không cascade, không tăng version, không cập nhật trường @LastModifiedDate. Phải tự xử lý các cột đó trong chính câu lệnh."},

{topic: S, question: "Page<T> khác Slice<T> ở điểm nào quan trọng nhất về hiệu năng?",
 options: [
  "Page chạy THÊM một câu count(*) để biết tổng số bản ghi; Slice chỉ lấy dư một dòng để biết còn trang sau",
  "Page nạp toàn bộ kết quả rồi cắt trong bộ nhớ, còn Slice đẩy LIMIT và OFFSET xuống cho cơ sở dữ liệu",
  "Slice chạy thêm một câu count để tính số trang còn lại, còn Page chỉ đơn giản lấy đúng số dòng yêu cầu",
  "Page giữ kết nối mở trong suốt quá trình duyệt trang, còn Slice đóng kết nối ngay sau khi lấy dữ liệu"],
 correct: 0,
 explain: "Câu count trên bảng lớn với điều kiện lọc phức tạp thường đắt HƠN cả câu lấy dữ liệu. Giao diện cuộn vô tận hay nút 'Xem thêm' không cần tổng số -> dùng Slice, hoặc List<T> nếu không cần biết có trang sau."},

{topic: S, question: "Vì sao keyset pagination (seek method) nhanh hơn OFFSET khi vào các trang sâu?",
 options: [
  "Vì nó dùng điều kiện WHERE trên khóa sắp xếp để nhảy thẳng tới vị trí qua chỉ mục, thay vì quét rồi bỏ qua N dòng",
  "Vì nó gom nhiều trang vào một truy vấn duy nhất rồi cache lại ở phía ứng dụng để phục vụ các lần lật sau",
  "Vì nó bỏ hoàn toàn mệnh đề ORDER BY, nhờ đó cơ sở dữ liệu không phải sắp xếp lại tập kết quả trung gian",
  "Vì nó dùng con trỏ phía máy chủ được giữ mở giữa các request nên DB không phải chạy lại truy vấn từ đầu"],
 correct: 0,
 explain: "OFFSET 200000 buộc DB đọc rồi VỨT BỎ 200.000 dòng — chi phí tăng tuyến tính theo số trang. Keyset dùng 'where (created_at, id) < (:lastAt, :lastId)' nên thời gian không đổi, và không bị trùng/nhảy dòng khi có bản ghi mới chèn vào."},

{topic: S, question: "Interface projection ĐÓNG (chỉ có getter) khác projection MỞ (@Value với SpEL) thế nào?",
 options: [
  "Projection đóng cho phép Spring Data tối ưu SQL chỉ chọn đúng các cột cần; projection mở buộc nạp CẢ entity để tính biểu thức",
  "Projection mở tối ưu SQL tốt hơn vì SpEL được dịch thẳng thành biểu thức SQL, còn projection đóng luôn chọn hết cột",
  "Hai loại sinh ra câu SQL giống hệt nhau, chỉ khác ở chỗ projection mở cho phép ghép chuỗi ngay trong interface",
  "Projection đóng chỉ hoạt động với @Query tường minh, còn projection mở dùng được với cả truy vấn suy từ tên method"],
 correct: 0,
 explain: "Đây là điểm nhiều người không biết: thêm một @Value là mất sạch lợi ích cắt cột. Cần biến đổi dữ liệu thì làm ở default method của interface projection hoặc ở tầng service, đừng làm bằng SpEL."},

{topic: S, question: "Muốn gửi email SAU KHI transaction commit thành công thì dùng cơ chế nào là đúng nhất?",
 options: [
  "Phát ApplicationEvent trong transaction rồi lắng nghe bằng @TransactionalEventListener(phase = AFTER_COMMIT)",
  "Gọi thẳng service gửi mail ở dòng cuối cùng của phương thức có @Transactional, ngay trước lệnh return",
  "Đặt lời gọi gửi mail trong callback @PostUpdate của entity để bảo đảm nó chạy đúng lúc dữ liệu thay đổi",
  "Dùng @Async trên phương thức gửi mail và gọi nó ngay đầu phương thức nghiệp vụ để không phải chờ đợi"],
 correct: 0,
 explain: "Gọi thẳng thì mail vẫn bay đi kể cả khi transaction rollback sau đó, và lỗi SMTP lại kéo đổ nghiệp vụ chính. AFTER_COMMIT bảo đảm chỉ chạy khi dữ liệu đã chắc chắn được ghi. Cần bảo đảm gửi được thì tiến thêm một bước: mẫu Outbox."},

{topic: S, question: "@OneToMany(mappedBy=\"order\") — bạn add item vào collection nhưng quên set item.setOrder(this). Kết quả?",
 options: [
  "Khóa ngoại không được ghi (hoặc null) vì Hibernate chỉ nhìn phía SỞ HỮU, tức phía @ManyToOne có cột khóa ngoại",
  "Hibernate tự suy ra quan hệ ngược từ mappedBy và điền khóa ngoại đúng, nên dữ liệu vẫn được lưu bình thường",
  "Hibernate ném TransientObjectException vì phát hiện phần tử trong collection chưa được liên kết đúng chiều",
  "Hibernate tạo thêm một bảng nối ngoài dự kiến để lưu quan hệ, vì phía sở hữu không có thông tin liên kết"],
 correct: 0,
 explain: "mappedBy nghĩa là 'tôi chỉ là ảnh phản chiếu, đừng ghi gì'. Vì thế LUÔN viết method tiện ích đồng bộ cả hai phía (themItem/xoaItem) và dùng nó thay cho add() trực tiếp — đây là quy ước bắt buộc trong mọi codebase JPA nghiêm túc."},

// ===== Java hiện đại 8 → 21 =====
{topic: M, question: "list.stream().filter(x -> x > 10).map(this::xuLy); — dòng này làm gì?",
 options: [
  "KHÔNG làm gì cả — thiếu thao tác cuối nên pipeline chỉ được dựng lên chứ không hề được thực thi",
  "Lọc và biến đổi toàn bộ danh sách rồi trả về một stream mới chứa đầy đủ kết quả đã tính sẵn",
  "Ném IllegalStateException lúc chạy vì một stream không có thao tác cuối là stream không hợp lệ",
  "Lọc ngay lập tức nhưng hoãn phần map lại, vì filter là thao tác cuối còn map là thao tác trung gian"],
 correct: 0,
 explain: "Mọi thao tác trung gian (filter, map, sorted, peek, limit) đều LƯỜI — chúng chỉ mô tả pipeline. Phải có thao tác cuối (collect, toList, forEach, count, reduce, findFirst...) thì dữ liệu mới thật sự chảy qua."},

{topic: M, question: "stream.filter(p).map(f).findFirst() xử lý dữ liệu theo cách nào?",
 options: [
  "Từng phần tử đi qua TOÀN BỘ chuỗi filter → map rồi mới tới phần tử tiếp theo, và dừng ngay khi tìm thấy kết quả",
  "Chạy filter cho toàn bộ danh sách trước, rồi chạy map cho toàn bộ kết quả, cuối cùng mới lấy phần tử đầu",
  "Chạy song song cả filter và map trên các luồng khác nhau rồi đồng bộ kết quả ở thao tác cuối findFirst",
  "Chạy map trước cho toàn bộ phần tử để tối ưu hóa bộ nhớ đệm, sau đó mới áp dụng điều kiện lọc lên chúng"],
 correct: 0,
 explain: "Duyệt theo CHIỀU DỌC là chìa khóa của short-circuit: với 1 triệu phần tử mà phần tử thứ 3 khớp thì chỉ 3 phần tử được xử lý. Ngoại lệ: sorted và distinct là thao tác CÓ TRẠNG THÁI, buộc phải gom hết trước — nên đặt filter TRƯỚC sorted."},

{topic: M, question: "Collectors.toMap(User::getEmail, u -> u) khi có hai user trùng email thì sao?",
 options: [
  "Ném IllegalStateException 'Duplicate key' — phải truyền hàm gộp thứ ba để quyết định giữ giá trị nào",
  "Giữ lại giá trị cuối cùng gặp được và ghi đè các giá trị trước đó, giống hành vi của HashMap.put()",
  "Giữ lại giá trị đầu tiên và bỏ qua các bản ghi trùng sau đó, đồng thời ghi một dòng cảnh báo vào log",
  "Tự động gom các giá trị trùng khóa vào một List, biến kiểu trả về thành Map<String, List<User>>"],
 correct: 0,
 explain: "Mặc định toMap KHÔNG tha thứ cho khóa trùng. Luôn truyền tham số thứ ba: (a, b) -> b hoặc (a, b) -> a. Bẫy thứ hai: toMap ném NPE nếu GIÁ TRỊ là null (khác HashMap thường) — trường hợp đó dùng Collectors.groupingBy hoặc gom thủ công."},

{topic: M, question: "Vì sao KHÔNG nên dùng parallelStream cho các lời gọi HTTP hay truy vấn DB?",
 options: [
  "Vì nó chạy trên ForkJoinPool.commonPool dùng chung toàn JVM; luồng bị chặn chờ IO sẽ làm đói mọi tác vụ khác",
  "Vì các thao tác IO không thể chia nhỏ bằng Spliterator nên parallelStream sẽ tự động chuyển về chế độ tuần tự",
  "Vì mỗi luồng trong common pool có timeout mặc định 30 giây, và lời gọi mạng vượt ngưỡng đó sẽ bị hủy bỏ",
  "Vì kết quả trả về sẽ mất thứ tự ban đầu, nên không thể ghép lại đúng với danh sách đầu vào ban đầu"],
 correct: 0,
 explain: "commonPool có size = số lõi − 1 và dùng chung cho cả thư viện bên thứ ba. Chặn nó bằng IO là tự bóp cổ ứng dụng. parallelStream chỉ hợp với dữ liệu LỚN, tác vụ TỐN CPU thuần, nguồn chia đều được (ArrayList/mảng), và phải ĐO trước."},

{topic: M, question: "Vì sao record KHÔNG dùng làm entity JPA được?",
 options: [
  "Vì JPA cần constructor rỗng, cần field sửa được để gán id sau insert, và cần tạo proxy bằng lớp con — record là final và bất biến",
  "Vì record không hỗ trợ annotation nên không thể đặt @Entity, @Id hay @Column lên các thành phần của nó",
  "Vì record không thể cài đặt Serializable, trong khi mọi entity JPA bắt buộc phải tuần tự hóa được",
  "Thật ra record dùng làm entity rất tốt và được Hibernate 6 khuyến khích nhờ equals/hashCode có sẵn"],
 correct: 0,
 explain: "Record vi phạm cả bốn yêu cầu. Ngoài ra equals theo MỌI trường xung đột với ngữ nghĩa định danh của entity. Record hợp làm DTO, projection, value object, khóa Map, và các nhánh trong sealed interface. Nhớ: accessor là name() chứ không phải getName()."},

{topic: M, question: "Với sealed interface và switch pattern matching, vì sao KHÔNG nên viết nhánh default?",
 options: [
  "Vì có default thì trình biên dịch không còn kiểm tra tính vét cạn, nên thêm một lớp con mới sẽ không bị báo lỗi ở đâu cả",
  "Vì nhánh default gây lỗi biên dịch khi switch trên một kiểu sealed đã liệt kê đủ mọi lớp con của nó",
  "Vì default làm chậm quá trình so khớp mẫu, do JVM phải kiểm tra tuần tự tất cả các nhánh trước đó",
  "Vì default sẽ nuốt mất giá trị null, khiến switch không ném NullPointerException như hành vi mong đợi"],
 correct: 0,
 explain: "Giá trị lớn nhất của sealed là kiểm tra vét cạn lúc BIÊN DỊCH: thêm một loại mới thì compiler chỉ ra TẤT CẢ chỗ cần cập nhật. Viết default là tự tắt cơ chế đó và lỗi lại lùi về runtime. Riêng null vẫn phải xử lý bằng 'case null'."},

{topic: M, question: "Hiện tượng 'pinning' của virtual thread trong Java 21 là gì?",
 options: [
  "Luồng ảo bị chặn trong khối synchronized hoặc trong lời gọi native thì KHÔNG gỡ được khỏi luồng mang, làm mất hết lợi ích",
  "Luồng ảo được cố định vĩnh viễn vào một lõi CPU cụ thể để tăng hiệu quả bộ nhớ đệm khi xử lý lô lớn",
  "Nhiều luồng ảo bị gắn cùng vào một luồng mang duy nhất khiến chúng phải chờ nhau theo thứ tự tạo ra",
  "Luồng ảo giữ tham chiếu tới ThreadLocal sau khi kết thúc, gây rò rỉ bộ nhớ trong ứng dụng chạy dài"],
 correct: 0,
 explain: "Cơ chế của virtual thread là GỠ khỏi carrier thread khi chặn. synchronized và native frame chặn việc gỡ đó. Chữa bằng ReentrantLock ở các đoạn có IO; phát hiện bằng -Djdk.tracePinnedThreads=full. (Java 24 đã xử lý phần lớn vấn đề này.)"},

{topic: M, question: "Với virtual thread, cách quản lý luồng nào là đúng?",
 options: [
  "KHÔNG pool chúng — tạo mới cho mỗi tác vụ qua newVirtualThreadPerTaskExecutor; muốn giới hạn tài nguyên thì dùng Semaphore",
  "Vẫn pool như luồng thường nhưng đặt kích thước lớn hơn nhiều, khoảng vài nghìn luồng cho mỗi ứng dụng",
  "Tạo một luồng ảo duy nhất cho mỗi lõi CPU rồi tự lập lịch các tác vụ lên chúng bằng hàng đợi riêng",
  "Dùng chung ForkJoinPool.commonPool cho luồng ảo để tận dụng cơ chế work-stealing đã được tối ưu sẵn"],
 correct: 0,
 explain: "Luồng ảo rẻ tới mức pool trở nên vô nghĩa (pool sinh ra để tái dùng thứ đắt tiền). Nhưng vẫn cần giới hạn TÀI NGUYÊN chia sẻ như connection DB — việc đó dùng Semaphore. Lưu ý: bật virtual thread mà giữ pool 10 kết nối thì nút cổ chai chỉ dịch chỗ."},

{topic: M, question: "Lưu thời điểm tạo bản ghi (createdAt) thì nên dùng kiểu nào của java.time?",
 options: [
  "Instant — vì nó là một điểm tuyệt đối trên trục thời gian theo UTC, không phụ thuộc múi giờ của máy chủ",
  "LocalDateTime — vì nó gọn nhất, ánh xạ thẳng sang kiểu timestamp của DB và dễ định dạng khi hiển thị",
  "ZonedDateTime — vì cần lưu kèm múi giờ của người dùng để hiển thị lại đúng giờ địa phương của họ",
  "Date của java.util — vì đây vẫn là kiểu được mọi driver JDBC và thư viện tuần tự hóa hỗ trợ tốt nhất"],
 correct: 0,
 explain: "LocalDateTime KHÔNG xác định một điểm thật trên trục thời gian — đây là lỗi chọn kiểu phổ biến nhất. Quy tắc: lưu UTC (Instant + cột timestamptz), chỉ đổi sang giờ địa phương ở tầng hiển thị. Đừng bao giờ dựa vào múi giờ mặc định của máy chủ."},

{topic: M, question: "Từ khóa var trong Java 10 có ý nghĩa gì?",
 options: [
  "Suy luận kiểu lúc BIÊN DỊCH cho biến cục bộ — kiểu vẫn tĩnh và cố định, chỉ là không phải viết ra",
  "Biến trở thành kiểu động như trong JavaScript, có thể gán lại giá trị thuộc kiểu khác trong cùng phạm vi",
  "Biến được coi là Object và trình biên dịch tự chèn lệnh ép kiểu mỗi khi nó được sử dụng tới",
  "Biến được đánh dấu là bất biến giống final, và mọi nỗ lực gán lại giá trị đều gây lỗi biên dịch"],
 correct: 0,
 explain: "var KHÔNG phải kiểu động — Java vẫn là ngôn ngữ kiểu tĩnh. Nó chỉ dùng được cho biến cục bộ, biến đếm vòng lặp và try-with-resources; không dùng cho field, tham số hay kiểu trả về. Nguyên tắc: đọc dễ hơn thì dùng, mờ nghĩa thì viết rõ kiểu."},

{topic: M, question: "switch expression (dùng mũi tên ->) khác switch statement truyền thống ở điểm nào?",
 options: [
  "Nó TRẢ VỀ giá trị và không rơi tầng nên không cần break; với enum thì trình biên dịch còn bắt buộc phải vét cạn",
  "Nó chỉ là cú pháp viết tắt của switch cũ, vẫn rơi tầng như thường nên vẫn phải đặt break ở cuối mỗi nhánh",
  "Nó chạy nhanh hơn vì trình biên dịch luôn dịch thành bảng nhảy, trong khi switch cũ dịch thành chuỗi so sánh",
  "Nó chỉ hoạt động với kiểu enum và chuỗi ký tự, còn với số nguyên thì bắt buộc phải dùng switch truyền thống"],
 correct: 0,
 explain: "Ba lợi ích: là biểu thức (gán được vào biến), không rơi tầng (xóa hẳn một lớp bug kinh điển), và kiểm tra vét cạn với enum/sealed. Cần nhiều dòng trong một nhánh thì dùng khối { ... yield giaTri; }."},

{topic: M, question: "Sequenced Collections (Java 21) mang lại điều gì?",
 options: [
  "API thống nhất getFirst/getLast/addFirst/addLast/reversed cho List, Deque và LinkedHashMap/LinkedHashSet",
  "Một kiểu collection mới bảo đảm thứ tự sắp xếp tự động theo khóa mà không cần dùng tới TreeMap",
  "Cơ chế đánh số thứ tự tự động cho từng phần tử, giúp truy cập theo chỉ số trên cả cấu trúc liên kết",
  "Phiên bản an toàn đa luồng của các collection có thứ tự, thay thế cho Collections.synchronizedList"],
 correct: 0,
 explain: "Trước đây lấy phần tử cuối mỗi kiểu một khác: list.get(list.size()-1), deque.getLast(), còn LinkedHashSet thì phải duyệt hết. SequencedCollection/SequencedSet/SequencedMap thống nhất lại, cộng thêm reversed() trả về khung nhìn đảo ngược."}

];
