# Ôn tập theo CV · Java Backend

Mở index.html, chọn **Ôn tập theo CV** trong menu hoặc nút ở Trang chủ. Route: #/cv.

## Nội dung

45 chủ đề, 236 câu có lời giải: 60 câu lý thuyết, 48 câu áp dụng, 105 câu tình huống và 23 câu phỏng vấn. Năm chủ đề đầu là bản đồ công cụ: tổng quan, PayFlow, Exam backend, Exam frontend/triển khai và ZAMIGA. Mỗi công cụ nêu bản chất lý thuyết, vị trí áp dụng, luồng sử dụng, lý do chọn, giới hạn dễ nói nhầm và nơi đối chiếu; sau đó mới đến câu hỏi kiến thức/tình huống.

Bảy chặng học:

1. Công nghệ trong dự án: phân loại công cụ và học lý thuyết gắn trực tiếp với PayFlow, Exam và ZAMIGA.
2. Java Core, Collections, Java 21/concurrency, Spring, transaction và REST.
3. SQL/PostgreSQL, JPA/Hibernate, Flyway, SQL Server/MongoDB, Redis, JWT, Keycloak và bảo mật.
4. Elasticsearch/reindex, MinIO/R2, WebSocket/STOMP, Firebase và kinh nghiệm ZAMIGA/AI-assisted engineering.
5. PayFlow: bản đồ service, Saga, idempotency, Kafka, Outbox/Inbox, Account/Ledger/Refund, settlement/reconciliation/reporting/webhook. Exam: làm bài, durable submission job, chấm AI và STT.
6. JUnit/Mockito, Testcontainers/Postman, logging/audit/metrics, Docker, Nginx, CI/CD, Google Cloud và recovery.
7. JavaScript/TypeScript, React/TanStack Query, Angular/Ant Design/Tailwind và 5 vòng phỏng vấn thử.

## Cách học

- Chọn chương, đọc mục tiêu và luồng trước; tự trả lời câu hỏi rồi mới mở giải thích.
- Gõ từ khóa có hoặc không dấu để tìm xuyên chủ đề trong chặng đang chọn. Bộ lọc phạm vi cho phép quay lại chương hiện tại.
- Lọc **Tình huống**, **Chưa nắm vững**, **Cần ôn lại**, hoặc bốc một câu tự luyện.
- “Đã nắm” là tự đánh giá, không phải điểm kiểm tra. Bấm lại để bỏ; chọn “Cần ôn lại” sẽ thay trạng thái “Đã nắm”.
- Ghi chú theo chương lưu trên trình duyệt đang dùng, không đồng bộ máy khác. Xóa dữ liệu website có thể làm mất tiến độ; không ghi secret hay thông tin công ty nhạy cảm.
- Mục lục gập mặc định trên màn nhỏ. Trên desktop, danh sách chương cuộn riêng; bộ chọn chặng vẫn ở phía trên.

## Ranh giới nguồn và bằng chứng

Nguồn CV: C:/Users/Admin/Downloads/LE_MINH_TIEN_BackendDeveloper.pdf, đã đọc ở lượt trước. Snapshot đối chiếu source và tích hợp/kiểm thử giao diện ngày 2026-09-14.

- PayFlow: D:/payflow-payment-platform. CV ghi 7 service; topology full hiện tại có 9 Java deployable gồm Gateway. Cần xác nhận lại phiên bản ghi trong CV. Sandbox, chưa có tiền/payout ngân hàng thật.
- Exam backend: D:/be-exam-online/java-exam-online; frontend: D:/react-exam-online. Worker nộp bài dựa DB job/executor, không phải Kafka/Saga. Pipeline và deploy script có trong source; không coi việc đọc code là bằng chứng production đã chạy thành công.
- ZAMIGA, SQL Server/MongoDB/Angular: chỉ nhận phạm vi CV mô tả; phần ví dụ là mô hình học tập, không gán là kiến trúc công ty khi chưa có source.
- Các link tài liệu gốc phục vụ đào sâu. Đối chiếu version dependency trước khi dùng cấu hình/API.
- Không sửa PDF CV, source hai backend, dữ liệu production hoặc tiến độ các chuyên mục cũ.

## Bảo trì và kiểm thử

Dữ liệu: 13 file data/cv-study-*.js, được nạp theo thứ tự trong index.html. cv-study-data.js khai báo schema/helper; cv-study-tools.js là chặng công nghệ mở đầu; các file sau đăng ký chương bằng cvM, câu hỏi bằng cvQ. Giữ ID ổn định khi sửa nội dung để bảo toàn tiến độ.

Giao diện: js/cv-study.js, css/cv-study.css. Local storage key: ontap.cvStudy.v1. Không thay các key Lý thuyết/Quiz/Checklist cũ.

Chạy bằng Node:

    node tools/cv-study-audit.js
    node tools/content_audit.js
    node tools/cv-study-ui-smoke.js

UI smoke cần Playwright qua node_modules/NODE_PATH và Chrome/Edge hoặc Chromium của Playwright. Test khởi động HTTP server chỉ trên loopback với port ngẫu nhiên, dùng browser context riêng, đóng server/browser khi xong. Ảnh kiểm tra lưu ở tmp/cv-study-qa.

Kiểm tra gồm cấu trúc/ID/độ đầy đủ và 50 từ khóa công nghệ CV; render toàn bộ chương; search/filter; tiến độ/ghi chú sau reload; escape nội dung ghi chú; tự luyện; menu mobile; sáng/tối; bốn viewport 390/768/1440/1920; file://; trường hợp localStorage bị chặn và các route cũ.

Audit cấu trúc và UI không chứng minh mọi kiến thức không còn thiếu hoặc mọi backend đã chạy đúng. Bộ quiz cũ vẫn có cảnh báo chất lượng lời giải ngắn/distractor; không được sửa ngoài phạm vi công việc này.
