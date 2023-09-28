import React from 'react';
import { useState } from 'react'
import classes from '../css/UpdateStudentProfile.module.css';
import { useNavigate } from 'react-router-dom'

const UpdateStudentProfile = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({})
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
};

async function postData(url = '', data ) {
  // Default options are marked with *
  const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: data // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (formDetails.cnfpassword !== formDetails.password) {
      alert("password mush match confirm password")
      return false
    }
    console.log(formDetails.firstname);
    if (formDetails.firstname !== undefined) {
      fd.append('firstname', formDetails.firstname);
    }
    if (formDetails.lastname) {
      fd.append('lastname', formDetails.lastname);
    }
    if (formDetails.password) {
      fd.append('password', formDetails.password);
    }
    if (formDetails.cnfpassword) {
      fd.append('cnfpassword', formDetails.cnfpassword);
    }
    if (formDetails.email) {
      fd.append('email', formDetails.email);
    }
    if (formDetails.phone) {
      fd.append('phone', formDetails.phone);
    }
    if (file !== null) {
      fd.append('profileImage', file);
    }
    console.log(fd.get('profileImage'));
    postData(`https://Welearn-backend-ci.azurewebsites.net/api/user/${JSON.parse(localStorage.getItem('user'))._id}`, fd)
    setFormDetails({});
    navigate('/shome');
}

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   console.log(formDetails);
  //   if (formDetails.cnfpassword !== formDetails.password) {
  //     alert("password mush match confirm password")
  //     return false
  //   }

  //   postData(`https://Welearn-backend-ci.azurewebsites.net/api/user/${JSON.parse(localStorage.getItem('user'))._id}`, formDetails)
  //   setFormDetails({});
  // }

  return (
    <>
      <div className={classes.body}>
        <section className={classes.studentprofilebody}>
          <section className={classes.formcontainer}>
            <form action="#" onSubmit={submitHandler} encType="multipart/form-data">
              <h3>update profile</h3>
              <p>update firstname</p>
              <input onChange={changeHandler} type="text" name="firstname" placeholder="firstname" maxLength="50" className={classes.box} />
              <p>update lastname</p>
              <input onChange={changeHandler} type="text" name="lastname" placeholder="lastname" maxLength="50" className={classes.box} />
              <p>new password</p>
              <input onChange={changeHandler} type="password" name="password" placeholder="enter your new password" className={classes.box} />
              <p>confirm password</p>
              <input onChange={changeHandler} type="password" name="cnfpassword" placeholder="confirm your new password" className={classes.box} />
              <p>phone number</p>
              <input onChange={changeHandler} type="text" name="phoneno" placeholder="enter your phone number" className={classes.box} />
              <p>Profile photo</p>
              <input onChange={handleFileChange} type="file" name='profileImage' className={classes.box} />
              {/* <p>update pic</p>
               <input onChange={changeHandler} type="file" accept="image/*" className={classes.box}/> */}
              <input onChange={changeHandler} type="submit" value="update profile" name="submit" className={classes.btn}></input>
            </form>
          </section>
        </section>
      </div>
    </>
  )
}

export default UpdateStudentProfile