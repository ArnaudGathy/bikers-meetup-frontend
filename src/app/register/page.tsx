"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InformationForm from "@/components/register/form/InformationForm";
import AddressForm from "@/components/register/form/AddressForm";
import ClubForm from "@/components/register/form/ClubForm";
import EmergencyContactForm from "@/components/register/form/EmergencyContactForm";
import BookingForm from "@/components/register/form/BookingForm";
import AgreementsForm from "@/components/register/form/AgreementsForm";
import TotalAndSubmitForm from "@/components/register/form/TotalAndSubmitForm";
import { register } from "@/lib/actions/register";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BookingModes,
  formSchema,
  TravelModes,
} from "@/lib/schemas/registerFormSchema";
import { toast } from "sonner";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const maintenance = true;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testValues = {
  firstName: "aa",
  lastName: "aa",
  email: "arno.firefox@gmail.com",
  phonePrefix: "+32",
  phoneNumber: "4589621",
  day: "01",
  month: "01",
  year: "1991",
  emergencyName: "test",
  emergencyPhonePrefix: "+32",
  emergencyPhoneNumber: "4896326",
  street: "a",
  number: "a",
  box: "a",
  country: "BE",
  city: "a",
  zip: "a",
  chapter: "a",
  chapterFunction: "a",
  travelMode: TravelModes.CAR,
  brand: "",
  model: "",
  licencePlate: "",
  booking: BookingModes.YES,
  willShareRoom: false,
  staysWith: "aaa",
  languages: "z, f, d",
  tshirtsAmount: "",
  tshirtsSize: undefined,
  hasAgreedToPay: true,
  hasAgreedToData: true,
  hasAgreedToPicture: false,
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phonePrefix: "",
  phoneNumber: "",
  day: "",
  month: "",
  year: "",
  emergencyName: "",
  emergencyPhonePrefix: "",
  emergencyPhone: "",
  street: "",
  number: "",
  box: "",
  country: "",
  city: "",
  zip: "",
  chapter: "",
  chapterFunction: "",
  travelMode: undefined,
  brand: "",
  model: "",
  licencePlate: "",
  booking: undefined,
  willShareRoom: false,
  staysWith: "",
  languages: "",
  tshirtsAmount: "",
  tshirtsSize: undefined,
  hasAgreedToPay: undefined,
  hasAgreedToData: undefined,
  hasAgreedToPicture: false,
};

export type RegisterForm = z.infer<typeof formSchema>;

export default function Register() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await register(data);
      setIsRegistered(true);
    } catch (e) {
      console.error(e);
      toast(
        "Could not register. Please contact an administrator at international.convention.2025@gmail.com",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (maintenance) {
    return (
      <Alert>
        <AlertTitle className="flex items-center gap-2">
          <InformationCircleIcon className="size-6" />
          Registration not available yet
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          Registration will open on July 23rd, please come back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {isRegistered ? (
        <div>
          <Alert>
            <AlertTitle>Congratulations !</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <div className="my-4">
                <div>
                  You have been successfully registered to the 2025
                  International Convention.
                </div>
                <div>
                  You will receive a confirmation email shortly containing the
                  payment information for the registration fee and the eventual
                  t-shirts.
                </div>
                <div className="font-bold text-primary">
                  {"Please check your SPAMs if you didn't receive the email."}
                </div>
              </div>
              <Link href="/">
                <Button size="sm">Go home</Button>
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}
            className="space-y-8"
          >
            <InformationForm form={form} />
            <AddressForm form={form} />
            <EmergencyContactForm form={form} />
            <ClubForm form={form} />
            <BookingForm form={form} />
            <AgreementsForm form={form} />
            <TotalAndSubmitForm form={form} isLoading={isLoading} />
          </form>
        </Form>
      )}
    </div>
  );
}
