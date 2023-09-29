// require("@nomiclabs/hardhat-ethers");
// import ethers from '@nomiclabs/hardhat-ethers'
// require("dotenv").config();
//var fs = require('fs');
import json from "./createcourses.json";
const { ethers } = require("ethers");
const util = require("util");
// var ethers = require('ethers')
//const fsPromises = fs.promises;

// The path to the contract ABI
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = "ADD course CONTRACT ADDRESS HERE";

// load ABI from build artifacts
async function getAbi() {
  // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = json.abi;
  //console.log(abi);
  return abi;
}

async function addlesson(courseid, lessonurl) {
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
  const coursescontract = new ethers.Contract(
    DEPLOYED_CONTRACT_ADDRESS,
    abi,
    signer
  );
  let addlesson = coursescontract.connect(signer);
  //let tx = await coursescontract.setGreeting('Updated greeting');
  console.log(courseid);
  console.log(lessonurl);
  let tx = await addlesson.addlesson(courseid, lessonurl);
  await tx.wait();
  console.log(tx);
}

export default addlesson;
