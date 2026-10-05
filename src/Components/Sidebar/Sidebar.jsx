// eslint-disable-next-line no-unused-vars
import React from 'react'
import home_icon from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.png'
import haritha from '../../assets/haritha.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'
import './Sidebar.css'

const Sidebar = ({sidebar}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className="shortcut-links">
        <div className="side-link">
          <img src={home_icon} alt="" /><p>Home</p>
        </div>
        <div className="side-link">
          <img src={game_icon} alt="" /><p>Gaming</p>
        </div>
        <div className="side-link">
          <img src={automobiles} alt="" /><p>Automobiles</p>
        </div>
        <div className="side-link">
          <img src={sports} alt="" /><p>Sports</p>
        </div>
        <div className="side-link">
          <img src={entertainment} alt="" /><p>Entertainment</p>
        </div>
        <div className="side-link">
          <img src={tech} alt="" /><p>Technology</p>
        </div>
        <div className="side-link">
          <img src={music} alt="" /><p>Music</p>
        </div>
        <div className="side-link">
          <img src={blogs} alt="" /><p>Blogs</p>
        </div>
        <div className="side-link">
          <img src={news} alt="" /><p>News</p>
        </div>
        <hr />

      </div>
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        <div className="side-link">
          <img src={jack} alt="" /><p>PewDpie</p>
        </div>
        <div className="side-link">
          <img src={haritha} alt="" /><p>Haritha</p>
        </div>
        <div className="side-link">
          <img src={simon} alt="" /><p>Nasdaily</p>
        </div>
        <div className="side-link">
          <img src={tom} alt="" /><p>Tom</p>
        </div>
        <div className="side-link">
          <img src={megan} alt="" /><p>Megan</p>
        </div>
        <div className="side-link">
          <img src={cameron} alt="" /><p>CookBook</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
