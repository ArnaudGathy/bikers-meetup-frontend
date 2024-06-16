import Image from "next/image";
import logo from "../../public/convention_logo.png";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const Bullet = ({ title, children }: { title: string; children?: string }) => {
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
            <p className="text-6xl text-primary drop-shadow-md">
              Blue Knights®
            </p>
            <p className="text-2xl text-muted-foreground">
              2025 International Convention
            </p>
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
          src={logo}
          alt="Logo of the 2025 Blue Knights® International Convention"
          height="400"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="mb-2 border-b pb-1 text-xl font-semibold">
          Please read the important information below
        </h3>
        <Bullet title="We hope that you will book before 1st December 2024">
          {`We have an agreement with Sunpark vacation center, if we can reach 300
          accomodations bookings then the entire park will be for us. There are
          489 accomodations that can accept up to 2669 members. After this date
          Sunpark can slightly raise the prices for accomodations if we don't
          reach the 300.`}
        </Bullet>
        <Bullet title="We would like to ask if you agree to share your accomodations with other members">
          {`To get a lot of sisters and brothers there, in case all the 489
          accomodations are booked. As there is no stranger in the Blue Knights,
          it shouldn't be a problem.`}
        </Bullet>
        <Bullet title="We will share more info during this year">
          {`We will have a presentation at the international convention, at the
          UK/IC convention and at the EC convention.`}
        </Bullet>
        <Bullet title="We have tried to get the lowest price possible for good quality services and accomodations">
          {`Which is why we decided to move the convention from the city of
          Brussels to the city of Mol (in Belgium) and to change the dates as
          well.`}
        </Bullet>
        <Bullet title="The official start date for booking will be on the 23rd of July 2024." />
      </div>

      <div className="flex gap-4">
        <Link href="/register">
          <Button size="xxl">Register</Button>
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="mailto:international.convention.2025@gmail.com">
                <Button variant="secondary" size="xxl">
                  Contact us
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>international.convention.2025@gmail.com</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
