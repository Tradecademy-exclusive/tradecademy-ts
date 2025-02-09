'use client'

import { AuthContext } from '@/providers/AuthProvider'
import { ChapterType } from '@/types'
import Image from 'next/image'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

const CourseChapter = ({
  chapter,
  cover,
  courseId,
}: {
  chapter: ChapterType
  cover: string
  courseId: string
}) => {
  const router = useRouter()
  const { session } = useContext(AuthContext)
  const completed = chapter.lessons.filter((lesson) =>
    lesson.completed.some((user) => user.id === session?.user.id)
  )

  const completedPercentage = (
    (completed.length / chapter.lessons.length) *
    100
  ).toFixed(0)

  const goToLastLesson = (chapter: ChapterType) => {
    const firstNotCompleted = chapter.lessons.find(
      (lesson) => !lesson.completed.some((user) => user.id === session?.user.id)
    )

    if (!firstNotCompleted) return

    router.push(`/dashboard/courses/${courseId}?lesson=${firstNotCompleted.id}`)
  }

  return (
    <div className='w-full bg-[#E3E3E3] p-4 flex items-start gap-7 rounded-[20px]'>
      <div className='flex flex-col items-start gap-2.5 min-w-[30%] max-w-[30%] max-lg:min-w-[30%] max-lg:max-w-[30%]'>
        <div className='relative h-[195px] max-2xl:h-[140px] max-xl:h-[125px] max-lg:h-[120px] w-full rounded-[10px] overflow-hidden'>
          <Image
            src={cover}
            fill
            alt='chapter cover'
            className='object-cover'
          />
        </div>
        <div className='w-full flex flex-col items-end gap-0.5'>
          <div className='w-full h-[4px] bg-[#D9D9D9] flex items-center justify-start'>
            <div
              className='bg-lightblue h-full'
              style={{
                width: `${completedPercentage}%`,
              }}
            />
          </div>
          <span className='text-sm text-[#606060]'>
            {Number(completedPercentage) || 0}% Complete
          </span>
        </div>
      </div>
      <div className='w-full flex flex-col items-start gap-2.5 py-1'>
        <h2 className='text-xl font-semibold max-xl:text-lg'>
          Chapter {chapter.chapter}: {chapter.title}
        </h2>
        <p className='text-sm text-[#000]/60'>{chapter.summary}</p>
        <button
          onClick={() => {
            if (Number(completedPercentage) !== 100) {
              goToLastLesson(chapter)
            }
          }}
          className='text-white bg-lightblue px-7 py-2 rounded-[5px] text-[15px] mt-2.5 '
        >
          {Number(completedPercentage) === 100
            ? 'Completed'
            : 'Go to my last lesson'}
        </button>
      </div>
    </div>
  )
}

export default CourseChapter
