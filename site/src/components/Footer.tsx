import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="du-footer">
      <div className="du-container">
        <div className="du-footer__grid">
          <div className="du-footer__col">
            <span
              className="du-headline"
              style={{ fontSize: "var(--du-display-4)", color: "var(--du-ink-inverse)" }}
            >
              {siteConfig.name}
            </span>
            <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-inverse-mute)", maxWidth: 320 }}>
              Independent local updates for Barking &amp; Dagenham and nearby parts of
              East London and Essex.
            </p>
          </div>

          <nav className="du-footer__col" aria-label="Sections">
            <span className="du-label-box" style={{ color: "var(--du-ink-inverse-mute)" }}>
              Sections
            </span>
            <Link href="/latest-updates">Latest updates</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </nav>

          <nav className="du-footer__col" aria-label="About and legal">
            <span className="du-label-box" style={{ color: "var(--du-ink-inverse-mute)" }}>
              More
            </span>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact / Submit a tip</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms &amp; conditions</Link>
          </nav>
        </div>

        <div className="du-footer__bottom">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
              X
            </a>
          </div>
          <p style={{ margin: 0 }}>
            © {year} {siteConfig.name}. {siteConfig.description}
          </p>
          <p style={{ margin: 0 }}>
            Dagenham Updates is an independent local information service. Where
            possible, we verify content before publishing. For urgent situations,
            always check official sources.
          </p>
          <p style={{ margin: 0, fontWeight: 600 }}>
            Not affiliated with the London Borough of Barking &amp; Dagenham.
          </p>
        </div>
      </div>
    </footer>
  );
}
