import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { email, courseId, status } = await req.json()

    await prisma.$transaction([
      prisma.enroll.create({
        data: {
          status: status || null,
          user: {
            connect: {
              email: email,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        include: {
          user: true,
          course: true,
        },
      }),
      prisma.user.update({
        where: {
          email,
        },

        data: {
          courses: {
            connect: {
              id: courseId,
            },
          },
        },
      }),
    ])

    return NextResponse.json(
      { message: 'Enroll has been created' },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
