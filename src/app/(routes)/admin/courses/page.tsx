import { getCourses } from '@/actions/courses'
import Wrapper from './Wrapper'

const Page = async () => {
  const courses = await getCourses()
  return <Wrapper courses={courses} />
}

export default Page
