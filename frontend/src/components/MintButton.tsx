"use client";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { gameNFTAbi_, gameNFTAddress } from "@/lib/contract";

export function MintButton({ onMinted }: { onMinted?: () => void }) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) onMinted?.();

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() =>
          writeContract({
            address: gameNFTAddress,
            abi: gameNFTAbi_,
            functionName: "mint",
          })
        }
        disabled={isPending || isConfirming}
        className="rounded bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
      >
        {isPending ? "Chờ xác nhận ví..." : isConfirming ? "Đang mint..." : "Mint Farmer mới"}
      </button>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
