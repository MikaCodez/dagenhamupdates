import { test, expect } from "@playwright/test";

test.describe("Article page", () => {
  test("navigating from Latest updates opens a real article", async ({ page }) => {
    await page.goto("/latest-updates");
    const firstArticleLink = page.locator('a[href^="/articles/"]').first();
    await expect(firstArticleLink).toBeVisible();
    const href = await firstArticleLink.getAttribute("href");

    await firstArticleLink.click();
    await expect(page).toHaveURL(new RegExp(href!.replace(/[/]/g, "\\/") + "$"));

    // Breadcrumb, headline, sources log — the structural parts that render
    // for every post regardless of which one this happens to be.
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Sources & updates log")).toBeVisible();
    await expect(page.getByRole("button", { name: /copy link/i })).toBeVisible();
  });

  test("an unknown article slug 404s", async ({ page }) => {
    const res = await page.goto("/articles/this-slug-does-not-exist-anywhere");
    expect(res?.status()).toBe(404);
  });
});
