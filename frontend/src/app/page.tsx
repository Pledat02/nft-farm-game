"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { MintButton } from "@/components/MintButton";
import { FarmerCard } from "@/components/FarmerCard";
import { useFarmerNFTs } from "@/hooks/useFarmerNFTs";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: farmers, isLoading, refetch } = useFarmerNFTs(address);

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full p-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">NFT Farm Game</h1>
        <div className="flex items-center gap-3">
          <Link href="/leaderboard" className="text-sm underline">
            Leaderboard
          </Link>
          <ConnectButton />
        </div>
      </header>

      {!isConnected && <p className="text-sm text-gray-500">Kết nối ví để bắt đầu chơi.</p>}

      {isConnected && (
        <>
          <MintButton onMinted={() => refetch()} />

          <section className="flex flex-col gap-3">
            <h2 className="font-medium">Farmer của bạn</h2>
            {isLoading && <p className="text-sm text-gray-500">Đang tải...</p>}
            {!isLoading && farmers?.length === 0 && (
              <p className="text-sm text-gray-500">Chưa có Farmer nào — mint 1 con để bắt đầu.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {farmers?.map((farmer) => (
                <FarmerCard key={farmer.tokenId} farmer={farmer} onClaimed={() => refetch()} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
