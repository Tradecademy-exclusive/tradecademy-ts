import { NextResponse } from 'next/server'
import { validateCourseSchema } from '../../_validators/courses'
import prisma from '@/db/prisma'

export const POST = async (req: Request) => {
  try {
    const {
      title,
      description,
      cover,
      price,
      discountedPrice,
      materials,
      duration,
      maxStudents,
      learn,
    } = await req.json()

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
        price: price,
        discountedPrice: discountedPrice,
        materials: materials,
        duration: duration,
        maxStudents,
        learn: learn,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
