// Fourth batch — 15 more stories, found only once their graphics were added
// to social-posts/2026-09/2026-09-25/{04 News,05 Community,06 Events}/ on
// 5 October (the rest of that folder's files are older batches, already
// seeded). Same pattern as seed-social-posts.mts / -2.mts / -3.mts.
//
// Run with: npm run seed:social-posts-4

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
    slug: "two-council-funds-crisis-resilience",
    title: "Two council funds open for groups tackling hardship",
    category: "news",
    publishedAt: "2026-09-25T09:00:00+01:00",
    standfirst:
      "Both come from the government's Crisis and Resilience Fund. One pays for warm spaces this winter, the other for work on the cost of essentials, income security and getting people into jobs.",
    body: [
      "Two funds are open for Barking & Dagenham community and voluntary organisations tackling hardship this winter, both from the government's Crisis and Resilience Fund. One pays for warm spaces, up to £15,000 per group, closing Friday 16 October.",
      "The other, CRF Community Grants, is for work on the cost of essentials, income security and getting people into jobs, and closes Friday 27 November.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, 25 September",
    relatedSlugs: ["quarter-residents-skipped-meal", "222000-funding-food-insecurity"],
  },
  {
    slug: "dagenham-man-jailed-cocaine-fish-plot",
    title: "Dagenham man jailed over £20m cocaine-in-fish plot",
    category: "news",
    publishedAt: "2026-09-25T11:00:00+01:00",
    standfirst:
      "A plan to bring 600kg of cocaine into the UK hidden in frozen fish from South America, received through a Dagenham fish business at Billingsgate. The shipment never arrived.",
    body: [
      "A Dagenham man has been jailed over a plot to smuggle 600kg of cocaine into the UK hidden inside frozen fish shipped from South America, received through a Dagenham fish business operating out of Billingsgate Market. The shipment, estimated at over £20m, never arrived.",
      "Sentences of between 13 and 22 years were handed down at Snaresbrook Crown Court.",
    ],
    sourceAttribution: "Metropolitan Police, 25 September",
  },
  {
    slug: "restaurant-plan-old-barclays-green-lane-refused",
    title: "Restaurant plan for the old Barclays on Green Lane refused",
    category: "news",
    publishedAt: "2026-09-26T09:00:00+01:00",
    standfirst:
      "The council refused a lawful development certificate for 951 Green Lane on 17 September. That is not a ban on a restaurant there. Officers said the applicant had not proved the car sales use had run continuously for the ten years the law requires.",
    body: [
      "A proposal to turn the former Barclays bank at 951 Green Lane, Dagenham — empty since Barclays left around 2018 — into a restaurant with an online car sales office at the rear has been refused, after officers said the applicant hadn't proved the car sales use had run continuously for the ten years the law requires.",
      "The refusal, a lawful development certificate decided on 17 September, isn't a ban on a restaurant at the site — officers have advised the applicant to submit a fresh, full planning application instead.",
    ],
    sourceAttribution: "LBBD planning decision, reported by the Romford Recorder",
    relatedSlugs: ["flat-conversion-29500-confiscated"],
  },
  {
    slug: "police-target-repeat-shoplifters-auror",
    title: "Police target repeat shoplifters in Barking and Heathway",
    category: "news",
    publishedAt: "2026-09-27T11:00:00+01:00",
    standfirst:
      "The borough's neighbourhood policing lead says a retail crime platform called Auror is helping officers identify prolific offenders who work multiple shops.",
    body: [
      "Police are using a retail crime platform called Auror, which lets retailers share CCTV and evidence, to identify prolific shoplifters working across multiple shops in Barking Town Centre and Dagenham Heathway.",
      "The Met's own figures show 29.4% of retail crime cases now get an outcome, up from 7.3%. In one recent case, a repeat offender was jailed for four weeks after eight thefts from one Co-op.",
    ],
    sourceAttribution: "Supt Biju Premnath, Met neighbourhood policing, 23 August",
    relatedSlugs: ["maramureseanu-illicit-tobacco-fine"],
  },
  {
    slug: "hospital-promises-changes-send-care-ae",
    title: "Hospital promises changes after families speak out on SEND care in A&E",
    category: "news",
    publishedAt: "2026-10-04T09:00:00+01:00",
    standfirst:
      "Parents told BHRUT they have to explain their child's needs over and over, that hospital passports are not used consistently, and that beds are not safe.",
    body: [
      "BHRUT has promised changes to how it treats children with special educational needs and disabilities in A&E, after parents said they had to repeatedly explain their child's needs, that hospital passports weren't used consistently, and that beds weren't safe — raised directly with Margaret Mullane, MP for Dagenham and Rainham.",
      "SEND attendances at Queen's and King George have roughly doubled, from 34 children a month in April 2025 to 68 by June 2026. The trust has promised safer beds, earlier identification of SEND needs, and a new family forum.",
    ],
    sourceAttribution: "BHRUT, via the Romford Recorder, 4 October",
    relatedSlugs: ["dagenham-woman-first-bhrut-surgical-robot", "377-eye-patients-two-weekends"],
  },
  {
    slug: "tfl-staff-60-stations-gardens",
    title: "TfL staff turned 60 stations into gardens this year",
    category: "news",
    publishedAt: "2026-09-28T09:00:00+01:00",
    standfirst:
      "The In Bloom competition ran across stations, depots and offices, themed on volunteering to mark the UN International Year of the Volunteer. The winners have just been announced.",
    body: [
      "TfL staff turned 60 stations, depots and offices into gardens this year as part of its In Bloom competition, themed this year on volunteering to mark the UN International Year of the Volunteer.",
      "Hammersmith Grove Service Control Centre took Best in Show; High Barnet and Kensington Olympia shared the volunteer award, and Acton Town and Ruislip depot shared the environment award. No station in this borough won this year.",
    ],
    sourceAttribution: "TfL, via the Barking & Dagenham Post",
  },
  {
    slug: "community-food-club-weekly-shop-advice",
    title: "Community Food Club: a weekly shop, plus advice",
    category: "community",
    publishedAt: "2026-09-29T13:00:00+01:00",
    standfirst:
      "For residents on a low income or having financial difficulties. Membership lasts three months, one person per household, one visit a week. It also opens the door to help with money, health, work and training.",
    body: [
      "Heath Community Hub in Dagenham runs a Community Food Club — a weekly shop for residents on a low income or facing financial difficulties, with membership lasting three months and one visit a week per household.",
      "Joining also opens the door to further help with money, health, work and training. Apply online first and bring proof of address; the hub is also looking for volunteers, with travel costs covered.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham",
    relatedSlugs: ["free-meals-every-friday-park-centre", "foodcycle-free-sunday-meal-barking"],
  },
  {
    slug: "library-of-things-barking-learning-centre",
    title: "Borrow a drill for £3 a day instead of buying one",
    category: "community",
    publishedAt: "2026-09-29T15:00:00+01:00",
    standfirst:
      "More than 30 household items to borrow from Barking Learning Centre. Book online, collect in town. Prices per day, with the current 50% off.",
    body: [
      "Barking Learning Centre's Library of Things lets residents borrow more than 30 household items instead of buying them — an air fryer for £2.25 a day, a drill for £3, a carpet cleaner for £12.50, with a 50% discount currently running.",
      "Book online and collect in the town centre.",
    ],
    sourceAttribution: "LBBD events listing and Library of Things",
  },
  {
    slug: "early-support-drop-in-autism-signs-hedgecock",
    title: "Early support drop-in for children showing signs of autism",
    category: "events",
    publishedAt: "2026-09-30T09:00:00+01:00",
    standfirst:
      "For children aged 1 to 4 showing early signs of autism or developmental delay. Play sessions, guidance on communication and sensory needs, and signposting to specialist support.",
    body: [
      "Hedgecock Community Centre in Barking runs a drop-in, Easy Safe Steps, for children aged 1 to 4 showing early signs of autism or developmental delay, Mondays and Thursdays, 9.30 to 11.30am.",
      "It offers safe, stimulating play sessions, practical guidance for mothers on communication, sensory needs and early learning, peer support for mothers who may feel isolated, and signposting to local services. Email a brief description of your child to info@hedgecockcentre.org.uk for a referral.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "fitness-mindfulness-three-sessions-week",
    title: "Fitness and mindfulness, three sessions a week",
    category: "events",
    publishedAt: "2026-09-30T11:00:00+01:00",
    standfirst: "Run by Elevate Together with the council. Two sessions on Mondays, one on Fridays. Register by phone first.",
    body: [
      "Elevate Together runs free fitness and mindfulness sessions across the borough with the council — two on Mondays (9.30 to 11.30am at the Women's Hub, Barking Learning Centre, and 1pm to 2.30pm at Dagenham Heathway shopping mall, next to Card Factory) and one on Fridays (9.30 to 11am at Harmony House).",
      "Register by phone first, on 07507 549102.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "walk-in-immigration-support-five-days-week",
    title: "Walk-in immigration support, five days a week",
    category: "events",
    publishedAt: "2026-10-01T17:00:00+01:00",
    standfirst:
      "For asylum seekers, refugees and anyone dealing with the immigration system, whatever your status, including people with No Recourse to Public Funds. Staff have been through it themselves.",
    body: [
      "A walk-in immigration support service runs Monday to Friday, 10am to 4pm, in Room F03 at Dagenham Learning Centre — for asylum seekers, refugees and anyone dealing with the immigration system, whatever their status, including people with No Recourse to Public Funds.",
      "Staff have been through the system themselves, and can help with Home Office applications, appeals, solicitors, housing and mental health. Contact 020 8594 1514 or referrals@ucts.org.uk.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "boxing-marks-gate-3-pound-session",
    title: "Boxing at Marks Gate, £3 a session",
    category: "events",
    publishedAt: "2026-10-02T15:00:00+01:00",
    standfirst:
      "Fitness and technique with qualified coaches, Friday evenings at Rose Lane. Children first, adults after. You have to register in person before you can train.",
    body: [
      "Rose Lane Community Centre in Marks Gate runs boxing sessions on Friday evenings — children 5.30 to 8pm, adults 8 to 9pm — fitness and technique with qualified coaches, £3 a session.",
      "You have to register in person before you can train: turn up at 6pm on a Friday and fill in the form.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "mini-athletes-free-dropin-dagenham",
    title: "Mini Athletes, free drop-in for little ones",
    category: "events",
    publishedAt: "2026-09-27T15:00:00+01:00",
    standfirst:
      "Games and activity for young children at the Dagenham family hub, with a warm welcome for whoever brings them. No booking, no registration, just walk in.",
    body: [
      "Mini Athletes is a free games and activity drop-in for young children at Dagenham Learning Centre's community and family hub, held Tuesday 29 September, 2.30 to 3.30pm.",
      "No booking or registration needed, just walk in — questions to familyhubs@lbbd.gov.uk.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "mums-matter-eight-week-course-mind",
    title: "Mums Matter: an eight week course, run by Mind",
    category: "events",
    publishedAt: "2026-09-29T17:00:00+01:00",
    standfirst:
      "A new service to help mums take control of their own health and wellbeing, with practical and emotional support over eight weeks. Delivered by Havering Mind. Places have to be booked.",
    body: [
      "Mums Matter is a new eight-week course to help mums take control of their own health and wellbeing, with practical and emotional support, delivered by Havering Mind at Becontree Community Hub, starting Thursday 1 October, 10am to 1pm.",
      "Places have to be booked: call 01708 457040 or email mumsmatter@haveringmind.org.uk.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "stay-and-play-under-twos-dagenham",
    title: "Stay and play for under twos, in Dagenham",
    category: "events",
    publishedAt: "2026-09-30T13:00:00+01:00",
    standfirst: "A play session run by Precious Angels, helping little ones learn and communicate through play.",
    body: [
      "Precious Angels runs a stay-and-play session for children aged 0 to 2 at Park Active Age Centre, Rectory Road, Dagenham, Friday 2 October, 11am to 1.30pm — helping little ones learn and communicate through play.",
      "It runs in term time only.",
    ],
    sourceAttribution: "LBBD events listing",
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
