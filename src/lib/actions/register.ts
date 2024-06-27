"use server";
import "server-only";

import { RegisterForm } from "@/app/register/page";
import { getISODate } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/registerSchema";

export const register = async (data: RegisterForm) => {
  const validation = registerSchema.safeParse({
    ...data,
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

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // eslint-disable-next-line no-console
  console.log("validation.data", validation.data);
};
