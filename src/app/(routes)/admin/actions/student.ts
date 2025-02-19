import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { UserType } from '@/types'

export const getStudentById = async (email: string) => {
  const cachedValue = await redis.get(`profile-${email}`)

  if (cachedValue) {
    return JSON.parse(cachedValue) as UserType
  }

  const student = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      focusPoint: true,
      plan: true,
      previousPlans: true,
      courses: {
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
      completed: true,
    },
  })

  await redis.set(`profile-${email}`, JSON.stringify(student))

  return student as UserType
}
