"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { accommodationSortingSchema } from "@/constants/accommodations";

export const getAllAccommodations = async (params: {
  orderBy?: string;
  method?: string;
}) => {
  const validation = accommodationSortingSchema.safeParse(params);

  if (
    !validation.success ||
    !validation.data.orderBy ||
    !validation.data.method
  ) {
    return prisma.accommodation.findMany({ orderBy: { id: "asc" } });
  }

  return prisma.accommodation.findMany({
    orderBy: {
      [validation.data.orderBy]: validation.data.method,
    },
  });
};
