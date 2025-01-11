'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { notFound } from 'next/navigation'

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center relative'>
        <div className='loader z-[50]'></div>
        <div className='fixed left-0 top-0 w-full h-full z-[10] blur-xl'></div>
      </div>
    )
  }

  if (!loading && !session) {
    return notFound()
  }

  return <>{children}</>
}

export default Protected
