import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const getPreviousPlans = async () => {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const userInDb = await prisma.user.findUnique({
    where: {
      email: user.primaryEmailAddress?.emailAddress,
    },
  })

  if (!userInDb) {
    return null
  }

  const previousPlans = await prisma.previousPlan.findMany({
    where: {
      userId: userInDb.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return previousPlans
}
