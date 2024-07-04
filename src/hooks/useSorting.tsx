"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import { ZodSchema } from "zod";

export const useSorting = (
  schema: ZodSchema,
  filterCallback?: (params: URLSearchParams) => void,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  const existingOrderBy = params.get("orderBy");
  const existingMethod = params.get("method");

  const handleRowFilterClick = (fieldName: string) => {
    if (existingOrderBy === fieldName) {
      if (existingMethod === "asc") {
        params.set("method", "desc");
      } else {
        params.delete("orderBy");
        params.delete("method");
      }
    } else {
      params.set("orderBy", fieldName);
      params.set("method", "asc");
    }

    filterCallback?.(params);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const getChevronIcon = (fieldName: string) => {
    if (existingOrderBy === fieldName) {
      if (existingMethod === "asc") {
        return <ChevronUpIcon className="size-4" />;
      }
      if (existingMethod === "desc") {
        return <ChevronDownIcon className="size-4" />;
      }
    }

    return <ChevronUpDownIcon className="size-4" />;
  };

  return { getChevronIcon, handleRowFilterClick };
};
