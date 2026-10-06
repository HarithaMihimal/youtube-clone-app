// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import notification_icon from '../../assets/notification.png'
import more_icon from '../../assets/more.png'
import profile_icon from '../../assets/haritha.png'
import { Link } from 'react-router-dom'
// import profile_icon from '../../assets/jack.png'

const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon'
                src={menu_icon} alt="menu-icon" 
                onClick={()=>setSidebar(
                    prev => prev===false?true:false
                )
            }/>
           <Link to='/'> <img className='logo' src={logo} alt="logo" /> </Link>
        </div>
        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
                <input type="text" placeholder='Search' />
                <img className='search-icon' src={search_icon} alt="search-icon" />
            </div>
        </div>
        <div className='nav-right flex-div'>
            <img className='upload-icon' src={upload_icon} alt="upload-icon" />
            <img className='notification-icon' src={notification_icon} alt="notification-icon" />
            <img className='more-icon' src={more_icon} alt="more-icon" />
            <img className='user-icon' src={profile_icon} alt="user-icon" />
        </div>
    </nav>
  )
}

export default Navbar