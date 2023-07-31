// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // For help picking below addresses, head to: https://docs.superfluid.finance/superfluid/developers/networks
  //mumbai fDAIx: 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
  //celo G$: 0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A
  const acceptedSuperToken = "0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A" // address of Super Token to be accepted to be streamed to FlowSplitter
  
  //mumbai host: 0xeb796bdb90ffa0f28255275e16936d25d3418603
  //celo host: 0xA4Ff07cF81C02CFD356184879D953970cA957585
  const host = "0xA4Ff07cF81C02CFD356184879D953970cA957585" // address of Superfluid Host contract for network of deployment

  const receivers = ["0xBBE530256ba3e70604a33F6a2931d1d23cE8452f", "0x6DA19238623C8a646679551f0863B6Bbc55E19D3", "0x37238cE2024f2FB6720d973BbDBD8282C4E51887"]
  const flows = [20, 10, 10]
  //deployStandAlone(receivers, flows, acceptedSuperToken, host);
  deployViaFactory(receivers, flows, acceptedSuperToken, host);
}

const deployStandAlone = async function (receivers, flows, acceptedSuperToken, host) {

  const FlowSplitter = await hre.ethers.getContractFactory("FlowSplitter");
  const flowSplitter = await FlowSplitter.deploy(
    receivers,
    flows,
    acceptedSuperToken,
    host
  );

  await flowSplitter.deployed();

  console.log("Flow Splitter:", flowSplitter.address);
}

const deployViaFactory = async function (receivers, flows, acceptedSuperToken, host) {
  const FlowSplitterFactory = await hre.ethers.getContractFactory("FlowSplitterFactory");
  const flowSplitterFactory = FlowSplitterFactory.attach(
    process.env.FACTORY_ADDRESS
  )

  const tx = await flowSplitterFactory.createNewSplitter(
    receivers,
    flows,
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
