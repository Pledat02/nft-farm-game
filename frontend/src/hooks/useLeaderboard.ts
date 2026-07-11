"use client";

import { useQuery } from "@tanstack/react-query";
import type { FarmerNFT } from "./useFarmerNFTs";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async (): Promise<FarmerNFT[]> => {
      const res = await fetch(`${backendUrl}/leaderboard`);
      if (!res.ok) throw new Error("failed to fetch leaderboard");
      const data = await res.json();
      return data.leaderboard as FarmerNFT[];
    },
    refetchInterval: 15000,
  });
}
