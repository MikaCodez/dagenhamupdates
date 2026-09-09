# Dagenham Updates

Independent local news and updates platform for Barking & Dagenham. See
[`dagenham-updates-files/README.md`](dagenham-updates-files/README.md) for
the product/design overview and status.

```
dagenham-updates-files/   PRD, design decisions, design canvas, design tokens
site/                     The Next.js app (the website itself)
studio-dagenhamupdates/   Sanity Studio — the CMS admin UI, a separate project
```

`site/` and `studio-dagenhamupdates/` are independent npm projects (each with
its own `package.json`) sharing one Sanity project as their content backend —
see `site/README.md`'s "Content: Sanity CMS" section for how they fit
together, and `studio-dagenhamupdates/README.md` for the Studio itself.
