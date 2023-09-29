import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/CourseUploadform.module.css";
import Img1 from "../images/pexels-thisisengineering-3862130.jpg";
import Web3 from "web3";
import addlesson from "../action/addlesson";
import lighthouse from "@lighthouse-web3/sdk";

const LessonUpload = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [modules, setModules] = useState([]);
  const [file, setFile] = useState(null);
  const userCourses = useState([]);
  const [currentCourse, setCurrentcourse] = useState("");
  let provider;
  let lighthousecid;

  const apiKey = "LIGHTHOUSE API KEY";
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log("percentage done " + percentageDone);
  };

  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    console.log(apiKey);
    const output = await lighthouse.uploadBuffer(
      file,
      "LIGHTHOUSE API KEY",
      false,
      null,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
    return output.data.Hash;
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

  useEffect(() => {
    const fetchHandler = async () => {
      const address = await getAddress();
      axios
        .get(`http://localhost:5500/coursesByuserAddress/${address}`)
        .then((res) => {
          console.log(res);
          setCourses(res.data);
        });
    };
    fetchHandler();
  }, []);

  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  useEffect(() => {}, []);

  const onCourseChange = (event) => {
    let courseid = event.target.value;
    console.log(courseid);
    setCurrentcourse(courseid);
  };

  const getModuleList = (event) => {
    changeHandler(event);
    onCourseChange(event);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('video', file);
  //     axios.post('http://localhost:5000/upload', formData)
  //       .then(res => console.log(res.data))
  //       .catch(err => console.error(err));
  //   };

  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (!file) {
      alert("Please fill all the fields");
      return;
    }
    console.log(file);
    uploadFile(file).then((lighthousecid) => {
      console.log(currentCourse);
      addlesson(currentCourse, lighthousecid)
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          if (data.error) {
            alert(data.error);
          } else {
            alert("Lesson uploaded Successfully");
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
      navigate("/educator");
    });
    // setFormDetails({});
  };

  return (
    <>
      <div style={{ marginTop: "20px" }} className={classes.body}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.imageBox}>
              <img src={Img1} alt="" />
            </div>
            <form action="#">
              <div className={classes.topic}>upload a Lesson</div>
              <div className={classes.inputBox}>
                <select
                  onChange={getModuleList}
                  name="courseId"
                  value={formDetails.courseId || ""}
                  aria-label="Default select example"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => {
                    return (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={classes.inputBox}>
                <input
                  onChange={handleFileChange}
                  style={{ padding: "15px" }}
                  type="file"
                  id="myfile"
                  name="video"
                  required
                />
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

export default LessonUpload;
