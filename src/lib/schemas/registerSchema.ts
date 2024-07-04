import { z } from "zod";
import {
  BookingModes,
  TravelModes,
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";

export const registerSchema = z
  .object({
    name: z
      .string()
      .max(100, { message: "Name is too long." })
      .min(1, { message: "Name is required." })
      .toLowerCase(),
    email: z
      .string()
      .email({ message: "Email is required." })
      .max(256, { message: "Email is too long." })
      .toLowerCase(),
    phone: z
      .string()
      .max(15, { message: "Invalid phone number" })
      .min(7, { message: "Required" }),
    birthdate: z
      .string()
      .date()
      .transform((date) => `${date}T00:00:00Z`),
    street: z
      .string()
      .max(100, { message: "Street name is too long." })
      .min(1, { message: "Street name is required." }),
    number: z
      .string()
      .max(20, { message: "Number is too long." })
      .min(1, { message: "Number is required." }),
    box: z.string().max(10, { message: "Box is too long." }),
    country: z.string().min(2, { message: "Country is required." }).max(2),
    zip: z
      .string()
      .max(12, { message: "Zip code is too long." })
      .min(1, { message: "Required." }),
    city: z
      .string()
      .max(58, { message: "City is too long." })
      .min(1, { message: "City is required." }),
    emergencyName: z
      .string()
      .max(90, { message: "Emergency contact name is too long." })
      .min(1, { message: "Emergency contact name is required." }),
    emergencyPhone: z
      .string()
      .max(15, { message: "Invalid emergency phone number" })
      .min(7, { message: "Required" }),
    chapter: z
      .string()
      .max(80, { message: "Chapter name is too long." })
      .min(1, { message: "Chapter name is required." })
      .toLowerCase(),
    chapterFunction: z
      .string()
      .max(80, { message: "Function is too long." })
      .min(1, { message: "Function is required." }),
    brand: z.string().max(50, { message: "Motorcycle brand is too long." }),
    model: z.string().max(50, { message: "Motorcycle model is too long." }),
    licencePlate: z.string().max(50, { message: "Licence plate is too long." }),
    travelMode: z.nativeEnum(TravelModes, {
      message: "Travel mode is required.",
    }),
    booking: z.nativeEnum(BookingModes, {
      message: "Booking information is required.",
    }),
    willShareRoom: z.boolean(),
    staysWith: z.union([z.literal("").transform(() => null), z.string()]),
    languages: z.union([z.literal("").transform(() => null), z.string()]),
    tshirtsAmount: z.union([
      z.literal("").transform(() => null),
      z.coerce.number(),
    ]),
    tshirtsSize: z.union([z.literal(undefined), z.nativeEnum(TShirtsSizes)]),
    hasAgreedToPay: z.literal(true),
    hasAgreedToData: z.literal(true),
    hasAgreedToPicture: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.booking === BookingModes.WITH_SOMEONE) {
      if (values.staysWith === "") {
        ctx.addIssue({
          message: "Name of the person is required.",
          code: z.ZodIssueCode.custom,
          path: ["staysWith"],
        });
      }

      if (values.staysWith && values.staysWith.length > 90) {
        ctx.addIssue({
          message: "Name of the person is too long.",
          code: z.ZodIssueCode.custom,
          path: ["staysWith"],
        });
      }
    }

    if (
      values.booking === BookingModes.WITH_SOMEONE ||
      values.booking === BookingModes.YES
    ) {
      if (values.languages === "") {
        ctx.addIssue({
          message: "Languages is required.",
          code: z.ZodIssueCode.custom,
          path: ["languages"],
        });
      }

      if (values.languages && values.languages.length > 90) {
        ctx.addIssue({
          message: "Languages are too long.",
          code: z.ZodIssueCode.custom,
          path: ["languages"],
        });
      }
    }

    if (
      !!values.tshirtsAmount &&
      Number(values.tshirtsAmount) > 0 &&
      values.tshirtsSize === undefined
    ) {
      ctx.addIssue({
        message: "Size is required.",
        code: z.ZodIssueCode.custom,
        path: ["tshirtsSize"],
      });
    }
  });
