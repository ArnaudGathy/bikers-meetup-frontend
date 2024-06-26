import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader";

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <Loader />}
      Sign in
    </Button>
  );
}
