"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"

import { addTransactionSchema } from "./schema"
import { AddTransactionParams } from "./types"

export async function addTransaction(params: AddTransactionParams) {
  addTransactionSchema.parse(params)

  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  await db.transaction.create({
    data: {
      ...params,
      userId
    }
  })

  revalidatePath("/transactions")
}
