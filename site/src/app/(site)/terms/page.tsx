import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to using the Dagenham Updates website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)", maxWidth: "var(--du-reading-col)" }}>
      <header>
        <p className="du-kicker">Legal</p>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
          Terms &amp; conditions
        </h1>
        <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", marginTop: 10 }}>
          Last updated [DATE]. This is a starting draft, not legal advice —
          have it reviewed before publishing.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--du-space-6)", marginTop: "var(--du-space-6)" }}>
        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            About this site
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            {siteConfig.name} is an independent local information service. We
            are not affiliated with the London Borough of Barking &amp;
            Dagenham or any other public body named on this site. By using
            this website, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Accuracy of information
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            We aim to check information against official sources before
            publishing, and label stories that are still developing. Even so,
            local information — especially travel disruption, closures and
            fast-moving incidents — can change quickly and without notice.
            Nothing on this site should be treated as a substitute for
            official sources, and for anything urgent or safety-related you
            should always verify with the relevant official body. In an
            emergency, contact the emergency services directly rather than
            relying on this site.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Corrections
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            If we get something wrong, we correct it and log the change on the
            article rather than editing it silently. You can request a
            correction at any time via our{" "}
            <a href="/contact">contact form</a>.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            User submissions
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            If you submit a tip, event listing, community notice or other
            content through this site, you confirm it's accurate to the best
            of your knowledge and that you have the right to share it. We may
            edit submissions for clarity, length or house style, verify claims
            before publishing, or decline to publish anything at our
            discretion. Submitting content does not guarantee it will be
            published.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Intellectual property
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            Text, images and design on this site belong to {siteConfig.name} or
            our licensors unless credited otherwise, and may not be
            reproduced without permission. Attributed sources remain the
            property of their original owners.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Liability
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            This site is provided "as is" without warranties of any kind. To
            the fullest extent permitted by law, {siteConfig.name} is not
            liable for any loss or damage arising from your use of, or
            reliance on, information on this site.
          </p>
        </section>

        <section>
          <h2 className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
            Contact
          </h2>
          <p style={{ fontSize: "var(--du-body)", lineHeight: "var(--du-body-leading)", color: "var(--du-ink-secondary)", marginTop: 12 }}>
            Questions about these terms: [CONTACT EMAIL].
          </p>
        </section>
      </div>
    </div>
  );
}
