---
name: deploy-contract
description: Quy trình chuẩn để deploy smart contract lên testnet - compile, test, deploy, verify. Dùng khi cần đưa contract mới hoặc đã sửa lên testnet.
---

# Deploy Contract (Testnet)

1. Compile contract (`forge build` hoặc `npx hardhat compile`)
2. Chạy toàn bộ test, dừng lại nếu có test fail
3. Deploy lên testnet đã cấu hình trong `contracts/script/`
4. Verify contract trên block explorer (Etherscan/Basescan testnet)
5. Copy ABI mới vào `shared/abi/`
6. Ghi địa chỉ contract vừa deploy vào `docs/` hoặc file cấu hình env

Không được tự động chạy bước deploy lên mainnet — luôn cần xác nhận rõ ràng từ người dùng.
