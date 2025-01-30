import prisma from '@/db/prisma'

export const getEnrollments = async (sales: boolean) => {
  if (sales) {
    const enrollments = await prisma.enroll.findMany({
      where: {
        status: 'Approved',
      },
      include: {
        user: true,
        course: true,
      },
    })
    return enrollments
  } else {
    const enrollments = await prisma.enroll.findMany({
      include: {
        user: true,
        course: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return enrollments
  }
}
