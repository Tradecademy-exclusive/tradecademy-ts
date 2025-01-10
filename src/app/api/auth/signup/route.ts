import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const POST = async (req: Request) => {
  try {
    const { email, password, username } = await req.json()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email' },
        { status: 400 }
      )
    }

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: 'Please fill out every field.' },
        { status: 400 }
      )
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    })

    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 500 }
      )
    }

    const hashedPass = bcrypt.hashSync(password, 10)

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPass,
      },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json(
      { success: true, token },
      { status: 200 }
    ).cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to register the user', error: err },
      { status: 500 }
    )
  }
}
