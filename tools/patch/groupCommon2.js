// Nhóm bài toán THÔNG DỤNG hay gặp khi phỏng vấn — phần 2: Collections & Java API (vòng coding thực tế).
module.exports = [

{
  group: "Hay gặp nhất — Collections & Java API",
  items: [

  {
    name: "Sắp xếp danh sách đối tượng theo nhiều tiêu chí (Comparator)",
    diff: "Dễ", tags: "java collections comparator stream",
    complexity: "Thời gian: O(n log n) · Bộ nhớ: O(n) do TimSort",
    idea: "Bài coding phổ biến nhất ở vòng phỏng vấn Java: cho danh sách nhân viên, sắp theo phòng ban tăng dần, cùng phòng thì lương giảm dần, cùng lương thì theo tên. Chuỗi Comparator.comparing().thenComparing() là câu trả lời chuẩn.",
    steps: [
      "Comparator.comparing(Employee::getDepartment) cho tiêu chí chính.",
      "Nối .thenComparing(Employee::getSalary, Comparator.reverseOrder()) cho tiêu chí phụ giảm dần.",
      "Nối tiếp .thenComparing(Employee::getName) để kết quả ổn định, dễ kiểm thử.",
      "Gọi list.sort(cmp) — sửa tại chỗ, hoặc stream().sorted(cmp) nếu muốn danh sách mới."
    ],
    trap: "reversed() đặt ở CUỐI chuỗi sẽ đảo NGƯỢC TOÀN BỘ chuỗi so sánh, không chỉ tiêu chí cuối — muốn đảo riêng một tiêu chí thì truyền Comparator.reverseOrder() vào chính thenComparing đó. Với trường số nên dùng comparingInt/comparingDouble để tránh chi phí đóng hộp. Arrays.asList() trả về danh sách CỐ ĐỊNH KÍCH THƯỚC, còn List.of() thì BẤT BIẾN — sort() trên List.of ném UnsupportedOperationException.",
    alt: {
      title: "Cách khác — Comparable (thứ tự tự nhiên) và xử lý giá trị null",
      complexity: "O(n log n)",
      note: "Comparable dùng khi lớp có MỘT thứ tự tự nhiên duy nhất (ví dụ mã đơn hàng); Comparator dùng khi cần nhiều cách sắp khác nhau. Trường có thể null phải bọc bằng Comparator.nullsFirst/nullsLast, nếu không sẽ ném NullPointerException giữa lúc sắp xếp.",
      java: `class Employee implements Comparable<Employee> {
    String name, department;
    double salary;

    @Override
    public int compareTo(Employee other) {
        return this.name.compareTo(other.name);   // thứ tự tự nhiên
    }
}

// Trường có thể null:
Comparator<Employee> safe = Comparator.comparing(
        Employee::getDepartment,
        Comparator.nullsLast(Comparator.naturalOrder()));

// Sắp xếp ngược toàn bộ:
list.sort(Comparator.comparing(Employee::getSalary).reversed());`
    },
    java: `List<Employee> sortEmployees(List<Employee> list) {
    Comparator<Employee> cmp = Comparator
        .comparing(Employee::getDepartment)                              // phòng ban tăng dần
        .thenComparing(Employee::getSalary, Comparator.reverseOrder())   // lương GIẢM dần
        .thenComparing(Employee::getName);                               // ổn định kết quả

    return list.stream().sorted(cmp).collect(Collectors.toList());
}

// Sửa tại chỗ (không tạo danh sách mới):
// employees.sort(Comparator.comparingDouble(Employee::getSalary).reversed());`,
    js: `function sortEmployees(list) {
  return [...list].sort((a, b) =>
    a.department.localeCompare(b.department) ||
    b.salary - a.salary ||
    a.name.localeCompare(b.name)
  );
}`
  },

  {
    name: "Đếm tần suất từ & lấy top-N bằng Stream",
    diff: "Trung bình", tags: "java stream groupingby top-n",
    complexity: "Thời gian: O(n + m log m) với m là số từ khác nhau",
    idea: "Cho một đoạn văn bản, đếm số lần xuất hiện mỗi từ rồi in ra 3 từ hay gặp nhất. Bài này kiểm tra luôn cả Stream API lẫn cách sắp xếp Map theo VALUE — thứ mà Map không hỗ trợ trực tiếp.",
    steps: [
      "Tách từ bằng split trên biểu thức chính quy, đưa về chữ thường.",
      "Collectors.groupingBy(từ, Collectors.counting()) để có Map<String, Long>.",
      "Đưa entrySet vào stream, sắp theo value giảm dần rồi limit(n).",
      "Gom lại bằng LinkedHashMap để GIỮ thứ tự đã sắp."
    ],
    trap: "Gom kết quả đã sắp xếp vào Collectors.toMap() mặc định sẽ MẤT thứ tự vì đó là HashMap — bắt buộc chỉ định LinkedHashMap::new. toMap còn ném IllegalStateException khi trùng khóa nếu không truyền hàm gộp. Khi n rất lớn mà N nhỏ thì min-heap O(n log N) tốt hơn sắp xếp toàn bộ.",
    alt: {
      title: "Cách khác — vòng lặp thuần với merge(), và min-heap cho top-N",
      complexity: "Đếm O(n) · Top-N bằng heap O(m log N)",
      note: "map.merge(key, 1, Integer::sum) là cách đếm gọn nhất không cần Stream, chạy nhanh hơn hẳn. Với dữ liệu lớn (log, sự kiện) thì min-heap giữ đúng N phần tử tránh phải sắp xếp cả triệu khóa.",
      java: `Map<String, Integer> countWords(String text) {
    Map<String, Integer> freq = new HashMap<>();
    for (String w : text.toLowerCase().split("\\\\W+")) {
        if (!w.isEmpty()) freq.merge(w, 1, Integer::sum);
    }
    return freq;
}

List<Map.Entry<String, Integer>> topN(Map<String, Integer> freq, int n) {
    PriorityQueue<Map.Entry<String, Integer>> minHeap =
        new PriorityQueue<>(Map.Entry.comparingByValue());

    for (Map.Entry<String, Integer> e : freq.entrySet()) {
        minHeap.offer(e);
        if (minHeap.size() > n) minHeap.poll();   // bỏ phần tử nhỏ nhất
    }
    List<Map.Entry<String, Integer>> res = new ArrayList<>(minHeap);
    res.sort(Map.Entry.<String, Integer>comparingByValue().reversed());
    return res;
}`
    },
    java: `Map<String, Long> topWords(String text, int n) {
    Map<String, Long> freq = Arrays.stream(text.toLowerCase().split("\\\\W+"))
        .filter(w -> !w.isEmpty())
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

    return freq.entrySet().stream()
        .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
        .limit(n)
        .collect(Collectors.toMap(
            Map.Entry::getKey,
            Map.Entry::getValue,
            (a, b) -> a,
            LinkedHashMap::new));      // BẮT BUỘC để giữ thứ tự đã sắp
}`,
    js: `function topWords(text, n) {
  const freq = new Map();
  for (const w of text.toLowerCase().split(/\\W+/)) {
    if (w) freq.set(w, (freq.get(w) || 0) + 1);
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}`
  },

  {
    name: "Xóa phần tử khi đang duyệt (ConcurrentModificationException)",
    diff: "Trung bình", tags: "java collections iterator fail-fast",
    complexity: "removeIf O(n) trên ArrayList · O(n²) nếu gọi remove() trong vòng lặp",
    idea: "Câu hỏi bẫy gần như chắc chắn xuất hiện: 'xóa mọi phần tử thỏa điều kiện khỏi một List'. Viết list.remove() trong vòng for-each sẽ ném ConcurrentModificationException — phải dùng Iterator.remove() hoặc removeIf().",
    steps: [
      "Cách gọn nhất: list.removeIf(điều kiện) — có từ Java 8.",
      "Cách thủ công: lấy Iterator, gọi it.next() rồi it.remove().",
      "Không bao giờ gọi collection.remove() bên trong vòng for-each.",
      "Trong môi trường đa luồng: dùng CopyOnWriteArrayList hoặc ConcurrentHashMap."
    ],
    trap: "Cơ chế fail-fast dựa trên biến đếm modCount, và nó KHÔNG được đảm bảo 100% — xóa phần tử ÁP CHÓT có thể lọt qua mà không ném lỗi, cho ra kết quả sai âm thầm. Đây chính là điều người phỏng vấn muốn nghe. Ngoài ra Arrays.asList() và List.of() không cho phép xóa.",
    alt: {
      title: "Cách khác — lọc ra danh sách mới, và bản an toàn cho đa luồng",
      complexity: "O(n) nhưng tốn thêm O(n) bộ nhớ",
      note: "Lọc bằng Stream không đụng tới danh sách gốc nên an toàn tuyệt đối, hợp phong cách lập trình hàm. Khi nhiều luồng cùng duyệt và sửa thì dùng CopyOnWriteArrayList (đọc nhiều, ghi ít) hoặc ConcurrentHashMap.",
      java: `// 1. Lọc ra danh sách MỚI, không đụng danh sách gốc
List<String> kept = list.stream()
    .filter(s -> !s.startsWith("tmp_"))
    .collect(Collectors.toList());

// 2. Đa luồng: bản sao khi ghi
List<String> safe = new CopyOnWriteArrayList<>(list);
for (String s : safe) {
    if (s.isEmpty()) safe.remove(s);      // không ném ngoại lệ
}

// 3. Duyệt ngược bằng chỉ số cũng an toàn với ArrayList
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i).isEmpty()) list.remove(i);
}`
    },
    java: `// SAI — ném ConcurrentModificationException
// for (String s : list) {
//     if (s.isEmpty()) list.remove(s);
// }

// ĐÚNG 1 — gọn nhất (Java 8+)
list.removeIf(String::isEmpty);

// ĐÚNG 2 — Iterator, dùng được khi cần logic phức tạp hơn
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.isEmpty()) it.remove();     // gọi trên ITERATOR, không phải list
}

// Với Map cũng vậy:
map.entrySet().removeIf(e -> e.getValue() == null);`,
    js: `// JS không có fail-fast nhưng splice khi đang duyệt vẫn gây bỏ sót phần tử
// SAI: arr.forEach((s, i) => { if (!s) arr.splice(i, 1); });

// ĐÚNG 1 — tạo mảng mới
const kept = arr.filter(s => s !== "");

// ĐÚNG 2 — duyệt ngược nếu bắt buộc sửa tại chỗ
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] === "") arr.splice(i, 1);
}`
  },

  {
    name: "Loại phần tử trùng theo một trường, giữ nguyên thứ tự",
    diff: "Dễ", tags: "java collections distinct equals-hashcode",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n)",
    idea: "Với kiểu nguyên thủy thì LinkedHashSet là xong. Với đối tượng thì bẫy nằm ở chỗ distinct() dựa vào equals/hashCode — muốn lọc trùng theo MỘT trường (ví dụ theo email) thì phải tự dựng bộ lọc bằng Set các khóa đã gặp.",
    steps: [
      "Kiểu đơn giản: new ArrayList<>(new LinkedHashSet<>(list)).",
      "Theo một trường: tạo Set<Key> seen, giữ phần tử khi seen.add(key) trả về true.",
      "Cách khác: toMap(khóa, phần tử, giữ cái đầu, LinkedHashMap::new) rồi lấy values()."
    ],
    trap: "distinct() của Stream dùng equals/hashCode — lớp không override thì mọi đối tượng đều 'khác nhau' và không lọc được gì. Nếu override equals mà quên hashCode thì HashSet/HashMap hoạt động SAI (hai đối tượng bằng nhau rơi vào hai ô khác nhau). Hai hàm này luôn phải đi cùng nhau.",
    alt: {
      title: "Cách khác — override equals/hashCode và dùng record",
      complexity: "O(n)",
      note: "Nếu tính chất 'trùng' là bản chất của lớp thì override equals/hashCode để distinct() dùng được luôn. Từ Java 16, record tự sinh sẵn equals/hashCode/toString đúng chuẩn — hết hẳn nhóm lỗi này.",
      java: `class User {
    private final String email;
    private final String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return Objects.equals(email, ((User) o).email);   // định danh theo email
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);      // PHẢI dùng đúng trường như equals
    }
}

// Java 16+: record tự sinh equals/hashCode theo mọi thành phần
record Point(int x, int y) {}

List<User> unique = users.stream().distinct().collect(Collectors.toList());`
    },
    java: `// 1. Kiểu đơn giản — giữ nguyên thứ tự xuất hiện
List<String> unique = new ArrayList<>(new LinkedHashSet<>(list));

// 2. Lọc trùng theo MỘT trường (ví dụ theo email)
public static <T, K> Predicate<T> distinctByKey(Function<T, K> keyExtractor) {
    Set<K> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));   // add trả false nếu đã có
}

List<User> uniqueUsers = users.stream()
    .filter(distinctByKey(User::getEmail))
    .collect(Collectors.toList());

// 3. Cách khác — giữ phần tử ĐẦU TIÊN của mỗi khóa
Collection<User> byEmail = users.stream()
    .collect(Collectors.toMap(
        User::getEmail,
        Function.identity(),
        (first, second) -> first,
        LinkedHashMap::new))
    .values();`,
    js: `// Kiểu đơn giản
const unique = [...new Set(list)];

// Theo một trường, giữ phần tử đầu tiên
function distinctBy(arr, keyFn) {
  const seen = new Set();
  return arr.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}`
  },

  {
    name: "Nhóm danh sách theo khóa & tính tổng (groupingBy)",
    diff: "Trung bình", tags: "java stream groupingby tong-hop",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(số nhóm)",
    idea: "Bài kiểu 'báo cáo': cho danh sách đơn hàng, tính tổng doanh thu theo từng khách, đếm số đơn theo trạng thái, tìm đơn lớn nhất mỗi tháng. Đây là dạng câu hỏi Java thực tế hay gặp nhất sau Comparator.",
    steps: [
      "groupingBy(khóa) → Map<K, List<T>>.",
      "Thêm collector tầng hai: counting(), summingInt(), averagingDouble(), mapping(...), maxBy(...).",
      "Nhóm hai tầng: groupingBy(k1, groupingBy(k2)).",
      "partitioningBy(điều kiện) khi chỉ cần chia làm hai nhóm true/false."
    ],
    trap: "maxBy/minBy trả về Optional — muốn lấy thẳng giá trị phải bọc thêm collectingAndThen. groupingBy KHÔNG đảm bảo thứ tự khóa; cần thứ tự thì truyền TreeMap::new hoặc LinkedHashMap::new. summingInt trên số tiền dễ TRÀN — dùng summingLong hoặc reducing với BigDecimal.",
    alt: {
      title: "Cách khác — vòng lặp với computeIfAbsent / merge",
      complexity: "O(n), nhanh hơn Stream và dễ gỡ lỗi hơn",
      note: "Khi logic gom nhóm phức tạp (nhiều điều kiện, nhiều biến tích lũy) thì vòng lặp thuần đọc dễ hơn hẳn chuỗi collector lồng nhau. computeIfAbsent là cách chuẩn để dựng Map<K, List<V>>.",
      java: `// Map<K, List<V>> theo cách thủ công
Map<String, List<Order>> byCustomer = new HashMap<>();
for (Order o : orders) {
    byCustomer.computeIfAbsent(o.getCustomerId(), k -> new ArrayList<>()).add(o);
}

// Cộng dồn tổng tiền
Map<String, BigDecimal> revenue = new HashMap<>();
for (Order o : orders) {
    revenue.merge(o.getCustomerId(), o.getAmount(), BigDecimal::add);
}

// Đếm theo trạng thái
Map<String, Integer> countByStatus = new HashMap<>();
for (Order o : orders) {
    countByStatus.merge(o.getStatus(), 1, Integer::sum);
}`
    },
    java: `// 1. Nhóm đơn theo khách hàng
Map<String, List<Order>> byCustomer = orders.stream()
    .collect(Collectors.groupingBy(Order::getCustomerId));

// 2. Tổng tiền theo khách (dùng long để không tràn)
Map<String, Long> revenue = orders.stream()
    .collect(Collectors.groupingBy(Order::getCustomerId,
                                   Collectors.summingLong(Order::getAmount)));

// 3. Đếm đơn theo trạng thái, khóa sắp xếp sẵn
Map<String, Long> countByStatus = orders.stream()
    .collect(Collectors.groupingBy(Order::getStatus, TreeMap::new, Collectors.counting()));

// 4. Đơn có giá trị lớn nhất của mỗi khách (bỏ lớp Optional)
Map<String, Order> biggest = orders.stream()
    .collect(Collectors.groupingBy(Order::getCustomerId,
        Collectors.collectingAndThen(
            Collectors.maxBy(Comparator.comparingLong(Order::getAmount)),
            Optional::get)));

// 5. Chia hai nhóm: đã thanh toán / chưa
Map<Boolean, List<Order>> paidOrNot = orders.stream()
    .collect(Collectors.partitioningBy(Order::isPaid));`,
    js: `// Nhóm theo khách hàng
const byCustomer = orders.reduce((acc, o) => {
  (acc[o.customerId] ||= []).push(o);
  return acc;
}, {});

// Tổng tiền theo khách
const revenue = orders.reduce((acc, o) => {
  acc[o.customerId] = (acc[o.customerId] || 0) + o.amount;
  return acc;
}, {});

// Java 21 tương đương: Object.groupBy(orders, o => o.customerId)`
  },

  {
    name: "Chia danh sách thành các lô nhỏ (batch / partition)",
    diff: "Dễ", tags: "java collections batch sublist",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n) nếu sao chép, O(1) nếu dùng subList",
    idea: "Rất hay gặp trong việc thật: gọi API ngoài chỉ cho tối đa 100 bản ghi mỗi lần, hoặc chèn CSDL theo lô 500 dòng. Người phỏng vấn muốn xem bạn tính chỉ số biên có đúng không.",
    steps: [
      "Duyệt i từ 0, bước nhảy batchSize.",
      "Mỗi lô là subList(i, Math.min(i + batchSize, n)) — Math.min xử lý lô cuối thiếu.",
      "Bọc bằng new ArrayList<>(...) nếu cần lô độc lập với danh sách gốc."
    ],
    trap: "subList trả về một KHUNG NHÌN chứ không phải bản sao — sửa lô sẽ sửa cả danh sách gốc, và nếu danh sách gốc bị đổi kích thước thì khung nhìn ném ConcurrentModificationException. Nhớ chặn batchSize <= 0, nếu không vòng lặp chạy vô hạn.",
    alt: {
      title: "Cách khác — Stream, và thư viện có sẵn",
      complexity: "O(n)",
      note: "Bản Stream gọn nhưng khó đọc hơn. Trong dự án thật thì dùng Lists.partition của Guava hoặc ListUtils.partition của Apache Commons — cả hai đã xử lý sẵn biên và trường hợp rỗng.",
      java: `// Bản Stream
<T> List<List<T>> partitionStream(List<T> list, int size) {
    return IntStream.range(0, (list.size() + size - 1) / size)   // làm tròn LÊN
        .mapToObj(i -> list.subList(i * size, Math.min((i + 1) * size, list.size())))
        .collect(Collectors.toList());
}

// Thư viện:
// Guava:           Lists.partition(list, 100)
// Apache Commons:  ListUtils.partition(list, 100)

// Xử lý theo lô có ý nghĩa thực tế:
for (List<Order> batch : partition(orders, 500)) {
    jdbcTemplate.batchUpdate(SQL, toArgs(batch));   // chèn 500 dòng mỗi lượt
}`
    },
    java: `<T> List<List<T>> partition(List<T> list, int batchSize) {
    if (batchSize <= 0) throw new IllegalArgumentException("batchSize phải > 0");

    List<List<T>> batches = new ArrayList<>();
    for (int i = 0; i < list.size(); i += batchSize) {
        int end = Math.min(i + batchSize, list.size());   // lô cuối có thể thiếu
        batches.add(new ArrayList<>(list.subList(i, end)));   // sao chép cho an toàn
    }
    return batches;
}`,
    js: `function partition(list, batchSize) {
  if (batchSize <= 0) throw new Error("batchSize phải > 0");
  const batches = [];
  for (let i = 0; i < list.length; i += batchSize) {
    batches.push(list.slice(i, i + batchSize));
  }
  return batches;
}`
  },

  {
    name: "Đảo Map (key ↔ value) & tìm khóa có giá trị lớn nhất",
    diff: "Dễ", tags: "java map dao-nguoc entryset",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n)",
    idea: "Map cho phép tra theo khóa cực nhanh nhưng không hỗ trợ tra theo GIÁ TRỊ. Muốn tìm khóa có giá trị lớn nhất, hoặc đảo ngược quan hệ, đều phải duyệt entrySet một lượt.",
    steps: [
      "Tìm khóa lớn nhất: entrySet().stream().max(Map.Entry.comparingByValue()).",
      "Đảo map: duyệt entrySet, put(value, key) — nhớ xử lý giá trị TRÙNG.",
      "Nếu giá trị có thể trùng thì map đảo phải là Map<V, List<K>>."
    ],
    trap: "Đảo map bằng toMap(getValue, getKey) sẽ ném IllegalStateException ngay khi có hai khóa cùng giá trị — luôn phải truyền hàm gộp hoặc gom về List. Luôn duyệt entrySet() chứ đừng duyệt keySet() rồi gọi get() cho từng khóa: cách sau chậm gấp đôi.",
    alt: {
      title: "Cách khác — đảo về Map<V, List<K>>, và cấu trúc BiMap hai chiều",
      complexity: "O(n)",
      note: "Khi giá trị có thể trùng thì gom về danh sách là cách đúng duy nhất. Nếu cần tra được cả hai chiều thường xuyên thì dùng BiMap của Guava — nó tự đảm bảo cả khóa lẫn giá trị đều duy nhất.",
      java: `// Giá trị có thể trùng -> gom về List
Map<Integer, List<String>> byValue = map.entrySet().stream()
    .collect(Collectors.groupingBy(
        Map.Entry::getValue,
        Collectors.mapping(Map.Entry::getKey, Collectors.toList())));

// Guava BiMap: tra được cả hai chiều
// BiMap<String, Integer> bi = HashBiMap.create();
// bi.put("a", 1);
// bi.inverse().get(1);   -> "a"

// Sắp xếp map theo giá trị giảm dần, giữ thứ tự
LinkedHashMap<String, Integer> sorted = map.entrySet().stream()
    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                              (a, b) -> a, LinkedHashMap::new));`
    },
    java: `// 1. Khóa có giá trị lớn nhất
String keyOfMax(Map<String, Integer> map) {
    return map.entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .map(Map.Entry::getKey)
        .orElse(null);
}

// 2. Đảo map khi giá trị DUY NHẤT
Map<Integer, String> invert(Map<String, Integer> map) {
    Map<Integer, String> inverted = new HashMap<>();
    for (Map.Entry<String, Integer> e : map.entrySet()) {   // duyệt entrySet, không phải keySet
        String old = inverted.put(e.getValue(), e.getKey());
        if (old != null) throw new IllegalStateException("Giá trị bị trùng: " + e.getValue());
    }
    return inverted;
}`,
    js: `function keyOfMax(map) {
  let bestKey = null, bestVal = -Infinity;
  for (const [k, v] of Object.entries(map)) {
    if (v > bestVal) { bestVal = v; bestKey = k; }
  }
  return bestKey;
}

function invert(map) {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}`
  },

  {
    name: "Đọc file lớn từng dòng & đếm, không nạp hết vào RAM",
    diff: "Trung bình", tags: "java io stream try-with-resources",
    complexity: "Thời gian: O(số dòng) · Bộ nhớ: O(1) cho phần đọc",
    idea: "Câu hỏi thực tế hay gặp: 'file log 10GB, đếm số lần xuất hiện mỗi mã lỗi'. Điểm mấu chốt là ĐỌC TỪNG DÒNG (Files.lines hoặc BufferedReader) chứ không Files.readAllLines — cách sau nạp cả file vào RAM và gây OutOfMemoryError.",
    steps: [
      "Mở luồng bằng try-with-resources để chắc chắn đóng file.",
      "Files.lines(path) trả về Stream<String> đọc LƯỜI từng dòng.",
      "Xử lý và tích lũy kết quả bằng collector hoặc map đếm.",
      "Chỉ giữ trong bộ nhớ phần TỔNG HỢP, không giữ dữ liệu thô."
    ],
    trap: "Files.readAllLines nạp toàn bộ file — chết ngay với file lớn. Stream trả về từ Files.lines GIỮ file handle nên bắt buộc đặt trong try-with-resources, nếu không sẽ rò rỉ tài nguyên. Nhớ chỉ định charset (UTF-8), đừng phụ thuộc mã hóa mặc định của hệ điều hành.",
    alt: {
      title: "Cách khác — BufferedReader, và xử lý song song",
      complexity: "O(số dòng); song song chia được theo lõi CPU",
      note: "BufferedReader kiểm soát được từng dòng, tiện khi cần bỏ qua dòng lỗi mà vẫn chạy tiếp. Chỉ dùng parallel() khi phần xử lý mỗi dòng thực sự nặng — với việc đếm đơn giản thì chi phí đồng bộ còn làm chậm hơn.",
      java: `// BufferedReader: bỏ qua dòng hỏng mà vẫn chạy tiếp
try (BufferedReader br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    String line;
    long lineNo = 0;
    while ((line = br.readLine()) != null) {
        lineNo++;
        try {
            process(line);
        } catch (Exception e) {
            log.warn("Bỏ qua dòng {} bị lỗi: {}", lineNo, e.getMessage());
        }
    }
}

// Xử lý song song — chỉ đáng khi mỗi dòng tốn nhiều CPU
try (Stream<String> lines = Files.lines(path, StandardCharsets.UTF_8)) {
    Map<String, Long> result = lines.parallel()
        .map(this::extractErrorCode)
        .collect(Collectors.groupingByConcurrent(Function.identity(),
                                                 Collectors.counting()));
}`
    },
    java: `Map<String, Long> countErrorCodes(Path path) throws IOException {
    // try-with-resources: Stream của Files.lines GIỮ file handle, phải đóng
    try (Stream<String> lines = Files.lines(path, StandardCharsets.UTF_8)) {
        return lines
            .filter(l -> l.contains("ERROR"))
            .map(l -> l.split("\\\\|")[2].trim())      // tách lấy mã lỗi
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }
}

// TRÁNH với file lớn:
// List<String> all = Files.readAllLines(path);   // nạp cả file vào RAM`,
    js: `// Node.js: đọc theo dòng bằng readline, không nạp cả file
const fs = require("fs");
const readline = require("readline");

async function countErrorCodes(filePath) {
  const counts = new Map();
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath, "utf8"),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.includes("ERROR")) continue;
    const code = line.split("|")[2].trim();
    counts.set(code, (counts.get(code) || 0) + 1);
  }
  return counts;
}`
  }

  ]
}

];
