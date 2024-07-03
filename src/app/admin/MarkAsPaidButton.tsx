import { setAsPaid } from "@/lib/actions/register";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";

export default function MarkAsPaidButton({
  id,
  field,
}: {
  id: number;
  field: "hasPaidRegistration" | "hasPaidAccommodation";
}) {
  const setPaid = setAsPaid.bind(null, id, field);

  return (
    <div>
      <form action={setPaid}>
        <Button type="submit" size="xs" variant="outline">
          <CheckIcon className="mr-1 size-4 text-green-500" /> Check
        </Button>
      </form>
    </div>
  );
}
