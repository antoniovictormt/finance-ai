import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon
} from "lucide-react"

import SummaryCard from "./summary-card"

interface SummaryCardsProps {
  balance: number
  investmentsTotal: number
  depositsTotal: number
  expensesTotal: number
}

export async function SummaryCards({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <SummaryCard
        amount={balance}
        icon={<WalletIcon size={16} />}
        title="Saldo"
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          amount={investmentsTotal}
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
        />

        <SummaryCard
          amount={depositsTotal}
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
        />

        <SummaryCard
          amount={expensesTotal}
          icon={<TrendingDownIcon size={16} className="text-danger" />}
          title="Despesas"
        />
      </div>
    </div>
  )
}
