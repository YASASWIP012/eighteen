import assert from "node:assert/strict";
import { before, test } from "node:test";
import hre from "hardhat";
import { encodeAbiParameters, keccak256, stringToHex } from "viem";
import {
  commit,
  earningsCommitment,
  fiduciaryPublicKey,
  prove as proveWith,
  signDeposit,
  witnessHolds,
  type PrivatePeriod,
} from "../src/prove.ts";

const FIDUCIARY_KEY = "sandbox-fiduciary";
const fiduciary = fiduciaryPublicKey(FIDUCIARY_KEY);
const SNARK_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
const AMOUNT = 10_000_000_000n;
const FACTS = keccak256(stringToHex("facts"));
const oracle = { earningsSalt: 31n, factsDigest: BigInt(FACTS) % SNARK_FIELD };

const period: PrivatePeriod = {
  jurisdiction: "MN",
  grossCents: 2_000_000n,
  contentBps: 5000,
  minorsInSegment: 1,
  ageYears: 15,
  viewTestMet: true,
  depositedCents: 500_000n,
  salt: 987654321n,
};

const prove = (p: PrivatePeriod, deal: bigint, periodId: bigint, report = oracle) =>
  proveWith(p, deal, periodId, fiduciary, signDeposit(FIDUCIARY_KEY, p.depositedCents, deal, periodId), report);

let brand: any, creator: any, reviewer: any, forwarder: any, usdc: any, escrow: any, registry: any;
let nextDeal = 1n;

before(async () => {
  await hre.run("compile", { quiet: true });
  [brand, creator, reviewer, forwarder] = await hre.viem.getWalletClients();
  usdc = await hre.viem.deployContract("TestUSDC");
  const verifier = await hre.viem.deployContract("Groth16Verifier");
  registry = await hre.viem.deployContract("FactsRegistry", [forwarder.account.address]);
  escrow = await hre.viem.deployContract("ProofGatedEscrow", [usdc.address, verifier.address, registry.address]);
  await usdc.write.mint([brand.account.address, AMOUNT * 100n]);
  await usdc.write.approve([escrow.address, AMOUNT * 100n]);
});

async function openDeal(jurisdiction = 0, refundAfter = 0n) {
  const id = nextDeal++;
  await escrow.write.open([
    id,
    creator.account.address,
    reviewer.account.address,
    AMOUNT,
    refundAfter || 4_000_000_000n,
    jurisdiction,
    fiduciary[0],
    fiduciary[1],
  ]);
  return id;
}

function attest(id: bigint, periodId: bigint, contradictions = 0, gross = period.grossCents) {
  const report = encodeAbiParameters(
    [
      { type: "uint256" },
      { type: "uint256" },
      { type: "bytes32" },
      { type: "bytes32" },
      { type: "uint256" },
      { type: "uint32" },
      { type: "uint32" },
    ],
    [id, periodId, keccak256(stringToHex("demo-channel")), FACTS, earningsCommitment(gross, oracle.earningsSalt), 3, contradictions],
  );
  return registry.write.onReport(["0x", report], { account: forwarder.account });
}

const closeReview = (id: bigint, periodId: bigint, commitment: bigint) =>
  escrow.write.closeReview([id, periodId, commitment], { account: reviewer.account });

const release = (id: bigint, periodId: bigint, p: any) =>
  escrow.write.release([id, periodId, p.a, p.b, p.c]);

const balance = (who: any) => usdc.read.balanceOf([who.account.address]);

async function ready(jurisdiction = 0) {
  const id = await openDeal(jurisdiction);
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, proof.commitment);
  return { id, proof };
}

test("pays once the report, review and proof all line up", async () => {
  const { id, proof } = await ready();
  await attest(id, 1n);
  const start = await balance(creator);
  await release(id, 1n, proof);
  assert.equal((await balance(creator)) - start, AMOUNT);
});

