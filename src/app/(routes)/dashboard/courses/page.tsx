/* eslint-disable react/no-unescaped-entities */
import { getCourses } from '@/actions/courses'
import BasicCard from '@/components/courses/basicCard'

const CoursesPage = async () => {
  const courses = await getCourses()
  return (
    <div className='px-12 max-lg:px-10 max-md:px-6 max-sm:px-3 py-3 w-full flex flex-col gap-3.5'>
      <h1 className='text-xl font-bold'>All Of Your Exclusive Course's</h1>
      <div className='flex items-center gap-4'>
        {courses.map((course) => {
          if (
            course.title === 'Starters Course' ||
            course.title === 'Intermidiate Course'
          ) {
            return <BasicCard key={course.id} {...course} percentage={57} />
          }
        })}
      </div>
    </div>
  )
}

export default CoursesPage
