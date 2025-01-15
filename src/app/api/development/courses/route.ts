import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const DELETE = async () => {
  try {
    const deletedCourses = await prisma.course.deleteMany()
    return NextResponse.json({ deletedCourses }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
