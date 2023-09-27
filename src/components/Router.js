import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Landingpage from './Landingpage'
import Profile from './Profile'
import CreatePost from './CreatePost'
import MyPosts from './MyPosts'
import EditPost from './EditPost'


const Router = () => {
  
  return (
    <BrowserRouter>
        <Routes>
            {/* create route to login after design welcome page */}
            {/* <Route exact path='/login' element={<Login />} /> */}
            <Route exact path='/' element={<Login />} />
            <Route exact path='/home' element={<Landingpage/>} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/myPost' element={<MyPosts />} />
            <Route exact path='/createPost' element={<CreatePost />} />
            <Route exact path='/editPost' element={<EditPost />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router