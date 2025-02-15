import { EnrollType } from '@/types'
import { getEnrollments } from '../actions/enrollments'
import Enrollments from './Wrapper'

const EnrollmentsPage = async () => {
  const enrollments = await getEnrollments(false)
  return <Enrollments enrollments={enrollments as EnrollType[]} />
}

export default EnrollmentsPage
