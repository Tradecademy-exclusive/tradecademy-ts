import prisma from '@/db/prisma'
import { UserType } from '@/types'

export const getStudents = async () => {
  const students = await prisma.user.findMany({
    include: {
      courses: true,
    },
  })
  return students as UserType[]
}
