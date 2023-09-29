import React, { useState } from "react";
import classes from "../css/CourseUploadform.module.css";
import Img1 from "../images/pexels-thisisengineering-3862130.jpg";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import createcourse from "../action/createcourse.js";
import { customAlphabet } from "nanoid";

const CourseUploadform = ({ userDetails }) => {
  const navigate = useNavigate();
  let provider;
  const [formDetails, setFormDetails] = useState({});
  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
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
  const getAddress = async () => {
    const currentProvider = detectCurrentProvider();
    if (currentProvider) {
      await currentProvider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const account = userAccount[0];
      const address = account;
      return address;
    }
    return null;
  };

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formDetails);
    const address = await getAddress();
    if (!address) {
      alert("Non-ethereum browser detected. You should install Metamask");
      return;
    }
    const gen = customAlphabet("1234567890", 10);
    const id = gen();
    axios
      .post("http://localhost:5500/courseUpload", {
        id,
        title: formDetails.title,
        description: formDetails.desc,
        price: formDetails.price,
        noOfLessons: 0,
        userAddress: address,
      })
      .then((res) => {
        createcourse(id, address, formDetails.price);
        console.log(res);
      });
  };

  return (
    <>
      <div className={classes.body}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.imageBox}>
              <img src={Img1} alt="" />
            </div>
            <form action="#">
              <div className={classes.topic}>Create a new Course</div>
              <div className={classes.inputBox}>
                <input
                  onChange={changeHandler}
                  name="title"
                  type="text"
                  value={formDetails.title || ""}
                  required
                />
                <label>Enter title of the course</label>
              </div>
              <div className={classes.inputBox}>
                <input
                  onChange={changeHandler}
                  type="number"
                  name="price"
                  value={formDetails.price || ""}
                  required
                />
                <label>Enter Price of the Course</label>
              </div>
              <div className={classes.inputBox}>
                <select
                  onChange={changeHandler}
                  name="category"
                  value={formDetails.category || ""}
                  aria-label="Default select example"
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="Arts">Arts</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sciences">Sciences</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div className={classes.messageBox}>
                <textarea
                  onChange={changeHandler}
                  minlength="125"
                  name="desc"
                  value={formDetails.desc || ""}
                ></textarea>
                <label>Enter description of the course</label>
              </div>
              <div className={classes.inputBox}>
                <input onClick={submitHandler} type="submit" value="Create" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.Welearn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // signOut: (userDetails) => {
  //     dispatch(signOut())
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseUploadform);

// export default CourseUploadform
