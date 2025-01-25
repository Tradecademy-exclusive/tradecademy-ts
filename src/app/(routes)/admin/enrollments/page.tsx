import { EnrollType } from '@/types'
import { getEnrollments } from '../actions/enrollments'
import Enrollments from './Wrapper'

const Page = async () => {
  const enrollments = await getEnrollments()

  return <Enrollments enrollments={enrollments as unknown as EnrollType[]} />
}

export default Page
