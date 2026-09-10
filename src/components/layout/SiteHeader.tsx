import { Link } from "@tanstack/react-router";

const links = [
  { to: "/motos", label: "Motos" },
  { to: "/planos", label: "Planos" },
  { to: "/", label: "Como funciona", hash: "como-funciona" },
  { to: "/admin", label: "Painel" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/50 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-brand font-display text-sm font-semibold text-brand-foreground">
            V
          </span>
          <span className="font-display font-semibold tracking-tight">
            Viagem<span className="text-brand">Mot</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-steel md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={"hash" in l ? l.hash : undefined}
              activeProps={{ className: "text-ink" }}
              className="transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/cadastro"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground ring-1 ring-brand/40"
        >
          Quero alugar
        </Link>
      </div>
    </header>
  );
}
