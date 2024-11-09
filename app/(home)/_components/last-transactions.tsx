import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import type { Transaction } from "@prisma/client";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

export default function LastTransactions({
  lastTransactions,
}: LastTransactionsProps) {
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          ></div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
