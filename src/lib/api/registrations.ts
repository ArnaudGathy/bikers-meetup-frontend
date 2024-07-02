"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getAllRegistrations = async () => {
  noStore();
  return prisma.registration.findMany({ orderBy: { createdAt: "desc" } });
};
