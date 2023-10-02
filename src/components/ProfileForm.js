import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import '../css/FormStyle.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

// firstname , lastname , dob, city, address, country , profile_pic , gender , title 
function ProfileForm() {
    const [profiledata, setProfiledata] = useState({ firstname: "", lastname: "", dob: '', city: "", address: "", country: "", profilepic: "", gender: "", title: "" })
    const [img, setImg] = useState("");
    let img_url="";
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("userId"))
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.type === "file") {
            setProfiledata({ ...profiledata, "profilepic": event.target.files[0] });
            setImg(event.target.files[0])
            //handleChangeImage(event.target.files[0]);
        } else {
            setProfiledata({ ...profiledata, [name]: value })
        }

    }

    const handleChangeImage = async(file)=>{
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
        if (profiledata.firstname === '') {
            alert("hello user please add your firsname ")
            return;
        }

        else if (profiledata.dob === '') {
            alert("hello user please add dob")
            return
        }

        else if (profiledata.city === '') {

            alert("hello user please add city ")
            return
        }

        else if (profiledata.address === '') {

            alert("hello user please add address ")
            return
        }

        else if (profiledata.country === '') {

            alert("hello user please add country ")
            return
        }

        else if (profiledata.gender === '') {

            alert("hello user please add gender ")
            return
        }

        else if (profiledata.title === '') {

            alert("hello user please add title ")
            return
        }

        if (profiledata.profilepic === "") {
            if (profiledata.gender == "male") {
                img_url = "male url"
            }
            else if (profiledata.gender == "female") {
                img_url = "female url"
            }
            else {
                img_url = "no image"
            }
        }
        else {
            img_url = await handleChangeImage(profiledata.profilepic);
            console.log("image info here", img_url);
        }

        //////add the male and female image
        // if img not uploaded else upload the image



        // alert("adding POst")

        //debugger;

        const data = new FormData()
        data.append("UserId", parseInt(localStorage.getItem("userId")));
        data.append("Firstname", profiledata.firstname);
        data.append("Lastname", profiledata.lastname);
        data.append("Dob", profiledata.dob);
        data.append("City", profiledata.city);
        data.append("Address", profiledata.address);
        data.append("Country", profiledata.country);
        // data.append("profilepic",  profiledata.profilepic);
        const date = new Date();
        data.append("Createdon", date.toLocaleTimeString());
        data.append("Lastmodifiedon", date.toLocaleTimeString());
        data.append("Gender", profiledata.gender);
        data.append("Title", profiledata.title);
        data.append("IsDeleted", 0);
        data.append("ProfilePic", img_url);
        //var date = new Date().
        console.log(data)
        console.log(localStorage.getItem("userId"))
        axios.post("https://localhost:7294/api/User/UserProfile", data)
            .then(response => {

                console.log("response", response);
                navigate("/home")

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
                        <p> Please provide further details..</p>
                        <form>
                            <div class="mb-3">
                                <label htmlFor="firstnameInput" className="form-label">first name</label>
                                <input type="text" className="form-control" name="firstname" value={profiledata.firstname} onChange={handleChange} id="firstnameInput" aria-describedby="firstnameInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="lastnameInput" className="form-label">lastname</label>
                                <input type='text' className="form-control" name="lastname" value={profiledata.lastname} onChange={handleChange} id="lastnameInput" aria-describedby="lastnameInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="dobInput" className="form-label">Date of Birth</label>
                                <input type='date' className="form-control" name="dob" value={profiledata.dob} onChange={handleChange} id="dobInput" aria-describedby="dobInput" />
                            </div>

                            <div class="mb-3">
                                <label htmlFor="cityInput" className="form-label">City</label>
                                <input type="text" className="form-control" name="city" value={profiledata.city} onChange={handleChange} id="cityInput" aria-describedby="cityInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="addressInput" className="form-label">address</label>
                                <input type="text" className="form-control" name="address" value={profiledata.address} onChange={handleChange} id="addressInput" aria-describedby="addressInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="countryInput" className="form-label">country</label>
                                <input type="text" className="form-control" name="country" value={profiledata.country} onChange={handleChange} id="countryInput" aria-describedby="countryInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="profilepicInput" className="form-label">Add your picture here</label>
                                <input type="file" className="form-control" name="profilepic" onChange={handleChange} id="profilepicInput" aria-describedby="profilepicInput" />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="genderInput" className="form-label">gender</label>
                                <select type="text" className="form-control" name="gender" value={profiledata.gender} onChange={handleChange} id="genderInput" aria-describedby="genderInput" >
                                    <option value={""}></option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                    <option value={"other"}>other</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label htmlFor="TitleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" onChange={handleChange} id="titleInput" aria-describedby="titleInput" />
                            </div>

                            <div>
                                <button className='btn primary-button' onClick={handlePostSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileForm