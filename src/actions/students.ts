import prisma from '@/db/prisma'
import { UserType } from '@/types'

export const getStudents = async () => {
  const students = await prisma.user.findMany({
    include: {
      courses: true,
    },
    cacheStrategy: {
      ttl: 120,
    },
  })
  return students as UserType[]
}
