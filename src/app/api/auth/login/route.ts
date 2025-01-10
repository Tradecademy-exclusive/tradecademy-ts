import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '@/db/prisma'

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please fill out all the fields' },
        { status: 400 }
      )
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!userExists) {
      return NextResponse.json(
        { message: 'User with this email does not exist' },
        { status: 400 }
      )
    }

    const passwordMatches = bcrypt.compareSync(password, userExists.password)

    if (!passwordMatches) {
      return NextResponse.json(
        { message: 'Password does not match' },
        { status: 400 }
      )
    }

    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
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
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
