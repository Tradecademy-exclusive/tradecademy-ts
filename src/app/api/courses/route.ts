import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { validateCourseSchema } from '../_validators/courses'

export const POST = async (req: Request) => {
  try {
    const { title, description, cover } = await req.json()

    console.log(title, description, cover)

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

export const GET = async () => {
  try {
    const courses = await prisma.course.findMany()
    return NextResponse.json({ courses }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
