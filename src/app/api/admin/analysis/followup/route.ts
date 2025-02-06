import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { title, content, publishedBy, video, image, analysisId } =
      await req.json()

    const analysis = await prisma.followupAnalysis.create({
      data: {
        title,
        content,
        publishedBy,
        video: video || null,
        image: image || null,
        analysis: {
          connect: {
            id: analysisId,
          },
        },
      },
    })

    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
    const { title, content, publishedBy, video, image, id } = await req.json()

    const analysis = await prisma.followupAnalysis.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        publishedBy,
        video: video || null,
        image: image || null,
      },
    })
    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
