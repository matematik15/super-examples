const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const FlowSplitterFactory = await ethers.getContractFactory("FlowSplitterFactory");
  const flowSplitterFactory = await FlowSplitterFactory.deploy();

  await flowSplitterFactory.deployed();

  console.log("Flow Splitter Factory:", flowSplitterFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
