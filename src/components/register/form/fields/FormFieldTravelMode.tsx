import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import { cn } from "@/lib/utils";
import {
  TravelModes,
  travelModeTranslation,
} from "@/lib/schemas/registerFormSchema";

export default function FormFieldTravelMode({
  form,
}: {
  form: UseFormReturn<RegisterForm>;
}) {
  return (
    <FormField
      control={form.control}
      name="travelMode"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>I travel to the convention by</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn({ "text-muted-foreground": !field.value })}
              >
                <SelectValue placeholder="Chose a travel mode" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(TravelModes).map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {travelModeTranslation[mode]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
