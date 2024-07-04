"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  const updateParams = () => {
    params.set("currentPage", "0");
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleSearchParams = useDebouncedCallback((search: string) => {
    if (search !== "") {
      params.set("name", search);
    } else {
      params.delete("name");
    }

    updateParams();
  }, 1000);

  const handleIsUnpaidChange = useDebouncedCallback((isChecked: boolean) => {
    if (isChecked) {
      params.set("isUnpaid", isChecked.toString());
    } else {
      params.delete("isUnpaid");
    }

    updateParams();
  }, 300);

  return (
    <div className="flex w-full gap-4">
      <Input
        className="w-[200px]"
        defaultValue={params.get("name") ?? ""}
        placeholder="Search by name ..."
        onChange={(e) => handleSearchParams(e.target.value)}
      />

      <div className="flex items-center space-x-2">
        <Switch
          id="isUnpaid"
          defaultChecked={params.get("isUnpaid") === "true"}
          onCheckedChange={handleIsUnpaidChange}
        />
        <Label htmlFor="isUnpaid">Show only unpaid</Label>
      </div>
    </div>
  );
}
