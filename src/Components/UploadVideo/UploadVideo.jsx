import { useEffect, useRef, useState } from 'react'
import './UploadVideo.css'

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024

const UploadVideo = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState('Public')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const chooseFile = (selectedFile) => {
    if (!selectedFile) return
    if (!selectedFile.type.startsWith('video/')) {
      setError('Please choose a video file.')
      return
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Videos must be smaller than 2 GB.')
      return
    }
    setFile(selectedFile)
    setError('')
    setIsReady(false)
    if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) {
      setError('Choose a video before continuing.')
      return
    }
    if (!title.trim()) {
      setError('Add a title for your video.')
      return
    }
    setError('')
    setIsReady(true)
  }

  const resetAndClose = () => {
    setFile(null)
    setTitle('')
    setDescription('')
    setVisibility('Public')
    setError('')
    setIsReady(false)
    onClose()
  }

  const fileSize = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : ''

  return (
    <div className="upload-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && resetAndClose()}>
      <section className="upload-dialog" role="dialog" aria-modal="true" aria-labelledby="upload-dialog-title">
        <div className="upload-dialog-header">
          <div>
            <span className="upload-dialog-kicker">Creator studio</span>
            <h2 id="upload-dialog-title">Upload a video</h2>
            <p>Bring your next story to life.</p>
          </div>
          <button className="upload-close" type="button" aria-label="Close upload dialog" onClick={resetAndClose}>×</button>
        </div>

        {isReady ? (
          <div className="upload-success">
            <div className="success-mark">✓</div>
            <h3>Your video is ready to publish</h3>
            <p><strong>{title}</strong> has been prepared with your selected details.</p>
            <button className="upload-primary" type="button" onClick={resetAndClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <button
              className={`upload-dropzone ${isDragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''}`}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                chooseFile(event.dataTransfer.files[0])
              }}
            >
              <input ref={fileInputRef} type="file" accept="video/*" hidden onChange={(event) => chooseFile(event.target.files[0])} />
              <span className="drop-icon">{file ? '✓' : '↑'}</span>
              <strong>{file ? file.name : 'Drag and drop your video here'}</strong>
              <span>{file ? fileSize : 'or click to browse from your device'}</span>
            </button>

            <div className="upload-fields">
              <label>
                Title
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your video a clear title" maxLength="100" />
              </label>
              <label>
                Description <span>Optional</span>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Tell viewers what this video is about" rows="3" maxLength="500" />
              </label>
              <label>
                Visibility
                <select value={visibility} onChange={(event) => setVisibility(event.target.value)}>
                  <option>Public</option>
                  <option>Unlisted</option>
                  <option>Private</option>
                </select>
              </label>
            </div>

            {error && <p className="upload-error" role="alert">{error}</p>}
            <div className="upload-actions">
              <button className="upload-secondary" type="button" onClick={resetAndClose}>Cancel</button>
              <button className="upload-primary" type="submit">Continue</button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default UploadVideo
