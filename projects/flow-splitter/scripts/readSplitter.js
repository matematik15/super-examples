const { ethers } = require("hardhat")
const getEnv = require("./env")
require("dotenv").config()

const deployedFlowSplitterAddress = process.env.FLOWSPLITTER_ADDRESS

async function main() {
    const FlowSplitter = await ethers.getContractFactory("FlowSplitter")
    const flowSplitter = FlowSplitter.attach(deployedFlowSplitterAddress)
    const { testUser, superfluidFramework: sf } = await getEnv()
    const daix = await sf.loadSuperToken("fDAIx")

    const mainReceiver = await flowSplitter.mainReceiver()
    console.log(`mainReceiver: ${mainReceiver}`)

    const sideReceiver = await flowSplitter.sideReceiver()
    console.log(`sideReceiver: ${sideReceiver}`)

    const sideReceiverPortion = await flowSplitter.sideReceiverPortion()
    console.log(`sideReceiverPortion: ${sideReceiverPortion}`)

    const mainReceiverFlow = await daix.getFlow({
        sender: deployedFlowSplitterAddress,
        receiver: mainReceiver,
        providerOrSigner: testUser
    })
    console.log(`Main receiver flow rate: ${mainReceiverFlow.flowRate}`)

    const sideReceiverFlow = await daix.getFlow({
        sender: deployedFlowSplitterAddress,
        receiver: sideReceiver,
        providerOrSigner: testUser
    })
    console.log(`Side receiver flow rate: ${sideReceiverFlow.flowRate}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
