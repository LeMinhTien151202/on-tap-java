// Kéo dài phương án SAI ở những câu mà đáp án đúng dài vượt trội (dễ đoán theo độ dài).
// Dùng: node tools/quiz_replace_option.js tools/patch/lengthenDistractors.js
module.exports = [
["Nó chạy SELECT ngay như findById nhưng trả thẳng entity thay vì Optional, và trả null khi id không tồn tại",
 "Nó chạy SELECT ngay lập tức giống hệt findById nhưng trả thẳng entity thay vì Optional, và trả về null thay vì ném exception khi id không tồn tại"],

["persist dùng cho entity mới còn merge dùng cho entity cũ, ngoài ra cả hai đều đưa chính đối tượng truyền vào thành managed",
 "persist dùng cho entity mới còn merge dùng cho entity đã tồn tại, ngoài ra cả hai đều đưa CHÍNH đối tượng bạn truyền vào thành managed rồi ghi xuống DB khi flush"],

["Vì record không hỗ trợ annotation nên không thể đặt @Entity, @Id hay @Column lên các thành phần của nó",
 "Vì record không hỗ trợ annotation ở mức thành phần nên không thể đặt @Entity, @Id, @Column hay @GeneratedValue lên bất kỳ trường dữ liệu nào của nó"],

["Vì trình biên dịch không có cách nào xác định kiểu thật của biến khi nó được thay đổi nhiều lần trong cùng một phạm vi",
 "Vì trình biên dịch không có cách nào suy ra kiểu thật của biến khi nó bị gán lại nhiều lần trong cùng một phạm vi khối lệnh có chứa biểu thức lambda"],

["Nhiều luồng ảo bị gắn cùng vào một luồng mang duy nhất khiến chúng phải chờ nhau theo thứ tự tạo ra",
 "Nhiều luồng ảo bị gắn cùng vào một luồng mang duy nhất nên chúng phải xếp hàng chờ nhau theo đúng thứ tự được tạo ra ban đầu"],

["Vẫn pool như luồng thường nhưng đặt kích thước lớn hơn nhiều, khoảng vài nghìn luồng cho mỗi ứng dụng",
 "Vẫn pool như luồng nền tảng nhưng đặt kích thước lớn hơn nhiều, khoảng vài nghìn luồng cho mỗi ứng dụng chạy trên một máy chủ"],

["Vì nhánh default gây lỗi biên dịch khi switch trên một kiểu sealed đã liệt kê đủ mọi lớp con của nó",
 "Vì nhánh default sẽ gây lỗi biên dịch khi switch chạy trên một kiểu sealed đã liệt kê đầy đủ mọi lớp con được phép của nó"],

["setFetchSize(1000) là đủ, driver MySQL sẽ tự chia kết quả thành từng lô một nghìn dòng để nạp dần vào bộ nhớ",
 "setFetchSize(1000) là đủ, driver MySQL sẽ tự chia kết quả thành từng lô đúng một nghìn dòng rồi nạp dần từng lô vào bộ nhớ client"],

["BÊN TRONG cùng transaction, dùng vòng lặp while bắt exception rồi nạp lại entity và ghi lại giá trị mới",
 "BÊN TRONG cùng transaction, dùng một vòng lặp while bắt exception rồi nạp lại entity và ghi lại giá trị mới nhất xuống cơ sở dữ liệu"],

["Không có rủi ro; đây là cách viết chuẩn được khuyến nghị vì ngắn gọn và nhanh hơn Integer.compare",
 "Không có rủi ro; đây vẫn là cách viết chuẩn được khuyến nghị vì nó ngắn gọn và nhanh hơn hẳn Integer.compare trong vòng lặp sắp xếp"],

["Truyền theo giá trị với kiểu nguyên thủy và theo THAM CHIẾU với object, nên gán lại object bên trong sẽ đổi cả bên ngoài",
 "Truyền theo giá trị với kiểu nguyên thủy và theo THAM CHIẾU với object, nên việc gán lại object bên trong phương thức sẽ làm đổi cả biến ở nơi gọi bên ngoài"],

["ROLLBACK transaction, vì mọi exception thoát ra khỏi phương thức đều được coi là dấu hiệu thất bại",
 "ROLLBACK transaction, vì mọi exception thoát ra khỏi phương thức đều được Spring coi là dấu hiệu thất bại của nghiệp vụ"],

["Projection mở tối ưu SQL tốt hơn vì SpEL được dịch thẳng thành biểu thức SQL, còn projection đóng luôn chọn hết cột",
 "Projection mở tối ưu SQL tốt hơn vì SpEL được dịch thẳng thành biểu thức SQL, còn projection đóng thì luôn phải chọn hết mọi cột của bảng"]
];
