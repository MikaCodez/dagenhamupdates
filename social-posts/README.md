# Social posts

Archive of the daily image posts for Dagenham Updates' Instagram/X — the
graphics themselves, not the site. Not read by `site/` or any other part of
this repo; this is just a versioned home for them so nothing gets lost in
Photos/Downloads.

## Organisation

```
social-posts/
  2026-09/
    2026-09-25/
      <images for that day>
```

One folder per day, grouped under a year-month folder, `YYYY-MM/YYYY-MM-DD/`.
For a carousel or multiple posts in one day, they just live together in that
day's folder — name the files by post order or a short slug if that matters
(`1-hero.jpg`, `2-detail.jpg`, or `market-opening.jpg`, `market-crowd.jpg`).

Plain image files — PNG or JPG, whatever you export from. No particular
naming enforced beyond the date folders; keep it whatever's fastest for your
daily habit.

## If these should ever appear on the site

They don't automatically — nothing in `site/` reads this folder. If you
later want a "recent posts" strip on the homepage or an Instagram-style
archive page, that's a real feature to build (upload path, image
optimisation, probably Sanity-hosted images like the article ones rather
than files sitting in git) — ask for it as its own task rather than assuming
dropping files here will make them appear anywhere.
