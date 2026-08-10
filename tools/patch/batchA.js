// Bổ sung độ khó + bẫy hay gặp + cách làm khác cho 41 mục thuật toán nền tảng.
module.exports = {

"Linear Search (tìm kiếm tuyến tính)": {
  diff: "Dễ",
  trap: "Chỉ hợp lý khi mảng CHƯA sắp xếp hoặc n nhỏ. Nếu phải tra nhiều lần trên cùng tập dữ liệu, hãy dựng HashMap/HashSet một lần rồi tra O(1) thay vì quét lại mỗi lần.",
  alt: {
    title: "Cách khác — Stream API (Java 8+)",
    complexity: "Vẫn O(n), chỉ khác cách diễn đạt",
    note: "Ngắn gọn hơn nhưng chậm hơn vòng for thuần một chút do chi phí tạo stream. Phỏng vấn nên viết vòng for trước, nhắc stream sau như một lựa chọn.",
    java: `int linearSearch(int[] arr, int target) {
    return IntStream.range(0, arr.length)
                    .filter(i -> arr[i] == target)
                    .findFirst()
                    .orElse(-1);
}`
  }
},

"Binary Search (tìm kiếm nhị phân)": {
  diff: "Dễ",
  trap: "mid = (left + right) / 2 bị TRÀN SỐ khi mảng rất lớn — phải viết left + (right - left) / 2. Điều kiện vòng lặp là left <= right (có dấu bằng), thiếu nó sẽ bỏ sót phần tử cuối.",
  alt: {
    title: "Cách khác — đệ quy & hàm thư viện",
    complexity: "O(log n) thời gian; bản đệ quy tốn O(log n) bộ nhớ ngăn xếp",
    note: "Arrays.binarySearch trả về (-(vị_trí_chèn) - 1) khi không tìm thấy — rất tiện để biết nên chèn vào đâu, nhưng yêu cầu mảng đã sắp xếp.",
    java: `int binarySearch(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    return arr[mid] < target
        ? binarySearch(arr, target, mid + 1, right)
        : binarySearch(arr, target, left, mid - 1);
}

// Hàm thư viện:
int idx = Arrays.binarySearch(arr, target);
int insertPos = idx < 0 ? -(idx + 1) : idx;`
  }
},

"Bubble Sort (sắp xếp nổi bọt)": {
  diff: "Dễ",
  trap: "Không bao giờ dùng trong code thật. Điểm cộng khi phỏng vấn: nói được nó ỔN ĐỊNH (stable) và đạt O(n) khi mảng gần như đã sắp xếp nhờ cờ swapped dừng sớm.",
  alt: {
    title: "Cách khác — Cocktail Shaker Sort (nổi bọt hai chiều)",
    complexity: "O(n²) nhưng nhanh hơn thực nghiệm",
    note: "Bubble Sort xử lý rất tệ 'rùa' — phần tử NHỎ nằm gần cuối mảng, mỗi lượt chỉ nhích lên 1 ô. Quét xuôi rồi quét ngược sẽ giải quyết được.",
    java: `void cocktailSort(int[] a) {
    int start = 0, end = a.length - 1;
    boolean swapped = true;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++)            // xuôi: đẩy số lớn về cuối
            if (a[i] > a[i + 1]) { swap(a, i, i + 1); swapped = true; }
        if (!swapped) break;
        end--;

        swapped = false;
        for (int i = end - 1; i >= start; i--)       // ngược: kéo số nhỏ về đầu
            if (a[i] > a[i + 1]) { swap(a, i, i + 1); swapped = true; }
        start++;
    }
}

private void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }`
  }
},

"Selection Sort (sắp xếp chọn)": {
  diff: "Dễ",
  trap: "KHÔNG stable vì phép hoán đổi xa làm đảo thứ tự các phần tử bằng nhau. Ưu điểm duy nhất: số lần GHI chỉ O(n) — có ý nghĩa khi ghi rất đắt (bộ nhớ flash, EEPROM).",
  alt: {
    title: "Cách khác — Heap Sort (chọn phần tử lớn nhất bằng heap)",
    complexity: "O(n log n) thời gian · O(1) bộ nhớ",
    note: "Cùng ý tưởng 'mỗi lượt chọn phần tử lớn nhất', nhưng heap giúp chọn trong O(log n) thay vì O(n). Sắp xếp tại chỗ, không stable.",
    java: `void heapSort(int[] a) {
    int n = a.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);   // dựng max-heap
    for (int i = n - 1; i > 0; i--) {
        swap(a, 0, i);                                        // đưa max về cuối
        heapify(a, i, 0);                                     // vun lại phần còn lại
    }
}

private void heapify(int[] a, int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest != i) { swap(a, i, largest); heapify(a, n, largest); }
}`
  }
},

"Insertion Sort (sắp xếp chèn)": {
  diff: "Dễ",
  trap: "Tuy O(n²) nhưng RẤT nhanh với n nhỏ và mảng gần sắp xếp (O(n)) — chính vì thế TimSort trong Java dùng insertion sort cho các đoạn ngắn dưới 32 phần tử.",
  alt: {
    title: "Cách khác — Binary Insertion Sort",
    complexity: "So sánh O(n log n), nhưng số lần DỜI phần tử vẫn O(n²)",
    note: "Dùng tìm nhị phân để định vị chỗ chèn. Chỉ đáng dùng khi phép SO SÁNH đắt (so chuỗi dài, gọi comparator phức tạp).",
    java: `void binaryInsertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int key = a[i];
        int lo = 0, hi = i;
        while (lo < hi) {                     // tìm vị trí chèn
            int mid = (lo + hi) >>> 1;
            if (a[mid] <= key) lo = mid + 1;  // <= để giữ tính ổn định
            else hi = mid;
        }
        System.arraycopy(a, lo, a, lo + 1, i - lo);
        a[lo] = key;
    }
}`
  }
},

"Merge Sort (sắp xếp trộn)": {
  diff: "Trung bình",
  trap: "Tốn O(n) bộ nhớ phụ — đó là nhược điểm duy nhất. Bù lại luôn O(n log n) kể cả trường hợp xấu nhất và ỔN ĐỊNH, nên Arrays.sort(Object[]) và Collections.sort dùng TimSort (biến thể merge sort).",
  alt: {
    title: "Cách khác — Merge Sort bottom-up (khử đệ quy)",
    complexity: "O(n log n) thời gian · O(n) bộ nhớ, không dùng ngăn xếp đệ quy",
    note: "Trộn các đoạn rộng 1, rồi 2, rồi 4... Tránh hoàn toàn nguy cơ StackOverflowError và dễ song song hóa.",
    java: `void mergeSortBottomUp(int[] a) {
    int n = a.length;
    int[] buf = new int[n];
    for (int width = 1; width < n; width *= 2) {
        for (int lo = 0; lo < n - width; lo += 2 * width) {
            int mid = lo + width - 1;
            int hi = Math.min(lo + 2 * width - 1, n - 1);
            merge(a, buf, lo, mid, hi);
        }
    }
}

private void merge(int[] a, int[] buf, int lo, int mid, int hi) {
    System.arraycopy(a, lo, buf, lo, hi - lo + 1);
    int i = lo, j = mid + 1;
    for (int k = lo; k <= hi; k++) {
        if (i > mid)             a[k] = buf[j++];
        else if (j > hi)         a[k] = buf[i++];
        else if (buf[j] < buf[i]) a[k] = buf[j++];
        else                      a[k] = buf[i++]; // < chứ không <= để giữ stable
    }
}`
  }
},

"Quick Sort (sắp xếp nhanh)": {
  diff: "Trung bình",
  trap: "Chọn pivot cố định ở đầu/cuối gặp mảng ĐÃ SẮP XẾP sẽ suy biến về O(n²) — phải chọn ngẫu nhiên hoặc median-of-three. Đây là câu hỏi vặn kinh điển.",
  alt: {
    title: "Cách khác — phân hoạch 3 đường (Dutch National Flag)",
    complexity: "O(n log n) trung bình, O(n) khi mảng toàn giá trị trùng",
    note: "Chia thành 3 vùng < = > pivot. Với mảng có nhiều giá trị lặp lại (ví dụ chỉ có 3 loại giá trị), bản này nhanh vượt trội vì vùng '=' không cần đệ quy nữa.",
    java: `void quickSort3Way(int[] a, int lo, int hi) {
    if (lo >= hi) return;
    int pivot = a[lo + new Random().nextInt(hi - lo + 1)]; // pivot ngẫu nhiên
    int lt = lo, i = lo, gt = hi;

    while (i <= gt) {
        if (a[i] < pivot)      swap(a, lt++, i++);
        else if (a[i] > pivot) swap(a, i, gt--);   // không tăng i: phần tử mới chưa xét
        else                   i++;
    }
    quickSort3Way(a, lo, lt - 1);
    quickSort3Way(a, gt + 1, hi);   // bỏ qua toàn bộ vùng bằng pivot
}`
  }
},

"Two Pointers (hai con trỏ)": {
  diff: "Dễ",
  trap: "Có HAI biến thể khác hẳn nhau: hai đầu chụm vào (cần mảng đã sắp xếp) và hai con trỏ CÙNG CHIỀU nhanh/chậm (không cần sắp xếp). Chọn nhầm biến thể là hỏng bài.",
  alt: {
    title: "Cách khác — hai con trỏ cùng chiều (read/write)",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Con trỏ 'read' quét mọi phần tử, con trỏ 'write' chỉ tiến khi cần giữ lại. Khuôn mẫu cho mọi bài lọc/nén mảng tại chỗ.",
    java: `// Xóa phần tử trùng trong mảng ĐÃ SẮP XẾP, trả về độ dài mới
int removeDuplicates(int[] a) {
    if (a.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < a.length; read++) {
        if (a[read] != a[write - 1]) a[write++] = a[read];
    }
    return write;
}`
  }
},

"Sliding Window (cửa sổ trượt)": {
  diff: "Trung bình",
  trap: "Phân biệt cửa sổ CỐ ĐỊNH (biết trước k) với cửa sổ CO GIÃN (mở right, co left khi vi phạm). Với cửa sổ co giãn, phải bảo đảm điều kiện đơn điệu thì mới co được.",
  alt: {
    title: "Cách khác — mảng tổng tiền tố (prefix sum)",
    complexity: "O(n) dựng mảng, sau đó mỗi truy vấn O(1)",
    note: "Khi phải hỏi tổng của NHIỀU đoạn khác nhau (không phải một cửa sổ trượt duy nhất), prefix sum tiện hơn. Kết hợp prefix sum + HashMap giải bài 'đếm số đoạn con có tổng bằng k' (LC 560).",
    java: `// Đếm số đoạn con liên tiếp có tổng bằng k — hoạt động cả với số âm
int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);                 // tổng tiền tố rỗng
    int sum = 0, count = 0;
    for (int n : nums) {
        sum += n;
        count += seen.getOrDefault(sum - k, 0);
        seen.merge(sum, 1, Integer::sum);
    }
    return count;
}`
  }
},

"HashMap đếm tần suất": {
  diff: "Dễ",
  trap: "Dùng getOrDefault hoặc merge thay cho chuỗi if-else. Với chuỗi ASCII/chữ thường, mảng int[26] hoặc int[128] nhanh hơn HashMap nhiều lần vì không phải băm và không boxing.",
  alt: {
    title: "Cách khác — mảng đếm & Stream groupingBy",
    complexity: "O(n); mảng đếm dùng O(1) bộ nhớ cố định",
    note: "Chỉ dùng được mảng đếm khi miền giá trị hẹp và biết trước. Stream groupingBy đẹp mắt nhưng chậm hơn, hợp cho code nghiệp vụ hơn là code thi.",
    java: `// Miền hẹp: 26 chữ cái thường
int[] freq = new int[26];
for (char c : s.toCharArray()) freq[c - 'a']++;

// Miền rộng / kiểu bất kỳ: Stream
Map<Character, Long> count = s.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, Collectors.counting()));`
  }
},

"Đệ quy (Recursion)": {
  diff: "Dễ",
  trap: "Thiếu điều kiện dừng → StackOverflowError. Java KHÔNG tối ưu đệ quy đuôi (tail-call), nên độ sâu quá vài nghìn là phải chuyển sang vòng lặp.",
  alt: {
    title: "Cách khác — khử đệ quy bằng Stack tường minh",
    complexity: "Cùng độ phức tạp, nhưng dùng bộ nhớ heap thay vì ngăn xếp lời gọi",
    note: "Mọi đệ quy đều chuyển được thành vòng lặp + Stack. Bắt buộc phải làm khi độ sâu lớn (duyệt cây thư mục sâu, đồ thị hàng triệu nút).",
    java: `// Duyệt cây theo thứ tự giữa (in-order) KHÔNG dùng đệ quy
List<Integer> inorder(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        res.add(cur.val);
        cur = cur.right;
    }
    return res;
}`
  }
},

"Stack & Queue — bài toán ngoặc hợp lệ": {
  diff: "Dễ",
  trap: "Hai chỗ dễ sót: phải kiểm tra stack rỗng TRƯỚC khi pop (chuỗi \")(\"), và cuối cùng stack phải RỖNG (chuỗi \"((\"). Trong Java nên dùng ArrayDeque, không dùng lớp Stack cũ vì nó đồng bộ hóa thừa.",
  alt: {
    title: "Cách khác — đếm bằng biến khi chỉ có 1 loại ngoặc",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Không cần stack: tăng khi gặp '(', giảm khi gặp ')'; âm giữa chừng là sai, cuối cùng khác 0 cũng sai. Chỉ áp dụng được khi CHỈ có một loại ngoặc.",
    java: `boolean isValidSingleType(String s) {
    int balance = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') balance++;
        else if (c == ')') balance--;
        if (balance < 0) return false;   // đóng trước khi mở
    }
    return balance == 0;
}`
  }
},

"BFS — duyệt theo chiều rộng": {
  diff: "Trung bình",
  trap: "Đánh dấu visited lúc ĐƯA VÀO queue, không phải lúc lấy ra — nếu không, cùng một nút sẽ bị nạp nhiều lần và queue phình to. BFS cho đường đi ngắn nhất chỉ đúng trên đồ thị KHÔNG trọng số.",
  alt: {
    title: "Cách khác — BFS hai chiều (bidirectional)",
    complexity: "Giảm từ O(b^d) xuống khoảng O(b^(d/2))",
    note: "Khi biết cả điểm đầu và điểm cuối, chạy BFS đồng thời từ hai phía và dừng khi hai mặt sóng gặp nhau. Mỗi bước luôn mở rộng tập ĐANG NHỎ HƠN.",
    java: `int bidirectionalBFS(Map<Integer, List<Integer>> g, int start, int end) {
    if (start == end) return 0;
    Set<Integer> head = new HashSet<>(List.of(start));
    Set<Integer> tail = new HashSet<>(List.of(end));
    Set<Integer> visited = new HashSet<>(List.of(start, end));
    int steps = 0;

    while (!head.isEmpty() && !tail.isEmpty()) {
        if (head.size() > tail.size()) { var t = head; head = tail; tail = t; } // luôn mở tập nhỏ
        Set<Integer> next = new HashSet<>();
        steps++;
        for (int node : head)
            for (int nb : g.getOrDefault(node, List.of())) {
                if (tail.contains(nb)) return steps;   // hai mặt sóng gặp nhau
                if (visited.add(nb)) next.add(nb);
            }
        head = next;
    }
    return -1;
}`
  }
},

"DFS — duyệt theo chiều sâu": {
  diff: "Trung bình",
  trap: "Đệ quy sâu dễ StackOverflowError với đồ thị lớn (Java mặc định chỉ vài nghìn khung). Đồ thị VÔ HƯỚNG phải truyền nút cha xuống để không quay ngược lại chính cạnh vừa đi.",
  alt: {
    title: "Cách khác — DFS lặp dùng Stack",
    complexity: "O(V + E), bộ nhớ O(V) trên heap thay vì ngăn xếp lời gọi",
    note: "Lưu ý thứ tự duyệt hàng xóm sẽ NGƯỢC so với bản đệ quy (vì stack là LIFO) — nếu đề quan tâm thứ tự thì phải đẩy hàng xóm vào theo chiều ngược lại.",
    java: `void dfsIterative(Map<Integer, List<Integer>> g, int start) {
    Deque<Integer> stack = new ArrayDeque<>();
    Set<Integer> visited = new HashSet<>();
    stack.push(start);

    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (!visited.add(node)) continue;   // add trả false nếu đã có
        System.out.println(node);
        List<Integer> nbs = g.getOrDefault(node, List.of());
        for (int i = nbs.size() - 1; i >= 0; i--) stack.push(nbs.get(i));
    }
}`
  }
},

"Fibonacci — Memoization & Bottom-up": {
  diff: "Dễ",
  trap: "Đệ quy trần là O(2^n) — tính lại cùng một giá trị hàng triệu lần. Với n lớn phải dùng long, và từ n = 93 trở đi long cũng tràn.",
  alt: {
    title: "Cách khác — lũy thừa ma trận",
    complexity: "O(log n)",
    note: "[[1,1],[1,0]]^n cho ra F(n) ở góc. Ít khi cần trong phỏng vấn nhưng nói ra được sẽ rất ghi điểm ở vòng thuật toán.",
    java: `long fib(int n) {
    if (n <= 1) return n;
    long[][] result = {{1, 0}, {0, 1}};    // ma trận đơn vị
    long[][] base   = {{1, 1}, {1, 0}};
    int p = n - 1;
    while (p > 0) {
        if ((p & 1) == 1) result = multiply(result, base);
        base = multiply(base, base);
        p >>= 1;
    }
    return result[0][0];
}

private long[][] multiply(long[][] a, long[][] b) {
    return new long[][] {
        { a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1] },
        { a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1] }
    };
}`
  }
},

"Coin Change (đổi tiền — ít đồng xu nhất)": {
  diff: "Trung bình",
  trap: "Greedy chọn đồng lớn nhất trước là SAI với bộ tiền không chuẩn: với {1, 3, 4} đổi 6, greedy cho 4+1+1 = 3 đồng, đáp án đúng là 3+3 = 2 đồng.",
  alt: {
    title: "Cách khác — BFS theo mức",
    complexity: "O(amount × số loại đồng)",
    note: "Coi mỗi số tiền còn lại là một nút, mỗi loại đồng xu là một cạnh. Mức BFS đầu tiên chạm 0 chính là số đồng ít nhất — thường dừng sớm hơn DP.",
    java: `int coinChangeBFS(int[] coins, int amount) {
    if (amount == 0) return 0;
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> q = new ArrayDeque<>();
    q.add(0);
    visited.add(0);
    int level = 0;

    while (!q.isEmpty()) {
        int size = q.size();
        level++;
        for (int i = 0; i < size; i++) {
            int cur = q.poll();
            for (int c : coins) {
                int next = cur + c;
                if (next == amount) return level;
                if (next < amount && visited.add(next)) q.add(next);
            }
        }
    }
    return -1;
}`
  }
},

"Climbing Stairs (leo cầu thang)": {
  diff: "Dễ",
  trap: "Chính là dãy Fibonacci trá hình. Nếu đề cho bước nhảy {1, 2, 3} thì công thức thành dp[i] = dp[i-1] + dp[i-2] + dp[i-3] (dãy Tribonacci).",
  alt: {
    title: "Cách khác — tổng quát hóa cho bộ bước nhảy bất kỳ",
    complexity: "O(n × số loại bước)",
    note: "Khuôn mẫu này giải luôn được biến thể có bậc thang hỏng (chỉ cần bỏ qua khi dp[i] không hợp lệ) — biến thể rất hay bị hỏi tiếp sau bài gốc.",
    java: `int climbStairs(int n, int[] steps) {
    int[] dp = new int[n + 1];
    dp[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int s : steps)
            if (i - s >= 0) dp[i] += dp[i - s];
    return dp[n];
}`
  }
},

"House Robber (trộm nhà không kề nhau)": {
  diff: "Trung bình",
  trap: "Biến thể LC 213 xếp nhà thành VÒNG TRÒN: nhà đầu và nhà cuối kề nhau nên phải chạy 2 lần — một lần bỏ nhà đầu, một lần bỏ nhà cuối, rồi lấy max.",
  alt: {
    title: "Cách khác — bản vòng tròn (House Robber II)",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Tách bài vòng tròn thành hai bài thẳng hàng là mẹo chung cho mọi bài DP trên vòng. Nhớ xử lý riêng trường hợp chỉ có 1 nhà.",
    java: `int robCircle(int[] nums) {
    int n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(robLine(nums, 0, n - 2),   // bỏ nhà cuối
                    robLine(nums, 1, n - 1));  // bỏ nhà đầu
}

private int robLine(int[] nums, int lo, int hi) {
    int prev = 0, cur = 0;
    for (int i = lo; i <= hi; i++) {
        int next = Math.max(cur, prev + nums[i]);
        prev = cur;
        cur = next;
    }
    return cur;
}`
  }
},

"Longest Increasing Subsequence (LIS)": {
  diff: "Trung bình",
  trap: "Bản O(n log n) dùng mảng tails — nhưng tails KHÔNG phải là dãy LIS thực tế, nó chỉ có ĐỘ DÀI đúng. Muốn dựng lại dãy thật phải lưu thêm mảng chỉ số cha.",
  alt: {
    title: "Cách khác — O(n log n) bằng patience sorting",
    complexity: "O(n log n) thời gian · O(n) bộ nhớ",
    note: "tails[i] = phần tử NHỎ NHẤT có thể kết thúc một dãy tăng độ dài i+1. Mỗi số hoặc nối vào cuối, hoặc thay thế phần tử đầu tiên >= nó (tìm bằng binary search).",
    java: `int lengthOfLIS(int[] nums) {
    int[] tails = new int[nums.length];
    int size = 0;
    for (int x : nums) {
        int lo = 0, hi = size;
        while (lo < hi) {                 // tìm vị trí đầu tiên >= x
            int mid = (lo + hi) >>> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = x;
        if (lo == size) size++;           // nối dài thêm
    }
    return size;
}`
  }
},

"0/1 Knapsack (cái túi)": {
  diff: "Trung bình",
  trap: "Khi nén bảng 2 chiều xuống 1 chiều, vòng lặp trọng lượng PHẢI chạy ngược. Chạy xuôi sẽ cho phép lấy cùng một món nhiều lần — thành bài Unbounded Knapsack.",
  alt: {
    title: "Cách khác — bản nén 1 chiều & Unbounded Knapsack",
    complexity: "O(n × W) thời gian · O(W) bộ nhớ",
    note: "Chỉ khác nhau đúng CHIỀU của vòng lặp trong: ngược = mỗi món 1 lần (0/1), xuôi = lấy không giới hạn (unbounded). Nhớ kỹ cặp này.",
    java: `// 0/1: mỗi món tối đa 1 lần
int knapsack01(int[] w, int[] v, int W) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < w.length; i++)
        for (int c = W; c >= w[i]; c--)              // NGƯỢC
            dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
    return dp[W];
}

// Unbounded: lấy bao nhiêu lần cũng được
int knapsackUnbounded(int[] w, int[] v, int W) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < w.length; i++)
        for (int c = w[i]; c <= W; c++)              // XUÔI
            dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
    return dp[W];
}`
  }
},

"Kadane — Maximum Subarray (tổng đoạn con lớn nhất)": {
  diff: "Dễ",
  trap: "Khởi tạo best = nums[0], KHÔNG phải 0 — nếu khởi tạo 0 thì mảng toàn số âm sẽ trả về 0 thay vì phần tử lớn nhất.",
  alt: {
    title: "Cách khác — chia để trị & truy vết đoạn",
    complexity: "O(n log n) cho chia để trị; bản truy vết vẫn O(n)",
    note: "Chia để trị chậm hơn nhưng là câu hỏi vặn hay gặp. Thực tế hay được hỏi thêm: 'trả về CHÍNH ĐOẠN đó, không chỉ tổng' — chỉ cần lưu thêm chỉ số bắt đầu.",
    java: `int[] maxSubArrayRange(int[] nums) {
    int cur = nums[0], best = nums[0];
    int curStart = 0, bestStart = 0, bestEnd = 0;

    for (int i = 1; i < nums.length; i++) {
        if (cur + nums[i] < nums[i]) {   // bắt đầu đoạn mới
            cur = nums[i];
            curStart = i;
        } else {
            cur += nums[i];
        }
        if (cur > best) { best = cur; bestStart = curStart; bestEnd = i; }
    }
    return new int[] { best, bestStart, bestEnd };
}`
  }
},

"Best Time to Buy & Sell Stock (mua bán cổ phiếu 1 lần)": {
  diff: "Dễ",
  trap: "Phải MUA trước rồi mới BÁN — không được lấy max trừ min một cách vô tư nếu max đứng trước min. Không có giao dịch có lãi thì trả về 0.",
  alt: {
    title: "Cách khác — quy về Kadane trên mảng chênh lệch",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Lãi của một đoạn mua-bán = tổng các chênh lệch liên tiếp trong đoạn đó, nên bài này chính là Maximum Subarray trên mảng diff. Biến thể LC 122 (mua bán không giới hạn) chỉ cần cộng mọi chênh lệch dương.",
    java: `// Bản Kadane trên chênh lệch
int maxProfit(int[] prices) {
    int cur = 0, best = 0;
    for (int i = 1; i < prices.length; i++) {
        cur = Math.max(0, cur + prices[i] - prices[i - 1]);
        best = Math.max(best, cur);
    }
    return best;
}

// LC 122 — mua bán bao nhiêu lần cũng được
int maxProfitMany(int[] prices) {
    int total = 0;
    for (int i = 1; i < prices.length; i++)
        if (prices[i] > prices[i - 1]) total += prices[i] - prices[i - 1];
    return total;
}`
  }
},

"Majority Element — thuật toán Boyer-Moore": {
  diff: "Dễ",
  trap: "Boyer-Moore chỉ ĐÚNG khi đề bảo đảm tồn tại phần tử chiếm > n/2. Nếu không bảo đảm, phải chạy thêm một lượt đếm để xác minh ứng viên.",
  alt: {
    title: "Cách khác — HashMap đếm hoặc sắp xếp lấy phần tử giữa",
    complexity: "HashMap O(n) thời gian, O(n) bộ nhớ · Sắp xếp O(n log n), O(1) bộ nhớ",
    note: "Sắp xếp rồi lấy nums[n/2] là mẹo một dòng rất đẹp: phần tử chiếm hơn nửa chắc chắn phủ vị trí giữa. Chậm hơn nhưng cực ngắn.",
    java: `// Một dòng: sắp xếp rồi lấy giữa
int majorityBySort(int[] nums) {
    Arrays.sort(nums);
    return nums[nums.length / 2];
}

// Boyer-Moore có XÁC MINH khi đề không bảo đảm
Integer majorityVerified(int[] nums) {
    int cand = nums[0], count = 0;
    for (int n : nums) {
        if (count == 0) cand = n;
        count += (n == cand) ? 1 : -1;
    }
    int freq = 0;
    for (int n : nums) if (n == cand) freq++;
    return freq > nums.length / 2 ? cand : null;
}`
  }
},

"Move Zeroes (dồn số 0 về cuối, giữ thứ tự)": {
  diff: "Dễ",
  trap: "Đề yêu cầu làm TẠI CHỖ và GIỮ NGUYÊN thứ tự tương đối các số khác 0 — tạo mảng mới là trượt yêu cầu.",
  alt: {
    title: "Cách khác — hoán đổi thay vì ghi đè rồi lấp 0",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Chỉ cần một lượt duy nhất thay vì hai. Số phép ghi ít hơn khi mảng có nhiều số 0 — điểm cộng nhỏ nếu người phỏng vấn hỏi tối ưu.",
    java: `void moveZeroes(int[] nums) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
        if (nums[read] != 0) {
            int tmp = nums[write];
            nums[write] = nums[read];
            nums[read] = tmp;
            write++;
        }
    }
}`
  }
},

"Product of Array Except Self (tích trừ chính nó)": {
  diff: "Trung bình",
  trap: "Đề CẤM dùng phép chia — không phải để làm khó, mà vì mảng có số 0 sẽ chia cho 0. Mảng kết quả không tính vào bộ nhớ phụ, nên vẫn đạt O(1) bộ nhớ.",
  alt: {
    title: "Cách khác — dùng phép chia có xử lý số 0",
    complexity: "O(n) thời gian · O(1) bộ nhớ",
    note: "Chỉ dùng khi người phỏng vấn cho phép. Phải phân 3 trường hợp: không có số 0, đúng 1 số 0, từ 2 số 0 trở lên (khi đó kết quả toàn 0).",
    java: `int[] productExceptSelfDivide(int[] nums) {
    int zeros = 0, product = 1;
    for (int n : nums) {
        if (n == 0) zeros++;
        else product *= n;
    }
    int[] res = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        if (zeros >= 2)               res[i] = 0;
        else if (zeros == 1)          res[i] = (nums[i] == 0) ? product : 0;
        else                          res[i] = product / nums[i];
    }
    return res;
}`
  }
},

"FizzBuzz (lọc kinh điển sàng lọc lập trình viên)": {
  diff: "Dễ",
  trap: "Phải kiểm tra chia hết cho 15 TRƯỚC 3 và 5, nếu không sẽ in \"Fizz\" cho số 15. Đây là bài dùng để loại người không viết nổi code, đừng làm phức tạp hóa.",
  alt: {
    title: "Cách khác — nối chuỗi, dễ mở rộng",
    complexity: "O(n)",
    note: "Không cần nhánh cho bội của 15, và thêm quy tắc mới (ví dụ 7 → \"Bazz\") chỉ tốn 1 dòng. Đây là câu trả lời cho câu hỏi tiếp theo: 'nếu thêm luật mới thì sao?'",
    java: `void fizzBuzz(int n) {
    for (int i = 1; i <= n; i++) {
        StringBuilder sb = new StringBuilder();
        if (i % 3 == 0) sb.append("Fizz");
        if (i % 5 == 0) sb.append("Buzz");
        System.out.println(sb.length() > 0 ? sb.toString() : String.valueOf(i));
    }
}`
  }
},

"Reverse Linked List (đảo ngược danh sách liên kết)": {
  diff: "Dễ",
  trap: "Phải lưu con trỏ next TRƯỚC khi đổi hướng cur.next, nếu không sẽ mất phần đuôi danh sách. Cuối vòng lặp trả về prev chứ không phải cur (lúc đó cur đã là null).",
  alt: {
    title: "Cách khác — bản đệ quy",
    complexity: "O(n) thời gian · O(n) bộ nhớ ngăn xếp",
    note: "Ngắn nhưng tốn bộ nhớ và dễ StackOverflowError với danh sách dài. Người phỏng vấn hay yêu cầu viết cả hai bản để xem bạn hiểu đánh đổi.",
    java: `ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverseList(head.next);
    head.next.next = head;   // nút sau trỏ ngược về nút hiện tại
    head.next = null;        // cắt liên kết cũ, tránh tạo vòng
    return newHead;
}`
  }
},

"Detect Cycle — Floyd (thỏ và rùa)": {
  diff: "Dễ",
  trap: "Điều kiện vòng lặp phải là fast != null && fast.next != null — thiếu vế nào cũng NullPointerException với danh sách độ dài chẵn/lẻ.",
  alt: {
    title: "Cách khác — HashSet, và tìm luôn nút bắt đầu chu trình",
    complexity: "HashSet: O(n) thời gian, O(n) bộ nhớ · Floyd: O(1) bộ nhớ",
    note: "HashSet dễ hiểu và cho luôn nút vào chu trình. Với Floyd, sau khi gặp nhau hãy đưa một con trỏ về head rồi cho cả hai đi 1 bước — chúng gặp nhau đúng tại điểm vào chu trình (LC 142).",
    java: `ListNode detectCycleStart(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {                 // có chu trình
            ListNode p = head;
            while (p != slow) { p = p.next; slow = slow.next; }
            return p;                        // nút bắt đầu chu trình
        }
    }
    return null;
}`
  }
},

"Merge Two Sorted Lists (trộn 2 danh sách đã sắp xếp)": {
  diff: "Dễ",
  trap: "Đừng quên nối phần đuôi còn lại sau vòng lặp. Dùng dummy node để không phải viết nhánh riêng cho nút đầu.",
  alt: {
    title: "Cách khác — đệ quy, và trộn K danh sách bằng heap",
    complexity: "Trộn 2: O(m+n) · Trộn K bằng heap: O(N log k)",
    note: "Câu hỏi nối tiếp gần như chắc chắn là LC 23 — trộn K danh sách. Dùng PriorityQueue giữ k nút đầu, mỗi lần lấy nút nhỏ nhất rồi nạp nút kế tiếp của nó.",
    java: `ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode l : lists) if (l != null) pq.offer(l);

    ListNode dummy = new ListNode(0), tail = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        tail.next = node;
        tail = node;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`
  }
},

"Binary Tree — độ sâu & duyệt theo lớp (Level Order)": {
  diff: "Dễ",
  trap: "Phải chốt int size = queue.size() TRƯỚC vòng lặp trong, nếu không các mức sẽ trộn lẫn vào nhau vì queue đang bị thêm phần tử ngay trong lúc duyệt.",
  alt: {
    title: "Cách khác — DFS truyền theo mức",
    complexity: "O(n) thời gian · O(h) bộ nhớ với h là chiều cao cây",
    note: "Đệ quy kèm tham số depth: nếu res.size() == depth thì tạo danh sách mới cho mức đó. Tốn ít bộ nhớ hơn BFS khi cây hẹp và sâu.",
    java: `List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(root, 0, res);
    return res;
}

private void dfs(TreeNode node, int depth, List<List<Integer>> res) {
    if (node == null) return;
    if (res.size() == depth) res.add(new ArrayList<>());   // gặp mức mới
    res.get(depth).add(node.val);
    dfs(node.left, depth + 1, res);
    dfs(node.right, depth + 1, res);
}`
  }
},

"Validate BST (kiểm tra cây tìm kiếm nhị phân)": {
  diff: "Trung bình",
  trap: "So sánh nút với hai con trực tiếp là SAI — phải truyền khoảng (min, max) xuống. Dùng Long thay Integer để tránh hỏng khi cây có nút mang giá trị Integer.MIN_VALUE.",
  alt: {
    title: "Cách khác — duyệt in-order kiểm tra dãy tăng",
    complexity: "O(n) thời gian · O(h) bộ nhớ",
    note: "BST duyệt in-order phải cho dãy TĂNG NGHIÊM NGẶT. Chỉ cần giữ giá trị trước đó, không cần truyền khoảng — code gọn hơn và ít lỗi biên hơn.",
    java: `private Integer prev = null;

boolean isValidBST(TreeNode root) {
    if (root == null) return true;
    if (!isValidBST(root.left)) return false;
    if (prev != null && root.val <= prev) return false;   // phải tăng nghiêm ngặt
    prev = root.val;
    return isValidBST(root.right);
}`
  }
},

"Permutations (liệt kê mọi hoán vị)": {
  diff: "Trung bình",
  trap: "Nhớ remove phần tử cuối khi quay lui, nếu không danh sách tạm sẽ tích lũy sai. Khi thêm kết quả phải new ArrayList<>(path) — thêm thẳng path sẽ lưu tham chiếu và cuối cùng tất cả đều rỗng.",
  alt: {
    title: "Cách khác — hoán vị tại chỗ bằng swap",
    complexity: "O(n × n!) thời gian · O(n) bộ nhớ phụ",
    note: "Không cần mảng used, không cần contains — chỉ hoán đổi phần tử ở vị trí start với từng phần tử phía sau rồi hoàn tác. Nhanh hơn đáng kể.",
    java: `List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, res);
    return res;
}

private void backtrack(int[] nums, int start, List<List<Integer>> res) {
    if (start == nums.length) {
        List<Integer> one = new ArrayList<>();
        for (int n : nums) one.add(n);
        res.add(one);
        return;
    }
    for (int i = start; i < nums.length; i++) {
        swap(nums, start, i);
        backtrack(nums, start + 1, res);
        swap(nums, start, i);          // hoàn tác
    }
}`
  }
},

"Subsets (liệt kê mọi tập con — power set)": {
  diff: "Trung bình",
  trap: "Có 2^n tập con nên n > 20 là bất khả thi — nếu đề cho n lớn thì chắc chắn phải tìm hướng khác (DP, greedy), không phải liệt kê.",
  alt: {
    title: "Cách khác — đếm nhị phân (bitmask)",
    complexity: "O(n × 2^n) thời gian",
    note: "Mỗi số từ 0 đến 2^n - 1 là một mặt nạ bit: bit thứ i bật nghĩa là chọn phần tử i. Không đệ quy, dễ song song hóa, và là cách tự nhiên khi đã quen bit manipulation.",
    java: `List<List<Integer>> subsets(int[] nums) {
    int n = nums.length;
    List<List<Integer>> res = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> one = new ArrayList<>();
        for (int i = 0; i < n; i++)
            if ((mask & (1 << i)) != 0) one.add(nums[i]);
        res.add(one);
    }
    return res;
}`
  }
},

"Generate Parentheses (sinh dãy ngoặc hợp lệ)": {
  diff: "Trung bình",
  trap: "Hai điều kiện cắt nhánh: chỉ mở khi open < n, và chỉ ĐÓNG khi close < open. Sinh hết rồi mới lọc là O(2^2n) — quá chậm và trượt ý đồ của đề.",
  alt: {
    title: "Cách khác — DP theo n (ghép cấu trúc)",
    complexity: "Vẫn là số Catalan C(n), nhưng tái sử dụng kết quả nhỏ hơn",
    note: "Mọi dãy hợp lệ đều có dạng \"(\" + A + \")\" + B với A, B là dãy hợp lệ nhỏ hơn. Số lượng kết quả chính là số Catalan thứ n.",
    java: `List<String> generateParenthesis(int n) {
    List<List<String>> dp = new ArrayList<>();
    dp.add(List.of(""));                      // n = 0

    for (int i = 1; i <= n; i++) {
        List<String> cur = new ArrayList<>();
        for (int j = 0; j < i; j++)           // A có j cặp, B có i-1-j cặp
            for (String a : dp.get(j))
                for (String b : dp.get(i - 1 - j))
                    cur.add("(" + a + ")" + b);
        dp.add(cur);
    }
    return dp.get(n);
}`
  }
},

"LRU Cache (bộ nhớ đệm loại bỏ ít dùng gần đây)": {
  diff: "Khó",
  trap: "get CŨNG phải cập nhật thứ tự truy cập, không chỉ put — quên chỗ này là sai hoàn toàn ngữ nghĩa LRU. Cần HashMap + danh sách liên kết đôi để cả hai thao tác đều O(1).",
  alt: {
    title: "Cách khác — LinkedHashMap với accessOrder = true",
    complexity: "O(1) cho cả get và put",
    note: "Java có sẵn cơ chế này. Phỏng vấn thường yêu cầu tự cài để xem bạn hiểu cấu trúc bên trong, nhưng nêu ra bản thư viện cho thấy bạn biết công cụ. Cần đồng thời thì bọc Collections.synchronizedMap hoặc dùng Caffeine.",
    java: `class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    LRUCache(int capacity) {
        super(capacity, 0.75f, true);   // true = sắp theo THỨ TỰ TRUY CẬP
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;       // tự loại phần tử ít dùng nhất
    }
}`
  }
},

"Merge Intervals (gộp khoảng — lịch họp/đặt phòng)": {
  diff: "Trung bình",
  trap: "Bài này sắp theo điểm BẮT ĐẦU — khác hẳn Non-overlapping Intervals (sắp theo điểm kết thúc). Nhớ nhầm cặp này là hỏng cả hai bài.",
  alt: {
    title: "Cách khác — sweep line (đếm số phòng họp tối thiểu)",
    complexity: "O(n log n) thời gian · O(n) bộ nhớ",
    note: "Tách mọi mốc thành sự kiện +1 (bắt đầu) và -1 (kết thúc), sắp theo thời gian rồi cộng dồn. Đỉnh cao nhất chính là số phòng cần thuê — biến thể LC 253 rất hay bị hỏi tiếp.",
    java: `int minMeetingRooms(int[][] intervals) {
    int n = intervals.length;
    int[] starts = new int[n], ends = new int[n];
    for (int i = 0; i < n; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }
    Arrays.sort(starts);
    Arrays.sort(ends);

    int rooms = 0, maxRooms = 0, e = 0;
    for (int s = 0; s < n; s++) {
        while (e < n && ends[e] <= starts[s]) { rooms--; e++; }  // có phòng vừa trống
        rooms++;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}`
  }
},

"Rate Limiter (giới hạn tần suất — sliding window)": {
  diff: "Trung bình",
  trap: "Fixed window cho phép GẤP ĐÔI hạn mức ở ranh giới (dồn hết vào cuối cửa sổ này và đầu cửa sổ sau). Trong hệ nhiều instance phải đưa bộ đếm ra Redis, không giữ trong bộ nhớ tiến trình.",
  alt: {
    title: "Cách khác — Token Bucket",
    complexity: "O(1) mỗi lần kiểm tra · O(1) bộ nhớ mỗi khóa",
    note: "Token bucket cho phép BURST có kiểm soát (tích lũy token khi rảnh) — thường đúng với thực tế hơn sliding window log, lại chỉ cần lưu 2 số thay vì cả danh sách mốc thời gian.",
    java: `class TokenBucket {
    private final long capacity;      // sức chứa tối đa
    private final double refillPerMs; // tốc độ nạp lại
    private double tokens;
    private long lastRefill = System.currentTimeMillis();

    TokenBucket(long capacity, double tokensPerSecond) {
        this.capacity = capacity;
        this.refillPerMs = tokensPerSecond / 1000.0;
        this.tokens = capacity;
    }

    synchronized boolean tryAcquire() {
        long now = System.currentTimeMillis();
        tokens = Math.min(capacity, tokens + (now - lastRefill) * refillPerMs);
        lastRefill = now;
        if (tokens >= 1) { tokens -= 1; return true; }
        return false;
    }
}`
  }
},

"Debounce & Throttle (giới hạn gọi hàm — FE thực chiến)": {
  diff: "Trung bình",
  trap: "Debounce = chỉ chạy khi NGƯỜI DÙNG ĐÃ NGỪNG (ô tìm kiếm). Throttle = chạy đều đặn tối đa 1 lần mỗi khoảng (sự kiện scroll). Dùng nhầm là hỏng trải nghiệm.",
  alt: {
    title: "Cách khác — bản Java bằng ScheduledExecutorService",
    complexity: "O(1) mỗi lần gọi",
    note: "Backend cũng cần debounce: gom nhiều sự kiện thay đổi thành một lần ghi (ví dụ đồng bộ chỉ mục tìm kiếm, gửi thông báo gộp). Nhớ shutdown executor khi ứng dụng dừng.",
    java: `class Debouncer {
    private final ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> pending;
    private final long delayMs;

    Debouncer(long delayMs) { this.delayMs = delayMs; }

    synchronized void call(Runnable task) {
        if (pending != null && !pending.isDone()) pending.cancel(false);
        pending = scheduler.schedule(task, delayMs, TimeUnit.MILLISECONDS);
    }

    void shutdown() { scheduler.shutdown(); }
}`
  }
},

"Retry với Exponential Backoff (gọi API dễ lỗi mạng)": {
  diff: "Trung bình",
  trap: "Thiếu JITTER thì mọi client cùng thử lại một lúc — thundering herd đánh sập chính dịch vụ vừa hồi phục. Chỉ retry thao tác IDEMPOTENT và lỗi TẠM THỜI (timeout, 5xx), không retry 400/401.",
  alt: {
    title: "Cách khác — Resilience4j khai báo",
    complexity: "Cấu hình thay vì viết tay",
    note: "Trong Spring Boot nên dùng thư viện: có sẵn jitter, giới hạn số lần, tích hợp circuit breaker và metric. Tự viết chỉ hợp lý khi không được thêm phụ thuộc.",
    java: `// application.yml
// resilience4j.retry.instances.payment:
//   max-attempts: 4
//   wait-duration: 200ms
//   exponential-backoff-multiplier: 2
//   randomized-wait-factor: 0.5        # chính là jitter
//   retry-exceptions:
//     - java.io.IOException

@Retry(name = "payment", fallbackMethod = "fallback")
public PaymentResult charge(PaymentRequest req) {
    return gatewayClient.charge(req);
}

private PaymentResult fallback(PaymentRequest req, Throwable t) {
    return PaymentResult.pending(req.getId());   // không nuốt lỗi, chuyển sang chờ đối soát
}`
  }
},

"Base62 Encode (sinh mã ngắn cho URL shortener)": {
  diff: "Dễ",
  trap: "id = 0 phải trả về ký tự đầu tiên chứ không phải chuỗi rỗng. Mã sinh tuần tự thì ĐOÁN ĐƯỢC — nếu link cần riêng tư phải trộn id hoặc thêm phần ngẫu nhiên.",
  alt: {
    title: "Cách khác — băm nội dung rồi cắt ngắn",
    complexity: "O(độ dài URL)",
    note: "Băm cho phép cùng một URL luôn ra cùng mã (tiết kiệm chỗ), nhưng PHẢI xử lý va chạm: kiểm tra trong kho, trùng thì thêm muối rồi băm lại.",
    java: `String shortCode(String url, int length) {
    try {
        byte[] digest = MessageDigest.getInstance("SHA-256")
                                     .digest(url.getBytes(StandardCharsets.UTF_8));
        String base64 = Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
        return base64.substring(0, length);   // nhớ kiểm tra va chạm trước khi lưu
    } catch (NoSuchAlgorithmException e) {
        throw new IllegalStateException(e);
    }
}`
  }
},

"Flatten & Deep Clone (làm phẳng / sao chép sâu — JS thực chiến)": {
  diff: "Trung bình",
  trap: "Sao chép nông (spread, Object.assign, clone() mặc định) chỉ chép tham chiếu ở tầng trong — sửa bản sao là sửa luôn bản gốc. Cấu trúc có tham chiếu vòng sẽ gây đệ quy vô hạn.",
  alt: {
    title: "Cách khác — bản Java: làm phẳng bằng Stream, sao chép sâu bằng copy constructor",
    complexity: "O(n) với n là tổng số phần tử/trường",
    note: "Trong Java nên tránh sao chép sâu bằng serialization (chậm, dễ dính lỗ hổng deserialization). Ưu tiên copy constructor hoặc record bất biến — an toàn và rõ ràng nhất.",
    java: `// Làm phẳng danh sách lồng nhau
List<Object> flatten(List<?> list) {
    return list.stream()
        .flatMap(x -> x instanceof List<?> inner
            ? flatten(inner).stream()
            : Stream.of(x))
        .collect(Collectors.toList());
}

// Sao chép sâu bằng copy constructor — cách được khuyến nghị
class Order {
    private final String id;
    private final List<Item> items;

    Order(Order other) {
        this.id = other.id;
        this.items = other.items.stream().map(Item::new).toList(); // chép cả tầng trong
    }
}`
  }
}

};
