import prisma from '@/db/prisma'
import { GroupType } from '@/types'

export const getGroups = async () => {
  const groups = await prisma.group.findMany({
    include: {
      students: {
        include: {
          completed: true,
          courses: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return groups as GroupType[]
}

export const getGroupById = async (id: string) => {
  const group = await prisma.group.findUnique({
    where: {
      id,
    },
    include: {
      students: {
        include: {
          completed: true,
          courses: true,
        },
      },
    },
  })

  return group as GroupType
}
