import type { Metadata } from "next";
import "./globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { GeistSans } from "geist/font/sans";
import Menu from "@/components/Menu";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Blue Knights - 2025 International Convention",
  description:
    "The officiel website of the 2025 International Convention of the Blue Knights MC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} overflow-y-scroll`}>
        <Menu />
        <main className="mx-auto max-w-[1200px] p-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
