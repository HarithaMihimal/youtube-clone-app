import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/useAuth'
import './Auth.css'

const getFriendlyError = (error) => {
  if (error?.message?.toLowerCase().includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  return error?.message || 'Something went wrong. Please try again.'
}

const Auth = ({ mode }) => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isSignUp = mode === 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
    return <main className="auth-page"><p className="auth-loading">Checking your session...</p></main>
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    const result = isSignUp
      ? await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: displayName.trim() ? { display_name: displayName.trim() } : undefined,
        },
      })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password })

    setIsSubmitting(false)

    if (result.error) {
      setError(getFriendlyError(result.error))
      return
    }

    if (isSignUp && !result.data.session) {
      setMessage('Account created. Check your email to confirm your account before signing in.')
      setPassword('')
      return
    }

    navigate(location.state?.from?.pathname || '/', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand">YT</div>
        <span className="auth-eyebrow">{isSignUp ? 'Join the community' : 'Welcome back'}</span>
        <h1 id="auth-title">{isSignUp ? 'Create your account' : 'Sign in to your account'}</h1>
        <p className="auth-intro">
          {isSignUp ? 'Start watching, sharing, and building your channel.' : 'Continue to your personalized YouTube experience.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              Display name <span>Optional</span>
              <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="How should we call you?" autoComplete="name" maxLength="60" />
            </label>
          )}
          <label>
            Email address
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength="6" required />
          </label>

          {error && <p className="auth-message auth-error" role="alert">{error}</p>}
          {message && <p className="auth-message auth-success" role="status">{message}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignUp ? 'Already have an account?' : 'New to this app?'}{' '}
          <Link to={isSignUp ? '/login' : '/signup'}>{isSignUp ? 'Sign in' : 'Create an account'}</Link>
        </p>
      </section>
    </main>
  )
}

export default Auth
