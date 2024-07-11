import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTshirtsSizes } from "@/lib/api/registrations";
import {
  tShirtSizeTranslation,
  TShirtsSizes as SizeEnum,
} from "@/lib/schemas/registerFormSchema";
import TShirtsSizesPieChart from "@/app/admin/(card)/TShirtsSizesPieChart";
import { TShirtsSizes } from "@prisma/client";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = Object.values(TShirtsSizes).reduce((acc, size) => {
  return { ...acc, [size]: { label: tShirtSizeTranslation[size] } };
}, {}) satisfies ChartConfig;

export type tShirtSizeCount = {
  size: TShirtsSizes | null;
  count: number;
}[];

export default async function TshirtsSizes() {
  const tShirtSizes = await getTshirtsSizes();

  const { men, women } = tShirtSizes.reduce(
    (acc: { men: tShirtSizeCount; women: tShirtSizeCount }, curr) => {
      if (!!curr.size) {
        if (
          [
            SizeEnum.S,
            SizeEnum.M,
            SizeEnum.L,
            SizeEnum.XL,
            SizeEnum["2XL"],
            SizeEnum["3XL"],
            SizeEnum["4XL"],
            SizeEnum["5XL"],
          ].includes(curr.size as SizeEnum)
        ) {
          return { ...acc, men: [...acc.men, curr] };
        }

        if (
          [
            SizeEnum.WS,
            SizeEnum.WM,
            SizeEnum.WL,
            SizeEnum.WXL,
            SizeEnum["W2XL"],
          ].includes(curr.size as SizeEnum)
        ) {
          return { ...acc, women: [...acc.women, curr] };
        }
      }

      return acc;
    },
    { men: [], women: [] },
  );

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
