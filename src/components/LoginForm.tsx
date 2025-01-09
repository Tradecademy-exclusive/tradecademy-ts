'use client'
import Image from 'next/image'
import { useState } from 'react'
import { IoCheckmarkOutline } from 'react-icons/io5'

const LoginForm = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-5'>
        <Image
          src='/tradecademy-logo.png'
          className='object-contain z-[1]'
          width={300}
          height={100}
          alt='tradecademy logo'
        />
        <form className='flex flex-col items-center gap-2.5 z-[100] -translate-y-28 w-[270px]'>
          <h2 className='text-[22px] font-semibold'>Login</h2>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none px-4 py-2.5 rounded-lg bg-zinc-200 text-zinc-600 placeholder:text-zinc-600 w-full font-medium'
            placeholder='Email'
          />
          <div className='flex flex-col items-start gap-2 w-full'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='outline-none px-4 py-2.5 rounded-lg bg-zinc-200 text-zinc-600 placeholder:text-zinc-600 w-full font-medium'
              placeholder='Password'
            />
            <button
              onClick={() => setRemember((prev) => !prev)}
              type='button'
              className='flex items-center gap-2'
            >
              <div
                className={`w-[15px] h-[15px] border border-zinc-400 rounded-[3px] flex items-center justify-center transition-all duration-200 ease-linear ${
                  remember && '!border-[#1a4fb3]'
                }`}
              >
                {remember && (
                  <IoCheckmarkOutline className='text-[11px] text-[#1a4fb3]' />
                )}
              </div>
              <span className='text-[13px] font-semibold'>Remember Me</span>
            </button>
          </div>
          <button className='text-white bg-zinc-700 font-medium w-full py-3 rounded-lg'>
            Login
          </button>
          <span className='text-sm font-semibold'>Forgot Your Password?</span>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
