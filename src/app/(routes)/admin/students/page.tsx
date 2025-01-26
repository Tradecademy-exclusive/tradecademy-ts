import { getStudents } from '@/actions/students'
import Students from './Wrapper'

const Page = async () => {
  const students = await getStudents()
  return <Students students={students} />
}

export default Page
