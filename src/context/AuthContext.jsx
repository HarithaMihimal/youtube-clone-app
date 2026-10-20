import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
      if (error) {
        console.error('Unable to restore the Supabase session:', error)
      }
      if (isMounted) {
        setSession(currentSession)
        setIsLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    isLoading,
    signOut: () => supabase.auth.signOut(),
  }), [session, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}