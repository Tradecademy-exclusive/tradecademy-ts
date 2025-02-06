import prisma from '@/db/prisma'
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
    })

    return NextResponse.json({ analysis }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}
