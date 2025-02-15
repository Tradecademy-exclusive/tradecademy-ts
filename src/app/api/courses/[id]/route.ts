import { Course } from '@prisma/client'
import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                completed: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ course }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const data: Course = await req.json()
    const updatedCourse = await prisma.course.update({
      where: {
        id,
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                completed: true,
              },
            },
          },
        },
      },
      data,
    })
    return NextResponse.json({ updatedCourse }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
