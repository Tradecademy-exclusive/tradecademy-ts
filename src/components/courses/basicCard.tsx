/* eslint-disable react/no-unescaped-entities */
'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import Locked from './locked'
import Image from 'next/image'
import { trimText } from '@/lib/trimText'
import Link from 'next/link'

interface CourseCardProps {
  id: string
  title: string
  description: string
  cover: string
  percentage: number
}

const BasicCard = ({
  id,
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
      className={`w-full bg-[#E3E3E3] rounded-[23px] px-6 py-10 xl:px-8 xl:py-12 flex flex-col items-start gap-3 relative overflow-hidden`}
    >
      {!ownsCourse && <Locked />}
      <div className='w-full flex items-start gap-4'>
        <div className='flex flex-col w-1/2 items-start gap-3'>
          <div className='w-full relative h-[80px] xl:h-[120px] 2xl:h-[170px] rounded-[10px] overflow-hidden'>
            <Image
              src={cover}
              fill
              alt='course cover image'
              className='object-cover'
            />
          </div>
          <div className='w-full flex flex-col items-end gap-1'>
            <div className='w-full relative h-[4px] xl:h-[5px] bg-[#D9D9D9]'>
              <div
                className='absolute h-full top-0 left-0 bg-lightblue'
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
            <span className='text-[12px] text-[#606060] xl:text-sm'>
              {percentage}% Complete
            </span>
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-start'>
          <h2 className='text-[15px] lg:text-base xl:text-lg font-semibold xl:text-[22px] whitespace-nowrap'>
            {title}
          </h2>
          <p className='text-[11px] text-black/60 xl:text-[13px] py-3'>
            {trimText(description, 80)}
          </p>
        </div>
      </div>
      <Link
        href={`/dashboard/courses/${id}`}
        className='text-[13px] text-center w-full bg-lightblue py-2 rounded-[8px] text-white xl:text-[15px] xl:py-3'
      >
        Begin You're Course
      </Link>
    </div>
  )
}

export default BasicCard
