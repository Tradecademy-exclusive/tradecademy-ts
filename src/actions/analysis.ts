import prisma from '@/db/prisma'
import { AnalysisType } from '@/types'

export const getAnalysis = async () => {
  const analysis = await prisma.analysis.findMany({
    take: 100,
    include: {
      followupAnalysis: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return analysis as unknown as AnalysisType[]
}
