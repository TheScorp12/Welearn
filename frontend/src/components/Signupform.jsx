import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signupform.css";
import Web3 from "web3";
import { useEffect } from "react";
// const createuser = require('../action/createuser')
import createuser from "../action/createuser";

const Signupform = () => {
  let navigate = useNavigate();
  let provider;
  var message = "signing message";
  const [formDetails, setFormDetails] = useState({ role: 0 });
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const formValidation = () => {
    if (formDetails.lastname) {
      formDetails.lname = formDetails.lastname.trim();
    }

    if (formDetails.firstname && formDetails.email) {
      formDetails.fname = formDetails.firstname.trim();
      formDetails.email = formDetails.email.trim();
      if (formDetails.fname.length < 3) {
        alert("First name must of size atleast size 3");
        return false;
      }
      if (!isNaN(formDetails.fname.charAt(0))) {
        alert("name must not start with number");
        return false;
      }
      return true;
    } else {
      console.log("hello");
      return false;
    }
  };

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

  useEffect(() => {
    if (isConnected) {
      alert("Registration Successful!");
      console.log(formDetails);
      // postData('http://localhost:3001/register', formDetails)
      //   .then((data) => {
      //     console.log(data); // JSON data parsed by `data.json()` call
      //   });
      createuser(
        formDetails.address,
        formDetails.firstname,
        formDetails.lastname,
        formDetails.email,
        formDetails.role
      );
      setFormDetails({ role: 0 });
      navigate("/login");
    }
  }, [isConnected]);

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[1];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        const signature = await web3.eth.personal.sign(message, account);
        formDetails.address = account;
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formValidation()) {
      console.log(formValidation);
      return false;
    }
    onConnect();
  };

  return (
    <>
      <div className="signuppage-body">
        <div className="ccontainer">
          <div className="title">Registration</div>
          <div className="ccontent">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input
                    onChange={changeHandler}
                    name="firstname"
                    type="text"
                    value={formDetails.firstname || ""}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Last name</span>
                  <input
                    onChange={changeHandler}
                    name="lastname"
                    type="text"
                    value={formDetails.lastname || ""}
                    placeholder="Enter your Last name"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    onChange={changeHandler}
                    name="email"
                    type="email"
                    value={formDetails.email || ""}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="gender-details">
                <input
                  id="dot-4"
                  onChange={(e) => {
                    setFormDetails((prev) => {
                      return { ...prev, role: 0 };
                    });
                  }}
                  type="radio"
                  name="role"
                  value="student"
                  checked={formDetails.role === 0}
                />
                <input
                  id="dot-5"
                  onChange={(e) => {
                    setFormDetails((prev) => {
                      return { ...prev, role: 1 };
                    });
                  }}
                  type="radio"
                  name="role"
                  value="educator"
                  checked={formDetails.role === 1}
                />
                {/* <input onChange={changeHandler} type="radio" name="gender" id="dot-3" value="others" checked={formDetails.gender === 'others'} /> */}
                <span className="gender-title">Select role</span>
                <div className="category">
                  <label htmlFor="dot-4">
                    <span className="dot four"></span>
                    <span className="gender">Student</span>
                  </label>
                  <label htmlFor="dot-5">
                    <span className="dot five"></span>
                    <span className="gender">Educator</span>
                  </label>
                  {/* <label htmlFor="dot-3">
                    <span className="dot three"></span>
                    <span className="gender">Prefer not to say</span>
                  </label> */}
                </div>
              </div>
              <div></div>
              <div className="button">
                <input type="submit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signupform;
