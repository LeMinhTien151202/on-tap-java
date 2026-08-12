// Kéo dài phương án nhiễu cho 3 câu có đáp án đúng dài hơn nhiễu >= 10 ký tự.
// Dùng: node tools/quiz_replace_option.js tools/patch/lengthenInfra.js
module.exports = [
  ["Không đặt gì cả vì từ Java 10 JVM tự đọc giới hạn cgroup và tự tính toán kích thước heap tối ưu cho từng workload",
   "Không đặt gì cả vì từ Java 10 trở đi JVM đã tự đọc giới hạn cgroup của container và tự tính kích thước heap tối ưu cho từng loại tải"],

  ["Trong một consumer group, vì group coordinator sắp xếp lại thứ tự message trước khi giao cho các consumer",
   "Trong phạm vi một consumer group, vì group coordinator sẽ sắp xếp lại thứ tự các message theo timestamp trước khi giao cho consumer"],

  ["session.timeout.ms — vì luồng xử lý bận nên không kịp gửi heartbeat tới group coordinator trong khoảng thời gian quy định",
   "session.timeout.ms — vì luồng đang bận xử lý một batch lớn nên không kịp gửi heartbeat tới group coordinator trong khoảng thời gian quy định"]
];
