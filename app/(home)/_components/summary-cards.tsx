import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

export default async function SummaryCards({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        bgColor="#100d14"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 items-center gap-6">
        <SummaryCard
          icon={
            <div className="rounded-lg bg-white bg-opacity-[3%] p-[0.625rem]">
              <PiggyBankIcon size={16} />
            </div>
          }
          title="Investido"
          amount={investmentsTotal}
          bgColor="#FFFFFF03"
        />
        <SummaryCard
          icon={
            <div className="rounded-lg bg-success/10 p-[0.625rem]">
              <TrendingUpIcon size={16} className="text-success" />
            </div>
          }
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={
            <div className="rounded-lg bg-destructive/10 p-[0.625rem]">
              <TrendingDownIcon size={16} className="text-red-500" />
            </div>
          }
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}
