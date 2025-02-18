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
import { FaRegCircleCheck } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import Image from 'next/image'

const Wrapper = ({ course }: { course: CourseType }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { session } = useContext(AuthContext)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [lesson, setLesson] = useState<null | LessonType>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [completed, setCompleted] = useState<LessonType[]>([])
  const [marking, setMarking] = useState<boolean>(false)

  const id = searchParams.get('lesson')
  const isCompleted = completed.some(
    (completedLesson) => completedLesson.id === id
  )

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

  useEffect(() => {
    const completedInstance = course.chapters.reduce<LessonType[]>(
      (acc, chapter) => {
        const completedLessons = chapter.lessons.filter((lesson) =>
          lesson.completed.some((user) => user.id === session?.user.id)
        )
        return [...acc, ...completedLessons]
      },
      []
    )

    setCompleted(completedInstance)
  }, [course])

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

  const markComplete = async () => {
    const lessonId = searchParams.get('lesson')
    if (!lessonId) return
    try {
      setMarking(true)
      const { data } = await axios.post('/api/courses/lesson/complete', {
        lessonId: lessonId,
        courseId: course.id,
      })
      if (data.completed) {
        setCompleted((prev) => {
          const isAlreadyCompleted = prev.some(
            (completedLesson) => completedLesson.id === lessonId
          )
          if (isAlreadyCompleted) return prev

          return [...prev, data.completed]
        })

        toast.error('Lesson has been marked', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setMarking(false)
    } catch (err) {
      setMarking(false)
      console.log(err)
      return toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  const lessonsCount = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.length
  }, 0)

  const completionPercentage = (completed.length / lessonsCount) * 100

  if (!hasAccess) return <div></div>
  return (
    <div className='w-full flex items-start'>
      <div className='fixed top-0 w-[110%] -left-[30px] z-10 bg-[#3E63DC] py-4 flex items-center justify-between pr-12 md:pr-20 pl-12 lg:pr-24 xl:pr-28 2xl:pr-32'>
        <h3 className='text-lg text-white'>{course.title}</h3>
        <div className='flex items-center gap-5'>
          <p className='text-white text-[15px]'>
            Your Progress: <strong>{completed.length}</strong> of{' '}
            <strong>{lessonsCount}</strong> ({' '}
            {Number(completionPercentage.toFixed(0)) || 0}% )
          </p>
          <button
            disabled={isCompleted || marking}
            onClick={markComplete}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-[5px] bg-transparent text-white hover:bg-white hover:text-[#3E63DC] transition-all duration-200 text-[15px] font-medium ${
              isCompleted && '!bg-white !text-green-600'
            }`}
          >
            <FaRegCircleCheck />
            {!isCompleted ? 'Mark as Complete' : 'Completed'}
          </button>
        </div>
      </div>
      <div className='w-full p-6 mt-[65px]'>
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
                className='text-base bg-charcoal disabled:opacity-50 px-12 py-2 rounded-[5px] text-white'
              >
                Back
              </button>
              <button
                disabled={checkNextDisabled()}
                onClick={goToNextLesson}
                className='text-base bg-tcblue px-12 py-2 rounded-[5px] text-white disabled:opacity-50'
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
      {lesson && (
        <CourseSelector
          chapters={course.chapters as unknown as ChapterType[]}
          open={modalOpen}
          setOpen={setModalOpen}
          lesson={lesson}
        />
      )}
    </div>
  )
}

export default Wrapper
