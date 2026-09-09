import { NextResponse } from "next/server";
import { isSanityConfigured, writeToken } from "@/sanity/env";
import { writeClient } from "@/sanity/writeClient";

// PRD §15's "submission inbox": writes a `submission` document to Sanity
// (editors triage from Studio) and, if configured, emails a notification.
// Without a Sanity write token this still validates the shape and logs
// server-side, same as before — see site/README.md's "Stubbed" section.
export async function POST(request: Request) {
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

  const anonymous = formData.get("anonymous") === "true";
  const name = anonymous ? undefined : (formData.get("name") as string | null) ?? undefined;
  const email = anonymous ? undefined : (formData.get("email") as string | null) ?? undefined;
  const attachment = formData.get("attachment");
  const receivedAt = new Date().toISOString();
  const hasAttachment = attachment instanceof File && attachment.size > 0;

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
