import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'
import protectAdmin from '../protect'

export const POST = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const { title, content, userId, video, image, strategy } = await req.json()

    const analysis = await prisma.analysis.create({
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

export const PUT = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const { title, content, userId, strategy, video, image, id } =
      await req.json()

    const analysis = await prisma.analysis.update({
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
