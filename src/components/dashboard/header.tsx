'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

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
      <UserButton />
    </div>
  )
}

export default Header
