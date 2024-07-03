"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { throwIfUnauthorized } from "@/lib/utils";
import { PAGE_SIZE } from "@/constants/registrations";
import { z } from "zod";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

const whereSchema = z.object({
  name: z.string().optional().default(""),
});

type GetAllRegistrationsParams = {
  currentPage?: string;
  name?: string;
};

export const getAllRegistrations = async ({
  currentPage,
  ...rest
}: GetAllRegistrationsParams) => {
  await throwIfUnauthorized();
  noStore();

  const validationWhere = whereSchema.safeParse(rest);
  if (!validationWhere.success) {
    console.error(validationWhere.error);
    redirect("/admin");
  }
  const { name } = validationWhere.data;

  const whereClause: Prisma.RegistrationWhereInput = {
    name: {
      contains: name,
      mode: "insensitive",
    },
  };
  const aggregation = await prisma.registration.aggregate({
    _count: { id: true },
    where: whereClause,
  });
  const total = aggregation._count.id;

  const validationPagination = z.coerce
    .number()
    .min(0)
    .max(total ? Math.ceil(total / PAGE_SIZE) - 1 : 0)
    .default(0)
    .safeParse(currentPage);

  if (!validationPagination.success) {
    console.error(validationPagination.error);
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
