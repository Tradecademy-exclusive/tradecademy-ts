/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChapterType, CourseType } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import CourseSelector from '@/components/courses/courseSelector'

const Wrapper = ({ course }: { course: CourseType }) => {
  const searchParams = useSearchParams()
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

  useEffect(() => {
    const lesson = searchParams.get('lesson')
    console.log(lesson)
  }, [searchParams])

  if (!hasAccess) return <div></div>
  return (
    <div className='w-full flex items-start'>
      <div className='w-[calc(100%-250px)] p-6'></div>
      <CourseSelector chapters={course.chapters as unknown as ChapterType[]} />
    </div>
  )
}

export default Wrapper
