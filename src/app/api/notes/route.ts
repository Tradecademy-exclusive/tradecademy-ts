import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'

export const POST = async (req: Request) => {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { message: 'Anauthorized request' },
        { status: 401 }
      )
    }
    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses[0].emailAddress

    const { lessonId, sessionId } = await req.json()

    const note = await prisma.note.create({
      data: {
        lesson: {
          connect: {
            id: lessonId,
          },
        },
        user: {
          connect: {
            email,
          },
        },
        sessionId: sessionId,
      },
    })

    await redis.del(`profile-${email}`)
    await redis.del('client_courses')

    return NextResponse.json({ note }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const GET = async (req: Request) => {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized Request' },
        { status: 401 }
      )
    }

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
        user: {
          email: user.primaryEmailAddress?.emailAddress,
        },
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
