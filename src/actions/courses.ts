import prisma from '@/db/prisma'
import { CourseType } from '@/types'

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
  const courses = await prisma.course.findMany({
    orderBy: {
      price: 'desc',
    },
    take: 2,
  })

  return courses as CourseType[]
}
