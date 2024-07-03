"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { throwIfUnauthorized } from "@/lib/utils";

export const getAllRegistrations = async () => {
  await throwIfUnauthorized();
  noStore();

  return prisma.registration.findMany({ orderBy: { createdAt: "desc" } });
};
