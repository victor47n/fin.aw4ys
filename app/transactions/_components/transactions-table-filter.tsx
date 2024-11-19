"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/app/_constants/transactions";

const transactionsFilterSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  paymentMethod: z.string().optional(),
});

type TransactionsFilterSchema = z.infer<typeof transactionsFilterSchema>;

export function TransactionsTableFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const paymentMethod = searchParams.get("paymentMethod");

  const { register, handleSubmit, control, reset } =
    useForm<TransactionsFilterSchema>({
      resolver: zodResolver(transactionsFilterSchema),
      defaultValues: {
        name: name ?? "",
        type: type ?? "",
        category: category ?? "",
        paymentMethod: paymentMethod ?? "",
      },
    });

  function handleFilter({
    name,
    type,
    category,
    paymentMethod,
  }: TransactionsFilterSchema) {
    const params = new URLSearchParams(searchParams);

    if (name) {
      params.set("name", name);
    } else {
      params.delete("name");
    }

    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (paymentMethod) {
      params.set("paymentMethod", paymentMethod);
    } else {
      params.delete("paymentMethod");
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete("name");
    params.delete("type");
    params.delete("category");
    params.delete("paymentMethod");
    params.set("page", "1");

    reset({
      name: "",
      type: "all",
      category: "all",
      paymentMethod: "all",
    });

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Nome" className="h-8 w-auto" {...register("name")} />

      <Controller
        name="type"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 lg:w-[180px]">
                <SelectValue placeholder="Tipo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {TRANSACTION_TYPE_OPTIONS.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />

      <Controller
        name="category"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 lg:w-[180px]">
                <SelectValue placeholder="Categoria..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {TRANSACTION_CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 lg:w-[180px]">
                <SelectValue placeholder="Método de pagamento..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((paymentMethod) => (
                  <SelectItem
                    key={paymentMethod.value}
                    value={paymentMethod.value}
                  >
                    {paymentMethod.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button onClick={handleClearFilters} variant="outline" size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
