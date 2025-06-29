import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import FormPartTitle from "@/components/register/FormPartTitle";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";
import FormFieldPhoneNumber from "@/components/register/form/fields/FormFieldPhoneNumber";

export default function EmergencyContactForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <div>
      <FormPartTitle title="3. Emergency contact" id="contact" />
      <div className="space-y-4">
        <FormFieldInput
          className="w-full"
          reactForm={form}
          name="emergencyName"
          label="Contact full name"
          placeholder="Jane Doe"
          required
        />
        <FormFieldPhoneNumber
          prefixName="emergencyPhonePrefix"
          numberName="emergencyPhoneNumber"
          form={form}
        />
      </div>
    </div>
  );
}
