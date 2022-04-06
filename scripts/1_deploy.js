const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy(["Fabien Roussel", "Nicolas Dupont", "Anne Hidalgo", "Yannick Jadot", "Jean Lassalle", "Emmanuel Macron", "Jean-Luc Mélenchon", "Valérie Pécresse", "Marine Le Pen", "Philippe Poutou", "Nathalie Arthaud", "Éric Zemmour"]
  );

  await election.deployed();
  console.log("Election deployed to:", election.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
