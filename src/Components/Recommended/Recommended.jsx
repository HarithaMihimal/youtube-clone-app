// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Recommended.css'
import { Link } from 'react-router-dom'

import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'

const Recommended = () => {
  return (
    <div className='recommended'>
        <Link to='/video/0/1' className="side-video-list">
            <img src={thumbnail1} alt="" />
            <div className="vid-info">
                <h4>Best channel to learn coding that help you to be a web developer</h4>
                <p>GreatStack</p>
                <p>15k Views</p>
            </div>
        </Link>
        <Link to='/video/0/2' className="side-video-list">
            <img src={thumbnail2} alt="" />
            <div className="vid-info">
                <h4>Learn web development in 2024 with this complete beginner guide</h4>
                <p>GreatStack</p>
                <p>125k Views</p>
            </div>
        </Link>
        <Link to='/video/0/3' className="side-video-list">
            <img src={thumbnail3} alt="" />
            <div className="vid-info">
                <h4>Build a YouTube clone with React JS step by step</h4>
                <p>GreatStack</p>
                <p>89k Views</p>
            </div>
        </Link>
        <Link to='/video/0/4' className="side-video-list">
            <img src={thumbnail4} alt="" />
            <div className="vid-info">
                <h4>JavaScript interview questions every developer should know</h4>
                <p>GreatStack</p>
                <p>210k Views</p>
            </div>
        </Link>
        <Link to='/video/0/5' className="side-video-list">
            <img src={thumbnail5} alt="" />
            <div className="vid-info">
                <h4>How to create a responsive website using HTML and CSS</h4>
                <p>GreatStack</p>
                <p>54k Views</p>
            </div>
        </Link>
        <Link to='/video/0/6' className="side-video-list">
            <img src={thumbnail6} alt="" />
            <div className="vid-info">
                <h4>React JS project tutorial for beginners</h4>
                <p>GreatStack</p>
                <p>76k Views</p>
            </div>
        </Link>
        <Link to='/video/0/7' className="side-video-list">
            <img src={thumbnail7} alt="" />
            <div className="vid-info">
                <h4>CSS Grid vs Flexbox: which layout should you use?</h4>
                <p>GreatStack</p>
                <p>32k Views</p>
            </div>
        </Link>
        <Link to='/video/0/8' className="side-video-list">
            <img src={thumbnail8} alt="" />
            <div className="vid-info">
                <h4>Full stack developer roadmap to get your first job</h4>
                <p>GreatStack</p>
                <p>198k Views</p>
            </div>
        </Link>
    </div>
  )
}

export default Recommended
