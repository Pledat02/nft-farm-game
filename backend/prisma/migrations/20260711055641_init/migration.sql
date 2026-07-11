-- CreateTable
CREATE TABLE "Player" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FarmerNFT" (
    "tokenId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "resourcePoints" TEXT NOT NULL,
    "lastClaimTime" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ClaimEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClaimEvent_txHash_key" ON "ClaimEvent"("txHash");
