import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);

  const userCanAddTransactions = await canUserAddTransaction();

  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 xl:h-full xl:overflow-hidden">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <h1 className="text-center text-2xl font-bold sm:text-left">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid gap-6 xl:h-full xl:grid-cols-[2fr,1fr] xl:overflow-hidden">
          <div className="flex flex-col gap-6 xl:overflow-hidden">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransactions}
            />
            <div className="flex flex-col gap-6 lg:grid lg:h-full lg:grid-cols-4 lg:grid-rows-1 lg:overflow-hidden 2xl:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <div className="grid gap-9 xl:flex xl:flex-col xl:gap-4 xl:overflow-hidden">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
}
