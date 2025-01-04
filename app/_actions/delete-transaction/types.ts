import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client"

export interface DeleteTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}
