import React, { useState } from 'react'
import axios from 'axios'
import '../css/Post.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";


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

  ///////remove unwanted code below later
  const handleLike = () => {
    axios.post(`https://localhost:7294/api/Post/AddLikes?username=${localStorage.getItem("user")}&postid=${props.post.postId}`)
      .then(response => {
        if (response.data == "201") {
          alert("like added")
          console.log("likes added");
          props.getposts();
        }

        else {
          alert("like  not added")
        }
      })
      .catch(error => {
        console.log("error in adding like");
      })
  }
  const handleView = () => {

  }

  const [comment, setComment] = useState();
  const [commentState, setCommentstate] = useState();
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment(value);
  }

  const handleComment = () => {
    setCommentstate(preState => !preState);
  }

  const handleCommentsubmit = () => {
    setCommentstate(0);
    // let data = new FormData();
    // data.append("comment")
    // data.append("commented_by")
    // data.append("comment_date")
    // data.append("is_deleted")
    // data.append("post_id")
    axios.post(`https://localhost:7294/api/Post/AddComments?comment=${comment}&commentedBy=${localStorage.getItem("user")}&postID=${props.post.postId}`)
      .then(response => {
        if (response.data == 201) {
          alert("comment added")
          props.getposts();
        }
        else {
          alert("nooo comment not added")
        }
      })
      .catch(error => {
        console.log("error in comment", error);
        alert("error in axios")
      })



  }
  ////remove the unwanted code in above function later
  const date = new Date(props.post.createdon);
  const createdOn = date.toDateString() + ", " + date.toLocaleTimeString();

  return (
    <div className="post">

      <div className='prof-cnt'>
        <h5 className="card_title">{props.post.title}</h5>
        <p ><small className="text-muted card_time">{createdOn}</small></p>
      </div>

      <img src={props.post.postPath} className="card_img_side" alt="unable to load" />
      <div className="card_body">
        <p className="card_description">{props.post.description}</p>
        <p className="card_time"><small className="text-muted">{props.post.updatedon}</small></p>
      </div>
      <div className='activity-cnt'>
        <div className='activity-items'>
          <FontAwesomeIcon className='icons post-icons' icon={faThumbsUp} onClick={handleLike} />{props.post.likes}

        </div>
        <div className='activity-items'>
          <FontAwesomeIcon className='icons post-icons' icon={faComment} onClick={handleComment} />{props.post.comment_count}

        </div>
        <div className='activity-items'>
          <FontAwesomeIcon className='icons post-icons' icon={faEye} onClick={handleView} />{props.post.views}

        </div>
      </div>
      
      <div>
        <button style={{ marginRight: "10px" }} className=" btn primary-button" onClick={handleEdit}>Edit</button>
        <button className="btn primary-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>

  )
}

export default Post