import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '@/types'

export const PUT = async (req: Request) => {
  try {
    const { steps, planId } = await req.json()
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')

    if (!token || !token.value) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 }
      )
    }

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    if (!id) {
      return NextResponse.json(
        { message: 'Invalid token provided' },
        { status: 400 }
      )
    }

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
            id: id,
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
