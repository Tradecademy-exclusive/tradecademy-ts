import { trimText } from '@/lib/trimText'
import { CourseType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ExclusiveCourses = ({ exclusive }: { exclusive: CourseType[] }) => {
  return (
    <div className='w-full p-6 flex flex-col items-start gap-4 rounded-[20px] shadow-evenLight'>
      <h3 className='text-xl font-bold'>Your exclusive course</h3>
      <div className='flex flex-col items-start gap-7'>
        {exclusive &&
          exclusive.length > 0 &&
          exclusive.map((course) => (
            <Link
              href={`/dashboard/courses/${course.id}`}
              key={course.id}
              className='w-full flex items-center gap-3.5'
            >
              <div className='relative min-w-[170px] max-w-[170px] h-[95px] rounded-[13px] overflow-hidden xl:min-w-[190px] xl:max-w-[190px] xl:h-[100px]'>
                <Image
                  src={course.cover}
                  alt='course cover image'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <h4 className='font-semibold'>{course.title}</h4>
                <p className='text-sm text-[#00000099]'>
                  {trimText(course.description, 50)}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <Link
        href='/dashboard/courses'
        className='bg-lightblue px-9 py-2.5 mt-2 text-white text-sm rounded-[8px]'
      >
        All my courses
      </Link>
    </div>
  )
}

export default ExclusiveCourses
