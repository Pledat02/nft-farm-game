# Trạng thái hiện tại

> File này luôn ngắn — đọc mỗi phiên. Lịch sử chi tiết nằm ở `docs/progress-log/YYYY-MM-DD.md`, chỉ đọc khi cần tra cứu.

## Đang làm / Tiếp theo

- [x] Chốt game design — xem [docs/game-design.md](docs/game-design.md) + [docs/tokenomics.md](docs/tokenomics.md)
- [x] Setup Foundry + `contracts/src/GameNFT.sol` (mint/claim/pendingRewards), `forge build` OK
- [x] Test `contracts/test/GameNFT.t.sol` — 7/7 pass
- [x] Rà bảo mật — sửa CEI-ordering trong `mint()`, test lại 7/7 pass
- [x] Deploy testnet — GameNFT live trên Base Sepolia, xem [docs/deployments.md](docs/deployments.md)
- [x] Giai đoạn 1 (Smart contract) hoàn tất, trừ `GameToken.sol` (hoãn theo tokenomics.md)
- [x] Backend scaffold: Express+TS, Prisma+SQLite, API auth/inventory/leaderboard — xem [docs/backend-design.md](docs/backend-design.md)
- [ ] Đang làm: indexer lắng nghe event on-chain (`indexer/`) để đổ dữ liệu vào DB cho backend đọc

## Cập nhật gần nhất

2026-07-11 — Backend API (auth/inventory/leaderboard) chạy được, đã test thủ công + fix 1 bug crash khi signature lỗi. Đang viết indexer — xem chi tiết tại [docs/progress-log/2026-07-11.md](docs/progress-log/2026-07-11.md)
