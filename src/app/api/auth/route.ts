import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '@/types'
import prisma from '@/db/prisma'

export const GET = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token?.value) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    const { email } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    if (!email) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        courses: true,
      },
    })

    if (!user) {
      return NextResponse.json({ session: null }, { status: 200 })
    }

    return NextResponse.json(
      { session: { user, token: token.value } },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export const DELETE = async () => {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.set('token', '')
    return response
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
