import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTshirtsSizes } from "@/lib/api/registrations";
import TShirtsSizesPieChart from "@/app/admin/(card)/TShirtsSizesPieChart";
import { TShirtsSizes } from "@prisma/client";
import type { ChartConfig } from "@/components/ui/chart";
import { tShirtSizeTranslation } from "@/lib/schemas/registerFormSchema";

const chartConfig = Object.values(TShirtsSizes).reduce((acc, size) => {
  return { ...acc, [size]: { label: tShirtSizeTranslation[size] } };
}, {}) satisfies ChartConfig;

export default async function TshirtsSizes() {
  const { men, women } = await getTshirtsSizes();

  return (
    <Card className="col-span-4 flex-1">
      <CardHeader className="pb-2">
        <CardTitle>T-Shirts sizes repartition</CardTitle>
      </CardHeader>
      <CardContent className="mt-8 flex">
        <TShirtsSizesPieChart
          data={men}
          chartConfig={chartConfig}
          title="Men"
        />
        <TShirtsSizesPieChart
          data={women}
          chartConfig={chartConfig}
          title="Women"
        />
      </CardContent>
    </Card>
  );
}
