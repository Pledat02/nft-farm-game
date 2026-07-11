import { prisma } from "../db/client.js";
import { gameNFTAbi_, gameNFTAddress, publicClient } from "../chain.js";

/// Re-reads on-chain state for a tokenId and upserts the local cache.
/// Chosen over reconstructing state purely from event args so the cache
/// always reflects ground truth on-chain, even if events are processed
/// out of order or missed and later backfilled.
async function syncToken(tokenId: bigint) {
  const [owner, level, lastClaimTime, resourcePoints] = await Promise.all([
    publicClient.readContract({
      address: gameNFTAddress,
      abi: gameNFTAbi_,
      functionName: "ownerOf",
      args: [tokenId],
    }) as Promise<string>,
    publicClient.readContract({
      address: gameNFTAddress,
      abi: gameNFTAbi_,
      functionName: "level",
      args: [tokenId],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: gameNFTAddress,
      abi: gameNFTAbi_,
      functionName: "lastClaimTime",
      args: [tokenId],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: gameNFTAddress,
      abi: gameNFTAbi_,
      functionName: "resourcePoints",
      args: [tokenId],
    }) as Promise<bigint>,
  ]);

  await prisma.farmerNFT.upsert({
    where: { tokenId: Number(tokenId) },
    create: {
      tokenId: Number(tokenId),
      owner: owner.toLowerCase(),
      level: Number(level),
      resourcePoints: resourcePoints.toString(),
      lastClaimTime: new Date(Number(lastClaimTime) * 1000),
    },
    update: {
      owner: owner.toLowerCase(),
      level: Number(level),
      resourcePoints: resourcePoints.toString(),
      lastClaimTime: new Date(Number(lastClaimTime) * 1000),
    },
  });

  await prisma.player.upsert({
    where: { address: owner.toLowerCase() },
    create: { address: owner.toLowerCase() },
    update: {},
  });

  console.log(`synced tokenId=${tokenId} owner=${owner} level=${level}`);
}

export function startGameNFTListeners() {
  publicClient.watchContractEvent({
    address: gameNFTAddress,
    abi: gameNFTAbi_,
    eventName: "Minted",
    onLogs: async (logs) => {
      for (const log of logs) {
        const tokenId = (log as unknown as { args: { tokenId: bigint } }).args.tokenId;
        await syncToken(tokenId).catch((err) => console.error("syncToken (mint) failed", err));
      }
    },
  });

  publicClient.watchContractEvent({
    address: gameNFTAddress,
    abi: gameNFTAbi_,
    eventName: "Claimed",
    onLogs: async (logs) => {
      for (const log of logs) {
        const { args, transactionHash, blockNumber } = log as unknown as {
          args: { tokenId: bigint; amount: bigint };
          transactionHash: `0x${string}`;
          blockNumber: bigint;
        };

        await syncToken(args.tokenId).catch((err) => console.error("syncToken (claim) failed", err));

        await prisma.claimEvent
          .create({
            data: {
              tokenId: Number(args.tokenId),
              amount: args.amount.toString(),
              txHash: transactionHash,
              blockNumber: blockNumber.toString(),
              timestamp: new Date(),
            },
          })
          .catch((err) => {
            // Unique constraint on txHash - safe to ignore if this log was
            // already processed (e.g. after a restart re-reading recent blocks).
            if (!String(err).includes("Unique constraint")) console.error("claimEvent insert failed", err);
          });
      }
    },
  });

  console.log(`Listening for Minted/Claimed events on ${gameNFTAddress}`);
}
