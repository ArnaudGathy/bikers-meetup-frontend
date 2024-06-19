"use server";
import "server-only";
import prisma from "@/lib/prisma";

export const getAllAccommodations = async ({
  orderBy,
  method,
}: {
  orderBy?: string;
  method?: string;
}) => {
  return prisma.accommodation.findMany({
    orderBy: { [orderBy ?? "beds"]: method ?? "asc" },
  });
};
