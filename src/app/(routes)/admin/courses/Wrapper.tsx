import { CourseType } from '@/types'
import CourseHeader from '../components/CourseHeader'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import CoursesTable from '../components/CoursesTable'

const CoursesWrapper = ({ courses }: { courses: CourseType[] }) => {
  return (
    <div className='relative bg-[#F0F0F0] min-h-screen overflow-y-auto'>
      <CourseHeader page='Courses' />
      <div className='w-full flex flex-col items-start gap-4 translate-y-[200px] px-10'>
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
            <CoursesTable courses={courses} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesWrapper
