import { registrationCompleted } from "@/lib/serverless/sendmail";
import { TShirtsSizes } from "@/lib/schemas/registerFormSchema";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const targetMail = url.searchParams.get("target");
  const name = url.searchParams.get("name");
  const tshirtsAmount = url.searchParams.get("tshirtsAmount");
  const size = url.searchParams.get("size");

  if (!targetMail || !name || tshirtsAmount === null) {
    return new Response("Missing target mail", { status: 400 });
  }

  try {
    await registrationCompleted({
      targetMail,
      tshirtsAmount,
      size: size as TShirtsSizes,
      name,
    });
    return new Response("Mail sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Could not send mail", { status: 500 });
  }
}
