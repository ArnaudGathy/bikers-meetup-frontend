"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

type MenuItemProps = {
  href: string;
  label: string;
};

export default function MenuItem({ href, label }: MenuItemProps) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        active={pathname === href}
        className={`${navigationMenuTriggerStyle()} flex gap-2`}
        href={href}
      >
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
