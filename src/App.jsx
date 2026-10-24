import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import AuthRoute from './components/AuthRoute'

const Home = lazy(() => import('./Pages/Home/Home'))
const Video = lazy(() => import('./Pages/Video/Video'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))
const Auth = lazy(() => import('./Pages/Auth/Auth'))

const App = () => {
  const [sidebar , setSidebar] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('youtube-theme') || 'light')

  useEffect(() => {
    localStorage.setItem('youtube-theme', theme)
  }, [theme])

  return (
    <div className={`app-shell ${theme === 'dark' ? 'dark-theme' : ''}`}>
       <Navbar setSidebar={setSidebar} theme={theme} setTheme={setTheme} />
       <Suspense fallback={<p className="route-loading">Loading page...</p>}>
        <Routes>
          <Route path='/' element={<Home sidebar={sidebar} />} />
          <Route path='/video/:categoryId/:videoId' element={<Video />} />
          <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path='/login' element={<Auth key="login" mode="login" />} />
          <Route path='/signup' element={<Auth key="signup" mode="signup" />} />
        {/* <Route path='/playlist' element={<Playlist />} />
        <Route path='/channel' element={<Channel />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-phone' element={<VerifyPhone />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-phone' element={<VerifyPhone />} />
        <Route path='/verify-otp' element={<VerifyOtp />} /> */}
        </Routes>
       </Suspense>
    </div>
  )
}

export default App