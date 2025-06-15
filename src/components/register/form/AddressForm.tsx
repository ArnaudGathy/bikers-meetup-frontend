import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import FormPartTitle from "@/components/register/FormPartTitle";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";
import FormFieldCountry from "@/components/register/form/fields/FormFieldCountry";

export default function AddressForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <div>
      <FormPartTitle title="2. Address" id="address" />
      <div className="space-y-4">
        <div className="flex gap-4">
          <FormFieldInput
            className="w-1/2"
            reactForm={form}
            name="street"
            label="Street name"
            placeholder="Abbey road"
            required
          />
          <FormFieldInput
            className="w-1/4"
            reactForm={form}
            name="number"
            label="Street number"
            placeholder="1"
            required
          />
          <FormFieldInput
            className="w-1/4"
            reactForm={form}
            name="box"
            label="Box"
            placeholder="3"
          />
        </div>
        <div className="flex gap-4">
          <FormFieldCountry
            className="w-2/5"
            form={form}
            name="country"
            required
          />
          <FormFieldInput
            className="w-2/5"
            reactForm={form}
            name="city"
            label="City"
            placeholder="Washington D.C."
            required
          />
          <FormFieldInput
            className="w-1/5"
            reactForm={form}
            name="zip"
            label="Zip code"
            placeholder="20001"
          />
        </div>
      </div>
    </div>
  );
}
