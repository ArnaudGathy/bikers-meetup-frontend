import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMostRepresentedCountry } from "@/lib/api/registrations";
import CountryFlag from "@/components/CountryFlag";
import { countries as countryList } from "@/constants/countries";
import { clsx } from "clsx";

const CountryLine = ({
  countries,
  index,
}: {
  countries: { count: number; country: string }[];
  index: number;
}) => {
  const entry = countries.length > index ? countries[index] : undefined;

  if (!entry) {
    return null;
  }

  const foundCountry = countryList.find(({ code }) => code === entry?.country);

  return (
    <div
      className={clsx("flex gap-1 text-xs text-muted-foreground", {
        "font-bold": index === 0,
      })}
    >
      <div>
        {index === 0 && "🥇 "}
        {index === 1 && "🥈 "}
        {index === 2 && "🥉 "}
      </div>
      <div>
        <CountryFlag country={entry.country} />
      </div>
      <div>
        {foundCountry?.name} -{" "}
        <span className="text-primary">{entry.count}</span> persons
      </div>
    </div>
  );
};

export default async function Countries() {
  const { countries, differentCountries } = await getMostRepresentedCountry();

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardDescription>Countries</CardDescription>
        <CardTitle className="text-4xl">{differentCountries}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <CountryLine countries={countries} index={0} />
        <CountryLine countries={countries} index={1} />
        <CountryLine countries={countries} index={2} />
      </CardContent>
    </Card>
  );
}
