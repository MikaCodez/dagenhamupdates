// Pushes real borough-news posts (matching the daily Instagram/X graphics in
// ../../social-posts/) into Sanity as `post` documents. Same pattern as
// migrate-to-sanity.mts — deterministic `post-<slug>` IDs + createOrReplace,
// so re-running this is safe and just re-syncs the same documents.
//
// These posts have no featuredImage yet — the matching graphic files aren't
// on disk anywhere this script can read from (see social-posts/README.md).
// Once they are, attach them the same way /api/tip's attachment upload does:
// `writeClient.assets.upload("image", buffer, { filename })`, then patch
// each post's `featuredImage.asset` to reference the uploaded asset's `_id`.
//
// Run with: node --env-file-if-exists=.env.local --experimental-strip-types scripts/seed-social-posts.mts

import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";
import { paragraphsToPortableText } from "../src/sanity/types.ts";

interface SeedPost {
  slug: string;
  title: string;
  category: "news" | "travel" | "community" | "events" | "business";
  publishedAt: string; // ISO, with offset
  standfirst: string;
  body: string[];
  sourceAttribution: string;
  relatedSlugs?: string[];
}

const posts: SeedPost[] = [
  {
    slug: "black-history-month-opens-1-october",
    title: "Black History Month opens on 1 October",
    category: "news",
    publishedAt: "2026-09-24T09:00:00+01:00",
    standfirst:
      "This year's theme is Honouring Our Communities. The flag goes up outside Barking Town Hall on Thursday 1 October and stays there all month, with free events across the borough.",
    body: [
      "Barking & Dagenham's Black History Month opens on Thursday 1 October, when the flag goes up outside Barking Town Hall for the month. This year's national theme is Honouring Our Communities.",
      "Free events run across the borough throughout October — some need booking, most don't. Full listings are on the council's Black History Month page.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham",
    relatedSlugs: ["neighbourhood-fund-now-open", "valence-primary-unicef-gold-award"],
  },
  {
    slug: "council-five-promises-children-in-care",
    title: "Council agrees five promises to children in care",
    category: "news",
    publishedAt: "2026-09-16T09:00:00+01:00",
    standfirst:
      "The Corporate Parenting Strategy 2026 to 2030 went through Cabinet on 15 September. The five promises were shaped by what children and young people in care said mattered most to them.",
    body: [
      "The council's Corporate Parenting Strategy 2026–2030 went through Cabinet on 15 September, setting out five promises to the borough's children in care and care leavers — currently 409 children in care and 340 care leavers.",
      "The promises were shaped directly by what children and young people in care said mattered most to them, gathered through Skittlz, the young people's own council. Progress against the strategy will be reported annually through to 2030.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, agreed by Cabinet 15 September",
    relatedSlugs: ["neighbourhood-fund-now-open"],
  },
  {
    slug: "377-eye-patients-two-weekends",
    title: "377 eye patients seen over two weekends",
    category: "news",
    publishedAt: "2026-09-10T09:00:00+01:00",
    standfirst:
      "BHRUT's ophthalmology team ran weekend super clinics in August to clear a cataract backlog. Many of those patients had been waiting more than 18 weeks.",
    body: [
      "BHRUT's ophthalmology team ran weekend super clinics in August to work through a cataract backlog, seeing 377 patients across two weekends — many of whom had already been waiting more than 18 weeks.",
      "348 of those were cataract assessments, with 237 patients booked in for surgery prep. Attendance across the clinics ran at around 95%.",
    ],
    sourceAttribution: "BHRUT, 9 September",
    relatedSlugs: ["free-health-checks-every-monday"],
  },
  {
    slug: "145-fires-student-halls-five-years",
    title: "145 fires in student halls in five years",
    category: "news",
    publishedAt: "2026-09-15T09:00:00+01:00",
    standfirst:
      "A third of call-outs to students are cooking fires. London Fire Brigade is warning freshers about kitchens, candles and e-bike batteries as term starts.",
    body: [
      "London Fire Brigade says student accommodation has seen 145 fire call-outs in the past five years, with cooking responsible for around a third of them.",
      "As term starts, the brigade is warning new students specifically about kitchens, candles and e-bike batteries — lithium battery fires are a rising cause.",
    ],
    sourceAttribution: "London Fire Brigade",
  },
  {
    slug: "flat-conversion-29500-confiscated",
    title: "£29,500 taken back over an unlawful flat conversion",
    category: "news",
    publishedAt: "2026-09-18T09:00:00+01:00",
    standfirst:
      "A Dagenham house was split into two flats without permission. The council served an enforcement notice in 2019, it was not complied with, and a court has now confiscated the proceeds.",
    body: [
      "A Dagenham house that was split into two flats without planning permission has cost its owner £29,523.32, after a court confiscated the proceeds of the unlawful conversion.",
      "The council served an enforcement notice back in 2019 which was never complied with. The case was sentenced at Snaresbrook Crown Court on 17 September — a 12-month conditional discharge plus a £26 surcharge, with £2,000 in costs awarded to the council. The confiscation order is payable within three months.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, sentenced at Snaresbrook Crown Court 17 September",
    relatedSlugs: ["a13-tunnel-explainer"],
  },
  {
    slug: "fanshawe-centre-grounds-cleared",
    title: "Fanshawe Centre grounds cleared, and it cost nothing",
    category: "community",
    publishedAt: "2026-09-17T09:00:00+01:00",
    standfirst:
      "Around 10 young people on Community Payback have spent weeks cutting back overgrown trees and bushes at the Dagenham community centre. Quotes for the same work came in between £3,000 and £5,000.",
    body: [
      "The grounds at Fanshawe Community Centre in Dagenham have been cleared of overgrown trees and bushes — and it didn't cost the centre anything. Quotes for the same work from contractors had come in between £3,000 and £5,000.",
      "Around ten young people on Community Payback have been doing the work since August, and it's still going.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, 16 September",
    relatedSlugs: ["litter-pick-group-hundredth-saturday", "neighbourhood-fund-now-open"],
  },
  {
    slug: "free-makeup-skincare-workshop-cancer-patients",
    title: "Free makeup and skincare workshop for cancer patients",
    category: "community",
    publishedAt: "2026-09-18T09:00:00+01:00",
    standfirst:
      "Run with the charity Look Good Feel Better. Practical help with the things treatment changes, from sparse eyebrows to lost eyelashes, from a makeup artist who gave her time for free.",
    body: [
      "A free makeup and skincare workshop for cancer patients ran at St George's Health and Wellbeing Hub in Hornchurch, run with the charity Look Good Feel Better.",
      "A volunteer makeup artist gave her time for free, with practical help for the things treatment changes — from sparse eyebrows to lost eyelashes — and everyone left with products to take home. Ask your cancer nurse about the next session.",
    ],
    sourceAttribution: "NHS trust, 17 September",
    relatedSlugs: ["free-health-checks-every-monday", "carers-coffee-morning-monthly"],
  },
  {
    slug: "valence-primary-unicef-gold-award",
    title: "Valence Primary wins UNICEF's top school award",
    category: "community",
    publishedAt: "2026-09-19T09:00:00+01:00",
    standfirst: "Gold: Rights Respecting is the highest award UNICEF UK gives a school. Valence joined the programme in 2022.",
    body: [
      "Valence Primary School has been awarded Gold: Rights Respecting, UNICEF UK's highest award for schools, which it's held since joining the programme in 2022.",
      "Assessors praised the school for giving pupils a real say.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham",
    relatedSlugs: ["local-sixth-form-engineering-course"],
  },
  {
    slug: "banking-help-dagenham-learning-centre",
    title: "Banking help at Dagenham Learning Centre — but no cash services",
    category: "events",
    publishedAt: "2026-09-15T09:00:00+01:00",
    standfirst:
      "Barclays runs a drop-in for digital banking, payments, fraud and scams advice, power of attorney, bereavement and money worries. Advice only — no counter, no cash.",
    body: [
      "Barclays ran a drop-in advice session at Dagenham Learning Centre on Monday 21 September, covering digital banking, payments, fraud and scams advice, power of attorney and bereavement support.",
      "It was advice only — no counter and no cash services on site.",
    ],
    sourceAttribution: "LBBD Community Hubs",
    relatedSlugs: ["free-health-checks-every-monday"],
  },
  {
    slug: "learn-to-kayak-mayesbrook-park",
    title: "Learn to kayak at Mayesbrook Park",
    category: "events",
    publishedAt: "2026-09-22T09:00:00+01:00",
    standfirst:
      "Beginner session with Barking & Dagenham Canoe Club. Getting in and out of the boat, paddling forwards, backwards and turning. All kit provided, buoyancy aids included.",
    body: [
      "Barking & Dagenham Canoe Club is running a beginner kayaking session at Mayesbrook Park Lake on Saturday 26 September, 11am to 1pm — getting in and out of the boat, paddling forwards, backwards and turning.",
      "All kit and buoyancy aids are provided. £10 for adults, £5 for children aged 8 and up. Only 18 places, so email the club first.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["market-traders-weekend-lineup"],
  },
  {
    slug: "carers-coffee-morning-monthly",
    title: "Carers coffee morning, last Friday of every month",
    category: "events",
    publishedAt: "2026-09-23T09:00:00+01:00",
    standfirst:
      "Open to anyone who looks after someone: a parent, a partner, a child, a relative or a friend. Free, and you can join online instead of coming in.",
    body: [
      "A carers coffee morning runs on the last Friday of every month at 334 Heathway — open to anyone who looks after someone, whether that's a parent, partner, child, relative or friend.",
      "It's free, and you don't have to come in person — the centre can send Zoom joining details if you'd rather join online.",
    ],
    sourceAttribution: "Carers Centre SA Ltd, Dagenham",
    relatedSlugs: ["free-health-checks-every-monday", "free-makeup-skincare-workshop-cancer-patients"],
  },
  {
    slug: "free-health-checks-every-monday",
    title: "Free health checks every Monday morning",
    category: "events",
    publishedAt: "2026-09-20T09:00:00+01:00",
    standfirst:
      "Mini health checks, blood pressure monitoring and one-to-one advice from a qualified health coach. No appointment — just turn up.",
    body: [
      "Barking Learning Centre runs free mini health checks every Monday morning, 9am to 12pm — blood pressure monitoring and one-to-one advice from a qualified health coach.",
      "No appointment needed, just turn up.",
    ],
    sourceAttribution: "LBBD Community Hubs",
    relatedSlugs: ["377-eye-patients-two-weekends"],
  },
  {
    slug: "neighbourhood-fund-now-open",
    title: "The Neighbourhood Fund is now open",
    category: "events",
    publishedAt: "2026-09-21T09:00:00+01:00",
    standfirst:
      "£15,000 for local groups, closes 18 October. The council's Neighbourhood Fund is open again. Groups pitch Dragons Den style, and residents sit on the panel deciding where the money goes.",
    body: [
      "The council's Neighbourhood Fund is open again, offering up to £15,000 per group to community groups, charities and not-for-profits working in Barking & Dagenham.",
      "Groups pitch Dragons' Den style, and it's residents who sit on the panel deciding where the money goes. Applications close Sunday 18 October.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham",
    relatedSlugs: ["fanshawe-centre-grounds-cleared"],
  },
  {
    slug: "free-womens-self-defence-classes",
    title: "Free women's self defence classes",
    category: "events",
    publishedAt: "2026-09-24T09:00:00+01:00",
    standfirst:
      "Women's-only self defence classes at locations across the borough, in partnership with the Personal Safety Partnership. Free taster sessions.",
    body: [
      "Free women's-only self defence classes are running at five venues across the borough this autumn, in partnership with the Personal Safety Partnership and the Safer London Project.",
      "Sessions run Tuesday 25 November at Marks Gate Community Hub, Thursday 27 November and Saturday 6 December at Room 115, Barking Learning Centre, Monday 8 December at Sue Bramley Community Hub, and Wednesday 10 December at Barking Rugby Club.",
    ],
    sourceAttribution: "LBBD Safer Borough",
  },
  {
    slug: "a13-tunnel-explainer",
    title: "The A13 tunnel that was meant to open this year",
    category: "travel",
    publishedAt: "2026-09-19T09:00:00+01:00",
    standfirst:
      "Bury 1.3km of the A13 between Lodge Avenue and Goresbrook. Three lanes each way, the two worst bottlenecks gone, and a new neighbourhood on top. It was proposed in 2020. It is still a proposal.",
    body: [
      "A proposal to bury 1.3km of the A13 in a tunnel between Lodge Avenue and Goresbrook — three lanes each way, removing two of the road's worst bottlenecks — was put forward back in 2020. It is still just a proposal.",
      "The plan promises a new neighbourhood, Castle Green, built on top of the buried road, along with 1,200 jobs. We've asked the council and Be First for an update on where it currently stands.",
    ],
    sourceAttribution: "LBBD & Be First, 'Road to Regeneration' — proposal dates from 2020, figures have shifted since",
    relatedSlugs: ["a13-westbound-closed-goresbrook", "flat-conversion-29500-confiscated"],
  },
];

async function main() {
  if (!isSanityConfigured || !writeToken) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
    process.exitCode = 1;
    return;
  }

  console.log(`Seeding ${posts.length} posts via project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}...`);

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
      // featuredImage intentionally omitted — see header comment.
    });
    console.log(`  post: ${post.title}`);
  }

  for (const post of posts) {
    if (!post.relatedSlugs || post.relatedSlugs.length === 0) continue;
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

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
