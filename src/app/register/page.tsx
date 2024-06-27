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
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testValues = {
  firstName: "aa",
  lastName: "aa",
  email: "a@a.com",
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
  brand: "a",
  model: "a",
  licencePlate: "a",
  booking: BookingModes.YES,
  willShareRoom: false,
  staysWith: "aaa",
  languages: "z, f, d",
  tshirtsAmount: "2",
  tshirtsSize: TShirtsSizes.L,
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
    //defaultValues: testValues,
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
      toast(
        "Could not register. Please contact an administrator at international.convention.2025@gmail.com",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isRegistered ? (
        <div>
          <Alert>
            <AlertTitle>Congratulations !</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <div>
                <div>
                  You have been successfully registered to the 2025
                  International Convention.
                </div>
                <div>You will receive a confirmation email shortly.</div>
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
