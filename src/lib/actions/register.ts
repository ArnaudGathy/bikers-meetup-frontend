"use server";
import "server-only";

import { RegisterForm } from "@/app/register/page";
import { getISODate } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/registerSchema";
import prisma from "@/lib/prisma";

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
    throw new Error("Invalid data");
  }

  await prisma.registration.create({ data: validation.data });
};
