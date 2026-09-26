import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Point a Sanity webhook (Settings → API → Webhooks in sanity.io/manage) at
// POST /api/revalidate?secret=<SANITY_REVALIDATE_SECRET> for "Create",
// "Update" and "Delete" on any dataset — this makes edits show up
// immediately instead of waiting for the 60s ISR window (see the
// `revalidate = 60` exports on the content pages). Optional: without a
// webhook configured, content still updates within 60 seconds on its own.
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const provided = new URL(request.url).searchParams.get("secret");

  if (!secret) {
    return NextResponse.json({ ok: false, error: "SANITY_REVALIDATE_SECRET not set." }, { status: 500 });
  }
  if (!provided || !secretsMatch(provided, secret)) {
    return NextResponse.json({ ok: false, error: "Invalid secret." }, { status: 401 });
  }

  // Blunt but simple and correct: revalidate everything under the root
  // layout. Fine at this site's scale — narrow to specific paths from the
  // webhook payload's document type/slug if the content volume ever makes
  // a full revalidation noticeably slow.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

// Plain `!==` leaks timing information proportional to how many leading
// characters match — a textbook (if slow, low-value here) timing side
// channel on the secret. `timingSafeEqual` needs equal-length buffers, so
// length-mismatch is checked separately first — that check alone doesn't
// leak anything useful an attacker doesn't already get for free from the
// response depending on the secret's length being guessable at all.
function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
