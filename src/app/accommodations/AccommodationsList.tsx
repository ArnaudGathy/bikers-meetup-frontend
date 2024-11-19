import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import AccommodationsTableHeaders from "@/app/accommodations/AccommodationsTableHeaders";
import { Suspense } from "react";
import { accommodationSortingSchema } from "@/constants/accommodations";
import { isNumber, isString } from "remeda";
import styles from "./accommodationsList.module.css";
import { clsx } from "clsx";

type AccommodationType = {
  id: number;
  ref: string;
  link: string;
  name: string;
  beds: number;
  available: number;
  price1: number;
  price2: number;
  isSoldOut?: boolean;
};

const accommodationsList: AccommodationType[] = [
  {
    id: 1,
    ref: "KM535",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/select/4-persons/km535",
    name: "Select vacation House",
    beds: 4,
    available: 121,
    price1: 61688,
    price2: 74026,
  },
  {
    id: 2,
    ref: "KM536",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/select/6-persons/km536",
    name: "Select vacation House",
    beds: 6,
    available: 144,
    price1: 71008,
    price2: 85210,
  },
  {
    id: 3,
    ref: "KM537",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/select/8-persons/km537",
    name: "Select vacation House",
    beds: 8,
    available: 122,
    price1: 82488,
    price2: 98986,
  },
  {
    id: 4,
    ref: "KM547",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/select/5-persons/km547",
    name: "Select vacation House",
    beds: 5,
    available: 15,
    price1: 68508,
    price2: 82210,
  },
  {
    id: 5,
    ref: "KM543",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/select/10-persons/km543",
    name: "Select vacation House",
    beds: 10,
    available: 4,
    price1: 122008,
    price2: 146410,
  },
  {
    id: 6,
    ref: "KM531",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/exclusive/2-persons/km531",
    name: "Exclusive vacation House",
    beds: 2,
    available: 11,
    price1: 51688,
    price2: 62026,
    isSoldOut: true,
  },
  {
    id: 7,
    ref: "KM532",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/exclusive/4-persons/km532",
    name: "Exclusive vacation House",
    beds: 4,
    available: 12,
    price1: 71048,
    price2: 85258,
    isSoldOut: true,
  },
  {
    id: 8,
    ref: "KM533",
    link: "https://www.parkexplorer.uk/kempense-meren/cottage/exclusive/6-persons/km533",
    name: "Exclusive vacation House",
    beds: 6,
    available: 10,
    price1: 87568,
    price2: 105082,
    isSoldOut: true,
  },
  {
    id: 9,
    ref: "KM546",
    link: "https://www.parkexplorer.uk/kempense-meren/hotelroom/exclusive/2-persons/km546",
    name: "2 separate Beds Hotel room",
    beds: 2,
    available: 50,
    price1: 40148,
    price2: 48202,
    isSoldOut: true,
  },
];

type AccommodationsListProps = {
  searchParams?: {
    orderBy?: string;
    method?: string;
  };
};

export default function AccommodationsList({
  searchParams,
}: AccommodationsListProps) {
  const validation = accommodationSortingSchema.safeParse(searchParams);

  const sortedList = validation.success
    ? accommodationsList.sort((a, b) => {
        const { method, orderBy } = validation.data;
        if (method && orderBy) {
          const left = a[orderBy];
          const right = b[orderBy];
          if (isString(left) && isString(right)) {
            if (method === "asc") {
              return left.localeCompare(right);
            }
            return right.localeCompare(left);
          }
          if (isNumber(left) && isNumber(right)) {
            if (method === "asc") {
              return left - right;
            }
            return right - left;
          }
        }
        return 0;
      })
    : accommodationsList;

  return (
    <table className="w-full table-auto">
      <Suspense>
        <AccommodationsTableHeaders />
      </Suspense>
      <tbody className="divide-y divide-border">
        {sortedList.map(
          ({ ref, link, name, beds, available, price1, price2, isSoldOut }) => (
            <tr
              key={ref}
              className={clsx("hover:bg-muted", {
                [styles.strikethrough]: isSoldOut,
              })}
            >
              <td className="px-4 py-3">{name}</td>
              <td className="px-4 py-3">{available}</td>
              <td className="px-4 py-3">{beds}</td>
              <td className="px-4 py-3">{formatPrice(price1)}</td>
              <td className="px-4 py-3">{formatPrice(price2)}</td>
              <td className="px-4 py-3 font-medium">
                {isSoldOut ? (
                  "Sold out!"
                ) : (
                  <Link
                    href={link}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    {ref}
                  </Link>
                )}
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
              <Skeleton className="h-[24px]" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px]" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px]" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[80px]" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[80px]" />
            </td>
            <td className="px-4 py-3 font-medium">
              <Skeleton className="h-[24px] w-[70px]" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
