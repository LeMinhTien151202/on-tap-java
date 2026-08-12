// Quiz khớp với 7 pill lý thuyết cốt lõi hạ tầng (Kafka, Redis, PostgreSQL, Docker, K8s, Observability, Resilience).
// Phương án sai được viết dài tương đương phương án đúng để không đoán được theo độ dài.
// Dùng: node tools/quiz_append.js tools/patch/quizInfraCore.js
const K = "Kafka nội tại";
const R = "Redis nội tại";
const P = "PostgreSQL nội tại";
const D = "Docker nền tảng";
const U = "Kubernetes nội tại";
const O = "Observability";
const S = "Resilience & Toolchain";

module.exports = [
// ---------------- KAFKA ----------------
{topic: K, question: "Điểm khác biệt cốt lõi giữa Kafka và một message queue truyền thống như RabbitMQ là gì?",
 options: [
  "Kafka ghi message vào log bền vững và consumer tự giữ offset, nên message không bị xóa khi đọc và có thể phát lại",
  "Kafka xóa message ngay sau khi consumer gửi ack, còn RabbitMQ giữ lại toàn bộ message trong bộ nhớ đệm dài hạn",
  "Kafka bắt buộc mỗi message chỉ được một consumer duy nhất trong toàn cụm đọc, còn RabbitMQ cho phép nhiều bên đọc",
  "Kafka lưu message trong RAM để đạt tốc độ cao, còn RabbitMQ luôn ghi mọi message xuống đĩa trước khi phản hồi"],
 correct: 0,
 explain: "Kafka là distributed commit log: broker chỉ ghi thêm vào cuối log, KHÔNG theo dõi ai đã đọc gì. Consumer tự nhớ offset. Nhờ đó message ở lại tới hết retention, nhiều consumer group đọc độc lập, và có thể reset offset để phát lại toàn bộ lịch sử."},

{topic: K, question: "Thứ tự message trong Kafka được bảo đảm ở phạm vi nào?",
 options: [
  "Chỉ trong một partition; muốn giữ thứ tự cho một thực thể thì phải dùng khóa để mọi message của nó vào cùng partition",
  "Trong toàn bộ topic, vì Kafka gán offset tăng dần trên toàn topic bất kể message nằm ở partition nào",
  "Trong một consumer group, vì group coordinator sắp xếp lại thứ tự message trước khi giao cho các consumer",
  "Trong một broker, vì mọi partition nằm trên cùng một broker đều được ghi tuần tự vào chung một file log"],
 correct: 0,
 explain: "Offset là duy nhất TRONG MỘT PARTITION, không phải toàn topic. Vì thế thứ tự chỉ được bảo đảm trong partition. Dùng key (ví dụ accountId) để hash(key) đưa mọi message của một thực thể vào cùng partition."},

{topic: K, question: "Vì sao Kafka đọc/ghi đĩa mà vẫn đạt thông lượng rất cao?",
 options: [
  "Ghi tuần tự append-only, tận dụng page cache của hệ điều hành thay vì heap JVM, và dùng zero-copy sendfile khi gửi cho consumer",
  "Kafka giữ toàn bộ dữ liệu trong heap JVM và chỉ ghi xuống đĩa theo chu kỳ nền nên gần như không có thao tác I/O đồng bộ",
  "Kafka dùng nhiều luồng ghi song song vào cùng một file log để chia nhỏ tải I/O trên tất cả các lõi CPU của máy chủ",
  "Kafka nén toàn bộ dữ liệu bằng zstd ở phía broker nên lượng byte thật sự phải ghi xuống đĩa giảm đi rất nhiều lần"],
 correct: 0,
 explain: "Ba lý do: ghi tuần tự (nhanh hơn ghi ngẫu nhiên rất nhiều), page cache của OS (nên broker Kafka nên có heap NHỎ 6-8GB), và zero-copy sendfile() gửi thẳng từ page cache ra network card. Lưu ý bật SSL sẽ vô hiệu hóa zero-copy."},

{topic: K, question: "High Watermark (HW) trong Kafka có ý nghĩa gì?",
 options: [
  "Là offset mà mọi replica trong ISR đều đã có; consumer chỉ đọc được tới đó nên dữ liệu đã đọc không biến mất khi đổi leader",
  "Là offset cuối cùng mà leader đã ghi vào log của mình, đánh dấu vị trí tiếp theo mà producer sẽ được phép ghi tiếp vào",
  "Là ngưỡng dung lượng tối đa của một partition, khi vượt qua thì Kafka bắt đầu xóa các segment cũ theo chính sách retention",
  "Là offset mà consumer group đã commit thành công vào topic __consumer_offsets sau khi xử lý xong toàn bộ batch trước đó"],
 correct: 0,
 explain: "HW = offset mà MỌI replica trong ISR đều đã có. Consumer chỉ đọc tới HW. LEO mới là offset kế tiếp sẽ ghi của từng replica. Nhờ HW, dữ liệu người dùng đọc được không bao giờ mất khi leader failover."},

{topic: K, question: "Cấu hình nào là công thức an toàn chuẩn cho dữ liệu quan trọng trong Kafka?",
 options: [
  "replication.factor=3, min.insync.replicas=2, acks=all — chịu được một broker chết mà vẫn ghi được và không mất dữ liệu",
  "replication.factor=3, min.insync.replicas=3, acks=all — mọi replica đều phải xác nhận nên độ bền dữ liệu là cao nhất có thể",
  "replication.factor=2, min.insync.replicas=1, acks=1 — cân bằng tốt giữa độ trễ thấp và khả năng chịu lỗi của toàn bộ cụm",
  "replication.factor=3, min.insync.replicas=2, acks=1 — leader xác nhận ngay còn việc nhân bản diễn ra ở nền sau đó"],
 correct: 0,
 explain: "RF=3 + min.insync=2 + acks=all chịu được 1 broker chết. Đặt min.insync.replicas=3 với RF=3 là sai lầm: chỉ cần một broker bảo trì là mọi lệnh ghi bị từ chối (NotEnoughReplicasException). acks=1 thì leader chết trước khi nhân bản là mất dữ liệu."},

{topic: K, question: "Consumer xử lý chậm gây rebalance liên tục. Nguyên nhân trực tiếp là timeout nào?",
 options: [
  "max.poll.interval.ms — vì heartbeat do luồng nền gửi nên xử lý chậm không mất heartbeat, mà là vượt khoảng cách giữa hai lần poll()",
  "session.timeout.ms — vì luồng xử lý bận nên không kịp gửi heartbeat tới group coordinator trong khoảng thời gian quy định",
  "heartbeat.interval.ms — vì nhịp gửi heartbeat bị giãn ra khi luồng chính đang bận xử lý một batch bản ghi quá lớn",
  "fetch.max.wait.ms — vì broker chờ đủ dữ liệu quá lâu khiến consumer bị coi là mất kết nối và bị loại khỏi consumer group"],
 correct: 0,
 explain: "Từ Kafka 0.10.1, heartbeat do LUỒNG NỀN RIÊNG gửi, nên xử lý chậm KHÔNG làm mất heartbeat. Vấn đề là vượt max.poll.interval.ms (mặc định 5 phút). Chữa theo thứ tự: giảm max.poll.records, tối ưu xử lý, đẩy việc nặng sang luồng khác."},

{topic: K, question: "Trong một consumer group, số consumer hữu ích tối đa bị giới hạn bởi cái gì?",
 options: [
  "Số partition của topic, vì mỗi partition chỉ được gán cho đúng một consumer trong group nên consumer dư sẽ ngồi không",
  "Số broker trong cụm, vì mỗi consumer phải được gán vào một broker riêng biệt để tránh tranh chấp kết nối mạng",
  "Giá trị của max.poll.records, vì tổng số bản ghi mỗi vòng poll quyết định bao nhiêu consumer chạy song song được",
  "Số replica của partition, vì mỗi consumer đọc từ một replica khác nhau để chia đều tải đọc trên toàn bộ các broker"],
 correct: 0,
 explain: "Quy tắc bất di bất dịch: trong một group, mỗi partition chỉ gán cho ĐÚNG MỘT consumer. Topic 3 partition mà chạy 5 consumer thì 2 cái ngồi không. Số partition chính là trần mở rộng — chọn dư dả ngay từ đầu."},

{topic: K, question: "CooperativeStickyAssignor khác gì so với các assignor eager kiểu cũ?",
 options: [
  "Rebalance tăng dần: consumer chỉ nhả những partition thật sự phải chuyển đi, phần còn lại vẫn tiếp tục xử lý bình thường",
  "Nó phân công partition đều tuyệt đối cho mọi consumer bằng cách tính lại toàn bộ ánh xạ theo thuật toán vòng tròn có trọng số",
  "Nó cho phép nhiều consumer trong cùng một group cùng đọc chung một partition, tăng thông lượng xử lý lên nhiều lần",
  "Nó lưu trạng thái phân công vào topic __consumer_offsets nên sau khi rebalance consumer nhận lại đúng partition trước đó"],
 correct: 0,
 explain: "Eager assignor là 'stop the world': TẤT CẢ consumer nhả HẾT partition rồi chờ phân công lại. Cooperative rebalance tăng dần, chỉ chuyển partition cần chuyển, không có khoảng chết toàn cục. Kết hợp với static membership (group.instance.id) trên K8s càng tốt."},

{topic: K, question: "'Exactly-once' của Kafka có phạm vi áp dụng như thế nào?",
 options: [
  "Chỉ trong phạm vi Kafka; nếu consumer ghi xuống PostgreSQL hoặc gọi API bên thứ ba thì Kafka không bảo đảm được gì cho chúng",
  "Áp dụng cho mọi hệ thống mà consumer tương tác, vì transaction của Kafka mở rộng được sang cả cơ sở dữ liệu quan hệ bên ngoài",
  "Chỉ áp dụng cho producer khi bật idempotence, còn phía consumer thì luôn luôn là at-least-once không có cách nào thay đổi",
  "Áp dụng khi consumer đặt isolation.level=read_committed, kể cả với các thao tác ghi ra hệ thống lưu trữ ngoài Kafka"],
 correct: 0,
 explain: "EOS của Kafka chỉ trong phạm vi Kafka (consume-process-produce). Ranh giới transaction không vượt qua biên giới hệ thống. Giải pháp thực tế: at-least-once + idempotency ở tầng nghiệp vụ (bảng processed_events khóa chính eventId, mẫu Inbox)."},

{topic: K, question: "Tombstone trong topic có cleanup.policy=compact là gì?",
 options: [
  "Bản ghi có khóa cần xóa và giá trị null; sau compaction mọi bản cũ của khóa biến mất, consumer bắt buộc phải xử lý được null",
  "Bản ghi đánh dấu kết thúc một segment, giúp Kafka biết vị trí nào an toàn để bắt đầu quá trình nén log ở tiến trình nền",
  "Bản ghi đặc biệt do broker sinh ra khi retention hết hạn, dùng để thông báo cho mọi consumer group rằng dữ liệu đã bị xóa",
  "Bản ghi có giá trị rỗng chuỗi được producer gửi để giữ khóa sống lâu hơn trong log mà không cần ghi lại toàn bộ giá trị"],
 correct: 0,
 explain: "Tombstone = khóa cần xóa + giá trị NULL. Sau compaction, mọi bản ghi cũ của khóa biến mất; tombstone giữ thêm delete.retention.ms (mặc định 24h) để consumer kịp thấy. Consumer PHẢI xử lý null, nếu không sẽ NullPointerException."},

{topic: K, question: "Vì sao message không xử lý được lại nguy hiểm hơn tưởng tượng trong Kafka?",
 options: [
  "Consumer đọc lại chính message đó mãi và không tiến offset, làm toàn bộ partition phía sau nó đứng im — gọi là poison pill",
  "Message lỗi bị broker tự động nhân bản sang tất cả các partition khác trong topic, làm lan lỗi ra toàn bộ dòng dữ liệu",
  "Message lỗi làm consumer group bị loại khỏi cụm ngay lập tức và mọi consumer khác trong group cũng bị ngắt kết nối theo",
  "Message lỗi khiến Kafka tự động tăng retention của toàn bộ topic lên vô hạn để giữ lại dữ liệu phục vụ việc điều tra sau"],
 correct: 0,
 explain: "Poison pill: không commit offset thì consumer đọc lại mãi message đó, TOÀN BỘ partition đứng im. Chữa bằng: phân loại lỗi tạm thời vs vĩnh viễn, retry có backoff, và Dead Letter Topic kèm headers ngữ cảnh."},

{topic: K, question: "KRaft mang lại lợi ích cụ thể nào so với kiến trúc dùng ZooKeeper?",
 options: [
  "Controller mới đã có sẵn metadata trong bộ nhớ vì vẫn theo dõi log liên tục, nên chuyển controller gần như tức thời",
  "Metadata được ghi đồng thời vào cả ZooKeeper lẫn topic nội bộ nên có hai bản sao độc lập, tăng độ bền cho toàn cụm",
  "Mỗi broker tự giữ một bản metadata riêng và tự bầu leader cho partition của mình mà không cần bất kỳ controller nào",
  "ZooKeeper vẫn chạy nhưng chỉ dùng cho ACL và cấu hình, còn việc bầu leader partition được chuyển sang giao thức Raft"],
 correct: 0,
 explain: "Với ZooKeeper, controller mới phải NẠP LẠI toàn bộ metadata — với cụm hàng chục nghìn partition mất hàng phút. KRaft lưu metadata trong topic __cluster_metadata; broker theo dõi liên tục nên failover tức thì. ZooKeeper bị gỡ hẳn ở Kafka 4.0."},

// ---------------- REDIS ----------------
{topic: R, question: "Redis xử lý lệnh theo mô hình nào và hệ quả quan trọng nhất là gì?",
 options: [
  "Đơn luồng thực thi lệnh nên mọi lệnh nguyên tử tự nhiên, nhưng một lệnh chậm sẽ làm đứng toàn bộ server với mọi client",
  "Đa luồng với một luồng cho mỗi kết nối client, nên cần dùng khóa nội bộ để bảo đảm tính nguyên tử của các lệnh ghi",
  "Đơn luồng nhưng mỗi lệnh chạy trong một sandbox riêng biệt, nên lệnh chậm chỉ ảnh hưởng đúng client đã gửi lệnh đó",
  "Đa luồng với một pool cố định các luồng thực thi, nên số lệnh chạy song song bằng đúng số lõi CPU của máy chủ Redis"],
 correct: 0,
 explain: "Redis thực thi lệnh trên MỘT luồng (I/O threads từ Redis 6 chỉ lo đọc/ghi socket). Nhờ vậy mọi lệnh nguyên tử tự nhiên. Nhưng KEYS *, FLUSHALL, DEL tập lớn sẽ chặn cả server — dùng SCAN thay KEYS, UNLINK thay DEL."},

{topic: R, question: "Cấu trúc dữ liệu nào của Redis phù hợp nhất để làm bảng xếp hạng hoặc đếm giao dịch trong cửa sổ trượt?",
 options: [
  "Sorted Set (ZSET), vì mỗi phần tử có điểm số và tập luôn được sắp theo điểm, thao tác theo khoảng điểm là O(log n)",
  "List, vì thêm và xóa ở hai đầu đều là O(1) nên có thể duy trì một cửa sổ dữ liệu trượt theo thời gian rất hiệu quả",
  "Hash, vì có thể lưu điểm số của từng phần tử vào một trường riêng và cập nhật nguyên tử bằng lệnh HINCRBY nhanh chóng",
  "HyperLogLog, vì nó đếm được số phần tử khác nhau với sai số nhỏ trong khi chỉ tốn khoảng 12KB bộ nhớ cố định"],
 correct: 0,
 explain: "ZSET là cấu trúc mạnh nhất của Redis: score + tự sắp xếp, cài bằng skip list. Dùng cho leaderboard, hàng đợi ưu tiên, lập lịch (score = timestamp), và sliding window rate limiting với ZREMRANGEBYSCORE + ZCARD."},

{topic: R, question: "Redis xóa khóa hết hạn bằng cơ chế nào?",
 options: [
  "Kết hợp lazy (kiểm tra khi có ai truy cập) và active (lấy ngẫu nhiên 20 khóa có TTL mỗi chu kỳ), nên bộ nhớ thu hồi có độ trễ",
  "Một tiến trình nền quét toàn bộ keyspace theo chu kỳ cố định và xóa chính xác mọi khóa đã vượt quá thời điểm hết hạn",
  "Xóa ngay tại thời điểm TTL kết thúc nhờ một hàng đợi ưu tiên sắp theo thời gian hết hạn của tất cả khóa trong database",
  "Chỉ xóa khi bộ nhớ chạm ngưỡng maxmemory, trước đó mọi khóa hết hạn vẫn tồn tại đầy đủ và vẫn đọc được bình thường"],
 correct: 0,
 explain: "Hai cơ chế đồng thời: LAZY (kiểm tra khi truy cập) và ACTIVE (lấy NGẪU NHIÊN 20 khóa có TTL, nếu >25% hết hạn thì lặp lại ngay). Đây là thuật toán xác suất, cố ý không quét toàn bộ để không chặn server. Nên RAM giảm có độ trễ."},

{topic: R, question: "Redis dùng làm cache thuần thì nên đặt maxmemory-policy là gì và vì sao?",
 options: [
  "allkeys-lru hoặc allkeys-lfu, vì mặc định noeviction sẽ từ chối mọi lệnh ghi với lỗi OOM khi bộ nhớ chạm ngưỡng",
  "noeviction, vì đây là mặc định an toàn giúp phát hiện sớm việc thiếu bộ nhớ thay vì âm thầm loại bỏ dữ liệu quan trọng",
  "volatile-ttl, vì nó ưu tiên loại bỏ những khóa sắp hết hạn trước nên luôn giữ lại được phần dữ liệu nóng của ứng dụng",
  "allkeys-random, vì việc chọn ngẫu nhiên tốn ít CPU nhất và cho phân bố loại bỏ đều trên toàn bộ không gian khóa"],
 correct: 0,
 explain: "Mặc định noeviction sẽ TỪ CHỐI ghi (lỗi OOM) khi đầy — nhiều sự cố 'Redis ngừng ghi' đến từ việc để nguyên mặc định. Cache thuần nên dùng allkeys-lfu (tốt hơn LRU vì không bị một đợt quét bất thường đẩy hết dữ liệu nóng ra)."},

{topic: R, question: "Chỉ số mem_fragmentation_ratio nhỏ hơn 1 nghĩa là gì?",
 options: [
  "Redis đang bị tráo ra swap — tình huống tệ nhất, hiệu năng sụp đổ hoàn toàn vì mỗi truy cập phải đọc từ đĩa",
  "Bộ nhớ đang được nén rất hiệu quả nhờ các mã hóa nội bộ như listpack và intset, đây là dấu hiệu cấu hình tối ưu",
  "Redis chưa dùng hết maxmemory nên còn nhiều dư địa, có thể tăng thêm dữ liệu mà chưa cần lo tới chính sách eviction",
  "Có nhiều khóa đã hết hạn nhưng chưa được thu hồi, cần chạy thủ công lệnh dọn dẹp để giải phóng phần bộ nhớ đó"],
 correct: 0,
 explain: "mem_fragmentation_ratio = rss / used_memory. Trên 1.5 là phân mảnh nặng (cân nhắc activedefrag yes). DƯỚI 1 nghĩa là đang bị SWAP — tệ nhất với Redis. Quy tắc: đặt maxmemory khoảng 60-70% RAM máy."},

{topic: R, question: "MULTI/EXEC của Redis khác transaction SQL ở điểm quan trọng nào?",
 options: [
  "Không có rollback: lệnh lỗi lúc chạy không hủy các lệnh khác trong khối, và không thể đọc kết quả giữa chừng để rẽ nhánh",
  "Không bảo đảm tính nguyên tử: các lệnh của client khác vẫn có thể chen vào giữa MULTI và EXEC nếu server đang bận",
  "Không hỗ trợ nhiều khóa: mọi lệnh trong một khối MULTI bắt buộc phải thao tác trên đúng một khóa duy nhất mà thôi",
  "Không bền vững: các thay đổi trong khối MULTI chỉ nằm trong bộ nhớ và không bao giờ được ghi vào AOF hay RDB"],
 correct: 0,
 explain: "MULTI/EXEC CÓ tính nguyên tử (không bị chen ngang) nhưng KHÔNG CÓ ROLLBACK — lệnh 3 lỗi thì 1,2,4,5 vẫn chạy. Và không đọc-rồi-rẽ-nhánh được. Cần logic nguyên tử thì dùng LUA (EVAL), đó là lý do mọi khóa phân tán nghiêm túc đều dùng Lua."},

{topic: R, question: "Vì sao khóa phân tán Redis phải dùng token ngẫu nhiên khi nhả khóa?",
 options: [
  "Nếu không, tiến trình chạy quá TTL sẽ xóa mất khóa mà tiến trình khác vừa giành được, khiến nhiều tiến trình cùng chạy",
  "Nếu không, Redis sẽ từ chối lệnh DEL vì khóa đã được đặt bởi một kết nối khác với kết nối đang thực hiện việc nhả khóa",
  "Nếu không, khóa sẽ không bao giờ hết hạn được vì Redis cần một định danh duy nhất để gắn TTL cho từng khóa riêng biệt",
  "Nếu không, các replica của Redis sẽ nhận được lệnh xóa theo thứ tự khác nhau và trạng thái khóa sẽ bị lệch giữa các node"],
 correct: 0,
 explain: "Kịch bản: A giành khóa TTL 30s nhưng xử lý 35s. Giây 30 khóa hết hạn, B giành được. Giây 35 A gọi DEL và XÓA MẤT KHÓA CỦA B. Phải kiểm tra token rồi mới xóa, và hai việc đó phải nguyên tử nên bắt buộc dùng Lua."},

{topic: R, question: "Cache penetration là gì và cách chống đơn giản nhất?",
 options: [
  "Truy vấn liên tục các khóa không tồn tại nên cache luôn miss; chống bằng cách cache cả giá trị rỗng với TTL ngắn",
  "Nhiều khóa hết hạn cùng lúc gây dồn tải xuống DB; chống bằng cách cộng thêm khoảng ngẫu nhiên vào thời gian sống",
  "Một khóa nóng hết hạn khiến hàng nghìn request cùng truy vấn DB; chống bằng khóa xây lại để chỉ một request đi xuống",
  "Dữ liệu trong cache bị lệch so với DB do hai lần ghi đồng thời; chống bằng cách xóa cache thay vì cập nhật cache"],
 correct: 0,
 explain: "Penetration = truy vấn khóa KHÔNG TỒN TẠI, cache luôn miss, DB luôn bị hỏi (kẻ tấn công gọi /api/account/-999 liên tục). Chống: cache giá trị rỗng TTL ngắn 30-60s, Bloom filter, và validate tham số ở tầng API. Ba khái niệm stampede/penetration/avalanche khác nhau."},

{topic: R, question: "Sau khi ghi DB, nên xóa cache hay cập nhật cache?",
 options: [
  "Xóa, vì hai request ghi đồng thời có thể cập nhật cache theo thứ tự ngược với thứ tự ghi DB, để lại dữ liệu sai vĩnh viễn",
  "Cập nhật, vì nó tránh được một lần cache miss ở request đọc tiếp theo nên giảm được tải xuống cơ sở dữ liệu phía sau",
  "Xóa, vì lệnh xóa của Redis chạy nhanh hơn lệnh ghi nhiều lần nên giảm được độ trễ của toàn bộ thao tác cập nhật",
  "Cập nhật, vì như vậy cache và DB luôn đồng bộ tuyệt đối tại mọi thời điểm, loại bỏ hoàn toàn khả năng đọc dữ liệu cũ"],
 correct: 0,
 explain: "Luôn XÓA (invalidate), đừng CẬP NHẬT. Hai request ghi đồng thời có thể ghi vào cache theo thứ tự ngược với thứ tự ghi DB, để lại dữ liệu sai VĨNH VIỄN. Xóa thì lần đọc sau tự nạp lại đúng."},

{topic: R, question: "Thuật toán rate limiting fixed window có nhược điểm nghiêm trọng nào?",
 options: [
  "Hiệu ứng biên: 100 request ở giây 59 và 100 ở giây 01 phút sau tạo ra 200 request trong 2 giây mà vẫn được coi là hợp lệ",
  "Tốn bộ nhớ tỉ lệ với số request chứ không phải số người dùng, nên giới hạn lớn sẽ làm bộ nhớ Redis phình lên rất nhanh",
  "Không cho phép burst nên người dùng thật thao tác theo cụm sẽ bị chặn oan dù tốc độ trung bình vẫn dưới ngưỡng",
  "Cần chạy nhiều lệnh riêng lẻ nên không nguyên tử được, người dùng luôn vượt được giới hạn khi hệ thống có tải cao"],
 correct: 0,
 explain: "Hiệu ứng biên khiến fixed window thực tế cho phép GẤP ĐÔI giới hạn. Sliding window log chính xác nhưng tốn bộ nhớ theo số request. Sliding window counter là điểm cân bằng tốt. Token bucket cho phép burst — thường là hành vi đúng cho API."},

{topic: R, question: "Redis Cluster có hạn chế nào cần nhớ khi thiết kế khóa?",
 options: [
  "Lệnh nhiều khóa chỉ chạy khi các khóa cùng hash slot, phải dùng hash tag đặt phần chung trong ngoặc nhọn để ép cùng slot",
  "Mỗi node chỉ giữ được tối đa 16384 khóa, vượt qua thì phải thêm node mới và thực hiện resharding lại toàn bộ cụm",
  "Không hỗ trợ TTL trên khóa vì việc đồng bộ thời điểm hết hạn giữa các node trong cụm không thể bảo đảm chính xác",
  "Mọi lệnh ghi phải đi qua node đầu tiên của cụm rồi mới được phân phối tới các node còn lại theo cơ chế nhân bản"],
 correct: 0,
 explain: "16384 hash slot chia cho các master; slot = CRC16(key) mod 16384. Lệnh nhiều khóa (MGET, Lua nhiều KEYS) chỉ chạy khi cùng slot. Hash tag: acc:{1001}:balance và acc:{1001}:profile chắc chắn cùng slot. Ngoài ra chỉ có database 0."},

{topic: R, question: "Vì sao nên đặt timeout NGẮN cho lệnh Redis trong Spring Boot?",
 options: [
  "Vì Redis chậm mà timeout dài sẽ làm mọi luồng ứng dụng kẹt ở đó, biến cache lẽ ra để tăng tốc thành thứ kéo sập hệ thống",
  "Vì Redis đơn luồng nên lệnh chờ quá lâu sẽ bị chính server hủy bỏ và trả về lỗi, timeout dài chỉ làm client chờ vô ích",
  "Vì Lettuce dùng một kết nối chung cho mọi luồng nên timeout dài sẽ làm kết nối đó bị khóa và chặn toàn bộ luồng khác",
  "Vì timeout dài khiến pool kết nối nhanh chóng cạn kiệt và các request mới sẽ không lấy được kết nối nào từ pool nữa"],
 correct: 0,
 explain: "Timeout ngắn (vài trăm ms) là bắt buộc. Redis chậm + timeout dài = mọi luồng ứng dụng kẹt. Kèm theo phải có suy giảm mềm (CacheErrorHandler) để Redis chết thì rơi về DB chứ không ném lỗi ra người dùng."},

// ---------------- POSTGRESQL ----------------
{topic: P, question: "PostgreSQL dùng mô hình xử lý kết nối nào?",
 options: [
  "Mỗi kết nối là một tiến trình HĐH riêng do postmaster fork ra, tốn 5-10MB nên nhiều client thì cần PgBouncer",
  "Mỗi kết nối là một luồng trong tiến trình chính, chia sẻ chung bộ nhớ nên chi phí tạo kết nối gần như không đáng kể",
  "Một pool tiến trình cố định phục vụ luân phiên mọi kết nối, nên số kết nối đồng thời không bị giới hạn bởi bộ nhớ",
  "Mô hình event loop không chặn giống Node.js, một tiến trình duy nhất xử lý được hàng nghìn kết nối đồng thời"],
 correct: 0,
 explain: "Postgres dùng ĐA TIẾN TRÌNH, không phải đa luồng (khác MySQL/InnoDB). Mỗi kết nối một tiến trình HĐH, tốn 5-10MB. Đây là lý do PgBouncer gần như bắt buộc khi có nhiều instance ứng dụng."},

{topic: P, question: "Trong PostgreSQL, câu lệnh UPDATE thực chất làm gì ở tầng lưu trữ?",
 options: [
  "Đánh dấu tuple cũ bằng cách đặt xmax rồi CHÈN một tuple mới, nên mọi index trên bảng đều phải cập nhật theo",
  "Ghi đè trực tiếp giá trị mới lên vị trí cũ trong trang dữ liệu, chỉ index của cột bị sửa mới cần được cập nhật lại",
  "Ghi giá trị cũ vào một vùng undo riêng rồi sửa tại chỗ, nên việc rollback chỉ cần chép ngược lại từ vùng undo đó",
  "Xóa hẳn dòng cũ khỏi trang rồi chèn dòng mới vào cuối bảng, giải phóng ngay không gian mà dòng cũ đang chiếm giữ"],
 correct: 0,
 explain: "MVCC: UPDATE KHÔNG sửa tại chỗ — đặt xmax cho tuple cũ và CHÈN tuple mới (ctid đổi). Hệ quả: bloat, và MỌI index phải cập nhật kể cả khi sửa cột không có index. HOT update giảm nhẹ điều này nếu cột sửa không có index và trang còn chỗ."},

{topic: P, question: "Vì sao transaction chạy dài là kẻ thù của PostgreSQL?",
 options: [
  "Chừng nào nó còn chạy, VACUUM không được dọn các tuple mà nó có thể còn cần thấy, khiến database phình lên không kiểm soát",
  "Nó giữ khóa độc quyền trên mọi bảng đã truy cập, chặn hoàn toàn các transaction khác muốn đọc từ những bảng đó",
  "Nó chiếm dụng toàn bộ shared_buffers khiến các kết nối khác phải đọc trực tiếp từ đĩa thay vì từ bộ nhớ đệm chung",
  "Nó làm WAL không thể checkpoint được nên file nhật ký phình lên liên tục cho tới khi đầy toàn bộ dung lượng đĩa"],
 correct: 0,
 explain: "VACUUM không được phép dọn tuple mà một transaction cũ có thể còn cần thấy. Một câu báo cáo chạy 6 tiếng có thể làm cả database phình lên. Luôn giám sát pg_stat_activity tìm 'idle in transaction'."},

{topic: P, question: "VACUUM FULL khác VACUUM thường ở điểm nào?",
 options: [
  "Nó viết lại toàn bộ bảng và thu hồi dung lượng cho HĐH, nhưng lấy khóa ACCESS EXCLUSIVE khóa hoàn toàn bảng đó",
  "Nó chạy song song trên nhiều worker nên nhanh hơn nhiều lần, đồng thời vẫn cho phép đọc ghi bình thường trong lúc chạy",
  "Nó thu thập lại thống kê cho planner ngoài việc dọn tuple chết, nên thay thế được cả việc chạy ANALYZE riêng biệt",
  "Nó chỉ dọn các tuple chết nằm ở cuối file dữ liệu và cắt ngắn file, nên nhanh hơn nhưng thu hồi được ít dung lượng hơn"],
 correct: 0,
 explain: "VACUUM thường: đánh dấu không gian tái sử dụng được, KHÔNG khóa bảng, KHÔNG trả dung lượng cho HĐH. VACUUM FULL: viết lại bảng, thu hồi thật, nhưng KHÓA HOÀN TOÀN. Không bao giờ chạy trên production giờ cao điểm — dùng pg_repack."},

{topic: P, question: "Index phức hợp (a, b, c) trong PostgreSQL phục vụ được truy vấn nào?",
 options: [
  "Truy vấn lọc theo (a), (a,b), (a,b,c) — theo quy tắc tiền tố trái; không phục vụ truy vấn chỉ lọc theo (b) hoặc (c)",
  "Mọi tổ hợp của ba cột đó, vì Postgres tự sắp xếp lại thứ tự điều kiện trong mệnh đề WHERE trước khi tra cứu index",
  "Chỉ truy vấn lọc đồng thời cả ba cột (a,b,c), vì index phức hợp lưu giá trị nối của cả ba cột thành một khóa duy nhất",
  "Truy vấn lọc theo (c), (b,c), (a,b,c) — theo quy tắc hậu tố phải, vì cột cuối cùng là cột được sắp xếp ngoài cùng"],
 correct: 0,
 explain: "Quy tắc tiền tố trái: index (a,b,c) phục vụ (a), (a,b), (a,b,c) — KHÔNG phục vụ truy vấn chỉ theo (b) hay (c). Thứ tự cột phải theo cách truy vấn: cột lọc bằng '=' đặt trước, cột lọc theo khoảng đặt sau."},

{topic: P, question: "BRIN index phù hợp nhất cho trường hợp nào?",
 options: [
  "Bảng rất lớn có dữ liệu tương quan với thứ tự vật lý, như cột created_at của bảng append-only — index nhỏ đến kinh ngạc",
  "Cột JSONB cần truy vấn theo toán tử chứa, vì BRIN lưu được cấu trúc lồng nhau của tài liệu một cách rất tiết kiệm",
  "Cột có rất ít giá trị khác nhau như status hay type, vì BRIN gom các dòng cùng giá trị lại thành một mục duy nhất",
  "Cột dùng cho ràng buộc EXCLUDE trên khoảng thời gian, vì BRIN lưu được giá trị nhỏ nhất và lớn nhất của khoảng đó"],
 correct: 0,
 explain: "BRIN chỉ lưu min/max cho mỗi nhóm trang → vài trăm KB cho bảng hàng trăm GB. Hoàn hảo cho created_at của bảng append-only (thứ tự vật lý gần trùng thứ tự giá trị). Vô dụng nếu dữ liệu xáo trộn. JSONB thì dùng GIN, khoảng thì dùng GiST."},

{topic: P, question: "Khi đọc EXPLAIN ANALYZE, dấu hiệu nào cho thấy thống kê của planner có vấn đề?",
 options: [
  "Số rows ước lượng lệch số rows thực tế từ 100 lần trở lên, thường dẫn tới chọn nhầm nested loop cho tập dữ liệu lớn",
  "Xuất hiện Seq Scan thay vì Index Scan, vì quét tuần tự luôn là dấu hiệu planner đã bỏ qua index có sẵn trên bảng",
  "Planning Time lớn hơn Execution Time, cho thấy planner đã mất quá nhiều thời gian để cân nhắc các kế hoạch khả dĩ",
  "Giá trị cost của node gốc lớn hơn tổng cost của các node con, cho thấy chi phí đã bị tính trùng ở nhiều tầng khác nhau"],
 correct: 0,
 explain: "So sánh rows ƯỚC LƯỢNG với rows THỰC TẾ — lệch ≥100 lần là dấu hiệu rõ nhất của thống kê sai. Seq Scan KHÔNG phải lúc nào cũng xấu (lấy 50% số dòng thì nó nhanh hơn index). Chú ý cả 'loops' và 'Sort Method: external merge Disk'."},

{topic: P, question: "SELECT ... FOR UPDATE SKIP LOCKED dùng để làm gì?",
 options: [
  "Làm hàng đợi công việc bằng bảng SQL: nhiều worker cùng lấy việc mà không giẫm chân nhau và không phải chờ khóa",
  "Bỏ qua việc lấy khóa hoàn toàn để tăng tốc đọc, chấp nhận rằng dữ liệu đọc được có thể đã bị transaction khác sửa đổi",
  "Khóa toàn bộ bảng thay vì từng dòng, giúp tránh deadlock khi nhiều transaction cùng cập nhật nhiều dòng một lúc",
  "Chờ tối đa một khoảng thời gian ngắn rồi bỏ qua nếu dòng vẫn bị khóa, thay vì ném lỗi ngay như NOWAIT vẫn làm"],
 correct: 0,
 explain: "SKIP LOCKED BỎ QUA dòng đang bị khóa (khác NOWAIT là ném lỗi ngay). Đây là cách chuẩn để làm job queue bằng SQL: nhiều worker cùng SELECT ... FOR UPDATE SKIP LOCKED LIMIT 10 và mỗi worker lấy được lô riêng."},

{topic: P, question: "Cách phòng deadlock quan trọng nhất khi cập nhật nhiều dòng là gì?",
 options: [
  "Luôn lấy khóa theo một thứ tự nhất quán, ví dụ luôn khóa dòng có id nhỏ trước, để hai transaction không chờ vòng tròn",
  "Đặt isolation level lên SERIALIZABLE, vì mức này dùng SSI theo dõi phụ thuộc đọc ghi nên loại bỏ hoàn toàn deadlock",
  "Giảm deadlock_timeout xuống thật thấp để Postgres phát hiện và hủy transaction bị kẹt trước khi nó ảnh hưởng tới hệ thống",
  "Luôn dùng SELECT FOR UPDATE NOWAIT để transaction thất bại ngay thay vì chờ, rồi thử lại toàn bộ từ đầu sau đó"],
 correct: 0,
 explain: "Thứ tự khóa nhất quán (ORDER BY id trong SELECT FOR UPDATE) là cách phòng deadlock quan trọng nhất. Chuyển tiền A→B và B→A đồng thời là ví dụ kinh điển. SERIALIZABLE không loại bỏ deadlock — nó thêm lỗi serialization cần retry."},

{topic: P, question: "Vì sao pool kết nối NHỎ thường cho thông lượng cao hơn pool lớn?",
 options: [
  "Vì Postgres chỉ chạy song song được số truy vấn xấp xỉ số lõi; kết nối dư chỉ tạo tranh chấp và chuyển ngữ cảnh",
  "Vì mỗi kết nối trong pool tiêu tốn một lượng bộ nhớ heap của ứng dụng nên pool lớn làm JVM phải chạy GC thường xuyên hơn",
  "Vì HikariCP phải quét toàn bộ pool để tìm kết nối rảnh nên pool càng lớn thì thời gian lấy được một kết nối càng lâu",
  "Vì Postgres giới hạn cứng số kết nối đồng thời ở mức max_connections nên pool lớn sẽ liên tục bị từ chối kết nối mới"],
 correct: 0,
 explain: "Nghịch lý quan trọng: pool NHỎ (10-20, công thức (lõi × 2) + số đĩa) thường cho thông lượng CAO HƠN. Postgres chỉ song song được xấp xỉ số lõi; 500 kết nối chỉ tạo tranh chấp và chuyển ngữ cảnh."},

{topic: P, question: "PgBouncer ở chế độ transaction có hạn chế nào cần biết?",
 options: [
  "Không dùng được prepared statement phía server, LISTEN/NOTIFY, biến session hay advisory lock giữ qua nhiều transaction",
  "Không dùng được transaction dài quá vài giây vì kết nối server sẽ bị thu hồi cưỡng bức và transaction bị rollback",
  "Không dùng được với ứng dụng có nhiều instance vì mỗi instance cần một PgBouncer riêng để tránh xung đột kết nối",
  "Không dùng được các câu lệnh DDL như CREATE TABLE hay ALTER TABLE vì chúng cần giữ kết nối suốt cả phiên làm việc"],
 correct: 0,
 explain: "Chế độ transaction trả kết nối server sau MỖI transaction — hiệu quả nhất nhưng mất prepared statement phía server, LISTEN/NOTIFY, biến session. Với JDBC phải đặt prepareThreshold=0, nếu không sẽ gặp lỗi rất khó hiểu."},

{topic: P, question: "Đâu là sai lầm nghiêm trọng và phổ biến với @Transactional và connection pool?",
 options: [
  "Bọc cả lời gọi HTTP ra dịch vụ ngoài trong transaction, giữ kết nối DB suốt vài giây chờ mạng mà không làm gì với nó",
  "Đặt @Transactional ở tầng service thay vì tầng repository, khiến mỗi thao tác đọc cũng phải mở một transaction riêng",
  "Dùng @Transactional(readOnly = true) cho truy vấn đọc, vì cờ này vẫn giữ kết nối lâu hơn so với truy vấn không transaction",
  "Đặt maximum-pool-size nhỏ hơn số luồng xử lý của Tomcat, khiến một số request phải chờ mới lấy được kết nối từ pool"],
 correct: 0,
 explain: "Giữ kết nối DB trong lúc chờ mạng ngoài là sai lầm nghiêm trọng và rất phổ biến — nó làm cạn pool và gây lỗi 'Connection is not available'. Đúng: transaction ngắn để đọc, gọi API NGOÀI transaction, rồi transaction ngắn để ghi."},

{topic: P, question: "Partitioning bảng trong PostgreSQL có ràng buộc thiết kế nào quan trọng?",
 options: [
  "Khóa chính bắt buộc phải chứa cột phân vùng, và truy vấn không lọc theo khóa phân vùng sẽ phải quét mọi phân vùng",
  "Mỗi phân vùng phải nằm trên một tablespace riêng biệt, nên cần chuẩn bị sẵn nhiều ổ đĩa trước khi tạo bảng phân vùng",
  "Không thể tạo index riêng cho từng phân vùng, mọi index phải được định nghĩa ở mức bảng cha và áp dụng cho tất cả",
  "Số phân vùng phải cố định ngay khi tạo bảng, muốn thêm phân vùng mới thì phải tạo lại toàn bộ bảng từ đầu"],
 correct: 0,
 explain: "Khóa chính PHẢI chứa cột phân vùng — hệ quả rất quan trọng cho thiết kế (PRIMARY KEY (id, created_at)). Lợi ích lớn nhất: DROP TABLE một phân vùng là tức thì, thay vì DELETE hàng chục triệu dòng tạo hàng chục triệu tuple chết."},

// ---------------- DOCKER ----------------
{topic: D, question: "Container thực chất là gì ở mức hệ điều hành?",
 options: [
  "Một tiến trình Linux bình thường bị giới hạn tầm nhìn bằng namespaces và giới hạn tài nguyên bằng cgroups",
  "Một máy ảo thu nhỏ có nhân riêng được hypervisor mô phỏng, nhưng chỉ nạp các thành phần tối thiểu để khởi động nhanh",
  "Một tiến trình chạy trong sandbox do Docker Engine mô phỏng, mọi lời gọi hệ thống đều bị Docker chặn và dịch lại",
  "Một tập hợp các tiến trình chia sẻ một hệ thống tệp riêng, được cách ly hoàn toàn khỏi nhân của máy chủ vật lý"],
 correct: 0,
 explain: "Container CHỈ LÀ một tiến trình Linux — chạy ps trên máy chủ sẽ thấy nó. Ba trụ cột: namespaces (giới hạn tầm nhìn), cgroups (giới hạn tài nguyên), union filesystem (chia sẻ layer). Nó DÙNG CHUNG NHÂN với máy chủ, đó là lý do cách ly yếu hơn VM."},

{topic: D, question: "Trong Dockerfile cho ứng dụng Java, vì sao nên copy pom.xml trước rồi mới copy src?",
 options: [
  "Vì một lớp mất cache thì mọi lớp sau cũng mất; tách như vậy thì sửa code không phải tải lại toàn bộ thư viện Maven",
  "Vì Maven yêu cầu pom.xml phải tồn tại trong thư mục làm việc trước khi bất kỳ file mã nguồn nào được đưa vào image",
  "Vì lớp chứa mã nguồn phải nằm trên cùng của chồng lớp để giai đoạn runtime có thể copy nó ra một cách nhanh chóng",
  "Vì như vậy Docker sẽ nén hai lớp đó lại thành một lớp duy nhất, giảm đáng kể kích thước cuối cùng của toàn bộ image"],
 correct: 0,
 explain: "Quy tắc cache quan trọng nhất: một lớp mất cache thì MỌI lớp sau cũng mất. Đặt thứ ÍT thay đổi (pom.xml, dependency) lên trước, thứ HAY thay đổi (src) xuống sau. Kết hợp .dockerignore để tránh mất cache oan."},

{topic: D, question: "Vì sao xóa file ở một lớp Dockerfile sau không làm giảm kích thước image?",
 options: [
  "Vì lớp trước vẫn còn nguyên trong chồng lớp; phải cài đặt và dọn dẹp trong CÙNG một lệnh RUN mới thật sự giảm được",
  "Vì Docker chỉ tính kích thước image theo lớp lớn nhất chứ không cộng dồn, nên xóa ở lớp nào cũng không thay đổi gì",
  "Vì lệnh rm trong Dockerfile chỉ đánh dấu file là ẩn chứ không thực sự xóa, cần dùng lệnh chuyên dụng để xóa hẳn",
  "Vì OverlayFS luôn giữ một bản sao dự phòng của mọi file bị xóa để hỗ trợ việc khôi phục container về trạng thái trước"],
 correct: 0,
 explain: "Layer là bất biến và xếp chồng. RUN apt-get install (lớp 1: +40MB) rồi RUN rm -rf (lớp 2) thì image VẪN +40MB. Phải gộp: RUN apt-get update && apt-get install -y ... && rm -rf /var/lib/apt/lists/*"},

{topic: D, question: "Vì sao phải dùng exec form (JSON array) cho ENTRYPOINT thay vì shell form?",
 options: [
  "Vì shell form khiến sh là PID 1 và nó không chuyển tiếp tín hiệu, nên ứng dụng không nhận được SIGTERM và bị SIGKILL",
  "Vì shell form không cho phép truyền tham số dòng lệnh vào ứng dụng khi khởi chạy container bằng lệnh docker run",
  "Vì shell form tạo thêm một lớp trong image làm tăng kích thước và làm chậm quá trình khởi động của container",
  "Vì shell form không thể mở rộng biến môi trường nên các cấu hình truyền qua ENV sẽ không tới được ứng dụng Java"],
 correct: 0,
 explain: "Shell form (CMD java -jar app.jar) chạy qua /bin/sh -c → SHELL là PID 1, Java là tiến trình con, và shell KHÔNG chuyển tiếp tín hiệu. Ứng dụng không nhận được SIGTERM → bị SIGKILL sau grace period, cắt ngang request đang xử lý."},

{topic: D, question: "Chạy JVM trong container, cấu hình bộ nhớ nào là hợp lý nhất?",
 options: [
  "-XX:MaxRAMPercentage=75.0 vì UseContainerSupport đã bật mặc định nhưng tỉ lệ mặc định chỉ 25%, quá thấp cho container một ứng dụng",
  "-Xmx bằng đúng memory limit của container, để JVM tận dụng tối đa toàn bộ bộ nhớ đã được cấp phát cho container đó",
  "Không đặt gì cả vì từ Java 10 JVM tự đọc giới hạn cgroup và tự tính toán kích thước heap tối ưu cho từng workload",
  "-Xms bằng -Xmx bằng một nửa memory limit, để JVM không phải mở rộng heap và tránh hoàn toàn việc dừng gom rác"],
 correct: 0,
 explain: "UseContainerSupport bật mặc định từ Java 10+ (JVM đọc cgroup), NHƯNG MaxRAMPercentage mặc định chỉ 25% — quá thấp. Đặt 75%. Nhớ JVM dùng NHIỀU HƠN heap (metaspace, code cache, thread stack), nên -Xmx bằng limit sẽ OOMKilled."},

{topic: D, question: "EXPOSE trong Dockerfile có tác dụng gì?",
 options: [
  "Chỉ là tài liệu ghi chú, không mở cổng nào cả; muốn truy cập từ máy chủ phải dùng -p khi chạy docker run",
  "Mở cổng đó ra máy chủ ngay khi container khởi động, tương đương với việc thêm tham số -p với cùng số cổng",
  "Mở cổng đó cho các container khác trong cùng mạng bridge truy cập được, nhưng không mở ra ngoài máy chủ",
  "Đăng ký cổng với Docker Engine để nó tự chọn một cổng ngẫu nhiên trên máy chủ và ánh xạ tới cổng đã khai báo"],
 correct: 0,
 explain: "EXPOSE chỉ là TÀI LIỆU, không mở cổng gì — hiểu lầm rất phổ biến. Phải dùng -p 8080:80 khi chạy. Lưu ý bảo mật: -p mặc định lắng nghe mọi địa chỉ và Docker ghi thẳng iptables nên có thể vượt qua ufw; dùng -p 127.0.0.1:8080:80 nếu chỉ cần local."},

// ---------------- KUBERNETES ----------------
{topic: U, question: "Vì sao xóa một pod thì nó tự mọc lại?",
 options: [
  "Vì ReplicaSet controller chạy vòng lặp điều hòa liên tục so sánh trạng thái thực tế với mong muốn rồi hành động",
  "Vì kubelet trên node đó phát hiện container biến mất và tự khởi động lại nó từ image đã được lưu sẵn trên máy",
  "Vì API server chặn lệnh xóa pod thuộc về một Deployment và chỉ đánh dấu pod là cần thay thế chứ không xóa thật",
  "Vì scheduler theo dõi sự kiện xóa pod và ngay lập tức tạo một pod thay thế trên node còn nhiều tài nguyên nhất"],
 correct: 0,
 explain: "Mô hình khai báo + vòng lặp điều hòa: bạn khai báo 'muốn 3 replica', controller liên tục so sánh thực tế với mong muốn. Thấy 2 khác 3 thì tạo thêm. Không phải 'theo dõi sự kiện' mà là so sánh trạng thái liên tục."},

{topic: U, question: "Khi liveness probe thất bại và khi readiness probe thất bại, Kubernetes làm gì?",
 options: [
  "Liveness thất bại thì KHỞI ĐỘNG LẠI container; readiness thất bại thì gỡ pod khỏi endpoint của Service, không restart",
  "Cả hai đều khiến container bị khởi động lại, khác biệt chỉ ở chỗ readiness kiểm tra thường xuyên hơn liveness mà thôi",
  "Liveness thất bại thì gỡ pod khỏi Service; readiness thất bại thì khởi động lại container để nó nạp lại cấu hình mới",
  "Liveness thất bại thì đánh dấu node là không khỏe; readiness thất bại thì chuyển pod sang một node khác trong cụm"],
 correct: 0,
 explain: "Liveness → RESTART. Readiness → gỡ khỏi endpoint, KHÔNG restart. Sai lầm nguy hiểm: cho liveness kiểm tra database — DB chậm sẽ khiến toàn bộ pod restart hàng loạt. Kiểm tra phụ thuộc là việc của READINESS."},

{topic: U, question: "Vì sao ứng dụng Java trên Kubernetes bắt buộc phải có startupProbe?",
 options: [
  "Vì không có nó, liveness probe sẽ giết pod trước cả khi Spring khởi động xong, tạo vòng lặp restart vô tận",
  "Vì không có nó, Service sẽ định tuyến traffic tới pod ngay từ giây đầu tiên và mọi request đều nhận lỗi kết nối",
  "Vì không có nó, scheduler không biết pod cần bao lâu để sẵn sàng nên có thể xếp quá nhiều pod lên cùng một node",
  "Vì không có nó, JVM không kịp nạp hết các lớp cần thiết trước khi container runtime báo cáo trạng thái Running"],
 correct: 0,
 explain: "startupProbe tạm dừng liveness và readiness cho tới khi nó pass. Ứng dụng Java khởi động chậm — không có startupProbe thì liveness giết pod trước khi Spring xong, tạo CrashLoopBackOff vô tận. Đặt failureThreshold cao (ví dụ 30 × 5s = 150s)."},

{topic: U, question: "Khác biệt cơ bản giữa CPU limit và memory limit trong Kubernetes là gì?",
 options: [
  "CPU nén được nên vượt limit chỉ bị throttle làm chậm; bộ nhớ không nén được nên vượt limit là container bị OOMKilled ngay",
  "CPU vượt limit thì container bị giết ngay lập tức; bộ nhớ vượt limit thì kernel sẽ tráo bớt ra swap để tiếp tục chạy",
  "Cả hai đều chỉ bị throttle, khác biệt là CPU throttle theo chu kỳ 100ms còn bộ nhớ throttle theo tốc độ cấp phát trang",
  "CPU limit được scheduler dùng để chọn node còn memory limit chỉ là giá trị tham khảo không được thực thi cưỡng chế"],
 correct: 0,
 explain: "CPU nén được → throttle. Bộ nhớ KHÔNG nén được → OOMKilled ngay, không cảnh báo. Lưu ý: SCHEDULER dùng REQUESTS (không phải limits) để chọn node. Khuyến nghị Java: memory requests = limits; CPU thì cân nhắc không đặt limit để tránh throttling gây tăng p99."},

{topic: U, question: "Pod IP luôn thay đổi thì các microservice gọi nhau bằng cách nào?",
 options: [
  "Qua Service: nó cung cấp ClusterIP và tên DNS ổn định, chọn pod đích bằng label selector chứ không phải danh sách IP",
  "Qua etcd: mỗi dịch vụ truy vấn etcd để lấy danh sách IP hiện tại của các pod đích rồi tự chọn một cái để gọi",
  "Qua kubelet: nó duy trì một bảng ánh xạ tên dịch vụ sang IP trên từng node và cập nhật lại mỗi khi pod thay đổi",
  "Qua Ingress: mọi lời gọi giữa các dịch vụ đều đi qua ingress controller để nó phân giải tên và định tuyến tới pod"],
 correct: 0,
 explain: "Service = ClusterIP ảo + tên DNS ổn định, chọn pod bằng LABEL SELECTOR. Tập IP thực nằm trong Endpoints/EndpointSlice, tự cập nhật. ClusterIP không phải tiến trình proxy — kube-proxy cài quy tắc iptables/IPVS trên mọi node."},

{topic: U, question: "Vì sao gRPC trong Kubernetes hay bị lệch tải giữa các pod?",
 options: [
  "Vì kube-proxy cân bằng ở tầng 4 cho mỗi KẾT NỐI, mà gRPC dùng kết nối bền nên một kết nối bám mãi một pod",
  "Vì gRPC dùng HTTP/2 mà iptables không phân tích được giao thức này nên mọi request đều rơi về pod đầu tiên trong danh sách",
  "Vì Service mặc định dùng thuật toán session affinity theo IP nguồn, khiến mọi request từ một client luôn tới cùng pod",
  "Vì gRPC yêu cầu kết nối TLS mà việc bắt tay lại tốn kém nên client tự động tái sử dụng đúng pod đã kết nối trước đó"],
 correct: 0,
 explain: "kube-proxy cân bằng NGẪU NHIÊN ở tầng 4 cho mỗi KẾT NỐI. Với kết nối bền (gRPC, HTTP/2), một kết nối bám mãi một pod → lệch tải. Giải pháp: headless service (clusterIP: None) + client-side load balancing, hoặc service mesh."},

{topic: U, question: "Kubernetes Secret bảo vệ dữ liệu nhạy cảm ở mức nào?",
 options: [
  "Chỉ mã hóa base64 chứ không phải mã hóa thật; ai đọc được etcd hoặc có quyền get secret là đọc được nội dung",
  "Mã hóa AES-256 mặc định khi lưu vào etcd và chỉ giải mã trong bộ nhớ của node đang chạy pod cần dùng secret đó",
  "Mã hóa bằng khóa riêng của từng namespace nên pod ở namespace khác không thể đọc được secret dù có quyền get",
  "Không lưu nội dung mà chỉ lưu tham chiếu tới một kho bí mật bên ngoài, nên etcd không bao giờ chứa dữ liệu thật"],
 correct: 0,
 explain: "Secret CHỈ base64, KHÔNG phải mã hóa. kubectl get secret ... | base64 -d là đọc được. Muốn an toàn thật: bật encryption at rest cho etcd, siết RBAC, và tốt nhất dùng nguồn bí mật ngoài (Vault, External Secrets Operator)."},

{topic: U, question: "Điều kiện nào là BẮT BUỘC để rolling update đạt zero-downtime?",
 options: [
  "Readiness probe đúng, preStop hook cộng graceful shutdown, VÀ migration database tương thích ngược vì mã cũ mới chạy song song",
  "Đặt maxSurge bằng số replica và maxUnavailable bằng không, để Kubernetes tạo đủ pod mới trước khi xóa bất kỳ pod cũ nào",
  "Dùng chiến lược Recreate với terminationGracePeriodSeconds đủ dài, để mọi request đang xử lý kịp hoàn tất trước khi pod tắt",
  "Bật HPA với minReplicas lớn hơn ba, để luôn có đủ pod dự phòng nhận traffic trong suốt quá trình triển khai phiên bản mới"],
 correct: 0,
 explain: "Thiếu bất kỳ cái nào là hỏng: readiness probe (không thì traffic tới pod chưa sẵn sàng), preStop + graceful shutdown (không thì request đang xử lý bị cắt), migration tương thích ngược (vì trong lúc rolling update mã cũ và mới chạy ĐỒNG THỜI trên cùng schema)."},

{topic: U, question: "StatefulSet khác Deployment ở điểm cốt lõi nào?",
 options: [
  "Tên pod ổn định có thứ tự, mỗi pod có PVC riêng giữ nguyên qua restart, và việc tạo/xóa diễn ra tuần tự",
  "Nó chạy pod trên mọi node của cụm mà không cần scheduler, bảo đảm dữ liệu được nhân bản đầy đủ trên toàn bộ hạ tầng",
  "Nó tự động sao lưu volume của pod trước mỗi lần cập nhật và khôi phục lại nếu phiên bản mới khởi động thất bại",
  "Nó cho phép nhiều pod cùng ghi vào một PersistentVolume duy nhất, nên phù hợp với các cơ sở dữ liệu quan hệ lớn"],
 correct: 0,
 explain: "StatefulSet: tên ổn định có thứ tự (kafka-0, kafka-1), mỗi pod PVC RIÊNG giữ nguyên qua restart, tạo/xóa tuần tự, cần headless service. Lời khuyên thực tế: trừ khi có operator trưởng thành, hãy dùng dịch vụ quản lý cho PostgreSQL và Kafka."},

{topic: U, question: "Mẹo nào giúp thay đổi ConfigMap tự động kích hoạt rolling update?",
 options: [
  "Đặt annotation chứa mã băm của ConfigMap vào pod template, đổi cấu hình sẽ đổi hash và đổi template nên pod được tạo lại",
  "Gắn ConfigMap theo biến môi trường thay vì theo volume, vì env được kubelet đồng bộ lại và tự khởi động lại container",
  "Bật trường reloadOnChange trong spec của ConfigMap để Kubernetes theo dõi và tự khởi động lại mọi pod đang tham chiếu",
  "Đặt ConfigMap và Deployment trong cùng một file YAML để kubectl apply nhận ra thay đổi và triển khai lại cả hai"],
 correct: 0,
 explain: "Annotation checksum/config chứa hash của ConfigMap: đổi cấu hình → đổi hash → đổi pod template → tự động rolling update. Lưu ý: gắn theo VOLUME thì file tự đồng bộ (trễ ~1 phút); gắn theo ENV thì KHÔNG BAO GIỜ tự cập nhật."},

// ---------------- OBSERVABILITY ----------------
{topic: O, question: "Observability khác monitoring ở điểm nào?",
 options: [
  "Monitoring trả lời câu hỏi đã biết trước; observability cho phép trả lời câu hỏi chưa nghĩ tới từ dữ liệu đã thu thập",
  "Monitoring chỉ thu thập metric còn observability thu thập cả log và trace, khác biệt nằm ở số loại dữ liệu được lưu lại",
  "Monitoring chạy trên hạ tầng còn observability chạy trong ứng dụng, khác biệt nằm ở vị trí đặt các bộ thu thập dữ liệu",
  "Monitoring dùng mô hình pull định kỳ còn observability dùng mô hình push thời gian thực từ ứng dụng ra hệ thống lưu trữ"],
 correct: 0,
 explain: "Monitoring: 'CPU có vượt 80% không?' — bạn định nghĩa trước. Observability: 'vì sao riêng khách miền Trung dùng VNPAY qua app di động lại chậm từ 14h hôm qua?' — không thể dựng dashboard trước cho câu đó."},

{topic: O, question: "Vì sao nên chọn Histogram thay vì Summary cho metric độ trễ?",
 options: [
  "Vì Histogram tính phân vị ở phía server nên cộng gộp được giữa nhiều instance, còn Summary tính trong ứng dụng thì không",
  "Vì Histogram tốn ít bộ nhớ hơn nhiều do chỉ lưu tổng và số lượng, còn Summary phải giữ toàn bộ mẫu quan sát trong RAM",
  "Vì Histogram cho kết quả phân vị chính xác tuyệt đối, còn Summary chỉ đưa ra giá trị xấp xỉ dựa trên thuật toán lấy mẫu",
  "Vì Histogram tự động điều chỉnh các thùng theo phân bố dữ liệu thực tế, còn Summary cần khai báo phân vị cố định trước"],
 correct: 0,
 explain: "Summary tính phân vị NGAY TRONG ỨNG DỤNG nên KHÔNG CỘNG GỘP ĐƯỢC — không thể lấy trung bình các p99 của 10 pod để ra p99 toàn hệ thống. Histogram xếp vào bucket, tính phân vị ở server bằng histogram_quantile nên gộp được."},

{topic: O, question: "Đâu là ví dụ gây cardinality explosion trong Prometheus?",
 options: [
  "Đặt userId hoặc paymentId làm nhãn metric, vì số chuỗi thời gian bằng tích số giá trị khác nhau của mọi nhãn",
  "Đặt quá nhiều metric khác tên trong cùng một ứng dụng, vì Prometheus phải duy trì một chỉ mục riêng cho từng tên metric",
  "Đặt chu kỳ scrape quá ngắn như 5 giây, vì số điểm dữ liệu tăng lên nhiều lần làm bộ nhớ Prometheus phình rất nhanh",
  "Đặt thời gian retention quá dài như một năm, vì Prometheus phải giữ toàn bộ điểm dữ liệu thô trong bộ nhớ để truy vấn"],
 correct: 0,
 explain: "Số chuỗi = TÍCH số giá trị của mọi nhãn. userId với 1 triệu người dùng = 1 triệu chuỗi cho mỗi tổ hợp nhãn khác → Prometheus hết bộ nhớ. Nhãn phải có TẬP GIÁ TRỊ NHỎ. Cần chi tiết theo thực thể thì đó là việc của LOG/TRACE."},

{topic: O, question: "Với counter trong Prometheus, vì sao phải dùng rate() thay vì giá trị tuyệt đối?",
 options: [
  "Vì counter chỉ tăng và bị reset khi restart, nên giá trị tuyệt đối gần như vô nghĩa; rate() cho tốc độ mỗi giây",
  "Vì giá trị tuyệt đối của counter được lưu dưới dạng số nguyên 64 bit nên sẽ tràn số sau một thời gian chạy đủ dài",
  "Vì Prometheus không lưu giá trị tuyệt đối của counter mà chỉ lưu phần chênh lệch giữa hai lần scrape liên tiếp",
  "Vì rate() tự động loại bỏ các điểm dữ liệu bất thường do scrape thất bại nên kết quả luôn chính xác hơn giá trị thô"],
 correct: 0,
 explain: "Counter CHỈ TĂNG (hoặc về 0 khi restart). Giá trị tuyệt đối gần như vô nghĩa. rate(x_total[5m]) cho tốc độ mỗi giây trung bình 5 phút. Dùng rate cho cảnh báo (mượt hơn), irate cho biểu đồ nhạy với thay đổi ngắn."},

{topic: O, question: "Trong distributed tracing, chỗ nào hay bị đứt mạch trace nhất?",
 options: [
  "Qua hàng đợi như Kafka, vì message không tự mang context — phải tự đưa traceparent vào headers ở producer và lấy ra ở consumer",
  "Qua tầng cân bằng tải, vì nó tạo kết nối mới tới backend nên header traceparent của request gốc bị loại bỏ hoàn toàn",
  "Qua truy vấn cơ sở dữ liệu, vì giao thức JDBC không có chỗ để mang theo thông tin ngữ cảnh trace của request hiện tại",
  "Qua ranh giới namespace trong Kubernetes, vì NetworkPolicy mặc định loại bỏ các header không nằm trong danh sách cho phép"],
 correct: 0,
 explain: "Ba chỗ đứt: (1) HTTP client không được cấu hình (new RestTemplate() thay vì bean), (2) qua HÀNG ĐỢI — Kafka không tự mang context, đây là chỗ đứt phổ biến nhất, (3) qua luồng khác (@Async, ExecutorService) vì context nằm trong biến cục bộ luồng."},

{topic: O, question: "Tail-based sampling khác head-based sampling ở điểm nào?",
 options: [
  "Nó quyết định giữ trace SAU KHI trace kết thúc nên giữ được mọi trace có lỗi hoặc chậm bất thường, thứ head-based có thể bỏ sót",
  "Nó chỉ lấy mẫu ở span cuối cùng của mỗi trace nên giảm được lượng dữ liệu phải truyền đi mà vẫn giữ nguyên cấu trúc cây",
  "Nó lấy mẫu theo tỉ lệ cố định ở mỗi dịch vụ trong chuỗi gọi, nên các dịch vụ ở cuối chuỗi được lấy mẫu ít hơn dịch vụ đầu",
  "Nó quyết định dựa trên trace id thay vì số ngẫu nhiên, bảo đảm mọi span của cùng một trace đều có quyết định giống nhau"],
 correct: 0,
 explain: "Head-based quyết định ở request đầu tiên (giữ 10%) — đơn giản, rẻ, nhưng CÓ THỂ BỎ SÓT chính trace bị lỗi bạn cần. Tail-based giữ toàn bộ span rồi quyết định sau khi trace kết thúc: giữ mọi trace có lỗi. Cần OTel Collector và nhiều bộ nhớ hơn."},

{topic: O, question: "Vì sao MDC phải được dọn trong khối finally?",
 options: [
  "Vì luồng được tái sử dụng từ pool, giá trị cũ sẽ rò rỉ sang request khác và làm log gán sai ngữ cảnh cho người dùng khác",
  "Vì MDC lưu dữ liệu trong bộ nhớ ngoài heap nên không được gom rác tự động, không dọn sẽ gây rò rỉ bộ nhớ dần dần",
  "Vì framework logging chỉ đọc MDC một lần lúc khởi tạo appender nên giá trị cũ sẽ được in ra cho mọi dòng log sau đó",
  "Vì MDC được đồng bộ sang các luồng con khi dùng @Async nên không dọn sẽ khiến các tác vụ nền ghi log trùng lặp"],
 correct: 0,
 explain: "MDC là Map gắn theo LUỒNG, mà luồng được tái sử dụng từ pool. Không MDC.clear() trong finally thì userId của request trước rò rỉ sang request sau — log gán sai người dùng, rất khó phát hiện và nguy hiểm khi điều tra sự cố."},

{topic: O, question: "Loki khác Elasticsearch ở cách tiếp cận nào?",
 options: [
  "Loki chỉ đánh index nhãn chứ không index nội dung log, nên rẻ hơn nhiều về lưu trữ nhưng truy vấn toàn văn chậm hơn",
  "Loki lưu log dưới dạng metric có cấu trúc nên truy vấn nhanh hơn, còn Elasticsearch lưu nguyên văn bản thô không nén",
  "Loki chỉ giữ log trong bộ nhớ với thời gian ngắn để phục vụ cảnh báo thời gian thực, còn lưu trữ dài hạn thì dùng S3",
  "Loki tự động phân tích cấu trúc JSON của mọi dòng log lúc ghi vào, còn Elasticsearch cần khai báo mapping trước"],
 correct: 0,
 explain: "Loki chỉ index NHÃN (app, namespace, level), nội dung được nén thành khối. Rẻ hơn nhiều nhưng truy vấn toàn văn chậm hơn ES. Nhãn Loki chịu ĐÚNG vấn đề cardinality như Prometheus — đừng đặt trace id làm nhãn."},

{topic: O, question: "Error budget với SLO 99,9% trong 30 ngày nghĩa là gì?",
 options: [
  "Được phép lỗi 0,1% tức khoảng 43 phút; còn ngân sách thì triển khai nhanh, hết ngân sách thì đóng băng tính năng mới",
  "Phải giữ tỉ lệ thành công trên 99,9% ở mọi khoảng thời gian một giờ, vượt ngưỡng trong bất kỳ giờ nào là vi phạm SLO",
  "Được phép có tối đa 0,1% số lần triển khai thất bại và phải rollback trong vòng 30 ngày kể từ lần triển khai đó",
  "Phải bồi thường cho khách hàng khi tỉ lệ khả dụng xuống dưới 99,9%, mức bồi thường tính theo số phút vượt ngân sách"],
 correct: 0,
 explain: "0,1% của 30 ngày ≈ 43 phút. Ý nghĩa: 100% khả dụng KHÔNG phải mục tiêu đúng — chi phí từ 99,9% lên 99,99% thường lớn hơn giá trị. Error budget biến tranh luận 'tính năng hay ổn định' thành quyết định có số liệu. SLA (cam kết với khách) phải LỎNG HƠN SLO."},

{topic: O, question: "Nguyên tắc thiết kế cảnh báo nào giúp tránh mệt mỏi vì báo động giả?",
 options: [
  "Cảnh báo theo triệu chứng ảnh hưởng người dùng chứ không theo nguyên nhân; mỗi cảnh báo phải hành động được",
  "Đặt ngưỡng cảnh báo thật cao để chỉ những sự cố nghiêm trọng nhất mới kích hoạt, các vấn đề nhỏ thì bỏ qua hoàn toàn",
  "Gửi mọi cảnh báo vào một kênh chat chung thay vì gọi điện, để người trực tự quyết định cái nào đáng xử lý ngay lập tức",
  "Tăng khoảng thời gian for lên vài giờ cho mọi cảnh báo, bảo đảm chỉ những vấn đề kéo dài mới được báo cho người trực"],
 correct: 0,
 explain: "Cảnh báo theo TRIỆU CHỨNG (tỉ lệ lỗi vượt SLO), không theo NGUYÊN NHÂN (CPU 90%) — người dùng không bị ảnh hưởng thì không phải sự cố. Mỗi cảnh báo phải hành động được. Dùng multi-window multi-burn-rate. Xóa bớt cảnh báo là cải thiện độ tin cậy."},

// ---------------- RESILIENCE & TOOLCHAIN ----------------
{topic: S, question: "Circuit breaker ở trạng thái OPEN sẽ làm gì?",
 options: [
  "Từ chối ngay lập tức mọi lời gọi mà không thử, ném CallNotPermittedException và chạy fallback để trả kết quả tức thì",
  "Vẫn cho lời gọi đi qua nhưng đặt timeout ngắn hơn nhiều, để phát hiện sớm dịch vụ phía sau đã phục hồi hay chưa",
  "Xếp các lời gọi vào một hàng đợi nội bộ và gửi lại toàn bộ khi dịch vụ phía sau phục hồi, bảo đảm không mất request",
  "Chuyển hướng lời gọi sang một instance dự phòng khác của cùng dịch vụ đã được đăng ký trong service discovery"],
 correct: 0,
 explain: "OPEN = từ chối NGAY, không thử. Vừa bảo vệ dịch vụ đang hỏng khỏi bị dội tải, vừa trả kết quả tức thì thay vì bắt người dùng chờ timeout. Sau waitDurationInOpenState chuyển sang HALF_OPEN cho vài lời gọi thăm dò."},

{topic: S, question: "Vì sao minimumNumberOfCalls là cấu hình bảo vệ quan trọng của circuit breaker?",
 options: [
  "Không có nó thì một lời gọi thất bại đầu tiên đã là 100% tỉ lệ lỗi và mạch mở ngay, cực kỳ nhạy và gây báo động giả",
  "Không có nó thì circuit breaker không biết khi nào nên chuyển từ HALF_OPEN về CLOSED nên sẽ kẹt ở trạng thái thăm dò",
  "Không có nó thì sliding window sẽ giữ vô hạn số lời gọi trong bộ nhớ, làm ứng dụng hết heap sau một thời gian chạy",
  "Không có nó thì các lời gọi chậm sẽ không được tính vào tỉ lệ lỗi nên mạch không bao giờ mở dù dịch vụ đã rất chậm"],
 correct: 0,
 explain: "Không có minimumNumberOfCalls thì 1 lời gọi lỗi = 100% tỉ lệ lỗi = mạch mở ngay. Cấu hình khác hay bị bỏ sót: slowCallRateThreshold (dịch vụ chậm nguy hiểm hơn dịch vụ chết vì nó giữ luồng), và ignoreExceptions cho lỗi nghiệp vụ."},

{topic: S, question: "Trong Spring Boot Resilience4j, thứ tự decorator mặc định từ ngoài vào trong là gì?",
 options: [
  "Retry → CircuitBreaker → RateLimiter → TimeLimiter → Bulkhead, nghĩa là retry bọc ngoài nên sẽ thấy CallNotPermittedException",
  "CircuitBreaker → Retry → Bulkhead → TimeLimiter → RateLimiter, nghĩa là mạch mở thì retry hoàn toàn không được kích hoạt",
  "Bulkhead → TimeLimiter → RateLimiter → CircuitBreaker → Retry, nghĩa là giới hạn tài nguyên luôn được áp dụng đầu tiên",
  "TimeLimiter → Retry → CircuitBreaker → Bulkhead → RateLimiter, nghĩa là timeout được kiểm tra trước mọi cơ chế khác"],
 correct: 0,
 explain: "Thứ tự mặc định: Retry → CircuitBreaker → RateLimiter → TimeLimiter → Bulkhead. Retry BỌC NGOÀI circuit breaker, nên mạch mở thì retry thấy CallNotPermittedException. Hiểu sai thứ tự dẫn tới hành vi khác hẳn mong đợi."},

{topic: S, question: "Ba điều kiện bắt buộc trước khi áp dụng retry là gì?",
 options: [
  "Thao tác phải idempotent, lỗi phải là loại có thể tự khỏi, và phải có giới hạn số lần kèm backoff luỹ thừa có jitter",
  "Dịch vụ đích phải có circuit breaker, phải có fallback được định nghĩa sẵn, và phải ghi log đầy đủ mỗi lần thử lại",
  "Phải có timeout ngắn hơn khoảng chờ, phải chạy trên luồng riêng, và phải giới hạn số lời gọi đồng thời bằng bulkhead",
  "Phải bật tracing để theo dõi từng lần thử, phải đặt rate limiter phía trước, và phải cache kết quả của lần thử thành công"],
 correct: 0,
 explain: "Idempotent (retry lệnh trừ tiền không idempotent = trừ hai lần), lỗi tự khỏi được (không retry 4xx trừ 429), và có giới hạn + backoff luỹ thừa + JITTER (không có jitter thì 1000 client cùng retry một lúc). Nhớ: retry NHÂN TẢI, chỉ đặt ở MỘT tầng."},

{topic: S, question: "Bulkhead bảo vệ ứng dụng khỏi điều gì?",
 options: [
  "Một dịch vụ phụ thuộc bị treo làm cạn kiệt toàn bộ luồng của ứng dụng, khiến cả những endpoint không liên quan cũng chết",
  "Một dịch vụ phụ thuộc trả về dữ liệu sai định dạng làm luồng xử lý ném exception và không thể phục hồi trạng thái",
  "Một client gửi quá nhiều request vượt hạn ngạch đã thỏa thuận, làm dịch vụ đích chặn toàn bộ lưu lượng từ ứng dụng",
  "Một lời gọi mạng không có timeout khiến luồng chờ vô hạn và giữ mãi kết nối tới dịch vụ phía sau đã ngừng phản hồi"],
 correct: 0,
 explain: "Bulkhead (vách ngăn tàu thủy) giới hạn số lời gọi đồng thời tới một phụ thuộc. Không có nó, dịch vụ chấm điểm rủi ro treo sẽ làm toàn bộ luồng kẹt và cả ứng dụng chết — kể cả endpoint không liên quan. Semaphore (nhẹ) hoặc threadpool (cách ly triệt để)."},

{topic: S, question: "RateLimiter của Resilience4j có giới hạn nào cần lưu ý khi chạy nhiều pod?",
 options: [
  "Nó cục bộ trong một JVM, nên 10 pod nghĩa là tổng thực tế gấp 10 lần giới hạn; cần giới hạn toàn cục thì phải dùng Redis",
  "Nó đồng bộ trạng thái qua service discovery nên có độ trễ vài giây, khiến giới hạn thực tế luôn thấp hơn cấu hình một chút",
  "Nó chỉ áp dụng cho các lời gọi đồng bộ, mọi lời gọi bất đồng bộ qua CompletableFuture sẽ bỏ qua hoàn toàn giới hạn này",
  "Nó tính giới hạn theo số luồng chứ không theo số lời gọi, nên với virtual thread thì giới hạn gần như không có tác dụng"],
 correct: 0,
 explain: "RateLimiter của Resilience4j là CỤC BỘ TRONG MỘT JVM. 10 pod = tổng gấp 10 lần giới hạn. Cần giới hạn toàn cục (ví dụ VNPAY cho 100 req/s cho cả hệ thống) thì phải dùng Redis, hoặc RequestRateLimiter của Spring Cloud Gateway."},

{topic: S, question: "Vì sao tuyệt đối không được viết mã chặn trong filter của Spring Cloud Gateway?",
 options: [
  "Vì Gateway chạy trên WebFlux/Netty không chặn, chặn một luồng event loop là chặn hàng nghìn request đang được xử lý",
  "Vì filter chạy trước khi Spring context khởi tạo xong nên các bean truy cập cơ sở dữ liệu chưa sẵn sàng để sử dụng",
  "Vì Gateway có timeout cứng ba giây cho mỗi filter, vượt qua thì request bị hủy và trả về lỗi 504 cho phía client",
  "Vì mã chặn trong filter sẽ khiến header traceparent không được chèn vào request chuyển tiếp, làm đứt mạch trace"],
 correct: 0,
 explain: "Gateway xây trên WebFlux/Netty (bất đồng bộ, không chặn) — khác Zuul 1 chạy trên Servlet. Một số ít luồng xử lý hàng nghìn kết nối. Gọi JDBC, RestTemplate đồng bộ hay Thread.sleep trong filter là chặn event loop = chặn hàng nghìn request."},

{topic: S, question: "API Gateway KHÔNG nên đảm nhận việc gì?",
 options: [
  "Logic nghiệp vụ, tổng hợp dữ liệu phức tạp và truy cập cơ sở dữ liệu — vì nó sẽ thành một monolith mới ai cũng phải sửa",
  "Chấm dứt TLS và kiểm tra chữ ký JWT — vì việc này nên để từng dịch vụ tự làm nhằm tránh một điểm hỏng duy nhất",
  "Giới hạn tốc độ và xử lý CORS — vì các quy tắc này thay đổi theo từng dịch vụ nên đặt tập trung sẽ khó bảo trì",
  "Định tuyến theo path và cân bằng tải — vì service mesh đã làm việc này ở tầng thấp hơn nên gateway làm lại là dư thừa"],
 correct: 0,
 explain: "Gateway NÊN: định tuyến, TLS, xác thực token, rate limit, CORS, log/trace tập trung. KHÔNG NÊN: logic nghiệp vụ, tổng hợp phức tạp, truy cập DB — gateway phình logic thành monolith mới, một điểm hỏng mà mọi đội đều phải sửa. Cần tổng hợp thì làm ở BFF."},

{topic: S, question: "Vì sao Flyway từ chối khởi động khi bạn sửa một file migration đã chạy?",
 options: [
  "Vì checksum lệch so với bảng lịch sử; đây là tính năng bảo đảm mọi môi trường có cùng lịch sử, cần sửa thì tạo file mới",
  "Vì file đã chạy được Flyway khóa ở mức hệ thống tệp nên mọi thay đổi nội dung đều bị phát hiện và chặn ngay lập tức",
  "Vì Flyway phải chạy lại toàn bộ migration từ V1 mỗi lần khởi động nên file đã sửa sẽ tạo ra trạng thái schema khác trước",
  "Vì bảng flyway_schema_history lưu toàn bộ nội dung SQL của mỗi migration nên nội dung mới không khớp với bản đã lưu"],
 correct: 0,
 explain: "Flyway lưu CHECKSUM trong flyway_schema_history. Sửa file đã chạy → 'Migration checksum mismatch'. Đây là TÍNH NĂNG, không phải phiền toái: nó bảo đảm mọi môi trường có cùng lịch sử. Cần sửa thì TẠO FILE MỚI."},

{topic: S, question: "Vì sao migration database phải tương thích ngược khi triển khai rolling update?",
 options: [
  "Vì mã cũ và mã mới chạy đồng thời trên cùng schema trong suốt quá trình, nên đổi tên cột một lần sẽ làm sập pod mã cũ",
  "Vì Flyway chạy migration trên mọi pod cùng lúc nên phiên bản schema có thể khác nhau giữa các pod trong một khoảng thời gian",
  "Vì Kubernetes có thể rollback deployment bất cứ lúc nào và schema mới sẽ không tương thích với image phiên bản trước đó",
  "Vì connection pool giữ lại các prepared statement đã biên dịch theo schema cũ nên chúng sẽ lỗi khi schema thay đổi"],
 correct: 0,
 explain: "Trong rolling update, mã CŨ và MỚI chạy ĐỒNG THỜI trên cùng schema. Đổi tên cột một lần = sập mọi pod mã cũ. Dùng expand-contract qua BA lần triển khai: thêm cột mới (ghi cả hai) → chép dữ liệu và đổi sang đọc cột mới → xóa cột cũ."},

{topic: S, question: "Trên production, hibernate.ddl-auto nên đặt là gì?",
 options: [
  "validate hoặc none, vì update âm thầm thay đổi schema theo cách không kiểm soát và không thể tái hiện được",
  "update, vì nó tự đồng bộ schema với entity nên tránh được việc quên viết migration cho các thay đổi nhỏ của model",
  "create-drop, vì nó bảo đảm schema luôn khớp chính xác với entity hiện tại ở mỗi lần khởi động lại ứng dụng",
  "create, vì nó tạo lại các bảng còn thiếu mà không đụng tới dữ liệu của những bảng đã tồn tại từ trước trong database"],
 correct: 0,
 explain: "Production phải là 'validate' (kiểm tra schema khớp entity) hoặc 'none'. ddl-auto=update âm thầm thay đổi schema không kiểm soát, không tái hiện được, và không bao giờ xóa hay sửa cột đúng cách. Schema phải do Flyway quản lý."},

{topic: S, question: "MapStruct có lợi thế gì so với thư viện ánh xạ dựa trên phản chiếu?",
 options: [
  "Sinh mã lúc biên dịch nên hiệu năng bằng viết tay, và quên ánh xạ một trường sẽ làm build hỏng ngay thay vì lỗi lúc chạy",
  "Tự động phát hiện mọi trường cùng kiểu dữ liệu và ánh xạ chúng lúc chạy, nên không cần khai báo bất kỳ annotation nào",
  "Lưu kết quả ánh xạ vào bộ đệm nội bộ nên lần ánh xạ thứ hai của cùng một kiểu đối tượng sẽ nhanh hơn nhiều lần",
  "Hỗ trợ ánh xạ hai chiều tự động giữa entity và DTO mà không cần viết thêm phương thức cho chiều ngược lại"],
 correct: 0,
 explain: "MapStruct là annotation processor — SINH MÃ lúc BIÊN DỊCH. Hiệu năng bằng viết tay (không phản chiếu), lỗi phát hiện lúc build (đặt unmappedTargetPolicy = ERROR), mã đọc được. Bẫy hay gặp: với Lombok phải đặt lombok-mapstruct-binding và đúng thứ tự processor."},

{topic: S, question: "Vì sao test tích hợp nên dùng Testcontainers thay vì H2?",
 options: [
  "Vì H2 không có kiểu JSONB, cú pháp và hành vi khóa khác PostgreSQL, nên test xanh mà production vẫn có thể đỏ",
  "Vì H2 chỉ chạy trong bộ nhớ nên dữ liệu mất sau mỗi test, không kiểm chứng được tính bền vững của các thao tác ghi",
  "Vì H2 không hỗ trợ nhiều kết nối đồng thời nên các test chạy song song sẽ tranh chấp và cho kết quả không ổn định",
  "Vì H2 không tương thích với Flyway nên không thể kiểm thử các file migration trước khi đưa chúng lên môi trường thật"],
 correct: 0,
 explain: "Dùng H2 thay PostgreSQL là tự lừa dối: không có JSONB, cú pháp khác, hành vi khóa khác, không chạy được migration đặc thù Postgres. Testcontainers chạy container THẬT. Từ Spring Boot 3.1 dùng @ServiceConnection là Spring tự cấu hình, không cần @DynamicPropertySource."},

{topic: S, question: "Trong Testcontainers, khai báo @Container static và non-static khác nhau thế nào?",
 options: [
  "Static thì container dùng chung cho cả lớp test; non-static thì tạo lại cho mỗi phương thức nên chậm hơn rất nhiều",
  "Static thì container được giữ lại giữa các lần chạy test khác nhau; non-static thì bị Ryuk dọn ngay sau khi test kết thúc",
  "Static thì container chạy trên cổng cố định đã khai báo; non-static thì Testcontainers tự chọn một cổng ngẫu nhiên còn rảnh",
  "Static thì Spring tự cấu hình datasource từ container; non-static thì phải viết @DynamicPropertySource để lấy URL động"],
 correct: 0,
 explain: "@Container static = một container cho cả lớp test (gần như luôn nên dùng). Non-static = tạo lại cho MỖI phương thức, chậm hơn rất nhiều. Muốn giữ container giữa các LẦN CHẠY thì bật testcontainers.reuse.enable=true (chỉ khi phát triển cục bộ, không dùng trên CI)."}
];
