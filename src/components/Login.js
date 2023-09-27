import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '', });
    const [isButtonVisible1, setIsButtonVisible1] = useState(true);
    const [isButtonVisible2, setIsButtonVisible2] = useState(true);
    const [isButtonVisible3, setIsButtonVisible3] = useState(false);
    const [landingPage, setLangingPage] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("user")) {
           navigate("/home");
        }
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const { username, password } = formData;
        console.log('Username:', username);
        console.log('Password:', password);
        console.log(formData);
        axios.post(`https://localhost:7294/api/User/ValidateUser?username=${formData.username}&password=${formData.password}`)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("user", response.data.userName);
                localStorage.setItem("userId", response.data.userId);
                navigate('/home');
            })
            .catch(error => {
                alert("Incorrect username or password \n Donot have an account please signup");
            });
    }

    const handleButtonClick = () => {
        formData.password = '';
        formData.username = '';
        setIsButtonVisible1(false);
        setIsButtonVisible2(false);
        setIsButtonVisible3(true);

    };

    const insertUser = () => {

        alert("inside submit form");
        axios.post(`https://localhost:7294/api/User/InsertUser?username=${formData.username}&password=${formData.password}`)
            .then(response => {
                let status = response.data;
                if (status === 201) {
                    alert("user created");
                }
                else {
                    alert(" username already exists");
                }
                console.log(response.statusCode);
                console.log(response);

            })
            .catch(error => {
                console.log("error", error)
                alert(" unable to create the user");
            });
    }



    return (
        <div>
            <Navbar />
            <div className='login-parent'>
                <div className="login-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleLogin} >
                        <input
                            className="form-input"
                            type="text" name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required />

                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange} required />
                        <div className="form-buttons">
                            {isButtonVisible1 && <button className="primary-button btn" type="submit">Sign In</button>}
                            {isButtonVisible2 && <button className="primary-button btn" type="button" onClick={handleButtonClick}>Sign Up</button>}
                            {isButtonVisible3 && <button className="primary-button btn" type="button" onClick={insertUser}>Submit</button>}
                        </div>
                    </form>
                    {/* <div className="signup-link">
                    <a href="#">Don't have an account? Sign up here</a>
                </div> */}
                </div>
            </div>
        </div>

    )

}

export default Login;