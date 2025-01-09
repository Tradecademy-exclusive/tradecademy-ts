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

    jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {},
      (err) => {
        if (err) {
          return NextResponse.json({ error: err }, { status: 400 })
        }
        return NextResponse.json({ success: true }, { status: 200 })
      }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to register the user', error: err },
      { status: 500 }
    )
  }
}
