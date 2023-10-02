import React, { useState } from 'react'
import axios from 'axios'
import '../css/Post.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function PostList(props) {
    const navigate = useNavigate();
    const [commentstate, setCommentstate] = useState(false);
    const [comment, setComment] = useState("");

    console.log("see here", props.post);

    const date = new Date(props.post.createdon);

    const createdOn = date.toDateString() + ", " + date.toLocaleTimeString();

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
    return (
        <div className="post">

            <div className='prof-cnt'>

                <div className='user-cnt'>
                    <img className='posted-profile-pic' src="img1.jpg" alt='error loading' />
                    <p> Posted name</p>
                </div>
                <p ><small className="text-muted card_time">{createdOn}</small></p>
            </div>
            <div className='card-cnt'>
                <h5 className="card_title">{props.post.title}</h5>
                <div className='img-cnt'>
                    <img src={props.post.postPath} className="card_img_side" alt="unable to load" />
                </div>
                <div className="card_body">
                    <div className='desc-cnt'>
                        <p className="card_description">{props.post.description}</p>

                    </div>
                    <p className="card_time"><small className="text-muted">{props.post.updatedon}</small></p>
                </div>
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
            {
                (commentstate) ?
                    <div className="comment-div">
                        <form>
                            <input type="text" className="comment-area" name="comment" value={comment} placeholder='Add your comment...' onChange={handleCommentChange} id="commmentInput" aria-describedby="commentInput" />
                            <FontAwesomeIcon icon={faPaperPlane} title='Add comment' className='comment-btn' onClick={handleCommentsubmit}/>
                        </form>
                    </div>
                    :
                    <></>
            }
        </div>

    )
}



export default PostList

