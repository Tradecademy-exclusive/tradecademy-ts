import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const analysis = await prisma.analysis.findMany({
      take: 30,
      orderBy: {
        createdAt: 'desc',
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

    return NextResponse.json({ analysis })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
