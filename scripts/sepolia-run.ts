// Deploys the contracts and records one deal end to end: two payouts that fail
// on-chain, then one that succeeds. Writes evidence/sepolia.json.
//
// Usage: npx tsx scripts/sepolia-run.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createPublicClient, createWalletClient, getContract, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat, sepolia } from "viem/chains";
import { fiduciaryPublicKey, prove, signDeposit, type PrivatePeriod } from "../src/prove.ts";

const FIDUCIARY_KEY = "sandbox-fiduciary";
const MOCK_FORWARDER: Hex = "0x15fC6ae953E024d975e77382eEeC56A9101f9F88";
const AMOUNT = 1_000_000_000n;
const DEAL = 1n;

const env: Record<string, string> = { ...(process.env as Record<string, string>) };
for (const line of readFileSync(".env", "utf8").split("\n")) {
  const at = line.indexOf("=");
  if (at > 0) env[line.slice(0, at).trim()] ??= line.slice(at + 1).trim();
}

const local = env.CHAIN === "local";
const chain = local ? hardhat : sepolia;
const rpc = local ? "http://127.0.0.1:8545" : env.SEPOLIA_RPC_URL;
const raw = env.DEPLOYER_KEY;
const account = privateKeyToAccount((raw.startsWith("0x") ? raw : `0x${raw}`) as Hex);

const publicClient = createPublicClient({ chain, transport: http(rpc) });
const wallet = createWalletClient({ account, chain, transport: http(rpc) });

const artifact = (file: string, name: string) =>
  JSON.parse(readFileSync(`build/artifacts/contracts/${file}/${name}.json`, "utf8"));

async function deploy(file: string, name: string, args: unknown[] = []) {
  const { abi, bytecode } = artifact(file, name);
  const hash = await wallet.deployContract({ abi, bytecode, args });
  const { contractAddress } = await publicClient.waitForTransactionReceipt({ hash });
  console.log(`${name}: ${contractAddress}`);
  return getContract({ address: contractAddress!, abi, client: { public: publicClient, wallet } });
}

const mined = (hash: Hex) => publicClient.waitForTransactionReceipt({ hash });

// Fixed gas skips estimation, so a call that reverts still lands as a failed
// transaction anyone can look up.
async function attempt(label: string, send: () => Promise<Hex>) {
  const hash = await send();
  const { status } = await mined(hash);
  console.log(`${label}: ${status} ${hash}`);
  return { label, status, hash };
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
  const usdc: any = await deploy("TestUSDC.sol", "TestUSDC");
  const verifier: any = await deploy("Groth16Verifier.sol", "Groth16Verifier");
  const escrow: any = await deploy("ProofGatedEscrow.sol", "ProofGatedEscrow", [usdc.address, verifier.address]);
  const registry: any = await deploy("FactsRegistry.sol", "FactsRegistry", [MOCK_FORWARDER]);

  await mined(await usdc.write.mint([account.address, AMOUNT]));
  await mined(await usdc.write.approve([escrow.address, AMOUNT]));

  const fiduciary = fiduciaryPublicKey(FIDUCIARY_KEY);
  const creator = "0x000000000000000000000000000000000000dEaD";
  const refundAfter = BigInt(Math.floor(Date.now() / 1000) + 86_400);
  await mined(
    await escrow.write.open([DEAL, creator, account.address, AMOUNT, refundAfter, 0, fiduciary[0], fiduciary[1]]),
  );

  const statement = signDeposit(FIDUCIARY_KEY, period.depositedCents, DEAL, 1n);
  const good = await prove(period, DEAL, 1n, fiduciary, statement);
  const wrongPeriod = await prove(
    period,
    DEAL,
    2n,
    fiduciary,
    signDeposit(FIDUCIARY_KEY, period.depositedCents, DEAL, 2n),
  );

  const gas = 1_000_000n;
  const release = (p: typeof good) => () =>
    escrow.write.release([DEAL, 1n, p.a, p.b, p.c], { gas });

  const steps = [await attempt("release while the review is open", release(good))];

  await mined(await escrow.write.closeReview([DEAL, 1n, good.commitment]));

  steps.push(await attempt("release with a proof for another period", release(wrongPeriod)));
  steps.push(await attempt("release with a valid proof", release(good)));

  // Read at the mined block, because a load-balanced RPC can lag behind the tip.
  const final = await publicClient.getTransactionReceipt({ hash: steps[2].hash });
  const paid = await usdc.read.balanceOf([creator], { blockNumber: final.blockNumber });
  console.log(`creator balance: ${paid}`);

  mkdirSync("evidence", { recursive: true });
  writeFileSync(
    "evidence/sepolia.json",
    `${JSON.stringify(
      {
        network: chain.name,
        note: "Sample figures and a sandbox fiduciary key. The deployer also acts as brand and reviewer.",
        contracts: {
          TestUSDC: usdc.address,
          Groth16Verifier: verifier.address,
          ProofGatedEscrow: escrow.address,
          FactsRegistry: registry.address,
        },
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
    console.error(String(error?.shortMessage ?? error?.message ?? error).replace(/0x[0-9a-fA-F]{64}/g, "[redacted]"));
    process.exit(1);
  },
);
