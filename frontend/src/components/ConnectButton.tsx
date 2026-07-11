"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="rounded border px-3 py-1 text-sm hover:bg-black/5"
        >
          Ngắt kết nối
        </button>
      </div>
    );
  }

  const connector = connectors[0];

  return (
    <button
      onClick={() => connector && connect({ connector })}
      disabled={!connector || isPending}
      className="rounded bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
    >
      {isPending
        ? "Đang kết nối..."
        : connector
          ? "Kết nối ví"
          : "Không tìm thấy ví (cài MetaMask)"}
    </button>
  );
}
