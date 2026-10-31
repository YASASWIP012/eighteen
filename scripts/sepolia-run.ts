// Deploys the contracts and records one deal end to end on Sepolia: four payouts
// that fail on-chain, each for a different reason, then one that succeeds. The
// reports come from real runs of the workflow in the CRE simulator.
// Writes evidence/sepolia.json.
//
// Usage: npx tsx scripts/sepolia-run.ts
// Needs the demo server on port 4173 for the sandbox earnings source.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { createPublicClient, createWalletClient, getContract, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { fiduciaryPublicKey, prove, signDeposit, type OracleReport, type PrivatePeriod } from "../src/prove.ts";

const FIDUCIARY_KEY = "sandbox-fiduciary";
const MOCK_FORWARDER: Hex = "0x15fC6ae953E024d975e77382eEeC56A9101f9F88";
const AMOUNT = 1_000_000_000n;
const DEAL = 1n;
const VIDEO = "dQw4w9WgXcQ";
const STAND_IN_NAME = "Rick";
const SALTS: Record<number, bigint> = { 1: 918273645546372819n, 2: 564738291029384756n };

const envText = readFileSync(".env", "utf8");
const env: Record<string, string> = {};
for (const line of envText.split("\n")) {
  const at = line.indexOf("=");
  if (at > 0) env[line.slice(0, at).trim()] = line.slice(at + 1).trim();
}

const raw = env.DEPLOYER_KEY;
const account = privateKeyToAccount((raw.startsWith("0x") ? raw : `0x${raw}`) as Hex);
const rpc = env.SEPOLIA_RPC_URL;
const publicClient = createPublicClient({ chain: sepolia, transport: http(rpc) });
const wallet = createWalletClient({ account, chain: sepolia, transport: http(rpc) });

const artifact = (file: string, name: string) =>
  JSON.parse(readFileSync(`build/artifacts/contracts/${file}/${name}.json`, "utf8"));

async function deploy(file: string, name: string, args: unknown[] = []) {
  const { abi, bytecode } = artifact(file, name);
  const hash = await wallet.deployContract({ abi, bytecode, args });
  const { contractAddress } = await publicClient.waitForTransactionReceipt({ hash });
  console.log(`${name}: ${contractAddress}`);
  return getContract({ address: contractAddress!, abi, client: { public: publicClient, wallet } });
}

const mined = (hash: Hex) => publicClient.waitForTransactionReceipt({ hash, confirmations: 2 });

// Fixed gas skips estimation, so a call that reverts still lands as a failed
// transaction anyone can look up.
async function attempt(label: string, send: () => Promise<Hex>) {
  const hash = await send();
  const { status } = await mined(hash);
  console.log(`${label}: ${status} ${hash}`);
  return { label, status, hash };
}

