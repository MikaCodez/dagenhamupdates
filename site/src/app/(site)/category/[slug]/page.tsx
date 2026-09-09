import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { SourceBox } from "@/components/SourceBox";
// The route list itself is structural (PRD §8.3's fixed five categories),
// so generateStaticParams uses the static list even when Sanity is
// configured — but the copy on the page is CMS-aware via sanity/queries.
import { categories as staticCategories } from "@/lib/content/categories";
import { getCategory, getPostsByCategory } from "@/sanity/queries";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticCategories.map((c) => ({ slug: c.slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  // stega:false — never let Visual Editing's invisible chars leak into <head>.
  const category = await getCategory(slug, { stega: false });
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.slug);

  return (
    <div className="du-container" style={{ paddingBlock: "var(--du-space-8)" }}>
      <header style={{ borderBottom: "var(--du-section-rule)", paddingBottom: "var(--du-space-5)" }}>
        <p className="du-kicker">Category</p>
        <h1 className="du-headline" style={{ fontSize: "var(--du-display-page)", margin: "10px 0 0 0" }}>
          {category.name}
        </h1>
        <p
          style={{
            fontSize: "var(--du-body)",
            color: "var(--du-ink-secondary)",
            marginTop: 10,
            maxWidth: "var(--du-reading-col)",
          }}
        >
          {category.description}
        </p>
      </header>

      <div className="du-with-rail" style={{ marginTop: "var(--du-space-6)" }}>
        <div>
          {posts.length === 0 ? (
            <div style={{ padding: "var(--du-space-6) 0", color: "var(--du-ink-muted)" }}>
              Nothing filed under {category.name} yet.
            </div>
          ) : (
            posts.map((post) => <ArticleCard key={post.slug} post={post} />)
          )}
        </div>
        <div className="du-rail">
          <SourceBox />
        </div>
      </div>
    </div>
  );
}
