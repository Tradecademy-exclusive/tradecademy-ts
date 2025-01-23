import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Please provide chapter id' },
        { status: 200 }
      )
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id,
      },
    })

    return NextResponse.json({ chapter }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
