// Bổ sung 2 ví dụ mẫu (input/output/giải thích) cho các bài nền tảng.
// Dùng: node tools/algo_patch.js tools/patch/ex1.js
module.exports = {
  "Linear Search (tìm kiếm tuyến tính)": { examples: [
    { input: "arr = [4, 2, 9, 7], target = 9", output: "2",
      note: "Duyệt lần lượt 4, 2 rồi gặp 9 tại chỉ số 2 thì dừng ngay — không cần xét phần còn lại." },
    { input: "arr = [4, 2, 9, 7], target = 5", output: "-1",
      note: "Duyệt hết mảng vẫn không thấy nên trả -1. Đây là ca xấu nhất: đúng n phép so sánh." }
  ] },
  "Binary Search (tìm kiếm nhị phân)": { examples: [
    { input: "arr = [1, 3, 5, 7, 9, 11], target = 7", output: "3",
      note: "mid = 2 (giá trị 5) nhỏ hơn 7 nên bỏ nửa trái; mid = 4 (giá trị 9) lớn hơn nên lùi; còn lại chỉ số 3 — chỉ 3 phép so sánh cho 6 phần tử." },
    { input: "arr = [1, 3, 5, 7], target = 4", output: "-1",
      note: "Vòng lặp kết thúc khi lo > hi mà chưa khớp. Lúc này lo chính là vị trí NÊN CHÈN 4 — hay được hỏi thêm dưới tên lower_bound." }
  ] },

  "Bubble Sort (sắp xếp nổi bọt)": { examples: [
    { input: "arr = [5, 1, 4, 2]", output: "[1, 2, 4, 5]",
      note: "Lượt 1 đẩy 5 về cuối: [1,4,2,5]. Lượt 2: [1,2,4,5]. Lượt 3 không đổi chỗ lần nào nên cờ swapped = false và dừng sớm." },
    { input: "arr = [1, 2, 3, 4]", output: "[1, 2, 3, 4]",
      note: "Mảng đã sắp: chỉ một lượt duyệt không đổi chỗ rồi dừng — O(n). Đây là ưu điểm duy nhất của bubble sort so với selection sort." }
  ] },
  "Selection Sort (sắp xếp chọn)": { examples: [
    { input: "arr = [64, 25, 12, 22]", output: "[12, 22, 25, 64]",
      note: "Lượt 1 tìm min = 12 đổi với vị trí 0; lượt 2 tìm min trong phần còn lại = 22 đổi với vị trí 1; xong." },
    { input: "arr = [3, 3, 1]", output: "[1, 3, 3]",
      note: "Số 3 ở vị trí 0 bị đổi xuống cuối nên hai số 3 hoán đổi thứ tự tương đối — chứng minh selection sort KHÔNG ổn định (not stable)." }
  ] },
  "Insertion Sort (sắp xếp chèn)": { examples: [
    { input: "arr = [5, 2, 4, 6]", output: "[2, 4, 5, 6]",
      note: "Lấy 2 chèn trước 5 → [2,5,4,6]; lấy 4 chèn giữa → [2,4,5,6]; 6 đã đúng chỗ nên không dịch." },
    { input: "arr = [1, 2, 3, 4, 5]", output: "[1, 2, 3, 4, 5]",
      note: "Mảng gần như đã sắp thì mỗi phần tử chỉ so một lần → O(n). Vì vậy Java dùng insertion sort cho các đoạn nhỏ bên trong TimSort." }
  ] },
  "Merge Sort (sắp xếp trộn)": { examples: [
    { input: "arr = [38, 27, 43, 3]", output: "[3, 27, 38, 43]",
      note: "Chia thành [38,27] và [43,3], sắp mỗi nửa thành [27,38] và [3,43], rồi trộn hai nửa đã sắp trong O(n)." },
    { input: "arr = [2, 1, 2]", output: "[1, 2, 2]",
      note: "Khi trộn, điều kiện left[i] <= right[j] lấy phần tử bên TRÁI trước nên hai số 2 giữ nguyên thứ tự — merge sort ỔN ĐỊNH. Đổi <= thành < là mất tính ổn định." }
  ] },
  "Quick Sort (sắp xếp nhanh)": { examples: [
    { input: "arr = [10, 80, 30, 90, 40]", output: "[10, 30, 40, 80, 90]",
      note: "Chọn pivot = 40 (phần tử cuối), phân hoạch thành [10,30] | 40 | [90,80] rồi đệ quy hai bên." },
    { input: "arr = [1, 2, 3, 4, 5] với pivot luôn là phần tử cuối", output: "[1, 2, 3, 4, 5] nhưng mất O(n²)",
      note: "Mảng đã sắp là CA XẤU NHẤT của pivot cố định: mỗi lần phân hoạch chỉ tách được 1 phần tử. Khắc phục bằng pivot ngẫu nhiên hoặc median-of-three." }
  ] },

  "Two Pointers (hai con trỏ)": { examples: [
    { input: "arr = [1, 2, 4, 7, 11], target = 15 (mảng đã sắp)", output: "[2, 4] tức cặp (4, 11)",
      note: "left = 0, right = 4: tổng 12 < 15 nên tiến left; tổng 2+11 = 13 < 15 nên tiến tiếp; 4+11 = 15 → tìm thấy." },
    { input: "s = \"A man, a plan, a canal: Panama\"", output: "true (đối xứng)",
      note: "Hai con trỏ đi từ hai đầu vào giữa, bỏ qua ký tự không phải chữ/số. Khuôn hai con trỏ đối đầu này dùng chung cho cả bài tổng cặp lẫn bài palindrome." }
  ] },
  "Sliding Window (cửa sổ trượt)": { examples: [
    { input: "nums = [2, 1, 5, 1, 3, 2], k = 3 (tổng lớn nhất của 3 phần tử liên tiếp)", output: "9",
      note: "Cửa sổ [5,1,3] cho tổng 9. Khi trượt chỉ cộng phần tử mới và trừ phần tử rơi ra — O(n) thay vì O(n·k)." },
    { input: "s = \"abcabcbb\" (chuỗi con không lặp dài nhất)", output: "3",
      note: "Cửa sổ CO GIÃN: gặp ký tự lặp thì đẩy biên trái tới sau vị trí lặp cũ. Cửa sổ cố định và cửa sổ co giãn là hai biến thể phải phân biệt rõ." }
  ] },
  "HashMap đếm tần suất": { examples: [
    { input: "nums = [1, 2, 2, 3, 2]", output: "{1=1, 2=3, 3=1}",
      note: "Dùng map.merge(n, 1, Integer::sum) — gọn hơn hẳn getOrDefault rồi put, và an toàn với giá trị null." },
    { input: "s = \"programming\" (ký tự không lặp đầu tiên)", output: "'p'",
      note: "Lượt 1 đếm tần suất, lượt 2 duyệt lại chuỗi tìm ký tự đầu tiên có đếm bằng 1. Phải dùng LinkedHashMap hoặc duyệt lại chuỗi gốc để giữ đúng thứ tự." }
  ] },
  "Đệ quy (Recursion)": { examples: [
    { input: "factorial(5)", output: "120",
      note: "5·factorial(4)·... tới factorial(0) = 1 là ca cơ sở. Thiếu ca cơ sở là StackOverflowError ngay." },
    { input: "fib(30) bằng đệ quy thuần", output: "832040 nhưng mất ~1.6 triệu lời gọi",
      note: "Cây đệ quy nở ra O(2^n) vì tính lại cùng một giá trị rất nhiều lần — đây chính là động cơ dẫn tới memoization." }
  ] },

  "Stack & Queue — bài toán ngoặc hợp lệ": { examples: [
    { input: "s = \"{[()]}\"", output: "true",
      note: "Mỗi ngoặc mở được đẩy vào stack, mỗi ngoặc đóng phải khớp với đỉnh stack. Cuối cùng stack rỗng nên hợp lệ." },
    { input: "s = \"([)]\"", output: "false",
      note: "Gặp ')' trong khi đỉnh stack là '[' — sai cặp. Ca này phân biệt lời giải đúng với lời giải chỉ ĐẾM số ngoặc (đếm thì ra true và sai)." }
  ] },
  "BFS — duyệt theo chiều rộng": { examples: [
    { input: "Đồ thị 1→2, 1→3, 2→4, 3→4; bắt đầu từ 1", output: "[1, 2, 3, 4]",
      note: "Duyệt theo TẦNG: tầng 0 là {1}, tầng 1 là {2,3}, tầng 2 là {4}. Nút 4 chỉ vào kết quả một lần nhờ mảng visited." },
    { input: "Lưới 3×3 không vật cản, tìm đường ngắn nhất từ (0,0) tới (2,2)", output: "4 bước",
      note: "Trên đồ thị KHÔNG trọng số, BFS cho đường ngắn nhất còn DFS thì không — đây là lý do chính để chọn BFS." }
  ] },
  "DFS — duyệt theo chiều sâu": { examples: [
    { input: "Đồ thị 1→2, 1→3, 2→4; bắt đầu từ 1", output: "[1, 2, 4, 3]",
      note: "Đi sâu hết nhánh 1→2→4 rồi mới quay lui sang 3. Thứ tự này khác hẳn BFS ở cùng đồ thị." },
    { input: "Đồ thị có chu trình 1→2, 2→3, 3→1", output: "[1, 2, 3] và không lặp vô hạn",
      note: "Nhờ mảng visited nên khi quay về 1 thì dừng. Bỏ visited là vòng lặp vô tận — lỗi phổ biến nhất khi viết DFS trên đồ thị (khác cây)." }
  ] },

  "Fibonacci — Memoization & Bottom-up": { examples: [
    { input: "n = 10", output: "55",
      note: "Dãy 0,1,1,2,3,5,8,13,21,34,55. Bản bottom-up chỉ cần hai biến nên O(1) bộ nhớ." },
    { input: "n = 50", output: "12586269025",
      note: "Kết quả vượt phạm vi int (2,147,483,647) nên phải dùng long. Đây là ca test hay bị bỏ sót và làm sai âm thầm." }
  ] },
  "Coin Change (đổi tiền — ít đồng xu nhất)": { examples: [
    { input: "coins = [1, 2, 5], amount = 11", output: "3",
      note: "5 + 5 + 1 = 11 dùng 3 đồng. Greedy 'cứ lấy đồng lớn nhất' tình cờ đúng ở đây nhưng không phải lúc nào cũng đúng." },
    { input: "coins = [2], amount = 3", output: "-1",
      note: "Không tổ hợp nào tạo ra 3 nên trả -1. Ô dp còn giá trị 'vô cực' chính là dấu hiệu không đổi được — đừng nhầm với 0." }
  ] },
  "Climbing Stairs (leo cầu thang)": { examples: [
    { input: "n = 3", output: "3",
      note: "Ba cách: 1+1+1, 1+2, 2+1. Đúng bằng Fibonacci thứ 4 — nhận ra điều này là giải xong bài." },
    { input: "n = 5", output: "8",
      note: "Dãy 1,2,3,5,8. Công thức dp[i] = dp[i-1] + dp[i-2] vì bước cuối chỉ có thể là 1 bậc hoặc 2 bậc." }
  ] },
  "House Robber (trộm nhà không kề nhau)": { examples: [
    { input: "nums = [1, 2, 3, 1]", output: "4",
      note: "Trộm nhà 0 và nhà 2 được 1 + 3 = 4. Chọn nhà 1 và nhà 3 chỉ được 3." },
    { input: "nums = [2, 7, 9, 3, 1]", output: "12",
      note: "2 + 9 + 1 = 12 lớn hơn 7 + 3 = 10. Greedy 'lấy nhà giá cao nhất trước' sẽ chọn 9 rồi 7 bị chặn và ra 10 — sai." }
  ] },
  "Longest Increasing Subsequence (LIS)": { examples: [
    { input: "nums = [10, 9, 2, 5, 3, 7, 101, 18]", output: "4",
      note: "Dãy con [2,3,7,101] hoặc [2,3,7,18]. Dãy con KHÔNG cần liên tiếp — đây là chỗ hay nhầm với mảng con." },
    { input: "nums = [7, 7, 7, 7]", output: "1",
      note: "Tăng NGẶT nên các phần tử bằng nhau không nối được. Nếu đề cho phép không giảm thì đáp án là 4 — đọc kỹ chữ 'strictly'." }
  ] },
  "0/1 Knapsack (cái túi)": { examples: [
    { input: "trọng lượng = [1,3,4,5], giá trị = [1,4,5,7], sức chứa = 7", output: "9",
      note: "Chọn món 2 (nặng 3, giá 4) và món 4 (nặng 4, giá 5) → tổng nặng 7, tổng giá 9." },
    { input: "trọng lượng = [4,5], giá trị = [10,20], sức chứa = 3", output: "0",
      note: "Không món nào bỏ vừa túi. 0/1 nghĩa là mỗi món lấy nguyên hoặc không lấy — khác balo phân số (chia nhỏ được thì greedy đúng)." }
  ] },

  "Kadane — Maximum Subarray (tổng đoạn con lớn nhất)": { examples: [
    { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6",
      note: "Đoạn [4,-1,2,1] cho tổng 6. Nguyên tắc: nếu tổng đang chạy âm thì vứt bỏ, bắt đầu lại từ phần tử hiện tại." },
    { input: "nums = [-3, -1, -2]", output: "-1",
      note: "Toàn số âm thì đáp án là phần tử lớn nhất. Khởi tạo max = 0 sẽ ra 0 và SAI — phải khởi tạo bằng nums[0]." }
  ] },
  "Best Time to Buy & Sell Stock (mua bán cổ phiếu 1 lần)": { examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5",
      note: "Mua ngày 1 giá 1, bán ngày 4 giá 6. Chỉ cần theo dõi giá THẤP NHẤT đã gặp và lãi lớn nhất — một lượt duyệt." },
    { input: "prices = [7,6,4,3,1]", output: "0",
      note: "Giá chỉ giảm nên không giao dịch, lãi 0. Đề không cho phép bán khống nên đáp án không bao giờ âm." }
  ] },
  "Majority Element — thuật toán Boyer-Moore": { examples: [
    { input: "nums = [2,2,1,1,1,2,2]", output: "2",
      note: "Bộ đếm về 0 rồi đổi ứng viên vài lần, cuối cùng còn 2. Số 2 xuất hiện 4 lần trên tổng 7 > n/2." },
    { input: "nums = [3,3,4]", output: "3",
      note: "Thuật toán chỉ đúng khi ĐỀ BẢO ĐẢM có phần tử chiếm quá nửa. Nếu không bảo đảm thì phải quét thêm một lượt để xác minh ứng viên." }
  ] },
  "Move Zeroes (dồn số 0 về cuối, giữ thứ tự)": { examples: [
    { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]",
      note: "Con trỏ chậm ghi các số khác 0 lần lượt về đầu, phần đuôi còn lại điền 0. Thứ tự tương đối của số khác 0 được giữ nguyên." },
    { input: "nums = [0, 0, 1]", output: "[1, 0, 0]",
      note: "Chỉ một phần tử khác 0 nằm cuối. Nếu dùng cách hoán đổi (swap) thì bài này tốn ít phép ghi hơn cách điền lại đuôi." }
  ] },
  "Product of Array Except Self (tích trừ chính nó)": { examples: [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]",
      note: "Tích tiền tố trái nhân tích hậu tố phải. Không dùng phép chia — đó là ràng buộc chính của đề." },
    { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]",
      note: "Có số 0 trong mảng: nếu dùng phép chia sẽ chia cho 0 và hỏng. Đây chính là ca test mà đề đặt ra để cấm dùng chia." }
  ] },
  "FizzBuzz (lọc kinh điển sàng lọc lập trình viên)": { examples: [
    { input: "n = 5", output: "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]",
      note: "Chia hết 3 in Fizz, chia hết 5 in Buzz. Đơn giản nhưng dùng để loại ứng viên không viết nổi vòng lặp." },
    { input: "n = 15 — xét riêng số 15", output: "\"FizzBuzz\"",
      note: "Phải kiểm tra điều kiện chia hết 15 (hoặc cả 3 và 5) TRƯỚC. Nếu đặt sau thì 15 sẽ in ra Fizz — lỗi kinh điển của bài này." }
  ] },

  "Reverse Linked List (đảo ngược danh sách liên kết)": { examples: [
    { input: "head = 1→2→3→4→5", output: "5→4→3→2→1",
      note: "Ba biến prev, cur, next: lưu next TRƯỚC khi đổi cur.next, nếu không sẽ mất phần đuôi." },
    { input: "head = null", output: "null",
      note: "Danh sách rỗng phải trả null chứ không được ném lỗi. Ca biên bắt buộc kiểm tra ở mọi bài linked list." }
  ] },
  "Detect Cycle — Floyd (thỏ và rùa)": { examples: [
    { input: "head = 3→2→0→-4, đuôi nối về nút chỉ số 1", output: "true",
      note: "Thỏ đi 2 bước, rùa đi 1 bước; trong chu trình khoảng cách giữa hai con giảm 1 mỗi vòng nên chắc chắn gặp nhau." },
    { input: "head = 1→2, không có chu trình", output: "false",
      note: "Thỏ chạm null trước nên thoát vòng lặp. Phải kiểm tra CẢ fast != null VÀ fast.next != null, thiếu một là NullPointerException." }
  ] },
  "Merge Two Sorted Lists (trộn 2 danh sách đã sắp xếp)": { examples: [
    { input: "l1 = 1→2→4, l2 = 1→3→4", output: "1→1→2→3→4→4",
      note: "Dùng nút giả (dummy) để không phải viết riêng logic cho phần tử đầu — mẹo áp dụng cho hầu hết bài linked list." },
    { input: "l1 = null, l2 = 0", output: "0",
      note: "Một danh sách rỗng thì nối thẳng phần còn lại. Vòng lặp kết thúc ngay và bước 'nối phần dư' xử lý ca này." }
  ] },
  "Binary Tree — độ sâu & duyệt theo lớp (Level Order)": { examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "độ sâu 3, level order [[3],[9,20],[15,7]]",
      note: "Chốt size = queue.size() ở đầu mỗi vòng để biết tầng hiện tại có bao nhiêu nút — mẹu chốt của mọi bài duyệt theo tầng." },
    { input: "root = [1,2,null,3,null,4]", output: "độ sâu 4, level order [[1],[2],[3],[4]]",
      note: "Cây lệch hoàn toàn thành danh sách — độ sâu bằng số nút. Với cây 10^5 nút kiểu này thì đệ quy sẽ tràn stack." }
  ] },
  "Validate BST (kiểm tra cây tìm kiếm nhị phân)": { examples: [
    { input: "root = [2,1,3]", output: "true",
      note: "Mọi nút nằm trong khoảng (min, max) truyền xuống: nút 1 phải < 2, nút 3 phải > 2." },
    { input: "root = [5,1,4,null,null,3,6]", output: "false",
      note: "Nút 3 lớn hơn cha nó là 4 nhưng vẫn NHỎ hơn gốc 5 — chỉ so với cha là không đủ. Đây là ca kinh điển bắt lỗi lời giải sai." }
  ] },

  "Permutations (liệt kê mọi hoán vị)": { examples: [
    { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      note: "6 = 3! kết quả. Dùng mảng used[] đánh dấu phần tử đã chọn rồi bỏ dấu khi quay lui." },
    { input: "nums = [1]", output: "[[1]]",
      note: "Một phần tử cho đúng một hoán vị. Nhớ thêm BẢN SAO của danh sách vào kết quả (new ArrayList<>(path)) — quên là mọi kết quả rỗng hết." }
  ] },
  "Subsets (liệt kê mọi tập con — power set)": { examples: [
    { input: "nums = [1,2,3]", output: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]",
      note: "2³ = 8 tập con. Mỗi phần tử có đúng hai lựa chọn: lấy hoặc không lấy." },
    { input: "nums = []", output: "[[]]",
      note: "Mảng rỗng vẫn có MỘT tập con là tập rỗng — không phải kết quả rỗng. Ca biên nhỏ nhưng test hay có." }
  ] },
  "Generate Parentheses (sinh dãy ngoặc hợp lệ)": { examples: [
    { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
      note: "5 kết quả = số Catalan thứ 3. Luật cắt nhánh: chỉ mở khi open < n, chỉ đóng khi close < open." },
    { input: "n = 1", output: "[\"()\"]",
      note: "Nhờ luật close < open nên nhánh bắt đầu bằng ')' bị chặn ngay, không hề sinh ra dãy sai rồi mới lọc." }
  ] }
};
