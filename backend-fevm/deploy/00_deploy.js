require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

const DealClient = await ethers.getContractFactory('DealClient', wallet);
    console.log('Deploying DealClient...');
    const dc = await DealClient.deploy();
    await dc.deployed()

    const f4Address = fa.newDelegatedEthAddress(dc.address).toString();
    console.log('DealClient deployed to:', dc.address);
    console.log('f4Address:', f4Address);
    
//0x35d7ad00bCD9e429C16a4a9387D69DA4EDa7824e