// Big Tech — Chuỗi & Số hay hỏi (encode/decode, sudoku, chu trình, atoi, nhân số lớn).
// Dùng: node tools/algo_append.js tools/patch/bigtech4.js
module.exports = [
{
  group: "Big Tech — Chuỗi & Số hay hỏi",
  items: [
    {
      name: "Encode and Decode Strings (mã hóa danh sách chuỗi)",
      lc: "271", slug: "encode-and-decode-strings", diff: "Trung bình",
      tags: "string design serialization length-prefix protocol",
      complexity: "O(tổng độ dài) cho cả encode lẫn decode, O(tổng độ dài) bộ nhớ",
      idea: "Bài thiết kế giao thức thu nhỏ. Không thể dùng ký tự phân cách cố định vì chuỗi con có thể chứa chính ký tự đó. Giải pháp chuẩn: TIỀN TỐ ĐỘ DÀI — ghi 'độ dài' + '#' + nội dung cho mỗi chuỗi.",
      trap: "Đừng chọn dấu phân cách 'hiếm' như '\\u0000' rồi cho là an toàn — đề nói chuỗi chứa BẤT KỲ ký tự nào. Tiền tố độ dài là lời giải duy nhất đúng vì đọc xong số là biết chính xác cần lấy bao nhiêu ký tự tiếp theo.",
      examples: [
        { input: "encode([\"lint\",\"code\",\"love\",\"you\"])",
          output: "\"4#lint4#code4#love3#you\"",
          note: "Mỗi chuỗi đi kèm độ dài đứng trước. Khi giải mã, đọc tới '#' để lấy số 4, rồi cắt đúng 4 ký tự tiếp theo." },
        { input: "encode([\"we\",\"say\",\":\",\"yes\",\"3#hack\"])",
          output: "\"2#we3#say1#:3#yes6#3#hack\"",
          note: "Chuỗi \"3#hack\" chứa chính mẫu phân cách nhưng vẫn giải mã đúng: đọc được độ dài 6 thì lấy trọn 6 ký tự, không hề nhìn vào nội dung. Đây là ca chứng minh mọi cách dùng ký tự phân cách đều hỏng." }
      ],
      steps: [
        "encode: với mỗi chuỗi s, nối s.length() + \"#\" + s vào StringBuilder.",
        "decode: đặt i = 0, lặp khi i < độ dài chuỗi mã.",
        "Tìm j là vị trí ký tự '#' đầu tiên kể từ i.",
        "len = Integer.parseInt(chuỗi.substring(i, j)).",
        "Lấy chuỗi.substring(j + 1, j + 1 + len) thêm vào kết quả.",
        "Đặt i = j + 1 + len rồi lặp tiếp."
      ],
      alt: {
        title: "Cách khác — thoát ký tự (escaping) bằng cách nhân đôi dấu phân cách",
        complexity: "O(tổng độ dài) nhưng hằng số lớn hơn và code dễ sai hơn nhiều",
        note: "Thay mọi '#' trong nội dung thành '##' rồi dùng '#;' làm dấu kết thúc chuỗi. Cách này chạy được nhưng phức tạp hơn hẳn và dễ lỗi ở ca chuỗi kết thúc bằng '#'. Nêu ra để so sánh rồi giải thích vì sao chọn tiền tố độ dài là cách trả lời tốt: cùng bài toán mà giao thức thực tế (HTTP Content-Length, Redis RESP) đều chọn tiền tố độ dài.",
        java: "public String encode(List<String> strs) {\n    StringBuilder sb = new StringBuilder();\n    for (String s : strs) {\n        sb.append(s.replace(\"#\", \"##\")).append(\"#;\");   // nhân đôi rồi đóng gói\n    }\n    return sb.toString();\n}\n\npublic List<String> decode(String s) {\n    List<String> res = new ArrayList<>();\n    StringBuilder cur = new StringBuilder();\n\n    for (int i = 0; i < s.length(); i++) {\n        if (s.charAt(i) == '#') {\n            if (s.charAt(i + 1) == '#') { cur.append('#'); i++; }   // '##' -> '#'\n            else { res.add(cur.toString()); cur.setLength(0); i++; } // '#;' -> hết chuỗi\n        } else {\n            cur.append(s.charAt(i));\n        }\n    }\n    return res;\n}"
      },
      java: "public String encode(List<String> strs) {\n    StringBuilder sb = new StringBuilder();\n    for (String s : strs) {\n        sb.append(s.length()).append('#').append(s);   // tiền tố ĐỘ DÀI\n    }\n    return sb.toString();\n}\n\npublic List<String> decode(String s) {\n    List<String> res = new ArrayList<>();\n    int i = 0;\n\n    while (i < s.length()) {\n        int j = i;\n        while (s.charAt(j) != '#') j++;              // đọc phần số\n        int len = Integer.parseInt(s.substring(i, j));\n\n        res.add(s.substring(j + 1, j + 1 + len));    // cắt đúng len ký tự\n        i = j + 1 + len;\n    }\n    return res;\n}",
      js: "function encode(strs) {\n  return strs.map(s => s.length + '#' + s).join('');\n}\n\nfunction decode(s) {\n  const res = [];\n  let i = 0;\n  while (i < s.length) {\n    let j = i;\n    while (s[j] !== '#') j++;\n    const len = parseInt(s.slice(i, j), 10);\n    res.push(s.slice(j + 1, j + 1 + len));\n    i = j + 1 + len;\n  }\n  return res;\n}"
    },
    {
      name: "Valid Sudoku (kiểm tra bảng Sudoku hợp lệ)",
      lc: "36", slug: "valid-sudoku", diff: "Trung bình",
      tags: "matrix hashset box-index validation",
      complexity: "O(81) tức O(1) thời gian và bộ nhớ vì bảng cố định 9×9",
      idea: "Chỉ cần kiểm tra KHÔNG TRÙNG trong 9 hàng, 9 cột và 9 ô vuông 3×3 — không cần giải được bảng. Công thức khóa: chỉ số ô vuông = (i / 3) * 3 + (j / 3), đây là dòng code đáng nhớ nhất của bài.",
      trap: "Bảng chưa điền hết vẫn có thể hợp lệ — bỏ qua ô '.'. Và một bảng hợp lệ theo định nghĩa này KHÔNG bảo đảm giải được; nhiều người trả lời nhầm sang bài Sudoku Solver (LC 37).",
      examples: [
        { input: "board có hàng đầu [\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"] và các hàng chuẩn của đề",
          output: "true",
          note: "Không hàng/cột/ô 3×3 nào lặp số, dù bảng còn nhiều ô trống. Trống không làm bảng không hợp lệ." },
        { input: "cùng bảng nhưng đổi ô (0,0) từ \"5\" thành \"8\"",
          output: "false",
          note: "Số 8 mới đụng với số 8 đã có trong ô vuông 3×3 trên-trái (tại vị trí (2,0) theo đề gốc). Bắt được ca này chứng tỏ công thức chỉ số ô vuông đúng." }
      ],
      steps: [
        "Tạo 3 mảng HashSet: rows[9], cols[9], boxes[9].",
        "Duyệt i từ 0..8, j từ 0..8.",
        "Nếu board[i][j] == '.' thì bỏ qua.",
        "Tính b = (i / 3) * 3 + (j / 3).",
        "Nếu add vào rows[i] hoặc cols[j] hoặc boxes[b] mà trả false (đã tồn tại) thì trả false ngay.",
        "Duyệt hết mà không xung đột thì trả true."
      ],
      alt: {
        title: "Cách khác — dùng mảng boolean[9][9] thay HashSet",
        complexity: "O(1) thời gian, bộ nhớ 3×81 bit — nhanh hơn HashSet vài lần vì không băm",
        note: "rowUsed[i][d], colUsed[j][d], boxUsed[b][d] với d = giá trị số trừ 1. Với miền giá trị nhỏ và cố định (1..9), mảng luôn thắng HashSet cả về tốc độ lẫn bộ nhớ. Nêu ra nhận xét 'miền giá trị nhỏ thì thay hash bằng mảng' là điểm cộng, nó áp dụng cho rất nhiều bài đếm ký tự và đếm chữ số.",
        java: "public boolean isValidSudoku(char[][] board) {\n    boolean[][] rowUsed = new boolean[9][9];\n    boolean[][] colUsed = new boolean[9][9];\n    boolean[][] boxUsed = new boolean[9][9];\n\n    for (int i = 0; i < 9; i++) {\n        for (int j = 0; j < 9; j++) {\n            if (board[i][j] == '.') continue;\n\n            int d = board[i][j] - '1';           // 0..8\n            int b = (i / 3) * 3 + (j / 3);\n\n            if (rowUsed[i][d] || colUsed[j][d] || boxUsed[b][d]) return false;\n            rowUsed[i][d] = colUsed[j][d] = boxUsed[b][d] = true;\n        }\n    }\n    return true;\n}"
      },
      java: "public boolean isValidSudoku(char[][] board) {\n    Set<Character>[] rows = new HashSet[9];\n    Set<Character>[] cols = new HashSet[9];\n    Set<Character>[] boxes = new HashSet[9];\n    for (int i = 0; i < 9; i++) {\n        rows[i] = new HashSet<>();\n        cols[i] = new HashSet<>();\n        boxes[i] = new HashSet<>();\n    }\n\n    for (int i = 0; i < 9; i++) {\n        for (int j = 0; j < 9; j++) {\n            char c = board[i][j];\n            if (c == '.') continue;              // ô trống vẫn hợp lệ\n\n            int b = (i / 3) * 3 + (j / 3);       // công thức chỉ số ô 3x3\n\n            if (!rows[i].add(c) || !cols[j].add(c) || !boxes[b].add(c)) {\n                return false;                    // add trả false = đã tồn tại\n            }\n        }\n    }\n    return true;\n}",
      js: "function isValidSudoku(board) {\n  const rows = Array.from({ length: 9 }, () => new Set());\n  const cols = Array.from({ length: 9 }, () => new Set());\n  const boxes = Array.from({ length: 9 }, () => new Set());\n\n  for (let i = 0; i < 9; i++) {\n    for (let j = 0; j < 9; j++) {\n      const c = board[i][j];\n      if (c === '.') continue;\n\n      const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);\n      if (rows[i].has(c) || cols[j].has(c) || boxes[b].has(c)) return false;\n\n      rows[i].add(c); cols[j].add(c); boxes[b].add(c);\n    }\n  }\n  return true;\n}"
    },
    {
      name: "Find the Duplicate Number (tìm số lặp không sửa mảng)",
      lc: "287", slug: "find-the-duplicate-number", diff: "Trung bình",
      tags: "floyd cycle-detection two-pointers binary-search",
      complexity: "O(n) thời gian, O(1) bộ nhớ với thuật toán rùa-thỏ của Floyd",
      idea: "Ràng buộc nghiệt ngã: KHÔNG được sửa mảng và chỉ dùng O(1) bộ nhớ. Mẹo: coi mảng như một hàm i → nums[i], giá trị lặp tạo ra CHU TRÌNH trong 'danh sách liên kết' ảo đó. Dùng đúng thuật toán Floyd của LC 142.",
      trap: "Sau khi rùa và thỏ gặp nhau, phải ĐƯA MỘT CON TRỎ VỀ ĐẦU rồi cho cả hai đi từng bước một — điểm gặp lần hai mới là lối vào chu trình. Trả về điểm gặp lần đầu là sai.",
      examples: [
        { input: "nums = [1,3,4,2,2]",
          output: "2",
          note: "Đường đi: 0→1→3→2→4→2→4... chu trình bắt đầu tại 2. Số 2 vừa là lối vào chu trình vừa là giá trị lặp." },
        { input: "nums = [3,1,3,4,2]",
          output: "3",
          note: "Có tới hai vị trí trỏ về 3 (chỉ số 0 và chỉ số 2) — đó chính là lý do tồn tại chu trình. Đề bảo đảm CHỈ MỘT giá trị bị lặp nên chu trình là duy nhất." }
      ],
      steps: [
        "Đặt slow = nums[0], fast = nums[nums[0]].",
        "Lặp khi slow != fast: slow = nums[slow], fast = nums[nums[fast]] (thỏ đi gấp đôi).",
        "Khi gặp nhau, đặt lại slow = 0 (hoặc fast = 0).",
        "Lặp khi slow != fast: cả hai cùng đi MỘT bước — slow = nums[slow], fast = nums[fast].",
        "Điểm gặp lần này chính là số bị lặp.",
        "Không hề ghi vào mảng, đúng ràng buộc đề."
      ],
      alt: {
        title: "Cách khác — tìm kiếm nhị phân trên MIỀN GIÁ TRỊ (1..n)",
        complexity: "O(n log n) thời gian, O(1) bộ nhớ — chậm hơn nhưng dễ nghĩ và dễ chứng minh",
        note: "Với mỗi giá trị giữa mid, đếm xem có bao nhiêu phần tử ≤ mid. Theo nguyên lý Dirichlet, nếu số lượng đó > mid thì giá trị lặp nằm trong [lo, mid]. Đây là ví dụ đẹp của 'nhị phân trên đáp án' thay vì trên chỉ số — kỹ thuật này còn dùng cho LC 410, LC 875, LC 1011 nên rất đáng nắm.",
        java: "public int findDuplicate(int[] nums) {\n    int lo = 1, hi = nums.length - 1;\n\n    while (lo < hi) {\n        int mid = lo + (hi - lo) / 2;\n\n        int count = 0;\n        for (int n : nums) if (n <= mid) count++;\n\n        if (count > mid) hi = mid;   // thừa phần tử -> số lặp nằm bên trái\n        else lo = mid + 1;\n    }\n    return lo;\n}"
      },
      java: "public int findDuplicate(int[] nums) {\n    // Pha 1: rùa - thỏ, tìm điểm gặp trong chu trình\n    int slow = nums[0], fast = nums[nums[0]];\n    while (slow != fast) {\n        slow = nums[slow];\n        fast = nums[nums[fast]];\n    }\n\n    // Pha 2: đưa một con trỏ về đầu, cùng đi MỘT bước\n    slow = 0;\n    while (slow != fast) {\n        slow = nums[slow];\n        fast = nums[fast];\n    }\n    return slow;      // lối vào chu trình = số bị lặp\n}",
      js: "function findDuplicate(nums) {\n  let slow = nums[0], fast = nums[nums[0]];\n  while (slow !== fast) {\n    slow = nums[slow];\n    fast = nums[nums[fast]];\n  }\n\n  slow = 0;\n  while (slow !== fast) {\n    slow = nums[slow];\n    fast = nums[fast];\n  }\n  return slow;\n}"
    },
    {
      name: "Happy Number (số hạnh phúc)",
      lc: "202", slug: "happy-number", diff: "Dễ",
      tags: "math cycle-detection hashset floyd digits",
      complexity: "O(log n) thời gian trên mỗi bước, tổng số bước bị chặn bởi hằng số nhỏ; O(1) bộ nhớ với Floyd",
      idea: "Lặp thay n bằng tổng bình phương các chữ số. Nếu về 1 thì hạnh phúc; nếu rơi vào CHU TRÌNH thì không. Cùng khuôn phát hiện chu trình như LC 287 — nhận ra điều này giúp giải trong một phút.",
      trap: "Không cần lo dãy chạy vô hạn không lặp: mọi số ≥ 3 chữ số đều giảm nhanh, dãy luôn bị nhốt dưới 243, nên tập trạng thái hữu hạn và bắt buộc lặp lại. Giải thích được điều này mới là hiểu bài.",
      examples: [
        { input: "n = 19",
          output: "true",
          note: "19 → 1+81 = 82 → 64+4 = 68 → 36+64 = 100 → 1. Về được 1 nên là số hạnh phúc." },
        { input: "n = 2",
          output: "false",
          note: "2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 — quay lại 4, chu trình khép kín không bao giờ chạm 1. Mọi số không hạnh phúc đều rơi vào đúng chu trình này." }
      ],
      steps: [
        "Viết hàm next(n): cộng dồn (n % 10)² rồi n /= 10 tới khi n == 0.",
        "Cách HashSet: lặp khi n != 1 và set chưa chứa n — thêm n vào set rồi n = next(n).",
        "Trả n == 1.",
        "Cách Floyd O(1) bộ nhớ: slow = n, fast = next(n).",
        "Lặp khi fast != 1 và slow != fast: slow = next(slow), fast = next(next(fast)).",
        "Trả fast == 1."
      ],
      alt: {
        title: "Cách khác — HashSet ghi lại các số đã gặp",
        complexity: "O(log n) mỗi bước, O(số bước) bộ nhớ — trực quan hơn, dễ viết đúng ngay",
        note: "Cứ thêm mỗi số vào Set; gặp lại một số đã có nghĩa là có chu trình, trả false. Đây là lời giải nên trình bày trước vì ai cũng hiểu ngay, sau đó nâng lên Floyd để đạt O(1) bộ nhớ. Nhịp 'đúng trước, tối ưu sau' này quan trọng hơn việc nhảy thẳng vào lời giải khéo.",
        java: "public boolean isHappy(int n) {\n    Set<Integer> seen = new HashSet<>();\n\n    while (n != 1 && seen.add(n)) {   // add trả false khi đã gặp -> có chu trình\n        n = next(n);\n    }\n    return n == 1;\n}\n\nprivate int next(int n) {\n    int sum = 0;\n    while (n > 0) {\n        int d = n % 10;\n        sum += d * d;\n        n /= 10;\n    }\n    return sum;\n}"
      },
      java: "public boolean isHappy(int n) {\n    int slow = n, fast = next(n);\n\n    while (fast != 1 && slow != fast) {\n        slow = next(slow);\n        fast = next(next(fast));      // thỏ đi gấp đôi\n    }\n    return fast == 1;                 // thoát vì fast == 1 -> hạnh phúc\n}\n\nprivate int next(int n) {\n    int sum = 0;\n    while (n > 0) {\n        int d = n % 10;\n        sum += d * d;\n        n /= 10;\n    }\n    return sum;\n}",
      js: "function isHappy(n) {\n  const next = (x) => {\n    let sum = 0;\n    while (x > 0) {\n      const d = x % 10;\n      sum += d * d;\n      x = Math.floor(x / 10);\n    }\n    return sum;\n  };\n\n  let slow = n, fast = next(n);\n  while (fast !== 1 && slow !== fast) {\n    slow = next(slow);\n    fast = next(next(fast));\n  }\n  return fast === 1;\n}"
    },
    {
      name: "String to Integer (atoi) — chuyển chuỗi thành số",
      lc: "8", slug: "string-to-integer-atoi", diff: "Trung bình",
      tags: "string parsing overflow edge-cases state-machine",
      complexity: "O(n) thời gian, O(1) bộ nhớ",
      idea: "Bài này không khó về thuật toán mà khó về CA BIÊN — nó đo sự cẩn thận. Bốn pha rõ ràng: bỏ khoảng trắng đầu, đọc dấu (tùy chọn), đọc các chữ số, dừng ở ký tự không phải số, và kẹp kết quả vào phạm vi int.",
      trap: "Phải phát hiện tràn TRƯỚC khi nhân, bằng cách so result với Integer.MAX_VALUE / 10. Nếu cứ nhân rồi mới kiểm tra thì giá trị đã hỏng. Chỉ bỏ khoảng trắng ở ĐẦU, không bỏ ở giữa.",
      examples: [
        { input: "s = \"   -042\"",
          output: "-42",
          note: "Bỏ 3 khoảng trắng đầu, đọc dấu '-', các số 0 ở đầu không ảnh hưởng vì result = result*10 + d. Dừng khi hết chuỗi." },
        { input: "s = \"words and 987\"",
          output: "0",
          note: "Ký tự đầu tiên không phải khoảng trắng, dấu hay chữ số nên dừng ngay và trả 0 — KHÔNG được đi tìm số ở phía sau. Đây là ca bẫy phổ biến nhất của bài." }
      ],
      steps: [
        "i = 0; bỏ qua mọi ký tự khoảng trắng ở đầu.",
        "Nếu i < n và ký tự là '+' hoặc '-' thì ghi sign = ±1 và i++.",
        "Lặp khi i < n và Character.isDigit(s.charAt(i)): d = s.charAt(i) - '0'.",
        "Kiểm tra tràn: nếu result > MAX/10 hoặc (result == MAX/10 và d > 7) thì trả MAX_VALUE hoặc MIN_VALUE theo dấu.",
        "result = result * 10 + d rồi i++.",
        "Trả sign * result."
      ],
      alt: {
        title: "Cách khác — dùng long để tính rồi kẹp về phạm vi int",
        complexity: "O(n) thời gian, O(1) bộ nhớ — ngắn hơn nhưng chỉ đúng khi số không quá dài",
        note: "Tích lũy vào long và cắt vòng lặp ngay khi vượt Integer.MAX_VALUE. Cách này gọn nhưng có giới hạn: nếu đề đổi sang phạm vi long thì không còn kiểu lớn hơn để mượn, buộc quay lại kiểm tra tràn thủ công. Nói ra hạn chế này khi trình bày sẽ tạo ấn tượng tốt hơn là chỉ đưa code ngắn.",
        java: "public int myAtoi(String s) {\n    int i = 0, n = s.length(), sign = 1;\n    long result = 0;\n\n    while (i < n && s.charAt(i) == ' ') i++;\n    if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {\n        sign = s.charAt(i++) == '-' ? -1 : 1;\n    }\n\n    while (i < n && Character.isDigit(s.charAt(i))) {\n        result = result * 10 + (s.charAt(i++) - '0');\n        if (sign == 1 && result > Integer.MAX_VALUE) return Integer.MAX_VALUE;\n        if (sign == -1 && -result < Integer.MIN_VALUE) return Integer.MIN_VALUE;\n    }\n    return (int) (sign * result);\n}"
      },
      java: "public int myAtoi(String s) {\n    int i = 0, n = s.length(), sign = 1, result = 0;\n\n    while (i < n && s.charAt(i) == ' ') i++;          // 1) bỏ khoảng trắng ĐẦU\n\n    if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {   // 2) dấu\n        sign = s.charAt(i++) == '-' ? -1 : 1;\n    }\n\n    while (i < n && Character.isDigit(s.charAt(i))) { // 3) đọc chữ số\n        int d = s.charAt(i) - '0';\n\n        // 4) chặn tràn TRƯỚC khi nhân (MAX = 2147483647, chữ số cuối là 7)\n        if (result > Integer.MAX_VALUE / 10\n            || (result == Integer.MAX_VALUE / 10 && d > 7)) {\n            return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;\n        }\n\n        result = result * 10 + d;\n        i++;\n    }\n    return sign * result;\n}",
      js: "function myAtoi(s) {\n  let i = 0, sign = 1, result = 0;\n  const n = s.length;\n\n  while (i < n && s[i] === ' ') i++;\n  if (i < n && (s[i] === '+' || s[i] === '-')) sign = s[i++] === '-' ? -1 : 1;\n\n  const MAX = 2147483647, MIN = -2147483648;\n  while (i < n && s[i] >= '0' && s[i] <= '9') {\n    result = result * 10 + (s.charCodeAt(i) - 48);\n    if (sign === 1 && result > MAX) return MAX;\n    if (sign === -1 && -result < MIN) return MIN;\n    i++;\n  }\n  return sign * result;\n}"
    },
    {
      name: "Multiply Strings (nhân hai số lớn dạng chuỗi)",
      lc: "43", slug: "multiply-strings", diff: "Trung bình",
      tags: "string math big-number grade-school-multiplication",
      complexity: "O(m·n) thời gian, O(m + n) bộ nhớ",
      idea: "Nhân tay như học tiểu học nhưng làm trên mảng. Nhận xét khóa: tích của chữ số ở vị trí i và j luôn rơi vào hai ô i+j và i+j+1 của mảng kết quả. Nhớ công thức này là giải xong bài.",
      trap: "Cấm dùng BigInteger hoặc chuyển sang long — đề ra chính là để kiểm tra bạn tự làm phép nhân. Và phải xử lý ca kết quả bằng 0 (bỏ các số 0 thừa ở đầu, nhưng đừng bỏ hết thành chuỗi rỗng).",
      examples: [
        { input: "num1 = \"123\", num2 = \"456\"",
          output: "\"56088\"",
          note: "Mảng kết quả dài 3+3 = 6, sau khi bỏ số 0 dẫn đầu còn 5 chữ số. Ví dụ chữ số 3 (i=2) nhân 6 (j=2) cho 18, cộng vào ô 4 và ô 5." },
        { input: "num1 = \"0\", num2 = \"52\"",
          output: "\"0\"",
          note: "Toàn bộ mảng bằng 0. Nếu bỏ hết số 0 dẫn đầu một cách máy móc sẽ ra chuỗi rỗng — phải chặn ca này bằng cách kiểm tra sớm hoặc giữ lại ít nhất một chữ số." }
      ],
      steps: [
        "Nếu num1 hoặc num2 bằng \"0\" thì trả \"0\" ngay.",
        "Tạo mảng int[] pos độ dài m + n toàn 0.",
        "Duyệt i từ m-1 về 0, j từ n-1 về 0.",
        "mul = (num1[i]-'0') * (num2[j]-'0'); p1 = i + j; p2 = i + j + 1.",
        "sum = mul + pos[p2]; pos[p2] = sum % 10; pos[p1] += sum / 10 (nhớ sang trái).",
        "Ghép mảng thành chuỗi, bỏ các số 0 ở đầu."
      ],
      alt: {
        title: "Cách khác — cộng dồn từng dòng tích riêng phần (đúng như nhân tay)",
        complexity: "O(m·n) thời gian, O(m + n) bộ nhớ — cùng bậc nhưng nhiều phép cộng chuỗi hơn",
        note: "Với mỗi chữ số của num2, nhân với toàn bộ num1 ra một dòng, thêm số 0 đuôi theo vị trí, rồi cộng dần các dòng lại. Cách này mô phỏng đúng cách nhân trên giấy nên dễ giải thích cho người phỏng vấn, nhưng cần thêm hàm cộng hai chuỗi số. Nếu bạn thấy công thức i+j / i+j+1 khó nhớ thì đây là phương án dự phòng an toàn.",
        java: "public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n\n    String result = \"0\";\n    for (int j = num2.length() - 1; j >= 0; j--) {\n        int d = num2.charAt(j) - '0';\n        StringBuilder line = new StringBuilder();\n        int carry = 0;\n\n        for (int i = num1.length() - 1; i >= 0; i--) {\n            int p = (num1.charAt(i) - '0') * d + carry;\n            line.append(p % 10);\n            carry = p / 10;\n        }\n        if (carry > 0) line.append(carry);\n        line.reverse();\n        for (int z = num2.length() - 1 - j; z > 0; z--) line.append('0');  // đệm 0\n\n        result = addStrings(result, line.toString());\n    }\n    return result;\n}\n\nprivate String addStrings(String a, String b) {\n    StringBuilder sb = new StringBuilder();\n    int i = a.length() - 1, j = b.length() - 1, carry = 0;\n\n    while (i >= 0 || j >= 0 || carry > 0) {\n        int x = i >= 0 ? a.charAt(i--) - '0' : 0;\n        int y = j >= 0 ? b.charAt(j--) - '0' : 0;\n        int s = x + y + carry;\n        sb.append(s % 10);\n        carry = s / 10;\n    }\n    return sb.reverse().toString();\n}"
      },
      java: "public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n\n    int m = num1.length(), n = num2.length();\n    int[] pos = new int[m + n];      // tích tối đa có m+n chữ số\n\n    for (int i = m - 1; i >= 0; i--) {\n        for (int j = n - 1; j >= 0; j--) {\n            int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\n            int p1 = i + j, p2 = i + j + 1;   // công thức khóa của bài\n\n            int sum = mul + pos[p2];\n            pos[p2] = sum % 10;\n            pos[p1] += sum / 10;              // nhớ sang bên trái\n        }\n    }\n\n    StringBuilder sb = new StringBuilder();\n    for (int p : pos) {\n        if (sb.length() == 0 && p == 0) continue;   // bỏ số 0 dẫn đầu\n        sb.append(p);\n    }\n    return sb.length() == 0 ? \"0\" : sb.toString();\n}",
      js: "function multiply(num1, num2) {\n  if (num1 === '0' || num2 === '0') return '0';\n\n  const m = num1.length, n = num2.length;\n  const pos = new Array(m + n).fill(0);\n\n  for (let i = m - 1; i >= 0; i--) {\n    for (let j = n - 1; j >= 0; j--) {\n      const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);\n      const p1 = i + j, p2 = i + j + 1;\n\n      const sum = mul + pos[p2];\n      pos[p2] = sum % 10;\n      pos[p1] += Math.floor(sum / 10);\n    }\n  }\n\n  const out = pos.join('').replace(/^0+/, '');\n  return out === '' ? '0' : out;\n}"
    }
  ]
}
];
