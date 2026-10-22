// Third attach pass — the 3 images still missing after attach-social-images-2
// (no "Travel" folder existed in the archive, and FoodCycle's photo hadn't
// been added yet). All three turned up on 22 October, filed into "04 News"
// even though two of them are Travel/Community posts — filename, not
// folder, is what's matched against here. Same pattern as the earlier
// attach-social-images scripts.
//
// Everything else added to "04 News" in this same pass (post-arts-craft-coffee.png,
// post-barking-parkrun.png, post-clothes-toy-bank.png, post-cost-of-living-workshop.png,
// post-dads-rock.png, post-it-digital-class.png, post-line-dancing.png,
// post-sewing-sisters.png, post-smoothie-smiles.png, post-henry-green-ofsted (2).png)
// are byte-identical duplicates of files already attached via
// attach-social-images-2.mts (checked with shasum) — skipped on purpose.
//
// Run with: npm run attach:social-images-3

import { readFileSync } from "node:fs";
import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";

const BASE = "../../social-posts/2026-09/2026-09-25/04 News";

interface ImageAttachment {
  postSlug: string;
  file: string;
  alt: string;
  credit?: string;
}

const attachments: ImageAttachment[] = [
  {
    postSlug: "crime-figures-august-1679-reported",
    file: "post-august-crime-figures.png",
    alt: "Emergency service vehicles parked on a road",
    credit: "Photo: contributor, a London incident, not Barking & Dagenham",
  },
  {
    postSlug: "c2c-lines-altered-fenchurch-street-barking",
    file: "post-c2c-engineering-works.png",
    alt: "A c2c train at a station platform",
    credit: "Photo: PA",
  },
  {
    postSlug: "foodcycle-free-sunday-meal-barking",
    file: "post-foodcycle-barking.png",
    alt: "FoodCycle Barking poster with a plate of food being served",
    credit: "Artwork: FoodCycle",
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

    const asset = await writeClient.assets.upload("image", buffer, { filename: item.file });

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

    console.log(`  ${item.postSlug} <- ${item.file}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
