import { setAsPaid } from "@/lib/actions/register";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader";

const ButtonWithLoader = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="xs" variant="outline" disabled={pending}>
      {pending ? (
        <Loader />
      ) : (
        <CheckIcon className="mr-1 size-4 text-green-500" />
      )}
      Check
    </Button>
  );
};

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
      <form
        action={async () => {
          // eslint-disable-next-line
          console.info(
            "Set as paid button clicked from ",
            JSON.stringify(2, null, window.navigator.userAgent),
          );
          await setPaid();
        }}
      >
        <ButtonWithLoader />
      </form>
    </div>
  );
}
