import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

// The standalone, shareable link — Instagram/X bio, posters, email
// signatures — as distinct from the compact form embedded on the homepage
// footer, which is there for visitors already on the site. Both post to the
// same list (see ../../../../listmonk/README.md).
export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get Dagenham Updates' local round-up by email — news, travel, events and community notices for Barking & Dagenham.",
  alternates: { canonical: "/subscribe" },
};

export default function SubscribePage() {
  return (
    <div
      className="du-container"
      style={{
        paddingBlock: "var(--du-space-8)",
        maxWidth: "var(--du-reading-col)",
        textAlign: "center",
      }}
    >
      <p className="du-kicker">Newsletter</p>
      <h1
        className="du-headline"
        style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0", textWrap: "pretty" }}
      >
        Get local updates straight to your inbox
      </h1>
      <p
        style={{
          fontFamily: "var(--du-font-display)",
          fontSize: "var(--du-body-lg)",
          lineHeight: 1.5,
          color: "var(--du-ink-secondary)",
          margin: "14px auto 0",
          maxWidth: 520,
          textWrap: "pretty",
        }}
      >
        A round-up of news, travel, events and community notices for
        Barking &amp; Dagenham — sent when there's something worth sending,
        not on a schedule for its own sake.
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--du-space-7)" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <NewsletterForm />
        </div>
      </div>

      <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", marginTop: "var(--du-space-5)" }}>
        One click to confirm, one click to unsubscribe — see our{" "}
        <Link href="/privacy-policy">privacy policy</Link>. Prefer social?{" "}
        <Link href="/about#social">Follow along on Instagram and X</Link>.
      </p>
    </div>
  );
}
