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
import { BookingModes, Prisma, TShirtsSizes } from "@prisma/client";
import { RegistrationSearchParams } from "@/app/admin/page";
import { differenceInYears } from "date-fns";
import { TShirtsSizes as SizeEnum } from "@/lib/schemas/registerFormSchema";
import {
  entries,
  filter,
  firstBy,
  groupBy,
  mapValues,
  pipe,
  sum,
} from "remeda";

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
  const total = await prisma.registration.count({
    where: whereClause,
  });
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

export type tShirtSizeCount = {
  size: TShirtsSizes | null;
  count: number;
}[];

export const getTshirtsSizes = async () => {
  await throwIfUnauthorized();

  const result = await prisma.registration.groupBy({
    by: ["tshirtsSize"],
    _count: {
      tshirtsSize: true,
    },
    where: {
      tshirtsSize: { not: null },
    },
  });

  return result.reduce(
    (acc: { men: tShirtSizeCount; women: tShirtSizeCount }, curr) => {
      if (!!curr.tshirtsSize) {
        const currentValue = {
          size: curr.tshirtsSize,
          count: curr._count.tshirtsSize,
        };

        if (
          [
            SizeEnum.S,
            SizeEnum.M,
            SizeEnum.L,
            SizeEnum.XL,
            SizeEnum["2XL"],
            SizeEnum["3XL"],
            SizeEnum["4XL"],
            SizeEnum["5XL"],
          ].includes(curr.tshirtsSize as SizeEnum)
        ) {
          return {
            ...acc,
            men: [...acc.men, currentValue],
          };
        }

        if (
          [
            SizeEnum.WS,
            SizeEnum.WM,
            SizeEnum.WL,
            SizeEnum.WXL,
            SizeEnum["W2XL"],
          ].includes(curr.tshirtsSize as SizeEnum)
        ) {
          return { ...acc, women: [...acc.women, currentValue] };
        }
      }

      return acc;
    },
    { men: [], women: [] },
  );
};

export const getAgeAverage = async () => {
  await throwIfUnauthorized();

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

  const mostPopularModel = pipe(
    models,
    filter((model) => !!model.model),
    groupBy((model) => model?.model?.trim().toLowerCase().replaceAll(" ", "")),
    mapValues((values) => ({
      count: sum(
        values.map((val) => {
          return val._count.model;
        }),
      ),
      name: values[0].model,
    })),
    entries(),
    firstBy([([, { count }]) => count, "desc"]),
  );

  const mostPopularBrand = pipe(
    brands,
    filter((brand) => !!brand.brand),
    groupBy((brand) => brand?.brand?.trim().toLowerCase().replaceAll(" ", "")),
    mapValues((values) => ({
      count: sum(
        values.map((val) => {
          return val._count.brand;
        }),
      ),
      name: values[0].brand,
    })),
    entries(),
    firstBy([([, { count }]) => count, "desc"]),
  );

  return {
    brand: mostPopularBrand?.[1].name || "No data yet",
    model: mostPopularModel?.[1].name || "No data yet",
  };
};
