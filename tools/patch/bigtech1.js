// Nhóm bài LeetCode hay hỏi ở Big Tech — Trie/Design và Backtracking nâng cao.
// Dùng: node tools/algo_append.js tools/patch/bigtech1.js
module.exports = [
{
  group: "Big Tech — Trie & Thiết kế cấu trúc",
  items: [
    {
      name: "Implement Trie (cây tiền tố)",
      lc: "208", slug: "implement-trie-prefix-tree", diff: "Trung bình",
      tags: "trie prefix tree autocomplete design",
      complexity: "insert / search / startsWith đều O(L) với L là độ dài từ — bộ nhớ O(tổng ký tự × 26)",
      idea: "Mỗi nút là một ký tự, đường đi từ gốc xuống tạo thành tiền tự. Cờ end đánh dấu 'đến đây là một từ hoàn chỉnh' — nhờ đó phân biệt được từ thật với tiền tố.",
      trap: "Quên cờ end thì search(\"app\") sẽ trả true dù chỉ mới insert \"apple\". Trie KHÔNG chỉ là cây ký tự, nó phải nhớ nút nào kết thúc một từ.",
      examples: [
        { input: "insert(\"apple\"); search(\"apple\"); search(\"app\"); startsWith(\"app\")",
          output: "true, false, true",
          note: "\"app\" mới chỉ là tiền tố nên search trả false, còn startsWith trả true — đây chính là chỗ cờ end phát huy tác dụng." },
        { input: "insert(\"apple\"); insert(\"app\"); search(\"app\")",
          output: "true",
          note: "Không tạo nhánh mới, chỉ bật cờ end ở nút 'p' thứ hai — hai từ dùng chung 3 nút đầu, đó là lý do Trie tiết kiệm bộ nhớ với từ điển lớn." }
      ],
      steps: [
        "Mỗi nút giữ mảng 26 con (a-z) và một cờ boolean end.",
        "insert: đi theo từng ký tự, thiếu con thì tạo mới, tới ký tự cuối bật end = true.",
        "Tách hàm find(s) trả về nút cuối cùng của chuỗi s, hoặc null nếu đứt đường.",
        "search(word) = find(word) != null && node.end; startsWith(prefix) = find(prefix) != null.",
        "Ứng dụng thực tế: autocomplete ô tìm kiếm, kiểm tra từ cấm, IP routing table."
      ],
      alt: {
        title: "Cách khác — dùng HashMap thay mảng 26 con",
        complexity: "Vẫn O(L) nhưng tiết kiệm bộ nhớ khi bảng chữ cái lớn hoặc dữ liệu thưa",
        note: "Mảng 26 phần tử luôn tốn chỗ dù nút chỉ có 1 con. Với Unicode / chữ hoa lẫn thường / ký tự đặc biệt thì HashMap là lựa chọn bắt buộc.",
        java: "class Trie {\n    private final Map<Character, Trie> next = new HashMap<>();\n    private boolean end;\n\n    public void insert(String word) {\n        Trie node = this;\n        for (char c : word.toCharArray()) {\n            node = node.next.computeIfAbsent(c, k -> new Trie());\n        }\n        node.end = true;\n    }\n\n    public boolean search(String word) {\n        Trie node = find(word);\n        return node != null && node.end;\n    }\n\n    public boolean startsWith(String prefix) {\n        return find(prefix) != null;\n    }\n\n    private Trie find(String s) {\n        Trie node = this;\n        for (char c : s.toCharArray()) {\n            node = node.next.get(c);\n            if (node == null) return null;\n        }\n        return node;\n    }\n}"
      },
      java: "class Trie {\n    private final Trie[] next = new Trie[26];\n    private boolean end;\n\n    public void insert(String word) {\n        Trie node = this;\n        for (char c : word.toCharArray()) {\n            int i = c - 'a';\n            if (node.next[i] == null) node.next[i] = new Trie();\n            node = node.next[i];\n        }\n        node.end = true;   // đánh dấu kết thúc MỘT TỪ, không phải chỉ tiền tố\n    }\n\n    public boolean search(String word) {\n        Trie node = find(word);\n        return node != null && node.end;\n    }\n\n    public boolean startsWith(String prefix) {\n        return find(prefix) != null;\n    }\n\n    private Trie find(String s) {\n        Trie node = this;\n        for (char c : s.toCharArray()) {\n            node = node.next[c - 'a'];\n            if (node == null) return null;\n        }\n        return node;\n    }\n}",
      js: "class Trie {\n  constructor() { this.next = new Map(); this.end = false; }\n\n  insert(word) {\n    let node = this;\n    for (const c of word) {\n      if (!node.next.has(c)) node.next.set(c, new Trie());\n      node = node.next.get(c);\n    }\n    node.end = true;\n  }\n\n  _find(s) {\n    let node = this;\n    for (const c of s) {\n      node = node.next.get(c);\n      if (!node) return null;\n    }\n    return node;\n  }\n\n  search(word) { const n = this._find(word); return !!n && n.end; }\n  startsWith(prefix) { return this._find(prefix) !== null; }\n}"
    },
    {
      name: "Design Add and Search Words (có ký tự '.')",
      lc: "211", slug: "design-add-and-search-words-data-structure", diff: "Trung bình",
      tags: "trie dfs wildcard design",
      complexity: "addWord O(L); search O(L) nếu không có '.', xấu nhất O(26^L) khi toàn dấu chấm",
      idea: "Vẫn là Trie, nhưng search phải hỗ trợ ký tự đại diện '.' khớp mọi chữ cái. Gặp '.' thì KHÔNG đi được một nhánh xác định nữa — phải phân nhánh DFS thử cả 26 con.",
      trap: "Viết search bằng vòng lặp thì không xử lý được '.' vì cần quay lui nhiều nhánh. Bắt buộc dùng đệ quy (DFS) với chỉ số ký tự hiện tại.",
      examples: [
        { input: "addWord(\"bad\"); addWord(\"dad\"); addWord(\"mad\"); search(\"pad\")",
          output: "false",
          note: "Không nhánh nào bắt đầu bằng 'p' nên DFS đứt ngay ở tầng đầu tiên." },
        { input: "search(\".ad\") rồi search(\"b..\")",
          output: "true, true",
          note: "\".ad\" thử cả 26 con ở tầng 1, tới 'b' thì khớp 'bad'. \"b..\" đi chắc chắn 'b' rồi mới bung 26 nhánh ở hai tầng sau — độ dài tiền tố xác định càng dài thì càng nhanh." }
      ],
      steps: [
        "Cấu trúc nút giống LC 208: mảng 26 con + cờ end.",
        "addWord y hệt insert của Trie thường.",
        "search gọi dfs(word, 0, root).",
        "Trong dfs: nếu i == word.length thì trả về node.end.",
        "Nếu ký tự khác '.': đi thẳng xuống con tương ứng, null thì trả false.",
        "Nếu ký tự là '.': duyệt cả 26 con, con nào khác null mà dfs trả true thì trả true ngay (cắt sớm)."
      ],
      alt: {
        title: "Cách khác — nhóm từ theo ĐỘ DÀI rồi so khớp tuyến tính",
        complexity: "search O(số từ cùng độ dài × L) — đơn giản, đủ nhanh khi từ điển nhỏ",
        note: "Không cần Trie: gom các từ vào Map<Integer, List<String>> theo độ dài, search chỉ quét những từ đúng độ dài và so từng ký tự, coi '.' là khớp mọi thứ. Dễ viết, dễ giải thích, nhưng chậm khi từ điển lớn.",
        java: "class WordDictionary {\n    private final Map<Integer, List<String>> byLen = new HashMap<>();\n\n    public void addWord(String word) {\n        byLen.computeIfAbsent(word.length(), k -> new ArrayList<>()).add(word);\n    }\n\n    public boolean search(String word) {\n        for (String w : byLen.getOrDefault(word.length(), List.of())) {\n            if (matches(w, word)) return true;\n        }\n        return false;\n    }\n\n    private boolean matches(String w, String pattern) {\n        for (int i = 0; i < w.length(); i++) {\n            char p = pattern.charAt(i);\n            if (p != '.' && p != w.charAt(i)) return false;\n        }\n        return true;\n    }\n}"
      },
      java: "class WordDictionary {\n    private final WordDictionary[] next = new WordDictionary[26];\n    private boolean end;\n\n    public void addWord(String word) {\n        WordDictionary node = this;\n        for (char c : word.toCharArray()) {\n            int i = c - 'a';\n            if (node.next[i] == null) node.next[i] = new WordDictionary();\n            node = node.next[i];\n        }\n        node.end = true;\n    }\n\n    public boolean search(String word) {\n        return dfs(word, 0, this);\n    }\n\n    private boolean dfs(String word, int i, WordDictionary node) {\n        if (node == null) return false;\n        if (i == word.length()) return node.end;\n\n        char c = word.charAt(i);\n        if (c != '.') return dfs(word, i + 1, node.next[c - 'a']);\n\n        // '.' khớp mọi chữ cái -> phải thử hết 26 nhánh\n        for (WordDictionary child : node.next) {\n            if (child != null && dfs(word, i + 1, child)) return true;\n        }\n        return false;\n    }\n}",
      js: "class WordDictionary {\n  constructor() { this.next = new Map(); this.end = false; }\n\n  addWord(word) {\n    let node = this;\n    for (const c of word) {\n      if (!node.next.has(c)) node.next.set(c, new WordDictionary());\n      node = node.next.get(c);\n    }\n    node.end = true;\n  }\n\n  search(word) {\n    const dfs = (i, node) => {\n      if (!node) return false;\n      if (i === word.length) return node.end;\n      const c = word[i];\n      if (c !== '.') return dfs(i + 1, node.next.get(c));\n      for (const child of node.next.values()) {\n        if (dfs(i + 1, child)) return true;\n      }\n      return false;\n    };\n    return dfs(0, this);\n  }\n}"
    },
    {
      name: "Word Search II (tìm nhiều từ trên lưới)",
      lc: "212", slug: "word-search-ii", diff: "Khó",
      tags: "trie dfs backtracking matrix hard",
      complexity: "O(m·n·4^L) trên lý thuyết nhưng Trie cắt nhánh rất mạnh — xây Trie tốn O(tổng ký tự của words)",
      idea: "Chạy DFS riêng cho từng từ là O(số từ × m·n·4^L) — quá chậm. Mẹo: nhồi TẤT CẢ từ vào một Trie rồi chỉ duyệt lưới MỘT lần, đi song song trên lưới và trên Trie; hết nhánh Trie là cắt ngay.",
      trap: "Không xóa từ đã tìm được khỏi Trie (hoặc không set word = null) sẽ bị TRÙNG kết quả. Và nhớ khôi phục ô lưới sau DFS — đây là backtracking chứ không phải flood fill.",
      examples: [
        { input: "board = [[o,a,a,n],[e,t,a,e],[i,h,k,r],[i,f,l,v]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
          output: "[\"oath\",\"eat\"]",
          note: "\"pea\" và \"rain\" chết ngay ở ký tự đầu vì Trie không có nhánh 'p'/'r' khớp đường đi — đó là toàn bộ giá trị của việc gộp từ vào Trie." },
        { input: "board = [[a,b],[c,d]], words = [\"abcb\"]",
          output: "[]",
          note: "Đường đi a→b→c cần quay lại ô 'b' đã dùng; luật mỗi ô chỉ dùng một lần trong cùng một từ nên không dựng được \"abcb\"." }
      ],
      steps: [
        "Dựng Trie từ mảng words, lưu luôn CHUỖI đầy đủ ở nút kết thúc (node.word = word) để khỏi phải nối chuỗi khi tìm thấy.",
        "Duyệt mọi ô (r, c) của lưới, gọi dfs(r, c, root).",
        "Trong dfs: lấy ký tự ô hiện tại, nếu Trie không có con tương ứng thì return ngay.",
        "Nếu node.word != null: thêm vào kết quả rồi set node.word = null để không lấy trùng.",
        "Đánh dấu ô đã dùng (gán '#'), đệ quy 4 hướng, xong thì TRẢ LẠI ký tự cũ.",
        "Tối ưu thêm: sau khi tìm xong, cắt tỉa nhánh lá không còn từ nào để lần duyệt sau nhanh hơn."
      ],
      alt: {
        title: "Cách khác — chạy Word Search I (LC 79) cho từng từ",
        complexity: "O(số từ × m·n·4^L) — dễ viết nhưng TLE khi words dài hàng nghìn",
        note: "Đáng nêu trong phỏng vấn làm bước đệm: trình bày cách ngây thơ, chỉ ra vì sao chậm (mỗi từ quét lại cả lưới, không chia sẻ tiền tố chung), rồi mới dẫn tới Trie. Người phỏng vấn đánh giá cao lộ trình tối ưu hơn là lời giải rơi từ trên trời xuống.",
        java: "public List<String> findWords(char[][] board, String[] words) {\n    List<String> res = new ArrayList<>();\n    for (String w : words) {\n        if (exist(board, w)) res.add(w);\n    }\n    return res;\n}\n\nprivate boolean exist(char[][] b, String word) {\n    for (int r = 0; r < b.length; r++)\n        for (int c = 0; c < b[0].length; c++)\n            if (dfs(b, r, c, word, 0)) return true;\n    return false;\n}\n\nprivate boolean dfs(char[][] b, int r, int c, String w, int i) {\n    if (i == w.length()) return true;\n    if (r < 0 || c < 0 || r >= b.length || c >= b[0].length) return false;\n    if (b[r][c] != w.charAt(i)) return false;\n\n    char save = b[r][c];\n    b[r][c] = '#';\n    boolean found = dfs(b, r + 1, c, w, i + 1) || dfs(b, r - 1, c, w, i + 1)\n                 || dfs(b, r, c + 1, w, i + 1) || dfs(b, r, c - 1, w, i + 1);\n    b[r][c] = save;\n    return found;\n}"
      },
      java: "class Node {\n    Node[] next = new Node[26];\n    String word;              // khác null => nút này kết thúc một từ\n}\n\npublic List<String> findWords(char[][] board, String[] words) {\n    Node root = new Node();\n    for (String w : words) {\n        Node node = root;\n        for (char c : w.toCharArray()) {\n            int i = c - 'a';\n            if (node.next[i] == null) node.next[i] = new Node();\n            node = node.next[i];\n        }\n        node.word = w;\n    }\n\n    List<String> res = new ArrayList<>();\n    for (int r = 0; r < board.length; r++) {\n        for (int c = 0; c < board[0].length; c++) {\n            dfs(board, r, c, root, res);\n        }\n    }\n    return res;\n}\n\nprivate void dfs(char[][] b, int r, int c, Node node, List<String> res) {\n    if (r < 0 || c < 0 || r >= b.length || c >= b[0].length) return;\n\n    char ch = b[r][c];\n    if (ch == '#') return;                    // ô đang nằm trên đường đi hiện tại\n    Node nxt = node.next[ch - 'a'];\n    if (nxt == null) return;                  // Trie cắt nhánh ngay tại đây\n\n    if (nxt.word != null) {\n        res.add(nxt.word);\n        nxt.word = null;                      // chống lấy trùng\n    }\n\n    b[r][c] = '#';\n    dfs(b, r + 1, c, nxt, res);\n    dfs(b, r - 1, c, nxt, res);\n    dfs(b, r, c + 1, nxt, res);\n    dfs(b, r, c - 1, nxt, res);\n    b[r][c] = ch;                             // backtracking: trả lại ô\n}",
      js: "function findWords(board, words) {\n  const root = {};\n  for (const w of words) {\n    let node = root;\n    for (const c of w) node = node[c] || (node[c] = {});\n    node.word = w;\n  }\n\n  const res = [];\n  const m = board.length, n = board[0].length;\n\n  const dfs = (r, c, node) => {\n    if (r < 0 || c < 0 || r >= m || c >= n) return;\n    const ch = board[r][c];\n    if (ch === '#') return;\n    const nxt = node[ch];\n    if (!nxt) return;\n\n    if (nxt.word) { res.push(nxt.word); nxt.word = null; }\n\n    board[r][c] = '#';\n    dfs(r + 1, c, nxt); dfs(r - 1, c, nxt);\n    dfs(r, c + 1, nxt); dfs(r, c - 1, nxt);\n    board[r][c] = ch;\n  };\n\n  for (let r = 0; r < m; r++)\n    for (let c = 0; c < n; c++) dfs(r, c, root);\n\n  return res;\n}"
    },
    {
      name: "Insert Delete GetRandom O(1)",
      lc: "380", slug: "insert-delete-getrandom-o1", diff: "Trung bình",
      tags: "design hashmap array random swap-with-last",
      complexity: "insert / remove / getRandom đều O(1) trung bình — bộ nhớ O(n)",
      idea: "getRandom cần MẢNG (lấy ngẫu nhiên theo chỉ số), remove O(1) cần HASHMAP (tra vị trí). Kết hợp cả hai: map lưu {giá trị → chỉ số trong mảng}, xóa thì HOÁN ĐỔI phần tử cần xóa với phần tử CUỐI rồi cắt đuôi.",
      trap: "Xóa giữa mảng bằng remove(index) là O(n). Và sau khi hoán đổi phải NHỚ cập nhật chỉ số mới của phần tử cuối trong map — quên bước này là bug kinh điển của bài này.",
      examples: [
        { input: "insert(1); remove(2); insert(2); getRandom()",
          output: "true, false, true, 1 hoặc 2 (mỗi giá trị xác suất 1/2)",
          note: "remove(2) trả false vì 2 chưa có trong tập — đúng hợp đồng của bài: trả về việc thao tác có thực sự làm thay đổi tập hợp hay không." },
        { input: "list = [10, 20, 30, 40], map = {10:0, 20:1, 30:2, 40:3} rồi remove(20)",
          output: "list = [10, 40, 30], map = {10:0, 40:1, 30:2}",
          note: "40 nhảy từ chỉ số 3 về chỗ của 20 (chỉ số 1) — dòng map.put(last, idx) chính là chỗ hay quên nhất." }
      ],
      steps: [
        "Giữ ArrayList<Integer> list và HashMap<Integer, Integer> pos (giá trị → chỉ số).",
        "insert(v): nếu pos đã chứa v thì trả false; ngược lại list.add(v) và pos.put(v, list.size()-1).",
        "remove(v): nếu pos không chứa v thì trả false.",
        "Lấy idx = pos.get(v), last = phần tử cuối list. Ghi last vào vị trí idx, cập nhật pos.put(last, idx).",
        "Xóa phần tử cuối list (O(1)) và pos.remove(v).",
        "getRandom(): list.get(rand.nextInt(list.size()))."
      ],
      alt: {
        title: "Cách khác — chỉ dùng ArrayList (không HashMap)",
        complexity: "insert O(1) nhưng remove O(n) vì phải tìm tuyến tính — KHÔNG đạt yêu cầu đề bài",
        note: "Nêu ra để chỉ rõ vì sao phải có HashMap. Ngược lại nếu chỉ dùng HashSet thì insert/remove O(1) nhưng getRandom lại O(n) vì phải duyệt để lấy phần tử thứ k. Cặp Map + List là cách duy nhất đạt O(1) cho cả ba.",
        java: "class RandomizedSetSlow {\n    private final List<Integer> list = new ArrayList<>();\n    private final Random rand = new Random();\n\n    public boolean insert(int val) {\n        if (list.contains(val)) return false;   // O(n)\n        return list.add(val);\n    }\n\n    public boolean remove(int val) {\n        return list.remove(Integer.valueOf(val)); // O(n): tìm + dồn mảng\n    }\n\n    public int getRandom() {\n        return list.get(rand.nextInt(list.size()));\n    }\n}"
      },
      java: "class RandomizedSet {\n    private final List<Integer> list = new ArrayList<>();\n    private final Map<Integer, Integer> pos = new HashMap<>(); // giá trị -> chỉ số\n    private final Random rand = new Random();\n\n    public boolean insert(int val) {\n        if (pos.containsKey(val)) return false;\n        pos.put(val, list.size());\n        list.add(val);\n        return true;\n    }\n\n    public boolean remove(int val) {\n        Integer idx = pos.remove(val);\n        if (idx == null) return false;\n\n        int lastIdx = list.size() - 1;\n        int last = list.get(lastIdx);\n        list.set(idx, last);\n        if (idx != lastIdx) pos.put(last, idx); // BƯỚC HAY QUÊN\n        list.remove(lastIdx);                   // xóa cuối mảng: O(1)\n        return true;\n    }\n\n    public int getRandom() {\n        return list.get(rand.nextInt(list.size()));\n    }\n}",
      js: "class RandomizedSet {\n  constructor() { this.list = []; this.pos = new Map(); }\n\n  insert(val) {\n    if (this.pos.has(val)) return false;\n    this.pos.set(val, this.list.length);\n    this.list.push(val);\n    return true;\n  }\n\n  remove(val) {\n    if (!this.pos.has(val)) return false;\n    const idx = this.pos.get(val);\n    const last = this.list[this.list.length - 1];\n    this.list[idx] = last;\n    this.pos.set(last, idx);\n    this.list.pop();\n    this.pos.delete(val);\n    return true;\n  }\n\n  getRandom() {\n    return this.list[Math.floor(Math.random() * this.list.length)];\n  }\n}"
    },
    {
      name: "LFU Cache (loại bỏ ít dùng nhất)",
      lc: "460", slug: "lfu-cache", diff: "Khó",
      tags: "design hashmap linkedhashset frequency hard",
      complexity: "get / put O(1) — bộ nhớ O(capacity)",
      idea: "LRU loại theo THỜI GIAN dùng, LFU loại theo SỐ LẦN dùng. Để O(1) cần ba thứ: map giá trị, map tần suất của từng key, và map {tần suất → danh sách key giữ thứ tự} để khi hòa tần suất thì loại cái cũ nhất (LRU trong nhóm).",
      trap: "Khi tần suất min bị dùng hết phải cập nhật minFreq. Quy tắc chuẩn: mỗi lần put một key MỚI thì minFreq = 1; mỗi lần tăng tần suất mà nhóm minFreq rỗng thì minFreq++.",
      examples: [
        { input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3)",
          output: "get(1) = 1, và key 2 bị loại",
          note: "Sau get(1), tần suất của 1 là 2 còn của 2 vẫn là 1 — nên khi thêm key 3 thì key 2 (ít dùng nhất) ra đi." },
        { input: "tiếp tục: get(2); get(3); put(4,4); get(1)",
          output: "get(2) = -1, get(3) = 3, sau put(4,4) thì get(1) = -1",
          note: "Lúc này 1 và 3 cùng tần suất 2 — hòa thì loại cái CŨ hơn theo thứ tự dùng, tức key 1. Đây là chỗ LFU bắt buộc phải có LRU lồng bên trong." }
      ],
      steps: [
        "vals: Map<Integer,Integer> lưu key → value.",
        "counts: Map<Integer,Integer> lưu key → tần suất hiện tại.",
        "lists: Map<Integer, LinkedHashSet<Integer>> lưu tần suất → tập key (LinkedHashSet giữ thứ tự chèn = thứ tự LRU).",
        "minFreq: tần suất nhỏ nhất đang tồn tại.",
        "get(key): lấy value, gọi touch(key) để đẩy key từ nhóm f sang nhóm f+1.",
        "touch: xóa key khỏi lists.get(f); nếu nhóm rỗng và f == minFreq thì minFreq++; thêm key vào lists.get(f+1).",
        "put(key, v): nếu đã có thì cập nhật value + touch. Nếu chưa có mà đầy thì loại phần tử ĐẦU TIÊN của lists.get(minFreq), rồi chèn key mới với tần suất 1 và đặt minFreq = 1."
      ],
      alt: {
        title: "Cách khác — PriorityQueue theo (tần suất, thời điểm dùng)",
        complexity: "get/put O(log n) — dễ nghĩ, dễ viết, đủ dùng khi không đòi O(1)",
        note: "Heap sắp theo tần suất rồi tới dấu thời gian tăng dần. Nhược điểm: cập nhật tần suất của một phần tử giữa heap không rẻ (phải remove O(n) hoặc dùng lazy deletion). Nêu ra để so sánh, nhưng phỏng vấn Big Tech thường đòi bản O(1).",
        java: "class LFUCacheHeap {\n    private record Entry(int key, int val, int freq, int time) {}\n    private final Map<Integer, Entry> map = new HashMap<>();\n    private final PriorityQueue<Entry> pq = new PriorityQueue<>(\n        Comparator.comparingInt(Entry::freq).thenComparingInt(Entry::time));\n    private final int cap;\n    private int clock = 0;\n\n    LFUCacheHeap(int capacity) { this.cap = capacity; }\n\n    public int get(int key) {\n        Entry e = map.get(key);\n        if (e == null) return -1;\n        Entry ne = new Entry(key, e.val(), e.freq() + 1, clock++);\n        map.put(key, ne);\n        pq.add(ne);              // lazy: bản cũ vẫn còn trong heap\n        return e.val();\n    }\n\n    public void put(int key, int value) {\n        if (cap == 0) return;\n        if (map.containsKey(key)) {\n            Entry e = map.get(key);\n            Entry ne = new Entry(key, value, e.freq() + 1, clock++);\n            map.put(key, ne);\n            pq.add(ne);\n            return;\n        }\n        while (map.size() >= cap) {\n            Entry top = pq.poll();\n            // bỏ qua bản đã lỗi thời\n            if (map.get(top.key()) == top) map.remove(top.key());\n        }\n        Entry ne = new Entry(key, value, 1, clock++);\n        map.put(key, ne);\n        pq.add(ne);\n    }\n}"
      },
      java: "class LFUCache {\n    private final int capacity;\n    private int minFreq = 0;\n    private final Map<Integer, Integer> vals = new HashMap<>();   // key -> value\n    private final Map<Integer, Integer> counts = new HashMap<>(); // key -> tần suất\n    private final Map<Integer, LinkedHashSet<Integer>> lists = new HashMap<>();\n\n    public LFUCache(int capacity) {\n        this.capacity = capacity;\n        lists.put(1, new LinkedHashSet<>());\n    }\n\n    public int get(int key) {\n        if (!vals.containsKey(key)) return -1;\n        touch(key);\n        return vals.get(key);\n    }\n\n    public void put(int key, int value) {\n        if (capacity <= 0) return;\n\n        if (vals.containsKey(key)) {\n            vals.put(key, value);\n            touch(key);\n            return;\n        }\n\n        if (vals.size() >= capacity) {\n            // loại phần tử ĐẦU của nhóm minFreq = ít dùng nhất, cũ nhất\n            LinkedHashSet<Integer> group = lists.get(minFreq);\n            int evict = group.iterator().next();\n            group.remove(evict);\n            vals.remove(evict);\n            counts.remove(evict);\n        }\n\n        vals.put(key, value);\n        counts.put(key, 1);\n        lists.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);\n        minFreq = 1;   // key mới luôn kéo minFreq về 1\n    }\n\n    private void touch(int key) {\n        int f = counts.get(key);\n        counts.put(key, f + 1);\n        lists.get(f).remove(key);\n        if (f == minFreq && lists.get(f).isEmpty()) minFreq = f + 1;\n        lists.computeIfAbsent(f + 1, k -> new LinkedHashSet<>()).add(key);\n    }\n}",
      js: "class LFUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.minFreq = 0;\n    this.vals = new Map();    // key -> value\n    this.counts = new Map();  // key -> tần suất\n    this.lists = new Map();   // tần suất -> Set(key), Set của JS giữ thứ tự chèn\n  }\n\n  _touch(key) {\n    const f = this.counts.get(key);\n    this.counts.set(key, f + 1);\n    this.lists.get(f).delete(key);\n    if (f === this.minFreq && this.lists.get(f).size === 0) this.minFreq = f + 1;\n    if (!this.lists.has(f + 1)) this.lists.set(f + 1, new Set());\n    this.lists.get(f + 1).add(key);\n  }\n\n  get(key) {\n    if (!this.vals.has(key)) return -1;\n    this._touch(key);\n    return this.vals.get(key);\n  }\n\n  put(key, value) {\n    if (this.cap <= 0) return;\n    if (this.vals.has(key)) {\n      this.vals.set(key, value);\n      this._touch(key);\n      return;\n    }\n    if (this.vals.size >= this.cap) {\n      const group = this.lists.get(this.minFreq);\n      const evict = group.values().next().value;\n      group.delete(evict);\n      this.vals.delete(evict);\n      this.counts.delete(evict);\n    }\n    this.vals.set(key, value);\n    this.counts.set(key, 1);\n    if (!this.lists.has(1)) this.lists.set(1, new Set());\n    this.lists.get(1).add(key);\n    this.minFreq = 1;\n  }\n}"
    },
    {
      name: "Time Based Key-Value Store",
      lc: "981", slug: "time-based-key-value-store", diff: "Trung bình",
      tags: "binary-search hashmap design versioning",
      complexity: "set O(1); get O(log n) nhờ tìm nhị phân trên danh sách timestamp",
      idea: "Mỗi key giữ một danh sách các phiên bản (timestamp, value). Vì đề bảo đảm timestamp GỬI VÀO TĂNG DẦN nên danh sách đã sắp xếp sẵn — get chỉ cần tìm nhị phân phần tử lớn nhất mà ≤ timestamp hỏi.",
      trap: "Đây là biến thể 'upper bound' chứ không phải tìm chính xác. Vòng lặp phải lưu lại ứng viên tốt nhất khi list.get(mid).time <= t rồi tiếp tục đi sang phải, chứ không return ngay.",
      examples: [
        { input: "set(\"foo\",\"bar\",1); get(\"foo\",1); get(\"foo\",3)",
          output: "\"bar\", \"bar\"",
          note: "get tại thời điểm 3 vẫn trả \"bar\" vì đó là phiên bản mới nhất KHÔNG VƯỢT QUÁ thời điểm hỏi." },
        { input: "set(\"foo\",\"bar2\",4); get(\"foo\",4); get(\"foo\",5); get(\"foo\",0)",
          output: "\"bar2\", \"bar2\", \"\"",
          note: "get(\"foo\",0) trả chuỗi rỗng vì mọi phiên bản đều ở tương lai so với thời điểm hỏi — nhớ xử lý ca này, đây là ca test hay bị bỏ sót." }
      ],
      steps: [
        "Map<String, List<Pair<Integer,String>>> lưu key → danh sách phiên bản theo thứ tự thời gian.",
        "set(key, value, timestamp): chỉ cần append vào cuối list (timestamp đã tăng dần).",
        "get(key, timestamp): lấy list, nếu rỗng trả \"\".",
        "Tìm nhị phân: lo = 0, hi = n-1, res = \"\".",
        "Nếu list[mid].time <= timestamp: res = list[mid].value rồi lo = mid + 1 (thử tìm phiên bản mới hơn nữa).",
        "Ngược lại hi = mid - 1. Kết thúc trả res."
      ],
      alt: {
        title: "Cách khác — TreeMap<Integer,String> với floorEntry",
        complexity: "set O(log n), get O(log n) — ngắn hơn hẳn, khỏi tự viết tìm nhị phân",
        note: "floorEntry(t) trả về entry có khóa lớn nhất mà ≤ t — đúng ngữ nghĩa bài toán. Đổi lại set thành O(log n) thay vì O(1), và bạn mất cơ hội thể hiện kỹ năng viết binary search — nên trong phỏng vấn hãy trình bày cả hai.",
        java: "class TimeMap {\n    private final Map<String, TreeMap<Integer, String>> map = new HashMap<>();\n\n    public void set(String key, String value, int timestamp) {\n        map.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);\n    }\n\n    public String get(String key, int timestamp) {\n        TreeMap<Integer, String> tm = map.get(key);\n        if (tm == null) return \"\";\n        Map.Entry<Integer, String> e = tm.floorEntry(timestamp);\n        return e == null ? \"\" : e.getValue();\n    }\n}"
      },
      java: "class TimeMap {\n    private record Version(int time, String value) {}\n    private final Map<String, List<Version>> map = new HashMap<>();\n\n    public void set(String key, String value, int timestamp) {\n        map.computeIfAbsent(key, k -> new ArrayList<>()).add(new Version(timestamp, value));\n    }\n\n    public String get(String key, int timestamp) {\n        List<Version> list = map.get(key);\n        if (list == null || list.isEmpty()) return \"\";\n\n        int lo = 0, hi = list.size() - 1;\n        String res = \"\";\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (list.get(mid).time() <= timestamp) {\n                res = list.get(mid).value();  // ứng viên hợp lệ, thử tìm mới hơn\n                lo = mid + 1;\n            } else {\n                hi = mid - 1;\n            }\n        }\n        return res;\n    }\n}",
      js: "class TimeMap {\n  constructor() { this.map = new Map(); }\n\n  set(key, value, timestamp) {\n    if (!this.map.has(key)) this.map.set(key, []);\n    this.map.get(key).push([timestamp, value]);\n  }\n\n  get(key, timestamp) {\n    const list = this.map.get(key);\n    if (!list || list.length === 0) return '';\n\n    let lo = 0, hi = list.length - 1, res = '';\n    while (lo <= hi) {\n      const mid = lo + ((hi - lo) >> 1);\n      if (list[mid][0] <= timestamp) { res = list[mid][1]; lo = mid + 1; }\n      else hi = mid - 1;\n    }\n    return res;\n  }\n}"
    },
    {
      name: "Implement Queue using Stacks (hàng đợi bằng 2 ngăn xếp)",
      lc: "232", slug: "implement-queue-using-stacks", diff: "Dễ",
      tags: "stack queue design amortized",
      complexity: "push O(1); pop/peek O(1) TRUNG BÌNH KHẤU HAO (amortized) dù xấu nhất một lần là O(n)",
      idea: "Hai stack: in nhận phần tử mới, out phục vụ lấy ra. Khi out rỗng thì đổ TOÀN BỘ in sang out — thứ tự bị đảo hai lần nên thành FIFO. Mỗi phần tử chỉ chuyển đúng một lần trong suốt vòng đời.",
      trap: "Đổ từ in sang out khi out CHƯA rỗng sẽ phá thứ tự. Điều kiện bắt buộc: chỉ chuyển khi out.isEmpty(). Câu hỏi phụ hay đi kèm: 'phức tạp là bao nhiêu?' — trả lời O(1) amortized và giải thích bằng lập luận khấu hao.",
      examples: [
        { input: "push(1); push(2); peek(); pop(); empty()",
          output: "1, 1, false",
          note: "Lúc peek(): in = [1,2] (đỉnh là 2), out rỗng nên đổ sang thành out = [2,1] (đỉnh là 1) — đúng phần tử vào trước." },
        { input: "tiếp: push(3); pop(); pop(); empty()",
          output: "2, 3, true",
          note: "push(3) rơi vào in, còn out vẫn còn 2 nên pop() lấy 2 trước. Chỉ khi out cạn mới đổ tiếp — chính cơ chế này giữ đúng FIFO." }
      ],
      steps: [
        "Khai báo hai Deque<Integer> in và out (dùng ArrayDeque, đừng dùng lớp Stack cũ).",
        "push(x): in.push(x) — luôn O(1).",
        "Viết hàm shift(): nếu out rỗng thì while (!in.isEmpty()) out.push(in.pop()).",
        "pop(): gọi shift() rồi out.pop().",
        "peek(): gọi shift() rồi out.peek().",
        "empty(): in.isEmpty() && out.isEmpty()."
      ],
      alt: {
        title: "Cách khác — dồn ngay lúc push (push tốn kém, pop O(1) tuyệt đối)",
        complexity: "push O(n), pop/peek O(1) xấu nhất",
        note: "Đảo vai trò: mỗi lần push thì đổ hết out sang in, đẩy phần tử mới, rồi đổ ngược lại. Chọn bản này khi hệ thống đọc rất nhiều mà ghi rất ít và cần độ trễ đọc ổn định (không có cú pop nào đột ngột tốn O(n)) — một câu trả lời ghi điểm về đánh đổi latency.",
        java: "class MyQueue {\n    private final Deque<Integer> in = new ArrayDeque<>();\n    private final Deque<Integer> out = new ArrayDeque<>();\n\n    public void push(int x) {\n        while (!in.isEmpty()) out.push(in.pop());\n        in.push(x);\n        while (!out.isEmpty()) in.push(out.pop());\n    }\n\n    public int pop()   { return in.pop(); }\n    public int peek()  { return in.peek(); }\n    public boolean empty() { return in.isEmpty(); }\n}"
      },
      java: "class MyQueue {\n    private final Deque<Integer> in = new ArrayDeque<>();\n    private final Deque<Integer> out = new ArrayDeque<>();\n\n    public void push(int x) {\n        in.push(x);\n    }\n\n    public int pop() {\n        shift();\n        return out.pop();\n    }\n\n    public int peek() {\n        shift();\n        return out.peek();\n    }\n\n    public boolean empty() {\n        return in.isEmpty() && out.isEmpty();\n    }\n\n    // CHỈ đổ khi out đã cạn, nếu không sẽ phá thứ tự FIFO\n    private void shift() {\n        if (out.isEmpty()) {\n            while (!in.isEmpty()) out.push(in.pop());\n        }\n    }\n}",
      js: "class MyQueue {\n  constructor() { this.in = []; this.out = []; }\n\n  push(x) { this.in.push(x); }\n\n  _shift() {\n    if (this.out.length === 0) {\n      while (this.in.length) this.out.push(this.in.pop());\n    }\n  }\n\n  pop()  { this._shift(); return this.out.pop(); }\n  peek() { this._shift(); return this.out[this.out.length - 1]; }\n  empty() { return this.in.length === 0 && this.out.length === 0; }\n}"
    }
  ]
},
{
  group: "Big Tech — Backtracking nâng cao",
  items: [
    {
      name: "Combination Sum (tổ hợp có tổng bằng target)",
      lc: "39", slug: "combination-sum", diff: "Trung bình",
      tags: "backtracking dfs combination pruning",
      complexity: "O(n^(target/min)) trong lý thuyết — thực tế cắt nhánh rất mạnh nhờ sắp xếp trước",
      idea: "Mỗi số được dùng KHÔNG GIỚI HẠN lần. Mẹo chống trùng tổ hợp: truyền chỉ số bắt đầu start xuống đệ quy và không bao giờ quay lại số phía trước — nhờ đó [2,3] và [3,2] chỉ sinh ra một lần.",
      trap: "Nếu vòng lặp luôn chạy từ 0 thì sẽ sinh cả [2,2,3] lẫn [2,3,2] lẫn [3,2,2]. Còn khi cho phép dùng lại số hiện tại thì gọi đệ quy với i chứ KHÔNG phải i + 1.",
      examples: [
        { input: "candidates = [2,3,6,7], target = 7",
          output: "[[2,2,3],[7]]",
          note: "2 được dùng hai lần vì đề cho tái sử dụng; [3,2,2] không xuất hiện nhờ ràng buộc start không lùi." },
        { input: "candidates = [2,3,5], target = 8",
          output: "[[2,2,2,2],[2,3,3],[3,5]]",
          note: "Sau khi sắp xếp, khi remain - candidates[i] < 0 là break luôn khỏi vòng lặp chứ không continue — mọi số sau đó còn lớn hơn nên chắc chắn cũng hỏng." }
      ],
      steps: [
        "Sắp xếp candidates tăng dần để cắt nhánh được bằng break.",
        "dfs(start, remain, path): nếu remain == 0 thì thêm bản SAO của path vào kết quả và return.",
        "Duyệt i từ start tới hết: nếu candidates[i] > remain thì break (nhờ đã sắp xếp).",
        "Chọn: path.add(candidates[i]).",
        "Đệ quy dfs(i, remain - candidates[i], path) — truyền i chứ không phải i+1 vì được dùng lại.",
        "Bỏ chọn: path.remove(path.size() - 1)."
      ],
      alt: {
        title: "Cách khác — quy hoạch động kiểu unbounded knapsack",
        complexity: "O(target × n) cho việc ĐẾM số tổ hợp; liệt kê đầy đủ vẫn phải quay lui",
        note: "Nếu đề chỉ hỏi CÓ BAO NHIÊU tổ hợp (LC 518 Coin Change II) thì DP nhanh hơn hẳn backtracking. Còn khi phải liệt kê từng tổ hợp thì số lượng kết quả tự nó đã là hàm mũ, DP không cứu được — đây là điểm phân biệt hay bị hỏi vặn.",
        java: "// Đếm số tổ hợp (không liệt kê) — mỗi số dùng vô hạn lần\npublic int countCombinations(int[] candidates, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n    for (int c : candidates) {          // vòng ngoài là ĐỒNG XU\n        for (int t = c; t <= target; t++) { // vòng trong chạy XUÔI = dùng lại được\n            dp[t] += dp[t - c];\n        }\n    }\n    return dp[target];\n}"
      },
      java: "public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);           // để cắt nhánh bằng break\n    List<List<Integer>> res = new ArrayList<>();\n    dfs(candidates, 0, target, new ArrayDeque<>(), res);\n    return res;\n}\n\nprivate void dfs(int[] c, int start, int remain,\n                 Deque<Integer> path, List<List<Integer>> res) {\n    if (remain == 0) {\n        res.add(new ArrayList<>(path));   // BẢN SAO, không phải tham chiếu\n        return;\n    }\n    for (int i = start; i < c.length; i++) {\n        if (c[i] > remain) break;         // mọi số sau còn lớn hơn -> vô vọng\n        path.addLast(c[i]);\n        dfs(c, i, remain - c[i], path, res); // i chứ không phải i+1: dùng lại được\n        path.removeLast();                // quay lui\n    }\n}",
      js: "function combinationSum(candidates, target) {\n  candidates.sort((a, b) => a - b);\n  const res = [], path = [];\n\n  const dfs = (start, remain) => {\n    if (remain === 0) { res.push([...path]); return; }\n    for (let i = start; i < candidates.length; i++) {\n      if (candidates[i] > remain) break;\n      path.push(candidates[i]);\n      dfs(i, remain - candidates[i]);\n      path.pop();\n    }\n  };\n\n  dfs(0, target);\n  return res;\n}"
    },
    {
      name: "Letter Combinations of a Phone Number",
      lc: "17", slug: "letter-combinations-of-a-phone-number", diff: "Trung bình",
      tags: "backtracking dfs string cartesian-product",
      complexity: "O(4^n · n) với n là số chữ số — có tối đa 4^n chuỗi, mỗi chuỗi tốn O(n) để dựng",
      idea: "Tích Descartes cổ điển: mỗi chữ số mở ra 3-4 lựa chọn ký tự, đi hết chiều sâu bằng số chữ số thì có một chuỗi hoàn chỉnh. Đây là bài 'khởi động' backtracking mà Google/Meta rất hay dùng ở vòng phone screen.",
      trap: "Quên xử lý chuỗi input RỖNG — phải trả về danh sách rỗng chứ không phải danh sách chứa một chuỗi rỗng. Và nhớ chữ số 7 có 4 ký tự (pqrs), chữ số 9 cũng 4 ký tự (wxyz), còn 1 và 0 không có ký tự nào.",
      examples: [
        { input: "digits = \"23\"",
          output: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
          note: "3 lựa chọn (abc) × 3 lựa chọn (def) = 9 chuỗi — thứ tự đúng như duyệt DFS theo chiều sâu từ trái sang phải." },
        { input: "digits = \"\"",
          output: "[]",
          note: "Ca biên bắt buộc: nếu để đệ quy chạy tự nhiên sẽ trả về [\"\"] (một phần tử là chuỗi rỗng) — sai. Phải chặn ngay đầu hàm." }
      ],
      steps: [
        "Nếu digits rỗng thì trả về danh sách rỗng ngay.",
        "Dựng bảng tra map[10] = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"}.",
        "dfs(index, StringBuilder sb): nếu index == digits.length() thì thêm sb.toString() vào kết quả.",
        "Lấy letters = map[digits.charAt(index) - '0'].",
        "Với mỗi ký tự: sb.append(c) → dfs(index + 1) → sb.deleteCharAt(sb.length() - 1).",
        "Dùng StringBuilder thay vì nối chuỗi để không tạo rác O(n²)."
      ],
      alt: {
        title: "Cách khác — BFS/lặp, nhân dần danh sách theo từng chữ số",
        complexity: "Cùng O(4^n · n) nhưng KHÔNG dùng đệ quy — tránh nguy cơ tràn stack, dễ giải thích",
        note: "Bắt đầu với danh sách chứa một chuỗi rỗng, mỗi chữ số thì thay danh sách cũ bằng danh sách mới (mỗi chuỗi cũ nối thêm từng ký tự). Cách này còn tiện khi muốn chuyển sang stream/lazy để không dựng hết kết quả trong RAM.",
        java: "public List<String> letterCombinations(String digits) {\n    if (digits == null || digits.isEmpty()) return new ArrayList<>();\n    String[] map = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n    List<String> res = new ArrayList<>();\n    res.add(\"\");\n    for (char d : digits.toCharArray()) {\n        String letters = map[d - '0'];\n        List<String> next = new ArrayList<>(res.size() * letters.length());\n        for (String prefix : res) {\n            for (char c : letters.toCharArray()) next.add(prefix + c);\n        }\n        res = next;\n    }\n    return res;\n}"
      },
      java: "public List<String> letterCombinations(String digits) {\n    List<String> res = new ArrayList<>();\n    if (digits == null || digits.isEmpty()) return res;   // ca biên bắt buộc\n\n    String[] map = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n    dfs(digits, 0, map, new StringBuilder(), res);\n    return res;\n}\n\nprivate void dfs(String digits, int i, String[] map,\n                 StringBuilder sb, List<String> res) {\n    if (i == digits.length()) {\n        res.add(sb.toString());\n        return;\n    }\n    String letters = map[digits.charAt(i) - '0'];\n    for (int k = 0; k < letters.length(); k++) {\n        sb.append(letters.charAt(k));\n        dfs(digits, i + 1, map, sb, res);\n        sb.deleteCharAt(sb.length() - 1);   // quay lui\n    }\n}",
      js: "function letterCombinations(digits) {\n  if (!digits) return [];\n  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];\n  const res = [], path = [];\n\n  const dfs = (i) => {\n    if (i === digits.length) { res.push(path.join('')); return; }\n    for (const c of map[+digits[i]]) {\n      path.push(c);\n      dfs(i + 1);\n      path.pop();\n    }\n  };\n\n  dfs(0);\n  return res;\n}"
    },
    {
      name: "Word Search (tìm từ trên lưới ký tự)",
      lc: "79", slug: "word-search", diff: "Trung bình",
      tags: "backtracking dfs matrix in-place-marking",
      complexity: "O(m·n·4^L) thời gian, O(L) bộ nhớ đệ quy nếu đánh dấu tại chỗ",
      idea: "Từ mỗi ô, thử đi 4 hướng khớp dần từng ký tự của word. Điểm mấu chốt là mỗi ô chỉ được dùng MỘT lần trong cùng một đường đi — đánh dấu tạm rồi trả lại sau khi đệ quy xong.",
      trap: "Dùng mảng visited riêng thì tốn O(m·n) bộ nhớ; mẹo chuẩn là ghi đè ô bằng ký tự lạ ('#') rồi phục hồi. Nhưng phải phục hồi ở MỌI nhánh return, kể cả nhánh thất bại — quên là lưới hỏng cho lần duyệt sau.",
      examples: [
        { input: "board = [[A,B,C,E],[S,F,C,S],[A,D,E,E]], word = \"ABCCED\"",
          output: "true",
          note: "Đường đi A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1) — đi xuống rồi vòng sang trái, chứng minh đường đi không cần thẳng." },
        { input: "cùng board, word = \"ABCB\"",
          output: "false",
          note: "Muốn dựng \"ABCB\" phải quay lại đúng ô B(0,1) đã dùng — nhờ đánh dấu '#' nên nhánh này bị chặn, trả về false. Đây chính là ca test phân biệt backtracking thật với flood fill." }
      ],
      steps: [
        "Duyệt mọi ô (r, c) làm điểm xuất phát, gọi dfs(r, c, 0).",
        "Trong dfs: nếu i == word.length() thì trả true (đã khớp hết).",
        "Nếu ra ngoài biên hoặc board[r][c] != word.charAt(i) thì trả false.",
        "Lưu ký tự cũ, gán board[r][c] = '#' để đánh dấu đang dùng.",
        "Gọi 4 hướng với i + 1, gộp bằng || để dừng sớm khi tìm thấy.",
        "Trả lại board[r][c] = ký tự cũ rồi return kết quả."
      ],
      alt: {
        title: "Cách khác — mảng visited riêng (không phá dữ liệu đầu vào)",
        complexity: "Cùng O(m·n·4^L) thời gian nhưng tốn thêm O(m·n) bộ nhớ",
        note: "Nên chọn khi lưới là dữ liệu dùng chung / chỉ đọc, hoặc khi chạy đa luồng (nhiều thread cùng đọc một board thì ghi đè '#' là race condition). Trong phỏng vấn, chủ động nhắc tới điểm này thường được cộng điểm về tư duy hệ thống.",
        java: "public boolean exist(char[][] board, String word) {\n    int m = board.length, n = board[0].length;\n    boolean[][] visited = new boolean[m][n];\n    for (int r = 0; r < m; r++)\n        for (int c = 0; c < n; c++)\n            if (dfs(board, visited, r, c, word, 0)) return true;\n    return false;\n}\n\nprivate boolean dfs(char[][] b, boolean[][] vis, int r, int c, String w, int i) {\n    if (i == w.length()) return true;\n    if (r < 0 || c < 0 || r >= b.length || c >= b[0].length) return false;\n    if (vis[r][c] || b[r][c] != w.charAt(i)) return false;\n\n    vis[r][c] = true;\n    boolean found = dfs(b, vis, r + 1, c, w, i + 1)\n                 || dfs(b, vis, r - 1, c, w, i + 1)\n                 || dfs(b, vis, r, c + 1, w, i + 1)\n                 || dfs(b, vis, r, c - 1, w, i + 1);\n    vis[r][c] = false;\n    return found;\n}"
      },
      java: "public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n        for (int c = 0; c < board[0].length; c++) {\n            if (dfs(board, r, c, word, 0)) return true;\n        }\n    }\n    return false;\n}\n\nprivate boolean dfs(char[][] b, int r, int c, String w, int i) {\n    if (i == w.length()) return true;                       // khớp hết\n    if (r < 0 || c < 0 || r >= b.length || c >= b[0].length) return false;\n    if (b[r][c] != w.charAt(i)) return false;\n\n    char save = b[r][c];\n    b[r][c] = '#';                                          // đang nằm trên đường đi\n\n    boolean found = dfs(b, r + 1, c, w, i + 1)\n                 || dfs(b, r - 1, c, w, i + 1)\n                 || dfs(b, r, c + 1, w, i + 1)\n                 || dfs(b, r, c - 1, w, i + 1);\n\n    b[r][c] = save;                                         // PHỤC HỒI ở mọi nhánh\n    return found;\n}",
      js: "function exist(board, word) {\n  const m = board.length, n = board[0].length;\n\n  const dfs = (r, c, i) => {\n    if (i === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n) return false;\n    if (board[r][c] !== word[i]) return false;\n\n    const save = board[r][c];\n    board[r][c] = '#';\n    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1)\n               || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);\n    board[r][c] = save;\n    return found;\n  };\n\n  for (let r = 0; r < m; r++)\n    for (let c = 0; c < n; c++)\n      if (dfs(r, c, 0)) return true;\n  return false;\n}"
    },
    {
      name: "Palindrome Partitioning (chia chuỗi thành các đoạn đối xứng)",
      lc: "131", slug: "palindrome-partitioning", diff: "Trung bình",
      tags: "backtracking dfs palindrome dp-precompute",
      complexity: "O(n · 2^n) — có tới 2^(n-1) cách cắt, mỗi cách tốn O(n) để sao chép",
      idea: "Tại mỗi vị trí start, thử mọi điểm cắt end: nếu s[start..end] là đối xứng thì nhận đoạn đó và đệ quy phần còn lại. Đây là khuôn 'cắt chuỗi' cơ bản, dùng lại được cho Word Break II, Restore IP Addresses.",
      trap: "Kiểm tra đối xứng ngây thơ mỗi lần là O(n) làm tổng thể chậm hẳn. Tiền xử lý bảng dp[i][j] = 'đoạn i..j có đối xứng không' trong O(n²) rồi tra O(1) là mẹo ăn điểm.",
      examples: [
        { input: "s = \"aab\"",
          output: "[[\"a\",\"a\",\"b\"], [\"aa\",\"b\"]]",
          note: "Cắt sau ký tự đầu cho nhánh [\"a\", ...], cắt sau hai ký tự cho nhánh [\"aa\", ...]. Không có nhánh [\"aab\"] vì \"aab\" không đối xứng." },
        { input: "s = \"a\"",
          output: "[[\"a\"]]",
          note: "Chuỗi một ký tự luôn đối xứng — nhớ rằng đoạn rỗng KHÔNG được tính là một phần cắt, điều kiện dừng phải là start == s.length()." }
      ],
      steps: [
        "Tiền xử lý bảng boolean[n][n]: pal[i][j] = (s[i]==s[j]) && (j - i < 2 || pal[i+1][j-1]).",
        "Điền bảng theo i giảm dần, j tăng dần để pal[i+1][j-1] luôn được tính trước.",
        "dfs(start, path): nếu start == n thì thêm bản sao path vào kết quả.",
        "Duyệt end từ start tới n-1: nếu pal[start][end] thì chọn s.substring(start, end+1).",
        "Đệ quy dfs(end + 1, path).",
        "Bỏ chọn (path.removeLast) rồi thử end tiếp theo."
      ],
      alt: {
        title: "Cách khác — kiểm tra đối xứng bằng hai con trỏ, không cần bảng DP",
        complexity: "O(n · 2^n) nhưng hằng số lớn hơn; bộ nhớ chỉ O(n) thay vì O(n²)",
        note: "Chọn khi n lớn tới mức bảng n×n tốn bộ nhớ, hoặc khi chỉ cần lời giải gọn để trình bày trong 20 phút. Đánh đổi bộ nhớ ↔ tốc độ là câu hỏi phụ gần như chắc chắn được hỏi ở bài này.",
        java: "public List<List<String>> partition(String s) {\n    List<List<String>> res = new ArrayList<>();\n    dfs(s, 0, new ArrayDeque<>(), res);\n    return res;\n}\n\nprivate void dfs(String s, int start, Deque<String> path, List<List<String>> res) {\n    if (start == s.length()) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int end = start; end < s.length(); end++) {\n        if (!isPalindrome(s, start, end)) continue;\n        path.addLast(s.substring(start, end + 1));\n        dfs(s, end + 1, path, res);\n        path.removeLast();\n    }\n}\n\nprivate boolean isPalindrome(String s, int i, int j) {\n    while (i < j) {\n        if (s.charAt(i++) != s.charAt(j--)) return false;\n    }\n    return true;\n}"
      },
      java: "public List<List<String>> partition(String s) {\n    int n = s.length();\n    boolean[][] pal = new boolean[n][n];\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = i; j < n; j++) {\n            pal[i][j] = s.charAt(i) == s.charAt(j)\n                     && (j - i < 2 || pal[i + 1][j - 1]);\n        }\n    }\n\n    List<List<String>> res = new ArrayList<>();\n    dfs(s, 0, pal, new ArrayDeque<>(), res);\n    return res;\n}\n\nprivate void dfs(String s, int start, boolean[][] pal,\n                 Deque<String> path, List<List<String>> res) {\n    if (start == s.length()) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int end = start; end < s.length(); end++) {\n        if (!pal[start][end]) continue;          // tra bảng: O(1)\n        path.addLast(s.substring(start, end + 1));\n        dfs(s, end + 1, pal, path, res);\n        path.removeLast();\n    }\n}",
      js: "function partition(s) {\n  const n = s.length;\n  const pal = Array.from({ length: n }, () => new Array(n).fill(false));\n  for (let i = n - 1; i >= 0; i--) {\n    for (let j = i; j < n; j++) {\n      pal[i][j] = s[i] === s[j] && (j - i < 2 || pal[i + 1][j - 1]);\n    }\n  }\n\n  const res = [], path = [];\n  const dfs = (start) => {\n    if (start === n) { res.push([...path]); return; }\n    for (let end = start; end < n; end++) {\n      if (!pal[start][end]) continue;\n      path.push(s.slice(start, end + 1));\n      dfs(end + 1);\n      path.pop();\n    }\n  };\n\n  dfs(0);\n  return res;\n}"
    },
    {
      name: "Subsets II (tập con khi mảng có phần tử trùng)",
      lc: "90", slug: "subsets-ii", diff: "Trung bình",
      tags: "backtracking subsets duplicate-skip sorting",
      complexity: "O(n · 2^n) — tối đa 2^n tập con, mỗi tập tốn O(n) để sao chép",
      idea: "Giống Subsets (LC 78) nhưng phải chống sinh trùng. Mẹo chuẩn: SẮP XẾP trước, rồi trong vòng lặp bỏ qua phần tử giống hệt phần tử liền trước Ở CÙNG MỘT TẦNG đệ quy (i > start && nums[i] == nums[i-1]).",
      trap: "Điều kiện bỏ qua phải là i > start chứ không phải i > 0. Dùng i > 0 sẽ chặn luôn cả trường hợp hợp lệ khi hai phần tử trùng nằm ở HAI TẦNG khác nhau — [1,1] sẽ không bao giờ sinh ra.",
      examples: [
        { input: "nums = [1,2,2]",
          output: "[[], [1], [1,2], [1,2,2], [2], [2,2]]",
          note: "6 tập chứ không phải 8: hai tập [2] và hai tập [1,2] bị gộp lại. Đúng một nhánh 'chọn số 2 thứ hai mà chưa chọn số 2 thứ nhất' bị chặn." },
        { input: "nums = [4,4,4,1,4] (chưa sắp xếp)",
          output: "sau khi sort thành [1,4,4,4,4] → [[], [1], [1,4], [1,4,4], [1,4,4,4], [1,4,4,4,4], [4], [4,4], [4,4,4], [4,4,4,4]]",
          note: "Không sắp xếp trước thì các phần tử trùng nằm rải rác, điều kiện nums[i] == nums[i-1] vô tác dụng — sort là bước BẮT BUỘC chứ không phải tối ưu." }
      ],
      steps: [
        "Sắp xếp nums tăng dần (bắt buộc).",
        "dfs(start, path): thêm bản sao của path vào kết quả NGAY khi vào hàm (mọi trạng thái đều là một tập con hợp lệ).",
        "Duyệt i từ start tới n-1.",
        "Nếu i > start && nums[i] == nums[i-1] thì continue — chống trùng ở cùng tầng.",
        "Chọn nums[i], gọi dfs(i + 1, path), rồi bỏ chọn.",
        "Không cần điều kiện dừng riêng: vòng lặp tự cạn khi start == n."
      ],
      alt: {
        title: "Cách khác — lặp theo tầng, mỗi số trùng chỉ nối vào tập MỚI sinh ở lượt trước",
        complexity: "O(n · 2^n) — không đệ quy, chống trùng bằng cách kiểm soát khoảng chỉ số",
        note: "Bắt đầu res = [[]]. Với mỗi số: nếu trùng số trước thì chỉ nối vào các tập được sinh ở lượt ngay trước (từ startIdx), còn không thì nối vào toàn bộ res. Cách này nhanh và tránh hoàn toàn stack đệ quy, hợp khi n lớn.",
        java: "public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    res.add(new ArrayList<>());\n\n    int startIdx = 0;\n    for (int i = 0; i < nums.length; i++) {\n        int from = (i > 0 && nums[i] == nums[i - 1]) ? startIdx : 0;\n        int size = res.size();\n        startIdx = size;\n        for (int k = from; k < size; k++) {\n            List<Integer> copy = new ArrayList<>(res.get(k));\n            copy.add(nums[i]);\n            res.add(copy);\n        }\n    }\n    return res;\n}"
      },
      java: "public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);                  // BẮT BUỘC: gom các số trùng lại cạnh nhau\n    List<List<Integer>> res = new ArrayList<>();\n    dfs(nums, 0, new ArrayDeque<>(), res);\n    return res;\n}\n\nprivate void dfs(int[] nums, int start,\n                 Deque<Integer> path, List<List<Integer>> res) {\n    res.add(new ArrayList<>(path));     // mọi trạng thái đều là một tập con\n\n    for (int i = start; i < nums.length; i++) {\n        // i > start (KHÔNG phải i > 0): chỉ chặn trùng ở CÙNG một tầng\n        if (i > start && nums[i] == nums[i - 1]) continue;\n        path.addLast(nums[i]);\n        dfs(nums, i + 1, path, res);\n        path.removeLast();\n    }\n}",
      js: "function subsetsWithDup(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [], path = [];\n\n  const dfs = (start) => {\n    res.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      if (i > start && nums[i] === nums[i - 1]) continue;\n      path.push(nums[i]);\n      dfs(i + 1);\n      path.pop();\n    }\n  };\n\n  dfs(0);\n  return res;\n}"
    },
    {
      name: "N-Queens (xếp N quân hậu)",
      lc: "51", slug: "n-queens", diff: "Khó",
      tags: "backtracking pruning diagonal hard classic",
      complexity: "O(n!) trong xấu nhất nhưng cắt nhánh mạnh — bộ nhớ O(n) nếu đánh dấu bằng ba tập",
      idea: "Đặt mỗi hàng đúng một quân hậu, duyệt lần lượt từng hàng. Mấu chốt là kiểm tra xung đột trong O(1): cột dùng cols, đường chéo chính dùng (row - col), đường chéo phụ dùng (row + col).",
      trap: "row - col có thể ÂM nên nếu dùng mảng boolean phải cộng thêm n để dời chỉ số (index = row - col + n). Dùng HashSet<Integer> thì không cần lo, và cũng dễ đọc hơn khi trình bày trên bảng.",
      examples: [
        { input: "n = 4",
          output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"], [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
          note: "Đúng 2 lời giải và chúng là ảnh gương của nhau. Với n = 2 và n = 3 thì kết quả là rỗng — ca biên đáng nhắc khi trình bày." },
        { input: "n = 1",
          output: "[[\"Q\"]]",
          note: "Một quân hậu một ô, luôn hợp lệ. Số lời giải theo n là 1, 0, 0, 2, 10, 4, 40, 92... — biết dãy này giúp bạn tự kiểm tra code nhanh." }
      ],
      steps: [
        "Giữ mảng queenCol[row] = cột đặt hậu ở hàng row.",
        "Ba Set<Integer>: cols (cột đã dùng), diag1 (row - col), diag2 (row + col).",
        "dfs(row): nếu row == n thì dựng bàn cờ từ queenCol và thêm vào kết quả.",
        "Duyệt col từ 0 tới n-1: nếu cols/diag1/diag2 đã chứa thì bỏ qua.",
        "Đặt hậu: ghi queenCol[row] = col và thêm vào ba tập.",
        "Đệ quy dfs(row + 1), xong thì gỡ khỏi ba tập (quay lui).",
        "Biến thể N-Queens II chỉ ĐẾM số cách — bỏ phần dựng chuỗi, chỉ tăng biến đếm."
      ],
      alt: {
        title: "Cách khác — dùng bitmask thay ba HashSet",
        complexity: "Cùng O(n!) nhưng nhanh hơn nhiều lần trong thực tế, bộ nhớ O(1) ngoài stack",
        note: "Mỗi trạng thái nén thành ba số nguyên bit. available = ~(cols | d1 | d2) & mask cho ngay các cột còn trống; lấy bit thấp nhất bằng p = available & -available. Đây là bản chạy nhanh nhất và là điểm nhấn kỹ thuật rất đáng khoe nếu còn thời gian trong buổi phỏng vấn.",
        java: "public int totalNQueens(int n) {\n    return dfs(n, 0, 0, 0, (1 << n) - 1);\n}\n\nprivate int dfs(int n, int cols, int d1, int d2, int mask) {\n    if (cols == mask) return 1;              // đã đủ n cột -> một lời giải\n    int count = 0;\n    int available = ~(cols | d1 | d2) & mask;\n    while (available != 0) {\n        int p = available & -available;      // lấy bit 1 thấp nhất\n        available -= p;\n        count += dfs(n,\n                     cols | p,\n                     ((d1 | p) << 1) & mask,\n                     ((d2 | p) >> 1) & mask,\n                     mask);\n    }\n    return count;\n}"
      },
      java: "public List<List<String>> solveNQueens(int n) {\n    List<List<String>> res = new ArrayList<>();\n    int[] queenCol = new int[n];\n    Set<Integer> cols = new HashSet<>();\n    Set<Integer> diag1 = new HashSet<>();   // row - col\n    Set<Integer> diag2 = new HashSet<>();   // row + col\n\n    dfs(0, n, queenCol, cols, diag1, diag2, res);\n    return res;\n}\n\nprivate void dfs(int row, int n, int[] queenCol,\n                 Set<Integer> cols, Set<Integer> diag1, Set<Integer> diag2,\n                 List<List<String>> res) {\n    if (row == n) {\n        List<String> board = new ArrayList<>(n);\n        for (int r = 0; r < n; r++) {\n            char[] line = new char[n];\n            Arrays.fill(line, '.');\n            line[queenCol[r]] = 'Q';\n            board.add(new String(line));\n        }\n        res.add(board);\n        return;\n    }\n\n    for (int col = 0; col < n; col++) {\n        if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) continue;\n\n        queenCol[row] = col;\n        cols.add(col); diag1.add(row - col); diag2.add(row + col);\n\n        dfs(row + 1, n, queenCol, cols, diag1, diag2, res);\n\n        cols.remove(col); diag1.remove(row - col); diag2.remove(row + col);\n    }\n}",
      js: "function solveNQueens(n) {\n  const res = [], queenCol = new Array(n).fill(0);\n  const cols = new Set(), diag1 = new Set(), diag2 = new Set();\n\n  const dfs = (row) => {\n    if (row === n) {\n      res.push(queenCol.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;\n\n      queenCol[row] = col;\n      cols.add(col); diag1.add(row - col); diag2.add(row + col);\n\n      dfs(row + 1);\n\n      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);\n    }\n  };\n\n  dfs(0);\n  return res;\n}"
    }
  ]
}
];
