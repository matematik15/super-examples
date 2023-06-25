const getEnv = require('./env')
const { ethers } = require('hardhat');
require("dotenv").config()

async function main() {
    const { testUser, superfluidFramework: sf } = await getEnv()
    const daix = await sf.loadSuperToken("fDAIx")
    console.log(`daix.address: ${daix.address}`)

    console.log("running manage flow script...")

    const createFlowOp = daix.createFlow({
        sender: process.env.DEPLOYER_ADDRESS,
        receiver: process.env.FLOWSPLITTER_ADDRESS,
        flowRate: "3858024691351",
    });

    const updateFlowOp = daix.updateFlow({
        sender: process.env.DEPLOYER_ADDRESS,
        receiver: process.env.FLOWSPLITTER_ADDRESS,
        flowRate: "18580246913511",
    });

    const deleteFlowOp = daix.deleteFlow({
        sender: process.env.DEPLOYER_ADDRESS,
        receiver: process.env.FLOWSPLITTER_ADDRESS
    });

    const FlowSplitter = await ethers.getContractFactory("FlowSplitter");
    const flowSplitter = FlowSplitter.attach(process.env.FLOWSPLITTER_ADDRESS)

    const tx = await flowSplitter.updateSplit(302)
    await tx.wait()

    

    // await createFlowOp.exec(testUser)
    //     .then(tx => {
    //         console.log("Your tx succeeded!")
    //         console.log(tx)
    //     })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
