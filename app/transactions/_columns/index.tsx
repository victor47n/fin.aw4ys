"use client";

import { type Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/transaction-type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/formatCurrency";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    meta: {
      headerClassName: "w-[320px]",
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    meta: {
      headerClassName: "w-[240px]",
    },
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    meta: {
      headerClassName: "w-[240px]",
    },
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    meta: {
      headerClassName: "w-[240px]",
    },
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    meta: {
      headerClassName: "w-[240px]",
      cellClassName: "text-muted-foreground",
    },
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    meta: {
      headerClassName: "w-[140px]",
    },
    cell: ({ row: { original: transaction } }) =>
      formatCurrency(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    meta: {
      headerClassName: "w-[140px]",
    },
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center justify-center space-x-6">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
