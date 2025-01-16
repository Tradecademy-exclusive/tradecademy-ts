/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'
declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'info'],
  })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ['error', 'info'],
    })
  }

  prisma = global.cachedPrisma
}

export default prisma
