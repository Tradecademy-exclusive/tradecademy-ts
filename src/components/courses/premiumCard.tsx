/* eslint-disable react/no-unescaped-entities */
'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import Locked from './locked'

import Image from 'next/image'
import Link from 'next/link'

interface CourseCardProps {
  title: string
  description: string
  cover: string
  percentage: number
}

const PremiumCard = ({
  title,
  description,
  cover,
  percentage,
}: CourseCardProps) => {
  const { session } = useContext(AuthContext)

  const ownsCourse = session?.user.courses.find((course) => {
    return course.title === title
  })
  return (
    <div
      className={`w-full ${
        title === 'Ultimate Course'
          ? 'bg-gradient-to-r from-[#266CF7] to-[#7a97ec]'
          : 'bg-[#E3E3E3]'
      } rounded-[23px] pl-6 pr-12 xl:pr-16 py-10 xl:pl-8 xl:py-12 relative overflow-hidden h-[270px] xl:h-[340px] 2xl:h-[430px] flex items-center justify-center`}
    >
      {!ownsCourse && <Locked premium />}
      <div className='w-full h-full flex items-start gap-6'>
        <div className='flex flex-col w-1/2 items-start gap-3'>
          <div className='w-full relative h-[170px] xl:h-[220px] 2xl:h-[300px] rounded-[10px] overflow-hidden'>
            <Image
              src={cover}
              fill
              alt='course cover image'
              className='object-cover'
            />
          </div>
          <div className='w-full flex flex-col items-end gap-1'>
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
                  width: `${percentage}%`,
                }}
              />
            </div>
            <span
              className={`text-[12px] xl:text-sm ${
                title === 'Ultimate Course' ? 'text-white/85' : 'text-[#606060]'
              }`}
            >
              {percentage}% Complete
            </span>
          </div>
        </div>
        <div className='w-1/2 flex flex-col h-full items-start gap-3'>
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
              {description}
            </p>
          </div>
          <Link
            href={`/dashboard/courses/${ownsCourse?.id}`}
            className={`text-[13px] mt-auto w-full text-center ${
              title === 'Ultimate Course'
                ? 'bg-white text-lightblue'
                : 'bg-lightblue text-white'
            } py-2 rounded-[8px] xl:text-[15px] xl:py-3`}
          >
            Begin You're Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PremiumCard
