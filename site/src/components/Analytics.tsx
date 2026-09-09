import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/** PRD §16 asks for pageviews, top posts, traffic sources, social CTR, search
 * performance, bounce rate, device split — all standard GA4 reports, so this
 * wires GA4 rather than a bespoke tracker. Renders nothing until
 * NEXT_PUBLIC_GA_ID is set to a real measurement ID (no fabricated ID ships
 * here); until then, no analytics script loads at all. */
export function Analytics() {
  if (!siteConfig.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gaId}');
        `}
      </Script>
    </>
  );
}
