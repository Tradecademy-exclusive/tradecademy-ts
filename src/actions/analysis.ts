import prisma from '@/db/prisma'

export const getAnalysis = async (take: number) => {
  const analysis = await prisma.analysis.findMany({
    take: take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      updatedAnalysis: {
        include: {
          analysis: true,
        },
      },
    },
  })

  return analysis
}
