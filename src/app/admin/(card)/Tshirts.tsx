import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTshirtsSold } from "@/lib/api/registrations";

export default async function Tshirts() {
  const { total, avg } = await getTshirtsSold();

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardDescription>T-shirts sold</CardDescription>
        <CardTitle className="text-4xl">{total}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          In average, <span className="text-primary">{avg}</span> t-shirts per
          person
        </div>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <Progress value={percentagePaid} max={100} />*/}
      {/*</CardFooter>*/}
    </Card>
  );
}
