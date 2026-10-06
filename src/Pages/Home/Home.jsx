// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  const categories = [
    { id: 0, label: 'All' },
    { id: 10, label: 'Music' },
    { id: 20, label: 'Gaming' },
    { id: 24, label: 'Entertainment' },
    { id: 17, label: 'Sports' },
    { id: 28, label: 'Technology' },
    { id: 25, label: 'News' },
  ];

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <div className="home-heading">
          <div>
            <span className="eyebrow">Your daily watchlist</span>
            <h1>Explore videos</h1>
          </div>
          <p>Fresh picks from creators you follow</p>
        </div>
        <div className="category-chips" aria-label="Video categories">
          {categories.map((item) => (
            <button
              className={category === item.id ? 'chip active' : 'chip'}
              key={item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Feed category={category} />

      </div>
    </>
  )
}

export default Home