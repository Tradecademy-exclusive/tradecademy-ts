import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export const GET = async () => {
  try {
    const cachedValue = await redis.get('client_analysis')

    if (cachedValue) {
      return NextResponse.json(
        { analysis: JSON.parse(cachedValue) },
        { status: 200 }
      )
    }

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

    await redis.set(
      'client_analysis',
      JSON.stringify(analysis),
      'EX',
      3600 * 24
    )

    return NextResponse.json({ analysis }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
