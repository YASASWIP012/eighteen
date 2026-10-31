const hre = require("hardhat");

// Usage: SEPOLIA_RPC_URL=... DEPLOYER_KEY=... FORWARDER=0x... npx hardhat run scripts/deploy.cjs --network sepolia
async function main() {
  const verifier = await hre.viem.deployContract("Groth16Verifier");
  const usdc = await hre.viem.deployContract("TestUSDC");
  const escrow = await hre.viem.deployContract("ProofGatedEscrow", [usdc.address, verifier.address]);
  const registry = await hre.viem.deployContract("FactsRegistry", [process.env.FORWARDER]);
  console.log(JSON.stringify({ verifier: verifier.address, usdc: usdc.address, escrow: escrow.address, registry: registry.address }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
