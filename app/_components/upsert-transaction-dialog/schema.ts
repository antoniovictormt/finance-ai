import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client"
import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  amount: z
    .number({
      required_error: "O valor é obrigatório"
    })
    .positive(),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório"
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória"
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório"
  }),
  date: z.date({
    required_error: "A data é obrigatória"
  })
})
