import FormPartTitle from "@/components/register/FormPartTitle";
import { UseFormReturn } from "react-hook-form";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";
import FormFieldPhoneNumber from "@/components/register/form/fields/FormFieldPhoneNumber";
import { RegisterForm } from "@/app/register/page_old";

export default function InformationForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <div>
      <FormPartTitle title="1. Personal information" id="information" />
      <div className="space-y-4">
        <div className="flex gap-4">
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="firstName"
            label="First Name"
            placeholder="John"
            required
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>

        <FormFieldInput
          reactForm={form}
          name="email"
          label="Email"
          placeholder="member@blueknights.com"
          type="email"
          required
        />

        <FormFieldPhoneNumber
          prefixName="phonePrefix"
          numberName="phoneNumber"
          form={form}
        />

        <div className="flex gap-4">
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="day"
            label="Birth day"
            placeholder="01"
            autoComplete="bday-day"
            required
            minLength={1}
            maxLength={2}
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="month"
            label="Birth month"
            placeholder="01"
            autoComplete="bday-month"
            required
            type="number"
            minLength={1}
            maxLength={2}
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="year"
            label="Birth year"
            placeholder="1960"
            autoComplete="bday-year"
            required
            minLength={2}
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
}
