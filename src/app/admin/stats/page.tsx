import Stats from "@/app/admin/Stats";

export default function Statistics() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
      <Stats />
    </div>
  );
}
