// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const mainReceiver = "0xBBE530256ba3e70604a33F6a2931d1d23cE8452f" // Input mainReceiver address here
  const sideReceiver = "0x6DA19238623C8a646679551f0863B6Bbc55E19D3" // Input sideReceiver address here

  const sideReceiverPortion = 250 // Select a sideReceiver portion with a number between 1 and 1000 here 
  // 300 would represent routing 30% of incoming flow to the sideReceiver

  // For help picking below addresses, head to: https://docs.superfluid.finance/superfluid/developers/networks
  //mumbai fDAIx: 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
  const acceptedSuperToken = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f" // address of Super Token to be accepted to be streamed to FlowSplitter
  //mumbai host: 0xeb796bdb90ffa0f28255275e16936d25d3418603
  const host = "0xeb796bdb90ffa0f28255275e16936d25d3418603" // address of Superfluid Host contract for network of deployment

  deployStandAlone(mainReceiver, sideReceiver, sideReceiverPortion, acceptedSuperToken, host);
  // deployViaFactory(mainReceiver, sideReceiver, sideReceiverPortion, acceptedSuperToken, host);
}

const deployStandAlone = async function (mainReceiver, sideReceiver, sideReceiverPortion, acceptedSuperToken, host) {

  const FlowSplitter = await hre.ethers.getContractFactory("FlowSplitter");
  const flowSplitter = await FlowSplitter.deploy(
    mainReceiver,
    sideReceiver,
    sideReceiverPortion,
    acceptedSuperToken,
    host
  );

  await flowSplitter.deployed();

  console.log("Flow Splitter:", flowSplitter.address);
}

const deployViaFactory = async function (mainReceiver, sideReceiver, sideReceiverPortion, acceptedSuperToken, host) {
  const FlowSplitterFactory = await hre.ethers.getContractFactory("FlowSplitterFactory");
  const flowSplitterFactory = FlowSplitterFactory.attach(
    process.env.FACTORY_ADDRESS
  )

  const tx = await flowSplitterFactory.createNewSplitter(
    mainReceiver,
    sideReceiver,
    sideReceiverPortion,
    acceptedSuperToken,
    host
  );

  await tx.wait()

  const splitters = await flowSplitterFactory.getSplittersByOwner(process.env.DEPLOYER_ADDRESS)
  console.log(`Deployed FlowSplitter: ${splitters.at(-1)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
