import { getCourses } from '@/actions/courses'
import CoursesWrapper from './Wrapper'

const CoursesPage = async () => {
  const courses = await getCourses()
  return <CoursesWrapper courses={courses} />
}

export default CoursesPage
