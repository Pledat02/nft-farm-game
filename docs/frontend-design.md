# Frontend Design (MVP)

> Quyết định mặc định do Claude tự chọn, tiếp nối [game-design.md](game-design.md) và [backend-design.md](backend-design.md). Có thể đổi sau.

## Stack

- **Framework**: Next.js (App Router), TypeScript
- **Kết nối ví**: `wagmi` + `viem` trực tiếp, **không dùng RainbowKit** — giảm dependency. `ConnectButton` liệt kê tất cả ví phát hiện được qua chuẩn **EIP-6963** (multi-injected provider discovery, bật mặc định trong wagmi v2) để người dùng tự chọn đúng ví muốn dùng — quan trọng khi máy cài nhiều ví cùng lúc (MetaMask, Phantom...), tránh xung đột `window.ethereum` giữa các extension
- **Danh sách NFT của người dùng ("của tôi")**: gọi **backend API** (`GET /inventory/:address`) — `GameNFT.sol` là ERC-721 thường, không có extension `Enumerable`, nên không thể liệt kê token của 1 địa chỉ trực tiếp on-chain mà không lặp toàn bộ tokenId (không khả thi khi supply lớn). Sau khi có danh sách tokenId từ backend, đọc `pendingRewards(tokenId)` **trực tiếp on-chain** qua `wagmi` cho từng token để hiển thị số liệu tức thời (không phụ thuộc độ trễ indexer)
- **Leaderboard** (dữ liệu tổng hợp nhiều người chơi): gọi **backend API** (`GET /leaderboard`) — phù hợp hơn vì cần query nhiều token cùng lúc, on-chain không làm được hiệu quả

## Cấu trúc

- `frontend/src/app/` — route (App Router): `page.tsx` (trang chính), `leaderboard/page.tsx`
- `frontend/src/components/` — `ConnectButton`, `FarmerCard`, `MintButton`
- `frontend/src/lib/web3.ts` — cấu hình wagmi (chain Base Sepolia, connector injected)
- `frontend/src/lib/contract.ts` — địa chỉ contract + ABI (import từ `shared/abi/GameNFT.json`)
- `frontend/src/hooks/` — custom hook nếu cần (vd `useFarmerNFTs`)
- `frontend/src/pages/` — thư mục rỗng còn lại từ lúc scaffold ban đầu (dự tính cho Pages Router), không dùng vì đã chọn App Router. Giữ nguyên, không xóa.

## Trang chính (MVP)

1. Nút Connect Wallet (nếu chưa kết nối)
2. Nút "Mint Farmer" — gọi `mint()` trên contract
3. Danh sách Farmer NFT của người dùng hiện tại: tokenId, level, pending rewards (đọc `pendingRewards()` on-chain)
4. Nút "Claim" trên mỗi Farmer — gọi `claim(tokenId)`

## Trang Leaderboard

Bảng xếp hạng theo `resourcePoints`, dữ liệu lấy từ `GET {BACKEND_URL}/leaderboard`.

## Ngoài phạm vi MVP

- Marketplace giao dịch NFT — hoãn lại (đã ghi trong game-design.md, cần thiết kế hợp đồng riêng)
- Đăng nhập qua backend (SIWE) — backend đã có sẵn API auth, nhưng MVP frontend chưa cần vì chưa có route nào yêu cầu auth
