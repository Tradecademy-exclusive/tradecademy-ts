import prisma from '@/db/prisma'

export const getJournals = async () => {
  const journals = await prisma.journal.findMany()
  return journals
}
