import { getCourseById } from '@/actions/courses'
import Wrapper from './Wrapper'
import { CourseType } from '@/types'

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = await searchParams
  if (!id) {
    return <Wrapper courses={null} />
  }
  const course = await getCourseById(id)
  return <Wrapper courses={[course] as unknown as CourseType[]} />
}

export default Page
