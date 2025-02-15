/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const POST = async (req: Request) => {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const email =
      user.emailAddresses[0].emailAddress ||
      user.primaryEmailAddress?.emailAddress
    const username = user.username || user.firstName || 'Unknown'

    let dbUser = await prisma.user.findUnique({ where: { email } })

    if (
      dbUser &&
      (dbUser.username !== username || dbUser.picture !== user.imageUrl)
    ) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          username,
          picture: user.imageUrl,
        },
      })

      return NextResponse.json(
        { message: 'User saved successfully', user: updatedUser },
        { status: 200 }
      )
    }

    const forwardedFor = req.headers.get('x-forwarded-for')
    // @ts-ignore
    const ip = forwardedFor ? forwardedFor.split(',')[0] : req.ip || 'Unknown'

    if (!dbUser) {
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

      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          username,
          email: email as string,
          picture: user.imageUrl,
          planId: createdPlan.id,
          focusPointId: focusPoint.id,
          IP: ip,
          password: 'defaultPassword',
        },
      })
    }

    return NextResponse.json(
      { message: 'User saved successfully', user: dbUser },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to save user', error: err },
      { status: 500 }
    )
  }
}
