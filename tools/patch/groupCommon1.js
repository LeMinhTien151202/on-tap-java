// Nhóm bài toán THÔNG DỤNG hay gặp khi phỏng vấn — phần 1: Chuỗi & Số, Mảng & Ma trận.
module.exports = [

{
  group: "Hay gặp nhất — Chuỗi & Số",
  items: [

  {
    name: "Đảo ngược chuỗi (reverse string)",
    diff: "Dễ", tags: "string two-pointer co-ban",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n) với char[], O(1) nếu sửa tại chỗ",
    idea: "Câu mở màn kinh điển. Đổi chỗ ký tự đầu với ký tự cuối, rồi tiến dần vào giữa. Người phỏng vấn thường cấm dùng StringBuilder.reverse() để xem bạn có tự viết được vòng lặp hai con trỏ không.",
    steps: [
      "Đổi chuỗi thành mảng ký tự (String trong Java là bất biến, không sửa trực tiếp được).",
      "Đặt left = 0, right = n - 1.",
      "Khi left < right: hoán đổi arr[left] và arr[right], rồi left++, right--.",
      "Dựng lại String từ mảng ký tự."
    ],
    trap: "String trong Java BẤT BIẾN — không thể gán s.charAt(i) = x. Với chuỗi có emoji hoặc ký tự ngoài BMP (surrogate pair), đảo theo char sẽ làm HỎNG ký tự; lúc đó phải dùng codePoints. Nối chuỗi bằng s = c + s trong vòng lặp là O(n²).",
    alt: {
      title: "Cách khác — StringBuilder.reverse() và bản đệ quy",
      complexity: "O(n) cả hai; bản đệ quy tốn O(n) ngăn xếp",
      note: "StringBuilder.reverse() là cách dùng trong sản phẩm thật (nó còn xử lý đúng surrogate pair). Bản đệ quy hay bị hỏi thêm để kiểm tra tư duy chia nhỏ bài toán.",
      java: `String reverseBuiltin(String s) {
    return new StringBuilder(s).reverse().toString();
}

String reverseRecursive(String s) {
    if (s == null || s.length() <= 1) return s;
    return reverseRecursive(s.substring(1)) + s.charAt(0);   // O(n^2), chỉ để minh họa
}`
    },
    java: `String reverse(String s) {
    char[] arr = s.toCharArray();
    int left = 0, right = arr.length - 1;
    while (left < right) {
        char tmp = arr[left];
        arr[left++] = arr[right];
        arr[right--] = tmp;
    }
    return new String(arr);
}`,
    js: `function reverse(s) {
  const arr = [...s];
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
  return arr.join("");
}`
  },

  {
    name: "Kiểm tra chuỗi đối xứng (palindrome)",
    diff: "Dễ", tags: "string two-pointer co-ban",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1)",
    idea: "So sánh ký tự từ hai đầu tiến vào giữa. Không cần đảo chuỗi rồi so sánh — cách đó tốn thêm O(n) bộ nhớ mà chẳng nhanh hơn.",
    steps: [
      "left = 0, right = n - 1.",
      "Khi left < right: nếu s[left] != s[right] → trả về false.",
      "Ngược lại left++, right--.",
      "Ra khỏi vòng lặp mà không lệch → true."
    ],
    trap: "Chuỗi rỗng và chuỗi 1 ký tự đều LÀ palindrome. Nếu đề nói 'bỏ qua hoa thường và dấu câu' thì phải chuẩn hóa trước hoặc bỏ qua ngay trong vòng lặp — đây là điểm hay bị trừ.",
    alt: {
      title: "Cách khác — kiểm tra SỐ có đối xứng không, không đổi sang chuỗi (LC 9)",
      complexity: "O(số chữ số) thời gian · O(1) bộ nhớ",
      note: "Chỉ đảo NỬA SAU của số rồi so sánh với nửa đầu, nhờ vậy không bao giờ bị tràn int. Số âm luôn không đối xứng vì có dấu trừ ở đầu.",
      java: `boolean isPalindromeNumber(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;   // số âm, hoặc kết thúc bằng 0
    int reversedHalf = 0;
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + x % 10;
        x /= 10;
    }
    return x == reversedHalf || x == reversedHalf / 10;   // độ dài chẵn hoặc lẻ
}`
    },
    java: `boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left++) != s.charAt(right--)) return false;
    }
    return true;
}`,
    js: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left++] !== s[right--]) return false;
  }
  return true;
}`
  },

  {
    name: "Ký tự không lặp đầu tiên & đếm tần suất",
    lc: 387, slug: "first-unique-character-in-a-string",
    diff: "Dễ", tags: "string hashmap dem-tan-suat",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1) vì bảng chữ cái cố định",
    idea: "Duyệt HAI lượt: lượt đầu đếm tần suất, lượt sau tìm ký tự đầu tiên có tần suất bằng 1. Mọi bài 'đếm ký tự / từ xuất hiện bao nhiêu lần' đều dùng chung khuôn này.",
    steps: [
      "Tạo mảng đếm int[26] (hoặc HashMap nếu có Unicode).",
      "Lượt 1: tăng count[c - 'a'] cho từng ký tự.",
      "Lượt 2: duyệt lại chuỗi theo thứ tự gốc, gặp ký tự có count == 1 thì trả về chỉ số.",
      "Không có → trả về -1."
    ],
    trap: "Không được duyệt map để tìm — HashMap KHÔNG giữ thứ tự nên sẽ ra sai ký tự 'đầu tiên'. Phải duyệt lại CHUỖI GỐC, hoặc dùng LinkedHashMap.",
    alt: {
      title: "Cách khác — Stream API gom tần suất (LinkedHashMap giữ thứ tự)",
      complexity: "O(n) nhưng hằng số lớn hơn nhiều",
      note: "Ngắn và hay dùng khi làm việc thật với văn bản. Bắt buộc chỉ định LinkedHashMap::new, vì groupingBy mặc định trả HashMap và sẽ mất thứ tự xuất hiện.",
      java: `Character firstUniqueStream(String s) {
    Map<Character, Long> freq = s.chars()
        .mapToObj(c -> (char) c)
        .collect(Collectors.groupingBy(
            Function.identity(),
            LinkedHashMap::new,          // BẮT BUỘC để giữ thứ tự
            Collectors.counting()));

    return freq.entrySet().stream()
        .filter(e -> e.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst()
        .orElse(null);
}`
    },
    java: `int firstUniqChar(String s) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;

    for (int i = 0; i < s.length(); i++) {
        if (count[s.charAt(i) - 'a'] == 1) return i;
    }
    return -1;
}`,
    js: `function firstUniqChar(s) {
  const count = new Map();
  for (const c of s) count.set(c, (count.get(c) || 0) + 1);

  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}`
  },

  {
    name: "Nén chuỗi (aaabbc → a3b2c1)",
    lc: 443, slug: "string-compression",
    diff: "Dễ", tags: "string dem-tan-suat stringbuilder",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n) cho chuỗi kết quả",
    idea: "Duyệt một lượt, đếm số lần lặp liên tiếp của ký tự hiện tại, khi đổi ký tự thì ghi 'ký tự + số lần' vào StringBuilder. Đây là bài kiểm tra xem bạn có nối chuỗi đúng cách không.",
    steps: [
      "Duyệt i từ 0.",
      "Đặt j = i, tăng j khi s[j] còn bằng s[i].",
      "Ghi s[i] và (j - i) vào StringBuilder.",
      "Gán i = j và lặp tiếp.",
      "Nếu đề yêu cầu: chỉ trả kết quả nén khi nó NGẮN HƠN chuỗi gốc."
    ],
    trap: "Nối bằng result += c trong vòng lặp là O(n²) vì mỗi lần tạo String mới — luôn dùng StringBuilder. Bẫy thứ hai: số đếm từ 10 trở lên chiếm NHIỀU ký tự, nên bản LC 443 sửa tại chỗ phải ghi từng chữ số một.",
    alt: {
      title: "Cách khác — nén TẠI CHỖ trên char[] (bản LC 443, O(1) bộ nhớ)",
      complexity: "O(n) thời gian · O(1) bộ nhớ phụ",
      note: "Dùng con trỏ ghi write luôn chạy sau con trỏ đọc read nên không bao giờ ghi đè dữ liệu chưa đọc. Số đếm phải tách thành từng chữ số rồi ghi lần lượt.",
      java: `int compressInPlace(char[] chars) {
    int write = 0, read = 0;
    while (read < chars.length) {
        char cur = chars[read];
        int count = 0;
        while (read < chars.length && chars[read] == cur) { read++; count++; }

        chars[write++] = cur;
        if (count > 1) {
            for (char digit : String.valueOf(count).toCharArray()) {
                chars[write++] = digit;      // số >= 10 chiếm nhiều ô
            }
        }
    }
    return write;   // độ dài mới
}`
    },
    java: `String compress(String s) {
    if (s == null || s.isEmpty()) return s;
    StringBuilder sb = new StringBuilder();

    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
        sb.append(s.charAt(i)).append(j - i);
        i = j;
    }
    return sb.length() < s.length() ? sb.toString() : s;
}`,
    js: `function compress(s) {
  if (!s) return s;
  let out = [], i = 0;
  while (i < s.length) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out.push(s[i], j - i);
    i = j;
  }
  const res = out.join("");
  return res.length < s.length ? res : s;
}`
  },

  {
    name: "Đảo thứ tự các từ trong câu",
    lc: 151, slug: "reverse-words-in-a-string",
    diff: "Trung bình", tags: "string tach-tu",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(n)",
    idea: "\"the sky is blue\" → \"blue is sky the\". Bẫy nằm ở khoảng trắng: có thể thừa ở đầu, cuối, hoặc nhiều dấu cách liền nhau giữa các từ.",
    steps: [
      "Cắt bỏ khoảng trắng thừa hai đầu bằng trim().",
      "Tách bằng biểu thức chính quy \\\\s+ để gộp mọi cụm khoảng trắng.",
      "Duyệt mảng từ cuối về đầu, nối lại bằng một dấu cách."
    ],
    trap: "split(\" \") (một dấu cách) sẽ sinh ra các phần tử RỖNG khi có nhiều dấu cách liên tiếp — phải dùng split(\"\\\\s+\") sau khi trim(). Nhớ phân biệt: bài này đảo THỨ TỰ TỪ, còn LC 557 đảo ký tự TRONG từng từ mà giữ nguyên thứ tự từ.",
    alt: {
      title: "Cách khác — đảo tại chỗ hai lượt (kỹ thuật kinh điển)",
      complexity: "O(n) thời gian · O(n) bộ nhớ ở Java vì String bất biến",
      note: "Đảo TOÀN BỘ chuỗi, rồi đảo lại TỪNG TỪ — hai lần đảo cho ra đúng kết quả. Trong C/C++ cách này chạy O(1) bộ nhớ; người phỏng vấn rất thích nghe ý tưởng này.",
      java: `String reverseWordsTwoPass(String s) {
    char[] a = s.trim().toCharArray();
    reverse(a, 0, a.length - 1);            // lượt 1: đảo cả câu

    int write = 0, i = 0;
    while (i < a.length) {
        while (i < a.length && a[i] == ' ') i++;
        if (i == a.length) break;
        if (write != 0) a[write++] = ' ';
        int start = write;
        while (i < a.length && a[i] != ' ') a[write++] = a[i++];
        reverse(a, start, write - 1);       // lượt 2: đảo lại từng từ
    }
    return new String(a, 0, write);
}

