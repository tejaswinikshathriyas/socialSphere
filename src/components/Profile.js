import React, { useEffect, useState } from 'react'
import axios from "axios";
import Post from "./Post";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import "../css/Profile.css"
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLocationDot, faCakeCandles, faDisplay } from '@fortawesome/free-solid-svg-icons'

function Profile() {

  {/* localStorage.getItem("user") ?
          <div className='bg pt'>
              <h2 style={{ margin: "auto" }}>Welcome {localStorage.getItem("user")}</h2>
          </div>
          :
          <div className='bg pt'> <h4> Please Login</h4></div> */}


  return (
    <div className='profile-cnt'>
      {/* <Navbar /> */}
      <div className='profile-img-name-cnt'>
        <p>firstname lastname</p>
        <img className="profile-img" src='logo192.png' alt='No profile' />
      </div>

      <hr />
      <div className='prof-info'>
        <div className='divs'>
          <FontAwesomeIcon className='icons' icon={faUser} />
          <p className='divs'>title</p>
        </div>

        <div className='divs'>
          <FontAwesomeIcon className='icons' icon={faLocationDot} />
          <p>country</p>
        </div>

        <div className='divs'>
          <FontAwesomeIcon className='icons' icon={faCakeCandles} />
          <p>dob</p>
        </div>
      </div>



    </div>

  )
}

export default Profile