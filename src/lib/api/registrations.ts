"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { throwIfUnauthorized } from "@/lib/utils";
import { PAGE_SIZE } from "@/constants/registrations";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BookingModes, Prisma } from "@prisma/client";
import { RegistrationSearchParams } from "@/app/admin/page";

const whereSchema = z.object({
  name: z.string().optional().default(""),
  isUnpaid: z.coerce.string().optional(),
});

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
  const { name, isUnpaid } = validationWhere.data;

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
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    skip: validationPagination.data * PAGE_SIZE,
    where: whereClause,
  });

  return {
    registrations,
    total,
  };
};
