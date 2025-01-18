import { getCourseById } from '@/actions/courses'
import { notFound } from 'next/navigation'
import Wrapper from './Wrapper'
import { CourseType } from '@/types'

const WatchCourse = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const course = await getCourseById(id)

  if (!course) {
    return notFound()
  }

  return <Wrapper course={course as unknown as CourseType} />
}

export default WatchCourse
