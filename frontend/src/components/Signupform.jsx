import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Signupform.css'
import Web3 from 'web3'; 
import { useEffect } from 'react';

const Signupform = () => {
  let navigate = useNavigate()
  var message = "signing message";
  const [formDetails, setFormDetails] = useState({"role": "student"})
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return (
        {
          ...prev,
          [name]: event.target.value
        }
      )
    })
  }

  const formValidation = () => {
    if(formDetails.lastname ) {
      formDetails.lname = formDetails.lastname.trim()
    }

    if (formDetails.firstname && formDetails.email) {
      formDetails.fname = formDetails.firstname.trim()
      formDetails.email = formDetails.email.trim()
      if (formDetails.fname.length < 3) {
        alert("First name must of size atleast size 3")
        return false;
      }
      if (!isNaN(formDetails.fname.charAt(0))) {
        alert("name must not start with number")
        return false;
      }
      return true;
    } else {
      console.log('hello');
      return false;
    }
  }


  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const detectCurrentProvider = () => {
    let provider;
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
    if(isConnected){
      alert("Registration Successful!")
      console.log(formDetails);
      postData('http://localhost:3001/register', formDetails)
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
      setFormDetails({"role": "student"});
      navigate('/login')
    }
  }, [isConnected])

  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        const signature = await web3.eth.personal.sign(message, account);
        formDetails.address = account;  
        formDetails.signature = signature;
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formValidation()) {
      console.log(formValidation);
      return false;
    }
    onConnect();
  }

  return (
    <>
      <div className='signuppage-body'>
        <div className="ccontainer">
          <div className="title">Registration</div>
          <div className="ccontent">
            <form action="#" onSubmit={submitHandler}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input onChange={changeHandler} name="firstname" type="text" value={formDetails.firstname || ""} placeholder="Enter your name" required/>
                </div>
                <div className="input-box">
                  <span className="details">Last name</span>
                  <input onChange={changeHandler} name='lastname' type="text" value={formDetails.lastname || ""} placeholder="Enter your Last name" />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input onChange={changeHandler} name='email' type="email" value={formDetails.email || ""} placeholder="Enter your email" required />
                </div>
              </div>
              <div className="gender-details">
                <input id="dot-4" onChange={changeHandler} type="radio" name="role"  value="student" checked={formDetails.role === 'student'} />
                <input id="dot-5" onChange={changeHandler} type="radio" name="role"  value="educator" checked={formDetails.role === 'educator'} />
                {/* <input onChange={changeHandler} type="radio" name="gender" id="dot-3" value="others" checked={formDetails.gender === 'others'} /> */}
                <span className="gender-title">Select role</span>
                <div className="category">
                  <label   htmlFor="dot-4">
                    <span className="dot four"></span>
                    <span className="gender">Student</span>
                  </label> 
                  <label  htmlFor="dot-5">
                    <span className="dot five"></span>
                    <span className="gender">Educator</span>
                  </label>
                  {/* <label htmlFor="dot-3">
                    <span className="dot three"></span>
                    <span className="gender">Prefer not to say</span>
                  </label> */}
                </div>
              </div>
              <div>
          </div>
              <div className="button">
                <input type="submit" value="Register" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signupform