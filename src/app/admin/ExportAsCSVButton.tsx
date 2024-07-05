"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { getAllRegistration } from "@/lib/actions/register";
import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader";
import { formatISO } from "date-fns";
import { toast } from "sonner";

const DownloadButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="flex gap-2" disabled={pending}>
      {pending ? <Loader /> : <ArrowDownTrayIcon className="size-5" />}
      Export as CSV
    </Button>
  );
};

export default function ExportAsCSVButton() {
  const handleAction = async () => {
    try {
      const registrationCSV = await getAllRegistration();

      const blob = new Blob([registrationCSV], {
        type: "text/csv;charset=utf-8",
      });
      const csvURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = csvURL;
      link.download = `registrations_${formatISO(new Date())}.csv`; // Set desired filename
      link.click();
      window.URL.revokeObjectURL(csvURL);
      toast("CSV generated. The download should start automatically.");
    } catch (e) {
      console.error(e);
      toast("Could not generate the CSV. Please contact the administrator.");
    }
  };

  return (
    <form action={handleAction}>
      <DownloadButton />
    </form>
  );
}
