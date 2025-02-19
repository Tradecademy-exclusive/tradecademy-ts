import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { AnalysisType } from '@/types'

export const getAnalysis = async () => {
  const cachedValue = await redis.get('analysis')

  if (cachedValue) {
    return JSON.parse(cachedValue) as unknown as AnalysisType[]
  }

  const analysis = await prisma.analysis.findMany({
    take: 100,
    include: {
      mentor: true,
      followupAnalysis: {
        include: {
          mentor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  await redis.set('analysis', JSON.stringify(analysis), 'EX', 3600 * 24)

  return analysis as unknown as AnalysisType[]
}

export const getAnalysisById = async (id: string) => {
  const analysis = await prisma.analysis.findUnique({
    where: {
      id,
    },
    include: {
      mentor: true,
      followupAnalysis: {
        include: {
          mentor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  return analysis as AnalysisType
}
