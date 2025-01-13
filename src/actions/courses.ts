import prisma from '@/db/prisma'

export const getCourses = async () => {
  const courses = await prisma.course.findMany()
  return courses
}
