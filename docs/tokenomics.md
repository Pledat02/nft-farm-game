# Tokenomics (MVP)

> Quyết định mặc định do Claude tự chọn — đơn giản hóa tối đa cho giai đoạn MVP, tránh rủi ro tokenomics/pháp lý phức tạp trước khi có người chơi thật.

## Giai đoạn MVP: chưa có ERC-20 token

Resource point là một con số lưu **ngay trong contract `GameNFT`**
(`resourcePoints[tokenId]`), không phải token ERC-20 riêng, không thể
chuyển/rút ra ngoài contract ở giai đoạn này.

Lý do:
- Token ERC-20 thật kéo theo câu hỏi về nguồn cung, lạm phát, niêm yết, pháp lý — chưa cần thiết khi chưa có gameplay hoàn chỉnh để kiểm chứng
- Giữ scope nhỏ giúp launch nhanh, học được điều chỉnh cân bằng game trước khi gắn giá trị tài chính thật vào

## Công thức sinh resource (đề xuất, có thể chỉnh)

```
resource sinh ra = (thời gian từ lần claim gần nhất tính bằng giây) × baseRate × level
```

`baseRate` là hằng số cấu hình trong contract (ví dụ 1 point/giờ ở level 1).

## Roadmap sau MVP (chưa làm ngay)

1. Nếu game có người chơi thật và cần giao dịch resource → thiết kế `GameToken.sol` (ERC-20), có cơ chế mint có giới hạn (không mint vô hạn theo claim)
2. Cân bằng nguồn cung: resource point on-chain hiện tại → đổi sang token theo tỷ lệ cố định, có thể áp burn khi nâng cấp để chống lạm phát
3. Marketplace giao dịch NFT (ETH/stablecoin trước, token riêng sau nếu có)

## Nguyên tắc

- Không mint token/resource ngoài công thức đã định nghĩa trong contract (không có "admin mint tùy ý" trừ khi có giới hạn rõ ràng và mục đích cụ thể — ví dụ airdrop test)
- Mọi thay đổi tokenomics phải cập nhật lại file này trước khi code
