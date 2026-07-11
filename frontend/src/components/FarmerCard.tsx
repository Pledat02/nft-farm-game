"use client";

import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Coins, Loader2, Sparkles, Sprout } from "lucide-react";
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

  const busy = isPending || isConfirming;
  const pendingValue = pending as bigint | undefined;
  const hasPending = pendingValue != null && pendingValue > BigInt(0);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Sprout size={22} strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <div className="font-heading font-bold truncate">Farmer #{farmer.tokenId}</div>
          <div className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-foreground-muted">
            Level {farmer.level}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface-muted px-3 py-2">
          <div className="flex items-center gap-1 text-xs text-foreground-muted">
            <Coins size={13} /> Đã tích lũy
          </div>
          <div className="font-mono tabular-nums font-semibold">{farmer.resourcePoints}</div>
        </div>
        <div className="rounded-xl bg-accent-soft px-3 py-2">
          <div className="flex items-center gap-1 text-xs text-accent-foreground/70">
            <Sparkles size={13} /> Chờ claim
          </div>
          <div className="font-mono tabular-nums font-semibold text-accent-foreground">
            {pendingValue != null ? pendingValue.toString() : "..."}
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          writeContract({
            address: gameNFTAddress,
            abi: gameNFTAbi_,
            functionName: "claim",
            args: [BigInt(farmer.tokenId)],
          })
        }
        disabled={busy || !hasPending}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {busy && <Loader2 size={15} className="animate-spin" />}
        {isPending ? "Chờ xác nhận ví..." : isConfirming ? "Đang claim..." : "Claim"}
      </button>
    </div>
  );
}
