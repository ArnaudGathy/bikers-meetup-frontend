import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldValues, FieldPath } from "react-hook-form";
import { InputHTMLAttributes } from "react";

type FormFieldInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputHTMLAttributes<HTMLInputElement> & {
  reactForm: UseFormReturn<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

export default function FormFieldInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  reactForm,
  name,
  label,
  description,
  required = false,
  className,
  ...rest
}: FormFieldInputProps<TFieldValues, TName>) {
  return (
    <FormField
      control={reactForm.control}
      name={name}
      render={({ field }) => {
        const { value, ...restField } = field;

        if (value !== undefined && typeof value !== "string") {
          throw new Error("FormFieldInput value must be a string");
        }

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel required={required} disabled={rest.disabled}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Input {...rest} {...restField} value={value} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
