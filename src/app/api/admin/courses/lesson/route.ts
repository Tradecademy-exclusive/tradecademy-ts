import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redis } from '@/lib/redis'
import protectAdmin from '../../protect'

export const POST = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const {
      attachments,
      thumbnail,
      content,
      source,
      title,
      chapterId,
      order,
      type,
      courseId,
    } = await req.json()

    const createdLesson = await prisma.lesson.create({
      data: {
        chapter: {
          connect: {
            id: chapterId,
          },
        },
        title: title,
        attachments: attachments || [],
        thumbnail: thumbnail || null,
        content: content || null,
        source: source || null,
        type: type || null,
        order: order,
      },
    })

    revalidatePath('/admin/courses')

    await redis.del(['courses', 'client_courses', `course-${courseId}`])

    return NextResponse.json({ createdLesson }, { status: 201 })
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
    const body = await req.json()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const courseId = searchParams.get('courseId')

    if (!id) {
      return NextResponse.json(
        { message: 'Please provide lesson id' },
        { status: 400 }
      )
    }

    const updatedLesson = await prisma.lesson.update({
      where: {
        id,
      },
      data: body,
    })

    revalidatePath('/admin/courses')

    await redis.del(['courses', 'client_courses', `course-${courseId}`])

    return NextResponse.json({ updatedLesson }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const DELETE = async (req: Request) => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const courseId = searchParams.get('courseId')

    if (!id) {
      return NextResponse.json(
        { message: 'Please provide a lesson id' },
        { status: 400 }
      )
    }

    const deletedLesson = await prisma.lesson.delete({
      where: {
        id,
      },
    })

    await redis.del(['courses', 'client_courses', `course-${courseId}`])

    return NextResponse.json({ deletedLesson }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
