import { NextResponse } from 'next/server'
import { validateCourseSchema } from '../../_validators/courses'
import prisma from '@/db/prisma'

export const POST = async (req: Request) => {
  try {
    const { title, description, cover } = await req.json()

    const { error } = validateCourseSchema({
      title,
      description,
      cover,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        cover,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
