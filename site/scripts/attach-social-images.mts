// Uploads the real graphics from ../../social-posts/2026-09/2026-09-25/ to
// Sanity's asset store and attaches each as its matching post's
// featuredImage — replacing the placeholder box on the site with the real
// image. Safe to re-run: each upload creates a fresh asset, but the patch
// always points the post at the latest one uploaded this run.
//
// Run with: npm run attach:social-images

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
  {
    postSlug: "black-history-month-opens-1-october",
    file: "04 News/post-black-history-month-2026.png",
    alt: "Black History Month 2026 promotional graphic with the Barking & Dagenham Black History Month logo",
    credit: "Artwork: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "council-five-promises-children-in-care",
    file: "04 News/post-corporate-parenting-strategy.png",
    alt: "Barking Town Hall clock tower against a blue sky",
    credit: "Photo: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "377-eye-patients-two-weekends",
    file: "04 News/post-eye-super-clinics.png",
    alt: "A clinician carrying out an eye examination on a patient",
    credit: "Photo: BHRUT",
  },
  {
    postSlug: "145-fires-student-halls-five-years",
    file: "04 News/post-lfb-student-fire-safety.png",
    alt: "A fire engine outside a student halls building",
    credit: "Photo: London Fire Brigade",
  },
  {
    postSlug: "flat-conversion-29500-confiscated",
    file: "04 News/post-planning-enforcement-with-stock.png",
    alt: "Yellow diamond road signs reading FINE",
    credit: "Image: stock photograph",
  },
  {
    postSlug: "fanshawe-centre-grounds-cleared",
    file: "05 Community/post-fanshawe-community-payback.png",
    alt: "The Fanshawe Community Centre grounds, before and after clearing overgrown trees and bushes",
    credit: "Photos: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "free-makeup-skincare-workshop-cancer-patients",
    file: "05 Community/post-look-good-feel-better.png",
    alt: "A volunteer applying makeup to a patient at the workshop",
    credit: "Photo: NHS trust",
  },
  {
    postSlug: "valence-primary-unicef-gold-award",
    file: "05 Community/post-valence-unicef-gold.png",
    alt: "The entrance to Valence Primary School",
    credit: "Photo: Google Street View",
  },
  {
    postSlug: "banking-help-dagenham-learning-centre",
    file: "06 Events/post-barclays-local-dagenham.png",
    alt: "A hand holding a coin above a piggy bank",
  },
  {
    postSlug: "learn-to-kayak-mayesbrook-park",
    file: "06 Events/post-canoe-club-beginners.png",
    alt: "People kayaking on a lake at sunset",
    credit: "Stock photograph, not Mayesbrook Park",
  },
  {
    postSlug: "carers-coffee-morning-monthly",
    file: "06 Events/post-carers-coffee-morning.png",
    alt: "A cup of tea icon with a heart",
    credit: "Artwork: Carers Centre SA Ltd",
  },
  {
    postSlug: "free-health-checks-every-monday",
    file: "06 Events/post-live-well-drop-in.png",
    alt: "Live Well Barking & Dagenham launch event poster",
    credit: "Poster: Live Well Barking & Dagenham",
  },
  {
    postSlug: "neighbourhood-fund-now-open",
    file: "06 Events/post-neighbourhood-fund.png",
    alt: "Pink sign reading 'The Neighbourhood Fund is Now Open'",
    credit: "Artwork: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "free-womens-self-defence-classes",
    file: "06 Events/post-womens-self-defence.png",
    alt: "Women's Self Defence Classes poster with the class schedule across five venues",
    credit: "Poster: London Borough of Barking & Dagenham",
  },
  {
    postSlug: "a13-tunnel-explainer",
    file: "09 Explainer/post-a13-riverside-tunnel.png",
    alt: "Illustrated map of the proposed A13 tunnel and Barking Riverside development",
    credit: "Map: LBBD / TfL, illustrative only",
  },
  {
    postSlug: "be-first-50000-homes-2037",
    file: "07 Notices/post-be-first-growth.png",
    alt: "Illustrated masterplan map showing Castle Green, Barking Riverside and the Thames Road Factory District",
    credit: "Map: Be First, illustrative masterplan",
  },
  {
    postSlug: "nhs-pathology-lab-upgrade",
    file: "07 Notices/post-nhs-pathology-investment.png",
    alt: "A pathology lab machine used for tissue and cell sample processing",
    credit: "Photo: NHS trust",
  },
  {
    postSlug: "village-ward-crime-figures-july",
    file: "07 Notices/post-village-ward-july-crime.png",
    alt: "A police officer standing on a residential street",
    credit: "Photo: Metropolitan Police",
  },
  {
    postSlug: "hospital-parking-charges-rise",
    file: "08 Residents need to know/post-hospital-parking-21sept.png",
    alt: "A Hospital Car Park sign with parked cars",
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
