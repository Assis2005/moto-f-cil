import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileCta } from "./MobileCta";
import { FloatingInstagram } from "./FloatingInstagram";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 md:pb-4">{children}</main>
      <SiteFooter />
      <MobileCta />
      <FloatingInstagram />
    </div>
  );
}

