const hre = require("hardhat");
const contractAddress = "0x031Cf5e221FB05275970727F6cAd4D77B61e5319"

async function main() {

    const Election = await hre.ethers.getContractAt("Election", contractAddress);
    const candidats = await Election.getAllCandidats();
    const address = [
        '0xDdE05395d4880d5Fbaaff592A944E564989d658D'
    ]
    //Droit de vote
    for(let i of address){
        await Election.giveRightToVote(i.toString());
    }
    const votants = await Election.getAllVotants();
    console.log('votants', votants);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
