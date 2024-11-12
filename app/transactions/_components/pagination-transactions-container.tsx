"use client";

import { Pagination } from "@/app/_components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

interface PaginationTransactionsContainerProps {
  totalCount: number;
  perPage: number;
}

export default function PaginationTransactionsContainer({
  perPage,
  totalCount,
}: PaginationTransactionsContainerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const handlePaginate = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${pageIndex + 1}`);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      onPageChange={handlePaginate}
      pageIndex={pageIndex}
      perPage={perPage}
      totalCount={totalCount}
    />
  );
}
