import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

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

    const { focusId, description } = await req.json()

    const updatedFocusPoint = await prisma.focusPoint.update({
      where: {
        id: focusId,
      },
      data: {
        description,
      },
    })

    await redis.del(`profile-${email}`)

    return NextResponse.json({ updatedFocusPoint }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
