"use client";

import Link from "next/link";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useLeaderboard();

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full p-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leaderboard</h1>
        <Link href="/" className="text-sm underline">
          Về trang chính
        </Link>
      </header>

      {isLoading && <p className="text-sm text-gray-500">Đang tải...</p>}

      {!isLoading && (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">#</th>
              <th className="py-2">Farmer</th>
              <th className="py-2">Chủ sở hữu</th>
              <th className="py-2">Level</th>
              <th className="py-2">Resource Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((farmer, i) => (
              <tr key={farmer.tokenId} className="border-b">
                <td className="py-2">{i + 1}</td>
                <td className="py-2 font-mono">#{farmer.tokenId}</td>
                <td className="py-2 font-mono">
                  {farmer.owner.slice(0, 6)}...{farmer.owner.slice(-4)}
                </td>
                <td className="py-2">{farmer.level}</td>
                <td className="py-2">{farmer.resourcePoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && leaderboard?.length === 0 && (
        <p className="text-sm text-gray-500">Chưa có Farmer nào được mint.</p>
      )}
    </main>
  );
}
