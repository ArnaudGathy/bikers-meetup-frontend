"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/constants/registrations";

export default function PaginationFooter({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);
  const paramsCurrentPage = params.get("currentPage") ?? "0";

  const numberOfPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = Number(paramsCurrentPage);
  const displayPage = currentPage + 1;
  const updateParams = () => router.replace(`${pathName}?${params.toString()}`);

  const next = () => {
    params.set("currentPage", String(currentPage + 1));
    updateParams();
  };

  const prev = () => {
    params.set("currentPage", String(currentPage - 1));
    updateParams();
  };

  const setPage = (displayPage: number) => {
    params.set("currentPage", String(displayPage - 1));
    updateParams();
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 0 && (
          <PaginationItem onClick={prev}>
            <PaginationPrevious />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem onClick={() => setPage(1)}>
            <PaginationLink>{1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem onClick={() => setPage(displayPage - 2)}>
            <PaginationLink>{displayPage - 2}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 0 && (
          <PaginationItem onClick={() => setPage(displayPage - 1)}>
            <PaginationLink>{displayPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem onClick={() => setPage(displayPage)}>
          <PaginationLink isActive>{displayPage}</PaginationLink>
        </PaginationItem>
        {currentPage < numberOfPages - 1 && (
          <PaginationItem onClick={() => setPage(displayPage + 1)}>
            <PaginationLink>{displayPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < numberOfPages - 2 && (
          <PaginationItem onClick={() => setPage(displayPage + 2)}>
            <PaginationLink>{displayPage + 2}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < numberOfPages - 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < numberOfPages - 3 && (
          <PaginationItem onClick={() => setPage(numberOfPages)}>
            <PaginationLink>{numberOfPages}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < numberOfPages - 1 && (
          <PaginationItem onClick={next}>
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
