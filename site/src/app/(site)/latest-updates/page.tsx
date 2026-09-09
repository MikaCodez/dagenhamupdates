import type { Metadata } from "next";
import { Suspense } from "react";
import { FeedFilters } from "@/components/FeedFilters";
import { getLatestPosts } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Latest Updates",
  description:
    "All recent updates for Barking & Dagenham — news, travel, community notices, events and business, filterable by category.",
  alternates: { canonical: "/latest-updates" },
};

// Revalidate periodically so new/edited posts show up without a full
// redeploy; the on-publish webhook (see /api/revalidate) makes it instant.
export const revalidate = 60;

export default async function LatestUpdatesPage() {
  const posts = await getLatestPosts();

  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)" }}>
      <header style={{ borderBottom: "var(--du-section-rule)", paddingBottom: "var(--du-space-5)" }}>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: 0 }}>
          Latest updates
        </h1>
        <p style={{ fontSize: "var(--du-body)", color: "var(--du-ink-secondary)", marginTop: 10 }}>
          Every recent update, most recent first.
        </p>
      </header>

      <div style={{ marginTop: "var(--du-space-6)" }}>
        <Suspense fallback={null}>
          <FeedFilters posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
