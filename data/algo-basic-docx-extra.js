// Bài bổ sung sau khi đối chiếu tài liệu "thuật toán.docx".
(function () {
  var groups = [
    {
      group: "Hay gặp nhất — Bài Java cơ bản từ tài liệu",
      items: [
        {
          name: "Giai thừa an toàn — đệ quy, vòng lặp và BigInteger",
          diff: "Dễ",
          tags: "math recursion loop bigint co-ban",
          examples: [
            { input: "n = 5", output: "120", note: "5! = 5 × 4 × 3 × 2 × 1." },
            { input: "n = 0", output: "1", note: "Theo định nghĩa, 0! = 1. Số âm không có giai thừa trong bài toán số nguyên cơ bản." }
          ],
          complexity: "O(n) thời gian · O(1) biến đếm, kết quả BigInteger tăng theo n",
          idea: "Nhân dồn từ 2 tới n. BigInteger tránh lỗi tràn vì long chỉ chứa chính xác tới 20!, còn int chỉ tới 12!.",
          steps: ["Chặn n < 0 bằng IllegalArgumentException.", "Khởi tạo kết quả bằng BigInteger.ONE.", "Duyệt i từ 2 tới n và nhân dồn.", "Trả kết quả; nếu đề bắt buộc long thì dùng Math.multiplyExact để phát hiện tràn."],
          trap: "Code trong tài liệu không in kết quả và dùng int nên tràn từ 13!. Đệ quy còn có thể StackOverflowError khi n lớn; đừng dùng đệ quy chỉ vì đề có chữ giai thừa.",
          java: "BigInteger factorial(int n) {\n    if (n < 0) throw new IllegalArgumentException(\"n phải >= 0\");\n    BigInteger result = BigInteger.ONE;\n    for (int i = 2; i <= n; i++) {\n        result = result.multiply(BigInteger.valueOf(i));\n    }\n    return result;\n}",
          js: "function factorial(n) {\n  if (!Number.isInteger(n) || n < 0) throw new Error(\"n phải là số nguyên >= 0\");\n  let result = 1n;\n  for (let i = 2n; i <= BigInt(n); i++) result *= i;\n  return result;\n}",
          alt: {
            title: "Cách khác — đệ quy có kiểm tra tràn",
            complexity: "O(n) thời gian · O(n) ngăn xếp",
            note: "Bản này phù hợp để giải thích base case và call stack, không phù hợp cho đầu vào lớn.",
            java: "long factorialRecursive(int n) {\n    if (n < 0) throw new IllegalArgumentException(\"n phải >= 0\");\n    if (n <= 1) return 1L;\n    return Math.multiplyExact(n, factorialRecursive(n - 1));\n}"
          }
        },
        {
          name: "In hình bằng vòng lặp — chữ nhật rỗng và tam giác số",
          diff: "Dễ",
          tags: "loop nested-loop pattern stringbuilder co-ban",
          examples: [
            { input: "rectangle(5, 3)", output: "*****\\n*   *\\n*****", note: "Chỉ in sao ở hàng đầu/cuối hoặc cột đầu/cuối." },
            { input: "numberTriangle(4)", output: "1\\n12\\n123\\n1234", note: "Hàng i chứa các số từ 1 tới i." }
          ],
          complexity: "Chữ nhật O(width × height) · Tam giác O(n²)",
          idea: "Tách điều kiện biên khỏi thao tác xuất. Trả về List<String> giúp kiểm thử dễ hơn việc println trực tiếp trong thuật toán.",
          steps: ["Kiểm tra kích thước dương.", "Duyệt từng hàng và từng cột.", "Với chữ nhật: vị trí thuộc biên thì ghi '*', bên trong ghi khoảng trắng.", "Với tam giác: hàng i lặp j từ 1 tới i.", "Gom từng hàng vào danh sách để test hoặc in sau."],
          trap: "Vòng trong của tam giác chỉ cần chạy tới i, không cần chạy tới n rồi continue. Nếu width hoặc height bằng 1 thì mọi ô đều là biên.",
          java: "List<String> hollowRectangle(int width, int height) {\n    if (width <= 0 || height <= 0) throw new IllegalArgumentException();\n    List<String> rows = new ArrayList<>();\n    for (int r = 0; r < height; r++) {\n        StringBuilder row = new StringBuilder();\n        for (int c = 0; c < width; c++) {\n            boolean border = r == 0 || r == height - 1 || c == 0 || c == width - 1;\n            row.append(border ? '*' : ' ');\n        }\n        rows.add(row.toString());\n    }\n    return rows;\n}\n\nList<String> numberTriangle(int n) {\n    List<String> rows = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n        StringBuilder row = new StringBuilder();\n        for (int j = 1; j <= i; j++) row.append(j);\n        rows.add(row.toString());\n    }\n    return rows;\n}",
          js: "function hollowRectangle(width, height) {\n  if (width <= 0 || height <= 0) throw new Error(\"Kích thước phải dương\");\n  return Array.from({ length: height }, (_, r) =>\n    Array.from({ length: width }, (_, c) =>\n      r === 0 || r === height - 1 || c === 0 || c === width - 1 ? \"*\" : \" \"\n    ).join(\"\")\n  );\n}\n\nfunction numberTriangle(n) {\n  return Array.from({ length: n }, (_, i) =>\n    Array.from({ length: i + 1 }, (_, j) => j + 1).join(\"\")\n  );\n}",
          alt: {
            title: "Cách khác — dựng từng hàng bằng repeat",
            complexity: "O(width × height)",
            note: "Khi chỉ cần chuỗi kết quả, repeat làm rõ cấu trúc hình hơn hai vòng lặp lồng nhau.",
            java: "List<String> hollowRectangleRepeat(int w, int h) {\n    if (w <= 0 || h <= 0) throw new IllegalArgumentException();\n    String full = \"*\".repeat(w);\n    String middle = w == 1 ? \"*\" : \"*\" + \" \".repeat(w - 2) + \"*\";\n    List<String> rows = new ArrayList<>();\n    for (int r = 0; r < h; r++) rows.add(r == 0 || r == h - 1 ? full : middle);\n    return rows;\n}"
          }
        },
        {
          name: "Đếm ký tự chỉ định và lập bảng tần suất Unicode",
          diff: "Dễ",
          tags: "string hashmap unicode frequency co-ban",
          examples: [
            { input: "text = \"java java\", target = 'a'", output: "4", note: "Khoảng trắng vẫn được duyệt nhưng không khớp target." },
            { input: "text = \"😀a😀\", target = \"😀\"", output: "2", note: "Emoji chiếm hai char UTF-16 nên phải đếm theo code point." }
          ],
          complexity: "O(n) thời gian · O(k) bộ nhớ với k ký tự khác nhau",
          idea: "Duyệt code point thay vì char để không tách đôi emoji. Map.merge là mẫu đếm tần suất gọn và an toàn.",
          steps: ["Chuyển target thành đúng một code point.", "Duyệt text.codePoints().", "Tăng Map bằng merge(cp, 1, Integer::sum).", "Lấy tần suất của target bằng getOrDefault."],
          trap: "char chỉ là một đơn vị UTF-16, không luôn tương ứng một ký tự người dùng nhìn thấy. HashMap không giữ thứ tự; dùng LinkedHashMap nếu cần in theo lần xuất hiện đầu.",
          java: "int countCodePoint(String text, String target) {\n    int[] targetPoints = target.codePoints().toArray();\n    if (targetPoints.length != 1) throw new IllegalArgumentException(\"target phải có đúng một ký tự\");\n    int wanted = targetPoints[0], count = 0;\n    for (int cp : text.codePoints().toArray()) if (cp == wanted) count++;\n    return count;\n}\n\nMap<Integer, Integer> frequency(String text) {\n    Map<Integer, Integer> freq = new LinkedHashMap<>();\n    text.codePoints().forEach(cp -> freq.merge(cp, 1, Integer::sum));\n    return freq;\n}",
          js: "function countChar(text, target) {\n  if ([...target].length !== 1) throw new Error(\"target phải có đúng một ký tự\");\n  let count = 0;\n  for (const ch of text) if (ch === target) count++;\n  return count;\n}\n\nfunction frequency(text) {\n  const map = new Map();\n  for (const ch of text) map.set(ch, (map.get(ch) || 0) + 1);\n  return map;\n}",
          alt: {
            title: "Cách khác — mảng đếm cho ASCII",
            complexity: "O(n) thời gian · O(1) bộ nhớ cố định",
            note: "Nhanh hơn Map khi đề đảm bảo ASCII; không dùng được cho Unicode tổng quát.",
            java: "int[] asciiFrequency(String text) {\n    int[] count = new int[128];\n    for (int i = 0; i < text.length(); i++) {\n        char c = text.charAt(i);\n        if (c >= 128) throw new IllegalArgumentException(\"Không phải ASCII\");\n        count[c]++;\n    }\n    return count;\n}"
          }
        },
        {
          name: "Tìm mọi cặp giá trị phân biệt có tổng bằng K",
          diff: "Trung bình",
          tags: "array hashset two-pointers pair-sum",
          examples: [
            { input: "nums = [1,4,5,7,-1,5], k = 6", output: "[[-1,7],[1,5]]", note: "Cặp [1,5] chỉ xuất hiện một lần dù số 5 lặp." },
            { input: "nums = [3,3,3], k = 6", output: "[[3,3]]", note: "Phải có ít nhất hai lần xuất hiện của 3 mới tạo được cặp." }
          ],
          complexity: "O(n) thời gian trung bình · O(n) bộ nhớ",
          idea: "Một Set lưu giá trị đã gặp, Set thứ hai lưu khóa chuẩn hóa của cặp để kết quả không bị lặp.",
          steps: ["Với mỗi x, tính y = k - x.", "Nếu y đã xuất hiện, chuẩn hóa cặp thành (min,max).", "Mã hóa cặp vào khóa long và chỉ thêm khi khóa chưa tồn tại.", "Thêm x vào seen sau khi kiểm tra."],
          trap: "Khác Two Sum: bài này cần mọi cặp giá trị và không được in trùng. Chỉ dùng seen sẽ in [1,5] nhiều lần khi đầu vào có số lặp.",
          java: "List<int[]> allUniquePairs(int[] nums, int k) {\n    Set<Integer> seen = new HashSet<>();\n    Set<Long> emitted = new HashSet<>();\n    List<int[]> result = new ArrayList<>();\n    for (int x : nums) {\n        int y = k - x;\n        if (seen.contains(y)) {\n            int a = Math.min(x, y), b = Math.max(x, y);\n            long key = ((long) a << 32) ^ (b & 0xffffffffL);\n            if (emitted.add(key)) result.add(new int[]{a, b});\n        }\n        seen.add(x);\n    }\n    result.sort(Comparator.comparingInt((int[] p) -> p[0]).thenComparingInt(p -> p[1]));\n    return result;\n}",
          js: "function allUniquePairs(nums, k) {\n  const seen = new Set(), emitted = new Set(), result = [];\n  for (const x of nums) {\n    const y = k - x;\n    if (seen.has(y)) {\n      const pair = [Math.min(x, y), Math.max(x, y)];\n      const key = pair.join(\":\");\n      if (!emitted.has(key)) { emitted.add(key); result.push(pair); }\n    }\n    seen.add(x);\n  }\n  return result.sort((a, b) => a[0] - b[0] || a[1] - b[1]);\n}",
          alt: {
            title: "Cách khác — sắp xếp và hai con trỏ",
            complexity: "O(n log n) thời gian · O(1) bộ nhớ phụ nếu được sửa mảng",
            note: "Sau khi thấy một cặp, tăng/giảm con trỏ qua toàn bộ giá trị trùng để không sinh lại cặp đó.",
            java: "List<int[]> allPairsSorted(int[] nums, int k) {\n    Arrays.sort(nums);\n    List<int[]> out = new ArrayList<>();\n    int l = 0, r = nums.length - 1;\n    while (l < r) {\n        long sum = (long) nums[l] + nums[r];\n        if (sum == k) {\n            int a = nums[l], b = nums[r];\n            out.add(new int[]{a, b});\n            while (l < r && nums[l] == a) l++;\n            while (l < r && nums[r] == b) r--;\n        } else if (sum < k) l++;\n        else r--;\n    }\n    return out;\n}"
          }
        },
        {
          name: "Xóa ký tự trùng nhưng giữ lần xuất hiện đầu tiên",
          diff: "Dễ",
          tags: "string linkedhashset unicode deduplicate",
          examples: [
            { input: "s = \"banana\"", output: "\"ban\"", note: "Giữ b, a, n theo đúng thứ tự gặp đầu tiên." },
            { input: "s = \"😀a😀b\"", output: "\"😀ab\"", note: "Xử lý emoji như một code point, không làm vỡ surrogate pair." }
          ],
          complexity: "O(n) thời gian · O(k) bộ nhớ",
          idea: "Set quyết định ký tự đã gặp chưa; StringBuilder ghi ký tự lần đầu. Duyệt code point để hỗ trợ Unicode đúng.",
          steps: ["Tạo HashSet<Integer> seen và StringBuilder.", "Duyệt từng code point.", "Nếu seen.add(cp) trả true thì appendCodePoint(cp).", "Trả chuỗi kết quả."],
          trap: "HashSet<Integer> dùng để kiểm tra là đủ vì thứ tự kết quả do StringBuilder giữ. Nối chuỗi bằng += trong vòng lặp làm thời gian thành O(n²).",
          java: "String removeDuplicateChars(String s) {\n    Set<Integer> seen = new HashSet<>();\n    StringBuilder out = new StringBuilder();\n    s.codePoints().forEach(cp -> {\n        if (seen.add(cp)) out.appendCodePoint(cp);\n    });\n    return out.toString();\n}",
          js: "function removeDuplicateChars(s) {\n  return [...new Set([...s])].join(\"\");\n}",
          alt: {
            title: "Cách khác — mảng boolean khi chỉ có chữ cái thường",
            complexity: "O(n) thời gian · O(1) bộ nhớ",
            note: "Miền ký tự hẹp cho phép thay Set bằng 26 ô, nhanh và dễ trace trong phỏng vấn.",
            java: "String removeLowercaseDuplicates(String s) {\n    boolean[] seen = new boolean[26];\n    StringBuilder out = new StringBuilder();\n    for (char c : s.toCharArray()) {\n        if (c < 'a' || c > 'z') throw new IllegalArgumentException();\n        if (!seen[c - 'a']) { seen[c - 'a'] = true; out.append(c); }\n    }\n    return out.toString();\n}"
          }
        },
        {
          name: "Java Stream cơ bản — filter, map, distinct và reduce",
          diff: "Dễ",
          tags: "java stream filter map distinct reduce",
          examples: [
            { input: "numbers = [1,2,2,3,4]", output: "evenSquares = [4,16], sum = 20", note: "Lọc chẵn, bình phương, loại trùng rồi cộng." },
            { input: "numbers = []", output: "[] và 0", note: "reduce có identity 0 nên danh sách rỗng trả 0, không cần Optional." }
          ],
          complexity: "O(n) thời gian trung bình · O(k) bộ nhớ cho distinct",
          idea: "Đặt các bước theo đúng thứ tự nghiệp vụ: filter trước để giảm dữ liệu, map để biến đổi, distinct để loại trùng, collect/reduce để kết thúc stream.",
          steps: ["Tạo stream từ collection.", "filter số chẵn.", "map n thành n*n.", "distinct sau phép biến đổi.", "collect danh sách hoặc mapToInt(...).sum()."],
          trap: "Stream chỉ chạy khi có terminal operation. Không tái sử dụng một Stream đã kết thúc. distinct dựa vào equals/hashCode và thứ tự các bước có thể thay đổi kết quả.",
          java: "List<Integer> evenSquaresDistinct(List<Integer> numbers) {\n    return numbers.stream()\n        .filter(n -> n % 2 == 0)\n        .map(n -> n * n)\n        .distinct()\n        .collect(Collectors.toList());\n}\n\nint sumEvenSquaresDistinct(List<Integer> numbers) {\n    return numbers.stream()\n        .filter(n -> n % 2 == 0)\n        .map(n -> n * n)\n        .distinct()\n        .mapToInt(Integer::intValue)\n        .sum();\n}",
          js: "function evenSquaresDistinct(numbers) {\n  return [...new Set(numbers.filter(n => n % 2 === 0).map(n => n * n))];\n}\n\nfunction sumEvenSquaresDistinct(numbers) {\n  return evenSquaresDistinct(numbers).reduce((sum, n) => sum + n, 0);\n}",
          alt: {
            title: "Cách khác — vòng lặp thuần dễ debug",
            complexity: "O(n) thời gian · O(k) bộ nhớ",
            note: "Vòng lặp thường nhanh hơn và phù hợp khi có nhiều nhánh điều kiện hoặc cần log từng bước.",
            java: "List<Integer> evenSquaresLoop(List<Integer> numbers) {\n    Set<Integer> unique = new LinkedHashSet<>();\n    for (int n : numbers) {\n        if (n % 2 == 0) unique.add(n * n);\n    }\n    return new ArrayList<>(unique);\n}"
          }
        },
        {
          name: "Hình học cơ bản — tròn, chữ nhật và tam giác hợp lệ",
          diff: "Dễ",
          tags: "math geometry validation heron co-ban",
          examples: [
            { input: "circle radius = 2", output: "area ≈ 12.5664, perimeter ≈ 12.5664", note: "Dùng Math.PI, không tự ghi 3.14." },
            { input: "triangle sides = [3,4,5]", output: "area = 6, perimeter = 12", note: "Ba cạnh hợp lệ và công thức Heron cho diện tích 6." }
          ],
          complexity: "O(1) thời gian · O(1) bộ nhớ",
          idea: "Công thức đơn giản nhưng phần được chấm là validation: kích thước phải dương và ba cạnh phải thỏa bất đẳng thức tam giác.",
          steps: ["Kiểm tra mọi kích thước > 0.", "Hình tròn: S = πr², C = 2πr.", "Chữ nhật: S = width×height, C = 2(width+height).", "Tam giác: kiểm tra a+b>c, a+c>b, b+c>a.", "Tính nửa chu vi p rồi áp dụng Heron."],
          trap: "Nếu ba cạnh không tạo thành tam giác, biểu thức dưới căn có thể âm và trả NaN. Với double nên so sánh kết quả theo sai số epsilon.",
          java: "record Metrics(double area, double perimeter) {}\n\nMetrics circle(double r) {\n    requirePositive(r);\n    return new Metrics(Math.PI * r * r, 2 * Math.PI * r);\n}\n\nMetrics rectangle(double w, double h) {\n    requirePositive(w); requirePositive(h);\n    return new Metrics(w * h, 2 * (w + h));\n}\n\nMetrics triangle(double a, double b, double c) {\n    requirePositive(a); requirePositive(b); requirePositive(c);\n    if (a + b <= c || a + c <= b || b + c <= a)\n        throw new IllegalArgumentException(\"Ba cạnh không tạo thành tam giác\");\n    double p = (a + b + c) / 2.0;\n    return new Metrics(Math.sqrt(p * (p - a) * (p - b) * (p - c)), a + b + c);\n}\n\nvoid requirePositive(double x) {\n    if (!Double.isFinite(x) || x <= 0) throw new IllegalArgumentException();\n}",
          js: "function triangle(a, b, c) {\n  if (![a, b, c].every(x => Number.isFinite(x) && x > 0)) throw new Error(\"Cạnh không hợp lệ\");\n  if (a + b <= c || a + c <= b || b + c <= a) throw new Error(\"Không tạo thành tam giác\");\n  const p = (a + b + c) / 2;\n  return { area: Math.sqrt(p * (p - a) * (p - b) * (p - c)), perimeter: a + b + c };\n}",
          alt: {
            title: "Cách khác — diện tích tam giác từ ba tọa độ",
            complexity: "O(1)",
            note: "Khi đề cho tọa độ thay vì độ dài cạnh, dùng định thức; trị tuyệt đối bằng 0 nghĩa là ba điểm thẳng hàng.",
            java: "double triangleAreaByPoints(double x1, double y1,\n                            double x2, double y2,\n                            double x3, double y3) {\n    return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0;\n}"
          }
        }
      ]
    },
    {
      group: "Hay gặp nhất — Bài cơ bản cùng dạng",
      items: [
        {
          name: "Phần tử xuất hiện nhiều nhất với quy tắc hòa",
          diff: "Dễ",
          tags: "array hashmap frequency tie-break",
          examples: [
            { input: "nums = [3,1,2,2,3,3,4,2]", output: "2", note: "2 và 3 cùng xuất hiện 3 lần; quy ước chọn giá trị nhỏ hơn nên trả 2." },
            { input: "nums = [-1,-1,0]", output: "-1", note: "Khởi tạo từ phần tử thật, không khởi tạo bằng 0." }
          ],
          complexity: "O(n) thời gian trung bình · O(k) bộ nhớ",
          idea: "Đếm bằng HashMap rồi áp dụng quy tắc hòa tường minh. Nếu đề không nêu tie-break, phải hỏi người phỏng vấn.",
          steps: ["Chặn mảng rỗng.", "Đếm tần suất bằng merge.", "Duyệt entrySet để tìm count lớn nhất.", "Nếu bằng count, chọn theo quy tắc đề: nhỏ hơn hoặc xuất hiện trước."],
          trap: "Code sắp xếp trong tài liệu không nói xử lý khi nhiều giá trị cùng tần suất. Kết quả phụ thuộc thứ tự nếu không định nghĩa tie-break.",
          java: "int mostFrequentSmallest(int[] nums) {\n    if (nums.length == 0) throw new IllegalArgumentException(\"Mảng rỗng\");\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int x : nums) freq.merge(x, 1, Integer::sum);\n    int bestValue = nums[0], bestCount = 0;\n    for (Map.Entry<Integer, Integer> e : freq.entrySet()) {\n        int value = e.getKey(), count = e.getValue();\n        if (count > bestCount || count == bestCount && value < bestValue) {\n            bestValue = value; bestCount = count;\n        }\n    }\n    return bestValue;\n}",
          js: "function mostFrequentSmallest(nums) {\n  if (!nums.length) throw new Error(\"Mảng rỗng\");\n  const freq = new Map();\n  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);\n  let bestValue = nums[0], bestCount = 0;\n  for (const [value, count] of freq) {\n    if (count > bestCount || count === bestCount && value < bestValue) {\n      bestValue = value; bestCount = count;\n    }\n  }\n  return bestValue;\n}",
          alt: {
            title: "Cách khác — sắp xếp rồi đếm đoạn liên tiếp",
            complexity: "O(n log n) thời gian · O(1) bộ nhớ phụ",
            note: "Không cần HashMap nhưng làm thay đổi mảng; thứ tự tăng dần tự nhiên hỗ trợ quy tắc chọn giá trị nhỏ nhất khi hòa.",
            java: "int mostFrequentSorted(int[] nums) {\n    Arrays.sort(nums);\n    int best = nums[0], bestCount = 1, count = 1;\n    for (int i = 1; i < nums.length; i++) {\n        count = nums[i] == nums[i - 1] ? count + 1 : 1;\n        if (count > bestCount) { bestCount = count; best = nums[i]; }\n    }\n    return best;\n}"
          }
        },
        {
          name: "Thống kê mảng — tổng, trung bình và trung vị",
          diff: "Trung bình",
          tags: "array statistics sorting median overflow",
          examples: [
            { input: "nums = [1,2,10,3]", output: "sum = 16, average = 4.0, median = 2.5", note: "Mảng chẵn lấy trung bình hai phần tử giữa sau sắp xếp." },
            { input: "nums = [-5]", output: "sum = -5, average = -5.0, median = -5.0", note: "Một phần tử là ca hợp lệ." }
          ],
          complexity: "Tổng/trung bình O(n) · Trung vị O(n log n) do sắp xếp bản sao",
          idea: "Dùng long cho tổng để giảm nguy cơ tràn. Median yêu cầu thứ tự nên phải sắp xếp hoặc dùng Quickselect.",
          steps: ["Chặn mảng rỗng.", "Cộng vào long sum.", "average = sum / (double)n.", "Sao chép rồi sắp xếp để không sửa đầu vào.", "n lẻ lấy giữa; n chẵn lấy trung bình hai phần tử giữa bằng long/double để tránh tràn."],
          trap: "Viết (a+b)/2 có thể vừa chia nguyên vừa tràn int. Dùng ((long)a+b)/2.0. Không nên sắp xếp trực tiếp nếu hàm không được phép thay đổi input.",
          java: "record Stats(long sum, double average, double median) {}\n\nStats stats(int[] nums) {\n    if (nums.length == 0) throw new IllegalArgumentException(\"Mảng rỗng\");\n    long sum = 0;\n    for (int x : nums) sum += x;\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int n = sorted.length;\n    double median = n % 2 == 1\n        ? sorted[n / 2]\n        : ((long) sorted[n / 2 - 1] + sorted[n / 2]) / 2.0;\n    return new Stats(sum, sum / (double) n, median);\n}",
          js: "function stats(nums) {\n  if (!nums.length) throw new Error(\"Mảng rỗng\");\n  const sum = nums.reduce((a, b) => a + b, 0);\n  const sorted = [...nums].sort((a, b) => a - b);\n  const n = sorted.length;\n  const median = n % 2 ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;\n  return { sum, average: sum / n, median };\n}",
          alt: {
            title: "Cách khác — Quickselect cho trung vị",
            complexity: "O(n) trung bình · O(n²) xấu nhất",
            note: "Quickselect chỉ sắp xếp đủ để tìm phần tử thứ k, phù hợp khi mảng lớn và chỉ cần median.",
            java: "double medianQuickselect(int[] nums) {\n    int[] a = nums.clone();\n    int n = a.length;\n    int right = quickselect(a, n / 2);\n    if (n % 2 == 1) return right;\n    int left = quickselect(a, n / 2 - 1);\n    return ((long) left + right) / 2.0;\n}\n// quickselect(a, k): partition lặp tới khi pivot nằm tại k."
          }
        },
        {
          name: "Ma trận cơ bản — chuyển vị và tổng hai đường chéo",
          diff: "Dễ",
          tags: "matrix transpose diagonal nested-loop",
          examples: [
            { input: "matrix = [[1,2,3],[4,5,6]]", output: "transpose = [[1,4],[2,5],[3,6]]", note: "Ma trận 2×3 trở thành 3×2." },
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "diagonalSum = 25", note: "Hai đường chéo có tổng 1+5+9+3+5+7, trừ 5 vì tâm bị cộng hai lần." }
          ],
          complexity: "Chuyển vị O(m×n) · Tổng đường chéo O(n)",
          idea: "Chuyển vị đổi phần tử [r][c] thành [c][r]. Với ma trận vuông, hai đường chéo ở cột i và n-1-i.",
          steps: ["Kiểm tra ma trận không rỗng và mọi hàng cùng độ dài.", "Tạo kết quả kích thước cols×rows.", "Gán result[c][r] = matrix[r][c].", "Tổng đường chéo: cộng a[i][i] và a[i][n-1-i].", "Nếu n lẻ, trừ phần tử tâm một lần."],
          trap: "Không thể chuyển vị tại chỗ ma trận chữ nhật. Với đường chéo, phần tử giữa của ma trận lẻ bị cộng hai lần nếu không trừ lại.",
          java: "int[][] transpose(int[][] a) {\n    int rows = a.length, cols = a[0].length;\n    int[][] out = new int[cols][rows];\n    for (int r = 0; r < rows; r++)\n        for (int c = 0; c < cols; c++) out[c][r] = a[r][c];\n    return out;\n}\n\nlong diagonalSum(int[][] a) {\n    int n = a.length;\n    long sum = 0;\n    for (int i = 0; i < n; i++) sum += a[i][i] + a[i][n - 1 - i];\n    if (n % 2 == 1) sum -= a[n / 2][n / 2];\n    return sum;\n}",
          js: "function transpose(a) {\n  return Array.from({ length: a[0].length }, (_, c) => a.map(row => row[c]));\n}\n\nfunction diagonalSum(a) {\n  const n = a.length;\n  let sum = 0;\n  for (let i = 0; i < n; i++) sum += a[i][i] + a[i][n - 1 - i];\n  if (n % 2) sum -= a[Math.floor(n / 2)][Math.floor(n / 2)];\n  return sum;\n}",
          alt: {
            title: "Cách khác — chuyển vị tại chỗ rồi đảo hàng để xoay 90 độ",
            complexity: "O(n²) thời gian · O(1) bộ nhớ cho ma trận vuông",
            note: "Đây là biến thể phỏng vấn phổ biến: transpose qua đường chéo chính, sau đó đảo từng hàng.",
            java: "void rotate90(int[][] a) {\n    int n = a.length;\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++) {\n            int t = a[i][j]; a[i][j] = a[j][i]; a[j][i] = t;\n        }\n    for (int[] row : a) {\n        for (int l = 0, r = n - 1; l < r; l++, r--) {\n            int t = row[l]; row[l] = row[r]; row[r] = t;\n        }\n    }\n}"
          }
        },
        {
          name: "Xử lý từ trong câu — đếm, tìm từ dài nhất và chuẩn hóa",
          diff: "Trung bình",
          tags: "string regex hashmap words normalization",
          examples: [
            { input: "\"Java, java Spring!\"", output: "frequency = {java=2, spring=1}, longest = \"spring\"", note: "Đưa về chữ thường và bỏ dấu câu trước khi đếm." },
            { input: "\"  xin   chào  \"", output: "2 từ, longest = \"chào\"", note: "Nhiều khoảng trắng không tạo ra từ rỗng." }
          ],
          complexity: "O(n) thời gian · O(k) bộ nhớ",
          idea: "Chuẩn hóa một lần rồi tái sử dụng danh sách từ cho nhiều yêu cầu: đếm, tần suất, từ dài nhất hoặc đảo thứ tự.",
          steps: ["trim và đưa về chữ thường theo Locale.ROOT.", "Tách bằng regex không phải chữ/số.", "Bỏ token rỗng.", "Đếm bằng LinkedHashMap để giữ thứ tự đầu.", "Tìm từ dài nhất; nếu hòa thì giữ từ xuất hiện trước."],
          trap: "toLowerCase() không truyền Locale có thể cho kết quả khác theo máy. split(\" \") không xử lý tab, nhiều khoảng trắng hoặc dấu câu.",
          java: "record WordInfo(int count, String longest, Map<String, Integer> frequency) {}\n\nWordInfo analyzeWords(String text) {\n    String cleaned = text.toLowerCase(Locale.ROOT).trim();\n    if (cleaned.isEmpty()) return new WordInfo(0, \"\", Map.of());\n    String[] raw = cleaned.split(\"[^\\\\p{L}\\\\p{N}]+\");\n    Map<String, Integer> freq = new LinkedHashMap<>();\n    String longest = \"\";\n    int count = 0;\n    for (String word : raw) {\n        if (word.isEmpty()) continue;\n        count++;\n        freq.merge(word, 1, Integer::sum);\n        if (word.codePointCount(0, word.length()) > longest.codePointCount(0, longest.length())) longest = word;\n    }\n    return new WordInfo(count, longest, freq);\n}",
          js: "function analyzeWords(text) {\n  const words = text.toLocaleLowerCase().match(/[\\p{L}\\p{N}]+/gu) || [];\n  const frequency = new Map();\n  let longest = \"\";\n  for (const word of words) {\n    frequency.set(word, (frequency.get(word) || 0) + 1);\n    if ([...word].length > [...longest].length) longest = word;\n  }\n  return { count: words.length, longest, frequency };\n}",
          alt: {
            title: "Cách khác — Stream với groupingBy và max",
            complexity: "O(n) thời gian · O(k) bộ nhớ",
            note: "Stream ngắn hơn nhưng cần tách riêng hai terminal operation hoặc thu danh sách trước vì Stream không tái sử dụng được.",
            java: "List<String> words = Pattern.compile(\"[^\\\\p{L}\\\\p{N}]+\")\n    .splitAsStream(text.toLowerCase(Locale.ROOT))\n    .filter(w -> !w.isBlank())\n    .collect(Collectors.toList());\n\nMap<String, Long> freq = words.stream().collect(\n    Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));\nString longest = words.stream().max(\n    Comparator.comparingInt(w -> w.codePointCount(0, w.length()))).orElse(\"\");"
          }
        }
      ]
    }
  ];

  if (typeof window !== "undefined" && Array.isArray(window.ALGO_DATA)) {
    window.ALGO_DATA.push.apply(window.ALGO_DATA, groups);
  }
})();
