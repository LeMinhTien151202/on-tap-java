// Bổ sung 2 ví dụ mẫu cho nhóm real-world + LeetCode Hash Map / Two Pointers / Stack / Binary Search / Linked List.
// Dùng: node tools/algo_patch.js tools/patch/ex2.js
module.exports = {
  "LRU Cache (bộ nhớ đệm loại bỏ ít dùng gần đây)": { examples: [
    { input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3); get(2)", output: "get(1) → 1, get(2) → -1",
      note: "put(3,3) làm tràn nên loại khóa ÍT DÙNG GẦN ĐÂY NHẤT là 2 (vì 1 vừa được get). Đây là ca chứng minh get cũng phải cập nhật thứ tự." },
    { input: "capacity = 1; put(1,1); put(2,2); get(1)", output: "-1",
      note: "Sức chứa 1 nên put(2,2) đá ngay khóa 1 ra. Java có sẵn LinkedHashMap với accessOrder=true và removeEldestEntry — nêu ra sẽ được đánh giá cao." }
  ] },
  "Merge Intervals (gộp khoảng — lịch họp/đặt phòng)": { examples: [
    { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]",
      note: "Sau khi sắp theo điểm bắt đầu, [1,3] và [2,6] chồng nhau (2 ≤ 3) nên gộp thành [1,6]." },
    { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]",
      note: "Chạm nhau tại đúng điểm 4 vẫn tính là chồng lấn theo đề này. Nếu đề coi [1,4] và [4,5] là rời nhau thì đổi <= thành < — luôn hỏi lại người phỏng vấn về ca biên này." }
  ] },
  "Rate Limiter (giới hạn tần suất — sliding window)": { examples: [
    { input: "giới hạn 3 request/giây; 4 request tới tại mốc 0.1s, 0.2s, 0.3s, 0.4s", output: "3 request đầu ĐƯỢC, request thứ 4 BỊ CHẶN",
      note: "Cửa sổ trượt giữ dấu thời gian trong deque; tại 0.4s vẫn còn đủ 3 dấu trong 1 giây gần nhất nên từ chối." },
    { input: "cùng giới hạn; request tại 0.9s và request tại 1.95s", output: "cả hai ĐƯỢC",
      note: "Tới 1.95s thì dấu 0.9s đã rơi khỏi cửa sổ 1 giây nên được xóa khỏi deque. Fixed window sẽ cho qua 6 request quanh mốc giao ranh — đó là nhược điểm của nó." }
  ] },
  "Debounce & Throttle (giới hạn gọi hàm — FE thực chiến)": { examples: [
    { input: "debounce(fn, 300ms); người dùng gõ liên tục tại 0ms, 100ms, 200ms rồi dừng", output: "fn chạy MỘT lần tại 500ms",
      note: "Mỗi lần gõ lại hủy timer cũ. Debounce hợp cho ô tìm kiếm: chỉ gọi API khi người dùng ngừng gõ." },
    { input: "throttle(fn, 300ms); sự kiện scroll bắn tại 0, 100, 200, 350, 400ms", output: "fn chạy tại 0ms và 350ms",
      note: "Throttle bảo đảm TẦN SUẤT TỐI ĐA, hợp cho scroll/resize. Phân biệt được hai cái này là câu hỏi phỏng vấn frontend gần như chắc chắn." }
  ] },
  "Retry với Exponential Backoff (gọi API dễ lỗi mạng)": { examples: [
    { input: "maxRetries = 3, base = 100ms; API lỗi 500 ba lần rồi thành công", output: "chờ ~100ms, ~200ms, ~400ms rồi trả kết quả",
      note: "Thời gian chờ nhân đôi mỗi lần để tránh dồn tải lên hệ thống đang yếu. Thêm jitter ngẫu nhiên để nhiều client không cùng thử lại một lúc." },
    { input: "API trả 400 Bad Request", output: "KHÔNG thử lại, ném lỗi ngay",
      note: "Chỉ thử lại lỗi TẠM THỜI (5xx, timeout, 429). Thử lại lỗi 4xx là vô nghĩa và còn nhân đôi tác hại nếu request không idempotent." }
  ] },
  "Base62 Encode (sinh mã ngắn cho URL shortener)": { examples: [
    { input: "id = 125", output: "\"cb\"",
      note: "125 = 2·62 + 1 → chữ số 2 và 1 trong bảng [0-9a-zA-Z] cho ra 'c' và 'b'. 62 ký tự nên 6 ký tự đã biểu diễn được ~56 tỷ id." },
    { input: "id = 0", output: "\"a\" (hoặc ký tự đầu bảng)",
      note: "Vòng lặp while(n > 0) không chạy lần nào với n = 0 nên phải xử lý riêng, nếu không sẽ trả chuỗi rỗng — ca biên bắt buộc." }
  ] },
  "Flatten & Deep Clone (làm phẳng / sao chép sâu — JS thực chiến)": { examples: [
    { input: "flatten([1,[2,[3,[4]]]])", output: "[1,2,3,4]",
      note: "Đệ quy hoặc dùng arr.flat(Infinity). Bản đệ quy tự viết mới là thứ người phỏng vấn muốn xem." },
    { input: "deepClone({a:{b:1}}) rồi sửa clone.a.b = 2", output: "bản gốc vẫn giữ a.b = 1",
      note: "Sao chép nông ({...obj}) sẽ để hai bên dùng chung object a và bản gốc bị đổi theo. structuredClone() xử lý được cả vòng lặp tham chiếu, còn JSON.parse(JSON.stringify()) thì mất Date, Map và undefined." }
  ] },

  "Two Sum (tổng hai số)": { examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]",
      note: "Duyệt tới 7 thì tra map thấy đã có 2 (cần 9-7=2) tại chỉ số 0 → trả ngay. Một lượt duyệt, không cần hai vòng lồng nhau." },
    { input: "nums = [3,3], target = 6", output: "[0,1]",
      note: "Hai phần tử BẰNG NHAU: phải tra map TRƯỚC rồi mới put, nếu put trước thì chỉ số bị ghi đè và trả sai." }
  ] },
  "Contains Duplicate (có phần tử trùng không)": { examples: [
    { input: "nums = [1,2,3,1]", output: "true",
      note: "Số 1 xuất hiện lại. Dùng set.add() trả false là biết trùng — không cần contains rồi add hai lần." },
    { input: "nums = [1,2,3,4]", output: "false",
      note: "Không phần tử nào lặp. Nếu bị giới hạn O(1) bộ nhớ thì phải sắp xếp trước rồi so hai phần tử kề nhau — O(n log n)." }
  ] },
  "Valid Anagram (hai chuỗi đảo chữ)": { examples: [
    { input: "s = \"anagram\", t = \"nagaram\"", output: "true",
      note: "Cùng tập ký tự với cùng số lượng. Mảng int[26] nhanh hơn HashMap khi chỉ có chữ thường." },
    { input: "s = \"rat\", t = \"car\"", output: "false",
      note: "Kiểm tra độ dài khác nhau trước là cách loại nhanh nhất. Nếu đề mở rộng sang Unicode thì phải dùng HashMap thay mảng 26." }
  ] },
  "Group Anagrams (gom nhóm chuỗi đảo chữ)": { examples: [
    { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
      note: "Khóa là chuỗi đã sắp ký tự: 'aet' gom eat/tea/ate. O(n·k log k) với k là độ dài chuỗi." },
    { input: "strs = [\"\"]", output: "[[\"\"]]",
      note: "Chuỗi rỗng vẫn là một nhóm hợp lệ. Cách khóa nhanh hơn: dùng chuỗi đếm ký tự '1#0#0#...' để tránh sắp xếp, đưa về O(n·k)." }
  ] },
  "Top K Frequent Elements (K phần tử hay gặp nhất)": { examples: [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]",
      note: "Tần suất 1→3, 2→2, 3→1. Min-heap kích thước k cho O(n log k)." },
    { input: "nums = [1], k = 1", output: "[1]",
      note: "Bucket sort theo tần suất cho O(n): tần suất tối đa là n nên tạo n+1 xô rồi duyệt ngược. Đây là lời giải tối ưu được hỏi tới sau heap." }
  ] },
  "Longest Consecutive Sequence (dãy liên tiếp dài nhất)": { examples: [
    { input: "nums = [100,4,200,1,3,2]", output: "4",
      note: "Dãy 1,2,3,4. Chỉ bắt đầu đếm tại phần tử KHÔNG có số liền trước trong set (x-1 không tồn tại) nên tổng chi phí vẫn O(n)." },
    { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9",
      note: "Dãy 0..8, số 0 lặp không ảnh hưởng vì Set khử trùng. Sắp xếp cũng giải được nhưng O(n log n) — đề đòi O(n)." }
  ] },

  "Valid Palindrome (chuỗi đối xứng)": { examples: [
    { input: "s = \"A man, a plan, a canal: Panama\"", output: "true",
      note: "Bỏ dấu câu và khoảng trắng, chuẩn hóa chữ thường thì thành 'amanaplanacanalpanama' — đối xứng." },
    { input: "s = \" \"", output: "true",
      note: "Chuỗi chỉ có khoảng trắng, sau khi lọc còn rỗng và chuỗi rỗng được coi là đối xứng. Ca biên bắt buộc có trong test." }
  ] },
  "Two Sum II — mảng đã sắp xếp": { examples: [
    { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]",
      note: "Chỉ số bắt đầu từ 1 chứ không phải 0 — khác hẳn Two Sum bản gốc, rất dễ mất điểm oan ở đây." },
    { input: "numbers = [-1,0], target = -1", output: "[1,2]",
      note: "Hai con trỏ đối đầu: tổng nhỏ hơn target thì tiến trái, lớn hơn thì lùi phải. Nhờ mảng đã sắp nên chỉ cần O(1) bộ nhớ, không dùng HashMap." }
  ] },
  "3Sum (bộ ba có tổng bằng 0)": { examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]",
      note: "Sắp mảng rồi cố định một số, hai con trỏ cho phần còn lại. Phải BỎ QUA giá trị lặp ở cả ba vị trí để không sinh bộ ba trùng." },
    { input: "nums = [0,0,0,0]", output: "[[0,0,0]]",
      note: "Chỉ MỘT bộ ba dù có 4 số 0. Ca này bắt lỗi lời giải quên khử trùng ở con trỏ trái/phải." }
  ] },
  "Container With Most Water (thùng chứa nhiều nước nhất)": { examples: [
    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49",
      note: "Cột 8 (chỉ số 1) và cột 7 (chỉ số 8) cho 7 × min(8,7) = 49. Luôn dịch con trỏ ở cột THẤP HƠN vì giữ nó lại không thể tốt hơn." },
    { input: "height = [1,1]", output: "1",
      note: "Chiều rộng 1, chiều cao 1. Khác Trapping Rain Water: bài này chọn ĐÚNG HAI cột, không cộng nước giữa các cột." }
  ] },
  "Trapping Rain Water (hứng nước mưa)": { examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6",
      note: "Nước tại mỗi cột = min(max trái, max phải) - chiều cao cột đó. Hai con trỏ cho O(n) thời gian, O(1) bộ nhớ." },
    { input: "height = [4,2,0,3,2,5]", output: "9",
      note: "Cột 0 cao 4 và cột 5 cao 5 giữ nước cho toàn bộ vùng lõm giữa. Chỉ nhìn cột liền kề sẽ ra kết quả nhỏ hơn — phải xét max toàn cục hai bên." }
  ] },
  "Longest Substring Without Repeating Characters": { examples: [
    { input: "s = \"abcabcbb\"", output: "3",
      note: "Chuỗi con 'abc'. Khi gặp ký tự lặp thì nhảy biên trái tới NGAY SAU vị trí xuất hiện cũ." },
    { input: "s = \"abba\"", output: "2",
      note: "Ca bẫy: tới 'a' cuối, vị trí cũ của 'a' là 0 nhưng biên trái đã ở 2 — phải lấy max(left, viTriCu + 1), nếu không biên trái lùi lại và ra kết quả sai." }
  ] },
  "Longest Repeating Character Replacement": { examples: [
    { input: "s = \"AABABBA\", k = 1", output: "4",
      note: "Cửa sổ 'AABA' đổi 1 ký tự thành 'AAAA'. Điều kiện hợp lệ: độ dài cửa sổ - tần suất ký tự nhiều nhất ≤ k." },
    { input: "s = \"ABAB\", k = 2", output: "4",
      note: "Đổi 2 ký tự B thành A là đủ. Mẹo tối ưu: không cần giảm maxCount khi co cửa sổ, vì đáp án chỉ tăng khi maxCount tăng." }
  ] },
  "Permutation in String (chứa hoán vị của chuỗi khác)": { examples: [
    { input: "s1 = \"ab\", s2 = \"eidbaooo\"", output: "true",
      note: "s2 chứa 'ba' là hoán vị của 'ab'. Cửa sổ CỐ ĐỊNH độ dài s1, so hai mảng đếm 26 phần tử." },
    { input: "s1 = \"ab\", s2 = \"eidboaoo\"", output: "false",
      note: "Có đủ 'a' và 'b' nhưng không LIỀN NHAU. Ca này phân biệt lời giải cửa sổ trượt với lời giải chỉ đếm ký tự toàn chuỗi." }
  ] },
  "Minimum Window Substring (cửa sổ nhỏ nhất chứa đủ ký tự)": { examples: [
    { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"",
      note: "Nới biên phải cho tới khi đủ ký tự, rồi co biên trái chừng nào vẫn còn đủ — ghi lại cửa sổ ngắn nhất gặp được." },
    { input: "s = \"a\", t = \"aa\"", output: "\"\"",
      note: "t cần HAI chữ a nhưng s chỉ có một → không có cửa sổ nào. Phải đếm theo SỐ LƯỢNG chứ không chỉ theo tập ký tự." }
  ] },

  "Min Stack (stack lấy min trong O(1))": { examples: [
    { input: "push(-2); push(0); push(-3); getMin(); pop(); top(); getMin()", output: "getMin → -3, top → 0, getMin → -2",
      note: "Stack phụ lưu min TẠI THỜI ĐIỂM mỗi phần tử được đẩy vào, nên pop cũng trả min về đúng giá trị cũ." },
    { input: "push(2); push(2); pop(); getMin()", output: "2",
      note: "Giá trị trùng phải đẩy vào stack min CẢ HAI lần (hoặc đếm số lần), nếu chỉ đẩy khi nhỏ HƠN NGẶT thì pop lần đầu đã làm mất min." }
  ] },
  "Evaluate Reverse Polish Notation (tính biểu thức hậu tố)": { examples: [
    { input: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]", output: "9",
      note: "(2+1)·3. Gặp số thì đẩy vào stack, gặp toán tử thì lấy ra hai số rồi đẩy kết quả trở lại." },
    { input: "tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]", output: "6",
      note: "13/5 = 2 (chia lấy nguyên) rồi 4+2. THỨ TỰ toán hạng quan trọng: b = pop() trước, a = pop() sau, tính a / b chứ không phải b / a." }
  ] },
  "Daily Temperatures (bao lâu nữa thì ấm hơn)": { examples: [
    { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]",
      note: "Stack đơn điệu GIẢM chứa chỉ số; gặp nhiệt độ cao hơn thì lấy ra và ghi khoảng cách chỉ số." },
    { input: "temperatures = [30,60,90]", output: "[1,1,0]",
      note: "Ngày cuối không bao giờ có ngày ấm hơn nên luôn là 0. Mọi chỉ số còn kẹt lại trong stack đều tương ứng giá trị 0." }
  ] },
  "Largest Rectangle in Histogram (hình chữ nhật lớn nhất)": { examples: [
    { input: "heights = [2,1,5,6,2,3]", output: "10",
      note: "Cột 5 và 6 cho hình chữ nhật rộng 2 × cao 5 = 10. Stack đơn điệu TĂNG: khi gặp cột thấp hơn thì chốt diện tích cho các cột cao hơn đang chờ." },
    { input: "heights = [2,4]", output: "4",
      note: "Chỉ lấy riêng cột cao 4 rộng 1, hơn cả 2 cột × cao 2 = 4 (bằng nhau). Nhớ xử lý phần còn lại trong stack sau vòng lặp, hoặc đệm thêm cột cao 0 ở cuối." }
  ] },

  "Search in Rotated Sorted Array (mảng sắp xếp bị xoay)": { examples: [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4",
      note: "Tại mid = 3 (giá trị 7), nửa trái [4..7] đã sắp nhưng 0 không nằm trong đó nên chuyển sang nửa phải." },
    { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1",
      note: "Không tồn tại. Mấu chốt của bài: LUÔN có ít nhất một nửa đã sắp thứ tự, xác định nửa đó rồi kiểm tra target có nằm trong khoảng của nó không." }
  ] },
  "Find Minimum in Rotated Sorted Array (tìm điểm xoay)": { examples: [
    { input: "nums = [3,4,5,1,2]", output: "1",
      note: "So nums[mid] với nums[hi]: nếu lớn hơn thì điểm nhỏ nhất nằm bên PHẢI mid nên lo = mid + 1." },
    { input: "nums = [11,13,15,17]", output: "11",
      note: "Mảng xoay 0 vòng (vẫn đang sắp tăng) — nums[mid] < nums[hi] ngay từ đầu nên co dần về bên trái. So với nums[lo] thay vì nums[hi] sẽ sai ở ca này." }
  ] },
  "Koko Eating Bananas (tìm nhị phân trên ĐÁP ÁN)": { examples: [
    { input: "piles = [3,6,7,11], h = 8", output: "4",
      note: "Với tốc độ 4: cần 1+2+2+3 = 8 giờ, vừa đủ. Tốc độ 3 cần 10 giờ nên không đạt." },
    { input: "piles = [30,11,23,4,20], h = 5", output: "30",
      note: "h bằng đúng số đống nên phải ăn xong mỗi đống trong 1 giờ → tốc độ = đống lớn nhất. Đây là cận trên của khoảng tìm kiếm nhị phân." }
  ] },
  "Search a 2D Matrix (tìm trong ma trận đã sắp xếp)": { examples: [
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true",
      note: "Coi ma trận m×n như một mảng phẳng độ dài m·n: phần tử thứ k nằm tại hàng k/n, cột k%n. Một lần nhị phân O(log(m·n))." },
    { input: "cùng ma trận, target = 13", output: "false",
      note: "13 nằm giữa 11 và 16 nhưng không tồn tại. Lưu ý: cách phẳng hóa này chỉ đúng khi HÀNG SAU luôn lớn hơn hàng trước (LC 74), không áp dụng cho LC 240." }
  ] },
  "Median of Two Sorted Arrays (trung vị hai mảng)": { examples: [
    { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000",
      note: "Tổng 3 phần tử (lẻ) nên trung vị là phần tử giữa. Nhị phân trên mảng NGẮN HƠN để đảm bảo O(log(min(m,n)))." },
    { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000",
      note: "Tổng chẵn nên lấy trung bình hai phần tử giữa: (2+3)/2. Nhớ dùng phép chia thực (2.0) chứ không phải chia nguyên." }
  ] },

  "Remove Nth Node From End (xóa node thứ n từ cuối)": { examples: [
    { input: "head = 1→2→3→4→5, n = 2", output: "1→2→3→5",
      note: "Con trỏ nhanh đi trước n bước rồi hai con trỏ cùng đi; khi nhanh chạm cuối thì chậm đứng ngay TRƯỚC nút cần xóa." },
    { input: "head = 1, n = 1", output: "null",
      note: "Xóa chính nút đầu. Dùng nút giả (dummy) đứng trước head thì ca này không cần code riêng — đó là lý do luôn nên dùng dummy." }
  ] },
  "Add Two Numbers (cộng hai số dạng danh sách)": { examples: [
    { input: "l1 = 2→4→3, l2 = 5→6→4 (tức 342 + 465)", output: "7→0→8 (tức 807)",
      note: "Chữ số lưu ngược nên cộng từ đầu danh sách là cộng từ hàng đơn vị — rất thuận tiện, không cần đảo ngược." },
    { input: "l1 = 9→9→9, l2 = 1", output: "0→0→0→1",
      note: "Nhớ tràn ra một chữ số MỚI ở cuối. Điều kiện vòng lặp phải là (l1 != null || l2 != null || carry != 0), thiếu carry là mất chữ số cuối." }
  ] },
  "Reorder List (sắp xếp lại 1→n→2→n-1...)": { examples: [
    { input: "head = 1→2→3→4", output: "1→4→2→3",
      note: "Ba bước: tìm giữa bằng rùa-thỏ, đảo nửa sau thành 4→3, rồi đan xen hai nửa." },
    { input: "head = 1→2→3→4→5", output: "1→5→2→4→3",
      note: "Số nút lẻ thì nửa đầu dài hơn một nút. Nhớ CẮT liên kết tại điểm giữa, nếu không danh sách sẽ thành vòng và lặp vô hạn." }
  ] },
  "Copy List with Random Pointer (sao chép sâu có con trỏ random)": { examples: [
    { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "danh sách mới cùng cấu trúc, mọi nút là object MỚI",
      note: "Dùng HashMap<nút cũ, nút mới> ở lượt 1, rồi lượt 2 nối next và random qua map. O(n) bộ nhớ." },
    { input: "head = [[1,1],[2,1]] — cả hai nút random trỏ vào nút thứ hai", output: "bản sao có random trỏ vào nút thứ hai CỦA BẢN SAO",
      note: "Nếu random vẫn trỏ về nút gốc là sai hoàn toàn. Cách O(1) bộ nhớ: đan nút sao chép xen kẽ vào danh sách gốc rồi tách ra." }
  ] },
  "Merge k Sorted Lists (trộn k danh sách đã sắp xếp)": { examples: [
    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "1→1→2→3→4→4→5→6",
      note: "Min-heap kích thước k cho O(N log k) với N là tổng số nút. Trộn tuần tự từng cặp là O(N·k) — chậm hơn hẳn." },
    { input: "lists = [[], []]", output: "null",
      note: "Mọi danh sách rỗng thì heap không có gì để nạp và trả null ngay. Nhớ bỏ qua các danh sách null khi khởi tạo heap, nếu không là NullPointerException." }
  ] }
};
