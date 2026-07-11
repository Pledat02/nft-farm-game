# Indexer

Lắng nghe event on-chain (Mint, Transfer, Trade...) và ghi vào database
để backend/frontend query nhanh mà không cần gọi trực tiếp blockchain mỗi lần.

- `src/listeners/` — Mỗi file lắng nghe 1 loại event từ contract
