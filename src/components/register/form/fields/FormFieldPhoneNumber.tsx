import { FieldPath, UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries, Country } from "@/constants/countries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import FormFieldInput from "@/components/register/form/fields/FormFieldInput";

type FormFieldPhoneNumberProps = {
  form: UseFormReturn<RegisterForm>;
  prefixName: FieldPath<RegisterForm>;
  numberName: FieldPath<RegisterForm>;
  className?: string;
};

export default function FormFieldPhoneNumber({
  prefixName,
  numberName,
  form,
}: FormFieldPhoneNumberProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  return (
    <div className="flex gap-4">
      <FormField
        control={form.control}
        name={prefixName}
        render={() => {
          return (
            <FormItem>
              <FormLabel required>Phone number</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[150px] justify-between",
                        !selectedCountry && "text-muted-foreground",
                      )}
                    >
                      {!!selectedCountry ? (
                        <div className="space-x-2">
                          <span>{selectedCountry.flag}</span>
                          <span>{selectedCountry.dialCode}</span>
                        </div>
                      ) : (
                        "Country"
                      )}
                      <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command
                    filter={(value, search) =>
                      value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                    }
                  >
                    <CommandInput placeholder="Search" />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.code}
                            onSelect={() => {
                              setSelectedCountry(country);
                              form.setValue(prefixName, country.dialCode, {
                                shouldValidate: true,
                              });
                              setOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry === country
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <div className="space-x-2 text-muted-foreground">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                              <span>({country.dialCode})</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormFieldInput
        reactForm={form}
        name={numberName}
        className="mt-[22px] w-full"
        placeholder="487316894"
        type="tel"
      />
    </div>
  );
}
