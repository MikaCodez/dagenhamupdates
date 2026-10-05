// Second attach pass — images added to social-posts/2026-09/2026-09-25/
// {04 News,05 Community,06 Events}/ on 5 October, covering both the batch-3
// posts (seed-social-posts-3.mts) that didn't have a featuredImage yet, and
// the new batch-4 posts (seed-social-posts-4.mts) those same photos turned
// out to belong to. Same pattern as attach-social-images.mts.
//
// Two images this round have no matching post at all and are left out on
// purpose: a c2c travel-disruption graphic (no "Travel" folder exists in
// this archive, and no file for it was added here) and a duplicate copy of
// post-retail-crime-auror.png sitting in "06 Events" as well as "04 News"
// (the story is News — the Events copy is an unused duplicate).
//
// Run with: npm run attach:social-images-2

import { readFileSync } from "node:fs";
import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";

const BASE = "../../social-posts/2026-09/2026-09-25";

interface ImageAttachment {
  postSlug: string;
  file: string;
  alt: string;
  credit?: string;
}

const attachments: ImageAttachment[] = [
  // ---- Existing batch-3 posts, image added this round -----------------
  {
    postSlug: "lodge-avenue-flyover-works-two-and-half-years",
    file: "04 News/post-flyover-two-half-years.png",
    alt: "The A13 Lodge Avenue flyover in Dagenham",
    credit: "Photo: Newsquest",
  },
  {
    postSlug: "222000-funding-food-insecurity",
    file: "04 News/post-good-food-funding.png",
    alt: "A till receipt and coins, close up",
  },
  {
    postSlug: "henry-green-primary-ofsted-strong-four-areas",
    file: "04 News/post-henry-green-ofsted (1).png",
    alt: "Henry Green Primary School, Green Lane, Dagenham",
    credit: "Photo: The Education Space",
  },
  {
    postSlug: "quarter-residents-skipped-meal",
    file: "04 News/post-money-support-service.png",
    alt: "A mother and daughter smiling together at home",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "dagenham-woman-first-bhrut-surgical-robot",
    file: "04 News/post-surgical-robots.png",
    alt: "Surgical staff posing with BHRUT's new Sentire surgical robot",
    credit: "Photo: BHRUT",
  },
  {
    postSlug: "maramureseanu-illicit-tobacco-fine",
    file: "04 News/post-trading-standards.png",
    alt: "The Maramureseanul'2 shopfront on Longbridge Road",
    credit: "Photo: Google Maps, check licensing before posting",
  },
  {
    postSlug: "free-meals-every-friday-park-centre",
    file: "05 Community/post-food-fest-fridays.png",
    alt: "Food Fest Fridays poster advertising free meals at Park Centre",
    credit: "Poster: Youth Spot Bar, EmpowerU Today and Soul and Sound",
  },
  {
    postSlug: "free-mug-decorating-tuesdays-park-centre",
    file: "06 Events/post-arts-craft-coffee.png",
    alt: "Arts & Craft Coffee & Tea poster for the Park Centre mug-decorating sessions",
    credit: "Poster: Youth Spot Bar and EmpowerU Today",
  },
  {
    postSlug: "barking-parkrun-free-5k-saturdays",
    file: "06 Events/post-barking-parkrun.png",
    alt: "A group of runners jogging through a park",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "donation-bank-clothes-toys-books-thames-hub",
    file: "06 Events/post-clothes-toy-bank.png",
    alt: "Volunteers sorting a box of donated clothes",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "natwest-cost-of-living-workshop-dagenham",
    file: "06 Events/post-cost-of-living-workshop.png",
    alt: "NatWest Cost of Living workshop poster",
    credit: "Poster: NatWest",
  },
  {
    postSlug: "dads-rock-saturday-playgroup-barking",
    file: "06 Events/post-dads-rock.png",
    alt: "A father lifting a baby up under autumn trees",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "it-digital-help-beginners-fridays-barking",
    file: "06 Events/post-it-digital-class.png",
    alt: "Two older adults high-fiving in front of a laptop",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "line-dancing-over-60s-chadwell-heath",
    file: "06 Events/post-line-dancing.png",
    alt: "A group of older adults line dancing",
    credit: "Stock photograph, posed by models",
  },
  {
    postSlug: "sensory-room-under-fives-thames-hub",
    file: "06 Events/post-sensory-room.png",
    alt: "A softly lit sensory room with bubble tubes and floor mats",
    credit: "Photo: Thames Community Hub",
  },
  {
    postSlug: "sewing-sisters-free-classes-barking",
    file: "06 Events/post-sewing-sisters.png",
    alt: "A close-up of red and white batik fabric",
    credit: "Photo: Excel Women's Centre",
  },
  {
    postSlug: "smoothie-and-smiles-new-parents-barking",
    file: "06 Events/post-smoothie-smiles.png",
    alt: "Smoothie & Smiles poster for the weekly new-parents meet-up",
    credit: "Poster: LBBD Family Hubs",
  },

  // ---- New batch-4 posts -------------------------------------------------
  {
    postSlug: "two-council-funds-crisis-resilience",
    file: "04 News/post-crisis-resilience-funds.png",
    alt: "Illustrated stick figure looking worried beside a doorway",
    credit: "Illustration: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "dagenham-man-jailed-cocaine-fish-plot",
    file: "04 News/post-encrochat-fish.png",
    alt: "A statue of the scales of justice, with a Metropolitan Police banner",
  },
  {
    postSlug: "restaurant-plan-old-barclays-green-lane-refused",
    file: "04 News/post-green-lane-barclays.png",
    alt: "The former Barclays bank building at 951 Green Lane, Dagenham",
    credit: "Photo: Google Street View, check licensing before posting",
  },
  {
    postSlug: "police-target-repeat-shoplifters-auror",
    file: "04 News/post-retail-crime-auror.png",
    alt: "A police community support officer walking along a shopping street",
    credit: "Photo: Metropolitan Police",
  },
  {
    postSlug: "hospital-promises-changes-send-care-ae",
    file: "04 News/post-send-ae-plan.png",
    alt: "A nurse attending to a patient in a hospital ward",
    credit: "Photo: BHRUT",
  },
  {
    postSlug: "tfl-staff-60-stations-gardens",
    file: "04 News/post-tfl-in-bloom.png",
    alt: "TfL staff posing with gardening tools and certificates at the In Bloom awards",
    credit: "Photo: TfL",
  },
  {
    postSlug: "community-food-club-weekly-shop-advice",
    file: "05 Community/post-community-food-club.png",
    alt: "Volunteers packing a food donation box",
    credit: "Photo: cottonbro studio / Pexels, posed by models",
  },
  {
    postSlug: "library-of-things-barking-learning-centre",
    file: "05 Community/post-library-of-things.png",
    alt: "The interior of Barking Learning Centre",
    credit: "Photo: Barking Learning Centre",
  },
  {
    postSlug: "early-support-drop-in-autism-signs-hedgecock",
    file: "06 Events/post-easy-safe-steps.png",
    alt: "Easy Safe Steps poster for the Hedgecock Community Centre drop-in",
    credit: "Poster: Hedgecock Community Centre",
  },
  {
    postSlug: "fitness-mindfulness-three-sessions-week",
    file: "06 Events/post-fitness-mindfulness.png",
    alt: "Fitness and Mindfulness poster from Elevate Together",
    credit: "Poster: Elevate Together",
  },
  {
    postSlug: "walk-in-immigration-support-five-days-week",
    file: "06 Events/post-immigrant-support.png",
    alt: "An adviser talking with a couple on a sofa, holding a clipboard",
    credit: "Image by freepik, posed by models",
  },
  {
    postSlug: "boxing-marks-gate-3-pound-session",
    file: "06 Events/post-marks-gate-boxing.png",
    alt: "Two boxing gloves touching, close up",
    credit: "Stock photograph",
  },
  {
    postSlug: "mini-athletes-free-dropin-dagenham",
    file: "06 Events/post-mini-athletes.png",
    alt: "Children playing with a cricket set on grass",
    credit: "Photo: LBBD Family Hubs, cropped to protect children's privacy",
  },
  {
    postSlug: "mums-matter-eight-week-course-mind",
    file: "06 Events/post-mums-matter.png",
    alt: "A mother holding her sleeping baby",
    credit: "Image by freepik, posed by models",
  },
  {
    postSlug: "stay-and-play-under-twos-dagenham",
    file: "06 Events/post-stay-and-play.png",
    alt: "Young children playing with building blocks",
    credit: "Stock photograph, posed by models",
  },
];

async function main() {
  if (!isSanityConfigured || !writeToken) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
    process.exitCode = 1;
    return;
  }

  console.log(`Attaching ${attachments.length} images...`);

  for (const item of attachments) {
    const path = new URL(`${BASE}/${item.file}`, import.meta.url);
    const buffer = readFileSync(path);
    const filename = item.file.split("/").pop()!;

    const asset = await writeClient.assets.upload("image", buffer, { filename });

    await writeClient
      .patch(`post-${item.postSlug}`)
      .set({
        featuredImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: item.alt,
          credit: item.credit,
        },
      })
      .commit();

    console.log(`  ${item.postSlug} <- ${filename}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
