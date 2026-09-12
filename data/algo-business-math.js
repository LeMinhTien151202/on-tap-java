// Bài toán số liệu thực tế: tiền, tỷ giá, hóa đơn, lãi và lợi nhuận.
(function () {
  var businessMathGroups = [
    {
      group: "Bài toán thực tế — Tiền, tỷ giá & hóa đơn",
      items: [
        {
          name: "Quy đổi ngoại tệ có phí và quy tắc làm tròn",
          diff: "Dễ",
          trap: "Phải nói rõ rate là bao nhiêu đơn vị tiền đích cho 1 đơn vị tiền nguồn, phí trừ trước hay sau đổi, và số chữ số làm tròn. Không dùng double cho tiền trong Java production.",
          alt: {
            title: "Cách khác — lưu tỷ giá dạng phân số",
            complexity: "O(1)",
            note: "Với hệ thống cần kiểm toán, có thể lưu numerator/denominator hoặc Decimal cùng timestamp và nguồn tỷ giá để tái hiện phép tính.",
            java: "long convertMinor(long sourceMinor, long rateNumerator, long rateDenominator) {\n    return Math.multiplyExact(sourceMinor, rateNumerator) / rateDenominator;\n}"
          },
          examples: [
            { input: "10.000.000 VND, rate = 1/24.500 USD/VND, phí 1,5%", output: "402,04 USD", note: "Tiền sau phí = 9.850.000 VND; chia 24.500 rồi làm tròn 2 chữ số." },
            { input: "100 USD, rate = 25.000 VND/USD, phí 2%", output: "2.450.000 VND", note: "100 × 98% × 25.000; VND làm tròn 0 chữ số." }
          ],
          complexity: "O(1) thời gian · O(1) bộ nhớ",
          idea: "Chuẩn hóa rate theo hướng target/source, trừ phí phần trăm theo đúng hợp đồng, nhân tỷ giá rồi làm tròn bằng quy tắc đã chỉ định.",
          steps: ["Đổi feePercent về tỷ lệ feePercent/100.", "Tính số tiền nguồn còn lại sau phí.", "Nhân với rate target/source.", "Làm tròn theo currency đích và trả cả rate/fee để audit."],
          java: "BigDecimal convert(BigDecimal amount, BigDecimal rate, BigDecimal feePercent, int scale) {\n    BigDecimal feeRate = feePercent.movePointLeft(2);\n    BigDecimal afterFee = amount.multiply(BigDecimal.ONE.subtract(feeRate));\n    return afterFee.multiply(rate).setScale(scale, RoundingMode.HALF_UP);\n}",
          js: "function convertMoney(amount, rate, feePercent, scale) {\n  const result = amount * (1 - feePercent / 100) * rate;\n  const factor = 10 ** scale;\n  return Math.round((result + Number.EPSILON) * factor) / factor;\n}\n// Frontend demo; nghiệp vụ tiền thật nên tính bằng minor unit hoặc thư viện Decimal."
        },
        {
          name: "Giảm giá liên tiếp rồi tính VAT",
          diff: "Dễ",
          trap: "Giảm 10% rồi 5% không phải giảm 15% mà còn 0,9 × 0,95 = 85,5%. Cần xác định VAT tính trên giá gốc hay giá sau chiết khấu theo đề.",
          alt: {
            title: "Cách khác — gộp các hệ số trước khi nhân",
            complexity: "O(d) với d mức giảm",
            note: "Hệ số cuối = tích của (1-discount) rồi nhân (1+VAT); cách này tiện để giải thích bằng công thức.",
            java: "BigDecimal factor = new BigDecimal(\"0.90\").multiply(new BigDecimal(\"0.95\")).multiply(new BigDecimal(\"1.08\"));"
          },
          examples: [
            { input: "Giá 1.000.000, giảm 10%, giảm tiếp 5%, VAT 8%", output: "923.400", note: "1.000.000 × 0,90 × 0,95 × 1,08." },
            { input: "Giá 500.000, không giảm, VAT 10%", output: "550.000", note: "Danh sách discount rỗng nên giữ nguyên giá trước VAT." }
          ],
          complexity: "O(d) thời gian · O(1) bộ nhớ",
          idea: "Áp dụng từng chiết khấu trên số tiền còn lại, sau đó mới tính VAT trên taxable amount. Trả thêm tổng discount để hóa đơn dễ kiểm tra.",
          steps: ["Bắt đầu net = giá gốc.", "Với mỗi phần trăm giảm: net *= 1-rate.", "Tính tax = net × vatRate.", "Tổng thanh toán = net + tax và làm tròn một lần theo quy tắc."],
          java: "BigDecimal finalPrice(BigDecimal price, List<BigDecimal> discounts, BigDecimal vat) {\n    BigDecimal net = price;\n    for (BigDecimal d : discounts)\n        net = net.multiply(BigDecimal.ONE.subtract(d.movePointLeft(2)));\n    return net.multiply(BigDecimal.ONE.add(vat.movePointLeft(2)))\n              .setScale(0, RoundingMode.HALF_UP);\n}",
          js: "function finalPrice(price, discounts, vatPercent) {\n  const net = discounts.reduce((money, d) => money * (1 - d / 100), price);\n  return Math.round(net * (1 + vatPercent / 100));\n}"
        },
        {
          name: "Phí cổng thanh toán — tính net và gross-up",
          diff: "Trung bình",
          trap: "Nếu phí = gross × rate + fixed thì muốn nhận net phải giải phương trình gross = (net + fixed)/(1-rate). Không được chỉ cộng rate vào net; gross-up cần làm tròn lên để không thiếu tiền.",
          alt: {
            title: "Cách khác — tìm gross nhỏ nhất bằng Binary Search",
            complexity: "O(log M)",
            note: "Hữu ích khi biểu phí có min/max, nhiều bậc hoặc quy tắc làm tròn khiến không thể đảo công thức trực tiếp.",
            java: "long grossForNet(long wanted, LongUnaryOperator fee) {\n    long lo=wanted, hi=Math.max(wanted+1, wanted*2);\n    while (lo<hi) { long mid=lo+(hi-lo)/2; if (mid-fee.applyAsLong(mid)>=wanted) hi=mid; else lo=mid+1; }\n    return lo;\n}"
          },
          examples: [
            { input: "Gross 500.000; phí 2% + 2.000", output: "Net = 488.000", note: "Phí 10.000 + 2.000; merchant nhận phần còn lại." },
            { input: "Muốn net 1.000.000; phí 2,9% + 3.000", output: "Gross tối thiểu ≈ 1.032.956", note: "(1.000.000 + 3.000) / 0,971 rồi làm tròn lên." }
          ],
          complexity: "O(1) với biểu phí tuyến tính · O(1) bộ nhớ",
          idea: "Phân biệt hai chiều: gross→net là phép trừ phí; net mong muốn→gross là giải ngược phương trình phí.",
          steps: ["Net: fee = gross×rate + fixed.", "Net nhận = gross-fee.", "Gross-up: gross = (wantedNet+fixed)/(1-rate).", "Làm tròn lên đơn vị tiền nhỏ nhất và kiểm tra lại net thực tế."],
          java: "long netFromGross(long gross, BigDecimal rate, long fixed) {\n    long percentFee = BigDecimal.valueOf(gross).multiply(rate).setScale(0, RoundingMode.HALF_UP).longValueExact();\n    return gross - percentFee - fixed;\n}\nlong grossForNet(long net, BigDecimal rate, long fixed) {\n    return BigDecimal.valueOf(net + fixed).divide(BigDecimal.ONE.subtract(rate), 0, RoundingMode.CEILING).longValueExact();\n}",
          js: "function netFromGross(gross, rate, fixed) {\n  return gross - Math.round(gross * rate) - fixed;\n}\nfunction grossForNet(net, rate, fixed) {\n  return Math.ceil((net + fixed) / (1 - rate));\n}"
        },
        {
          name: "Chia hóa đơn công bằng đến từng đồng",
          diff: "Dễ",
          trap: "Làm tròn từng phần độc lập có thể khiến tổng các phần khác tổng hóa đơn. Luôn chia bằng số nguyên minor unit rồi phân phối remainder; phải quy định ai nhận phần dư.",
          alt: {
            title: "Cách khác — chia theo trọng số",
            complexity: "O(n log n) nếu phân dư theo phần lẻ lớn nhất",
            note: "Tính phần lý tưởng theo weight, lấy floor, rồi cấp các đơn vị dư cho người có fractional remainder lớn nhất.",
            java: "long base = total / people; long remainder = total % people;"
          },
          examples: [
            { input: "100.000 chia 3 người", output: "[33.334, 33.333, 33.333]", note: "Base 33.333, dư 1 đồng được cấp cho người đầu tiên." },
            { input: "10 chia 4 người", output: "[3,3,2,2]", note: "Base 2, dư 2 nên hai người đầu nhận thêm 1." }
          ],
          complexity: "O(n) thời gian · O(n) cho kết quả",
          idea: "Dùng phép chia nguyên để mọi phần có base giống nhau, sau đó phân phối từng đơn vị dư; tổng kết quả luôn bằng total.",
          steps: ["Đổi total sang minor unit nguyên.", "base = total / n, remainder = total % n.", "Khởi tạo mỗi người nhận base.", "Cho remainder người đầu mỗi người thêm một đơn vị; có thể xoay người bắt đầu để công bằng qua nhiều lần."],
          java: "long[] splitBill(long total, int people) {\n    if (people <= 0 || total < 0) throw new IllegalArgumentException();\n    long[] parts = new long[people];\n    long base = total / people, rem = total % people;\n    for (int i = 0; i < people; i++) parts[i] = base + (i < rem ? 1 : 0);\n    return parts;\n}",
          js: "function splitBill(total, people) {\n  if (!Number.isSafeInteger(total) || total < 0 || people <= 0) throw new Error('invalid');\n  const base = Math.floor(total / people), rem = total % people;\n  return Array.from({length: people}, (_, i) => base + (i < rem ? 1 : 0));\n}"
        },
        {
          name: "Tính giá theo bậc thang",
          diff: "Trung bình",
          trap: "Mỗi đơn vị chỉ chịu giá của bậc nó nằm trong, không lấy toàn bộ số lượng nhân đơn giá bậc cuối. Cần thống nhất upper bound là inclusive hay exclusive.",
          alt: {
            title: "Cách khác — Prefix cost để trả nhiều truy vấn",
            complexity: "Tiền xử lý O(b), mỗi truy vấn O(log b)",
            note: "Dựng tổng tiền tới cuối mỗi bậc rồi binary search bậc chứa quantity khi có rất nhiều truy vấn.",
            java: "record Tier(long capacity, long unitPrice) {}"
          },
          examples: [
            { input: "350 đơn vị; 100 đầu giá 1.000, 200 tiếp giá 800, còn lại giá 600", output: "290.000", note: "100.000 + 160.000 + 50×600." },
            { input: "80 đơn vị với cùng biểu giá", output: "80.000", note: "Chưa vượt bậc đầu nên không dùng đơn giá bậc sau." }
          ],
          complexity: "O(b) thời gian · O(1) ngoài danh sách b bậc",
          idea: "Tiêu thụ lần lượt capacity của từng bậc và cộng used × unitPrice; bậc cuối có thể dùng capacity rất lớn.",
          steps: ["remaining = quantity, total = 0.", "Với mỗi bậc, used = min(remaining, capacity).", "Cộng used×price rồi trừ remaining.", "Dừng khi remaining=0; nếu hết bậc mà vẫn còn thì input biểu giá không hợp lệ."],
          java: "long tieredCost(long quantity, long[][] tiers) {\n    long total = 0, remaining = quantity;\n    for (long[] tier : tiers) {\n        long used = Math.min(remaining, tier[0]);\n        total = Math.addExact(total, Math.multiplyExact(used, tier[1]));\n        remaining -= used;\n        if (remaining == 0) return total;\n    }\n    throw new IllegalArgumentException(\"tiers do not cover quantity\");\n}",
          js: "function tieredCost(quantity, tiers) {\n  let total = 0, remaining = quantity;\n  for (const [capacity, price] of tiers) {\n    const used = Math.min(remaining, capacity);\n    total += used * price; remaining -= used;\n    if (remaining === 0) return total;\n  }\n  throw new Error('tiers do not cover quantity');\n}"
        }
      ]
    },
    {
      group: "Bài toán thực tế — Lãi, lợi nhuận & khoản vay",
      items: [
        {
          name: "Lợi nhuận, tỷ suất lợi nhuận và markup",
          diff: "Dễ",
          trap: "Margin và markup có cùng tử số nhưng khác mẫu: margin chia doanh thu, markup chia giá vốn. Vì vậy lời 200 trên vốn 800 là markup 25% nhưng margin chỉ 20%.",
          alt: {
            title: "Cách khác — tính giá bán từ margin mục tiêu",
            complexity: "O(1)",
            note: "price = cost / (1-targetMargin), không phải cost × (1+targetMargin).",
            java: "BigDecimal priceForMargin(BigDecimal cost, BigDecimal margin) {\n    return cost.divide(BigDecimal.ONE.subtract(margin), 2, RoundingMode.CEILING);\n}"
          },
          examples: [
            { input: "Giá vốn 800, giá bán 1.000", output: "Lãi 200; margin 20%; markup 25%", note: "200/1.000 khác 200/800." },
            { input: "Giá vốn 1.200, giá bán 900", output: "Lỗ 300; margin -33,33%; markup -25%", note: "Phải cho phép profit âm; tên gọi chuyển thành loss nhưng công thức giữ nguyên." }
          ],
          complexity: "O(1) thời gian · O(1) bộ nhớ",
          idea: "Tính profit = revenue-cost, sau đó phân biệt phần trăm trên doanh thu và phần trăm trên vốn để tránh trả lời sai thuật ngữ kinh doanh.",
          steps: ["profit = sellingPrice-cost.", "margin = profit/sellingPrice × 100.", "markup = profit/cost × 100.", "Kiểm tra sellingPrice hoặc cost bằng 0 trước khi chia."],
          java: "Map<String, BigDecimal> profitMetrics(BigDecimal cost, BigDecimal price) {\n    BigDecimal profit = price.subtract(cost);\n    Map<String, BigDecimal> out = new LinkedHashMap<>();\n    out.put(\"profit\", profit);\n    out.put(\"marginPct\", profit.multiply(BigDecimal.valueOf(100)).divide(price, 2, RoundingMode.HALF_UP));\n    out.put(\"markupPct\", profit.multiply(BigDecimal.valueOf(100)).divide(cost, 2, RoundingMode.HALF_UP));\n    return out;\n}",
          js: "function profitMetrics(cost, price) {\n  if (cost === 0 || price === 0) throw new Error('undefined percentage');\n  const profit = price - cost;\n  return { profit, marginPct: profit / price * 100, markupPct: profit / cost * 100 };\n}"
        },
        {
          name: "Lãi đơn và lãi kép theo kỳ",
          diff: "Trung bình",
          trap: "Lãi suất năm phải chia cho số kỳ ghép lãi, còn số mũ phải nhân số kỳ. 8%/năm ghép hàng tháng không phải mỗi tháng 8%; đơn vị rate và time phải nhất quán.",
          alt: {
            title: "Cách khác — lãi đơn",
            complexity: "O(1)",
            note: "Lãi đơn không nhập lãi vào gốc: A = P × (1 + r × t).",
            java: "BigDecimal simpleInterest(BigDecimal p, BigDecimal annualRate, BigDecimal years) {\n    return p.multiply(BigDecimal.ONE.add(annualRate.multiply(years)));\n}"
          },
          examples: [
            { input: "Gốc 100.000.000; 8%/năm; ghép lãi hàng tháng; 2 năm", output: "≈ 117.288.793", note: "100.000.000 × (1 + 0,08/12)^24." },
            { input: "Gốc 10.000.000; lãi đơn 6%/năm; 18 tháng", output: "10.900.000", note: "18 tháng = 1,5 năm; tiền lãi là 900.000." }
          ],
          complexity: "O(periods) với BigDecimal lặp · O(1) bộ nhớ",
          idea: "Lãi kép nhập lãi từng kỳ vào gốc: A=P×(1+r/m)^(m×t). Lãi đơn chỉ tính lãi trên vốn ban đầu.",
          steps: ["Chuẩn hóa annualRate từ phần trăm sang số thập phân.", "periodRate = annualRate/periodsPerYear.", "totalPeriods = years×periodsPerYear.", "Nhân balance với 1+periodRate qua từng kỳ và chỉ làm tròn tiền theo chính sách cuối/kỳ."],
          java: "BigDecimal compound(BigDecimal principal, BigDecimal annualRate, int perYear, int years) {\n    MathContext mc = new MathContext(20, RoundingMode.HALF_EVEN);\n    BigDecimal periodRate = annualRate.divide(BigDecimal.valueOf(perYear), mc);\n    BigDecimal factor = BigDecimal.ONE.add(periodRate);\n    BigDecimal balance = principal;\n    for (int i = 0; i < perYear * years; i++) balance = balance.multiply(factor, mc);\n    return balance.setScale(0, RoundingMode.HALF_UP);\n}",
          js: "function compound(principal, annualRate, perYear, years) {\n  return principal * (1 + annualRate / perYear) ** (perYear * years);\n}\nfunction simpleInterest(principal, annualRate, years) {\n  return principal * (1 + annualRate * years);\n}"
        },
        {
          name: "Khoản vay trả đều hàng tháng — công thức EMI",
          diff: "Trung bình",
          trap: "Nếu lãi suất bằng 0 thì công thức chuẩn chia cho 0; phải trả principal/months. EMI cố định không có nghĩa phần gốc và phần lãi mỗi tháng cố định.",
          alt: {
            title: "Cách khác — sinh bảng khấu hao từng tháng",
            complexity: "O(months)",
            note: "Mỗi tháng: interest=balance×monthlyRate, principalPaid=payment-interest, rồi giảm balance. Tháng cuối điều chỉnh sai số làm tròn.",
            java: "BigDecimal interest = balance.multiply(monthlyRate); BigDecimal principalPaid = payment.subtract(interest);"
          },
          examples: [
            { input: "Vay 500.000.000; 12%/năm; 24 tháng", output: "≈ 23.536.736/tháng", note: "Monthly rate = 1%; tổng trả lớn hơn 500 triệu vì có lãi." },
            { input: "Vay 120.000.000; lãi 0%; 12 tháng", output: "10.000.000/tháng", note: "Đi theo nhánh đặc biệt principal/months." }
          ],
          complexity: "O(1) để tính payment · O(n) nếu dựng amortization schedule",
          idea: "Với dư nợ giảm dần nhưng payment đều, EMI = P×r×(1+r)^n / ((1+r)^n-1), trong đó r là lãi suất tháng.",
          steps: ["Nhận annualRate dạng thập phân, ví dụ 12% là 0,12; monthlyRate = annualRate/12.", "Nếu monthlyRate=0, trả principal/months.", "Tính factor=(1+monthlyRate)^months.", "Áp công thức EMI bằng BigDecimal và làm tròn theo đơn vị tiền; bảng thực tế phải xử lý tháng cuối."],
          java: "BigDecimal monthlyPayment(BigDecimal principal, BigDecimal annualRate, int months) {\n    if (months <= 0 || annualRate.signum() < 0) throw new IllegalArgumentException();\n    MathContext mc = new MathContext(24, RoundingMode.HALF_EVEN);\n    BigDecimal monthlyRate = annualRate.divide(BigDecimal.valueOf(12), mc);\n    if (monthlyRate.signum() == 0)\n        return principal.divide(BigDecimal.valueOf(months), 0, RoundingMode.HALF_UP);\n    BigDecimal factor = BigDecimal.ONE.add(monthlyRate).pow(months, mc);\n    BigDecimal payment = principal.multiply(monthlyRate, mc).multiply(factor, mc)\n        .divide(factor.subtract(BigDecimal.ONE), mc);\n    return payment.setScale(0, RoundingMode.HALF_UP);\n}",
          js: "function monthlyPayment(principal, annualRate, months) {\n  const r = annualRate / 12;\n  if (r === 0) return principal / months;\n  const factor = (1 + r) ** months;\n  return principal * r * factor / (factor - 1);\n}"
        },
        {
          name: "Điểm hòa vốn — cần bán tối thiểu bao nhiêu sản phẩm",
          diff: "Dễ",
          trap: "Contribution per unit = giá bán - biến phí, không phải giá bán. Phải dùng ceiling vì bán thiếu một phần sản phẩm vẫn chưa hòa vốn; nếu contribution <= 0 thì không có điểm hòa vốn hữu hạn.",
          alt: {
            title: "Cách khác — hòa vốn theo doanh thu",
            complexity: "O(1)",
            note: "Break-even revenue = fixedCost / contributionMarginRatio, với ratio=(price-variableCost)/price.",
            java: "BigDecimal ratio = price.subtract(variable).divide(price, 10, RoundingMode.HALF_UP);"
          },
          examples: [
            { input: "Chi phí cố định 100.000.000; giá bán 250.000; biến phí 150.000", output: "1.000 sản phẩm", note: "Mỗi sản phẩm đóng góp 100.000 để bù fixed cost." },
            { input: "Fixed 50.000.000; giá bán 200.000; biến phí 200.000", output: "Không thể hòa vốn", note: "Contribution bằng 0 nên bán thêm không bù được chi phí cố định." }
          ],
          complexity: "O(1) thời gian · O(1) bộ nhớ",
          idea: "Mỗi đơn vị bán ra đóng góp price-variableCost vào việc bù chi phí cố định. Số lượng hòa vốn là ceiling(fixed/contribution).",
          steps: ["Tính contribution = price-variableCost.", "Nếu contribution<=0, báo không có điểm hòa vốn.", "Tính fixedCost/contribution.", "Làm tròn lên số nguyên sản phẩm và có thể tính revenue tương ứng."],
          java: "long breakEvenUnits(long fixedCost, long price, long variableCost) {\n    long contribution = price - variableCost;\n    if (contribution <= 0) throw new IllegalArgumentException(\"no finite break-even\");\n    return (fixedCost + contribution - 1) / contribution;\n}",
          js: "function breakEvenUnits(fixedCost, price, variableCost) {\n  const contribution = price - variableCost;\n  if (contribution <= 0) return Infinity;\n  return Math.ceil(fixedCost / contribution);\n}"
        },
        {
          name: "Giá vốn bình quân sau nhiều lần mua",
          diff: "Trung bình",
          trap: "Không lấy trung bình cộng đơn giản của các mức giá khi số lượng khác nhau. Phí mua phải cộng vào tổng cost; dùng long/BigDecimal vì quantity×price có thể overflow hoặc phát sinh phần lẻ.",
          alt: {
            title: "Cách khác — FIFO cho tồn kho",
            complexity: "O(number of lots consumed)",
            note: "Weighted average gộp các lô; FIFO giữ từng lot và khi bán sẽ lấy cost của lô cũ nhất. Hai phương pháp cho COGS khác nhau.",
            java: "record Lot(BigDecimal quantity, BigDecimal unitCost) {}"
          },
          examples: [
            { input: "Mua 10 đơn vị giá 100; mua 20 đơn vị giá 80", output: "Giá bình quân 86,67", note: "(10×100 + 20×80) / 30, không phải (100+80)/2=90." },
            { input: "Cùng dữ liệu, tổng phí mua 30", output: "Giá vốn bình quân 87,67", note: "Tổng cost 2.630 chia 30 đơn vị." }
          ],
          complexity: "O(n) cho n giao dịch · O(1) nếu cập nhật cộng dồn",
          idea: "Duy trì totalQuantity và totalCost. Mỗi lần mua cộng quantity và quantity×unitPrice+fee; averageCost=totalCost/totalQuantity.",
          steps: ["Khởi tạo totalQuantity=0 và totalCost=0.", "Mỗi lần mua cộng quantity.", "Cộng quantity×price và phí vào totalCost.", "Chia totalCost/totalQuantity với scale và rounding rõ ràng."],
          java: "BigDecimal weightedAverage(List<BigDecimal[]> buys) {\n    BigDecimal qty = BigDecimal.ZERO, cost = BigDecimal.ZERO;\n    for (BigDecimal[] b : buys) {\n        qty = qty.add(b[0]);\n        cost = cost.add(b[0].multiply(b[1])).add(b[2]); // quantity, price, fee\n    }\n    if (qty.signum() == 0) throw new IllegalArgumentException(\"zero quantity\");\n    return cost.divide(qty, 2, RoundingMode.HALF_UP);\n}",
          js: "function weightedAverage(buys) {\n  let quantity = 0, cost = 0;\n  for (const {qty, price, fee = 0} of buys) {\n    quantity += qty; cost += qty * price + fee;\n  }\n  if (quantity === 0) throw new Error('zero quantity');\n  return cost / quantity;\n}"
        }
      ]
    }
  ];

  window.ALGO_DATA = (window.ALGO_DATA || []).concat(businessMathGroups);
})();
