import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { getAllAccommodations } from "@/lib/api/accommodations";
import { Skeleton } from "@/components/ui/skeleton";

const tableHeaders = [
  { name: "Accommodation Type", width: "300px" },
  { name: "Available at start", width: "150px" },
  { name: "Separate beds", width: "150px" },
  { name: "Price Sun-Thu", width: "150px" },
  { name: "Price Fri-Sat", width: "150px" },
  { name: "Details", width: "150px" },
];

const TableHeaders = () => {
  return (
    <thead className="bg-secondary">
      <tr>
        {tableHeaders.map(({ name, width }) => (
          <th
            key={name}
            className="px-4 py-3 text-left font-medium"
            style={{ width }}
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default async function AccommodationsList() {
  const accommodationsList = await getAllAccommodations();

  return (
    <table className="w-full table-auto">
      <TableHeaders />
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
                  See details
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
      <TableHeaders />
      <tbody className="divide-y divide-border">
        {Array.from({ length: 9 }).map((_, index) => (
          <tr key={index} className="hover:bg-muted">
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[220px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[40px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[100px] rounded-full" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-[24px] w-[100px] rounded-full" />
            </td>
            <td className="px-4 py-3 font-medium">
              <Skeleton className="h-[24px] w-[100px] rounded-full" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
