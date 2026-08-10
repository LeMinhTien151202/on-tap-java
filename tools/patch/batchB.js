// Bổ sung "cách làm khác" cho 62 bài LeetCode (phần 1: Hash Map, Two Pointers, Stack, Binary Search, Linked List).
module.exports = {

"Two Sum (tổng hai số)": { alt: {
  title: "Cách khác — sắp xếp + hai con trỏ",
  complexity: "O(n log n) thời gian · O(1) bộ nhớ phụ",
  note: "Đổi bộ nhớ lấy thời gian. Nhược điểm lớn: sắp xếp làm MẤT chỉ số gốc, nên phải bọc thành mảng cặp (giá trị, chỉ số). Chỉ nên chọn khi đề yêu cầu O(1) bộ nhớ hoặc chỉ cần biết có tồn tại hay không.",
  java: `int[] twoSumSorted(int[] nums, int target) {
    int n = nums.length;
    int[][] pairs = new int[n][2];
    for (int i = 0; i < n; i++) pairs[i] = new int[] { nums[i], i };
    Arrays.sort(pairs, (a, b) -> a[0] - b[0]);

    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int sum = pairs[lo][0] + pairs[hi][0];
        if (sum == target) return new int[] { pairs[lo][1], pairs[hi][1] };
        if (sum < target) lo++;
        else hi--;
    }
    return new int[0];
}` } },

"Contains Duplicate (có phần tử trùng không)": { alt: {
  title: "Cách khác — sắp xếp rồi so cặp kề nhau",
  complexity: "O(n log n) thời gian · O(1) bộ nhớ",
  note: "Dùng khi bộ nhớ bị siết chặt. Bản Stream một dòng (nums.length != Arrays.stream(nums).distinct().count()) đẹp nhưng vẫn tốn O(n) bộ nhớ như HashSet.",
  java: `boolean containsDuplicate(int[] nums) {
    Arrays.sort(nums);
    for (int i = 1; i < nums.length; i++)
        if (nums[i] == nums[i - 1]) return true;
    return false;
}

// Một dòng bằng Stream (vẫn O(n) bộ nhớ)
boolean containsDuplicateStream(int[] nums) {
    return nums.length != Arrays.stream(nums).distinct().count();
}` } },

"Valid Anagram (hai chuỗi đảo chữ)": { alt: {
  title: "Cách khác — sắp xếp hai chuỗi rồi so sánh",
  complexity: "O(n log n) thời gian · O(n) bộ nhớ (do toCharArray)",
  note: "Ngắn gọn, dễ nhớ. Chậm hơn mảng đếm 26 phần tử, nhưng ĐÚNG với mọi bộ ký tự (Unicode, tiếng Việt có dấu) — trong khi int[26] chỉ đúng với a-z.",
  java: `boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    char[] a = s.toCharArray(), b = t.toCharArray();
    Arrays.sort(a);
    Arrays.sort(b);
    return Arrays.equals(a, b);
}` } },

"Group Anagrams (gom nhóm chuỗi đảo chữ)": { alt: {
  title: "Cách khác — khóa là mảng đếm 26 ký tự",
  complexity: "O(n × k) với k là độ dài chuỗi — bỏ được thừa số log k",
  note: "Thay vì sắp xếp mỗi chuỗi để làm khóa, dùng chuỗi ký hiệu kiểu \"#2#0#1...\" dựng từ mảng đếm. Nhanh hơn khi chuỗi dài, nhưng chỉ áp dụng được cho bảng chữ cái hẹp.",
  java: `List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;

        StringBuilder key = new StringBuilder();
        for (int c : count) key.append('#').append(c);

        map.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}` } },

"Top K Frequent Elements (K phần tử hay gặp nhất)": { alt: {
  title: "Cách khác — min-heap kích thước k",
  complexity: "O(n log k) thời gian · O(n + k) bộ nhớ",
  note: "Chậm hơn bucket sort về lý thuyết nhưng là cách TỔNG QUÁT: hoạt động cả khi tần suất không bị chặn bởi n, và xử lý được luồng dữ liệu vô hạn (streaming top-k).",
  java: `int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int n : nums) freq.merge(n, 1, Integer::sum);

    PriorityQueue<Map.Entry<Integer, Integer>> pq =
        new PriorityQueue<>(Map.Entry.comparingByValue());   // min-heap theo tần suất

    for (var e : freq.entrySet()) {
        pq.offer(e);
        if (pq.size() > k) pq.poll();      // loại phần tử ít gặp nhất
    }
    int[] res = new int[k];
    for (int i = k - 1; i >= 0; i--) res[i] = pq.poll().getKey();
    return res;
}` } },

"Longest Consecutive Sequence (dãy liên tiếp dài nhất)": { alt: {
  title: "Cách khác — sắp xếp rồi quét một lượt",
  complexity: "O(n log n) thời gian · O(1) bộ nhớ phụ",
  note: "Đề đòi O(n) nên bản này bị coi là chưa tối ưu, nhưng đơn giản và ít lỗi hơn nhiều. Bẫy khi sắp xếp: phải BỎ QUA phần tử trùng, nếu không chuỗi bị đứt sai.",
  java: `int longestConsecutive(int[] nums) {
    if (nums.length == 0) return 0;
    Arrays.sort(nums);
    int best = 1, cur = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) continue;            // bỏ qua trùng
        if (nums[i] == nums[i - 1] + 1) cur++;
        else cur = 1;
        best = Math.max(best, cur);
    }
    return best;
}` } },

"Valid Palindrome (chuỗi đối xứng)": { alt: {
  title: "Cách khác — lọc sạch rồi so với chuỗi đảo ngược",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Dễ đọc nhưng tốn thêm bộ nhớ cho chuỗi mới. Bản hai con trỏ tốt hơn vì O(1) bộ nhớ và có thể dừng sớm ngay khi phát hiện lệch.",
  java: `boolean isPalindrome(String s) {
    String clean = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
    return clean.equals(new StringBuilder(clean).reverse().toString());
}` } },

"Two Sum II — mảng đã sắp xếp": { alt: {
  title: "Cách khác — tìm nhị phân phần bù",
  complexity: "O(n log n) thời gian · O(1) bộ nhớ",
  note: "Với mỗi i, tìm nhị phân target - nums[i] trong phần còn lại. Chậm hơn hai con trỏ nhưng là bước đệm tự nhiên nếu bạn chưa nghĩ ra hai con trỏ — cứ nói ra rồi tối ưu dần.",
  java: `int[] twoSumBinary(int[] nums, int target) {
    for (int i = 0; i < nums.length - 1; i++) {
        int need = target - nums[i];
        int lo = i + 1, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == need) return new int[] { i + 1, mid + 1 };
            if (nums[mid] < need) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return new int[0];
}` } },

"3Sum (bộ ba có tổng bằng 0)": { alt: {
  title: "Cách khác — HashSet cho vòng trong",
  complexity: "O(n²) thời gian · O(n) bộ nhớ",
  note: "Không cần sắp xếp trước, nhưng phải dùng Set kết quả để khử bộ ba trùng — tốn bộ nhớ hơn. Bản sắp xếp + hai con trỏ vẫn tốt hơn vì khử trùng bằng cách nhảy qua giá trị lặp.",
  java: `List<List<Integer>> threeSum(int[] nums) {
    Set<List<Integer>> res = new HashSet<>();
    for (int i = 0; i < nums.length - 2; i++) {
        Set<Integer> seen = new HashSet<>();
        for (int j = i + 1; j < nums.length; j++) {
            int need = -nums[i] - nums[j];
            if (seen.contains(need)) {
                List<Integer> triple = Arrays.asList(nums[i], nums[j], need);
                Collections.sort(triple);          // chuẩn hóa để khử trùng
                res.add(triple);
            }
            seen.add(nums[j]);
        }
    }
    return new ArrayList<>(res);
}` } },

"Container With Most Water (thùng chứa nhiều nước nhất)": { alt: {
  title: "Cách khác — vét cạn mọi cặp (để đối chiếu)",
  complexity: "O(n²) thời gian · O(1) bộ nhớ",
  note: "Đáng viết ra khi phỏng vấn làm mốc so sánh, rồi giải thích vì sao hai con trỏ đúng: dịch cột CAO hơn không bao giờ cho diện tích lớn hơn vì chiều rộng giảm mà chiều cao bị chặn bởi cột thấp.",
  java: `int maxAreaBruteForce(int[] height) {
    int best = 0;
    for (int i = 0; i < height.length; i++)
        for (int j = i + 1; j < height.length; j++)
            best = Math.max(best, (j - i) * Math.min(height[i], height[j]));
    return best;
}` } },

"Trapping Rain Water (hứng nước mưa)": { alt: {
  title: "Cách khác — monotonic stack theo lớp ngang",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Stack giữ chỉ số các cột giảm dần; gặp cột cao hơn thì 'múc' phần nước nằm ngang giữa cột vừa pop và hai bên. Cách này tính nước theo LỚP NGANG, khác hẳn hai con trỏ tính theo CỘT DỌC.",
  java: `int trap(int[] height) {
    Deque<Integer> stack = new ArrayDeque<>();
    int water = 0;
    for (int i = 0; i < height.length; i++) {
        while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
            int bottom = stack.pop();
            if (stack.isEmpty()) break;              // không có thành bên trái
            int left = stack.peek();
            int width = i - left - 1;
            int h = Math.min(height[left], height[i]) - height[bottom];
            water += width * h;
        }
        stack.push(i);
    }
    return water;
}` } },

"Longest Substring Without Repeating Characters": { alt: {
  title: "Cách khác — cửa sổ trượt với HashSet (co từng bước)",
  complexity: "O(n) thời gian · O(min(n, bảng chữ cái)) bộ nhớ",
  note: "Thay vì nhảy thẳng left bằng chỉ số trong map, ta co left từng bước và xóa dần khỏi Set. Chậm hơn chút nhưng TRÁNH hoàn toàn cái bẫy phải viết Math.max cho left.",
  java: `int lengthOfLongestSubstring(String s) {
    Set<Character> window = new HashSet<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        while (!window.add(s.charAt(right)))          // trùng → co trái
            window.remove(s.charAt(left++));
        best = Math.max(best, right - left + 1);
    }
    return best;
}` } },

"Longest Repeating Character Replacement": { alt: {
  title: "Cách khác — thử từng ký tự làm ký tự giữ lại",
  complexity: "O(26n) thời gian · O(1) bộ nhớ",
  note: "Cố định ký tự đích rồi trượt cửa sổ đếm số ký tự KHÁC nó (phải thay). Chậm hơn 26 lần nhưng dễ chứng minh tính đúng — bản tối ưu dùng maxCount không giảm khiến nhiều người khó tin là đúng.",
  java: `int characterReplacement(String s, int k) {
    int best = 0;
    for (char target = 'A'; target <= 'Z'; target++) {
        int left = 0, changed = 0;
        for (int right = 0; right < s.length(); right++) {
            if (s.charAt(right) != target) changed++;
            while (changed > k) {
                if (s.charAt(left) != target) changed--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
    }
    return best;
}` } },

"Permutation in String (chứa hoán vị của chuỗi khác)": { alt: {
  title: "Cách khác — so sánh mảng đếm bằng biến matches",
  complexity: "O(n) thời gian · O(1) bộ nhớ",
  note: "Thay vì gọi Arrays.equals (26 phép so sánh) mỗi lần trượt, duy trì biến đếm số vị trí đã khớp và chỉ cập nhật 2 vị trí bị ảnh hưởng. Tối ưu hằng số đáng kể với chuỗi dài.",
  java: `boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] need = new int[26], have = new int[26];
    for (int i = 0; i < s1.length(); i++) {
        need[s1.charAt(i) - 'a']++;
        have[s2.charAt(i) - 'a']++;
    }
    int matches = 0;
    for (int i = 0; i < 26; i++) if (need[i] == have[i]) matches++;

    for (int r = s1.length(); r < s2.length(); r++) {
        if (matches == 26) return true;
        int in = s2.charAt(r) - 'a', out = s2.charAt(r - s1.length()) - 'a';

        have[in]++;
        if (have[in] == need[in]) matches++;
        else if (have[in] == need[in] + 1) matches--;

        have[out]--;
        if (have[out] == need[out]) matches++;
        else if (have[out] == need[out] - 1) matches--;
    }
    return matches == 26;
}` } },

"Minimum Window Substring (cửa sổ nhỏ nhất chứa đủ ký tự)": { alt: {
  title: "Cách khác — lọc trước các vị trí có ích",
  complexity: "O(|S| + |T|) — nhanh hơn nhiều khi S dài mà ít ký tự liên quan",
  note: "Chỉ giữ lại những vị trí trong S có ký tự thuộc T rồi trượt cửa sổ trên danh sách rút gọn đó. Rất hiệu quả với chuỗi ADN dài hoặc log lớn mà từ khóa thưa thớt.",
  java: `String minWindow(String s, String t) {
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);

    // chỉ giữ vị trí có ký tự thuộc t
    List<int[]> filtered = new ArrayList<>();
    for (int i = 0; i < s.length(); i++)
        if (need.containsKey(s.charAt(i))) filtered.add(new int[] { i, s.charAt(i) });

    Map<Character, Integer> window = new HashMap<>();
    int have = 0, bestLen = Integer.MAX_VALUE, bestL = 0, left = 0;
    for (int right = 0; right < filtered.size(); right++) {
        char c = (char) filtered.get(right)[1];
        window.merge(c, 1, Integer::sum);
        if (window.get(c).equals(need.get(c))) have++;

        while (have == need.size()) {
            int i = filtered.get(left)[0], j = filtered.get(right)[0];
            if (j - i + 1 < bestLen) { bestLen = j - i + 1; bestL = i; }
            char lc = (char) filtered.get(left)[1];
            if (window.merge(lc, -1, Integer::sum) < need.get(lc)) have--;
            left++;
        }
    }
    return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestL, bestL + bestLen);
}` } },

"Min Stack (stack lấy min trong O(1))": { alt: {
  title: "Cách khác — một stack, lưu hiệu so với min",
  complexity: "O(1) mọi thao tác · O(n) bộ nhớ nhưng chỉ MỘT stack",
  note: "Mẹo cổ điển: đẩy 2*val - min khi val < min. Tiết kiệm được stack phụ nhưng dễ TRÀN SỐ (phải dùng long) và khó đọc — nêu ra như một lựa chọn, đừng chọn làm bản chính.",
  java: `class MinStack {
    private final Deque<Long> stack = new ArrayDeque<>();
    private long min;

    public void push(int val) {
        if (stack.isEmpty()) { min = val; stack.push(0L); }
        else {
            stack.push(val - min);            // lưu HIỆU, có thể âm
            if (val < min) min = val;
        }
    }

    public void pop() {
        long diff = stack.pop();
        if (diff < 0) min = min - diff;       // khôi phục min trước đó
    }

    public int top() {
        long diff = stack.peek();
        return (int) (diff > 0 ? diff + min : min);
    }

    public int getMin() { return (int) min; }
}` } },

"Evaluate Reverse Polish Notation (tính biểu thức hậu tố)": { alt: {
  title: "Cách khác — đệ quy từ cuối mảng",
  complexity: "O(n) thời gian · O(n) bộ nhớ ngăn xếp",
  note: "Đọc ngược từ cuối: gặp toán tử thì gọi đệ quy lấy hai toán hạng. Cho thấy quan hệ giữa RPN và CÂY biểu thức — câu hỏi nối tiếp hay gặp là 'dựng cây biểu thức từ RPN'.",
  java: `private int pos;

int evalRPN(String[] tokens) {
    pos = tokens.length - 1;
    return eval(tokens);
}

private int eval(String[] tokens) {
    String token = tokens[pos--];
    if (!"+-*/".contains(token) || token.length() > 1) return Integer.parseInt(token);
    int right = eval(tokens);     // đọc ngược nên toán hạng PHẢI ra trước
    int left  = eval(tokens);
    return switch (token) {
        case "+" -> left + right;
        case "-" -> left - right;
        case "*" -> left * right;
        default  -> left / right;
    };
}` } },

"Daily Temperatures (bao lâu nữa thì ấm hơn)": { alt: {
  title: "Cách khác — duyệt ngược, nhảy theo kết quả đã tính",
  complexity: "O(n) khấu hao · O(1) bộ nhớ phụ",
  note: "Không cần stack: duyệt từ phải sang, dùng chính mảng kết quả để nhảy cóc qua những ngày chắc chắn không ấm hơn. Tiết kiệm bộ nhớ, nhưng khó nhìn ra tính đúng hơn bản stack.",
  java: `int[] dailyTemperatures(int[] t) {
    int n = t.length;
    int[] res = new int[n];
    for (int i = n - 2; i >= 0; i--) {
        int j = i + 1;
        while (j < n && t[j] <= t[i]) {
            if (res[j] == 0) { j = n; break; }   // phía sau không còn ngày nào ấm hơn
            j += res[j];                          // nhảy cóc
        }
        if (j < n) res[i] = j - i;
    }
    return res;
}` } },

"Largest Rectangle in Histogram (hình chữ nhật lớn nhất)": { alt: {
  title: "Cách khác — mảng biên trái/phải tường minh",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Tính riêng left[i] và right[i] (cột đầu tiên thấp hơn ở mỗi phía) rồi lấy max height[i] * (right[i] - left[i] - 1). Dài hơn nhưng dễ gỡ lỗi hơn bản stack một lượt.",
  java: `int largestRectangleArea(int[] h) {
    int n = h.length;
    int[] left = new int[n], right = new int[n];

    for (int i = 0; i < n; i++) {
        int p = i - 1;
        while (p >= 0 && h[p] >= h[i]) p = left[p];   // nhảy theo biên đã biết
        left[i] = p;
    }
    for (int i = n - 1; i >= 0; i--) {
        int p = i + 1;
        while (p < n && h[p] >= h[i]) p = right[p];
        right[i] = p;
    }
    int best = 0;
    for (int i = 0; i < n; i++) best = Math.max(best, h[i] * (right[i] - left[i] - 1));
    return best;
}` } },

"Search in Rotated Sorted Array (mảng sắp xếp bị xoay)": { alt: {
  title: "Cách khác — tìm điểm xoay trước, rồi binary search bình thường",
  complexity: "O(log n) — hai lần tìm nhị phân",
  note: "Chia bài thành hai bước độc lập nên dễ suy luận và ít lỗi biên hơn bản 'một lần quét'. Nhược điểm: KHÔNG mở rộng được cho mảng có phần tử TRÙNG (LC 81 tệ nhất là O(n)).",
  java: `int search(int[] nums, int target) {
    int n = nums.length;
    int lo = 0, hi = n - 1;
    while (lo < hi) {                     // bước 1: tìm chỉ số phần tử nhỏ nhất
        int mid = (lo + hi) >>> 1;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    int pivot = lo;

    lo = 0; hi = n - 1;                   // bước 2: binary search trên chỉ số xoay
    while (lo <= hi) {
        int mid = (lo + hi) >>> 1;
        int real = (mid + pivot) % n;
        if (nums[real] == target) return real;
        if (nums[real] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}` } },

"Find Minimum in Rotated Sorted Array (tìm điểm xoay)": { alt: {
  title: "Cách khác — bản xử lý được phần tử TRÙNG (LC 154)",
  complexity: "O(log n) trung bình, O(n) trường hợp xấu nhất",
  note: "Khi nums[mid] == nums[hi] ta không biết điểm xoay ở đâu, chỉ còn cách hi-- (loại bỏ an toàn 1 phần tử). Đó là lý do trường hợp xấu nhất tụt về O(n) — người phỏng vấn rất hay hỏi vặn chỗ này.",
  java: `int findMinWithDuplicates(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (nums[mid] > nums[hi])      lo = mid + 1;
        else if (nums[mid] < nums[hi]) hi = mid;
        else                           hi--;   // không phân biệt được → thu hẹp an toàn
    }
    return nums[lo];
}` } },

"Koko Eating Bananas (tìm nhị phân trên ĐÁP ÁN)": { alt: {
  title: "Cách khác — khuôn mẫu chung cho mọi bài nhị phân trên đáp án",
  complexity: "O(n log(miền giá trị))",
  note: "Tách hàm feasible(x) ra riêng thì cùng một khung giải được Split Array Largest Sum (410), Capacity To Ship Packages (1011), Minimum Time to Complete Trips (2187). Điều kiện bắt buộc: feasible phải ĐƠN ĐIỆU.",
  java: `// Khuôn mẫu: tìm x NHỎ NHẤT thỏa feasible(x)
int binarySearchOnAnswer(int loBound, int hiBound, IntPredicate feasible) {
    int lo = loBound, hi = hiBound;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (feasible.test(mid)) hi = mid;    // còn dư → thử nhỏ hơn
        else                    lo = mid + 1;
    }
    return lo;
}

int minEatingSpeed(int[] piles, int h) {
    int max = Arrays.stream(piles).max().orElse(1);
    return binarySearchOnAnswer(1, max, speed -> {
        long hours = 0;
        for (int p : piles) hours += (p + speed - 1) / speed;   // làm tròn lên
        return hours <= h;
    });
}` } },

"Search a 2D Matrix (tìm trong ma trận đã sắp xếp)": { alt: {
  title: "Cách khác — đi từ góc trên bên phải (LC 240)",
  complexity: "O(m + n) thời gian · O(1) bộ nhớ",
  note: "Dùng cho ma trận chỉ tăng theo TỪNG hàng và TỪNG cột (không phải một dãy phẳng). Đứng ở góc trên phải: lớn hơn target thì sang trái, nhỏ hơn thì xuống dưới — mỗi bước loại hẳn một hàng hoặc một cột.",
  java: `boolean searchMatrixII(int[][] matrix, int target) {
    int row = 0, col = matrix[0].length - 1;   // góc trên bên PHẢI
    while (row < matrix.length && col >= 0) {
        int val = matrix[row][col];
        if (val == target) return true;
        if (val > target) col--;               // loại cả cột
        else              row++;               // loại cả hàng
    }
    return false;
}` } },

"Median of Two Sorted Arrays (trung vị hai mảng)": { alt: {
  title: "Cách khác — trộn hai con trỏ đến vị trí giữa",
  complexity: "O(m + n) thời gian · O(1) bộ nhớ",
  note: "Không đạt yêu cầu O(log(m+n)) của đề, nhưng nên viết trước để có bản chạy đúng rồi mới tối ưu. Chỉ cần đi đến phần tử thứ (m+n)/2, không phải trộn hết.",
  java: `double findMedianSortedArrays(int[] a, int[] b) {
    int m = a.length, n = b.length, total = m + n;
    int i = 0, j = 0, prev = 0, cur = 0;

    for (int k = 0; k <= total / 2; k++) {
        prev = cur;
        if (i < m && (j >= n || a[i] <= b[j])) cur = a[i++];
        else                                    cur = b[j++];
    }
    return (total % 2 == 1) ? cur : (prev + cur) / 2.0;
}` } },

"Remove Nth Node From End (xóa node thứ n từ cuối)": { alt: {
  title: "Cách khác — đếm độ dài rồi duyệt lần hai",
  complexity: "O(n) thời gian nhưng duyệt HAI lượt · O(1) bộ nhớ",
  note: "Trực quan hơn và không cần khoảng cách n giữa hai con trỏ. Chỉ thua khi danh sách chỉ đọc được MỘT lần (dữ liệu luồng) — lúc đó bắt buộc dùng hai con trỏ.",
  java: `ListNode removeNthFromEnd(ListNode head, int n) {
    int length = 0;
    for (ListNode p = head; p != null; p = p.next) length++;

    ListNode dummy = new ListNode(0, head);
    ListNode prev = dummy;
    for (int i = 0; i < length - n; i++) prev = prev.next;
    prev.next = prev.next.next;
    return dummy.next;
}` } },

"Add Two Numbers (cộng hai số dạng danh sách)": { alt: {
  title: "Cách khác — bản chữ số theo thứ tự XUÔI (LC 445)",
  complexity: "O(m + n) thời gian · O(m + n) bộ nhớ",
  note: "Biến thể rất hay bị hỏi tiếp: khi chữ số hàng cao đứng TRƯỚC, không được đảo danh sách thì phải đẩy vào stack rồi cộng từ đỉnh — vì phép nhớ lan từ hàng thấp lên.",
  java: `ListNode addTwoNumbersForward(ListNode l1, ListNode l2) {
    Deque<Integer> s1 = new ArrayDeque<>(), s2 = new ArrayDeque<>();
    for (ListNode p = l1; p != null; p = p.next) s1.push(p.val);
    for (ListNode p = l2; p != null; p = p.next) s2.push(p.val);

    ListNode head = null;
    int carry = 0;
    while (!s1.isEmpty() || !s2.isEmpty() || carry != 0) {
        int sum = carry;
        if (!s1.isEmpty()) sum += s1.pop();
        if (!s2.isEmpty()) sum += s2.pop();
        carry = sum / 10;
        head = new ListNode(sum % 10, head);   // chèn vào ĐẦU
    }
    return head;
}` } },

"Reorder List (sắp xếp lại 1→n→2→n-1...)": { alt: {
  title: "Cách khác — đổ vào mảng rồi ghép hai đầu",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Đơn giản hơn nhiều so với 'tìm giữa → đảo nửa sau → trộn', đổi lại tốn O(n) bộ nhớ. Nếu đề không siết bộ nhớ, đây là bản viết nhanh và ít lỗi hơn hẳn.",
  java: `void reorderList(ListNode head) {
    List<ListNode> nodes = new ArrayList<>();
    for (ListNode p = head; p != null; p = p.next) nodes.add(p);

    int i = 0, j = nodes.size() - 1;
    while (i < j) {
        nodes.get(i).next = nodes.get(j);
        i++;
        if (i == j) break;
        nodes.get(j).next = nodes.get(i);
        j--;
    }
    nodes.get(i).next = null;    // cắt đuôi, tránh tạo vòng
}` } },

"Copy List with Random Pointer (sao chép sâu có con trỏ random)": { alt: {
  title: "Cách khác — chèn xen kẽ, O(1) bộ nhớ phụ",
  complexity: "O(n) thời gian · O(1) bộ nhớ phụ",
  note: "Ba lượt: chèn bản sao ngay sau mỗi nút gốc, gán random bằng cur.random.next, rồi tách hai danh sách. Mẹo rất đẹp, thay hoàn toàn HashMap — hay được hỏi 'làm sao bỏ được map?'",
  java: `Node copyRandomList(Node head) {
    if (head == null) return null;

    for (Node cur = head; cur != null; cur = cur.next.next)      // 1) chèn xen kẽ
        cur.next = new Node(cur.val, cur.next, null);

    for (Node cur = head; cur != null; cur = cur.next.next)      // 2) gán random
        if (cur.random != null) cur.next.random = cur.random.next;

    Node copyHead = head.next;                                    // 3) tách đôi
    for (Node cur = head; cur != null; cur = cur.next) {
        Node copy = cur.next;
        cur.next = copy.next;
        copy.next = (copy.next != null) ? copy.next.next : null;
    }
    return copyHead;
}` } },

"Merge k Sorted Lists (trộn k danh sách đã sắp xếp)": { alt: {
  title: "Cách khác — trộn từng cặp theo kiểu chia để trị",
  complexity: "O(N log k) thời gian · O(1) bộ nhớ phụ",
  note: "Cùng độ phức tạp với heap nhưng KHÔNG tốn bộ nhớ cho hàng đợi ưu tiên và không cần comparator. Trộn tuần tự từng danh sách vào kết quả là O(N·k) — chậm hơn hẳn, đừng làm vậy.",
  java: `ListNode mergeKLists(ListNode[] lists) {
    if (lists.length == 0) return null;
    int interval = 1;
    while (interval < lists.length) {
        for (int i = 0; i + interval < lists.length; i += interval * 2)
            lists[i] = mergeTwo(lists[i], lists[i + interval]);
        interval *= 2;
    }
    return lists[0];
}

private ListNode mergeTwo(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { tail.next = a; a = a.next; }
        else                { tail.next = b; b = b.next; }
        tail = tail.next;
    }
    tail.next = (a != null) ? a : b;
    return dummy.next;
}` } }

};
