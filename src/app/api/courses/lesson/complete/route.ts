import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'

export const POST = async (req: Request) => {
  try {
    const { lessonId } = await req.json()
    if (!lessonId) {
      return NextResponse.json(
        { message: 'Please provide a lesson id' },
        { status: 400 }
      )
    }

    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { message: 'Anauthorized request' },
        { status: 401 }
      )
    }

    const completed = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        completed: {
          connect: {
            email: user.primaryEmailAddress?.emailAddress,
          },
        },
      },
      include: {
        completed: true,
      },
    })

    await redis.del('courses')

    return NextResponse.json({ completed }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
