// Kéo dài distractor cho các câu có margin >= 15 trong batch PayFlow/Vận hành.
module.exports = [
  // H2 test
  ["Vì H2 không hỗ trợ chạy song song nhiều test class cùng lúc",
   "Vì H2 không hỗ trợ chạy song song nhiều test class trong cùng một module Maven"],
  ["Vì license của H2 không cho phép dùng trong dự án thương mại",
   "Vì license của H2 không cho phép dùng cho dự án thương mại có thu phí người dùng"],
  ["Vì Flyway không thể chạy migration trên H2 ở chế độ embedded",
   "Vì Flyway không thể chạy migration trên H2 khi database ở chế độ embedded in-memory"],
  // Lease outbox
  ["Bảo đảm mỗi event chỉ được gửi lên Kafka đúng một lần duy nhất",
   "Bảo đảm mỗi event chỉ được gửi lên Kafka đúng một lần duy nhất trong mọi tình huống"],
  ["Cho phép nhiều instance publish song song cùng một row để tăng tốc",
   "Cho phép nhiều instance cùng publish song song một row để tăng thông lượng gửi event"],
  // Account + Ledger gộp
  ["Vì hai bounded context này thực chất chia sẻ chung một aggregate",
   "Vì hai bounded context này thực chất chia sẻ chung một aggregate và một vòng đời dữ liệu"],
  ["Vì Kafka chưa hỗ trợ đủ số partition cho hai service riêng biệt",
   "Vì Kafka chưa được cấp đủ số partition để phục vụ hai service riêng biệt cùng lúc"],
  // Ledger POSTED
  ["Release reservation ngay để giải phóng số dư đang bị giữ của khách",
   "Release reservation ngay lập tức để giải phóng phần số dư đang bị giữ của khách hàng"],
  ["Đánh dấu payment SUCCEEDED vì bút toán sổ cái đã được ghi xong",
   "Đánh dấu payment SUCCEEDED vì bút toán sổ cái đã được ghi xuống database thành công"],
  // Audit fields
  ["Toàn bộ request body để có thể tái hiện chính xác thao tác đã thực hiện",
   "Toàn bộ request body và header để có thể tái hiện chính xác thao tác đã được thực hiện"],
  // Refund PROCESSING
  ["SUCCEEDED lạc quan để trải nghiệm người dùng mượt mà hơn khi chờ đợi",
   "SUCCEEDED một cách lạc quan để trải nghiệm của người dùng mượt mà hơn trong lúc chờ đợi"],
];
