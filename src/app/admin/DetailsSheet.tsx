import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Registration } from "@prisma/client";

export default function DetailsSheet({
  selectedRow,
}: {
  selectedRow: Registration | null;
}) {
  if (!selectedRow) {
    return null;
  }

  return (
    <SheetContent className="w-[600px]">
      <SheetHeader>
        <SheetTitle>
          Details about{" "}
          <span className="text-primary">{`${selectedRow?.firstName} ${selectedRow?.lastName}`}</span>
        </SheetTitle>
        <SheetDescription asChild>
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
