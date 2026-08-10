// Big Tech — Cây nhị phân hay hỏi + Đồ thị nâng cao (Dijkstra / MST / Bellman-Ford).
// Dùng: node tools/algo_append.js tools/patch/bigtech2.js
module.exports = [
{
  group: "Big Tech — Cây nhị phân hay hỏi",
  items: [
    {
      name: "Same Tree (hai cây có giống nhau không)",
      lc: "100", slug: "same-tree", diff: "Dễ",
      tags: "tree dfs recursion base-case",
      complexity: "O(n) thời gian, O(h) bộ nhớ stack đệ quy (h là chiều cao cây)",
      idea: "Bài khởi động kinh điển để kiểm tra bạn xử lý ca biên null có sạch không. Hai cây giống nhau khi: cùng null, hoặc cùng khác null + cùng giá trị + con trái giống nhau + con phải giống nhau.",
      trap: "Thứ tự ba điều kiện null rất quan trọng: kiểm tra CẢ HAI null trước, rồi MỘT trong hai null, cuối cùng mới so giá trị. Đảo thứ tự là ăn NullPointerException.",
      examples: [
        { input: "p = [1,2,3], q = [1,2,3]",
          output: "true",
          note: "Duyệt song song hai cây, mọi cặp nút khớp và cùng chạm null ở cùng vị trí." },
        { input: "p = [1,2], q = [1,null,2]",
          output: "false",
          note: "Cùng tập giá trị nhưng CẤU TRÚC khác: 2 nằm bên trái ở cây p, bên phải ở cây q. Đây là ca test cho thấy so sánh theo tập giá trị là sai." }
      ],
      steps: [
        "Nếu p == null && q == null thì trả true.",
        "Nếu p == null || q == null thì trả false (một bên hết, một bên còn).",
        "Nếu p.val != q.val thì trả false.",
        "Trả về isSameTree(p.left, q.left) && isSameTree(p.right, q.right).",
        "Toán tử && short-circuit nên nhánh trái sai thì dừng ngay, không duyệt nhánh phải."
      ],
      alt: {
        title: "Cách khác — duyệt lặp bằng một hàng đợi cặp nút",
        complexity: "O(n) thời gian, O(n) bộ nhớ queue — tránh tràn stack với cây lệch rất sâu",
        note: "Với cây suy biến thành danh sách 10^5 nút, đệ quy sẽ StackOverflowError. Bản lặp nhét từng CẶP (a, b) vào queue rồi so sánh khi lấy ra. Chủ động nêu giới hạn chiều sâu đệ quy là điểm cộng.",
        java: "public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> queue = new ArrayDeque<>();\n    queue.add(new TreeNode[]{p, q});\n\n    while (!queue.isEmpty()) {\n        TreeNode[] pair = queue.poll();\n        TreeNode a = pair[0], b = pair[1];\n\n        if (a == null && b == null) continue;\n        if (a == null || b == null) return false;\n        if (a.val != b.val) return false;\n\n        queue.add(new TreeNode[]{a.left, b.left});\n        queue.add(new TreeNode[]{a.right, b.right});\n    }\n    return true;\n}"
      },
      java: "public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;   // cùng hết -> giống\n    if (p == null || q == null) return false;  // một bên hết -> khác\n    if (p.val != q.val) return false;\n\n    return isSameTree(p.left, q.left)\n        && isSameTree(p.right, q.right);\n}",
      js: "function isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q) return false;\n  if (p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}"
    },
    {
      name: "Subtree of Another Tree (cây con của cây khác)",
      lc: "572", slug: "subtree-of-another-tree", diff: "Dễ",
      tags: "tree dfs same-tree serialization kmp",
      complexity: "O(m·n) với cách ngây thơ; O(m+n) nếu tuần tự hóa rồi tìm chuỗi con bằng KMP",
      idea: "Dùng lại isSameTree (LC 100): duyệt mọi nút của cây lớn, tại mỗi nút thử xem cây con bắt đầu từ đó có TRÙNG KHỚP HOÀN TOÀN với subRoot không. Bài này là ví dụ đẹp về việc ghép hai bài nhỏ thành một bài lớn.",
      trap: "Nhầm 'cây con' (subtree) với 'cây con bộ phận' (subgraph): subtree phải lấy TRỌN VẸN nút đó và toàn bộ hậu duệ, không được cắt bớt lá. Vì vậy phải so bằng isSameTree chứ không phải chỉ khớp một phần.",
      examples: [
        { input: "root = [3,4,5,1,2], subRoot = [4,1,2]",
          output: "true",
          note: "Tại nút 4 của cây lớn, cây con trọn vẹn [4,1,2] khớp hoàn toàn với subRoot." },
        { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
          output: "false",
          note: "Nút 2 giờ có thêm con là 0, nên cây con tại nút 4 là [4,1,2,null,null,0] — dư một nút nên KHÔNG khớp. Đây chính là ca phân biệt subtree với 'khớp một phần'." }
      ],
      steps: [
        "Nếu root == null thì trả false (subRoot theo đề luôn khác null).",
        "Nếu isSameTree(root, subRoot) thì trả true ngay.",
        "Ngược lại trả isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot).",
        "isSameTree viết y hệt LC 100.",
        "Tối ưu nhỏ: nếu chiều cao cây con hiện tại < chiều cao subRoot thì bỏ qua luôn."
      ],
      alt: {
        title: "Cách khác — tuần tự hóa cả hai cây rồi tìm chuỗi con (KMP)",
        complexity: "O(m + n) — nhanh hơn hẳn khi cả hai cây đều lớn",
        note: "Duyệt preorder có ĐÁNH DẤU null (ví dụ '#') để chuỗi biểu diễn cây là duy nhất, thêm dấu phân cách trước mỗi giá trị để '12' không khớp nhầm với '2'. Sau đó bài toán thành 'chuỗi B có là chuỗi con của chuỗi A không'. Đây là câu trả lời gây ấn tượng khi người phỏng vấn hỏi 'làm tốt hơn O(m·n) được không?'.",
        java: "public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    String a = serialize(root);\n    String b = serialize(subRoot);\n    return a.contains(b);   // thay bằng KMP nếu muốn O(m+n) đảm bảo\n}\n\nprivate String serialize(TreeNode node) {\n    StringBuilder sb = new StringBuilder();\n    dfs(node, sb);\n    return sb.toString();\n}\n\nprivate void dfs(TreeNode node, StringBuilder sb) {\n    if (node == null) { sb.append(\",#\"); return; }\n    sb.append(',').append(node.val);   // dấu ',' chống 12 khớp nhầm với 2\n    dfs(node.left, sb);\n    dfs(node.right, sb);\n}"
      },
      java: "public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    if (root == null) return false;\n    if (isSameTree(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot)\n        || isSubtree(root.right, subRoot);\n}\n\nprivate boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null) return false;\n    if (p.val != q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
      js: "function isSubtree(root, subRoot) {\n  const same = (p, q) => {\n    if (!p && !q) return true;\n    if (!p || !q) return false;\n    if (p.val !== q.val) return false;\n    return same(p.left, q.left) && same(p.right, q.right);\n  };\n\n  if (!root) return false;\n  if (same(root, subRoot)) return true;\n  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}"
    },
    {
      name: "Binary Tree Right Side View (nhìn cây từ bên phải)",
      lc: "199", slug: "binary-tree-right-side-view", diff: "Trung bình",
      tags: "tree bfs level-order dfs",
      complexity: "O(n) thời gian, O(chiều rộng lớn nhất) bộ nhớ với BFS",
      idea: "Đứng bên phải nhìn vào thì mỗi TẦNG chỉ thấy đúng một nút — nút ngoài cùng bên phải. Vậy chỉ cần BFS theo tầng và lấy phần tử CUỐI của mỗi tầng.",
      trap: "Nhiều người nhầm là 'đi men theo cạnh phải' (cứ node.right mà đi). Sai khi cây lệch: nếu tầng nào đó không có nút bên phải thì nút bên trái sẽ lộ ra và phải được tính.",
      examples: [
        { input: "root = [1,2,3,null,5,null,4]",
          output: "[1,3,4]",
          note: "Tầng 0 thấy 1, tầng 1 thấy 3 (che mất 2), tầng 2 thấy 4 (che mất 5)." },
        { input: "root = [1,2,3,4]",
          output: "[1,3,4]",
          note: "Tầng 2 chỉ có duy nhất nút 4 nằm bên TRÁI (con trái của 2) — vẫn nhìn thấy vì không có gì che. Đi men cạnh phải sẽ ra [1,3] và SAI." }
      ],
      steps: [
        "Nếu root == null thì trả danh sách rỗng.",
        "Đưa root vào queue.",
        "Vòng ngoài: while queue chưa rỗng, lấy size = queue.size() (số nút của tầng hiện tại).",
        "Vòng trong chạy đúng size lần: poll từng nút, nếu là nút CUỐI (i == size-1) thì thêm giá trị vào kết quả.",
        "Đẩy node.left rồi node.right vào queue (nếu khác null).",
        "Biến thể left side view: chỉ đổi điều kiện thành i == 0."
      ],
      alt: {
        title: "Cách khác — DFS ưu tiên đi PHẢI trước, mỗi độ sâu chỉ ghi nút đầu tiên gặp",
        complexity: "O(n) thời gian, O(h) bộ nhớ — tốn ít bộ nhớ hơn BFS khi cây rất rộng",
        note: "Duyệt right trước left; khi depth == res.size() nghĩa là lần đầu chạm độ sâu này, và vì đi phải trước nên nút đó chính là nút ngoài cùng bên phải. Kỹ thuật 'lần đầu chạm độ sâu' này dùng lại được cho bài tìm nút trái nhất tầng đáy.",
        java: "public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    dfs(root, 0, res);\n    return res;\n}\n\nprivate void dfs(TreeNode node, int depth, List<Integer> res) {\n    if (node == null) return;\n    if (depth == res.size()) res.add(node.val);  // lần đầu chạm tầng này\n    dfs(node.right, depth + 1, res);             // PHẢI trước\n    dfs(node.left, depth + 1, res);\n}"
      },
      java: "public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    if (root == null) return res;\n\n    Deque<TreeNode> queue = new ArrayDeque<>();\n    queue.add(root);\n\n    while (!queue.isEmpty()) {\n        int size = queue.size();               // chốt số nút của tầng hiện tại\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            if (i == size - 1) res.add(node.val);   // nút cuối tầng = nhìn thấy\n            if (node.left != null) queue.add(node.left);\n            if (node.right != null) queue.add(node.right);\n        }\n    }\n    return res;\n}",
      js: "function rightSideView(root) {\n  const res = [];\n  if (!root) return res;\n\n  let queue = [root];\n  while (queue.length) {\n    const next = [];\n    res.push(queue[queue.length - 1].val);   // nút cuối tầng\n    for (const node of queue) {\n      if (node.left) next.push(node.left);\n      if (node.right) next.push(node.right);\n    }\n    queue = next;\n  }\n  return res;\n}"
    },
    {
      name: "Count Good Nodes in Binary Tree (đếm nút tốt)",
      lc: "1448", slug: "count-good-nodes-in-binary-tree", diff: "Trung bình",
      tags: "tree dfs preorder max-so-far",
      complexity: "O(n) thời gian, O(h) bộ nhớ đệ quy",
      idea: "Nút X là 'tốt' nếu trên đường đi từ gốc tới X không có nút nào LỚN HƠN X. Chỉ cần truyền xuống giá trị LỚN NHẤT đã gặp trên đường đi — một tham số duy nhất, không cần lưu cả đường.",
      trap: "Điều kiện là node.val >= maxSoFar (lớn hơn HOẶC BẰNG), không phải >. Nút bằng đúng giá trị lớn nhất trên đường vẫn được tính là tốt — đọc kỹ đề, đây là chỗ mất điểm oan.",
      examples: [
        { input: "root = [3,1,4,3,null,1,5]",
          output: "4",
          note: "Nút tốt: gốc 3, nút 4, nút 3 (con trái của 1, bằng max nên vẫn tính), nút 5. Nút 1 và nút 1 bên phải đều bị 3 và 4 chặn." },
        { input: "root = [3,3,null,4,2]",
          output: "3",
          note: "Gốc 3, con 3 (bằng max nên tốt), rồi 4 (lớn hơn 3 nên tốt). Nút 2 thua max = 4 nên không tốt. Nếu viết dấu > thay vì >= sẽ ra 2 và sai." }
      ],
      steps: [
        "Gọi dfs(root, root.val) — max ban đầu chính là giá trị gốc.",
        "Trong dfs: nếu node == null thì trả 0.",
        "count = (node.val >= max) ? 1 : 0.",
        "Cập nhật max mới = Math.max(max, node.val).",
        "Trả về count + dfs(node.left, maxMới) + dfs(node.right, maxMới).",
        "Không cần biến toàn cục — hàm tự trả về số đếm của cây con."
      ],
      alt: {
        title: "Cách khác — BFS mang theo max trong hàng đợi",
        complexity: "O(n) thời gian, O(chiều rộng) bộ nhớ — không dùng đệ quy",
        note: "Đẩy vào queue một cặp (nút, max trên đường tới nút đó). Hữu ích khi cây rất sâu (10^5 nút lệch một bên) làm đệ quy tràn stack. Ý tưởng 'mang trạng thái theo cùng nút trong queue' áp dụng được cho hầu hết bài cây cần thông tin từ tổ tiên.",
        java: "public int goodNodes(TreeNode root) {\n    if (root == null) return 0;\n    Deque<Object[]> queue = new ArrayDeque<>();\n    queue.add(new Object[]{root, root.val});\n    int count = 0;\n\n    while (!queue.isEmpty()) {\n        Object[] cur = queue.poll();\n        TreeNode node = (TreeNode) cur[0];\n        int max = (int) cur[1];\n\n        if (node.val >= max) count++;\n        int newMax = Math.max(max, node.val);\n\n        if (node.left != null)  queue.add(new Object[]{node.left, newMax});\n        if (node.right != null) queue.add(new Object[]{node.right, newMax});\n    }\n    return count;\n}"
      },
      java: "public int goodNodes(TreeNode root) {\n    return dfs(root, root.val);\n}\n\nprivate int dfs(TreeNode node, int max) {\n    if (node == null) return 0;\n\n    int count = node.val >= max ? 1 : 0;   // >= chứ KHÔNG phải >\n    int newMax = Math.max(max, node.val);\n\n    return count\n         + dfs(node.left, newMax)\n         + dfs(node.right, newMax);\n}",
      js: "function goodNodes(root) {\n  const dfs = (node, max) => {\n    if (!node) return 0;\n    const count = node.val >= max ? 1 : 0;\n    const newMax = Math.max(max, node.val);\n    return count + dfs(node.left, newMax) + dfs(node.right, newMax);\n  };\n  return dfs(root, root.val);\n}"
    },
    {
      name: "Lowest Common Ancestor of a Binary Tree (LCA cây thường)",
      lc: "236", slug: "lowest-common-ancestor-of-a-binary-tree", diff: "Trung bình",
      tags: "tree dfs postorder lca classic",
      complexity: "O(n) thời gian, O(h) bộ nhớ đệ quy",
      idea: "Khác LCA của BST (LC 235) vì không có thứ tự để so sánh. Khuôn chuẩn: đệ quy xuống hai nhánh, nếu CẢ HAI nhánh đều trả về khác null thì nút hiện tại chính là LCA; nếu chỉ một nhánh có thì đẩy kết quả nhánh đó lên.",
      trap: "Đề giả định cả p và q ĐỀU TỒN TẠI trong cây. Nếu không có giả định đó, code này sẽ trả về p khi q không tồn tại — muốn đúng phải duyệt hết cây và đếm xem đã tìm thấy đủ hai nút chưa.",
      examples: [
        { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
          output: "3",
          note: "5 nằm nhánh trái, 1 nằm nhánh phải nên gốc 3 là điểm hội tụ — đúng trường hợp 'cả hai nhánh cùng trả về khác null'." },
        { input: "cùng cây, p = 5, q = 4",
          output: "5",
          note: "4 là hậu duệ của 5. Theo định nghĩa đề, một nút CÓ THỂ là tổ tiên của chính nó — nhánh trái trả về 5 rồi truyền thẳng lên, nhánh phải trả null." }
      ],
      steps: [
        "Nếu root == null hoặc root == p hoặc root == q thì trả về root.",
        "left = lowestCommonAncestor(root.left, p, q).",
        "right = lowestCommonAncestor(root.right, p, q).",
        "Nếu left != null && right != null thì root chính là LCA — trả root.",
        "Ngược lại trả về bên nào khác null (left != null ? left : right).",
        "Nhận xét: đây là duyệt hậu thứ tự (postorder) — xử lý con trước rồi mới quyết định ở nút cha."
      ],
      alt: {
        title: "Cách khác — dựng map con→cha rồi đi ngược lên bằng tập tổ tiên",
        complexity: "O(n) thời gian, O(n) bộ nhớ — dễ mở rộng khi phải trả lời NHIỀU truy vấn",
        note: "BFS/DFS một lượt để ghi parent của mọi nút, đi từ p lên gốc đánh dấu vào Set, rồi đi từ q lên gặp nút đầu tiên đã đánh dấu. Cách này còn dùng được khi nút có sẵn con trỏ parent (biến thể LC 1650) hoặc khi cần trả lời hàng nghìn cặp (p, q) — lúc đó tiến lên binary lifting O(log n) mỗi truy vấn.",
        java: "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n        TreeNode node = stack.pop();\n        if (node.left != null)  { parent.put(node.left, node);  stack.push(node.left); }\n        if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    for (TreeNode n = p; n != null; n = parent.get(n)) ancestors.add(n);\n    for (TreeNode n = q; n != null; n = parent.get(n)) {\n        if (ancestors.contains(n)) return n;\n    }\n    return null;\n}"
      },
      java: "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n\n    TreeNode left  = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n\n    if (left != null && right != null) return root;  // hội tụ tại đây\n    return left != null ? left : right;              // đẩy kết quả lên trên\n}",
      js: "function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n\n  if (left && right) return root;\n  return left || right;\n}"
    }
  ]
},
{
  group: "Big Tech — Đồ thị nâng cao & đường đi ngắn nhất",
  items: [
    {
      name: "Word Ladder (biến đổi từ này thành từ kia)",
      lc: "127", slug: "word-ladder", diff: "Khó",
      tags: "bfs shortest-path graph wildcard hard",
      complexity: "O(N · L²) với N là số từ, L là độ dài từ — mỗi từ sinh L mẫu, mỗi mẫu tốn O(L) để dựng",
      idea: "Coi mỗi từ là một đỉnh, hai từ khác nhau ĐÚNG một ký tự thì có cạnh. Đường ngắn nhất trên đồ thị KHÔNG trọng số thì dùng BFS. Mẹo dựng cạnh nhanh: thay từng vị trí bằng '*' để tạo khóa chung, ví dụ hot → *ot, h*t, ho*.",
      trap: "Đừng so từng cặp từ với nhau (O(N²·L)). Và phải kiểm tra endWord có nằm trong wordList không — nếu không thì trả 0 ngay, khỏi chạy BFS.",
      examples: [
        { input: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
          output: "5",
          note: "hit → hot → dot → dog → cog, đếm SỐ TỪ trong dãy (5) chứ không phải số bước biến đổi (4) — đọc kỹ đề chỗ này." },
        { input: "cùng beginWord/endWord, wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
          output: "0",
          note: "endWord \"cog\" không có trong từ điển nên không thể tới đích. Chặn ca này ngay đầu hàm để khỏi chạy BFS vô ích." }
      ],
      steps: [
        "Đưa wordList vào Set để tra O(1); nếu không chứa endWord thì trả 0.",
        "Dựng Map<String, List<String>>: với mỗi từ và mỗi vị trí i, tạo khóa word[0..i-1] + '*' + word[i+1..] và gom từ vào đó.",
        "BFS từ beginWord với queue và visited, mức bắt đầu là 1.",
        "Lấy từ ra khỏi queue, sinh L mẫu '*' của nó, lấy mọi hàng xóm từ map.",
        "Gặp endWord thì trả về level + 1 ngay.",
        "Hàng xóm chưa thăm thì đánh dấu và đẩy vào queue với level + 1."
      ],
      alt: {
        title: "Cách khác — BFS hai đầu (bidirectional BFS)",
        complexity: "Vẫn O(N·L²) nhưng thực tế nhanh hơn nhiều lần vì hai mặt sóng gặp nhau ở giữa",
        note: "Chạy BFS đồng thời từ beginWord và endWord, mỗi vòng luôn mở rộng tập NHỎ HƠN. Số đỉnh phải duyệt giảm từ b^d xuống 2·b^(d/2). Đây là câu trả lời 'còn tối ưu nữa được không?' và là kỹ thuật rất đáng nhớ vì dùng lại được cho mọi bài BFS có đích xác định.",
        java: "public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n\n    Set<String> head = new HashSet<>(List.of(beginWord));\n    Set<String> tail = new HashSet<>(List.of(endWord));\n    int level = 1;\n\n    while (!head.isEmpty() && !tail.isEmpty()) {\n        if (head.size() > tail.size()) {   // luôn mở rộng tập NHỎ hơn\n            Set<String> tmp = head; head = tail; tail = tmp;\n        }\n        Set<String> next = new HashSet<>();\n        for (String word : head) {\n            char[] arr = word.toCharArray();\n            for (int i = 0; i < arr.length; i++) {\n                char old = arr[i];\n                for (char c = 'a'; c <= 'z'; c++) {\n                    arr[i] = c;\n                    String cand = new String(arr);\n                    if (tail.contains(cand)) return level + 1;\n                    if (dict.remove(cand)) next.add(cand);\n                }\n                arr[i] = old;\n            }\n        }\n        head = next;\n        level++;\n    }\n    return 0;\n}"
      },
      java: "public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n\n    int L = beginWord.length();\n    // Gom các từ theo mẫu có dấu '*': hot -> *ot, h*t, ho*\n    Map<String, List<String>> buckets = new HashMap<>();\n    for (String word : dict) {\n        for (int i = 0; i < L; i++) {\n            String key = word.substring(0, i) + '*' + word.substring(i + 1);\n            buckets.computeIfAbsent(key, k -> new ArrayList<>()).add(word);\n        }\n    }\n\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.add(beginWord);\n    visited.add(beginWord);\n    int level = 1;\n\n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        for (int s = 0; s < size; s++) {\n            String word = queue.poll();\n            for (int i = 0; i < L; i++) {\n                String key = word.substring(0, i) + '*' + word.substring(i + 1);\n                for (String next : buckets.getOrDefault(key, List.of())) {\n                    if (next.equals(endWord)) return level + 1;\n                    if (visited.add(next)) queue.add(next);\n                }\n            }\n        }\n        level++;\n    }\n    return 0;\n}",
      js: "function ladderLength(beginWord, endWord, wordList) {\n  const dict = new Set(wordList);\n  if (!dict.has(endWord)) return 0;\n\n  const L = beginWord.length;\n  const buckets = new Map();\n  for (const word of dict) {\n    for (let i = 0; i < L; i++) {\n      const key = word.slice(0, i) + '*' + word.slice(i + 1);\n      if (!buckets.has(key)) buckets.set(key, []);\n      buckets.get(key).push(word);\n    }\n  }\n\n  const visited = new Set([beginWord]);\n  let queue = [beginWord], level = 1;\n\n  while (queue.length) {\n    const next = [];\n    for (const word of queue) {\n      for (let i = 0; i < L; i++) {\n        const key = word.slice(0, i) + '*' + word.slice(i + 1);\n        for (const cand of buckets.get(key) || []) {\n          if (cand === endWord) return level + 1;\n          if (!visited.has(cand)) { visited.add(cand); next.push(cand); }\n        }\n      }\n    }\n    queue = next;\n    level++;\n  }\n  return 0;\n}"
    },
    {
      name: "Alien Dictionary (thứ tự bảng chữ cái ngoài hành tinh)",
      lc: "269", slug: "alien-dictionary", diff: "Khó",
      tags: "topological-sort graph kahn bfs hard",
      complexity: "O(tổng số ký tự) thời gian — số đỉnh tối đa 26 nên phần sắp xếp tô-pô gần như hằng số",
      idea: "So từng CẶP TỪ LIỀN NHAU, tìm vị trí ký tự đầu tiên khác nhau — đó là một ràng buộc 'ký tự A đứng trước ký tự B'. Tập ràng buộc tạo thành DAG, đáp án là một thứ tự tô-pô của DAG đó.",
      trap: "Ca biên chết người: nếu từ TRƯỚC dài hơn từ SAU và từ sau là tiền tố của nó (\"abcd\" rồi \"ab\") thì đầu vào KHÔNG hợp lệ — phải trả về chuỗi rỗng. Rất nhiều người quên ca này và chỉ bị phát hiện ở test ẩn.",
      examples: [
        { input: "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
          output: "\"wertf\"",
          note: "Từ (wrt, wrf) suy ra t < f; (wrf, er) suy ra w < e; (er, ett) suy ra r < t; (ett, rftt) suy ra e < r. Ghép lại được w → e → r → t → f." },
        { input: "words = [\"abc\",\"ab\"]",
          output: "\"\"",
          note: "Từ dài đứng TRƯỚC tiền tố của nó là mâu thuẫn với mọi thứ tự từ điển — phải trả rỗng chứ không phải bỏ qua. Ca này và ca có chu trình là hai lý do duy nhất trả về rỗng." }
      ],
      steps: [
        "Khởi tạo indegree = 0 cho MỌI ký tự xuất hiện trong words (kể cả ký tự không có ràng buộc nào).",
        "Duyệt từng cặp từ liền nhau (w1, w2), so từng ký tự tới min độ dài.",
        "Gặp vị trí đầu tiên khác nhau: thêm cạnh w1[i] → w2[i], tăng indegree của w2[i], rồi break.",
        "Nếu duyệt hết min độ dài mà không khác nhau và w1.length > w2.length thì trả \"\" (đầu vào sai).",
        "Kahn BFS: nạp mọi ký tự có indegree 0 vào queue, lấy ra ghi vào kết quả, giảm indegree hàng xóm.",
        "Cuối cùng nếu độ dài kết quả != số ký tự phân biệt thì có chu trình — trả \"\"."
      ],
      alt: {
        title: "Cách khác — sắp xếp tô-pô bằng DFS tô 3 màu",
        complexity: "Cùng O(tổng ký tự), kết quả là thứ tự hậu duyệt ĐẢO NGƯỢC",
        note: "DFS gán mỗi đỉnh một trong ba trạng thái: chưa thăm / đang trong stack đệ quy (xám) / đã xong (đen). Gặp lại đỉnh xám nghĩa là có chu trình. Ưu điểm: không cần đếm indegree; nhược điểm: phải nhớ đảo ngược kết quả và dễ tràn stack với đồ thị sâu (ở bài này tối đa 26 đỉnh nên vô hại).",
        java: "private Map<Character, Set<Character>> graph = new HashMap<>();\nprivate Map<Character, Integer> state = new HashMap<>(); // 0 chưa, 1 xám, 2 đen\nprivate StringBuilder sb = new StringBuilder();\n\npublic String alienOrder(String[] words) {\n    for (String w : words)\n        for (char c : w.toCharArray())\n            graph.putIfAbsent(c, new HashSet<>());\n\n    for (int i = 0; i + 1 < words.length; i++) {\n        String a = words[i], b = words[i + 1];\n        int min = Math.min(a.length(), b.length());\n        if (a.length() > b.length() && a.startsWith(b)) return \"\";\n        for (int k = 0; k < min; k++) {\n            if (a.charAt(k) != b.charAt(k)) {\n                graph.get(a.charAt(k)).add(b.charAt(k));\n                break;\n            }\n        }\n    }\n\n    for (char c : graph.keySet()) {\n        if (!dfs(c)) return \"\";\n    }\n    return sb.reverse().toString();   // hậu duyệt ĐẢO NGƯỢC\n}\n\nprivate boolean dfs(char c) {\n    int s = state.getOrDefault(c, 0);\n    if (s == 1) return false;   // gặp lại đỉnh XÁM -> chu trình\n    if (s == 2) return true;\n\n    state.put(c, 1);\n    for (char next : graph.get(c)) {\n        if (!dfs(next)) return false;\n    }\n    state.put(c, 2);\n    sb.append(c);\n    return true;\n}"
      },
      java: "public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    Map<Character, Integer> indegree = new HashMap<>();\n\n    for (String w : words) {\n        for (char c : w.toCharArray()) {\n            graph.putIfAbsent(c, new HashSet<>());\n            indegree.putIfAbsent(c, 0);\n        }\n    }\n\n    for (int i = 0; i + 1 < words.length; i++) {\n        String a = words[i], b = words[i + 1];\n        int min = Math.min(a.length(), b.length());\n\n        // CA BIÊN: \"abcd\" đứng trước \"ab\" là đầu vào không hợp lệ\n        if (a.length() > b.length() && a.startsWith(b)) return \"\";\n\n        for (int k = 0; k < min; k++) {\n            char x = a.charAt(k), y = b.charAt(k);\n            if (x != y) {\n                if (graph.get(x).add(y)) indegree.merge(y, 1, Integer::sum);\n                break;                       // chỉ ký tự khác ĐẦU TIÊN mới có nghĩa\n            }\n        }\n    }\n\n    Deque<Character> queue = new ArrayDeque<>();\n    indegree.forEach((c, d) -> { if (d == 0) queue.add(c); });\n\n    StringBuilder sb = new StringBuilder();\n    while (!queue.isEmpty()) {\n        char c = queue.poll();\n        sb.append(c);\n        for (char next : graph.get(c)) {\n            if (indegree.merge(next, -1, Integer::sum) == 0) queue.add(next);\n        }\n    }\n\n    return sb.length() == indegree.size() ? sb.toString() : \"\";  // thiếu = có chu trình\n}",
      js: "function alienOrder(words) {\n  const graph = new Map(), indegree = new Map();\n  for (const w of words) {\n    for (const c of w) {\n      if (!graph.has(c)) graph.set(c, new Set());\n      if (!indegree.has(c)) indegree.set(c, 0);\n    }\n  }\n\n  for (let i = 0; i + 1 < words.length; i++) {\n    const a = words[i], b = words[i + 1];\n    if (a.length > b.length && a.startsWith(b)) return '';\n    const min = Math.min(a.length, b.length);\n    for (let k = 0; k < min; k++) {\n      if (a[k] !== b[k]) {\n        if (!graph.get(a[k]).has(b[k])) {\n          graph.get(a[k]).add(b[k]);\n          indegree.set(b[k], indegree.get(b[k]) + 1);\n        }\n        break;\n      }\n    }\n  }\n\n  const queue = [];\n  for (const [c, d] of indegree) if (d === 0) queue.push(c);\n\n  let out = '';\n  while (queue.length) {\n    const c = queue.shift();\n    out += c;\n    for (const next of graph.get(c)) {\n      indegree.set(next, indegree.get(next) - 1);\n      if (indegree.get(next) === 0) queue.push(next);\n    }\n  }\n  return out.length === indegree.size ? out : '';\n}"
    },
    {
      name: "Graph Valid Tree (đồ thị có phải là cây không)",
      lc: "261", slug: "graph-valid-tree", diff: "Trung bình",
      tags: "union-find dfs graph tree-property",
      complexity: "O(n·α(n)) với Union-Find — gần như O(n)",
      idea: "Một đồ thị vô hướng n đỉnh là CÂY khi và chỉ khi thỏa CẢ HAI: có đúng n-1 cạnh, và liên thông (hoặc tương đương: không có chu trình). Chỉ thỏa một điều kiện là chưa đủ.",
      trap: "Kiểm tra mỗi 'không có chu trình' là sai (rừng nhiều cây rời rạc cũng không có chu trình). Kiểm tra mỗi 'liên thông' cũng sai (đồ thị liên thông có chu trình không phải cây). Mẹo nhanh: n-1 cạnh + liên thông là đủ.",
      examples: [
        { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
          output: "true",
          note: "4 cạnh = n-1 và mọi đỉnh nối được với nhau — union 4 lần đều thành công, cuối cùng còn đúng 1 thành phần." },
        { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
          output: "false",
          note: "5 cạnh > n-1 = 4 nên loại ngay từ dòng đầu. Nếu vẫn chạy Union-Find thì cạnh [1,3] sẽ nối hai đỉnh ĐÃ CÙNG nhóm — dấu hiệu chu trình." }
      ],
      steps: [
        "Nếu edges.length != n - 1 thì trả false ngay (điều kiện cần).",
        "Khởi tạo Union-Find với n phần tử, parent[i] = i.",
        "Với mỗi cạnh (a, b): tìm gốc của a và b.",
        "Nếu hai gốc TRÙNG nhau thì có chu trình — trả false.",
        "Ngược lại hợp nhất hai nhóm.",
        "Chạy hết mà không có chu trình + đúng n-1 cạnh thì chắc chắn liên thông — trả true."
      ],
      alt: {
        title: "Cách khác — DFS đếm số đỉnh thăm được từ đỉnh 0",
        complexity: "O(n + e) thời gian, O(n + e) bộ nhớ cho danh sách kề",
        note: "Dựng danh sách kề, DFS từ đỉnh 0, cuối cùng kiểm tra visited.size() == n. Vẫn phải giữ điều kiện edges.length == n-1 ở đầu. Cách này trực quan hơn khi giải thích trên bảng và tái sử dụng được code DFS quen thuộc.",
        java: "public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n\n    List<List<Integer>> adj = new ArrayList<>();\n    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n    for (int[] e : edges) {\n        adj.get(e[0]).add(e[1]);\n        adj.get(e[1]).add(e[0]);\n    }\n\n    boolean[] visited = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    visited[0] = true;\n    int seen = 1;\n\n    while (!stack.isEmpty()) {\n        int u = stack.pop();\n        for (int v : adj.get(u)) {\n            if (!visited[v]) {\n                visited[v] = true;\n                seen++;\n                stack.push(v);\n            }\n        }\n    }\n    return seen == n;   // liên thông\n}"
      },
      java: "public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;   // điều kiện CẦN, loại sớm\n\n    int[] parent = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n\n    for (int[] e : edges) {\n        int ra = find(parent, e[0]);\n        int rb = find(parent, e[1]);\n        if (ra == rb) return false;            // đã cùng nhóm -> chu trình\n        parent[ra] = rb;\n    }\n    return true;\n}\n\nprivate int find(int[] parent, int x) {\n    while (parent[x] != x) {\n        parent[x] = parent[parent[x]];   // nén đường một nửa\n        x = parent[x];\n    }\n    return x;\n}",
      js: "function validTree(n, edges) {\n  if (edges.length !== n - 1) return false;\n\n  const parent = Array.from({ length: n }, (_, i) => i);\n  const find = (x) => {\n    while (parent[x] !== x) {\n      parent[x] = parent[parent[x]];\n      x = parent[x];\n    }\n    return x;\n  };\n\n  for (const [a, b] of edges) {\n    const ra = find(a), rb = find(b);\n    if (ra === rb) return false;\n    parent[ra] = rb;\n  }\n  return true;\n}"
    },
    {
      name: "Network Delay Time (Dijkstra — đường đi ngắn nhất có trọng số)",
      lc: "743", slug: "network-delay-time", diff: "Trung bình",
      tags: "dijkstra heap shortest-path weighted-graph",
      complexity: "O((V + E) log V) với hàng đợi ưu tiên — bộ nhớ O(V + E)",
      idea: "BFS chỉ đúng khi mọi cạnh có trọng số BẰNG NHAU. Có trọng số dương thì dùng Dijkstra: luôn lấy ra đỉnh có khoảng cách tạm nhỏ nhất (min-heap), 'chốt' nó rồi nới lỏng (relax) các cạnh đi ra.",
      trap: "Đáp án là khoảng cách LỚN NHẤT trong các khoảng cách ngắn nhất (thời điểm tín hiệu tới đỉnh cuối cùng), không phải tổng. Và nếu còn đỉnh nào chưa tới được thì trả -1.",
      examples: [
        { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
          output: "2",
          note: "dist[1]=1, dist[3]=1, dist[4]=2 — lấy MAX = 2. Đây là lúc tín hiệu chạm đỉnh cuối cùng, đúng nghĩa 'thời gian trễ của cả mạng'." },
        { input: "times = [[1,2,1]], n = 2, k = 2",
          output: "-1",
          note: "Xuất phát từ 2 thì không có cạnh nào đi ra, đỉnh 1 vĩnh viễn không tới được. Nhớ kiểm tra mọi đỉnh đều hữu hạn trước khi lấy max." }
      ],
      steps: [
        "Dựng danh sách kề: adj[u] = danh sách (v, w).",
        "Mảng dist[] khởi tạo Integer.MAX_VALUE, dist[k] = 0.",
        "PriorityQueue chứa cặp (khoảng cách, đỉnh), sắp theo khoảng cách tăng dần; nạp (0, k).",
        "Lấy cặp nhỏ nhất; nếu d > dist[u] thì bỏ qua (bản lỗi thời — lazy deletion).",
        "Với mỗi cạnh (u → v, w): nếu d + w < dist[v] thì cập nhật và đẩy (dist[v], v) vào heap.",
        "Cuối cùng lấy max của dist[1..n]; nếu có giá trị nào còn MAX_VALUE thì trả -1."
      ],
      alt: {
        title: "Cách khác — Bellman-Ford (lặp V-1 lần nới lỏng mọi cạnh)",
        complexity: "O(V·E) — chậm hơn nhưng CHẤP NHẬN cạnh âm và phát hiện được chu trình âm",
        note: "Dijkstra sai khi có cạnh trọng số âm (đỉnh đã 'chốt' có thể vẫn được cải thiện sau). Bellman-Ford lặp V-1 vòng nới lỏng tất cả cạnh, nếu vòng thứ V vẫn cải thiện được thì tồn tại chu trình âm. Biết chọn thuật toán theo tính chất trọng số là điểm phân biệt ứng viên khá với giỏi.",
        java: "public int networkDelayTime(int[][] times, int n, int k) {\n    final int INF = Integer.MAX_VALUE / 2;\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, INF);\n    dist[k] = 0;\n\n    for (int i = 0; i < n - 1; i++) {        // V-1 vòng\n        boolean changed = false;\n        for (int[] t : times) {\n            int u = t[0], v = t[1], w = t[2];\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                changed = true;\n            }\n        }\n        if (!changed) break;                 // hội tụ sớm\n    }\n\n    int max = 0;\n    for (int i = 1; i <= n; i++) {\n        if (dist[i] == INF) return -1;\n        max = Math.max(max, dist[i]);\n    }\n    return max;\n}"
      },
      java: "public int networkDelayTime(int[][] times, int n, int k) {\n    List<List<int[]>> adj = new ArrayList<>();\n    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\n    for (int[] t : times) adj.get(t[0]).add(new int[]{t[1], t[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));\n    pq.add(new int[]{0, k});   // {khoảng cách, đỉnh}\n\n    while (!pq.isEmpty()) {\n        int[] cur = pq.poll();\n        int d = cur[0], u = cur[1];\n        if (d > dist[u]) continue;           // bản lỗi thời trong heap\n\n        for (int[] edge : adj.get(u)) {\n            int v = edge[0], w = edge[1];\n            if (d + w < dist[v]) {\n                dist[v] = d + w;\n                pq.add(new int[]{dist[v], v});\n            }\n        }\n    }\n\n    int max = 0;\n    for (int i = 1; i <= n; i++) {\n        if (dist[i] == Integer.MAX_VALUE) return -1;   // có đỉnh không tới được\n        max = Math.max(max, dist[i]);\n    }\n    return max;\n}",
      js: "function networkDelayTime(times, n, k) {\n  const adj = Array.from({ length: n + 1 }, () => []);\n  for (const [u, v, w] of times) adj[u].push([v, w]);\n\n  const dist = new Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n\n  // heap đơn giản bằng mảng sắp lại — đủ dùng cho quy mô bài này\n  const pq = [[0, k]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n\n    for (const [v, w] of adj[u]) {\n      if (d + w < dist[v]) {\n        dist[v] = d + w;\n        pq.push([dist[v], v]);\n      }\n    }\n  }\n\n  let max = 0;\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === Infinity) return -1;\n    max = Math.max(max, dist[i]);\n  }\n  return max;\n}"
    },
    {
      name: "Min Cost to Connect All Points (cây khung nhỏ nhất — Prim)",
      lc: "1584", slug: "min-cost-to-connect-all-points", diff: "Trung bình",
      tags: "mst prim kruskal heap manhattan",
      complexity: "O(n² log n) với Prim + heap trên đồ thị đầy đủ; O(n²) nếu Prim dùng mảng dist",
      idea: "Nối n điểm với chi phí nhỏ nhất mà vẫn liên thông chính là bài CÂY KHUNG NHỎ NHẤT (MST). Đồ thị ở đây là đồ thị ĐẦY ĐỦ (mọi cặp điểm đều có cạnh, trọng số là khoảng cách Manhattan).",
      trap: "Đừng dựng sẵn cả n² cạnh vào bộ nhớ khi n = 1000 (một triệu cạnh). Prim sinh cạnh 'theo nhu cầu' từ đỉnh vừa lấy ra nên tiết kiệm hơn hẳn Kruskal ở đồ thị đầy đủ.",
      examples: [
        { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
          output: "20",
          note: "Các cạnh được chọn: (0,0)-(2,2)=4, (2,2)-(5,2)=3, (5,2)-(7,0)=4, (2,2)-(3,10)=9 → tổng 20. Đúng n-1 = 4 cạnh, không có chu trình." },
        { input: "points = [[3,12],[-2,5],[-4,1]]",
          output: "18",
          note: "Khoảng cách Manhattan |x1-x2| + |y1-y2|: (3,12)-(-2,5) = 5+7 = 12, (-2,5)-(-4,1) = 2+4 = 6 → 18. Không dùng khoảng cách Euclid — đọc kỹ đề." }
      ],
      steps: [
        "Bắt đầu từ đỉnh 0, đánh dấu inMST[0] = true.",
        "Nạp vào min-heap mọi cạnh từ đỉnh 0 tới các đỉnh còn lại (chi phí, đỉnh đích).",
        "Lặp cho tới khi đủ n-1 cạnh: lấy cạnh rẻ nhất ra khỏi heap.",
        "Nếu đỉnh đích đã nằm trong MST thì bỏ qua (cạnh này tạo chu trình).",
        "Ngược lại cộng chi phí, đánh dấu inMST, rồi nạp mọi cạnh từ đỉnh mới tới các đỉnh CHƯA vào MST.",
        "Trả về tổng chi phí."
      ],
      alt: {
        title: "Cách khác — Kruskal: sắp mọi cạnh tăng dần + Union-Find",
        complexity: "O(n² log n) do sắp xếp n²/2 cạnh, bộ nhớ O(n²)",
        note: "Kruskal trực quan hơn (cứ lấy cạnh rẻ nhất nào không tạo chu trình) và là lựa chọn tốt cho đồ thị THƯA. Ở bài này đồ thị đầy đủ nên tốn bộ nhớ hơn Prim. Biết nói ra 'Prim hợp đồ thị dày, Kruskal hợp đồ thị thưa' là câu chốt được điểm.",
        java: "public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    List<int[]> edges = new ArrayList<>();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            int w = Math.abs(points[i][0] - points[j][0])\n                  + Math.abs(points[i][1] - points[j][1]);\n            edges.add(new int[]{w, i, j});\n        }\n    }\n    edges.sort(Comparator.comparingInt(e -> e[0]));\n\n    int[] parent = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n\n    int total = 0, used = 0;\n    for (int[] e : edges) {\n        int ra = find(parent, e[1]), rb = find(parent, e[2]);\n        if (ra == rb) continue;          // tạo chu trình -> bỏ\n        parent[ra] = rb;\n        total += e[0];\n        if (++used == n - 1) break;\n    }\n    return total;\n}\n\nprivate int find(int[] p, int x) {\n    while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }\n    return x;\n}"
      },
      java: "public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    boolean[] inMST = new boolean[n];\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));\n\n    inMST[0] = true;\n    for (int j = 1; j < n; j++) pq.add(new int[]{dist(points, 0, j), j});\n\n    int total = 0, used = 0;\n    while (used < n - 1) {\n        int[] cur = pq.poll();\n        int w = cur[0], v = cur[1];\n        if (inMST[v]) continue;          // đã vào cây -> cạnh này thừa\n\n        inMST[v] = true;\n        total += w;\n        used++;\n\n        // sinh cạnh THEO NHU CẦU, không dựng sẵn n² cạnh\n        for (int j = 0; j < n; j++) {\n            if (!inMST[j]) pq.add(new int[]{dist(points, v, j), j});\n        }\n    }\n    return total;\n}\n\nprivate int dist(int[][] p, int i, int j) {\n    return Math.abs(p[i][0] - p[j][0]) + Math.abs(p[i][1] - p[j][1]);  // Manhattan\n}",
      js: "function minCostConnectPoints(points) {\n  const n = points.length;\n  const dist = (i, j) =>\n    Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);\n\n  const inMST = new Array(n).fill(false);\n  inMST[0] = true;\n  const pq = [];\n  for (let j = 1; j < n; j++) pq.push([dist(0, j), j]);\n\n  let total = 0, used = 0;\n  while (used < n - 1) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [w, v] = pq.shift();\n    if (inMST[v]) continue;\n\n    inMST[v] = true;\n    total += w;\n    used++;\n    for (let j = 0; j < n; j++) if (!inMST[j]) pq.push([dist(v, j), j]);\n  }\n  return total;\n}"
    },
    {
      name: "Cheapest Flights Within K Stops (Bellman-Ford giới hạn bước)",
      lc: "787", slug: "cheapest-flights-within-k-stops", diff: "Trung bình",
      tags: "bellman-ford dp bfs-level shortest-path constrained",
      complexity: "O(k · E) thời gian, O(V) bộ nhớ",
      idea: "Dijkstra thuần KHÔNG dùng được vì có thêm ràng buộc 'tối đa k điểm dừng' — đường rẻ nhất có thể dài quá số chặng cho phép. Bellman-Ford giới hạn số vòng lặp đúng k+1 là lời giải tự nhiên: sau i vòng, dist[v] là chi phí rẻ nhất dùng TỐI ĐA i cạnh.",
      trap: "Bắt buộc nới lỏng trên BẢN SAO của mảng dist ở mỗi vòng. Nếu cập nhật trực tiếp, một đỉnh vừa được cải thiện trong CÙNG vòng lại được dùng tiếp, làm đường đi vượt quá k+1 cạnh mà không bị phát hiện.",
      examples: [
        { input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
          output: "700",
          note: "Đường 0→1→3 tốn 700 và dùng 1 điểm dừng. Đường 0→1→2→3 chỉ tốn 400 nhưng có 2 điểm dừng nên bị loại — đây chính là lý do Dijkstra thuần trả lời sai." },
        { input: "cùng dữ liệu nhưng k = 2",
          output: "400",
          note: "Nới ràng buộc lên 2 điểm dừng thì đường 0→1→2→3 hợp lệ và rẻ hơn. So sánh hai ca này cho thấy rõ vai trò của số vòng lặp k+1." }
      ],
      steps: [
        "dist[] khởi tạo vô cực (dùng Integer.MAX_VALUE/2 để không tràn khi cộng), dist[src] = 0.",
        "Lặp đúng k + 1 vòng (k điểm dừng nghĩa là tối đa k+1 chuyến bay).",
        "Mỗi vòng: sao chép dist sang tmp = dist.clone().",
        "Duyệt mọi chuyến bay (u, v, giá): nếu dist[u] + giá < tmp[v] thì tmp[v] = dist[u] + giá.",
        "Hết vòng thì gán dist = tmp.",
        "Trả về dist[dst] nếu hữu hạn, ngược lại -1."
      ],
      alt: {
        title: "Cách khác — BFS theo TẦNG, mỗi tầng là một chặng bay",
        complexity: "O(k · E) tương đương, nhưng chỉ mở rộng từ các đỉnh THỰC SỰ cải thiện",
        note: "Duyệt theo tầng bằng queue: tầng i chứa các đỉnh tới được bằng đúng i chuyến bay. Ưu điểm là bỏ qua các cạnh xuất phát từ đỉnh chưa với tới, thường nhanh hơn Bellman-Ford trên đồ thị thưa. Nhớ vẫn phải giữ mảng best[] để cắt các nhánh đắt hơn, nếu không sẽ bùng nổ tổ hợp.",
        java: "public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    List<List<int[]>> adj = new ArrayList<>();\n    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n    for (int[] f : flights) adj.get(f[0]).add(new int[]{f[1], f[2]});\n\n    int[] best = new int[n];\n    Arrays.fill(best, Integer.MAX_VALUE);\n    best[src] = 0;\n\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.add(new int[]{src, 0});   // {đỉnh, chi phí}\n    int stops = 0;\n\n    while (!queue.isEmpty() && stops <= k) {\n        int size = queue.size();\n        for (int i = 0; i < size; i++) {\n            int[] cur = queue.poll();\n            int u = cur[0], cost = cur[1];\n            for (int[] e : adj.get(u)) {\n                int v = e[0], w = e[1];\n                if (cost + w >= best[v]) continue;   // không cải thiện -> cắt\n                best[v] = cost + w;\n                queue.add(new int[]{v, best[v]});\n            }\n        }\n        stops++;\n    }\n    return best[dst] == Integer.MAX_VALUE ? -1 : best[dst];\n}"
      },
      java: "public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = Integer.MAX_VALUE / 2;   // tránh tràn khi cộng\n    int[] dist = new int[n];\n    Arrays.fill(dist, INF);\n    dist[src] = 0;\n\n    // k điểm dừng = tối đa k+1 chuyến bay = k+1 vòng nới lỏng\n    for (int round = 0; round <= k; round++) {\n        int[] tmp = dist.clone();            // BẮT BUỘC: nới lỏng trên bản sao\n        for (int[] f : flights) {\n            int u = f[0], v = f[1], price = f[2];\n            if (dist[u] + price < tmp[v]) tmp[v] = dist[u] + price;\n        }\n        dist = tmp;\n    }\n\n    return dist[dst] >= INF ? -1 : dist[dst];\n}",
      js: "function findCheapestPrice(n, flights, src, dst, k) {\n  const INF = Infinity;\n  let dist = new Array(n).fill(INF);\n  dist[src] = 0;\n\n  for (let round = 0; round <= k; round++) {\n    const tmp = dist.slice();              // bản sao cho mỗi vòng\n    for (const [u, v, price] of flights) {\n      if (dist[u] + price < tmp[v]) tmp[v] = dist[u] + price;\n    }\n    dist = tmp;\n  }\n\n  return dist[dst] === INF ? -1 : dist[dst];\n}"
    }
  ]
}
];
