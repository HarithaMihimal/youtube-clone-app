import { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import notification_icon from '../../assets/notification.png'
import more_icon from '../../assets/more.png'
import profile_icon from '../../assets/haritha.png'
import { Link } from 'react-router-dom'
import UploadVideo from '../UploadVideo/UploadVideo'

const Navbar = ({setSidebar}) => {
  const [openMenu, setOpenMenu] = useState(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const closeMenus = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', closeMenus)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeMenus)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const toggleMenu = (menu) => {
    setOpenMenu((current) => current === menu ? null : menu)
  }

  const openUploadDialog = () => {
    setOpenMenu(null)
    setIsUploadOpen(true)
  }

  return (
    <>
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
        <div className='nav-right flex-div' ref={menuRef}>
            <div className="nav-action">
                <button className="icon-button upload-icon-button" type="button" aria-label="Create" aria-expanded={openMenu === 'upload'} onClick={() => toggleMenu('upload')}>
                    <img className='upload-icon' src={upload_icon} alt="" />
                </button>
                {openMenu === 'upload' && (
                    <div className="nav-popover upload-popover">
                        <button type="button" className="popover-item" onClick={openUploadDialog}>
                            <span className="popover-symbol">▶</span>
                            <span><strong>Upload video</strong><small>Share a new video with your audience</small></span>
                        </button>
                        <button type="button" className="popover-item" onClick={() => setOpenMenu(null)}>
                            <span className="popover-symbol">＋</span>
                            <span><strong>Go live</strong><small>Start a live stream</small></span>
                        </button>
                    </div>
                )}
            </div>
            <div className="nav-action">
                <button className="icon-button notification-icon-button" type="button" aria-label="Notifications" aria-expanded={openMenu === 'notifications'} onClick={() => toggleMenu('notifications')}>
                    <img className='notification-icon' src={notification_icon} alt="" />
                    <span className="notification-dot" />
                </button>
                {openMenu === 'notifications' && (
                    <div className="nav-popover notification-popover">
                        <div className="popover-heading"><strong>Notifications</strong><button type="button">Mark all as read</button></div>
                        <div className="notification-item"><span className="notification-avatar">H</span><p><strong>Welcome to your channel</strong><small>Set up your profile and start creating · 2h</small></p></div>
                        <div className="notification-item"><span className="notification-avatar">Y</span><p><strong>Your weekly summary is ready</strong><small>See how your videos are performing · 1d</small></p></div>
                    </div>
                )}
            </div>
            <div className="nav-action">
                <button className="icon-button more-icon-button" type="button" aria-label="More options" aria-expanded={openMenu === 'more'} onClick={() => toggleMenu('more')}>
                    <img className='more-icon' src={more_icon} alt="" />
                </button>
                {openMenu === 'more' && (
                    <div className="nav-popover more-popover">
                        <button type="button" className="menu-item" onClick={() => setOpenMenu(null)}>Appearance <span>›</span></button>
                        <button type="button" className="menu-item" onClick={() => setOpenMenu(null)}>Language <span>English</span></button>
                        <button type="button" className="menu-item" onClick={() => setOpenMenu(null)}>Settings <span>›</span></button>
                        <button type="button" className="menu-item" onClick={() => setOpenMenu(null)}>Send feedback <span>›</span></button>
                    </div>
                )}
            </div>
            <Link to='/profile' aria-label="Open your profile">
                <img className='user-icon' src={profile_icon} alt="user profile" />
            </Link>
        </div>
    </nav>
    <UploadVideo isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  )
}

export default Navbar