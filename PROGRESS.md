# Trạng thái hiện tại

> File này luôn ngắn — đọc mỗi phiên. Lịch sử chi tiết nằm ở `docs/progress-log/YYYY-MM-DD.md`, chỉ đọc khi cần tra cứu.

## Đang làm / Tiếp theo

- [x] Chốt game design — xem [docs/game-design.md](docs/game-design.md) + [docs/tokenomics.md](docs/tokenomics.md)
- [x] Setup Foundry + `contracts/src/GameNFT.sol` (mint/claim/pendingRewards), `forge build` OK
- [x] Test `contracts/test/GameNFT.t.sol` — 7/7 pass
- [x] Rà bảo mật — sửa CEI-ordering trong `mint()`, test lại 7/7 pass
- [x] Deploy testnet — GameNFT live trên Base Sepolia, xem [docs/deployments.md](docs/deployments.md)
- [ ] Giai đoạn 1 (Smart contract) hoàn tất, trừ `GameToken.sol` (hoãn theo tokenomics.md). Tiếp theo: chờ quyết định — Backend (Giai đoạn 2) hay việc khác

## Cập nhật gần nhất

2026-07-11 — Deploy GameNFT thành công lên Base Sepolia tại `0x8F2AfEd590CF2C83a08672AFdf341D5c388ebAF6` — xem chi tiết tại [docs/progress-log/2026-07-11.md](docs/progress-log/2026-07-11.md)
