import protectAdmin from '@/app/api/admin/protect'
import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { UserType } from '@/types'

export const getStudents = async () => {
  const response = await protectAdmin()
  if (response) {
    return response
  }

  const cachedValue = await redis.get('students')

  if (cachedValue) {
    return JSON.parse(cachedValue) as UserType[]
  }

  const students = await prisma.user.findMany({
    include: {
      courses: true,
    },
  })

  await redis.set('students', JSON.stringify(students), 'EX', 60 * 15)

  return students as UserType[]
}
