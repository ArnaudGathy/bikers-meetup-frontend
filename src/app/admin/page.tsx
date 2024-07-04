import Registrations from "@/app/admin/Registrations";
import { Suspense } from "react";
import RegistrationSkeleton from "@/app/admin/RegistrationSkeleton";

export type RegistrationSearchParams = {
  currentPage?: string;
  name?: string;
  isUnpaid?: string;
  orderBy?: string;
  method?: "asc" | "desc";
};
export type AdminSearchParamsProps = {
  searchParams?: RegistrationSearchParams;
};

export default function Admin({ searchParams }: AdminSearchParamsProps) {
  return (
    <>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<RegistrationSkeleton />}
      >
        <Registrations searchParams={searchParams} />
      </Suspense>
    </>
  );
}
