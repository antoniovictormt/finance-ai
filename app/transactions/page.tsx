import { redirect } from "next/navigation"

import { auth } from "@clerk/nextjs/server"

import { AddTransactionButton } from "../_components/add-transaction-button"
import { Navbar } from "../_components/navbar"
import { DataTable } from "../_components/ui/data-table"
import { ScrollArea } from "../_components/ui/scroll-area"
import { db } from "../_lib/prisma"
import { transactionsColumns } from "./_columns"

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <>
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>

          <AddTransactionButton />
        </div>

        <ScrollArea>
          <DataTable
            columns={transactionsColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  )
}
