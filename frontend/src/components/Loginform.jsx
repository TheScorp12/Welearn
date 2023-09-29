import React, { useState } from "react";
import Image from "../images/loginimg2.jpg";
import "../css/Loginform.css";
import Web3 from "web3";

import { connect } from "react-redux";
import { signIn } from "../action/Welearn";
import { useNavigate } from "react-router-dom";
import json from "../action/createuser.json";
const { ethers, JsonRpcProvider } = require("ethers");
const util = require("util");
let provider;
let address;

// The path to the contract ABI
const ABI_FILE_PATH = "../actions/createuser.json";
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = "ADD USER CONTRACT ADDRESS HERE";

const Loginform = ({ signIn }) => {
  let navigate = useNavigate();
  let message = "Login Message";
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const ABI_FILE_PATH = "../actions/createuser.json";
  // The address from the deployed smart contract
  const DEPLOYED_CONTRACT_ADDRESS = "ADD USER CONTRACT ADDRESS HERE";

  // load ABI from build artifacts
  async function getAbi() {
    // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = json.abi;
    //console.log(abi);
    return abi;
  }

  const detectCurrentProvider = () => {
    if (window.ethereum) {
      provider = window.ethereum;
      return provider;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      return provider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
  };

  async function postData(address) {
    // Default options are marked with *
    const PRIVATE_KEY = "ADD COURSE CONTRACT ADDRESS HERE";
    let provider = new ethers.providers.JsonRpcProvider(
      `https://api.calibration.node.glif.io/rpc/v1`
    );
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const abi = await getAbi();
    const usercontract = new ethers.Contract(
      DEPLOYED_CONTRACT_ADDRESS,
      abi,
      signer
    );
    let createuser = usercontract.connect(signer);
    const response = await await createuser.wallets(address);
    console.log(response);
    console.log(response.usertype.toNumber());
    return response; // parses JSON response into native JavaScript objects
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[1];
        let ethBalance = await web3.eth.getBalance(account);
        const signature = await web3.eth.personal.sign(message, account);
        setEthBalance(ethBalance);
        address = account;
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
    if (isConnected) {
      postData(address).then((data) => {
        if (data.usertype) {
          const userData = data;
          signIn(data);
          console.log("works");
          if (userData.usertype.toString() === "0") {
            navigate("/shome"); //student
          } else if (userData.usertype.toString() === "1") {
            navigate("/educator"); //instructor
          } else if (userData.usertype.toString() === "2") {
            navigate("/admin"); //admin
          }
        } else if (data.error) {
          alert(data.error);
        }
      });
    }
  };

  return (
    <div className="lbody">
      <div className="lcontainer">
        <div className="cover">
          <div className="front">
            <img src={Image} alt="" />
            <div className="text">
              <span className="text-1">
                Every new course is a <br /> new journey
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form action="#" onSubmit={submitHandler}>
                <div className="input-boxes">
                  <div className="button input-box">
                    <input type="submit" value="Connect wallet to Login!" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account?{" "}
                    <label htmlFor="flip">Sigup now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userDetails) => {
    dispatch(signIn(userDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Loginform);
