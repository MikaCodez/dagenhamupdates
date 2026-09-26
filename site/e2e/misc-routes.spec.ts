import { test, expect } from "@playwright/test";

test.describe("Miscellaneous routes", () => {
  test("robots.txt and sitemap.xml both respond", async ({ page, request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<urlset");
  });

  test("/subscribe renders the standalone signup form", async ({ page }) => {
    await page.goto("/subscribe");
    await expect(page.getByLabel("Your email address")).toBeVisible();
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });

  test("/api/newsletter and /api/tip reject GET (no accidental public read)", async ({ request }) => {
    const newsletterGet = await request.get("/api/newsletter");
    expect(newsletterGet.status()).toBe(405);

    const tipGet = await request.get("/api/tip");
    expect(tipGet.status()).toBe(405);
  });

  test("/api/revalidate refuses a request with no secret", async ({ request }) => {
    const res = await request.post("/api/revalidate");
    expect([401, 500]).toContain(res.status());
  });
});
