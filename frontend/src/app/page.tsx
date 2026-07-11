"use client";

import { useAccount } from "wagmi";
import { Sprout, Wallet } from "lucide-react";
import { Header } from "@/components/Header";
import { MintButton } from "@/components/MintButton";
import { FarmerCard } from "@/components/FarmerCard";
import { useFarmerNFTs } from "@/hooks/useFarmerNFTs";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-surface-muted" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-surface-muted" />
          <div className="h-3 w-14 rounded bg-surface-muted" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 rounded-xl bg-surface-muted" />
        <div className="h-12 rounded-xl bg-surface-muted" />
      </div>
      <div className="h-9 rounded-lg bg-surface-muted" />
    </div>
  );
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: farmers, isLoading, refetch } = useFarmerNFTs(address);

  return (
    <div className="flex-1 flex flex-col">
      <Header active="home" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        {!isConnected && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Wallet size={26} />
            </span>
            <div className="space-y-1">
              <h2 className="font-heading text-lg font-bold">Chưa kết nối ví</h2>
              <p className="text-sm text-foreground-muted max-w-xs">
                Kết nối ví Base Sepolia của bạn để mint và chăm sóc Farmer.
              </p>
            </div>
          </div>
        )}

        {isConnected && (
          <>
            <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
              <div>
                <h1 className="font-heading text-xl font-bold">Nông trại của bạn</h1>
                <p className="text-sm text-foreground-muted mt-0.5">
                  Mint Farmer mới hoặc claim tài nguyên đã tích lũy.
                </p>
              </div>
              <MintButton onMinted={() => refetch()} />
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold">Farmer của bạn</h2>
                {!isLoading && (
                  <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-foreground-muted">
                    {farmers?.length ?? 0}
                  </span>
                )}
              </div>

              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}

              {!isLoading && farmers?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-14 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Sprout size={24} />
                  </span>
                  <p className="text-sm text-foreground-muted max-w-xs">
                    Chưa có Farmer nào — mint 1 con để bắt đầu tích lũy tài nguyên.
                  </p>
                </div>
              )}

              {!isLoading && farmers && farmers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {farmers.map((farmer) => (
                    <FarmerCard key={farmer.tokenId} farmer={farmer} onClaimed={() => refetch()} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
