import { getCourses } from '@/actions/courses'
import Wrapper from './Wrapper'

const HomeAdmin = async () => {
  const courses = await getCourses()
  return <Wrapper courses={courses} />
}

export default HomeAdmin
