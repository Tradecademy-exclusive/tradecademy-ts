'use client'

import CourseHeader from '../components/CourseHeader'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import CoursesTable from '../components/CoursesTable'
import { useContext } from 'react'
import { AdminContext } from '../AdminProvider'

const CoursesWrapper = () => {
  const { courses } = useContext(AdminContext)
  return (
    <div className='relative bg-[#F0F0F0] min-h-screen overflow-y-auto'>
      <CourseHeader page='Courses' />
      <div className='w-full flex flex-col items-start gap-4 mt-[200px] max-lg:mt-[280px] px-10 max-lg:px-5 max-md:px-4 max-sm:px-2.5'>
        <div className='w-full flex flex-col items-start gap-3 border border-[#B9B0B0B2] rounded-[15px]'>
          <div className='w-full flex items-center justify-between px-10 py-5 border-b border-[#B9B0B0B2]'>
            <h3 className='text-xl font-bold'>Courses</h3>
            <Link
              href='/admin/courses/manage'
              className='text-white bg-lightblue flex items-center gap-2 px-3 py-2.5 rounded-[5px] text-sm font-medium'
            >
              <FiPlus className='text-xl' />
              Create New Course
            </Link>
          </div>
          <div className='p-5 w-full h-[65vh]'>
            {courses && courses.length !== 0 ? (
              <CoursesTable courses={courses!} />
            ) : (
              <div className='w-full text-center'>No results.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesWrapper
