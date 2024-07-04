import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Registration } from "@prisma/client";
import { ReactNode } from "react";
import { format } from "date-fns";
import CountryFlag from "@/components/CountryFlag";
import {
  bookingModeTranslation,
  travelModeTranslation,
  tShirtSizeTranslation,
} from "@/lib/schemas/registerFormSchema";

const InformationRow = ({
  title,
  value,
}: {
  title: string;
  value: ReactNode;
}) => (
  <div>
    <div className="text-[16px] text-muted-foreground">{title}</div>
    <div className="text-black">{value}</div>
  </div>
);

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
            <div className="flex gap-2">
              <div>
                Details about{" "}
                <span className="text-primary">{`${selectedRow.name}`}</span>
              </div>
            </div>
            <div className="!text-sm !font-medium text-muted-foreground">
              ID {selectedRow.id}
            </div>
          </SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-col gap-4">
              <InformationRow
                title="Registered at"
                value={format(selectedRow.createdAt, "PPpp")}
              />
              <InformationRow title="Email" value={selectedRow.email} />
              <InformationRow title="Phone number" value={selectedRow.phone} />
              <InformationRow
                title="Birthdate"
                value={format(selectedRow.birthdate, "P")}
              />
              <InformationRow
                title="Address"
                value={
                  <div>
                    <div>
                      {" "}
                      {selectedRow.street}, {selectedRow.number}{" "}
                      {selectedRow.box ? `box ${selectedRow.box}` : ""}
                    </div>
                    <div className="flex gap-1">
                      <CountryFlag country={selectedRow.country} />
                      {selectedRow.country} {selectedRow.city} {selectedRow.zip}
                    </div>
                  </div>
                }
              />
              <InformationRow
                title="Emergency contact"
                value={
                  <div>
                    <div>{selectedRow.emergencyName}</div>
                    <div>{selectedRow.emergencyPhone}</div>
                  </div>
                }
              />
              <InformationRow
                title="Chapter"
                value={
                  <div className="flex gap-1">
                    <CountryFlag country={selectedRow.country} />
                    {selectedRow.chapter} {selectedRow.chapterFunction}
                  </div>
                }
              />
              {(selectedRow.brand ||
                selectedRow.model ||
                selectedRow.licencePlate) && (
                <InformationRow
                  title="Motorcycle"
                  value={
                    <div>
                      {selectedRow.brand ?? ""} {selectedRow.model ?? ""}{" "}
                      {selectedRow.licencePlate ?? ""}
                    </div>
                  }
                />
              )}
              <InformationRow
                title="Travel mode"
                value={travelModeTranslation[selectedRow.travelMode]}
              />
              <InformationRow
                title="Accommodation"
                value={
                  <div>
                    <div>{bookingModeTranslation[selectedRow.booking]}</div>
                    <div>
                      {selectedRow.willShareRoom
                        ? "✅ Accepted to share room"
                        : "❌ Denied to share room"}
                    </div>
                  </div>
                }
              />

              {selectedRow.staysWith && (
                <InformationRow
                  title="Stays with"
                  value={selectedRow.staysWith}
                />
              )}

              {selectedRow.languages && (
                <InformationRow
                  title="Languages"
                  value={selectedRow.languages}
                />
              )}

              {!!selectedRow.tshirtsAmount && selectedRow.tshirtsSize && (
                <InformationRow
                  title="Tshirts"
                  value={
                    <div>
                      Tshirts {tShirtSizeTranslation[selectedRow.tshirtsSize]} x{" "}
                      {selectedRow.tshirtsAmount}
                    </div>
                  }
                />
              )}

              <InformationRow
                title="Has aggreed to share pictures on Facebook ?"
                value={selectedRow.hasAgreedToPicture ? "✅ Yes" : "❌ No"}
              />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
