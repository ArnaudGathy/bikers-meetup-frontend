"use server";
import "server-only";

import { RegisterForm } from "@/app/register/page";
import { getISODate, throwIfUnauthorized } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/registerSchema";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const register = async (data: RegisterForm) => {
  const validation = registerSchema.safeParse({
    ...data,
    tshirtsAmount: data.tshirtsAmount,
    emergencyPhone: `${data.emergencyPhonePrefix}${data.emergencyPhoneNumber}`,
    phone: `${data.phonePrefix}${data.phoneNumber}`,
    birthdate: getISODate({
      day: data.day,
      month: data.month,
      year: data.year,
    }),
  });

  if (!validation.success) {
    console.error(validation.error);
    throw new Error("Invalid data");
  }

  await prisma.registration.create({ data: validation.data });
  revalidatePath("/admin");
};

export const setAsPaid = async (id: number, field: string) => {
  await throwIfUnauthorized();

  const validation = z
    .object({
      id: z.number(),
      field: z.union([
        z.literal("hasPaidRegistration"),
        z.literal("hasPaidAccommodation"),
      ]),
    })
    .safeParse({ id, field });

  if (!validation.success) {
    console.error(validation.error);
    throw new Error("Invalid data");
  }

  await prisma.registration.update({
    where: { id: validation.data.id },
    data: { [validation.data.field]: true },
  });

  revalidatePath("/admin");
};
