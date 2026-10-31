// Builds the circuit input. Shared by the Node prover and the browser demo, so
// both state the law the same way.

import { Base8, mulPointEscalar, subOrder } from "@zk-kit/baby-jubjub";
import { poseidon3 } from "poseidon-lite/poseidon3";
import { poseidon5 } from "poseidon-lite/poseidon5";
import { poseidon7 } from "poseidon-lite/poseidon7";
import { keccak256, stringToHex } from "viem";
import type { Jurisdiction } from "./rules/index.ts";

export interface PrivatePeriod {
  jurisdiction: Jurisdiction;
  grossCents: bigint;
  contentBps: number;
  minorsInSegment: number;
  ageYears: number;
  viewTestMet: boolean;
  depositedCents: bigint;
  salt: bigint;
}

export interface DepositStatement {
  r8: [bigint, bigint];
  s: bigint;
}

export const JURISDICTION_ID: Record<Jurisdiction, number> = { MN: 0, CA: 1, IL: 2 };

export function commit(p: PrivatePeriod): bigint {
  return poseidon7([
    p.grossCents,
    BigInt(p.contentBps),
    BigInt(p.minorsInSegment),
    BigInt(p.ageYears),
    p.viewTestMet ? 1n : 0n,
    p.depositedCents,
    p.salt,
  ]);
}

const scalar = (text: string) => (BigInt(keccak256(stringToHex(text))) % (subOrder - 1n)) + 1n;

export function fiduciaryPublicKey(key: string): [bigint, bigint] {
  return mulPointEscalar(Base8, scalar(key)) as [bigint, bigint];
}

/**
 * What a fiduciary signs after confirming a deposit against its own books.
 * EdDSA over Baby Jubjub, checked in the circuit by S·B8 = R8 + 8·h·A.
 */
export function signDeposit(
  fiduciaryKey: string,
  depositedCents: bigint,
  dealId: bigint,
  periodId: bigint,
): DepositStatement {
  const message = poseidon3([depositedCents, dealId, periodId]);
  const x = scalar(fiduciaryKey);
  const [ax, ay] = fiduciaryPublicKey(fiduciaryKey);
  const r = scalar(`${fiduciaryKey}:${message}`);
  const r8 = mulPointEscalar(Base8, r) as [bigint, bigint];
  const h = poseidon5([r8[0], r8[1], ax, ay, message]);
  return { r8, s: (r + 8n * (h % subOrder) * x) % subOrder };
}

export function circuitInput(
  p: PrivatePeriod,
  dealId: bigint,
  periodId: bigint,
  fiduciary: [bigint, bigint],
  statement: DepositStatement,
) {
  const isCA = p.jurisdiction === "CA";
  const numerator = BigInt(p.contentBps) * (isCA ? 65n : 1n);
  const denominator = (isCA ? 100n : 2n) * BigInt(p.minorsInSegment);
  const setAsideBps = numerator / denominator;

  return {
    grossCents: p.grossCents.toString(),
    contentBps: p.contentBps.toString(),
    minors: p.minorsInSegment.toString(),
    age: p.ageYears.toString(),
    viewTestMet: p.viewTestMet ? "1" : "0",
    depositedCents: p.depositedCents.toString(),
    salt: p.salt.toString(),
    setAsideBps: setAsideBps.toString(),
    owedShareCents: ((p.grossCents * setAsideBps) / 10_000n).toString(),
    sigR8x: statement.r8[0].toString(),
    sigR8y: statement.r8[1].toString(),
    sigS: statement.s.toString(),
    commitment: commit(p).toString(),
    dealId: dealId.toString(),
    periodId: periodId.toString(),
    jurisdiction: JURISDICTION_ID[p.jurisdiction].toString(),
    fiduciaryAx: fiduciary[0].toString(),
    fiduciaryAy: fiduciary[1].toString(),
  };
}
