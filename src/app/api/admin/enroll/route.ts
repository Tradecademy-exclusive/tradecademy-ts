import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { email, courseId } = await req.json()
    let enroll

    await prisma.$transaction([
      (enroll = prisma.enroll.create({
        data: {
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
      })),
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

    return NextResponse.json({ enroll }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
