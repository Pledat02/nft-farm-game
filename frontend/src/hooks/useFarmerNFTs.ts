"use client";

import { useQuery } from "@tanstack/react-query";

export interface FarmerNFT {
  tokenId: number;
  owner: string;
  level: number;
  resourcePoints: string;
  lastClaimTime: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

export function useFarmerNFTs(address: string | undefined) {
  return useQuery({
    queryKey: ["inventory", address],
    queryFn: async (): Promise<FarmerNFT[]> => {
      const res = await fetch(`${backendUrl}/inventory/${address}`);
      if (!res.ok) throw new Error("failed to fetch inventory");
      const data = await res.json();
      return data.nfts as FarmerNFT[];
    },
    enabled: Boolean(address),
    refetchInterval: 15000,
  });
}
