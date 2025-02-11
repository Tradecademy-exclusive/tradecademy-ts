'use client'

import SignUpPage from '@/components/auth/sign-up'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SignUp = () => {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true')
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    const saveUserToDB = async () => {
      await axios.post('/api/auth/save-user')
    }
    if (isSignedIn) {
      saveUserToDB().then(() => router.replace('/dashboard'))
    }
  }, [isSignedIn, router])

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <SignUpPage />
    </div>
  )
}

export default SignUp
