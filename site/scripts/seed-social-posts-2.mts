// Second batch — 4 more stories found in social-posts/2026-09/2026-09-25/
// (07 Notices/, 08 Residents need to know/) that weren't in the first pass.
// Same pattern as seed-social-posts.mts.
//
// Run with: npm run seed:social-posts-2

import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";
import { paragraphsToPortableText } from "../src/sanity/types.ts";

interface SeedPost {
  slug: string;
  title: string;
  category: "news" | "travel" | "community" | "events" | "business";
  publishedAt: string;
  standfirst: string;
  body: string[];
  sourceAttribution: string;
  relatedSlugs?: string[];
}

const posts: SeedPost[] = [
  {
    slug: "be-first-50000-homes-2037",
    title: "50,000 homes and 20,000 jobs by 2037",
    category: "news",
    publishedAt: "2026-09-11T09:00:00+01:00",
    standfirst:
      "Be First, the council's own development company, has 400 hectares earmarked across Barking & Dagenham. Castle Green, Barking Riverside and the Thames Road Factory District are the big three.",
    body: [
      "Be First, the council's own development company, has set a target of 50,000 new homes and 20,000 jobs across the borough by 2037, built across roughly 400 hectares of earmarked land.",
      "The three biggest sites are Castle Green (7,000 homes, part of which sits above the proposed A13 tunnel), Barking Riverside (10,000 to 20,000 homes) and the Thames Road Factory District (3,500 homes).",
    ],
    sourceAttribution: "Be First, befirst.london",
    relatedSlugs: ["a13-tunnel-explainer", "flat-conversion-29500-confiscated"],
  },
  {
    slug: "nhs-pathology-lab-upgrade",
    title: "£1.4m lab upgrade speeds up test results",
    category: "news",
    publishedAt: "2026-09-08T09:00:00+01:00",
    standfirst:
      "A £1.4m investment in cellular pathology has added four new machines and brought test turnaround back within target.",
    body: [
      "An NHS trust's cellular pathology service — tissue and cell samples — has had a £1.4m investment from NHS England, funding four new machines.",
      "The service is now meeting its 21- and 28-day turnaround targets for results.",
    ],
    sourceAttribution: "NHS trust statement, 7 September 2026",
    relatedSlugs: ["377-eye-patients-two-weekends"],
  },
  {
    slug: "village-ward-crime-figures-july",
    title: "What was reported in Village ward in July",
    category: "news",
    publishedAt: "2026-09-12T09:00:00+01:00",
    standfirst:
      "Met figures for one Dagenham ward of around 12,500 people. Violence and sexual offences is one broad category, counting harassment and common assault alongside serious offences.",
    body: [
      "Metropolitan Police figures for Village ward — a Dagenham ward of around 12,500 people — recorded 59 reports of violence and sexual offences in July, 27 of anti-social behaviour, 15 of robbery and 15 of vehicle crime.",
      "Violence and sexual offences is a broad Met category that counts harassment and common assault alongside more serious offences, so a high count doesn't necessarily mean a high number of serious crimes. Check your own ward's figures via the Met's crime map.",
    ],
    sourceAttribution: "Metropolitan Police, July 2026",
  },
  {
    slug: "hospital-parking-charges-rise",
    title: "Hospital parking costs rise — first 30 minutes now free",
    category: "news",
    publishedAt: "2026-09-16T09:00:00+01:00",
    standfirst:
      "Charges at Queen's and King George go up from Monday 21 September. A new free half-hour covers quick trips — prescription pick-ups and dropping things off for patients.",
    body: [
      "Parking charges at Queen's Hospital and King George Hospital go up from Monday 21 September, though a new free first 30 minutes has been introduced alongside the rise.",
      "The free half-hour is meant to cover quick trips — picking up a prescription or dropping something off for a patient — without needing to pay for a full stay.",
    ],
    sourceAttribution: "Queen's & King George hospitals, from Mon 21 September",
    relatedSlugs: ["377-eye-patients-two-weekends"],
  },
];

async function main() {
  if (!isSanityConfigured || !writeToken) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
    process.exitCode = 1;
    return;
  }

  console.log(`Seeding ${posts.length} more posts...`);

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
      developing: false,
      sourceAttribution: post.sourceAttribution,
      sourcesLog: [{ at: post.publishedAt, note: `Confirmed via ${post.sourceAttribution}.`, _key: post.publishedAt }],
      featured: false,
      breaking: false,
      spotlight: false,
    });
    console.log(`  post: ${post.title}`);
  }

  for (const post of posts) {
    if (!post.relatedSlugs || post.relatedSlugs.length === 0) continue;
    await writeClient
      .patch(`post-${post.slug}`)
      .set({
        relatedPosts: post.relatedSlugs.map((slug) => ({ _type: "reference", _ref: `post-${slug}`, _key: slug })),
      })
      .commit();
    console.log(`  post: ${post.title} (related linked)`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
