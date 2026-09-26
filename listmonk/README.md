# Dagenham Updates — Newsletter (listmonk)

Self-hosted mailing list for `../site`'s newsletter signup (homepage +
footer), per [listmonk](https://listmonk.app). Docker Compose, per the
project's own installation docs.

## Run it

```bash
docker compose up -d
```

- Admin UI: **http://localhost:9000/admin** — log in with the credentials in
  `.env` (gitignored, not committed — generated on first setup here).
- Mail catcher (Mailpit): **http://localhost:8025** — every email listmonk
  sends lands here instead of a real inbox, until real SMTP is configured
  (see below). Nothing sent here ever reaches an actual subscriber.

`docker compose down` stops it; subscriber/list data persists in the
`listmonk-data` Docker volume across restarts. `docker compose down -v`
would delete that volume — don't, unless you mean to wipe all subscribers.

## The list

**Dagenham Updates Newsletter** — public, **double opt-in** (a subscriber
gets a confirmation email before they're actually subscribed; chosen
deliberately over single opt-in, matching this project's trust-first stance
and UK ICO guidance on consent evidence for marketing email — see
`dagenham-updates-files/docs/design-decisions.md`'s trust notes).

List UUID: `3b00d1a6-0382-423a-b006-9097b7c4bbf2` — this is what `../site`'s
`LISTMONK_LIST_UUID` env var points at (`.env.local`, and `.env.example` for
reference). Find/manage it at Admin → Lists.

## How the site talks to this

`../site/src/app/api/newsletter/route.ts` proxies `NewsletterForm.tsx`'s
submissions to listmonk's public, unauthenticated subscription endpoint
(`POST /api/public/subscription`) — no listmonk credentials involved, and
the browser never sees this service's URL directly. Requires
`LISTMONK_URL` and `LISTMONK_LIST_UUID` in `../site/.env.local`; without
them the form shows an error rather than pretending to subscribe anyone.

For the site (running outside Docker, on the host) to reach listmonk,
`LISTMONK_URL=http://localhost:9000` is right for local dev. If you ever run
the site inside this same Compose network instead, use the service name
(`http://app:9000`) and join it to the `listmonk` network.

## SMTP — currently Mailpit, not real email

Nothing here sends real mail yet. Admin → Settings → SMTP is pointed at the
bundled Mailpit container so confirmation emails and (eventually) campaigns
can be sent and verified without needing real credentials. **Before this
goes live**, point it at a real provider (Postmark, SES, Mailgun, a plain
SMTP account) in Settings → SMTP, and set a real `from_addresses` (currently
the placeholder `Dagenham Updates <updates@dagenhamupdates.local>`, which
doesn't exist as a deliverable domain).

## Deploying for real

This only runs locally right now (`docker compose up -d` on this machine) —
close the terminal or restart the machine and it stops until you start it
again, same as the Sanity Studio's local dev server. For a permanent,
always-on setup: run this same `docker-compose.yml` on a small VPS/server
(listmonk's own docs cover reverse-proxying it behind Caddy/nginx with TLS),
point `../site`'s `LISTMONK_URL` at that public URL, and set the real SMTP
config above before anyone actually subscribes.

## Admin credentials

In `.env` (gitignored) — `LISTMONK_ADMIN_USER` / `LISTMONK_ADMIN_PASSWORD`,
only used to create the superadmin on the very first `docker compose up`
(changing them afterwards does nothing; change the password from inside the
app instead, Admin → your profile). If truly lost with no way back in, the
only clean recovery is a fresh install: `docker compose down -v` (deletes
the `listmonk-data` volume — **wipes all subscribers and lists**, only do
this before real signups exist), then `docker compose up -d` again.
