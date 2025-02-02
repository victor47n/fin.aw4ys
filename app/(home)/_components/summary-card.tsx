import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/formatCurrency";
import type { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  bgColor?: string;
  userCanAddTransaction?: boolean;
}

export default function SummaryCard({
  icon,
  title,
  amount,
  size = "small",
  bgColor,
  userCanAddTransaction,
}: SummaryCardProps) {
  return (
    <Card style={bgColor ? { backgroundColor: `${bgColor}` } : {}}>
      <CardHeader className="flex-row items-center justify-center gap-4 space-y-0 sm:justify-normal">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-8 sm:flex-row">
        <p
          className={`text-center font-bold sm:text-left ${size === "small" ? "text-2xl font-bold" : "text-4xl"}`}
        >
          {formatCurrency(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
}
