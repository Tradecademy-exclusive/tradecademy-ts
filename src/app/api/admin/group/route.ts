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
