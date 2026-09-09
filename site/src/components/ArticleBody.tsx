import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/sanity/types";

const bodyTextStyle = {
  fontFamily: "var(--du-font-display)",
  fontSize: "var(--du-body-lg)",
  lineHeight: "var(--du-body-leading)",
  color: "var(--du-ink)",
  margin: 0,
  textWrap: "pretty" as const,
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={bodyTextStyle}>{children}</p>,
    h2: ({ children }) => (
      <h2 className="du-headline" style={{ fontSize: "var(--du-display-2)", marginTop: 8 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="du-headline" style={{ fontSize: "var(--du-display-3)", marginTop: 8 }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          ...bodyTextStyle,
          borderLeft: "3px solid var(--du-rule-strong)",
          paddingLeft: "var(--du-space-4)",
          fontStyle: "italic",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

/** Renders a post's body — Portable Text from Sanity, or plain paragraphs
 * wrapped into the same shape by the local fallback (see
 * src/sanity/types.ts's paragraphsToPortableText). One render path either
 * way. */
export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div style={{ marginTop: "var(--du-space-6)", display: "flex", flexDirection: "column", gap: "var(--du-space-4)" }}>
      <PortableText value={value} components={components} />
    </div>
  );
}
