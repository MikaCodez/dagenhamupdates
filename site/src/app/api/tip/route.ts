import { NextResponse } from "next/server";
import { isSanityConfigured, writeToken } from "@/sanity/env";
import { writeClient } from "@/sanity/writeClient";
import { rateLimit, clientKey } from "@/lib/rate-limit";

// Server-side mirror of TipForm.tsx's `accept="image/*,.pdf"` — that
// attribute is only a UI hint, trivially bypassed by anyone posting to this
// route directly, so it buys nothing without an equivalent check here.
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB
const MAX_TEXT_LENGTH = 8000; // subject/message — generous for a tip, not unbounded

// PRD §15's "submission inbox": writes a `submission` document to Sanity
// (editors triage from Studio) and, if configured, emails a notification.
// Without a Sanity write token this still validates the shape and logs
// server-side, same as before — see site/README.md's "Stubbed" section.
export async function POST(request: Request) {
  // Public, unauthenticated endpoint — rate-limit before doing any work
  // (including parsing the body) so a flood can't run up Sanity writes or
  // Resend email sends. See src/lib/rate-limit.ts for the caveats.
  if (!rateLimit(`tip:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions — please try again later." },
      { status: 429 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_ATTACHMENT_BYTES * 2) {
    // *2: formData's other text fields plus multipart overhead on top of
    // one attachment near the cap below. An honest client never gets near
    // this; a request that does isn't worth buffering into memory to find
    // out — reject before request.formData() reads the whole body.
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  const formData = await request.formData();

  const subject = formData.get("subject");
  const message = formData.get("message");
  const type = formData.get("type");

  if (!subject || !message || !type) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (typeof subject !== "string" || typeof message !== "string" || typeof type !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid field type." }, { status: 400 });
  }
  if (subject.length > MAX_TEXT_LENGTH || message.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ ok: false, error: "That's too long — please shorten it." }, { status: 400 });
  }

  const anonymous = formData.get("anonymous") === "true";
  const name = anonymous ? undefined : (formData.get("name") as string | null) ?? undefined;
  const email = anonymous ? undefined : (formData.get("email") as string | null) ?? undefined;
  const attachment = formData.get("attachment");
  const receivedAt = new Date().toISOString();
  const hasAttachment = attachment instanceof File && attachment.size > 0;

  if (hasAttachment) {
    const file = attachment as File;
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ ok: false, error: "Attachment is too large (8MB max)." }, { status: 413 });
    }
    if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
      return NextResponse.json({ ok: false, error: "Unsupported attachment type." }, { status: 415 });
    }
  }

  if (isSanityConfigured && writeToken) {
    try {
      let attachmentField: Record<string, unknown> | undefined;
      if (hasAttachment) {
        const file = attachment as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await writeClient.assets.upload("file", buffer, { filename: file.name });
        attachmentField = { _type: "file", asset: { _type: "reference", _ref: uploaded._id } };
      }
      await writeClient.create({
        _type: "submission",
        status: "new",
        type,
        subject,
        message,
        anonymous,
        name,
        email,
        attachment: attachmentField,
        receivedAt,
      });
    } catch (err) {
      // A failed CMS write shouldn't lose the tip entirely — it's still
      // logged below, and still emailed if that's configured.
      console.error("[tip submission] failed to write to Sanity", err);
    }
  } else {
    console.log("[tip submission] Sanity not configured — logging only", {
      type,
      subject,
      message,
      anonymous,
      name: name ?? null,
      email: email ?? null,
      attachment: hasAttachment ? { name: (attachment as File).name, size: (attachment as File).size } : null,
      receivedAt,
    });
  }

  await sendNotificationEmail({ type: String(type), subject: String(subject), message: String(message), anonymous, name, email });

  return NextResponse.json({ ok: true });
}

async function sendNotificationEmail(tip: {
  type: string;
  subject: string;
  message: string;
  anonymous: boolean;
  name?: string;
  email?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TIP_NOTIFICATION_EMAIL;
  const from = process.env.TIP_FROM_EMAIL;
  if (!apiKey || !to || !from) return; // Not configured — see site/README.md.

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from_ = tip.anonymous ? "Anonymous" : `${tip.name ?? "(no name)"} <${tip.email ?? "no email"}>`;
    await resend.emails.send({
      from,
      to,
      subject: `New tip: ${tip.subject}`,
      text: `Type: ${tip.type}\nFrom: ${from_}\n\n${tip.message}`,
    });
  } catch (err) {
    console.error("[tip submission] failed to send notification email", err);
  }
}
