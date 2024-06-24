import { z } from "zod";

export enum BookingModes {
  YES = "YES",
  WITH_SOMEONE = "SOMEONE_ELSE_BOOKED",
  NO = "NO",
}

export enum TravelModes {
  BOAT = "Boat",
  CAR = "Car",
  MOTORCYCLE = "Motorcycle",
  PLANE = "Plane",
  SPACE_SHUTTLE = "Space Shuttle",
  TRAIN = "Train",
}

export enum TShirtsSizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  "2XL" = "2XL",
  "3XL" = "3XL",
  "4XL" = "4XL",
  "5XL" = "5XL",
}

export const formSchema = z
  .object({
    firstName: z
      .string()
      .max(50, { message: "First name is too long." })
      .min(1, { message: "First name is required." }),
    lastName: z
      .string()
      .max(50, { message: "Last name is too long." })
      .min(1, { message: "Last name is required." }),
    email: z
      .string()
      .email({ message: "Email is required." })
      .max(256, { message: "Email is too long." }),
    phone: z.object({
      prefix: z
        .string()
        .max(5, { message: "Invalid country code" })
        .min(2, { message: "Required" }),
      number: z
        .string()
        .max(10, { message: "Phone number is too long." })
        .min(5, { message: "Phone number is required." }),
    }),
    birthdate: z.object({
      day: z
        .string()
        .min(1, { message: "The day is required" })
        .refine((value) => !isNaN(Number(value)), {
          message: "The day should be a number",
        })
        .refine(
          (value) => {
            const num = Number(value);
            return num >= 1 && num <= 31;
          },
          {
            message: "The day should be between 1 and 31",
          },
        ),
      month: z
        .string()
        .min(1, { message: "The month is required" })
        .refine((value) => !isNaN(Number(value)), {
          message: "The month should be a number",
        })
        .refine(
          (value) => {
            const num = Number(value);
            return num >= 1 && num <= 12;
          },
          {
            message: "The month should be between 1 and 12",
          },
        ),
      year: z
        .string()
        .min(4, { message: "The year is required (4 digits)" })
        .refine((value) => !isNaN(Number(value)), {
          message: "The year should be a number",
        })
        .refine(
          (value) => {
            const num = Number(value);
            return num >= 1900 && num <= 2025;
          },
          {
            message: "The year should be between 1900 and 2007",
          },
        ),
    }),
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
    emergencyPhone: z.object({
      prefix: z
        .string()
        .max(5, { message: "Invalid country code" })
        .min(2, { message: "Required" }),
      number: z
        .string()
        .max(10, { message: "Phone number is too long." })
        .min(5, { message: "Phone number is required." }),
    }),
    chapter: z
      .string()
      .max(80, { message: "Chapter name is too long." })
      .min(1, { message: "Chapter name is required." }),
    chapterFunction: z
      .string()
      .max(80, { message: "Function is too long." })
      .min(1, { message: "Function is required." }),
    brand: z
      .string()
      .max(50, { message: "Motorcycle brand is too long." })
      .min(1, { message: "Motorcycle brand is required." }),
    model: z
      .string()
      .max(50, { message: "Motorcycle model is too long." })
      .min(1, { message: "Motorcycle model is required." }),
    licencePlate: z
      .string()
      .max(50, { message: "Licence plate is too long." })
      .min(1, { message: "Licence plate is required." }),
    travelMode: z.nativeEnum(TravelModes, {
      message: "Travel mode is required.",
    }),
    booking: z.nativeEnum(BookingModes, {
      message: "Booking information is required.",
    }),
    willShareRoom: z.boolean(),
    staysWith: z.union([z.literal(""), z.string()]),
    languages: z.union([z.literal(""), z.string()]),
    tshirtsAmount: z.union([z.literal(""), z.string()]),
    tshirtsSize: z.union([z.literal(undefined), z.nativeEnum(TShirtsSizes)]),
    agreements: z.object({
      pay: z.boolean({ message: "You must accept the condition." }).refine(
        (val) => {
          return val;
        },
        { message: "You must accept the condition." },
      ),
      data: z.boolean({ message: "You must accept the condition." }).refine(
        (val) => {
          return val;
        },
        { message: "You must accept the condition." },
      ),
      picture: z.boolean(),
    }),
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

      if (values.staysWith.length > 90) {
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

      if (values.languages.length > 90) {
        ctx.addIssue({
          message: "Languages are too long.",
          code: z.ZodIssueCode.custom,
          path: ["languages"],
        });
      }
    }

    if (
      values.tshirtsAmount !== "" &&
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
