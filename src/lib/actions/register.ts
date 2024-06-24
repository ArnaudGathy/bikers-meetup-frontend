"use server";
import "server-only";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export const register = async (prevState: FormState, data: FormData) => {
  const values = Object.fromEntries(data);
  // eslint-disable-next-line no-console
  console.log("values", values);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: "Registered" };
};
