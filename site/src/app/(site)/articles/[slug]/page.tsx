import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleBody } from "@/components/ArticleBody";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { DevelopingLabel } from "@/components/DevelopingLabel";
import { SourceBox } from "@/components/SourceBox";
import { ButtonLink } from "@/components/Button";
import { getCategory } from "@/lib/content/categories";
import { getAllPostSlugs, getPost } from "@/sanity/queries";
import { formatDateTime } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  // stega:false — never let Visual Editing's invisible chars leak into <head>.
  const post = await getPost(slug, { stega: false });
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.standfirst,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.standfirst,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.standfirst,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: category?.name ?? post.category,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/articles/${post.slug}`,
  };

  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)" }}>
        <Link href="/">Home</Link>
        {" / "}
        <Link href={`/category/${post.category}`}>{category?.name ?? post.category}</Link>
      </nav>

      <div className="du-with-rail" style={{ marginTop: "var(--du-space-5)" }}>
        <article style={{ maxWidth: "var(--du-reading-col)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="du-kicker" style={{ color: "var(--du-accent)" }}>
              {category?.name ?? post.category}
            </span>
            {post.developing ? <DevelopingLabel /> : null}
          </div>

          <h1 className="du-headline" style={{ fontSize: "var(--du-display-hero)", margin: "12px 0 0 0" }}>
            {post.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--du-font-display)",
              fontSize: "var(--du-body-lg)",
              lineHeight: 1.5,
              color: "var(--du-ink-secondary)",
              marginTop: 14,
              textWrap: "pretty",
            }}
          >
            {post.standfirst}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 16,
              paddingBottom: "var(--du-space-5)",
              borderBottom: "1px solid var(--du-rule)",
              fontSize: 12,
              color: "var(--du-ink-muted)",
            }}
          >
            <span>
              Published{" "}
              <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
            </span>
            {post.updatedAt ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDateTime(post.updatedAt)}</time>
                </span>
              </>
            ) : null}
            {post.sourceAttribution ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.sourceAttribution}</span>
              </>
            ) : null}
          </div>

          {post.imageUrl ? (
            <figure style={{ margin: "var(--du-space-6) 0 0 0" }}>
              <Image
                src={post.imageUrl}
                alt={post.imageAlt ?? ""}
                width={760}
                height={340}
                style={{ width: "100%", height: 340, objectFit: "cover" }}
                priority
              />
              {post.imageCredit ? (
                <figcaption style={{ fontSize: "var(--du-meta)", color: "var(--du-ink-muted)", marginTop: 6 }}>
                  {post.imageCredit}
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <div className="du-placeholder-image" style={{ height: 340, marginTop: "var(--du-space-6)" }} aria-hidden="true">
              [PHOTO CREDIT]
            </div>
          )}

          <ArticleBody value={post.body} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: "var(--du-space-6)",
              paddingTop: "var(--du-space-5)",
              borderTop: "1px solid var(--du-rule)",
            }}
          >
            <span className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
              Share
            </span>
            <CopyLinkButton />
          </div>

          {/* Timestamped sources log — design-decisions.md: "corrections that
              are visible are a trust asset; corrections that silently rewrite
              the page are a liability." */}
          <div style={{ marginTop: "var(--du-space-7)", border: "1px solid var(--du-rule)", padding: "var(--du-space-5)" }}>
            <div className="du-label-box" style={{ color: "var(--du-ink-muted)" }}>
              Sources &amp; updates log
            </div>
            <ul style={{ listStyle: "none", margin: "var(--du-space-3) 0 0 0", padding: 0 }}>
              {post.sourcesLog.map((entry) => (
                <li
                  key={entry.at}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "8px 0",
                    borderTop: "1px solid var(--du-rule)",
                    fontSize: "var(--du-body-sm)",
                  }}
                >
                  <time dateTime={entry.at} style={{ color: "var(--du-ink-muted)", flexShrink: 0 }}>
                    {formatDateTime(entry.at)}
                  </time>
                  <span style={{ color: "var(--du-ink-secondary)" }}>{entry.note}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", marginTop: "var(--du-space-4)" }}>
              Spotted something wrong?{" "}
              <Link href="/contact">Request a correction</Link> — corrections are
              logged here, not made silently.
            </p>
          </div>
        </article>

        <div className="du-rail">
          <SourceBox />

          <div style={{ border: "1px solid var(--du-rule-strong)", padding: "var(--du-space-5)" }}>
            <p className="du-headline" style={{ fontSize: "var(--du-display-4)", margin: 0 }}>
              Follow for quick updates
            </p>
            <p style={{ fontSize: "var(--du-body-sm)", color: "var(--du-ink-muted)", marginTop: 8 }}>
              Instagram and X, updated through the day.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <ButtonLink href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" size="sm">
                Instagram
              </ButtonLink>
              <ButtonLink href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" size="sm">
                X
              </ButtonLink>
            </div>
          </div>

          {post.relatedPosts.length > 0 ? (
            <div>
              <p className="du-label-section" style={{ borderTop: "var(--du-section-rule)", paddingTop: "var(--du-section-gap)" }}>
                Related
              </p>
              {post.relatedPosts.map((r) => (
                <ArticleCard key={r.slug} post={r} variant="compact" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
