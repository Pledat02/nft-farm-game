import { Router } from "express";
import { isAddress } from "viem";
import { prisma } from "../db/client.js";

export const inventoryRouter = Router();

inventoryRouter.get("/:address", async (req, res) => {
  const { address } = req.params;
  if (!isAddress(address)) {
    return res.status(400).json({ error: "invalid address" });
  }

  const nfts = await prisma.farmerNFT.findMany({
    where: { owner: address.toLowerCase() },
    orderBy: { tokenId: "asc" },
  });

  res.json({ address, nfts });
});
