import crypto from "crypto";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây

function calculateHash(block: Block): string {
  const rawData =
    block.index +
    block.timestamp +
    JSON.stringify(block.transactions) +
    block.previous_hash;

  return crypto.createHash("sha256").update(rawData).digest("hex");
}

export function isValidBlock(block: Block): boolean {
  const recalculatedHash = calculateHash(block);
  return block.current_hash === recalculatedHash;
}
