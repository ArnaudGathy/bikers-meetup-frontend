"use server";
import "server-only";

import prisma from "@/lib/prisma";
import { throwIfUnauthorized } from "@/lib/utils";
import {
  PAGE_SIZE,
  registrationSortingSchema,
} from "@/constants/registrations";
import { z } from "zod";
import { redirect } from "next/navigation";
import { BookingModes, Prisma } from "@prisma/client";
import { RegistrationSearchParams } from "@/app/admin/page";
import { unstable_noStore as noStore } from "next/cache";
import { differenceInYears } from "date-fns";

export type SchemaType = z.infer<typeof whereSchema>;

const getOrderBy = (
  orderBy: SchemaType["orderBy"],
  method: SchemaType["method"],
) => {
  if (!!orderBy && method) {
    if (orderBy === "total") {
      return {
        tshirtsAmount: {
          sort: method,
          nulls: method === "asc" ? ("first" as const) : ("last" as const),
        },
      };
    }
    return { [orderBy]: method };
  }
  return { createdAt: "desc" as const };
};

const whereSchema = z
  .object({
    name: z.string().optional().default(""),
    isUnpaid: z.coerce.string().optional(),
  })
  .and(registrationSortingSchema);

export const getRegistrations = async ({
  currentPage,
  ...rest
}: RegistrationSearchParams) => {
  await throwIfUnauthorized();
  noStore();

  // promise wait
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validationWhere = whereSchema.safeParse(rest);
  if (!validationWhere.success) {
    redirect("/admin");
  }
  const { name, isUnpaid, orderBy, method } = validationWhere.data;

  const whereClause: Prisma.RegistrationWhereInput = {
    AND: [
      {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      {
        ...(isUnpaid !== undefined
          ? {
              OR: [
                {
                  hasPaidRegistration: { equals: false },
                },
                {
                  AND: [
                    {
                      booking: { equals: BookingModes.YES },
                    },
                    {
                      hasPaidAccommodation: { equals: false },
                    },
                  ],
                },
              ],
            }
          : {}),
      },
    ],
  };
  const aggregation = await prisma.registration.aggregate({
    _count: { id: true },
    where: whereClause,
  });
  const total = aggregation._count.id;
  const maxPage = Math.max(Math.ceil(total / PAGE_SIZE) - 1, 0);

  const validationPagination = z.coerce
    .number()
    .min(0)
    .default(0)
    .transform((currentPage) => (currentPage > maxPage ? 0 : currentPage))
    .safeParse(currentPage);

  if (!validationPagination.success) {
    console.error(
      "PAGINATION Schema validation : ",
      validationPagination.error,
    );
    redirect("/admin");
  }

  const registrations = await prisma.registration.findMany({
    take: PAGE_SIZE,
    skip: validationPagination.data * PAGE_SIZE,
    where: whereClause,
    orderBy: {
      ...getOrderBy(orderBy, method),
    },
  });

  return {
    registrations,
    total,
  };
};

export const getTotalRegistrationAndPaid = async () => {
  await throwIfUnauthorized();
  noStore();

  const totalPromise = prisma.registration.count();
  const totalPaidRegistrationsPromise = prisma.registration.count({
    where: { hasPaidRegistration: true },
  });
  const [total, totalPaidRegistrations] = await Promise.all([
    totalPromise,
    totalPaidRegistrationsPromise,
  ]);

  return {
    total,
    percentagePaid: Math.round((totalPaidRegistrations / (total || 1)) * 100),
  };
};

export const getTotalAccommodationsAndPaid = async () => {
  await throwIfUnauthorized();
  noStore();

  const totalPromise = prisma.registration.count({
    where: { booking: { equals: BookingModes.YES } },
  });
  const totalPaidAccommodationsPromise = prisma.registration.count({
    where: { hasPaidAccommodation: true },
  });
  const [total, totalPaidAccommodations] = await Promise.all([
    totalPromise,
    totalPaidAccommodationsPromise,
  ]);

  return {
    total,
    percentagePaid: Math.round((totalPaidAccommodations / (total || 1)) * 100),
  };
};

export const getTshirtsSold = async () => {
  await throwIfUnauthorized();
  noStore();

  const tshirtsSold = await prisma.registration.aggregate({
    _sum: { tshirtsAmount: true },
    _avg: { tshirtsAmount: true },
  });

  return {
    total: tshirtsSold._sum.tshirtsAmount ?? 0,
    avg: tshirtsSold._avg.tshirtsAmount
      ? Math.round(tshirtsSold._avg.tshirtsAmount)
      : 0,
  };
};

export const getAgeAverage = async () => {
  await throwIfUnauthorized();
  noStore();

  const allBirthdate = await prisma.registration.findMany({
    select: { birthdate: true },
  });

  const ages = allBirthdate.map((b) =>
    differenceInYears(new Date(), b.birthdate),
  );

  if (ages.length === 0) {
    return { ageAvg: 0, minAge: 0, maxAge: 0 };
  }

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  const ageSum = ages.reduce((acc, curr) => acc + curr, 0);
  const ageAvg = Math.round(ageSum / ages.length);

  return { ageAvg, minAge, maxAge };
};

export const getMostRepresentedCountry = async () => {
  await throwIfUnauthorized();
  noStore();

  const countries = await prisma.registration.groupBy({
    by: ["country"],
    _count: {
      country: true,
    },
  });

  const differentCountries = countries.length;
  countries.sort((a, b) => b._count.country - a._count.country);
  countries.splice(3);

  return {
    countries: countries.map((c) => ({
      country: c.country,
      count: c._count.country,
    })),
    differentCountries,
  };
};

// motorcycle brand
export const getMostRepresentedBrand = async () => {
  await throwIfUnauthorized();
  noStore();

  const brands = await prisma.registration.groupBy({
    by: ["brand"],
    _count: {
      brand: true,
    },
    orderBy: {
      _count: {
        brand: "desc",
      },
    },
  });

  const models = await prisma.registration.groupBy({
    by: ["model"],
    _count: {
      model: true,
    },
    orderBy: {
      _count: {
        model: "desc",
      },
    },
  });

  return {
    brand: brands?.[0]?.brand || "No data yet",
    model: models?.[0]?.model || "No data yet",
  };
};
