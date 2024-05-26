require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Configuration for Sepolia Test Network
    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.ALCHEMY_SEPOLIA_URL),
      network_id: 11155111, // Sepolia's network id
      gas: 5500000,         // You may need to adjust this value
      confirmations: 2,    // Number of block confirmations to wait between deployments
      timeoutBlocks: 200,  // Number of blocks before a deployment times out
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    },
  },

  // Other configurations...
};