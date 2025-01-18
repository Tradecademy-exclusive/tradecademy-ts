import prisma from '@/db/prisma'

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
            },
          },
        },
      },
    },
  })
  return courses
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
            },
          },
        },
      },
    },
  })

  return course
}
