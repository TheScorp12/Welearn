import React, { useEffect, useState } from 'react'
import Card from './Card'
import classes from '../css/Courses.module.css'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const Courses = ({userDetails}) => {
    const { query } = useParams();
    const [courses, setCourses] = useState([])
    useEffect( () => {
        fetch('https://learnpedia-backend-ci.azurewebsites.net/api/courses')
            .then((response) => response.json())
            .then((data) => {
              setCourses(data)
            });
    }, [])
    console.log(courses);

    const searchCourses = (query) => {
      fetch(`https://learnpedia-backend-ci.azurewebsites.net/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCourses(data)
        });
    }

    useEffect( () => {
      if(query){
        fetch(`https://learnpedia-backend-ci.azurewebsites.net/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCourses(data)
        });
      } else {
        fetch('https://learnpedia-backend-ci.azurewebsites.net/api/courses')
        .then((response) => response.json())
        .then((data) => {
          setCourses(data)
        });
      }
      
    }, [query])
      
    

  return (
    <>
      <div className={classes.coursesBody}>
        <div className={classes.cardGrid}>
          {courses.map(course => {
            return (
              <Card  key={course._id} {...course} />
            )
          })}
          
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userDetails: state.learnpedia
}
}


const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Courses)