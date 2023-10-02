import React from 'react'
import { useEffect } from 'react';
import { useState, useForceUpdate } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function EditPost(props) {

    const [post, setPost] = useState({ title: '', description: '', postPath: "", userId: 0 });
    const location = useLocation()
    const [previmg , setPrevimg] = useState(null)
    console.log("this is state ", location.state);

    const navigate = useNavigate();

    useEffect(() => {
        // setPost(null)
        setPost(location.state)
    }, [])

    const handleChangeImage = async (file) => {

        const data = new FormData();
        data.append("file", file)
        data.append("upload_preset", "socialSphere")
        data.append("cloud_name", "dl77yavd9")

        const imgData = await fetch("https://api.cloudinary.com/v1_1/dl77yavd9/image/upload", {
            method: 'POST',
            body: data
        })
        const imgRes = await imgData.json();

        console.log("imgRes", imgRes.url);
        setPost({...post , postPath:imgRes.url})
       
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.type === "file") {
            // setPost({ ...post, "postPath": event.target.files[0] })
            handleChangeImage(event.target.files[0]);

        } else {
            setPost({ ...post, [name]: value })
        }

    }

    const handleEdit = (event) => {
        event.preventDefault();
        console.log("inside the handle edit ", post);
        axios.put(`https://localhost:7294/api/Post/UpdatePost`, post)
            .then(response => {
                alert('got the response')
                navigate("/myPost")
            })
            .catch(error => {
                alert('error occured')
                console.log("error here", error);
            })
    }


    return (
        <div >
            <Navbar />

            <div className='createPost-cnt'>
                <div className='form-cnt'>
                    <div className='centre-div'>
                        <form>
                            <div class="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={post?.title} onChange={handleChange} id="titleInput" aria-describedby="titleInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="descriptionInput" className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={post?.description} onChange={handleChange} id="descriptionInput" aria-describedby="descriptionInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="fileInput" className="form-label">Edit your picture here</label>
                                <input type="file" className="form-control" name="postPicture" fileName={post?.postPath} onChange={handleChange} id="fileInput" aria-describedby="fileInput" />
                            </div>
                            <div>
                                <p>Preview image</p>
                                <img className="edit-img" src={post?.postPath} alt='not uploaded' />
                            </div>
                            <div>
                                <button className='btn primary-button' onClick={handleEdit}>Edit Post</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            {/*  */}
            {/* <div style={{marginTop:"60px"}}>
                <form>
                    <p> title</p>
                    <input type="text" name="title" value={post?.title} onChange={handleChange} />

                    <p>decription </p>
                    <textarea maxLength="60" name="description" value={post?.description} onChange={handleChange} />

                    <p> postPath</p>
                    <input type="file" name="postPicture" onChange={handleChange} />
                    <button onClick={handleEdit}>Edit Post</button>
                </form>
            </div> */}

        </div>
    )
}

export default EditPost