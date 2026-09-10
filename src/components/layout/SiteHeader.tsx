import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { to: "/motos" as const, label: "Motos" },
  { to: "/planos" as const, label: "Planos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { to: "/admin" as const, label: "Painel" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand font-display text-sm font-bold text-brand-foreground">
            V
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Viagem<span className="text-brand">Mot</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) =>
            "href" in l ? (
              <a
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-1.5 font-medium text-steel transition-colors hover:bg-secondary hover:text-ink"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                activeProps={{ className: "text-ink bg-secondary" }}
                className="rounded-lg px-3 py-1.5 font-medium text-steel transition-colors hover:bg-secondary hover:text-ink"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <a href="/cadastro" className={cn(buttonVariants({ size: "sm" }), "font-semibold")}>
          Quero alugar
        </a>
      </div>
    </header>
  );
}
