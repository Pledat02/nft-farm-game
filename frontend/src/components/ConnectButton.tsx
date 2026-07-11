"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, variables } = useConnect();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);

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

  if (connectors.length === 0) {
    return (
      <button disabled className="rounded bg-foreground px-4 py-2 text-sm text-background opacity-50">
        Không tìm thấy ví (cài MetaMask)
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        disabled={isPending}
        className="rounded bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
      >
        {isPending ? `Đang kết nối ${variables?.connector.name ?? ""}...` : "Kết nối ví"}
      </button>

      {menuOpen && !isPending && (
        <div className="absolute right-0 mt-1 w-48 rounded border bg-background shadow-lg z-10">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-left hover:bg-black/5"
            >
              {connector.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={connector.icon} alt="" width={18} height={18} />
              )}
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
