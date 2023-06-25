const { ethers } = require("hardhat")
require("dotenv").config();
//const getTestUser = require('./env');

const deployedFlowSplitterFactoryAddress = process.env.FACTORY_ADDRESS

async function main() {
  const FlowSplitterFactory = await ethers.getContractFactory("FlowSplitterFactory");
  const flowSplitterFactory = FlowSplitterFactory.attach(
    deployedFlowSplitterFactoryAddress
  )

  //const owner = process.env.DEPLOYER_ADDRESS
  const owner = "0xC5Cc95E83Cf3AB612F84f8a1771F8f3a47129b4d"


  // const testUser = await getTestUser();
  // console.log(`testUser.address: ${testUser.address}`)
  // console.log(`type of testUser.address: ${typeof testUser.address}`)
  // console.log(`type of owner: ${typeof owner}`)
  // console.log(`is owner same as testUser.address: ${testUser.address === owner}`)

  const splitters = await flowSplitterFactory.getSplittersByOwner(owner)
  console.log(`splitters: ${splitters}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
