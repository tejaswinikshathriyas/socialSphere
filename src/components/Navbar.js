import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/')
    }
    return (
        <div className='navbar-cnt'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Social Sphere</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/home' >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/myPost' >MyPosts</Link>
                            </li>
                            {
                                localStorage.getItem("user") ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to='/createPost' >Add Post</Link>
                                        </li>
                                    </>
                                    :
                                    <></>}
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/profile' >Profile</Link>
                            </li>

                        </ul>
                        <form className="d-flex align-items-center">
                            {
                                localStorage.getItem("user") ?
                                    <>
                                        <p className="userName" style={{ margin: 10 }}> {localStorage.getItem("user")}</p>
                                        <li onClick={handleLogout} className="nav-item" type="submit">Logout</li>
                                    </>
                                    :
                                    <div className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/' >Login</Link>
                                    </div>

                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar