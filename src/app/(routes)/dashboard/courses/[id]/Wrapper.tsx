/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CourseType } from '@/types'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState, useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'

const Wrapper = ({ course }: { course: CourseType }) => {
  const router = useRouter()
  const { session } = useContext(AuthContext)
  const [hasAccess, setHasAccess] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (session && course) {
      const ownsCourse = session.user.courses.find(
        (obj) => course.id === obj.id
      )
      if (ownsCourse) {
        setHasAccess(true)
      } else {
        router.replace('/dashboard')
      }
    }
  }, [session, course])

  if (!hasAccess) return <div></div>
  return (
    <div className='w-full flex items-start'>
      <div className='w-full p-6'></div>
      <div className='min-w-[200px] max-w-[200px] bg-[#1D1D1D]'>s</div>
    </div>
  )
}

export default Wrapper
