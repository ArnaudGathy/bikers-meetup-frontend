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

const routes = [
  { to: "/register", label: "Register" },
  { to: "/accomodations", label: "Accomodations" },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <header className="border-b py-2">
      <div className="mx-auto flex max-w-[1200px] justify-between px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink href={"/"} className="mr-6">
              <div className="flex gap-2">
                <Image
                  src={logo}
                  alt="Logo of the Blue Knight® Belgium 8 chapter"
                  width="48"
                />
                <div className="flex flex-col items-center justify-center font-medium">
                  <p className="text-lg font-bold leading-4">Blue Knights®</p>
                  <p className="text-[10px] text-muted-foreground">
                    2025 International Convention
                  </p>
                </div>
              </div>
            </NavigationMenuLink>
            {routes.map(({ to, label }) => (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink
                  active={pathname === to}
                  className={`${navigationMenuTriggerStyle()} flex gap-2`}
                  href={to}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
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
