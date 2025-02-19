import prisma from '@/db/prisma'
import { enrollStatus, User } from '@prisma/client'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import protectAdmin from '../protect'

export const POST = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }

    const { students, courseId }: { students: User[]; courseId: string } =
      await req.json()

    const enrollments = await Promise.all(
      students.map((user) =>
        prisma.enroll.create({
          data: {
            user: {
              connect: { email: user.email },
            },
            course: {
              connect: { id: courseId },
            },
          },
        })
      )
    )

    await redis.del('enrollments')

    return NextResponse.json({ enrollments }, { status: 201 })
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

    const {
      status,
      id,
      email,
      courseId,
    }: {
      status: enrollStatus
      id: string
      email: string
      courseId: string
    } = await req.json()

    const updatedEnroll = await prisma.enroll.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    if (status === 'Approved') {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          courses: {
            connect: {
              id: courseId,
            },
          },
        },
      })

      await redis.del(`profile-${email}`)
    }

    await redis.del('enrollments')

    return NextResponse.json({ updatedEnroll }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const GET = async () => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }

    const cachedValue = await redis.get('enrollments')

    if (cachedValue) {
      return NextResponse.json(
        { enrollments: JSON.parse(cachedValue) },
        { status: 200 }
      )
    }

    const enrollments = await prisma.enroll.findMany({
      where: {
        status: 'Approved',
      },
      include: {
        user: true,
        course: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    await redis.set('enrollments', JSON.stringify(enrollments), 'EX', 7200)

    return NextResponse.json({ enrollments }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
