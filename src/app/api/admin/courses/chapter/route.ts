import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export const POST = async (req: Request) => {
  try {
    const body = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    const { title, courseId, chapter, lessons, summary } = body

    if (!title || !courseId || !Number.isInteger(chapter)) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    const createdChapter = await prisma.chapter.create({
      data: {
        title,
        chapter,
        summary: summary || null,
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: {
        lessons: true,
      },
    })

    if (lessons && Array.isArray(lessons)) {
      const lessonsData = lessons.map((lesson) => {
        if (
          !lesson.title ||
          !lesson.description ||
          typeof lesson.order !== 'number'
        ) {
          throw new Error('Invalid lesson data provided')
        }
        return {
          title: lesson.title,
          description: lesson.description,
          url: lesson.url || null,
          order: lesson.order,
          chapterId: createdChapter.id,
        }
      })

      await prisma.lesson.createMany({
        data: lessonsData,
      })
    }

    return NextResponse.json({ createdChapter }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const PUT = async (req: Request) => {
  try {
    const body = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    const { title, summary, id } = body

    if (!title) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    const updatedChapter = await prisma.chapter.update({
      where: {
        id,
      },
      data: {
        title,
        summary: summary || null,
      },
      include: {
        lessons: true,
      },
    })

    return NextResponse.json({ updatedChapter }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Please provide a chapter id' },
        { status: 400 }
      )
    }

    const chapter = await prisma.chapter.findUnique({
      where: { id: id },
    })

    if (!chapter) {
      return NextResponse.json(
        { message: 'Invalid chapter ID provided.' },
        { status: 404 }
      )
    }

    const deletedChapter = await prisma.chapter.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ deletedChapter }, { status: 200 })
  } catch (err) {
    console.log(err || 'Something went wrong')
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
