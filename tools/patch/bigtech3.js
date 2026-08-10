// Big Tech — Heap / Interval / Greedy nâng cao.
// Dùng: node tools/algo_append.js tools/patch/bigtech3.js
module.exports = [
{
  group: "Big Tech — Heap, Interval & Greedy nâng cao",
  items: [
    {
      name: "K Closest Points to Origin (k điểm gần gốc tọa độ nhất)",
      lc: "973", slug: "k-closest-points-to-origin", diff: "Trung bình",
      tags: "heap max-heap quickselect top-k",
      complexity: "O(n log k) thời gian, O(k) bộ nhớ với max-heap kích thước k",
      idea: "Khuôn 'top K' kinh điển: muốn giữ k phần tử NHỎ nhất thì dùng MAX-heap kích thước k — mỗi khi heap quá k thì bỏ phần tử lớn nhất. Nhớ ngược đời một chút: nhỏ nhất dùng max-heap, lớn nhất dùng min-heap.",
      trap: "Không cần Math.sqrt: so sánh x²+y² là đủ vì căn bậc hai là hàm đồng biến. Bỏ sqrt vừa nhanh vừa tránh sai số dấu phẩy động — nói ra ý này luôn được đánh giá cao.",
      examples: [
        { input: "points = [[1,3],[-2,2]], k = 1",
          output: "[[-2,2]]",
          note: "Bình phương khoảng cách: (1,3) → 1+9 = 10, (-2,2) → 4+4 = 8. Chọn 8 nên trả [-2,2]." },
        { input: "points = [[3,3],[5,-1],[-2,4]], k = 2",
          output: "[[3,3],[-2,4]]",
          note: "18, 26, 20 → chọn hai giá trị nhỏ nhất là 18 và 20. Đề không yêu cầu thứ tự nên [[-2,4],[3,3]] cũng được chấp nhận." }
      ],
      steps: [
        "Tạo PriorityQueue với comparator SO SÁNH NGƯỢC (khoảng cách lớn nằm đỉnh) — đó là max-heap.",
        "Duyệt từng điểm, đẩy vào heap.",
        "Nếu heap.size() > k thì poll() bỏ phần tử xa nhất.",
        "Hết vòng lặp, heap chứa đúng k điểm gần nhất.",
        "Đổ heap ra mảng kết quả.",
        "Không dùng sqrt — so sánh trực tiếp x*x + y*y."
      ],
      alt: {
        title: "Cách khác — Quickselect (phân hoạch quanh pivot)",
        complexity: "O(n) trung bình, O(n²) xấu nhất; O(1) bộ nhớ phụ vì đổi chỗ tại chỗ",
        note: "Chỉ cần k phần tử đầu ĐÚNG TẬP chứ không cần đúng thứ tự, nên Quickselect nhanh hơn heap về mặt lý thuyết. Nhược điểm: phá vỡ mảng gốc và có ca xấu O(n²) (khắc phục bằng pivot ngẫu nhiên). Trong phỏng vấn nên nêu cả hai rồi nói rõ đánh đổi: heap ổn định và xử lý được luồng dữ liệu vô hạn, Quickselect nhanh hơn nhưng cần biết trước toàn bộ mảng.",
        java: "public int[][] kClosest(int[][] points, int k) {\n    int lo = 0, hi = points.length - 1;\n    Random rnd = new Random();\n\n    while (lo < hi) {\n        int pivot = lo + rnd.nextInt(hi - lo + 1);   // pivot ngẫu nhiên tránh ca xấu\n        int p = partition(points, lo, hi, pivot);\n        if (p == k) break;\n        else if (p < k) lo = p + 1;\n        else hi = p - 1;\n    }\n    return Arrays.copyOf(points, k);\n}\n\nprivate int partition(int[][] pts, int lo, int hi, int pivotIdx) {\n    int pivotDist = dist(pts[pivotIdx]);\n    swap(pts, pivotIdx, hi);\n    int store = lo;\n    for (int i = lo; i < hi; i++) {\n        if (dist(pts[i]) < pivotDist) swap(pts, i, store++);\n    }\n    swap(pts, store, hi);\n    return store;\n}\n\nprivate int dist(int[] p) { return p[0] * p[0] + p[1] * p[1]; }\n\nprivate void swap(int[][] a, int i, int j) { int[] t = a[i]; a[i] = a[j]; a[j] = t; }"
      },
      java: "public int[][] kClosest(int[][] points, int k) {\n    // MAX-heap theo bình phương khoảng cách: đỉnh là điểm XA nhất trong k điểm đang giữ\n    PriorityQueue<int[]> heap = new PriorityQueue<>(\n        (a, b) -> (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1]));\n\n    for (int[] p : points) {\n        heap.add(p);\n        if (heap.size() > k) heap.poll();   // loại điểm xa nhất\n    }\n\n    int[][] res = new int[k][2];\n    for (int i = 0; i < k; i++) res[i] = heap.poll();\n    return res;\n}",
      js: "function kClosest(points, k) {\n  // JS không có heap sẵn — sắp xếp O(n log n) là đủ gọn cho bài này\n  return points\n    .slice()\n    .sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2))\n    .slice(0, k);\n}"
    },
    {
      name: "Meeting Rooms II (số phòng họp tối thiểu)",
      lc: "253", slug: "meeting-rooms-ii", diff: "Trung bình",
      tags: "interval heap sweep-line greedy sorting",
      complexity: "O(n log n) thời gian do sắp xếp, O(n) bộ nhớ",
      idea: "Số phòng tối thiểu = số cuộc họp DIỄN RA ĐỒNG THỜI nhiều nhất. Cách heap: sắp theo giờ bắt đầu, min-heap giữ giờ KẾT THÚC của các phòng đang dùng; cuộc mới bắt đầu sau giờ kết thúc sớm nhất thì tái dùng phòng đó.",
      trap: "Với cách quét sự kiện, khi một cuộc kết thúc đúng lúc cuộc khác bắt đầu (ví dụ [0,10] và [10,20]) thì phải xử lý sự kiện KẾT THÚC trước sự kiện BẮT ĐẦU, nếu không sẽ đếm thừa một phòng.",
      examples: [
        { input: "intervals = [[0,30],[5,10],[15,20]]",
          output: "2",
          note: "[0,30] chiếm phòng suốt; [5,10] cần phòng thứ hai; [15,20] tái dùng phòng vừa trống lúc 10 nên không cần phòng thứ ba." },
        { input: "intervals = [[7,10],[2,4]]",
          output: "1",
          note: "Hai cuộc rời nhau hoàn toàn — sau khi sắp lại thành [2,4] rồi [7,10], giờ bắt đầu 7 ≥ giờ kết thúc 4 nên tái dùng phòng cũ." }
      ],
      steps: [
        "Sắp mảng intervals tăng dần theo giờ BẮT ĐẦU.",
        "Tạo min-heap chứa giờ KẾT THÚC của các phòng đang bận.",
        "Duyệt từng cuộc họp: nếu heap khác rỗng và heap.peek() <= start thì poll() (phòng đó đã trống).",
        "Đẩy end của cuộc hiện tại vào heap.",
        "Kích thước heap tại mọi thời điểm chính là số phòng đang dùng.",
        "Đáp án là kích thước heap lớn nhất — hoặc chính heap.size() cuối vòng vì ta chỉ poll khi tái dùng được."
      ],
      alt: {
        title: "Cách khác — quét sự kiện: tách mảng start và mảng end rồi hai con trỏ",
        complexity: "O(n log n) do sắp hai mảng, O(n) bộ nhớ — không cần cấu trúc heap",
        note: "Tách riêng mọi giờ bắt đầu và giờ kết thúc, sắp mỗi mảng tăng dần, rồi đi hai con trỏ: gặp một start thì tăng bộ đếm, khi start hiện tại ≥ end nhỏ nhất thì giảm bộ đếm. Cùng độ phức tạp nhưng hằng số nhỏ hơn heap và code ngắn hơn. Đây cũng là khuôn 'sweep line' dùng lại được cho các bài đếm chồng lấn khác.",
        java: "public int minMeetingRooms(int[][] intervals) {\n    int n = intervals.length;\n    int[] starts = new int[n], ends = new int[n];\n    for (int i = 0; i < n; i++) {\n        starts[i] = intervals[i][0];\n        ends[i] = intervals[i][1];\n    }\n    Arrays.sort(starts);\n    Arrays.sort(ends);\n\n    int rooms = 0, max = 0, e = 0;\n    for (int s = 0; s < n; s++) {\n        // cuộc bắt đầu đúng lúc cuộc khác kết thúc -> giải phóng TRƯỚC\n        while (e < n && ends[e] <= starts[s]) { rooms--; e++; }\n        rooms++;\n        max = Math.max(max, rooms);\n    }\n    return max;\n}"
      },
      java: "public int minMeetingRooms(int[][] intervals) {\n    if (intervals.length == 0) return 0;\n\n    Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));   // theo giờ BẮT ĐẦU\n\n    // min-heap giữ giờ KẾT THÚC của các phòng đang bận\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n    for (int[] it : intervals) {\n        if (!heap.isEmpty() && heap.peek() <= it[0]) {\n            heap.poll();          // phòng trống sớm nhất đã xong -> tái dùng\n        }\n        heap.add(it[1]);\n    }\n    return heap.size();\n}",
      js: "function minMeetingRooms(intervals) {\n  const n = intervals.length;\n  if (!n) return 0;\n\n  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n\n  let rooms = 0, max = 0, e = 0;\n  for (let s = 0; s < n; s++) {\n    while (e < n && ends[e] <= starts[s]) { rooms--; e++; }\n    rooms++;\n    max = Math.max(max, rooms);\n  }\n  return max;\n}"
    },
    {
      name: "Sliding Window Maximum (giá trị lớn nhất mỗi cửa sổ)",
      lc: "239", slug: "sliding-window-maximum", diff: "Khó",
      tags: "deque monotonic sliding-window hard",
      complexity: "O(n) thời gian, O(k) bộ nhớ — mỗi phần tử vào và ra deque đúng một lần",
      idea: "Dùng DEQUE ĐƠN ĐIỆU GIẢM chứa CHỈ SỐ. Bất biến: giá trị tại các chỉ số trong deque luôn giảm dần, nên đầu deque luôn là chỉ số của phần tử lớn nhất trong cửa sổ hiện tại.",
      trap: "Lưu CHỈ SỐ chứ đừng lưu giá trị — cần chỉ số để biết phần tử đầu deque đã trượt ra khỏi cửa sổ chưa (i - k >= deque.peekFirst()). Đây là chỗ hầu hết mọi người viết sai lần đầu.",
      examples: [
        { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          output: "[3,3,5,5,6,7]",
          note: "Cửa sổ [1,3,-1] → 3; [3,-1,-3] → 3; [-1,-3,5] → 5; [-3,5,3] → 5; [5,3,6] → 6; [3,6,7] → 7. Khi 5 vào deque, nó đẩy hết -1 và -3 ra vì chúng không bao giờ còn cơ hội làm max." },
        { input: "nums = [7,2,4], k = 2",
          output: "[7,4]",
          note: "Cửa sổ đầu [7,2] → 7. Sang cửa sổ [2,4], chỉ số của 7 đã rơi ra ngoài nên phải poll đầu deque — chính là lý do phải lưu chỉ số." }
      ],
      steps: [
        "Tạo ArrayDeque<Integer> chứa chỉ số, mảng kết quả dài n - k + 1.",
        "Duyệt i từ 0 tới n-1.",
        "Bỏ đầu deque nếu chỉ số đó đã ra khỏi cửa sổ: while(!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst().",
        "Bỏ ĐUÔI deque mọi chỉ số có giá trị <= nums[i] — chúng bị nums[i] che vĩnh viễn.",
        "Đẩy i vào cuối deque.",
        "Khi i >= k - 1 thì ghi nums[dq.peekFirst()] vào kết quả."
      ],
      alt: {
        title: "Cách khác — max-heap chứa cặp (giá trị, chỉ số) với lazy deletion",
        complexity: "O(n log n) thời gian, O(n) bộ nhớ — chậm hơn deque nhưng dễ nghĩ ra hơn",
        note: "Đẩy mọi cặp vào max-heap, mỗi lần lấy max thì bỏ dần các đỉnh có chỉ số đã ra khỏi cửa sổ. Gọi là 'xóa lười' vì không xóa ngay mà đợi tới lúc chúng nổi lên đỉnh. Cách này đáng nêu ra như lời giải đầu tiên rồi tối ưu xuống deque O(n) — đúng nhịp mà người phỏng vấn mong đợi.",
        java: "public int[] maxSlidingWindow(int[] nums, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);\n    int n = nums.length;\n    int[] res = new int[n - k + 1];\n\n    for (int i = 0; i < n; i++) {\n        heap.add(new int[]{nums[i], i});\n        if (i >= k - 1) {\n            while (heap.peek()[1] <= i - k) heap.poll();   // xóa lười\n            res[i - k + 1] = heap.peek()[0];\n        }\n    }\n    return res;\n}"
      },
      java: "public int[] maxSlidingWindow(int[] nums, int k) {\n    int n = nums.length;\n    int[] res = new int[n - k + 1];\n    Deque<Integer> dq = new ArrayDeque<>();   // chứa CHỈ SỐ, giá trị giảm dần\n\n    for (int i = 0; i < n; i++) {\n        // 1) đầu deque đã trượt ra khỏi cửa sổ?\n        while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();\n\n        // 2) mọi phần tử nhỏ hơn nums[i] ở đuôi đều vô dụng\n        while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();\n\n        dq.addLast(i);\n\n        if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()];\n    }\n    return res;\n}",
      js: "function maxSlidingWindow(nums, k) {\n  const res = [];\n  const dq = [];   // chỉ số, giá trị giảm dần\n\n  for (let i = 0; i < nums.length; i++) {\n    while (dq.length && dq[0] <= i - k) dq.shift();\n    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();\n    dq.push(i);\n    if (i >= k - 1) res.push(nums[dq[0]]);\n  }\n  return res;\n}"
    },
    {
      name: "Gas Station (trạm xăng — đi hết vòng tròn)",
      lc: "134", slug: "gas-station", diff: "Trung bình",
      tags: "greedy prefix-sum circular one-pass",
      complexity: "O(n) thời gian, O(1) bộ nhớ — chỉ một lượt duyệt",
      idea: "Hai nhận xét khóa bài: (1) nếu tổng gas < tổng cost thì chắc chắn vô nghiệm; (2) nếu đi từ trạm s mà cạn xăng tại trạm i thì MỌI trạm trong khoảng [s, i] đều không thể là điểm xuất phát — nhảy thẳng tới i+1.",
      trap: "Đề đảm bảo nghiệm là DUY NHẤT nếu tồn tại. Nhiều người thử mọi điểm xuất phát O(n²); mấu chốt để xuống O(n) là nhận xét thứ hai, phải giải thích được vì sao mới ăn điểm.",
      examples: [
        { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
          output: "3",
          note: "Tổng gas 15 = tổng cost 15 nên có nghiệm. Đi từ 0 cạn xăng ngay, tank âm tại i=2 nên nhảy tới start=3; từ đó tank luôn ≥ 0 nên đáp án là 3." },
        { input: "gas = [2,3,4], cost = [3,4,3]",
          output: "-1",
          note: "Tổng gas 9 < tổng cost 10 — vô nghiệm bất kể xuất phát từ đâu. Kiểm tra tổng trước là cách loại ca này trong O(n) mà không cần thử." }
      ],
      steps: [
        "Duy trì total (tổng gas - cost toàn mảng) và tank (số xăng còn từ điểm xuất phát hiện tại).",
        "Duyệt i từ 0 tới n-1: diff = gas[i] - cost[i]; cộng diff vào cả total và tank.",
        "Nếu tank < 0: đặt start = i + 1 và reset tank = 0.",
        "Hết vòng: nếu total < 0 thì trả -1.",
        "Ngược lại trả start.",
        "Chỉ một lượt duyệt, không mảng phụ."
      ],
      alt: {
        title: "Cách khác — tìm vị trí tổng tiền tố NHỎ NHẤT",
        complexity: "O(n) thời gian, O(1) bộ nhớ — cùng độ phức tạp, góc nhìn toán học hơn",
        note: "Dựng dãy tổng tiền tố của gas[i]-cost[i]. Nếu tổng cuối ≥ 0 thì đáp án là chỉ số NGAY SAU vị trí có tổng tiền tố nhỏ nhất — vì bắt đầu từ đáy thì mọi tổng tiền tố về sau đều không âm. Cách nhìn này hay được hỏi thêm và cho thấy bạn hiểu bản chất chứ không thuộc lòng.",
        java: "public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0, minPrefix = Integer.MAX_VALUE, minIdx = 0;\n\n    for (int i = 0; i < gas.length; i++) {\n        total += gas[i] - cost[i];\n        if (total < minPrefix) {   // đáy của dãy tổng tiền tố\n            minPrefix = total;\n            minIdx = i;\n        }\n    }\n    if (total < 0) return -1;\n    return (minIdx + 1) % gas.length;   // ngay sau đáy\n}"
      },
      java: "public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0, tank = 0, start = 0;\n\n    for (int i = 0; i < gas.length; i++) {\n        int diff = gas[i] - cost[i];\n        total += diff;\n        tank += diff;\n\n        if (tank < 0) {      // mọi trạm trong [start, i] đều không đi nổi\n            start = i + 1;\n            tank = 0;\n        }\n    }\n    return total < 0 ? -1 : start;\n}",
      js: "function canCompleteCircuit(gas, cost) {\n  let total = 0, tank = 0, start = 0;\n\n  for (let i = 0; i < gas.length; i++) {\n    const diff = gas[i] - cost[i];\n    total += diff;\n    tank += diff;\n    if (tank < 0) { start = i + 1; tank = 0; }\n  }\n  return total < 0 ? -1 : start;\n}"
    },
    {
      name: "Partition Labels (chia chuỗi thành nhiều đoạn nhất)",
      lc: "763", slug: "partition-labels", diff: "Trung bình",
      tags: "greedy two-pointers hashmap last-index",
      complexity: "O(n) thời gian, O(1) bộ nhớ (mảng 26 phần tử)",
      idea: "Mỗi ký tự phải nằm gọn trong ĐÚNG một đoạn. Vậy ghi lại vị trí XUẤT HIỆN CUỐI của từng ký tự; duyệt chuỗi và mở rộng biên phải của đoạn hiện tại tới max vị trí cuối của các ký tự đã gặp — khi i chạm đúng biên đó thì cắt.",
      trap: "Phải quét TOÀN BỘ chuỗi một lượt để lấy last[] TRƯỚC khi bắt đầu chia. Vừa đi vừa đoán biên phải sẽ sai vì ký tự có thể còn xuất hiện lại ở rất xa phía sau.",
      examples: [
        { input: "s = \"ababcbacadefegdehijhklij\"",
          output: "[9,7,8]",
          note: "Đoạn \"ababcbaca\" dài 9 (ký tự a xuất hiện cuối tại chỉ số 8), rồi \"defegde\" dài 7, rồi \"hijhklij\" dài 8. Tổng 24 = độ dài chuỗi." },
        { input: "s = \"eccbbbbdec\"",
          output: "[10]",
          note: "Ký tự c xuất hiện cuối ở chỉ số 9 nên biên phải bị kéo tới tận cuối — cả chuỗi là một đoạn duy nhất. Ca này chứng minh không phải lúc nào cũng chia được." }
      ],
      steps: [
        "Tạo mảng last[26], duyệt chuỗi ghi last[c - 'a'] = i (lần ghi cuối chính là vị trí cuối).",
        "Đặt start = 0, end = 0, danh sách kết quả rỗng.",
        "Duyệt i từ 0: end = Math.max(end, last[s.charAt(i) - 'a']).",
        "Nếu i == end thì đóng đoạn: thêm (end - start + 1) vào kết quả, đặt start = i + 1.",
        "Tiếp tục tới hết chuỗi.",
        "Kết quả là danh sách độ dài các đoạn theo đúng thứ tự."
      ],
      alt: {
        title: "Cách khác — quy về gộp khoảng (merge intervals)",
        complexity: "O(n) thời gian, O(1) bộ nhớ — cùng chi phí, khác cách diễn đạt",
        note: "Mỗi ký tự sinh một khoảng [vị trí đầu, vị trí cuối]. Bài toán trở thành gộp các khoảng CHỒNG LẤN rồi lấy độ dài từng khoảng đã gộp. Nhìn ra mối liên hệ này giúp bạn giải nhanh cả họ bài 'chia chuỗi/mảng theo ràng buộc phạm vi' như LC 56 (Merge Intervals) — nói ra sự tương đồng luôn được cộng điểm.",
        java: "public List<Integer> partitionLabels(String s) {\n    int[] first = new int[26], last = new int[26];\n    Arrays.fill(first, -1);\n    for (int i = 0; i < s.length(); i++) {\n        int c = s.charAt(i) - 'a';\n        if (first[c] == -1) first[c] = i;\n        last[c] = i;\n    }\n\n    List<int[]> intervals = new ArrayList<>();\n    for (int c = 0; c < 26; c++) {\n        if (first[c] != -1) intervals.add(new int[]{first[c], last[c]});\n    }\n    intervals.sort(Comparator.comparingInt(a -> a[0]));\n\n    List<Integer> res = new ArrayList<>();\n    int start = intervals.get(0)[0], end = intervals.get(0)[1];\n    for (int i = 1; i < intervals.size(); i++) {\n        int[] cur = intervals.get(i);\n        if (cur[0] <= end) {\n            end = Math.max(end, cur[1]);   // chồng lấn -> gộp\n        } else {\n            res.add(end - start + 1);\n            start = cur[0];\n            end = cur[1];\n        }\n    }\n    res.add(end - start + 1);\n    return res;\n}"
      },
      java: "public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;   // vị trí cuối\n\n    List<Integer> res = new ArrayList<>();\n    int start = 0, end = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n        end = Math.max(end, last[s.charAt(i) - 'a']);   // nới biên phải\n        if (i == end) {                                 // không ký tự nào vượt qua đây\n            res.add(end - start + 1);\n            start = i + 1;\n        }\n    }\n    return res;\n}",
      js: "function partitionLabels(s) {\n  const last = new Map();\n  for (let i = 0; i < s.length; i++) last.set(s[i], i);\n\n  const res = [];\n  let start = 0, end = 0;\n  for (let i = 0; i < s.length; i++) {\n    end = Math.max(end, last.get(s[i]));\n    if (i === end) {\n      res.push(end - start + 1);\n      start = i + 1;\n    }\n  }\n  return res;\n}"
    },
    {
      name: "Hand of Straights (chia bài thành các dãy liên tiếp)",
      lc: "846", slug: "hand-of-straights", diff: "Trung bình",
      tags: "greedy treemap counting sorting",
      complexity: "O(n log n) thời gian với TreeMap, O(n) bộ nhớ",
      idea: "Greedy có chứng minh: lá bài NHỎ NHẤT còn lại bắt buộc phải là ĐẦU một nhóm (không có lá nào nhỏ hơn để đứng trước nó). Vậy cứ lấy giá trị nhỏ nhất, trừ đi một lá cho mỗi giá trị từ đó tới +groupSize-1.",
      trap: "Nếu n không chia hết cho groupSize thì trả false ngay. Và bắt buộc dùng TreeMap (hoặc mảng đã sắp) để luôn lấy đúng giá trị NHỎ NHẤT còn lại — HashMap thường không có thứ tự nên sẽ sai.",
      examples: [
        { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          output: "true",
          note: "Chia được thành [1,2,3], [2,3,4], [6,7,8]. Bắt đầu từ 1 (nhỏ nhất) lấy 1-2-3, còn lại nhỏ nhất là 2 nên lấy 2-3-4, còn 6-7-8." },
        { input: "hand = [1,2,3,4,5], groupSize = 4",
          output: "false",
          note: "5 lá không chia hết cho 4 — loại ngay từ dòng kiểm tra đầu tiên, không cần chạy greedy." }
      ],
      steps: [
        "Nếu hand.length % groupSize != 0 thì trả false.",
        "Đếm số lượng từng giá trị vào TreeMap (tự sắp tăng dần).",
        "Lặp khi map chưa rỗng: lấy first = map.firstKey().",
        "Với mỗi v từ first tới first + groupSize - 1: nếu map không chứa v thì trả false.",
        "Giảm số lượng của v đi 1; nếu về 0 thì remove khỏi map.",
        "Hết vòng mà không lỗi thì trả true."
      ],
      alt: {
        title: "Cách khác — sắp mảng rồi dùng HashMap đếm, duyệt theo thứ tự đã sắp",
        complexity: "O(n log n) do sắp xếp, O(n) bộ nhớ — hằng số nhỏ hơn TreeMap",
        note: "Sắp mảng một lần rồi duyệt tuần tự; gặp lá còn số lượng > 0 thì coi nó là đầu nhóm. Vì mảng đã sắp nên tự động luôn xử lý giá trị nhỏ nhất trước, không cần cấu trúc cây. Đây cũng chính là lời giải cho LC 1296 (Divide Array in Sets of K Consecutive Numbers) — hai bài giống hệt nhau, biết điều này tiết kiệm được nhiều thời gian.",
        java: "public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n\n    Arrays.sort(hand);\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int c : hand) count.merge(c, 1, Integer::sum);\n\n    for (int card : hand) {\n        if (count.get(card) == 0) continue;   // lá này đã dùng trong nhóm trước\n        for (int v = card; v < card + groupSize; v++) {\n            int have = count.getOrDefault(v, 0);\n            if (have == 0) return false;\n            count.put(v, have - 1);\n        }\n    }\n    return true;\n}"
      },
      java: "public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n\n    TreeMap<Integer, Integer> count = new TreeMap<>();   // tự sắp tăng dần\n    for (int c : hand) count.merge(c, 1, Integer::sum);\n\n    while (!count.isEmpty()) {\n        int first = count.firstKey();        // lá nhỏ nhất PHẢI là đầu nhóm\n        for (int v = first; v < first + groupSize; v++) {\n            Integer have = count.get(v);\n            if (have == null) return false;  // thiếu lá -> không chia được\n            if (have == 1) count.remove(v);\n            else count.put(v, have - 1);\n        }\n    }\n    return true;\n}",
      js: "function isNStraightHand(hand, groupSize) {\n  if (hand.length % groupSize !== 0) return false;\n\n  const count = new Map();\n  for (const c of hand) count.set(c, (count.get(c) || 0) + 1);\n\n  const keys = [...count.keys()].sort((a, b) => a - b);\n  for (const first of keys) {\n    const have = count.get(first) || 0;\n    if (have === 0) continue;\n    for (let v = first; v < first + groupSize; v++) {\n      const c = count.get(v) || 0;\n      if (c < have) return false;\n      count.set(v, c - have);\n    }\n  }\n  return true;\n}"
    }
  ]
},
{
  group: "Big Tech — DP & Ma trận nâng cao",
  items: [
    {
      name: "Maximum Product Subarray (tích lớn nhất của mảng con)",
      lc: "152", slug: "maximum-product-subarray", diff: "Trung bình",
      tags: "dp kadane negative-numbers min-max",
      complexity: "O(n) thời gian, O(1) bộ nhớ",
      idea: "Khác Kadane cộng ở chỗ: số ÂM nhân với số âm ra dương, nên giá trị NHỎ NHẤT hôm nay có thể thành LỚN NHẤT ngày mai. Vì vậy phải theo dõi ĐỒNG THỜI cả max và min kết thúc tại i.",
      trap: "Phải lưu maxSoFar vào biến tạm trước khi cập nhật, vì công thức tính min mới cần dùng max CŨ. Viết đè trực tiếp là sai — lỗi kinh điển của bài này.",
      examples: [
        { input: "nums = [2,3,-2,4]",
          output: "6",
          note: "Mảng con [2,3] cho tích 6. Tại i=2 gặp -2, max tụt xuống -12 nhưng min = -12 sẽ được lưu để dùng sau." },
        { input: "nums = [-2,3,-4]",
          output: "24",
          note: "Cả mảng cho (-2)·3·(-4) = 24. Chỉ theo dõi max sẽ bỏ lỡ vì tại i=1 max là 3 còn min là -6 — chính -6 nhân -4 mới ra 24." }
      ],
      steps: [
        "Khởi tạo maxSoFar = minSoFar = res = nums[0].",
        "Duyệt i từ 1: lấy n = nums[i].",
        "Lưu tmpMax = maxSoFar (vì sắp bị ghi đè).",
        "maxSoFar = max(n, max(tmpMax * n, minSoFar * n)).",
        "minSoFar = min(n, min(tmpMax * n, minSoFar * n)).",
        "res = max(res, maxSoFar); trả res cuối vòng."
      ],
      alt: {
        title: "Cách khác — quét tích tiền tố hai chiều (trái→phải và phải→trái)",
        complexity: "O(n) thời gian, O(1) bộ nhớ — không cần theo dõi min",
        note: "Nhân dồn từ trái sang phải, gặp tích bằng 0 thì reset về 1; làm tương tự từ phải sang trái; đáp án là max của mọi giá trị gặp. Trực giác: mảng con tối ưu luôn chạm một trong hai đầu của đoạn không chứa số 0, vì số lượng số âm chỉ có thể chẵn hoặc lẻ. Code cực ngắn, rất ấn tượng khi trình bày sau lời giải chuẩn.",
        java: "public int maxProduct(int[] nums) {\n    int n = nums.length, res = Integer.MIN_VALUE;\n    int prod = 1;\n\n    for (int i = 0; i < n; i++) {          // trái -> phải\n        prod *= nums[i];\n        res = Math.max(res, prod);\n        if (prod == 0) prod = 1;\n    }\n\n    prod = 1;\n    for (int i = n - 1; i >= 0; i--) {     // phải -> trái\n        prod *= nums[i];\n        res = Math.max(res, prod);\n        if (prod == 0) prod = 1;\n    }\n    return res;\n}"
      },
      java: "public int maxProduct(int[] nums) {\n    int maxSoFar = nums[0], minSoFar = nums[0], res = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n        int n = nums[i];\n        int tmpMax = maxSoFar;             // PHẢI lưu lại: dòng dưới cần max CŨ\n\n        maxSoFar = Math.max(n, Math.max(tmpMax * n, minSoFar * n));\n        minSoFar = Math.min(n, Math.min(tmpMax * n, minSoFar * n));\n\n        res = Math.max(res, maxSoFar);\n    }\n    return res;\n}",
      js: "function maxProduct(nums) {\n  let maxSoFar = nums[0], minSoFar = nums[0], res = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    const n = nums[i];\n    const tmpMax = maxSoFar;\n    maxSoFar = Math.max(n, tmpMax * n, minSoFar * n);\n    minSoFar = Math.min(n, tmpMax * n, minSoFar * n);\n    res = Math.max(res, maxSoFar);\n  }\n  return res;\n}"
    },
    {
      name: "House Robber II (trộm nhà xếp thành vòng tròn)",
      lc: "213", slug: "house-robber-ii", diff: "Trung bình",
      tags: "dp circular house-robber reduce-to-subproblem",
      complexity: "O(n) thời gian, O(1) bộ nhớ",
      idea: "Nhà xếp VÒNG TRÒN nên nhà đầu và nhà cuối kề nhau, không trộm được cả hai. Mẹo quy về bài đã biết: chạy House Robber I hai lần — một lần trên [0, n-2], một lần trên [1, n-1] — rồi lấy max.",
      trap: "Ca n == 1 phải trả nums[0] riêng, vì cắt hai đoạn sẽ ra hai mảng rỗng. Đây là ca biên duy nhất nhưng chắc chắn có trong test.",
      examples: [
        { input: "nums = [2,3,2]",
          output: "3",
          note: "Không thể lấy cả hai nhà giá 2 vì chúng kề nhau qua vòng tròn. Đoạn [0,1] cho max 3, đoạn [1,2] cho max 3 → đáp án 3." },
        { input: "nums = [1,2,3,1]",
          output: "4",
          note: "Trộm nhà 0 và nhà 2 được 1+3 = 4. Đoạn [0..2] cho 4, đoạn [1..3] cho 3 → lấy max là 4." }
      ],
      steps: [
        "Nếu n == 1 thì trả nums[0].",
        "Gọi rob1 = robLine(nums, 0, n - 2) — bỏ nhà cuối.",
        "Gọi rob2 = robLine(nums, 1, n - 1) — bỏ nhà đầu.",
        "Trả max(rob1, rob2).",
        "robLine là House Robber I: duyệt với hai biến prev1, prev2.",
        "Công thức: cur = max(prev1, prev2 + nums[i]) rồi dịch hai biến."
      ],
      alt: {
        title: "Cách khác — DP mảng tường minh dp[i] cho từng đoạn",
        complexity: "O(n) thời gian, O(n) bộ nhớ — tốn hơn nhưng dễ debug và dễ giải thích",
        note: "Dựng hẳn mảng dp[i] = số tiền lớn nhất khi xét tới nhà i, với dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Phiên bản này in ra được để kiểm tra từng bước và dễ mở rộng khi phải TRUY VẾT xem đã trộm những nhà nào — câu hỏi phụ rất hay gặp sau khi bạn giải xong.",
        java: "public int rob(int[] nums) {\n    int n = nums.length;\n    if (n == 1) return nums[0];\n    return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));\n}\n\nprivate int robRange(int[] nums, int lo, int hi) {\n    int len = hi - lo + 1;\n    if (len <= 0) return 0;\n\n    int[] dp = new int[len];\n    dp[0] = nums[lo];\n    if (len > 1) dp[1] = Math.max(nums[lo], nums[lo + 1]);\n\n    for (int i = 2; i < len; i++) {\n        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[lo + i]);\n    }\n    return dp[len - 1];\n}"
      },
      java: "public int rob(int[] nums) {\n    int n = nums.length;\n    if (n == 1) return nums[0];      // ca biên bắt buộc\n\n    return Math.max(\n        robLine(nums, 0, n - 2),     // bỏ nhà CUỐI\n        robLine(nums, 1, n - 1));    // bỏ nhà ĐẦU\n}\n\nprivate int robLine(int[] nums, int lo, int hi) {\n    int prev2 = 0, prev1 = 0;        // prev1 = dp[i-1], prev2 = dp[i-2]\n    for (int i = lo; i <= hi; i++) {\n        int cur = Math.max(prev1, prev2 + nums[i]);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}",
      js: "function rob(nums) {\n  const n = nums.length;\n  if (n === 1) return nums[0];\n\n  const robLine = (lo, hi) => {\n    let prev2 = 0, prev1 = 0;\n    for (let i = lo; i <= hi; i++) {\n      const cur = Math.max(prev1, prev2 + nums[i]);\n      prev2 = prev1;\n      prev1 = cur;\n    }\n    return prev1;\n  };\n\n  return Math.max(robLine(0, n - 2), robLine(1, n - 1));\n}"
    },
    {
      name: "Palindromic Substrings (đếm chuỗi con đối xứng)",
      lc: "647", slug: "palindromic-substrings", diff: "Trung bình",
      tags: "expand-around-center string palindrome dp",
      complexity: "O(n²) thời gian, O(1) bộ nhớ với kỹ thuật nở từ tâm",
      idea: "Mỗi chuỗi đối xứng có một TÂM: hoặc một ký tự (độ dài lẻ), hoặc khe giữa hai ký tự (độ dài chẵn). Có 2n-1 tâm, từ mỗi tâm nở ra hai bên và đếm mỗi lần nở thành công.",
      trap: "Đừng quên tâm CHẴN. Chỉ chạy tâm lẻ sẽ bỏ sót \"aa\", \"abba\"... và kết quả thiếu gần một nửa. Cứ mỗi i gọi expand(i, i) rồi expand(i, i + 1).",
      examples: [
        { input: "s = \"abc\"",
          output: "3",
          note: "Chỉ có ba chuỗi con một ký tự \"a\", \"b\", \"c\". Mọi ký tự đơn luôn là một chuỗi đối xứng — đây là mốc thấp nhất, đáp án không bao giờ nhỏ hơn n." },
        { input: "s = \"aaa\"",
          output: "6",
          note: "\"a\"×3, \"aa\"×2, \"aaa\"×1. Ca này bộc lộ ngay lỗi quên tâm chẵn: nếu quên thì chỉ ra 4 thay vì 6." }
      ],
      steps: [
        "Đặt count = 0.",
        "Duyệt i từ 0 tới n-1.",
        "count += expand(s, i, i) — tâm lẻ, một ký tự.",
        "count += expand(s, i, i + 1) — tâm chẵn, khe giữa hai ký tự.",
        "Hàm expand: while (l >= 0 && r < n && s[l] == s[r]) { đếm++; l--; r++; }.",
        "Trả count."
      ],
      alt: {
        title: "Cách khác — quy hoạch động bảng 2 chiều dp[i][j]",
        complexity: "O(n²) thời gian, O(n²) bộ nhớ — tốn bộ nhớ hơn nhưng tái dùng được bảng",
        note: "dp[i][j] = true nếu s[i..j] đối xứng, với dp[i][j] = (s[i]==s[j]) && (j-i < 2 || dp[i+1][j-1]). Phải duyệt i GIẢM dần để dp[i+1][...] đã sẵn sàng. Ưu điểm: bảng này trả lời được luôn LC 5 (chuỗi đối xứng dài nhất) và LC 132 (cắt tối thiểu) — nếu bị hỏi liên hoàn thì đây là lựa chọn tốt.",
        java: "public int countSubstrings(String s) {\n    int n = s.length(), count = 0;\n    boolean[][] dp = new boolean[n][n];\n\n    for (int i = n - 1; i >= 0; i--) {        // i GIẢM dần\n        for (int j = i; j < n; j++) {\n            if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {\n                dp[i][j] = true;\n                count++;\n            }\n        }\n    }\n    return count;\n}"
      },
      java: "public int countSubstrings(String s) {\n    int count = 0;\n    for (int i = 0; i < s.length(); i++) {\n        count += expand(s, i, i);       // tâm LẺ:  a | b | c\n        count += expand(s, i, i + 1);   // tâm CHẴN: a|b, b|c\n    }\n    return count;\n}\n\nprivate int expand(String s, int l, int r) {\n    int found = 0;\n    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n        found++;\n        l--;\n        r++;\n    }\n    return found;\n}",
      js: "function countSubstrings(s) {\n  const expand = (l, r) => {\n    let found = 0;\n    while (l >= 0 && r < s.length && s[l] === s[r]) { found++; l--; r++; }\n    return found;\n  };\n\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    count += expand(i, i);\n    count += expand(i, i + 1);\n  }\n  return count;\n}"
    },
    {
      name: "Coin Change II (đếm số cách đổi tiền)",
      lc: "518", slug: "coin-change-ii", diff: "Trung bình",
      tags: "dp unbounded-knapsack counting combination",
      complexity: "O(số đồng × amount) thời gian, O(amount) bộ nhớ",
      idea: "Đây là balo VÔ HẠN đếm TỔ HỢP. Điểm quyết định: vòng lặp NGOÀI phải là đồng tiền, vòng TRONG là số tiền. Đảo lại sẽ đếm HOÁN VỊ (1+2 và 2+1 tính thành hai cách) và ra sai.",
      trap: "dp[0] = 1 chứ không phải 0 — có đúng một cách để tạo ra số tiền 0, đó là không dùng đồng nào. Đặt sai giá trị này thì toàn bộ bảng ra 0.",
      examples: [
        { input: "amount = 5, coins = [1,2,5]",
          output: "4",
          note: "Bốn tổ hợp: 5; 2+2+1; 2+1+1+1; 1×5. Nếu đảo hai vòng lặp sẽ ra 9 vì đếm cả các thứ tự khác nhau." },
        { input: "amount = 3, coins = [2]",
          output: "0",
          note: "Không tổ hợp nào của đồng 2 cộng thành 3. Đáp án 0 khác hẳn LC 322 (trả -1) — hai bài dễ nhầm nhau." }
      ],
      steps: [
        "Tạo mảng dp[amount + 1], toàn 0, riêng dp[0] = 1.",
        "Vòng NGOÀI: duyệt từng đồng tiền coin.",
        "Vòng TRONG: duyệt x từ coin tới amount (tăng dần vì đồng dùng được nhiều lần).",
        "dp[x] += dp[x - coin].",
        "Trả dp[amount].",
        "Ghi nhớ: ngoài-đồng-trong-tiền = tổ hợp; ngoài-tiền-trong-đồng = hoán vị (LC 377)."
      ],
      alt: {
        title: "Cách khác — đệ quy có ghi nhớ theo (chỉ số đồng, số tiền còn lại)",
        complexity: "O(số đồng × amount) thời gian, O(số đồng × amount) bộ nhớ",
        note: "dfs(i, còn lại) = dfs(i+1, còn lại) [bỏ qua đồng i] + dfs(i, còn lại - coins[i]) [dùng đồng i, VẪN ở i vì dùng được nhiều lần]. Cách này thể hiện rõ bản chất 'chọn hay không chọn' và giải thích luôn vì sao vòng ngoài phải là đồng tiền: chỉ số i chỉ đi tiến, không quay lui, nên mỗi tổ hợp được đếm đúng một lần.",
        java: "private Integer[][] memo;\n\npublic int change(int amount, int[] coins) {\n    memo = new Integer[coins.length + 1][amount + 1];\n    return dfs(coins, 0, amount);\n}\n\nprivate int dfs(int[] coins, int i, int rest) {\n    if (rest == 0) return 1;                  // đủ tiền -> một cách hợp lệ\n    if (i == coins.length || rest < 0) return 0;\n    if (memo[i][rest] != null) return memo[i][rest];\n\n    int ways = dfs(coins, i + 1, rest)                 // KHÔNG dùng đồng i nữa\n             + dfs(coins, i, rest - coins[i]);         // dùng thêm đồng i\n    return memo[i][rest] = ways;\n}"
      },
      java: "public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;                       // đúng MỘT cách tạo ra số tiền 0\n\n    for (int coin : coins) {         // vòng NGOÀI là ĐỒNG TIỀN -> đếm tổ hợp\n        for (int x = coin; x <= amount; x++) {\n            dp[x] += dp[x - coin];\n        }\n    }\n    return dp[amount];\n}",
      js: "function change(amount, coins) {\n  const dp = new Array(amount + 1).fill(0);\n  dp[0] = 1;\n\n  for (const coin of coins) {\n    for (let x = coin; x <= amount; x++) {\n      dp[x] += dp[x - coin];\n    }\n  }\n  return dp[amount];\n}"
    },
    {
      name: "Best Time to Buy and Sell Stock with Cooldown (mua bán cổ phiếu có ngày nghỉ)",
      lc: "309", slug: "best-time-to-buy-and-sell-stock-with-cooldown", diff: "Trung bình",
      tags: "dp state-machine stock cooldown",
      complexity: "O(n) thời gian, O(1) bộ nhớ khi nén về ba biến",
      idea: "Bài DP MÁY TRẠNG THÁI. Mỗi ngày ở một trong ba trạng thái: hold (đang giữ cổ phiếu), sold (vừa bán hôm nay), rest (rảnh, được phép mua). Luật cooldown thể hiện ở chỗ chỉ đi từ sold sang rest, không đi thẳng từ sold sang hold.",
      trap: "Khởi tạo hold = Integer.MIN_VALUE (chưa thể giữ cổ phiếu trước ngày đầu) chứ không phải 0. Và phải tính ba giá trị mới từ giá trị CŨ — dùng ba biến tạm, đừng ghi đè tuần tự.",
      examples: [
        { input: "prices = [1,2,3,0,2]",
          output: "3",
          note: "Mua ngày 0 giá 1, bán ngày 1 giá 2 (lãi 1), nghỉ ngày 2, mua ngày 3 giá 0, bán ngày 4 giá 2 (lãi 2) → tổng 3. Ngày nghỉ bắt buộc sau khi bán." },
        { input: "prices = [1]",
          output: "0",
          note: "Một ngày duy nhất thì không giao dịch được, lãi 0. Nếu khởi tạo hold = 0 thay vì âm vô cùng sẽ ra kết quả sai ở các mảng dài." }
      ],
      steps: [
        "hold = Integer.MIN_VALUE, sold = 0, rest = 0.",
        "Duyệt từng giá p.",
        "prevSold = sold (lưu lại vì sắp ghi đè).",
        "sold = hold + p (bán cổ phiếu đang giữ).",
        "hold = max(hold, rest - p) (giữ tiếp, hoặc mua từ trạng thái rảnh).",
        "rest = max(rest, prevSold) (nghỉ tiếp, hoặc vừa qua ngày cooldown). Đáp án: max(sold, rest)."
      ],
      alt: {
        title: "Cách khác — hai mảng DP buy[i] và sell[i] tường minh",
        complexity: "O(n) thời gian, O(n) bộ nhớ — dài hơn nhưng công thức nhìn rất rõ",
        note: "buy[i] = max(buy[i-1], sell[i-2] - prices[i]) — chỉ số i-2 chính là ngày nghỉ bắt buộc; sell[i] = max(sell[i-1], buy[i-1] + prices[i]). Viết ra dạng này giúp giải thích luật cooldown chỉ bằng một chỉ số, rất thuyết phục khi trình bày trên bảng. Sau đó mới nén xuống O(1) như bản chính.",
        java: "public int maxProfit(int[] prices) {\n    int n = prices.length;\n    if (n < 2) return 0;\n\n    int[] buy = new int[n], sell = new int[n];\n    buy[0] = -prices[0];\n    buy[1] = Math.max(-prices[0], -prices[1]);\n    sell[1] = Math.max(0, prices[1] - prices[0]);\n\n    for (int i = 2; i < n; i++) {\n        buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);   // i-2 = cooldown\n        sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);\n    }\n    return sell[n - 1];\n}"
      },
      java: "public int maxProfit(int[] prices) {\n    int hold = Integer.MIN_VALUE;   // đang GIỮ cổ phiếu\n    int sold = 0;                   // vừa BÁN hôm nay (mai phải nghỉ)\n    int rest = 0;                   // rảnh, được phép mua\n\n    for (int p : prices) {\n        int prevSold = sold;\n        sold = hold + p;                         // bán ra\n        hold = Math.max(hold, rest - p);         // giữ tiếp hoặc mua vào\n        rest = Math.max(rest, prevSold);         // nghỉ tiếp hoặc hết cooldown\n    }\n    return Math.max(sold, rest);\n}",
      js: "function maxProfit(prices) {\n  let hold = -Infinity, sold = 0, rest = 0;\n\n  for (const p of prices) {\n    const prevSold = sold;\n    sold = hold + p;\n    hold = Math.max(hold, rest - p);\n    rest = Math.max(rest, prevSold);\n  }\n  return Math.max(sold, rest);\n}"
    },
    {
      name: "Set Matrix Zeroes (đặt hàng/cột về 0 tại chỗ)",
      lc: "73", slug: "set-matrix-zeroes", diff: "Trung bình",
      tags: "matrix in-place o1-space marker-row",
      complexity: "O(m·n) thời gian, O(1) bộ nhớ phụ",
      idea: "Đề đòi làm TẠI CHỖ. Mẹo: dùng chính HÀNG 0 và CỘT 0 của ma trận làm nơi đánh dấu — nếu ô (i,j) bằng 0 thì ghi dấu vào matrix[i][0] và matrix[0][j]. Cần thêm một biến bool riêng cho cột 0 vì ô (0,0) bị hai vai trò chồng nhau.",
      trap: "Không được vừa quét vừa gán 0 ngay, vì các số 0 mới tạo ra sẽ bị hiểu nhầm là số 0 gốc và làm cả ma trận về 0. Phải tách hai lượt: lượt đánh dấu và lượt áp dụng.",
      examples: [
        { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
          output: "[[1,0,1],[0,0,0],[1,0,1]]",
          note: "Ô (1,1) = 0 nên hàng 1 và cột 1 về 0. Đánh dấu tại matrix[1][0] và matrix[0][1] trước, rồi mới áp dụng ở lượt hai." },
        { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
          output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
          note: "Có số 0 nằm ngay tại cột 0 (ô (0,0)) — đây chính là ca cần biến firstColZero riêng, nếu không sẽ mất dấu và cột 0 không được xóa đúng." }
      ],
      steps: [
        "Duyệt cột 0 trước: nếu có ô nào bằng 0 thì đặt firstColZero = true.",
        "Lượt 1 — duyệt i từ 0, j từ 1: nếu matrix[i][j] == 0 thì đặt matrix[i][0] = 0 và matrix[0][j] = 0.",
        "Lượt 2 — duyệt NGƯỢC i từ m-1 về 0, j từ n-1 về 1: nếu matrix[i][0] == 0 hoặc matrix[0][j] == 0 thì gán 0.",
        "Duyệt ngược để các ô đánh dấu ở hàng/cột 0 chưa bị ghi đè khi còn cần dùng.",
        "Cuối cùng nếu firstColZero thì gán toàn bộ cột 0 về 0.",
        "Không dùng mảng phụ nào — đúng yêu cầu O(1) bộ nhớ."
      ],
      alt: {
        title: "Cách khác — dùng hai Set ghi lại chỉ số hàng và cột cần xóa",
        complexity: "O(m·n) thời gian, O(m + n) bộ nhớ — đơn giản, ít lỗi hơn hẳn",
        note: "Quét một lượt gom chỉ số hàng/cột có số 0 vào hai HashSet, quét lượt hai gán 0 cho mọi ô thuộc hai tập đó. Trong phỏng vấn nên trình bày bản này TRƯỚC (đúng và nhanh), rồi nói 'nếu cần O(1) bộ nhớ thì dùng chính hàng 0 và cột 0 làm chỗ đánh dấu' — đó là nhịp đi từ giải pháp đúng tới giải pháp tối ưu.",
        java: "public void setZeroes(int[][] matrix) {\n    Set<Integer> rows = new HashSet<>(), cols = new HashSet<>();\n\n    for (int i = 0; i < matrix.length; i++) {\n        for (int j = 0; j < matrix[0].length; j++) {\n            if (matrix[i][j] == 0) { rows.add(i); cols.add(j); }\n        }\n    }\n\n    for (int i = 0; i < matrix.length; i++) {\n        for (int j = 0; j < matrix[0].length; j++) {\n            if (rows.contains(i) || cols.contains(j)) matrix[i][j] = 0;\n        }\n    }\n}"
      },
      java: "public void setZeroes(int[][] matrix) {\n    int m = matrix.length, n = matrix[0].length;\n    boolean firstColZero = false;\n\n    // Cột 0 cần biến riêng vì ô (0,0) mang hai vai trò\n    for (int i = 0; i < m; i++) {\n        if (matrix[i][0] == 0) firstColZero = true;\n    }\n\n    // Lượt 1: đánh dấu vào hàng 0 và cột 0\n    for (int i = 0; i < m; i++) {\n        for (int j = 1; j < n; j++) {\n            if (matrix[i][j] == 0) {\n                matrix[i][0] = 0;\n                matrix[0][j] = 0;\n            }\n        }\n    }\n\n    // Lượt 2: áp dụng, duyệt NGƯỢC để không phá dấu khi còn cần\n    for (int i = m - 1; i >= 0; i--) {\n        for (int j = n - 1; j >= 1; j--) {\n            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;\n        }\n        if (firstColZero) matrix[i][0] = 0;\n    }\n}",
      js: "function setZeroes(matrix) {\n  const m = matrix.length, n = matrix[0].length;\n  let firstColZero = false;\n\n  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;\n\n  for (let i = 0; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }\n    }\n  }\n\n  for (let i = m - 1; i >= 0; i--) {\n    for (let j = n - 1; j >= 1; j--) {\n      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;\n    }\n    if (firstColZero) matrix[i][0] = 0;\n  }\n}"
    },
    {
      name: "Pow(x, n) — lũy thừa nhanh",
      lc: "50", slug: "powx-n", diff: "Trung bình",
      tags: "math binary-exponentiation divide-conquer overflow",
      complexity: "O(log n) thời gian, O(1) bộ nhớ với bản lặp",
      idea: "Lũy thừa nhị phân: x^n = (x²)^(n/2) khi n chẵn, và x·(x²)^((n-1)/2) khi n lẻ. Nhân dồn theo các bit 1 của n nên chỉ tốn log n phép nhân thay vì n.",
      trap: "n = Integer.MIN_VALUE (-2147483648) thì -n bị TRÀN SỐ vì +2147483648 không biểu diễn được bằng int. Bắt buộc ép sang long trước khi đổi dấu — đây là ca test mà người phỏng vấn luôn hỏi tới.",
      examples: [
        { input: "x = 2.00000, n = 10",
          output: "1024.00000",
          note: "n = 10 nhị phân là 1010, nên chỉ nhân kết quả tại bit thứ 1 và thứ 3: x²·x⁸ = 4·256 = 1024. Đúng 4 phép bình phương thay vì 10 phép nhân." },
        { input: "x = 2.00000, n = -2",
          output: "0.25000",
          note: "Số mũ âm thì đổi thành 1/x^|n| = 1/4. Đây là chỗ phải ép long: với n = -2147483648 mà không ép sẽ tràn và ra kết quả sai." }
      ],
      steps: [
        "Ép long N = n để tránh tràn.",
        "Nếu N < 0 thì đặt x = 1 / x và N = -N.",
        "Đặt result = 1.0.",
        "Lặp khi N > 0: nếu (N & 1) == 1 thì result *= x.",
        "x *= x và N >>= 1 (dịch phải một bit).",
        "Trả result."
      ],
      alt: {
        title: "Cách khác — chia để trị bằng đệ quy",
        complexity: "O(log n) thời gian, O(log n) bộ nhớ do stack đệ quy",
        note: "half = pow(x, n/2) rồi trả half*half (n chẵn) hoặc half*half*x (n lẻ). QUAN TRỌNG: chỉ gọi đệ quy MỘT lần rồi bình phương — nếu viết pow(x,n/2)*pow(x,n/2) thì cây đệ quy nở ra O(n) và mất sạch ưu thế. Đây là lỗi hay bị hỏi vặn nhất ở bài này.",
        java: "public double myPow(double x, int n) {\n    long N = n;\n    if (N < 0) { x = 1 / x; N = -N; }\n    return fastPow(x, N);\n}\n\nprivate double fastPow(double x, long n) {\n    if (n == 0) return 1.0;\n\n    double half = fastPow(x, n / 2);   // gọi MỘT lần rồi bình phương\n    return (n % 2 == 0) ? half * half : half * half * x;\n}"
      },
      java: "public double myPow(double x, int n) {\n    long N = n;                 // ép long: n = Integer.MIN_VALUE thì -n TRÀN\n    if (N < 0) {\n        x = 1 / x;\n        N = -N;\n    }\n\n    double result = 1.0;\n    while (N > 0) {\n        if ((N & 1) == 1) result *= x;   // bit 1 -> nhân vào kết quả\n        x *= x;\n        N >>= 1;\n    }\n    return result;\n}",
      js: "function myPow(x, n) {\n  let N = n;\n  if (N < 0) { x = 1 / x; N = -N; }\n\n  let result = 1;\n  while (N > 0) {\n    if (N % 2 === 1) result *= x;\n    x *= x;\n    N = Math.floor(N / 2);\n  }\n  return result;\n}"
    }
  ]
}
];
