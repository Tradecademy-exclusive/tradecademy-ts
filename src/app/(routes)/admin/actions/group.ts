import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { GroupType } from '@/types'

export const getGroups = async () => {
  const cachedValue = await redis.get('groups')

  if (cachedValue) {
    return JSON.parse(cachedValue) as GroupType[]
  }

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

  await redis.set('groups', JSON.stringify(groups), 'EX', 3600 * 24)

  return groups as GroupType[]
}

export const getGroupById = async (id: string) => {
  const cachedValue = await redis.get(`group-${id}`)

  if (cachedValue) {
    return JSON.parse(cachedValue) as GroupType
  }

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

  if (group) {
    await redis.set(`group-${group.id}`, JSON.stringify(group))
  }

  return group as GroupType
}
