const { ethers } = require('hardhat');
const { Framework } = require("@superfluid-finance/sdk-core");

async function getEnv() {
    const customHttpProvider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
    const network = await customHttpProvider.getNetwork();
    const superfluidFramework = await Framework.create({
        chainId: network.chainId,
        provider: customHttpProvider
    });

    const testUser = superfluidFramework.createSigner({
        privateKey: process.env.DEPLOYER_PRIVATE_KEY,
        provider: customHttpProvider
    });

    return { testUser, superfluidFramework };
}

module.exports = getEnv;
