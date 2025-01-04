"use client"

import { editTransaction } from "@/app/_actions/edit-transaction"
import { Button } from "@/app/_components/ui/button"
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction-dialog"
import { Transaction } from "@prisma/client"
import { PencilIcon } from "lucide-react"
import { useState } from "react"

interface EditTransactionButtonProps {
  transaction: Transaction
}

export function EditTransactionButton({
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
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
        handleSubmitTransaction={editTransaction}
        defaultValues={{
          ...transaction,
          date: new Date(String(transaction.date)),
          amount: Number(transaction.amount)
        }}
        transactionId={transaction.id}
        title="Editar Transação"
      />
    </>
  )
}
