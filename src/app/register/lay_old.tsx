import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/register/SideNavBar";

const sidebarNavItems = [
  {
    title: "1. Personal information",
    href: "/register#information",
  },
  {
    title: "2. Address",
    href: "/register#address",
  },
  {
    title: "3. Emergency contact",
    href: "/register#contact",
  },
  {
    title: "4. Club information",
    href: "/register#club",
  },
  {
    title: "5. Booking",
    href: "/register#accommodation",
  },
  {
    title: "6. Agreements",
    href: "/register#agreements",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Register</h1>
        <p className="text-gray-500">
          Please fill out the form below to register to the 2025 International
          Convention.
        </p>
        <p className="mt-4 text-gray-500">
          You will receive a link for the accommodation booking by mail after
          your registration.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div>
          <aside className="sticky top-4 mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
        </div>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
