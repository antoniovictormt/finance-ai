"use client"

import { deleteTransaction } from "@/app/_actions/delete-transaction"
import { Button } from "@/app/_components/ui/button"
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction-dialog"
import { Transaction } from "@prisma/client"
import { TrashIcon } from "lucide-react"
import { useState } from "react"

interface EditTransactionButtonProps {
  transaction: Transaction
}

export function DeleteTransactionButton({
  transaction
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <TrashIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
        handleSubmitTransaction={deleteTransaction}
        defaultValues={{
          ...transaction,
          date: new Date(String(transaction.date)),
          amount: Number(transaction.amount)
        }}
        transactionId={transaction.id}
        title="Deletar Transação"
      />
    </>
  )
}
