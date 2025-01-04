"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"

import { deleteTransactionSchema } from "./schema"
import { DeleteTransactionParams } from "./types"

export async function deleteTransaction(params: DeleteTransactionParams) {
  deleteTransactionSchema.parse(params)

  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  await db.transaction.delete({
    where: {
      id: params.id
    }
  })

  revalidatePath("/transactions")
}
