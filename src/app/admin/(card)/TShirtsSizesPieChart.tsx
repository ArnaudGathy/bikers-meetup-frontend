"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { tShirtSizeCount } from "@/lib/api/registrations";

export default function TShirtsSizesPieChart({
  title,
  data,
  chartConfig,
}: {
  title: string;
  data: tShirtSizeCount;
  chartConfig: ChartConfig;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Pie
            data={data}
            dataKey="count"
            nameKey="size"
            cx="50%"
            cy="50%"
            innerRadius={75}
            paddingAngle={data.length > 1 ? 5 : 0}
            label
          >
            {data.map((_, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`var(--chart-${title === "Women" ? "w-" : ""}${index + 1})`}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
