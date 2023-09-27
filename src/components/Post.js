import React from 'react'
import axios from 'axios'
import '../css/Post.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Post(props) {
  const navigate = useNavigate();

  console.log("post data in post", props.post);

  const handleDelete = () => {
    alert("inside handle delte")
    axios.delete(`https://localhost:7294/api/Post/DeletePost?Id=${props.post.postId}`)
      .then(response => {
        alert("response came")
        console.log("deleted response ", response)

        props.getPosts();
      })
      .catch(error => {
        alert("errror in deleting")
        console.log("error", error)
      })
  }

  const handleEdit = () => {
    alert("inside hanfle edit")
    navigate("/editPost", { state: props.post })
  }

  const date = new Date(props.post.createdon);
  const createdOn = date.toDateString() + ", " + date.toLocaleTimeString();

  return (
    <div className="post">


      <img src={props.post.postPath} className="card_img_side" alt="unable to load" />
      <div className="card_body">
        <h5 className="card_title">{props.post.title}</h5>
        <p className="card_description">{props.post.description}</p>
        <p className="card_time"><small className="text-muted">Posted on {createdOn}</small></p>
        <p className="card_time"><small className="text-muted">{props.post.updatedon}</small></p>
        <button style ={{marginRight:"10px"}} className=" btn primary-button" onClick={handleEdit}>Edit</button>
        <button className="btn primary-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>

  )
}

export default Post