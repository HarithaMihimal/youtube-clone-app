// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'


const App = () => {
  const [sidebar , setSidebar] = useState(true);
  return (
    <div>
       <Navbar setSidebar={setSidebar} />
       <Routes>
        <Route path='/' element={<Home  sidebar ={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        {/* <Route path='/playlist' element={<Playlist />} />
        <Route path='/channel' element={<Channel />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-phone' element={<VerifyPhone />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-phone' element={<VerifyPhone />} />
        <Route path='/verify-otp' element={<VerifyOtp />} /> */}
       </Routes>
    </div>
  )
}

export default App