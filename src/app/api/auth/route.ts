import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    const userInDb = await prisma.user.findUnique({
      where: {
        email: user.primaryEmailAddress?.emailAddress,
      },
      include: {
        courses: {
          include: {
            chapters: {
              include: {
                lessons: true,
              },
            },
          },
        },
        plan: true,
        previousPlans: true,
        focusPoint: true,
        completed: true,
      },
    })

    if (!userInDb) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    return NextResponse.json(
      { session: { user: userInDb, token: true } },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}
