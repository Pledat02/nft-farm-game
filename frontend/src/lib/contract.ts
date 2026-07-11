import gameNFTAbi from "./gameNFTAbi.json";

// Bản sao thủ công của shared/abi/GameNFT.json (xem docs/frontend-design.md
// và indexer/prisma/schema.prisma cho lý do tương tự: chưa có npm workspaces
// nên mỗi package tự giữ 1 bản, cập nhật thủ công khi contract đổi).
export const gameNFTAbi_ = gameNFTAbi;

export const gameNFTAddress = (process.env.NEXT_PUBLIC_GAME_NFT_ADDRESS ??
  "0x8F2AfEd590CF2C83a08672AFdf341D5c388ebAF6") as `0x${string}`;
