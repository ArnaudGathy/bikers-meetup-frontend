import { auth, signOut } from "@/../auth";
import { Button } from "@/components/ui/button";

export default async function LogoutButton() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>LogoutButton</Button>
    </form>
  );
}