test("no payout without an oracle report", async () => {
  const { id, proof } = await ready();
  await assert.rejects(release(id, 1n, proof), /NotAttested/);
});

test("a reported contradiction stops the payout", async () => {
  const { id, proof } = await ready();
  await attest(id, 1n, 1);
  await assert.rejects(release(id, 1n, proof), /Contradiction/);
});

test("earnings that differ from the report are rejected", async () => {
  const { id, proof } = await ready();
  await attest(id, 1n, 0, 9_000_000n);
  await assert.rejects(release(id, 1n, proof), /InvalidProof/);
});

test("public facts that differ from the report are rejected", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n, { ...oracle, factsDigest: 1n });
  await closeReview(id, 1n, proof.commitment);
  await attest(id, 1n);
  await assert.rejects(release(id, 1n, proof), /InvalidProof/);
});

test("no witness exists for a one cent shortfall", async () => {
  await assert.rejects(prove({ ...period, depositedCents: 499_999n }, 99n, 1n));
});

test("California owes more on the same facts", async () => {
  await assert.rejects(prove({ ...period, jurisdiction: "CA" }, 99n, 1n));
  await prove({ ...period, jurisdiction: "CA", depositedCents: 650_000n }, 99n, 1n);
});

test("a parent can't claim a larger deposit than the fiduciary signed", async () => {
  const signed = signDeposit(FIDUCIARY_KEY, 100_000n, 99n, 1n);
  assert.equal(await witnessHolds(period, 99n, 1n, fiduciary, signed, oracle), false);
});

test("a fiduciary statement from another period can't be reused", async () => {
  const signed = signDeposit(FIDUCIARY_KEY, period.depositedCents, 99n, 1n);
  assert.equal(await witnessHolds(period, 99n, 2n, fiduciary, signed, oracle), false);
});

test("a statement signed by a different key is rejected", async () => {
  const signed = signDeposit("someone-else", period.depositedCents, 99n, 1n);
  assert.equal(await witnessHolds(period, 99n, 1n, fiduciary, signed, oracle), false);
});

test("reverts while the review is open", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await attest(id, 1n);
  await assert.rejects(release(id, 1n, proof), /ReviewOpen/);
});

test("a proof for another deal is rejected", async () => {
  const first = await openDeal();
  const second = await openDeal();
  const proof = await prove(period, first, 1n);
  await closeReview(second, 1n, proof.commitment);
  await attest(second, 1n);
  await assert.rejects(release(second, 1n, proof), /InvalidProof/);
});

test("a proof for another period is rejected", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await closeReview(id, 2n, proof.commitment);
  await attest(id, 2n);
  await assert.rejects(release(id, 2n, proof), /InvalidProof/);
});

test("a proof under the wrong statute is rejected", async () => {
  const id = await openDeal(1);
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, proof.commitment);
  await attest(id, 1n);
  await assert.rejects(release(id, 1n, proof), /InvalidProof/);
});

test("a commitment the reviewer did not sign is rejected", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, commit({ ...period, salt: 1n }));
  await attest(id, 1n);
  await assert.rejects(release(id, 1n, proof), /InvalidProof/);
});

test("a settled deal can't be paid twice", async () => {
  const { id, proof } = await ready();
  await attest(id, 1n);
  await release(id, 1n, proof);
  await assert.rejects(release(id, 1n, proof), /AlreadySettled/);
});

test("only the named reviewer can close a review", async () => {
  const id = await openDeal();
  await assert.rejects(escrow.write.closeReview([id, 1n, 5n]), /NotReviewer/);
});

test("the brand gets a refund only after the deadline", async () => {
  const early = await openDeal();
  await assert.rejects(escrow.write.refund([early]), /TooEarly/);

  const late = await openDeal(0, 1n);
  const start = await balance(brand);
  await escrow.write.refund([late]);
  assert.equal((await balance(brand)) - start, AMOUNT);
});
