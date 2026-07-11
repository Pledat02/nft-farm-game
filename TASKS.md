# Danh sách công việc toàn dự án

> File này là bản đồ toàn bộ việc cần làm (backlog). Xem [PROGRESS.md](PROGRESS.md) để biết nhật ký/việc đang dở theo từng phiên.

## Giai đoạn 0 — Xác định phạm vi
- [x] Chốt thể loại gameplay — Idle/Farming P2E (quyết định mặc định, xem [docs/game-design.md](docs/game-design.md), có thể đổi)
- [x] Chốt vai trò NFT — NFT = nhân vật (Farmer), xem docs/game-design.md
- [x] Quyết định token ERC-20 — chưa làm ở MVP, xem [docs/tokenomics.md](docs/tokenomics.md)
- [x] Chốt chain — Base Sepolia (testnet), xem docs/game-design.md

## Giai đoạn 1 — Smart contract
- [x] Setup Foundry (`foundry.toml`, `forge-std`, `openzeppelin-contracts`)
- [x] Viết `GameNFT.sol` (ERC-721) — mint, claim, pendingRewards; compile thành công
- [ ] `GameToken.sol` — hoãn lại, xem [docs/tokenomics.md](docs/tokenomics.md) (chưa cần ở MVP)
- [x] Viết test cho `GameNFT.sol` — 7/7 test pass (`forge test`)
- [x] Rà bảo mật — sửa 1 vấn đề CEI-ordering trong `mint()`, ghi chú 2 design note (mint không giới hạn, Ownable chưa dùng); test lại 7/7 pass
- [x] Deploy testnet — GameNFT live trên Base Sepolia tại `0x8F2AfEd590CF2C83a08672AFdf341D5c388ebAF6` (chain 84532)

## Giai đoạn 2 — Backend
- [ ] Setup indexer lắng nghe event on-chain
- [x] API auth bằng chữ ký ví — `/auth/nonce` + `/auth/verify` (viem verifyMessage + JWT), test thủ công OK kể cả signature lỗi (đã fix crash)
- [x] API inventory/leaderboard — `/inventory/:address`, `/leaderboard`, test thủ công OK
- [x] Kết nối database — Prisma + SQLite, migration `init` đã chạy, xem [docs/backend-design.md](docs/backend-design.md)

## Giai đoạn 3 — Frontend/Game client
- [ ] Kết nối ví (wagmi/RainbowKit)
- [ ] Giao diện game chính
- [ ] Marketplace mua bán NFT

## Giai đoạn 4 — Hạ tầng & vận hành
- [ ] Upload metadata/asset lên IPFS
- [ ] CI/CD (staging vs mainnet)
- [ ] Test kỹ trên testnet
- [ ] Deploy mainnet (cần xác nhận rõ ràng, không tự động)

---
Cập nhật: đánh dấu `[x]` khi xong, có thể thêm task con nếu 1 mục quá lớn.
