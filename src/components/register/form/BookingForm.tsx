import FormPartTitle from "@/components/register/FormPartTitle";
import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import FormFieldCheckbox from "@/components/register/form/fields/FormFieldCheckbox";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingModes } from "@/lib/schemas/registerFormSchema";

const getModeText = (mode: BookingModes) => {
  switch (mode) {
    case BookingModes.YES:
      return "Yes";
    case BookingModes.NO:
      return "No";
    case BookingModes.WITH_SOMEONE:
      return "I am staying with someone who is booking an accommodation";
  }
};

export default function BookingForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  const bookingMode = form.watch("booking");
  const isBooking =
    bookingMode === BookingModes.YES ||
    bookingMode === BookingModes.WITH_SOMEONE;
  const isStayingWithSomeone = bookingMode === BookingModes.WITH_SOMEONE;

  return (
    <div>
      <FormPartTitle title="5. Booking" id="accommodation" />

      <div className="space-y-8">
        <FormField
          control={form.control}
          name="booking"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel required>
                Do you want to book an accommodation ?
              </FormLabel>
              {bookingMode === BookingModes.YES && (
                <FormDescription className="text-primary">
                  You will receive an email of confirmation after the
                  registration, containing the information to book and pay your
                  accommodation.
                </FormDescription>
              )}
              <FormControl>
                <RadioGroup
                  className="flex flex-col gap-2"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {Object.values(BookingModes).map((mode) => (
                    <FormItem key={mode}>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value={mode} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {getModeText(mode)}
                        </FormLabel>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormFieldCheckbox
          form={form}
          name="willShareRoom"
          label="I agree to share the free rooms in my accommodation in exchange of payment for those"
          description="We want to welcome most of the brothers who want to come, if all accommodations are booked."
          asCard={false}
          disabled={!isBooking}
        />
        <FormFieldInput
          reactForm={form}
          name="staysWith"
          label="Name of the person who booked the accommodation"
          disabled={!isStayingWithSomeone}
          required={isStayingWithSomeone}
        />
        <FormFieldInput
          reactForm={form}
          name="languages"
          label="Which languages do you speak ?"
          placeholder="English, French, Italian"
          disabled={!isBooking}
          required={isBooking}
        />

        {/* Disabled t-shirts sales before the event */}
        {/*<div className="flex gap-4">*/}
        {/*  <FormField*/}
        {/*    control={form.control}*/}
        {/*    name="tshirtsAmount"*/}
        {/*    render={({ field }) => (*/}
        {/*      <FormItem className="w-full">*/}
        {/*        <FormLabel>T-shirts</FormLabel>*/}
        {/*        <Select*/}
        {/*          onValueChange={field.onChange}*/}
        {/*          defaultValue={field.value}*/}
        {/*        >*/}
        {/*          <FormControl>*/}
        {/*            <SelectTrigger*/}
        {/*              className={cn({ "text-muted-foreground": !field.value })}*/}
        {/*            >*/}
        {/*              <SelectValue placeholder="Select an amount" />*/}
        {/*            </SelectTrigger>*/}
        {/*          </FormControl>*/}
        {/*          <SelectContent>*/}
        {/*            {Array.from({ length: 11 }).map((_, index) => (*/}
        {/*              <SelectItem*/}
        {/*                key={index.toString()}*/}
        {/*                value={index.toString()}*/}
        {/*              >*/}
        {/*                {index > 0*/}
        {/*                  ? `${index.toString()} for ${formatPrice(index * T_SHIRT_UNIT_PRICE)}`*/}
        {/*                  : `No t-shirt`}*/}
        {/*              </SelectItem>*/}
        {/*            ))}*/}
        {/*          </SelectContent>*/}
        {/*        </Select>*/}
        {/*        <FormDescription>{`${formatPrice(T_SHIRT_UNIT_PRICE)} each`}</FormDescription>*/}
        {/*        <FormMessage />*/}
        {/*      </FormItem>*/}
        {/*    )}*/}
        {/*  />*/}

        {/*  <FormField*/}
        {/*    control={form.control}*/}
        {/*    name="tshirtsSize"*/}
        {/*    render={({ field }) => (*/}
        {/*      <FormItem className="w-full">*/}
        {/*        <FormLabel required={hasAmount} disabled={!hasAmount}>*/}
        {/*          Size*/}
        {/*        </FormLabel>*/}
        {/*        <Select*/}
        {/*          onValueChange={field.onChange}*/}
        {/*          defaultValue={field.value}*/}
        {/*          disabled={!hasAmount}*/}
        {/*        >*/}
        {/*          <FormControl>*/}
        {/*            <SelectTrigger*/}
        {/*              className={cn({ "text-muted-foreground": !field.value })}*/}
        {/*            >*/}
        {/*              <SelectValue placeholder="Chose a size" />*/}
        {/*            </SelectTrigger>*/}
        {/*          </FormControl>*/}
        {/*          <SelectContent>*/}
        {/*            <SelectGroup>*/}
        {/*              <SelectLabel>{`Men's Sizes`}</SelectLabel>*/}
        {/*              <SelectSeparator />*/}
        {/*              {menSizes.map((size) => (*/}
        {/*                <SelectItem key={size} value={size}>*/}
        {/*                  {tShirtSizeTranslation[size]}*/}
        {/*                </SelectItem>*/}
        {/*              ))}*/}
        {/*            </SelectGroup>*/}
        {/*            <SelectGroup>*/}
        {/*              <SelectLabel>{`Women's Sizes`}</SelectLabel>*/}
        {/*              <SelectSeparator />*/}
        {/*              {womenSizes.map((size) => (*/}
        {/*                <SelectItem key={size} value={size}>*/}
        {/*                  {tShirtSizeTranslation[size]}*/}
        {/*                </SelectItem>*/}
        {/*              ))}*/}
        {/*            </SelectGroup>*/}
        {/*          </SelectContent>*/}
        {/*        </Select>*/}
        {/*        <FormDescription>*/}
        {/*          <Dialog>*/}
        {/*            <DialogTrigger className="cursor-pointer text-primary hover:underline">*/}
        {/*              See size chart*/}
        {/*            </DialogTrigger>*/}
        {/*            <SizeChart />*/}
        {/*          </Dialog>*/}
        {/*        </FormDescription>*/}
        {/*        <FormMessage />*/}
        {/*      </FormItem>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
