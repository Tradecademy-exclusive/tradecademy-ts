import { NextResponse } from 'next/server'

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
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to register the user', error: err },
      { status: 500 }
    )
  }
}
