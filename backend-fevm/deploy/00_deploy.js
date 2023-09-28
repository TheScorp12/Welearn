// require("hardhat-deploy")
// require("hardhat-deploy-ethers")

// const { networkConfig } = require("../helper-hardhat-config")

// module.exports = async ({ deployments }) => {
// const { deploy } = deployments;
// const PRIVATE_KEY = network.config.accounts[0]
// const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider)

// const createuser = await ethers.getContractFactory('createuser', wallet);
//     console.log('Deploying createuser...');
//     const dc = await createuser.deploy();
//     await dc.deployed()

//     const f4Address = fa.newDelegatedEthAddress(dc.address).toString();
//     console.log('createuser deployed to:', dc.address);
//     console.log('f4Address:', f4Address);
// }
// //0x35d7ad00bCD9e429C16a4a9387D69DA4EDa7824e


require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const PRIVATE_KEY = "0237ff2ad0de9c13520b961f3f5eb834510c5e63d22922e1f1088b43bfa1e656";
const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet Ethereum Address:", wallet.address)

    
    //deploy Simplecoin
    const createuser = await deploy("createuser", {
        from: wallet.address,
        args: [],
        log: true,
    });

    // const f4Address = fa.newDelegatedEthAddress(createuser.address).toString();
    // console.log('createuser deployed to:', createuser.address);
    // console.log('f4Address:', f4Address);
}
//0x904abFd9D5042b2908f1E5F1cE76a77c7d0394A2