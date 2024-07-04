import { z } from "zod";
import { getISODate } from "@/lib/utils";
import { isValid, parseISO } from "date-fns";

export enum BookingModes {
  YES = "YES",
  WITH_SOMEONE = "WITH_SOMEONE",
  NO = "NO",
}

export enum TravelModes {
  BOAT = "BOAT",
  CAR = "CAR",
  MOTORCYCLE = "MOTORCYCLE",
  PLANE = "PLANE",
  SPACE_SHUTTLE = "SPACE_SHUTTLE",
  TRAIN = "TRAIN",
}

export enum TShirtsSizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  "2XL" = "TwoXL",
  "3XL" = "ThreeXL",
  "4XL" = "FourXL",
  "5XL" = "FiveXL",
}

export const bookingModeTranslation = {
  [BookingModes.YES]: "Yes",
  [BookingModes.WITH_SOMEONE]: "Is staying with someone else",
  [BookingModes.NO]: "No",
};

export const travelModeTranslation = {
  [TravelModes.BOAT]: "Boat",
  [TravelModes.CAR]: "Car",
  [TravelModes.MOTORCYCLE]: "Motorcycle",
  [TravelModes.PLANE]: "Plane",
  [TravelModes.SPACE_SHUTTLE]: "Space shuttle",
  [TravelModes.TRAIN]: "Train",
};

export const tShirtSizeTranslation = {
  [TShirtsSizes.S]: "S",
  [TShirtsSizes.M]: "M",
  [TShirtsSizes.L]: "L",
  [TShirtsSizes.XL]: "XL",
  [TShirtsSizes["2XL"]]: "2XL",
  [TShirtsSizes["3XL"]]: "3XL",
  [TShirtsSizes["4XL"]]: "4XL",
  [TShirtsSizes["5XL"]]: "5XL",
};

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
    phonePrefix: z
      .string()
      .max(5, { message: "Invalid country code" })
      .min(2, { message: "Required" }),
    phoneNumber: z
      .string()
      .max(10, { message: "Phone number is too long." })
      .min(5, { message: "Phone number is required." }),
    day: z
      .string()
      .min(2, { message: "The day is required (2 digits, like 01)" })
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
      .min(2, { message: "The month is required (2 digits, like 05)" })
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
    emergencyPhonePrefix: z
      .string()
      .max(5, { message: "Invalid country code" })
      .min(2, { message: "Required" }),
    emergencyPhoneNumber: z
      .string()
      .max(10, { message: "Phone number is too long." })
      .min(5, { message: "Phone number is required." }),
    chapter: z
      .string()
      .max(80, { message: "Chapter name is too long." })
      .min(1, { message: "Chapter name is required." }),
    chapterFunction: z.string().max(80, { message: "Function is too long." }),
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
    staysWith: z.union([z.literal(""), z.string()]),
    languages: z.union([z.literal(""), z.string()]),
    tshirtsAmount: z.union([z.literal(""), z.string()]),
    tshirtsSize: z.union([z.literal(undefined), z.nativeEnum(TShirtsSizes)]),
    hasAgreedToPay: z
      .boolean({ message: "You must accept the condition." })
      .refine(
        (val) => {
          return val;
        },
        { message: "You must accept the condition." },
      ),
    hasAgreedToData: z
      .boolean({ message: "You must accept the condition." })
      .refine(
        (val) => {
          return val;
        },
        { message: "You must accept the condition." },
      ),
    hasAgreedToPicture: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.day !== "" && values.month !== "" && values.year !== "") {
      const parsedDate = parseISO(
        getISODate({
          day: values.day,
          month: values.month,
          year: values.year,
        }),
      );
      if (!isValid(parsedDate)) {
        ctx.addIssue({
          message: "The birthdate is invalid.",
          code: z.ZodIssueCode.custom,
          path: ["day"],
        });
      }
    }
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
