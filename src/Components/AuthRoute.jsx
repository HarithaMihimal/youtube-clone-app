import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const AuthRoute = ({ children }) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}

export default AuthRoute
