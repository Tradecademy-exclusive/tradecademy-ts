import { getCourses } from '@/actions/courses'
import Wrapper from './Wrapper'
import { CourseType } from '@/types'

const Page = async () => {
  const courses = await getCourses()
  return <Wrapper courses={courses as unknown as CourseType[]} />
}

export default Page
