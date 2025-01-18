import { getCourseById } from '@/actions/courses'
import { notFound } from 'next/navigation'

const WatchCourse = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  console.log(id)
  const course = await getCourseById(id)

  if (!course) {
    return notFound()
  }

  return <div>page</div>
}

export default WatchCourse
