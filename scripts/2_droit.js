const hre = require("hardhat");
const contractAddress = "0x031Cf5e221FB05275970727F6cAd4D77B61e5319"

async function main() {

    const Election = await hre.ethers.getContractAt("Election", contractAddress);
    const candidats = await Election.getAllCandidats();
    const address = [
        '0xE2576B77966f9BfFd5C8f4e245C6B969bD11790c',
        '0x848F82Dc443d26434F2d5225e120DfcFe9a4A864',
        '0x4D79b879d6A84E679B5CcDE893AaA47b7f7e46c6',
        '0x848F82Dc443d26434F2d5225e120DfcFe9a4A864',
        '0xd5Ca5E8fE68a8609ec91659C29eC31aCCfe3B0e1',
        '0x245cc0780e55DE38cF8f472462D563bd32B4AEC3',
        '0x7b9018Aa94d255CBe9E21AC2E42119d391FB12Dd'
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
