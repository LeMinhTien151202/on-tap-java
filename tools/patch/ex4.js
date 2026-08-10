// Bổ sung 2 ví dụ mẫu cho ba nhóm "Hay gặp nhất": Chuỗi & Số, Mảng & Ma trận, Collections & Java API.
// Dùng: node tools/algo_patch.js tools/patch/ex4.js
module.exports = {
  "Đảo ngược chuỗi (reverse string)": { examples: [
    { input: "s = \"hello\"", output: "\"olleh\"",
      note: "Hai con trỏ đổi chỗ từ hai đầu vào giữa — O(n/2) phép đổi, O(1) bộ nhớ nếu làm trên char[]." },
    { input: "s = \"cà phê\"", output: "\"êhp àc\"",
      note: "Với ký tự ngoài BMP (emoji, một số chữ Hán hiếm) thì đảo theo char sẽ VỠ cặp surrogate — phải đảo theo code point. Nêu ra điểm này là điểm cộng lớn." }
  ] },
  "Kiểm tra chuỗi đối xứng (palindrome)": { examples: [
    { input: "s = \"racecar\"", output: "true",
      note: "So s[i] với s[n-1-i] tới giữa chuỗi. Không cần tạo chuỗi đảo — tốn thêm O(n) bộ nhớ vô ích." },
    { input: "s = \"Nhật ký Nam\" (bỏ dấu, bỏ hoa thường, bỏ khoảng trắng)", output: "false",
      note: "Luôn hỏi lại đề: có bỏ qua hoa/thường không, có bỏ dấu câu không. Cùng một chuỗi cho kết quả khác nhau tùy quy ước." }
  ] },
  "Ký tự không lặp đầu tiên & đếm tần suất": { examples: [
    { input: "s = \"swiss\"", output: "'w'",
      note: "Đếm tần suất trước, rồi duyệt LẠI CHUỖI GỐC lấy ký tự đầu tiên có đếm bằng 1. Duyệt map thay vì chuỗi sẽ mất đúng thứ tự." },
    { input: "s = \"aabb\"", output: "không có (trả -1 hoặc ký tự rỗng)",
      note: "Mọi ký tự đều lặp. Phải quy ước rõ giá trị trả về trong ca này — LeetCode 387 yêu cầu trả -1." }
  ] },
  "Nén chuỗi (aaabbc → a3b2c1)": { examples: [
    { input: "s = \"aaabbc\"", output: "\"a3b2c1\"",
      note: "Đếm số lần lặp liên tiếp rồi ghi ký tự kèm số đếm. Dùng StringBuilder, nối chuỗi bằng += trong vòng lặp là O(n²)." },
    { input: "s = \"abc\"", output: "\"abc\"",
      note: "Chuỗi nén (\"a1b1c1\") DÀI HƠN chuỗi gốc nên phải trả bản gốc — yêu cầu này có trong đề Cracking the Coding Interview và hay bị bỏ sót." }
  ] },
  "Đảo thứ tự các từ trong câu": { examples: [
    { input: "s = \"  the sky   is blue  \"", output: "\"blue is sky the\"",
      note: "Phải cắt khoảng trắng thừa ở hai đầu VÀ gộp nhiều khoảng trắng giữa các từ thành một. split(\"\\\\s+\") xử lý gọn." },
    { input: "s = \"hello\"", output: "\"hello\"",
      note: "Một từ duy nhất giữ nguyên. Cách O(1) bộ nhớ: đảo toàn bộ chuỗi rồi đảo lại từng từ — mẹo cổ điển hay được hỏi thêm." }
  ] },
  "Số nguyên tố & Sàng Eratosthenes": { examples: [
    { input: "isPrime(97)", output: "true",
      note: "Chỉ cần thử ước tới căn bậc hai của n (i·i <= n). Với 97 thì chỉ thử tới 9 — 5 phép chia thay vì 96." },
    { input: "sàng Eratosthenes với n = 30", output: "[2,3,5,7,11,13,17,19,23,29] — 10 số",
      note: "Sàng cho toàn bộ số nguyên tố ≤ n trong O(n log log n), nhanh hơn hẳn kiểm tra từng số. Vòng trong bắt đầu từ i·i chứ không phải 2·i." }
  ] },
  "Ước chung lớn nhất & bội chung nhỏ nhất (Euclid)": { examples: [
    { input: "gcd(48, 18)", output: "6",
      note: "Euclid: gcd(48,18) = gcd(18,12) = gcd(12,6) = gcd(6,0) = 6. Chỉ 4 bước nhờ dùng phép chia dư." },
    { input: "lcm(4, 6)", output: "12",
      note: "lcm(a,b) = a / gcd(a,b) * b — CHIA TRƯỚC rồi mới nhân để tránh tràn số. Viết a*b/gcd sẽ tràn với hai số lớn." }
  ] },
  "Đảo ngược số nguyên & tổng chữ số (Armstrong)": { examples: [
    { input: "reverse(123)", output: "321",
      note: "Lặp: result = result*10 + n%10 rồi n /= 10. Phải kiểm tra tràn TRƯỚC khi nhân nếu đề dùng int (LeetCode 7 yêu cầu trả 0 khi tràn)." },
    { input: "isArmstrong(153)", output: "true",
      note: "1³ + 5³ + 3³ = 153. Số mũ bằng SỐ CHỮ SỐ chứ không cố định là 3 — với 9474 thì phải mũ 4." }
  ] },
  "Chuyển đổi nhị phân ↔ thập phân (không dùng thư viện)": { examples: [
    { input: "toBinary(13)", output: "\"1101\"",
      note: "Chia dư 2 liên tiếp rồi ĐẢO NGƯỢC chuỗi thu được: 13→1, 6→0, 3→1, 1→1 đọc ngược là 1101." },
    { input: "toDecimal(\"1101\")", output: "13",
      note: "Horner: result = result*2 + (c - '0'). Với n = 0 thì vòng while không chạy nên phải trả \"0\" riêng — ca biên bắt buộc." }
  ] },

  "Tìm giá trị lớn nhất & lớn thứ nhì trong mảng": { examples: [
    { input: "arr = [12, 35, 1, 10, 34, 1]", output: "max = 35, second = 34",
      note: "Một lượt duyệt với hai biến: gặp số lớn hơn max thì đẩy max cũ xuống second. Không cần sắp xếp O(n log n)." },
    { input: "arr = [5, 5, 5]", output: "max = 5, second = không tồn tại",
      note: "Phải quy ước rõ: 'lớn thứ nhì' là giá trị KHÁC max hay chỉ là phần tử ở vị trí thứ hai sau khi sắp? Hỏi lại đề trước khi code." }
  ] },
  "Xóa phần tử trùng trong mảng đã sắp xếp": { examples: [
    { input: "nums = [1,1,2]", output: "k = 2, mảng đầu là [1,2,...]",
      note: "Con trỏ chậm k chỉ tăng khi gặp giá trị MỚI. Đề chỉ yêu cầu k phần tử đầu đúng, phần đuôi không quan trọng." },
    { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "k = 5, mảng đầu là [0,1,2,3,4,...]",
      note: "Chỉ đúng vì mảng ĐÃ SẮP nên phần tử trùng luôn nằm cạnh nhau. Mảng chưa sắp thì bắt buộc dùng HashSet." }
  ] },
  "Xoay ma trận 90 độ tại chỗ": { examples: [
    { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]",
      note: "Hai bước: chuyển vị (đổi qua đường chéo chính) rồi đảo NGƯỢC từng hàng. Xoay 90° theo chiều kim đồng hồ." },
    { input: "matrix = [[1,2],[3,4]] xoay NGƯỢC chiều kim đồng hồ", output: "[[2,4],[1,3]]",
      note: "Ngược chiều thì đổi thứ tự: chuyển vị rồi đảo từng CỘT (hoặc đảo hàng trước rồi chuyển vị). Nhớ nhầm chiều là mất điểm dù ý tưởng đúng." }
  ] },
  "Duyệt ma trận theo hình xoắn ốc": { examples: [
    { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]",
      note: "Bốn biên top, bottom, left, right co dần vào trong. Sau mỗi cạnh thì thu biên tương ứng lại một đơn vị." },
    { input: "matrix = [[1,2,3,4]]", output: "[1,2,3,4]",
      note: "Ma trận một hàng: sau khi đi cạnh trên thì top > bottom, phải KIỂM TRA điều kiện trước khi đi cạnh dưới, nếu không sẽ đọc lại các phần tử." }
  ] },
  "Xoay mảng k bước sang phải": { examples: [
    { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]",
      note: "Ba lần đảo: đảo cả mảng, đảo k phần tử đầu, đảo phần còn lại. O(n) thời gian, O(1) bộ nhớ." },
    { input: "nums = [1,2], k = 5", output: "[2,1]",
      note: "k LỚN HƠN độ dài mảng nên phải lấy k %= n (5 % 2 = 1). Quên dòng này là lỗi ngoài phạm vi mảng ngay lập tức." }
  ] },
  "Gộp hai mảng đã sắp xếp (merge tại chỗ)": { examples: [
    { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]",
      note: "Ghi từ CUỐI về đầu để không đè lên phần tử chưa xử lý của nums1 — đây là mấu chốt của bài." },
    { input: "nums1 = [0], m = 0, nums2 = [1], n = 1", output: "[1]",
      note: "nums1 không có phần tử thật. Sau vòng lặp chính, nếu nums2 còn dư thì phải chép nốt; nums1 dư thì không cần vì đã nằm đúng chỗ." }
  ] },
  "Tổng lớn nhất của dãy con k phần tử liên tiếp": { examples: [
    { input: "nums = [2,1,5,1,3,2], k = 3", output: "9",
      note: "Cửa sổ [5,1,3]. Trượt cửa sổ: cộng phần tử mới, trừ phần tử rơi ra — O(n) thay vì O(n·k)." },
    { input: "nums = [-1,-2,-3], k = 2", output: "-3",
      note: "Toàn số âm thì đáp án vẫn âm. Khởi tạo max bằng tổng cửa sổ ĐẦU TIÊN chứ đừng đặt 0, nếu không sẽ trả 0 và sai." }
  ] },
  "Giao & hiệu của hai mảng": { examples: [
    { input: "a = [1,2,2,1], b = [2,2]", output: "giao (khử trùng) = [2]; giao (giữ số lượng) = [2,2]",
      note: "LeetCode 349 khử trùng còn 350 giữ số lượng — hai bài rất dễ nhầm, đọc kỹ đề trước khi chọn Set hay Map đếm." },
    { input: "a = [4,9,5], b = [9,4,9,8,4]", output: "hiệu a \\ b = [5]",
      note: "Dùng Set cho O(n+m). Nếu hai mảng đã sắp thì hai con trỏ cho O(1) bộ nhớ phụ — trả lời được cả hai hướng là tốt nhất." }
  ] },

  "Sắp xếp danh sách đối tượng theo nhiều tiêu chí (Comparator)": { examples: [
    { input: "danh sách nhân viên sắp theo phòng ban tăng dần, rồi lương GIẢM dần",
      output: "Comparator.comparing(Nv::getPhong).thenComparing(Nv::getLuong, Comparator.reverseOrder())",
      note: "thenComparing chỉ chạy khi tiêu chí trước BẰNG NHAU. Đặt reverseOrder() vào đúng tiêu chí muốn đảo, đừng reversed() cả chuỗi." },
    { input: "sắp danh sách có phần tử null ở trường tên",
      output: "Comparator.comparing(Nv::getTen, Comparator.nullsFirst(Comparator.naturalOrder()))",
      note: "Không bọc nullsFirst/nullsLast là NullPointerException ngay. Và comparator phải NHẤT QUÁN, nếu không sẽ dính IllegalArgumentException 'Comparison method violates its general contract'." }
  ] },
  "Đếm tần suất từ & lấy top-N bằng Stream": { examples: [
    { input: "\"a b a c b a\", top 2",
      output: "[a=3, b=2]",
      note: "groupingBy(w -> w, counting()) rồi entrySet().stream().sorted(Map.Entry.comparingByValue().reversed()).limit(2)." },
    { input: "hai từ cùng tần suất, ví dụ \"x y\" đều 1 lần",
      output: "thứ tự KHÔNG xác định nếu chỉ sắp theo giá trị",
      note: "Muốn kết quả ổn định phải thêm tiêu chí phụ: .thenComparing(Map.Entry::getKey). Đây là lỗi khiến test lúc pass lúc fail." }
  ] },
  "Xóa phần tử khi đang duyệt (ConcurrentModificationException)": { examples: [
    { input: "for (String s : list) if (s.startsWith(\"a\")) list.remove(s);",
      output: "ném ConcurrentModificationException",
      note: "Vòng for-each dùng Iterator, mà list.remove() làm lệch modCount — lần next() sau phát hiện và ném lỗi ngay." },
    { input: "list.removeIf(s -> s.startsWith(\"a\")); hoặc dùng it.remove() của Iterator",
      output: "xóa thành công, không lỗi",
      note: "removeIf là cách gọn nhất từ Java 8. Nếu cần vừa duyệt vừa sửa trong môi trường nhiều luồng thì dùng CopyOnWriteArrayList (đọc nhiều ghi ít)." }
  ] },
  "Loại phần tử trùng theo một trường, giữ nguyên thứ tự": { examples: [
    { input: "danh sách [(1,\"An\"), (2,\"Bình\"), (1,\"An\")] khử trùng theo id",
      output: "[(1,\"An\"), (2,\"Bình\")]",
      note: "Dùng Set<Integer> seen rồi filter(e -> seen.add(e.getId())) — add trả false khi đã tồn tại nên lọc được ngay trong stream." },
    { input: "cùng dữ liệu nhưng dùng Collectors.toMap(Nv::getId, e -> e)",
      output: "ném IllegalStateException: Duplicate key",
      note: "toMap hai tham số ném lỗi khi trùng khóa. Phải thêm hàm gộp: toMap(key, val, (a,b) -> a, LinkedHashMap::new) — LinkedHashMap để giữ thứ tự." }
  ] },
  "Nhóm danh sách theo khóa & tính tổng (groupingBy)": { examples: [
    { input: "đơn hàng [(HN, 100), (HCM, 200), (HN, 50)] nhóm theo thành phố và tính tổng",
      output: "{HN=150, HCM=200}",
      note: "groupingBy(Don::getCity, summingInt(Don::getAmount)). Downstream collector là chỗ mạnh nhất của Stream API." },
    { input: "cần giữ thứ tự nhóm theo lần xuất hiện đầu tiên",
      output: "{HN=150, HCM=200} theo đúng thứ tự gặp",
      note: "groupingBy mặc định trả HashMap KHÔNG có thứ tự. Truyền LinkedHashMap::new làm tham số thứ hai mới giữ được thứ tự." }
  ] },
  "Chia danh sách thành các lô nhỏ (batch / partition)": { examples: [
    { input: "list = [1..7], size = 3", output: "[[1,2,3],[4,5,6],[7]]",
      note: "Lô cuối được phép ngắn hơn. Dùng subList(i, Math.min(i+size, n)) — thiếu Math.min là IndexOutOfBoundsException." },
    { input: "list rỗng, size = 3", output: "[]",
      note: "Danh sách rỗng cho 0 lô chứ không phải một lô rỗng. Lưu ý subList trả VIEW chứ không phải bản sao — sửa lô là sửa cả danh sách gốc." }
  ] },
  "Đảo Map (key ↔ value) & tìm khóa có giá trị lớn nhất": { examples: [
    { input: "map = {a=1, b=2, c=2} đảo key↔value",
      output: "{1=[a], 2=[b, c]}",
      note: "Giá trị TRÙNG nên phải đảo thành Map<V, List<K>>, nếu đảo thẳng sang Map<V,K> thì mất dữ liệu âm thầm." },
    { input: "tìm khóa có giá trị lớn nhất của {a=1, b=5, c=3}",
      output: "b",
      note: "Collections.max(map.entrySet(), Map.Entry.comparingByValue()).getKey(). Map rỗng thì ném NoSuchElementException — dùng stream().max() trả Optional sẽ an toàn hơn." }
  ] },
  "Đọc file lớn từng dòng & đếm, không nạp hết vào RAM": { examples: [
    { input: "file log 10 GB, đếm số dòng chứa \"ERROR\"",
      output: "chạy được với vài MB RAM",
      note: "Files.lines(path) trả Stream lười (lazy), đọc tới đâu xử lý tới đó. Files.readAllLines() nạp cả file vào RAM và sẽ OutOfMemoryError." },
    { input: "quên đóng stream sau khi đọc",
      output: "rò rỉ file descriptor, lâu dài là 'Too many open files'",
      note: "Files.lines phải đặt trong try-with-resources vì nó GIỮ file handle. BufferedReader cũng vậy — đây là điểm khác biệt với các stream trên collection." }
  ] }
};
