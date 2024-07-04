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

export function DataTable({
  data,
}: {
  data: { registrations: Registration[]; total: number };
}) {
  const table = useReactTable({
    data: data.registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: 1,
    rowCount: 10,
  });
  const [selectedRow, setSelectedRow] = useState<Registration | null>(null);

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
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
