import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET env var is required");
}

export function issueToken(address: string): string {
  return jwt.sign({ address: address.toLowerCase() }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): { address: string } {
  return jwt.verify(token, JWT_SECRET) as { address: string };
}
