import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FormFieldCheckbox({
  form,
  name,
  label,
  description,
  disabled = false,
  asCard = true,
  required = false,
}: {
  form: UseFormReturn<RegisterForm>;
  name: FieldPath<RegisterForm>;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
  asCard?: boolean;
  required?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-row items-start space-x-3 space-y-0", {
            "cursor-not-allowed opacity-50": disabled,
            "rounded-md border p-4": asCard,
          })}
        >
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel
              className={cn({ "cursor-not-allowed": disabled })}
              required={required}
            >
              {label}
            </FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
