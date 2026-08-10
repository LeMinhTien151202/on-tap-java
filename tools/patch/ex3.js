// Bổ sung 2 ví dụ mẫu cho nhóm Cây/BST, Đồ thị, DP nâng cao, Greedy/Interval/Heap, Bit.
// Dùng: node tools/algo_patch.js tools/patch/ex3.js
module.exports = {
  "Invert Binary Tree (lật cây nhị phân)": { examples: [
    { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]",
      note: "Đổi chỗ con trái và con phải tại mọi nút. Ba dòng code nhưng là bài huyền thoại — tác giả Homebrew từng trượt Google vì nó." },
    { input: "root = []", output: "[]",
      note: "Cây rỗng trả null. Bản lặp bằng queue tránh được tràn stack với cây rất sâu và cũng chỉ dài vài dòng." }
  ] },
  "Balanced Binary Tree (cây cân bằng chiều cao)": { examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "true",
      note: "Mọi nút có chênh lệch chiều cao hai nhánh ≤ 1. Trả về -1 làm cờ 'đã mất cân bằng' để dừng sớm, đạt O(n)." },
    { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false",
      note: "Nhánh trái sâu 4, nhánh phải sâu 2 — chênh 2. Tính chiều cao lại từ đầu ở mỗi nút sẽ thành O(n²), đó là lỗi hiệu năng kinh điển của bài." }
  ] },
  "Diameter of Binary Tree (đường kính cây)": { examples: [
    { input: "root = [1,2,3,4,5]", output: "3",
      note: "Đường 4→2→5 hoặc 4→2→1→3 dài 3 CẠNH. Tại mỗi nút, đường kính đi qua nó = cao trái + cao phải." },
    { input: "root = [1,2]", output: "1",
      note: "Đếm theo số CẠNH chứ không phải số nút — 2 nút cho đường kính 1. Đọc nhầm chỗ này là lệch đúng 1 đơn vị ở mọi test." }
  ] },
  "Lowest Common Ancestor of a BST (tổ tiên chung gần nhất)": { examples: [
    { input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", output: "6",
      note: "2 < 6 < 8 nên gốc 6 chính là điểm rẽ nhánh. Nhờ tính chất BST nên chỉ cần đi một đường, O(h)." },
    { input: "cùng cây, p = 2, q = 4", output: "2",
      note: "4 là hậu duệ của 2, và một nút được coi là tổ tiên của chính nó. Vòng lặp dừng khi giá trị nút nằm giữa p và q hoặc bằng một trong hai." }
  ] },
  "Kth Smallest Element in a BST (phần tử nhỏ thứ k)": { examples: [
    { input: "root = [3,1,4,null,2], k = 1", output: "1",
      note: "Duyệt trung thứ tự (inorder) của BST cho dãy TĂNG DẦN: 1,2,3,4 — lấy phần tử thứ k." },
    { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3",
      note: "Inorder cho 1,2,3,4,5,6. Dùng bản LẶP với stack để dừng ngay khi đếm đủ k, không phải duyệt hết cây." }
  ] },
  "Build Tree from Preorder & Inorder (dựng lại cây)": { examples: [
    { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]",
      note: "Phần tử đầu preorder là GỐC (3); vị trí của 3 trong inorder chia thành nhánh trái [9] và nhánh phải [15,20,7]." },
    { input: "preorder = [-1], inorder = [-1]", output: "[-1]",
      note: "Cây một nút. Dùng HashMap<giá trị, chỉ số inorder> để tra vị trí trong O(1), nếu quét tuyến tính thì thành O(n²)." }
  ] },
  "Binary Tree Maximum Path Sum (tổng đường đi lớn nhất)": { examples: [
    { input: "root = [1,2,3]", output: "6",
      note: "Đường 2→1→3 cộng lại bằng 6. Đường đi KHÔNG bắt buộc qua gốc và không cần chạm lá." },
    { input: "root = [-10,9,20,null,null,15,7]", output: "42",
      note: "Đường 15→20→7 = 42, bỏ hẳn gốc -10. Mấu chốt: nhánh con trả về giá trị âm thì kẹp về 0 (Math.max(0, ...)) vì thà không đi còn hơn." }
  ] },
  "Serialize & Deserialize Binary Tree (mã hóa / giải mã cây)": { examples: [
    { input: "root = [1,2,3,null,null,4,5]", output: "\"1,2,#,#,3,4,#,#,5,#,#\" rồi dựng lại đúng cây ban đầu",
      note: "Preorder có ĐÁNH DẤU null bằng '#' thì biểu diễn là duy nhất và giải mã được bằng một lượt đệ quy." },
    { input: "root = []", output: "\"#\" rồi giải mã ra null",
      note: "Cây rỗng phải mã hóa được và khôi phục được. Chỉ preorder KHÔNG có dấu null thì không dựng lại được cây — đây là lý do phải ghi '#'." }
  ] },

  "Number of Islands (đếm số đảo)": { examples: [
    { input: "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", output: "2",
      note: "Khối 4 ô '1' góc trên trái là một đảo, ô '1' góc dưới phải là đảo thứ hai. Mỗi lần gặp '1' chưa thăm thì tăng bộ đếm rồi DFS nhấn chìm cả cụm." },
    { input: "grid = [[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"]]", output: "3",
      note: "Chỉ nối theo 4 HƯỚNG (trên/dưới/trái/phải), không tính đường chéo — nếu tính chéo thì đáp án là 1. Luôn hỏi lại người phỏng vấn về điểm này." }
  ] },
  "Clone Graph (sao chép sâu đồ thị)": { examples: [
    { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "đồ thị mới cùng cấu trúc, mọi nút là object MỚI",
      note: "HashMap<nút cũ, nút mới> vừa làm bảng tra vừa làm visited — nhờ vậy đồ thị có chu trình vẫn không lặp vô hạn." },
    { input: "adjList = []", output: "null",
      note: "Đồ thị rỗng trả null (khác với đồ thị một nút không cạnh trả về nút đó). Hai ca biên này đều có trong test của LeetCode." }
  ] },
  "Rotting Oranges (BFS đa nguồn)": { examples: [
    { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4",
      note: "Nạp TẤT CẢ quả thối vào queue ngay từ đầu rồi lan theo tầng — mỗi tầng là một phút. Đây là khuôn BFS đa nguồn." },
    { input: "grid = [[2,1,1],[0,1,1],[1,0,1]]", output: "-1",
      note: "Quả tươi ở góc dưới trái bị cô lập nên không bao giờ thối. Phải đếm số quả tươi còn lại sau BFS, còn sót là trả -1." }
  ] },
  "Course Schedule (phát hiện chu trình — Topological Sort)": { examples: [
    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true",
      note: "Học 0 trước rồi 1 — đồ thị không chu trình. Kahn BFS: nạp các đỉnh bậc vào bằng 0, gỡ dần." },
    { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false",
      note: "Hai môn cần nhau vòng tròn nên không đỉnh nào có bậc vào 0 ngay từ đầu. Số môn xử lý được < numCourses chính là dấu hiệu có chu trình." }
  ] },
  "Pacific Atlantic Water Flow (nước chảy ra cả hai đại dương)": { examples: [
    { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      note: "Mẹo đảo ngược: DFS từ MÉP BIỂN đi vào, chỉ leo lên ô cao hơn hoặc bằng. Giao của hai tập tới được là đáp án." },
    { input: "heights = [[1]]", output: "[[0,0]]",
      note: "Ô duy nhất chạm cả hai đại dương. Nếu DFS từng ô ra biển thì độ phức tạp là O((m·n)²) — đảo chiều mới đưa về O(m·n)." }
  ] },
  "Union-Find — Number of Connected Components": { examples: [
    { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2",
      note: "Bắt đầu với 5 thành phần, mỗi lần union THÀNH CÔNG thì giảm 1 → 5 - 3 = 2." },
    { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1",
      note: "Tất cả nối thành một chuỗi. Nếu thêm cạnh [0,4] thì union thất bại (đã cùng nhóm) và số thành phần không đổi — đó cũng là cách phát hiện chu trình." }
  ] },

  "Longest Palindromic Substring (chuỗi đối xứng dài nhất)": { examples: [
    { input: "s = \"babad\"", output: "\"bab\" (hoặc \"aba\")",
      note: "Nở từ tâm: 2n-1 tâm, mỗi tâm nở O(n) → O(n²) thời gian, O(1) bộ nhớ. Đề chấp nhận nhiều đáp án đúng." },
    { input: "s = \"cbbd\"", output: "\"bb\"",
      note: "Tâm CHẴN nằm giữa hai chữ b. Chỉ chạy tâm lẻ sẽ trả về 'c' và sai — luôn phải gọi cả expand(i,i) và expand(i,i+1)." }
  ] },
  "Decode Ways (số cách giải mã chuỗi số)": { examples: [
    { input: "s = \"226\"", output: "3",
      note: "\"2 2 6\" = BBF, \"22 6\" = VF, \"2 26\" = BZ. Công thức dp[i] = dp[i-1] (nếu chữ số hiện tại khác 0) + dp[i-2] (nếu hai chữ số tạo số 10..26)." },
    { input: "s = \"06\"", output: "0",
      note: "Số 0 đứng đầu không hợp lệ và '06' cũng không nằm trong 10..26. Mọi ca liên quan tới chữ số 0 là bẫy chính của bài này." }
  ] },
  "Word Break (tách chuỗi theo từ điển)": { examples: [
    { input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", output: "true",
      note: "dp[i] = true nếu tồn tại j < i mà dp[j] đúng và s[j..i) nằm trong từ điển. dp[0] = true là mốc khởi đầu." },
    { input: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", output: "false",
      note: "Có nhiều cách tách một phần nhưng không cách nào phủ hết chuỗi. Greedy 'lấy từ dài nhất trước' sẽ chọn 'cats' rồi kẹt — phải dùng DP." }
  ] },
  "Unique Paths (số đường đi trên lưới)": { examples: [
    { input: "m = 3, n = 7", output: "28",
      note: "Chỉ đi phải hoặc xuống. dp[i][j] = dp[i-1][j] + dp[i][j-1], hàng đầu và cột đầu đều bằng 1." },
    { input: "m = 3, n = 2", output: "3",
      note: "Bản chất là tổ hợp C(m+n-2, m-1) = C(3,1) = 3, tính được trong O(min(m,n)) thời gian và O(1) bộ nhớ — câu trả lời tối ưu nhất." }
  ] },
  "Longest Common Subsequence (dãy con chung dài nhất)": { examples: [
    { input: "text1 = \"abcde\", text2 = \"ace\"", output: "3",
      note: "Dãy con chung 'ace'. Ký tự khớp thì dp[i][j] = dp[i-1][j-1] + 1, không khớp thì lấy max của hai ô kề." },
    { input: "text1 = \"abc\", text2 = \"def\"", output: "0",
      note: "Không ký tự chung nào. Lưu ý dãy con KHÔNG cần liên tiếp — nếu đề hỏi chuỗi con liên tiếp thì công thức khác (không khớp thì đặt về 0)." }
  ] },
  "Edit Distance (khoảng cách Levenshtein)": { examples: [
    { input: "word1 = \"horse\", word2 = \"ros\"", output: "3",
      note: "horse → rorse (thay h→r) → rose (xóa r) → ros (xóa e). Ba phép: thay dp[i-1][j-1], xóa dp[i-1][j], chèn dp[i][j-1]." },
    { input: "word1 = \"\", word2 = \"abc\"", output: "3",
      note: "Chuỗi rỗng cần 3 phép chèn. Hàng 0 và cột 0 của bảng phải khởi tạo bằng chính chỉ số — quên là sai toàn bộ." }
  ] },
  "Partition Equal Subset Sum (chia mảng thành 2 phần bằng nhau)": { examples: [
    { input: "nums = [1,5,11,5]", output: "true",
      note: "Tổng 22, cần tìm tập con có tổng 11: [11] hoặc [1,5,5]. Đây là bài balo 0/1 dạng đúng/sai." },
    { input: "nums = [1,2,3,5]", output: "false",
      note: "Tổng 11 là số LẺ nên chia đôi không được — kiểm tra tính chẵn lẻ trước là cách loại nhanh nhất, khỏi chạy DP." }
  ] },

  "Jump Game (nhảy tới cuối mảng được không)": { examples: [
    { input: "nums = [2,3,1,1,4]", output: "true",
      note: "Theo dõi vị trí XA NHẤT tới được: 0→2, tại 1 thì 1+3 = 4 đã chạm cuối. Một lượt duyệt greedy." },
    { input: "nums = [3,2,1,0,4]", output: "false",
      note: "Mọi đường đều rơi vào ô có giá trị 0 tại chỉ số 3 và kẹt. Điều kiện dừng: nếu i > reach thì trả false ngay." }
  ] },
  "Non-overlapping Intervals (bỏ ít khoảng nhất để hết chồng lấn)": { examples: [
    { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1",
      note: "Bỏ [1,3] là đủ. Sắp theo điểm KẾT THÚC rồi giữ khoảng nào kết thúc sớm nhất — greedy chuẩn của họ bài lịch trình." },
    { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2",
      note: "Ba khoảng giống hệt nhau, giữ một bỏ hai. Lưu ý [1,2] và [2,3] chạm nhau tại điểm 2 KHÔNG tính là chồng lấn ở bài này." }
  ] },
  "Insert Interval (chèn khoảng vào danh sách đã sắp xếp)": { examples: [
    { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]",
      note: "Ba pha: chép các khoảng kết thúc TRƯỚC newInterval, gộp các khoảng chồng lấn, chép phần còn lại. O(n) vì mảng đã sắp." },
    { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]",
      note: "Khoảng mới nuốt liền ba khoảng [3,5], [6,7], [8,10]. Vòng gộp phải chạy while chứ không phải if — chỉ gộp một lần là sai." }
  ] },
  "Kth Largest Element in an Array (phần tử lớn thứ k)": { examples: [
    { input: "nums = [3,2,1,5,6,4], k = 2", output: "5",
      note: "Min-heap kích thước k: giữ k phần tử lớn nhất, đỉnh heap chính là phần tử lớn thứ k. O(n log k)." },
    { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4",
      note: "Giá trị TRÙNG vẫn tính riêng từng vị trí (5,5,6 chiếm 3 vị trí đầu). Quickselect cho O(n) trung bình nhưng phải chọn pivot ngẫu nhiên." }
  ] },
  "Task Scheduler (lập lịch tác vụ có thời gian nghỉ)": { examples: [
    { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", output: "8",
      note: "A B nghỉ A B nghỉ A B = 8 đơn vị. Công thức: (maxCount - 1) × (n + 1) + số tác vụ có tần suất bằng maxCount." },
    { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0", output: "6",
      note: "Không cần nghỉ nên đáp án là tổng số tác vụ. Nhớ lấy max giữa công thức và tasks.length — khi có nhiều loại tác vụ thì các khe nghỉ được lấp đầy." }
  ] },
  "Find Median from Data Stream (trung vị của luồng dữ liệu)": { examples: [
    { input: "addNum(1); addNum(2); findMedian(); addNum(3); findMedian()", output: "1.5 rồi 2.0",
      note: "Hai heap: max-heap giữ nửa nhỏ, min-heap giữ nửa lớn. Số chẵn phần tử thì lấy trung bình hai đỉnh." },
    { input: "addNum(-1); addNum(-2); addNum(-3); findMedian()", output: "-2.0",
      note: "Số lẻ phần tử thì lấy đỉnh của heap ĐANG NHIỀU HƠN. Luôn cân bằng để hai heap chênh nhau tối đa 1 phần tử sau mỗi lần thêm." }
  ] },

  "Single Number (số xuất hiện một lần)": { examples: [
    { input: "nums = [4,1,2,1,2]", output: "4",
      note: "XOR toàn mảng: các cặp trùng triệt tiêu nhau (a^a = 0) và 0^4 = 4. O(n) thời gian, O(1) bộ nhớ." },
    { input: "nums = [2,2,1]", output: "1",
      note: "XOR có tính giao hoán nên thứ tự phần tử không quan trọng. Biến thể LC 137 (mỗi số xuất hiện 3 lần) không dùng được XOR đơn giản — phải đếm bit." }
  ] },
  "Number of 1 Bits (đếm bit 1 — Brian Kernighan)": { examples: [
    { input: "n = 11 (nhị phân 1011)", output: "3",
      note: "Mẹo n & (n-1) xóa bit 1 THẤP NHẤT mỗi lần: 1011 → 1010 → 1000 → 0, đúng 3 vòng lặp." },
    { input: "n = -3 (nhị phân bù hai 11111111111111111111111111111101)", output: "31",
      note: "Số âm trong Java: phải dùng dịch phải KHÔNG DẤU (>>>) nếu duyệt từng bit, dùng >> sẽ lặp vô hạn. Brian Kernighan không dính lỗi này." }
  ] },
  "Counting Bits (đếm bit 1 cho 0..n)": { examples: [
    { input: "n = 5", output: "[0,1,1,2,1,2]",
      note: "dp[i] = dp[i >> 1] + (i & 1): số bit của i bằng số bit của i/2 cộng bit cuối. Một lượt O(n)." },
    { input: "n = 2", output: "[0,1,1]",
      note: "Công thức thay thế: dp[i] = dp[i & (i-1)] + 1. Cả hai đều O(n) — gọi hàm đếm bit cho từng số là O(n log n), chậm hơn." }
  ] },
  "Reverse Bits (đảo ngược 32 bit)": { examples: [
    { input: "n = 43261596 (00000010100101000001111010011100)", output: "964176192 (00111001011110000010100101000000)",
      note: "Lặp 32 lần: đẩy result sang trái, lấy bit thấp nhất của n gắn vào, rồi dịch n sang phải." },
    { input: "n = -3 (11111111111111111111111111111101)", output: "-1073741825 (10111111111111111111111111111111)",
      note: "Java không có kiểu unsigned nên phải dùng >>> khi dịch n. Nếu hàm được gọi hàng triệu lần thì nên chia thành 4 byte và tra bảng cache." }
  ] },
  "Missing Number (số bị thiếu trong 0..n)": { examples: [
    { input: "nums = [3,0,1]", output: "2",
      note: "Tổng 0..3 là 6, tổng mảng là 4 → thiếu 2. Hoặc XOR mọi chỉ số với mọi giá trị, số dư lại chính là đáp án." },
    { input: "nums = [0]", output: "1",
      note: "Số thiếu có thể là n (cuối dãy) chứ không chỉ nằm giữa. Cách XOR an toàn hơn cách cộng tổng vì không lo TRÀN SỐ với n lớn." }
  ] },
  "Sum of Two Integers (cộng không dùng dấu +)": { examples: [
    { input: "a = 1, b = 2", output: "3",
      note: "a ^ b cho tổng không nhớ, (a & b) << 1 cho phần nhớ; lặp tới khi phần nhớ bằng 0." },
    { input: "a = 2, b = -3", output: "-1",
      note: "Số âm dùng biểu diễn bù hai nên chính công thức đó vẫn đúng, không cần code riêng. Trong Java phải dùng int chứ đừng ép long — vòng lặp mới kết thúc đúng." }
  ] }
};
