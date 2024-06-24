import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page";
import { formatPrice } from "@/lib/utils";
import {
  REGISTRATION_FEE,
  T_SHIRT_UNIT_PRICE,
} from "@/constants/accommodations";
import Loader from "@/components/Loader";
import { BookingModes } from "@/lib/schemas/RegisterFormSchema";

export default function TotalAndSubmitForm({
  form,
  isLoading,
}: {
  form: UseFormReturn<RegisterForm>;
  isLoading: boolean;
}) {
  const amount = Number(form.watch("tshirtsAmount"));
  const isBooking = form.watch("booking") === BookingModes.YES;
  const tshirtsTotal = amount * T_SHIRT_UNIT_PRICE;
  const hasTshirts = amount > 0;

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>Registration fee</div>
            <div>{formatPrice(REGISTRATION_FEE)}</div>
          </div>
          {hasTshirts && (
            <div className="flex items-center justify-between">
              <div>{`${amount} x T-shirt`}</div>
              <div>{formatPrice(tshirtsTotal)}</div>
            </div>
          )}
          <Separator />
          {hasTshirts && (
            <div className="flex items-center justify-between font-medium">
              <div>Total</div>
              <div>{formatPrice(tshirtsTotal + REGISTRATION_FEE)}</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {isBooking && (
            <div className="text-sm text-muted-foreground">
              You will receive an email of confirmation after the registration,
              containing the information to book and pay your accommodation.
            </div>
          )}
          <Button
            type="submit"
            className="flex w-full gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader />}
            Complete registration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
