'use client'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { session, loading } = useContext(AuthContext)

  useEffect(() => {
    if (!loading && !session) {
      return router.replace('/')
    }
  }, [loading, session, router])

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center relative'>
        <div className='loader z-[50]'></div>
        <div className='fixed left-0 top-0 w-full h-full z-[10] blur-xl'></div>
      </div>
    )
  }

  return <>{children}</>
}

export default Protected
