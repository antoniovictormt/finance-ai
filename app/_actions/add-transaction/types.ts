import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client"

export interface AddTransactionParams {
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}
