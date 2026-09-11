import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { brl } from "@/lib/format";
import type { Plano } from "@/lib/types";
import { useRentalFlow } from "@/hooks/useRentalFlow";

export function PlanoCard({ plano }: { plano: Plano }) {
  const { openRentalFlow } = useRentalFlow();

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl p-6",
        plano.destaque
          ? "bg-brand text-brand-foreground shadow-[0_16px_40px_oklch(0.36_0.07_250_/_0.28)]"
          : "surface",
      )}
    >
      {plano.selo ? (
        <span
          className={cn(
            "absolute -top-2.5 right-5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            plano.destaque ? "bg-accent-warm text-ink" : "bg-secondary text-ink",
          )}
        >
          {plano.selo}
        </span>
      ) : null}
      <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] opacity-80">
        {plano.nome}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
        {brl(plano.preco)}
        <span
          className={cn(
            "text-base font-medium",
            plano.destaque ? "text-brand-foreground/70" : "text-steel",
          )}
        >
          {plano.periodo}
        </span>
      </p>
      <ul className={cn("mt-5 flex-1 space-y-2.5 text-sm", plano.destaque ? "text-brand-foreground/85" : "text-steel")}>
        {plano.inclusos.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => openRentalFlow()}
        className={cn(
          buttonVariants({ variant: plano.destaque ? "secondary" : "default" }),
          "mt-6 w-full font-semibold cursor-pointer",
          plano.destaque && "bg-white text-brand hover:bg-white/90",
        )}
      >
        Assinar {plano.nome.toLowerCase()}
      </button>
    </article>
  );
}

