import Image from "next/image";
import logo from "../../public/convention_logo.png";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpenIcon,
  CalendarIcon,
  HomeModernIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

const Bullet = ({
  title,
  children,
}: {
  title: ReactNode;
  children?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <CheckIcon className="mt-0.5 size-5 min-w-5" />
        <p className="text-md font-bold">{title}</p>
      </div>
      {children && <p className="ml-7 text-muted-foreground">{children}</p>}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-8 text-center">
          <div>
            <p className="text-6xl font-extrabold text-primary drop-shadow-md">
              Blue Knights®
            </p>
            <p className="text-2xl font-bold text-muted-foreground">
              2025 International Convention
            </p>
          </div>
          <div className="flex justify-around gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-6 text-muted-foreground" />
                <span className="mt-0.5 text-muted-foreground">
                  Event Dates
                </span>
              </div>
              <div className="font-extrabold text-primary">
                June 29 - July 4, 2025
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-2">
                <MapPinIcon className="size-6 text-muted-foreground" />
                <span className="mt-0.5 text-muted-foreground">
                  Event Location
                </span>
              </div>
              <div className="font-extrabold text-primary">
                <Link
                  href="https://maps.app.goo.gl/tvhvnLrYucrDGjq18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  prefetch={false}
                >
                  Sunparks Kempense Meren
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl">
              Hello dear sisters and brothers, it is with great pleasure that we
              will welcome you for the 51st birthday of our great club.
            </p>
            <p className="text-md">
              Welcome and thank you for the interest you show to this great
              event.
            </p>
          </div>
        </div>
        <Image
          className="hidden md:block md:min-w-[550px]"
          src={logo}
          alt="Logo of the 2025 Blue Knights® International Convention"
          width="550"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="mb-2 border-b pb-1 text-xl font-semibold">
          Please read the important information below
        </h3>
        <Bullet
          title={
            <>
              We hope that you will{" "}
              <Link className="text-primary hover:underline" href="/register">
                book
              </Link>{" "}
              before 1st December 2024
            </>
          }
        >
          {`We have an agreement with Sunpark vacation center, if we can reach 300
          accommodations bookings then the entire park will be for us. There are
          489 accommodations that can accept up to 2669 members. After this date
          Sunpark can slightly raise the prices for accommodations if we don't
          reach the 300.`}
        </Bullet>
        <Bullet
          title={
            <>
              We would like to ask if you agree to share your{" "}
              <Link
                className="text-primary hover:underline"
                href="/accommodations"
              >
                accommodations
              </Link>{" "}
              with other members
            </>
          }
        >
          {`To get a lot of sisters and brothers there, in case all the 489
          accommodations are booked. As there is no stranger in the Blue Knights,
          it shouldn't be a problem.`}
        </Bullet>
        <Bullet title="We will share more info during this year">
          {`We will have a presentation at the international convention, at the
          UK/IC convention and at the EC convention.`}
        </Bullet>
        <Bullet
          title={
            <>
              We have tried to get the lowest{" "}
              <Link
                className="text-primary hover:underline"
                href="/accommodations"
              >
                price
              </Link>{" "}
              possible for good quality services and accommodations
            </>
          }
        >
          {`Which is why we decided to move the convention from the city of
          Brussels to the city of Mol (in Belgium) and to change the dates as
          well.`}
        </Bullet>
        <Bullet
          title={
            <>
              The official start date for{" "}
              <Link className="text-primary hover:underline" href="/register">
                booking
              </Link>{" "}
              will be on the 23rd of July 2024.
            </>
          }
        />
        <Bullet
          title={
            <>
              Please send any additional question to{" "}
              <a
                className="text-primary hover:underline"
                href="mailto:international.convention.2025@gmail.com"
              >
                international.convention.2025@gmail.com
              </a>
            </>
          }
        />
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Button size="xxl" className="flex gap-2" disabled>
          <BookOpenIcon className="size-6" />
          Register
        </Button>
        <Link href="/accommodations">
          <Button size="xxl" variant="secondary" className="flex gap-2">
            <HomeModernIcon className="size-6" />
            See accommodations
          </Button>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://calendar.google.com/calendar/u/0?cid=ZWMwMmEyY2QxZjMyZmRjYjMyYWVmMmI0ZTRhMjQyOTczYzRjMDE4MmY2MDdkZTYzM2ZlODUzYWU1MmIwZjdhYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
        >
          <Button size="xxl" variant="secondary" className="flex gap-2">
            <CalendarIcon className="size-6" />
            Event planning
          </Button>
        </Link>
      </div>
    </div>
  );
}
