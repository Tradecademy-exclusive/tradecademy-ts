import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/db/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '@/types'

export const PUT = async (req: Request) => {
  try {
    const { username, email, password, picture } = await req.json()
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token || !token.value) {
      return NextResponse.json(
        { message: 'Anauthorized request' },
        { status: 401 }
      )
    }

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
        NOT: {
          id,
        },
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username or email already taken' },
        { status: 200 }
      )
    }

    let hashedPassword
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        picture,
        ...(password && { password: hashedPassword }),
      },
    })

    return NextResponse.json(
      { message: 'Profile updated successfully', user: updatedUser },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
