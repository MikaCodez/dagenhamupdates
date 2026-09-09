import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="du-main">{children}</main>
      <Footer />
      <Analytics />
    </>
  );
}
