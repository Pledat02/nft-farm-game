import { randomBytes } from "node:crypto";

const nonces = new Map<string, string>();

export function issueNonce(address: string): string {
  const nonce = randomBytes(16).toString("hex");
  nonces.set(address.toLowerCase(), nonce);
  return nonce;
}

export function consumeNonce(address: string): string | undefined {
  const key = address.toLowerCase();
  const nonce = nonces.get(key);
  nonces.delete(key);
  return nonce;
}

export function buildSignMessage(address: string, nonce: string): string {
  return `Đăng nhập nft-farm-game\nĐịa chỉ: ${address}\nNonce: ${nonce}`;
}
