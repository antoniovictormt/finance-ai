import { redirect } from "next/navigation"

import { auth } from "@clerk/nextjs/server"
import { isMatch } from "date-fns"

import { Navbar } from "../_components/navbar"
import { getDashboard } from "../_data/get-dashboard"
import { ExpensesPerCategory } from "./_components/expenses-per-category"
import { LastTransactions } from "./_components/last-transactions"
import { SummaryCards } from "./_components/summary-cards"
import { TimeSelect } from "./_components/time-select"
import { TransactionsPieChart } from "./_components/transactions-pie-charts"

interface HomeProps {
  searchParams: {
    from: string
    to?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = await auth()

  const dateString = "dd-MM-yyyy"

  const { from, to } = await searchParams

  const monthIsInvalid =
    !from || !isMatch(from, dateString) || (to && !isMatch(to, dateString))

  if (monthIsInvalid) {
    redirect("/?from=01-01-2025&to=31-01-2025")
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

      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards {...dashboard} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
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
