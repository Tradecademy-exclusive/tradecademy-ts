import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params

    const group = await prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        students: true,
      },
    })

    return NextResponse.json({ group }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
