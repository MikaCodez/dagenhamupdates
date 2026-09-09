import type { Metadata } from "next";
import { TipForm } from "@/components/TipForm";

export const metadata: Metadata = {
  title: "Contact / Submit a Tip",
  description:
    "Send Dagenham Updates a news tip, event listing, community notice, business update or correction. You can ask to stay anonymous.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)" }}>
      <header style={{ borderBottom: "var(--du-section-rule)", paddingBottom: "var(--du-space-5)" }}>
        <p className="du-kicker">Contact</p>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
          Submit a tip
        </h1>
        <p style={{ fontSize: "var(--du-body)", color: "var(--du-ink-secondary)", marginTop: 10, maxWidth: "var(--du-reading-col)" }}>
          Local news, an event to list, a community notice, a business update
          or a correction to something we got wrong — send it over.
        </p>
      </header>

      <div className="du-with-rail" style={{ marginTop: "var(--du-space-6)" }}>
        <div style={{ maxWidth: "var(--du-reading-col)" }}>
          <TipForm />
        </div>

        <div className="du-rail">
          <div style={{ border: "1px solid var(--du-rule)", background: "var(--du-panel)", padding: "var(--du-space-5)" }}>
            <p className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
              What happens next
            </p>
            <p style={{ fontSize: "var(--du-body-sm)", lineHeight: 1.6, color: "var(--du-ink-secondary)", marginTop: 8 }}>
              We read every submission. We check what we can against official
              sources before publishing anything based on it, and we'll follow
              up if we need more detail and you've given us a way to reach you.
              Not every tip becomes a story.
            </p>
          </div>

          <div style={{ border: "1px solid var(--du-rule)", padding: "var(--du-space-5)" }}>
            <p className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
              What not to send
            </p>
            <p style={{ fontSize: "var(--du-body-sm)", lineHeight: 1.6, color: "var(--du-ink-secondary)", marginTop: 8 }}>
              Don't send anything that could identify a victim of crime, a
              child, or anyone at risk. Don't send unverified accusations about
              a named person. If you're not sure, describe the situation and
              leave out identifying details — we'll ask if we need more.
            </p>
          </div>

          <div
            style={{
              border: "1px solid var(--du-caution-border)",
              background: "var(--du-caution-bg)",
              color: "var(--du-caution-text)",
              padding: "var(--du-space-5)",
            }}
          >
            <p className="du-label-box" style={{ margin: 0 }}>
              In an emergency
            </p>
            <p style={{ fontSize: "var(--du-body-sm)", lineHeight: 1.6, marginTop: 8 }}>
              Contact the emergency services first — not us. This form is not
              monitored in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
