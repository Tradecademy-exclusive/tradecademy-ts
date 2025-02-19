import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params

    const cachedValue = await redis.get(`group-${id}`)

    if (cachedValue) {
      return JSON.parse(cachedValue)
    }

    const group = await prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        students: {
          include: {
            completed: true,
            courses: true,
          },
        },
      },
    })

    await redis.set(`group-${id}`, JSON.stringify(group))

    return NextResponse.json({ group }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
