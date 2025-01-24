import Link from 'next/link'
import { CourseType } from '@/types'
import CourseHeader from './components/CourseHeader'
import { FiPlus } from 'react-icons/fi'
import CoursesTable from './components/CoursesTable'
import RevenueChart from './components/RevenueChart'

const Wrapper = ({ courses }: { courses: CourseType[] }) => {
  return (
    <>
      <CourseHeader page='Dashboard' />
      <div className='w-full flex flex-col items-start gap-4 mt-[200px] px-10 pb-5'>
        <div className='w-full flex flex-col items-start gap-3 border border-[#B9B0B0B2] rounded-[15px]'>
          <div className='w-full flex items-center justify-between px-10 py-5 border-b border-[#B9B0B0B2]'>
            <h3 className='text-xl font-bold'>Courses</h3>
            <Link
              href='/admin/courses'
              className='text-white bg-lightblue flex items-center gap-2 px-3 py-2.5 rounded-[5px] text-[15px] font-medium text-sm'
            >
              <FiPlus className='text-xl' />
              Create New Course
            </Link>
          </div>
          <div className='p-5 w-full'>
            <CoursesTable courses={courses} />
          </div>
        </div>
        <div className='w-[80%] flex items-center gap-7'>
          <RevenueChart />
        </div>
      </div>
    </>
  )
}

export default Wrapper
