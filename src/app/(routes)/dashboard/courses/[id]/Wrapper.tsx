/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChapterType, CourseType, LessonType } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import CourseSelector from '@/components/courses/courseSelector'
import axios from 'axios'
import WatchLesson from '@/components/courses/watchLesson'

const Wrapper = ({ course }: { course: CourseType }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { session } = useContext(AuthContext)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [lesson, setLesson] = useState<null | LessonType>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

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
    const getLessonById = async (id: string) => {
      const { data } = await axios.get(`/api/courses/lesson?id=${id}`)
      if (data.lesson) {
        setLesson(data.lesson)
      } else {
        router.push('/dashboard')
      }
    }
    if (!session || !course || !searchParams) return
    const lesson = searchParams.get('lesson')
    if (!lesson) {
      const firstLesson = session?.user.courses
        .find((obj) => {
          return obj.id === course.id
        })
        ?.chapters.find((chapt) => chapt.chapter === 1)
        ?.lessons.find((less) => less.order === 1)

      if (firstLesson) {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set('lesson', firstLesson.id)
        window.history.pushState({}, '', newUrl)
        window.location.reload()
      } else {
        return router.replace('/dashboard')
      }
    } else {
      getLessonById(lesson)
    }
  }, [searchParams, session, course])

  if (!hasAccess) return <div></div>
  return (
    <div className='w-full flex items-start'>
      <div className='w-full p-6'>
        <div className='w-full flex flex-col items-center'>
          {lesson &&
            (lesson.source ? <WatchLesson lesson={lesson} /> : <div></div>)}
        </div>
      </div>
      <CourseSelector
        chapters={course.chapters as unknown as ChapterType[]}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  )
}

export default Wrapper
