'use client'
import { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { session, loading } = useContext(AuthContext)

  useLayoutEffect(() => {
    if (!loading && !session) {
      return router.replace('/')
    }
  }, [loading, session, router])

  if (loading) {
    return (
      <div className='translate-x-[315px] w-[calc(100%-335px)] max-lg:w-[calc(100%-55px)] max-lg:translate-x-[55px] h-[85vh] flex items-center justify-center relative'>
        <div className='loader z-[50]'></div>
        <div className='fixed left-0 top-0 w-full h-full z-[10] blur-xl bg-transparent'></div>
      </div>
    )
  }

  return <>{children}</>
}

export default Protected
