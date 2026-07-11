# Crypto NFT Game — Project Memory

## Tổng quan
Idle/Farming P2E game. NFT đại diện cho nhân vật/tài sản trong game, sinh tài nguyên theo thời gian.
Chain: chưa chốt (đang cân nhắc L2 Ethereum như Base/Polygon để giảm phí gas).

## Cấu trúc
- `contracts/` — Smart contract (Solidity). ERC-721/1155 cho NFT, ERC-20 nếu có token thưởng.
- `indexer/` — Lắng nghe event on-chain, ghi vào database để backend/frontend query nhanh.
- `backend/` — API server: auth qua ví, inventory, leaderboard, matchmaking.
- `frontend/` — Web app kết nối ví, giao diện game, marketplace.
- `shared/` — ABI và type dùng chung giữa backend/frontend, sinh ra từ contracts.
- `assets/` — Ảnh, metadata NFT (chuẩn OpenSea JSON) trước khi upload IPFS.
- `infra/` — Docker, CI/CD.
- `docs/` — Game design doc, tokenomics, whitepaper.

## Quy ước
- Luôn test trên testnet trước, không tự ý deploy mainnet.
- Không hardcode private key/API key — dùng biến môi trường (`.env`, không commit).
- Contract phải có test trước khi coi là "xong".

## Quy trình làm việc theo phiên
- **Luôn đọc [PROGRESS.md](PROGRESS.md) đầu tiên** — file này CHỦ Ý giữ ngắn, chỉ chứa "Đang làm / Tiếp theo". Đủ để biết việc dở dang mà không cần hỏi lại người dùng.
- [TASKS.md](TASKS.md) là bản đồ toàn bộ công việc của dự án (backlog theo giai đoạn) — đọc khi cần biết bức tranh lớn hoặc chọn việc tiếp theo.
- `docs/progress-log/YYYY-MM-DD.md` — nhật ký chi tiết từng ngày, **KHÔNG tự đọc** trừ khi người dùng hỏi về lịch sử cụ thể (tránh tốn token đọc lại toàn bộ quá khứ mỗi phiên).
- Cuối phiên hoặc khi xong 1 việc:
  1. Tick `[x]` task tương ứng trong `TASKS.md`
  2. Ghi/append vào `docs/progress-log/<ngày hôm nay>.md` (tạo file mới nếu chưa có)
  3. Cập nhật khối "Đang làm / Tiếp theo" và "Cập nhật gần nhất" trong `PROGRESS.md` — giữ file này luôn ngắn gọn, không dán lại toàn bộ nhật ký vào đây.

## Lệnh hay dùng
(sẽ cập nhật khi các phần được setup — hiện dự án mới khởi tạo khung thư mục)
