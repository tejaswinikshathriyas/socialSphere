import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Post from "./Post"
import Navbar from './Navbar';

function MyPosts() {
    const navigate = useNavigate();
    const [rerenderParent, setRerenderParent] = useState(0);
    let [mypostlist, setmypostlist] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = ()=>{
        axios.get(`https://localhost:7294/api/Post/GetIndividualPosts?userId=${localStorage.getItem("userId")}`)
        .then(response => {
            console.log("response body here", response);
            setmypostlist(response.data);
        })
        .catch(error => {
            console.log("error", error)
        });
    }

    return (
        <div>
            {/* <Navbar /> */}
            {
                localStorage.getItem("user") ?
                    <>
                        {
                            (mypostlist.length > 0) ?
                                <div className='bg pt mypost-cnt'>
                                    {
                                        mypostlist.map(eachpost => <Post key={eachpost.postId} post={eachpost} getPosts = {getPosts} />)
                                    }
                                </div>
                                :
                                <h1> you have no posts yet</h1>
                        }
                    </>
                    :
                    <div className='bg pt'> <h4> Please Login</h4></div>

            }

        </div>
    )
}

export default MyPosts