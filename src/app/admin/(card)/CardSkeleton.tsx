import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UpperCardSkeleton = () => {
  return (
    <Card className="col-span-2 flex-1">
      <CardHeader className="pb-2">
        <Skeleton className="mt-0 h-[20px] w-[120px]" />
        <CardTitle className="text-4xl">
          <Skeleton className="h-[40px] w-[40px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <Skeleton className="h-[16px] w-[180px]" />
        <Skeleton className="h-[16px] w-full" />
      </CardContent>
    </Card>
  );
};

export const LowerCardSkeleton = ({ lines }: { lines: number }) => {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <Skeleton className="mt-0 h-[20px] w-[120px]" />
        <CardTitle className="text-4xl">
          <Skeleton className="h-[40px] w-[40px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {[...Array(lines)].map((_, index) => (
          <Skeleton key={index} className="h-[16px] w-[120px]" />
        ))}
      </CardContent>
    </Card>
  );
};

export const BigCardSkeleton = () => {
  return (
    <Card className="col-span-4 flex-1 space-y-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl">
          <Skeleton className="h-[24px] w-[275px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-[357px] gap-8">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
};
