// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Profile from './Pages/Profile/Profile'


const App = () => {
  const [sidebar , setSidebar] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('youtube-theme') || 'light')

  useEffect(() => {
    localStorage.setItem('youtube-theme', theme)
  }, [theme])

  return (
    <div className={`app-shell ${theme === 'dark' ? 'dark-theme' : ''}`}>
       <Navbar setSidebar={setSidebar} theme={theme} setTheme={setTheme} />
       <Routes>
        <Route path='/' element={<Home  sidebar ={sidebar}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/profile' element={<Profile />} />
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