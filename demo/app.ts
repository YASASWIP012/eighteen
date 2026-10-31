import { poseidon6 } from "poseidon-lite/poseidon6";
import * as snarkjs from "../node_modules/snarkjs/build/browser.esm.js";
import { assess, type Jurisdiction } from "../src/rules/index.ts";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const num = (id: string) => Number($<HTMLInputElement>(id).value);
const usd = (cents: bigint) =>
  `$${(Number(cents) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

function facts() {
  return {
    jurisdiction: $<HTMLSelectElement>("state").value as Jurisdiction,
    grossCents: BigInt(Math.round(num("gross") * 100)),
    contentBps: Math.round(num("content") * 100),
    minorsInSegment: num("minors"),
    ageYears: num("age"),
  };
}

const deposited = () => BigInt(Math.round(num("deposit") * 100));

function refresh() {
  const result = assess(facts());
  $("owed").textContent = usd(result.owedCents);
  $("citation").textContent = `${result.citation} (${result.ruleVersion})`;
  $("covered").textContent = result.covered ? "Covered" : "Below the coverage test";
  $("flags").textContent = result.flags.join(", ");
  const gap = result.owedCents - deposited();
  $("gap").textContent = gap > 0n ? `Short by ${usd(gap)}` : "Deposit covers the amount owed";
  $("outcome").textContent = "";
}

async function generate() {
  const button = $<HTMLButtonElement>("prove");
  button.disabled = true;
  $("outcome").textContent = "Proving in this browser...";

  const f = facts();
  const depositedCents = deposited();
  const salt = BigInt(Math.floor(Math.random() * 2 ** 48));
  const isCA = f.jurisdiction === "CA";
  const setAsideBps =
    (BigInt(f.contentBps) * (isCA ? 65n : 1n)) / ((isCA ? 100n : 2n) * BigInt(f.minorsInSegment));

  const commitment = poseidon6([
    f.grossCents,
    BigInt(f.contentBps),
    BigInt(f.minorsInSegment),
    BigInt(f.ageYears),
    depositedCents,
    salt,
  ]).toString();

  const started = performance.now();
  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        grossCents: f.grossCents.toString(),
        contentBps: f.contentBps.toString(),
        minors: f.minorsInSegment.toString(),
        age: f.ageYears.toString(),
        depositedCents: depositedCents.toString(),
        salt: salt.toString(),
        setAsideBps: setAsideBps.toString(),
        owedShareCents: ((f.grossCents * setAsideBps) / 10_000n).toString(),
        commitment,
        dealId: "1",
        periodId: "1",
        jurisdiction: isCA ? "1" : "0",
      },
      "zk/setaside.wasm",
      "zk/setaside.zkey",
    );
    const key = await fetch("zk/verification_key.json").then((r) => r.json());
    const valid = await snarkjs.groth16.verify(key, publicSignals, proof);
    const elapsed = Math.round(performance.now() - started);
    $("outcome").textContent =
      `${valid ? "Proof verified" : "Proof failed verification"} in ${elapsed} ms. ` +
      `A verifier sees only: commitment ${commitment.slice(0, 12)}..., deal 1, period 1, ` +
      `statute ${f.jurisdiction}. Earnings, content share, age and the deposit stay private.`;
  } catch {
    $("outcome").textContent =
      "No proof exists for these numbers, so the payout contract would revert.";
  }
  button.disabled = false;
}

for (const id of ["state", "gross", "content", "minors", "age", "deposit"]) {
  $(id).addEventListener("input", refresh);
}
$("prove").addEventListener("click", generate);
refresh();
