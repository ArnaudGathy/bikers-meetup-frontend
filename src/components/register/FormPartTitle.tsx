import { Separator } from "@/components/ui/separator";

export default function FormPartTitle({
  title,
  description,
  id,
}: {
  title: string;
  description?: string;
  id: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2" id={id}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
    </div>
  );
}
