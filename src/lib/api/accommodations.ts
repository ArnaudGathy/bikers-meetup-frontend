"use server";
import "server-only";
import prisma from "@/lib/prisma";

export const getAllAccommodations = async () => {
  return prisma.accommodation.findMany();
};
