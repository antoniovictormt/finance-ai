import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrimsa: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrimsa) {
    global.cachedPrimsa = new PrismaClient()
  }

  prisma = global.cachedPrimsa
}

export const db = prisma