/** Runs the workflow in the CRE simulator and writes its report to the registry. */
function runWorkflow(registry: Hex, periodId: number, declaredSeconds: number): Hex {
  const config = {
    schedule: "0 0 * * * *",
    videoIds: [VIDEO],
    chainSelectorName: "ethereum-testnet-sepolia",
    registryAddress: registry,
    channelRef: "demo-channel",
    dealId: Number(DEAL),
    periodId,
    earningsUrl: `http://localhost:4173/sandbox/earnings-1-${periodId}.json`,
    declarations: [{ videoId: VIDEO, declaredSeconds }],
  };
  writeFileSync("build/sim-config.json", JSON.stringify(config));
  writeFileSync("build/run.env", envText.replace(/^CHILD_STAGE_NAME_VALUE=.*$/m, `CHILD_STAGE_NAME_VALUE=${STAND_IN_NAME}`), { mode: 0o600 });

  try {
    const output = execFileSync(
      `${homedir()}/.cre/bin/cre`,
      [
        "workflow", "simulate", "./workflow",
        "--target", "staging-settings",
        "--non-interactive",
        "--trigger-index", "0",
        "--config", "../build/sim-config.json",
        "-e", "build/run.env",
        "--broadcast",
      ],
      { encoding: "utf8", env: { ...process.env, PATH: `${process.cwd()}/node_modules/.bin:${process.env.PATH}` }, stdio: ["ignore", "pipe", "pipe"] },
    );
    const masked = output.replace(/AIza[0-9A-Za-z_-]+/g, "[KEY]").replace(/key=[^& "]+/g, "key=[KEY]");
    writeFileSync(`evidence/cre-simulation-period-${periodId}.txt`, masked);
    const hash = /hash=(0x[0-9a-f]{64})/.exec(masked)?.[1];
    if (!hash) throw new Error("The simulator reported no transaction");
    return hash as Hex;
  } finally {
    rmSync("build/run.env", { force: true });
    rmSync("workflow/.cre_build_tmp.js", { force: true });
  }
}

const period: PrivatePeriod = {
  jurisdiction: "MN",
  grossCents: 2_000_000n,
  contentBps: 5000,
  minorsInSegment: 1,
  ageYears: 15,
  viewTestMet: true,
  depositedCents: 500_000n,
  salt: BigInt(Date.now()),
};

async function main() {
  mkdirSync("evidence", { recursive: true });
  const usdc: any = await deploy("TestUSDC.sol", "TestUSDC");
  const verifier: any = await deploy("Groth16Verifier.sol", "Groth16Verifier");
  const registry: any = await deploy("FactsRegistry.sol", "FactsRegistry", [MOCK_FORWARDER]);
  const escrow: any = await deploy("ProofGatedEscrow.sol", "ProofGatedEscrow", [usdc.address, verifier.address, registry.address]);

  await mined(await usdc.write.mint([account.address, AMOUNT]));
  await mined(await usdc.write.approve([escrow.address, AMOUNT]));

  const fiduciary = fiduciaryPublicKey(FIDUCIARY_KEY);
  const creator = "0x000000000000000000000000000000000000dEaD";
  const refundAfter = BigInt(Math.floor(Date.now() / 1000) + 86_400);
  await mined(await escrow.write.open([DEAL, creator, account.address, AMOUNT, refundAfter, 0, fiduciary[0], fiduciary[1]]));

  const proofFor = (periodId: bigint, oracle: OracleReport) =>
    prove(period, DEAL, periodId, fiduciary, signDeposit(FIDUCIARY_KEY, period.depositedCents, DEAL, periodId), oracle);
  const release = (periodId: bigint, p: Awaited<ReturnType<typeof proofFor>>) => () =>
    escrow.write.release([DEAL, periodId, p.a, p.b, p.c], { gas: 1_000_000n });

  const reportFor = async (periodId: bigint): Promise<OracleReport> => {
    for (let i = 0; i < 20; i++) {
      const stored = await registry.read.attestation([DEAL, periodId]);
      if (stored.earningsCommitment !== 0n) {
        return { earningsSalt: SALTS[Number(periodId)], factsDigest: stored.factsDigest };
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    throw new Error(`No report landed for period ${periodId}`);
  };

  const steps = [];

  // Period 1: the parent declares zero time on a video whose title names the child.
  const early = await proofFor(1n, { earningsSalt: SALTS[1], factsDigest: 1n });
  await mined(await escrow.write.closeReview([DEAL, 1n, early.commitment]));
  steps.push(await attempt("blocked: no oracle report yet", release(1n, early)));

  const contradictionReport = runWorkflow(registry.address, 1, 0);
  await publicClient.waitForTransactionReceipt({ hash: contradictionReport });
  const contradicted = await proofFor(1n, await reportFor(1n));
  steps.push(await attempt("blocked: oracle reported a contradiction", release(1n, contradicted)));

  // Period 2: a consistent declaration.
  const consistentReport = runWorkflow(registry.address, 2, 60);
  await publicClient.waitForTransactionReceipt({ hash: consistentReport });
  const oracle = await reportFor(2n);
  const good = await proofFor(2n, oracle);
  steps.push(await attempt("blocked: human review still open", release(2n, good)));

  await mined(await escrow.write.closeReview([DEAL, 2n, good.commitment]));
  steps.push(await attempt("blocked: proof built on different public facts", release(2n, await proofFor(2n, { ...oracle, factsDigest: 1n }))));
  steps.push(await attempt("released: report, review and proof all line up", release(2n, good)));

  // Read at the mined block, because a load-balanced RPC can lag behind the tip.
  const final = await publicClient.getTransactionReceipt({ hash: steps[4].hash });
  const paid = await usdc.read.balanceOf([creator], { blockNumber: final.blockNumber });
  console.log(`creator balance: ${paid}`);

  writeFileSync(
    "evidence/sepolia.json",
    `${JSON.stringify(
      {
        network: "sepolia",
        note: "Sample earnings from a sandbox endpoint, a sandbox fiduciary key, and one public test video with a stand-in stage name. The deployer also acts as brand and reviewer. Reports reach the registry through Chainlink's mock forwarder.",
        contracts: { TestUSDC: usdc.address, Groth16Verifier: verifier.address, FactsRegistry: registry.address, ProofGatedEscrow: escrow.address },
        reports: { contradiction: contradictionReport, consistent: consistentReport },
        steps,
        creatorBalance: paid.toString(),
      },
      null,
      2,
    )}\n`,
  );
}

// The prover leaves worker threads running, so the exit has to be explicit.
main().then(
  () => process.exit(0),
  (error) => {
    const message = String(error?.stderr ?? error?.shortMessage ?? error?.message ?? error);
    console.error(message.replace(/AIza[0-9A-Za-z_-]+/g, "[KEY]").replace(/0x[0-9a-fA-F]{64}/g, "[redacted]").slice(-1500));
    process.exit(1);
  },
);
