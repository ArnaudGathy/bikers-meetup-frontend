"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";

const tableHeaders = [
  { name: "Accommodation Type", width: "220px", fieldName: "name" },
  { name: "Available at start", width: "180px", fieldName: "available" },
  { name: "Separate beds", width: "150px", fieldName: "beds" },
  { name: "Price Sun-Thu", width: "150px", fieldName: "price1" },
  { name: "Price Fri-Sat", width: "150px", fieldName: "price2" },
  { name: "Details", width: "150px", fieldName: "ref" },
];

export default function AccommodationsTableHeaders() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  const existingOrderBy = params.get("orderBy");
  const existingMethod = params.get("method");

  const handleRowFilterClick = (fieldName: string) => {
    if (existingOrderBy === fieldName) {
      if (existingMethod === "asc") {
        params.set("method", "desc");
      } else {
        params.delete("orderBy");
        params.delete("method");
      }
    } else {
      params.set("orderBy", fieldName);
      params.set("method", "asc");
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const getChevronIcon = (fieldName: string) => {
    if (!existingOrderBy) {
      return <ChevronUpDownIcon className="size-4" />;
    } else if (existingOrderBy === fieldName) {
      if (existingMethod === "asc") {
        return <ChevronUpIcon className="size-4" />;
      }
      if (existingMethod === "desc") {
        return <ChevronDownIcon className="size-4" />;
      }
    }
  };

  return (
    <thead className="bg-secondary">
      <tr>
        {tableHeaders.map(({ name, width, fieldName }) => (
          <th
            key={name}
            className="cursor-pointer px-4 py-3 text-left font-medium"
            style={{ width }}
            onClick={() => handleRowFilterClick(fieldName)}
          >
            <div className="flex items-center gap-2">
              {name}
              {getChevronIcon(fieldName)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
