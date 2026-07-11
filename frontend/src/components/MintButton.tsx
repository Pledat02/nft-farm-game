"use client";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Loader2, Sprout } from "lucide-react";
import { gameNFTAbi_, gameNFTAddress } from "@/lib/contract";

export function MintButton({ onMinted }: { onMinted?: () => void }) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) onMinted?.();

  const busy = isPending || isConfirming;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() =>
          writeContract({
            address: gameNFTAddress,
            abi: gameNFTAbi_,
            functionName: "mint",
          })
        }
        disabled={busy}
        className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-fit"
      >
        {busy ? <Loader2 size={17} className="animate-spin" /> : <Sprout size={17} />}
        {isPending ? "Chờ xác nhận ví..." : isConfirming ? "Đang mint..." : "Mint Farmer mới"}
      </button>
      {error && (
        <p className="rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
          {error.message.split("\n")[0]}
        </p>
      )}
    </div>
  );
}
