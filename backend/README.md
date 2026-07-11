# Backend

API server xử lý logic không cần on-chain.

- `src/routes/` — Endpoint: /auth, /inventory, /leaderboard...
- `src/services/` — Business logic
- `src/db/` — Schema & migration
- `src/auth/` — Xác thực bằng chữ ký ví (SIWE), không dùng mật khẩu
