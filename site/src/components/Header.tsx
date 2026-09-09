"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/content/categories";
import { ButtonLink } from "./Button";
import { siteConfig } from "@/lib/site-config";

interface NavItem {
  label: string;
  href: string;
  accent?: boolean;
}

const navItems: NavItem[] = [
  { label: "Latest", href: "/latest-updates", accent: true },
  ...categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
  { label: "About", href: "/about" },
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** Header + primary nav. Mobile nav is a push-down drawer, not an overlay —
 * design-decisions.md: "simpler, and it never traps a scroll position." */
export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Rendered after mount only, so a statically-built page never bakes in a
  // stale date — see src/lib/format.ts's reasoning against build-time
  // relative/absolute "now" values.
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(dateFormatter.format(new Date()));
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header>
      <a href="#du-main" className="du-skip-link">
        Skip to content
      </a>

      <div className="du-utility-bar">
        <div className="du-container du-utility-bar__row">
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: "var(--du-ink-muted)" }}>
            {today ? `${today} · ` : ""}Barking &amp; Dagenham
          </span>
          <ul className="du-social-links">
            <li>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
                X
              </a>
            </li>
            <li>
              <Link href="/#newsletter">Newsletter</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="du-container" style={{ paddingTop: "var(--du-space-6)" }}>
        <p
          className="du-kicker"
          style={{ textAlign: "center", color: "var(--du-ink-muted)", letterSpacing: "0.24em" }}
        >
          Independent local updates
        </p>
        <Link
          href="/"
          className="du-headline"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "clamp(34px, 7vw, 68px)",
            marginTop: 12,
            color: "var(--du-ink)",
            borderBottom: "none",
          }}
        >
          {siteConfig.name}
        </Link>
        <div
          style={{
            height: 4,
            borderTop: "3px solid var(--du-ink)",
            borderBottom: "1px solid var(--du-ink)",
            marginTop: "var(--du-space-5)",
          }}
        />
      </div>

      <div className="du-nav-row">
        <div className="du-container du-nav-row__inner">
          <button
            type="button"
            className="du-nav-toggle"
            aria-expanded={drawerOpen}
            aria-controls="du-nav-drawer"
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Menu
          </button>

          <ul className="du-nav-desktop">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  style={item.accent ? { color: "var(--du-accent)", fontWeight: 700 } : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="du-nav-actions">
            <form className="du-search-form" role="search" action="/latest-updates" method="GET">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--du-ink-muted)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.6-3.6" />
              </svg>
              <label className="du-visually-hidden" htmlFor="du-search">
                Search updates
              </label>
              <input id="du-search" name="q" type="search" placeholder="Search updates" />
            </form>
            <ButtonLink href="/contact" variant="primary" size="sm">
              Submit a tip
            </ButtonLink>
          </div>
        </div>
      </div>

      {drawerOpen ? (
        <nav id="du-nav-drawer" className="du-nav-drawer" aria-label="Primary">
          <div className="du-container" style={{ display: "flex", flexDirection: "column" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={item.accent ? { color: "var(--du-accent)" } : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
