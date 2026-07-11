# Backend Design (MVP)

> Quyết định mặc định do Claude tự chọn, tiếp nối [game-design.md](game-design.md). Có thể đổi sau.

## Stack

- **Ngôn ngữ**: TypeScript, chạy bằng Node.js (`tsx` cho dev, không cần build step riêng ở MVP)
- **Framework API**: Express — nhẹ, quen thuộc, đủ dùng cho vài endpoint MVP
- **Database**: SQLite qua Prisma ORM — không cần cài đặt/host DB server riêng, phù hợp giai đoạn dev/MVP. Có thể đổi sang Postgres sau bằng cách đổi `datasource` trong Prisma schema, code không cần sửa nhiều
- **Tương tác blockchain**: `viem` — TypeScript-first, dùng chung được cho cả indexer (watch event) và backend (verify chữ ký)
- **Auth**: Chữ ký ví kiểu SIWE đơn giản hoá — không dùng thư viện `siwe` đầy đủ để giảm dependency, tự implement: `nonce` ngẫu nhiên + `viem.verifyMessage` + JWT (`jsonwebtoken`)

## Luồng auth

1. Client gọi `POST /auth/nonce { address }` → server tạo nonce ngẫu nhiên, lưu tạm (in-memory Map, đủ cho MVP single-instance), trả về message cần ký
2. Client ký message bằng ví (MetaMask...), gửi `POST /auth/verify { address, signature }`
3. Server verify bằng `viem.verifyMessage`, nếu đúng → phát JWT, xoá nonce đã dùng (chống replay)
4. Client dùng JWT cho các API cần auth sau này (hiện MVP chưa có API nào bắt buộc auth)

## Database schema (Prisma, xem `backend/prisma/schema.prisma`)

- `Player` — address (ví, khoá chính), createdAt
- `FarmerNFT` — cache dữ liệu on-chain: tokenId, owner, level, resourcePoints, lastClaimTime, updatedAt
- `ClaimEvent` — lịch sử claim: tokenId, amount, txHash, blockNumber, timestamp

Indexer là nguồn ghi duy nhất vào `FarmerNFT`/`ClaimEvent` — backend API chỉ đọc (read-only), tránh lệch dữ liệu on-chain vs off-chain.

## Indexer

Script riêng trong `indexer/`, dùng `viem.createPublicClient` + `watchContractEvent` lắng nghe
`Minted` và `Claimed` từ `GameNFT` (địa chỉ xem [deployments.md](deployments.md)) trên Base Sepolia,
upsert vào SQLite dùng chung với backend qua Prisma.

## API endpoints (MVP)

- `POST /auth/nonce` — lấy nonce để ký
- `POST /auth/verify` — xác thực chữ ký, trả JWT
- `GET /inventory/:address` — danh sách NFT của 1 địa chỉ (đọc từ cache DB)
- `GET /leaderboard` — top N theo `resourcePoints`, đọc từ cache DB

## Ngoài phạm vi MVP

- Matchmaking, session ngoài JWT đơn giản
- Rate limiting, caching layer riêng (Redis...)
- Chuyển sang Postgres/hosted DB — chỉ cần khi lên staging/production thật
