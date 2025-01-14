import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { courseId, email } = await req.json()

    if (!courseId) {
      return NextResponse.json(
        { message: 'Course id is required.' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { message: 'user email must be provided' },
        { status: 400 }
      )
    }

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

    return NextResponse.json(
      { message: `Access granted to the user ${email}` },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
