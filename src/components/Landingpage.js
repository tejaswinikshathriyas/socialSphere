import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from "axios";
import Navbar from './Navbar';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import Profile from './Profile';
import Router from './Router';
import Mid from './Mid';
import "../css/Landingpage.css"
import Right from './Right';


const Landingpage = () => {

    let [postlist, setpostlist] = useState([]);
    let [user , setUser] = useState();
    useEffect(() => {
        axios.get("https://localhost:7294/api/Post/GetPosts")
            .then(response => {
                console.log("response body here", response);
                setpostlist(response.data);
            })
            .catch(error => {
                console.log("error", error)
            });

    }, []);

    return (
        <>
            {/* <Router /> */}
            {/* <Navbar /> */}
            <div className='landing-page-cnt pt'>
                <Profile />
                <Mid />
                <Right />
                {/* {(localStorage.getItem("user"))?
            <div   className='post-cnt pt bg'>
                {
                    postlist.map(eachpost => <PostList key={eachpost.postId} post={eachpost} />)
                }
            </div>
            :
            <div style={{marginTop:"60px"}}>

            <h2> Please Login</h2>
            </div>
            } */}


            </div>
        </>
    )
}

export default Landingpage;