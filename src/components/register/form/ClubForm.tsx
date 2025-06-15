import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import FormPartTitle from "@/components/register/FormPartTitle";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";
import FormFieldTravelMode from "@/components/register/form/fields/FormFieldTravelMode";

export default function ClubForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <div>
      <FormPartTitle title="4. Club information" id="club" />
      <div className="space-y-4">
        <div className="flex gap-4">
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="chapter"
            label="Chapter name"
            placeholder="Belgium 8"
            required
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="chapterFunction"
            label="Chapter function (President, VP, ...)"
            placeholder="Member"
            required
          />
        </div>

        <div className="flex gap-4">
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="brand"
            label="Motorcycle brand"
            placeholder="Triumph"
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="model"
            label="Motorcycle model"
            placeholder="Bonneville"
          />
          <FormFieldInput
            className="w-full"
            reactForm={form}
            name="licencePlate"
            label="Motorcycle licence plate"
            placeholder="0-ABC-123"
          />
        </div>

        <FormFieldTravelMode form={form} />
      </div>
    </div>
  );
}
