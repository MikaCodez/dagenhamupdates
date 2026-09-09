import Link from "next/link";
import type { PostSummary } from "@/sanity/types";
import { getCategory } from "@/lib/content/categories";
import { formatDateTime } from "@/lib/format";
import { DevelopingLabel } from "./DevelopingLabel";

interface ArticleCardProps {
  post: PostSummary;
  /** "row" (feed / category list) or "compact" (rail / related). */
  variant?: "row" | "compact";
}

export function ArticleCard({ post, variant = "row" }: ArticleCardProps) {
  const category = getCategory(post.category);
  const kickerColor =
    post.category === "travel" ? "var(--du-accent)" : "var(--du-ink-muted)";
  const titleSize = variant === "compact" ? "var(--du-display-4)" : "var(--du-display-2)";

  return (
    <article
      style={{
        borderTop: "1px solid var(--du-rule)",
        padding: "var(--du-space-5) 0",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span className="du-kicker" style={{ color: kickerColor }}>
          {category?.name ?? post.category}
        </span>
        {post.developing ? <DevelopingLabel /> : null}
        <span aria-hidden="true" style={{ color: "var(--du-dot)" }}>
          ·
        </span>
        <time
          dateTime={post.publishedAt}
          style={{ fontSize: "var(--du-meta)", color: "var(--du-ink-muted)" }}
        >
          {formatDateTime(post.publishedAt)}
        </time>
      </div>

      <h3 style={{ margin: 0 }}>
        <Link
          href={`/articles/${post.slug}`}
          className="du-headline"
          style={{
            fontSize: titleSize,
            display: "block",
            borderBottom: "none",
            color: "var(--du-ink)",
          }}
        >
          {post.title}
        </Link>
      </h3>

      {variant === "row" ? (
        <p
          style={{
            margin: 0,
            fontSize: "var(--du-body)",
            lineHeight: "var(--du-body-leading)",
            color: "var(--du-ink-secondary)",
          }}
        >
          {post.standfirst}
        </p>
      ) : null}
    </article>
  );
}
