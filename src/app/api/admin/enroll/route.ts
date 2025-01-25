import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { email, courseId } = await req.json()

    const enroll = await prisma.enroll.create({
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
    })

    return NextResponse.json({ enroll }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
