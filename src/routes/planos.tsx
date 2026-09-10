import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PlanoCard } from "@/components/ui-kit/PlanoCard";
import { PageHeader } from "@/components/ui-kit/Section";
import { getPlanos } from "@/lib/mock-api";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e valores de locação — ViagemMot" },
      {
        name: "description",
        content:
          "Plano semanal, quinzenal e mensal com seguro, manutenção e suporte inclusos. Escolha o que cabe na sua rotina.",
      },
      { property: "og:title", content: "Planos e valores de locação — ViagemMot" },
      {
        property: "og:description",
        content: "Compare os planos semanal, quinzenal e mensal e veja o que está incluso.",
      },
    ],
  }),
  component: PlanosPage,
});

const inclusosGerais = [
  "Documentação e emplacamento em dia",
  "Rastreador instalado",
  "Assistência 24h em caso de pane",
  "Troca de moto em caso de manutenção longa",
];

function PlanosPage() {
  const planos = getPlanos();

  return (
    <SiteLayout>
      <section className="py-10 md:py-14">
        <PageHeader
          eyebrow="Contrato"
          title="Planos e valores"
          description="Preço fechado, sem taxa escondida. Você troca de plano quando quiser, a partir do próximo ciclo."
        />
        <div className="mt-8 grid gap-4 pt-2 sm:grid-cols-3">
          {planos.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="surface rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Incluso em todos os planos
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-steel sm:grid-cols-2">
            {inclusosGerais.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
