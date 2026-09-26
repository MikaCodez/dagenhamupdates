import Image from "next/image";
import Link from "next/link";
import { BreakingStrip } from "@/components/BreakingStrip";
import { FeaturedCard } from "@/components/FeaturedCard";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHead } from "@/components/SectionHead";
import { CategoryTiles } from "@/components/CategoryTiles";
import { SourceBox } from "@/components/SourceBox";
import { StatusDot } from "@/components/StatusDot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ButtonLink } from "@/components/Button";
import { getCategory } from "@/lib/content/categories";
import {
  getBreakingPost,
  getFeaturedPost,
  getLatestPosts,
  getSpotlightPosts,
  getUpcomingEvents,
  getTravelAlerts,
} from "@/sanity/queries";
import { formatWeekdayShort, formatDayOfMonth } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  const [breaking, featuredMaybe, latestSix, spotlightPosts, events, alerts] = await Promise.all([
    getBreakingPost(),
    getFeaturedPost(),
    getLatestPosts(6),
    getSpotlightPosts(),
    getUpcomingEvents(),
    getTravelAlerts(),
  ]);
  const featured = featuredMaybe ?? latestSix[0];
  const latest = featured
    ? latestSix.filter((p) => p.slug !== featured.slug).slice(0, 5)
    : latestSix.slice(0, 5);

  return (
    <>
      {breaking ? <BreakingStrip post={breaking} /> : null}

      {/* Brand statement / hero */}
      <div className="du-container du-home-section">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "var(--du-space-6)",
            borderBottom: "1px solid var(--du-rule)",
            paddingBottom: "var(--du-space-6)",
          }}
        >
          <p
            className="du-headline"
            style={{ fontSize: 30, maxWidth: 720, margin: 0, textWrap: "pretty" }}
          >
            Local updates for Barking &amp; Dagenham and beyond — news, travel,
            community notices and events, in one place.
          </p>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <ButtonLink href="/latest-updates" variant="dark">
              View latest updates
            </ButtonLink>
            <ButtonLink href="/contact">Submit a tip</ButtonLink>
          </div>
        </div>
      </div>

      {/* Lead story + latest updates rail */}
      <div className="du-container du-home-section">
        {featured ? (
          <div className="du-with-rail">
            <FeaturedCard post={featured} />
            <div className="du-rail">
              <div>
                <SectionHead href="/latest-updates">Latest updates</SectionHead>
                <div>
                  {latest.map((post) => (
                    <ArticleCard key={post.slug} post={post} variant="compact" />
                  ))}
                </div>
              </div>
              <SourceBox />
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--du-ink-muted)" }}>
            No posts yet — the first one published will lead here.
          </p>
        )}
      </div>

      {/* Category tiles */}
      <div className="du-container du-home-section">
        <h2 className="du-visually-hidden">Browse by category</h2>
        <CategoryTiles />
      </div>

      {/* Community spotlight */}
      <div className="du-container du-home-section">
        <SectionHead href="/category/community" linkLabel="More community stories">
          Community spotlight
        </SectionHead>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--du-space-6)",
            marginTop: "var(--du-space-5)",
          }}
        >
          {spotlightPosts.map((post) => {
            const category = getCategory(post.category);
            return (
              <Link key={post.slug} href={`/articles/${post.slug}`} style={{ borderBottom: "none", color: "inherit" }}>
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt ?? ""}
                    width={360}
                    height={168}
                    // contain, not cover — see FeaturedCard.tsx's comment.
                    style={{ width: "100%", height: 168, objectFit: "contain", background: "var(--du-placeholder-bg)" }}
                  />
                ) : (
                  <div className="du-placeholder-image" style={{ height: 168 }} aria-hidden="true">
                    [PHOTO CREDIT]
                  </div>
                )}
                <div className="du-kicker" style={{ marginTop: 13 }}>
                  {category?.name ?? post.category}
                </div>
                <h3
                  className="du-headline"
                  style={{ fontSize: "var(--du-display-3)", margin: "6px 0 0 0", textWrap: "pretty" }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--du-ink-secondary)",
                    marginTop: 8,
                    textWrap: "pretty",
                  }}
                >
                  {post.standfirst}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Events + Travel & alerts */}
      <div className="du-container du-home-section">
        <div className="du-two-col">
          <div>
            <SectionHead href="/category/events" linkLabel="All events">
              Coming up
            </SectionHead>
            <div>
              {events.length === 0 ? (
                <p style={{ color: "var(--du-ink-muted)", padding: "16px 0" }}>Nothing on the calendar yet.</p>
              ) : (
                events.map((event) => (
                  <div
                    key={event.title + event.date}
                    style={{
                      display: "flex",
                      gap: 18,
                      padding: "16px 0",
                      borderBottom: "1px solid var(--du-rule)",
                    }}
                  >
                    <div
                      style={{
                        width: 58,
                        flexShrink: 0,
                        border: "1px solid var(--du-ink)",
                        textAlign: "center",
                        padding: "8px 0",
                      }}
                    >
                      <div className="du-label-nav" style={{ color: "var(--du-ink-muted)" }}>
                        {formatWeekdayShort(event.date)}
                      </div>
                      <div className="du-headline" style={{ fontSize: 26, lineHeight: 1 }}>
                        {formatDayOfMonth(event.date)}
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div className="du-headline" style={{ fontSize: 21 }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--du-ink-muted)", marginTop: 5 }}>
                        {[event.location, event.detail].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="du-section-head">
              <span className="du-label-section">Travel &amp; alerts</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--du-ink-muted)" }}>
                Updated {latestSix[0] ? new Date(latestSix[0].publishedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""}
              </span>
            </div>
            <div>
              {alerts.length === 0 ? (
                <p style={{ color: "var(--du-ink-muted)", padding: "16px 0" }}>No active alerts.</p>
              ) : (
                alerts.map((alert) => {
                  const content = (
                    <div style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--du-rule)" }}>
                      <span style={{ marginTop: 6, flexShrink: 0 }}>
                        <StatusDot severity={alert.severity} />
                      </span>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: "var(--du-ink)" }}>
                          {alert.title}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--du-ink-muted)", marginTop: 4 }}>
                          {alert.detail}
                        </div>
                      </div>
                    </div>
                  );
                  return alert.relatedPostSlug ? (
                    <Link
                      key={alert.title}
                      href={`/articles/${alert.relatedPostSlug}`}
                      style={{ borderBottom: "none", color: "inherit", display: "block" }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={alert.title}>{content}</div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About + tip CTA */}
      <div className="du-container du-home-section">
        <div className="du-two-col">
          <div style={{ border: "1px solid var(--du-rule)", background: "var(--du-panel)", padding: "30px 32px" }}>
            <div className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
              About
            </div>
            <p className="du-headline" style={{ fontSize: 26, margin: "10px 0 0 0", textWrap: "pretty" }}>
              An independent local information service for Barking &amp; Dagenham.
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--du-ink-secondary)", marginTop: 12, textWrap: "pretty" }}>
              We share timely updates on news, travel, events, community notices
              and public-interest stories — for residents and businesses across
              the borough and nearby areas.
            </p>
            <ButtonLink href="/about" style={{ marginTop: 18 }}>
              Learn more
            </ButtonLink>
          </div>
          <div style={{ background: "var(--du-ink)", color: "var(--du-ink-inverse)", padding: "30px 32px" }}>
            <div className="du-label-box" style={{ color: "var(--du-accent-on-dark)" }}>
              Get involved
            </div>
            <p className="du-headline" style={{ fontSize: 30, margin: "10px 0 0 0", color: "var(--du-ink-inverse)", textWrap: "pretty" }}>
              Seen something? Send it to us.
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--du-ink-inverse-mute)", marginTop: 12, textWrap: "pretty" }}>
              Local tips, event listings and corrections. You can ask to stay anonymous.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <ButtonLink href="/contact" variant="primary">
                Submit a tip
              </ButtonLink>
              <ButtonLink
                href="/contact"
                style={{ borderColor: "var(--du-ink-muted)", color: "var(--du-ink-inverse)" }}
              >
                Contact us
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Social + newsletter */}
      <div className="du-container du-home-section" id="newsletter">
        <div
          style={{
            borderTop: "1px solid var(--du-rule)",
            borderBottom: "1px solid var(--du-rule)",
            padding: "26px 0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--du-space-6)",
          }}
        >
          <div>
            <p className="du-headline" style={{ fontSize: 22, margin: 0 }}>
              Follow for quick updates through the day
            </p>
            <p style={{ fontSize: 13, color: "var(--du-ink-muted)", marginTop: 5 }}>
              Instagram and X — plus the weekly email round-up.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flexWrap: "wrap" }}>
            <ButtonLink href="/about#social">Instagram</ButtonLink>
            <ButtonLink href="/about#social">X</ButtonLink>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  );
}
