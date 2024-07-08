import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { services } from "@/constants/accommodations";
import { formatPrice } from "@/lib/utils";
import AccommodationsList, {
  AccommodationsListSkeleton,
} from "@/app/accommodations/AccommodationsList";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type AccommodationsProps = {
  searchParams?: {
    orderBy?: string;
    method?: string;
  };
};

export default function Accommodations({ searchParams }: AccommodationsProps) {
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Event Accommodations
            </h1>
            <p className="text-gray-500">
              Find the perfect accommodation for your stay at our upcoming
              event.
            </p>
            <p className="mt-4 text-gray-500">
              You will receive a link for the accommodation booking after your
              registration.
            </p>
          </div>
          <div className="overflow-x-auto">
            <Suspense fallback={<AccommodationsListSkeleton />}>
              <AccommodationsList searchParams={searchParams} />
            </Suspense>
            <div className="mt-4 text-sm text-muted-foreground">
              {`* There is a tourist tax of ${formatPrice(212)} per night.`}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Available services
            </h3>
            <p className="text-gray-500">Prices per stay, per person</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map(({ title, price, description }) => (
              <Card key={title}>
                <CardHeader size="sm">
                  <h3 className="font-semibold">{title}</h3>
                  {description && (
                    <div className="text-sm text-muted-foreground">
                      {description}
                    </div>
                  )}
                </CardHeader>
                <CardContent size="sm">
                  <div>{formatPrice(price)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Additional details
            </h1>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TicketIcon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">
                  The registration fee includes
                </h3>
              </div>
              <div className="ml-8 flex gap-2">
                <ul className="flex-1 list-inside list-disc">
                  <li>Banquet dinner</li>
                  <li>Thursday night</li>
                  <li>Live music</li>
                  <li>Surprise event</li>
                  <li>Welcome convention pack</li>
                  <li>Meeting costs</li>
                  <li>Sales Room</li>
                  <li>Free access to FUNPARK (swimming pool and fun ...)</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CoffeeIcon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Breakfast</h3>
              </div>
              <div className="ml-8 space-y-2">
                <p>
                  You can book a breakfast package. Prices are per person and
                  depend on the length of your stay.
                </p>
                <ul className="list-inside list-disc">
                  <li>{`7 days is ${formatPrice(7750)} for an adult and ${formatPrice(4250)} for a child 3-12yr (7x for the price of 5)`}</li>
                  <li>{`5 days is ${formatPrice(6200)} for an adult and ${formatPrice(3400)} for a child 3-12yr (5x for the price of 4)`}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <UtensilsIcon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Meals</h3>
              </div>
              <div className="ml-8 space-y-2">
                <p>
                  The diner on Wednesday and the banquet on Thursday are covered
                  with the registration Fee.
                </p>
                <p>
                  For the other meals there are 3 restaurants on site and a
                  supermarket. If you rent a house you have a kitchen and have
                  the possibility to book for a kitchen package.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CalendarCheckIcon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Program</h3>
              </div>
              <p className="ml-8">
                The program will be available later and distributed at the
                convention.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <PlaneIcon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Post Tour</h3>
              </div>
              <p className="ml-8">
                You asked for it, David Buckey and Celtic horizon tour prepared
                it for you. Any questions about this tour should be addressed to
                David. Belgium VIII does not handle this activity.
              </p>
              <div className="ml-4">
                <Link
                  href="post_tour_itenerary.pdf"
                  target="_blank"
                  prefetch={false}
                >
                  <Button variant="link">More information</Button>
                </Link>
                <Link
                  href="https://www.celtichorizontours.com/packages/post-convention-7-night-coach-tour/"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                >
                  <Button variant="link">Book tour</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function UtensilsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}
