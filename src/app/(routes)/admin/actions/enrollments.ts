import prisma from '@/db/prisma'

export const getEnrollments = async () => {
  const enrollments = await prisma.enroll.findMany({
    include: {
      user: true,
      course: true,
    },
  })
  return enrollments
}
