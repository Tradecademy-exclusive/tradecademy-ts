import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const students = await prisma.user.findMany()

    return NextResponse.json({ students }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
