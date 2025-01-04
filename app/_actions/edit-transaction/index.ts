"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"

import { editTransactionSchema } from "./schema"
import { EditTransactionParams } from "./types"

export async function editTransaction(params: EditTransactionParams) {
  editTransactionSchema.parse(params)

  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  await db.transaction.update({
    where: {
      id: params.id
    },
    data: {
      ...params,
      userId
    }
  })

  revalidatePath("/transactions")
}
