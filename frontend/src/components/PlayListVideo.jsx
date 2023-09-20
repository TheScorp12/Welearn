import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from "../css/PlayListVideo.module.css"
import BackImg from "../images/vid-7.mp4"
import Image from "../images/loginimg2.jpg"
import { useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings';

const PlayListVideo = () => {
  const { courseid } = useParams();
  const [course, setCourse] = useState({modules: []})
  const [lesson, setLesson] = useState({})
  const [isdropdownactive, setdropdownactive] = useState([])
  const [videoURL, setVideoURL] = useState(null)
  const [rating, setRating] = useState(0);
  const [originalRating, setOriginalRating] = useState(0);
  //get course details
  useEffect(() => {
    fetch(`https://learnpedia-backend-ci.azurewebsites.net/api/course/${courseid}`, {
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.error) {
          console.log(data.error)
          setCourse({modules: []})
        } else {
          console.log(data);
          setCourse(data)
          setRating(data.rating);
          setOriginalRating(data.rating);
        }
      })
  }, [])

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'))
    if (userDetails == null || userDetails == undefined || course._id == undefined || lesson._id == undefined) {
      return
    }
    fetch(`https://learnpedia-backend-ci.azurewebsites.net/api/lesson/${userDetails._id}/${course._id}/${lesson._id}`, {
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.error) {
          console.log(data.error)
        } else {
          console.log(data);
          setVideoURL(data)
          // setVideoURL(URL.createObjectURL(data))
          // videoURL = URL.createObjectURL(data);
        }
      })
  }, [lesson])
  const updateRating = () => {
    let updatedRating = Math.floor((rating + originalRating) / 2);
    const data = {
      rating: updatedRating,
      id: course._id,
    };
    fetch("https://learnpedia-backend-ci.azurewebsites.net/api/update-rating", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLesson = (event) => {
    console.log(event.target.id);
    fetch(`https://learnpedia-backend-ci.azurewebsites.net/api/lesson/${event.target.id}`, {
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.error) {
          console.log(data.error)
        } else {
          console.log(data);
          setLesson(data)
        }
      })
  }

          


  let tempArr = []
  useEffect(() => {
    course.modules.map((module, index) => {
      tempArr.push(true)
    })
    setdropdownactive(tempArr)
  }, [course])


  // const [isdropdownactive1, setdropdownactive1] = useState(false)
  // const [isdropdownactive2, setdropdownactive2] = useState(false)
  // const [isdropdownactive3, setdropdownactive3] = useState(false)
  return (
    <>
      <div className={classes.body}>
        <div className={classes.playlistvideobody}>
          <div className={classes.sidebar}>
            <div className={classes.sidenav}>
              <div className={classes.sidebarheader}> <h3 className={classes.sidebarheading}>Course Content</h3> </div>
              {
                course.modules.map((module, index) => {
                  return (
                    <div key={index}>
                      <button className={classes.sidebardropdownbtn} onClick={() => setdropdownactive(
                        isdropdownactive.map((item, i) => {
                          if (i === index) {
                            return !item
                          } else {
                            return item
                          }
                        })
                      )}>{module.title}</button>
                      <div className={isdropdownactive[index] ? classes.dropdowncontainer : ''}>
                        {
                          module.lessons.map((lesson, index) => {
                            return (
                              <Link id={lesson._id} onClick={getLesson} to={`#`} key={lesson._id}>{lesson.title}</Link>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {/* <div><h1>Section</h1></div> */}
        </div>
        <section className={classes.watchvideo}>
          <div className={classes.videocontainer}>
            <div className={classes.video}>
              <video src={videoURL} controls width="100%"
              >
                {/* <source src={BackImg} type="video/mp4"></source> */}
                {/* <source src={videoURL} type="video/mp4" ></source> */}
              </video>
            </div>
            {
              lesson && <h3 className={classes.title}>{lesson.title}</h3>
            }
            <div className={classes.rating}>
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={(newRating, name) => {
                  setRating(newRating);
                }}
                numberOfStars={5}
                starDimension="30px"
              />
              <button onClick={updateRating}>Submit</button>
            </div>
            <div className={classes.tutor}>
              <img src={Image} alt="" />
              <div>
                {
                  course.educator && <h3>{course.educator.firstname}</h3>
                }
                <span>course instructor</span>
              </div>
            </div>
            {/* <form action="" method = "POST" enctype = "multipart/form-data"className={classes.flex}> */}
            {/* <Link to={`#`} className={classes.inlinebtn}>view playlist</Link> */}
            {/* <button><h6><i class="far fa-heart"></i><span>like</span></h6></button> */}
            {/* </form> */}
            {lesson && <p className={classes.description}>{lesson.desc}</p>}
          </div>
        </section>
      </div>
    </>
  )
}

export default PlayListVideo