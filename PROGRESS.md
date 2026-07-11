# Trạng thái hiện tại

> File này luôn ngắn — đọc mỗi phiên. Lịch sử chi tiết nằm ở `docs/progress-log/YYYY-MM-DD.md`, chỉ đọc khi cần tra cứu.

## Đang làm / Tiếp theo

- [x] Chốt game design — xem [docs/game-design.md](docs/game-design.md) + [docs/tokenomics.md](docs/tokenomics.md)
- [x] Setup Foundry + `contracts/src/GameNFT.sol` (mint/claim/pendingRewards), `forge build` OK
- [x] Test `contracts/test/GameNFT.t.sol` — 7/7 pass
- [x] Rà bảo mật — sửa CEI-ordering trong `mint()`, test lại 7/7 pass
- [ ] Tất cả milestone contract (Giai đoạn 1, trừ deploy) đã xong — đang chờ xác nhận có push lên GitHub + bước tiếp theo (deploy testnet cần ví từ người dùng, hoặc chuyển sang Backend)

## Cập nhật gần nhất

2026-07-11 — Milestone 4 xong (audit + fix bảo mật), toàn bộ contract MVP đã sẵn sàng local, chưa deploy/chưa push — xem chi tiết tại [docs/progress-log/2026-07-11.md](docs/progress-log/2026-07-11.md)
