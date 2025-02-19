import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'
import protectAdmin from '../protect'

export const GET = async () => {
  try {
    const response = await protectAdmin()
    if (response) {
      return response
    }

    const students = await prisma.user.findMany()

    return NextResponse.json({ students }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
