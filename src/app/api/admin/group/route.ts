import prisma from '@/db/prisma'
import { UserType } from '@/types'
import { NextResponse } from 'next/server'
import protectAdmin from '../protect'
import { redis } from '@/lib/redis'

export const POST = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }

    const { students, name, color, dateFrom, dateUntil } = await req.json()

    const group = await prisma.group.create({
      data: {
        students: {
          connect: students.map((student: UserType) => ({
            id: student.id,
          })),
        },
        name,
        color: color,
        dateFrom: new Date(dateFrom),
        dateUntil: new Date(dateUntil),
      },
      include: {
        students: {
          include: {
            courses: true,
            completed: true,
          },
        },
      },
    })

    await redis.del(['groups', `group-${group.id}`])

    return NextResponse.json({ group }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const { color, name, students, id } = await req.json()

    const updatedGroup = await prisma.group.update({
      where: {
        id,
      },
      data: {
        color: color,
        name: name,
        students: {
          set: students.map((student: UserType) => ({
            id: student.id,
          })),
        },
      },
    })

    await redis.del(['groups', `group-${id}`])

    return NextResponse.json({ group: updatedGroup }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const GET = async () => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        students: {
          include: {
            courses: true,
            completed: true,
          },
        },
      },
    })

    return NextResponse.json({ groups }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