private void reverse(char[] a, int l, int r) {
    while (l < r) { char t = a[l]; a[l++] = a[r]; a[r--] = t; }
}`
    },
    java: `String reverseWords(String s) {
    String[] words = s.trim().split("\\\\s+");   // gộp mọi cụm khoảng trắng
    StringBuilder sb = new StringBuilder();

    for (int i = words.length - 1; i >= 0; i--) {
        sb.append(words[i]);
        if (i > 0) sb.append(' ');
    }
    return sb.toString();
}`,
    js: `function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(" ");
}`
  },

  {
    name: "Số nguyên tố & Sàng Eratosthenes",
    lc: 204, slug: "count-primes",
    diff: "Dễ", tags: "toan-hoc sang-nguyen-to",
    complexity: "Kiểm tra 1 số: O(√n) · Sàng cho 0..n: O(n log log n)",
    idea: "Hai câu hỏi luôn đi cùng nhau: 'kiểm tra n có phải số nguyên tố' và 'liệt kê mọi số nguyên tố nhỏ hơn n'. Câu đầu chỉ cần chia thử tới √n, câu sau phải dùng sàng.",
    steps: [
      "Kiểm tra đơn lẻ: loại n < 2, rồi thử chia từ 2 tới √n.",
      "Sàng: tạo mảng boolean cỡ n, mặc định coi mọi số là nguyên tố.",
      "Với mỗi i từ 2 tới √n, nếu i còn được đánh dấu nguyên tố thì gạch mọi bội của i, BẮT ĐẦU TỪ i*i.",
      "Đếm các ô còn lại."
    ],
    trap: "Chỉ cần chia thử tới √n, không phải tới n/2 — giải thích được vì sao là điểm cộng (ước lớn luôn đi kèm ước nhỏ hơn √n). 1 KHÔNG phải số nguyên tố, 2 là số nguyên tố CHẴN duy nhất. Trong sàng, i*i tràn int khi n lớn — ép sang long hoặc để i chạy tới i <= n/i.",
    alt: {
      title: "Cách khác — chia thử kiểu 6k ± 1",
      complexity: "O(√n) nhưng nhanh hơn khoảng 3 lần",
      note: "Mọi số nguyên tố lớn hơn 3 đều có dạng 6k-1 hoặc 6k+1, nên chỉ cần thử hai nhánh đó thay vì mọi số. Cách này hay dùng khi phải kiểm tra rất nhiều số riêng lẻ mà không dựng sàng.",
      java: `boolean isPrimeFast(int n) {
    if (n < 2) return false;
    if (n < 4) return true;              // 2, 3
    if (n % 2 == 0 || n % 3 == 0) return false;

    for (int i = 5; (long) i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;   // 6k-1 và 6k+1
    }
    return true;
}`
    },
    java: `boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; (long) i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int countPrimes(int n) {
    boolean[] composite = new boolean[n];        // false = còn coi là nguyên tố
    int count = 0;

    for (int i = 2; i < n; i++) {
        if (composite[i]) continue;
        count++;
        for (long j = (long) i * i; j < n; j += i) {   // long để khỏi tràn
            composite[(int) j] = true;
        }
    }
    return count;
}`,
    js: `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function countPrimes(n) {
  const composite = new Array(n).fill(false);
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (composite[i]) continue;
    count++;
    for (let j = i * i; j < n; j += i) composite[j] = true;
  }
  return count;
}`
  },

  {
    name: "Ước chung lớn nhất & bội chung nhỏ nhất (Euclid)",
    diff: "Dễ", tags: "toan-hoc euclid de-quy",
    complexity: "Thời gian: O(log min(a, b)) · Bộ nhớ: O(1) bản lặp",
    idea: "Thuật toán Euclid: UCLN(a, b) = UCLN(b, a mod b), dừng khi b = 0. Từ đó BCNN(a, b) = a / UCLN(a, b) * b. Bài này hay được dùng làm khởi động rồi mở rộng sang rút gọn phân số.",
    steps: [
      "Khi b khác 0: gán tạm t = b, b = a % b, a = t.",
      "Khi b = 0 thì a chính là UCLN.",
      "BCNN: CHIA TRƯỚC rồi mới nhân — a / gcd * b."
    ],
    trap: "Với BCNN, viết a * b / gcd sẽ TRÀN SỐ khi a, b lớn; phải viết a / gcd * b. UCLN(0, n) = n. Nếu có số âm thì lấy trị tuyệt đối trước.",
    alt: {
      title: "Cách khác — Euclid mở rộng (tìm x, y sao cho ax + by = gcd)",
      complexity: "O(log min(a, b))",
      note: "Dùng để tìm NGHỊCH ĐẢO MODULO — nền tảng của RSA và của mọi bài toán chia trong số học modulo. Hay được hỏi nối tiếp trong vòng phỏng vấn thiên về thuật toán.",
      java: `// trả về mảng { gcd, x, y } thỏa a*x + b*y = gcd(a, b)
