import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/sanity/types";
import { getCategory } from "@/lib/content/categories";
import { formatDateTime } from "@/lib/format";
import { DevelopingLabel } from "./DevelopingLabel";

/** The homepage lead story — a distinct slot from the breaking strip
 * (see BreakingStrip.tsx and the `featured` vs `breaking` flags on the
 * `post` Sanity schema / fallback data). */
export function FeaturedCard({ post }: { post: PostSummary }) {
  const category = getCategory(post.category);
  return (
    <div>
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.imageAlt ?? ""}
          width={760}
          height={380}
          // contain, not cover — these are as often text-carrying graphic
          // cards as photos, and cropping text off a graphic reads as a
          // rendering bug, not a stylistic choice, the way cropping a photo
          // does. The fill colour keeps any letterboxing looking deliberate.
          style={{ width: "100%", height: 380, objectFit: "contain", background: "var(--du-placeholder-bg)" }}
          priority
        />
      ) : (
        <div className="du-placeholder-image" style={{ height: 380 }} aria-hidden="true">
          Featured image
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
        <span className="du-kicker" style={{ color: "var(--du-accent)" }}>
          {category?.name ?? post.category}
        </span>
        {post.developing ? <DevelopingLabel /> : null}
      </div>
      <h2 className="du-headline" style={{ fontSize: "var(--du-display-lead)", margin: "10px 0 0 0" }}>
        <Link href={`/articles/${post.slug}`} style={{ borderBottom: "none", color: "inherit" }}>
          {post.title}
        </Link>
      </h2>
      <p
        style={{
          fontFamily: "var(--du-font-display)",
          fontSize: "var(--du-body-lg)",
          lineHeight: 1.5,
          color: "var(--du-ink-secondary)",
          marginTop: 14,
          maxWidth: 660,
          textWrap: "pretty",
        }}
      >
        {post.standfirst}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
        <time
          dateTime={post.publishedAt}
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", color: "var(--du-ink-muted)" }}
        >
          {formatDateTime(post.publishedAt)}
        </time>
        {post.sourceAttribution ? (
          <>
            <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--du-dot)" }} />
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", color: "var(--du-ink-muted)" }}>
              {post.sourceAttribution}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
