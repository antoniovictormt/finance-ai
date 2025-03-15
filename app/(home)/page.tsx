import { redirect } from "next/navigation"

import { auth } from "@clerk/nextjs/server"
import { isMatch } from "date-fns"

import { Navbar } from "../_components/navbar"
import { getDashboard } from "../_data/get-dashboard"
import { getCurrentMonthRange } from "../_utils/currentMonthRange"
import { ExpensesPerCategory } from "./_components/expenses-per-category"
import { LastTransactions } from "./_components/last-transactions"
import { SummaryCards } from "./_components/summary-cards"
import { TimeSelect } from "./_components/time-select"
import { TransactionsPieChart } from "./_components/transactions-pie-charts"

interface HomeProps {
  searchParams: Promise<{
    from: string
    to?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = await auth()

  const dateString = "dd-MM-yyyy"

  const { from, to } = await searchParams

  const monthIsInvalid =
    !from || !isMatch(from, dateString) || (to && !isMatch(to, dateString))

  const { firstDay, lastDay } = getCurrentMonthRange()

  if (monthIsInvalid) {
    redirect(`/?from=${firstDay}&to=${lastDay}`)
  }

  if (!userId) {
    redirect("/login")
  }

  const dashboard = await getDashboard({
    from,
    to
  })

  return (
    <>
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-6 p-6 lg:overflow-hidden">
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <h1 className="flex items-center justify-start text-2xl font-bold">
            Dashboard
          </h1>
          <TimeSelect />

          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards {...dashboard} />
            <div className="grid h-full grid-cols-1 grid-rows-1 gap-6 overflow-hidden lg:grid-cols-2">
              <TransactionsPieChart {...dashboard} />

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}
