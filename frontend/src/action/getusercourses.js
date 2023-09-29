// require("@nomiclabs/hardhat-ethers");
// import ethers from '@nomiclabs/hardhat-ethers'
// require("dotenv").config();
//var fs = require('fs');
import json from "./createuser.json";
const { ethers } = require("ethers");
const util = require("util");
// var ethers = require('ethers')
//const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = "/createuser.json";
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = "ADD USER CONTRACT ADDRESS HERE";

// load ABI from build artifacts
async function getAbi() {
  // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = json.abi;
  //console.log(abi);
  return abi;
}

async function createuser(address, firstname, lastname, email, usertype) {
  // var provider = new ethers.providers.WebSocketProvider("https://api.calibration.node.glif.io/rpc/v1");
  const abi = await getAbi();

  /* 
    // READ-only operations require only a provider.
    // Providers allow only for read operations.
    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
    const greeting = await contract.greet();
    console.log(greeting);
    */

  // WRITE operations require a signer
  // const {PRIVATE_KEY} = process.env;
  const PRIVATE_KEY = "ADD COURSE CONTRACT ADDRESS HERE";
  console.log(PRIVATE_KEY);
  let provider = new ethers.providers.JsonRpcProvider(
    `https://api.calibration.node.glif.io/rpc/v1`
  );
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const usercontract = new ethers.Contract(
    DEPLOYED_CONTRACT_ADDRESS,
    abi,
    signer
  );
  let createuser = usercontract.connect(signer);
  //let tx = await usercontract.setGreeting('Updated greeting');
  const getuser = await createuser.getcourses(address);
  console.log(getuser);
}

export default createuser;
