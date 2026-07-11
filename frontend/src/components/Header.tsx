import Link from "next/link";
import { Sprout, Trophy } from "lucide-react";
import { ConnectButton } from "@/components/ConnectButton";

export function Header({ active }: { active: "home" | "leaderboard" }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Sprout size={20} strokeWidth={2.25} />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight hidden sm:inline">
            NFT Farm Game
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/leaderboard"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active === "leaderboard"
                ? "bg-primary-soft text-primary"
                : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <Trophy size={16} />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
        </nav>

        <ConnectButton />
      </div>
    </header>
  );
}
