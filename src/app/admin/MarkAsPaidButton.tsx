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
          <CheckIcon className="size-4" />
        </Button>
      </form>
    </div>
  );
}
