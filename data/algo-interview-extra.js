// Các bài bổ sung tập trung vào trace/tính tay, thuật toán thuần và LeetCode hay gặp.
(function () {
  var extraGroups = [
    {
      group: "Hay gặp nhất — Tính toán & Trace",
      items: [
        {
          name: "Prefix Sum — trả lời nhiều truy vấn tổng đoạn",
          diff: "Dễ",
          trap: "Đặt prefix[0] = 0 và dùng tổng đoạn [l..r] = prefix[r + 1] - prefix[l]. Sai lệch một chỉ số là lỗi phổ biến nhất; tổng lớn nên dùng long.",
          alt: {
            title: "Cách khác — Prefix Sum 2D cho tổng hình chữ nhật",
            complexity: "Dựng O(m·n), mỗi truy vấn O(1)",
            note: "Với ma trận, cộng vùng trên và trái rồi trừ phần giao bị cộng hai lần.",
            java: "long[][] buildPrefix2D(int[][] a) {\n    int m = a.length, n = a[0].length;\n    long[][] p = new long[m + 1][n + 1];\n    for (int i = 1; i <= m; i++)\n        for (int j = 1; j <= n; j++)\n            p[i][j] = a[i - 1][j - 1] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];\n    return p;\n}"
          },
          examples: [
            { input: "nums = [2, -1, 3, 5], queries = [[0,2], [1,3]]", output: "[4, 7]", note: "prefix = [0,2,1,4,9]. Tổng [0..2] = 4-0; tổng [1..3] = 9-2." },
            { input: "nums = [1, 2, 3], query = [2,2]", output: "3", note: "Đoạn một phần tử vẫn dùng cùng công thức prefix[3] - prefix[2]." }
          ],
          complexity: "Dựng O(n) · Mỗi truy vấn O(1) · Bộ nhớ O(n)",
          idea: "Lưu tổng của mọi tiền tố. Khi cần tổng một đoạn, lấy tổng tới r trừ phần đứng trước l thay vì cộng lại từng phần tử.",
          steps: ["Tạo prefix có n+1 phần tử và prefix[0] = 0.", "Với i từ 0 đến n-1: prefix[i+1] = prefix[i] + nums[i].", "Mỗi truy vấn [l,r] trả prefix[r+1] - prefix[l].", "Dùng long nếu n hoặc giá trị phần tử lớn."],
          java: "long[] rangeSums(int[] nums, int[][] queries) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] ans = new long[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n        int l = queries[i][0], r = queries[i][1];\n        ans[i] = prefix[r + 1] - prefix[l];\n    }\n    return ans;\n}",
          js: "function rangeSums(nums, queries) {\n  const prefix = Array(nums.length + 1).fill(0);\n  for (let i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n  return queries.map(([l, r]) => prefix[r + 1] - prefix[l]);\n}"
        },
        {
          name: "Difference Array — cộng hàng loạt trên nhiều đoạn",
          diff: "Trung bình",
          trap: "Phải kiểm tra r + 1 còn nằm trong mảng trước khi trừ. Difference array phù hợp khi nhận hết update rồi mới cần kết quả; không trả lời xen kẽ update/query như Fenwick Tree.",
          alt: {
            title: "Cách khác — Fenwick Tree khi update và query xen kẽ",
            complexity: "Mỗi update/query O(log n)",
            note: "Dùng Fenwick hoặc Segment Tree khi cần đọc kết quả trong lúc vẫn tiếp tục cập nhật.",
            java: "void add(long[] bit, int i, long delta) {\n    for (i++; i < bit.length; i += i & -i) bit[i] += delta;\n}\nlong prefix(long[] bit, int i) {\n    long sum = 0;\n    for (i++; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n}"
          },
          examples: [
            { input: "n = 5, updates = [[1,3,2], [2,4,3]]", output: "[0,2,5,5,3]", note: "Đánh dấu +2 tại 1, -2 tại 4; +3 tại 2. Cộng dồn difference để khôi phục mảng." },
            { input: "n = 4, updates = [[0,3,-1]]", output: "[-1,-1,-1,-1]", note: "Update phủ tới cuối nên không có vị trí r+1 để trừ." }
          ],
          complexity: "O(n + q) thời gian · O(n) bộ nhớ cho q cập nhật",
          idea: "Muốn cộng delta vào mọi phần tử [l..r], chỉ đánh dấu diff[l] += delta và diff[r+1] -= delta; cuối cùng cộng dồn một lần.",
          steps: ["Khởi tạo diff kích thước n bằng 0.", "Mỗi update [l,r,delta]: cộng tại l.", "Nếu r+1<n, trừ delta tại r+1.", "Chạy prefix sum trên diff để nhận giá trị cuối của từng vị trí."],
          java: "long[] applyUpdates(int n, int[][] updates) {\n    long[] diff = new long[n];\n    for (int[] u : updates) {\n        int l = u[0], r = u[1], delta = u[2];\n        diff[l] += delta;\n        if (r + 1 < n) diff[r + 1] -= delta;\n    }\n    for (int i = 1; i < n; i++) diff[i] += diff[i - 1];\n    return diff;\n}",
          js: "function applyUpdates(n, updates) {\n  const diff = Array(n).fill(0);\n  for (const [l, r, delta] of updates) {\n    diff[l] += delta;\n    if (r + 1 < n) diff[r + 1] -= delta;\n  }\n  for (let i = 1; i < n; i++) diff[i] += diff[i - 1];\n  return diff;\n}"
        },
        {
          name: "Trace Binary Search — đếm số lần so sánh và tìm biên",
          diff: "Dễ",
          trap: "Không học thuộc floor(log2 n)+1 cho mọi biến thể. Hãy trace đúng điều kiện left <= right hoặc left < right; hai template có invariant và cách cập nhật biên khác nhau.",
          alt: {
            title: "Cách khác — Lower Bound tìm vị trí đầu tiên >= target",
            complexity: "O(log n) thời gian · O(1) bộ nhớ",
            note: "Template nửa mở [left,right) tránh phải dùng answer riêng và cũng trả đúng vị trí chèn.",
            java: "int lowerBound(int[] a, int target) {\n    int left = 0, right = a.length;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (a[mid] < target) left = mid + 1;\n        else right = mid;\n    }\n    return left;\n}"
          },
          examples: [
            { input: "a = [1,3,5,7,9,11,13], target = 11", output: "index 5, 2 lần so sánh chính", note: "mid lần lượt là 3 (7), rồi 5 (11)." },
            { input: "n = 1, target không tồn tại", output: "1 lần so sánh chính", note: "Vẫn phải kiểm phần tử duy nhất trước khi left vượt right." }
          ],
          complexity: "O(log n) thời gian · O(1) bộ nhớ",
          idea: "Nhà tuyển dụng đưa mảng và yêu cầu nói từng giá trị left, mid, right. Mục tiêu là chứng minh invariant chứ không chỉ đọc kết quả.",
          steps: ["Ghi rõ interval đang dùng: đóng [left,right] hay nửa mở [left,right).", "Tính mid chống tràn.", "Sau mỗi so sánh, gạch bỏ nửa chắc chắn không chứa đáp án.", "Với bài tìm biên, không dừng khi thấy target; tiếp tục ép về phía cần tìm."],
          java: "int comparisons(int[] a, int target) {\n    int left = 0, right = a.length - 1, count = 0;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        count++;\n        if (a[mid] == target) return count;\n        if (a[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return count;\n}",
          js: "function comparisons(a, target) {\n  let left = 0, right = a.length - 1, count = 0;\n  while (left <= right) {\n    const mid = left + Math.floor((right - left) / 2);\n    count++;\n    if (a[mid] === target) return count;\n    if (a[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return count;\n}"
        },
        {
          name: "Josephus — tính người sống sót trong vòng tròn",
          diff: "Trung bình",
          trap: "Công thức lặp trả chỉ số 0-based. Nếu đề đánh số người từ 1 thì phải cộng 1 ở cuối. Với k lớn, dùng modulo ở từng bước để tránh số tăng vô ích.",
          alt: {
            title: "Cách khác — mô phỏng bằng Queue để in cả thứ tự bị loại",
            complexity: "O(n·k) đơn giản; có thể tối ưu thao tác xoay",
            note: "Mô phỏng dễ giải thích và lấy được thứ tự loại, nhưng công thức O(n) tốt hơn nếu chỉ hỏi người cuối cùng.",
            java: "List<Integer> eliminationOrder(int n, int k) {\n    Deque<Integer> q = new ArrayDeque<>();\n    for (int i = 1; i <= n; i++) q.addLast(i);\n    List<Integer> out = new ArrayList<>();\n    while (q.size() > 1) {\n        for (int i = 1; i < k; i++) q.addLast(q.removeFirst());\n        out.add(q.removeFirst());\n    }\n    out.add(q.removeFirst());\n    return out;\n}"
          },
          examples: [
            { input: "n = 5, k = 2", output: "3 (đánh số từ 1)", note: "Thứ tự loại 2,4,1,5; người 3 còn lại." },
            { input: "n = 1, k = 7", output: "1", note: "Một người luôn sống sót dù bước nhảy là bao nhiêu." }
          ],
          complexity: "O(n) thời gian · O(1) bộ nhớ nếu chỉ cần người cuối",
          idea: "Gọi f(i) là vị trí sống sót 0-based khi có i người. Khi thêm người thứ i, vị trí cũ dịch k bước: f(i) = (f(i-1) + k) mod i.",
          steps: ["Bắt đầu survivor = 0 cho vòng tròn một người.", "Với size từ 2 đến n: survivor = (survivor + k) % size.", "Kết quả đang là 0-based.", "Nếu đề đánh số 1..n, trả survivor + 1."],
          java: "int josephus(int n, int k) {\n    int survivor = 0;\n    for (int size = 2; size <= n; size++) survivor = (survivor + k) % size;\n    return survivor + 1;\n}",
          js: "function josephus(n, k) {\n  let survivor = 0;\n  for (let size = 2; size <= n; size++) survivor = (survivor + k) % size;\n  return survivor + 1;\n}"
        }
      ]
    },
    {
      group: "Thuật toán thuần — Nền tảng bổ sung",
      items: [
        {
          name: "Counting Sort — sắp xếp khi miền giá trị nhỏ",
          diff: "Trung bình",
          trap: "Độ phức tạp phụ thuộc miền k = max-min, không chỉ n. Nếu dữ liệu thưa như [1, 10^9], mảng đếm là thảm họa bộ nhớ; hãy dùng comparison sort.",
          alt: {
            title: "Cách khác — bản ổn định dùng prefix count",
            complexity: "O(n + k) thời gian · O(n + k) bộ nhớ",
            note: "Muốn stable để sắp object theo key, biến count thành vị trí kết thúc rồi duyệt input từ phải sang trái.",
            java: "int[] stableCountingSort(int[] a, int max) {\n    int[] count = new int[max + 1];\n    for (int x : a) count[x]++;\n    for (int i = 1; i <= max; i++) count[i] += count[i - 1];\n    int[] out = new int[a.length];\n    for (int i = a.length - 1; i >= 0; i--) out[--count[a[i]]] = a[i];\n    return out;\n}"
          },
          examples: [
            { input: "a = [4,2,2,8,3,3,1]", output: "[1,2,2,3,3,4,8]", note: "Chỉ cần đếm tần suất các giá trị từ 1 đến 8 rồi ghi lại." },
            { input: "a = [-2,3,-2,0]", output: "[-2,-2,0,3]", note: "Dịch chỉ số bằng min: index = value - min để hỗ trợ số âm." }
          ],
          complexity: "O(n + k) thời gian · O(k) bộ nhớ, với k = max-min+1",
          idea: "Không so sánh từng cặp. Đếm số lần xuất hiện của mỗi giá trị trong miền nhỏ rồi tái tạo mảng theo thứ tự.",
          steps: ["Tìm min và max để biết miền giá trị.", "Tạo count kích thước max-min+1.", "Đếm count[value-min].", "Duyệt count từ trái sang phải và ghi mỗi giá trị đúng số lần."],
          java: "int[] countingSort(int[] a) {\n    if (a.length == 0) return a;\n    int min = a[0], max = a[0];\n    for (int x : a) { min = Math.min(min, x); max = Math.max(max, x); }\n    int[] count = new int[max - min + 1];\n    for (int x : a) count[x - min]++;\n    int p = 0;\n    for (int i = 0; i < count.length; i++)\n        while (count[i]-- > 0) a[p++] = i + min;\n    return a;\n}",
          js: "function countingSort(a) {\n  if (!a.length) return a;\n  const min = Math.min(...a), max = Math.max(...a);\n  const count = Array(max - min + 1).fill(0);\n  for (const x of a) count[x - min]++;\n  let p = 0;\n  for (let i = 0; i < count.length; i++) while (count[i]-- > 0) a[p++] = i + min;\n  return a;\n}"
        },
        {
          name: "Heap Sort — sắp xếp tại chỗ bằng max-heap",
          diff: "Trung bình",
          trap: "Build heap từ n/2-1 xuống 0 là O(n), không phải O(n log n). Heap Sort không stable và thường chậm hơn Quick Sort trong thực tế vì locality kém.",
          alt: {
            title: "Cách khác — PriorityQueue khi chỉ cần top K",
            complexity: "O(n log k) thời gian · O(k) bộ nhớ",
            note: "Không cần sắp toàn bộ nếu đề chỉ hỏi k phần tử lớn nhất/nhỏ nhất; duy trì heap kích thước k.",
            java: "int kthLargest(int[] a, int k) {\n    PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n    for (int x : a) {\n        minHeap.offer(x);\n        if (minHeap.size() > k) minHeap.poll();\n    }\n    return minHeap.peek();\n}"
          },
          examples: [
            { input: "a = [4,10,3,5,1]", output: "[1,3,4,5,10]", note: "Build max-heap đưa 10 lên gốc; đổi gốc với cuối rồi heapify phần còn lại." },
            { input: "a = [2,2,1]", output: "[1,2,2]", note: "Kết quả đúng nhưng hai phần tử 2 có thể đổi thứ tự tương đối nên không stable." }
          ],
          complexity: "O(n log n) mọi trường hợp · O(1) bộ nhớ · Không stable",
          idea: "Biến mảng thành max-heap. Mỗi lượt đưa phần tử lớn nhất ở gốc về cuối, thu nhỏ heap và khôi phục heap.",
          steps: ["Heapify các node không phải lá từ n/2-1 về 0.", "Đổi a[0] với phần tử cuối vùng heap.", "Giảm kích thước heap một đơn vị.", "Heapify từ gốc và lặp tới khi còn một phần tử."],
          java: "void heapSort(int[] a) {\n    int n = a.length;\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);\n    for (int end = n - 1; end > 0; end--) {\n        int t = a[0]; a[0] = a[end]; a[end] = t;\n        heapify(a, end, 0);\n    }\n}\nvoid heapify(int[] a, int n, int i) {\n    while (true) {\n        int largest = i, left = 2 * i + 1, right = left + 1;\n        if (left < n && a[left] > a[largest]) largest = left;\n        if (right < n && a[right] > a[largest]) largest = right;\n        if (largest == i) return;\n        int t = a[i]; a[i] = a[largest]; a[largest] = t;\n        i = largest;\n    }\n}",
          js: "function heapSort(a) {\n  const heapify = (n, i) => {\n    while (true) {\n      let largest = i, left = 2 * i + 1, right = left + 1;\n      if (left < n && a[left] > a[largest]) largest = left;\n      if (right < n && a[right] > a[largest]) largest = right;\n      if (largest === i) return;\n      [a[i], a[largest]] = [a[largest], a[i]];\n      i = largest;\n    }\n  };\n  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i);\n  for (let end = a.length - 1; end > 0; end--) {\n    [a[0], a[end]] = [a[end], a[0]];\n    heapify(end, 0);\n  }\n  return a;\n}"
        },
        {
          name: "KMP — tìm chuỗi con không lùi con trỏ văn bản",
          diff: "Khó",
          trap: "LPS[i] là độ dài proper prefix cũng là suffix của pattern[0..i], không phải chỉ số bắt đầu. Khi mismatch trong lúc dựng LPS, lùi len = lps[len-1], không tăng i.",
          alt: {
            title: "Cách khác — Rabin-Karp bằng rolling hash",
            complexity: "O(n+m) trung bình, xấu nhất O(n·m)",
            note: "Rabin-Karp hợp khi tìm nhiều pattern hoặc cửa sổ hash, nhưng phải xử lý collision bằng so sánh lại chuỗi.",
            java: "int naiveSearch(String text, String pattern) {\n    for (int i = 0; i + pattern.length() <= text.length(); i++)\n        if (text.regionMatches(i, pattern, 0, pattern.length())) return i;\n    return -1;\n}"
          },
          examples: [
            { input: "text = \"abxabcabcaby\", pattern = \"abcaby\"", output: "6", note: "LPS của pattern là [0,0,0,1,2,0]; mismatch tái sử dụng phần prefix đã khớp." },
            { input: "text = \"aaaaa\", pattern = \"bba\"", output: "-1", note: "Không tìm thấy và con trỏ text không bao giờ bị lùi." }
          ],
          complexity: "O(n + m) thời gian · O(m) bộ nhớ",
          idea: "Mảng LPS cho biết sau mismatch có thể giữ lại bao nhiêu ký tự prefix đã khớp, tránh so sánh lại văn bản từ đầu.",
          steps: ["Dựng LPS cho pattern.", "Duyệt text bằng i và pattern bằng j.", "Khớp thì tăng cả hai; j == m thì trả i-j.", "Mismatch và j>0 thì j=lps[j-1]; nếu j==0 mới tăng i."],
          java: "int kmp(String text, String pattern) {\n    if (pattern.isEmpty()) return 0;\n    int[] lps = buildLps(pattern);\n    for (int i = 0, j = 0; i < text.length();) {\n        if (text.charAt(i) == pattern.charAt(j)) { i++; j++; if (j == pattern.length()) return i - j; }\n        else if (j > 0) j = lps[j - 1];\n        else i++;\n    }\n    return -1;\n}\nint[] buildLps(String p) {\n    int[] lps = new int[p.length()];\n    for (int i = 1, len = 0; i < p.length();) {\n        if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;\n        else if (len > 0) len = lps[len - 1];\n        else lps[i++] = 0;\n    }\n    return lps;\n}",
          js: "function kmp(text, pattern) {\n  if (!pattern.length) return 0;\n  const lps = Array(pattern.length).fill(0);\n  for (let i = 1, len = 0; i < pattern.length;) {\n    if (pattern[i] === pattern[len]) lps[i++] = ++len;\n    else if (len) len = lps[len - 1];\n    else lps[i++] = 0;\n  }\n  for (let i = 0, j = 0; i < text.length;) {\n    if (text[i] === pattern[j]) { i++; j++; if (j === pattern.length) return i - j; }\n    else if (j) j = lps[j - 1];\n    else i++;\n  }\n  return -1;\n}"
        },
        {
          name: "Floyd–Warshall — đường đi ngắn nhất giữa mọi cặp đỉnh",
          diff: "Khó",
          trap: "Phải kiểm tra hai đoạn đường khác INF trước khi cộng để tránh overflow. Thuật toán cho phép cạnh âm nhưng không cho chu trình âm; dist[i][i] < 0 sau khi chạy báo chu trình âm.",
          alt: {
            title: "Cách khác — chạy Dijkstra từ mỗi đỉnh khi graph thưa",
            complexity: "O(V·(E log V)) với adjacency list và heap",
            note: "Floyd-Warshall hợp graph dày hoặc V nhỏ; repeated Dijkstra thường tốt hơn khi E nhỏ và không có cạnh âm.",
            java: "boolean hasNegativeCycle(long[][] dist) {\n    for (int i = 0; i < dist.length; i++) if (dist[i][i] < 0) return true;\n    return false;\n}"
          },
          examples: [
            { input: "edges: 0→1=3, 1→2=2, 0→2=10", output: "dist[0][2] = 5", note: "Cho phép đỉnh trung gian 1 tạo đường 0→1→2 ngắn hơn cạnh trực tiếp." },
            { input: "0→1=1, 1→0=-3", output: "phát hiện chu trình âm", note: "Sau cập nhật, ít nhất một dist[i][i] trở thành số âm." }
          ],
          complexity: "O(V³) thời gian · O(V²) bộ nhớ",
          idea: "Sau vòng k, dist[i][j] là đường ngắn nhất từ i tới j chỉ dùng các đỉnh trung gian trong tập 0..k.",
          steps: ["Khởi tạo dist[i][i]=0, cạnh có trọng số; còn lại INF.", "Lần lượt chọn k làm đỉnh trung gian mới.", "Với mọi i,j, thử dist[i][k] + dist[k][j].", "Sau cùng kiểm đường chéo âm để phát hiện negative cycle."],
          java: "long[][] floydWarshall(long[][] dist) {\n    int n = dist.length;\n    long inf = Long.MAX_VALUE / 4;\n    for (int k = 0; k < n; k++)\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++)\n                if (dist[i][k] < inf && dist[k][j] < inf)\n                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n    return dist;\n}",
          js: "function floydWarshall(dist) {\n  const n = dist.length;\n  for (let k = 0; k < n; k++)\n    for (let i = 0; i < n; i++)\n      for (let j = 0; j < n; j++)\n        if (Number.isFinite(dist[i][k]) && Number.isFinite(dist[k][j]))\n          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n  return dist;\n}"
        }
      ]
    },
    {
      group: "LeetCode — Mảng & tìm kiếm bổ sung",
      items: [
        {
          name: "Find First and Last Position of Element in Sorted Array",
          lc: 34,
          slug: "find-first-and-last-position-of-element-in-sorted-array",
          diff: "Trung bình",
          tags: ["Binary Search", "Array"],
          trap: "Tìm thấy target chưa được dừng vì đó có thể chưa phải biên. Viết hai binary search rõ ràng hoặc dùng lowerBound(target) và lowerBound(target+1), nhưng target+1 có nguy cơ overflow.",
          alt: {
            title: "Cách khác — hai hàm tìm biên tường minh",
            complexity: "O(log n) thời gian · O(1) bộ nhớ",
            note: "Một hàm ép sang trái khi gặp target, hàm còn lại ép sang phải; dài hơn nhưng tránh phép target+1.",
            java: "int boundary(int[] a, int target, boolean first) {\n    int l = 0, r = a.length - 1, ans = -1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (a[m] == target) { ans = m; if (first) r = m - 1; else l = m + 1; }\n        else if (a[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return ans;\n}"
          },
          examples: [
            { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]", note: "Binary search thứ nhất tìm vị trí chèn của 8; lần hai tìm vị trí chèn sau mọi số 8." },
            { input: "nums = [], target = 0", output: "[-1,-1]", note: "lowerBound trả 0 nhưng phải kiểm index còn trong mảng và nums[index] đúng target." }
          ],
          complexity: "O(log n) thời gian · O(1) bộ nhớ",
          idea: "Tách bài thành tìm lower bound đầu tiên >= target và upper bound đầu tiên > target. Nếu target tồn tại, kết quả là [lower, upper-1].",
          steps: ["Tìm vị trí đầu tiên có giá trị >= target.", "Kiểm target thật sự tồn tại tại vị trí đó.", "Tìm vị trí đầu tiên có giá trị > target.", "Trả [first, upper-1], nếu không có trả [-1,-1]."],
          java: "int[] searchRange(int[] a, int target) {\n    int first = lowerBound(a, target);\n    if (first == a.length || a[first] != target) return new int[]{-1, -1};\n    int l = first, r = a.length;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (a[m] <= target) l = m + 1; else r = m;\n    }\n    return new int[]{first, l - 1};\n}\nint lowerBound(int[] a, int target) {\n    int l = 0, r = a.length;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (a[m] < target) l = m + 1; else r = m;\n    }\n    return l;\n}",
          js: "function searchRange(a, target) {\n  const bound = greater => {\n    let l = 0, r = a.length;\n    while (l < r) {\n      const m = l + Math.floor((r - l) / 2);\n      if (a[m] < target || (greater && a[m] === target)) l = m + 1;\n      else r = m;\n    }\n    return l;\n  };\n  const first = bound(false);\n  return first < a.length && a[first] === target ? [first, bound(true) - 1] : [-1, -1];\n}"
        },
        {
          name: "Subarray Sum Equals K",
          lc: 560,
          slug: "subarray-sum-equals-k",
          diff: "Trung bình",
          tags: ["Prefix Sum", "Hash Map", "Array"],
          trap: "Sliding window không dùng được khi có số âm vì tổng không biến đổi đơn điệu. Phải khởi tạo tần suất prefix 0 là 1 để đếm đoạn bắt đầu từ index 0.",
          alt: {
            title: "Cách khác — duyệt mọi điểm bắt đầu với prefix sum",
            complexity: "O(n²) thời gian · O(n) bộ nhớ",
            note: "Bản O(n²) là bước brute force hợp lý để giải thích trước khi tối ưu bằng HashMap.",
            java: "int subarraySumBrute(int[] a, int k) {\n    int count = 0;\n    for (int l = 0; l < a.length; l++) {\n        int sum = 0;\n        for (int r = l; r < a.length; r++) {\n            sum += a[r];\n            if (sum == k) count++;\n        }\n    }\n    return count;\n}"
          },
          examples: [
            { input: "nums = [1,1,1], k = 2", output: "2", note: "Hai đoạn [0..1] và [1..2]. Map lưu tần suất vì cùng prefix có thể đóng góp nhiều đoạn." },
            { input: "nums = [1,-1,0], k = 0", output: "3", note: "Các đoạn [1,-1], [0] và toàn bộ mảng; ví dụ này chứng minh sliding window không phù hợp." }
          ],
          complexity: "O(n) thời gian · O(n) bộ nhớ",
          idea: "Nếu prefix hiện tại là sum, mỗi prefix cũ bằng sum-k tạo ra một đoạn có tổng k kết thúc tại vị trí hiện tại.",
          steps: ["Map freq bắt đầu với {0:1}.", "Cộng từng số vào prefix sum.", "Cộng freq[sum-k] vào kết quả.", "Tăng tần suất sum sau khi đếm để không dùng chính vị trí hiện tại sai cách."],
          java: "int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    int sum = 0, count = 0;\n    for (int x : nums) {\n        sum += x;\n        count += freq.getOrDefault(sum - k, 0);\n        freq.merge(sum, 1, Integer::sum);\n    }\n    return count;\n}",
          js: "function subarraySum(nums, k) {\n  const freq = new Map([[0, 1]]);\n  let sum = 0, count = 0;\n  for (const x of nums) {\n    sum += x;\n    count += freq.get(sum - k) || 0;\n    freq.set(sum, (freq.get(sum) || 0) + 1);\n  }\n  return count;\n}"
        },
        {
          name: "Sort Colors — Dutch National Flag",
          lc: 75,
          slug: "sort-colors",
          diff: "Trung bình",
          tags: ["Two Pointers", "Array", "Sorting"],
          trap: "Sau khi đổi nums[mid] với nums[high], không tăng mid vì phần tử vừa kéo từ cuối về chưa được xét. Đây là lỗi trace phổ biến nhất.",
          alt: {
            title: "Cách khác — đếm số lượng 0, 1, 2",
            complexity: "O(n) thời gian · O(1) bộ nhớ nhưng cần hai lượt",
            note: "Counting dễ viết hơn; bản ba con trỏ giải đúng yêu cầu one-pass và tổng quát ý tưởng partition.",
            java: "void sortColorsCount(int[] a) {\n    int[] count = new int[3];\n    for (int x : a) count[x]++;\n    int p = 0;\n    for (int color = 0; color < 3; color++)\n        while (count[color]-- > 0) a[p++] = color;\n}"
          },
          examples: [
            { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", note: "Ba vùng bất biến: trước low là 0, low..mid-1 là 1, sau high là 2." },
            { input: "nums = [2,0,1]", output: "[0,1,2]", note: "Đổi 2 với high được 1; phải xét lại index mid trước khi đi tiếp." }
          ],
          complexity: "O(n) thời gian · O(1) bộ nhớ · Một lượt",
          idea: "Duy trì ba vùng cho 0, 1 và 2. Con trỏ mid phân loại phần tử chưa xét; low và high là biên nơi đưa 0 hoặc 2 vào.",
          steps: ["low=mid=0, high=n-1.", "Nếu nums[mid]=0, đổi với low rồi tăng low và mid.", "Nếu bằng 1, chỉ tăng mid.", "Nếu bằng 2, đổi với high, giảm high và giữ nguyên mid."],
          java: "void sortColors(int[] a) {\n    int low = 0, mid = 0, high = a.length - 1;\n    while (mid <= high) {\n        if (a[mid] == 0) {\n            int t = a[low]; a[low++] = a[mid]; a[mid++] = t;\n        } else if (a[mid] == 1) {\n            mid++;\n        } else {\n            int t = a[mid]; a[mid] = a[high]; a[high--] = t;\n        }\n    }\n}",
          js: "function sortColors(a) {\n  let low = 0, mid = 0, high = a.length - 1;\n  while (mid <= high) {\n    if (a[mid] === 0) {\n      [a[low], a[mid]] = [a[mid], a[low]];\n      low++; mid++;\n    } else if (a[mid] === 1) {\n      mid++;\n    } else {\n      [a[mid], a[high]] = [a[high], a[mid]];\n      high--;\n    }\n  }\n  return a;\n}"
        }
      ]
    },
    {
      group: "LeetCode — Cây & BFS bổ sung",
      items: [
        {
          name: "Symmetric Tree",
          lc: 101,
          slug: "symmetric-tree",
          diff: "Dễ",
          tags: ["Binary Tree", "DFS", "BFS"],
          trap: "Không so sánh hai nhánh cùng hướng. Mirror yêu cầu left.left với right.right và left.right với right.left; đồng thời phải xử lý một bên null, một bên không null.",
          alt: {
            title: "Cách khác — BFS theo từng cặp node đối xứng",
            complexity: "O(n) thời gian · O(n) bộ nhớ",
            note: "Queue lưu từng cặp cần soi gương; cách này tránh stack overflow khi cây rất sâu.",
            java: "boolean isSymmetricBfs(TreeNode root) {\n    if (root == null) return true;\n    Deque<TreeNode[]> q = new ArrayDeque<>();\n    q.add(new TreeNode[]{root.left, root.right});\n    while (!q.isEmpty()) {\n        TreeNode[] p = q.remove(); TreeNode a = p[0], b = p[1];\n        if (a == null || b == null) { if (a != b) return false; continue; }\n        if (a.val != b.val) return false;\n        q.add(new TreeNode[]{a.left, b.right});\n        q.add(new TreeNode[]{a.right, b.left});\n    }\n    return true;\n}"
          },
          examples: [
            { input: "root = [1,2,2,3,4,4,3]", output: "true", note: "Hai nhánh có giá trị và cấu trúc phản chiếu qua gốc." },
            { input: "root = [1,2,2,null,3,null,3]", output: "false", note: "Giá trị giống nhau nhưng vị trí node 3 không đối xứng." }
          ],
          complexity: "O(n) thời gian · O(h) stack đệ quy",
          idea: "Hai cây là ảnh gương nếu gốc bằng nhau, nhánh ngoài đối xứng và nhánh trong đối xứng.",
          steps: ["Cây rỗng là đối xứng.", "So sánh root.left với root.right.", "Hai node null cùng lúc là true; chỉ một null là false.", "So sánh giá trị rồi đệ quy cặp ngoài và cặp trong."],
          java: "boolean isSymmetric(TreeNode root) {\n    return root == null || mirror(root.left, root.right);\n}\nboolean mirror(TreeNode a, TreeNode b) {\n    if (a == null || b == null) return a == b;\n    return a.val == b.val\n        && mirror(a.left, b.right)\n        && mirror(a.right, b.left);\n}",
          js: "function isSymmetric(root) {\n  const mirror = (a, b) => {\n    if (!a || !b) return a === b;\n    return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);\n  };\n  return !root || mirror(root.left, root.right);\n}"
        },
        {
          name: "Flood Fill",
          lc: 733,
          slug: "flood-fill",
          diff: "Dễ",
          tags: ["Matrix", "DFS", "BFS"],
          trap: "Nếu màu mới bằng màu cũ mà vẫn DFS, mỗi ô sẽ gọi qua lại vô hạn. Phải return sớm hoặc có visited riêng; đồng thời kiểm biên trước khi đọc matrix.",
          alt: {
            title: "Cách khác — BFS tránh stack overflow",
            complexity: "O(m·n) thời gian · O(m·n) queue xấu nhất",
            note: "BFS phù hợp ảnh/vùng rất lớn vì DFS đệ quy có thể vượt giới hạn call stack.",
            java: "int[][] floodFillBfs(int[][] image, int sr, int sc, int color) {\n    int old = image[sr][sc]; if (old == color) return image;\n    Deque<int[]> q = new ArrayDeque<>(); q.add(new int[]{sr, sc}); image[sr][sc] = color;\n    int[][] d = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!q.isEmpty()) {\n        int[] p = q.remove();\n        for (int[] x : d) {\n            int r = p[0] + x[0], c = p[1] + x[1];\n            if (r>=0 && r<image.length && c>=0 && c<image[0].length && image[r][c]==old) {\n                image[r][c] = color; q.add(new int[]{r,c});\n            }\n        }\n    }\n    return image;\n}"
          },
          examples: [
            { input: "image=[[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2", output: "[[2,2,2],[2,2,0],[2,0,1]]", note: "Ô 1 ở góc phải dưới không nối 4 hướng với vùng bắt đầu nên giữ nguyên." },
            { input: "image=[[0,0]], sr=0, sc=0, color=0", output: "[[0,0]]", note: "Màu mới bằng màu cũ nên trả ngay." }
          ],
          complexity: "O(m·n) thời gian · O(m·n) stack xấu nhất",
          idea: "Từ ô bắt đầu, duyệt component liên thông bốn hướng gồm các ô có màu cũ và đổi chúng sang màu mới.",
          steps: ["Lưu oldColor và return nếu oldColor == newColor.", "DFS từ ô bắt đầu.", "Dừng khi ra ngoài hoặc màu khác oldColor.", "Đổi màu trước khi đi bốn hướng để chính màu mới đóng vai trò visited."],
          java: "int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int old = image[sr][sc];\n    if (old != color) fill(image, sr, sc, old, color);\n    return image;\n}\nvoid fill(int[][] a, int r, int c, int old, int color) {\n    if (r < 0 || r == a.length || c < 0 || c == a[0].length || a[r][c] != old) return;\n    a[r][c] = color;\n    fill(a,r+1,c,old,color); fill(a,r-1,c,old,color);\n    fill(a,r,c+1,old,color); fill(a,r,c-1,old,color);\n}",
          js: "function floodFill(image, sr, sc, color) {\n  const old = image[sr][sc];\n  if (old === color) return image;\n  const fill = (r, c) => {\n    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== old) return;\n    image[r][c] = color;\n    fill(r+1,c); fill(r-1,c); fill(r,c+1); fill(r,c-1);\n  };\n  fill(sr, sc);\n  return image;\n}"
        },
        {
          name: "01 Matrix — khoảng cách tới số 0 gần nhất",
          lc: 542,
          slug: "01-matrix",
          diff: "Trung bình",
          tags: ["Matrix", "Multi-source BFS", "Dynamic Programming"],
          trap: "Chạy BFS riêng từ mỗi ô 1 sẽ thành O((m·n)²). Hãy đưa tất cả ô 0 vào queue từ đầu; chỉ gán khoảng cách khi gặp ô chưa thăm để tránh cập nhật vòng lặp.",
          alt: {
            title: "Cách khác — Dynamic Programming hai lượt",
            complexity: "O(m·n) thời gian · O(1) ngoài ma trận kết quả",
            note: "Lượt xuôi nhận thông tin từ trên/trái; lượt ngược nhận từ dưới/phải. BFS thường dễ chứng minh hơn.",
            java: "int[][] updateMatrixDp(int[][] mat) {\n    int m=mat.length,n=mat[0].length,inf=m+n; int[][] d=new int[m][n];\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) d[i][j]=mat[i][j]==0?0:Math.min(i>0?d[i-1][j]+1:inf,j>0?d[i][j-1]+1:inf);\n    for(int i=m-1;i>=0;i--) for(int j=n-1;j>=0;j--) if(mat[i][j]!=0) d[i][j]=Math.min(d[i][j],Math.min(i+1<m?d[i+1][j]+1:inf,j+1<n?d[i][j+1]+1:inf));\n    return d;\n}"
          },
          examples: [
            { input: "mat=[[0,0,0],[0,1,0],[1,1,1]]", output: "[[0,0,0],[0,1,0],[1,2,1]]", note: "Tất cả số 0 là nguồn BFS ở khoảng cách 0 và lan đồng thời ra ngoài." },
            { input: "mat=[[0,1,1]]", output: "[[0,1,2]]", note: "Khoảng cách tăng một sau mỗi tầng BFS." }
          ],
          complexity: "O(m·n) thời gian · O(m·n) bộ nhớ",
          idea: "Đảo góc nhìn: thay vì mỗi ô 1 đi tìm số 0, cho tất cả số 0 cùng lúc lan khoảng cách bằng multi-source BFS.",
          steps: ["Đưa mọi ô 0 vào queue và đặt dist=0.", "Đặt các ô 1 là chưa thăm, ví dụ -1.", "Pop từng ô; với neighbor chưa thăm, dist=dist hiện tại+1.", "Đánh dấu ngay lúc enqueue để mỗi ô chỉ vào queue một lần."],
          java: "int[][] updateMatrix(int[][] mat) {\n    int m=mat.length,n=mat[0].length; int[][] dist=new int[m][n];\n    Deque<int[]> q=new ArrayDeque<>();\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) {\n        if(mat[i][j]==0) q.add(new int[]{i,j}); else dist[i][j]=-1;\n    }\n    int[][] dirs={{1,0},{-1,0},{0,1},{0,-1}};\n    while(!q.isEmpty()) {\n        int[] p=q.remove();\n        for(int[] d:dirs) {\n            int r=p[0]+d[0],c=p[1]+d[1];\n            if(r>=0&&r<m&&c>=0&&c<n&&dist[r][c]==-1) {\n                dist[r][c]=dist[p[0]][p[1]]+1; q.add(new int[]{r,c});\n            }\n        }\n    }\n    return dist;\n}",
          js: "function updateMatrix(mat) {\n  const m = mat.length, n = mat[0].length, q = [];\n  const dist = Array.from({length:m}, () => Array(n).fill(-1));\n  for (let r=0;r<m;r++) for (let c=0;c<n;c++) if (mat[r][c]===0) { dist[r][c]=0; q.push([r,c]); }\n  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];\n  for (let head=0;head<q.length;head++) {\n    const [r,c]=q[head];\n    for (const [dr,dc] of dirs) {\n      const nr=r+dr,nc=c+dc;\n      if(nr>=0&&nr<m&&nc>=0&&nc<n&&dist[nr][nc]===-1) { dist[nr][nc]=dist[r][c]+1; q.push([nr,nc]); }\n    }\n  }\n  return dist;\n}"
        }
      ]
    }
  ];

  window.ALGO_DATA = (window.ALGO_DATA || []).concat(extraGroups);
})();
