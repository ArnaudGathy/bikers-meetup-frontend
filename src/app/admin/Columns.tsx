"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Registration } from "@prisma/client";
import { BookingModes } from "@/lib/schemas/registerFormSchema";
import CountryFlag from "@/components/CountryFlag";
import { formatPrice, getTotal } from "@/lib/utils";
import MarkAsPaidButton from "@/app/admin/MarkAsPaidButton";
import { Badge } from "@/components/ui/badge";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";

const IsPaidIcon = () => (
  <Badge variant="success">
    <CheckBadgeIcon className="mr-1 size-4" />
    Paid
  </Badge>
);

export const columns: ColumnDef<Registration>[] = [
  {
    header: "ID",
    id: "id",
    accessorKey: "id",
  },
  {
    header: "Name",
    id: "name",
    accessorKey: "name",
  },
  {
    header: "Phone",
    id: "phone",
    accessorKey: "phone",
  },
  {
    header: "E-mail",
    id: "email",
    accessorKey: "email",
  },
  {
    header: "Chapter",
    id: "chapter",
    cell: ({
      row: {
        original: { chapter, country },
      },
    }) => (
      <div className="flex gap-2">
        <CountryFlag country={country} />
        <div>{chapter}</div>
      </div>
    ),
  },
  {
    header: "Total",
    id: "total",
    accessorFn: ({ tshirtsAmount }) => formatPrice(getTotal(tshirtsAmount)),
  },
  {
    header: "Fee",
    id: "hasPaidRegistration",
    meta: { isCentered: true },
    cell: ({
      row: {
        original: { hasPaidRegistration, id },
      },
    }) => {
      return hasPaidRegistration ? (
        <IsPaidIcon />
      ) : (
        <MarkAsPaidButton id={id} field="hasPaidRegistration" />
      );
    },
  },
  {
    header: "Acco.",
    id: "hasPaidAccommodation",
    meta: { isCentered: true },
    cell: ({
      row: {
        original: { hasPaidAccommodation, id, booking },
      },
    }) => {
      if (booking === BookingModes.YES) {
        return (
          <div>
            {hasPaidAccommodation ? (
              <IsPaidIcon />
            ) : (
              <MarkAsPaidButton id={id} field="hasPaidAccommodation" />
            )}
          </div>
        );
      }
      return <span className="text-[10px] text-muted-foreground">{"N/A"}</span>;
    },
  },
];
