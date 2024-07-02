import { getAllRegistrations } from "@/lib/api/registrations";
import { DataTable } from "@/app/admin/DataTable";

export default async function Admin() {
  const registrations = await getAllRegistrations();

  return (
    <div className="w-full text-center">
      <DataTable data={registrations} />
    </div>
  );
}
