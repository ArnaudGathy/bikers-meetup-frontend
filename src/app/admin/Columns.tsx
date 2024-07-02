"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Registration } from "@prisma/client";
import { countries } from "@/constants/countries";
import { format } from "date-fns";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { BookingModes } from "@/lib/schemas/registerFormSchema";

export const columns: ColumnDef<Registration>[] = [
  {
    header: "Registered on",
    accessorFn: ({ createdAt }) =>
      format(new Date(createdAt), "d MMM 'at' kk':'mm"),
  },
  {
    header: "Name",
    cell: ({
      row: {
        original: { firstName, lastName, country },
      },
    }) => {
      const foundCountry = countries.find((c) => c.code === country);
      return (
        <div className="flex gap-2">
          {foundCountry && <div>{foundCountry.flag}</div>}
          <div>{`${firstName} ${lastName}`}</div>
        </div>
      );
    },
  },
  {
    header: "E-mail",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Fee",
    cell: ({
      row: {
        original: { hasPaidRegistration },
      },
    }) => {
      return hasPaidRegistration ? (
        <CheckCircleIcon className="size-5 text-primary" />
      ) : (
        <XCircleIcon className="size-5 text-destructive" />
      );
    },
  },
  {
    header: "Acco.",
    cell: ({
      row: {
        original: { hasPaidAccommodation, booking },
      },
    }) => {
      if (booking === BookingModes.YES) {
        return (
          <div>
            {hasPaidAccommodation ? (
              <CheckCircleIcon className="size-5 text-primary" />
            ) : (
              <XCircleIcon className="size-5 text-destructive" />
            )}
          </div>
        );
      }
      return "N/A";
    },
  },
];
