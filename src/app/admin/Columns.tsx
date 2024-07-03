"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Registration } from "@prisma/client";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { BookingModes } from "@/lib/schemas/registerFormSchema";
import CountryFlag from "@/components/CountryFlag";
import { formatPrice, getTotal } from "@/lib/utils";
import MarkAsPaidButton from "@/app/admin/MarkAsPaidButton";

const IsPaidIcon = () => <CheckBadgeIcon className="size-5 text-primary" />;

export const columns: ColumnDef<Registration>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "E-mail",
    accessorKey: "email",
  },
  {
    header: "Chapter",
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
    accessorFn: ({ tshirtsAmount }) => formatPrice(getTotal(tshirtsAmount)),
  },
  {
    header: "Fee",
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
      return "N/A";
    },
  },
];
