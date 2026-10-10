import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import profileImage from '../../assets/haritha.png'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'

const videos = [
  { image: thumbnail1, title: 'Building something meaningful with code', views: '1.2K views', date: '2 days ago' },
  { image: thumbnail2, title: 'A day in my creative workflow', views: '846 views', date: '1 week ago' },
  { image: thumbnail3, title: 'The tools I use every day', views: '2.4K views', date: '2 weeks ago' },
  { image: thumbnail4, title: 'Lessons from my latest project', views: '1.1K views', date: '1 month ago' },
]

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Videos')
  const tabs = ['Videos', 'About']

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-identity">
          <img className="profile-avatar" src={profileImage} alt="Haritha's profile" />
          <div>
            <span className="profile-eyebrow">Creator profile</span>
            <h1>Haritha Mihimal</h1>
            <p className="profile-handle">@harithamihimal</p>
            <p className="profile-bio">Sharing ideas, experiments, and the journey behind the work.</p>
          </div>
        </div>
        <button className="manage-profile" type="button">Manage profile</button>
      </section>

      <div className="profile-stats" aria-label="Profile statistics">
        <div><strong>128</strong><span>Subscribers</span></div>
        <div><strong>24</strong><span>Videos</span></div>
        <div><strong>18.6K</strong><span>Total views</span></div>
      </div>

      <nav className="profile-tabs" aria-label="Profile sections">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab ? 'profile-tab active' : 'profile-tab'}
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Videos' ? (
        <section className="profile-content">
          <div className="profile-section-heading">
            <div>
              <span className="profile-eyebrow">Latest uploads</span>
              <h2>Videos</h2>
            </div>
            <span className="video-count">Showing 4 of 24</span>
          </div>
          <div className="profile-video-grid">
            {videos.map((video) => (
              <Link className="profile-video-card" to="/" key={video.title}>
                <img src={video.image} alt="" />
                <h3>{video.title}</h3>
                <p>{video.views} <span>&bull;</span> {video.date}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="profile-about">
          <span className="profile-eyebrow">About this creator</span>
          <h2>Making the internet a little more useful.</h2>
          <p>Welcome to my channel. I share practical lessons, personal projects, and honest progress updates for curious people who love to learn.</p>
          <p className="profile-joined">Joined January 2024</p>
        </section>
      )}
    </main>
  )
}

export default Profile
