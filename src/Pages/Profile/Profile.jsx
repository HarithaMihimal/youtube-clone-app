import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
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
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('Videos')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const profile = useMemo(() => ({
    displayName: user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Creator',
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || 'creator',
    bio: user?.user_metadata?.bio || 'Sharing ideas, experiments, and the journey behind the work.',
    avatarUrl: user?.user_metadata?.avatar_url || '',
  }), [user])
  const tabs = ['Videos', 'About']

  const openEditor = () => {
    setError('')
    setMessage('')
    setIsEditorOpen(true)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    const formData = new FormData(event.currentTarget)
    const displayName = formData.get('displayName').trim()
    const username = formData.get('username').trim().replace(/^@+/, '').toLowerCase()
    const bio = formData.get('bio').trim()
    const avatarUrl = formData.get('avatarUrl').trim()

    if (!displayName || !username) {
      setError('Display name and username are required.')
      return
    }
    if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
      setError('Username must be 3-30 characters and use letters, numbers, dots, underscores, or hyphens.')
      return
    }
    if (avatarUrl) {
      try {
        const url = new URL(avatarUrl)
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol')
      } catch {
        setError('Avatar URL must be a valid HTTP or HTTPS URL.')
        return
      }
    }

    setIsSaving(true)
    const { error: updateError } = await updateProfile({
      display_name: displayName,
      username,
      bio,
      avatar_url: avatarUrl,
    })
    setIsSaving(false)

    if (updateError) {
      setError(updateError.message || 'Unable to update your profile. Please try again.')
      return
    }

    setMessage('Your profile was updated.')
    setIsEditorOpen(false)
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-identity">
          <img className="profile-avatar" src={profile.avatarUrl || profileImage} alt={`${profile.displayName}'s profile`} />
          <div>
            <span className="profile-eyebrow">Creator profile</span>
            <h1>{profile.displayName}</h1>
            <p className="profile-handle">@{profile.username}</p>
            <p className="profile-bio">{profile.bio}</p>
          </div>
        </div>
        <button className="manage-profile" type="button" onClick={openEditor}>Manage profile</button>
      </section>
      {message && <p className="profile-message profile-success" role="status">{message}</p>}

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
          <p>{profile.bio}</p>
          <p className="profile-joined">Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
        </section>
      )}
      {isEditorOpen && (
        <div className="profile-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsEditorOpen(false)}>
          <section className="profile-editor" role="dialog" aria-modal="true" aria-labelledby="profile-editor-title">
            <div className="profile-editor-heading">
              <div>
                <span className="profile-eyebrow">Your account</span>
                <h2 id="profile-editor-title">Manage profile</h2>
              </div>
              <button className="profile-close" type="button" onClick={() => setIsEditorOpen(false)} aria-label="Close profile editor">×</button>
            </div>
            <form className="profile-form" onSubmit={handleSave}>
              <label>Display name<input name="displayName" defaultValue={profile.displayName} maxLength="60" required autoComplete="name" /></label>
              <label>Username<input name="username" defaultValue={profile.username} maxLength="30" required autoComplete="username" /></label>
              <label>Bio<textarea name="bio" defaultValue={profile.bio} maxLength="160" rows="4" /></label>
              <label>Avatar URL <span>Optional</span><input name="avatarUrl" type="url" defaultValue={profile.avatarUrl} placeholder="https://example.com/avatar.jpg" /></label>
              <p className="profile-form-hint">Your email address is {user.email} and can’t be changed here.</p>
              {error && <p className="profile-message profile-error" role="alert">{error}</p>}
              <div className="profile-form-actions">
                <button className="profile-cancel" type="button" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button className="profile-save" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default Profile
