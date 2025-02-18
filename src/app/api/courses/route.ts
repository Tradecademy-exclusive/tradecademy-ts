import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { redis } from '@/lib/redis'

export const GET = async () => {
  try {
    const cachedValue = await redis.get('courses')

    if (cachedValue) {
      return NextResponse.json(
        { courses: JSON.parse(cachedValue) },
        { status: 200 }
      )
    }

    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                completed: true,
                chapter: true,
              },
            },
          },
        },
      },
    })

    await redis.set('courses', JSON.stringify(courses))

    return NextResponse.json({ courses }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
