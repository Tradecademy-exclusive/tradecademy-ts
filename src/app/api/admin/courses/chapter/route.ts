import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export const POST = async (req: Request) => {
  try {
    const body = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    const { title, courseId, chapter, videos } = body

    if (
      !title ||
      !courseId ||
      !Number.isInteger(chapter) ||
      !Array.isArray(videos)
    ) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    const createdChapter = await prisma.chapter.create({
      data: {
        title,
        chapter,
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: {
        videos: true,
      },
    })

    const videoData = videos.map((video) => {
      if (
        !video.title ||
        !Array.isArray(video.description) ||
        typeof video.order !== 'number'
      ) {
        throw new Error('Invalid video data provided')
      }
      return {
        title: video.title,
        description: video.description,
        url: video.url || null,
        order: video.order,
        chapterId: createdChapter.id,
      }
    })

    await prisma.video.createMany({
      data: videoData,
    })

    return NextResponse.json({ createdChapter }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
