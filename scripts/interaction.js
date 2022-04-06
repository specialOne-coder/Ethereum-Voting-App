const hre = require("hardhat");
const contractAddress = "0xae458F2Ad66412a537a92366974dedA54548Ea57"

async function main() {


    const Election = await hre.ethers.getContractAt("Election", contractAddress);
    //const candidats = await Election.getAllCandidats();

    //Droit de vote
    const droitVote = await Election.giveRightToVote("0x3264cbe8474bc183cc3ca59dE8000b8D5d9050dd");
    const votants = await Election.getAllVotants();
    console.log('votants', votants);

    // const inscrits = await Election.getInscrits();
    // console.log('inscrits', inscrits);
    //Premier Tour fini
    //const premierTourFini = await Election.endFirstVote();

    //Second Tour fini
    //const secondTourFini = await Election.endSecondVote();


    //console.log("Election contract cand", candidats);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
