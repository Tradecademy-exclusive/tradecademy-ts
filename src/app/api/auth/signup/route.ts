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
        { message: 'Please provide a valid email!' },
        { status: 400 }
      )
    }

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: 'Please fill out every field!' },
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
        { message: 'User already exists!' },
        { status: 200 }
      )
    }

    const hashedPass = bcrypt.hashSync(password, 10)

    const createdPlan = await prisma.plan.create({
      data: {
        steps: [
          'Top down analysis ( you need to know all TF Story’s)',
          'Identified where the money is laying',
          'Search your higher TF POI',
          'Make a sketch how your entry en tp will look like ( sl, entry , partials , last tp)',
          'Go to lower TF to find Wyckoff , or CDL wait until we get the break of Wyckoff or CDL',
          'Entry at the test of lps/ lpsy',
          'Sl under the low , all trades risk no more then your willing to lose 1%-3% max',
          'Let price come to your entry don’t fomo entry before , use limits if you like that better',
          'If price in refined your entry go break even to protect your capital',
          'Take partials on the way',
        ],
      },
    })

    const focusPoint = await prisma.focusPoint.create({
      data: {
        description:
          'If you are lost always go back check the higher timeframe.',
      },
    })

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPass,
        plan: {
          connect: {
            id: createdPlan.id,
          },
        },
        focusPoint: {
          connect: {
            id: focusPoint.id,
          },
        },
      },

      include: {
        courses: true,
        plan: true,
        previousPlans: true,
      },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json(
      { success: true, token },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to register the user', error: err },
      { status: 500 }
    )
  }
}
