import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export const GET = async () => {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    const cachedValue = await redis.get(
      `profile-${
        user?.primaryEmailAddress?.emailAddress ||
        user?.emailAddresses[0]?.emailAddress
      }`
    )
    if (cachedValue) {
      return NextResponse.json(
        { session: { user: JSON.parse(cachedValue) } },
        { status: 200 }
      )
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

    await redis.set(
      `profile-${
        user?.primaryEmailAddress?.emailAddress ||
        user?.emailAddresses[0].emailAddress
      }`,
      JSON.stringify(userInDb),
      'EX',
      7200
    )

    return NextResponse.json(
      { session: { user: userInDb, token: true } },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}
