import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import axios from "axios";
import Navbar from './Navbar';


const Landingpage = () => {

    let [postlist, setpostlist] = useState([]);
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
        <div>
            
                <Navbar />
            {(localStorage.getItem("user"))?
            <div   className='post-cnt pt bg'>
                {
                    postlist.map(eachpost => <PostList key={eachpost.postId} post={eachpost} />)
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

export default Landingpage;