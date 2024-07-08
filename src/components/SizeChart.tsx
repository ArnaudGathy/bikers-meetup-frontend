"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  tShirtSizeTranslation,
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";
import Image from "next/image";

enum Gender {
  MEN = "Men",
  WOMEN = "Women",
}

enum Units {
  IN = "inches",
  CM = "cm",
}

const tshirtsSizesValues = {
  [Gender.MEN]: {
    [TShirtsSizes.S]: {
      [Units.IN]: [18, 28, 16],
      [Units.CM]: [46, 71, 40],
    },
    [TShirtsSizes.M]: {
      [Units.IN]: [20, 29, 17],
      [Units.CM]: [51, 74, 43],
    },
    [TShirtsSizes.L]: {
      [Units.IN]: [22, 30, 18.5],
      [Units.CM]: [56, 76, 47],
    },
    [TShirtsSizes.XL]: {
      [Units.IN]: [24, 31, 20],
      [Units.CM]: [61, 79, 51],
    },
    [TShirtsSizes["2XL"]]: {
      [Units.IN]: [26, 32, 21.5],
      [Units.CM]: [66, 81, 55],
    },
    [TShirtsSizes["3XL"]]: {
      [Units.IN]: [28, 33, 23],
      [Units.CM]: [71, 84, 58],
    },
    [TShirtsSizes["4XL"]]: {
      [Units.IN]: [30, 34, 24.88],
      [Units.CM]: [76, 86, 63],
    },
    [TShirtsSizes["5XL"]]: {
      [Units.IN]: [32, 35, 25],
      [Units.CM]: [81, 89, 64],
    },
  },
  [Gender.WOMEN]: {
    [TShirtsSizes.S]: {
      [Units.IN]: [16, 25.25, 11.5],
      [Units.CM]: [41, 64, 29],
    },
    [TShirtsSizes.M]: {
      [Units.IN]: [17, 26.25, 12],
      [Units.CM]: [43, 67, 30],
    },
    [TShirtsSizes.L]: {
      [Units.IN]: [18.5, 27.25, 12.5],
      [Units.CM]: [47, 69, 32],
    },
    [TShirtsSizes.XL]: {
      [Units.IN]: [19.5, 28, 13.25],
      [Units.CM]: [50, 71, 34],
    },
    [TShirtsSizes["2XL"]]: {
      [Units.IN]: [22, 28.5, 14],
      [Units.CM]: [56, 72, 36],
    },
  },
};

const tolerance = {
  [Units.IN]: [1, 1, 0.75],
  [Units.CM]: [2.54, 2.54, 1.91],
};

export default function SizeChart() {
  const [gender, setGender] = useState<Gender>(Gender.MEN);
  const [unit, setUnit] = useState<Units>(Units.CM);
  return (
    <DialogContent className="flex flex-col gap-4" aria-describedby={undefined}>
      <div className="flex items-center gap-16 font-bold">
        <h3>T-shirts size chart</h3>
        <div className="flex items-center gap-2 text-sm">
          Men
          <Switch
            defaultChecked={gender === Gender.WOMEN}
            onCheckedChange={(isChecked) =>
              setGender(isChecked ? Gender.WOMEN : Gender.MEN)
            }
          />
          Women
        </div>

        <div className="flex items-center gap-2 text-sm">
          cm
          <Switch
            defaultChecked={unit === Units.IN}
            onCheckedChange={(isChecked) =>
              setUnit(isChecked ? Units.IN : Units.CM)
            }
          />
          inches
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <Table className="w-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Size</TableHead>
                <TableHead className="w-[110px]">{`Chest (A) ${unit}`}</TableHead>
                <TableHead className="w-[120px]">{`Length (B) ${unit}`}</TableHead>
                <TableHead className="w-[130px]">{`CB Sleeve (C) ${unit}`}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(tshirtsSizesValues[gender]).map(
                ([size, values]) => (
                  <TableRow key={size}>
                    <TableCell small>
                      {`${gender}'s ${tShirtSizeTranslation[size as TShirtsSizes]}`}
                    </TableCell>
                    {values[unit].map((size) => (
                      <TableCell key={size} small>
                        {size}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )}
              <TableRow>
                <TableCell small>Tolerance</TableCell>
                {tolerance[unit].map((tolerance, index) => (
                  <TableCell key={index} small>
                    <span className="text-xs text-muted-foreground">+/-</span>{" "}
                    {tolerance}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableCaption>{`${gender}'s t-shirt size chart`}</TableCaption>
          </Table>
        </div>
        <div className="flex min-w-[251px] justify-center">
          <div>
            {gender === Gender.MEN ? (
              <Image src="/men.png" alt="Size chart" width={251} height={177} />
            ) : (
              <Image
                src="/women.png"
                alt="Size chart"
                width={190}
                height={197}
              />
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
