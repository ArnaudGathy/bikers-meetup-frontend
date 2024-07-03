import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  REGISTRATION_FEE,
  T_SHIRT_UNIT_PRICE,
} from "@/constants/accommodations";
import { auth } from "@/../auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throwIfUnauthorized = async () => {
  const session = await auth();
  if (session === null) {
    throw new Error("Not authorized");
  }
  return true;
};

export const formatPrice = (price: number) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);

export const getISODate = ({
  day,
  month,
  year,
}: {
  day: string;
  month: string;
  year: string;
}) => {
  return `${year}-${month}-${day}`;
};

export const getTshirtsTotal = (tshirtsAmount: string | number | null) =>
  Number(tshirtsAmount || 0) * T_SHIRT_UNIT_PRICE;

export const getTotal = (tshirtsAmount: string | number | null) =>
  getTshirtsTotal(tshirtsAmount) + REGISTRATION_FEE;
