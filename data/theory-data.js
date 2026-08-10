// Q&A ly thuyet trich tu Excel
// File nay duoc sinh tu dong boi tools/extract_xlsx.py - dung sua tay.
window.THEORY_DATA = [
 {
  "topic": "Java Core",
  "items": [
   {
    "id": "Java Core-2",
    "question": "toán tử \"instanceof\" trong java?",
    "answer": "Toán tử instanceof trong Java được dùng để kiểm tra xem một đối tượng có phải là một instance (thể hiện) của một lớp cụ thể hoặc một interface (giao diện) cụ thể hay không. Nó trả về giá trị boolean: true nếu đúng và false nếu sai.",
    "examples": [
     "public class Main {\n    public static void main(String[] args) {\n        String str = \"Hello\";\n        Integer num = 10;\n\n        System.out.println(\"str instanceof String: \" + (str instanceof String)); // true\n        System.out.println(\"num instanceof Integer: \" + (num instanceof Integer)); // true\n        System.out.println(\"str instanceof Object: \" + (str instanceof Object)); // true (vì String kế thừa từ Object)\n        System.out.println(\"num instanceof String: \" + (num instanceof String)); // false\n    }\n}",
     "Nếu một lớp con kế thừa từ một lớp cha, thì một đối tượng của lớp con cũng được coi là một thể hiện của lớp cha. > class Animal {}\nclass Dog extends Animal {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog myDog = new Dog();\n\n        System.out.println(\"myDog instanceof Dog: \" + (myDog instanceof Dog));     // true\n        System.out.println(\"myDog instanceof Animal: \" + (myDog instanceof Animal)); // true\n        System.out.println(\"myDog instanceof Object: \" + (myDog instanceof Object)); // true\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-3",
    "question": "có bao nhiêu kiểu dữ liệu trong java",
    "answer": "Trong Java, có tổng cộng hai loại kiểu dữ liệu chính, và mỗi loại lại bao gồm nhiều kiểu con khác nhau:",
    "examples": [
     "Kiểu dữ liệu nguyên thủy (Primitive Data Types): Long, int, byte, short ,float, char, boolean",
     "Kiểu dữ liệu tham chiếu (Reference Data Types):Các kiểu dữ liệu tham chiếu bao gồm:\n\nClasses (Lớp): Bất kỳ lớp nào bạn định nghĩa (ví dụ: String, Scanner, ArrayList, hoặc lớp Person mà bạn tự tạo) đều là kiểu dữ liệu tham chiếu.\nInterfaces (Giao diện): Các biến có thể được khai báo với kiểu interface.\nArrays (Mảng): Mảng trong Java, dù là mảng các kiểu nguyên thủy hay mảng các đối tượng, bản thân nó cũng là một đối tượng và do đó là một kiểu dữ liệu tham chiếu.String name = \"Alice\"; // 'name' là một tham chiếu đến đối tượng String \"Alice\"\nArrayList<Integer> numbers = new ArrayList<>(); // 'numbers' là một tham chiếu đến đối tượng ArrayList\nint[] arr = new int[5]; // 'arr' là một tham chiếu đến đối tượng mảng int"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-4",
    "question": "Hiểu ý nghĩa và mục đích sử dụng từ khóa \"static\" trong java?",
    "answer": "Từ khóa static được sử dụng để:\ntừ khóa static được sử dụng để xác định rằng một thành viên của lớp (biến hoặc phương thức) thuộc về chính lớp đó, thay vì đối tượng (instance) của lớp. Điều này có nghĩa là thành viên static có thể được truy cập mà không cần khởi tạo đối tượng.\nĐại diện cho các thành phần thuộc về lớp chứ không phải đối tượng.\nTạo ra một bản sao duy nhất của biến hoặc phương thức được chia sẻ bởi tất cả các đối tượng của lớp.\nCho phép truy cập các thành phần mà không cần tạo đối tượng của lớp đó.\nHỗ trợ việc tạo các tiện ích chung (utility methods/classes) hoặc các hằng số.\nQuản lý tài nguyên hoặc trạng thái cần được khởi tạo hoặc duy trì chỉ một lần cho toàn bộ ứng dụng.",
    "examples": [
     "Dùng cho biến: class Student {\n    String name;\n    int rollNo;\n    static String collegeName = \"ABC University\"; // Biến static\n    public Student(String name, int rollNo) {\n        this.name = name;\n        this.rollNo = rollNo;\n    }\n    void display() {\n        System.out.println(name + \" \" + rollNo + \" \" + collegeName);\n    }\n}\npublic class StaticVariableExample {\n    public static void main(String args[]) {\n        Student s1 = new Student(\"Alice\", 101);\n        Student s2 = new Student(\"Bob\", 102);\n\n        s1.display(); // Output: Alice 101 ABC University\n        s2.display(); // Output: Bob 102 ABC University\n\n        // Thay đổi giá trị của biến static qua tên lớp\n        Student.collegeName = \"XYZ College\";\n        Student s3 = new Student(\"Charlie\", 103);\n        s3.display(); // Output: Charlie 103 XYZ College\n        s1.display(); // Output: Alice 101 XYZ College (Giá trị thay đổi cho tất cả các đối tượng)\n    }\n}",
     "Dùng cho method: class Calculator {\n    static int add(int a, int b) {\n        return a + b;\n    }\n\n    int subtract(int a, int b) { // Phương thức non-static\n        return a - b;\n    }\n}\n\npublic class StaticMethodExample {\n    public static void main(String args[]) {\n        // Gọi phương thức static bằng tên lớp\n        System.out.println(\"Sum: \" + Calculator.add(10, 20)); // Output: Sum: 30\n\n        // Để gọi phương thức non-static, cần tạo đối tượng\n        Calculator calc = new Calculator();\n        System.out.println(\"Difference: \" + calc.subtract(20, 5)); // Output: Difference: 15\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-5",
    "question": "Hiểu ý nghĩa và mục đích sử dụng từ khóa \"final\" trong java? Định nghĩa hằng số: Khi áp dụng cho biến, giá trị của nó không thể thay đổi.\nNgăn chặn ghi đè: Khi áp dụng cho phương thức, các lớp con không thể thay đổi hành vi của phương thức đó.\nNgăn chặn kế thừa: Khi áp dụng cho lớp, không lớp nào có thể kế thừa từ lớp đó.\nfinal giúp tăng cường tính an toàn, ổn định và hiệu suất trong các ứng dụng Java bằng cách áp đặt các quy tắc về khả năng thay đổi và khả năng mở rộng., từ khóa Final được sử dụng để chỉ định rằng một biến, một phương thức hoặc một lớp không thể thay đổi sau khi khởi tạo",
    "answer": "final Variables (Biến final): Biến final chỉ có thể được gán giá trị một lần duy nhất. Sau khi được gán, mọi nỗ lực gán lại giá trị cho nó sẽ gây ra lỗi biên dịch.class MyClass {\n    final int INSTANCE_ID; // biến final non-static\n\n    // Khối khởi tạo instance\n    {\n        INSTANCE_ID = 123;\n    }\n\n    final String NAME; // biến final non-static\n    public MyClass(String name) {\n        this.NAME = name; // Khởi tạo trong constructor\n    }\n\n    static final double PI; // biến final static\n    static {\n        PI = 3.14159; // Khởi tạo trong khối static\n    }\n}",
    "examples": [
     "final Methods (Phương thức final) : Ngăn chặn các lớp con thay đổi hành vi đã được định nghĩa của phương thức này. class Parent {\n    final void showMessage() { // Phương thức final\n        System.out.println(\"This is a final method in Parent.\");\n    }\n    void ordinaryMethod() {\n        System.out.println(\"This is an ordinary method in Parent.\");\n    }\n}\nclass Child extends Parent {\n    // @Override // Lỗi biên dịch: không thể ghi đè phương thức final\n    // void showMessage() {\n    //     System.out.println(\"Trying to override final method.\");\n    // }\n    @Override\n    void ordinaryMethod() { // Hợp lệ: ghi đè phương thức non-final\n        System.out.println(\"This is an overridden method in Child.\");\n    }\n}\npublic class FinalMethodExample {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.showMessage(); // Output: This is a final method in Parent.\n        c.ordinaryMethod(); // Output: This is an overridden method in Child.\n    }\n}",
     "final Classes (Lớp final) : Khi một lớp được khai báo là final, nó không thể bị kế thừa bởi bất kỳ lớp nào khác. Ngăn chặn việc tạo ra các lớp con từ lớp này.final class ImmutablePoint {\n    private final int x; // Biến final\n    private final int y; // Biến final\n    public ImmutablePoint(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n    public int getX() { return x; }\n    public int getY() { return y; }\n    // Không có setter, đảm bảo tính bất biến\n}\n// class ColoredPoint extends ImmutablePoint { // Lỗi biên dịch: không thể kế thừa từ lớp final\n//     private String color;\n//     public ColoredPoint(int x, int y, String color) {\n//         super(x, y);\n//         this.color = color;\n//     }\n// }\n\npublic class FinalClassExample {\n    public static void main(String[] args) {\n        ImmutablePoint p = new ImmutablePoint(10, 20);\n        System.out.println(\"Point: (\" + p.getX() + \", \" + p.getY() + \")\");\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-6",
    "question": "Hiểu biết về String Immutable?",
    "answer": "Một String được gọi là \"immutable\" có nghĩa là một khi nó được tạo ra, nội dung của nó không thể thay đổi được. Bất kỳ thao tác nào dường như \"thay đổi\" một chuỗi thực chất đều tạo ra một chuỗi mới với nội dung đã được sửa đổi, trong khi chuỗi ban đầu vẫn giữ nguyên.",
    "examples": [
     "String s1 = \"Hello\";\nString s2 = s1.concat(\" World\"); // concat() tạo ra một chuỗi MỚI\nSystem.out.println(s1); // Output: Hello (s1 không thay đổi)\nSystem.out.println(s2); // Output: Hello World (s2 là chuỗi mới)",
     "String s1 = \"Java\";\nString s2 = \"Java\"; // s2 sẽ trỏ đến cùng một đối tượng \"Java\" với s1 trong String pool\nSystem.out.println(s1 == s2); // Output: true"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-7",
    "question": "Hiểu biết về String Pool?",
    "answer": "String Pool là một khu vực đặc biệt trong bộ nhớ heap (hoặc đôi khi là PermGen/Metaspace trong các phiên bản Java cũ) nơi lưu trữ các đối tượng String duy nhất (unique String objects). Mục tiêu chính của String Pool là tái sử dụng các chuỗi giống nhau để giảm thiểu việc tạo ra các đối tượng trùng lặp trong bộ nhớ.Nếu chuỗi đã tồn tại: Thay vì tạo một đối tượng String mới, hệ thống sẽ trả về tham chiếu đến đối tượng String hiện có trong String Pool. Điều này giúp tiết kiệm bộ nhớ đáng kể.\nNếu chuỗi chưa tồn tại: Hệ thống sẽ tạo một đối tượng String mới và thêm nó vào String Pool, sau đó trả về tham chiếu đến đối tượng mới này.",
    "examples": [
     "String s1 = \"Hello\"; // \"Hello\" được kiểm tra trong String Pool\nString s2 = \"Hello\"; // s2 sẽ trỏ đến cùng một đối tượng \"Hello\" với s1\nString s3 = \"World\"; // \"World\" được kiểm tra/thêm vào String Pool\n\nSystem.out.println(s1 == s2); // Output: true (cùng tham chiếu)\nSystem.out.println(s1 == s3); // Output: false (khác tham chiếu)",
     "Sử dụng từ khóa new:\n\nKhi bạn tạo một String bằng cách sử dụng từ khóa new, bạn luôn tạo ra một đối tượng String mới trong bộ nhớ heap, bất kể nội dung của nó có giống với một chuỗi nào đó đã có trong String Pool hay không.String s4 = new String(\"Java\"); // Tạo một đối tượng mới \"Java\" trên heap\nString s5 = new String(\"Java\"); // Tạo một đối tượng mới khác \"Java\" trên heap\nString s6 = \"Java\";            // Trỏ đến \"Java\" trong String Pool\n\nSystem.out.println(s4 == s5); // Output: false (hai đối tượng khác nhau trên heap)\nSystem.out.println(s4 == s6); // Output: false (s4 trên heap, s6 trong pool)\nSystem.out.println(s5 == s6); // Output: false"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-8",
    "question": "Hiểu về 2 lớp StringBuilder và StringBuffer? Cả StringBuilder và StringBuffer đều duy trì một mảng ký tự bên trong (thường là một char[] hoặc tương tự) để lưu trữ nội dung chuỗi. Khi bạn thực hiện các thao tác như append(), insert(), delete(), v.v., chúng sẽ sửa đổi mảng ký tự này trực tiếp. Nếu mảng ký tự không đủ dung lượng, chúng sẽ tự động mở rộng nó (bằng cách tạo một mảng mới lớn hơn và sao chép nội dung cũ sang). Cả hai lớp đều cung cấp các phương thức tương tự nhau để thao tác chuỗi:",
    "answer": "Tổng quan về StringBuilder và StringBuffer\nKhi bạn thao tác chuỗi trong Java, bạn đã biết String là bất biến (immutable). Điều này có nghĩa là mỗi khi bạn thực hiện một thao tác \"thay đổi\" trên một đối tượng String (ví dụ: nối chuỗi), Java sẽ tạo ra một đối tượng String mới trong bộ nhớ. Nếu bạn thực hiện nhiều thao tác nối chuỗi trong một vòng lặp, điều này sẽ dẫn đến việc tạo ra hàng loạt các đối tượng String tạm thời, gây lãng phí bộ nhớ và giảm hiệu suất do Garbage Collector phải hoạt động nhiều hơn.\n\nĐể giải quyết vấn đề này, Java cung cấp hai lớp là StringBuilder và StringBuffer. Cả hai lớp này đều đại diện cho các chuỗi có thể thay đổi được (mutable). Thay vì tạo ra một đối tượng mới sau mỗi thao tác, chúng sửa đổi trực tiếp nội dung của chuỗi hiện có.",
    "examples": [
     "append(data): Thêm dữ liệu vào cuối chuỗi. data có thể là String, char, int, boolean, v.v.\ninsert(offset, data): Chèn dữ liệu vào một vị trí cụ thể trong chuỗi.\ndelete(start, end): Xóa một phần chuỗi từ vị trí start đến end - 1.\nreverse(): Đảo ngược thứ tự các ký tự trong chuỗi.\nsetCharAt(index, char): Thay đổi ký tự tại một vị trí cụ thể.\nlength(): Trả về độ dài của chuỗi.\ncapacity(): Trả về dung lượng hiện tại của bộ đệm ký tự.\ntoString(): Chuyển đổi nội dung của StringBuilder/StringBuffer thành một đối tượng String (immutable)."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-9",
    "question": "Ví dụ về 2 trường hợp đó ?",
    "answer": "Khi nào sử dụng cái nào?\nSử dụng StringBuilder khi:\nBạn đang làm việc trong một môi trường đơn luồng (single-threaded environment).\nBạn cần hiệu suất tối đa cho các thao tác chuỗi.\nĐây là lựa chọn được khuyến nghị trong hầu hết các trường hợp thông thường.\nSử dụng StringBuffer khi:\nBạn đang làm việc trong một môi trường đa luồng (multi-threaded environment).\nNhiều luồng có thể cùng lúc truy cập và sửa đổi cùng một đối tượng chuỗi, và bạn cần đảm bảo tính nhất quán của dữ liệu mà không cần tự xử lý đồng bộ hóa thủ công.\nLưu ý: Ngay cả trong môi trường đa luồng, đôi khi việc tự quản lý đồng bộ hóa bằng các cơ chế cấp cao hơn (như Lock hoặc synchronized trên khối code cụ thể) với StringBuilder có thể cung cấp sự kiểm soát tốt hơn và hiệu suất tối ưu hơn nếu chỉ một phần nhỏ của code cần được đồng bộ hóa. Tuy nhiên, StringBuffer là lựa chọn đơn giản và an toàn mặc định cho trường hợp này.\nSử dụng String khi:\nBạn không cần thay đổi nội dung của chuỗi sau khi nó được tạo.\nBạn đang sử dụng các chuỗi literal hoặc hằng số.\nBạn cần các tính năng của String Pool (ví dụ: equals() so sánh nội dung, == so sánh tham chiếu nếu chuỗi là literal).",
    "examples": [
     "// Lớp Counter đơn giản\nclass Counter {\n    private int count = 0;\n    public void increment() {\n        count++; // Tăng giá trị của biến đếm\n    }\n    public int getCount() {\n        return count;\n    }\n}\npublic class SingleThreadExample {\n    public static void main(String[] args) {\n        Counter counter = new Counter();\n        int iterations = 10000; // Số lần tăng\n        // Thực hiện tăng đếm trong một luồng duy nhất\n        for (int i = 0; i < iterations; i++) {\n            counter.increment();\n        }\n        System.out.println(\"Single-threaded final count: \" + counter.getCount());\n        // Kết quả mong đợi: 10000\n    }\n}",
     "// Lớp Counter (không thay đổi)\nclass UnsafeCounter {\n    private int count = 0;\n    public void increment() {\n        count++; // count = count + 1;\n        // Thực chất phép toán này không phải là nguyên tử (atomic) mà gồm 3 bước:\n        // 1. Đọc giá trị của count\n        // 2. Tăng giá trị đã đọc lên 1\n        // 3. Ghi giá trị mới vào count\n    }\n    public int getCount() {\n        return count;\n    }\n}\npublic class MultiThreadExampleUnsafe {\n    public static void main(String[] args) throws InterruptedException {\n        UnsafeCounter counter = new UnsafeCounter();\n        int numThreads = 10;   // Số lượng luồng\n        int iterationsPerThread = 1000; // Số lần tăng mỗi luồng\n        int totalExpectedCount = numThreads * iterationsPerThread; // 10 * 1000 = 10000\n        Thread[] threads = new Thread[numThreads];\n        // Tạo và khởi chạy các luồng\n        for (int i = 0; i < numThreads; i++) {\n            threads[i] = new Thread(() -> {\n                for (int j = 0; j < iterationsPerThread; j++) {\n                    counter.increment();\n                }\n            });\n            threads[i].start(); // Bắt đầu luồng\n        }\n        // Chờ tất cả các luồng kết thúc\n        for (int i = 0; i < numThreads; i++) {\n            threads[i].join(); // main thread chờ các luồng con hoàn thành\n        }\n        System.out.println(\"Multi-threaded (UNSAFE) final count: \" + counter.getCount());\n        System.out.println(\"Total expected count: \" + totalExpectedCount);\n        // Kết quả THỰC TẾ thường sẽ KHÔNG phải là 10000\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-10",
    "question": "Hiểu về đặc điểm interface List?",
    "answer": "Tóm tắt đặc điểm List:\nList là tập hợp có thứ tự và cho phép các phần tử trùng lặp. Nó cung cấp khả năng truy cập theo chỉ mục mạnh mẽ và là lựa chọn lý tưởng khi bạn cần duy trì thứ tự chèn của các phần tử và thường xuyên truy cập chúng theo vị trí. Việc lựa chọn giữa ArrayList và LinkedList phụ thuộc vào các hoạt động (chèn/xóa vs. truy cập) mà bạn dự định thực hiện thường xuyên hơn.",
    "examples": [
     "public class ListExample {\n    public static void main(String[] args) {\n        // Khai báo List và khởi tạo với ArrayList\n        List<String> fruits = new ArrayList<>();\n\n        // 1. Thêm phần tử (theo thứ tự)\n        fruits.add(\"Apple\");\n        fruits.add(\"Banana\");\n        fruits.add(\"Cherry\");\n        fruits.add(\"Apple\"); // List cho phép trùng lặp\n        System.out.println(\"Initial List: \" + fruits); // Output: [Apple, Banana, Cherry, Apple]\n\n        // 2. Truy cập phần tử theo chỉ mục\n        String firstFruit = fruits.get(0);\n        String thirdFruit = fruits.get(2);\n        System.out.println(\"First fruit: \" + firstFruit);  // Output: Apple\n        System.out.println(\"Third fruit: \" + thirdFruit);  // Output: Cherry\n\n        // 3. Chèn phần tử vào một vị trí cụ thể\n        fruits.add(1, \"Grape\"); // Chèn \"Grape\" vào chỉ mục 1\n        System.out.println(\"List after adding Grape at index 1: \" + fruits); // Output: [Apple, Grape, Banana, Cherry, Apple]\n\n        // 4. Thay thế phần tử\n        fruits.set(3, \"Mango\"); // Thay thế phần tử ở chỉ mục 3 (Cherry) bằng Mango\n        System.out.println(\"List after setting index 3 to Mango: \" + fruits); // Output: [Apple, Grape, Banana, Mango, Apple]\n\n        // 5. Xóa phần tử\n        fruits.remove(0); // Xóa phần tử ở chỉ mục 0 (\"Apple\")\n        System.out.println(\"List after removing element at index 0: \" + fruits); // Output: [Grape, Banana, Mango, Apple]\n\n        fruits.remove(\"Banana\"); // Xóa phần tử \"Banana\" (lần xuất hiện đầu tiên)\n        System.out.println(\"List after removing 'Banana': \" + fruits); // Output: [Grape, Mango, Apple]\n\n        // 6. Kích thước của List\n        System.out.println(\"Current size of list: \" + fruits.size()); // Output: 3\n\n        // 7. Kiểm tra sự tồn tại của phần tử\n        System.out.println(\"Does list contain 'Mango'? \" + fruits.contains(\"Mango\")); // Output: true\n        System.out.println(\"Does list contain 'Orange'? \" + fruits.contains(\"Orange\")); // Output: false\n        // 8. Tìm chỉ mục của phần tử\n        System.out.println(\"Index of 'Apple': \" + fruits.indexOf(\"Apple\")); // Output: 2\n        fruits.add(\"Mango\"); // Thêm Mango lần nữa để thử lastIndexOf\n        System.out.println(\"List with duplicate Mango: \" + fruits); // Output: [Grape, Mango, Apple, Mango]\n        System.out.println(\"First index of 'Mango': \" + fruits.indexOf(\"Mango\"));   // Output: 1\n        System.out.println(\"Last index of 'Mango': \" + fruits.lastIndexOf(\"Mango\")); // Output: 3\n        // 9. Duyệt List bằng vòng lặp for-each\n        System.out.println(\"\\nIterating with for-each loop:\");\n        for (String fruit : fruits) {\n            System.out.println(fruit);\n        }\n        // 10. Duyệt List bằng Iterator\n        System.out.println(\"\\nIterating with Iterator:\");\n        Iterator<String> it = fruits.iterator();\n        while (it.hasNext()) {\n            System.out.println(it.next());\n            // it.remove(); // Có thể xóa phần tử an toàn khi duyệt\n        }\n        // 11. Duyệt List bằng ListIterator (tiến và lùi)\n        System.out.println(\"\\nIterating with ListIterator (forward):\");\n        ListIterator<String> listIt = fruits.listIterator();\n        while (listIt.hasNext()) {\n            System.out.println(listIt.next() + \" (next index: \" + listIt.nextIndex() + \")\");\n        }\n        System.out.println(\"\\nIterating with ListIterator (backward):\");\n        // listIt đang ở cuối sau vòng lặp trên.\n        while (listIt.hasPrevious()) {\n            System.out.println(listIt.previous() + \" (previous index: \" + listIt.previousIndex() + \")\");\n        }\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-11",
    "question": "So sánh sự giống và khác nhau giữa  ArrayList, Vector, LinkedList? và đặc điểm từng loaij",
    "answer": "Cơ chế lưu trữ: Dựa trên cấu trúc dữ liệu danh sách liên kết kép (doubly linked list). Mỗi phần tử (node) trong LinkedList chứa dữ liệu, một tham chiếu đến phần tử tiếp theo, và một tham chiếu đến phần tử trước đó.\nTính Thread-Safety: Không thread-safe. Tương tự như ArrayList, LinkedList không có cơ chế đồng bộ hóa tích hợp. ArrayList\nĐặc điểm:\nCơ chế lưu trữ: Dựa trên một mảng động (resizable array) bên trong. Khi mảng đầy, nó sẽ tạo một mảng mới lớn hơn (thường là 1.5 lần kích thước hiện tại) và sao chép tất cả các phần tử cũ sang mảng mới.\nTính Thread-Safety: Không thread-safe. Các phương thức của ArrayList không được đồng bộ hóa. Điều này có nghĩa là nếu nhiều luồng cùng lúc truy cập và sửa đổi một ArrayList mà không có cơ chế đồng bộ hóa bên ngoài, có thể xảy ra các vấn đề về tính nhất quán dữ liệu (race conditions).",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Core-12",
    "question": "Nắm được sự khác nhau giữa  Comparator and Comparable? và đặc điểm của chúng",
    "answer": "Đặc điểm:\n\n\"Tự so sánh\" (Self-comparable): Interface Comparable được triển khai bởi chính lớp đối tượng mà bạn muốn sắp xếp. Điều này có nghĩa là một đối tượng có khả năng so sánh chính nó với một đối tượng khác cùng loại.\nThứ tự tự nhiên (Natural Ordering): Comparable được sử dụng để định nghĩa thứ tự tự nhiên (natural ordering) của các đối tượng trong một lớp. Đây là cách sắp xếp mặc định mà các đối tượng của lớp đó sẽ tuân theo khi được sắp xếp mà không có tiêu chí sắp xếp cụ thể nào khác được cung cấp.Quy ước chặt chẽ: Việc triển khai compareTo() phải tuân thủ các quy tắc sau:\nsgn(x.compareTo(y)) == -sgn(y.compareTo(x)) (tính đối xứng).\nNếu x.compareTo(y) > 0 và y.compareTo(z) > 0 thì x.compareTo(z) > 0 (tính bắc cầu).\nx.compareTo(y) == 0 ngụ ý sgn(x.compareTo(z)) == sgn(y.compareTo(z)) cho tất cả z (tính nhất quán).\nCần đảm bảo (x.compareTo(y) == 0) khi và chỉ khi (x.equals(y)) là lý tưởng (nhưng không bắt buộc). Nếu không, cần ghi rõ.",
    "examples": [
     "Before sorting (Comparable):\nPerson [name=Alice, age=30]\nPerson [name=Charlie, age=25]\nPerson [name=Bob, age=35]\nPerson [name=Alice, age=28]\n\nAfter sorting by name (using Comparable):\nPerson [name=Alice, age=30]\nPerson [name=Alice, age=28]\nPerson [name=Bob, age=35]\nPerson [name=Charlie, age=25]",
     "class Person implements Comparable<Person> {\n    private String name;\n    private int age;\n    @Override\n    public String toString() {\n        return \"Person [name=\" + name + \", age=\" + age + \"]\";\n    }\n    @Override\n    public int compareTo(Person other) {\n        // Định nghĩa thứ tự tự nhiên: sắp xếp theo tên (từ A-Z)\n        return this.name.compareTo(other.name);\n    }\n}\npublic class ComparableExample {\n    public static void main(String[] args) {\n        List<Person> people = new ArrayList<>();\n        people.add(new Person(\"Alice\", 30));\n        people.add(new Person(\"Charlie\", 25));\n        people.add(new Person(\"Bob\", 35));\n        people.add(new Person(\"Alice\", 28)); // Một người Alice khác\n        System.out.println(\"Before sorting (Comparable):\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n        Collections.sort(people); // Sắp xếp bằng thứ tự tự nhiên (compareTo của Person)\n        System.out.println(\"\\nAfter sorting by name (using Comparable):\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-13",
    "question": "Nắm được sự khác nhau giữa  Comparator and Comparable",
    "answer": "Sử dụng Comparable khi:\n\nBạn muốn định nghĩa một thứ tự mặc định hoặc \"tự nhiên\" cho các đối tượng của lớp bạn.\nBạn có quyền sửa đổi mã nguồn của lớp đó.\nLớp đó chỉ có một tiêu chí sắp xếp chính mà bạn muốn nó tuân theo một cách nhất quán.\nSử dụng Comparator khi:\n\nBạn muốn định nghĩa nhiều cách sắp xếp khác nhau cho cùng một lớp đối tượng.\nBạn không có quyền sửa đổi mã nguồn của lớp đối tượng (ví dụ: các lớp có sẵn trong Java API như String, Integer đã có Comparable nhưng bạn muốn sắp xếp theo cách khác).\nLớp đã có thứ tự tự nhiên (Comparable), nhưng bạn cần một thứ tự khác cho một trường hợp cụ thể mà không muốn thay đổi thứ tự tự nhiên.\nBạn muốn sắp xếp các đối tượng theo nhiều tiêu chí (ví dụ: sắp xếp theo tên, sau đó theo tuổi).",
    "examples": [
     "Original List:\nPerson [name=Alice, age=30]\nPerson [name=Charlie, age=25]\nPerson [name=Bob, age=35]\nPerson [name=Alice, age=28]\n\nAfter sorting by age (ascending, using Comparator):\nPerson [name=Charlie, age=25]\nPerson [name=Alice, age=28]\nPerson [name=Alice, age=30]\nPerson [name=Bob, age=35]\n\nAfter sorting by name (descending, using Comparator.comparing().reversed()):\nPerson [name=Charlie, age=25]\nPerson [name=Bob, age=35]\nPerson [name=Alice, age=30]\nPerson [name=Alice, age=28]\n\nAfter sorting by name then by age (using Comparator.comparing().thenComparing()):\nPerson [name=Alice, age=28]\nPerson [name=Alice, age=30]\nPerson [name=Bob, age=35]\nPerson [name=Charlie, age=25]",
     "public class ComparatorExample {\n    public static void main(String[] args) {\n        List<Person> people = new ArrayList<>();\n        people.add(new Person(\"Alice\", 30));\n        people.add(new Person(\"Charlie\", 25));\n        people.add(new Person(\"Bob\", 35));\n        people.add(new Person(\"Alice\", 28)); // Một người Alice khác\n        System.out.println(\"Original List:\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n        // --- Sắp xếp theo tuổi (tăng dần) sử dụng Anonymous Inner Class ---\n        Collections.sort(people, new Comparator<Person>() {\n            @Override\n            public int compare(Person p1, Person p2) {\n                return Integer.compare(p1.getAge(), p2.getAge());\n            }\n        });\n        System.out.println(\"\\nAfter sorting by age (ascending, using Comparator):\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n        // --- Sắp xếp theo tên (giảm dần) sử dụng Lambda Expression (Java 8+) ---\n        // Comparator.comparing() là một helper method rất tiện lợi\n        Collections.sort(people, Comparator.comparing(Person::getName).reversed());\n        System.out.println(\"\\nAfter sorting by name (descending, using Comparator.comparing().reversed()):\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n        // --- Sắp xếp theo nhiều tiêu chí: theo tên tăng dần, nếu tên giống nhau thì theo tuổi tăng dần ---\n        Collections.sort(people, Comparator.comparing(Person::getName)\n                                           .thenComparing(Person::getAge));\n        System.out.println(\"\\nAfter sorting by name then by age (using Comparator.comparing().thenComparing()):\");\n        for (Person p : people) {\n            System.out.println(p);\n        }\n    }"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-14",
    "question": "Hiểu về đặc điểm interface Set?",
    "answer": "Set là tập hợp không có phần tử trùng lặp. Nó không đảm bảo thứ tự của các phần tử theo mặc định. Lựa chọn giữa HashSet, LinkedHashSet, và TreeSet phụ thuộc vào yêu cầu của bạn về hiệu suất, thứ tự các phần tử, và liệu bạn có cần sắp xếp tự động hay không.",
    "examples": [
     "HashSet:\n\nCơ chế lưu trữ: Dựa trên một bảng băm (hash table) để lưu trữ các phần tử. Nó sử dụng mã băm (hashCode()) và phương thức equals() của các phần tử để xác định tính duy nhất và vị trí lưu trữ.\nThứ tự: Không đảm bảo thứ tự của các phần tử. Thứ tự có thể thay đổi theo thời gian.\nHiệu suất: Cung cấp hiệu suất tốt nhất cho các thao tác cơ bản như thêm (add()), xóa (remove()), và kiểm tra sự tồn tại (contains()). Các thao tác này thường có độ phức tạp trung bình là O(1) (thời gian hằng số) nếu hàm băm phân phối tốt.\nPhù hợp khi: Bạn cần các thao tác tìm kiếm, thêm, xóa nhanh chóng và không quan tâm đến thứ tự của các phần tử.\nLinkedHashSet:\nCơ chế lưu trữ: Kế thừa từ HashSet và kết hợp với một danh sách liên kết (linked list) để duy trì thứ tự chèn.\nThứ tự: Duy trì thứ tự chèn (insertion order) của các phần tử.\nHiệu suất: Hiệu suất tương tự HashSet cho các thao tác cơ bản, nhưng có chi phí cao hơn một chút do việc duy trì danh sách liên kết.\nPhù hợp khi: Bạn cần một Set không có trùng lặp và vẫn muốn duy trì thứ tự mà các phần tử được thêm vào.\nTreeSet:\nCơ chế lưu trữ: Dựa trên một cây tìm kiếm nhị phân cân bằng (balanced binary search tree), cụ thể là Red-Black Tree.\nThứ tự: Duy trì các phần tử theo thứ tự sắp xếp tự nhiên (natural order) của chúng (nếu các phần tử triển khai Comparable) hoặc theo một Comparator được cung cấp khi tạo TreeSet.\nHiệu suất: Các thao tác add(), remove(), contains() có độ phức tạp là O(log n) (logarithmic time). Nó cũng cung cấp các phương thức để tìm kiếm phần tử nhỏ nhất/lớn nhất, phần tử nhỏ hơn/lớn hơn một ngưỡng nào đó.\nPhù hợp khi: Bạn cần một Set không có trùng lặp và các phần tử cần được sắp xếp tự động, hoặc bạn cần các thao tác liên quan đến thứ tự (như tìm kiếm phần tử nhỏ nhất, lớn nhất, trong một phạm vi).",
     "public class SetExample {\n    public static void main(String[] args) {\n        // --- 1. Sử dụng HashSet (không có thứ tự, nhanh) ---\n        System.out.println(\"--- HashSet Example ---\");\n        Set<String> hashSet = new HashSet<>();\n        hashSet.add(\"Apple\");\n        hashSet.add(\"Banana\");\n        hashSet.add(\"Cherry\");\n        hashSet.add(\"Apple\"); // Thêm trùng lặp, sẽ bị bỏ qua\n        hashSet.add(\"Date\");\n        hashSet.add(\"Banana\"); // Thêm trùng lặp, sẽ bị bỏ qua\n        hashSet.add(null);   // Cho phép null\n        hashSet.add(null);   // Null thứ hai sẽ bị bỏ qua\n\n        System.out.println(\"HashSet: \" + hashSet);\n        // Output có thể thay đổi thứ tự: [null, Apple, Date, Banana, Cherry] hoặc tương tự\n        System.out.println(\"Size of HashSet: \" + hashSet.size()); // Output: 5 (null, Apple, Banana, Cherry, Date)\n        System.out.println(\"Contains 'Banana'? \" + hashSet.contains(\"Banana\")); // Output: true\n        System.out.println(\"Remove 'Cherry': \" + hashSet.remove(\"Cherry\")); // Output: true\n        System.out.println(\"HashSet after removal: \" + hashSet);\n\n        // --- 2. Sử dụng LinkedHashSet (duy trì thứ tự chèn) ---\n        System.out.println(\"\\n--- LinkedHashSet Example ---\");\n        Set<String> linkedHashSet = new LinkedHashSet<>();\n        linkedHashSet.add(\"Apple\");\n        linkedHashSet.add(\"Banana\");\n        linkedHashSet.add(\"Cherry\");\n        linkedHashSet.add(\"Apple\"); // Trùng lặp\n        linkedHashSet.add(\"Date\");\n        linkedHashSet.add(null);\n        System.out.println(\"LinkedHashSet: \" + linkedHashSet);\n        // Output: [Apple, Banana, Cherry, Date, null] (thứ tự chèn được duy trì)\n        System.out.println(\"Size of LinkedHashSet: \" + linkedHashSet.size()); // Output: 5\n        // --- 3. Sử dụng TreeSet (sắp xếp tự động) ---\n        System.out.println(\"\\n--- TreeSet Example ---\");\n        Set<String> treeSet = new TreeSet<>();\n        treeSet.add(\"Apple\");\n        treeSet.add(\"Banana\");\n        treeSet.add(\"Cherry\");\n        treeSet.add(\"Apple\"); // Trùng lặp\n        treeSet.add(\"Date\");\n        // treeSet.add(null); // TreeSet KHÔNG cho phép null trừ khi Comparator xử lý null\n        System.out.println(\"TreeSet: \" + treeSet);\n        // Output: [Apple, Banana, Cherry, Date] (sắp xếp theo thứ tự từ điển)\n        System.out.println(\"Size of TreeSet: \" + treeSet.size()); // Output: 4\n        // TreeSet với số nguyên\n        Set<Integer> sortedNumbers = new TreeSet<>();\n        sortedNumbers.add(5);\n        sortedNumbers.add(2);\n        sortedNumbers.add(8);\n        sortedNumbers.add(2); // Trùng lặp\n        sortedNumbers.add(1);\n        System.out.println(\"TreeSet of Integers: \" + sortedNumbers); // Output: [1, 2, 5, 8]\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-15",
    "question": "Hiểu về đặc điểm interface Map?",
    "answer": "Không kế thừa từ Collection\nĐây là một điểm khác biệt lớn so với List và Set. Interface Map không kế thừa từ Collection. Thay vào đó, nó là một giao diện độc lập trong Java Collections Framework. Điều này là do Map đại diện cho một ánh xạ (mapping), không phải là một tập hợp đơn thuần của các phần tử.Tuy nhiên, bạn có thể xem Map như một tập hợp của các cặp Entry (khóa-giá trị), hoặc một tập hợp của các khóa, hoặc một tập hợp của các giá trị. Map cung cấp các phương thức để lấy các \"collection view\" này:\nSet<K> keySet(): Trả về một Set chứa tất cả các khóa trong Map.\nCollection<V> values(): Trả về một Collection chứa tất cả các giá trị trong Map.\nSet<Map.Entry<K, V>> entrySet(): Trả về một Set chứa tất cả các cặp khóa-giá trị (Map.Entry) trong Map.",
    "examples": [
     "Các lớp triển khai phổ biến của Map\nLà một interface, Map không thể được khởi tạo trực tiếp. Thay vào đó, bạn sử dụng các lớp cụ thể triển khai interface này. Mỗi lớp triển khai có những đặc điểm riêng về hiệu suất và cách lưu trữ:\nHashMap:\nCơ chế lưu trữ: Dựa trên một bảng băm (hash table). Nó sử dụng mã băm (hashCode()) và phương thức equals() của các khóa để xác định tính duy nhất và vị trí lưu trữ.\nThứ tự: Không đảm bảo thứ tự của các cặp. Thứ tự có thể thay đổi.\nHiệu suất: Cung cấp hiệu suất tốt nhất cho các thao tác cơ bản như thêm (put()), lấy (get()), và xóa (remove()). Các thao tác này thường có độ phức tạp trung bình là O(1) (thời gian hằng số) nếu hàm băm phân phối tốt.\nThread-Safety: Không thread-safe.\nKhóa/Giá trị null: Cho phép một khóa null duy nhất và nhiều giá trị null.\nPhù hợp khi: Bạn cần các thao tác tìm kiếm, thêm, xóa theo khóa nhanh chóng và không quan tâm đến thứ tự của các cặp khóa-giá trị. Đây là triển khai Map được sử dụng phổ biến nhất.\nLinkedHashMap:\nCơ chế lưu trữ: Kế thừa từ HashMap và kết hợp với một danh sách liên kết kép (doubly linked list) để duy trì thứ tự.\nThứ tự: Duy trì thứ tự chèn (insertion order) của các cặp khóa-giá trị. Có một tùy chọn để duy trì thứ tự truy cập (access order) thay vì thứ tự chèn, hữu ích cho các cache LRU (Least Recently Used).\nHiệu suất: Hiệu suất tương tự HashMap cho các thao tác cơ bản, nhưng có chi phí cao hơn một chút do việc duy trì danh sách liên kết.\nThread-Safety: Không thread-safe.\nKhóa/Giá trị null: Cho phép một khóa null duy nhất và nhiều giá trị null.\nPhù hợp khi: Bạn cần một Map mà vẫn muốn duy trì thứ tự mà các cặp khóa-giá trị được thêm vào (hoặc truy cập).\nTreeMap:\nCơ chế lưu trữ: Dựa trên một cây tìm kiếm nhị phân cân bằng (balanced binary search tree), cụ thể là Red-Black Tree.\nThứ tự: Duy trì các cặp khóa-giá trị theo thứ tự sắp xếp tự nhiên (natural order) của các khóa (nếu các khóa triển khai Comparable) hoặc theo một Comparator được cung cấp khi tạo TreeMap.\nHiệu suất: Các thao tác put(), get(), remove() có độ phức tạp là O(log n) (logarithmic time). Nó cũng cung cấp các phương thức để tìm kiếm khóa nhỏ nhất/lớn nhất, các cặp trong một phạm vi, v.v.\nThread-Safety: Không thread-safe.\nKhóa/Giá trị null: Không cho phép khóa null (sẽ ném NullPointerException nếu bạn cố gắng thêm khóa null trừ khi Comparator xử lý null), nhưng cho phép giá trị null.\nPhù hợp khi: Bạn cần một Map mà các khóa cần được sắp xếp tự động, hoặc bạn cần các thao tác liên quan đến thứ tự của khóa (như tìm kiếm khóa nhỏ nhất, lớn nhất, trong một phạm vi).\nHashtable\nCơ chế lưu trữ: Tương tự HashMap (dựa trên bảng băm).\nThread-Safety: Là thread-safe (các phương thức được đồng bộ hóa).\nHiệu suất: Chậm hơn HashMap do chi phí đồng bộ hóa.\nKhóa/Giá trị null: Không cho phép khóa null HOẶC giá trị null.\nLegacy Class: Là một lớp cũ hơn, có từ Java 1.0.\nSử dụng: Thường không được khuyến khích sử dụng trong code mới. Thay vào đó, nếu cần thread-safety, hãy dùng ConcurrentHashMap từ java.util.concurrent.",
     "public class MapIterationExample {\n    public static void main(String[] args) {\n        Map<String, String> countryCapitals = new HashMap<>();\n        countryCapitals.put(\"USA\", \"Washington D.C.\");\n        countryCapitals.put(\"France\", \"Paris\");\n        countryCapitals.put(\"Germany\", \"Berlin\");\n        countryCapitals.put(\"Japan\", \"Tokyo\");\n\n        // 1. Duyệt qua keySet() - chỉ lấy khóa\n        System.out.println(\"--- Iterating through keys ---\");\n        for (String country : countryCapitals.keySet()) {\n            System.out.println(\"Country: \" + country);\n        }\n\n        // 2. Duyệt qua values() - chỉ lấy giá trị\n        System.out.println(\"\\n--- Iterating through values ---\");\n        for (String capital : countryCapitals.values()) {\n            System.out.println(\"Capital: \" + capital);\n        }\n\n        // 3. Duyệt qua entrySet() - lấy cả khóa và giá trị (đây là cách phổ biến nhất)\n        System.out.println(\"\\n--- Iterating through key-value pairs (Entry Set) ---\");\n        for (Map.Entry<String, String> entry : countryCapitals.entrySet()) {\n            System.out.println(\"Country: \" + entry.getKey() + \", Capital: \" + entry.getValue());\n        }\n\n        // 4. Duyệt bằng forEach (Java 8+)\n        System.out.println(\"\\n--- Iterating using forEach (Java 8+) ---\");\n        countryCapitals.forEach((country, capital) ->\n            System.out.println(\"Country: \" + country + \", Capital: \" + capital)\n        );\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-16",
    "question": "Hiểu về Generic và các loại Generic Method/Class?",
    "answer": "Generic Class (Lớp Generic)\nMột lớp generic được định nghĩa với một hoặc nhiều tham số kiểu (type parameters) trong dấu ngoặc nhọn <>. Các tham số kiểu này hoạt động như các biến placeholder cho các kiểu dữ liệu mà lớp sẽ làm việc.\n\nCú pháp: class ClassName<T1, T2, ...>\n\nT: Type (loại phổ biến nhất)\nE: Element (dùng trong Collection)\nK: Key (dùng trong Map)\nV: Value (dùng trong Map)\nN: Number\nS, U: Loại thứ hai, thứ ba...",
    "examples": [
     "// Định nghĩa Generic Class Box\nclass Box<T> { // T là tham số kiểu\n    private T content; // Kiểu của content là T\n\n    public Box(T content) {\n        this.content = content;\n    }\n\n    public T getContent() {\n        return content;\n    }\n\n    public void setContent(T content) {\n        this.content = content;\n    }\n\n    public void displayContentInfo() {\n        System.out.println(\"Content type: \" + content.getClass().getName());\n    }\n}\n\npublic class GenericClassExample {\n    public static void main(String[] args) {\n        // Tạo một Box chứa String\n        Box<String> stringBox = new Box<>(\"Java Programming\");\n        System.out.println(\"String Box content: \" + stringBox.getContent());\n        stringBox.displayContentInfo(); // Output: Content type: java.lang.String\n\n        // Tạo một Box chứa Integer\n        Box<Integer> integerBox = new Box<>(123);\n        System.out.println(\"Integer Box content: \" + integerBox.getContent());\n        integerBox.displayContentInfo(); // Output: Content type: java.lang.Integer\n\n        // Box<Double> doubleBox = new Box<>(3.14);\n        // System.out.println(\"Double Box content: \" + doubleBox.getContent());\n    }\n}",
     "// Định nghĩa Generic Interface Processor\ninterface Processor<T> {\n    void process(T data);\n    T getResult();\n}\n\n// Lớp triển khai Processor cho String\nclass StringProcessor implements Processor<String> {\n    private String processedData = \"\";\n    @Override\n    public void process(String data) {\n        this.processedData += data.toUpperCase(); // Chuyển đổi thành chữ hoa\n    }\n    @Override\n    public String getResult() {\n        return processedData;\n    }\n}\n// Lớp triển khai Processor cho Integer\nclass IntegerProcessor implements Processor<Integer> {\n    private int sum = 0;\n\n    @Override\n    public void process(Integer data) {\n        this.sum += data; // Tính tổng\n    }\n\n    @Override\n    public Integer getResult() {\n        return sum;\n    }\n}\npublic class GenericInterfaceExample {\n    public static void main(String[] args) {\n        StringProcessor sp = new StringProcessor();\n        sp.process(\"hello\");\n        sp.process(\"world\");\n        System.out.println(\"String Processor Result: \" + sp.getResult()); // Output: HELLOWORLD\n\n        IntegerProcessor ip = new IntegerProcessor();\n        ip.process(10);\n        ip.process(20);\n        ip.process(30);\n        System.out.println(\"Integer Processor Result: \" + ip.getResult()); // Output: 60\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-17",
    "question": "Hiểu về Exception và cơ chế handing trong java?",
    "answer": "try block:\nChứa đoạn code có khả năng ném ra một hoặc nhiều ngoại lệ.\nNếu một ngoại lệ xảy ra trong khối try, luồng điều khiển sẽ ngay lập tức chuyển đến khối catch phù hợp.\nNếu không có ngoại lệ nào xảy ra, khối catch sẽ bị bỏ qua.\ncatch block(s):\nNgay sau khối try. Một khối try có thể có nhiều khối catch, mỗi khối xử lý một loại ngoại lệ khác nhau.\nChứa code để xử lý (handle) ngoại lệ đã được bắt.\nKhi một ngoại lệ được ném, JVM sẽ tìm kiếm khối catch phù hợp nhất (khớp với kiểu ngoại lệ hoặc kiểu cha của nó) để xử lý.\nfinally block:\nLuôn luôn được thực thi, bất kể có ngoại lệ xảy ra hay không, hay có được bắt hay không.\nĐược sử dụng để dọn dẹp tài nguyên (ví dụ: đóng file, đóng kết nối cơ sở dữ liệu) để đảm bảo không bị rò rỉ tài nguyên.\nKhối finally sẽ được thực thi ngay cả khi có return, break, hoặc continue trong khối try hoặc catch.\nNgoại lệ duy nhất có thể ngăn finally thực thi là System.exit() hoặc một Error nghiêm trọng xảy ra.try {\n    // Code có khả năng ném ra ngoại lệ\n    // Ví dụ: int result = 10 / 0;\n    // Ví dụ: FileReader fr = new FileReader(\"nonExistentFile.txt\");\n} catch (ArithmeticException e) {\n    // Xử lý ArithmeticException\n    System.err.println(\"Error: Cannot divide by zero! \" + e.getMessage());\n} catch (FileNotFoundException e) {\n    // Xử lý FileNotFoundException\n    System.err.println(\"Error: File not found! \" + e.getMessage());\n} catch (Exception e) { // Bắt các loại Exception khác\n    System.err.println(\"An unexpected error occurred: \" + e.getMessage());\n    e.printStackTrace(); // In stack trace để debug\n} finally {\n    // Code luôn được thực thi, dùng để dọn dẹp tài nguyên\n    System.out.println(\"Finally block executed.\");\n}",
    "examples": [
     "Từ khóa throws\nKhi một phương thức có thể ném ra một checked exception và bạn không muốn xử lý nó bên trong phương thức đó, bạn phải khai báo ngoại lệ đó bằng từ khóa throws trong chữ ký phương thức.\nĐiều này \"đẩy\" trách nhiệm xử lý ngoại lệ lên phương thức gọi (caller method).\nNếu một phương thức gọi phương thức có throws, nó cũng phải try-catch hoặc throws ngoại lệ đó.public class ThrowsExample {\n    // Phương thức này khai báo rằng nó có thể ném ra IOException\n    public void readFile(String filePath) throws IOException {\n        FileReader reader = new FileReader(filePath);\n        // ... đọc file ...\n        reader.close(); // Đóng tài nguyên\n        System.out.println(\"File \" + filePath + \" read successfully.\");\n    }\n    public static void main(String[] args) {\n        ThrowsExample example = new ThrowsExample();\n        try {\n            // Phương thức main phải bắt hoặc throws IOException\n            example.readFile(\"myFile.txt\");\n        } catch (IOException e) {\n            System.err.println(\"An error occurred while reading the file: \" + e.getMessage());\n            e.printStackTrace();\n        } finally {\n            System.out.println(\"Main method's finally block executed.\");\n        }\n    }\n}",
     "throw từ khóa\nTừ khóa throw được sử dụng để ném một đối tượng ngoại lệ một cách tường minh từ một đoạn code.\nBạn có thể ném một ngoại lệ đã tồn tại (ví dụ: new IllegalArgumentException()) hoặc một ngoại lệ tùy chỉnh do bạn tự định nghĩa.public void validateAge(int age) {\n    if (age < 0 || age > 150) {\n        // Ném một ngoại lệ IllegalArgumentException\n        throw new IllegalArgumentException(\"Age must be between 0 and 150.\");\n    }\n    System.out.println(\"Age is valid: \" + age);\n}\n\npublic static void main(String[] args) {\n    ThrowsExample example = new ThrowsExample();\n    try {\n        example.validateAge(25);\n        example.validateAge(-5); // Lệnh này sẽ ném ngoại lệ\n        example.validateAge(100); // Lệnh này sẽ không bao giờ được thực thi\n    } catch (IllegalArgumentException e) {\n        System.err.println(\"Validation Error: \" + e.getMessage());\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-18",
    "question": "so sánh equals() và toán tử \"==\"?",
    "answer": "Toán tử ==\nToán tử == dùng để so sánh hai giá trị (value) hoặc hai địa chỉ bộ nhớ (memory address).\n\nVới các kiểu dữ liệu nguyên thủy (primitive types): == so sánh giá trị thực của chúng.\n\nVí dụ: int a = 10; int b = 10; thì a == b sẽ trả về true vì giá trị của a và b đều là 10.\n\nVới các đối tượng (objects): == so sánh địa chỉ ô nhớ. Nó kiểm tra xem hai biến có cùng trỏ đến một đối tượng duy nhất trên heap hay không.\n\nVí dụ: String s1 = new String(\"hello\"); String s2 = new String(\"hello\"); thì s1 == s2 sẽ trả về false vì s1 và s2 là hai đối tượng khác nhau, nằm ở hai vị trí bộ nhớ khác nhau, mặc dù nội dung của chúng giống nhau.",
    "examples": [
     "Phương thức equals() (được định nghĩa trong lớp Object) dùng để so sánh nội dung của hai đối tượng.\n\nMặc định, phương thức equals() trong lớp Object có cùng hành vi với ==, tức là nó cũng so sánh địa chỉ bộ nhớ.\n\nTuy nhiên, hầu hết các lớp trong Java như String, Integer, Date đều đã ghi đè (override) phương thức này để so sánh nội dung.\n\nVí dụ:\n\nString s1 = new String(\"hello\"); String s2 = new String(\"hello\"); thì s1.equals(s2) sẽ trả về true vì phương thức equals() của lớp String được ghi đè để so sánh nội dung chuỗi.\n\nObject obj1 = new Object(); Object obj2 = new Object(); thì obj1.equals(obj2) sẽ trả về false vì lớp Object không ghi đè phương thức này.",
     "class Person {\n    String name;\n    Person(String name) {\n        this.name = name;\n    }\n}\nPerson p1 = new Person(\"Tien\");\nPerson p2 = new Person(\"Tien\");\nboolean result = p1.equals(p2); // false      String s1 = new String(\"hello\");\nString s2 = new String(\"hello\");\nboolean result = s1.equals(s2); // true"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-19",
    "question": "Tiêu chí Mảng Collection                              tiêu chí\tMảng\tCollection\nKích thước\tCố định\tThay đổi linh hoạt\nKiểu dữ liệu\tHỗ trợ cả primitive & object\tChỉ hỗ trợ object\nHiệu suất\tNhanh hơn\tChậm hơn (vì nhiều chức năng)\nChức năng nâng cao\tKhông\tCó (sắp xếp, tìm kiếm, filter...)\nDễ dùng\tĐơn giản\tLinh hoạt và mạnh hơn",
    "answer": "Các tiêu chí để phân biệt giữa Mảng (Array) và Collection trong lập trình là:\n\nMảng (Array)\nKích thước cố định: Một khi đã khai báo, kích thước của mảng không thể thay đổi. Bạn cần xác định số lượng phần tử ngay từ đầu.\nKiểu dữ liệu đồng nhất: Tất cả các phần tử trong mảng phải cùng một kiểu dữ liệu (ví dụ: mảng số nguyên, mảng chuỗi).\nTruy cập phần tử: Truy cập phần tử bằng chỉ số (index), bắt đầu từ 0. Việc này rất nhanh chóng và hiệu quả.\nLưu trữ: Các phần tử được lưu trữ liên tục trong bộ nhớ, giúp tối ưu hóa hiệu suất truy cập.\nCú pháp: Thường được biểu diễn bằng dấu ngoặc vuông [] sau tên kiểu dữ liệu hoặc tên biến.\nVí dụ: int[] numbers = new int[5]; (mảng 5 số nguyên), String[] names = {\"Alice\", \"Bob\"}; (mảng chuỗi).",
    "examples": [
     "Tóm lại, mảng là một cấu trúc dữ liệu cơ bản, cố định và hiệu quả cho các tác vụ cần truy cập nhanh và biết trước kích thước. Trong khi đó, collection là một tập hợp các framework và API cung cấp các cấu trúc dữ liệu linh hoạt, mạnh mẽ hơn để quản lý và thao tác với các nhóm đối tượng trong nhiều tình huống khác nhau. Trong thực tế, bạn sẽ sử dụng collection thường xuyên hơn vì tính linh hoạt và các tính năng phong phú mà chúng cung cấp.",
     "Collection\nKích thước động: Kích thước của collection có thể thay đổi linh hoạt trong quá trình chạy chương trình. Bạn có thể thêm, xóa phần tử mà không cần quan tâm đến kích thước ban đầu.\nKiểu dữ liệu đa dạng (tùy loại collection): Một số loại collection cho phép lưu trữ các phần tử có kiểu dữ liệu khác nhau (ví dụ: ArrayList trong Java có thể chứa cả số và chuỗi nếu không sử dụng generics), trong khi một số khác lại yêu cầu kiểu dữ liệu đồng nhất (khi sử dụng generics, ví dụ List<String>).\nTruy cập phần tử: Cách truy cập phần tử đa dạng hơn, tùy thuộc vào loại collection. Có thể truy cập bằng chỉ số (như List), bằng khóa (như Map), hoặc thông qua lặp (iterator). Việc này có thể chậm hơn so với truy cập bằng chỉ số trong mảng.\nLưu trữ: Các phần tử không nhất thiết phải được lưu trữ liên tục trong bộ nhớ.\nTính năng phong phú: Cung cấp nhiều phương thức tiện ích để thao tác với dữ liệu như thêm, xóa, tìm kiếm, sắp xếp, lọc...\nPhân loại: Là một khái niệm trừu tượng, có nhiều loại collection khác nhau được triển khai dưới dạng các cấu trúc dữ liệu cụ thể như:\nList (Danh sách): Duy trì thứ tự thêm vào, cho phép trùng lặp. Ví dụ: ArrayList, LinkedList.\nSet (Tập hợp): Không duy trì thứ tự, không cho phép trùng lặp. Ví dụ: HashSet, TreeSet.\nMap (Ánh xạ/Từ điển): Lưu trữ dữ liệu dưới dạng cặp khóa-giá trị, khóa là duy nhất. Ví dụ: HashMap, TreeMap.\nQueue (Hàng đợi): Hoạt động theo nguyên tắc vào trước ra trước (FIFO - First-In, First-Out). Ví dụ: ArrayDeque.\nStack (Ngăn xếp): Hoạt động theo nguyên tắc vào sau ra trước (LIFO - Last-In, First-Out).\nVí dụ: List<Integer> ages = new ArrayList<>(); (danh sách số nguyên có thể thay đổi kích thước), Map<String, String> capitals = new HashMap<>(); (ánh xạ tên quốc gia với thủ đô)."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-20",
    "question": "Phân biệt & với &&",
    "answer": "Trong phần lớn các trường hợp kiểm tra điều kiện trong lập trình, bạn sẽ sử dụng toán tử && vì tính hiệu quả và khả năng ngăn chặn lỗi tiềm ẩn. Toán tử & được dùng chủ yếu khi bạn muốn thực hiện các thao tác trên bit của các số nguyên hoặc trong những trường hợp hiếm hoi bạn thực sự cần cả hai vế của biểu thức boolean phải được đánh giá.",
    "examples": [
     "// Bitwise AND\nint x = 5;  // Binary: 0101\nint y = 3;  // Binary: 0011\nint result = x & y; // Binary: 0001 (Decimal: 1)\nSystem.out.println(\"Bitwise AND: \" + result); // Output: Bitwise AND: 1\n\n// Logical AND (không rút gọn)\nint a = 5;\nint b = 0;\n\n// Cả (a > 10) VÀ (a / b) > 0 đều sẽ được đánh giá.\n// Điều này sẽ gây ra lỗi \"java.lang.ArithmeticException: / by zero\"\n// vì phép chia cho 0 sẽ được thực hiện.\n// if (a > 10 & (a / b) > 0) {\n//     System.out.println(\"Cả hai điều kiện đều đúng\");\n// } else {\n//     System.out.println(\"Một hoặc cả hai điều kiện đều sai\");\n// }\n\nboolean cond1 = false;\nboolean cond2 = true;\nboolean finalResult = cond1 & cond2; // cond2 vẫn được đánh giá mặc dù cond1 là false\nSystem.out.println(\"Logical AND đầy đủ: \" + finalResult); // Output: Logical AND đầy đủ: false"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-21",
    "question": "Hiểu ý nghĩa và mục đích sử dụng từ khóa \"static\" trong java?",
    "answer": "Biến static (Static Variables / Class Variables)\nMục đích: Để lưu trữ dữ liệu chung cho tất cả các đối tượng của một lớp. Thường dùng cho các hằng số hoặc các giá trị cần được chia sẻ.\n\nVí dụ:\n\nBiến đếm số lượng đối tượng: Mỗi khi một đối tượng mới được tạo, biến static này có thể tăng lên.\nHằng số: Các giá trị không thay đổi, ví dụ Math.PI trong lớp java.lang.Math hoặc System.out trong lớp java.lang.System.\nCấu hình chung: Một cấu hình nào đó mà tất cả các phần của ứng dụng cần biết.class Student {\n    String name;\n    int id;\n    static String university = \"Hanoi University\"; // Biến static: Chung cho tất cả sinh viên\n\n    public Student(String name, int id) {\n        this.name = name;\n        this.id = id;\n    }\n\n    void display() {\n        System.out.println(\"Name: \" + name + \", ID: \" + id + \", University: \" + university);\n    }\n}\n\npublic class StaticVariableDemo {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Alice\", 101);\n        Student s2 = new Student(\"Bob\", 102);\n\n        s1.display(); // Name: Alice, ID: 101, University: Hanoi University\n        s2.display(); // Name: Bob, ID: 102, University: Hanoi University\n\n        // Có thể truy cập biến static trực tiếp qua tên lớp\n        System.out.println(\"Current University: \" + Student.university);\n\n        // Thay đổi biến static sẽ ảnh hưởng đến tất cả các đối tượng\n        Student.university = \"National University\";\n        s1.display(); // Name: Alice, ID: 101, University: National University\n    }\n}",
    "examples": [
     "Phương thức static (Static Methods / Class Methods)\nMục đích: Để thực hiện các thao tác không cần truy cập dữ liệu của một đối tượng cụ thể. Thường dùng cho các hàm tiện ích (utility functions) hoặc các tác vụ liên quan đến chính lớp.\n\nVí dụ:\n\nPhương thức tiện ích: Math.sqrt() (tính căn bậc hai), Integer.parseInt() (chuyển đổi chuỗi thành số nguyên).\nPhương thức khởi tạo đối tượng phức tạp: Factory methods.\nMain method: Phương thức public static void main(String[] args) là điểm bắt đầu của mọi chương trình Java. Nó phải là static vì JVM cần gọi nó mà không cần tạo đối tượng của lớp chứa nó.\nĐặc điểm:\n\nChỉ có thể truy cập các thành viên static khác của cùng lớp.\nKhông thể truy cập các thành viên \"non-static\" (instance variables hoặc instance methods) trực tiếp mà không thông qua một đối tượng. Lý do là các thành viên \"non-static\" chỉ tồn tại khi có đối tượng, trong khi phương thức static có thể được gọi mà không cần đối tượng.\nKhông thể sử dụng từ khóa this hoặc super (vì this và super ám chỉ một đối tượng cụ thể).\nCó thể được gọi trực tiếp bằng TênLớp.tênPhươngThứcStatic().class Calculator {\n    static int add(int a, int b) { // Phương thức static\n        return a + b;\n    }\n    static int multiply(int a, int b) { // Phương thức static\n        return a * b;\n    }\n    // int instanceVar = 10; // Biến non-static\n    // void instanceMethod() {\n    //     System.out.println(\"This is an instance method.\");\n    // }\n    // Lỗi: Phương thức static không thể truy cập biến non-static trực tiếp\n    // static void printInstanceVar() {\n    //     System.out.println(instanceVar);\n    // }\n}\npublic class StaticMethodDemo {\n    public static void main(String[] args) {\n        // Gọi phương thức static trực tiếp qua tên lớp\n        int sum = Calculator.add(10, 5);\n        System.out.println(\"Sum: \" + sum); // Output: Sum: 15\n        int product = Calculator.multiply(4, 7);\n        System.out.println(\"Product: \" + product); // Output: Product: 28\n    }\n}",
     "Khi nào sử dụng static?\nBạn nên cân nhắc sử dụng static khi:\n\nDữ liệu/Hành vi chung: Dữ liệu hoặc hành vi đó không phụ thuộc vào trạng thái của bất kỳ đối tượng cụ thể nào, mà là chung cho tất cả các đối tượng (hoặc thuộc về chính lớp).\nHằng số: Định nghĩa các giá trị không đổi.\nPhương thức tiện ích: Các hàm tiện ích không cần truy cập dữ liệu đối tượng, ví dụ: các hàm toán học, các hàm chuyển đổi.\nKhởi tạo một lần: Cần thực hiện một số thao tác khởi tạo phức tạp chỉ một lần khi lớp được tải.\nFactory methods: Các phương thức để tạo và trả về các đối tượng của lớp.Overriding: Phương thức static không thể bị ghi đè (override) trong lớp con. Bạn có thể \"hide\" (che giấu) một phương thức static trong lớp con bằng cách định nghĩa một phương thức static khác có cùng tên và chữ ký, nhưng đó không phải là override.\nTruy cập this và super: Không thể sử dụng this và super trong các phương thức hoặc khối static.\nPerformance: Mặc dù static có thể giúp quản lý bộ nhớ hiệu quả hơn (chỉ một bản sao), việc lạm dụng static có thể dẫn đến việc khó kiểm soát trạng thái ứng dụng và làm cho việc kiểm thử trở nên khó khăn hơn (do sự phụ thuộc toàn cục).\nHiểu rõ static là một bước quan trọng để viết code Java hiệu quả và đúng đắn."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-22",
    "question": "phân biệt lớp và đối tượng",
    "answer": "Lớp (Class) - Bản thiết kế, Khuôn mẫu\nHãy tưởng tượng một lớp như một bản thiết kế chi tiết hoặc một khuôn mẫu để tạo ra một loại đối tượng nào đó. Nó định nghĩa:\nĐặc điểm (Attributes/Properties/Fields): Đây là các dữ liệu mà một đối tượng thuộc lớp đó sẽ có. Chúng giống như các danh từ miêu tả trạng thái của đối tượng.\nVí dụ: Đối với lớp Ôtô, các đặc điểm có thể là màuSắc, sốBánhXe, tốcĐộTốiĐa, hãngSảnXuất.\nHành vi (Behaviors/Methods/Functions): Đây là các hành động mà một đối tượng thuộc lớp đó có thể thực hiện. Chúng giống như các động từ.\nVí dụ: Đối với lớp Ôtô, các hành vi có thể là khởiĐộng(), tăngTốc(), phanhLại(), rẽPhải().\nCác điểm chính về Lớp:\nKhái niệm trừu tượng: Lớp chỉ là một ý tưởng, một kế hoạch. Bản thân lớp không chiếm bộ nhớ để lưu trữ dữ liệu thực tế cho một đối tượng cụ thể nào.\nKhông thể tương tác trực tiếp: Bạn không thể \"chạy\" một lớp. Bạn phải tạo ra một đối tượng từ lớp đó để tương tác với các đặc điểm và hành vi mà nó định nghĩa.\nCó thể có nhiều đối tượng từ một lớp: Từ một bản thiết kế (lớp Ôtô), bạn có thể tạo ra vô số chiếc ôtô (đối tượng) khác nhau.// Đây là định nghĩa của một LỚP tên là \"Dog\"\nclass Dog {\n    // Thuộc tính (đặc điểm) của Dog\n    String name;\n    String breed;\n    int age;\n    // Phương thức (hành vi) của Dog\n    void bark() {\n        System.out.println(name + \" says Woof! Woof!\");\n    }\n    void eat() {\n        System.out.println(name + \" is eating.\");\n    }\n}",
    "examples": [
     "Đối tượng (Object) - Sản phẩm cụ thể, Thực thể\nMột đối tượng là một thực thể cụ thể được tạo ra từ một lớp. Nó là một bản sao \"sống\" của lớp đó, có dữ liệu riêng và có thể thực hiện các hành vi được định nghĩa trong lớp.\n\nĐặc điểm (Attributes): Mỗi đối tượng sẽ có một bộ dữ liệu riêng cho các đặc điểm được định nghĩa trong lớp.\nVí dụ: Từ lớp Ôtô, bạn có thể tạo ra đối tượng myCar có màuSắc = \"Đỏ\", sốBánhXe = 4, hãngSảnXuất = \"Toyota\".\nHành vi (Behaviors): Mỗi đối tượng có thể thực hiện các hành vi được định nghĩa trong lớp, sử dụng dữ liệu riêng của nó.\nVí dụ: myCar.tăngTốc(), friendCar.phanhLại().\nCác điểm chính về Đối tượng:\nThực thể cụ thể: Đối tượng là một thực thể vật lý (trong bộ nhớ máy tính) của một lớp.\nChiếm bộ nhớ: Khi một đối tượng được tạo, nó chiếm một phần bộ nhớ để lưu trữ dữ liệu của các thuộc tính riêng của nó.\nCó thể tương tác: Bạn có thể gọi các phương thức (hành vi) của đối tượng để thay đổi trạng thái của nó hoặc làm nó thực hiện một hành động.\nTồn tại độc lập: Mỗi đối tượng là độc lập với các đối tượng khác được tạo từ cùng một lớp. Thay đổi trạng thái của một đối tượng không ảnh hưởng đến trạng thái của đối tượng khác (trừ khi chúng chia sẻ các tham chiếu đến cùng một dữ liệu).public class ObjectDemo {\n    public static void main(String[] args) {\n        // Đây là cách tạo ra các ĐỐI TƯỢNG (instances) từ lớp \"Dog\"\n        Dog myDog = new Dog(); // Tạo đối tượng \"myDog\"\n        Dog yourDog = new Dog(); // Tạo đối tượng \"yourDog\"\n        // Gán giá trị cho các thuộc tính của đối tượng myDog\n        myDog.name = \"Buddy\";\n        myDog.breed = \"Golden Retriever\";\n        myDog.age = 3;\n        // Gán giá trị cho các thuộc tính của đối tượng yourDog\n        yourDog.name = \"Lucy\";\n        yourDog.breed = \"Poodle\";\n        yourDog.age = 5;\n        // Gọi các phương thức (hành vi) của đối tượng myDog\n        myDog.bark(); // Output: Buddy says Woof! Woof!\n        myDog.eat();  // Output: Buddy is eating.\n        // Gọi các phương thức (hành vi) của đối tượng yourDog\n        yourDog.bark(); // Output: Lucy says Woof! Woof!\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-23",
    "question": "So sánh sự khác nhau giữa int vs Integer?",
    "answer": "int (Kiểu dữ liệu nguyên thủy - Primitive Type)\nBản chất: Là một kiểu dữ liệu cơ bản, không phải là đối tượng. Nó biểu diễn trực tiếp một giá trị số nguyên 32-bit.int count = 10;\nint sum = 20;\nint result = count + sum; // Phép toán trực tiếp trên giá trị.       Khi nào nên dùng gì?\n\nSử dụng int khi bạn chỉ cần lưu trữ một giá trị số nguyên và hiệu suất là yếu tố quan trọng, đặc biệt trong các vòng lặp tính toán lớn.\nSử dụng Integer khi bạn cần một đối tượng (ví dụ: làm việc với Collection Framework), khi bạn cần lưu trữ giá trị null, hoặc khi bạn muốn tận dụng các phương thức được cung cấp bởi lớp Integer.",
    "examples": [
     "Integer (Lớp bao bọc - Wrapper Class)\nBản chất: Là một lớp đối tượng (class) trong gói java.lang. Mỗi đối tượng Integer bao bọc (wrap) một giá trị int bên trong nó.Có các phương thức: Là một đối tượng, Integer cung cấp nhiều phương thức hữu ích để thao tác, chuyển đổi hoặc so sánh giá trị, ví dụ:\nintValue(): Trả về giá trị int của đối tượng Integer.\ntoString(): Chuyển đổi giá trị Integer thành String.\nparseInt(String s): Phương thức static để chuyển đổi String thành int.\nvalueOf(int i) / valueOf(String s): Phương thức static để chuyển đổi int hoặc String thành đối tượng Integer.Integer num1 = 10; // Autoboxing\nInteger num2 = Integer.valueOf(\"20\");\nInteger sumObjects = num1 + num2; // Autoboxing và Unboxing diễn ra tự động\n\nArrayList<Integer> numbers = new ArrayList<>();\nnumbers.add(5); // Autoboxing: int 5 được chuyển thành Integer đối tượng\nint firstNum = numbers.get(0); // Unboxing: Integer đối tượng được chuyển thành int\n\n// Kiểm tra null\nInteger nullableInt = null;\n// int primitiveInt = nullableInt; // Lỗi: NullPointerException nếu nullableInt là null\nif (nullableInt != null) {\n    System.out.println(nullableInt * 2);\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-24",
    "question": "Pham vi truy cập private",
    "answer": "Ý nghĩa: Đây là mức độ truy cập hạn chế nhất.\nPhạm vi truy cập: Các thành viên (biến, phương thức, hàm tạo) được khai báo là private chỉ có thể được truy cập từ bên trong chính lớp đó. Chúng không thể được truy cập từ bất kỳ lớp nào khác, kể cả các lớp con hay các lớp trong cùng gói.\nMục đích sử dụng:\nĐóng gói dữ liệu: Thường được dùng để ẩn đi các chi tiết triển khai nội bộ của một lớp, bảo vệ dữ liệu khỏi bị thay đổi trực tiếp từ bên ngoài.\nGiúp duy trì tính nhất quán: Bạn có thể cung cấp các phương thức public (getter/setter) để kiểm soát việc truy cập và sửa đổi dữ liệu private, đảm bảo tính hợp lệ của dữ liệu.class MyClass {\n    private int privateData; // Chỉ MyClass mới có thể truy cập privateData\n\n    private void privateMethod() { // Chỉ MyClass mới có thể gọi privateMethod\n        System.out.println(\"This is a private method.\");\n    }\n}",
    "examples": [
     "[default] (Package-Private)\nÝ nghĩa: Nếu bạn không khai báo bất kỳ từ khóa access modifier nào, đó sẽ là phạm vi truy cập mặc định (default) hay còn gọi là package-private.\nPhạm vi truy cập: Các thành viên hoặc lớp có phạm vi default chỉ có thể được truy cập từ bên trong cùng một gói (package). Chúng không thể được truy cập từ các gói khác.\nMục đích sử dụng:\nKhi bạn muốn các lớp hoặc thành viên chỉ hiển thị cho các lớp khác trong cùng một nhóm chức năng (cùng gói) mà không cần phải công khai ra toàn bộ ứng dụng.// Trong gói com.example.model\npackage com.example.model;\nclass Product { // Lớp Product có phạm vi default\n    String productName; // productName có phạm vi default\n    void displayInfo() { // displayInfo() có phạm vi default\n        System.out.println(\"Product: \" + productName);\n    }\n}\n// Trong cùng gói com.example.model\nclass ProductManager {\n    void manageProduct() {\n        Product p = new Product(); // OK, cùng gói\n        p.productName = \"Laptop\";  // OK, cùng gói\n        p.displayInfo();           // OK, cùng gói\n    }\n}\n// Trong gói com.example.app (gói khác)\n// package com.example.app;\n// import com.example.model.Product;\n// class MainApp {\n//     void run() {\n//         Product p = new Product(); // LỖI: Product không public\n//     }\n// }"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-25",
    "question": "Phạm vi truy câp public và protect",
    "answer": "protected\nÝ nghĩa: Phạm vi truy cập dành cho các lớp con và các lớp trong cùng gói.\nPhạm vi truy cập: Các thành viên được khai báo là protected có thể được truy cập:\nTừ bên trong cùng một lớp.\nTừ bên trong cùng một gói.\nTừ các lớp con (subclasses), ngay cả khi lớp con nằm ở một gói khác.\nMục đích sử dụng:\nCho phép các lớp con kế thừa và tùy chỉnh hành vi của lớp cha, trong khi vẫn giữ một mức độ bảo vệ nhất định cho các thành viên đó khỏi bị truy cập rộng rãi.// Trong gói com.example.base\npackage com.example.base;\n\npublic class Animal {\n    protected String species; // protected: truy cập bởi lớp con hoặc cùng gói\n\n    protected void eat() {\n        System.out.println(species + \" is eating.\");\n    }\n}\n\n// Trong gói com.example.subclass (gói khác)\npackage com.example.subclass;\nimport com.example.base.Animal;\n\npublic class Dog extends Animal { // Dog là lớp con của Animal\n    public Dog(String species) {\n        this.species = species; // OK: Truy cập protected field từ lớp con\n    }\n\n    public void bark() {\n        eat(); // OK: Gọi protected method từ lớp con\n        System.out.println(species + \" is barking.\");\n    }\n}\n\n// Trong gói com.example.app (gói khác, không phải lớp con)\n// package com.example.app;\n// import com.example.base.Animal;\n// class Zoo {\n//     void observe() {\n//         Animal a = new Animal();\n//         a.species = \"Lion\"; // LỖI: Không truy cập được protected từ gói khác (không phải lớp con)\n//         a.eat();            // LỖI: Không truy cập được protected từ gói khác (không phải lớp con)\n//     }\n// }",
    "examples": [
     "public\nÝ nghĩa: Đây là mức độ truy cập rộng nhất.\nPhạm vi truy cập: Các thành viên (biến, phương thức, hàm tạo) hoặc lớp được khai báo là public có thể được truy cập từ bất kỳ đâu, bên trong hay bên ngoài gói, lớp con hay không phải lớp con.\nMục đích sử dụng:\nCung cấp giao diện công cộng (public API) cho các lớp khác để tương tác với lớp của bạn.\nCác phương thức và lớp quan trọng mà bạn muốn người dùng của thư viện/ứng dụng có thể sử dụng."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-26",
    "question": "Từ khóa this\nTừ khóa this là một biến tham chiếu trỏ tới đối tượng hiện tại. Nó được sử dụng bên trong một phương thức thể hiện (instance method) hoặc một hàm tạo (constructor) để truy cập các thành viên của đối tượng hiện tại, như biến thể hiện (instance variable), phương thức và hàm tạo.",
    "answer": "public class Student {\n    int id;\n    String name;\n\n    // Constructor\n    public Student(int id, String name) {\n        this.id = id; // 'this.id' refers to the instance variable 'id'\n        this.name = name; // 'this.name' refers to the instance variable 'name'\n    }\n\n    public void display() {\n        System.out.println(\"ID: \" + this.id + \", Name: \" + this.name);\n    }\n}public class MyClass {\n    void method1() {\n        System.out.println(\"Method 1\");\n    }\n\n    void method2() {\n        this.method1(); // Calling method1 from method2 using 'this'\n        System.out.println(\"Method 2\");\n    }\n}",
    "examples": [
     "Từ khóa super trong Java được sử dụng để tham chiếu đến đối tượng của lớp cha gần nhất (immediate parent class/superclass). Nó thường được dùng trong ngữ cảnh kế thừa để truy cập các thành viên (biến, phương thức, hàm tạo) của lớp cha bị lớp con ghi đè hoặc che giấu.",
     "class Animal {\n    String name = \"Animal\";\n}\n\nclass Dog extends Animal {\n    String name = \"Dog\";\n\n    void display() {\n        System.out.println(\"Current object name: \" + name); // Refers to Dog's name\n        System.out.println(\"Parent object name: \" + super.name); // Refers to Animal's name\n    }\n}class Vehicle {\n    void horn() {\n        System.out.println(\"Beep beep!\");\n    }\n}\n\nclass Car extends Vehicle {\n    @Override\n    void horn() {\n        super.horn(); // Calls the horn() method of the parent class (Vehicle)\n        System.out.println(\"Car horn!\");\n    }"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-27",
    "question": "Upcasting\nĐịnh nghĩa: Upcasting là quá trình ép kiểu một đối tượng từ lớp con (subclass) sang lớp cha (superclass). Đây là quá trình tự động (implicit) trong Java, vì lớp con luôn là một dạng của lớp cha (theo nguyên tắc \"is-a\").\n\nĐặc điểm:\nAn toàn, không cần ép kiểu tường minh.\nChỉ truy cập được các thành viên (phương thức, thuộc tính) được định nghĩa trong lớp cha hoặc được ghi đè trong lớp con.\nThường được sử dụng khi muốn xử lý đối tượng một cách tổng quát.",
    "answer": "void makeSound() {\n        System.out.println(\"Some generic animal sound\");\n    }\n}\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Woof!\");\n    }\n\n    void fetch() {\n        System.out.println(\"Dog is fetching\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        // Upcasting: Ép kiểu Dog thành Animal\n        Animal animal = dog; // Tự động, không cần ép kiểu tường minh\n        animal.makeSound(); // Gọi được: In \"Woof!\" (phương thức được ghi đè)\n        // animal.fetch(); // Lỗi biên dịch: Animal không có phương thức fetch()\n    }\n}",
    "examples": [
     "Dog là một lớp con của Animal. Khi Dog được gán cho biến kiểu Animal (upcasting), biến animal chỉ có thể truy cập các phương thức của lớp Animal.\nPhương thức makeSound() được ghi đè nên gọi phiên bản của Dog.\nKhông thể gọi fetch() vì nó chỉ tồn tại trong lớp Dog."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-28",
    "question": "Downcasting\nĐịnh nghĩa: Downcasting là quá trình ép kiểu một đối tượng từ lớp cha sang lớp con. Đây là quá trình không tự động (explicit) và cần được thực hiện cẩn thận vì có thể gây lỗi nếu đối tượng không thực sự thuộc lớp con.\n\nĐặc điểm:\nKhông an toàn, cần ép kiểu tường minh bằng cách sử dụng dấu ngoặc (ClassName).\nThường sử dụng toán tử instanceof để kiểm tra xem đối tượng có thuộc lớp con hay không trước khi ép kiểu.\nCho phép truy cập các thành viên cụ thể của lớp con.",
    "answer": "public class Main {\n    public static void main(String[] args) {\n        // Upcasting\n        Animal animal = new Dog();\n        // Downcasting\n        if (animal instanceof Dog) {\n            Dog dog = (Dog) animal; // Ép kiểu tường minh\n            dog.makeSound(); // In \"Woof!\"\n            dog.fetch(); // In \"Dog is fetching\"\n        } else {\n            System.out.println(\"Không thể ép kiểu thành Dog\");\n        }\n        // Trường hợp lỗi downcasting\n        Animal genericAnimal = new Animal();\n        if (genericAnimal instanceof Dog) {\n            Dog dog2 = (Dog) genericAnimal; // Sẽ không chạy vì genericAnimal không phải Dog\n        } else {\n            System.out.println(\"genericAnimal không phải là Dog\");\n        }\n    }\n}",
    "examples": [
     "class Animal {\n    void makeSound() {\n        System.out.println(\"Some generic animal sound\");\n    }\n}\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Woof!\");\n    }\n\n    void fetch() {\n        System.out.println(\"Dog is fetching\");\n    }\n}\nAnimal animal = new Dog() là upcasting, cho phép đối tượng Dog được tham chiếu bởi biến kiểu Animal.\nĐể truy cập phương thức fetch() của Dog, cần downcasting bằng (Dog) animal.\nToán tử instanceof được sử dụng để kiểm tra xem animal có thực sự là một Dog hay không, tránh lỗi ClassCastException.\nTrong trường hợp genericAnimal, vì nó là đối tượng của Animal (không phải Dog), downcasting sẽ không được thực hiện."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-29",
    "question": "Câu trả lời bit,byte,char",
    "answer": "1 byte có thể biểu diễn các số nguyên nằm trong miền từ -128 tới 127. Một byte thường bao gồm 8 bit.",
    "examples": [
     "Kiểu dữ liệu char thường có kích thước 1 byte (8 bit) và có phạm vi tương tự với số nguyên 8 bit có dấu hoặc không dấu. Phạm vi được đưa ra trong câu này lớn hơn nhiều so với khả năng của một char tiêu chuẩn."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-37",
    "question": "JVM (Java Virtual Machine - Máy ảo Java) là gì ? Bạn không sử dụng trực tiếp JVM. Nó được tự động gọi và quản lý bởi JRE (hoặc JDK) khi bạn chạy một chương trình Java. Công việc của nó là dịch và thực thi bytecode.",
    "answer": "JVM là một máy ảo trừu tượng, là trái tim của Java, chịu trách nhiệm thực thi mã bytecode Java. Nó là một chương trình phần mềm giả lập một máy tính vật lý.Bạn sẽ không bao giờ \"cài đặt\" hay \"chạy\" JVM một cách trực tiếp như một ứng dụng độc lập. Nó là một phần của JRE hoặc JDK và hoạt động \"ngầm\" khi một chương trình Java được khởi chạy.",
    "examples": [
     "public class ChaoBan { public static void main(String[] args) { System.out.println(\"Xin chào từ JVM!\"); } }     Khi bạn biên dịch và chạy chương trình này:\n\nMã nguồn ChaoBan.java được biên dịch thành mã bytecode ChaoBan.class.\nKhi bạn chạy java ChaoBan, JRE (hoặc JDK) sẽ khởi tạo một JVM instance.\nJVM này sẽ tải file ChaoBan.class, kiểm tra tính hợp lệ của bytecode, và sau đó thực thi lệnh System.out.println(\"Xin chào từ JVM!\");, hiển thị thông báo ra màn hình console.\nMỗi khi bạn chạy một ứng dụng Java, một JVM mới sẽ được tạo ra để thực thi ứng dụng đó."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-38",
    "question": "JRE (Java Runtime Environment - Môi trường chạy Java) là gì",
    "answer": "JRE là một gói phần mềm bao gồm JVM và các thư viện lớp Java cốt lõi (Java class libraries) cần thiết để chạy các ứng dụng Java.  Vai trò:\nCung cấp môi trường chạy: JRE cung cấp tất cả những gì cần thiết để một chương trình Java có thể chạy trên máy tính của người dùng cuối.\nKết hợp JVM và thư viện: Nó chứa JVM để thực thi bytecode và các thư viện Java chuẩn (như java.lang, java.util, java.io, v.v.) mà các chương trình Java thường sử dụng.Đặc điểm:\nCó thể được cài đặt riêng biệt.\nDành cho người dùng cuối chỉ muốn chạy các ứng dụng Java, không cần phát triển.\nKhông bao gồm các công cụ phát triển như trình biên dịch, trình gỡ lỗi.\nJRE = JVM + Thư viện Java cốt lõi.",
    "examples": [
     "Cách sử dụng: Cài đặt JRE trên máy tính nếu bạn chỉ muốn chạy các ứng dụng Java đã được phát triển. Ví dụ, nếu bạn tải một game Java hoặc một phần mềm kế toán viết bằng Java, bạn chỉ cần JRE để chạy nó.\nLệnh: Khi bạn chạy một file .jar (file đóng gói ứng dụng Java) bằng cách nhấp đúp, JRE sẽ được sử dụng để khởi động JVM và chạy ứng dụng. Bạn cũng có thể dùng lệnh java YourApplication trong Command Prompt/Terminal để chạy file .class hoặc .jar (nếu đã được cấu hình Manifest).",
     "JRE là thứ mà người dùng cuối cần cài đặt trên máy tính của họ nếu họ muốn chạy các ứng dụng Java.\n\nVí dụ:\n\nBạn là một người dùng cuối: Một người bạn gửi cho bạn một trò chơi nhỏ được lập trình bằng Java dưới dạng file GameCuaBan.jar.\n\nĐể chơi game đó, bạn cần phải cài đặt JRE trên máy tính của mình.\nSau khi cài đặt JRE, bạn chỉ cần nhấp đúp vào file GameCuaBan.jar. JRE sẽ tự động khởi động JVM và cung cấp các thư viện cần thiết để trò chơi chạy được trên máy tính của bạn.\nNếu không có JRE, hệ điều hành của bạn sẽ không biết làm thế nào để mở và chạy file .jar đó.\nMột trang web sử dụng applet Java (ít phổ biến ngày nay): Ngày xưa, nhiều trang web sử dụng Java Applet. Để xem các applet này, trình duyệt của bạn cần có JRE được cài đặt và cấu hình đúng."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-39",
    "question": "JDK (Java Development Kit - Bộ công cụ phát triển Java) là gì",
    "answer": "JDK là một bộ công cụ phát triển phần mềm toàn diện, cung cấp môi trường để phát triển, biên dịch, gỡ lỗi và chạy các ứng dụng Java.Vai trò:\nPhát triển ứng dụng: JDK là lựa chọn bắt buộc cho các nhà phát triển Java. Nó bao gồm JRE và các công cụ phát triển quan trọng.\nBiên dịch mã: Chứa javac (trình biên dịch Java), dùng để chuyển đổi mã nguồn Java (.java) thành mã bytecode (.class).\nGỡ lỗi: Chứa jdb (trình gỡ lỗi Java) để tìm và sửa lỗi trong ứng dụng.\nTạo tài liệu: Chứa javadoc để tạo tài liệu API từ mã nguồn.\nChạy ứng dụng: Vì JDK bao gồm JRE, nó cũng có khả năng chạy các ứng dụng Java.",
    "examples": [
     "Đặc điểm:\nPhải được cài đặt để phát triển ứng dụng Java.\nJDK = JRE + Công cụ phát triển (javac, jdb, javadoc, v.v.).\nCó thể cài đặt nhiều phiên bản JDK trên cùng một máy tính.",
     "JDK:\nCách sử dụng: Cài đặt JDK nếu bạn là một nhà phát triển Java.\nLệnh điển hình:\nBiên dịch: javac TenFileCuaBan.java (sẽ tạo ra TenFileCuaBan.class)\nChạy: java TenFileCuaBan (sẽ thực thi file .class)\nGỡ lỗi: jdb TenFileCuaBan\nTạo Javadoc: javadoc TenFileCuaBan.java"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-40",
    "question": "Phân biệt 3 loại : jvm,jre,jdk",
    "answer": "->jvm : thông dịch cho code để chạy chương trình cho máy tính hiểu   -> jre = jvm + libraries  -> jdk = jre + developper tool",
    "examples": [
     "ể hình dung dễ hơn, bạn có thể tưởng tượng mối quan hệ như sau:\n\nJVM: Là \"động cơ\" bên trong, nơi mã Java thực sự được thực thi.\nJRE: Là \"bộ khung xe\" (bao gồm động cơ và các bộ phận cần thiết khác) cho phép chiếc xe chạy. Người dùng cuối chỉ cần JRE để \"lái xe\" (chạy ứng dụng).\nJDK: Là \"nhà máy sản xuất ô tô\" (bao gồm tất cả các công cụ, linh kiện, và cả bộ khung xe hoàn chỉnh) để tạo ra chiếc xe. Lập trình viên cần JDK để \"xây dựng\" ứng dụng."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-41",
    "question": "So sánh được bộ nhớ Stack và Heap?",
    "answer": "Bộ nhớ Stack và Heap là hai khu vực chính mà chương trình sử dụng để quản lý dữ liệu trong quá trình thực thi.   - Stack: Lý tưởng cho những dữ liệu tạm thời, lời gọi hàm, các biến primitive.\n- Heap: Dành cho các đối tượng cần tồn tại lâu dài hoặc chia sẻ giữa nhiều hàm/phương thức.",
    "examples": [
     "public class MemoryDemo {\n    public static void main(String[] args) {\n        // Biến nguyên thủy – nằm trong Stack\n        int age = 30;\n\n        // Biến tham chiếu – đối tượng tạo bằng 'new' – nằm trong Heap\n        Person person = new Person(\"Lê\");\n\n        // Gọi phương thức – tạo ra Stack frame mới\n        greet(person);\n    }\n\n    public static void greet(Person p) {\n        String message = \"Hello, \" + p.name; // message nằm trong Stack, p tham chiếu đến đối tượng trong Heap\n        System.out.println(message);\n    }\n}\n\nclass Person {\n    String name;\n\n    // Constructor – tạo đối tượng trong Heap\n    public Person(String name) {\n        this.name = name;\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-42",
    "question": "Java EE (Enterprise Edition)\nJava EE (nay được gọi là Jakarta EE) là một tập hợp các API và tiêu chuẩn được xây dựng trên nền tảng Java SE. Nó được thiết kế để phát triển các ứng dụng doanh nghiệp lớn, phân tán, có khả năng mở rộng, và hoạt động trên server.",
    "answer": "Thành phần chính:\n\nServer Applications: Các thành phần chạy trên máy chủ như Servlets và JSPs (JavaServer Pages), dùng để tạo ra các trang web động.\n\nEJB (Enterprise JavaBeans): Các thành phần phức tạp để xử lý logic nghiệp vụ.\n\nJMS (Java Message Service): API cho việc gửi và nhận tin nhắn giữa các ứng dụng.\n\nJPA (Java Persistence API): API để quản lý dữ liệu trong cơ sở dữ liệu.\n\nRESTful/SOAP Web Services: Các tiêu chuẩn để tạo ra các dịch vụ web.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Core-43",
    "question": "Tiêu chí",
    "answer": "Toán tử ==",
    "examples": [
     "Phương thức equals()",
     "String s1 = new String(\"Gemini\");\nString s2 = new String(\"Gemini\");\nString s3 = s1;\n\n// 1. Dùng toán tử ==\nSystem.out.println(s1 == s2);  \n// Kết quả: FALSE. \n// Lý do: Dùng từ khóa 'new', nên s1 và s2 được tạo ở 2 vùng nhớ hoàn toàn khác nhau.\n\nSystem.out.println(s1 == s3);  \n// Kết quả: TRUE. \n// Lý do: s3 được gán bằng s1, nên cả hai cùng trỏ vào một vùng nhớ.\n\n// 2. Dùng phương thức equals()\nSystem.out.println(s1.equals(s2)); \n// Kết quả: TRUE. \n// Lý do: Lớp String đã override equals() để so sánh từng ký tự. \n// Vì cả hai đều chứa chuỗi \"Gemini\" nên nội dung giống hệt nhau."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-44",
    "question": "Bản chất",
    "answer": "Toán tử toán học/logic",
    "examples": [
     "Phương thức của lớp"
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-45",
    "question": "Mục đích chính",
    "answer": "So sánh địa chỉ bộ nhớ (tham chiếu) hoặc giá trị nguyên thủy.",
    "examples": [
     "So sánh nội dung / trạng thái của đối tượng."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-46",
    "question": "Khả năng ghi đè (Override)",
    "answer": "Không thể ghi đè. Hành vi là cố định.",
    "examples": [
     "Có thể (và thường xuyên) được ghi đè bởi người lập trình."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-47",
    "question": "Tốc độ thực thi",
    "answer": "Nhanh hơn (chỉ so sánh một địa chỉ bộ nhớ).",
    "examples": [
     "Chậm hơn một chút (do phải chạy logic kiểm tra từng thuộc tính bên trong)."
    ],
    "source": "excel"
   },
   {
    "id": "Java Core-48",
    "question": "An toàn với Null",
    "answer": "Có. obj == null hoạt động bình thường và trả về true/false.",
    "examples": [
     "Không an toàn. Nếu đối tượng gọi phương thức là null (vd: obj.equals(other) mà obj là null) sẽ gây ra lỗi NullPointerException."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "Java Spring",
  "items": [
   {
    "id": "Java Spring-2",
    "question": "Spring Data JPA là gì? Vai trò của nó trong ứng dụng Spring.",
    "answer": "> Spring Data JPA là một phần của Spring Data project, giúp đơn giản hóa việc triển khai tầng Data Access Layer (DAL) trong các ứng dụng Spring.\n> Nó cung cấp một tầng trừu tượng (abstraction layer) trên JPA (Java Persistence API) và Hibernate (hoặc các JPA provider khác), cho phép lập trình viên tương tác với database chỉ bằng cách định nghĩa các interface Repository và các phương thức truy vấn dựa trên tên phương thức (method name convention) hoặc @Query annotation.\n> Vai trò: Giảm đáng kể lượng boilerplate code (code lặp lại) cần thiết để thực hiện các thao tác CRUD (Create, Read, Update, Delete) và các truy vấn phức tạp hơn với database, giúp tăng tốc độ phát triển.",
    "examples": [
     "Spring Data JPA là một công cụ mạnh mẽ giúp đơn giản hóa việc truy cập cơ sở dữ liệu trong các ứng dụng Spring bằng cách tự động tạo ra mã thực thi truy vấn dựa trên các tên phương thức khai báo."
    ],
    "source": "excel"
   },
   {
    "id": "Java Spring-3",
    "question": "Thế nào là một Repository trong Spring Data JPA? Kể tên một số phương thức phổ biến bạn đã sử dụng.",
    "answer": "> Một Repository trong Spring Data JPA là một interface mà bạn định nghĩa để tương tác với một entity cụ thể trong database. Nó kế thừa từ các interface như CrudRepository hoặc JpaRepository.\n> Spring Data JPA sẽ tự động tạo ra implementation (hiện thực) cho các phương thức trong Repository của bạn dựa trên tên phương thức hoặc các annotation.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-4",
    "question": "Spring Security là gì và mục đích của nó?",
    "answer": "> Spring Security là một framework bảo mật mạnh mẽ và rất linh hoạt, cung cấp các dịch vụ xác thực (authentication) và ủy quyền (authorization) cho các ứng dụng Java.\nMục đích:\n> Authentication (Xác thực): Xác minh danh tính của người dùng (ví dụ: đăng nhập bằng username/password).\nAuthorization (Ủy quyền): Xác định quyền truy cập của người dùng đã được xác thực vào các tài nguyên hoặc chức năng cụ thể của ứng dụng.\n> Bảo vệ ứng dụng khỏi các lỗ hổng bảo mật phổ biến như CSRF (Cross-Site Request Forgery), XSS (Cross-Site Scripting).",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-5",
    "question": "Phân biệt Authentication và Authorization trong Spring Security.",
    "answer": "> Authentication (Xác thực): Là quá trình xác minh danh tính của người dùng. \"Bạn là ai?\". Ví dụ: nhập tên người dùng và mật khẩu để chứng minh bạn là người dùng đó.\n> Authorization (Ủy quyền): Là quá trình xác định quyền của người dùng đã được xác thực để truy cập vào một tài nguyên hoặc thực hiện một hành động cụ thể. \"Bạn có quyền làm gì?\". Ví dụ: sau khi đăng nhập, một người dùng có vai trò \"ADMIN\" có thể truy cập trang quản lý người dùng, trong khi người dùng \"USER\" thì không.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-6",
    "question": "JWT (JSON Web Token) là gì và tại sao nó được sử dụng trong các ứng dụng web hiện đại?",
    "answer": "> JWT là một chuẩn mở (RFC 7519) để tạo các token bảo mật, cho phép truyền tải thông tin một cách an toàn giữa các bên dưới dạng đối tượng JSON.\n> Cấu trúc JWT: Gồm 3 phần được phân cách bởi dấu chấm (.): Header, Payload, và Signature.\n> Header: Loại token (JWT) và thuật toán mã hóa (HMAC SHA256 hoặc RSA).\n> Payload: Chứa các claims (thông tin về người dùng, quyền hạn, thời gian hết hạn...).\n> Signature: Dùng để xác minh tính toàn vẹn của token, đảm bảo nó không bị thay đổi.\nTại sao sử dụng:\n> Stateless (Không trạng thái): Server không cần lưu trữ session của người dùng, giúp mở rộng ứng dụng dễ dàng hơn (scalability).\n> Decentralized Authentication: Phù hợp cho kiến trúc Microservices, nơi nhiều dịch vụ cần xác thực người dùng.\n> Bảo mật: Chữ ký số đảm bảo tính toàn vẹn của dữ liệu.\n> Phù hợp với RESTful APIs: JWT được gửi trong Header của mỗi request HTTP.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-7",
    "question": "Làm thế nào để Spring Security làm việc với JWT? (Mức độ cơ bản)",
    "answer": "Khi người dùng đăng nhập thành công, server tạo ra một JWT và gửi lại cho client.\nClient lưu trữ JWT (thường là trong Local Storage hoặc Cookie).\nỞ mỗi request tiếp theo, client gửi JWT trong Header (Authorization: Bearer token).\nSpring Security, thông qua các bộ lọc (Filter), sẽ chặn request, trích xuất JWT, xác thực chữ ký của JWT.\nNếu token hợp lệ và chưa hết hạn, Spring Security sẽ trích xuất thông tin người dùng (từ Payload) và thiết lập đối tượng Authentication trong SecurityContextHolder, cho phép ủy quyền dựa trên các quyền hạn trong token.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-8",
    "question": "Redis là gì? Tại sao nó được sử dụng cùng với các ứng dụng Java/Spring?",
    "answer": "> Redis (Remote Dictionary Server) à một mã nguồn mở được dùng để lưu trữ dữ liệu có cấu trúc, có thể sử dụng như một database, bộ nhớ cache hay một message broker.\n>? Nó hỗ trợ nhiều kiểu dữ liệu khác nhau như strings, hashes, lists, sets, sorted sets.\nTại sao sử dụng với Java/Spring:\n> Caching: Redis được sử dụng rộng rãi làm bộ nhớ đệm (cache) để lưu trữ dữ liệu thường xuyên được truy cập từ database, giúp giảm tải cho database và tăng tốc độ phản hồi của ứng dụng.\n> Session Management: Trong các ứng dụng phân tán, Redis có thể lưu trữ session của người dùng, cho phép người dùng truy cập vào bất kỳ instance nào của ứng dụng.\n> Message Broker: Có thể dùng cho hàng đợi tin nhắn (message queues) hoặc publish/subscribe.\n> High Performance: Do lưu trữ trong bộ nhớ, Redis cung cấp hiệu suất đọc/ghi cực kỳ nhanh.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-9",
    "question": "Làm thế nào để xử lý lỗi (Exception Handling) trong Spring Boot REST API?",
    "answer": "Gợi ý trả lời:\n> Sử dụng @ControllerAdvice và @ExceptionHandler để tạo một cơ chế xử lý lỗi tập trung (global exception handling).\n> @ControllerAdvice: Một annotation cấp độ class, cho phép một class xử lý exception trên toàn bộ ứng dụng.\n> @ExceptionHandler: Một annotation cấp độ method, được sử dụng bên trong @ControllerAdvice để chỉ định phương thức nào sẽ xử lý loại exception cụ thể.\n> Trả về các HTTP status code phù hợp (ví dụ: 400 Bad Request, 404 Not Found, 500 Internal Server Error).\n> Sử dụng @ResponseStatus trên các custom exception để tự động trả về HTTP status code mong muốn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-10",
    "question": "hãy giải thích rõ cho tôi IoC trong java spring là gì và tại sao cần sử dụng nó",
    "answer": "> Spring framework (chính xác hơn là Spring IoC Container) sẽ đảm nhận trách nhiệm tạo, cấu hình và quản lý các đối tượng trong ứng dụng của bạn, thay vì bạn phải tự làm điều đó. > Tight Coupling (Phụ thuộc chặt chẽ): Lớp UserService trực tiếp tạo ra một new UserRepository(). Điều này có nghĩa là UserService bị ràng buộc chặt chẽ với một triển khai cụ thể của UserRepository.\n> Khó kiểm thử (Hard to Test): Khi bạn muốn kiểm thử UserService, bạn không thể dễ dàng thay thế UserRepository bằng một đối tượng giả lập (mock object) để tránh tương tác với cơ sở dữ liệu thật. Bạn luôn phải làm việc với UserRepository thật.\n> Khó thay đổi (Hard to Change): Nếu sau này bạn muốn thay đổi cơ chế lưu trữ dữ liệu (ví dụ: từ database sang một file system), bạn sẽ phải sửa đổi code trong UserService (hoặc bất kỳ lớp nào khác đang new UserRepository()). Điều này vi phạm nguyên tắc \"Open/Closed Principle\" (Mở rộng nhưng đóng để sửa đổi).> @Component: Chúng ta đánh dấu UserRepositorySpring và UserServiceSpring là các Spring Beans. Điều này báo cho Spring biết rằng đây là những đối tượng mà nó cần quản lý.\n> @Autowired trên Constructor: Trong UserServiceSpring, chúng ta sử dụng @Autowired trên constructor. Khi Spring IoC Container thấy điều này, nó sẽ tự động tìm một bean kiểu UserRepositorySpring trong container của nó và \"tiêm\" vào constructor khi tạo UserServiceSpring. Constructor vs Setter Injection:\n\nConstructor Injection (Khuyên dùng):\n> Đảm bảo rằng tất cả các phụ thuộc bắt buộc đều được cung cấp khi đối tượng được tạo (đảm bảo tính bất biến - immutability).\n> Đối tượng luôn ở trạng thái hợp lệ ngay sau khi khởi tạo.\n> Giúp dễ dàng kiểm thử hơn vì bạn có thể tạo đối tượng với các phụ thuộc giả lập ngay lập tức.\nSetter Injection:\n> Thích hợp cho các phụ thuộc tùy chọn (optional dependencies) hoặc khi bạn có nhiều phụ thuộc và constructor sẽ trở nên quá dài.\n> Đối tượng có thể ở trạng thái không đầy đủ sau khi khởi tạo cho đến khi setter được gọi.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-11",
    "question": "Tại sao cần sử dụng nó",
    "answer": "Quay lại với ví dụ UserService và UserRepository:\n\nGiảm sự phụ thuộc (Reduced Coupling):\n\nTrước IoC: UserService phải tự tạo UserRepository. Nếu UserRepository thay đổi cách khởi tạo (ví dụ, cần thêm tham số), UserService cũng phải thay đổi.\nVới IoC: UserService không còn quan tâm UserRepository được tạo ra như thế nào. Nó chỉ khai báo nó cần một UserRepository, và Spring sẽ \"tiêm\" vào. Sự thay đổi trong UserRepository không ảnh hưởng đến code của UserService.\nTăng khả năng kiểm thử (Improved Testability):\n\nTrước IoC: Để kiểm thử UserService, bạn cần một UserRepository thật (có thể kết nối đến DB thật), làm cho unit test trở thành integration test và chậm hơn.\nVới IoC: Bạn có thể dễ dàng tạo một MockUserRepository (một phiên bản giả lập của UserRepository không tương tác với DB) và \"tiêm\" vào UserService khi kiểm thử, giúp bạn kiểm thử logic của UserService một cách độc lập và nhanh chóng.> Dễ dàng cấu hình (Easier Configuration):\n\n> Bạn có thể thay đổi cách các bean được tạo hoặc các phụ thuộc được tiêm mà không cần sửa đổi code nguồn. Ví dụ, nếu bạn có hai triển khai của UserRepository (một cho SQL DB, một cho NoSQL DB), bạn chỉ cần thay đổi cấu hình Spring để sử dụng triển khai mong muốn mà không cần chạm vào UserService.\nGiảm code lặp lại (Reduced Boilerplate Code):\n\n> Bạn không cần viết code để tạo new từng đối tượng phụ thuộc. Spring tự động làm điều đó.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-12",
    "question": "giải thích cho tôi DI và IoC trong spring: IoC là một nguyên tắc thiết kế trong đó luồng điều khiển của chương trình được đảo ngược so với lập trình truyền thống. Thay vì code của bạn gọi các framework, framework sẽ gọi code của bạn.",
    "answer": "IoC là một nguyên tắc thiết kế phần mềm, trong đó kiểm soát luồng hoặc sự phụ thuộc của một đối tượng được chuyển giao (đảo ngược) từ chính đối tượng đó sang một khuôn khổ (framework) hoặc một container bên ngoài.Tóm lại, IoC là một nguyên tắc thiết kế, và DI là một cách để triển khai nguyên tắc đó. Spring Framework sử dụng IoC Container để tự động hóa quá trình DI, mang lại một cách tiếp cận mạnh mẽ và linh hoạt để xây dựng các ứng dụng Ja) Bean:\nLà các đối tượng được quản lý bởi Spring IoC Container\nĐược đánh dấu bằng các annotation như @Component, @Service, @Repository, @Controllerva.Spring IoC Container:\nLà trung tâm quản lý các bean trong ứng dụng\nChịu trách nhiệm tạo, cấu hình và quản lý vòng đời của các bean",
    "examples": [
     "// Cách truyền thống (không sử dụng IoC)\npublic class ProductService {\n    // Tự tạo instance của repository\n    private ProductRepository productRepository = new ProductRepositoryImpl();\n    \n    public void createProduct(Product product) {\n        productRepository.save(product);\n    }\n}\n\n// Cách sử dụng IoC\n@Service\n@RequiredArgsConstructor\npublic class ProductService {\n    // Spring IoC Container sẽ tạo và quản lý instance\n    private final ProductRepository productRepository;\n    \n    public void createProduct(Product product) {\n        productRepository.save(product);\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Spring-13",
    "question": "DI là một dạng cụ thể của IoC, trong đó các dependency được inject vào một class thay vì class tự tạo ra chúng.",
    "answer": "cách tốt nhất : @Service\n@RequiredArgsConstructor\npublic class ProductService {\n    private final ProductRepository productRepository;\n    private final CategoryRepository categoryRepository;\n}",
    "examples": [
     "Service\npublic class ProductService {\n    private ProductRepository productRepository;\n    \n    @Autowired\n    public void setProductRepository(ProductRepository productRepository) {\n        this.productRepository = productRepository;\n    }\n}",
     "không khuyến nghị : Service\npublic class ProductService {\n    @Autowired\n    private ProductRepository productRepository;\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Spring-14",
    "question": "Docker là gì? Bạn hiểu gì về Docker?",
    "answer": "Docker là một nền tảng mở cho phép đóng gói ứng dụng và tất cả các phụ thuộc của nó vào một đơn vị độc lập gọi là Container. Nó giúp giải quyết vấn đề \"chạy trên máy tôi thì được, trên máy bạn thì không\" bằng cách đảm bảo môi trường chạy ứng dụng nhất quán.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-15",
    "question": "Giải thích sự khác nhau giữa Docker Image và Docker Container?",
    "answer": "Docker Image: Là một khuôn mẫu (template) chỉ đọc, chứa tất cả những gì cần thiết để chạy một ứng dụng (mã nguồn, runtime, thư viện, cấu hình...). Nó giống như một bản thiết kế hoặc một \"ảnh chụp\" của hệ thống file.\nDocker Container: Là một thể hiện đang chạy (runtime instance) của một Docker Image. Nó là một môi trường biệt lập, nhẹ, nơi ứng dụng thực sự chạy. Bạn có thể tạo, khởi động, dừng, xóa nhiều Container từ một Image.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-16",
    "question": "Dockerfile là gì? Vai trò của nó?",
    "answer": "Dockerfile là một file văn bản chứa các chỉ dẫn từng bước để xây dựng một Docker Image. Nó giống như một \"công thức\" mô tả cách tạo ra một môi trường đóng gói cho ứng dụng của bạn. Vai trò của nó là đảm bảo quá trình xây dựng Image là tự động và có thể tái tạo.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-17",
    "question": "Tại sao lại cần Docker? Nó giải quyết vấn đề gì?",
    "answer": "Docker giải quyết vấn đề \"môi trường không nhất quán\" giữa các giai đoạn phát triển, thử nghiệm và triển khai. Nó đảm bảo ứng dụng chạy giống nhau ở mọi nơi, loại bỏ xung đột phụ thuộc, và giúp việc đóng gói, vận chuyển ứng dụng trở nên dễ dàng, nhanh chóng hơn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-18",
    "question": "Bạn đã bao giờ sử dụng Docker Compose chưa? Nó dùng để làm gì?",
    "answer": "Nếu có, hãy nói bạn đã dùng để làm gì (ví dụ: chạy ứng dụng Spring Boot kèm MySQL/PostgreSQL).\nDocker Compose là một công cụ giúp định nghĩa và chạy các ứng dụng Docker đa container (multi-container). Thay vì chạy từng container một bằng lệnh docker run, bạn có thể định nghĩa tất cả các dịch vụ (như ứng dụng backend, database, frontend) trong một file docker-compose.yml duy nhất và khởi chạy tất cả chúng chỉ bằng một lệnh docker compose up. Nó rất hữu ích cho môi trường phát triển cục bộ.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-19",
    "question": "OAuth2 là một giao thức xác thực cho phép ứng dụng của chúng ta truy cập thông tin người dùng từ các nhà cung cấp dịch vụ (như Facebook, Google) mà không cần mật khẩu. Luồng xác thực gồm các bước:",
    "answer": "Ứng dụng của chúng ta tạo URL xác thực với client_id và redirect_uri\nNgười dùng được chuyển hướng đến trang đăng nhập của nhà cung cấp\nSau khi đăng nhập thành công, nhà cung cấp trả về một authorization code\nỨng dụng của chúng ta đổi code này lấy access token\nSử dụng access token để truy cập thông tin người dùng",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-20",
    "question": "Cấu hình đa ngôn ngữ i18n",
    "answer": "Đầu tiên thiết lập i18n trong resource và tạo 2 file cấu hình đa ngôn ngữ en và vi. Sau đó tạo 1 file config,bean cấu hình cho nó rồi tạo class LocalizationUtils để xử lý đa ngôn ngữ và cuối cùng tạo 1 file định nghĩa message keys để dễ dàng gọi đến hơn",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Java Spring-21",
    "question": "Unit Test (Kiểm thử đơn vị)",
    "answer": "Đơn vị (Unit): Là phần nhỏ nhất, có thể kiểm thử được và độc lập của mã nguồn. Một \"unit\" có thể là một hàm (function), một phương thức (method), một lớp (class), hoặc một module riêng lẻ.\nMục đích: Kiểm tra xem mỗi đơn vị code riêng lẻ có hoạt động đúng như mong đợi hay không, trong sự cô lập hoàn toàn với các phần khác của hệ thống.\nAi thực hiện: Chủ yếu do lập trình viên (developer) viết và thực hiện. Họ là người hiểu rõ nhất về logic nội bộ của từng đơn vị code.\nLoại kiểm thử: Thường là White-box testing (kiểm thử hộp trắng), nghĩa là người kiểm thử có kiến thức về cấu trúc nội bộ, mã nguồn và thiết kế của đơn vị đang được kiểm thử.\nThời điểm: Thực hiện sớm nhất trong vòng đời phát triển phần mềm, ngay sau khi đơn vị code được viết.",
    "examples": [
     "// Lớp Calculator.java\npublic class Calculator {\n    public int add(int a, int b) {\n        return a + b;\n    }\n\n    public int subtract(int a, int b) {\n        return a - b;\n    }\n}",
     "// Lớp CalculatorTest.java\nimport org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertEquals;\n\npublic class CalculatorTest {\n    @Test\n    void testAddPositiveNumbers() {\n        Calculator calculator = new Calculator();\n        assertEquals(5, calculator.add(2, 3), \"2 + 3 should be 5\");\n    }\n    @Test\n    void testAddNegativeNumbers() {\n        Calculator calculator = new Calculator();\n        assertEquals(-5, calculator.add(-2, -3), \"-2 + -3 should be -5\");\n    }\n    @Test\n    void testAddZero() {\n        Calculator calculator = new Calculator();\n        assertEquals(10, calculator.add(10, 0), \"10 + 0 should be 10\");\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Spring-22",
    "question": "Integration Test (Kiểm thử tích hợp)",
    "answer": "Tích hợp (Integration): Là quá trình kết hợp các đơn vị (hoặc nhóm đơn vị, module) đã được kiểm thử độc lập lại với nhau và kiểm thử sự tương tác, giao tiếp giữa chúng.\nMục đích: Phát hiện các lỗi phát sinh do sự tương tác, giao tiếp, truyền dữ liệu giữa các module khác nhau hoặc giữa hệ thống với các dịch vụ bên ngoài (database, API của bên thứ ba, hệ thống file, v.v.).\nAi thực hiện: Có thể là lập trình viên (để kiểm tra tích hợp các module mà họ viết) hoặc kiểm thử viên (QA/Tester).\nLoại kiểm thử: Có thể là Black-box testing (kiểm thử hộp đen - chỉ quan tâm đầu vào/đầu ra, không cần biết mã nguồn bên trong), White-box testing (nếu kiểm thử viên có kiến thức về cấu trúc bên trong các module tích hợp) hoặc Gray-box testing (kết hợp cả hai).\nThời điểm: Thực hiện sau khi các unit test đã hoàn thành và các module đã được coi là hoạt động đúng đắn riêng lẻ.Ví dụ về Integration Test:\nGiả sử bạn có một ứng dụng web với:\n\nUserController: Xử lý các yêu cầu liên quan đến người dùng.\nUserService: Chứa logic nghiệp vụ liên quan đến người dùng (ví dụ: tạo, lấy, cập nhật người dùng).\nUserRepository: Tương tác với cơ sở dữ liệu để lưu trữ và truy xuất dữ liệu người dùng.\nMột integration test có thể kiểm tra luồng từ UserController -> UserService -> UserRepository -> Database:\n\nKịch bản: Gửi một yêu cầu HTTP POST đến /users với dữ liệu người dùng mới.\nKiểm tra:\nUserController nhận yêu cầu và gọi UserService.\nUserService xử lý logic nghiệp vụ và gọi UserRepository.\nUserRepository lưu dữ liệu vào cơ sở dữ liệu.\nPhản hồi HTTP từ UserController là 201 Created và dữ liệu người dùng được trả về chính xác.\nSau đó: Truy vấn trực tiếp cơ sở dữ liệu để xác nhận rằng người dùng đã thực sự được lưu trữ đúng cách.\nĐây là một ví dụ đơn giản về một integration test (sử dụng Spring Boot Test với H2 in-memory database để dễ dàng kiểm thử mà không cần DB thật):",
    "examples": [
     "// Lớp User.java (Model)\npublic class User {\n    private Long id;\n    private String username;\n    private String email;\n    // Getters and Setters, Constructors\n}\n\n// Lớp UserRepository.java (Tương tác DB)\nimport org.springframework.data.jpa.repository.JpaRepository;\npublic interface UserRepository extends JpaRepository<User, Long> {}\n\n// Lớp UserService.java (Business Logic)\nimport org.springframework.stereotype.Service;\nimport org.springframework.beans.factory.annotation.Autowired;\n\n@Service\npublic class UserService {\n    @Autowired\n    private UserRepository userRepository;\n    public User createUser(User user) {\n        // Có thể có thêm validation logic ở đây\n        return userRepository.save(user);\n    }\n    public User findUserByUsername(String username) {\n        return userRepository.findByUsername(username); // Giả sử có method này\n    }\n}\n// Lớp UserController.java (REST API Endpoint)\nimport org.springframework.web.bind.annotation.*;\nimport org.springframework.http.HttpStatus;\n@RestController\n@RequestMapping(\"/api/users\")\npublic class UserController {\n    @Autowired\n    private UserService userService;\n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    public User createUser(@RequestBody User user) {\n        return userService.createUser(user);\n    }\n    @GetMapping(\"/{username}\")\n    public User getUserByUsername(@PathVariable String username) {\n        return userService.findUserByUsername(username);\n    }\n}",
     "SpringBootTest\nAutoConfigureMockMvc\npublic class UserIntegrationTest {\n    @Autowired\n    private MockMvc mockMvc; // Dùng để gọi các API endpoint\n    @Autowired\n    private UserRepository userRepository; // Dùng để kiểm tra trực tiếp DB\n    @Autowired\n    private ObjectMapper objectMapper; // Dùng để chuyển đổi object thành JSON\n    @Test\n    void testCreateUserFlow() throws Exception {\n        User newUser = new User();\n        newUser.setUsername(\"testuser\");\n        newUser.setEmail(\"test@example.com\");\n        // Gửi request POST đến API\n        mockMvc.perform(post(\"/api/users\")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(objectMapper.writeValueAsString(newUser)))\n                .andExpect(status().isCreated()) // Kiểm tra status code là 201\n                .andExpect(jsonPath(\"$.username\").value(\"testuser\")) // Kiểm tra username trả về\n                .andExpect(jsonPath(\"$.email\").value(\"test@example.com\")); // Kiểm tra email trả về\n        // Kiểm tra xem dữ liệu đã được lưu vào database chưa\n        User savedUser = userRepository.findByUsername(\"testuser\");\n        // Kiểm tra xem user có tồn tại và đúng thông tin không\n        assertNotNull(savedUser);\n        assertEquals(\"test@example.com\", savedUser.getEmail());\n    }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Java Spring-23",
    "question": "Bean?",
    "answer": "Bean là gì? Trong Spring, một bean là một đối tượng được khởi tạo, cấu hình và quản lý bởi Spring Container. Thường là các class đại diện cho dịch vụ hoặc thành phần trong ứng dụng.",
    "examples": [
     "Trong ngữ cảnh Java — đặc biệt là khi dùng Spring Framework — thứ quản lý bean chính là Spring Container (hay còn gọi là ApplicationContext)."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "SQL",
  "items": [
   {
    "id": "SQL-2",
    "question": "Phân biệt WHERE và HAVING trong SQL.SELECT\n    CustomerID,\n    SUM(Amount) AS TotalAmount\nFROM\n    Orders\nGROUP BY\n    CustomerID\nHAVING\n    SUM(Amount) > 300;",
    "answer": "WHERE: Được sử dụng để lọc các hàng (rows) trước khi nhóm (grouping) dữ liệu. Nó không thể sử dụng với các hàm tổng hợp (aggregate functions) như COUNT(), SUM(), AVG().\nHAVING: Được sử dụng để lọc các nhóm (groups) dữ liệu sau khi các hàm tổng hợp đã được áp dụng. Nó luôn đi kèm với GROUP BY.\nVí dụ:\nSELECT Department, COUNT(EmployeeID) FROM Employees WHERE Age > 25 GROUP BY Department HAVING COUNT(EmployeeID) > 5; (Lọc nhân viên trên 25 tuổi trước, sau đó nhóm theo phòng ban, rồi lọc những phòng ban có hơn 5 nhân viên).Sự khác biệt chính giữa WHERE và HAVING:\n\nWHERE: Lọc các hàng (rows) riêng lẻ. Không thể sử dụng các hàm tổng hợp (như SUM(), COUNT(), AVG(), MAX(), MIN()) trong mệnh đề WHERE trực tiếp trên các cột được tổng hợp.\nHAVING: Lọc các nhóm (groups). Luôn được sử dụng với GROUP BY và thường chứa các hàm tổng hợp trong điều kiện lọc.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "SQL-3",
    "question": "Giải thích các loại JOINs phổ biến trong SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN.",
    "answer": "INNER JOIN: Trả về các hàng khi có ít nhất một sự trùng khớp ở cả hai bảng. (Chỉ lấy phần giao nhau).\nLEFT JOIN (hoặc LEFT OUTER JOIN): Trả về tất cả các hàng từ bảng bên trái, và các hàng trùng khớp từ bảng bên phải. Nếu không có sự trùng khớp ở bảng bên phải, các cột từ bảng bên phải sẽ có giá trị NULL.\nRIGHT JOIN (hoặc RIGHT OUTER JOIN): Trả về tất cả các hàng từ bảng bên phải, và các hàng trùng khớp từ bảng bên trái. Nếu không có sự trùng khớp ở bảng bên trái, các cột từ bảng bên trái sẽ có giá trị NULL.\nFULL OUTER JOIN: Trả về tất cả các hàng khi có sự trùng khớp ở một trong hai bảng (union của Left Join và Right Join). Nếu không có sự trùng khớp, các cột tương ứng sẽ là NULL. (Ít được sử dụng trong MySQL, thay vào đó là UNION của LEFT JOIN và RIGHT JOIN).",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "SQL-4",
    "question": "Ví dụ : Giả sử bạn có hai bảng Orders (OrderID, CustomerID, OrderDate) và Customers (CustomerID, CustomerName). Viết câu lệnh SQL để lấy CustomerName và OrderID cho tất cả các đơn hàng.",
    "answer": "SELECT C.CustomerName, O.OrderID\nFROM Customers C\nINNER JOIN Orders O ON C.CustomerID = O.CustomerID;(Hoặc LEFT JOIN nếu bạn muốn hiển thị cả những khách hàng chưa có đơn hàng nào, với OrderID là NULL).",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "SQL-5",
    "question": "Viết câu lệnh SQL để tính tổng lương của nhân viên theo từng phòng ban (Department).",
    "answer": "SELECT Department, SUM(Salary) AS TotalSalary\nFROM Employees\nGROUP BY Department;",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "SQL-6",
    "question": "Phân biệt ORDER BY và GROUP BY.",
    "answer": "GROUP BY: Được sử dụng để nhóm các hàng có giá trị giống nhau trong một hoặc nhiều cột thành các nhóm tóm tắt. Các hàm tổng hợp thường được sử dụng với GROUP BY.\nORDER BY: Được sử dụng để sắp xếp tập hợp kết quả của một truy vấn theo thứ tự tăng dần (ASC) hoặc giảm dần (DESC) dựa trên một hoặc nhiều cột.\nThứ tự thực hiện: GROUP BY được xử lý trước ORDER BY.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "SQL-7",
    "question": "Tìm hiểu về transactions",
    "answer": "Một transaction là một tập hợp các câu lệnh SQL (INSERT, UPDATE, DELETE...) được thực hiện như một đơn vị công việc duy nhất. Nó tuân theo nguyên tắc ACID.  Tính nguyên tử: hoặc tất cả câu lệnh thực hiện thành công, hoặc không có gì thay đổi.     Tính nhất quán: dữ liệu luôn ở trạng thái hợp lệ trước và sau transaction.    Tính độc lập: các transaction không ảnh hưởng lẫn nhau khi chạy đồng thời.    Tính bền vững: khi đã commit, dữ liệu sẽ tồn tại ngay cả khi hệ thống gặp sự cố.",
    "examples": [
     "BEGIN TRANSACTION: Bắt đầu một TRANSACTION\nCOMMIT: Lưu các thay đổi vào cơ sở dữ liệu\nROLLBACK: Hoàn tác các thay đổi nếu có lỗi\nSAVEPOINT: Tạo điểm đánh dấu để ROLLBACK một phần\nSET TRANSACTION: Thiết lập thuộc tính cho TRANSACTION (ví dụ: chỉ đọc)",
     "BEGIN TRANSACTION;\nUPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 'A';\nUPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 'B';\nCOMMIT;"
    ],
    "source": "excel"
   },
   {
    "id": "SQL-8",
    "question": "Đánh index và tìm kiếm trong sql",
    "answer": "Ưu điểm của Index\n- Tăng tốc độ truy vấn: Index giúp hệ quản trị cơ sở dữ liệu (DBMS) tìm kiếm dữ liệu nhanh hơn, đặc biệt với các bảng lớn.\n- Cải thiện hiệu năng SELECT: Các câu lệnh SELECT có điều kiện (WHERE, JOIN, ORDER BY, GROUP BY) sẽ chạy nhanh hơn khi có index phù hợp.\n- Đảm bảo tính duy nhất: Index loại UNIQUE giúp đảm bảo không có dữ liệu trùng lặp trong cột được đánh chỉ mục.\n- Hỗ trợ kiểm tra ràng buộc: Index trên khóa chính và khóa ngoại giúp kiểm tra nhanh tính toàn vẹn dữ liệu.\n- Tối ưu hóa tìm kiếm toàn văn bản: Với Full-text Index, bạn có thể tìm kiếm từ khóa trong chuỗi văn bản hiệu quả hơn.",
    "examples": [
     "Nhược điểm của Index\n- Làm chậm thao tác ghi dữ liệu: Các lệnh INSERT, UPDATE, DELETE sẽ chậm hơn vì DBMS phải cập nhật lại index sau mỗi thay đổi.\n- Chiếm dung lượng bộ nhớ: Mỗi index đều chiếm thêm không gian lưu trữ, đặc biệt khi có nhiều index trên một bảng.\n- Không hiệu quả với bảng nhỏ: Với bảng có ít bản ghi, việc đánh index có thể không mang lại lợi ích rõ rệt.\n- Không phù hợp với cột ít giá trị phân biệt: Ví dụ như cột gender chỉ có \"Nam\" và \"Nữ\" thì index sẽ không cải thiện tốc độ truy vấn nhiều.\n- Phức tạp khi thiết kế: Việc chọn đúng cột để đánh index đòi hỏi hiểu rõ về dữ liệu và cách truy vấn thực tế.",
     "Mẹo sử dụng Index hiệu quả\n- Chỉ đánh index trên các cột thường xuyên được dùng trong điều kiện truy vấn (WHERE, JOIN, ORDER BY).\n- Tránh đánh index trên các bảng nhỏ hoặc cột thường xuyên bị cập nhật.\n- Sử dụng EXPLAIN để phân tích hiệu năng truy vấn và kiểm tra xem index có được sử dụng hay không."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "Git",
  "items": [
   {
    "id": "Git-2",
    "question": "Các bước push code lên git",
    "answer": "Các bước nhanh gọn để ghi nhớ:\ncd /duong/dan/den/du_an_cua_ban\ngit init\n(Tạo hoặc chỉnh sửa tệp .gitignore)\ngit add .\ngit commit -m \"Initial commit\"\n(Tạo kho lưu trữ rỗng trên GitHub/GitLab/Bitbucket và sao chép URL)\ngit remote add origin URL_KHO_LUU_TRU_CUA_BAN\ngit push -u origin main (hoặc master)",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Git-3",
    "question": "phân biệt git merge và git rebase",
    "answer": "Cả git merge và git rebase đều là các lệnh được sử dụng để tích hợp các thay đổi từ một nhánh này vào một nhánh khác trong Git. Tuy nhiên, chúng thực hiện việc này theo những cách rất khác nhau, dẫn đến lịch sử commit khác nhau và có những ưu nhược điểm riêng.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Git-4",
    "question": "git merge",
    "answer": "Khái niệm: git merge là cách phổ biến và đơn giản nhất để tích hợp các thay đổi. Nó tạo ra một \"merge commit\" mới, có hai hoặc nhiều commit cha, ghi lại quá trình tích hợp.\n\nCách hoạt động:\nKhi bạn merge nhánh feature vào main, Git sẽ tìm điểm chung gần nhất giữa hai nhánh (common ancestor). Sau đó, nó tạo một commit mới (merge commit) mà chứa tất cả các thay đổi từ cả hai nhánh, đồng thời ghi lại sự kiện tích hợp này.Trong đó F là một merge commit mới, có C và E là các commit cha của nó.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Git-5",
    "question": "Git Rebase",
    "answer": "Khái niệm: git rebase là một cách thay thế để tích hợp các thay đổi. Thay vì tạo một merge commit, rebase sẽ di chuyển hoặc viết lại một chuỗi commit để chúng xuất hiện sau commit cuối cùng của nhánh đích. Nó tạo ra một lịch sử commit tuyến tính hơn (thẳng hàng).\n\nCách hoạt động:\nKhi bạn rebase nhánh feature lên nhánh main, Git sẽ:\n\nTìm điểm chung gần nhất giữa feature và main.\nLưu trữ các thay đổi được giới thiệu bởi từng commit trên nhánh feature kể từ điểm chung đó.\n\"Reset\" nhánh feature về điểm chung.\nÁp dụng lại từng commit đã lưu trữ của feature lên trên commit cuối cùng của nhánh main theo thứ tự.Trong đó D' và E' là các commit mới được tạo ra (mặc dù nội dung thay đổi giống hệt D và E), nhưng chúng có commit cha là C (commit cuối cùng của main). Các commit D và E ban đầu trên nhánh feature sẽ bị loại bỏ.\n\nSau đó, để cập nhật nhánh main, bạn có thể thực hiện một \"fast-forward merge\" (chỉ di chuyển con trỏ main đến E'):",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Git-6",
    "question": "các lỗi gây ra xung đột trong git",
    "answer": "Hai người cùng sửa cùng một dòng trong cùng một file\nVí dụ:\n// A sửa\nSystem.out.println(\"Xin chào\");\n// B sửa\nSystem.out.println(\"Chào bạn\");\n➡️ Khi merge lại, Git không biết dùng dòng nào, dẫn đến conflict.\n🧽 2. Một người sửa, người khác xoá dòng đó\nVí dụ:\nBạn sửa nội dung dòng 20 trong main.js.\nNgười khác trên nhánh khác xoá dòng 20.\n➡️ Git không biết nên giữ sửa hay xoá → gây xung đột.\n📄 3. Cả hai thêm cùng tên file khác nội dung\nVí dụ:\nBạn tạo file LoginForm.jsx với nội dung A.\nNgười khác cũng tạo LoginForm.jsx nhưng nội dung B.\n➡️ Khi merge, Git không biết chọn file nào → xung đột file mới.\n🔀 4. Merge hoặc Rebase nhánh có thay đổi mâu thuẫn\nTình huống:\nBạn đang ở nhánh feature và rebase lên main.\nmain có sửa file config.json, feature cũng sửa file đó.\n➡️ Lúc rebase, Git sẽ cố gắng phát lại commit của bạn trên main, nếu có xung đột → báo lỗi.\n🔃 5. Merge/Rebase giữa các nhánh có commit lịch sử phức tạp\nKhi bạn rebase một nhánh đã từng merge nhiều lần, hoặc có commit chồng chéo, Git có thể bị rối lịch sử và gây conflict, nhất là khi:\nSửa cùng file nhiều lần qua các nhánh khác nhau\nKhông rõ commit nào là mới nhất (do squash, cherry-pick...)\n🧨 6. Sửa xung đột không đúng cách gây lỗi tiếp theo\nBạn giải quyết xung đột sai (giữ lại cả 2 phần mâu thuẫn)\nKhông xóa hết <<<<<<<, =======, >>>>>>>\n➡️ Khi add file, Git không hiểu được → lỗi cú pháp hoặc lỗi logic.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Git-7",
    "question": ".gitignore là gì và tạo nó như thế nào nó nằm ở đâu trong thư mục",
    "answer": ".gitignore là một tệp đặc biệt trong hệ thống Git dùng để chỉ định các tệp và thư mục mà bạn không muốn Git theo dõi hoặc đưa vào kho lưu trữ. Nó cực kỳ hữu ích để giữ cho kho mã của bạn sạch sẽ, tránh chứa những thứ như:\n- File cấu hình cá nhân (config.json, .env,…)\n- File build (dist/, build/,…)\n- File tạm thời hoặc cache (*.log, *.tmp, .DS_Store,…)",
    "examples": [
     ".gitignore nằm ở đâu trong thư mục?\nBạn có thể đặt .gitignore ở thư mục gốc của repository — nơi chứa thư mục .git. Git sẽ tự động đọc tệp này mỗi khi bạn thực hiện các thao tác như git add hay git commit.\nNếu dự án có nhiều module hoặc phần riêng biệt, bạn cũng có thể tạo .gitignore riêng trong các thư mục con."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "JavaScript (FE)",
  "items": [
   {
    "id": "JavaScript (FE)-2",
    "question": "var – let – const so sánh",
    "answer": ". Scope (Phạm vi hoạt động)\nĐây là sự khác biệt lớn nhất giữa \"thế hệ cũ\" (var) và \"thế hệ mới\" (let, const).\n\nvar (Function Scope): Nếu bạn khai báo var bên trong một hàm, nó chỉ có tác dụng trong hàm đó. Tuy nhiên, nếu khai báo trong các khối như if hay for, nó vẫn \"lọt\" ra ngoài.\n\nlet & const (Block Scope): Biến chỉ tồn tại trong cặp ngoặc nhọn {} nơi nó được sinh ra. Điều này giúp tránh lỗi \"râu ông nọ cắm cằm bà kia\" rất hiệu quả.Ưu tiên dùng const cho mọi thứ. Nó giúp code của bạn an toàn và dễ đoán hơn.\n\nChỉ dùng let khi bạn chắc chắn rằng giá trị của biến đó cần phải thay đổi (ví dụ: biến đếm i trong vòng lặp for).\n\nHạn chế hoặc ngưng sử dụng var để tránh các vấn đề về phạm vi và lỗi logic không đáng có.",
    "examples": [
     "2. Hoisting (Cơ chế đưa lên đầu)\nVới var, bạn có thể gọi biến trước khi khai báo mà không bị lỗi (nó sẽ trả về undefined).\n\nVới let và const, trình duyệt sẽ báo lỗi ReferenceError nếu bạn \"cầm đèn chạy trước ô tô\". Chúng thực tế vẫn được hoisting nhưng nằm trong vùng \"tử thần\" (Temporal Dead Zone) cho đến khi dòng khai báo được chạy tới.\n\n3. Khai báo lại và Gán lại\nvar: Rất thoải mái, bạn có thể khai báo trùng tên biến nhiều lần mà không bị mắng. Nhưng đây cũng là nguồn cơn của nhiều bug khó tìm.\n\nlet: Cho phép đổi giá trị (như biến đếm trong vòng lặp) nhưng không cho phép khai báo lại cùng một tên trong cùng một scope.\n\nconst: Là \"hằng số\". Một khi đã gán giá trị là bạn không thể thay đổi nó.\n\nLưu ý nhỏ: Với const là Object hoặc Array, bạn vẫn có thể thay đổi nội dung bên trong (thêm phần tử, sửa thuộc tính), nhưng không thể gán nguyên một Object/Array mới vào biến đó."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-4",
    "question": "Closure là gì?",
    "answer": "Nói một cách đơn giản nhất: Closure là một hàm có khả năng \"nhớ\" và truy cập vào các biến thuộc phạm vi (scope) của hàm cha, ngay cả khi hàm cha đó đã thực thi xong và đóng lại.\n\nHãy tưởng tượng Closure giống như một cái \"balo\" mà hàm con mang theo. Trong cái balo đó chứa tất cả những món đồ (biến số) mà nó lấy từ nhà (hàm cha) trước khi ra đi.",
    "examples": [
     "function taoMayDem() {\n  let count = 0; // Biến này nằm trong hàm cha\n  return function() { \n    // Đây là hàm con (Closure)\n    count++; \n    console.log(count);\n  };\n}const dem = taoMayDem(); \ndem(); // Kết quả: 1\ndem(); // Kết quả: 2\ndem(); // Kết quả: 3"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-5",
    "question": "Event Loop là gì?",
    "answer": "JavaScript chỉ có thể làm một việc tại một thời điểm. Event Loop là cơ chế giúp JavaScript thực hiện các tác vụ bất đồng bộ (như gọi API, đọc file, set timer) mà không làm treo trình duyệt.",
    "examples": [
     "1. Các thành phần chính của \"Bộ máy\"\nĐể hiểu Event Loop, bạn cần biết 4 bộ phận này phối hợp với nhau như thế nào:\n\nCall Stack (Ngăn xếp tiếng gọi): Nơi chứa các hàm đang được thực thi. Hàm nào vào sau thì ra trước (LIFO). Khi một hàm chạy xong, nó bị đẩy ra khỏi Stack.\n\nWeb APIs: Đây là \"trợ thủ\" của trình duyệt (như setTimeout, fetch, DOM events). Khi gặp các tác vụ tốn thời gian, JavaScript sẽ đẩy sang đây để Web API làm hộ, còn anh đầu bếp (Call Stack) tiếp tục làm việc khác.\n\nCallback Queue (Hàng đợi): Sau khi Web API làm xong (ví dụ: hết 2 giây timer), nó đẩy hàm callback vào đây để xếp hàng chờ.\n\nEvent Loop (Vòng lặp sự kiện): Đây là \"ông cảnh sát giao thông\". Nhiệm vụ duy nhất của nó là: Kiểm tra xem Call Stack có trống không? Nếu Stack trống, nó sẽ bốc hàm đầu tiên trong hàng đợi đẩy vào Stack để chạy."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-6",
    "question": "Virtual DOM là gì?",
    "answer": "Virtual DOM là bản sao DOM thật ở dạng JS object.\n\nKhi state thay đổi:\n\nReact tạo Virtual DOM mới\n\nSo sánh với cái cũ (diffing)\n\nChỉ update phần thay đổi → nhanh hơn",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-7",
    "question": "prop vs state",
    "answer": "Props\t                                       State\nTruyền từ cha xuống con          Nội bộ component\nRead-only\t                        Có thể thay đổi\nKhông tự thay đổi\t         Dùng setState",
    "examples": [
     "import React, { useState } from 'react';\n// Component Con\nfunction DongHo(props) {\n  // 1. State: Số giây (tự thay đổi bên trong)\n  const [seconds, setSeconds] = useState(0);\n  const tangGiay = () => {\n    setSeconds(seconds + 1);\n  };\n  return (\n    <div style={{ color: props.mauSac }}> \n      {/* 2. Props: mauSac được truyền từ bên ngoài vào */}\n      <h1>Màu của tôi là: {props.mauSac}</h1>\n      <p>Số giây hiện tại: {seconds}</p>\n      <button onClick={tangGiay}>Tăng giây</button>\n    </div>\n  );\n}\n// Component Cha\nfunction App() {\n  return (\n    <div>\n      {/* Cha truyền 'mauSac' xuống cho con thông qua Props */}\n      <DongHo mauSac=\"red\" />\n      <DongHo mauSac=\"blue\" />\n    </div>\n  );\n}",
     "Hãy xem một Component DongHo (Đồng hồ). Nó nhận \"Màu sắc\" từ cha (Props) nhưng tự quản lý \"Số giây\" của chính nó (State).  Phân tích ví dụ:\n\nProps (mauSac): Khi App truyền màu đỏ, DongHo buộc phải hiển thị màu đỏ. Nó không thể tự đổi thành màu xanh. Nếu muốn đổi, App phải truyền một giá trị khác.\n\nState (seconds): Mỗi khi bấm nút, seconds tăng lên. Đây là việc nội bộ của DongHo, App không cần biết và cũng không can thiệp vào."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-17",
    "question": "box model trong html css",
    "answer": "Một cái \"hộp\" CSS gồm 4 lớp vỏ từ trong ra ngoài:\nContent (Nội dung): Nơi chứa chữ, hình ảnh hoặc các thẻ con. Kích thước được xác định bởi width và height.\nPadding (Vùng đệm): Khoảng trống bên trong hộp, nằm giữa nội dung và viền. Nó làm tăng kích thước tổng thể của hộp nhưng vẫn giữ màu nền của hộp.\nBorder (Viền): Đường kẻ bao quanh vùng đệm và nội dung.\nMargin (Lề): Khoảng cách bên ngoài hộp dùng để đẩy các hộp khác ra xa. Nó là vùng trong suốt, không có màu nền.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-18",
    "question": "giải thích display : block, inline, inline-block",
    "answer": "1. display: block (Khối)\nThẻ này giống như một \"viên gạch\" lớn.\n\nĐặc điểm: Luôn bắt đầu trên một dòng mới và chiếm hết chiều rộng của hàng đó (ngay cả khi nội dung rất ngắn).\n\nKích thước: Bạn có thể tự do đặt width và height.\n\nMargin/Padding: Ăn đủ 4 hướng (trên, dưới, trái, phải).\n\nCác thẻ mặc định: <div>, <h1> đến <h6>, <p>, <ul>, <li>.",
    "examples": [
     "2. display: inline (Trên cùng một dòng)\nThẻ này giống như một \"từ ngữ\" trong một đoạn văn.\n\nĐặc điểm: Không bắt đầu dòng mới. Nó chỉ chiếm diện tích vừa đủ với nội dung bên trong. Các thẻ inline sẽ nằm sát nhau trên cùng một hàng.\n\nKích thước: Không thể đặt width và height. Kích thước do nội dung quyết định.\n\nMargin/Padding: Chỉ ăn theo chiều ngang (trái, phải). Chiều dọc (trên, dưới) sẽ không đẩy các phần tử khác ra xa được.\n\nCác thẻ mặc định: <span>, <a>, <strong>, <em>.",
     "3. display: inline-block (Sự kết hợp hoàn hảo)\nĐây là \"đứa con lai\" sở hữu ưu điểm của cả hai loại trên.\n\nĐặc điểm: Giống inline ở chỗ nó không nhảy dòng, các thẻ nằm cùng hàng với nhau.\n\nKích thước: Giống block ở chỗ bạn có thể đặt width, height, margin, padding một cách đầy đủ.\n\nỨng dụng: Thường dùng để làm thanh Menu (Navigation) hoặc các danh sách sản phẩm nằm ngang mà vẫn muốn chỉnh kích thước từng ô."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-19",
    "question": "các phương thức xử lý mảng trong js",
    "answer": "1. Nhóm Duyệt và Biến đổi (Hay dùng nhất)\nĐây là các phương thức \"bất biến\" (không làm thay đổi mảng gốc mà trả về kết quả mới).\nmap(): Tạo ra một mảng mới bằng cách thực thi một hàm lên từng phần tử của mảng cũ.\nVí dụ: Nhân đôi tất cả các số trong mảng.\nfilter(): Lọc ra các phần tử thỏa mãn một điều kiện nào đó và trả về mảng mới.\nVí dụ: Lấy ra các số lớn hơn 10.\nreduce(): \"Gom\" tất cả phần tử trong mảng lại thành một giá trị duy nhất (số, chuỗi, hoặc object).\nVí dụ: Tính tổng các số trong mảng.\nforEach(): Duyệt qua từng phần tử nhưng không trả về mảng mới. Thường dùng để log dữ liệu hoặc thực hiện hành động bên ngoài.",
    "examples": [
     "2. Nhóm Tìm kiếm phần tử\nfind(): Trả về phần tử đầu tiên tìm thấy thỏa mãn điều kiện. Nếu không thấy trả về undefined.\n\nfindIndex(): Giống find nhưng trả về chỉ số (index) của phần tử đó.\n\nincludes(): Kiểm tra xem mảng có chứa một giá trị cụ thể hay không. Trả về true/false.\n\nsome(): Trả về true nếu có ít nhất một phần tử thỏa mãn điều kiện.\n\nevery(): Trả về true nếu tất cả phần tử đều thỏa mãn điều kiện.",
     "3. Nhóm Thêm/Xóa phần tử (Làm thay đổi mảng gốc)\npush(): Thêm vào cuối mảng.\n\npop(): Xóa phần tử cuối mảng.\n\nunshift(): Thêm vào đầu mảng.\n\nshift(): Xóa phần tử đầu mảng.\n\nsplice(): Phương thức \"đa năng\" dùng để xóa, chèn hoặc thay thế phần tử tại bất kỳ vị trí nào.4. Nhóm Khác\nsort(): Sắp xếp mảng (mặc định là theo chuỗi Alphabet).\n\nconcat(): Nối hai hoặc nhiều mảng lại với nhau.\n\njoin(): Biến mảng thành một chuỗi (String) nối với nhau bằng ký tự tự chọn.",
     "const numbers = [1, 2, 3, 4, 5];\n\n// 1. Map: Nhân đôi\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]\n\n// 2. Filter: Lấy số chẵn\nconst evens = numbers.filter(n => n % 2 === 0); // [2, 4]\n\n// 3. Reduce: Tính tổng\nconst total = numbers.reduce((acc, curr) => acc + curr, 0); // 15\n\n// 4. Find: Tìm số lớn hơn 3\nconst found = numbers.find(n => n > 3); // 4"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-20",
    "question": "String Immutable (Chuỗi bất biến) nghĩa là gì?",
    "answer": "Bản chất: Trong JS, khi một chuỗi (String) đã được tạo ra trong bộ nhớ, bạn không thể thay đổi từng ký tự đơn lẻ bên trong nó. Bạn chỉ có thể tạo ra một chuỗi mới hoàn toàn và gán đè lại vào biến.",
    "examples": [
     "let ten = \"Hello\";\n// Cố tình sửa chữ H thành chữ M\nten[0] = \"M\"; \nconsole.log(ten); // Vẫn in ra: \"Hello\" (Lệnh đổi ký tự phía trên bị JS bơ đi, không có tác dụng)\n// Cách đúng để đổi: Gán lại toàn bộ chuỗi mới\nten = \"Mello\";"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-21",
    "question": "Function Declaration vs Function Expression",
    "answer": "Hai cách phổ biến nhất để tạo một hàm, khác nhau ở Hoisting (Khả năng gọi hàm trước khi viết code).\n\nFunction Declaration (Khai báo hàm): Dùng chữ function đứng đầu dòng. Hàm này bị kéo (hoist) lên tít trên cùng, nên bạn gọi hàm ở đâu cũng được.",
    "examples": [
     "Function Expression (Biểu thức hàm): Lưu hàm vào một biến const hoặc let. Giống như biến, bạn phải viết nó ra rồi mới được phép gọi.",
     "// --- 1. Function Declaration ---\nchaoHoi(); // CHẠY NGON LÀNH dù hàm viết ở dưới!\nfunction chaoHoi() {\n  console.log(\"Xin chào!\");\n// --- 2. Function Expression ---\n// tinhTong(); // LỖI NGAY: Cannot access 'tinhTong' before initialization\nconst tinhTong = function() {\n  console.log(1 + 1);\n};\ntinhTong(); // Viết dưới này mới được chạy"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-22",
    "question": "Sự kỳ diệu của Arrow Function (() => {})Arrow Function không chỉ là cách viết tắt cho ngắn. Nó có 2 khác biệt cực kỳ lớn với function thường: Không có arguments và Không có this của riêng nó.",
    "answer": "A. Không có arguments (Danh sách tham số ẩn)\nHàm thường tự động có biến arguments gom mọi thứ bạn truyền vào. Arrow function thì không, bạn phải dùng Rest Operator ... // Hàm thường\nfunction inThamSo() {\n  console.log(arguments); // [1, 2, 3]\n}\ninThamSo(1, 2, 3);\n// Arrow Function\nconst inThamSoMoi = (...args) => {\n  // console.log(arguments); // Báo lỗi: arguments is not defined\n  console.log(args); // [1, 2, 3] (Phải dùng ...args)\n};\ninThamSoMoi(1, 2, 3);",
    "examples": [
     "B. Không có this (Cực kỳ quan trọng)\n\nHàm thường: this phụ thuộc vào ai là người gọi nó.\n\nArrow function: Không có this! Nó sẽ nhìn ra bên ngoài môi trường bao bọc nó (lexical scope) và xài ké this của hàm cha.",
     "const user = {\n  ten: \"Minh\",\n  // Dùng hàm thường\n  inTenLoi: function() {\n    setTimeout(function() {\n      // Bên trong setTimeout, hàm thường bị mất 'this' (nó trỏ ra Window)\n      console.log(\"Tên lỗi là: \" + this.ten); \n    }, 1000);\n  },\n  // Dùng Arrow Function\n  inTenChuan: function() {\n    setTimeout(() => {\n      // Arrow function xài ké 'this' của hàm inTenChuan() bên ngoài\n      console.log(\"Tên chuẩn là: \" + this.ten); \n    }, 1000);\n  }\n};\nuser.inTenLoi();   // Trả về: \"Tên lỗi là: undefined\"\nuser.inTenChuan(); // Trả về: \"Tên chuẩn là: Minh\""
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-23",
    "question": "Callback Function và Higher-Order Function (HOF)",
    "answer": "Callback Function (Hàm gọi lại): Là một hàm được truyền vào một hàm khác dưới dạng tham số (parameter). Nó giống như việc bạn đưa số điện thoại cho nhân viên cửa hàng: \"Khi nào có hàng thì gọi lại (call-back) cho tôi nhé\".\n\nHigher-Order Function (Hàm bậc cao): Là hàm nhận Callback Function làm tham số, hoặc là hàm trả về (return) một hàm khác.",
    "examples": [
     "// 1. Đây là Callback Function (Hàm được truyền đi)\nfunction chaoHoi(ten) {\n  console.log(\"Xin chào, \" + ten);\n}\n// 2. Đây là Higher-Order Function (Hàm nhận Callback)\nfunction xuLyDuLieu(tenNguoiDung, hamXuLy) {\n  console.log(\"Đang tải dữ liệu của \" + tenNguoiDung + \"...\");\n  // Sau khi xử lý xong, nó gọi hàm callback\n  hamXuLy(tenNguoiDung); \n}\n// Chạy thử:\nxuLyDuLieu(\"An\", chaoHoi); \n// Output: \n// Đang tải dữ liệu của An...\n// Xin chào, An"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-24",
    "question": "Lexical Scope và Scope Chain",
    "answer": "Lexical Scope (Phạm vi tĩnh): Trong JS, phạm vi của một biến được xác định ngay từ lúc bạn gõ code (vị trí vật lý), chứ không phải lúc hàm chạy. Một hàm con luôn có quyền truy cập vào các biến của hàm cha bọc nó.\n\nScope Chain (Chuỗi phạm vi): Khi bạn gọi một biến, JS sẽ tìm theo một dây chuyền từ trong ra ngoài:\n\nTìm trong hàm hiện tại xem có biến đó không.\n\nKhông có -> Bò ra hàm cha bọc nó để tìm.\n\nKhông có -> Bò ra ngoài cùng (Global scope).\n\nNếu tìm tới Global vẫn không có -> Báo lỗi ReferenceError.",
    "examples": [
     "let bienGlobal = \"Tôi ở ngoài cùng\";\nfunction hamCha() {\n  let bienCha = \"Tôi ở hàm cha\";\n  function hamCon() {\n    let bienCon = \"Tôi ở hàm con\";\n    // hamCon không có 'bienCha' hay 'bienGlobal', nó phải nhìn ra ngoài (Scope Chain)\n    console.log(bienCon);\n    console.log(bienCha);   // Thành công (lấy từ hàmCha)\n    console.log(bienGlobal); // Thành công (lấy từ Global)\n  }\n  hamCon();\n  // console.log(bienCon); // LỖI! Hàm cha không thể thò tay vào hàm con lấy biến được.\n}\nhamCha();"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-25",
    "question": "Debounce và Throttle ?",
    "answer": "Hai kỹ thuật kinh điển để tối ưu hiệu năng trang web khi người dùng thao tác quá nhanh (gõ phím, cuộn chuột).\n\nDebounce (Gom nhóm): Giống như thang máy. Thang máy sẽ chờ 3 giây. Nếu có người bước vào, nó đếm lại từ đầu. Khi nào thực sự không còn ai bước vào nữa (user ngừng thao tác) thì thang máy mới chạy.",
    "examples": [
     "Throttle (Giới hạn nhịp độ): Giống như tàu lượn siêu tốc. Cứ đúng 15 phút tàu chạy 1 chuyến. Dù trong 15 phút đó khách có bấm nút đòi chạy liên tục 1000 lần, tàu vẫn bơ đi.\n\nDùng cho: Bắt sự kiện Scroll, Resize cửa sổ (chỉ cho phép chạy hàm update UI tối đa 1 lần mỗi 200ms)."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-26",
    "question": "Shallow Copy vs Deep Copy (Nông vs Sâu)",
    "answer": "Đây là nguồn gốc của 80% bug mất dữ liệu ở các bạn Dev mới!\n\nShallow Copy (Copy Nông): Khi bạn copy 1 Object, nó chỉ copy lớp ngoài cùng. Nếu bên trong Object đó lại chứa 1 Object con (Nested Object), thì Object con đó vẫn bị dùng chung bộ nhớ giữa bản gốc và bản sao.\n\nDeep Copy (Copy Sâu): Cắt đứt hoàn toàn mọi liên kết. Bản gốc và bản sao độc lập 100% từ ngoài vào trong.",
    "examples": [
     "Ví dụ Copy Nông (Dùng Spread Operator ...):\nJavaScript\nconst goc = { \n  ten: \"Minh\", \n  diaChi: { thanhPho: \"Hà Nội\" } // Đây là Object con\n};\n// Copy nông bằng Spread\nconst banSao = { ...goc }; \nbanSao.ten = \"Lan\"; // Đổi tên ở bản sao (Lớp ngoài) -> Gốc không bị ảnh hưởng\nbanSao.diaChi.thanhPho = \"HCM\"; // Đổi thành phố (Lớp trong) -> GỐC BỊ ĐỔI THEO LUÔN!\nconsole.log(goc.diaChi.thanhPho); // \"HCM\" (Chết dở!)",
     "Cách giải quyết (Deep Copy):\n\nCách cũ (JSON.parse(JSON.stringify(obj))): Biến Object thành chuỗi Text, rồi biến Text ngược lại thành Object. Nhược điểm: Sẽ làm mất các key có giá trị là function, undefined, và làm sai ngày tháng (Date).\n\nCách chuẩn hiện đại (structuredClone()): API có sẵn của trình duyệt. Copy sâu hoàn hảo, giữ nguyên các kiểu dữ liệu phức tạp.",
     "// Copy sâu an toàn tuyệt đối!\nconst banSaoXin = structuredClone(goc);"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-27",
    "question": "Mutate vs Non-Mutate Array (Biến đổi vs Không biến đổi)",
    "answer": "Khi gọi một hàm xử lý mảng, bạn phải biết nó có \"chạm\" vào mảng gốc hay không.\n\nMutate (Biến đổi mảng gốc): push, pop, splice, sort, reverse. Khi dùng các hàm này, mảng ban đầu của bạn sẽ bị thay đổi vĩnh viễn. (Trong React, việc vô tình mutate mảng gốc là tối kỵ vì nó làm UI không cập nhật).",
    "examples": [
     "Non-Mutate (Trả về mảng mới, mảng gốc an toàn): map, filter, slice, concat."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-28",
    "question": "slice() vs splice()",
    "answer": "slice (Lát cắt): \"Cắt\" lấy một khúc của mảng để tạo ra mảng mới. Hoàn toàn không ảnh hưởng mảng gốc (Non-mutate).\n\nsplice (Mối nối): Chọc thẳng vào mảng gốc để cắt bỏ hoặc nhét thêm phần tử. Làm biến đổi mảng gốc (Mutate).",
    "examples": [
     "const traiCay = [\"Táo\", \"Cam\", \"Chuối\", \"Nho\"];\n// SLICE: Lấy từ vị trí số 1 đến số 3 (Không lấy số 3)\nconst layRa = traiCay.slice(1, 3); \nconsole.log(layRa); // [\"Cam\", \"Chuối\"]\nconsole.log(traiCay); // [\"Táo\", \"Cam\", \"Chuối\", \"Nho\"] (Gốc CÒN NGUYÊN)\n// SPLICE: Bắt đầu từ vị trí số 1, xóa đi 2 phần tử\ntraiCay.splice(1, 2);\nconsole.log(traiCay); // [\"Táo\", \"Nho\"] (Gốc ĐÃ BỊ THAY ĐỔI)"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-29",
    "question": "Lỗi kinh điển khi dùng sort()",
    "answer": "Theo mặc định, hàm sort() của JS ép mọi thứ thành Chuỗi (String) rồi mới sắp xếp theo bảng chữ cái (Alphabet). Chứ nó không hiểu Toán học!",
    "examples": [
     "const so = [10, 2, 30, 1];\nso.sort(); \nconsole.log(so); \n// Kết quả: [1, 10, 2, 30] (Vì chữ \"10\" đứng trước chữ \"2\" trong từ điển!)\n// CÁCH SẮP XẾP SỐ CHUẨN: Bắt buộc phải truyền Callback Function\nso.sort((a, b) => a - b); // Tăng dần (Nếu muốn giảm dần thì b - a)\nconsole.log(so); // [1, 2, 10, 30] (Chuẩn!)"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-30",
    "question": "map vs filter vs reduce và forEach",
    "answer": "Đây là \"bộ ba nguyên tử\" của Array.\n\nforEach: Duyệt qua mảng để làm một hành động gì đó (ví dụ: console.log), trả về undefined.\n\nmap: Biến đổi từng phần tử và trả về mảng mới CÙNG độ dài.\n\nfilter: Lọc các phần tử thỏa mãn điều kiện, trả về mảng mới (có thể NGẮN HƠN).\n\nreduce: Quét qua mảng và nhồi nhét, cộng dồn tất cả lại thành MỘT giá trị duy nhất (một số, một chuỗi, hoặc một object gom nhóm).",
    "examples": [
     "const gioHang = [\n  { ten: \"Chuột\", gia: 200 },\n  { ten: \"Bàn phím\", gia: 500 },\n  { ten: \"Lót chuột\", gia: 50 }\n];\n\n// 1. Dùng map: Tạo mảng mới chỉ chứa Tên sản phẩm\nconst tenSanPham = gioHang.map((item) => item.ten);\n// Kết quả: [\"Chuột\", \"Bàn phím\", \"Lót chuột\"]\n\n// 2. Dùng filter: Chỉ lấy món đồ > 100k\nconst doDatTien = gioHang.filter((item) => item.gia > 100);\n// Kết quả: Mảng chứa [Chuột, Bàn phím]\n\n// 3. Dùng reduce: Tính tổng tiền giỏ hàng\n// acc (accumulator) là biến tích lũy, bắt đầu từ 0\nconst tongTien = gioHang.reduce((acc, item) => acc + item.gia, 0);\n// Kết quả: 750"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-31",
    "question": "Call Stack và Memory Heap (Nơi làm việc và Nhà kho)",
    "answer": "JavaScript Engine (như V8 trong Chrome) có 2 khu vực chính để hoạt động:\n\nMemory Heap (Nhà kho): Một vùng bộ nhớ rộng lớn, lộn xộn. Nó dùng để cấp phát chỗ ở cho các dữ liệu phức tạp (Object, Array, Function) khi bạn khởi tạo chúng.",
    "examples": [
     "function hamA() { console.log(\"Chạy A\"); }\nfunction hamB() { hamA(); console.log(\"Chạy B\"); }\nhamB(); \n// Thứ tự trong Call Stack:\n// 1. Đẩy hamB vào Stack\n// 2. hamB gọi hamA -> Đẩy hamA lên TRÊN hamB\n// 3. hamA chạy xong (in \"Chạy A\") -> Đá hamA ra khỏi Stack\n// 4. hamB chạy tiếp (in \"Chạy B\") -> Đá hamB ra khỏi Stack\n// 5. Stack trống rỗng!"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-32",
    "question": "Event Loop, Web APIs và Task Queues (Trái tim của JS)",
    "answer": "Nếu JS chỉ làm được 1 việc cùng lúc, thì khi ta gọi API tốn mất 5 giây, tại sao trang web không bị đơ (đóng băng)? Đó là nhờ \"sự trợ giúp của người thân\" (Trình duyệt) và Event Loop.\n\nWeb APIs: Trình duyệt cung cấp các công cụ chạy ở \"luồng phụ\" bên ngoài JS (như setTimeout, fetch gọi API, DOM events). Khi JS gặp setTimeout, nó đẩy việc đếm ngược này cho Web APIs làm hộ, rồi JS đi làm việc khác.",
    "examples": [
     "Hàng đợi (Queues): Khi Web APIs làm xong (vd: đếm xong 5 giây), nó không được phép vứt kết quả thẳng vào Call Stack đang bận rộn. Nó phải xếp hàng ở hàng đợi. Có 2 loại hàng đợi:\n\nMicrotask Queue (Hàng đợi VIP): Chứa các callback của Promise (.then, .catch), queueMicrotask.\n\nMacrotask Queue (Hàng đợi Thường - hay gọi là Task Queue): Chứa các callback của setTimeout, setInterval, sự kiện click.",
     "Event Loop (Bảo vệ gác cổng): Nó làm một vòng lặp vô tận với quy tắc vàng sau:\n\nNhìn xem Call Stack đã trống chưa? Nếu trống, đi tiếp.\n\nNhìn vào Microtask Queue (VIP). Nếu có ai xếp hàng, cho TẤT CẢ bọn họ vào Call Stack chạy cho đến khi hàng đợi VIP trống trơn.\n\nChỉ khi hàng đợi VIP đã hết sạch, nó mới nhìn sang Macrotask Queue (Thường), và lấy ĐÚNG 1 TÁC VỤ đầu tiên cho vào Call Stack. Xong lại quay về bước 1."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-33",
    "question": "Code kinh điển: Đoán thứ tự chạy",
    "answer": "console.log(\"1. Đồng bộ chạy trước\");\n\nsetTimeout(() => {\n  console.log(\"2. Macrotask (setTimeout)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3. Microtask (Promise 1)\");\n}).then(() => {\n  console.log(\"4. Microtask (Promise 2)\");\n});\n\nconsole.log(\"5. Đồng bộ kết thúc\");",
    "examples": [
     "Thứ tự thực thi:\n\nCode đồng bộ vào thẳng Call Stack chạy ngay: In ra 1 và 5.\n\nsetTimeout bị ném sang Web APIs, sau đó đẩy callback vào Macrotask Queue (Thường).\n\nPromise đẩy 2 cái .then vào Microtask Queue (VIP).\n\nCall stack rỗng. Event Loop ưu tiên mời VIP vào trước: In ra 3 rồi in tiếp 4.\n\nVIP sạch sẽ rồi. Event Loop mới gọi khách Thường: In ra 2.\n\nKết quả: 1 -> 5 -> 3 -> 4 -> 2. (Hãy ghi nhớ kỹ ví dụ này!)"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-34",
    "question": "Promise là gì? (Lời hứa)",
    "answer": "Bản chất: Giống như đi mua trà sữa. Bạn trả tiền, nhân viên đưa bạn cái hóa đơn có số thứ tự (Đây là Promise). Bạn cầm hóa đơn đứng chờ, trong lúc chờ bạn vẫn có thể lướt TikTok (Không bị đơ code).\n\nKhi có nước, nhân viên gọi tên bạn.",
    "examples": [
     "3 Trạng thái của Promise:\n\nPending (Đang chờ): Bạn đang đứng chờ nước (API đang gọi, chưa có kết quả).\n\nFulfilled (Hoàn thành): Có nước! Lời hứa thành công. Dữ liệu sẽ nhảy vào hàm .then().\n\nRejected (Thất bại): Hết trân châu! Lời hứa thất bại (bị lỗi). Lỗi sẽ nhảy vào hàm .catch()."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-35",
    "question": "Sự ra đời của Async/Await",
    "answer": "Dù có .then() và .catch(), nếu gọi API liên tiếp nhau, code vẫn sinh ra chuỗi lồng nhau nhìn khá rối. Từ ES8, JS cung cấp async/await.\n\nBản chất: Nó là \"lớp vỏ bọc\" (syntactic sugar) cho Promise. Nó giúp bạn viết code bất đồng bộ (chờ API) mà nhìn y hệt như code đồng bộ tuần tự từ trên xuống dưới.\n\nCách dùng: Hàm nào có xài await (chờ) thì bắt buộc trước chữ function phải có chữ async.\n\nXử lý lỗi: Vì không dùng .catch() nữa, ta phải dùng cặp try...catch.",
    "examples": [
     "// Thay vì viết:\nfunction layDuLieuCu() {\n  fetch(\"https://api.example.com/user\")\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.log(\"Lỗi:\", error));\n}\n// Ta viết theo chuẩn Async/Await hiện đại:\nasync function layDuLieuMoi() {\n  try {\n    // Luồng code sẽ \"tạm dừng\" ở chữ await này cho đến khi API tải xong\n    const response = await fetch(\"https://api.example.com/user\");\n    const data = await response.json();\n    console.log(data); \n  } catch (error) {\n    // Nếu có bất kỳ dòng await nào phía trên bị lỗi (Rejected), nó sẽ văng thẳng xuống đây\n    console.log(\"Lỗi:\", error);\n  }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-36",
    "question": "Cuộc đua của các Promise: all, allSettled, race, any",
    "answer": "Khi bạn có nhiều API cần gọi (Ví dụ: Tải thông tin User, tải Giỏ hàng, tải Gợi ý sản phẩm), thay vì chờ từng cái một, ta cho chúng chạy song song để tiết kiệm thời gian.\n\nPromise.all (Tất cả hoặc Không có gì): Chờ tất cả Promise chạy xong. Nếu TẤT CẢ thành công -> Trả về mảng kết quả. Nếu chỉ 1 cái thất bại -> Nó hủy ngay lập tức và ném lỗi (Reject) mà không thèm đợi những cái kia.\n\nPromise.allSettled (Bao dung): Chờ tất cả chạy xong, bất kể thành công hay thất bại. Trả về một mảng báo cáo chi tiết trạng thái của từng cái.\n\nPromise.race (Đua xe): Cái nào chạy xong ĐẦU TIÊN (bất kể thành công hay thất bại) thì lấy luôn kết quả của cái đó, bỏ qua đám còn lại. Dùng để làm tính năng Timeout (Hủy request nếu gọi API quá 5 giây).\n\nPromise.any (Tìm người sống sót): Cái nào THÀNH CÔNG đầu tiên thì lấy. Bỏ qua các cái bị lỗi. (Chỉ ném lỗi nếu tất cả đều thất bại).",
    "examples": [
     "const apiNhanh = new Promise(resolve => setTimeout(() => resolve(\"Nhanh\"), 1000));\nconst apiLoi = new Promise((_, reject) => setTimeout(() => reject(\"LỖI!\"), 2000));\nconst apiCham = new Promise(resolve => setTimeout(() => resolve(\"Chậm\"), 3000));\n\n// -- Dùng Promise.all: Sẽ văng lỗi ở giây thứ 2 do apiLoi bị reject\nPromise.all([apiNhanh, apiLoi, apiCham])\n  .then(res => console.log(res))\n  .catch(err => console.log(\"Promise.all thất bại vì:\", err));\n\n// -- Dùng Promise.race: apiNhanh về đích trước ở giây 1\nPromise.race([apiNhanh, apiLoi, apiCham])\n  .then(res => console.log(\"Người thắng cuộc là:\", res)); // In ra: Nhanh"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-37",
    "question": "Callback Hell là gì?",
    "answer": "Bản chất: Là tình trạng các hàm callback bị lồng vào nhau quá nhiều tầng (cái này chờ cái kia xong mới chạy tiếp). Code sẽ bị thụt lề liên tục tạo thành hình chữ V nằm ngang, được giới lập trình gọi là \"Kim tự tháp chết chóc\" (Pyramid of Doom).\n\nHậu quả: Code cực kỳ khó đọc, khó sửa lỗi và khó bảo trì.",
    "examples": [
     "// Viết bằng Callback kiểu cũ: Nhìn lác cả mắt!\nlayThongTinUser(1, function(user) {\n  layGioHang(user.id, function(gioHang) {\n    thanhToan(gioHang.tongTien, function(ketQua) {\n      guiEmailXacNhan(user.email, function() {\n        console.log(\"Xong hết rồi! Nhức đầu quá!\");\n      });\n    });\n  });\n});",
     "(Để giải quyết Callback Hell, người ta đã phát minh ra Promise và sau này là async/await để code trở lại dạng phẳng)."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-38",
    "question": "try/catch có bắt được lỗi async không?",
    "answer": "Câu trả lời là: Vừa KHÔNG, vừa CÓ. (Đây là câu hỏi gài bẫy).\n\nKHÔNG: Nếu đó là hàm async kiểu cũ (như setTimeout, setInterval). try/catch chạy đồng bộ nên nó chạy qua cái rẹt, không thể đứng chờ 2 giây để bắt lỗi của setTimeout được.\n\nCÓ: Nếu bạn dùng nó chung với từ khóa await cho các Promise.",
    "examples": [
     "try {\n  setTimeout(() => {\n    throw new Error(\"Lỗi nổ bùm!\"); \n  }, 1000);\n} catch (err) {\n  console.log(\"Đã bắt được lỗi\"); // Dòng này KHÔNG BAO GIỜ chạy! Lỗi vẫn văng ra ngoài.\n}",
     "try {\n  // Nhờ có chữ 'await', try/catch sẽ đứng kiên nhẫn chờ API chạy xong\n  await fetch(\"https://api-bi-loi.com\"); \n} catch (err) {\n  console.log(\"Bắt lỗi thành công!\"); // Chạy ngon lành!\n}"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-39",
    "question": "Web API là gì trong browser?",
    "answer": "Bản chất: JavaScript bản thân nó CHỈ là một ngôn ngữ tính toán (cộng trừ nhân chia, xử lý mảng/object...). Nó không hề biết về việc thao tác với màn hình (DOM), không biết hẹn giờ, không biết gọi mạng!",
    "examples": [
     "Tất cả những thứ như document.getElementById, setTimeout, fetch(), localStorage không thuộc về JS. Chúng là các \"đồ chơi\" (Web APIs) do Trình duyệt (Browser) viết sẵn bằng ngôn ngữ C++ và đưa cho JS mượn để sử dụng."
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-40",
    "question": "Error object trong JS gồm gì?",
    "answer": "Khi có lỗi xảy ra, JS tự động ném ra một Object báo lỗi. Object này có 3 thuộc tính quan trọng nhất:\n\nname: Tên loại lỗi (VD: ReferenceError, TypeError).\n\nmessage: Dòng tin nhắn mô tả chi tiết lỗi bằng tiếng người.\n\nstack: (Quan trọng nhất) Dấu vết ngăn xếp. Nó chỉ rõ lỗi bắt nguồn từ file nào, dòng số mấy, bị gọi bởi hàm nào.",
    "examples": [
     "try {\n  bienKhongTonTai;\n} catch (err) {\n  console.log(err.name);    // \"ReferenceError\"\n  console.log(err.message); // \"bienKhongTonTai is not defined\"\n  console.log(err.stack);   // Chi tiết file và số dòng bị lỗi\n}"
    ],
    "source": "excel"
   },
   {
    "id": "JavaScript (FE)-41",
    "question": "Error boundary trong React có bắt lỗi async không?",
    "answer": "KHÔNG. (Đây là một cái bẫy phỏng vấn cực hay).\nError Boundary (Ranh giới lỗi) trong React chỉ bắt được lỗi xảy ra trong quá trình Render UI và trong các Lifecycle/Hooks.",
    "examples": [
     "Nó KHÔNG THỂ bắt được lỗi xảy ra trong:\n\nBất đồng bộ (Các hàm setTimeout, async/await, Promise).\n\nTrình xử lý sự kiện (Ví dụ hàm click chuột onClick).\n\nĐể bắt lỗi trong API (async/await) hoặc trong onClick, bạn bắt buộc vẫn phải dùng try/catch truyền thống."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "Angular",
  "items": [
   {
    "id": "Angular-2",
    "question": "Angular là gì và tại sao bạn lại muốn học/sử dụng nó?",
    "answer": "Nêu định nghĩa Angular là một framework JavaScript (TypeScript) mã nguồn mở của Google để xây dựng các ứng dụng web một trang (SPA - Single Page Application). Giải thích các ưu điểm như cấu trúc rõ ràng, hỗ trợ TypeScript, mạnh mẽ cho ứng dụng lớn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-3",
    "question": "Sự khác biệt giữa Angular và AngularJS là gì?",
    "answer": "Nhấn mạnh rằng chúng là hai framework hoàn toàn khác nhau. AngularJS là phiên bản cũ, dựa trên JavaScript, trong khi Angular (phiên bản 2 trở lên) được viết lại hoàn toàn bằng TypeScript, hiệu suất tốt hơn, có cấu trúc module/component rõ ràng hơn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-4",
    "question": "Component trong Angular là gì? Nó bao gồm những phần nào?",
    "answer": "Component là khối xây dựng cơ bản của ứng dụng Angular, quản lý một phần giao diện người dùng. Mỗi component bao gồm: + Một Template (HTML) định nghĩa giao diện.\n+ Một Class (TypeScript) chứa logic và dữ liệu.\n+ Một Metadata (@Component decorator) định nghĩa các thuộc tính như selector, templateUrl, styleUrls.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-9",
    "question": "Data Binding trong Angular là gì? Kể tên các loại Data Binding bạn biết.",
    "answer": "Data binding là cách Angular liên kết dữ liệu giữa TypeScript class và template HTML. Có 3 loại chính:\n+ Interpolation ({{ }}): One-way binding từ component đến view.\n+ Property Binding ([property]=\"data\"): One-way binding từ component đến thuộc tính của DOM element.\n+ Event Binding ((event)=\"handler()\"): One-way binding từ view đến component (ví dụ: bắt sự kiện click).\n+ Two-way Data Binding ([(ngModel)]): Kết hợp property binding và event binding, thường dùng với form input.",
    "examples": [
     "Hiển thị dữ liệu từ component ra giao diện",
     "Đồng bộ 2 chiều giữa form input và biến trong component"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-10",
    "question": "Directive trong Angular là gì? Kể tên các loại Directive bạn biết.",
    "answer": "Directive là một class cho phép bạn thao tác với DOM. Có 3 loại chính:\n+ Component Directives: Các component mà chúng ta đã nói ở trên (thực chất cũng là một loại directive đặc biệt).\n+ Structural Directives: Thay đổi cấu trúc DOM (thêm/xóa phần tử). Ví dụ: *ngIf, *ngFor, *ngSwitch.\n+ Attribute Directives: Thay đổi giao diện hoặc hành vi của một phần tử. Ví dụ: [ngStyle], [ngClass].",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-11",
    "question": "Service và Dependency Injection (DI) trong Angular là gì và tại sao chúng lại quan trọng?",
    "answer": "Service: Là một class chứa logic nghiệp vụ, dữ liệu, hoặc các chức năng có thể tái sử dụng (ví dụ: gọi API, xử lý dữ liệu). Service không gắn với một view cụ thể nào.\nDependency Injection (DI): Là một design pattern mà Angular sử dụng để cung cấp các dependencies (như service) vào các component hoặc service khác. Nó giúp mã nguồn dễ kiểm thử, dễ bảo trì và tái sử dụng hơn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-12",
    "question": "Module trong Angular là gì? Mục đích của AppModule?",
    "answer": "Module (NgModule) là một cách để tổ chức ứng dụng Angular thành các khối chức năng có liên quan. AppModule là module gốc (root module) của ứng dụng, là nơi khởi tạo và bootstrapping toàn bộ ứng dụng.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-13",
    "question": "Routing trong Angular là gì? Tại sao cần dùng Routing trong ứng dụng SPA?",
    "answer": "Routing cho phép điều hướng giữa các \"view\" (component) khác nhau trong ứng dụng Single Page Application mà không cần tải lại toàn bộ trang. Nó mô phỏng hành vi của các trang web truyền thống nhưng hiệu quả hơn, mang lại trải nghiệm người dùng liền mạch.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-14",
    "question": "HttpClient trong Angular dùng để làm gì? Bạn đã từng sử dụng nó chưa?",
    "answer": "HttpClient là một module trong Angular dùng để thực hiện các yêu cầu HTTP (GET, POST, PUT, DELETE) tới các API backend. Nếu có, hãy nói bạn đã dùng để lấy dữ liệu từ một API giả lập hoặc API thật.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-15",
    "question": "Arrow function và function thông thường khác gì nhau trong anngular?",
    "answer": "import { Component } from '@angular/core';\n@Component({\n  selector: 'app-my-component',\n  template: `<button (click)=\"regularFunction()\">Regular Function</button>\n             <button (click)=\"arrowFunction()\">Arrow Function</button>`\n})\nexport class MyComponent {\n  name = 'Angular Component';\nRegular Function: Sử dụng từ khóa function.\n  // Regular Function\n  regularFunction() {\n    setTimeout(function() {\n      // 'this' ở đây sẽ không trỏ đến MyComponent\n      // console.log(this.name); // Sẽ báo lỗi hoặc ra undefined\n      console.log('Regular function timeout');\n    }, 1000);\n  }\nArrow Function: Sử dụng cú pháp =>.\n  // Arrow Function\n  arrowFunction() {\n    setTimeout(() => {\n      // 'this' ở đây sẽ trỏ đến MyComponent\n      console.log(this.name); // Output: Angular Component\n      console.log('Arrow function timeout');\n    }, 1000);\n  }\n}",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-16",
    "question": "Khái niệm Observer Pattern",
    "answer": "Observer Pattern (Mẫu thiết kế Observer) là một mẫu thiết kế hành vi (behavioral design pattern) trong lập trình hướng đối tượng. Nó định nghĩa mối quan hệ một-nhiều giữa các đối tượng, sao cho khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc vào nó sẽ được thông báo và tự động cập nhật.\n\nNói một cách đơn giản, bạn có:\n\nSubject (Chủ thể/Publisher): Đây là đối tượng mà trạng thái của nó có thể thay đổi. Nó duy trì một danh sách các \"người theo dõi\" (observers) và có khả năng thông báo cho tất cả những người theo dõi này khi có bất kỳ thay đổi nào xảy ra.\nObserver (Người quan sát/Subscriber): Đây là các đối tượng muốn biết khi nào trạng thái của Subject thay đổi. Chúng đăng ký với Subject và sẽ được thông báo (thông qua một phương thức cụ thể) mỗi khi Subject có cập nhật.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-17",
    "question": "Phân biệt sự khác nhau giữa var, let, const",
    "answer": "Luôn ưu tiên sử dụng const bất cứ khi nào có thể. Nếu bạn biết giá trị của biến sẽ không thay đổi sau khi khởi tạo, hãy dùng const. Điều này giúp code dễ đọc hơn và tránh các lỗi do vô tình gán lại giá trị.\nNếu bạn biết rằng giá trị của biến sẽ cần thay đổi (ví dụ: trong vòng lặp, bộ đếm), hãy sử dụng let.\nHạn chế hoặc tránh hoàn toàn việc sử dụng var trong code mới. Nó gây ra nhiều vấn đề về phạm vi và hoisting, làm cho code khó hiểu và dễ gặp lỗi hơn. let và const được thiết kế để khắc phục những vấn đề này.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-18",
    "question": "Trình bày được ý nghĩa và\n\nkhái niệm Dependency Injection trong angularclass MyService {\n  constructor(private httpClient: HttpClient) { // MyService nhận dependency từ bên ngoài\n    // HttpClient được tiêm vào đây\n  }\n}",
    "answer": "Dependency Injection (DI) là một mẫu thiết kế (design pattern) và là một cơ chế mà trong đó các \"dependencies\" (phụ thuộc) của một đối tượng được \"tiêm\" (injected) vào nó thay vì đối tượng đó tự tạo ra các dependencies đó.\n\nĐể dễ hình dung:\n\nDependency (Phụ thuộc): Là một đối tượng hoặc một dịch vụ mà một lớp (class) cần để thực hiện công việc của nó.\n\nVí dụ: Một UserService có thể cần một HttpClient để gọi API. Ở đây, HttpClient là một dependency của UserService.\nVí dụ: Một ProductComponent có thể cần một ProductService để lấy dữ liệu sản phẩm. ProductService là một dependency của ProductComponent.\nInjection (Tiêm): Là hành động cung cấp dependency cho một lớp. Thay vì lớp tự new (tạo mới) dependency đó bên trong nó, một cơ chế bên ngoài (Injector) sẽ cung cấp dependency đó cho lớp.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-19",
    "question": "RxJS là gì?",
    "answer": "RxJS (Reactive Extensions for JavaScript) là thư viện lập trình reactive dựa trên Observable. Nó cho phép xử lý các luồng dữ liệu bất đồng bộ như HTTP requests, user events, WebSocket, timers một cách dễ dàng thông qua các operators.",
    "examples": [
     "this.http.get('/api/users')\n  .pipe(\n    map(users => users.filter(u => u.active))\n  )\n  .subscribe(data => {\n    console.log(data);\n  });"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-20",
    "question": "Observable là gì?",
    "answer": "Observable là một nguồn phát dữ liệu theo thời gian. Nó có thể phát nhiều giá trị, xử lý bất đồng bộ và hỗ trợ hủy subscribe.",
    "examples": [
     "const obs = of(1, 2, 3);\n\nobs.subscribe(value => {\n  console.log(value);\n});"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-21",
    "question": "Observable khác Promise như thế nào?",
    "answer": "Promise                              Observable\nTrả về 1 giá trị                   Trả về nhiều giá trị\nKhông thể cancel             Có thể unsubscribe\nKhông có operators mạnh Có rất nhiều operators\nEager execution                Lazy execution",
    "examples": [
     "Em thường dùng Promise cho các tác vụ đơn giản. Với Angular em ưu tiên Observable vì Angular HttpClient và các event stream đều được xây dựng trên RxJS."
    ],
    "source": "excel"
   },
   {
    "id": "Angular-22",
    "question": "Angular HttpClient trả về gì?",
    "answer": "HttpClient trả về Observable.",
    "examples": [
     "Ví dụ:\n\nthis.http.get<User[]>('/api/users');",
     "Kiểu trả về:\n\nObservable<User[]>"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-23",
    "question": "Các RxJS Operators em đã dùng?",
    "answer": "map()\n.pipe(\n  map(users => users.filter(u => u.active))\n)\n\nDùng để biến đổi dữ liệu.",
    "examples": [
     "filter()\n.pipe(\n  filter(user => user.isActive)\n)\n\nLọc dữ liệu.",
     "tap()\n.pipe(\n  tap(data => console.log(data))\n)\n\nDùng để debug hoặc thực hiện side effects.",
     "switchMap()\nsearchTerm$\n.pipe(\n  switchMap(term =>\n    this.http.get(`/api/search?q=${term}`)\n  )\n)\n\nHủy request cũ và chỉ giữ request mới nhất."
    ],
    "source": "excel"
   },
   {
    "id": "Angular-24",
    "question": "Khi nào dùng switchMap?",
    "answer": "Trả lời:\n\nEm dùng switchMap trong chức năng tìm kiếm realtime.\n\nKhi người dùng gõ liên tục, request cũ sẽ bị hủy và chỉ giữ request mới nhất nhằm tránh gọi API dư thừa.",
    "examples": [
     "this.searchControl.valueChanges\n.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap(keyword =>\n    this.api.search(keyword)\n  )\n)\n.subscribe();"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-25",
    "question": "switchMap khác mergeMap thế nào?",
    "answer": "switchMap\nHủy request cũ\nChỉ giữ request mới nhất\nmergeMap\nChạy song song\nKhông hủy request",
    "examples": [
     "Ví dụ hỏi:\n\nSearch box dùng gì?\n\n=> switchMap\n\nUpload nhiều file cùng lúc?\n\n=> mergeMap"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-26",
    "question": "Subject là gì?",
    "answer": "Trả lời:\n\nSubject vừa là Observable vừa là Observer.",
    "examples": [
     "const subject = new Subject<string>();\n\nsubject.subscribe(data => console.log(data));\n\nsubject.next('Hello');"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-27",
    "question": "Em dùng RxJS cho State Management như thế nào?",
    "answer": "Trả lời:\n\nTrong một số dự án Angular em sử dụng BehaviorSubject trong service để quản lý state đơn giản thay vì dùng NgRx.\n\nVí dụ lưu thông tin user hiện tại hoặc trạng thái đăng nhập.",
    "examples": [
     "@Injectable()\nexport class UserService {\n\n  private userSubject =\n    new BehaviorSubject<User | null>(null);\n\n  user$ =\n    this.userSubject.asObservable();\n\n  setUser(user: User) {\n    this.userSubject.next(user);\n  }\n}"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-28",
    "question": "Cách tránh Memory Leak?",
    "answer": "import { takeUntilDestroyed }  angularr 16+\nfrom '@angular/core/rxjs-interop';\n\nthis.user$\n.pipe(\n  takeUntilDestroyed()\n)\n.subscribe();",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-29",
    "question": "Async Pipe là gì?",
    "answer": "Async Pipe tự động subscribe và unsubscribe Observable trong template.",
    "examples": [
     "<div>{{ user$ | async }}</div>\n\nƯu điểm:\n\nCode ngắn hơn\nTránh Memory Leak"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-30",
    "question": "Infinite Scroll là gì?",
    "answer": "Infinite Scroll là kỹ thuật tự động tải dữ liệu mới khi người dùng cuộn gần cuối danh sách thay vì phải bấm phân trang hoặc nút Load More.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-31",
    "question": "Em triển khai như thế nào?",
    "answer": "Em sử dụng Intersection Observer API hoặc lắng nghe sự kiện scroll.\n\nKhi phần tử sentinel ở cuối danh sách xuất hiện trong viewport, em gọi API lấy dữ liệu trang tiếp theo và append vào danh sách hiện tại.",
    "examples": [
     "observer = new IntersectionObserver(entries => {\n  if (entries[0].isIntersecting) {\n     this.loadMore();\n  }\n});"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-32",
    "question": "Tại sao không dùng pagination?",
    "answer": "Pagination phù hợp với dữ liệu cần tìm kiếm chính xác.\n\nInfinite Scroll phù hợp với news feed hoặc social feed vì giúp người dùng tiếp tục xem nội dung mà không bị gián đoạn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-33",
    "question": "Nếu API chậm?",
    "answer": "Em hiển thị skeleton loader trong lúc tải dữ liệu.\n\nĐồng thời khóa việc gọi API tiếp theo bằng biến isLoading để tránh gọi nhiều request cùng lúc.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-34",
    "question": "Skeleton Loader là gì?",
    "answer": "Skeleton Loader là placeholder mô phỏng giao diện thực tế trong lúc dữ liệu chưa tải xong.\n\nNó giúp cải thiện perceived performance, tức là cảm giác ứng dụng tải nhanh hơn đối với người dùng.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-35",
    "question": "Vì sao Skeleton tốt hơn Spinner?",
    "answer": "Spinner chỉ cho người dùng biết hệ thống đang tải.\n\nSkeleton cho người dùng biết nội dung sẽ xuất hiện ở đâu và có hình dạng như thế nào, giúp trải nghiệm tốt hơn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-36",
    "question": "WebSocket là gì?",
    "answer": "WebSocket là giao thức giao tiếp hai chiều giữa client và server thông qua một kết nối TCP duy nhất.\n\nSau khi kết nối được thiết lập, cả client và server đều có thể chủ động gửi dữ liệu cho nhau.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-37",
    "question": "WebSocket khác HTTP thế nào?",
    "answer": "| HTTP                        | WebSocket          |\n| --------------------------- | ------------------ |\n| Request → Response          | Full Duplex        |\n| Mỗi lần gửi tạo request mới | 1 kết nối duy nhất |\n| Không realtime              | Realtime           |\n| Polling                     | Push Event         |",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-38",
    "question": "Nếu gửi cùng lúc 1000 tin nhắn?",
    "answer": "Frontend chỉ hiển thị dữ liệu.\n\nViệc scale sẽ do backend xử lý thông qua Message Queue hoặc WebSocket Gateway.\n\nỞ phía frontend em sử dụng virtual scrolling nếu số lượng tin nhắn quá lớn.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-39",
    "question": "Làm sao hiển thị tin nhắn mới?",
    "answer": "Khi nhận sự kiện message từ WebSocket, em append message vào state và Angular tự render lại giao diện.\n\nsocket.onmessage = (event) => {\n   this.messages.push(JSON.parse(event.data));\n}",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-40",
    "question": "Reactive Forms là gì?",
    "answer": "Reactive Forms là cách xây dựng form dựa trên TypeScript code thay vì template.\n\nNó phù hợp với các form phức tạp, có validation động và dễ kiểm thử.",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-41",
    "question": "Reactive Forms khác Template Driven Forms?",
    "answer": "| Template              | Reactive            |\n| --------------------- | ------------------- |\n| Form nhỏ              | Form lớn            |\n| Validation trong HTML | Validation trong TS |\n| Khó test              | Dễ test             |\n| Ít linh hoạt          | Linh hoạt           |",
    "examples": [],
    "source": "excel"
   },
   {
    "id": "Angular-42",
    "question": "Tại sao em chọn Reactive Forms?",
    "answer": "Vì form có nhiều trường dữ liệu, validation phức tạp và phụ thuộc lẫn nhau nên Reactive Forms giúp dễ quản lý hơn.",
    "examples": [
     "this.form = this.fb.group({\n  email: [\n    '',\n    [Validators.required, Validators.email]\n  ],\n  password: [\n    '',\n    [Validators.required, Validators.minLength(8)]\n  ]\n});"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-43",
    "question": "Virtual Scrolling là gì?",
    "answer": "Virtual Scrolling là kỹ thuật \"đánh lừa\" trình duyệt: Nó chỉ render (vẽ ra) những tin nhắn đang thực sự hiển thị trên màn hình của người dùng, cộng thêm một vài tin nhắn dự phòng ở trên và dưới.",
    "examples": [
     "Cách hoạt động:\n\nMàn hình điện thoại của bạn chỉ hiển thị được khoảng 20 tin nhắn cùng lúc.\n\nThay vì tạo 10,000 thẻ <div>, Virtual Scrolling chỉ tạo khoảng 30 thẻ <div> trong bộ nhớ.\n\nKhi bạn cuộn tay xuống dưới, thay vì tạo thẻ mới, nó sẽ lấy cái thẻ <div> vừa bị khuất ở phía trên cùng, đẩy nó xuống dưới cùng, và thay thế nội dung (text) bên trong bằng dữ liệu của tin nhắn mới.\n\nNó tính toán tổng chiều cao của 10,000 tin nhắn để tạo ra một thanh cuộn (scrollbar) có độ dài y như thật, khiến bạn có cảm giác như tất cả dữ liệu đều đang ở đó.",
     "<div class=\"chat-container\">\n  <div class=\"message\" *ngFor=\"let msg of messages\">\n    {{ msg.text }}\n  </div>\n</div>\n\n<cdk-virtual-scroll-viewport itemSize=\"50\" class=\"chat-container\">\n  <div class=\"message\" *cdkVirtualFor=\"let msg of messages\">\n    {{ msg.text }}\n  </div>\n</cdk-virtual-scroll-viewport>"
    ],
    "source": "excel"
   },
   {
    "id": "Angular-44",
    "question": "đồng bộ và bất đồng bộ",
    "answer": "Đồng bộ (Synchronous) là các tác vụ thực hiện tuần tự, tác vụ sau phải chờ tác vụ trước hoàn thành. Bất đồng bộ (Asynchronous) là các tác vụ có thể được khởi tạo và tiếp tục thực hiện công việc khác mà không cần chờ kết quả ngay lập tức. Trong JavaScript, các thao tác như gọi API, đọc file, truy vấn database thường là bất đồng bộ và được xử lý thông qua Callback, Promise hoặc Async/Await để tránh làm treo luồng chính của ứng dụng.",
    "examples": [
     "Ví dụ thực tế\n\nNếu gọi API lấy danh sách người dùng mất 3 giây:\n\nĐồng bộ: ứng dụng phải đứng chờ 3 giây.\nBất đồng bộ: ứng dụng vẫn render giao diện, người dùng vẫn thao tác được, khi API trả về thì cập nhật dữ liệu lên màn hình.\n\nĐó chính là lý do Promise và Async/Await được sử dụng rất nhiều trong Angular, React, NodeJS và NestJS."
    ],
    "source": "excel"
   }
  ]
 },
 {
  "topic": "C#",
  "items": [
   {
    "id": "C#-2",
    "question": "middleware là gì?",
    "answer": "Pipelines và Middleware\nHãy xem lại middleware như một hệ thống lắp ráp các \"bộ lọc\" để xử lý request và response.\n\nKhi một request HTTP đến server, nó sẽ đi vào một pipeline và đi qua từng middleware theo thứ tự.Mỗi middleware có thể làm một trong hai việc:\n\nThực thi và chuyển tiếp: Gọi next.Invoke() để chuyển request đến middleware tiếp theo.\n\nNgắn mạch (short-circuit) pipeline: Không gọi next.Invoke(). Điều này xảy ra khi một middleware xử lý xong và không muốn các middleware tiếp theo thực thi. Ví dụ, một middleware xác thực có thể trả về lỗi 401 Unauthorized và ngăn request tiếp tục.\n\nVí dụ:",
    "examples": [
     "app.UseRouting(); // Middleware để định tuyến request\n\napp.UseAuthentication(); // Middleware xác thực người dùng\n\napp.UseAuthorization(); // Middleware kiểm tra quyền truy cập\n\napp.MapControllers(); // Middleware để ánh xạ request tới các controller.  Trong ví dụ này, một request sẽ đi qua Routing, sau đó là Authentication, rồi Authorization. Nếu một trong số chúng ngắn mạch pipeline (ví dụ: người dùng chưa đăng nhập), request sẽ không bao giờ tới được MapControllers."
    ],
    "source": "excel"
   },
   {
    "id": "C#-3",
    "question": "Phân biệt var, dynamic, object",
    "answer": "var: Kiểu được quyết định trước khi chương trình chạy (thời điểm biên dịch).var age = 30; // Trình biên dịch hiểu ngay: 'age' là int.\n// age = \"thirty\"; // Lỗi ngay lập tức, vì bạn đang cố gán string vào một biến int.",
    "examples": [
     "dynamic: Kiểu được quyết định trong khi chương trình đang chạy (thời điểm thực thi).dynamic thing = 30; // Trình biên dịch không biết 'thing' là gì.\n// Console.WriteLine(thing.ToUpper()); // Lỗi tại thời điểm chạy vì số 30 không có phương thức ToUpper().",
     "object là kiểu dữ liệu gốc (base type) của tất cả các kiểu dữ liệu khác trong .NET. Biến kiểu object có thể chứa bất kỳ giá trị nào. Tuy nhiên, để sử dụng giá trị đó (ngoài các phương thức chung của object như ToString(), Equals()...), bạn phải ép kiểu (casting) về kiểu dữ liệu cụ thể.object myObj = 10;\n// Console.WriteLine(myObj + 5); // Lỗi: Không thể thực hiện phép toán trên kiểu object\n\nint number = (int)myObj; // Phải ép kiểu tường minh\nConsole.WriteLine(number + 5); // Kết quả: 15"
    ],
    "source": "excel"
   },
   {
    "id": "C#-4",
    "question": "restfulapi là gì",
    "answer": "là một kiến trúc thiết kế API sử dụng giao thức HTTP để giao tiếp giữa các hệ thống máy tính. Nó tuân theo một bộ nguyên tắc và ràng buộc nhất định để tạo ra một hệ thống web hiệu quả, dễ mở rộng và bảo trì.",
    "examples": [],
    "source": "excel"
   }
  ]
 }
];
