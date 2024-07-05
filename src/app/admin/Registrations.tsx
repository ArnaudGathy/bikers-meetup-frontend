import { getRegistrations } from "@/lib/api/registrations";
import Filters from "@/app/admin/Filters";
import { DataTable } from "@/app/admin/DataTable";
import PaginationFooter from "@/app/admin/PaginationFooter";
import { AdminSearchParamsProps } from "@/app/admin/page";
import ExportAsCSVButton from "@/app/admin/ExportAsCSVButton";

export default async function Registrations({
  searchParams,
}: AdminSearchParamsProps) {
  const registrations = await getRegistrations(searchParams ?? {});

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full justify-between gap-2">
        <Filters />
        <ExportAsCSVButton />
      </div>
      <DataTable data={registrations} />
      <PaginationFooter total={registrations.total} />
    </div>
  );
}
