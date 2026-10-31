require("@nomicfoundation/hardhat-viem");

module.exports = {
  solidity: { version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } },
  networks: process.env.DEPLOYER_KEY
    ? { sepolia: { url: process.env.SEPOLIA_RPC_URL, accounts: [process.env.DEPLOYER_KEY] } }
    : {},
  paths: { sources: "./contracts", tests: "./test-contracts", cache: "./build/cache", artifacts: "./build/artifacts" },
};
