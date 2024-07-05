import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalAccommodationsAndPaid } from "@/lib/api/registrations";
import { Progress } from "@/components/ui/progress";

export default async function Accommodations() {
  const { total, percentagePaid } = await getTotalAccommodationsAndPaid();

  return (
    <Card className="col-span-2 flex-1">
      <CardHeader className="pb-2">
        <CardDescription>Accommodations</CardDescription>
        <CardTitle className="text-4xl">{total}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-xs text-muted-foreground">
          <span className="text-primary">{percentagePaid}%</span> of
          accommodations are paid
        </div>
        <Progress value={percentagePaid} max={100} />
      </CardContent>
    </Card>
  );
}
