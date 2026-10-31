import { keccak256, stringToHex } from "viem";

export interface DeclaredVideo {
  id: string;
  declaredBps: number;
}

export interface ReviewResult {
  id: string;
  declaredBps: number;
  reviewedBps: number;
}

const CLIFF_BPS = 3000;
const NEAR_CLIFF_BPS = 500;

const rank = (seed: string, id: string) => keccak256(stringToHex(`${seed}:${id}`));

function order(videos: DeclaredVideo[], seed: string): DeclaredVideo[] {
  return [...videos].sort((a, b) => (rank(seed, a.id) < rank(seed, b.id) ? -1 : 1));
}

/**
 * Picks videos for human review from public randomness, published after the
 * declarations are sealed. Half the sample comes from just around the 30% line,
 * where a small under-declaration changes the legal result.
 */
export function selectForReview(videos: DeclaredVideo[], seed: string, count: number): string[] {
  const near = videos.filter((v) => Math.abs(v.declaredBps - CLIFF_BPS) <= NEAR_CLIFF_BPS);
  const rest = videos.filter((v) => !near.includes(v));

  const quota = Math.min(Math.ceil(count / 2), near.length);
  const picked = [...order(near, seed).slice(0, quota), ...order(rest, seed).slice(0, count - quota)];
  const topUp = order(near, seed).slice(quota, quota + count - picked.length);
  return [...picked, ...topUp].map((v) => v.id);
}

/** Wilson 95% interval for the share of reviewed videos that were under-declared. */
export function underDeclarationRate(results: ReviewResult[], toleranceBps = 100) {
  const n = results.length;
  if (n === 0) throw new RangeError("No reviewed videos");

  const misses = results.filter((r) => r.reviewedBps - r.declaredBps > toleranceBps).length;
  const p = misses / n;
  const z = 1.96;
  const denominator = 1 + (z * z) / n;
  const centre = (p + (z * z) / (2 * n)) / denominator;
  const margin = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denominator;
  return {
    misses,
    reviewed: n,
    rate: p,
    low: Math.max(0, centre - margin),
    high: Math.min(1, centre + margin),
  };
}

/** Videos where the reviewer's figure moves the period across the 30% line. */
export function crossesCliff(results: ReviewResult[]): string[] {
  return results
    .filter((r) => r.declaredBps < CLIFF_BPS && r.reviewedBps >= CLIFF_BPS)
    .map((r) => r.id);
}
