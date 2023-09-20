import { useEffect } from "react";
import { useState } from "react";
import classes from "../css/Help.module.css";
import Faq from '../images/R.png'


const Help = (props) => {

  const [vr, setvr] = useState(true);
  const [vr1, setvr1] = useState(true);
  const [vr2, setvr2] = useState(true);
  const [vr3, setvr3] = useState(true);
  const [vr4, setvr4] = useState(true);

  const [formDetails, setFormDetails] = useState({})
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

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const submitHandler = (event) => {
      event.preventDefault();
      console.log(formDetails);
      if (localStorage.getItem('jwt') === null) {
        alert("Please login to ask a question")
        return
      }
      postData(`https://learnpedia-backend-ci.azurewebsites.net/api/question/${JSON.parse(localStorage.getItem('user'))._id}`, formDetails)
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          if (data.error) {
              alert(data.error)
          }else {
              alert("We have got your question. We will get back to you soon")
          }
        })
        .catch((error) => {
          console.log(error)
          });
      setFormDetails({});
    }




  return (
    <>
      <div className={`${classes.helpbody}`} style={{
        // backgroundImage: 'url(' + Faq + ')' ,
        // backgroundSize: "cover",
        // height: "100vh",
        //   color: "#f5f5f5"
      }}>

        <h2 className={`${classes.helpheading}`} style={{ align: "left" }}>FAQs</h2>
        <button className={`${classes.accordion}`} onClick={() => setvr(prev => !prev)}>How do i know the right courses for me?</button>
        <div className={vr ? ` ${classes.panel} ${classes.none}` : `${classes.panel} `}>
          <p>
            Decide what interests you. List the fields of study that interest you, and
            come up with a list of courses you would consider studying based on these
            interests. Add the topics that you were most interested in. Check online
            about the courses you are interested in and find out about the career
            prospects and the other information. Check out the course content. To
            avoid making mistakes, make sure you review the course outline of the
            course(s) you want to apply for. Have a look at the subjects you must
            undertake and the types of learning, assignments and examination tasks
            involved.
          </p>
        </div>

        <button className={`${classes.accordion}`} onClick={() => setvr1(prev => !prev)}>
          Do i get a certificate for every course i take?
        </button>
        <div className={vr1 ? ` ${classes.panel} ${classes.none}` : `${classes.panel} `} >
          <p>Yes, You will.</p>
        </div>

        <button className={`${classes.accordion}`} onClick={() => setvr2(prev => !prev)}>
          Do i get a refund if the course isnt worth my money?
        </button>
        <div className={vr2 ? ` ${classes.panel} ${classes.none}` : `${classes.panel} `}>
          <p>
            No you dont get the refund back. But you need not worry about it because
            the course which we provide on our website will definetly worth it.
          </p>
        </div>

        <button className={`${classes.accordion}`} onClick={() => setvr3(prev => !prev)}>
          Will i have a life time access to courses i purchase?
        </button>
        <div className={vr3 ? ` ${classes.panel} ${classes.none}` : `${classes.panel} `}>
          <p>yes!</p>
        </div>

        <button className={`${classes.accordion}`} onClick={() => setvr4(prev => !prev)}>What are your payment options?</button>
        <div className={vr4 ? ` ${classes.panel} ${classes.none}` : `${classes.panel} `}>
          <p>UPIs, debit card, credit card, net banking.</p>
        </div>

        <br />
        <br />
        <form>
          <label htmlFor="w3review">Questions:</label><br />
          <textarea
            onChange={changeHandler}
            id="w3review"
            name="question"
            style={{ fontSize: "15pt" }}
            rows="5"
            cols="49"
            placeholder="Any questions..."
          >
          </textarea>

          <br />
          <input
            type="submit"
            onClick={submitHandler}
            style={{
              fontSize: "large",
              backgroundColor: "rgb(13, 110, 253)",
              color: "antiquewhite"
            }}
            // value=" Submit "
          />
        </form>

        {/* <script>
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("help-active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  </script> */}

        {/* <div className={classes.imgright}>
          <img src={Faq}></img>
        </div> */}
      </div>

    </>
  )
}

export default Help;
