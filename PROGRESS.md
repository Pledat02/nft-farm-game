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
- [x] Indexer (`indexer/`) — test end-to-end thật trên Base Sepolia: mint/claim on-chain → indexer sync → API trả đúng dữ liệu
- [ ] Giai đoạn 2 (Backend) hoàn tất. Tiếp theo: Giai đoạn 3 (Frontend) hoặc việc khác — chờ quyết định

## Cập nhật gần nhất

2026-07-11 — Indexer hoàn tất, test end-to-end thật trên testnet thành công (mint + claim đều được đồng bộ đúng). Giai đoạn 2 xong hoàn toàn — xem chi tiết tại [docs/progress-log/2026-07-11.md](docs/progress-log/2026-07-11.md)
