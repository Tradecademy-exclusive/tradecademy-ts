import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const protectAdmin = async () => {
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ message: 'Access Forbidden.' }, { status: 403 })
  }

  const adminEmails = JSON.parse(process.env.ADMINS || '[]') as string[]
  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses[0].emailAddress

  if (!adminEmails.includes(email)) {
    return NextResponse.json({ message: 'Access Forbidden' }, { status: 403 })
  }

  return null
}

export default protectAdmin
