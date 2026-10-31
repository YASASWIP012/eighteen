import assert from "node:assert/strict";
import { before, test } from "node:test";
import hre from "hardhat";
import { commit, fiduciaryPublicKey, prove as proveWith, signDeposit, witnessHolds, type PrivatePeriod } from "../src/prove.ts";

const FIDUCIARY_KEY = "sandbox-fiduciary";
const fiduciary = fiduciaryPublicKey(FIDUCIARY_KEY);
const prove = (p: PrivatePeriod, deal: bigint, periodId: bigint) =>
  proveWith(p, deal, periodId, fiduciary, signDeposit(FIDUCIARY_KEY, p.depositedCents, deal, periodId));

const AMOUNT = 10_000_000_000n;
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

let brand: any, creator: any, reviewer: any, usdc: any, escrow: any;
let nextDeal = 1n;

before(async () => {
  await hre.run("compile", { quiet: true });
  [brand, creator, reviewer] = await hre.viem.getWalletClients();
  usdc = await hre.viem.deployContract("TestUSDC");
  const verifier = await hre.viem.deployContract("Groth16Verifier");
  escrow = await hre.viem.deployContract("ProofGatedEscrow", [usdc.address, verifier.address]);
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

const closeReview = (id: bigint, periodId: bigint, commitment: bigint) =>
  escrow.write.closeReview([id, periodId, commitment], { account: reviewer.account });

const balance = (who: any) => usdc.read.balanceOf([who.account.address]);

test("pays the creator once the review closes and the proof holds", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, proof.commitment);

  const before = await balance(creator);
  await escrow.write.release([id, 1n, proof.a, proof.b, proof.c]);
  assert.equal((await balance(creator)) - before, AMOUNT);
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
  assert.equal(await witnessHolds(period, 99n, 1n, fiduciary, signed), false);
});

test("a fiduciary statement from another period can't be reused", async () => {
  const signed = signDeposit(FIDUCIARY_KEY, period.depositedCents, 99n, 1n);
  assert.equal(await witnessHolds(period, 99n, 2n, fiduciary, signed), false);
});

test("a statement signed by a different key is rejected", async () => {
  const signed = signDeposit("someone-else", period.depositedCents, 99n, 1n);
  assert.equal(await witnessHolds(period, 99n, 1n, fiduciary, signed), false);
});

test("reverts while the review is open", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await assert.rejects(escrow.write.release([id, 1n, proof.a, proof.b, proof.c]), /ReviewOpen/);
});

test("a proof for another deal is rejected", async () => {
  const first = await openDeal();
  const second = await openDeal();
  const proof = await prove(period, first, 1n);
  await closeReview(second, 1n, proof.commitment);
  await assert.rejects(escrow.write.release([second, 1n, proof.a, proof.b, proof.c]), /InvalidProof/);
});

test("a proof for another period is rejected", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await closeReview(id, 2n, proof.commitment);
  await assert.rejects(escrow.write.release([id, 2n, proof.a, proof.b, proof.c]), /InvalidProof/);
});

test("a proof under the wrong statute is rejected", async () => {
  const id = await openDeal(1);
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, proof.commitment);
  await assert.rejects(escrow.write.release([id, 1n, proof.a, proof.b, proof.c]), /InvalidProof/);
});

test("a commitment the reviewer did not sign is rejected", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  const other = commit({ ...period, salt: 1n });
  await closeReview(id, 1n, other);
  await assert.rejects(escrow.write.release([id, 1n, proof.a, proof.b, proof.c]), /InvalidProof/);
});

test("a settled deal can't be paid twice", async () => {
  const id = await openDeal();
  const proof = await prove(period, id, 1n);
  await closeReview(id, 1n, proof.commitment);
  await escrow.write.release([id, 1n, proof.a, proof.b, proof.c]);
  await assert.rejects(escrow.write.release([id, 1n, proof.a, proof.b, proof.c]), /AlreadySettled/);
});

test("only the named reviewer can close a review", async () => {
  const id = await openDeal();
  await assert.rejects(escrow.write.closeReview([id, 1n, 5n]), /NotReviewer/);
});

test("the brand gets a refund only after the deadline", async () => {
  const early = await openDeal();
  await assert.rejects(escrow.write.refund([early]), /TooEarly/);

  const late = await openDeal(0, 1n);
  const before = await balance(brand);
  await escrow.write.refund([late]);
  assert.equal((await balance(brand)) - before, AMOUNT);
});
