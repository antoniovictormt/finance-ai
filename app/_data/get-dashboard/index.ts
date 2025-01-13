import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { TransactionType } from "@prisma/client"
import { parse } from "date-fns"

import {
  GetDashboardProps,
  TotalExpensePerCategory,
  TransactionPercentagePerType
} from "./types"

export const getDashboard = async ({ from, to }: GetDashboardProps) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const where = {
    date: {
      gte: new Date(parse(from, "dd-MM-yyyy", new Date())),
      lt: new Date(parse(String(to), "dd-MM-yyyy", new Date()))
    }
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true }
      })
    )?._sum?.amount
  )

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true }
      })
    )?._sum?.amount
  )

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true }
      })
    )?._sum?.amount
  )

  const balance = depositsTotal - investmentsTotal - expensesTotal

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true }
      })
    )._sum.amount
  )

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100
    )
  }

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE
      },
      _sum: {
        amount: true
      }
    })
  ).map(category => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100
    )
  }))

  const lastTransactionsRaw = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15
  })

  const lastTransactions = lastTransactionsRaw.map(transaction => ({
    ...transaction,
    amount: transaction.amount.toNumber() // Converte o Decimal para number
  }))

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions
  }
}
