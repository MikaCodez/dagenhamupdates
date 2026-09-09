import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Dagenham Updates is, what we cover, how we source information, and how to send us a tip.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)", maxWidth: "var(--du-reading-col)" }}>
      <header>
        <p className="du-kicker">About</p>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
          An independent local information service
        </h1>
        <p
          style={{
            fontFamily: "var(--du-font-display)",
            fontSize: "var(--du-body-lg)",
            lineHeight: 1.5,
            color: "var(--du-ink-secondary)",
            marginTop: 14,
            textWrap: "pretty",
          }}
        >
          Dagenham Updates is an independent local information service covering
          Barking &amp; Dagenham and surrounding parts of East London and Essex.
          We share timely updates on news, travel, events, community notices and
          public-interest stories — for residents and businesses across the
          borough and nearby areas.
        </p>
      </header>

      <section style={{ marginTop: "var(--du-space-7)" }}>
        <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
          Why this exists
        </h2>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          Residents currently check several different sources — council pages,
          transport operators, community groups, local social accounts — to
          keep up with what's happening locally. Dagenham Updates brings the
          most useful of these into one place, and acts as the home base and
          archive for our social media presence on Instagram and X.
        </p>
      </section>

      <section style={{ marginTop: "var(--du-space-7)" }}>
        <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
          How we source information
        </h2>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          We prefer official council sources, transport and travel operators,
          police and fire updates, event organisers, business owners and
          verified community submissions. Where a story isn't yet confirmed, we
          label it "Developing" rather than presenting it as settled fact. We
          do not publish rumours as fact, unverified accusations or anything
          that could identify someone without reason.
        </p>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          Mistakes happen. When they do, we correct the record rather than
          silently editing a page — every article carries a timestamped
          sources &amp; updates log, and you can request a correction at any
          time via our{" "}
          <a href="/contact">contact form</a>.
        </p>
        <p
          style={{
            fontSize: "var(--du-body-sm)",
            fontWeight: 600,
            color: "var(--du-ink)",
            marginTop: 16,
            border: "1px solid var(--du-rule)",
            background: "var(--du-panel)",
            padding: "var(--du-space-4)",
          }}
        >
          For urgent situations — a fire, a crime in progress, a medical
          emergency — always contact the emergency services first. Do not rely
          on this site, or wait for us to publish something, before doing so.
        </p>
      </section>

      <section style={{ marginTop: "var(--du-space-7)" }}>
        <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
          Independence
        </h2>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          Dagenham Updates is not affiliated with the London Borough of Barking
          &amp; Dagenham, or with any other public body, political party or
          business mentioned on this site. Where we report on council or
          public-body activity, we do so as an independent observer.
        </p>
      </section>

      <section style={{ marginTop: "var(--du-space-7)" }}>
        <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
          Send us a tip
        </h2>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          Local news, an event to list, a community notice, a business update
          or a correction — we want to hear it. You can ask to stay anonymous.
        </p>
        <ButtonLink href="/contact" variant="primary" style={{ marginTop: 16 }}>
          Submit a tip
        </ButtonLink>
      </section>

      <section id="social" style={{ marginTop: "var(--du-space-7)" }}>
        <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
          Follow along
        </h2>
        <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
          The fastest updates go out on social media first.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <ButtonLink href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </ButtonLink>
          <ButtonLink href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
            X
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
