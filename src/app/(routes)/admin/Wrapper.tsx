import Link from 'next/link'
import { CourseType, GroupType } from '@/types'
import CourseHeader from './components/CourseHeader'
import { FiPlus } from 'react-icons/fi'
import CoursesTable from './components/CoursesTable'
import RevenueChart from './components/RevenueChart'
import { getEnrollments } from './actions/enrollments'

const Wrapper = async ({
  courses,
  groups,
}: {
  courses: CourseType[]
  groups: GroupType[]
}) => {
  const enrollments = await getEnrollments(true)
  const totalLessons = courses.reduce((acc, course) => {
    return (
      acc +
      course.chapters.reduce((total, chapter) => {
        return total + chapter.lessons.length
      }, 0)
    )
  }, 0)

  return (
    <div className='relative bg-[#F0F0F0] min-h-screen overflow-y-auto'>
      {' '}
      <CourseHeader page='Dashboard' />
      <div className='w-full flex flex-col items-start gap-4 translate-y-[200px] px-10'>
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
        <div className='w-full flex items-start gap-12 mb-5'>
          <RevenueChart enrollments={enrollments} />
          <div className='w-[450px] flex flex-col items-center rounded-[10px] overflow-hidden h-[480px] border border-[#B9B0B0B2]'>
            <div className='flex items-center justify-between w-full py-6 px-6 border-b mb-3 border-[#B9B0B0B2] bg-[#F0F0F0]'>
              <div className='flex flex-col items-start'>
                <h3 className='font-semibold leading-[1.2]'>
                  Group statistics
                </h3>
                <span className='text-sm text-neutral-500'>
                  Grouped student statistics
                </span>
              </div>
              <Link
                href='/admin/students'
                className='px-5 py-1.5 rounded-[5px] text-[15px] font-medium border border-[#B9B0B0B2]'
              >
                View Groups
              </Link>
            </div>

            <div className='flex items-center w-full gap-5 flex-wrap p-3 justify-center'>
              {groups.map((group) => {
                const totalCompleted = group.students.reduce((acc, student) => {
                  return acc + student.completed.length
                }, 0)

                const percentage =
                  (totalCompleted / (totalLessons * group.students.length)) *
                  100

                return (
                  <div
                    key={group.id}
                    className='w-[180px] h-[165px] rounded-[10px] p-3 flex flex-col items-start gap-4 drop-shadow-md bg-white'
                  >
                    <h3 className='text-lg font-semibold'>{group.name}</h3>
                    <div className='h-[8px] rounded-full w-full overflow-hidden relative'>
                      <div
                        className='w-full absolute top-0 left-0 h-full opacity-10 z-[1]'
                        style={{
                          background: `${group.color}`,
                        }}
                      />
                      <div
                        className='absolute top-0 left-0 h-full z-[10] rounded-full'
                        style={{
                          width: `${percentage}%`,
                          background: `${group.color}`,
                        }}
                      />
                    </div>
                    <span
                      className='text-sm opacity-50'
                      style={{
                        color: group.color,
                      }}
                    >
                      {percentage.toFixed(0)}% Complete
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
