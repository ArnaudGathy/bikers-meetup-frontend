import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAgeAverage } from "@/lib/api/registrations";

export default async function Age() {
  const { ageAvg, minAge, maxAge } = await getAgeAverage();

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardDescription>Average age</CardDescription>
        <CardTitle className="text-4xl">{ageAvg}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-xs text-muted-foreground">
          The youngest person is <span className="text-primary">{minAge}</span>{" "}
          years old
        </div>
        <div className="text-xs text-muted-foreground">
          The oldest person is <span className="text-primary">{maxAge}</span>{" "}
          years old
        </div>
      </CardContent>
    </Card>
  );
}
