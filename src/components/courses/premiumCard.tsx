/* eslint-disable react/no-unescaped-entities */
'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import Locked from './locked'

import Image from 'next/image'
import Link from 'next/link'
import { ChapterType, LessonType } from '@/types'
import { trimText } from '@/lib/trimText'

interface CourseCardProps {
  title: string
  description: string
  cover: string
  chapters: ChapterType[]
}

const PremiumCard = ({
  title,
  description,
  cover,
  chapters,
}: CourseCardProps) => {
  const { session } = useContext(AuthContext)
  const [completed, setCompleted] = useState<LessonType[]>([])
  useEffect(() => {
    const completedInstance = chapters.reduce<LessonType[]>((acc, chapter) => {
      const completedLessons = chapter.lessons.filter((lesson) =>
        lesson.completed.some((user) => user.id === session?.user.id)
      )
      return [...acc, ...completedLessons]
    }, [])
    setCompleted(completedInstance)
  }, [chapters, session?.user.id])
  const lessonsCount = chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.length
  }, 0)
  const completionPercentage = (completed.length / lessonsCount) * 100

  const ownsCourse = session?.user.courses.find((course) => {
    return course.title === title
  })

  return (
    <div
      className={`w-full ${
        title === 'Ultimate Course'
          ? 'bg-gradient-to-r from-[#266CF7] to-[#7a97ec]'
          : 'bg-[#E3E3E3]'
      } rounded-[23px] pl-6 pr-12 xl:pr-16 py-10 xl:pl-8 xl:py-12 relative overflow-hidden h-[270px] xl:h-[340px] max-md:h-auto 2xl:h-[430px] flex items-center justify-center`}
    >
      {!ownsCourse && <Locked premium />}
      <div className='w-full h-full flex items-start gap-6 max-md:flex-col max-md:gap-2'>
        <div className='flex flex-col w-1/2 items-start gap-3 max-md:w-full'>
          <div className='w-full relative h-[170px] xl:h-[220px] 2xl:h-[300px] max-md:p-10 max-sm:p-5 rounded-[10px] overflow-hidden'>
            <Image
              src={cover}
              fill
              alt='course cover image'
              className='object-cover'
            />
          </div>
          <div className='w-full flex flex-col items-end gap-1 max-md:w-1/2 max-sm:w-full'>
            <div
              className={`w-full relative h-[4px] xl:h-[5px] ${
                title === 'Ultimate Course' ? 'bg-[#bbbbbb]' : 'bg-[#D9D9D9]'
              }`}
            >
              <div
                className={`absolute h-full top-0 left-0  ${
                  title === 'Ultimate Course' ? 'bg-white' : 'bg-lightblue'
                }`}
                style={{
                  width: `${completionPercentage}%`,
                }}
              />
            </div>
            <span
              className={`text-[12px] xl:text-sm ${
                title === 'Ultimate Course' ? 'text-white/85' : 'text-[#606060]'
              }`}
            >
              {completionPercentage || 0}% Complete
            </span>
          </div>
        </div>
        <div className='w-1/2 flex flex-col h-full items-start gap-3 max-md:w-full'>
          <div className='w-full flex flex-col items-start gap-1'>
            <h2
              className={`text-lg font-semibold xl:text-[22px] ${
                title === 'Ultimate Course' ? 'text-white' : 'text-black'
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-[12px] xl:text-sm ${
                title === 'Ultimate Course' ? 'text-white/70' : 'text-black/60'
              }`}
            >
              {trimText(description, 80)}
            </p>
          </div>
          <Link
            href={`/dashboard/courses/chapters/?id=${ownsCourse?.id}`}
            className={`text-[13px] mt-auto w-full text-center ${
              title === 'Ultimate Course'
                ? 'bg-white text-lightblue'
                : 'bg-lightblue text-white'
            } py-2 rounded-[8px] xl:text-[15px] xl:py-3 max-md:py-2.5`}
          >
            Begin You're Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PremiumCard
