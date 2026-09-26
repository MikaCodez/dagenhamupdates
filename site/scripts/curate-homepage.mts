// Swaps the homepage's curated slots (featured/breaking/spotlight, the
// "Coming up" calendar, Travel & alerts) from the original sample content
// over to the real posts seeded in seed-social-posts(.mts|-2.mts).
//
// Run with: npm run curate:homepage

import { writeClient } from "../src/sanity/writeClient.ts";
import { isSanityConfigured, writeToken } from "../src/sanity/env.ts";

async function main() {
  if (!isSanityConfigured || !writeToken) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
    process.exitCode = 1;
    return;
  }

  // ---- Featured (homepage lead story) ------------------------------------
  // Off the old sample post, onto the most recent real one broadly relevant
  // to every resident (civic, upcoming, strong image) rather than the
  // narrowest or most routine of the 19.
  await writeClient.patch("post-heathway-public-realm-consultation").set({ featured: false }).commit();
  await writeClient.patch("post-black-history-month-opens-1-october").set({ featured: true }).commit();
  console.log("featured -> Black History Month opens on 1 October");

  // ---- Breaking (thin urgent strip) ---------------------------------------
  // Turned off rather than reassigned: none of the 19 real stories are
  // actually breaking/urgent (no live incident, no active disruption), and
  // design-decisions.md is explicit that the accent/urgency slot is for
  // genuine urgency only ("if everything is red, nothing is"). The strip
  // just doesn't render when no post has breaking:true.
  await writeClient.patch("post-a13-westbound-closed-goresbrook").set({ breaking: false }).commit();
  console.log("breaking -> cleared (no genuinely urgent story among the 19)");

  // ---- Community spotlight (3 cards) --------------------------------------
  const oldSpotlight = [
    "litter-pick-group-hundredth-saturday",
    "local-sixth-form-engineering-course",
    "family-bakery-reopens",
  ];
  const newSpotlight = [
    "fanshawe-centre-grounds-cleared",
    "free-makeup-skincare-workshop-cancer-patients",
    "valence-primary-unicef-gold-award",
  ];
  for (const slug of oldSpotlight) {
    await writeClient.patch(`post-${slug}`).set({ spotlight: false }).commit();
  }
  for (const slug of newSpotlight) {
    await writeClient.patch(`post-${slug}`).set({ spotlight: true }).commit();
  }
  console.log("spotlight -> Fanshawe Centre / Look Good Feel Better / Valence Primary");

  // ---- Coming up (calendar) -------------------------------------------------
  // The 3 old sample events are already in the past relative to today, so
  // they've dropped off the `date >= now()` query on their own — no cleanup
  // needed there. These 4 are genuinely upcoming.
  const events = [
    {
      slug: "learn-to-kayak-mayesbrook-park",
      title: "Learn to kayak at Mayesbrook Park",
      date: "2026-09-26T11:00:00+01:00",
      location: "Mayesbrook Park Lake, Dagenham",
      detail: "11am–1pm · £10 adults, £5 children · 18 places, email the club first",
    },
    {
      slug: "black-history-month-flag-raising",
      title: "Black History Month flag-raising",
      date: "2026-10-01T09:00:00+01:00",
      location: "Barking Town Hall",
      detail: "Flag stays up all October · Free events across the borough",
    },
    {
      slug: "neighbourhood-fund-deadline",
      title: "Neighbourhood Fund applications close",
      date: "2026-10-18T23:59:00+01:00",
      location: "Barking & Dagenham",
      detail: "Up to £15,000 per group · Community groups, charities, not-for-profits",
    },
    {
      slug: "womens-self-defence-marks-gate",
      title: "Free women's self defence — Marks Gate",
      date: "2026-11-25T09:30:00+00:00",
      location: "Marks Gate Community Hub",
      detail: "9.30am–11.30am · Free taster session · Four more dates through December",
    },
  ];
  for (const event of events) {
    await writeClient.createOrReplace({
      _id: `event-${event.slug}`,
      _type: "event",
      title: event.title,
      date: event.date,
      location: event.location,
      detail: event.detail,
    });
    console.log(`  event: ${event.title}`);
  }

  // ---- Travel & alerts ------------------------------------------------------
  // The existing travelAlert documents are fictional sample data (from the
  // original design-canvas mockup), not real current conditions — leaving
  // them live next to 19 real, sourced posts risks a reader mistaking one
  // for the other. None of the 19 are travel-disruption-shaped, so there's
  // no real replacement yet: deactivate rather than mislabel.
  const oldAlerts = [
    "travelAlert-a13-westbound-closed-near-goresbrook",
    "travelAlert-minor-delays-on-services-towards-fenchurch-street",
    "travelAlert-overnight-roadworks-on-rainham-road-south",
    "travelAlert-underground-services-running-normally",
  ];
  for (const id of oldAlerts) {
    await writeClient.patch(id).set({ active: false }).commit();
  }
  console.log("travel alerts -> deactivated (no real replacement yet; widget will show 'No active alerts')");

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
