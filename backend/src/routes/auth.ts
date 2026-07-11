import { Router } from "express";
import { verifyMessage, isAddress } from "viem";
import { buildSignMessage, consumeNonce, issueNonce } from "../auth/nonceStore.js";
import { issueToken } from "../auth/jwt.js";

export const authRouter = Router();

authRouter.post("/nonce", (req, res) => {
  const { address } = req.body ?? {};
  if (typeof address !== "string" || !isAddress(address)) {
    return res.status(400).json({ error: "invalid address" });
  }

  const nonce = issueNonce(address);
  const message = buildSignMessage(address, nonce);
  res.json({ message });
});

authRouter.post("/verify", async (req, res) => {
  const { address, signature } = req.body ?? {};
  if (typeof address !== "string" || !isAddress(address) || typeof signature !== "string") {
    return res.status(400).json({ error: "invalid address or signature" });
  }

  const nonce = consumeNonce(address);
  if (!nonce) {
    return res.status(400).json({ error: "nonce expired or not requested" });
  }

  if (!/^0x[0-9a-fA-F]{130}$/.test(signature)) {
    return res.status(400).json({ error: "malformed signature" });
  }

  const message = buildSignMessage(address, nonce);

  let valid: boolean;
  try {
    valid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
  } catch {
    return res.status(400).json({ error: "could not verify signature" });
  }

  if (!valid) {
    return res.status(401).json({ error: "invalid signature" });
  }

  const token = issueToken(address);
  res.json({ token });
});
