import { registrationCompleted } from "@/lib/serverless/sendmail";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const targetMail = url.searchParams.get("target");

  if (!targetMail) {
    return new Response("Missing target mail", { status: 400 });
  }

  try {
    await registrationCompleted({ targetMail });
    return new Response("Mail sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Could not send mail", { status: 500 });
  }
}
