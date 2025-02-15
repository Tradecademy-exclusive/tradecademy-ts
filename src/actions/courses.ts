import prisma from '@/db/prisma'
import { CourseType } from '@/types'
import { currentUser } from '@clerk/nextjs/server'

export const getCourses = async () => {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: 'asc',
    },

    include: {
      chapters: {
        include: {
          lessons: {
            include: {
              completed: true,
              chapter: true,
            },
          },
        },
      },
    },
  })
  return courses as CourseType[]
}

export const getCourseById = async (id: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      chapters: {
        include: {
          lessons: {
            include: {
              completed: true,
              chapter: true,
            },
          },
        },
      },
    },
  })

  return course as CourseType
}

export const getExclusive = async () => {
  const user = await currentUser()
  const courses = await prisma.course.findMany({
    orderBy: {
      price: 'desc',
    },
    where: {
      user: {
        some: {
          email:
            user?.primaryEmailAddress?.emailAddress ||
            user?.emailAddresses[0].emailAddress,
        },
      },
    },
    take: 2,
  })

  return courses as CourseType[]
}
