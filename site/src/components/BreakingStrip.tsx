import Link from "next/link";
import type { PostSummary } from "@/sanity/types";
import { formatDateTime } from "@/lib/format";

/** The thin, high-contrast strip for the single most urgent current
 * situation — separate from the homepage's lead story (posts.ts's `breaking`
 * flag). PRD wireframe §3 calls this out as where "urgent travel disruption,
 * council news or breaking local information appears." */
export function BreakingStrip({ post }: { post: PostSummary }) {
  return (
    <div style={{ background: "var(--du-panel)", borderBottom: "1px solid var(--du-rule)" }}>
      <div
        className="du-container"
        style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 0", flexWrap: "wrap" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "var(--du-accent)",
            color: "#FFFFFF",
            padding: "7px 12px",
            flexShrink: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#FFFFFF" }}
          />
          <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Breaking
          </span>
        </span>
        <Link
          href={`/articles/${post.slug}`}
          className="du-headline"
          style={{ fontSize: 19, flexGrow: 1, minWidth: 240, borderBottom: "none", color: "var(--du-ink)" }}
        >
          {post.title}
        </Link>
        <time
          dateTime={post.publishedAt}
          style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: "0.06em", color: "var(--du-ink-muted)", flexShrink: 0 }}
        >
          {formatDateTime(post.publishedAt)}
        </time>
      </div>
    </div>
  );
}
