import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from "axios";
import '../css/FormStyle.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [post, setPost] = useState({ title: '', description: '', postPath: "", userId: 4 });
    const [img, setImg] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("userId"))
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.type === "file") {
            setPost({ ...post, "postPath": event.target.files[0] });
            setImg(event.target.files[0])
            //handleChangeImage(event.target.files[0]);
        } else {
            setPost({ ...post, [name]: value })
        }

    }

    const formdata = {
        Title: post.title,
        Description: post.description,
        PostPath: post.postPath,
        UserId: localStorage.getItem("userId")
    }

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
        return imgRes.url
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (formdata.Title === '') {
            alert("hello user please add Title to the post")
            return;
        }

        if (formdata.Description === '') {
            alert("hello user please add description to the post")
            return
        }

        if (formdata.PostPath === '') {

            alert("hello user please add picture ")
            return
        }


        const img_url = await handleChangeImage(img);
        console.log("image info here", img_url);
        // alert("adding POst")

        //debugger;

        const data = new FormData()
        data.append("Title", formdata.Title);
        data.append("Description", formdata.Description);
        data.append("PostPicture", img_url);
        data.append("UserId", parseInt(formdata.UserId));
        console.log(data)
        console.log(localStorage.getItem("userId"))
        axios.post("https://localhost:7294/api/Post/CreatePosts", data)
            .then(response => {

                console.log("response", response);
                navigate("/myPost")
                
            })
            .catch(error => {
                console.log("error", error);
            })
    }





    return (
        <>
            <Navbar />
            <div className='createPost-cnt'>
                <div className='form-cnt'>
                    <div className='centre-div'>
                        <form>
                            <div class="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} id="titleInput" aria-describedby="titleInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="descriptionInput" className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={post.description} onChange={handleChange} id="descriptionInput" aria-describedby="descriptionInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="fileInput" className="form-label">Add your picture here</label>
                                <input type="file" className="form-control" name="postPicture" onChange={handleChange} id="fileInput" aria-describedby="fileInput" />
                            </div>
                            
                            <div>
                                <button className='btn primary-button' onClick={handlePostSubmit}>Add Post</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreatePost