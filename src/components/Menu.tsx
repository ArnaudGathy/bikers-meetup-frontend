"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "../../public/bel8_logo.jpeg";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";

export default function Menu() {
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

            <MenuItem href="/register" label="Register" />
            <MenuItem href="/accommodations" label="Accommodations" />
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <MenuItem href="/admin" label="Admin" />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
