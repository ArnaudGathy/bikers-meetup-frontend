import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTotalRegistrationAndPaid } from "@/lib/api/registrations";

export default async function Total() {
  const { total, percentagePaid } = await getTotalRegistrationAndPaid();

  return (
    <Card className="col-span-2 flex-1">
      <CardHeader className="pb-2">
        <CardDescription>Registrations</CardDescription>
        <CardTitle className="text-4xl">{total}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-xs text-muted-foreground">
          <span className="text-primary">{percentagePaid}%</span> of
          registration are paid
        </div>
        <Progress value={percentagePaid} max={100} />
      </CardContent>
    </Card>
  );
}
