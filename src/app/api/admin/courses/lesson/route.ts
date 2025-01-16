import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { PDF, thumbnail, content, video, title, chapterId, order } =
      await req.json()

    const createdLesson = await prisma.lesson.create({
      data: {
        chapter: {
          connect: {
            id: chapterId,
          },
        },
        title: title,
        PDF: PDF,
        thumbnail: thumbnail || null,
        description: content || null,
        url: video || null,
        order: order,
      },
    })

    return NextResponse.json({ createdLesson }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
