// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'

import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'

const Feed = () => {
  return (
    <div className="feed">
        <Link to='/video/0/1' className='card'>
            <img src={thumbnail1} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>GreatStack</h3>
            <p>15k views &bull; 2 days ago</p>
        </Link>
        <Link to='/video/0/2' className='card'>
            <img src={thumbnail2} alt="" />
            <h2>Learn web development in 2024 with this complete beginner guide</h2>
            <h3>GreatStack</h3>
            <p>125k views &bull; 3 days ago</p>
        </Link>
        <Link to='/video/0/3' className='card'>
            <img src={thumbnail3} alt="" />
            <h2>Build a YouTube clone with React JS step by step</h2>
            <h3>GreatStack</h3>
            <p>89k views &bull; 1 week ago</p>
        </Link>
        <Link to='/video/0/4' className='card'>
            <img src={thumbnail4} alt="" />
            <h2>JavaScript interview questions every developer should know</h2>
            <h3>GreatStack</h3>
            <p>210k views &bull; 2 weeks ago</p>
        </Link>
        <Link to='/video/0/5' className='card'>
            <img src={thumbnail5} alt="" />
            <h2>How to create a responsive website using HTML and CSS</h2>
            <h3>GreatStack</h3>
            <p>54k views &bull; 4 days ago</p>
        </Link>
        <Link to='/video/0/6' className='card'>
            <img src={thumbnail6} alt="" />
            <h2>React JS project tutorial for beginners</h2>
            <h3>GreatStack</h3>
            <p>76k views &bull; 5 days ago</p>
        </Link>
        <Link to='/video/0/7' className='card'>
            <img src={thumbnail7} alt="" />
            <h2>CSS Grid vs Flexbox: which layout should you use?</h2>
            <h3>GreatStack</h3>
            <p>32k views &bull; 6 days ago</p>
        </Link>
        <Link to='/video/0/8' className='card'>
            <img src={thumbnail8} alt="" />
            <h2>Full stack developer roadmap to get your first job</h2>
            <h3>GreatStack</h3>
            <p>198k views &bull; 3 weeks ago</p>
        </Link>
    </div>
  )
}

export default Feed
