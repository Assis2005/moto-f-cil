import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { MobileCta } from "./MobileCta";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">{children}</main>
      <MobileCta />
    </div>
  );
}
