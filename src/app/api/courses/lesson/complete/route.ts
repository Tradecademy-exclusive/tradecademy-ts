import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '@/types'

export const POST = async (req: Request) => {
  try {
    const { lessonId } = await req.json()
    if (!lessonId) {
      return NextResponse.json(
        { message: 'Please provide a lesson id' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const token = await cookieStore.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 }
      )
    }

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    if (!id) {
      return NextResponse.json(
        { message: 'Invalid token provided' },
        { status: 400 }
      )
    }

    const completed = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        completed: {
          connect: {
            id: id,
          },
        },
      },
      include: {
        completed: true,
      },
    })

    return NextResponse.json({ completed }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
