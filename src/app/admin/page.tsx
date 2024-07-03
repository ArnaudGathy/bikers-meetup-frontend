import { getAllRegistrations } from "@/lib/api/registrations";
import { DataTable } from "@/app/admin/DataTable";
import PaginationFooter from "@/app/admin/PaginationFooter";
import SearchByName from "@/app/admin/SearchByName";

type AdminProps = {
  searchParams?: {
    currentPage?: string;
    name?: string;
  };
};

export default async function Admin({ searchParams }: AdminProps) {
  const registrations = await getAllRegistrations({
    currentPage: searchParams?.currentPage,
    name: searchParams?.name,
  });

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <SearchByName />
      <DataTable data={registrations} />
      <PaginationFooter total={registrations.total} />
    </div>
  );
}
