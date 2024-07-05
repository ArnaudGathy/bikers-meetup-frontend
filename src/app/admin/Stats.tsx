import { Suspense } from "react";
import Total from "@/app/admin/(card)/Total";
import Accommodations from "@/app/admin/(card)/Accommodations";
import Tshirts from "@/app/admin/(card)/Tshirts";
import Age from "@/app/admin/(card)/Age";
import Countries from "@/app/admin/(card)/Countries";
import Motorcycle from "@/app/admin/(card)/Motorcycle";
import {
  LowerCardSkeleton,
  UpperCardSkeleton,
} from "@/app/admin/(card)/CardSkeleton";

export default function Stats() {
  return (
    <div className="mt-4 grid grid-cols-4 gap-4">
      <Suspense fallback={<UpperCardSkeleton />}>
        <Total />
      </Suspense>
      <Suspense fallback={<UpperCardSkeleton />}>
        <Accommodations />
      </Suspense>
      <Suspense fallback={<LowerCardSkeleton lines={1} />}>
        <Tshirts />
      </Suspense>
      <Suspense fallback={<LowerCardSkeleton lines={2} />}>
        <Age />
      </Suspense>
      <Suspense fallback={<LowerCardSkeleton lines={3} />}>
        <Countries />
      </Suspense>
      <Suspense fallback={<LowerCardSkeleton lines={1} />}>
        <Motorcycle />
      </Suspense>
    </div>
  );
}