int[] extendedGcd(int a, int b) {
    if (b == 0) return new int[] { a, 1, 0 };
    int[] r = extendedGcd(b, a % b);
    int gcd = r[0], x = r[2], y = r[1] - (a / b) * r[2];
    return new int[] { gcd, x, y };
}

// nghịch đảo của a theo modulo m (khi gcd(a, m) = 1)
int modInverse(int a, int m) {
    int[] r = extendedGcd(a, m);
    return ((r[1] % m) + m) % m;
}`
    },
    java: `int gcd(int a, int b) {
    while (b != 0) {
        int tmp = b;
        b = a % b;
        a = tmp;
    }
    return Math.abs(a);
}

long lcm(int a, int b) {
    if (a == 0 || b == 0) return 0;
    return (long) (a / gcd(a, b)) * b;   // chia trước để không tràn
}`,
    js: `function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return (a / gcd(a, b)) * b;
}`
  },

  {
    name: "Đảo ngược số nguyên & tổng chữ số (Armstrong)",
    lc: 7, slug: "reverse-integer",
    diff: "Dễ", tags: "toan-hoc tran-so chu-so",
    complexity: "Thời gian: O(số chữ số) · Bộ nhớ: O(1)",
    idea: "Bóc từng chữ số bằng n % 10 rồi n /= 10. Khuôn này dùng chung cho: đảo số, tổng chữ số, đếm chữ số, kiểm tra Armstrong, kiểm tra số hoàn hảo. Điểm mấu chốt của LC 7 là XỬ LÝ TRÀN SỐ.",
    steps: [
      "Lặp khi n khác 0: digit = n % 10; n /= 10.",
      "Đảo số: result = result * 10 + digit.",
      "TRƯỚC khi nhân, kiểm tra result có vượt Integer.MAX_VALUE / 10 không.",
      "Tràn thì trả về 0 theo yêu cầu đề."
    ],
    trap: "Đây là bài bẫy tràn số nổi tiếng: phải kiểm tra TRƯỚC khi nhân, vì sau khi tràn thì giá trị đã sai và không phát hiện được nữa. Chú ý Math.abs(Integer.MIN_VALUE) vẫn là số âm — nên xử lý thẳng trên số âm thay vì đổi dấu.",
    alt: {
      title: "Cách khác — dùng long để bắt tràn, và bộ khuôn chữ số hay dùng",
      complexity: "O(số chữ số)",
      note: "Dễ viết đúng hơn dưới áp lực phỏng vấn: tính bằng long rồi so với khoảng của int ở cuối. Kèm theo là các biến thể tổng chữ số / Armstrong dùng chung một vòng lặp.",
      java: `int reverseWithLong(int x) {
    long result = 0;
    while (x != 0) {
        result = result * 10 + x % 10;
        x /= 10;
        if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) return 0;
    }
    return (int) result;
}

