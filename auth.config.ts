import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      if (isLoggedIn) {
        if (isOnLoginPage) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }
      return !isOnAdmin;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
