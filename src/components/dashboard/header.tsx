'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import Image from 'next/image'

const Header = () => {
  const { session } = useContext(AuthContext)
  return (
    <div className='w-full flex items-center h-[75px] justify-end px-6 py-4'>
      <div>
        {session && (
          <div className='flex items-center gap-4'>
            <div className='w-[42px] h-[42px] relative rounded-full overflow-hidden'>
              <Image
                src={session?.user.picture || '/default_image.png'}
                fill
                alt='user image'
                className='object-cover'
              />
            </div>
            <p className='text-[13px] font-medium max-w-[140px]'>
              Welcome back, {session?.user.username}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
