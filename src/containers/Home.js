import React from "react";
import axios from 'axios';
import "./Home.css";

export default function Home() {

  // Create state variables
  let [profileData, setProfileData] = React.useState('')
  // fetches data
  const fetchData = (e) => {
    axios.post('http://localhost:5000/api/profile',
    {'access_token': localStorage.getItem('token')})
    .then(function (response) {
        setProfileData(response.data.user)
        console.log(response.data)
        console.log(profileData)
    })
    .catch(function (error) {
        // console.log(response.data)
        console.log(error);
        alert("Error Getting Profile");
    });
  }
  const fetchFaculty = (e) => {

  }

  return (
      <div>
          <h1>Profile Page</h1>
          <h2>Name: {profileData.name}</h2>
          <h2>Position: {profileData.staff_type}</h2>
          <h2>Position: {profileData.email}</h2>
          <h2>Position: {profileData.salary}</h2>
          <button onClick={(e) => fetchData(e)} type='button'>Click Me For Data</button>
          {profileData.dates && profileData.dates.map(date => {
              return <p>{date}</p>
          })}
      </div>
  )

  // return (
  //   <div className="Home">
  //     <div className="lander">
  //       <h1>Scratch</h1>
  //       <p className="text-muted">Home page</p>
  //     </div>
  //   </div>
  // );
}