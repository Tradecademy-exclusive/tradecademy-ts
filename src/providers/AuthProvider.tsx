'use client'
import { SessionType } from '@/types'
import axios from 'axios'
import { createContext, useState, useLayoutEffect } from 'react'

interface AuthContextType {
  session: null | SessionType
  setSession: React.Dispatch<React.SetStateAction<null | SessionType>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  setSession: () => null,
  loading: true || false,
  setLoading: () => true || false,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useLayoutEffect(() => {
    const getSession = async () => {
      const { data } = await axios.get('/api/auth')
      if (data.session) {
        setSession(data.session)
      }
      setLoading(false)
    }

    getSession()
  }, [])

  return (
    <AuthContext.Provider value={{ session, setSession, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
