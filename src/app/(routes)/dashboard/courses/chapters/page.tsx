import { getCourseById } from '@/actions/courses'
import { notFound } from 'next/navigation'
import ChaptersWrapper from './Wrapper'

const CourseChapters = async ({
  searchParams,
}: {
  searchParams: { id: string }
}) => {
  const { id } = await searchParams
  if (!id) return notFound()

  const course = await getCourseById(id)

  if (!course) {
    return notFound()
  }

  return <ChaptersWrapper course={course} />
}

export default CourseChapters
