// One-time (safely re-runnable) seed: pushes the local sample content in
// src/lib/content/*.ts into a real Sanity dataset, so a fresh project starts
// with the same content the site has been rendering from the fallback data.
//
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (a token with Editor access, from
// sanity.io/manage → API → Tokens) in the environment. Run with:
//
//   npm run migrate:sanity
//
// Uses deterministic document IDs (`category-<slug>`, `post-<slug>`) and
// createOrReplace, so running it again just re-syncs the same documents
// rather than duplicating them. Posts are written in two passes — Sanity
// enforces referential integrity, so `relatedPosts` (post -> post) has to be
// patched in once every post document already exists.

// Explicit .ts extensions — this file runs directly under Node's native ESM
// loader (see the npm script), which, unlike Next.js/webpack, requires the
// real file extension in relative specifiers.
import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";
import { categories } from "../src/lib/content/categories.ts";
import { posts } from "../src/lib/content/posts.ts";
import { upcomingEvents, travelAlerts } from "../src/lib/content/homepage-extras.ts";
import { paragraphsToPortableText } from "../src/sanity/types.ts";

async function main() {
  if (!isSanityConfigured || !writeToken) {
    console.error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN — see this file's header comment."
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Seeding dataset via project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}...`);

  for (const category of categories) {
    await writeClient.createOrReplace({
      _id: `category-${category.slug}`,
      _type: "category",
      name: category.name,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
    });
    console.log(`  category: ${category.name}`);
  }

  for (const post of posts) {
    await writeClient.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      category: { _type: "reference", _ref: `category-${post.category}` },
      standfirst: post.standfirst,
      body: paragraphsToPortableText(post.body),
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      developing: post.developing,
      sourceAttribution: post.sourceAttribution,
      sourcesLog: post.sourcesLog.map((entry) => ({ ...entry, _key: entry.at })),
      featured: Boolean(post.featured),
      breaking: Boolean(post.breaking),
      spotlight: [
        "litter-pick-group-hundredth-saturday",
        "local-sixth-form-engineering-course",
        "family-bakery-reopens",
      ].includes(post.slug),
      severity: post.severity,
      // relatedPosts omitted here — patched in below, once every post exists.
    });
    console.log(`  post: ${post.title}`);
  }

  for (const post of posts) {
    if (post.relatedSlugs.length === 0) continue;
    await writeClient
      .patch(`post-${post.slug}`)
      .set({
        relatedPosts: post.relatedSlugs.map((slug) => ({
          _type: "reference",
          _ref: `post-${slug}`,
          _key: slug,
        })),
      })
      .commit();
    console.log(`  post: ${post.title} (related linked)`);
  }

  for (const event of upcomingEvents) {
    await writeClient.createOrReplace({
      _id: `event-${slugify(event.title)}`,
      _type: "event",
      title: event.title,
      date: event.date,
      location: event.location,
      detail: event.detail,
    });
    console.log(`  event: ${event.title}`);
  }

  for (const alert of travelAlerts) {
    await writeClient.createOrReplace({
      _id: `travelAlert-${slugify(alert.title)}`,
      _type: "travelAlert",
      severity: alert.severity,
      title: alert.title,
      detail: alert.detail,
      active: true,
      updatedAt: new Date().toISOString(),
      relatedPost: alert.articleSlug ? { _type: "reference", _ref: `post-${alert.articleSlug}` } : undefined,
    });
    console.log(`  travel alert: ${alert.title}`);
  }

  console.log(
    "Done. Run `npm run dev` in studio-dagenhamupdates/ (or open the deployed Studio) to see it, " +
      "and check that exactly one post has featured:true and one has breaking:true."
  );
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
