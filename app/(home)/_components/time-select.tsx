"use client"

import { useRouter } from "next/navigation"

import { DateRangePicker } from "@/app/_components/date-range-picker"
import { getCurrentMonthRange } from "@/app/_utils/currentMonthRange"
import { useEffect, useState } from "react"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

export function TimeSelect() {
  const { push } = useRouter()

  const currentDate = new Date()
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )

  const [date, setDate] = useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: lastDayOfMonth
  })

  const { firstDay, lastDay } = getCurrentMonthRange()

  useEffect(() => {
    push(`/?from=${firstDay}&to=${lastDay}`)
  }, [firstDay, lastDay, push])

  const handleRangeChange: SelectRangeEventHandler = selectedRange => {
    setDate(selectedRange)

    if (selectedRange?.to) {
      const fromFormatted = selectedRange.from
        ?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        .replace(/\//g, "-")

      const toFormatted = selectedRange.to
        ?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        .replace(/\//g, "-")

      push(`/?from=${fromFormatted}&to=${toFormatted}`)
    } else {
      console.log("Intervalo ainda incompleto, aguardando seleção!")
    }
  }

  return <DateRangePicker onChangeRange={handleRangeChange} value={date} />
}
