import React, { useEffect, useState } from 'react'
import axios from "axios";
import Post from "./Post";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <Navbar />
      {
        localStorage.getItem("user") ?
          <div className='bg pt'>
              <h2 style={{ margin: "auto" }}>Welcome {localStorage.getItem("user")}</h2>
          </div>
          :
          <div className='bg pt'> <h4> Please Login</h4></div>
          
      }

    </div>


  )
}

export default Profile