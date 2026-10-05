// Third batch — 20 more stories from the daily Instagram/X graphics (see
// ../../social-posts/README.md for the archive convention). Same pattern as
// seed-social-posts.mts / seed-social-posts-2.mts: deterministic `post-<slug>`
// IDs + createOrReplace, so re-running this is safe and just re-syncs the
// same documents.
//
// Category assignment follows the coloured tag printed on each graphic
// itself (blue EVENT, red NEWS, orange TRAVEL, green COMMUNITY) rather than
// my own judgement call on recurring-vs-one-off — that tag is the account's
// own editorial decision already made at design time.
//
// No featuredImage yet — same reason as seed-social-posts.mts: the actual
// graphic files for this batch aren't on disk anywhere this script can read
// from yet. Attach them the same way attach-social-images.mts did once
// they're saved into social-posts/.
//
// Run with: npm run seed:social-posts-3

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
    slug: "free-mug-decorating-tuesdays-park-centre",
    title: "Free mug decorating and a cuppa, Tuesdays in Dagenham",
    category: "events",
    publishedAt: "2026-09-26T09:00:00+01:00",
    standfirst:
      "A weekly crafting and board games morning at Park Centre, built around senior citizens but open to anyone. Decorate your own mug and take it home.",
    body: [
      "Park Centre in Dagenham runs a free arts and crafts morning every Tuesday, 10.30am to 12 noon, built around senior citizens but open to anyone who wants to come along — design and decorate your own mug to take home, alongside board games.",
      "It's a free drop-in, no booking needed, and runs through to Tuesday 8 December. Call 07495 071150 or email communityvenuebookings@gmail.com for more.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["sewing-sisters-free-classes-barking"],
  },
  {
    slug: "crime-figures-august-1679-reported",
    title: "1,679 crimes reported here in August, down from 1,872",
    category: "news",
    publishedAt: "2026-09-27T09:00:00+01:00",
    standfirst:
      "Met figures for August. Barking & Dagenham had the second lowest total of the six east London boroughs, behind Havering. These are raw counts, not adjusted for population size.",
    body: [
      "The Metropolitan Police's figures for August show 1,679 crimes reported in Barking & Dagenham, down from 1,872 in July. That gave the borough the second-lowest total of the six east London boroughs, behind Havering.",
      "Violence against the person accounted for 671 of the reports and theft for 296. The figures are raw counts, not adjusted for population size, so they shouldn't be read as a crime-rate comparison on their own.",
    ],
    sourceAttribution: "Met Police public data, via the Barking & Dagenham Post",
  },
  {
    slug: "barking-parkrun-free-5k-saturdays",
    title: "Barking parkrun: free 5k, every Saturday at 9am",
    category: "events",
    publishedAt: "2026-09-28T09:00:00+01:00",
    standfirst:
      "Walk it, jog it, run it, volunteer, or just come and watch. Free every week in Barking Park, whatever your pace.",
    body: [
      "Barking parkrun is a free, timed 5k that runs every Saturday at 9am in Barking Park, meeting by the Big Friendly Coffee — walk it, jog it, run it, volunteer, or just come and watch.",
      "It's free, but you need to register once at parkrun.org.uk before your first run, and bring a scannable copy of your barcode — no barcode means no result recorded.",
    ],
    sourceAttribution: "parkrun",
  },
  {
    slug: "c2c-lines-altered-fenchurch-street-barking",
    title: "All three c2c lines altered between Fenchurch Street and Barking",
    category: "travel",
    publishedAt: "2026-09-24T09:00:00+01:00",
    standfirst:
      "Sunday 27 September. Engineering work between Fenchurch Street and Barking diverted every c2c line, with tickets accepted on the Underground and DLR instead.",
    body: [
      "Engineering work between Fenchurch Street and Barking altered all three c2c lines on Sunday 27 September. The Basildon line diverted to Liverpool Street via Stratford rather than Limehouse or West Ham, and the Rainham line diverted to Liverpool Street and was extended to Shoeburyness. The Ockendon line ran shuttles only, between Upminster and Grays.",
      "c2c tickets were accepted on the District and Jubilee lines and the DLR between the affected stations for the day.",
    ],
    sourceAttribution: "c2c, via the Barking & Dagenham Post",
  },
  {
    slug: "donation-bank-clothes-toys-books-thames-hub",
    title: "Clothes, toys and books for families who need them",
    category: "events",
    publishedAt: "2026-09-29T09:00:00+01:00",
    standfirst:
      "A donation bank at Thames Community Hub in Barking, open Friday lunchtime. Clothes, toys and books for children, adults and families.",
    body: [
      "Thames Community Hub in Barking runs a donation bank of clothes, toys and books for families who need them, open Friday 9 October, 12pm to 2pm, for children, adults and families.",
      "It's part of the hub's wider offer on Bastable Avenue — check with the hub directly if you'd like to donate as well as collect.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["sensory-room-under-fives-thames-hub"],
  },
  {
    slug: "natwest-cost-of-living-workshop-dagenham",
    title: "Cost of Living workshop in Dagenham, Thursday morning",
    category: "events",
    publishedAt: "2026-09-30T09:00:00+01:00",
    standfirst:
      "An hour on budgeting, saving strategies and what to do if you are struggling with debt. Run by NatWest at the Dagenham hub.",
    body: [
      "NatWest is running a Cost of Living workshop at Dagenham Community Hub on Thursday 8 October, 10am to 11am, covering budgeting tips, saving strategies and what to do if you're struggling with debt.",
      "It's at 1 Church Elm Lane, Dagenham RM10 9QS — check the LBBD events listing for how to book a place.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["quarter-residents-skipped-meal"],
  },
  {
    slug: "dads-rock-saturday-playgroup-barking",
    title: "Dads Rock: a Saturday playgroup in Barking",
    category: "events",
    publishedAt: "2026-09-30T11:00:00+01:00",
    standfirst: "For dads, stepdads, grandads, uncles and any man with parental responsibility. Mums welcome too.",
    body: [
      "Dads Rock is a Saturday playgroup at Barking Learning Centre for children aged 0 to 4, running 10am to 11.30am on Saturday 10 October — for dads, stepdads, grandads, uncles and any man with parental responsibility. Mums are welcome too.",
      "It's at 2 Town Square, Barking IG11 7NB — see the LBBD events listing for details.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["smoothie-and-smiles-new-parents-barking"],
  },
  {
    slug: "lodge-avenue-flyover-works-two-and-half-years",
    title: "Flyover works now expected to take two and a half years",
    category: "travel",
    publishedAt: "2026-09-29T11:00:00+01:00",
    standfirst:
      "Six months longer than TfL's earlier estimate for replacing the Lodge Avenue flyover. Two lanes will be kept open in each direction for most of the work. There is still no start date.",
    body: [
      "Replacement works on the A13's Lodge Avenue flyover in Dagenham are now expected to take two and a half years — six months longer than TfL's earlier estimate — though two lanes will be kept open in each direction for most of the work.",
      "There is still no confirmed start date, and TfL's own project page still quotes the earlier two-year estimate rather than this new one.",
    ],
    sourceAttribution: "TfL, via the Barking & Dagenham Post, 29 September",
    relatedSlugs: ["a13-tunnel-explainer"],
  },
  {
    slug: "free-meals-every-friday-park-centre",
    title: "Free meals every Friday at Park Centre",
    category: "community",
    publishedAt: "2026-09-28T13:00:00+01:00",
    standfirst:
      "Freshly cooked breakfast, lunch and meal boxes, free to Barking & Dagenham residents. Eat in or take it away. Dietary needs and allergies catered for.",
    body: [
      "Park Centre in Dagenham serves free, freshly cooked meals to Barking & Dagenham residents every Friday, 8am to 1pm and 3pm to 5pm — breakfast, lunch and takeaway meal boxes, with dietary needs and allergies catered for.",
      "Eat in or take it home; eat-in spaces are subject to availability. It's closed on bank holidays, and for two weeks from 18 December.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["foodcycle-free-sunday-meal-barking", "222000-funding-food-insecurity"],
  },
  {
    slug: "foodcycle-free-sunday-meal-barking",
    title: "A free three course meal, every Sunday in Barking",
    category: "community",
    publishedAt: "2026-09-28T15:00:00+01:00",
    standfirst:
      "FoodCycle is not a food bank. You sit down at a table and eat together. Some people come for the food, some for the company. Everyone is welcome.",
    body: [
      "FoodCycle Barking serves a free three-course meal every Sunday at 1pm at Al-Madina Mosque on Victoria Road — cooked from surplus food, and meat-free.",
      "It isn't a food bank: you sit down at a table and eat together. Some people come for the food, some for the company — everyone is welcome, whatever your reason for coming.",
    ],
    sourceAttribution: "FoodCycle, barking@foodcycle.org.uk",
    relatedSlugs: ["free-meals-every-friday-park-centre", "222000-funding-food-insecurity"],
  },
  {
    slug: "222000-funding-food-insecurity",
    title: "£222,000 for the borough to tackle food insecurity",
    category: "news",
    publishedAt: "2026-10-02T09:00:00+01:00",
    standfirst:
      "From the government's Good Food Neighbourhoods programme, which is putting £10m into 45 communities across England. Every participating council gets the same £222,000.",
    body: [
      "Barking & Dagenham has been awarded £222,000 to tackle food insecurity, from the government's Good Food Neighbourhoods programme — £10m shared across 45 communities in England, with every participating council getting the same amount.",
      "The money will go towards the borough's Good Food Plan, delivered with community partners, and follows the recent opening of the Big Heart Food Hub in Barking.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, 2 October",
    relatedSlugs: ["free-meals-every-friday-park-centre", "foodcycle-free-sunday-meal-barking", "quarter-residents-skipped-meal"],
  },
  {
    slug: "henry-green-primary-ofsted-strong-four-areas",
    title: "Henry Green Primary rated strong in four areas",
    category: "news",
    publishedAt: "2026-10-01T09:00:00+01:00",
    standfirst:
      "The Green Lane school was inspected in April under Ofsted's new framework. Strong in achievement, early years, inclusion and personal development, and at the expected standard in the other three areas.",
    body: [
      "Henry Green Primary School on Green Lane, Dagenham, was inspected in April under Ofsted's new framework, with the report published this week — rated strong in achievement, early years, inclusion and personal development.",
      "The school met the expected standard in the three remaining inspection areas. Under the new framework, \"strong\" sits above the standard expected.",
    ],
    sourceAttribution: "Ofsted, via the Barking & Dagenham Post",
  },
  {
    slug: "it-digital-help-beginners-fridays-barking",
    title: "IT and digital help for beginners, Fridays in Barking",
    category: "events",
    publishedAt: "2026-10-01T11:00:00+01:00",
    standfirst:
      "A weekly drop-in with trained Digital Champions. Computers, smartphones, tablets and iPads, starting from the very basics.",
    body: [
      "Barking Learning Centre runs a weekly IT and digital help drop-in every Friday, 10am to 12pm, with trained Digital Champions on hand — computers, smartphones, tablets and iPads, starting from the very basics.",
      "No booking needed, it's a drop-in. Thames Community Hub runs the same kind of session on Tuesdays and Thursdays.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["banking-help-dagenham-learning-centre"],
  },
  {
    slug: "line-dancing-over-60s-chadwell-heath",
    title: "Line dancing for the over 60s in Chadwell Heath",
    category: "events",
    publishedAt: "2026-10-02T11:00:00+01:00",
    standfirst:
      "Easy to learn, good for the mood and the legs, and a room full of people in the same boat. Part of the council's Young at Heart programme.",
    body: [
      "A line dancing session for residents aged 60 and over runs at Chadwell Heath and Whalebone Community Hub on Friday 9 October, 10.15am to 11.45am, part of the council's Young at Heart programme.",
      "Email healthy.lifestyles@lbbd.gov.uk for details or to book a place.",
    ],
    sourceAttribution: "LBBD events listing",
  },
  {
    slug: "quarter-residents-skipped-meal",
    title: "A quarter of residents have skipped a meal they couldn't afford",
    category: "news",
    publishedAt: "2026-10-01T13:00:00+01:00",
    standfirst:
      "That figure comes from the council's own resident research. It is the backdrop to a new two-year money advice service being rolled out through places people already go.",
    body: [
      "Council research has found that 24% of Barking & Dagenham residents have skipped a meal they couldn't afford — the backdrop to a new two-year money advice and education service being rolled out across the borough.",
      "The service, for residents aged 18 and over, is run by We Are Group after a tender, delivered through hubs, libraries, community centres and faith venues.",
    ],
    sourceAttribution: "London Borough of Barking & Dagenham, 1 October",
    relatedSlugs: ["222000-funding-food-insecurity", "natwest-cost-of-living-workshop-dagenham"],
  },
  {
    slug: "sensory-room-under-fives-thames-hub",
    title: "A sensory room for under fives, five days a week",
    category: "events",
    publishedAt: "2026-10-02T13:00:00+01:00",
    standfirst: "Soft lighting, bubble tubes, mirrors and tactile toys at Thames Community Hub in Barking. Sessions have to be booked.",
    body: [
      "Thames Community Hub in Barking has a sensory room for children aged 0 to 5, open Monday to Friday, 9.30am to 4.30pm — soft lighting, bubble tubes, mirrors and tactile toys.",
      "Sessions have to be booked in advance: call 020 8270 6619 or email thamescommunityhub@lbbd.gov.uk.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["donation-bank-clothes-toys-books-thames-hub"],
  },
  {
    slug: "sewing-sisters-free-classes-barking",
    title: "Sewing Sisters: free weekly classes for women in Barking",
    category: "events",
    publishedAt: "2026-10-03T09:00:00+01:00",
    standfirst:
      "Embroidering tote bags and cushions, or learning to cut and sew clothing. Women of all ages, learning together, and nothing to pay.",
    body: [
      "Sewing Sisters is a free weekly class for women at Excel Women's Centre in Barking, Wednesdays 10am to 12pm — embroidering tote bags and cushions, or learning to cut and sew clothing, with women of all ages learning together.",
      "It's free, and there's no need to book — just come along to the old White Horse building on London Road.",
    ],
    sourceAttribution: "LBBD events listing",
    relatedSlugs: ["free-mug-decorating-tuesdays-park-centre"],
  },
  {
    slug: "smoothie-and-smiles-new-parents-barking",
    title: "Smoothie & Smiles, a weekly meet-up for new parents",
    category: "events",
    publishedAt: "2026-10-03T11:00:00+01:00",
    standfirst:
      "A relaxed Tuesday group at Barking Learning Centre, with smoothies, refreshments and other people going through exactly the same thing. Bring the baby, it is a baby friendly space.",
    body: [
      "Smoothie & Smiles is a weekly meet-up for new and expectant mums and dads at Barking Learning Centre, Tuesdays 10am to 12pm — smoothies, refreshments and other people going through exactly the same thing.",
      "It's a baby-friendly space, so bring yours along. Email natasha.mccloskey@lbbd.gov.uk to join or find out more.",
    ],
    sourceAttribution: "LBBD Family Hubs",
    relatedSlugs: ["dads-rock-saturday-playgroup-barking"],
  },
  {
    slug: "dagenham-woman-first-bhrut-surgical-robot",
    title: "Dagenham woman first through BHRUT's new surgical robot",
    category: "news",
    publishedAt: "2026-10-01T15:00:00+01:00",
    standfirst:
      "Adesewa Olaleye, 40, had her gallbladder removed in August after a year of digestive problems. The trust now has two new Sentire robots, one at Queen's and one at King George.",
    body: [
      "Adesewa Olaleye, 40, from Dagenham, was the first patient through BHRUT's new Sentire surgical robot, having her gallbladder removed in August after a year of digestive problems.",
      "The trust now has two of the robots, one at Queen's Hospital and one at King George Hospital, doubling its soft-tissue robotic surgery capacity. The trust pays for the instruments rather than the robots themselves, and they're used for cancer and complex abdominal and pelvic surgery — the aim is shorter stays, fewer complications and faster recovery.",
    ],
    sourceAttribution: "BHRUT, 1 October",
    relatedSlugs: ["377-eye-patients-two-weekends", "nhs-pathology-lab-upgrade"],
  },
  {
    slug: "maramureseanu-illicit-tobacco-fine",
    title: "£11,753 to pay after illicit tobacco and medicines seized",
    category: "news",
    publishedAt: "2026-10-03T13:00:00+01:00",
    standfirst:
      "Maramureseanul Ltd and its director pleaded guilty after Trading Standards raided two of its shops in 2024 and found illicit tobacco, alcohol and unauthorised medicines.",
    body: [
      "Maramureseanul Ltd and its director have been ordered to pay £11,753 after pleading guilty to selling illicit tobacco, alcohol and unauthorised medicines, following Trading Standards raids on two of its shops — at 608 Longbridge Road and 448 Becontree Avenue — in 2024.",
      "The raids seized 5,840 illicit tobacco sticks, 187 bottles of alcohol and 85 unauthorised medicines.",
    ],
    sourceAttribution: "LBBD Trading Standards",
    relatedSlugs: ["flat-conversion-29500-confiscated"],
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
      // featuredImage intentionally omitted — see header comment.
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
