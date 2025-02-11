'use client'

import { usePathname } from 'next/navigation'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Header = () => {
  const pathname = usePathname()

  if (
    pathname.includes('/dashboard/courses/') &&
    pathname !== '/dashboard/courses' &&
    pathname !== '/dashboard/courses/'
  ) {
    return
  }

  return (
    <div className='w-full flex items-center h-[75px] justify-end px-6 py-4'>
      <div></div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Header
