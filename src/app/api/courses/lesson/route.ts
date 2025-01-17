import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Please provide lesson id' },
        { status: 400 }
      )
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ lesson }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
