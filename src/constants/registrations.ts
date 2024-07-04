import { z } from "zod";

export const PAGE_SIZE = 10;

export const registrationSortingSchema = z.object({
  orderBy: z
    .union([
      z.literal("id"),
      z.literal("name"),
      z.literal("email"),
      z.literal("phone"),
      z.literal("chapter"),
      z.literal("total"),
      z.literal("hasPaidRegistration"),
      z.literal("hasPaidAccommodation"),
    ])
    .nullable()
    .optional(),
  method: z
    .union([z.literal("asc"), z.literal("desc")])
    .nullable()
    .optional(),
});
