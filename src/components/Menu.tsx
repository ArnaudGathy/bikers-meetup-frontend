"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import logo from "../../public/bel8_logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const pathname = usePathname();

  return (
    <header className="border-b py-2">
      <div className="mx-auto flex max-w-[1200px] justify-between px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink href={"/"} className="md:mr-6">
              <div className="flex min-h-[48px] min-w-[48px] gap-2">
                <Image
                  src={logo}
                  alt="Logo of the Blue Knight® Belgium 8 chapter"
                  width="48"
                  height="48"
                />
                <div className="hidden flex-col items-center justify-center font-medium md:flex">
                  <p className="text-lg font-bold leading-4 text-primary">
                    Blue Knights®
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    2025 International Convention
                  </p>
                </div>
              </div>
            </NavigationMenuLink>

            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname === "/register"}
                className={`${navigationMenuTriggerStyle()} flex gap-2`}
                href="/register"
              >
                Register
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname === "/accommodations"}
                className={`${navigationMenuTriggerStyle()} flex gap-2`}
                href="/accommodations"
              >
                Accommodations
              </NavigationMenuLink>
            </NavigationMenuItem>

            <Link
              className="flex gap-2 text-primary"
              href="https://maps.app.goo.gl/tvhvnLrYucrDGjq18"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              <Button variant="link">Location</Button>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="flex justify-end">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname === "/admin"}
                className={navigationMenuTriggerStyle()}
                href="/admin"
              >
                Admin
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
