import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
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

    return NextResponse.json({ journal })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
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

    return NextResponse.json({ journal })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
