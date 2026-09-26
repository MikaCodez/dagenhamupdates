import { describe, expect, it } from "vitest";
import {
  posts,
  getPost,
  getPostsByCategory,
  getLatestPosts,
  getFeaturedPost,
  getBreakingPost,
  getRelatedPosts,
} from "./posts";

// Sample/fallback content (site/README.md: what the app renders whenever
// NEXT_PUBLIC_SANITY_PROJECT_ID isn't set) — these lock down the ordering
// and lookup rules the Sanity-backed queries.ts is expected to match.

describe("getPost", () => {
  it("finds a post by slug", () => {
    expect(getPost("family-bakery-reopens")?.title).toBe(
      "Family bakery reopens after six months of works"
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });
});

describe("getPostsByCategory", () => {
  it("returns only posts in that category, newest first", () => {
    const travel = getPostsByCategory("travel");
    expect(travel.every((p) => p.category === "travel")).toBe(true);
    expect(travel.length).toBeGreaterThan(1);
    for (let i = 1; i < travel.length; i++) {
      expect(+new Date(travel[i - 1].publishedAt)).toBeGreaterThanOrEqual(
        +new Date(travel[i].publishedAt)
      );
    }
  });

  it("returns an empty array for a category with no posts", () => {
    // categories.ts only defines the 5 used above; this asserts the
    // function degrades to [] rather than throwing on a slug it doesn't
    // recognise, e.g. after a future category rename.
    // @ts-expect-error — deliberately an invalid CategorySlug.
    expect(getPostsByCategory("not-a-real-category")).toEqual([]);
  });
});

describe("getLatestPosts", () => {
  it("sorts every post newest first when no limit is given", () => {
    const all = getLatestPosts();
    expect(all).toHaveLength(posts.length);
    for (let i = 1; i < all.length; i++) {
      expect(+new Date(all[i - 1].publishedAt)).toBeGreaterThanOrEqual(
        +new Date(all[i].publishedAt)
      );
    }
  });

  it("respects a limit", () => {
    expect(getLatestPosts(3)).toHaveLength(3);
  });
});

describe("getFeaturedPost", () => {
  it("returns the post flagged featured:true", () => {
    expect(getFeaturedPost().featured).toBe(true);
  });
});

describe("getBreakingPost", () => {
  it("returns the post flagged breaking:true", () => {
    expect(getBreakingPost()?.breaking).toBe(true);
  });
});

describe("getRelatedPosts", () => {
  it("resolves relatedSlugs to actual posts, in order", () => {
    const post = getPost("a13-westbound-closed-goresbrook")!;
    const related = getRelatedPosts(post);
    expect(related.map((p) => p.slug)).toEqual(post.relatedSlugs);
  });

  it("silently drops a relatedSlug that doesn't resolve to a post", () => {
    const fake = { ...posts[0], relatedSlugs: ["does-not-exist", posts[1].slug] };
    expect(getRelatedPosts(fake).map((p) => p.slug)).toEqual([posts[1].slug]);
  });
});
