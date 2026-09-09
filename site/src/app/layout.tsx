import type { Metadata } from "next";
import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { Newsreader, Archivo } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

// Kept deliberately minimal — the public site's chrome (Header/Footer/
// Analytics) lives in app/(site)/layout.tsx instead. /studio needs the full
// viewport with none of that, and this root layout is the one thing every
// route (including /studio) shares.
export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const isDraftMode = isSanityConfigured && (await draftMode()).isEnabled;

  return (
    <html lang="en-GB" className={`${newsreader.variable} ${archivo.variable}`}>
      <body>
        {children}
        {isSanityConfigured ? <SanityLive /> : null}
        {isDraftMode ? (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        ) : null}
      </body>
    </html>
  );
}
