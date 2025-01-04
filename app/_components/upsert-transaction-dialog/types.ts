import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client"
import { z } from "zod"

import { formSchema } from "./schema"

export type FormSchema = z.infer<typeof formSchema>

export interface TransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export interface UpsertTransactionDialogProps {
  isOpen: boolean
  setDialogIsOpen: (isOpen: boolean) => void
  handleSubmitTransaction: (params: TransactionParams) => Promise<void>
  defaultValues?: FormSchema
  transactionId?: string
  title: string
}
