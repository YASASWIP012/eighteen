require("@nomicfoundation/hardhat-viem");

module.exports = {
  solidity: { version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } },
  // LOCAL_RUN mines failed calls like a public chain, for rehearsing scripts/sepolia-run.ts.
  networks: process.env.LOCAL_RUN
    ? { hardhat: { throwOnTransactionFailures: false, throwOnCallFailures: false } }
    : {},
  paths: { sources: "./contracts", tests: "./test-contracts", cache: "./build/cache", artifacts: "./build/artifacts" },
};
