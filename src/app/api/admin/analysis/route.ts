import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { title, content, publishedBy } = await req.json()

    const analysis = await prisma.analysis.create({
      data: {
        title,
        content,
        publishedBy,
      },
    })

    return NextResponse.json({ analysis }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
