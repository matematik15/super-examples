const ethers = require("ethers")
const { Framework } = require("@superfluid-finance/sdk-core")

async function main() {
    const url = `${process.env.GOERLI_URL}`
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url)
    const network = await customHttpProvider.getNetwork()

    const sf = await Framework.create({
        chainId: network.chainId,
        provider: customHttpProvider
    })

    const deployer = sf.createSigner({
        privateKey: process.env.TEST_ACC_PRIVATE_KEY,
        provider: customHttpProvider
    })

    console.log("running deployFacotry script...")

    const SpreaderFactory = await hre.ethers.getContractFactory("SpreaderFactory")
    const spreaderFactory = await SpreaderFactory.connect(deployer).deploy()

    await spreaderFactory.deployed()

    console.log("Spreader Factory deployed to:", spreaderFactory.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})

// Deploy: npx hardhat run scripts/deployFactory.js --network goerli
