"use client";

import { useSorting } from "@/hooks/useSorting";

const tableHeaders = [
  { name: "Accommodation Type", width: "250px", fieldName: "name" },
  { name: "Available at start", width: "180px", fieldName: "available" },
  { name: "Separate beds", width: "150px", fieldName: "beds" },
  { name: "Price Sun-Thu", width: "150px", fieldName: "price1" },
  { name: "Price Fri-Fri", width: "150px", fieldName: "price2" },
  { name: "Details", width: "100px", fieldName: "ref" },
];

export default function AccommodationsTableHeaders() {
  const { getChevronIcon, handleRowFilterClick } = useSorting();

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
