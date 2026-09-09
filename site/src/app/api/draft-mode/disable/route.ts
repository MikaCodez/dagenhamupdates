import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// The "Exit preview" link (src/components/DisableDraftMode.tsx).
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
