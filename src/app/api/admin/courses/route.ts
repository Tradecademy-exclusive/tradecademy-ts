import { NextResponse } from 'next/server'
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
      publishedCourse,
    } = await req.json()

    const course = await prisma.course.create({
      data: {
        title,
        description,
        cover,
        price: price || 0,
        discountedPrice: discountedPrice || 0,
        materials: materials || null,
        duration: duration,
        maxStudents,
        learn: learn,
        publishedCourse,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
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
      publishedCourse,
      id,
    } = await req.json()

    const course = await prisma.course.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        cover,
        price: price || 0,
        discountedPrice: discountedPrice || 0,
        materials: materials || null,
        duration: duration,
        maxStudents,
        learn: learn,
        publishedCourse,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
