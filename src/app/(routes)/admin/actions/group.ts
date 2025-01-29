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
  })

  return groups as GroupType[]
}