int digitSum(int n) {
    int sum = 0;
    n = Math.abs(n);
    while (n > 0) { sum += n % 10; n /= 10; }
    return sum;
}

// Armstrong: 153 = 1^3 + 5^3 + 3^3
boolean isArmstrong(int n) {
    int digits = String.valueOf(n).length(), sum = 0, tmp = n;
    while (tmp > 0) {
        int d = tmp % 10;
        sum += (int) Math.pow(d, digits);
        tmp /= 10;
    }
    return sum == n;
}`
    },
    java: `int reverse(int x) {
    int result = 0;
    while (x != 0) {
        int digit = x % 10;          // Java giữ dấu: -123 % 10 = -3
        x /= 10;

        // kiểm tra TRƯỚC khi nhân, nếu không sẽ tràn mà không biết
        if (result > Integer.MAX_VALUE / 10) return 0;
        if (result < Integer.MIN_VALUE / 10) return 0;

        result = result * 10 + digit;
    }
    return result;
}`,
    js: `function reverse(x) {
  let result = 0;
  const sign = Math.sign(x);
  let n = Math.abs(x);
  while (n !== 0) {
    result = result * 10 + (n % 10);
    n = Math.trunc(n / 10);
  }
  result *= sign;
  return (result < -(2 ** 31) || result > 2 ** 31 - 1) ? 0 : result;
}`
  },

  {
    name: "Chuyển đổi nhị phân ↔ thập phân (không dùng thư viện)",
    diff: "Dễ", tags: "he-co-so bit chuyen-doi",
    complexity: "Thời gian: O(số bit) · Bộ nhớ: O(số bit)",
    idea: "Thập phân sang nhị phân: chia lấy dư 2 liên tục rồi đọc NGƯỢC các số dư. Nhị phân sang thập phân: quét trái sang phải, result = result * 2 + bit. Người phỏng vấn thường cấm Integer.toBinaryString().",
    steps: [
      "Sang nhị phân: khi n > 0, thêm (n % 2) vào StringBuilder rồi n /= 2; cuối cùng reverse().",
      "Về thập phân: duyệt từng ký tự, result = result * 2 + (c - '0').",
      "Xử lý riêng trường hợp n = 0 → chuỗi \"0\"."
    ],
    trap: "Quên đảo chuỗi ở cuối là lỗi phổ biến nhất (số dư sinh ra theo thứ tự NGƯỢC). Với số âm, biểu diễn bù hai khác hẳn — Integer.toBinaryString(-5) cho 32 bit chứ không phải \"-101\".",
    alt: {
      title: "Cách khác — dịch bit, và các API sẵn có của Java",
      complexity: "O(32) = O(1)",
      note: "Duyệt thẳng 32 bit bằng phép dịch, đúng cho cả số âm vì làm việc trực tiếp trên biểu diễn bù hai. Trong việc thật thì dùng Integer.toBinaryString / Integer.parseInt(s, 2).",
      java: `String toBinaryByShift(int n) {
    if (n == 0) return "0";
    StringBuilder sb = new StringBuilder();
    boolean started = false;
    for (int i = 31; i >= 0; i--) {
        int bit = (n >> i) & 1;
        if (bit == 1) started = true;
        if (started) sb.append(bit);
    }
    return sb.toString();
}

// Thư viện có sẵn:
// Integer.toBinaryString(10)   -> "1010"
// Integer.parseInt("1010", 2)  -> 10
// Integer.toString(255, 16)    -> "ff"`
    },
    java: `String toBinary(int n) {
    if (n == 0) return "0";
    StringBuilder sb = new StringBuilder();
    while (n > 0) {
        sb.append(n % 2);
        n /= 2;
    }
    return sb.reverse().toString();   // số dư sinh ra theo thứ tự NGƯỢC
}

int toDecimal(String binary) {
    int result = 0;
    for (char c : binary.toCharArray()) {
        result = result * 2 + (c - '0');
    }
    return result;
}`,
    js: `function toBinary(n) {
  if (n === 0) return "0";
  let out = "";
  while (n > 0) {
    out = (n % 2) + out;
    n = Math.trunc(n / 2);
  }
  return out;
}

function toDecimal(binary) {
  let result = 0;
  for (const c of binary) result = result * 2 + (c === "1" ? 1 : 0);
  return result;
}`
  }

  ]
},

