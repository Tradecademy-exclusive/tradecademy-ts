import prisma from '@/db/prisma'
import { CourseType } from '@/types'
import { currentUser } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'

export const getCourses = async () => {
  const cachedValue = await redis.get('client_courses')

  if (cachedValue) {
    return JSON.parse(cachedValue) as CourseType[]
  }

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      publishedCourse: 'Published',
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

  await redis.set('client_courses', JSON.stringify(courses), 'EX', 7200)

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
