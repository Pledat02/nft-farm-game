"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ChevronDown, LogOut, Wallet } from "lucide-react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, variables } = useConnect();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
          <span className="font-mono tabular-nums">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </span>
        <button
          onClick={() => disconnect()}
          aria-label="Ngắt kết nối ví"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground cursor-pointer"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Ngắt kết nối</span>
        </button>
      </div>
    );
  }

  if (connectors.length === 0) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-lg bg-surface-muted px-4 py-2 text-sm font-medium text-foreground-muted opacity-70"
      >
        <Wallet size={16} />
        Không tìm thấy ví
      </button>
    );
  }

  return (
    <div className="relative">
      {menuOpen && (
        <button
          aria-label="Đóng menu"
          className="fixed inset-0 z-10 cursor-default"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <button
        onClick={() => setMenuOpen((v) => !v)}
        disabled={isPending}
        aria-expanded={menuOpen}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
      >
        <Wallet size={16} />
        {isPending ? `Đang kết nối ${variables?.connector.name ?? ""}...` : "Kết nối ví"}
        {!isPending && <ChevronDown size={15} className={menuOpen ? "rotate-180 transition-transform" : "transition-transform"} />}
      </button>

      {menuOpen && !isPending && (
        <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-left text-foreground hover:bg-surface-muted cursor-pointer"
            >
              {connector.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={connector.icon} alt="" width={20} height={20} className="rounded" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded bg-surface-muted text-foreground-muted">
                  <Wallet size={13} />
                </span>
              )}
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
