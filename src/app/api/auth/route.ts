import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const GET = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    return NextResponse.json({ token }, { status: 200 })

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
