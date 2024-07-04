"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { throwIfUnauthorized } from "@/lib/utils";
import {
  PAGE_SIZE,
  registrationSortingSchema,
} from "@/constants/registrations";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BookingModes, Prisma } from "@prisma/client";
import { RegistrationSearchParams } from "@/app/admin/page";
import { unstable_noStore as noStore } from "next/cache";

export type SchemaType = z.infer<typeof whereSchema>;

const getOrderBy = (
  orderBy: SchemaType["orderBy"],
  method: SchemaType["method"],
) => {
  if (!!orderBy && method) {
    if (orderBy === "total") {
      return {
        tshirtsAmount: {
          sort: method,
          nulls: method === "asc" ? ("first" as const) : ("last" as const),
        },
      };
    }
    return { [orderBy]: method };
  }
  return { createdAt: "desc" as const };
};

const whereSchema = z
  .object({
    name: z.string().optional().default(""),
    isUnpaid: z.coerce.string().optional(),
  })
  .and(registrationSortingSchema);

export const getAllRegistrations = async ({
  currentPage,
  ...rest
}: RegistrationSearchParams) => {
  await throwIfUnauthorized();
  noStore();

  const validationWhere = whereSchema.safeParse(rest);
  if (!validationWhere.success) {
    redirect("/admin");
  }
  const { name, isUnpaid, orderBy, method } = validationWhere.data;

  const whereClause: Prisma.RegistrationWhereInput = {
    AND: [
      {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      {
        ...(isUnpaid !== undefined
          ? {
              OR: [
                {
                  hasPaidRegistration: { equals: false },
                },
                {
                  AND: [
                    {
                      booking: { equals: BookingModes.YES },
                    },
                    {
                      hasPaidAccommodation: { equals: false },
                    },
                  ],
                },
              ],
            }
          : {}),
      },
    ],
  };
  const aggregation = await prisma.registration.aggregate({
    _count: { id: true },
    where: whereClause,
  });
  const total = aggregation._count.id;
  const maxPage = Math.max(Math.ceil(total / PAGE_SIZE) - 1, 0);

  const validationPagination = z.coerce
    .number()
    .min(0)
    .default(0)
    .transform((currentPage) => (currentPage > maxPage ? 0 : currentPage))
    .safeParse(currentPage);

  if (!validationPagination.success) {
    console.error(
      "PAGINATION Schema validation : ",
      validationPagination.error,
    );
    redirect("/admin");
  }

  const registrations = await prisma.registration.findMany({
    take: PAGE_SIZE,
    skip: validationPagination.data * PAGE_SIZE,
    where: whereClause,
    orderBy: {
      ...getOrderBy(orderBy, method),
    },
  });

  return {
    registrations,
    total,
  };
};
