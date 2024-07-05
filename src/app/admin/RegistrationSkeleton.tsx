"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "@/app/admin/Columns";
import { clsx } from "clsx";

const tableWidths = [
  "w-[31px]",
  "w-[148px]",
  "w-[125px]",
  "w-[260px]",
  "w-[75px]",
  "w-[72px]",
  "w-[83px]",
  "w-[83px]",
];

export default function RegistrationSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full justify-between gap-4 self-start">
        <div className="flex gap-4">
          <Skeleton className="h-[40px] w-[200px]" />
          <Skeleton className="h-[40px] w-[168px]" />
        </div>
        <div>
          <Skeleton className="h-[40px] w-[155px]" />
        </div>
      </div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ header, meta }) => {
                return (
                  <TableHead
                    key={header?.toString()}
                    className={clsx({
                      "text-center": meta?.isCentered,
                    })}
                  >
                    {header?.toString()}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map(({ header, meta }, j) => {
                  return (
                    <TableCell
                      key={header?.toString()}
                      className={clsx({
                        "text-center": meta?.isCentered,
                      })}
                    >
                      <Skeleton className={clsx(tableWidths[j], "h-[24px]")} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Skeleton className="h-[40px] w-[588px]" />
      </div>
    </div>
  );
}
