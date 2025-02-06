import prisma from '@/db/prisma'

export const getAnalysis = async () => {
  const analysis = await prisma.analysis.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return analysis
}
