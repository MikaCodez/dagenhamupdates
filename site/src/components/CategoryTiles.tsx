import Link from "next/link";
import { categories } from "@/lib/content/categories";

const tileStyle = {
  border: "1px solid var(--du-rule-strong)",
  padding: "var(--du-space-4)",
  textAlign: "center" as const,
  fontSize: "var(--du-label-nav)",
  fontWeight: 700,
  letterSpacing: "var(--du-tracking-nav)",
  textTransform: "uppercase" as const,
  color: "var(--du-ink)",
  minHeight: "var(--du-tap-min)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/** Quick category tiles (PRD wireframe §4). The mockup's grid also carried an
 * "Alerts" tile; alerts aren't a category of their own here (§8.3 lists five),
 * so that tile points into the Latest Updates feed pre-filtered to Alerts
 * instead of a sixth route. */
export function CategoryTiles() {
  return (
    <div className="du-category-grid">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`} style={tileStyle}>
          {category.name}
        </Link>
      ))}
      <Link href="/latest-updates?cat=Alerts" style={tileStyle}>
        Alerts
      </Link>
    </div>
  );
}
