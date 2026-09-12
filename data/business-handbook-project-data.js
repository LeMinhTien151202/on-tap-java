// Bộ ôn tập bám trực tiếp repository D:\traffic-sec\so-tay-kinh-doanh.
// Nội dung tách rõ code đã có, kiểm chứng tĩnh/local và tích hợp runtime chưa được xác minh.
(function () {
  "use strict";

  function qa(question, summary, answer) {
    return { question: question, summary: summary, answer: answer };
  }

  var theoryTopics = [
    {
      topic: "Sổ Tay Kinh Doanh — tổng quan & luồng dự án",
      items: [
        qa("Giới thiệu Sổ Tay Kinh Doanh trong 60–90 giây như thế nào?", "Nói bài toán người kinh doanh nhỏ trước, rồi nối các luồng thuế, sổ thu chi và thanh toán.", "Sổ Tay Kinh Doanh là ứng dụng full-stack Next.js 16/React 19 hỗ trợ hộ và cá nhân kinh doanh tra cứu kiến thức, tính thuế theo hồ sơ pháp lý có phiên bản, quản lý sổ thu chi, kỳ thuế, nhắc hạn và mua gói sử dụng. PostgreSQL/Supabase là nguồn dữ liệu; Drizzle quản lý schema; Supabase Auth bảo vệ tài khoản. Điểm nổi bật là phễu công cụ SEO công khai dẫn vào lead/onboarding, tax engine thuần tách khỏi framework, pagination ổn định cho ledger và luồng VietQR–webhook–subscription có idempotency, transaction cùng cơ chế review."),
        qa("Ba luồng end-to-end quan trọng nhất của dự án là gì?", "Luồng công khai, luồng quản trị kinh doanh và luồng nâng cấp gói tạo nên bức tranh sản phẩm.", "Luồng 1: người dùng vào công cụ SEO, nhập số liệu, tax engine tính kết quả kèm căn cứ/version rồi có thể đăng ký nhắc hạn. Luồng 2: đăng nhập bằng Supabase, onboarding tạo business và kỳ thuế, sau đó ghi thu/chi, tổng hợp kỳ và lưu tax estimate snapshot. Luồng 3: chọn plan, server tạo payment theo giá trong DB, hiển thị VietQR/memo, webhook hoặc admin xác nhận, rồi transaction cập nhật payment và subscription. Khi kể cần chỉ rõ auth, ownership, validation và nguồn sự thật ở từng bước."),
        qa("Stack chính đang dùng và vai trò của từng phần?", "Không liệt kê công nghệ rời rạc; gắn mỗi công nghệ với trách nhiệm.", "Next.js App Router cung cấp Server Component, Route Handler, Server Action và middleware session; React 19 tạo UI; TypeScript/Zod giữ contract; React Hook Form xử lý form; Tailwind 4 cùng Base UI/shadcn tạo giao diện. Supabase cung cấp Auth và PostgreSQL; Drizzle định nghĩa schema/query/migration. Vitest chạy unit test, Vercel Analytics/Speed Insights quan sát frontend; Resend, Web Push, ICS và VietQR/SePay là các adapter tích hợp."),
        qa("Đâu là source of truth trong dự án?", "PostgreSQL giữ nghiệp vụ; QR, email, cache giao diện và provider chỉ là biểu diễn hoặc kênh truyền.", "Plan/price, payment, subscription, business, ledger entry, tax period/estimate, reminder và lead phải lấy từ database. Client không được quyết định số tiền thanh toán hoặc quyền sở hữu. QR chỉ mã hóa hướng dẫn chuyển khoản; webhook chỉ là input phải xác thực và xử lý idempotent; UI polling chỉ đọc trạng thái. Tax result được lưu kèm engine/legal version để lịch sử không phụ thuộc rule hiện tại."),
        qa("Điểm mạnh nào phù hợp nhất để đưa lên CV Java Backend dù dự án viết Next.js?", "Nhấn vào tư duy backend có thể chuyển sang Spring, không giả vờ dự án dùng Java.", "Có thể nêu: thiết kế checkout lấy giá server-side và chống lặp bằng idempotency key; webhook xác thực API key constant-time, đối chiếu memo/số tiền và settle subscription trong transaction; thiết kế tax engine thuần, có version/căn cứ pháp lý; bảo vệ IDOR bằng ownership check và 404 chung; keyset pagination ba khóa cho ledger; onboarding concurrency-safe; schema có unique/check/partial index. Khi phỏng vấn nói rõ implementation hiện tại là TypeScript/Next.js và mô tả cách ánh xạ sang Spring Service, @Transactional, Bean Validation và PostgreSQL."),
        qa("Những phần nào đã được kiểm chứng tại lần rà soát 2026-09-12?", "Evidence local gồm test, lint, type-check và production build; không đồng nghĩa tích hợp bên ngoài đã chạy.", "Đã chạy thành công 13 file test với 108/108 test, lint, TypeScript tsc --noEmit và Next production build; build tạo 64 trang tĩnh. Đây là VERIFIED_LOCAL cho code/build. Chưa có bằng chứng E2E với Supabase database thật, SePay webhook thật, Resend hoặc Web Push thật; vì vậy chỉ gọi các phần đó là IMPLEMENTED_NOT_RUNTIME_VERIFIED."),
        qa("Phần nào đang mock, kế hoạch hoặc chưa nên ghi là hoàn thiện?", "Giữ ranh giới bằng chứng giúp CV đáng tin hơn.", "AI assistant, OCR và báo cáo năm còn là mock/kế hoạch. Chưa có recurring billing tự động, refund tự động, proration, đa tiền tệ, hóa đơn VAT cho subscription hay payout. Rate limit hiện in-memory theo instance, chưa phân tán. Contract payload SePay còn cần đối chiếu tài liệu/provider sandbox thật. Không ghi các tích hợp này là production-ready."),
        qa("Nên học dự án theo trình tự nào?", "Đi từ sản phẩm và dữ liệu đến luồng tiền, rồi mới sang deploy và sự cố.", "Trình tự hiệu quả: pitch và user flow → Next.js boundary → auth/ownership → schema/transaction → ledger/tax engine → lead/reminder → plan/checkout → webhook/state machine/settlement → security/testing → deploy/observability → limitation và incident. Với mỗi phần, tự trả lời: ai sở hữu dữ liệu, invariant nào phải giữ, lỗi/race nào xảy ra và test nào chứng minh.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — CV, sản phẩm & chức năng nổi bật",
      items: [
        qa("Một bullet CV tốt cho dự án này có cấu trúc thế nào?", "Dùng động từ + phạm vi + cơ chế + giá trị hoặc evidence.", "Ví dụ: “Xây dựng luồng nâng cấp gói qua VietQR, sinh mã nội dung duy nhất, xác thực webhook và cập nhật payment/subscription atomically bằng PostgreSQL transaction”; “Tách tax engine TypeScript thuần khỏi Next.js, version hóa rule/căn cứ pháp lý và lưu snapshot để tái hiện kết quả”; “Thiết kế ledger cursor theo entryDate–createdAt–id, tránh bỏ sót/trùng bản ghi khi có giao dịch backdate”. Không đưa số người dùng/doanh thu nếu không có số liệu."),
        qa("Chức năng nào vừa hữu ích cho người dùng vừa dễ trình bày khi phỏng vấn?", "Ưu tiên những chức năng có luồng và quyết định kỹ thuật rõ.", "Bộ công cụ tính thuế miễn phí giúp người chưa đăng nhập nhận giá trị ngay; onboarding tự tạo hồ sơ/kỳ thuế; sổ thu chi liên kết kỳ và tính tổng; nhắc hạn qua email, push và lịch ICS; công cụ so sánh phương pháp thuế; checkout QR có copy, đếm ngược và tự cập nhật; admin review giao dịch bất thường. Mỗi chức năng đều có thể kể bằng input–validation–persistence–output–failure."),
        qa("Phễu SEO → công cụ → lead hoạt động theo tư duy nào?", "Trang công khai giải quyết nhu cầu tìm kiếm trước khi yêu cầu đăng ký.", "Các trang/công cụ nhắm câu hỏi cụ thể như tính thuế hộ kinh doanh, freelancer, cho thuê, hóa đơn điện tử. Kết quả hiển thị giải thích/căn cứ, sau đó mới mời để lại Zalo/email và consent nhận nhắc hạn. Backend chuẩn hóa contact, lưu UTM, snapshot phép tính và version để biết lead đến từ đâu và đã nhìn thấy kết quả nào. Đây là product-led acquisition chứ không chỉ landing page."),
        qa("Vì sao calculator public vẫn cần backend discipline?", "Công cụ miễn phí vẫn có thể tạo lead, quyết định pháp lý và bề mặt tấn công.", "Phải validate input/range, quy đổi tiền bằng integer VND, dùng đúng legal profile/version, không tin hidden field, kiểm consent, chống spam/rate abuse và không log PII tùy tiện. Nếu lưu snapshot phải phân biệt dữ liệu tính toán với kết luận tư vấn pháp lý. UI cần nói rõ giả định và nguồn cập nhật."),
        qa("Cách trình bày giá trị của tax engine mà không nói quá?", "Engine hỗ trợ ước tính có version, không thay thế tư vấn thuế.", "Nói rằng engine gom rule thành hàm thuần có test, tách legal profile/source/version khỏi UI và lưu version cùng estimate để audit. Không khẳng định “đảm bảo đúng pháp luật” vì quy định thay đổi và tài liệu dự án cũng yêu cầu chuyên gia thuế duyệt trước phát hành công khai."),
        qa("Dự án này khác PayFlow ở điểm cốt lõi nào?", "Một bên là sản phẩm quản lý kinh doanh full-stack; một bên là sandbox hệ thống thanh toán phân tán.", "Sổ Tay Kinh Doanh là modular full-stack trên một PostgreSQL, tối ưu time-to-market, SEO và trải nghiệm người dùng; payment là một module subscription bằng chuyển khoản. PayFlow tập trung microservice, Kafka, Saga, ledger kép và reliability của nền tảng thanh toán. Không gán kiến trúc/service của PayFlow sang dự án này."),
        qa("Có thể chuyển các ý tưởng backend sang Java/Spring như thế nào?", "Ánh xạ theo trách nhiệm, không dịch cú pháp từng dòng.", "Next Route Handler tương đương REST Controller; service module tương đương @Service; Drizzle transaction tương đương @Transactional; Zod tương đương Jakarta Validation cộng domain validation; middleware/session tương đương SecurityFilterChain; partial unique/check index vẫn ở PostgreSQL/Flyway; cron/reminder thành @Scheduled hoặc job queue. Pure tax engine có thể thành module Java thuần không phụ thuộc Spring."),
        qa("Khi được hỏi “em trực tiếp làm gì?”, nên trả lời ra sao?", "Chỉ nhận phần có bằng chứng và nêu trade-off thật.", "Chọn 2–3 lát cắt sâu: tax engine/versioning, ledger pagination/ownership, hoặc payment checkout/webhook/settlement. Nêu file/luồng đã đọc, invariant đã giữ, test hiện có và một hạn chế sẽ cải tiến. Tránh nói chung “em xây toàn bộ hệ thống production” khi tích hợp runtime chưa được xác minh.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — Next.js architecture & API",
      items: [
        qa("Server Component, Client Component, Server Action và Route Handler khác nhau thế nào trong dự án?", "Chọn boundary theo dữ liệu, tương tác và đối tượng gọi.", "Server Component đọc dữ liệu/session ở server và giảm JavaScript client. Client Component dùng khi cần state, event, clipboard, countdown hoặc polling. Server Action thuận tiện cho form/action nội bộ có revalidation. Route Handler tạo HTTP contract cho polling, webhook, cron hay client ngoài. Business rule vẫn nên nằm trong service/lib để không bị khóa vào UI boundary."),
        qa("Vì sao không đặt nghiệp vụ trực tiếp trong page hoặc route?", "Controller mỏng giúp một rule được tái dùng và test ngoài framework.", "Route chỉ parse/auth/validate, gọi service và ánh xạ response/error. Checkout price lookup, ownership, tax calculation hay settle subscription nằm ở module nghiệp vụ. Nếu rule rải trong page/action/webhook, các đường gọi dễ xử lý khác nhau và unit test khó cô lập."),
        qa("Zod bảo vệ được gì và không bảo vệ được gì?", "Schema validation kiểm hình dạng; authorization và invariant vẫn thuộc service/database.", "Zod kiểm kiểu, enum, UUID, range và normalize payload trước khi dùng. Nó không chứng minh businessId thuộc user, plan đang active, payment chưa settle, amount khớp hay subscription không chồng lấn. Những điều này cần query có scope, state machine, transaction và constraint."),
        qa("Unified API response/error có lợi gì?", "Client và test xử lý thành công/thất bại nhất quán.", "Một contract ổn định cho data/error/code/correlation giúp frontend không đoán shape của từng endpoint. Validation error nên chỉ rõ field an toàn; auth/ownership không rò tồn tại tài nguyên; infrastructure error không trả stack/secret. OpenAPI/Swagger giúp tài liệu hóa route nhưng không thay contract test."),
        qa("Vì sao dự án có cả Server Action và API route cho checkout?", "Chúng phục vụ hai entry point nhưng phải dùng chung service.", "Giao diện nội bộ có thể gọi Server Action để tạo payment và redirect; API cho client/polling/webhook cần HTTP semantics. Cả hai phải lấy plan price ở server, dùng idempotency và cùng hàm createPayment để tránh hai implementation lệch nhau."),
        qa("Middleware auth làm gì và giới hạn của nó?", "Middleware refresh/protect session ở edge, nhưng service vẫn phải kiểm user và ownership.", "Middleware giúp đồng bộ cookie Supabase và redirect route bảo vệ. Nó không thay thế authorization trong Route Handler/Server Action vì request có thể đi đường khác hoặc tài nguyên thuộc user khác. Helper session dùng cache theo request để tránh gọi getUser lặp."),
        qa("Cảnh báo build về middleware → proxy nói lên điều gì?", "Build vẫn pass nhưng convention Next.js đã deprecated và cần migration có kế hoạch.", "Không phải lỗi runtime hiện tại; đây là technical debt theo phiên bản Next. Cần đọc migration guide đúng version, chuyển convention, chạy auth/redirect tests và production build. Khi phỏng vấn, đây là ví dụ quản lý framework upgrade thay vì sửa bừa theo warning."),
        qa("Canonical redirect và security headers đóng vai trò gì?", "Chúng hỗ trợ SEO, giảm nội dung trùng và tăng phòng thủ trình duyệt.", "Canonical 308 thống nhất host/URL; CSP hạn chế nguồn script/resource; X-Frame-Options DENY chống clickjacking; nosniff ngăn MIME sniffing; referrer/permissions policy giảm rò thông tin và quyền trình duyệt. Header không thay input validation, output escaping và authorization.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — Auth, onboarding & ownership",
      items: [
        qa("Luồng đăng nhập dùng Supabase SSR cần chú ý gì?", "Session nằm trong cookie server-side và phải được refresh đúng boundary.", "Người dùng đăng nhập magic link hoặc Google; callback/session helper lấy user tin cậy từ Supabase. Middleware cập nhật cookie; Server Component/Route Handler đọc user phía server. API còn có thể nhận bearer token theo contract. Không tin userId gửi từ client và không dùng localStorage token như nguồn quyền."),
        qa("Onboarding concurrency-safe được thiết kế thế nào?", "Claim trạng thái và tạo dữ liệu mặc định trong transaction để hai request không nhân đôi.", "Transaction cập nhật profile từ onboardingDone=false sang trạng thái đã xử lý theo điều kiện; chỉ request thắng mới tạo business và bốn kỳ thuế. Request song song còn lại đọc kết quả hoặc không lặp side effect. Unique constraint vẫn nên là safety net. Đây là idempotency theo business state, không chỉ debounce nút."),
        qa("IDOR được ngăn trong business/ledger/payment thế nào?", "Mọi lookup phải kèm owner, lỗi trả 404 chung.", "Không lấy tài nguyên bằng id rồi mới tin client. Query/service kiểm session user và business/payment thuộc user; tài nguyên không tồn tại hoặc không thuộc quyền đều trả 404 để không lộ ID hợp lệ. RLS trong Supabase là lớp defense in depth, nhưng service-level ownership vẫn cần cho service role và logic rõ."),
        qa("Authentication và authorization khác nhau ở ví dụ admin payment?", "Có user hợp lệ chưa đủ; phải thuộc danh sách admin và action hợp lệ.", "Supabase xác minh danh tính. Admin route/action kiểm email trong ADMIN_EMAILS phía server rồi mới list/settle. Client ẩn nút không phải authorization. Cần audit ai duyệt, payment nào, lúc nào và lý do; email allowlist phù hợp MVP nhưng về lâu dài nên dùng role/claim quản trị được quản lý."),
        qa("Tại sao lỗi ownership nên trả 404 thay vì 403?", "Ẩn sự tồn tại của resource khỏi người không sở hữu.", "Nếu ID của payment/business có thật mà trả 403, attacker có oracle dò UUID hoặc trạng thái. Một 404 chung cho not-found/not-owned giảm rò dữ liệu. Log nội bộ vẫn phân biệt nguyên nhân bằng userId/correlation an toàn."),
        qa("RLS và service authorization có trùng nhau không?", "Hai lớp bổ sung nhau ở các trust boundary khác nhau.", "RLS bảo vệ tại PostgreSQL khi truy cập bằng user context; service authorization diễn đạt nghiệp vụ và bảo vệ cả khi dùng service role/bypass RLS. Chỉ RLS có thể khiến rule khó quan sát; chỉ service check dễ bị query mới quên scope. Defense in depth dùng cả hai và test policy."),
        qa("Những dữ liệu auth nào không nên log?", "Token, cookie, magic link, OAuth code và PII không cần thiết.", "Log route, outcome, user identifier đã giảm nhạy cảm, correlationId và error code; không log Authorization, Set-Cookie, full email/contact, Supabase secret hay callback URL chứa token. Production incident cần traceability nhưng không biến log thành nguồn rò credential."),
        qa("Nếu một user sửa businessId trong request ledger thì sao?", "Backend phải query business theo cả id và authenticated user trước mutation.", "Zod chỉ biết UUID hợp lệ. Service ownership check phải thất bại 404 trước insert/update. Foreign key đảm bảo business tồn tại nhưng không đảm bảo nó thuộc user; vì vậy owner predicate hoặc RLS là bắt buộc.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — PostgreSQL, Drizzle & ledger",
      items: [
        qa("Vì sao tiền được lưu bằng integer VND?", "VND không cần phần thập phân và integer tránh sai số floating point.", "Amount, revenue, expense, tax và payment dùng số nguyên đồng. Không dùng JavaScript Number cho tổng vượt miền an toàn; tại boundary cần kiểm range hoặc dùng bigint/decimal strategy. Trong Java có thể dùng long kèm overflow guard hoặc BigDecimal theo currency scale."),
        qa("Check, unique và partial index bảo vệ những invariant nào?", "Database là lớp cuối khi có request cạnh tranh.", "Check giữ amount/currency/status hợp lệ; unique idempotencyKey và memoCode chống trùng; unique (provider, providerRef) khi providerRef khác null chống cùng giao dịch ngân hàng; partial unique chỉ cho một subscription active trên mỗi user. Application cho thông báo đẹp, constraint chống race giữa nhiều process."),
        qa("Ledger entry có những rule cốt lõi nào?", "Thu/chi phải thuộc business của user, amount dương, category hợp lệ và liên kết kỳ đúng.", "Service xác thực ownership, type/category, ngày, integer VND và tax period liên quan; insert/update/delete theo scope. Soft delete giữ lịch sử thay vì xóa vật lý. Khi tổng hợp phải thống nhất có loại deleted hay không và date boundary theo timezone."),
        qa("Tại sao pagination dùng cursor (entryDate, createdAt, id)?", "Ba khóa tạo total order ổn định kể cả backdate và timestamp trùng.", "Danh sách sort giảm dần theo ngày nghiệp vụ, thời điểm tạo và UUID. Cursor tiếp theo dùng so sánh tuple tương ứng, tránh OFFSET bị trượt khi có insert/xóa giữa hai lần tải. Chỉ entryDate chưa đủ vì nhiều bản ghi cùng ngày; thêm id làm tie-breaker xác định."),
        qa("OFFSET pagination có thể sai ra sao với sổ thu chi?", "Insert backdated hoặc bản ghi mới làm vị trí các hàng dịch chuyển.", "Client tải trang 1, sau đó có entry chen vào trước offset; trang 2 OFFSET có thể lặp một hàng hoặc bỏ một hàng. Keyset tiếp tục sau bản ghi cuối theo order key nên ổn định hơn và index-friendly, đổi lại khó nhảy thẳng tới trang N."),
        qa("Soft delete có trade-off gì?", "Giữ audit/recovery nhưng mọi query và unique rule phải hiểu trạng thái deleted.", "Delete chỉ đặt deletedAt giúp khôi phục và điều tra. Query tổng hợp, pagination, limit gói và tax estimate phải lọc nhất quán. Nếu unique key cần tái sử dụng sau xóa, thiết kế partial index phù hợp; không mặc định mọi bảng đều nên soft delete."),
        qa("Transaction nên bao quanh những bước nào?", "Những thay đổi phải cùng đúng hoặc cùng rollback mới ở chung transaction.", "Onboarding profile+business+periods, payment settle+subscription, hoặc tax estimate+metadata cần atomicity. Gọi email/provider network không nên nằm trong transaction dài. Nếu cần đảm bảo phát thông báo sau commit, dùng durable job/outbox thay vì giữ lock chờ HTTP."),
        qa("Drizzle migration và schema code cần quản lý thế nào?", "Migration là lịch sử forward-only; schema hiện tại là model code.", "Không sửa migration đã chạy ở môi trường chia sẻ; tạo migration mới, review SQL/index/default/backfill, thử trên dữ liệu tương tự production và có rollback/roll-forward plan. ORM không thay việc hiểu execution plan, constraint và lock."),
        qa("Plan limit nên được kiểm tra ở đâu?", "UI hiển thị tiện ích, service/database mới thực thi thật.", "Người dùng có thể bỏ qua UI và gọi API. Service đọc active subscription/plan limit rồi kiểm trước mutation; cạnh tranh có thể cần transaction hoặc counter/constraint để không vượt giới hạn. Cần quyết định hành vi khi subscription vừa hết hạn và tránh cache entitlement quá lâu."),
        qa("Khi tổng ledger chậm, tối ưu theo trình tự nào?", "Đo query trước khi thêm cache.", "Lấy EXPLAIN ANALYZE, kiểm predicate business/date/deleted, index theo access pattern, số row và N+1. Có thể dùng aggregate/query SQL, materialized summary hoặc cache sau khi xác định freshness/invalidation. Không denormalize trước khi có evidence.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — tax engine & version pháp lý",
      items: [
        qa("Tax engine được tách khỏi Next.js để làm gì?", "Luật tính là hàm thuần, không phụ thuộc request, React hay database.", "Input đã chuẩn hóa đi vào engine và trả breakdown/result deterministic. Module không import Next/React nên unit test nhanh, có thể dùng từ công cụ public, tax estimate và batch. Adapter bên ngoài chịu trách nhiệm auth, load profile, persistence và presentation."),
        qa("Legal profile, engine version và source khác nhau thế nào?", "Profile là tham số/quy tắc pháp lý; engine là thuật toán; source giải thích căn cứ.", "Một kết quả cần biết logic code phiên bản nào chạy, bộ rule hiệu lực nào được chọn và căn cứ/tài liệu nào được hiển thị. Tách ba khái niệm cho phép thay nguồn hoặc rule mà không ngụy tạo lịch sử. Estimate lưu version để biết kết quả cũ được tính theo gì."),
        qa("Luồng từ ledger đến tax estimate diễn ra thế nào?", "Tổng hợp dữ liệu đúng kỳ trước, rồi tính và lưu snapshot có version.", "Service xác minh business/period thuộc user, aggregate doanh thu/chi phí hợp lệ trong date range, dựng input chuẩn, chọn legal profile, gọi engine, sau đó lưu input/output/breakdown cùng engineVersion/legalVersion. Snapshot giúp đọc lại mà không tự động tính lại theo rule mới."),
        qa("Tại sao không nên tự động ghi đè estimate cũ khi luật đổi?", "Kết quả cũ là lịch sử đã dựa trên dữ liệu và rule tại thời điểm đó.", "Recompute âm thầm phá audit và làm người dùng thấy số quá khứ đổi không giải thích. Nên tạo estimate/version mới, giữ supersedes/link hoặc nhãn cần tính lại, hiển thị khác biệt và yêu cầu xác nhận nếu ảnh hưởng kê khai."),
        qa("Cần kiểm thử tax engine những gì?", "Test boundary, bảng trường hợp và property quan trọng hơn vài happy path.", "Test 0, đúng ngưỡng, ngay dưới/trên ngưỡng, nhiều loại hình/phương pháp, kỳ không đủ tháng, số lớn và rounding. Kiểm breakdown cộng lại đúng total, thuế không âm, cùng input+version cho cùng output. Golden test giúp phát hiện thay đổi rule có chủ đích."),
        qa("Tại sao kết quả thuế cần disclaimer và nguồn?", "Đây là ước tính phần mềm trên giả định, không phải tư vấn pháp lý cá nhân.", "UI nêu ngày/version cập nhật, giả định đầu vào, các khoản chưa xét và link nguồn. Hồ sơ phức tạp cần chuyên gia. Code hiện có hồ sơ quy tắc 2026 nhưng vẫn phải được chuyên gia thuế kiểm tra trước khi tuyên bố public chính xác."),
        qa("Nếu legal rule có hiệu lực giữa một kỳ thì thiết kế ra sao?", "Không chỉ chọn rule theo năm; cần effectiveFrom/effectiveTo và policy phân đoạn.", "Service xác định ngày nghiệp vụ/kỳ, chọn profile có hiệu lực, hoặc tách kỳ thành các đoạn nếu quy định yêu cầu. Database chống khoảng hiệu lực chồng lấn; estimate lưu profile ID/version. Test đúng ngày chuyển giao là bắt buộc."),
        qa("Trong Java nên mô hình tax engine như thế nào?", "Dùng value object, strategy/rule set và hàm thuần trước khi dùng Spring.", "Money/Revenue/TaxPeriod là value object; TaxPolicy theo legal profile; TaxCalculator trả immutable breakdown. Repository/provider load rule ở application layer; domain không biết HTTP/JPA. BigDecimal có scale/rounding rõ hoặc long VND nếu chỉ số nguyên.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — lead, reminder, email, push & ICS",
      items: [
        qa("Lead capture cần lưu gì để vừa hữu ích vừa có trách nhiệm?", "Contact đã chuẩn hóa, consent, nguồn chiến dịch và snapshot liên quan.", "Lưu kênh/email/Zalo đã normalize, consent timestamp/purpose, UTM/source/tool, calculator input/output tối thiểu và version. Không thu thập dữ liệu thừa; hỗ trợ unsubscribe/xóa theo chính sách; log không chứa contact đầy đủ."),
        qa("Reminder flow end-to-end là gì?", "Tạo lịch nhắc bền vững, cron claim việc đến hạn, gửi qua adapter và ghi trạng thái/dedup.", "Người dùng hoặc lead chọn hạn/kênh; database giữ reminder/job. Cron được xác thực lấy batch due, đảm bảo một job không gửi lặp, gọi Resend/Web Push hoặc tạo calendar link, rồi ghi sent/failed/retry. Network failure không được làm mất job; retry cần giới hạn và backoff."),
        qa("Tại sao cron endpoint phải được bảo vệ?", "Nếu public, attacker có thể kích hoạt gửi hàng loạt hoặc tăng chi phí.", "Route cron kiểm secret/header/platform identity, giới hạn batch và thời gian, dùng idempotent claim. Secret nằm trong environment, không query string/log. Chạy song song vẫn không gửi cùng job hai lần nhờ conditional update/unique delivery key."),
        qa("ICS signed token giải quyết gì?", "Cho phép tải lịch mà không lộ ID có thể đoán hoặc cần session tại calendar client.", "Server ký payload chứa resource/user/scope/expiry; endpoint verify chữ ký và thời hạn trước khi trả calendar. Token phải đủ entropy, có rotation/version và không chứa PII nhạy cảm. Nếu URL bị chia sẻ, cần khả năng revoke hoặc expiry phù hợp."),
        qa("Web Push cần quản lý subscription thế nào?", "Subscription là credential endpoint nhạy cảm, có thể hết hạn.", "Lưu endpoint và key được bảo vệ, gắn user/device, xóa khi provider trả 404/410, không log full subscription. Permission do browser/user quyết định. Gửi push là side effect retryable nhưng phải dedup để tránh spam."),
        qa("Email gửi thất bại có được rollback reminder không?", "Không nên giữ transaction DB trong lúc gọi provider.", "Claim job/ghi attempt trong transaction ngắn, gửi ngoài transaction, sau đó cập nhật kết quả có owner token hoặc trạng thái điều kiện. Nếu crash sau send trước mark, có nguy cơ gửi lặp; provider idempotency key hoặc delivery record giúp giảm rủi ro."),
        qa("Làm sao tránh hai cron worker gửi cùng reminder?", "Dùng DB claim có lease/conditional state, không chỉ select rồi gửi.", "UPDATE status pending→processing WHERE due và status=pending RETURNING, hoặc FOR UPDATE SKIP LOCKED trong transaction. Gắn claimedBy/leaseUntil để reclaim khi worker chết; completion chỉ worker sở hữu mới ghi."),
        qa("Các tích hợp nào chưa có runtime evidence?", "Code adapter không đồng nghĩa email/push đã được gửi thật.", "Resend, Web Push và Supabase runtime chưa được xác minh E2E trong lần rà soát. Có thể mô tả chúng đã được implement theo code, nhưng CV/demo cần lưu bằng chứng môi trường test, provider response, retry và dữ liệu DB trước khi gọi production-ready.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — pricing, checkout & VietQR",
      items: [
        qa("Luồng checkout bắt đầu từ đâu và kết thúc ở đâu?", "Plan từ DB → payment pending → hướng dẫn QR → polling → settlement → subscription.", "User đã đăng nhập chọn billing interval; server đọc plan đang active và price tương ứng, nhận/tạo idempotency key, tạo memo duy nhất và payment pending có expiry metadata, rồi adapter dựng VietQR. UI hiển thị account/amount/memo, đếm ngược và poll status. Webhook SePay hoặc admin manual settle gọi transaction chuyển payment succeeded và kích hoạt/gia hạn subscription."),
        qa("Vì sao server phải đọc plan price thay vì nhận amount từ client?", "Client là input không tin cậy và có thể sửa request.", "Client chỉ gửi planId/billingInterval. Service query plan active, lấy monthly/yearly price, kiểm currency VND rồi lưu amount. Webhook lại đối chiếu số tiền thực nhận với amount DB. Đây là chống parameter tampering ở cả checkout và settlement."),
        qa("Idempotency key ở checkout giải quyết tình huống nào?", "Double click, retry mạng hoặc client gửi lại không tạo nhiều payment intent.", "Cùng key thuộc user/intent trả payment/hướng dẫn cũ thay vì sinh memo mới. Database unique bảo vệ hai request song song. Key phải đủ ngẫu nhiên, giữ đủ lâu theo lifecycle và nếu API cho client tự cấp thì nên so fingerprint payload để ngăn reuse cho plan khác."),
        qa("Memo thanh toán được tạo như thế nào và vì sao cần unique?", "Mã STK + 8 ký tự dễ đọc, tránh ký tự gây nhầm, được DB bảo vệ.", "Không gian 32^8 đủ lớn cho MVP; generator bỏ O/0/I/1 và thử lại khi unique collision, tối đa 8 lần. Memo là business correlation để tìm payment từ nội dung chuyển khoản; không phải secret hay bằng chứng thanh toán."),
        qa("VietQR trong hệ thống có chuyển tiền không?", "QR chỉ mã hóa hướng dẫn ngân hàng; trạng thái phải đến từ đối soát/webhook/admin.", "QR chứa tài khoản, ngân hàng, amount và memo để giảm lỗi nhập. Việc người dùng quét QR hoặc UI hết countdown không chứng minh tiền vào. Chỉ provider event đã xác thực hoặc quy trình admin có bằng chứng mới được settle."),
        qa("Provider manual_bank và sepay khác nhau gì?", "Cùng instruction QR nhưng khác nguồn xác nhận settlement.", "manual_bank mặc định yêu cầu admin xem bằng chứng/giao dịch và duyệt. sepay nhận webhook tự động bằng API key rồi đánh giá payload. Cùng settlement service giúp invariant subscription nhất quán; provider-specific parsing/auth nằm ở adapter."),
        qa("Payment expiry hiện được lưu ở đâu và có trade-off gì?", "Expiry nằm trong rawWebhookJson thay vì cột typed.", "Cách này nhanh cho MVP nhưng query/index/report expiry khó, metadata checkout và audit webhook bị trộn. Production nên có expiresAt typed, webhookEvents/paymentReviews riêng, giữ raw payload append-only/retention thích hợp."),
        qa("UI checkout có những chi tiết trải nghiệm đáng nói?", "QR, nút copy, countdown và polling theo visibility làm luồng tự phục vụ.", "Trang server kiểm session, UUID và ownership trước render. Client copy account/amount/memo, cập nhật mỗi giây và poll khoảng 3 giây chỉ khi tab visible để giảm request. Khi succeeded/failed chuyển trạng thái rõ. UX không thay server authorization/state machine."),
        qa("Polling nên dừng khi nào?", "Chỉ poll pending còn hiệu lực; dừng ở terminal/unmount và khi tab ẩn.", "Client dọn interval, tránh nhiều timer khi rerender, backoff khi lỗi mạng và không poll vô hạn. Server GET status idempotent, ownership-safe và có thể xử lý lazy expiry. Về scale có thể cân nhắc SSE/WebSocket, nhưng polling đơn giản phù hợp volume MVP."),
        qa("Số tiền hiện tại của gói có nên hard-code trong câu trả lời phỏng vấn?", "Có thể nêu evidence hiện tại nhưng nhấn mạnh DB là nguồn sự thật và giá có thể đổi.", "Migration hiện làm basic 20.000đ/tháng hoặc 200.000đ/năm và deactive pro, nhưng logic đúng là đọc plan/price từ DB. CV không cần gắn số giá vì đây là dữ liệu vận hành dễ thay đổi."),
        qa("Checkout đã hỗ trợ recurring tự động chưa?", "Chưa; đây là chuyển khoản theo intent, không có mandate/token để auto-charge.", "Gia hạn xảy ra khi user tạo và thanh toán giao dịch mới. Không có card vault, scheduled charge, retry dunning hay PSP subscription. Nên gọi là subscription entitlement được kích hoạt bởi bank-transfer payment, không gọi auto recurring billing."),
        qa("Nếu tạo payment xong nhưng user đóng trang thì sao?", "Payment vẫn bền trong DB; user có thể mở lại theo ownership và idempotency.", "Instruction không phụ thuộc component đang sống. Webhook vẫn settle khi tiền đến. Cần màn lịch sử/khôi phục checkout pending và expiry rõ; không tạo payment mới vô hạn nếu intent cũ còn dùng được.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — SePay webhook & payment state machine",
      items: [
        qa("Webhook SePay được xác thực thế nào?", "Đọc Authorization: Apikey và so sánh constant-time với secret cấu hình.", "Handler kiểm format/header, dùng equal-length guard rồi constant-time compare để giảm timing leak. Secret ở environment, không commit/log. HTTPS, secret rotation, provider IP/signature nếu có và rate limit là các lớp bổ sung; contract thật vẫn cần verify với tài liệu/sandbox SePay."),
        qa("Tại sao webhook trả 200 cho nhiều business outcome?", "Provider retry chỉ nên dành cho lỗi hạ tầng, không lặp vô hạn một payload xử lý được.", "Non-incoming, không tìm thấy memo, underpaid, expired hoặc đã xử lý là quyết định nghiệp vụ đã được ghi nhận/review nên trả 2xx. Exception DB/infrastructure có thể để 5xx để provider retry. Cần theo đúng contract provider về status/body."),
        qa("Webhook tìm payment bằng cách nào?", "Parse nội dung giao dịch để trích memo rồi query payment.", "Extractor tìm mẫu mã STK trong content không tin cậy, normalize có giới hạn, sau đó lookup memo unique. Không dùng amount đơn lẻ vì nhiều payment có cùng giá. Sai/thiếu memo phải vào unmatched/review flow thay vì gán đoán."),
        qa("Các nhánh quyết định settlement là gì?", "Direction, state/expiry và amount quyết định settle, ignore hay review.", "Chỉ incoming được xét. succeeded/refunded thì already processed; failed/expired hoặc amount thiếu thì manual review; underpaid review; exact hoặc overpaid có thể settle theo policy hiện tại. Raw event/metadata được lưu trước quyết định để điều tra. Overpayment cần policy hoàn phần dư nếu triển khai production."),
        qa("Idempotency webhook có mấy lớp?", "State transition conditional, providerRef unique và transaction cùng bảo vệ duplicate/race.", "Cùng webhook có thể gửi lại. Conditional UPDATE chỉ đổi pending→succeeded một lần; unique (provider, providerRef) chống cùng giao dịch ngân hàng gắn nhiều payment; transaction đảm bảo chỉ winner kích hoạt subscription. Tuy vậy code nên xử lý duplicate providerRef anomalous thành kết quả ổn định thay vì để unique violation 500 lặp."),
        qa("Vì sao chỉ Inbox/dedup payload là chưa đủ?", "Provider có thể gửi event ID khác cho cùng giao dịch hoặc cùng intent ở payload biến thể.", "Cần business identity như provider+providerRef và state machine. Hash raw payload chỉ phát hiện bytes giống hệt; nó không ngăn hai message khác nhau đại diện cùng bank transaction."),
        qa("Raw webhook nên được lưu thế nào?", "Giữ bằng chứng có kiểm soát, tránh trộn và rò dữ liệu.", "Nên có bảng webhook_event append-only với providerRef, receivedAt, auth outcome, normalized decision, raw JSON đã redact/encrypt theo retention. Payment chỉ giữ state/amount/memo. Code hiện dùng rawWebhookJson cả metadata checkout và webhook/review, phù hợp MVP nhưng khó audit/query về lâu dài."),
        qa("Dev simulate endpoint được bảo vệ ra sao?", "Chỉ chạy khi không production và DEMO_PAYMENT=1.", "Hai điều kiện đồng thời giảm nguy cơ endpoint giả lập xuất hiện production. Nó tạo fake payload rồi đi qua service, hữu ích demo/test. Vẫn không thay integration test với chữ ký/header/payload thật và không được để env production bật nhầm."),
        qa("Nếu webhook đến trước khi transaction checkout commit thì sao?", "Lookup có thể chưa thấy payment; provider retry hoặc durable unmatched event phải cứu luồng.", "Thiết kế tốt commit payment trước khi trả QR nên cửa sổ nhỏ, nhưng event ngoại lai luôn có thể race. Nếu chỉ trả 200 not-found sẽ mất cơ hội tự động settle. Nên lưu unmatched event và retry/reconcile theo providerRef/memo, hoặc trả retryable response theo contract đã thống nhất."),
        qa("Webhook amount lấy kiểu số nào?", "Tiền phải parse chính xác, kiểm dương/range và chuẩn hóa VND.", "Không dùng float cho tiền. Zod/schema chỉ chấp nhận shape provider đã xác minh, chuyển về integer VND, từ chối NaN/negative/overflow. Amount DB mới là expected; payload là observed."),
        qa("Contract SePay hiện có rủi ro gì?", "Schema trong code là giả định passthrough và được đánh dấu cần đối chiếu.", "Tên trường, kiểu amount, direction, authorization và retry semantics có thể khác tài liệu/provider version. Trước production phải lấy sample signed payload từ sandbox, viết contract fixture/test và version adapter. Không tuyên bố tích hợp thực chiến chỉ dựa vào payload tự tạo."),
        qa("Webhook có nên rate-limit như API người dùng không?", "Cần chống abuse nhưng không được chặn retry hợp lệ của provider.", "Rate limit theo provider/IP/key với quota riêng, queue/buffer và 2xx/5xx đúng contract. Limiter in-memory mỗi instance không đủ khi scale và reset khi restart; Redis/Upstash hoặc gateway policy phân tán phù hợp hơn.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — settlement, subscription & race condition",
      items: [
        qa("Settlement transaction cập nhật những gì?", "Chuyển payment pending→succeeded và kích hoạt/gia hạn subscription trong cùng transaction.", "Service conditional-update payment để chỉ một caller thắng. Winner đọc subscription hiện tại: cùng plan thì gia hạn từ currentPeriodEnd nếu còn hiệu lực, nếu hết hạn thì từ now; khác plan thì bắt đầu period mới theo policy. Sau đó liên kết payment/period và commit atomically. Loser đọc kết quả đã xử lý."),
        qa("Tại sao conditional UPDATE quan trọng hơn check-then-update?", "Hai webhook song song có thể cùng đọc pending trước khi một bên ghi.", "UPDATE ... WHERE status='pending' trả row count biến state transition thành thao tác atomic tại DB. Chỉ rowsAffected=1 được tạo side effect subscription; rowsAffected=0 phải coi là duplicate/race và re-read. Một if trong JavaScript không bảo vệ nhiều request/process."),
        qa("Partial unique index một active subscription/user giúp gì?", "Ngăn hai transaction tạo đồng thời hai entitlement active.", "Application cố gắng update/replace đúng luồng; database là safety net. Cần định nghĩa chính xác status nào là active, cách đóng bản cũ và thứ tự thao tác để không vướng constraint."),
        qa("Cùng plan và khác plan nên gia hạn thế nào?", "Cùng plan nối thời gian còn lại; đổi plan cần policy rõ về hiệu lực/proration.", "Code hiện cùng plan kéo dài từ end hiện tại hoặc now nếu đã hết; plan khác bắt đầu period mới. Production cần quyết định upgrade ngay, downgrade cuối kỳ, credit/proration và concurrency. Không tự suy ra từ tên plan."),
        qa("Lỗi ngày 31 khi cộng tháng là gì?", "JavaScript Date.setUTCMonth có thể overflow thay vì clamp cuối tháng.", "Ví dụ cơ sở 31/01 cộng một tháng có thể rơi sang đầu tháng 3 vì tháng 2 không có ngày 31. Subscription bị tặng/thiếu ngày ngoài ý muốn. Hàm billing interval nên đặt ngày tạm, tính last day tháng đích rồi clamp original day; test leap year, DST/UTC và 29–31."),
        qa("Expired payment và late webhook hiện có khoảng hở nào?", "Lazy expiry đổi pending→failed; webhook đánh dấu review nhưng manual settle lại từ chối non-pending.", "Tài liệu gợi ý admin có thể xử lý tiền đến muộn, nhưng manuallySettlePayment hiện yêu cầu payment pending. Vì vậy failed/expired được flag review nhưng không thể hoàn tất bằng chính action đó. Cần state EXPIRED riêng và audited transition EXPIRED→SUCCEEDED_LATE hoặc quy trình tạo credit/refund; đây là bug/requirement gap phải nói rõ."),
        qa("Underpayment và overpayment nên xử lý thế nào?", "Underpay không cấp quyền; overpay chỉ settle nếu policy chấp nhận và phải xử lý phần dư.", "Code đưa underpaid vào review và cho exact/overpaid settle. Production cần tolerance, currency, aggregate nhiều transfer, hoàn tiền phần dư và audit. Không tự sửa expected amount cho khớp observed."),
        qa("Nếu database lỗi giữa payment và subscription thì sao?", "Transaction phải rollback cả hai để không có payment success mà thiếu entitlement.", "Atomic local transaction là lợi thế của modular monolith. Webhook nhận 5xx để retry; providerRef/state transition bảo vệ lặp. Nếu gọi provider/email trong transaction sẽ làm cửa sổ lỗi dài, nên chỉ commit dữ liệu rồi phát side effect sau."),
        qa("Manual admin settlement cần bảo vệ gì?", "Quyền server-side, state hợp lệ, evidence và audit.", "ADMIN_EMAILS chỉ là MVP authz. Action phải kiểm payment/amount/provider, conditional settle, ghi admin identity, reason và timestamp. Không cho UI gửi tùy ý userId/plan/period. Với payment expired/refunded cần flow riêng chứ không force đổi state."),
        qa("Refunded status hiện nói lên điều gì và thiếu gì?", "Schema có trạng thái nhưng chưa có luồng hoàn tiền tự động hoàn chỉnh.", "Không được suy ra đã tích hợp bank refund. Production refund cần request/approval, provider transfer/reference, idempotency, subscription entitlement policy, reconciliation và audit. Một enum không phải feature hoàn thiện."),
        qa("Subscription entitlement được đọc ở đâu để gate chức năng?", "Service phải tính active theo status và thời gian, không chỉ nhìn planId phía client.", "Kiểm user, current period, plan active và limits ở server trước operation. Khi hết hạn, entitlement chuyển free/degraded theo policy. Cache nếu có phải invalidation sau settle và không vượt thời gian an toàn."),
        qa("Nếu cùng providerRef xuất hiện với memo khác thì sao?", "Đây là anomaly cần trả kết quả ổn định và đưa review.", "Unique index ngăn gắn một giao dịch ngân hàng cho hai payment, nhưng nếu code chỉ insert/update rồi nổ constraint, provider có thể retry 5xx vô hạn. Nên lookup providerRef trước/handle unique violation, lưu anomaly và trả 2xx sau khi review item đã bền.")
      ]
    },
    {
      topic: "Sổ Tay Kinh Doanh — security, testing, deploy & incident",
      items: [
        qa("Các lớp bảo mật quan trọng nhất của dự án?", "Auth/session, ownership/RLS, input validation, webhook secret, admin authz, headers và secret hygiene.", "Supabase xác minh user; service query theo owner; RLS làm defense in depth; Zod giới hạn input; webhook constant-time secret compare; admin action kiểm server-side; CSP/headers bảo vệ browser; canonical redirect giảm host confusion. Secret chỉ ở environment và phải rotate nếu từng lộ."),
        qa("Vấn đề secret đã phát hiện cần xử lý thế nào?", "Một SePay key từng xuất hiện trong lịch sử git phải được coi là đã lộ.", "Xóa khỏi file hiện tại chưa đủ. Cần rotate/revoke tại provider ngay, cập nhật secret manager/environment, kiểm audit log sử dụng, sau đó cân nhắc rewrite git history có phối hợp vì làm đổi commit hash. Không ghi hoặc hiển thị giá trị key trong tài liệu ôn tập."),
        qa("Rate limiter in-memory có giới hạn gì?", "Mỗi instance có bộ đếm riêng, restart mất state và có thể bị vượt tổng quota.", "Phù hợp local/MVP hoặc best-effort. Khi scale nhiều replica cần Redis/Upstash/gateway với atomic increment/TTL, key strategy chống NAT abuse và quota riêng cho auth, public calculator, webhook, cron. Rate limit không thay WAF/validation."),
        qa("108 test hiện chứng minh được gì và chưa chứng minh gì?", "Chứng minh unit/module behavior trong suite; chưa chứng minh hạ tầng thật.", "Các test bao phủ pure helpers như memo extraction/generation, settlement decision/period logic và nhiều module khác; lint/type/build cũng pass. Chưa có DB integration test cho conditional race/unique index/transaction atomicity, route test webhook auth thật, hay E2E Supabase–SePay–subscription. Phải mô tả đúng test pyramid."),
        qa("Payment cần bổ sung integration test nào trước?", "Ưu tiên invariant có cạnh tranh và lỗi khó mô phỏng bằng unit.", "Chạy PostgreSQL thật/Testcontainers hoặc Supabase test: hai webhook song song chỉ gia hạn một lần; idempotency checkout cùng key; providerRef duplicate; rollback khi subscription write lỗi; late expired flow; admin authorization; month-end calculation. Route fixture dùng payload/header sandbox SePay."),
        qa("Production build pass có ý nghĩa gì?", "Chứng minh source compile/bundle/static generation theo config hiện tại.", "Build đã tạo 64 trang tĩnh và route tree thành công. Nó không chứng minh env production đúng, migration chạy, database reachable, callback URL, webhook delivery hoặc provider credentials. Deploy gate cần smoke test sau release."),
        qa("Quy trình deploy an toàn nên gồm gì?", "Artifact bất biến, migration kiểm soát, secret đúng môi trường, health/smoke và rollback.", "CI chạy lint/type/test/build, build image/tag commit, scan dependency/secret. Backup và chạy migration one-shot theo chiến lược compatible; deploy staging rồi production; health/readiness kiểm dependency bắt buộc; smoke auth, calculator, ledger và payment sandbox. Rollback app phải tương thích schema."),
        qa("Observability cần log/metric gì cho payment?", "Theo dõi funnel và anomaly mà không log secret/raw PII.", "Log correlationId, paymentId, providerRef đã mask, state transition/decision/error code/admin actor. Metric: checkout created, pending age, webhook auth failure, unmatched memo, under/overpay, settle latency/failure, duplicate, manual-review backlog và subscription activation. Alert phải gắn runbook."),
        qa("Payment pending quá lâu thì debug thế nào?", "Đi từ record DB và expiry đến provider/webhook, không bắt đầu bằng UI.", "Kiểm payment owner/status/expiresAt metadata/memo/amount/provider; xem giao dịch có incoming và nội dung đúng không; kiểm webhook auth/log, raw event, decision, providerRef unique; kiểm admin queue/manual_bank; sau đó mới kiểm polling/tab visibility. Không đổi trực tiếp DB trước khi có audit."),
        qa("User đã chuyển tiền nhưng UI vẫn failed sau expiry thì xử lý sao?", "Đây là late-payment incident và code hiện thiếu transition manual hợp lệ.", "Giữ raw event/bank evidence, không tự gia hạn bằng sửa SQL. Xác nhận khoảng hở failed→manual settle, chọn audited remediation theo chính sách: kích hoạt muộn có transition mới hoặc hoàn tiền/credit. Sửa state machine, test race expiry-webhook và thông báo user."),
        qa("Nếu tax result thay đổi sau deploy thì điều tra gì?", "So input snapshot, engine/legal version, migration/rule diff và rounding.", "Không chỉ nhìn UI hiện tại. Re-run đúng version nếu còn artifact, kiểm legal effective date, ledger aggregate/datezone và source. Nếu bug, tạo version mới và kế hoạch thông báo/recalculate có audit thay vì overwrite im lặng."),
        qa("Nếu cron gửi email trùng thì tìm failure window nào?", "Khả năng crash sau provider send nhưng trước mark-sent là điển hình.", "Kiểm delivery record, claim/lease, retry log và provider message id. Bổ sung idempotency key nếu provider hỗ trợ, unique reminder+channel+scheduledAt và trạng thái conditional. Không giải quyết bằng tăng interval."),
        qa("Những cải tiến ưu tiên sau rà soát?", "Khóa secret và correctness payment trước, rồi mới mở rộng tính năng.", "P0 rotate SePay key và xác minh contract/provider sandbox. P1 sửa late-expiry manual flow, month-end billing, providerRef anomaly và tách expiresAt/webhook audit. P1 thêm DB integration/E2E. P2 chuyển rate limit phân tán, middleware→proxy và observability. AI/OCR/báo cáo năm chỉ làm sau core reliable."),
        qa("Một câu trả lời tình huống tốt theo khung nào?", "Triệu chứng → invariant → evidence → giảm thiệt hại → nguyên nhân → fix/test.", "Ví dụ webhook lặp: invariant subscription chỉ gia hạn một lần; kiểm providerRef/payment/status/log; ngăn thao tác admin trùng; xác định conditional update/unique/transaction có hoạt động; sửa handler anomaly và thêm concurrent integration test; theo dõi duplicate metric. Không nhảy ngay vào đoán lỗi frontend.")
      ]
    },
    // THEORY_MORE
  ];

  var quiz = [
    { topic: "Sổ Tay Kinh Doanh — evidence", question: "Phát biểu nào đúng nhất về trạng thái dự án sau lần rà soát?", options: ["Mọi tích hợp production đã chạy", "108 test, lint, type-check và build pass; tích hợp Supabase/SePay thật chưa được xác minh E2E", "Chỉ có mockup giao diện", "Đã có recurring billing"], correct: 1, explain: "Evidence local chứng minh code và build hiện tại, nhưng không thay bằng chứng runtime với database và provider bên ngoài." },
    { topic: "Sổ Tay Kinh Doanh — evidence", question: "Tính năng nào hiện vẫn là mock hoặc kế hoạch?", options: ["Ledger keyset pagination", "VietQR instruction", "AI assistant/OCR/báo cáo năm", "Ownership check"], correct: 2, explain: "Các phần AI, OCR và báo cáo năm chưa phải capability production; cần tránh đưa lên CV như đã hoàn thiện." },
    { topic: "Sổ Tay Kinh Doanh — architecture", question: "Đâu là source of truth cho giá gói?", options: ["Giá gửi từ trình duyệt", "Text hiển thị trên nút", "QR provider", "Bảng plan trong PostgreSQL"], correct: 3, explain: "Server đọc plan đang active và price theo kỳ từ database để ngăn client sửa số tiền checkout." },
    { topic: "Sổ Tay Kinh Doanh — architecture", question: "Tax engine nên phụ thuộc thành phần nào?", options: ["Các kiểu dữ liệu và rule thuần", "React component", "Next request", "Supabase cookie"], correct: 0, explain: "Engine thuần nhận input chuẩn hóa và trả kết quả deterministic; adapter chịu auth, persistence và giao diện." },
    { topic: "Sổ Tay Kinh Doanh — architecture", question: "Route Handler nên giữ trách nhiệm nào?", options: ["Toàn bộ business rule", "Parse/auth/validate, gọi service và map response", "Truy cập DOM", "Tự sửa migration"], correct: 1, explain: "Controller mỏng tránh rule bị nhân bản giữa API, Server Action, webhook và cron, đồng thời dễ kiểm thử." },
    { topic: "Sổ Tay Kinh Doanh — auth", question: "Client gửi userId hợp lệ thì backend nên làm gì?", options: ["Tin luôn", "Chỉ kiểm UUID", "Lấy user từ session/token tin cậy và bỏ qua userId tự khai", "So với localStorage"], correct: 2, explain: "Danh tính phải đến từ Supabase session hoặc bearer token đã xác minh, không từ trường người dùng có thể sửa." },
    { topic: "Sổ Tay Kinh Doanh — auth", question: "Business ID tồn tại nhưng thuộc user khác nên trả gì?", options: ["404 chung", "200 rỗng", "403 kèm owner email", "500"], correct: 0, explain: "404 cho not-found và not-owned giảm khả năng dùng endpoint làm oracle dò tài nguyên của người khác." },
    { topic: "Sổ Tay Kinh Doanh — auth", question: "Middleware đã bảo vệ route thì service có thể bỏ ownership check không?", options: ["Có với GET", "Có nếu UUID", "Có khi dùng RLS", "Không, route auth không chứng minh resource thuộc user"], correct: 3, explain: "Authentication ở middleware và authorization theo tài nguyên là hai lớp khác nhau; service vẫn phải scope query." },
    { topic: "Sổ Tay Kinh Doanh — onboarding", question: "Hai request onboarding đồng thời được ngăn nhân đôi chủ yếu bằng gì?", options: ["Disable nút", "Conditional claim trong transaction và constraint", "setTimeout", "Cookie frontend"], correct: 1, explain: "Chỉ request thắng điều kiện onboardingDone=false mới tạo business và kỳ; database bảo vệ cạnh tranh giữa process." },
    { topic: "Sổ Tay Kinh Doanh — data", question: "Vì sao lưu tiền bằng integer VND?", options: ["Để JSON ngắn", "Để index luôn unique", "Tránh sai số floating point và VND không cần phần lẻ", "Vì PostgreSQL không có decimal"], correct: 2, explain: "Số nguyên đồng làm phép cộng/so sánh chính xác, nhưng vẫn cần kiểm overflow và range tại boundary." },
    { topic: "Sổ Tay Kinh Doanh — data", question: "Partial unique index một active subscription/user giải quyết gì?", options: ["Nén dữ liệu", "Ngăn hai entitlement active đồng thời", "Tạo QR", "Mã hóa plan"], correct: 1, explain: "Application có thể race; unique partial index là safety net tại nguồn dữ liệu dùng chung." },
    { topic: "Sổ Tay Kinh Doanh — ledger", question: "Cursor ledger gồm ba khóa nào?", options: ["amount, type, id", "businessId, category, amount", "entryDate, createdAt, id", "page, size, offset"], correct: 2, explain: "Ba khóa tạo total order giảm dần ổn định, kể cả nhiều entry cùng ngày hoặc cùng timestamp." },
    { topic: "Sổ Tay Kinh Doanh — ledger", question: "Vì sao chỉ entryDate không đủ làm cursor?", options: ["Ngày không index được", "Nhiều bản ghi có thể cùng ngày nên thiếu tie-breaker", "UUID không sort được", "PostgreSQL không có date"], correct: 1, explain: "Cursor không duy nhất có thể làm lặp hoặc bỏ hàng; createdAt và id hoàn thiện thứ tự xác định." },
    { topic: "Sổ Tay Kinh Doanh — ledger", question: "Soft delete yêu cầu điều gì?", options: ["Mọi query tổng hợp và limit phải lọc nhất quán", "Xóa foreign key", "Không cần audit", "Luôn nhanh hơn hard delete"], correct: 0, explain: "Bản ghi vẫn nằm trong database nên tax total, pagination và quota phải quyết định rõ có loại deleted hay không." },
    { topic: "Sổ Tay Kinh Doanh — tax", question: "Estimate cũ nên làm gì khi legal rule đổi?", options: ["Overwrite âm thầm", "Xóa hết", "Giữ snapshot/version và tạo kết quả mới nếu cần", "Dùng UI hiện tại tính lại khi xem"], correct: 2, explain: "Giữ engine/legal version bảo toàn lịch sử và cho phép giải thích vì sao hai lần tính cho kết quả khác nhau." },
    { topic: "Sổ Tay Kinh Doanh — tax", question: "Test biên nào quan trọng nhất cho rule theo ngưỡng?", options: ["Chỉ số trung bình", "Đúng ngưỡng và ngay dưới/trên ngưỡng", "Chỉ input rỗng", "Chỉ snapshot UI"], correct: 1, explain: "Lỗi so sánh lớn hơn/lớn hơn hoặc bằng thường chỉ lộ ở ba điểm sát ranh giới pháp lý." },
    { topic: "Sổ Tay Kinh Doanh — tax", question: "Engine version và legal version có nên là một không?", options: ["Luôn luôn", "Không cần version", "Chỉ production mới cần", "Nên tách vì code thuật toán và bộ quy tắc thay đổi độc lập"], correct: 3, explain: "Tách version giúp biết thay đổi đến từ implementation hay profile pháp lý, thuận lợi audit và migration." },
    { topic: "Sổ Tay Kinh Doanh — lead", question: "Dữ liệu nào chứng minh người dùng đồng ý nhận nhắc?", options: ["Màu nút", "Consent purpose và timestamp", "User agent", "UTM source duy nhất"], correct: 1, explain: "Consent cần được ghi rõ mục đích và thời điểm; UTM chỉ mô tả nguồn chiến dịch, không phải sự đồng ý." },
    { topic: "Sổ Tay Kinh Doanh — reminder", question: "Hai cron worker cùng lấy reminder nên dùng gì?", options: ["SELECT rồi gửi ngay", "Biến global", "DB claim/conditional state hoặc SKIP LOCKED", "Đổi port"], correct: 2, explain: "Database là điểm phối hợp chung giữa instance; claim atomically giúp một job chỉ có một owner tại thời điểm." },
    { topic: "Sổ Tay Kinh Doanh — reminder", question: "Crash sau email send nhưng trước mark-sent gây rủi ro gì?", options: ["Gửi trùng khi retry", "Mất schema", "Sai JWT issuer", "QR hết hạn"], correct: 0, explain: "Provider đã nhận side effect nhưng database chưa biết; delivery key và record giúp giảm duplicate ở failure window này." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "Client sửa amount từ 20.000 thành 1.000 thì backend phải làm gì?", options: ["Dùng 1.000 vì Zod hợp lệ", "Lấy giá plan từ DB và bỏ amount client", "Tạo QR không amount", "Chỉ cảnh báo UI"], correct: 1, explain: "Amount là dữ liệu nhạy cảm do server quyết định; webhook sau đó tiếp tục so số thực nhận với giá đã lưu." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "Double click nút thanh toán được xử lý bằng gì?", options: ["CSS disabled là đủ", "Memo dài hơn", "Idempotency key cùng unique constraint", "Poll nhanh hơn"], correct: 2, explain: "UI chỉ cải thiện trải nghiệm; idempotency server và constraint mới bảo vệ retry/request song song thật sự." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "VietQR chứng minh điều gì?", options: ["Ngân hàng đã nhận tiền", "Subscription đã active", "Webhook hợp lệ", "Chỉ là hướng dẫn chuyển khoản đã mã hóa"], correct: 3, explain: "Việc render hoặc quét QR không phải settlement evidence; trạng thái đến từ provider hoặc admin review." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "Memo STK có vai trò chính gì?", options: ["Correlation bank transaction với payment intent", "Mã hóa amount", "Xác thực admin", "Thay API key"], correct: 0, explain: "Memo unique giúp extractor tìm đúng payment từ nội dung chuyển khoản; nó không phải bí mật bảo mật." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "manual_bank khác sepay ở đâu?", options: ["Không có QR", "Nguồn xác nhận là admin thay vì webhook tự động", "Không dùng database", "Luôn miễn phí"], correct: 1, explain: "Hai provider có thể dùng cùng bank instruction, nhưng settlement source và quy trình review khác nhau." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "Payment expiry hiện nằm ở đâu?", options: ["Cột expiresAt typed", "Trong rawWebhookJson metadata", "Trong cookie", "Trong QR image"], correct: 1, explain: "Cách lưu JSON phù hợp MVP nhưng làm query/index/audit khó hơn một cột expiry riêng có kiểu rõ." },
    { topic: "Sổ Tay Kinh Doanh — checkout", question: "Tab bị ẩn thì polling nên làm gì?", options: ["Tăng lên mỗi 100ms", "Tạo timer thứ hai", "Tạm dừng và tiếp tục khi visible", "Đánh dấu succeeded"], correct: 2, explain: "Visibility-aware polling giảm request không cần thiết; server vẫn là nơi quyết định trạng thái thật của payment." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Cách xác thực webhook hiện tại là gì?", options: ["Authorization Apikey và constant-time compare", "Memo code", "Cookie user", "Referer header"], correct: 0, explain: "Handler so secret cấu hình với header sau equal-length guard; secret phải được quản lý và rotate an toàn." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Webhook direction không phải incoming nên xử lý sao?", options: ["Kích hoạt subscription", "Ignore theo business decision và trả 2xx", "Đổi amount âm", "Tạo plan mới"], correct: 1, explain: "Chỉ tiền vào mới có thể settle checkout; outcome đã hiểu không nên khiến provider retry vô hạn." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Không tìm thấy memo trong nội dung chuyển khoản nên làm gì?", options: ["Ghép payment gần nhất", "Ghép theo user email", "Lưu unmatched/review, không đoán", "Xóa event"], correct: 2, explain: "Amount có thể trùng giữa nhiều user; suy đoán payment có thể cấp quyền sai và rất khó hoàn tác." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Payment 20.000 nhưng nhận 15.000 thì quyết định hiện tại?", options: ["Settle đủ", "Manual review do underpaid", "Tự sửa price", "Refunded"], correct: 1, explain: "Underpayment không đủ điều kiện cấp entitlement; review giữ bằng chứng để xử lý theo chính sách rõ ràng." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Nhận 25.000 cho payment 20.000 thì code hiện làm gì?", options: ["Cho phép settle theo nhánh overpaid", "Luôn từ chối", "Đổi plan", "Chia hai subscription"], correct: 0, explain: "Logic hiện cho exact/overpaid settle, nhưng production vẫn cần chính sách hoàn phần dư và reconciliation." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Hai webhook song song cùng payment được bảo vệ chủ yếu bằng gì?", options: ["Debounce frontend", "Conditional pending→succeeded trong transaction", "CSP", "QR cache"], correct: 1, explain: "Rows affected quyết định một winner duy nhất; chỉ winner mới được tạo hoặc gia hạn entitlement." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Hai eventId khác nhưng cùng providerRef cần lớp nào?", options: ["Business uniqueness provider+providerRef", "Chỉ payload hash", "Chỉ memo regex", "Chỉ rate limit"], correct: 0, explain: "Transport event có thể khác nhưng cùng giao dịch ngân hàng; unique business identity ngăn sử dụng hai lần." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Lỗi database tạm thời trong webhook nên phản hồi thế nào?", options: ["Luôn 200 rồi bỏ", "5xx để provider retry theo contract", "301", "401 user"], correct: 1, explain: "Không commit được decision/settlement là lỗi hạ tầng retryable; khác với business outcome đã ghi nhận an toàn." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Dev simulate endpoint được bật khi nào?", options: ["Mọi môi trường", "Chỉ có admin email", "NODE_ENV không production và DEMO_PAYMENT=1", "Khi QR hết hạn"], correct: 2, explain: "Hai guard cùng lúc giảm nguy cơ giả lập settlement bị mở nhầm ở production, nhưng vẫn cần test cấu hình." },
    { topic: "Sổ Tay Kinh Doanh — webhook", question: "Payload schema SePay hiện nên được mô tả thế nào?", options: ["Đã contract-certified", "Cần verify với tài liệu/sandbox provider thật", "Không cần validation", "Giống mọi ngân hàng"], correct: 1, explain: "Code đánh dấu contract cần xác minh; fixture tự tạo không chứng minh tên trường, auth và retry semantics thật." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "Cùng plan còn hạn, gia hạn nên bắt đầu từ đâu?", options: ["Luôn từ now", "Từ currentPeriodEnd", "Từ payment createdAt", "Từ đầu năm"], correct: 1, explain: "Nối từ kỳ hiện tại giữ phần thời gian người dùng đã trả; nếu đã hết mới dùng thời điểm hiện tại." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "31/01 cộng một tháng bằng setUTCMonth có nguy cơ gì?", options: ["Luôn 28/02", "Overflow sang đầu tháng 3", "Mất timezone token", "Tạo duplicate memo"], correct: 1, explain: "JavaScript giữ day-of-month rồi normalize ngày không tồn tại; cần clamp về ngày cuối tháng đích." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "Late webhook cho payment đã lazy-expire gặp khoảng hở nào?", options: ["Không lưu raw event", "Manual settle hiện từ chối trạng thái failed", "Không có user", "QR thiếu memo"], correct: 1, explain: "Review flag có thể được đặt nhưng action duyệt chỉ chấp nhận pending, nên tài liệu và code chưa khớp." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "Cách sửa late payment an toàn nhất?", options: ["UPDATE SQL trực tiếp", "Xóa payment", "Thêm transition audited và policy activate/refund rõ", "Đổi memo"], correct: 2, explain: "State mới hoặc workflow remediation giữ audit, idempotency và entitlement consistency thay vì bypass domain service." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "Schema có status refunded có nghĩa refund đã hoàn thiện chưa?", options: ["Có, enum là đủ", "Không; còn thiếu workflow/provider/reconciliation đầy đủ", "Có nếu admin", "Chỉ cần QR"], correct: 1, explain: "Một trạng thái trong schema không chứng minh tiền đã được hoàn qua ngân hàng hoặc entitlement đã được xử lý." },
    { topic: "Sổ Tay Kinh Doanh — subscription", question: "Recurring billing hiện tại là gì?", options: ["Auto-charge thẻ", "Bank mandate", "User tạo payment mới để gia hạn", "Kafka scheduler"], correct: 2, explain: "Dự án chưa có payment token hoặc scheduled charge; subscription được kéo dài sau một chuyển khoản mới." },
    { topic: "Sổ Tay Kinh Doanh — security", question: "Xóa key khỏi .env.example có đủ sau khi key từng vào git không?", options: ["Đủ", "Chỉ cần đổi tên", "Không; phải rotate/revoke và kiểm lịch sử sử dụng", "Chỉ thêm .gitignore"], correct: 2, explain: "Git history và clone cũ vẫn giữ secret; credential đã commit phải được coi là compromised." },
    { topic: "Sổ Tay Kinh Doanh — security", question: "Rate limit in-memory sai ở đâu khi có ba replica?", options: ["Không chạy được JavaScript", "Mỗi replica có quota riêng và restart mất state", "Luôn khóa database", "Không hỗ trợ UUID"], correct: 1, explain: "Client có thể phân tán request qua instance và vượt tổng quota; cần bộ đếm dùng chung nếu yêu cầu nghiêm." },
    { topic: "Sổ Tay Kinh Doanh — security", question: "CSP giúp chống gì nhưng không thay thế gì?", options: ["Giảm nguồn script nguy hiểm nhưng không thay auth/validation", "Thay database lock", "Tạo JWT", "Xác nhận webhook"], correct: 0, explain: "Security header là phòng thủ trình duyệt; quyền tài nguyên và invariant vẫn phải thực thi phía server/database." },
    { topic: "Sổ Tay Kinh Doanh — testing", question: "Test memo/settlement thuần có chứng minh race DB không?", options: ["Có hoàn toàn", "Chỉ khi lint pass", "Không, cần integration test PostgreSQL cạnh tranh", "Có nếu mock transaction"], correct: 2, explain: "Conditional update, unique violation và rollback atomicity là hành vi storage thực, không được chứng minh bằng pure unit test." },
    { topic: "Sổ Tay Kinh Doanh — testing", question: "Test ưu tiên nhất cho payment là gì?", options: ["Snapshot màu QR", "Hai webhook song song chỉ gia hạn một lần", "Logo SVG", "Sitemap title"], correct: 1, explain: "Đây là invariant tài chính/entitlement quan trọng nhất và trực tiếp kiểm tra transaction cùng conditional state transition." },
    { topic: "Sổ Tay Kinh Doanh — deploy", question: "Production build pass chưa chứng minh điều gì?", options: ["TypeScript bundle được", "Static generation được", "Supabase/SePay/email runtime hoạt động", "Route được phát hiện"], correct: 2, explain: "Build không mở kết nối provider hoặc chạy callback/webhook E2E; cần staging smoke và integration evidence riêng." },
    { topic: "Sổ Tay Kinh Doanh — deploy", question: "Cảnh báo middleware deprecated nên xử lý sao?", options: ["Bỏ qua mãi", "Đổi tên ngay không test", "Lập migration sang proxy và regression test auth/redirect", "Tắt build"], correct: 2, explain: "Warning chưa làm build fail nhưng báo technical debt phiên bản; thay đổi boundary auth cần kiểm thử kỹ." },
    { topic: "Sổ Tay Kinh Doanh — incident", question: "Payment pending lâu, kiểm gì trước?", options: ["Màu nút", "Record payment/memo/expiry/provider và webhook decision", "Cài lại React", "Xóa subscription"], correct: 1, explain: "Database/provider evidence nằm gần nguồn sự thật hơn UI; sau đó mới kiểm polling và presentation." },
    { topic: "Sổ Tay Kinh Doanh — incident", question: "Cron gửi email trùng nên tìm failure window nào?", options: ["Sau send trước mark-sent", "Trước CSS load", "Sau QR render", "Trước login redirect"], correct: 0, explain: "Side effect bên ngoài đã xảy ra nhưng local state chưa commit là cửa sổ retry gây duplicate điển hình." },
    { topic: "Sổ Tay Kinh Doanh — incident", question: "Tax result đổi bất ngờ, evidence đầu tiên là gì?", options: ["Ảnh UI mới", "Input snapshot cùng engine/legal version", "Browser history", "Admin email"], correct: 1, explain: "Version và input cho phép phân biệt thay đổi rule, aggregate dữ liệu, rounding hay lỗi giao diện." },
    { topic: "Sổ Tay Kinh Doanh — CV", question: "Câu nào trung thực nhất khi viết CV?", options: ["Production payment gateway đa tiền tệ", "Đã kết nối mọi ngân hàng", "Implemented VietQR/SePay subscription flow; local tests/build verified, real provider E2E pending", "Tự động refund và recurring"], correct: 2, explain: "Cách nói tách implementation khỏi runtime evidence, vừa thể hiện kỹ thuật vừa tránh phóng đại phạm vi." },
    { topic: "Sổ Tay Kinh Doanh — Java mapping", question: "Drizzle transaction tương đương khái niệm nào trong Spring?", options: ["@Transactional ở application service", "@ComponentScan", "@Async UI", "Security header"], correct: 0, explain: "Cả hai bao quanh local database work cần commit hoặc rollback cùng nhau; network call nên nằm ngoài transaction dài." },
    // QUIZ_MORE
  ];

  var checklistGroups = [
    {
      code: "FLOW", topic: "0. Tổng hợp kiến thức & luồng toàn hệ thống", type: "Practice", questions: [
        "Pitch dự án trong 60–90 giây: bài toán, người dùng, ba luồng chính, stack và hai điểm backend nổi bật.",
        "Vẽ luồng public SEO tool → tax engine → kết quả/version/source → lead/consent → reminder.",
        "Vẽ luồng Supabase login → onboarding transaction → business → bốn kỳ thuế.",
        "Vẽ luồng ledger entry → keyset list → period summary → tax estimate snapshot.",
        "Vẽ luồng plan → checkout → VietQR → webhook/admin → payment → subscription.",
        "Đánh dấu source of truth, trust boundary, validation, ownership và transaction trên từng luồng.",
        "Phân loại VERIFIED_LOCAL, IMPLEMENTED_NOT_RUNTIME_VERIFIED và MOCK/PLANNED.",
        "Chọn ba bullet CV có cơ chế, invariant và evidence; loại bỏ mọi số liệu chưa đo.",
        "Ánh xạ Route Handler/service/transaction/Zod/middleware sang Spring Controller/Service/@Transactional/Validation/Security.",
        "Kể một incident payment và một incident tax theo khung triệu chứng→evidence→fix→test."
      ]
    },
    {
      code: "PROD", topic: "1. Sản phẩm, SEO, CV & chức năng nổi bật", type: "Reflection", questions: [
        "Giải thích vì sao công cụ tính thuế miễn phí là product-led acquisition chứ không chỉ trang SEO.",
        "Liệt kê chức năng công khai: tính thuế, nhóm kinh doanh, hạn, HKD vs công ty, lợi nhuận, hóa đơn, freelancer, platform seller, rental.",
        "Nêu dữ liệu lead tối thiểu: contact normalize, consent, UTM, calculation snapshot và version.",
        "Trình bày tax engine là công cụ ước tính có nguồn/version, không thay tư vấn pháp lý.",
        "So sánh Sổ Tay Kinh Doanh modular full-stack với PayFlow microservice sandbox.",
        "Viết bullet CV về tax engine, ledger cursor và payment settlement.",
        "Trả lời “em trực tiếp làm gì?” bằng 2–3 lát cắt có file/flow/test/limitation.",
        "Nêu rõ AI assistant, OCR, annual report, auto-refund và auto-recurring chưa hoàn thiện."
      ]
    },
    {
      code: "NEXT", topic: "2. Next.js architecture & API boundary", type: "Theory", questions: [
        "Phân biệt Server Component, Client Component, Server Action và Route Handler bằng ví dụ trong dự án.",
        "Giải thích vì sao page/route phải mỏng và business rule nằm ở service/lib.",
        "Phân biệt shape validation của Zod với ownership và domain invariant.",
        "Thiết kế unified success/error response không rò stack, secret hoặc resource ownership.",
        "Giải thích khi nào dùng Server Action và khi nào cần HTTP API route.",
        "Mô tả middleware refresh Supabase cookie nhưng không thay service authorization.",
        "Lập kế hoạch chuyển Next middleware sang proxy và regression test auth/redirect.",
        "Giải thích canonical 308, CSP, X-Frame-Options, nosniff và referrer policy.",
        "Đọc route tree từ production build và chỉ ra public, authenticated, webhook, cron, admin boundary."
      ]
    },
    {
      code: "AUTH", topic: "3. Auth, onboarding, RLS & ownership", type: "Scenario", questions: [
        "Kể magic link/Google login → callback → cookie session → protected request.",
        "Giải thích vì sao không tin userId, role hoặc admin flag do client gửi.",
        "Chứng minh onboarding hai request song song không tạo hai business/bộ kỳ.",
        "Xử lý user sửa businessId của người khác: owner-scoped query và 404 chung.",
        "Phân biệt authentication, authorization, ownership và RLS.",
        "Giải thích vì sao service role/bypass RLS càng cần service-level owner check.",
        "Thiết kế admin role/claim dài hạn thay ADMIN_EMAILS nhưng vẫn giữ audit.",
        "Liệt kê token, cookie, OAuth code, magic link và PII không được log.",
        "Viết test 401, unauthenticated redirect, not-owned 404 và admin forbidden."
      ]
    },
    {
      code: "DATA", topic: "4. PostgreSQL, Drizzle, transaction & schema", type: "Practice", questions: [
        "Giải thích integer VND, range/overflow và cách ánh xạ sang Java long/BigDecimal.",
        "Vẽ bảng plan, payment, subscription cùng foreign key và trạng thái.",
        "Giải thích unique idempotencyKey, memoCode, provider+providerRef và partial active-subscription index.",
        "Nêu một race mà application check không đủ nhưng unique/conditional update bảo vệ.",
        "Phân biệt transaction atomicity với giữ lock qua network call.",
        "Review migration theo SQL, backfill, default, index, lock và compatibility.",
        "Giải thích không sửa migration đã apply; tạo forward migration và roll-forward plan.",
        "Dùng EXPLAIN ANALYZE kiểm query trước khi cache/denormalize.",
        "Thiết kế expiresAt typed và webhook_event/payment_review tables thay raw JSON trộn vai trò."
      ]
    },
    {
      code: "LED", topic: "5. Ledger, pagination & plan limit", type: "Scenario", questions: [
        "Kể create/update/soft-delete income/expense với auth, ownership, validation và tax period.",
        "Giải thích category/type/amount/date rule và lớp DB constraint cần có.",
        "Vẽ order giảm dần entryDate, createdAt, id và predicate cursor trang sau.",
        "Mô phỏng OFFSET bị lặp/bỏ hàng khi insert backdated giữa hai lần tải.",
        "Giải thích trade-off keyset: ổn định/nhanh nhưng khó nhảy trang N.",
        "Audit mọi query tổng hợp, pagination và quota có lọc deletedAt nhất quán.",
        "Thiết kế server-side plan gating, không dựa vào nút bị ẩn trên UI.",
        "Xử lý hai request đồng thời cùng chạm giới hạn gói.",
        "Debug tax total sai bằng date range, timezone, deleted rows, category và query plan."
      ]
    },
    {
      code: "TAX", topic: "6. Tax engine, legal profile & estimate", type: "Practice", questions: [
        "Vẽ input normalized → legal profile → pure calculator → breakdown/output.",
        "Phân biệt engineVersion, legalVersion/profile và source/căn cứ.",
        "Kể ledger period summary → calculate → persisted estimate snapshot.",
        "Viết test 0, đúng ngưỡng, ngay dưới/trên ngưỡng, số lớn và rounding.",
        "Kiểm property breakdown cộng đúng total, output không âm và deterministic theo version.",
        "Giải thích vì sao luật đổi không overwrite estimate cũ.",
        "Thiết kế effectiveFrom/effectiveTo và case rule đổi giữa kỳ.",
        "So sánh golden test, example test và property test cho tax engine.",
        "Nêu disclaimer, giả định, nguồn và yêu cầu chuyên gia thuế duyệt.",
        "Thiết kế module Java thuần với Money, TaxPeriod, TaxPolicy và immutable result."
      ]
    },
    {
      code: "REM", topic: "7. Lead, reminder, Resend, Web Push & ICS", type: "Scenario", questions: [
        "Thiết kế contact normalization, consent purpose/time, UTM và dữ liệu tối thiểu.",
        "Vẽ reminder/job state từ scheduled đến processing, sent, retry và failed.",
        "Bảo vệ cron endpoint bằng secret/platform identity, batch limit và log an toàn.",
        "Ngăn hai cron worker gửi cùng job bằng conditional claim hoặc SKIP LOCKED.",
        "Phân tích crash sau provider send trước mark-sent và chiến lược idempotency.",
        "Thiết kế signed ICS token có expiry, version, rotation và revoke.",
        "Xử lý Web Push endpoint 404/410 và bảo vệ subscription key.",
        "Tách DB transaction khỏi Resend/Web Push network call.",
        "Nêu evidence còn thiếu trước khi ghi email/push runtime production trên CV."
      ]
    },
    {
      code: "CHK", topic: "8. Pricing, checkout, VietQR & payment UI", type: "Practice", questions: [
        "Kể checkout từ planId/billing interval đến payment pending và QR instruction.",
        "Chứng minh client sửa amount không làm thay đổi amount server lưu.",
        "Mô phỏng double click/retry với cùng idempotency key và hai request song song.",
        "Tính không gian memo 32^8, giải thích bỏ O/0/I/1, unique và retry collision.",
        "Giải thích QR/memo không phải xác nhận tiền và không phải secret.",
        "Phân biệt manual_bank và sepay theo settlement source.",
        "Thiết kế typed expiresAt thay metadata trong rawWebhookJson.",
        "Kiểm tra page session, payment UUID và ownership trước khi render QR.",
        "Giải thích copy buttons, 1 giây countdown, 3 giây polling và visibility pause.",
        "Dọn timer, dừng terminal state, backoff lỗi mạng và tránh poll vô hạn.",
        "Thiết kế màn khôi phục payment pending khi user đóng tab.",
        "Nói đúng: subscription qua bank transfer, chưa có auto recurring billing."
      ]
    },
    {
      code: "WEB", topic: "9. SePay webhook, authentication & decision", type: "Scenario", questions: [
        "Vẽ Authorization Apikey → equal-length guard → constant-time compare.",
        "Giải thích vì sao HTTPS, secret rotation và distributed rate limit vẫn cần.",
        "Validate direction incoming, amount integer VND và content không tin cậy.",
        "Trích memo từ content; xử lý thiếu/sai memo mà không đoán payment.",
        "Phân loại already succeeded/refunded, failed/expired, underpaid, exact và overpaid.",
        "Giải thích vì sao business outcome đã lưu trả 2xx còn DB failure có thể trả 5xx.",
        "Lưu raw webhook trước decision nhưng redact/encrypt và có retention.",
        "Thiết kế webhook_event append-only, normalized decision và manual review record.",
        "Xử lý webhook đến trước checkout commit bằng unmatched queue/reconciliation.",
        "Đối chiếu schema/header/retry với sample sandbox SePay trước production.",
        "Chứng minh simulate route không thể bật production chỉ với một env sai.",
        "Thiết kế quota webhook riêng để không chặn provider retry hợp lệ."
      ]
    },
    {
      code: "SET", topic: "10. Settlement, subscription & idempotency", type: "Scenario", questions: [
        "Vẽ transaction conditional pending→succeeded → create/update subscription → commit.",
        "Giải thích rowsAffected=1 là winner; rowsAffected=0 phải re-read/no-op.",
        "Chạy hai webhook song song và chứng minh subscription chỉ gia hạn một lần.",
        "Phân biệt transport duplicate, providerRef business duplicate và checkout retry.",
        "Xử lý cùng providerRef nhưng memo khác bằng anomaly/review ổn định, không 5xx vô hạn.",
        "Gia hạn cùng plan từ currentPeriodEnd hoặc now nếu đã hết hạn.",
        "Nêu policy còn thiếu cho đổi plan: upgrade/downgrade/proration/effective time.",
        "Tính case 31/01 + một tháng; sửa bằng clamp ngày cuối tháng đích.",
        "Test 29/02 leap year, ngày 30/31 và UTC/timezone cho billing interval.",
        "Mô tả khoảng hở expired→failed→review nhưng manual settle từ chối non-pending.",
        "Thiết kế state/transition audited cho late payment: activate, credit hoặc refund.",
        "Xử lý underpay, overpay, tolerance và hoàn phần dư theo policy.",
        "Giải thích enum refunded không đồng nghĩa đã có refund workflow/provider.",
        "Đảm bảo payment và subscription rollback cùng nhau khi DB error."
      ]
    },
    {
      code: "SEC", topic: "11. Security, privacy & abuse prevention", type: "Scenario", questions: [
        "Lập threat model cho public calculator, auth callback, ledger, checkout, webhook, cron và admin.",
        "Rotate/revoke SePay key từng xuất hiện trong git, cập nhật secret manager và audit usage.",
        "Giải thích vì sao xóa key hiện tại hoặc thêm .gitignore không làm lịch sử an toàn.",
        "Phân biệt CSP/header defense với validation/authz/DB constraint.",
        "Nêu dữ liệu không log: Authorization, cookie, OAuth code, magic link, secret, raw contact.",
        "Thay in-memory limiter bằng Redis/Upstash atomic counter khi scale nhiều replica.",
        "Thiết kế quota/key riêng cho login, calculator, lead, webhook, cron và admin.",
        "Kiểm tra RLS policy cùng service owner check bằng integration test.",
        "Thiết kế audit admin settlement: actor, action, reason, before/after, correlation và timestamp.",
        "Không để raw webhook hoặc analytics trở thành kho PII/credential vô thời hạn."
      ]
    },
    {
      code: "TEST", topic: "12. Testing & evidence", type: "Practice", questions: [
        "Ghi evidence 2026-09-12: 13 test files, 108/108, lint, tsc và production build pass.",
        "Phân biệt unit test helper/decision với DB integration, route contract và E2E provider.",
        "Viết PostgreSQL test hai webhook song song chỉ settle một lần.",
        "Test unique idempotency key, memo collision và provider+providerRef anomaly.",
        "Inject lỗi subscription write để payment update rollback.",
        "Test ownership 404 cho business/payment và admin forbidden.",
        "Test lazy expiry race với webhook đến cùng thời điểm.",
        "Test month-end/leap-year billing interval sau khi sửa clamp.",
        "Dùng sample payload/header sandbox SePay làm contract fixture.",
        "E2E staging: login → checkout → webhook sandbox → subscription visible.",
        "Không gọi tính năng production-ready trước khi có runtime evidence tương ứng."
      ]
    },
    {
      code: "DEP", topic: "13. Deploy, observability & migration", type: "Scenario", questions: [
        "Thiết kế CI gate lint → type-check → unit/integration → build → scan.",
        "Build artifact/image bất biến theo commit và inject secret qua environment/secret manager.",
        "Review migration/backfill/index lock, backup và schema compatibility trước deploy.",
        "Thiết kế health/readiness và smoke auth, calculator, ledger, checkout sandbox.",
        "Lập rollback app tương thích migration forward-only; không reset DB production.",
        "Migration middleware→proxy theo guide đúng version và regression test.",
        "Log correlationId, paymentId và normalized decision nhưng mask providerRef/PII.",
        "Đặt metric pending age, auth failure, unmatched memo, underpay, duplicate, settle latency và review backlog.",
        "Tạo alert có threshold, owner và runbook; không chỉ dashboard đẹp.",
        "Nêu rõ Vercel Analytics/Speed Insights không thay backend payment observability."
      ]
    },
    {
      code: "INC", topic: "14. Tình huống phỏng vấn & vận hành", type: "Scenario", questions: [
        "Payment pending lâu: kiểm DB/memo/expiry/provider/webhook/admin trước UI polling.",
        "User chuyển đúng tiền nhưng content thiếu memo: đưa unmatched review, không ghép theo amount.",
        "Webhook duplicate liên tục: kiểm auth, providerRef unique, state transition và response semantics.",
        "Payment failed do expiry nhưng tiền đến muộn: không sửa SQL; dùng remediation audited.",
        "ProviderRef trùng memo khác gây 5xx: bắt anomaly, lưu review và trả outcome ổn định.",
        "Subscription hết sớm/muộn cuối tháng: tái hiện setUTCMonth overflow và sửa clamp.",
        "Hai checkout cùng key nhưng khác plan: kiểm request fingerprint và trả conflict.",
        "Cron email trùng: điều tra crash sau send trước mark-sent và delivery idempotency.",
        "Ledger thiếu/lặp entry khi cuộn: kiểm order tuple và cursor predicate.",
        "Tax result đổi sau release: so input snapshot, engine/legal version, rule diff và rounding.",
        "Public calculator bị spam: distributed limit, bot signal và privacy-safe monitoring.",
        "SePay contract thay field: quarantine payload, alert, adapter version và fixture mới.",
        "Supabase outage: xác định chức năng public nào degraded và không bypass auth cho ledger/payment.",
        "Admin xác nhận nhầm payment: giữ audit, đóng entitlement theo policy và không xóa history.",
        "Trả lời mọi case theo invariant → evidence → containment → root cause → fix → regression test."
      ]
    },
    {
      code: "GROW", topic: "15. Hướng cải tiến có ưu tiên", type: "Reflection", mandatory: false, questions: [
        "P0 rotate secret và xác minh SePay contract/sandbox thật.",
        "P1 sửa late-expiry transition, month-end billing và providerRef anomaly.",
        "P1 tách expiresAt, webhook event và manual review thành schema typed/auditable.",
        "P1 bổ sung PostgreSQL concurrency test và E2E payment sandbox.",
        "P2 chuyển rate limiter sang distributed store và thêm payment observability/runbook.",
        "P2 migration middleware→proxy cùng test auth/canonical redirect.",
        "Chỉ triển khai AI/OCR/báo cáo năm sau khi core data/payment reliable.",
        "Thiết kế recurring/refund/proration riêng với contract, idempotency và reconciliation trước khi quảng bá."
      ]
    },
    // CHECKLIST_MORE
  ];

  window.THEORY_EXTRA = (window.THEORY_EXTRA || []).concat(theoryTopics);
  window.QUIZ_DATA = (window.QUIZ_DATA || []).concat(quiz);

  var checklistItems = [];
  checklistGroups.forEach(function (group) {
    group.questions.forEach(function (question, index) {
      checklistItems.push({
        id: "STKD-" + group.code + "-" + String(index + 1).padStart(2, "0"),
        topic: group.topic,
        type: group.type || "Theory",
        question: question,
        priority: group.mandatory === false ? "" : "Mandatory"
      });
    });
  });
  window.CHECKLIST_DATA = (window.CHECKLIST_DATA || []).concat([
    { section: "Sổ Tay Kinh Doanh", items: checklistItems }
  ]);
})();
