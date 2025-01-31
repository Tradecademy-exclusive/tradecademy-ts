import { notFound } from 'next/navigation'
import { getStudentById } from '../../actions/student'
import StudentWrapper from './Wrapper'

const StudentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const student = await getStudentById(id)

  if (!student) {
    return notFound()
  }

  return <StudentWrapper student={student} />
}

export default StudentPage
