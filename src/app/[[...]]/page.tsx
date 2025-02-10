'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useEffect } from 'react'

const LoginForm = () => {
  const { isSignedIn } = useUser()

  useEffect(() => {
    const saveUserToDB = async () => {
      await axios.post('/api/auth/save-user')
    }
    if (isSignedIn) {
      saveUserToDB()
    }
  }, [isSignedIn])

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <SignIn signUpUrl='/signup' />
    </div>
  )
}

export default LoginForm
