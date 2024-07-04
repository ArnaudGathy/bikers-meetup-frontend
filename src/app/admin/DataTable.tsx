"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Registration } from "@prisma/client";
import { columns } from "@/app/admin/Columns";
import DetailsSheet from "@/app/admin/DetailsSheet";
import { clsx } from "clsx";
import { useSorting } from "@/hooks/useSorting";
import { registrationSortingSchema } from "@/constants/registrations";

export function DataTable({
  data,
}: {
  data: { registrations: Registration[]; total: number };
}) {
  const table = useReactTable({
    data: data.registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [selectedRow, setSelectedRow] = useState<Registration | null>(null);
  const { getChevronIcon, handleRowFilterClick } = useSorting(
    registrationSortingSchema,
    (params) => params.set("currentPage", "0"),
  );

  return (
    <>
      <DetailsSheet selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={clsx({
                        "text-center": header.column.columnDef.meta?.isCentered,
                      })}
                      onClick={() => {
                        if (!!header.column.columnDef.id) {
                          handleRowFilterClick(header.column.columnDef.id);
                        }
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {!!header.column.columnDef.id &&
                            getChevronIcon(header.column.columnDef.id)}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={clsx({
                        "text-center": cell.column.columnDef.meta?.isCentered,
                        capitalize:
                          !!cell.column.columnDef.header &&
                          ["name", "chapter"].includes(
                            cell.column.columnDef.header.toString(),
                          ),
                      })}
                      onClick={() => {
                        const { header } = cell.column.columnDef;
                        if (
                          !!header &&
                          typeof header === "string" &&
                          !["Fee", "Acco."].includes(header)
                        ) {
                          setSelectedRow(row.original);
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
