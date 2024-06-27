import FormPartTitle from "@/components/register/FormPartTitle";
import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page";
import FormFieldCheckbox from "@/components/register/form/fields/FormFieldCheckbox";

export default function AgreementsForm({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <div>
      <FormPartTitle title="6. Agreements" id="agreements" />

      <div className="space-y-2">
        <FormFieldCheckbox
          form={form}
          name="hasAgreedToPay"
          label={`I want to register to the international convention and I will pay the registration fee, eventual t-shirts and eventual accommodation within the next 15 days.`}
          required
        />
        <FormFieldCheckbox
          form={form}
          name="hasAgreedToData"
          label="By subscribing to this convention, I authorize the Blue Knights Belgium VIII committee to keep my data during the meeting and its preparation."
          description="I have the right to ask for my personal data to be deleted at any time by sending an email to international.convention.2025@gmail.com"
          required
        />
        <FormFieldCheckbox
          form={form}
          name="hasAgreedToPicture"
          label="I authorize to use my pictures on the Club's Facebook page."
        />
      </div>
    </div>
  );
}
