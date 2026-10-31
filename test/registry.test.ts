import assert from "node:assert/strict";
import { test } from "node:test";
import hre from "hardhat";
import { encodeAbiParameters, keccak256, stringToHex } from "viem";

const channelRef = keccak256(stringToHex("demo-channel"));
const digest = keccak256(stringToHex("facts"));
const report = encodeAbiParameters(
  [{ type: "bytes32" }, { type: "bytes32" }, { type: "uint32" }, { type: "uint32" }],
  [channelRef, digest, 12, 1],
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
  assert.equal(await registry.read.sealCount([channelRef]), 1n);

  const seal = await registry.read.sealAt([channelRef, 0n]);
  assert.equal(seal.digest, digest);
  assert.equal(seal.videos, 12);
  assert.equal(seal.contradictions, 1);
});
