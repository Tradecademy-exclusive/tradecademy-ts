/* eslint-disable react/no-unescaped-entities */
import { getCourses } from '@/actions/courses'
import BasicCard from '@/components/courses/basicCard'
import PremiumCard from '@/components/courses/premiumCard'

const CoursesPage = async () => {
  const courses = await getCourses()
  return (
    <div className='px-12 max-lg:px-10 max-md:px-6 max-sm:px-3 py-3 w-full flex flex-col gap-3.5'>
      <h1 className='text-xl font-bold'>All Of Your Exclusive Course's</h1>
      <div className='w-full flex flex-col items-start gap-4'>
        <div className='flex items-center gap-4 w-full'>
          {courses.map((course) => {
            if (
              course.title === 'Starters Course' ||
              course.title === 'Intermidiate Course'
            ) {
              return <BasicCard key={course.id} {...course} />
            }
          })}
        </div>
        <div className='flex flex-col items-start gap-4 w-full'>
          {courses.map((course) => {
            if (
              course.title === 'Advanced Course' ||
              course.title === 'Ultimate Course'
            ) {
              return <PremiumCard key={course.id} {...course} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
