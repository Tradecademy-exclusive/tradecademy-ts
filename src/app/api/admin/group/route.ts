import prisma from '@/db/prisma'
import { UserType } from '@/types'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { students, name, color } = await req.json()

    const group = await prisma.group.create({
      data: {
        students: {
          connect: students.map((student: UserType) => ({
            id: student.id,
          })),
        },
        name,
        color: color,
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

    return NextResponse.json({ group }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
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

    return NextResponse.json({ updatedGroup }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const GET = async () => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ groups }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
