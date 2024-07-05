"use server";
import "server-only";

import { RegisterForm } from "@/app/register/page";
import { getISODate, throwIfUnauthorized } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/registerSchema";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  paymentReceived,
  registrationCompleted,
} from "@/lib/serverless/sendmail";
import { unparse } from "papaparse";

export const register = async (data: RegisterForm) => {
  const validation = registerSchema.safeParse({
    ...data,
    name: `${data.firstName} ${data.lastName}`,
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
  await registrationCompleted({
    targetMail: validation.data.email,
    tshirtsAmount: validation.data.tshirtsAmount,
    size: validation.data.tshirtsSize,
    name: validation.data.name,
  });

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

  if (validation.data.field === "hasPaidRegistration") {
    const data = await prisma.registration.findUnique({
      where: { id: validation.data.id },
      select: { email: true },
    });
    if (!!data?.email) {
      await paymentReceived({
        targetMail: data.email,
      });
    }
  }

  revalidatePath("/admin");
};

export const deleteRegistration = async (id: number) => {
  const validation = z.number().safeParse(id);

  if (!validation.success) {
    console.error(validation.error);
    throw new Error("Invalid id for delete");
  }

  await prisma.registration.delete({ where: { id: validation.data } });
  revalidatePath("/admin");
};

export const getAllRegistration = async () => {
  const data = await prisma.registration.findMany();
  return unparse(data);
};
