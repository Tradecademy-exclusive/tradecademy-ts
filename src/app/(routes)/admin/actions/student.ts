import prisma from '@/db/prisma'
import { UserType } from '@/types'

export const getStudentById = async (id: string) => {
  const student = await prisma.user.findUnique({
    where: {
      id,
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

  return student as UserType
}
