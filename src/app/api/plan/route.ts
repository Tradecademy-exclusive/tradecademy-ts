import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

export const PUT = async (req: Request) => {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { message: 'Anauthorized request' },
        { status: 401 }
      )
    }
    const { steps, planId } = await req.json()

    const currentPlan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    })

    if (!currentPlan) {
      return NextResponse.json(
        { message: 'Invalid is provided' },
        { status: 400 }
      )
    }

    const previousPlan = await prisma.previousPlan.create({
      data: {
        steps: currentPlan?.steps,
        User: {
          connect: {
            email: user.primaryEmailAddress?.emailAddress,
          },
        },
      },
    })

    const updatedPlan = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        steps: steps,
      },
    })

    return NextResponse.json({ previousPlan, updatedPlan }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
