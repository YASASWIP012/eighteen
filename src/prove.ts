import * as snarkjs from "snarkjs";
import {
  circuitInput,
  commit,
  type DepositStatement,
  earningsCommitment,
  fiduciaryPublicKey,
  type OracleReport,
  type PrivatePeriod,
  signDeposit,
} from "./witness.ts";

const WASM = "demo/zk/setaside.wasm";
const ZKEY = "demo/zk/setaside.zkey";

export {
  commit,
  earningsCommitment,
  fiduciaryPublicKey,
  signDeposit,
  type DepositStatement,
  type OracleReport,
  type PrivatePeriod,
};

/** True when the circuit accepts this period, without the cost of a full proof. */
export async function witnessHolds(
  p: PrivatePeriod,
  dealId: bigint,
  periodId: bigint,
  fiduciary: [bigint, bigint],
  statement: DepositStatement,
  oracle: OracleReport,
): Promise<boolean> {
  try {
    const input = circuitInput(p, dealId, periodId, fiduciary, statement, oracle);
    await snarkjs.wtns.calculate(input, WASM, { type: "mem" });
    return true;
  } catch {
    return false;
  }
}

/** Throws on a shortfall or a bad signature: the circuit has no witness for either. */
export async function prove(
  p: PrivatePeriod,
  dealId: bigint,
  periodId: bigint,
  fiduciary: [bigint, bigint],
  statement: DepositStatement,
  oracle: OracleReport,
) {
  const input = circuitInput(p, dealId, periodId, fiduciary, statement, oracle);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, WASM, ZKEY);

  return {
    commitment: commit(p),
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
