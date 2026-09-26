import { NextResponse } from "next/server";

// PRD §6.2 puts full newsletter automation out of MVP scope, but a working
// signup is easy enough to wire now: this proxies to a self-hosted listmonk
// instance (see listmonk/README.md) rather than exposing its URL/list UUID
// to the browser directly. Without LISTMONK_URL/LISTMONK_LIST_UUID set, this
// fails clearly instead of pretending to succeed — see NewsletterForm.tsx.
export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  const listmonkUrl = process.env.LISTMONK_URL;
  const listUuid = process.env.LISTMONK_LIST_UUID;

  if (!listmonkUrl || !listUuid) {
    console.error("[newsletter] LISTMONK_URL or LISTMONK_LIST_UUID not set — see listmonk/README.md");
    return NextResponse.json(
      { ok: false, error: "Newsletter signup isn't configured yet." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${listmonkUrl}/api/public/subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, list_uuids: [listUuid] }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[newsletter] listmonk rejected subscription", res.status, body);
      return NextResponse.json({ ok: false, error: "Could not subscribe that address." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] failed to reach listmonk", err);
    return NextResponse.json({ ok: false, error: "Could not reach the newsletter service." }, { status: 502 });
  }
}
