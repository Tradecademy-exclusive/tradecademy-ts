import { EnrollType } from '@/types'
import { getEnrollments } from '../actions/enrollments'
import Enrollments from './Wrapper'
import { getCourses } from '@/actions/courses'

const Page = async () => {
  const enrollments = await getEnrollments()
  const courses = await getCourses()

  return (
    <Enrollments
      enrollments={enrollments as unknown as EnrollType[]}
      courses={courses}
    />
  )
}

export default Page