{
  group: "Hay gặp nhất — Mảng & Ma trận",
  items: [

  {
    name: "Tìm giá trị lớn nhất & lớn thứ nhì trong mảng",
    diff: "Dễ", tags: "array mot-luot co-ban",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1)",
    idea: "Chỉ duyệt MỘT lượt với hai biến max1, max2. Câu hỏi vặn luôn là: 'sắp xếp rồi lấy phần tử áp chót có được không?' — được, nhưng mất O(n log n) trong khi O(n) là đủ.",
    steps: [
      "Khởi tạo max1 = max2 = Integer.MIN_VALUE.",
      "Với mỗi x: nếu x > max1 thì max2 = max1; max1 = x.",
      "Ngược lại nếu x > max2 và x != max1 thì max2 = x.",
      "Nếu max2 vẫn là MIN_VALUE nghĩa là mảng không có phần tử lớn thứ nhì phân biệt."
    ],
    trap: "Phải làm rõ với người phỏng vấn: mảng [5,5,3] thì 'lớn thứ nhì' là 5 hay 3? Nếu đòi giá trị PHÂN BIỆT thì cần điều kiện x != max1. Khởi tạo bằng 0 sẽ sai khi mảng toàn số âm — phải dùng Integer.MIN_VALUE hoặc lấy arr[0].",
    alt: {
      title: "Cách khác — Stream API, và mở rộng cho lớn thứ k",
      complexity: "O(n log n) khi sắp xếp · O(n log k) khi dùng heap",
      note: "Bản Stream ngắn gọn, hợp lúc code sản phẩm. Khi đề đổi thành 'lớn thứ k' thì dùng min-heap giữ đúng k phần tử — cách này chạy tốt cả với luồng dữ liệu không biết trước độ dài.",
      java: `Integer secondLargestStream(int[] arr) {
    return Arrays.stream(arr).distinct().boxed()
        .sorted(Comparator.reverseOrder())
        .skip(1).findFirst().orElse(null);
}

int kthLargest(int[] arr, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int x : arr) {
        minHeap.offer(x);
        if (minHeap.size() > k) minHeap.poll();   // giữ đúng k phần tử lớn nhất
    }
    return minHeap.peek();
}`
    },
    java: `int secondLargest(int[] arr) {
    int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE;

    for (int x : arr) {
        if (x > max1) {
            max2 = max1;
            max1 = x;
        } else if (x > max2 && x != max1) {   // bỏ qua giá trị trùng max1
            max2 = x;
        }
    }
    if (max2 == Integer.MIN_VALUE) throw new IllegalArgumentException("Không có phần tử lớn thứ nhì");
    return max2;
}`,
    js: `function secondLargest(arr) {
  let max1 = -Infinity, max2 = -Infinity;
  for (const x of arr) {
    if (x > max1) { max2 = max1; max1 = x; }
    else if (x > max2 && x !== max1) max2 = x;
  }
  if (max2 === -Infinity) throw new Error("Không có phần tử lớn thứ nhì");
  return max2;
}`
  },

  {
    name: "Xóa phần tử trùng trong mảng đã sắp xếp",
    lc: 26, slug: "remove-duplicates-from-sorted-array",
    diff: "Dễ", tags: "array two-pointer tai-cho",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1)",
    idea: "Hai con trỏ cùng chiều: con trỏ ĐỌC quét cả mảng, con trỏ GHI chỉ tiến khi gặp giá trị mới. Vì mảng đã sắp xếp nên các giá trị trùng luôn nằm liền nhau.",
    steps: [
      "Mảng rỗng → trả về 0.",
      "write = 1 (phần tử đầu chắc chắn được giữ).",
      "Duyệt read từ 1: nếu arr[read] != arr[write - 1] thì arr[write++] = arr[read].",
      "Trả về write — độ dài phần hợp lệ."
    ],
    trap: "Đề chỉ yêu cầu k phần tử ĐẦU đúng, phần đuôi mảng ra sao không quan trọng — nhiều người mất thời gian dọn phần đuôi. Nếu mảng CHƯA sắp xếp thì cách này sai, phải dùng LinkedHashSet.",
    alt: {
      title: "Cách khác — cho phép tối đa 2 lần trùng (LC 80) và bản LinkedHashSet",
      complexity: "O(n) · LinkedHashSet tốn O(n) bộ nhớ",
      note: "Mẹo tổng quát: so sánh với phần tử cách write đúng k vị trí thì cho phép mỗi giá trị lặp k lần. Khi mảng chưa sắp xếp mà vẫn cần giữ thứ tự xuất hiện thì LinkedHashSet là lựa chọn gọn nhất.",
      java: `int removeDuplicatesAllowTwo(int[] nums) {
    int write = 0;
    for (int x : nums) {
        if (write < 2 || x != nums[write - 2]) nums[write++] = x;   // đổi 2 thành k
    }
    return write;
}

// Mảng CHƯA sắp xếp, cần giữ thứ tự xuất hiện:
int[] distinctKeepOrder(int[] nums) {
    Set<Integer> seen = new LinkedHashSet<>();
    for (int x : nums) seen.add(x);
    return seen.stream().mapToInt(Integer::intValue).toArray();
}`
    },
    java: `int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;

    int write = 1;
    for (int read = 1; read < nums.length; read++) {
        if (nums[read] != nums[write - 1]) {
            nums[write++] = nums[read];
        }
    }
    return write;   // độ dài phần không trùng
}`,
    js: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write - 1]) nums[write++] = nums[read];
  }
  return write;
}`
  },

  {
    name: "Xoay ma trận 90 độ tại chỗ",
    lc: 48, slug: "rotate-image",
    diff: "Trung bình", tags: "matrix tai-cho chuyen-vi",
    complexity: "Thời gian: O(n²) · Bộ nhớ: O(1)",
    idea: "Mẹo hai bước ai cũng nên thuộc: CHUYỂN VỊ (lật qua đường chéo chính) rồi ĐẢO từng hàng → được phép xoay 90 độ theo chiều kim đồng hồ. Ngược chiều kim đồng hồ thì chuyển vị rồi đảo từng CỘT.",
    steps: [
      "Chuyển vị: với i < j, hoán đổi m[i][j] với m[j][i].",
      "Vòng lặp trong PHẢI bắt đầu từ j = i + 1, nếu chạy từ 0 sẽ hoán đổi hai lần và trở lại như cũ.",
      "Đảo từng hàng: hai con trỏ từ hai đầu hàng tiến vào giữa."
    ],
    trap: "Bẫy chết người: viết for (j = 0; j < n; j++) khi chuyển vị — mỗi cặp bị đổi chỗ hai lần nên ma trận không đổi. Phải là j = i + 1. Đề yêu cầu sửa TẠI CHỖ nên tạo ma trận mới là trượt.",
    alt: {
      title: "Cách khác — xoay theo từng vòng 4 ô một lượt",
      complexity: "O(n²) thời gian · O(1) bộ nhớ",
      note: "Chỉ một lượt duyệt thay vì hai, quay đúng 4 ô đối xứng bằng một biến tạm. Khó viết đúng chỉ số hơn nhưng thể hiện bạn thực sự hiểu phép xoay chứ không chỉ học thuộc mẹo.",
      java: `void rotateByLayers(int[][] m) {
    int n = m.length;
    for (int layer = 0; layer < n / 2; layer++) {
        int first = layer, last = n - 1 - layer;
        for (int i = first; i < last; i++) {
            int offset = i - first;
            int top = m[first][i];                        // giữ ô trên

            m[first][i]              = m[last - offset][first];   // trái  -> trên
            m[last - offset][first]  = m[last][last - offset];    // dưới  -> trái
            m[last][last - offset]   = m[i][last];                // phải  -> dưới
            m[i][last]               = top;                       // trên  -> phải
        }
    }
}`
    },
    java: `void rotate(int[][] matrix) {
    int n = matrix.length;

    // Bước 1: chuyển vị (lật qua đường chéo chính)
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {      // j = i + 1, KHÔNG phải 0
            int tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }

    // Bước 2: đảo từng hàng
    for (int[] row : matrix) {
        int left = 0, right = n - 1;
        while (left < right) {
            int tmp = row[left];
            row[left++] = row[right];
            row[right--] = tmp;
        }
    }
}`,
    js: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}`
  },

  {
    name: "Duyệt ma trận theo hình xoắn ốc",
    lc: 54, slug: "spiral-matrix",
    diff: "Trung bình", tags: "matrix mo-phong bien",
    complexity: "Thời gian: O(m·n) · Bộ nhớ: O(1) không tính mảng kết quả",
    idea: "Giữ bốn biên top, bottom, left, right rồi bóc dần từng lớp: sang phải → xuống dưới → sang trái → lên trên, sau mỗi cạnh thì thu biên tương ứng vào trong.",
    steps: [
      "Đi sang phải trên hàng top, xong thì top++.",
      "Đi xuống theo cột right, xong thì right--.",
      "NẾU top <= bottom: đi sang trái trên hàng bottom, xong thì bottom--.",
      "NẾU left <= right: đi lên theo cột left, xong thì left++.",
      "Lặp khi top <= bottom và left <= right."
    ],
    trap: "Với ma trận CHỮ NHẬT (một hàng hoặc một cột), nếu không kiểm tra lại điều kiện trước hai cạnh sau thì các ô sẽ bị duyệt HAI LẦN. Đây gần như luôn là ca kiểm thử mà người phỏng vấn đưa ra.",
    alt: {
      title: "Cách khác — đi theo hướng và quay khi chạm biên/ô đã thăm",
      complexity: "O(m·n) thời gian · O(m·n) bộ nhớ cho mảng đánh dấu",
      note: "Ít chỉ số hơn nên khó sai hơn dưới áp lực, và mở rộng thẳng sang bài Spiral Matrix II (điền số theo xoắn ốc). Đổi lại là tốn thêm mảng boolean.",
      java: `List<Integer> spiralOrderByDirection(int[][] m) {
    int rows = m.length, cols = m[0].length;
    boolean[][] seen = new boolean[rows][cols];
    int[][] dirs = { {0, 1}, {1, 0}, {0, -1}, {-1, 0} };   // phải, xuống, trái, lên

    List<Integer> res = new ArrayList<>();
    int r = 0, c = 0, d = 0;
    for (int i = 0; i < rows * cols; i++) {
        res.add(m[r][c]);
        seen[r][c] = true;
        int nr = r + dirs[d][0], nc = c + dirs[d][1];
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || seen[nr][nc]) {
            d = (d + 1) % 4;                     // chạm biên thì quay
            nr = r + dirs[d][0];
            nc = c + dirs[d][1];
        }
        r = nr; c = nc;
    }
    return res;
}`
    },
    java: `List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> res = new ArrayList<>();
    if (matrix.length == 0) return res;

    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.add(matrix[top][c]);
        top++;

        for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
        right--;

        if (top <= bottom) {                       // kiểm tra lại, tránh duyệt trùng
            for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
            left++;
        }
    }
    return res;
}`,
    js: `function spiralOrder(matrix) {
  const res = [];
  if (matrix.length === 0) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`
  },

  {
    name: "Xoay mảng k bước sang phải",
    lc: 189, slug: "rotate-array",
    diff: "Trung bình", tags: "array dao-nguoc tai-cho",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1)",
    idea: "Mẹo BA LẦN ĐẢO: đảo cả mảng, đảo n - k phần tử đầu... thực ra thứ tự chuẩn là đảo toàn bộ, rồi đảo k phần tử đầu, rồi đảo phần còn lại. Kết quả là mảng đã xoay phải k bước mà không tốn bộ nhớ phụ.",
    steps: [
      "Chuẩn hóa k = k % n (k có thể lớn hơn n).",
      "Đảo toàn mảng [0, n-1].",
      "Đảo đoạn [0, k-1].",
      "Đảo đoạn [k, n-1]."
    ],
    trap: "Quên k = k % n sẽ gây lỗi vượt chỉ số khi k >= n. Với k âm (xoay trái) thì chuẩn hóa bằng ((k % n) + n) % n. Đề thường ghi rõ 'in-place, O(1) bộ nhớ' nên bản dùng mảng phụ sẽ không được chấp nhận.",
    alt: {
      title: "Cách khác — mảng phụ (dễ nhất) và hoán vị theo chu trình",
      complexity: "Mảng phụ O(n) bộ nhớ · Chu trình O(1) bộ nhớ",
      note: "Bản mảng phụ chỉ một dòng công thức, nên viết ra trước để chắc đúng. Bản chu trình di chuyển mỗi phần tử ĐÚNG MỘT LẦN — tối ưu nhất nhưng dễ sai khi gcd(n, k) > 1 tạo nhiều vòng.",
      java: `void rotateExtraArray(int[] nums, int k) {
    int n = nums.length;
    int[] tmp = new int[n];
    for (int i = 0; i < n; i++) tmp[(i + k) % n] = nums[i];
    System.arraycopy(tmp, 0, nums, 0, n);
}

void rotateCyclic(int[] nums, int k) {
    int n = nums.length;
    k %= n;
    int moved = 0;
    for (int start = 0; moved < n; start++) {
        int current = start, prev = nums[start];
        do {
            int next = (current + k) % n;
            int tmp = nums[next];
            nums[next] = prev;
            prev = tmp;
            current = next;
            moved++;
        } while (start != current);      // khép kín một vòng
    }
}`
    },
    java: `void rotate(int[] nums, int k) {
    int n = nums.length;
    k %= n;                       // k có thể lớn hơn n
    if (k == 0) return;

    reverse(nums, 0, n - 1);      // đảo toàn bộ
    reverse(nums, 0, k - 1);      // đảo k phần tử đầu
    reverse(nums, k, n - 1);      // đảo phần còn lại
}

private void reverse(int[] a, int l, int r) {
    while (l < r) {
        int tmp = a[l];
        a[l++] = a[r];
        a[r--] = tmp;
    }
}`,
    js: `function rotate(nums, k) {
  const n = nums.length;
  k %= n;
  if (k === 0) return;
  const reverse = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
}`
  },

  {
    name: "Gộp hai mảng đã sắp xếp (merge tại chỗ)",
    lc: 88, slug: "merge-sorted-array",
    diff: "Dễ", tags: "array two-pointer merge",
    complexity: "Thời gian: O(m + n) · Bộ nhớ: O(1)",
    idea: "Mẹo quan trọng: ghi từ CUỐI về ĐẦU. Vì phần đuôi của mảng thứ nhất đang trống, ghi ngược sẽ không bao giờ đè lên phần tử chưa xử lý.",
    steps: [
      "i = m - 1 (cuối phần thật của nums1), j = n - 1, write = m + n - 1.",
      "Khi j >= 0: nếu i >= 0 và nums1[i] > nums2[j] thì nums1[write--] = nums1[i--], ngược lại nums1[write--] = nums2[j--].",
      "Không cần xử lý phần dư của nums1 — nó đã nằm đúng chỗ rồi."
    ],
    trap: "Gộp từ đầu về cuối sẽ ĐÈ MẤT dữ liệu của nums1. Vòng lặp chỉ cần chạy khi j >= 0: nếu nums2 hết trước thì phần còn lại của nums1 vốn đã đúng vị trí.",
    alt: {
      title: "Cách khác — gộp ra mảng mới, và gộp k mảng bằng heap",
      complexity: "O(m + n) · Gộp k mảng: O(N log k)",
      note: "Khi không bị ép sửa tại chỗ thì mảng mới dễ đọc hơn nhiều. Câu hỏi nối tiếp hay gặp là 'gộp k mảng' — lúc đó dùng min-heap chứa con trỏ hiện tại của từng mảng.",
      java: `int[] mergeToNew(int[] a, int[] b) {
    int[] res = new int[a.length + b.length];
    int i = 0, j = 0, w = 0;
    while (i < a.length && j < b.length) {
        res[w++] = (a[i] <= b[j]) ? a[i++] : b[j++];
    }
    while (i < a.length) res[w++] = a[i++];
    while (j < b.length) res[w++] = b[j++];
    return res;
}

// Gộp k mảng: heap chứa { giá trị, chỉ số mảng, vị trí trong mảng }
int[] mergeK(int[][] arrays) {
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(x -> x[0]));
    int total = 0;
    for (int a = 0; a < arrays.length; a++) {
        total += arrays[a].length;
        if (arrays[a].length > 0) pq.add(new int[] { arrays[a][0], a, 0 });
    }
    int[] res = new int[total];
    int w = 0;
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        res[w++] = cur[0];
        int nextPos = cur[2] + 1;
        if (nextPos < arrays[cur[1]].length)
            pq.add(new int[] { arrays[cur[1]][nextPos], cur[1], nextPos });
    }
    return res;
}`
    },
    java: `void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1, j = n - 1, write = m + n - 1;

    while (j >= 0) {                       // nums1 hết thì phần dư đã đúng chỗ
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[write--] = nums1[i--];
        } else {
            nums1[write--] = nums2[j--];
        }
    }
}`,
    js: `function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, write = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];
    else nums1[write--] = nums2[j--];
  }
}`
  },

  {
    name: "Tổng lớn nhất của dãy con k phần tử liên tiếp",
    diff: "Dễ", tags: "sliding-window array cua-so-co-dinh",
    complexity: "Thời gian: O(n) · Bộ nhớ: O(1)",
    idea: "Cửa sổ trượt KÍCH THƯỚC CỐ ĐỊNH — mẫu đơn giản nhất của sliding window. Thay vì cộng lại k phần tử mỗi lần, chỉ cần cộng phần tử mới vào và trừ phần tử vừa rời cửa sổ.",
    steps: [
      "Cộng k phần tử đầu để có tổng cửa sổ ban đầu.",
      "Duyệt i từ k tới n-1: sum += arr[i] - arr[i - k].",
      "Cập nhật max sau mỗi bước trượt."
    ],
    trap: "Phải xử lý k > n. Đừng nhầm với Kadane (dãy con ĐỘ DÀI TÙY Ý) — bài này độ dài CỐ ĐỊNH nên đơn giản hơn nhiều. Khởi tạo max bằng 0 sẽ sai với mảng toàn số âm.",
    alt: {
      title: "Cách khác — mảng tổng tiền tố (prefix sum)",
      complexity: "Dựng O(n) · Mỗi truy vấn O(1)",
      note: "Ưu thế khi phải trả lời NHIỀU truy vấn với các k khác nhau, hoặc 'tổng đoạn từ i đến j' bất kỳ. Dựng một lần rồi mọi truy vấn đều O(1) nhờ prefix[j+1] - prefix[i].",
      java: `int[] buildPrefix(int[] arr) {
    int[] prefix = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] + arr[i];
    return prefix;
}

// tổng đoạn arr[i..j] (đã bao gồm hai đầu)
int rangeSum(int[] prefix, int i, int j) {
    return prefix[j + 1] - prefix[i];
}

int maxSumK(int[] arr, int k) {
    int[] prefix = buildPrefix(arr);
    int best = Integer.MIN_VALUE;
    for (int i = 0; i + k <= arr.length; i++) {
        best = Math.max(best, prefix[i + k] - prefix[i]);
    }
    return best;
}`
    },
    java: `int maxSumSubarrayK(int[] arr, int k) {
    if (arr.length < k) throw new IllegalArgumentException("Mảng ngắn hơn k");

    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int best = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];   // vào một, ra một
        best = Math.max(best, windowSum);
    }
    return best;
}`,
    js: `function maxSumSubarrayK(arr, k) {
  if (arr.length < k) throw new Error("Mảng ngắn hơn k");
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let best = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    best = Math.max(best, windowSum);
  }
  return best;
}`
  },

  {
    name: "Giao & hiệu của hai mảng",
    lc: 350, slug: "intersection-of-two-arrays-ii",
    diff: "Dễ", tags: "hashmap set so-sanh-mang",
    complexity: "Thời gian: O(m + n) · Bộ nhớ: O(min(m, n))",
    idea: "Đếm tần suất mảng NGẮN hơn vào HashMap, rồi quét mảng còn lại: gặp phần tử có số đếm > 0 thì lấy và giảm đếm. Bài này hay được hỏi kèm câu 'nếu mảng quá lớn không nạp hết vào RAM thì sao?'.",
    steps: [
      "Đếm tần suất các phần tử của mảng ngắn hơn.",
      "Duyệt mảng kia: nếu map có phần tử với số đếm > 0 thì thêm vào kết quả và giảm số đếm.",
      "Muốn lấy phần tử PHÂN BIỆT thì dùng Set thay vì Map đếm."
    ],
    trap: "Phân biệt rõ LC 349 (kết quả phân biệt, dùng Set) với LC 350 (giữ số lần lặp, phải dùng Map đếm). Câu hỏi nối tiếp kinh điển: nếu cả hai mảng ĐÃ sắp xếp thì dùng hai con trỏ chỉ tốn O(1) bộ nhớ; nếu mảng lớn không vừa RAM thì sắp xếp ngoài rồi cũng dùng hai con trỏ.",
    alt: {
      title: "Cách khác — hai con trỏ trên mảng đã sắp xếp, và phép hiệu",
      complexity: "O(n log n) do sắp xếp · O(1) bộ nhớ phụ",
      note: "Khi dữ liệu đã sắp xếp sẵn (hoặc quá lớn không vừa bộ nhớ) thì đây là cách duy nhất chạy được. Kèm theo là cách lấy HIỆU hai tập — hay dùng khi so sánh dữ liệu cũ với dữ liệu mới để biết cái gì được thêm, cái gì bị xóa.",
      java: `int[] intersectSorted(int[] a, int[] b) {
    Arrays.sort(a);
    Arrays.sort(b);
    List<Integer> res = new ArrayList<>();
    int i = 0, j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] == b[j]) { res.add(a[i]); i++; j++; }
        else if (a[i] < b[j]) i++;
        else j++;
    }
    return res.stream().mapToInt(Integer::intValue).toArray();
}

// So sánh danh sách cũ / mới: cái gì bị xóa, cái gì được thêm
void diff(List<String> oldList, List<String> newList) {
    Set<String> removed = new HashSet<>(oldList);
    removed.removeAll(newList);
    Set<String> added = new HashSet<>(newList);
    added.removeAll(oldList);
    System.out.println("Bị xóa: " + removed + " | Được thêm: " + added);
}`
    },
    java: `int[] intersect(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) return intersect(nums2, nums1);   // đếm mảng ngắn

    Map<Integer, Integer> count = new HashMap<>();
    for (int x : nums1) count.merge(x, 1, Integer::sum);

    List<Integer> res = new ArrayList<>();
    for (int x : nums2) {
        int remaining = count.getOrDefault(x, 0);
        if (remaining > 0) {
            res.add(x);
            count.put(x, remaining - 1);
        }
    }
    return res.stream().mapToInt(Integer::intValue).toArray();
}`,
    js: `function intersect(nums1, nums2) {
  if (nums1.length > nums2.length) return intersect(nums2, nums1);
  const count = new Map();
  for (const x of nums1) count.set(x, (count.get(x) || 0) + 1);

  const res = [];
  for (const x of nums2) {
    const remaining = count.get(x) || 0;
    if (remaining > 0) { res.push(x); count.set(x, remaining - 1); }
  }
  return res;
}`
  }

  ]
}

];
