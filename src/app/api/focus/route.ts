import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request) => {
  try {
    const { focusId, description } = await req.json()

    const updatedFocusPoint = await prisma.focusPoint.update({
      where: {
        id: focusId,
      },
      data: {
        description,
      },
    })

    return NextResponse.json({ updatedFocusPoint }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
