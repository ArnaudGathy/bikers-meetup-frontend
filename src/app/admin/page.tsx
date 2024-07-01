import { getAllRegistrations } from "@/lib/api/registrations";

export default async function Admin() {
  const registrations = await getAllRegistrations();

  return (
    <div className="w-full text-center">
      <pre>{JSON.stringify(registrations, null, 2)}</pre>
    </div>
  );
}
