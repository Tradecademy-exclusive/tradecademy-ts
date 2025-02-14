'use client'

import { usePathname } from 'next/navigation'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Header = () => {
  const { user } = useUser()
  const pathname = usePathname()

  if (
    pathname.includes('/dashboard/courses/') &&
    pathname !== '/dashboard/courses' &&
    pathname !== '/dashboard/courses/'
  ) {
    return
  }

  console.log(pathname)

  return (
    <div className='w-[calc(100%-300px)] max-lg:w-[calc(100%-55px)] flex items-center h-[75px] justify-between px-6 py-4 ml-auto'>
      <div>
        {pathname === '/dashboard/plan/previous' && (
          <Link
            href='/dashboard/plan'
            className='flex items-center gap-2.5 font-semibold text-lg'
          >
            <FaArrowLeftLong />
            All My previous plans
          </Link>
        )}
      </div>
      <SignedIn>
        <div className='flex items-center gap-3'>
          {
            <span className='text-[#333333] font-medium text-[15px] max-md:hidden'>
              Welcome, {user?.username || user?.firstName}
            </span>
          }
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}

export default Header
