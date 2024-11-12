import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import PaginationTransactionsContainer from "./_components/pagination-transactions-container";
import { TransactionsTableFilter } from "./_components/transactions-table-filter";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
  Prisma,
} from "@prisma/client";

const PAGE_SIZE = 10;

interface TransactionsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const pageIndex = searchParams["page"] ?? "1";
  const name = searchParams["name"]?.toString() ?? "";
  const type = searchParams["type"]?.toString();
  const category = searchParams["category"]?.toString();
  const paymentMethod = searchParams["paymentMethod"]?.toString();

  const where = {
    userId,
    name: {
      contains: name,
      mode: "insensitive",
    },
    type: {
      equals: TransactionType[type as keyof typeof TransactionType],
    },
    category: {
      equals: TransactionCategory[category as keyof typeof TransactionCategory],
    },
    paymentMethod: {
      equals:
        TransactionPaymentMethod[
          paymentMethod as keyof typeof TransactionPaymentMethod
        ],
    },
  } as Prisma.TransactionWhereInput;

  const transactions = await db.transaction.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    skip: (Number(pageIndex) - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalTransactions = await db.transaction.count({
    where,
  });

  const userCanAddTransactions = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransactions}
          />
        </div>

        <TransactionsTableFilter />

        <ScrollArea className="h-full">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>

        <PaginationTransactionsContainer
          perPage={PAGE_SIZE}
          totalCount={totalTransactions}
        />
      </div>
    </>
  );
}
