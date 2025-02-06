import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { title, content, publishedBy, video, image, strategy } =
      await req.json()

    const analysis = await prisma.analysis.create({
      data: {
        title,
        content,
        publishedBy,
        strategy: strategy,
        video: video || null,
        image: image || null,
      },
    })

    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
    const { title, content, publishedBy, video, image, strategy, id } =
      await req.json()

    const analysis = await prisma.analysis.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        publishedBy,
        strategy,
        video: video || null,
        image: image || null,
      },
    })
    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
