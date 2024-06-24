import { z } from "zod";

export const T_SHIRT_UNIT_PRICE = 1900;
export const REGISTRATION_FEE = 18000;

export const services = [
  { title: "Sheets & blankets", price: 1195 },
  { title: "Towels", price: 950 },
  { title: "Kitchen package", price: 750 },
  {
    title: "Sheets & towels package",
    price: 1650,
    description: "Included in Exclusive vacation house and hotel rooms",
  },
  {
    title: "Confort service",
    price: 2500,
    description: "Beds are ready to sleep, towels are prepared in the house",
  },
];

export const accommodationQuerySchema = z.object({
  orderBy: z
    .union([
      z.literal("name"),
      z.literal("available"),
      z.literal("beds"),
      z.literal("price1"),
      z.literal("price2"),
      z.literal("ref"),
    ])
    .optional(),
  method: z.union([z.literal("asc"), z.literal("desc")]).optional(),
});
