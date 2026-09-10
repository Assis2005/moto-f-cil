import { Link } from "@tanstack/react-router";
import { brl } from "@/lib/format";
import type { Plano } from "@/lib/types";

export function PlanoCard({ plano }: { plano: Plano }) {
  if (plano.destaque) {
    return (
      <article className="relative rounded-2xl bg-brand p-6 text-brand-foreground ring-1 ring-brand/40">
        {plano.selo ? (
          <span className="absolute -top-2 right-4 rounded-full bg-accent-warm px-2 py-0.5 text-xs font-semibold text-ink">
            {plano.selo}
          </span>
        ) : null}
        <p className="font-display font-semibold">{plano.nome}</p>
        <p className="mt-2 font-display text-3xl font-semibold">
          {brl(plano.preco)}
          <span className="text-base font-medium text-brand-foreground/70">{plano.periodo}</span>
        </p>
        <ul className="mt-4 space-y-2 text-sm text-brand-foreground/80">
          {plano.inclusos.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
        <Link
          to="/cadastro"
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium ring-1 ring-white/20"
        >
          Assinar {plano.nome.toLowerCase()}
        </Link>
      </article>
    );
  }

  return (
    <article className="glass rounded-2xl p-6">
      <p className="font-display font-semibold">{plano.nome}</p>
      <p className="mt-2 font-display text-3xl font-semibold">
        {brl(plano.preco)}
        <span className="text-base font-medium text-steel">{plano.periodo}</span>
      </p>
      <ul className="mt-4 space-y-2 text-sm text-steel">
        {plano.inclusos.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </article>
  );
}
