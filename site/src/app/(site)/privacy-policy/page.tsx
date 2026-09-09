import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dagenham Updates collects, uses and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)", maxWidth: "var(--du-reading-col)" }}>
      <header>
        <p className="du-kicker">Legal</p>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
          Privacy policy
        </h1>
        <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", marginTop: 10 }}>
          Last updated [DATE]. This is a starting draft, not legal advice —
          have it reviewed before publishing.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--du-space-6)", marginTop: "var(--du-space-6)" }}>
        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Who we are
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            {siteConfig.name} ("we", "us") is an independent local information
            service covering Barking &amp; Dagenham and surrounding areas. This
            policy explains what information we collect through this website,
            why, and what you can do about it. It applies to {siteConfig.url}{" "}
            and doesn't cover our social media accounts, which follow their
            platform's own privacy terms.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            What we collect
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            <strong>Tips and submissions.</strong> When you use the Submit a
            Tip form, we collect whatever you enter — subject, message, an
            optional attachment, and your name and email address unless you
            choose to submit anonymously. If you go anonymous, we do not
            collect your name or email at all, which also means we can't
            follow up with you.
          </p>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            <strong>Newsletter signup.</strong> If you enter your email
            address to subscribe, we collect that address for the purpose of
            sending the round-up email. [PROVIDER NAME] will process this on
            our behalf once the newsletter is live.
          </p>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            <strong>Usage data.</strong> Like most websites, we (or an
            analytics service acting for us) may collect standard technical
            information — pages viewed, approximate location from your IP
            address, device and browser type — to understand how the site is
            used. See "Analytics" below.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            How we use it
          </h2>
          <ul style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12, paddingLeft: 20 }}>
            <li>To review, verify and, where appropriate, act on tips and submissions.</li>
            <li>To reply to you, if you've given us a way to and haven't asked to stay anonymous.</li>
            <li>To send the newsletter round-up, if you've subscribed.</li>
            <li>To understand and improve how the site is used.</li>
          </ul>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            We keep submitted information to a minimum required for these
            purposes and avoid exposing anyone's personal data in anything we
            publish, per our editorial trust &amp; safety commitments.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Analytics
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            We use Google Analytics (GA4) to understand traffic to the site —
            which pages are read, which social channels send visitors, and
            general device/location information. Google may process this data
            under its own privacy terms. You can opt out using your browser's
            do-not-track or cookie settings, or a browser extension that blocks
            analytics scripts.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Your rights
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            Under UK data protection law, you can ask what information we hold
            about you, ask us to correct or delete it, or withdraw consent
            (for example, unsubscribing from the newsletter at any time). To do
            any of this, contact us at [CONTACT EMAIL]. If you're unhappy with
            our response, you can complain to the Information Commissioner's
            Office (ico.org.uk).
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Contact
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            Questions about this policy: [CONTACT EMAIL].
          </p>
        </section>
      </div>
    </div>
  );
}
