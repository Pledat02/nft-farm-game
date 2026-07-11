"use client";

import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { gameNFTAbi_, gameNFTAddress } from "@/lib/contract";
import type { FarmerNFT } from "@/hooks/useFarmerNFTs";

export function FarmerCard({ farmer, onClaimed }: { farmer: FarmerNFT; onClaimed?: () => void }) {
  const { data: pending, refetch } = useReadContract({
    address: gameNFTAddress,
    abi: gameNFTAbi_,
    functionName: "pendingRewards",
    args: [BigInt(farmer.tokenId)],
    query: { refetchInterval: 5000 },
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) {
    refetch();
    onClaimed?.();
  }

  return (
    <div className="rounded border p-4 flex flex-col gap-2">
      <div className="font-mono text-sm">Farmer #{farmer.tokenId}</div>
      <div>Level: {farmer.level}</div>
      <div>Đã tích lũy (cache): {farmer.resourcePoints}</div>
      <div>Đang chờ claim: {pending != null ? pending.toString() : "..."}</div>
      <button
        onClick={() =>
          writeContract({
            address: gameNFTAddress,
            abi: gameNFTAbi_,
            functionName: "claim",
            args: [BigInt(farmer.tokenId)],
          })
        }
        disabled={isPending || isConfirming}
        className="rounded border px-3 py-1 text-sm hover:bg-black/5 disabled:opacity-50"
      >
        {isPending ? "Chờ xác nhận ví..." : isConfirming ? "Đang claim..." : "Claim"}
      </button>
    </div>
  );
}
