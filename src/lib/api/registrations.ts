"use server";
import "server-only";

import prisma from "@/lib/prisma";

export const getAllRegistrations = async () => {
  return prisma.registration.findMany();
};
