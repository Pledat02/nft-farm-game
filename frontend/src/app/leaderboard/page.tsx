"use client";

import { Coins, Trophy, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const RANK_STYLE: Record<number, string> = {
  1: "bg-amber-100 text-amber-700",
  2: "bg-zinc-200 text-zinc-600",
  3: "bg-orange-100 text-orange-700",
};

function RankBadge({ rank }: { rank: number }) {
  const style = RANK_STYLE[rank];
  if (style) {
    return (
      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${style}`}>
        <Trophy size={14} />
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-foreground-muted">
      {rank}
    </span>
  );
}

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useLeaderboard();

  return (
    <div className="flex-1 flex flex-col">
      <Header active="leaderboard" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-4">
        <div>
          <h1 className="font-heading text-xl font-bold">Leaderboard</h1>
          <p className="text-sm text-foreground-muted mt-0.5">
            Xếp hạng Farmer theo tài nguyên đã tích lũy.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          {isLoading && (
            <div className="divide-y divide-border">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                  <div className="h-7 w-7 rounded-full bg-surface-muted" />
                  <div className="h-4 flex-1 rounded bg-surface-muted" />
                  <div className="h-4 w-16 rounded bg-surface-muted" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && leaderboard && leaderboard.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted/60 text-left text-xs font-medium text-foreground-muted">
                  <th className="py-2.5 pl-4 pr-2 font-medium">Hạng</th>
                  <th className="py-2.5 px-2 font-medium">Farmer</th>
                  <th className="py-2.5 px-2 font-medium hidden sm:table-cell">Chủ sở hữu</th>
                  <th className="py-2.5 px-2 font-medium">Level</th>
                  <th className="py-2.5 pl-2 pr-4 font-medium text-right">Resource Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboard.map((farmer, i) => (
                  <tr key={farmer.tokenId} className="hover:bg-surface-muted/40 transition-colors">
                    <td className="py-2.5 pl-4 pr-2">
                      <RankBadge rank={i + 1} />
                    </td>
                    <td className="py-2.5 px-2 font-mono font-medium">#{farmer.tokenId}</td>
                    <td className="py-2.5 px-2 font-mono text-foreground-muted hidden sm:table-cell">
                      {farmer.owner.slice(0, 6)}...{farmer.owner.slice(-4)}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium">
                        Lv {farmer.level}
                      </span>
                    </td>
                    <td className="py-2.5 pl-2 pr-4 text-right">
                      <span className="inline-flex items-center gap-1 font-mono tabular-nums font-semibold text-accent-foreground">
                        {farmer.resourcePoints}
                        <Coins size={13} className="text-accent" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && leaderboard?.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Users size={24} />
              </span>
              <p className="text-sm text-foreground-muted max-w-xs">
                Chưa có Farmer nào được mint.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
