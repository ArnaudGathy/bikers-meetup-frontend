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

  const currentPage = Number(paramsCurrentPage);
  const numberOfPages = Math.ceil(total / PAGE_SIZE);

  const displayPage = currentPage + 1;

  const next = () => {
    params.set("currentPage", String(currentPage + 1));
    router.replace(`${pathName}?${params.toString()}`);
  };

  const prev = () => {
    params.set("currentPage", String(currentPage - 1));
    router.replace(`${pathName}?${params.toString()}`);
  };

  const setPage = (displayPage: number) => {
    params.set("currentPage", String(displayPage - 1));
    router.replace(`${pathName}?${params.toString()}`);
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
        {currentPage < numberOfPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
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
