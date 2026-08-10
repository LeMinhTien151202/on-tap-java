// Bổ sung "cách làm khác" cho 33 bài LeetCode còn lại: cây, đồ thị, DP nâng cao, greedy/heap, bit.
module.exports = {

"Invert Binary Tree (lật cây nhị phân)": { alt: {
  title: "Cách khác — BFS dùng queue",
  complexity: "O(n) thời gian · O(w) bộ nhớ với w là bề rộng lớn nhất",
  note: "Tránh được nguy cơ StackOverflowError khi cây lệch và rất sâu. Đây chính là bài đã khiến tác giả Homebrew trượt phỏng vấn Google — đơn giản nhưng phải viết trôi chảy.",
  java: `TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    Queue<TreeNode> q = new ArrayDeque<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode node = q.poll();
        TreeNode tmp = node.left;
        node.left = node.right;
        node.right = tmp;
        if (node.left != null)  q.add(node.left);
        if (node.right != null) q.add(node.right);
    }
    return root;
}` } },

"Balanced Binary Tree (cây cân bằng chiều cao)": { alt: {
  title: "Cách khác — tính chiều cao lồng nhau (bản ngây thơ)",
  complexity: "O(n²) trường hợp xấu nhất",
  note: "Gọi height() cho từng nút khiến chiều cao bị tính lại nhiều lần. Nên viết bản này ra trước để đối chiếu, rồi giải thích mẹo 'trả về -1 làm cờ báo lỗi' giúp gộp hai việc vào một lượt duyệt.",
  java: `boolean isBalancedNaive(TreeNode root) {
    if (root == null) return true;
    if (Math.abs(height(root.left) - height(root.right)) > 1) return false;
    return isBalancedNaive(root.left) && isBalancedNaive(root.right);
}

private int height(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));   // tính lại nhiều lần
}` } },

"Diameter of Binary Tree (đường kính cây)": { alt: {
  title: "Cách khác — trả về cặp (chiều cao, đường kính) thay vì biến toàn cục",
  complexity: "O(n) thời gian · O(h) bộ nhớ",
  note: "Biến thành viên bị chia sẻ giữa các lần gọi — nguy hiểm nếu hàm được dùng lại hoặc chạy đa luồng. Trả về mảng 2 phần tử (hoặc record) là cách sạch hơn, hay được người phỏng vấn đánh giá cao.",
  java: `int diameterOfBinaryTree(TreeNode root) {
    return dfs(root)[1];
}

// trả về { chiều cao, đường kính lớn nhất trong cây con }
private int[] dfs(TreeNode node) {
    if (node == null) return new int[] { 0, 0 };
    int[] l = dfs(node.left), r = dfs(node.right);
    int height = 1 + Math.max(l[0], r[0]);
    int diameter = Math.max(l[0] + r[0], Math.max(l[1], r[1]));
    return new int[] { height, diameter };
}` } },

"Lowest Common Ancestor of a BST (tổ tiên chung gần nhất)": { alt: {
  title: "Cách khác — LCA cho cây nhị phân THƯỜNG (LC 236)",
  complexity: "O(n) thời gian · O(h) bộ nhớ",
  note: "Khi cây không phải BST thì không còn dựa vào thứ tự được nữa: đệ quy xuống hai nhánh, nếu cả hai nhánh đều trả về khác null thì nút hiện tại chính là LCA. Đây gần như luôn là câu hỏi nối tiếp.",
  java: `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left  = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;   // p, q nằm hai bên
    return (left != null) ? left : right;
}` } },

"Kth Smallest Element in a BST (phần tử nhỏ thứ k)": { alt: {
  title: "Cách khác — in-order lặp bằng stack, dừng sớm",
  complexity: "O(h + k) thời gian · O(h) bộ nhớ",
  note: "Dừng ngay khi đếm đủ k thay vì duyệt hết cây. Nếu bị hỏi 'BST bị sửa liên tục thì sao?', câu trả lời là lưu thêm SỐ NÚT của cây con tại mỗi nút để truy vấn còn O(h).",
  java: `int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        if (--k == 0) return cur.val;      // dừng sớm
        cur = cur.right;
    }
    return -1;
}` } },

"Build Tree from Preorder & Inorder (dựng lại cây)": { alt: {
  title: "Cách khác — dựng từ Postorder & Inorder",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Postorder đọc NGƯỢC cho ra gốc, và phải dựng cây con PHẢI trước cây con trái. Lưu ý quan trọng: preorder + postorder KHÔNG đủ để dựng lại cây duy nhất — bắt buộc phải có inorder.",
  java: `private int postIdx;
private Map<Integer, Integer> inorderPos;

TreeNode buildTree(int[] inorder, int[] postorder) {
    inorderPos = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) inorderPos.put(inorder[i], i);
    postIdx = postorder.length - 1;
    return build(postorder, 0, inorder.length - 1);
}

private TreeNode build(int[] postorder, int lo, int hi) {
    if (lo > hi) return null;
    int val = postorder[postIdx--];
    TreeNode node = new TreeNode(val);
    int mid = inorderPos.get(val);
    node.right = build(postorder, mid + 1, hi);   // PHẢI trước trái
    node.left  = build(postorder, lo, mid - 1);
    return node;
}` } },

"Binary Tree Maximum Path Sum (tổng đường đi lớn nhất)": { alt: {
  title: "Cách khác — trả kết quả qua mảng thay vì biến thành viên",
  complexity: "O(n) thời gian · O(h) bộ nhớ",
  note: "Cùng thuật toán nhưng bỏ trạng thái dùng chung. Nhớ kỹ: giá trị TRẢ VỀ cho nút cha chỉ được đi xuống MỘT nhánh, còn giá trị cập nhật kết quả tốt nhất mới được dùng cả hai nhánh.",
  java: `int maxPathSum(TreeNode root) {
    int[] best = { Integer.MIN_VALUE };
    gain(root, best);
    return best[0];
}

private int gain(TreeNode node, int[] best) {
    if (node == null) return 0;
    int left  = Math.max(gain(node.left, best), 0);    // nhánh âm thì bỏ
    int right = Math.max(gain(node.right, best), 0);
    best[0] = Math.max(best[0], node.val + left + right);   // đỉnh vòm: cả hai nhánh
    return node.val + Math.max(left, right);                // đi lên: chỉ một nhánh
}` } },

"Serialize & Deserialize Binary Tree (mã hóa / giải mã cây)": { alt: {
  title: "Cách khác — mã hóa theo BFS (giống định dạng của LeetCode)",
  complexity: "O(n) cho cả hai chiều",
  note: "Chuỗi sinh ra đọc được bằng mắt và trùng định dạng LeetCode hay dùng, tiện để gỡ lỗi. Với cây rất sâu thì BFS còn an toàn hơn DFS đệ quy vì không đụng giới hạn ngăn xếp.",
  java: `String serialize(TreeNode root) {
    if (root == null) return "";
    StringBuilder sb = new StringBuilder();
    Queue<TreeNode> q = new ArrayDeque<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode node = q.poll();
        if (node == null) { sb.append("#,"); continue; }
        sb.append(node.val).append(',');
        q.add(node.left);
        q.add(node.right);
    }
    return sb.toString();
}

TreeNode deserialize(String data) {
    if (data.isEmpty()) return null;
    String[] parts = data.split(",");
    TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
    Queue<TreeNode> q = new ArrayDeque<>();
    q.add(root);
    for (int i = 1; i < parts.length && !q.isEmpty(); ) {
        TreeNode parent = q.poll();
        if (!parts[i].equals("#")) {
            parent.left = new TreeNode(Integer.parseInt(parts[i]));
            q.add(parent.left);
        }
        i++;
        if (i < parts.length && !parts[i].equals("#")) {
            parent.right = new TreeNode(Integer.parseInt(parts[i]));
            q.add(parent.right);
        }
        i++;
    }
    return root;
}` } },

"Number of Islands (đếm số đảo)": { alt: {
  title: "Cách khác — Union-Find (gộp các ô đất kề nhau)",
  complexity: "O(m·n·α) — gần như tuyến tính",
  note: "Vượt trội khi đề biến thành ĐỘNG: 'thêm dần từng ô đất, sau mỗi lần cho biết có bao nhiêu đảo' (LC 305). DFS phải quét lại cả lưới mỗi lần, Union-Find chỉ cần gộp thêm.",
  java: `int numIslands(char[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[] parent = new int[m * n];
    Arrays.setAll(parent, i -> i);
    int count = 0;

    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
            if (grid[r][c] == '1') count++;

    int[][] dirs = { {1, 0}, {0, 1} };            // chỉ cần phải & xuống
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++) {
            if (grid[r][c] != '1') continue;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < m && nc < n && grid[nr][nc] == '1') {
                    int a = find(parent, r * n + c), b = find(parent, nr * n + nc);
                    if (a != b) { parent[a] = b; count--; }
                }
            }
        }
    return count;
}

private int find(int[] parent, int x) {
    while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
}` } },

"Clone Graph (sao chép sâu đồ thị)": { alt: {
  title: "Cách khác — BFS với map nút gốc → nút sao",
  complexity: "O(V + E) thời gian · O(V) bộ nhớ",
  note: "Cùng ý tưởng 'map vừa là bộ nhớ đệm vừa là tập đã thăm', nhưng dùng queue nên không sợ đệ quy quá sâu. Với đồ thị hàng trăm nghìn nút thì bản BFS là lựa chọn an toàn.",
  java: `Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> map = new HashMap<>();
    map.put(node, new Node(node.val));

    Queue<Node> q = new ArrayDeque<>();
    q.add(node);
    while (!q.isEmpty()) {
        Node cur = q.poll();
        for (Node nb : cur.neighbors) {
            if (!map.containsKey(nb)) {         // gặp lần đầu
                map.put(nb, new Node(nb.val));
                q.add(nb);
            }
            map.get(cur).neighbors.add(map.get(nb));
        }
    }
    return map.get(node);
}` } },

"Rotting Oranges (BFS đa nguồn)": { alt: {
  title: "Cách khác — lặp tại chỗ, không dùng queue",
  complexity: "O(m·n × số phút) — chậm hơn nhưng O(1) bộ nhớ phụ",
  note: "Mỗi phút quét cả lưới, đánh dấu ô mới thối bằng một giá trị riêng (ví dụ 3) rồi mới đổi thành 2 sau lượt quét. Bẫy: nếu ghi thẳng 2 thì cam vừa thối lại lây tiếp NGAY trong cùng một phút.",
  java: `int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length, minutes = 0;
    boolean changed = true;

    while (changed) {
        changed = false;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++) {
                if (grid[r][c] != 2) continue;
                for (int[] d : new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1} }) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 3;        // 3 = vừa thối trong phút này
                        changed = true;
                    }
                }
            }
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (grid[r][c] == 3) grid[r][c] = 2;
        if (changed) minutes++;
    }
    for (int[] row : grid) for (int v : row) if (v == 1) return -1;
    return minutes;
}` } },

"Course Schedule (phát hiện chu trình — Topological Sort)": { alt: {
  title: "Cách khác — DFS tô 3 màu",
  complexity: "O(V + E) thời gian · O(V) bộ nhớ",
  note: "0 = chưa thăm, 1 = ĐANG trong ngăn xếp đệ quy, 2 = đã xong. Gặp lại nút màu 1 nghĩa là có chu trình. Ưu điểm so với Kahn: thứ tự topo lấy được ngay bằng cách đảo ngược thứ tự hoàn thành.",
  java: `boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> g = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) g.add(new ArrayList<>());
    for (int[] p : prerequisites) g.get(p[1]).add(p[0]);

    int[] color = new int[numCourses];   // 0 trắng, 1 xám, 2 đen
    for (int i = 0; i < numCourses; i++)
        if (color[i] == 0 && hasCycle(g, i, color)) return false;
    return true;
}

private boolean hasCycle(List<List<Integer>> g, int u, int[] color) {
    color[u] = 1;                         // xám: đang trong ngăn xếp
    for (int v : g.get(u)) {
        if (color[v] == 1) return true;   // gặp lại nút xám → chu trình
        if (color[v] == 0 && hasCycle(g, v, color)) return true;
    }
    color[u] = 2;                         // đen: đã xong
    return false;
}` } },

"Pacific Atlantic Water Flow (nước chảy ra cả hai đại dương)": { alt: {
  title: "Cách khác — BFS đa nguồn từ hai bờ",
  complexity: "O(m·n) thời gian · O(m·n) bộ nhớ",
  note: "Nạp toàn bộ ô ven bờ Thái Bình Dương vào một queue, ven bờ Đại Tây Dương vào queue kia, rồi lan NGƯỢC dốc (chỉ đi sang ô cao hơn hoặc bằng). Giao của hai tập chính là đáp án.",
  java: `List<List<Integer>> pacificAtlantic(int[][] h) {
    int m = h.length, n = h[0].length;
    boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
    Queue<int[]> qp = new ArrayDeque<>(), qa = new ArrayDeque<>();

    for (int r = 0; r < m; r++) {
        qp.add(new int[] { r, 0 });     pac[r][0] = true;
        qa.add(new int[] { r, n - 1 }); atl[r][n - 1] = true;
    }
    for (int c = 0; c < n; c++) {
        qp.add(new int[] { 0, c });     pac[0][c] = true;
        qa.add(new int[] { m - 1, c }); atl[m - 1][c] = true;
    }
    bfs(h, qp, pac);
    bfs(h, qa, atl);

    List<List<Integer>> res = new ArrayList<>();
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
            if (pac[r][c] && atl[r][c]) res.add(List.of(r, c));
    return res;
}

private void bfs(int[][] h, Queue<int[]> q, boolean[][] seen) {
    int m = h.length, n = h[0].length;
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        for (int[] d : new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1} }) {
            int nr = cur[0] + d[0], nc = cur[1] + d[1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) continue;
            if (h[nr][nc] < h[cur[0]][cur[1]]) continue;   // lan NGƯỢC dốc
            seen[nr][nc] = true;
            q.add(new int[] { nr, nc });
        }
    }
}` } },

"Union-Find — Number of Connected Components": { alt: {
  title: "Cách khác — DFS đếm số lần khởi động",
  complexity: "O(V + E) thời gian · O(V + E) bộ nhớ cho danh sách kề",
  note: "Dễ viết hơn Union-Find và đủ dùng khi đồ thị TĨNH. Union-Find thắng khi các cạnh đến DẦN theo thời gian, hoặc khi phải trả lời liên tục 'hai nút này đã nối chưa'.",
  java: `int countComponents(int n, int[][] edges) {
    List<List<Integer>> g = new ArrayList<>();
    for (int i = 0; i < n; i++) g.add(new ArrayList<>());
    for (int[] e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }

    boolean[] visited = new boolean[n];
    int components = 0;
    for (int i = 0; i < n; i++) {
        if (visited[i]) continue;
        components++;
        dfs(g, i, visited);
    }
    return components;
}

private void dfs(List<List<Integer>> g, int u, boolean[] visited) {
    visited[u] = true;
    for (int v : g.get(u)) if (!visited[v]) dfs(g, v, visited);
}` } },

"Longest Palindromic Substring (chuỗi đối xứng dài nhất)": { alt: {
  title: "Cách khác — bảng DP 2 chiều",
  complexity: "O(n²) thời gian · O(n²) bộ nhớ",
  note: "dp[i][j] = đoạn s[i..j] có đối xứng không. Tốn bộ nhớ hơn cách nở từ tâm nên ít khi được chọn, nhưng là bước đệm tự nhiên để giải Palindromic Substrings (LC 647) và Palindrome Partitioning.",
  java: `String longestPalindromeDP(String s) {
    int n = s.length();
    boolean[][] dp = new boolean[n][n];
    int start = 0, maxLen = n > 0 ? 1 : 0;

    for (int i = 0; i < n; i++) dp[i][i] = true;

    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            if (s.charAt(i) != s.charAt(j)) continue;
            if (len == 2 || dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (len > maxLen) { maxLen = len; start = i; }
            }
        }
    return s.substring(start, start + maxLen);
}` } },

"Decode Ways (số cách giải mã chuỗi số)": { alt: {
  title: "Cách khác — đệ quy có memo (top-down)",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Bám sát cách suy nghĩ tự nhiên 'từ vị trí i tôi có mấy lựa chọn', dễ giải thích khi phỏng vấn. Bản lặp O(1) bộ nhớ chỉ là tối ưu sau cùng — cứ trình bày bản này trước.",
  java: `int numDecodings(String s) {
    return dfs(s, 0, new Integer[s.length()]);
}

private int dfs(String s, int i, Integer[] memo) {
    if (i == s.length()) return 1;         // giải mã trọn vẹn
    if (s.charAt(i) == '0') return 0;      // không mã nào bắt đầu bằng 0
    if (memo[i] != null) return memo[i];

    int ways = dfs(s, i + 1, memo);
    if (i + 1 < s.length() && Integer.parseInt(s.substring(i, i + 2)) <= 26)
        ways += dfs(s, i + 2, memo);

    return memo[i] = ways;
}` } },

"Word Break (tách chuỗi theo từ điển)": { alt: {
  title: "Cách khác — BFS trên các vị trí cắt",
  complexity: "O(n²·k) thời gian · O(n) bộ nhớ",
  note: "Coi mỗi vị trí trong chuỗi là một nút; có cạnh i → j nếu s[i..j) nằm trong từ điển. Chạm được tới cuối chuỗi là tách được. Nếu đề đòi LIỆT KÊ mọi cách tách (LC 140) thì phải quay lui + memo.",
  java: `boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    boolean[] visited = new boolean[s.length() + 1];
    Queue<Integer> q = new ArrayDeque<>();
    q.add(0);

    while (!q.isEmpty()) {
        int start = q.poll();
        if (visited[start]) continue;
        visited[start] = true;
        for (int end = start + 1; end <= s.length(); end++) {
            if (!dict.contains(s.substring(start, end))) continue;
            if (end == s.length()) return true;
            q.add(end);
        }
    }
    return false;
}` } },

"Unique Paths (số đường đi trên lưới)": { alt: {
  title: "Cách khác — công thức tổ hợp C(m+n-2, m-1)",
  complexity: "O(min(m, n)) thời gian · O(1) bộ nhớ",
  note: "Robot luôn đi đúng (m-1) bước xuống và (n-1) bước sang phải, chỉ khác nhau ở thứ tự. Phải nhân/chia xen kẽ và dùng long để không tràn — đừng tính giai thừa rồi mới chia.",
  java: `int uniquePaths(int m, int n) {
    long result = 1;
    int total = m + n - 2, choose = Math.min(m - 1, n - 1);
    for (int i = 1; i <= choose; i++) {
        result = result * (total - choose + i) / i;   // nhân rồi chia ngay, tránh tràn
    }
    return (int) result;
}` } },

"Longest Common Subsequence (dãy con chung dài nhất)": { alt: {
  title: "Cách khác — nén còn 2 hàng, và cách dựng lại dãy",
  complexity: "O(m·n) thời gian · O(min(m, n)) bộ nhớ",
  note: "Mỗi hàng chỉ phụ thuộc hàng ngay trước nên hai mảng 1 chiều là đủ. Đánh đổi: KHÔNG truy vết lại được dãy con — muốn in ra dãy thật thì phải giữ nguyên bảng đầy đủ.",
  java: `int longestCommonSubsequence(String a, String b) {
    if (a.length() < b.length()) { String t = a; a = b; b = t; }   // b là chuỗi ngắn
    int[] prev = new int[b.length() + 1], cur = new int[b.length() + 1];

    for (int i = 1; i <= a.length(); i++) {
        for (int j = 1; j <= b.length(); j++) {
            cur[j] = (a.charAt(i - 1) == b.charAt(j - 1))
                ? prev[j - 1] + 1
                : Math.max(prev[j], cur[j - 1]);
        }
        int[] tmp = prev; prev = cur; cur = tmp;    // hoán đổi hai hàng
    }
    return prev[b.length()];
}` } },

"Edit Distance (khoảng cách Levenshtein)": { alt: {
  title: "Cách khác — nén còn 1 hàng",
  complexity: "O(m·n) thời gian · O(n) bộ nhớ",
  note: "Phải giữ lại giá trị dp[i-1][j-1] (ô chéo) trong một biến tạm TRƯỚC khi ghi đè — đây là bẫy kinh điển khi nén bảng DP hai chiều xuống một chiều.",
  java: `int minDistance(String a, String b) {
    int m = a.length(), n = b.length();
    int[] dp = new int[n + 1];
    for (int j = 0; j <= n; j++) dp[j] = j;

    for (int i = 1; i <= m; i++) {
        int prevDiagonal = dp[0];      // dp[i-1][j-1]
        dp[0] = i;
        for (int j = 1; j <= n; j++) {
            int tmp = dp[j];           // giữ dp[i-1][j] trước khi ghi đè
            dp[j] = (a.charAt(i - 1) == b.charAt(j - 1))
                ? prevDiagonal
                : 1 + Math.min(prevDiagonal, Math.min(dp[j], dp[j - 1]));
            prevDiagonal = tmp;
        }
    }
    return dp[n];
}` } },

"Partition Equal Subset Sum (chia mảng thành 2 phần bằng nhau)": { alt: {
  title: "Cách khác — dùng BitSet (tăng tốc bằng bit)",
  complexity: "O(n × sum / 64) — nhanh hơn khoảng 64 lần",
  note: "Mỗi bit đại diện một tổng đạt được; phép dịch trái n bit rồi OR chính là 'thêm số n vào mọi tổng đang có'. Mẹo này áp dụng cho mọi bài subset-sum dạng boolean.",
  java: `boolean canPartition(int[] nums) {
    int sum = Arrays.stream(nums).sum();
    if ((sum & 1) == 1) return false;
    int target = sum / 2;

    BitSet reachable = new BitSet(target + 1);
    reachable.set(0);
    for (int n : nums) {
        BitSet shifted = (BitSet) reachable.clone();
        shifted.set(0, n, false);              // dịch trái n bit
        for (int i = reachable.length(); i >= 0; i--)
            if (reachable.get(i) && i + n <= target) shifted.set(i + n);
        reachable.or(shifted);
        if (reachable.get(target)) return true;
    }
    return reachable.get(target);
}` } },

"Jump Game (nhảy tới cuối mảng được không)": { alt: {
  title: "Cách khác — greedy đi NGƯỢC từ đích",
  complexity: "O(n) thời gian · O(1) bộ nhớ",
  note: "Giữ vị trí 'đích cần chạm tới', duyệt từ phải sang: nếu từ i nhảy tới được đích thì đích lùi về i. Cuối cùng đích phải bằng 0. Nhiều người thấy cách này dễ chứng minh đúng hơn bản đi xuôi.",
  java: `boolean canJump(int[] nums) {
    int goal = nums.length - 1;
    for (int i = nums.length - 2; i >= 0; i--)
        if (i + nums[i] >= goal) goal = i;    // từ i chạm được đích → đích lùi về i
    return goal == 0;
}` } },

"Non-overlapping Intervals (bỏ ít khoảng nhất để hết chồng lấn)": { alt: {
  title: "Cách khác — sắp theo điểm bắt đầu, bỏ khoảng KẾT THÚC MUỘN hơn",
  complexity: "O(n log n) thời gian · O(1) bộ nhớ",
  note: "Vẫn đúng: khi hai khoảng chồng nhau, luôn bỏ khoảng kết thúc muộn hơn. Hữu ích khi dữ liệu ĐÃ được sắp theo điểm bắt đầu sẵn (lịch làm việc theo thời gian) nên không cần sắp lại.",
  java: `int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));   // theo điểm BẮT ĐẦU
    int removed = 0, prevEnd = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {            // chồng lấn
            removed++;
            prevEnd = Math.min(prevEnd, intervals[i][1]);   // giữ khoảng kết thúc sớm hơn
        } else {
            prevEnd = intervals[i][1];
        }
    }
    return removed;
}` } },

"Insert Interval (chèn khoảng vào danh sách đã sắp xếp)": { alt: {
  title: "Cách khác — thêm vào rồi gộp lại như Merge Intervals",
  complexity: "O(n log n) thời gian",
  note: "Kém tối ưu hơn (mất tính chất danh sách đã sắp xếp) nhưng chỉ vài dòng và tái dùng đúng hàm gộp đã viết. Chọn cách này khi thời gian phỏng vấn còn ít và bài chính là bài khác.",
  java: `int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> all = new ArrayList<>(Arrays.asList(intervals));
    all.add(newInterval);
    all.sort(Comparator.comparingInt(a -> a[0]));

    List<int[]> merged = new ArrayList<>();
    for (int[] it : all) {
        if (!merged.isEmpty() && merged.get(merged.size() - 1)[1] >= it[0]) {
            merged.get(merged.size() - 1)[1] =
                Math.max(merged.get(merged.size() - 1)[1], it[1]);
        } else {
            merged.add(it);
        }
    }
    return merged.toArray(new int[0][]);
}` } },

"Kth Largest Element in an Array (phần tử lớn thứ k)": { alt: {
  title: "Cách khác — Quickselect (phân hoạch một nửa)",
  complexity: "O(n) trung bình, O(n²) xấu nhất nếu pivot tồi",
  note: "Chỉ đệ quy vào nửa CHỨA đáp án nên trung bình n + n/2 + n/4 + ... = O(n). Bắt buộc chọn pivot ngẫu nhiên, nếu không mảng đã sắp xếp sẽ đẩy về O(n²).",
  java: `int findKthLargest(int[] nums, int k) {
    int target = nums.length - k;          // chỉ số khi mảng sắp tăng dần
    int lo = 0, hi = nums.length - 1;
    Random rnd = new Random();

    while (lo <= hi) {
        int pivotIdx = lo + rnd.nextInt(hi - lo + 1);
        swap(nums, pivotIdx, hi);
        int pivot = nums[hi], p = lo;

        for (int i = lo; i < hi; i++)
            if (nums[i] < pivot) swap(nums, i, p++);
        swap(nums, p, hi);

        if (p == target) return nums[p];
        if (p < target) lo = p + 1;
        else            hi = p - 1;
    }
    return -1;
}

private void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }` } },

"Task Scheduler (lập lịch tác vụ có thời gian nghỉ)": { alt: {
  title: "Cách khác — mô phỏng bằng max-heap + hàng đợi chờ",
  complexity: "O(số phút × log 26)",
  note: "Chậm hơn công thức nhưng TRẢ VỀ ĐƯỢC lịch cụ thể, và mở rộng được khi mỗi tác vụ có thời gian nghỉ riêng — lúc đó công thức không còn dùng được nữa.",
  java: `int leastInterval(char[] tasks, int n) {
    Map<Character, Integer> freq = new HashMap<>();
    for (char t : tasks) freq.merge(t, 1, Integer::sum);

    PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
    pq.addAll(freq.values());
    Queue<int[]> cooling = new ArrayDeque<>();   // { số lần còn lại, thời điểm sẵn sàng }
    int time = 0;

    while (!pq.isEmpty() || !cooling.isEmpty()) {
        time++;
        if (!pq.isEmpty()) {
            int remaining = pq.poll() - 1;
            if (remaining > 0) cooling.add(new int[] { remaining, time + n });
        }
        if (!cooling.isEmpty() && cooling.peek()[1] == time) pq.add(cooling.poll()[0]);
    }
    return time;
}` } },

"Find Median from Data Stream (trung vị của luồng dữ liệu)": { alt: {
  title: "Cách khác — mảng luôn sắp xếp (chèn nhị phân)",
  complexity: "Thêm O(n) do phải dời phần tử · Lấy trung vị O(1)",
  note: "Chỉ hợp khi dữ liệu ít hoặc ĐỌC nhiều hơn GHI. Nếu miền giá trị hẹp và cố định (ví dụ tuổi 0-150), dùng mảng đếm + tổng tiền tố còn nhanh hơn cả hai heap.",
  java: `class MedianFinder {
    private final List<Integer> sorted = new ArrayList<>();

    public void addNum(int num) {
        int idx = Collections.binarySearch(sorted, num);
        if (idx < 0) idx = -(idx + 1);       // vị trí chèn
        sorted.add(idx, num);
    }

    public double findMedian() {
        int n = sorted.size(), mid = n / 2;
        return (n % 2 == 1)
            ? sorted.get(mid)
            : (sorted.get(mid - 1) + sorted.get(mid)) / 2.0;
    }
}` } },

"Single Number (số xuất hiện một lần)": { alt: {
  title: "Cách khác — biến thể mỗi số xuất hiện 3 lần (LC 137)",
  complexity: "O(n) thời gian · O(1) bộ nhớ",
  note: "XOR không còn dùng được vì 3 lần không triệt tiêu. Cách tổng quát nhất: đếm số bit 1 ở TỪNG vị trí rồi lấy modulo 3 — phần dư chính là bit của số lẻ loi.",
  java: `int singleNumberThreeTimes(int[] nums) {
    int result = 0;
    for (int bit = 0; bit < 32; bit++) {
        int count = 0;
        for (int n : nums) count += (n >> bit) & 1;
        if (count % 3 != 0) result |= (1 << bit);
    }
    return result;
}` } },

"Number of 1 Bits (đếm bit 1 — Brian Kernighan)": { alt: {
  title: "Cách khác — chia đôi song song (SWAR)",
  complexity: "O(1) — đúng 12 phép tính, không phụ thuộc số bit 1",
  note: "Đây chính là cài đặt bên trong Integer.bitCount của JDK: cộng gộp theo cặp bit, rồi 4 bit, rồi 8 bit. Không cần thuộc lòng, nhưng biết nó tồn tại là điểm cộng lớn.",
  java: `int hammingWeight(int n) {
    n = n - ((n >>> 1) & 0x55555555);                    // gộp theo cặp 2 bit
    n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);     // gộp theo nhóm 4 bit
    n = (n + (n >>> 4)) & 0x0f0f0f0f;                    // gộp theo nhóm 8 bit
    n = n + (n >>> 8);
    n = n + (n >>> 16);
    return n & 0x3f;
}

// Trong thực tế: Integer.bitCount(n) — JIT dịch thẳng thành lệnh POPCNT của CPU` } },

"Counting Bits (đếm bit 1 cho 0..n)": { alt: {
  title: "Cách khác — dp[i] = dp[i & (i-1)] + 1",
  complexity: "O(n) thời gian · O(n) bộ nhớ",
  note: "Xóa bit 1 thấp nhất cho ra một số NHỎ HƠN đã tính rồi, cộng thêm 1. Cùng độ phức tạp với dp[i >> 1] + (i & 1), chỉ khác cách nhìn — nêu được cả hai cho thấy bạn hiểu bản chất.",
  java: `int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++)
        dp[i] = dp[i & (i - 1)] + 1;   // bỏ bit 1 thấp nhất rồi cộng lại 1
    return dp;
}` } },

"Reverse Bits (đảo ngược 32 bit)": { alt: {
  title: "Cách khác — hoán đổi theo khối (divide & conquer)",
  complexity: "O(1) — 5 phép hoán đổi thay vì 32 vòng lặp",
  note: "Đổi chỗ 16 bit đầu với 16 bit cuối, rồi 8 với 8, rồi 4, 2, 1. Khi phải gọi hàm hàng triệu lần (xử lý ảnh, mã hóa) thì khác biệt là đáng kể. JDK có sẵn Integer.reverse(n).",
  java: `int reverseBits(int n) {
    n = (n >>> 16) | (n << 16);
    n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
    n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
    n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
    n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
    return n;
}

// Thư viện: Integer.reverse(n)` } },

"Missing Number (số bị thiếu trong 0..n)": { alt: {
  title: "Cách khác — công thức tổng Gauss",
  complexity: "O(n) thời gian · O(1) bộ nhớ",
  note: "Ngắn và dễ giải thích nhất. Rủi ro duy nhất là TRÀN SỐ khi n lớn — dùng long cho biến tổng là xử lý được. Nếu đề cấm cả cộng lẫn XOR thì còn cách sắp xếp O(n log n).",
  java: `int missingNumber(int[] nums) {
    int n = nums.length;
    long expected = (long) n * (n + 1) / 2;   // long để chắc chắn không tràn
    long actual = 0;
    for (int x : nums) actual += x;
    return (int) (expected - actual);
}` } },

"Sum of Two Integers (cộng không dùng dấu +)": { alt: {
  title: "Cách khác — bản đệ quy & phép TRỪ không dùng dấu -",
  complexity: "O(32) = O(1)",
  note: "Câu hỏi nối tiếp thường là 'thế còn phép trừ?'. Trong bù hai: a - b = a + (~b + 1), tức là đảo mọi bit của b rồi cộng 1 — chỉ dùng lại đúng hàm getSum vừa viết.",
  java: `int getSum(int a, int b) {
    return (b == 0) ? a : getSum(a ^ b, (a & b) << 1);
}

// Phép trừ: a - b = a + (số đối của b) trong biểu diễn bù hai
int getSubtract(int a, int b) {
    return getSum(a, getSum(~b, 1));
}` } }

};
