"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { accommodationQuerySchema } from "@/constants/accommodations";

export const getAllAccommodations = async (params: {
  orderBy?: string;
  method?: string;
}) => {
  const validation = accommodationQuerySchema.safeParse(params);

  if (
    !validation.success ||
    validation.data.orderBy === undefined ||
    validation.data.method === undefined
  ) {
    return prisma.accommodation.findMany({ orderBy: { id: "asc" } });
  }

  return prisma.accommodation.findMany({
    orderBy: {
      [validation.data.orderBy]: validation.data.method,
    },
  });
};
