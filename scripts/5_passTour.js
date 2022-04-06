const hre = require("hardhat");
const contractAddress = "0x031Cf5e221FB05275970727F6cAd4D77B61e5319"

async function main() {

    const Election = await hre.ethers.getContractAt("Election", contractAddress);
    const candidats = [2, 5]
    //Passez des candidats au second tour
    for (let i of candidats) {
        const finish = await Election.passSecondTour(i);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
