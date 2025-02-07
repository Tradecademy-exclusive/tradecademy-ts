import prisma from '@/db/prisma'
import { AnalysisType } from '@/types'

export const getAnalysis = async () => {
  const analysis = await prisma.analysis.findMany({
    take: 100,
    include: {
      followupAnalysis: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return analysis as unknown as AnalysisType[]
}

export const getAnalysisById = async (id: string) => {
  const analysis = await prisma.analysis.findUnique({
    where: {
      id,
    },
    include: {
      followupAnalysis: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!analysis) {
    const analysis = await prisma.followupAnalysis.findUnique({
      where: {
        id,
      },
    })
    return analysis
  }

  return analysis as AnalysisType
}
