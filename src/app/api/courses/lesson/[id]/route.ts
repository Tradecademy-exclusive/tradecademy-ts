import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async (_: Request, params: { id: string }) => {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json(
        { message: 'Please provide an id' },
        { status: 400 }
      )
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json({ lesson }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
