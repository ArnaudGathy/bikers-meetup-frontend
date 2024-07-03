import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Registration } from "@prisma/client";

export default function DetailsSheet({
  selectedRow,
  setSelectedRow,
}: {
  selectedRow: Registration | null;
  setSelectedRow: (row: Registration | null) => void;
}) {
  if (!selectedRow) {
    return null;
  }

  return (
    <Sheet
      open={!!selectedRow}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedRow(null);
        }
      }}
    >
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>
            Details about{" "}
            <span className="text-primary">{`${selectedRow.name}`}</span>
          </SheetTitle>
          <SheetDescription asChild>
            <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
