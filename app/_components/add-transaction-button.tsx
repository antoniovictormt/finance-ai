"use client"

import { addTransaction } from "@/app/_actions/add-transaction"
import { ArrowDownUpIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "./ui/button"
import { UpsertTransactionDialog } from "./upsert-transaction-dialog"

export function AddTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        className="rounded-full"
        onClick={() => setDialogIsOpen(true)}
      >
        <span className="font-bold">Adicionar transação</span>

        <ArrowDownUpIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
        handleSubmitTransaction={addTransaction}
        title="Adicionar Transação"
      />
    </>
  )
}
