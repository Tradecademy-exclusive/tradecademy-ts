import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (req: Request) => {
  try {
    const {
      attachments,
      thumbnail,
      content,
      source,
      title,
      chapterId,
      order,
      type,
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

    return NextResponse.json({ createdLesson }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
