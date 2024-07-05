import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMostRepresentedBrand } from "@/lib/api/registrations";

export default async function Motorcycle() {
  const { brand, model } = await getMostRepresentedBrand();

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardDescription>Most represented brand</CardDescription>
        <CardTitle className="text-4xl">{brand}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Most represented model : <span className="text-primary">{model}</span>
        </div>
      </CardContent>
    </Card>
  );
}
