/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  }).$extends(withAccelerate()) as unknown as PrismaClient
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ['error'],
    }).$extends(withAccelerate()) as unknown as PrismaClient
  }

  prisma = global.cachedPrisma
}

export default prisma
