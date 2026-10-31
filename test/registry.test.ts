import assert from "node:assert/strict";
import { test } from "node:test";
import hre from "hardhat";
import { encodeAbiParameters, keccak256, stringToHex } from "viem";

const SNARK_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
const digest = keccak256(stringToHex("facts"));
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
  [1n, 2n, keccak256(stringToHex("demo-channel")), digest, 77n, 12, 1],
);

test("stores a report from the forwarder and refuses anyone else", async () => {
  await hre.run("compile", { quiet: true });
  const [forwarder, stranger] = await hre.viem.getWalletClients();
  const registry = await hre.viem.deployContract("FactsRegistry", [forwarder.account.address]);

  await assert.rejects(
    registry.write.onReport(["0x", report], { account: stranger.account }),
    /NotForwarder/,
  );

  await registry.write.onReport(["0x", report], { account: forwarder.account });
  const stored = await registry.read.attestation([1n, 2n]);
  assert.equal(stored.factsDigest, BigInt(digest) % SNARK_FIELD);
  assert.equal(stored.earningsCommitment, 77n);
  assert.equal(stored.videos, 12);
  assert.equal(stored.contradictions, 1);
});
