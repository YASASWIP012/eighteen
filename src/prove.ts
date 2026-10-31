import { buildPoseidon } from "circomlibjs";
import * as snarkjs from "snarkjs";
import { assess, type Jurisdiction } from "./rules/index.ts";

const WASM = "demo/zk/setaside.wasm";
const ZKEY = "demo/zk/setaside.zkey";

export interface PrivatePeriod {
  jurisdiction: Jurisdiction;
  grossCents: bigint;
  contentBps: number;
  minorsInSegment: number;
  ageYears: number;
  depositedCents: bigint;
  salt: bigint;
}

export async function commit(p: PrivatePeriod): Promise<bigint> {
  const poseidon = await buildPoseidon();
  const hash = poseidon([
    p.grossCents,
    BigInt(p.contentBps),
    BigInt(p.minorsInSegment),
    BigInt(p.ageYears),
    p.depositedCents,
    p.salt,
  ]);
  return BigInt(poseidon.F.toString(hash));
}

async function circuitInput(p: PrivatePeriod, dealId: bigint, periodId: bigint) {
  const isCA = p.jurisdiction === "CA";
  const numerator = BigInt(p.contentBps) * (isCA ? 65n : 1n);
  const denominator = (isCA ? 100n : 2n) * BigInt(p.minorsInSegment);
  const setAsideBps = numerator / denominator;
  const commitment = await commit(p);

  return {
    commitment,
    input: {
      grossCents: p.grossCents.toString(),
      contentBps: p.contentBps.toString(),
      minors: p.minorsInSegment.toString(),
      age: p.ageYears.toString(),
      depositedCents: p.depositedCents.toString(),
      salt: p.salt.toString(),
      setAsideBps: setAsideBps.toString(),
      owedShareCents: ((p.grossCents * setAsideBps) / 10_000n).toString(),
      commitment: commitment.toString(),
      dealId: dealId.toString(),
      periodId: periodId.toString(),
      jurisdiction: isCA ? "1" : "0",
    },
  };
}

/** True when the circuit accepts this period, without the cost of a full proof. */
export async function witnessHolds(p: PrivatePeriod): Promise<boolean> {
  const { input } = await circuitInput(p, 1n, 1n);
  const output = { type: "mem" };
  try {
    await snarkjs.wtns.calculate(input, WASM, output);
    return true;
  } catch {
    return false;
  }
}

/** Throws when the deposit falls short: the circuit has no witness for a shortfall. */
export async function prove(p: PrivatePeriod, dealId: bigint, periodId: bigint) {
  const { commitment, input } = await circuitInput(p, dealId, periodId);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, WASM, ZKEY);

  return {
    commitment,
    publicSignals: publicSignals.map(BigInt),
    a: [BigInt(proof.pi_a[0]), BigInt(proof.pi_a[1])] as [bigint, bigint],
    // Solidity expects the G2 coordinates in reverse order.
    b: [
      [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
      [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])],
    ] as [[bigint, bigint], [bigint, bigint]],
    c: [BigInt(proof.pi_c[0]), BigInt(proof.pi_c[1])] as [bigint, bigint],
  };
}

export { assess };
