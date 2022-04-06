require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url:'https://eth-rinkeby.alchemyapi.io/v2/PmjG4XmbEkuzKBv12aIE3nrIgIJwcrXc',
      accounts:['f7b239b8e1baefeb26f0702adb9a593923c2e63e1a376e161f2071762d0c6180']
    }
  },
  etherscan: {
    apiKey: "D9HZCRSCU5CDDZJX74J4S6KEPINPH5XUAW",
  }
};
