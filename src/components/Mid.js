import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from "axios";
import Navbar from './Navbar';
import Profile from './Profile';
import Router from './Router';

function Mid() {
    let [postlist, setpostlist] = useState([]);
   
    const getposts = ()=>{
        axios.get("https://localhost:7294/api/Post/GetP")
        .then(response => {
            console.log("response body here", response);
            setpostlist(response.data);
        })
        .catch(error => {
            console.log("error", error)
        });
    }

    useEffect(() => {
        getposts() 
    }, []);

    
  return (
    <div className='mid-cnt'>
         {(localStorage.getItem("user"))?
            <div   className='post-cnt bg'>
                {
                    postlist.map(eachpost => <PostList key={eachpost.postId} post={eachpost} getposts ={getposts} />)
                }
            </div>
            :
            <div style={{marginTop:"60px"}}>

            <h2> Please Login</h2>
            </div>
            }
    </div>
  )
}

export default Mid