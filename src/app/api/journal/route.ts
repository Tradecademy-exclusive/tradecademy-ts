import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

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

    const { score, winnings, biggestLesson, tommorowPlan, date } =
      await req.json()

    const journal = await prisma.journal.create({
      data: {
        score,
        winnings,
        biggestLesson,
        tommorowPlan,
        date,
      },
    })

    await redis.del(`profile-${email}`)

    return NextResponse.json({ journal })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
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

    const { score, winnings, biggestLesson, tommorowPlan, date, id } =
      await req.json()

    const journal = await prisma.journal.update({
      where: {
        id,
      },
      data: {
        score,
        winnings,
        biggestLesson,
        tommorowPlan,
        date,
      },
    })

    await redis.del(`profile-${email}`)

    return NextResponse.json({ journal })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
