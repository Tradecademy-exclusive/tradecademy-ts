import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const DELETE = async () => {
  const deleted = await prisma.followupAnalysis.deleteMany()
  return NextResponse.json({ deleted })
}
