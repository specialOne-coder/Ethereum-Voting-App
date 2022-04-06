const hre = require("hardhat");
const contractAddress = "0x031Cf5e221FB05275970727F6cAd4D77B61e5319"

async function main() {

    const Election = await hre.ethers.getContractAt("Election", contractAddress);
    //Droit de vote
    const finish = await Election.endSecondVote();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
