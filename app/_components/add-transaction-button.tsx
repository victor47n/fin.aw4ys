"use client";

import { ArrowDownUpIcon, CrownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

export default function AddTransactionButton({
  userCanAddTransaction,
}: AddTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        {userCanAddTransaction ? (
          <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
          >
            Adicionar transação
            <ArrowDownUpIcon />
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button className="rounded-full font-bold" disabled>
                  Adicionar transação
                  <CrownIcon className="text-warning" size={16} />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Você atingiu o limite de transações.{" "}
              <Link href="/subscription" className="text-warning underline">
                Atualize seu plano
              </Link>{" "}
              para aproveitar a criação de transações ilimitadas.
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
}
