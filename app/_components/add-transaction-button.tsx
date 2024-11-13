"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
                  <ArrowDownUpIcon />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Você atingiu o limite de transações. Atualize seu plano para
              aproveitar a criação de transações ilimitadas.
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
