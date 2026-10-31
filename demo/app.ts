import * as snarkjs from "../node_modules/snarkjs/build/browser.esm.js";
import { type PacketPeriod, renderPacket } from "../src/packet.ts";
import { assess, type Jurisdiction } from "../src/rules/index.ts";
import { circuitInput, commit, fiduciaryPublicKey, signDeposit } from "../src/witness.ts";

const SANDBOX_FIDUCIARY_KEY = "sandbox-fiduciary";
const DEAL = 1n;
const PERIOD = 1n;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const num = (id: string) => Number($<HTMLInputElement>(id).value);
const cents = (id: string) => BigInt(Math.round(num(id) * 100));
const usd = (value: bigint) =>
  `$${(Number(value) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

function facts() {
  return {
    jurisdiction: $<HTMLSelectElement>("state").value as Jurisdiction,
    grossCents: cents("gross"),
    contentBps: Math.round(num("content") * 100),
    minorsInSegment: num("minors"),
    ageYears: num("age"),
    viewTestMet: $<HTMLInputElement>("views").checked,
  };
}

function refresh() {
  const assessment = assess(facts());
  $("owed").textContent = usd(assessment.owedCents);
  $("citation").textContent = `${assessment.citation} (${assessment.ruleVersion})`;
  $("covered").textContent = assessment.covered ? "Covered" : "Below the coverage test";
  $("flags").textContent = assessment.flags.join(", ");
  const gap = assessment.owedCents - cents("deposit");
  $("gap").textContent = gap > 0n ? `Short by ${usd(gap)}` : "Claimed deposit covers the amount owed";
  $("outcome").textContent = "";
}

async function generate() {
  const button = $<HTMLButtonElement>("prove");
  button.disabled = true;
  $("outcome").textContent = "Proving in this browser. This can take up to a minute.";

  const period = {
    ...facts(),
    depositedCents: cents("deposit"),
    salt: BigInt(Math.floor(Math.random() * 2 ** 48)),
  };
  const fiduciary = fiduciaryPublicKey(SANDBOX_FIDUCIARY_KEY);
  const statement = signDeposit(SANDBOX_FIDUCIARY_KEY, cents("signed"), DEAL, PERIOD);

  const started = performance.now();
  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      circuitInput(period, DEAL, PERIOD, fiduciary, statement),
      "zk/setaside.wasm",
      "zk/setaside.zkey",
    );
    const key = await fetch("zk/verification_key.json").then((r) => r.json());
    const valid = await snarkjs.groth16.verify(key, publicSignals, proof);
    const elapsed = Math.round(performance.now() - started);
    const commitment = commit(period).toString().slice(0, 12);
    $("outcome").textContent =
      `${valid ? "Proof verified" : "Proof failed verification"} in ${elapsed} ms. ` +
      `A verifier sees only: commitment ${commitment}..., deal 1, period 1, statute ` +
      `${period.jurisdiction}, and the fiduciary's public key. Earnings, content share, age and the deposit stay private.`;
  } catch {
    $("outcome").textContent =
      cents("deposit") !== cents("signed")
        ? "No proof exists: the claimed deposit doesn't match what the fiduciary signed."
        : "No proof exists for these numbers, so the payout contract would revert.";
  }
  button.disabled = false;
}

const SAMPLE: Array<[string, bigint, bigint]> = [
  ["January", 2_000_000n, 500_000n],
  ["February", 1_800_000n, 450_000n],
  ["March", 2_400_000n, 400_000n],
  ["April", 2_000_000n, 500_000n],
];

function downloadPacket() {
  const periods: PacketPeriod[] = SAMPLE.map(([label, grossCents, depositedCents]) => ({
    label,
    ...facts(),
    grossCents,
    depositedCents,
    salt: 11n,
    fiduciarySigned: true,
  }));
  const blob = new Blob([renderPacket("Child A (sample data)", periods)], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "birthday-packet-sample.md";
  link.click();
  URL.revokeObjectURL(link.href);
}

for (const id of ["state", "gross", "content", "minors", "age", "views", "deposit", "signed"]) {
  $(id).addEventListener("input", refresh);
}
$("prove").addEventListener("click", generate);
$("packet").addEventListener("click", downloadPacket);
refresh();
