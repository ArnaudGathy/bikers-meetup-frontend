"use server";
import "server-only";
import prisma from "@/lib/prisma";

export const getAllAccommodations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return prisma.accommodation.findMany();
};
