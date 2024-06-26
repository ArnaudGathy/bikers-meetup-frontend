import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Menu from "@/components/Menu";
import { Toaster } from "@/components/ui/sonner";
import { enUS } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";

setDefaultOptions({ locale: enUS });

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
      <body className={`${GeistSans.className} overflow-scroll`}>
        <Menu />
        <main className="mx-auto max-w-[1200px] p-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
