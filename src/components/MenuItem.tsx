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
  extraMatchingRoutes?: string[];
};

export default function MenuItem({
  href,
  label,
  extraMatchingRoutes = [],
}: MenuItemProps) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        active={[...extraMatchingRoutes, href].includes(pathname)}
        className={`${navigationMenuTriggerStyle()} flex gap-2`}
        href={href}
      >
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
