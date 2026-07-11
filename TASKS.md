# Danh sách công việc toàn dự án

> File này là bản đồ toàn bộ việc cần làm (backlog). Xem [PROGRESS.md](PROGRESS.md) để biết nhật ký/việc đang dở theo từng phiên.

## Giai đoạn 0 — Xác định phạm vi
- [x] Chốt thể loại gameplay — Idle/Farming P2E (quyết định mặc định, xem [docs/game-design.md](docs/game-design.md), có thể đổi)
- [x] Chốt vai trò NFT — NFT = nhân vật (Farmer), xem docs/game-design.md
- [x] Quyết định token ERC-20 — chưa làm ở MVP, xem [docs/tokenomics.md](docs/tokenomics.md)
- [x] Chốt chain — Base Sepolia (testnet), xem docs/game-design.md

## Giai đoạn 1 — Smart contract
- [ ] Viết `GameNFT.sol` (ERC-721/1155)
- [ ] Viết `GameToken.sol` (nếu có token)
- [ ] Viết logic game on-chain (farm/stake/reward)
- [ ] Viết test cho toàn bộ contract
- [ ] Rà bảo mật (dùng agent `contract-auditor`)
- [ ] Deploy testnet

## Giai đoạn 2 — Backend
- [ ] Setup indexer lắng nghe event on-chain
- [ ] API auth bằng chữ ký ví (SIWE)
- [ ] API inventory/leaderboard
- [ ] Kết nối database

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
