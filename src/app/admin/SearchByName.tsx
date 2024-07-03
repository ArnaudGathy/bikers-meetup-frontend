"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchByName() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleChange = useDebouncedCallback((search: string) => {
    params.set("name", search);
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <Input
      className="max-w-[300px] self-start"
      placeholder="Search by name ..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
