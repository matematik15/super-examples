require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
        blockGasLimit: 100000000
    },
     mumbai: {
         url: `${process.env.MUMBAI_URL}`
         ,accounts: [
             `${process.env.DEPLOYER_PRIVATE_KEY}`
         ]
     },
     celo: {
      url: `${process.env.CELO_URL}`
      ,accounts: [
          `${process.env.DEPLOYER_PRIVATE_KEY}`
      ]
    }
  }
};
