import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadProps {
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}

/** The one section-head pattern used everywhere: 3px ink rule, uppercase
 * label, optional link on the right (tokens.css .du-section-head). */
export function SectionHead({ children, href, linkLabel = "See all" }: SectionHeadProps) {
  return (
    <div className="du-section-head">
      <h2 className="du-label-section" style={{ margin: 0 }}>
        {children}
      </h2>
      {href ? (
        <Link
          href={href}
          style={{
            fontSize: "var(--du-body-sm)",
            fontWeight: 700,
            borderBottom: "none",
          }}
        >
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}
