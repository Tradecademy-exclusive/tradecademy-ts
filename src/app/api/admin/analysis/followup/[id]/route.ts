import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const analysis = await prisma.followupAnalysis.findUnique({
      where: {
        id,
      },
      include: {
        mentor: true,
      },
    })

    await redis.del(['client_analysis', 'analysis'])

    return NextResponse.json({ analysis }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}
