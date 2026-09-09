"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import { categories } from "@/lib/content/categories";
import type { PostSummary } from "@/sanity/types";

// Client-side chips, not separate URLs (design-decisions.md, "Interaction
// decisions"): category *pages* still exist for SEO; these chips are a
// browse convenience layered on top of the full archive. "Alerts" carries no
// posts of its own yet — filtering to it deliberately reproduces the empty
// state below rather than being hidden, per the same doc's "empty state is a
// prompt, not a dead end."
const chipNames = ["All", ...categories.map((c) => c.name), "Alerts"];

export function FeedFilters({ posts }: { posts: PostSummary[] }) {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState(() => {
    const fromUrl = searchParams.get("cat");
    return fromUrl && chipNames.includes(fromUrl) ? fromUrl : "All";
  });
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const filtered = useMemo(() => {
    let list = posts;
    if (activeCat === "Alerts") {
      list = [];
    } else if (activeCat !== "All") {
      list = list.filter((p) => p.category === activeCat.toLowerCase());
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.standfirst.toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, activeCat, query]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {chipNames.map((name) => {
          const active = name === activeCat;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveCat(name)}
              style={{
                border: "1px solid var(--du-ink)",
                background: active ? "var(--du-ink)" : "var(--du-paper)",
                color: active ? "var(--du-ink-inverse)" : "var(--du-ink)",
                padding: "9px 16px",
                fontSize: "var(--du-label-button)",
                fontWeight: 700,
                letterSpacing: "var(--du-tracking-button)",
                textTransform: "uppercase",
                cursor: "pointer",
                minHeight: "var(--du-tap-min)",
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "var(--du-space-4)", display: "flex", alignItems: "center", gap: 12 }}>
        <label className="du-visually-hidden" htmlFor="du-feed-search">
          Search updates
        </label>
        <input
          id="du-feed-search"
          type="search"
          placeholder="Search these updates"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: "1px solid var(--du-rule)",
            background: "var(--du-field)",
            padding: "11px 14px",
            fontSize: "var(--du-body-sm)",
            width: "100%",
            maxWidth: 320,
            fontFamily: "var(--du-font-ui)",
          }}
        />
        <span style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", whiteSpace: "nowrap" }}>
          {filtered.length === 1 ? "1 update" : `${filtered.length} updates`}
        </span>
      </div>

      <div style={{ marginTop: "var(--du-space-2)" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "var(--du-space-7) 0",
              borderTop: "1px solid var(--du-rule)",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--du-ink-secondary)", marginBottom: "var(--du-space-4)" }}>
              Nothing here yet{activeCat !== "All" ? ` for ${activeCat}` : ""}.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                border: "1px solid var(--du-ink)",
                padding: "13px 20px",
                fontSize: "var(--du-label-button)",
                fontWeight: 700,
                letterSpacing: "var(--du-tracking-button)",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--du-ink)",
              }}
            >
              Send us something for this one
            </Link>
          </div>
        ) : (
          filtered.map((post) => <ArticleCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
