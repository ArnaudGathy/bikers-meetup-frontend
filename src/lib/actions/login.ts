"use server";
import "server-only";
import { AuthError } from "next-auth";
import { signIn } from "@/../auth";

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return "Invalid credentials.";
        default:
          return "Something went wrong. Contact the website administrator.";
      }
    }
    throw error;
  }
}
