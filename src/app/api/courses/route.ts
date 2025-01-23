import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export const GET = async () => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
    })
    return NextResponse.json({ courses }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
