import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import gameNFTAbi from "../../shared/abi/GameNFT.json" with { type: "json" };

const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL;
const contractAddress = process.env.GAME_NFT_ADDRESS;

if (!rpcUrl) throw new Error("BASE_SEPOLIA_RPC_URL env var is required");
if (!contractAddress) throw new Error("GAME_NFT_ADDRESS env var is required");

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(rpcUrl),
});

export const gameNFTAddress = contractAddress as `0x${string}`;
export const gameNFTAbi_ = gameNFTAbi;
