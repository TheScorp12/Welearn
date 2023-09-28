require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = 'artifacts/contracts/createuser.sol/createuser.json';
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = '0x904abFd9D5042b2908f1E5F1cE76a77c7d0394A2';

// load ABI from build artifacts
async function getAbi(){
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}

async function createuser(address,firstname,lastname,email,usertype) {
    let provider = ethers.getDefaultProvider(`https://api.calibration.node.glif.io/rpc/v1`);
    const abi = await getAbi()

    /* 
    // READ-only operations require only a provider.
    // Providers allow only for read operations.
    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
    const greeting = await contract.greet();
    console.log(greeting);
    */

    // WRITE operations require a signer
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const usercontract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    //let tx = await usercontract.setGreeting('Updated greeting');
    let tx = await usercontract.saveuser(address,firstname,lastname,email,usertype);
    await tx.wait();
    const getuser = await usercontract.wallets(address);
    console.log(getuser);
}

module.exports = createuser;