import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { title, content, userId, video, image, strategy, analysisId } =
      await req.json()

    const analysis = await prisma.followupAnalysis.create({
      data: {
        title,
        content,
        mentor: {
          connect: {
            id: userId,
          },
        },
        strategy,
        video: video || null,
        image: image || null,
        analysis: {
          connect: {
            id: analysisId,
          },
        },
      },
    })

    await redis.del(['client_analysis', 'analysis'])

    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
    const { title, content, userId, video, image, strategy, id } =
      await req.json()

    const analysis = await prisma.followupAnalysis.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        mentor: {
          connect: {
            id: userId,
          },
        },
        strategy,
        video: video || null,
        image: image || null,
      },
    })

    await redis.del(['client_analysis', 'analysis'])

    return NextResponse.json({ analysis }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
