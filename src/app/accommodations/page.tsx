import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { services } from "@/constants/accommodations";
import { formatPrice } from "@/lib/utils";
import AccommodationsList, {
  AccommodationsListSkeleton,
} from "@/components/AccommodationsList";
import { Suspense } from "react";

export default function Accommodations() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Event Accommodations
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Find the perfect accommodation for your stay at our upcoming
              event.
            </p>
          </div>
          <div className="overflow-x-auto">
            <Suspense fallback={<AccommodationsListSkeleton />}>
              <AccommodationsList />
            </Suspense>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Available services
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
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
              Additionnal details
            </h1>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TicketIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">
                    The registration fee includes
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <ul className="flex-1 list-inside list-disc">
                    <li>Banquet dinner</li>
                    <li>Thursday night</li>
                    <li>Live music</li>
                    <li>Surprise event</li>
                  </ul>
                  <ul className="flex-1 list-inside list-disc">
                    <li>Welcome convention pack</li>
                    <li>Meeting costs</li>
                    <li>Sales Room</li>
                    <li>Free access to FUNPARK</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HandPlatterIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">
                    Meals &amp; Breakfast
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  The diner on wednesday and the banquet on thursday are covered
                  with the registration Fee.
                </p>
                <p>
                  You can book a breakfast package (4+1 free) for about 60€. For
                  the other meals there are 3 restaurants on site and a
                  supermarket. If you rent a house you have a kitchen and have
                  the possibility to book for a kitchen package.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarCheckIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Program</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  The program will be available later and distributed at the
                  convention.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PlaneIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Pre-Tour</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p>Informations will be available later.</p>
              </CardContent>
            </Card>
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

function HandPlatterIcon({ className }: { className?: string }) {
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
      <path d="M12 3V2" />
      <path d="M5 10a7.1 7.1 0 0 1 14 0" />
      <path d="M4 10h16" />
      <path d="M2 14h12a2 2 0 1 1 0 4h-2" />
      <path d="m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18" />
      <path d="M5 14v7H2" />
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
