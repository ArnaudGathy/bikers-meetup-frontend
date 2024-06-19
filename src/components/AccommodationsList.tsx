import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { getAllAccommodations } from "@/lib/api/accommodations";
import { Skeleton } from "@/components/ui/skeleton";
import AccommodationsTableHeaders from "@/components/AccommodationsTableHeaders";
import { Suspense } from "react";

type AccommodationsListProps = {
  searchParams?: {
    orderBy?: string;
    method?: string;
  };
};

export default async function AccommodationsList({
  searchParams,
}: AccommodationsListProps) {
  const accommodationsList = await getAllAccommodations({
    orderBy: searchParams?.orderBy,
    method: searchParams?.method,
  });

  return (
    <table className="w-full table-auto">
      <Suspense>
        <AccommodationsTableHeaders />
      </Suspense>
      <tbody className="divide-y divide-border">
        {accommodationsList.map(
          ({ ref, link, name, beds, available, price1, price2 }) => (
            <tr key={ref} className="hover:bg-muted">
              <td className="px-4 py-3">{name}</td>
              <td className="px-4 py-3">{available}</td>
              <td className="px-4 py-3">{beds}</td>
              <td className="px-4 py-3">{formatPrice(price1)}</td>
              <td className="px-4 py-3">{formatPrice(price2)}</td>
              <td className="px-4 py-3 font-medium">
                <Link
                  href={link}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                >
                  {ref}
                </Link>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

export const AccommodationsListSkeleton = () => {
  return (
    <table className="w-full table-auto">
      <Suspense>
        <AccommodationsTableHeaders />
      </Suspense>
      <tbody className="divide-y divide-border">
        {Array.from({ length: 9 }).map((_, index) => (
          <tr key={index} className="hover:bg-muted">
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[80px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[80px] rounded-full" />
            </td>
            <td className="px-4 py-3 font-medium">
              <Skeleton className="h-[24px] w-[70px] rounded-full" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
