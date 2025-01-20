import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/db/prisma'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '@/types'

export const POST = async (req: Request) => {
  try {
    const { lessonId, sessionId } = await req.json()
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized Request' },
        { status: 401 }
      )
    }

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    const note = await prisma.note.create({
      data: {
        lesson: {
          connect: {
            id: lessonId,
          },
        },
        user: {
          connect: {
            id: id,
          },
        },
        sessionId: sessionId,
      },
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const GET = async (req: Request) => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized Request' },
        { status: 401 }
      )
    }

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    const { searchParams } = new URL(req.url)
    const lessonId = await searchParams.get('lessonId')

    if (!lessonId) {
      return NextResponse.json(
        { message: 'Please provide a lesson id' },
        { status: 400 }
      )
    }

    const note = await prisma.note.findFirst({
      where: {
        userId: id,
        lesson: {
          some: {
            id: lessonId,
          },
        },
      },
    })

    return NextResponse.json({ note }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
