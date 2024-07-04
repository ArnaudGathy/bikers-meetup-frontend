import { getAllRegistrations } from "@/lib/api/registrations";
import Filters from "@/app/admin/Filters";
import { DataTable } from "@/app/admin/DataTable";
import PaginationFooter from "@/app/admin/PaginationFooter";
import { AdminSearchParamsProps } from "@/app/admin/page";

export default async function Registrations({
  searchParams,
}: AdminSearchParamsProps) {
  const registrations = await getAllRegistrations(searchParams ?? {});

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Filters />
      <DataTable data={registrations} />
      <PaginationFooter total={registrations.total} />
    </div>
  );
}
