import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-[52ch] text-pretty text-base leading-relaxed text-steel">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { to: "/motos" | "/planos"; label: string };
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 max-w-[40ch] text-balance font-display text-2xl font-semibold tracking-tight md:text-[1.7rem]">
          {title}
        </h2>
      </div>
      {action ? (
        <Link
          to={action.to}
          className="shrink-0 text-sm font-semibold text-brand transition-colors hover:text-ink"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-10 md:py-12 ${className}`}>
      {children}
    </section>
  );
}
