# Game Design (MVP)

> Quyết định mặc định do Claude tự chọn để có thể bắt đầu xây dựng ngay. Có thể đổi bất cứ lúc nào — chỉ cần nói rõ muốn thay đổi phần nào.

## Thể loại

Idle/Farming P2E. Người chơi sở hữu nhân vật NFT, nhân vật tự sinh tài nguyên
theo thời gian mà không cần thao tác liên tục — người chơi quay lại "claim"
định kỳ.

## NFT

- Mỗi NFT là **1 nhân vật (Farmer)**, chuẩn ERC-721.
- Thuộc tính on-chain:
  - `level` (uint) — bắt đầu từ 1, ảnh hưởng tốc độ sinh resource
  - `lastClaimTime` (uint) — thời điểm claim gần nhất
  - `resourcePoints` (uint) — tài nguyên đã tích lũy, chưa rút

## Vòng lặp gameplay (MVP)

1. Người chơi mint 1 NFT Farmer
2. Thời gian trôi qua → Farmer tự tích lũy resource point (tốc độ phụ thuộc `level`)
3. Người chơi gọi `claim(tokenId)` để cộng dồn resource point tích lũy vào số dư, reset đồng hồ
4. (Giai đoạn sau) Resource point dùng để nâng cấp level hoặc đổi sang token/marketplace

## Ngoài phạm vi MVP (để sau)

- Breeding/lai tạo NFT
- PvP/chiến đấu
- Marketplace giao dịch NFT
- Vật phẩm/trang bị NFT riêng

## Chain & tooling

- Testnet: **Base Sepolia** (L2 Ethereum, phí thấp, tooling Foundry hỗ trợ tốt)
- Contract: Foundry + OpenZeppelin
- Không deploy mainnet cho tới khi có xác nhận rõ ràng
