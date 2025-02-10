/* eslint-disable react/no-unescaped-entities */
import { getCourses } from '@/actions/courses'
import BasicCard from '@/components/courses/basicCard'
import PremiumCard from '@/components/courses/premiumCard'
import { CourseType } from '@/types'

const CoursesPage = async () => {
  const courses = await getCourses()

  const basicCourses = courses.sort((a, b) => a.price - b.price).slice(0, 2)
  const premiumCourses = courses
    .sort((a, b) => b.price - a.price)
    .slice(0, 2)
    .sort((a, b) => a.price - b.price)

  return (
    <div className='px-12 max-lg:px-10 max-md:px-6 max-sm:px-3 py-3 w-full flex flex-col gap-3.5'>
      <h1 className='text-xl font-bold'>All Of Your Exclusive Course's</h1>
      <div className='w-full flex flex-col items-start gap-4'>
        <div className='flex items-center gap-4 w-full max-lg:flex-col'>
          {basicCourses.map((course: CourseType) => {
            return <BasicCard key={course.id} {...course} />
          })}
        </div>
        <div className='flex flex-col items-start gap-4 w-full'>
          {premiumCourses.map((course: CourseType) => {
            return <PremiumCard key={course.id} {...course} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
