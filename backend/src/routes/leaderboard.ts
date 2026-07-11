import { Router } from "express";
import { prisma } from "../db/client.js";

export const leaderboardRouter = Router();

leaderboardRouter.get("/", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);

  const all = await prisma.farmerNFT.findMany({
    orderBy: { tokenId: "asc" },
  });

  // resourcePoints stored as string (uint256 can exceed JS number range),
  // so sort with BigInt comparison instead of a DB-level numeric orderBy.
  const top = all
    .sort((a, b) => (BigInt(b.resourcePoints) > BigInt(a.resourcePoints) ? 1 : -1))
    .slice(0, limit);

  res.json({ leaderboard: top });
});
