import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const DELETE = async () => {
  await prisma.user.deleteMany()
  return NextResponse.json(
    { message: 'Users have been deleted' },
    { status: 200 }
  )
}
