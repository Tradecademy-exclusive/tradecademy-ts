/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChapterType, CourseType, LessonType } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import CourseSelector from '@/components/courses/courseSelector'
import axios from 'axios'
import WatchLesson from '@/components/courses/watchLesson'
import Note from '@/components/courses/note'

const Wrapper = ({ course }: { course: CourseType }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { session } = useContext(AuthContext)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [lesson, setLesson] = useState<null | LessonType>(null)
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

  const goToNextLesson = () => {
    if (session && lesson) {
      const lessonId = searchParams.get('lesson')
      const currentChapter = course.chapters.find((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === lessonId)
      )
      if (currentChapter) {
        if (currentChapter.lessons.length <= lesson.order) {
          return
        } else {
          const nextLesson = currentChapter.lessons.find((obj) => {
            return lesson.order + 1 === obj.order
          })
          if (nextLesson) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set('lesson', nextLesson.id)
            window.history.pushState({}, '', newUrl)
          }
        }
      }
    }
  }

  const goToPrevLesson = () => {
    if (session && lesson) {
      const lessonId = searchParams.get('lesson')
      const currentChapter = course.chapters.find((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === lessonId)
      )
      if (currentChapter) {
        if (lesson.order <= 1) {
          return
        } else {
          const prevLesson = currentChapter.lessons.find((obj) => {
            return lesson.order - 1 === obj.order
          })
          if (prevLesson) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set('lesson', prevLesson.id)
            window.history.pushState({}, '', newUrl)
          }
        }
      }
    }
  }

  const checkNextDisabled = () => {
    if (!lesson) return
    const lessonId = searchParams.get('lesson')
    const currentChapter = course.chapters.find((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === lessonId)
    )
    if (!currentChapter) {
      return true
    }
    if (currentChapter.lessons.length <= lesson.order) {
      return true
    } else {
      return false
    }
  }

  const checkPrevDisabled = () => {
    if (!lesson) return
    const lessonId = searchParams.get('lesson')
    const currentChapter = course.chapters.find((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === lessonId)
    )
    if (!currentChapter) {
      return true
    }
    if (lesson.order <= 1) {
      return true
    } else {
      return false
    }
  }

  if (!hasAccess) return <div></div>
  return (
    <div className='w-full flex items-start min-h-screen'>
      <div className='w-full p-6'>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full flex flex-col items-start gap-5'>
            {lesson &&
              (lesson.source ? (
                <WatchLesson lesson={lesson} />
              ) : (
                <div className='w-full flex flex-col gap-5'>
                  <div dangerouslySetInnerHTML={{ __html: lesson.content! }} />
                  <div className='w-full flex items-center'></div>
                </div>
              ))}
            <div className='w-full flex items-center justify-center gap-4'>
              <button
                disabled={checkPrevDisabled()}
                onClick={goToPrevLesson}
                className='text-sm bg-charcoal disabled:opacity-50 px-8 py-[5px] rounded-[5px] text-white'
              >
                Back
              </button>
              <button
                disabled={checkNextDisabled()}
                onClick={goToNextLesson}
                className='text-sm bg-tcblue px-8 py-[5px] rounded-[5px] text-white disabled:opacity-50'
              >
                Next
              </button>
            </div>
            <div className='w-full mt-12'>
              {lesson?.id && <Note lessonId={lesson.id} />}
            </div>
          </div>
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
