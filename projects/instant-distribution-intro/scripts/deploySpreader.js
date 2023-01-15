const hre = require("hardhat")
const ethers = hre.ethers
const { Framework } = require("@superfluid-finance/sdk-core")
const SpreaderFactoryABI = require("../artifacts/contracts/SpreaderFactory.sol/SpreaderFactory.json").abi
require("dotenv").config()

async function main() {
    //// Applying best practices and using Superfluid Framework to get deployment info

    //Obtain it by running deployFactory.js
    const SpreaderFactoryAddress = process.env.SPREADERFACTORY_ADDRESS

    // Setting up network object - this is set as the goerli url, but can be changed to reflect your RPC URL and network of choice
    const url = `${process.env.GOERLI_URL}`
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url)
    const network = await customHttpProvider.getNetwork()

    // Setting up the out Framework object with Goerli (knows it's Goerli when we pass in network.chainId)
    const sf = await Framework.create({
        chainId: network.chainId,
        provider: customHttpProvider
    })

    const testUser = sf.createSigner({
        privateKey: process.env.TEST_ACC_PRIVATE_KEY,
        provider: customHttpProvider
    })

    // Getting the Goerli fDAIx Super Token object from the Framework object
    // This is fDAIx on goerli - you can change this token to suit your network and desired token address
    const daix = await sf.loadSuperToken("fDAIx")

    //// Actually deploying

    // We get the contract to deploy to Gorli Testnet
    const spreaderFactory = new ethers.Contract(
        SpreaderFactoryAddress,
        SpreaderFactoryABI,
        customHttpProvider
    )

    const createTx = await spreaderFactory
        .connect(testUser)
        .createNewSpreader(
            daix.address
        )
    await createTx.wait();

    const spreaders = await spreaderFactory.getOwnerSpreaders(testUser.address)

    console.log("Token Spreader deployed to:", spreaders[spreaders.length - 1])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})

// Deploy: npx hardhat run scripts/deploySpreader.js --network goerli

// Verify: npx hardhat verify --network goerli --constructor-args arguments-tokenspreader.js [contractaddress]
