import React from 'react'
import axios from 'axios'
import '../css/Post.css';
import { useNavigate } from 'react-router-dom';

function PostList(props) {
    const navigate = useNavigate();

    console.log(props.post);

    const date =new Date(props.post.createdon);

    const createdOn = date.toDateString() + ", " + date.toLocaleTimeString();

    return (
        <div className="post">


            <img src={props.post.postPath} className="card_img_side" alt="unable to load" />
            <div className="card_body">
                <h5 className="card_title">{props.post.title}</h5>
                <p className="card_description">{props.post.description}</p>
                <p className="card_time"><small className="text-muted">Posted on {createdOn}</small></p>
                <p className="card_time"><small className="text-muted">{props.post.updatedon}</small></p>

            </div>
        </div>

    )
}



export default PostList

