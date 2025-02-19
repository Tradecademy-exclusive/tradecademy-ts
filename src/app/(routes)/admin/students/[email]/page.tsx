import { notFound } from 'next/navigation'
import { getStudentById } from '../../actions/student'
import StudentWrapper from './Wrapper'
import prisma from '@/db/prisma'
import { EnrollType } from '@/types'

const StudentPage = async ({ params }: { params: { email: string } }) => {
  await params
  const email = decodeURIComponent(params.email)

  const student = await getStudentById(email)

  if (!student) {
    return notFound()
  }
  const enrollments = (await prisma.enroll.findMany({
    where: {
      user: {
        id: student.id,
      },
      status: 'Approved',
    },
    include: {
      course: {
        include: {
          chapters: {
            include: {
              lessons: {
                include: {
                  completed: true,
                },
              },
            },
          },
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })) as EnrollType[]

  const uniqueEnrollments = Object.values(
    enrollments.reduce((acc, enroll) => {
      acc[enroll.course.id] = acc[enroll.course.id] || enroll
      return acc
    }, {} as Record<string, EnrollType>)
  )

  return <StudentWrapper student={student} enrollments={uniqueEnrollments} />
}

export default StudentPage
