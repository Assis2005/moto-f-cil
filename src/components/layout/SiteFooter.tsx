const nav = [
  { href: "/motos", label: "Motos" },
  { href: "/planos", label: "Planos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/admin", label: "Painel" },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:gap-12">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            Viagem<span className="text-brand">Mot</span>
          </p>
          <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-steel">
            Locação de motos para entregadores de app. Preço fechado, análise em 24h e frota
            pronta para circular.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Navegação</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-ink/80 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Atendimento</p>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            Segunda a sábado, das 8h às 20h.
            <br />
            Retorno do cadastro em até 24h úteis.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-steel">
          © {new Date().getFullYear()} ViagemMot. Locação responsável para quem vive da entrega.
        </p>
      </div>
    </footer>
  );
}
