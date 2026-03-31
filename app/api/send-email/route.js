import { sendEmail } from "@/actions/send-email";

export async function POST() {
  const result = await sendEmail();
  return Response.json(result);
}
