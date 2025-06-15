import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { countries, Country } from "@/constants/countries";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { RegisterForm } from "@/app/register/page_old";
import { useState } from "react";
import CountryFlag from "@/components/CountryFlag";

type FormFieldCountryProps = {
  form: UseFormReturn<RegisterForm>;
  name: FieldPath<RegisterForm>;
  required?: boolean;
  className?: string;
};

export default function FormFieldCountry({
  form,
  name,
  className,
  required = false,
}: FormFieldCountryProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => {
        return (
          <FormItem className={className}>
            <FormLabel required={required}>Country</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      !selectedCountry && "text-muted-foreground",
                    )}
                  >
                    {!!selectedCountry ? (
                      <div className="space-x-2">
                        <CountryFlag country={selectedCountry.code} />
                        <span>{selectedCountry.name}</span>
                      </div>
                    ) : (
                      "Select a country"
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
                            form.setValue(name, country.code, {
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
                            <CountryFlag country={country.code} />
                            <span>{country.name}</span>
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
  );
}
