const { ethers } = require("hardhat")
const getEnv = require("./env")
require("dotenv").config()

const deployedFlowSplitterAddress = process.env.FLOWSPLITTER_ADDRESS

async function main() {
    const FlowSplitter = await ethers.getContractFactory("FlowSplitter")
    const flowSplitter = FlowSplitter.attach(deployedFlowSplitterAddress)
    const { testUser, superfluidFramework: sf } = await getEnv()
    const daix = await sf.loadSuperToken("G$")

    const totalShares = await flowSplitter.totalShares()
    console.log(`totalShares: ${totalShares}`)

    const receivers = await flowSplitter.getReceivers()
    console.log(`receivers: ${receivers}`)

    const calcTotalOutflow = await flowSplitter.calcTotalOutflow()
    console.log(`calcTotalOutflow: ${calcTotalOutflow}`)

    receivers.forEach(async (el, i) => {
        const flowPortion = await flowSplitter.getFlowByReceiver(el)
        console.log(`${i+1} flow portion to ${el}: ${flowPortion}`)

        const receiverFlow = await daix.getFlow({
            sender: deployedFlowSplitterAddress,
            receiver: el,
            providerOrSigner: testUser
        })
        console.log(`Flow rate to ${el} : ${receiverFlow.flowRate}`)
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
